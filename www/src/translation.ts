export const supportedLanguages = ["en", "ja", "ko"];
export type SupportedLanguage = typeof supportedLanguages[number];

interface DictionaryEntry {
    [countryName: string]: string
}

const dictionary: {[key: string]: DictionaryEntry} = {
    // status names
    durability: {
        en: "Durability",
        ja: "耐久",
        ko: "내구",
    },
    progress: {
        en: "Progress",
        ja: "工数",
        ko: "공정"
    },
    quality: {
        en: "Quality",
        ja: "品質",
        ko: "품질"
    },
    cp: {
        en: "CP",
        ja: "CP",
        ko: "CP"
    },
    condition: {
        en: "Condition",
        ja: "状態",
        ko: "상태"
    },

    // actions
    BasicSynthesis: {
        en: "Basic Synthesis",
        ja: "作業",
        ko: "작업"
    },
    BasicTouch: {
        en: "Basic Touch",
        ja: "加工",
        ko: "가공"
    },
    MastersMend: {
        en: "Master's Mend",
        ja: "マスターズメンド",
        ko: "능숙한 땜질"
    },
    InnerQuiet: {
        en: "Inner Quiet",
        ja: "インナークワイエット",
        ko: "정신 집중"
    },
    DelicateSynthesis: {
        en: "Delicate Synthesis",
        ja: "精密作業",
        ko: "정밀 작업"
    },
    CarefulSynthesis: {
        en: "Careful Synthesis",
        ja: "模範作業",
        ko: "모범 작업"
    },
    Groundwork: {
        en: "Groundwork",
        ja: "下地作業",
        ko: "밑작업"
    },
    Observe: {
        en: "Observe",
        ja: "経過観察",
        ko: "경과 관찰"
    },
    ByregotBlessing: {
        en: "Byregot's Blessing",
        ja: "ビエルゴの祝福",
        ko: "비레고의 축복"
    },
    PreparatoryTouch: {
        en: "Preparatory Touch",
        ja: "下地加工",
        ko: "밑가공"
    },
    RapidSynthesis: {
        en: "Rapid Synthesis",
        ja: "突貫作業",
        ko: "강행 작업"
    },
    IntensiveSynthesis: {
        en: "Intensive Synthesis",
        ja: "集中作業",
        ko: "집중 작업"
    },
    HastyTouch: {
        en: "Hasty Touch",
        ja: "ヘイスティタッチ",
        ko: "성급한 손길"
    },
    PreciseTouch: {
        en: "Precise Touch",
        ja: "集中加工",
        ko: "집중 가공"
    },
    PatientTouch: {
        en: "Patient Touch",
        ja: "専心加工",
        ko: "전념 가공"
    },
    TrickOfTheTrade: {
        en: "Tricks of the Trade",
        ja: "秘訣",
        ko: "비결"
    },
    Innovation: {
        en: "Innovation",
        ja: "イノベーション",
        ko: "혁신"
    },
    Veneration: {
        en: "Veneration",
        ja: "ヴェネレーション",
        ko: "공경"
    },
    MuscleMemory: {
        en: "Muscle Memory",
        ja: "確信",
        ko: "확신"
    },
    StandardTouch: {
        en: "Standard Touch",
        ja: "中級加工",
        ko: "중급 가공"
    },
    Reflect: {
        en: "Reflect",
        ja: "真価",
        ko: "진가"
    },
    WasteNot: {
        en: "Waste Not",
        ja: "倹約",
        ko: "근검절약"
    },
    WasteNotII: {
        en: "Waste Not II",
        ja: "長期倹約",
        ko: "장기 절약"
    },
    PrudentTouch: {
        en: "Prudent Touch",
        ja: "倹約加工",
        ko: "절약 가공"
    },
    GreatStrides: {
        en: "Great Strides",
        ja: "グレートストライド",
        ko: "장족의 발전"
    },
    FinalAppraisal: {
        en: "Final Appraisal",
        ja: "最終確認",
        ko: "최종 확인"
    },
    Manipulation: {
        en: "Manipulation",
        ja: "マニピュレーション",
        ko: "교묘한 손놀림"
    },
    AdvancedTouch: {
        en: "Advanced Touch",
        ja: "上級加工",
        ko: "상급 가공"
    },
    PrudentSynthesis: {
        en: "Prudent Synthesis",
        ja: "倹約作業",
        ko: "절약 작업"
    },
    TrainedFinesse: {
        en: "Trained Finesse",
        ja: "匠の神業",
        ko: "장인의 황금손"
    },
    RefinedTouch: {
        en: "Refined touch",
        ja: "洗練加工",
        ko: "세련 가공",
    },
    DaringTouch: {
        en: "Daring Touch",
        ja: "デアリングタッチ",
        ko: "대담한 손길"
    },
    ImmaculateMend: {
        en: "Immaculate Mend",
        ja: "パーフェクトメンド",
        ko: "완벽한 땜질"
    },
    TrainedPerfection: {
        en: "Trained Perfection",
        ja: "匠の絶技",
        ko: "장인의 초절 기술"
    },

    // conditions
    NORMAL: {
        en: "Normal",
        ja: "通常",
        ko: "보통"
    },
    GOOD: {
        en: "Good",
        ja: "高品質",
        ko: "고품질"
    },
    EXCELLENT: {
        en: "Excellent",
        ja: "最高品質",
        ko: "최고품질"
    },
    POOR: {
        en: "Poor",
        ja: "低品質",
        ko: "저품질"
    },
    CENTRED: {
        en: "Centred",
        ja: "安定",
        ko: "안정"
    },
    PLIANT: {
        en: "Pliant",
        ja: "高能率",
        ko: "고효율"
    },
    STURDY: {
        en: "Sturdy",
        ja: "頑丈",
        ko: "견고"
    },
    MALLEABLE: {
        en: "Malleable",
        ja: "高進捗",
        ko: "빠른 진행"
    },
    PRIMED: {
        en: "Primed",
        ja: "長持続",
        ko: "장기 지속"
    },
    GOOD_OMEN: {
        en: "Good Omen",
        ja: "良兆候",
        ko: "길조",
    },

    // buffs
    inner_quiet: {
        en: "Inner Quiet",
        ja: "インナークワイエット",
        ko: "정신 집중"
    },
    innovation: {
        en: "Innovation",
        ja: "イノベーション",
        ko: "혁신"
    },
    veneration: {
        en: "Veneration",
        ja: "ヴェネレーション",
        ko: "공경"
    },
    muscle_memory: {
        en: "Muscle Memory",
        ja: "確信",
        ko: "확신"
    },
    waste_not: {
        en: "Waste Not",
        ja: "倹約",
        ko: "근검절약"
    },
    great_strides: {
        en: "Great Strides",
        ja: "グレートストライド",
        ko: "장족의 발전"
    },
    final_appraisal: {
        en: "Final Appraisal",
        ja: "最終確認",
        ko: "최종 확인"
    },
    manipulation: {
        en: "Manipulation",
        ja: "マニピュレーション",
        ko: "교묘한 손놀림"
    },
    expedience: {
        en: "Expedience",
        ja: "匠の好機",
        ko: "장인의 운때",
    },
    trained_perfection: {
        en: "Trained Perfection",
        ja: "匠の絶技",
        ko: "장인의 초절 기술"
    },

    // UI
    EnableAIAdvice: {
        en: "Enable AI Advice",
        ja: "AIの候補を表示",
        ko: "AI의 후보를 표시"
    },
    Success: {
        en: "Success",
        ja: "成功",
        ko: "성공"
    },
    Failure: {
        en: "Failure",
        ja: "失敗",
        ko: "실패"
    },
    ClassLevel: {
        en: "Class Level",
        ja: "クラフターレベル",
        ko: "제작직 레벨"
    },
    Craftsmanship: {
        en: "Craftsmanship",
        ja: "作業精度",
        ko: "작업 숙련도"
    },
    Control: {
        en: "Control",
        ja: "加工精度",
        ko: "가공 숙련도"
    },
    MaxCP: {
        en: "Max CP",
        ja: "最大CP",
        ko: "최대 CP"
    },
    RecipeLevel: {
        en: "Recipe Level",
        ja: "レシピレベル",
        ko: "레시피 레벨"
    },
    MaxDurability: {
        en: "Durability",
        ja: "耐久",
        ko: "내구도"
    },
    MaxProgress: {
        en: "Max Progress",
        ja: "必要工数",
        ko: "작업량"
    },
    MaxQuality: {
        en: "Max Quality",
        ja: "最大品質",
        ko: "최대 품질"
    },
    InitialQuality: {
        en: "Initial Quality",
        ja: "初期品質",
        ko: "초기 품질"
    },
    IsExpert: {
        en: "Expert Recipe",
        ja: "高難易度レシピ",
        ko: "고난이도 레시피"
    },
    Advisor: {
        en: "Advisor",
        ja: "アドバイザー",
        ko: "어드바이저"
    },
    Macro: {
        en: "Macro",
        ja: "マクロ",
        ko: "매크로"
    },
    PlanMacroFaster: {
        en: "Generate Macro (faster)",
        ja: "マクロ作成 (高速)",
        ko: "매크로 작성 (고속)"
    },
    PlanMacroBetter: {
        en: "Generate Macro (better)",
        ja: "マクロ作成 (高性能)",
        ko: "매크로 작성 (고성능)"
    },
    SuccessRate: {
        en: "success rate",
        ja: "製作成功確率",
        ko: "제작 성공 확률"
    },
    MaxQualityRate: {
        en: "max quality rate",
        ja: "最高品質達成率",
        ko: "최고품질 달성 확률"
    },
    AverageQuality: {
        en: "average quality",
        ja: "平均品質",
        ko: "평균 품질"
    },
    MacroLength: {
        en: "macro length",
        ja: "マクロの長さ",
        ko: "매크로 길이"
    },
    InProgress: {
        en: "In progress...",
        ja: "計算中...",
        ko: "계산중..."
    },
    OutputMacro: {
        en: "Macro",
        ja: "マクロ",
        ko: "매크로"
    },
    MacroAnalysis: {
        en: "Macro Quality",
        ja: "マクロ評価",
        ko: "매크로의 품질"
    },
    InvalidParameters: {
        en: "Invalid Parameters",
        ja: "パラメータの値が正しくありません",
        ko: "파라미터가 올바르지 않습니다"
    },
    AvailableActions: {
        en: "Available Actions",
        ja: "使用可能なアクション",
        ko: "사용 가능한 액션"
    },
    ReportBug: {
        en: "Report a bug",
        ja: "バグを報告",
        ko: "버그 신고",
    },

    // dawntrail announcements
    DawntrailReleased: {
        en: "Dawntrail feature is supported.",
        ja: "黄金のレガシーに対応しました。",
        ko: "황금의 유산에 대응했습니다.",
    },
    EndwalkerHere: {
        en: "Endwalker version",
        ja: "暁月バージョン",
        ko: "효월의 종언 버전",
    },
    EndwalkerForKoreaChina: {
        en: "(for users from South Korea or China)",
        ja: "（韓国・中国サーバー向け）",
        ko: "(한국·중국 서버용)",
    },
};

export function translationProvider(language: string): (string) => string {
    return function(key: string) {
        if (key === undefined) {
            return undefined;
        }
        if (!(key in dictionary)) {
            return `err: key ${key} does not exist.`
        } else if (!(language in dictionary[key])) {
            return `err: language ${language} does not exist for key ${key}.`
        } else {
            return dictionary[key][language];
        }
    }
}