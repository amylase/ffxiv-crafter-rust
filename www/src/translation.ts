export const supportedLanguages = ["en", "ja"];
export type SupportedLanguage = typeof supportedLanguages[number];

interface DictionaryEntry {
    [countryName: string]: string
}

const dictionary: {[key: string]: DictionaryEntry} = {
    // status names
    durability: {
        en: "Durability",
        ja: "耐久"
    },
    progress: {
        en: "Progress",
        ja: "工数"
    },
    quality: {
        en: "Quality",
        ja: "品質"
    },
    cp: {
        en: "CP",
        ja: "CP"
    },
    condition: {
        en: "Condition",
        ja: "状態"
    },

    // actions
    BasicSynthesis: {
        en: "Basic Synthesis",
        ja: "作業"
    },
    BasicTouch: {
        en: "Basic Touch",
        ja: "加工"
    },
    MastersMend: {
        en: "Masters Mend",
        ja: "マスターズメンド"
    },
    InnerQuiet: {
        en: "Inner Quiet",
        ja: "インナークワイエット"
    },
    DelicateSynthesis: {
        en: "Delicate Synthesis",
        ja: "精密作業"
    },
    CarefulSynthesis: {
        en: "Careful Synthesis",
        ja: "模範作業"
    },
    Groundwork: {
        en: "Groundwork",
        ja: "下地作業"
    },
    Observe: {
        en: "Observe",
        ja: "経過観察"
    },
    ByregotBlessing: {
        en: "Byregot Blessing",
        ja: "ビエルゴの祝福"
    },
    PreparatoryTouch: {
        en: "Preparatory Touch",
        ja: "下地加工"
    },
    RapidSynthesis: {
        en: "Rapid Synthesis",
        ja: "突貫作業"
    },
    IntensiveSynthesis: {
        en: "Intensive Synthesis",
        ja: "集中作業"
    },
    HastyTouch: {
        en: "Hasty Touch",
        ja: "ヘイスティタッチ"
    },
    PreciseTouch: {
        en: "Precise Touch",
        ja: "集中加工"
    },
    PatientTouch: {
        en: "Patient Touch",
        ja: "専心加工"
    },
    TrickOfTheTrade: {
        en: "Tricks of the Trade",
        ja: "秘訣"
    },
    Innovation: {
        en: "Innovation",
        ja: "イノベーション"
    },
    Veneration: {
        en: "Veneration",
        ja: "ヴェネレーション"
    },
    MuscleMemory: {
        en: "Muscle Memory",
        ja: "確信"
    },
    FocusedSynthesis: {
        en: "Focused Synthesis",
        ja: "注視作業"
    },
    StandardTouch: {
        en: "Standard Touch",
        ja: "中級加工"
    },
    FocusedTouch: {
        en: "Focused Touch",
        ja: "注視加工"
    },
    Reflect: {
        en: "Reflect",
        ja: "真価"
    },
    WasteNot: {
        en: "Waste Not",
        ja: "倹約"
    },
    WasteNotII: {
        en: "Waste Not II",
        ja: "長期倹約"
    },
    PrudentTouch: {
        en: "Prudent Touch",
        ja: "倹約加工"
    },
    GreatStrides: {
        en: "Great Strides",
        ja: "グレートストライド"
    },
    FinalAppraisal: {
        en: "Final Appraisal",
        ja: "最終確認"
    },
    Manipulation: {
        en: "Manipulation",
        ja: "マニピュレーション"
    },
    AdvancedTouch: {
        en: "Advanced Touch",
        ja: "上級加工"
    },
    PrudentSynthesis: {
        en: "Prudent Synthesis",
        ja: "倹約作業"
    },
    TrainedFinesse: {
        en: "Trained Finesse",
        ja: "匠の神業"
    },

    // conditions
    NORMAL: {
        en: "Normal",
        ja: "通常"
    },
    GOOD: {
        en: "Good",
        ja: "高品質"
    },
    EXCELLENT: {
        en: "Excellent",
        ja: "最高品質"
    },
    POOR: {
        en: "Poor",
        ja: "低品質"
    },
    CENTRED: {
        en: "Centred",
        ja: "安定"
    },
    PLIANT: {
        en: "Pliant",
        ja: "高能率"
    },
    STURDY: {
        en: "Sturdy",
        ja: "頑丈"
    },
    MALLEABLE: {
        en: "Malleable",
        ja: "高進捗"
    },
    PRIMED: {
        en: "Primed",
        ja: "長持続"
    },

    // buffs
    inner_quiet: {
        en: "Inner Quiet",
        ja: "インナークワイエット"
    },
    innovation: {
        en: "Innovation",
        ja: "イノベーション"
    },
    veneration: {
        en: "Veneration",
        ja: "ヴェネレーション"
    },
    muscle_memory: {
        en: "Muscle Memory",
        ja: "確信"
    },
    waste_not: {
        en: "Waste Not",
        ja: "倹約"
    },
    great_strides: {
        en: "Great Strides",
        ja: "グレートストライド"
    },
    final_appraisal: {
        en: "Final Appraisal",
        ja: "最終確認"
    },
    manipulation: {
        en: "Manipulation",
        ja: "マニピュレーション"
    },

    // UI
    EnableAIAdvice: {
        en: "Enable AI Advice",
        ja: "AIの候補を表示"
    },
    Success: {
        en: "Success",
        ja: "成功"
    },
    Failure: {
        en: "Failure",
        ja: "失敗"
    },
    ClassLevel: {
        en: "Class Level",
        ja: "クラフターレベル"
    },
    Craftsmanship: {
        en: "Craftsmanship",
        ja: "作業精度"
    },
    Control: {
        en: "Control",
        ja: "加工精度"
    },
    MaxCP: {
        en: "Max CP",
        ja: "最大CP"
    },
    RecipeLevel: {
        en: "Recipe Level",
        ja: "レシピレベル"
    },
    MaxDurability: {
        en: "Durability",
        ja: "耐久"
    },
    MaxProgress: {
        en: "Max Progress",
        ja: "必要工数"
    },
    MaxQuality: {
        en: "Max Quality",
        ja: "最大品質"
    },
    InitialQuality: {
        en: "Initial Quality",
        ja: "初期品質"
    },
    IsExpert: {
        en: "Expert Recipe",
        ja: "高難易度レシピ"
    },
    Macro: {
        en: "Macro",
        ja: "マクロ"
    },
    PlanMacroFaster: {
        en: "Generate Macro (faster)",
        ja: "マクロ作成 (高速)"
    },
    PlanMacroBetter: {
        en: "Generate Macro (better)",
        ja: "マクロ作成 (高性能)"
    },
    SuccessRate: {
        en: "success rate",
        ja: "製作成功確率",
    },
    MaxQualityRate: {
        en: "max quality rate",
        ja: "最高品質達成率",
    },
    AverageQuality: {
        en: "average quality",
        ja: "平均品質",
    },
    MacroLength: {
        en: "macro length",
        ja: "マクロの長さ",
    },
    InProgress: {
        en: "In progress...",
        ja: "計算中...",
    },
    OutputMacro: {
        en: "Output",
        ja: "生成結果"
    },
    MacroAnalysis: {
        en: "Macro Quality",
        ja: "マクロ評価"
    },
    InvalidParameters: {
        en: "Invalid Parameters",
        ja: "パラメータの値が正しくありません"
    }
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