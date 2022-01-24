use std::collections::HashSet;

use serde::{Deserialize};
use regex::{Regex};
use ffxiv_crafter_rust::{CraftParameter, initial_state, CraftState, CraftResult, play_action, CraftAction, ProbabilisticResult};

#[derive(Debug, Deserialize)]
struct TestCase {
    patch_version: String,
    client_language: String,
    crafter_parameters: CraftParameter,
    initial_quality: i64,
    log: String,
}

fn log_consistency_test(testcase_str: &str) {
    let test_case: TestCase = serde_json::from_str(testcase_str).unwrap();
    validate_testcase_compatibility(&test_case);

    let params = &test_case.crafter_parameters;
    let params_str = serde_json::to_string(&test_case.crafter_parameters).unwrap();
    let mut states: HashSet<CraftState> = HashSet::new();
    states.insert(serde_json::from_str(&initial_state(&params_str, test_case.initial_quality)).unwrap());
    let mut log_entries: Vec<Vec<&str>> = vec![];
    let mut latest_entry: Vec<&str> = vec![];
    for line in test_case.log.split("\n") {
        match line.chars().nth(0) {
            Some(' ') | Some ('\u{3000}') => {
                latest_entry.push(line);
            }
            _ => {
                log_entries.push(latest_entry);
            latest_entry = vec![line];
            }
        }
    }
    if !latest_entry.is_empty() {
        log_entries.push(latest_entry);
    }

    for entry in &log_entries {
        let mut next_states: HashSet<CraftState> = HashSet::new();
        if entry.len() == 0 {
            continue;
        }
        let first_line = entry.get(0).unwrap();
        if first_line.contains("を開始した") {
            println!("ignoring this entry (start crafting)");
            continue;
        }
        if first_line.contains("材料を取り出した") {
            println!("ignoring this entry (preparing ingredients)");
            continue;
        }
        if first_line.contains("完成させた") || first_line.contains("練習に成功"){
            println!("successful crafting");
            for state in &states {
                if state.result == CraftResult::SUCCESS {
                    next_states.insert(state.clone());
                }
            }
        } else if first_line.contains("製作に失敗") || first_line.contains("練習に失敗") {
            println!("unsuccessful crafting");
            for state in &states {
                if state.result == CraftResult::FAILED {
                    next_states.insert(state.clone());
                }
            }
        } else if first_line.contains("成功") || first_line.contains("失敗") {
            let action_name_re = Regex::new(r"「.+」").unwrap();
            let action_name_match = action_name_re.find(&first_line);
            let action_name = action_name_match.unwrap().as_str().replace("「","").replace("」", "");
            let action = parse_japanese_action_name(&action_name);
            let action_str = action.as_ref();

            let is_success = first_line.contains("成功");

            let mut progress_delta = 0;
            let mut quality_delta = 0;
            let mut durability_delta = 0;
            for line in entry {
                let digits_re = Regex::new(r"\d+").unwrap();
                let mut delta: i64 = 0;
                match digits_re.find(line) {
                    Some(m) => {
                        delta += m.as_str().parse::<i64>().unwrap();
                    },
                    _ => ()
                }
                if line.contains("減少") {
                    delta *= -1;
                }
                if line.contains("作業") {
                    progress_delta += delta;
                } else if line.contains("品質") {
                    quality_delta += delta;
                } else if line.contains("耐久") {
                    durability_delta += delta;
                }
            }
            println!("action: {action:?}, is_success: {is_success}, progress_delta: {progress_delta}, quality_delta: {quality_delta}, durability_delta: {durability_delta}");

            for state in &states {
                let expected_progress = num::clamp(state.progress + progress_delta, 0, params.item.max_progress);
                let expected_quality = num::clamp(state.quality + quality_delta, 0, params.item.max_quality);
                let manipulation_delta = if state.manipulation > 0 { 5 } else { 0 };
                let expected_durability = num::clamp(state.durability + durability_delta + manipulation_delta, 0, params.item.max_durability);

                let state_str = serde_json::to_string(state).unwrap();
                let next_states_str = play_action(&params_str, &state_str, action_str);
                let next_state_candidates: ProbabilisticResult = serde_json::from_str(&next_states_str).unwrap();
                for next_state_candidate in &next_state_candidates {
                    let s = &next_state_candidate.state;
                    if s.progress == expected_progress && s.quality == expected_quality && s.durability == expected_durability {
                        next_states.insert(s.clone());
                    }
                }
            }
        } else {
            panic!("unknown entry header: {}", first_line);
        }
        println!("{}", next_states.len());
        states = next_states;
        if states.is_empty() {
            panic!("no valid states.")
        }
    }
}

fn validate_testcase_compatibility(test_case: &TestCase) {
    assert_eq!(test_case.client_language, "ja");
    assert_eq!(test_case.patch_version, "6.05");
}

fn parse_japanese_action_name(action_name: &str) -> CraftAction {
    match action_name {
        "真価" => CraftAction::Reflect,
        "イノベーション" => CraftAction::Innovation,
        "長期倹約" => CraftAction::WasteNotII,
        "下地加工" => CraftAction::PreparatoryTouch,
        "グレートストライド" => CraftAction::GreatStrides,
        "ビエルゴの祝福" => CraftAction::ByregotBlessing,
        "マスターズメンド" => CraftAction::MastersMend,
        "ヴェネレーション" => CraftAction::Veneration,
        "倹約" => CraftAction::WasteNot,
        "下地作業" => CraftAction::Groundwork,
        "倹約加工" => CraftAction::PrudentTouch,
        "倹約作業" => CraftAction::PrudentSynthesis,
        "集中加工" => CraftAction::PreciseTouch,
        "集中作業" => CraftAction::IntensiveSynthesis,
        "マニピュレーション" => CraftAction::Manipulation,
        "匠の神業" => CraftAction::TrainedFinesse,
        "精密作業" => CraftAction::DelicateSynthesis,
        "加工" => CraftAction::BasicTouch,
        "中級加工" => CraftAction::StandardTouch,
        "上級加工" => CraftAction::AdvancedTouch,
        "模範作業" => CraftAction::CarefulSynthesis,
        "経過観察" => CraftAction::Observe,
        "注視加工" => CraftAction::FocusedTouch,
        _ => panic!("unknown action name: {}", action_name)
    }
}

#[test]
fn log_consistency_test1() {
    log_consistency_test(include_str!("logs/log1.json"));
}

#[test]
fn log_consistency_test2() {
    log_consistency_test(include_str!("logs/log2.json"));
}

#[test]
fn log_consistency_test3() {
    log_consistency_test(include_str!("logs/log3.json"));
}

#[test]
fn log_consistency_test4() {
    log_consistency_test(include_str!("logs/log4.json"));
}
