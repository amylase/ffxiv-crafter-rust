(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,function(n,e,t){"use strict";var r=this&&this.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(e,"__esModule",{value:!0});var a=t(6),i=r(t(2)),o=r(t(10)),u=t(24);o.default.render(a.jsx(i.default.StrictMode,{children:a.jsx(u.App,{},void 0)},void 0),document.getElementById("root"))},,,function(n,e,t){"use strict";(function(n,r){t.d(e,"K",(function(){return g})),t.d(e,"E",(function(){return b})),t.d(e,"J",(function(){return x})),t.d(e,"F",(function(){return w})),t.d(e,"H",(function(){return C})),t.d(e,"I",(function(){return P})),t.d(e,"G",(function(){return M})),t.d(e,"d",(function(){return N})),t.d(e,"r",(function(){return F})),t.d(e,"q",(function(){return L})),t.d(e,"x",(function(){return A})),t.d(e,"v",(function(){return E})),t.d(e,"C",(function(){return G})),t.d(e,"n",(function(){return B})),t.d(e,"y",(function(){return R})),t.d(e,"i",(function(){return D})),t.d(e,"c",(function(){return k})),t.d(e,"j",(function(){return q})),t.d(e,"g",(function(){return Q})),t.d(e,"p",(function(){return J})),t.d(e,"o",(function(){return U})),t.d(e,"l",(function(){return W})),t.d(e,"b",(function(){return V})),t.d(e,"s",(function(){return Y})),t.d(e,"w",(function(){return X})),t.d(e,"e",(function(){return H})),t.d(e,"f",(function(){return z})),t.d(e,"z",(function(){return K})),t.d(e,"a",(function(){return Z})),t.d(e,"k",(function(){return $})),t.d(e,"t",(function(){return nn})),t.d(e,"h",(function(){return en})),t.d(e,"m",(function(){return tn})),t.d(e,"u",(function(){return rn})),t.d(e,"B",(function(){return an})),t.d(e,"D",(function(){return on})),t.d(e,"A",(function(){return un}));var a=t(18);const i=new Array(32).fill(void 0);function o(n){return i[n]}i.push(void 0,null,!0,!1);let u=i.length;function s(n){const e=o(n);return function(n){n<36||(i[n]=u,u=n)}(n),e}function c(n){u===i.length&&i.push(i.length+1);const e=u;return u=i[e],i[e]=n,e}let l=new("undefined"==typeof TextDecoder?(0,n.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});l.decode();let d=null;function f(){return null!==d&&d.buffer===a.j.buffer||(d=new Uint8Array(a.j.buffer)),d}function v(n,e){return l.decode(f().subarray(n,n+e))}let p=0;let _=new("undefined"==typeof TextEncoder?(0,n.require)("util").TextEncoder:TextEncoder)("utf-8");const h="function"==typeof _.encodeInto?function(n,e){return _.encodeInto(n,e)}:function(n,e){const t=_.encode(n);return e.set(t),{read:n.length,written:t.length}};function m(n,e,t){if(void 0===t){const t=_.encode(n),r=e(t.length);return f().subarray(r,r+t.length).set(t),p=t.length,r}let r=n.length,a=e(r);const i=f();let o=0;for(;o<r;o++){const e=n.charCodeAt(o);if(e>127)break;i[a+o]=e}if(o!==r){0!==o&&(n=n.slice(o)),a=t(a,r,r=o+3*n.length);const e=f().subarray(a+o,a+r);o+=h(n,e).written}return p=o,a}let y=null;function j(){return null!==y&&y.buffer===a.j.buffer||(y=new Int32Array(a.j.buffer)),y}function g(n,e){try{const c=a.a(-16);var t=m(n,a.d,a.e),r=p,i=m(e,a.d,a.e),o=p;a.m(c,t,r,i,o);var u=j()[c/4+0],s=j()[c/4+1];return v(u,s)}finally{a.a(16),a.c(u,s)}}function b(n,e,t){try{const f=a.a(-16);var r=m(n,a.d,a.e),i=p,o=m(e,a.d,a.e),u=p,s=m(t,a.d,a.e),c=p;a.f(f,r,i,o,u,s,c);var l=j()[f/4+0],d=j()[f/4+1];return v(l,d)}finally{a.a(16),a.c(l,d)}}function x(n,e,t){try{const f=a.a(-16);var r=m(n,a.d,a.e),i=p,o=m(e,a.d,a.e),u=p,s=m(t,a.d,a.e),c=p;a.l(f,r,i,o,u,s,c);var l=j()[f/4+0],d=j()[f/4+1];return v(l,d)}finally{a.a(16),a.c(l,d)}}function w(n,e){try{const c=a.a(-16);var t=m(n,a.d,a.e),r=p,i=m(e,a.d,a.e),o=p;a.g(c,t,r,i,o);var u=j()[c/4+0],s=j()[c/4+1];return v(u,s)}finally{a.a(16),a.c(u,s)}}const S=new Uint32Array(2),O=new BigInt64Array(S.buffer);function C(n,e){try{const u=a.a(-16);var t=m(n,a.d,a.e),r=p;O[0]=e;const s=S[0],c=S[1];a.i(u,t,r,s,c);var i=j()[u/4+0],o=j()[u/4+1];return v(i,o)}finally{a.a(16),a.c(i,o)}}function P(n,e,t){try{const s=a.a(-16);var r=m(n,a.d,a.e),i=p;O[0]=e;const c=S[0],l=S[1];a.k(s,r,i,c,l,t);var o=j()[s/4+0],u=j()[s/4+1];return v(o,u)}finally{a.a(16),a.c(o,u)}}function M(n,e,t){try{const l=a.a(-16);var r=m(n,a.d,a.e),i=p,o=m(e,a.d,a.e),u=p;O[0]=t;const d=S[0],f=S[1];a.h(l,r,i,o,u,d,f);var s=j()[l/4+0],c=j()[l/4+1];return v(s,c)}finally{a.a(16),a.c(s,c)}}function T(n,e){try{return n.apply(this,e)}catch(n){a.b(c(n))}}function I(n,e){return f().subarray(n/1,n/1+e)}function N(){return T((function(n,e){o(n).getRandomValues(o(e))}),arguments)}function F(){return T((function(n,e,t){o(n).randomFillSync(I(e,t))}),arguments)}function L(n){return c(o(n).process)}function A(n){const e=o(n);return"object"==typeof e&&null!==e}function E(n){return c(o(n).versions)}function G(n){s(n)}function B(n){return c(o(n).node)}function R(n){return"string"==typeof o(n)}function D(){return T((function(n,e){return c(t(32)(v(n,e)))}),arguments)}function k(n){return c(o(n).crypto)}function q(n){return c(o(n).msCrypto)}function Q(n){return o(n)instanceof Window}function J(n){var e=o(n).performance;return null==e?0:c(e)}function U(n){return o(n).now()}function W(n,e){return c(new Function(v(n,e)))}function V(){return T((function(n,e){return c(o(n).call(o(e)))}),arguments)}function Y(){return T((function(){return c(self.self)}),arguments)}function X(){return T((function(){return c(window.window)}),arguments)}function H(){return T((function(){return c(globalThis.globalThis)}),arguments)}function z(){return T((function(){return c(r.global)}),arguments)}function K(n){return void 0===o(n)}function Z(n){return c(o(n).buffer)}function $(n){return c(new Uint8Array(o(n)))}function nn(n,e,t){o(n).set(o(e),t>>>0)}function en(n){return o(n).length}function tn(n){return c(new Uint8Array(n>>>0))}function rn(n,e,t){return c(o(n).subarray(e>>>0,t>>>0))}function an(n){return c(o(n))}function on(n,e){throw new Error(v(n,e))}function un(){return c(a.j)}}).call(this,t(30)(n),t(31))},,,,function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.useLanguage=void 0;e.useLanguage=function(){var n=new URLSearchParams(window.location.search.substring(1)).get("lang");return n||(n=localStorage.getItem("ffxiv-crafter-language")),n||(n="en"),[n,function(n){localStorage.setItem("ffxiv-crafter-language",n),location.search="?lang="+n}]}},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.translationProvider=e.supportedLanguages=void 0,e.supportedLanguages=["en","ja"];var r={durability:{en:"Durability",ja:"耐久"},progress:{en:"Progress",ja:"工数"},quality:{en:"Quality",ja:"品質"},cp:{en:"CP",ja:"CP"},condition:{en:"Condition",ja:"状態"},BasicSynthesis:{en:"Basic Synthesis",ja:"作業"},BasicTouch:{en:"Basic Touch",ja:"加工"},MastersMend:{en:"Masters Mend",ja:"マスターズメンド"},InnerQuiet:{en:"Inner Quiet",ja:"インナークワイエット"},DelicateSynthesis:{en:"Delicate Synthesis",ja:"精密作業"},CarefulSynthesis:{en:"Careful Synthesis",ja:"模範作業"},Groundwork:{en:"Groundwork",ja:"下地作業"},Observe:{en:"Observe",ja:"経過観察"},ByregotBlessing:{en:"Byregot Blessing",ja:"ビエルゴの祝福"},PreparatoryTouch:{en:"Preparatory Touch",ja:"下地加工"},RapidSynthesis:{en:"Rapid Synthesis",ja:"突貫作業"},IntensiveSynthesis:{en:"Intensive Synthesis",ja:"集中作業"},HastyTouch:{en:"Hasty Touch",ja:"ヘイスティタッチ"},PreciseTouch:{en:"Precise Touch",ja:"集中加工"},PatientTouch:{en:"Patient Touch",ja:"専心加工"},TrickOfTheTrade:{en:"Tricks of the Trade",ja:"秘訣"},Innovation:{en:"Innovation",ja:"イノベーション"},Veneration:{en:"Veneration",ja:"ヴェネレーション"},MuscleMemory:{en:"Muscle Memory",ja:"確信"},FocusedSynthesis:{en:"Focused Synthesis",ja:"注視作業"},StandardTouch:{en:"Standard Touch",ja:"中級加工"},FocusedTouch:{en:"Focused Touch",ja:"注視加工"},Reflect:{en:"Reflect",ja:"真価"},WasteNot:{en:"Waste Not",ja:"倹約"},WasteNotII:{en:"Waste Not II",ja:"長期倹約"},PrudentTouch:{en:"Prudent Touch",ja:"倹約加工"},GreatStrides:{en:"Great Strides",ja:"グレートストライド"},FinalAppraisal:{en:"Final Appraisal",ja:"最終確認"},Manipulation:{en:"Manipulation",ja:"マニピュレーション"},AdvancedTouch:{en:"Advanced Touch",ja:"上級加工"},PrudentSynthesis:{en:"Prudent Synthesis",ja:"倹約作業"},TrainedFinesse:{en:"Trained Finesse",ja:"匠の神業"},NORMAL:{en:"Normal",ja:"通常"},GOOD:{en:"Good",ja:"高品質"},EXCELLENT:{en:"Excellent",ja:"最高品質"},POOR:{en:"Poor",ja:"低品質"},CENTRED:{en:"Centred",ja:"安定"},PLIANT:{en:"Pliant",ja:"高能率"},STURDY:{en:"Sturdy",ja:"頑丈"},MALLEABLE:{en:"Malleable",ja:"高進捗"},PRIMED:{en:"Primed",ja:"長持続"},inner_quiet:{en:"Inner Quiet",ja:"インナークワイエット"},innovation:{en:"Innovation",ja:"イノベーション"},veneration:{en:"Veneration",ja:"ヴェネレーション"},muscle_memory:{en:"Muscle Memory",ja:"確信"},waste_not:{en:"Waste Not",ja:"倹約"},great_strides:{en:"Great Strides",ja:"グレートストライド"},final_appraisal:{en:"Final Appraisal",ja:"最終確認"},manipulation:{en:"Manipulation",ja:"マニピュレーション"},EnableAIAdvice:{en:"Enable AI Advice",ja:"AIの候補を表示"},Success:{en:"Success",ja:"成功"},Failure:{en:"Failure",ja:"失敗"},ClassLevel:{en:"Class Level",ja:"クラフターレベル"},Craftsmanship:{en:"Craftsmanship",ja:"作業精度"},Control:{en:"Control",ja:"加工精度"},MaxCP:{en:"Max CP",ja:"最大CP"},RecipeLevel:{en:"Recipe Level",ja:"レシピレベル"},MaxDurability:{en:"Durability",ja:"耐久"},MaxProgress:{en:"Max Progress",ja:"必要工数"},MaxQuality:{en:"Max Quality",ja:"最大品質"},InitialQuality:{en:"Initial Quality",ja:"初期品質"},IsExpert:{en:"Expert Recipe",ja:"高難易度レシピ"},Macro:{en:"Macro",ja:"マクロ"},PlanMacroFaster:{en:"Generate Macro (faster)",ja:"マクロ作成 (高速)"},PlanMacroBetter:{en:"Generate Macro (better)",ja:"マクロ作成 (高性能)"},SuccessRate:{en:"success rate",ja:"製作成功確率"},MaxQualityRate:{en:"max quality rate",ja:"最高品質達成率"},AverageQuality:{en:"average quality",ja:"平均品質"},MacroLength:{en:"macro length",ja:"マクロの長さ"},InProgress:{en:"In progress...",ja:"計算中..."},OutputMacro:{en:"Output",ja:"生成結果"},MacroAnalysis:{en:"Macro Quality",ja:"マクロ評価"}};e.translationProvider=function(n){return function(e){if(void 0!==e)return e in r?n in r[e]?r[e][n]:"err: language "+n+" does not exist for key "+e+".":"err: key "+e+" does not exist."}}},,,,,,,function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initial_state=e.craftActions=e.craftResults=e.statusConditions=void 0,e.statusConditions=["NORMAL","GOOD","EXCELLENT","POOR","CENTRED","PLIANT","STURDY","MALLEABLE","PRIMED"],e.craftResults=["ONGOING","FAILED","SUCCESS"],e.craftActions=["BasicSynthesis","BasicTouch","MastersMend","DelicateSynthesis","CarefulSynthesis","Groundwork","Observe","ByregotBlessing","PreparatoryTouch","RapidSynthesis","IntensiveSynthesis","HastyTouch","PreciseTouch","TrickOfTheTrade","Innovation","Veneration","MuscleMemory","FocusedSynthesis","StandardTouch","FocusedTouch","Reflect","WasteNot","WasteNotII","PrudentTouch","GreatStrides","FinalAppraisal","Manipulation","AdvancedTouch","PrudentSynthesis","TrainedFinesse"],e.initial_state=function(n){var e=n.params,t=n.initialQuality;return{durability:e.item.max_durability,progress:0,quality:t,cp:e.player.max_cp,condition:"NORMAL",inner_quiet:0,innovation:0,veneration:0,muscle_memory:0,waste_not:0,great_strides:0,final_appraisal:0,manipulation:0,turn:1,result:"ONGOING"}}},function(n,e,t){"use strict";var r=this&&this.__createBinding||(Object.create?function(n,e,t,r){void 0===r&&(r=t),Object.defineProperty(n,r,{enumerable:!0,get:function(){return e[t]}})}:function(n,e,t,r){void 0===r&&(r=t),n[r]=e[t]}),a=this&&this.__setModuleDefault||(Object.create?function(n,e){Object.defineProperty(n,"default",{enumerable:!0,value:e})}:function(n,e){n.default=e}),i=this&&this.__importStar||function(n){if(n&&n.__esModule)return n;var e={};if(null!=n)for(var t in n)"default"!==t&&Object.prototype.hasOwnProperty.call(n,t)&&r(e,n,t);return a(e,n),e};Object.defineProperty(e,"__esModule",{value:!0}),e.evaluate_macro=e.plan_macro=e.available_actions=e.play_action=e.apply_action=e.search_best_move=void 0;var o=i(t(29));e.search_best_move=function(n,e){return JSON.parse(o.search_best_move(JSON.stringify(n),JSON.stringify(e)))},e.apply_action=function(n,e,t){var r=o.apply_action(JSON.stringify(n),JSON.stringify(e),t);return JSON.parse(r)},e.play_action=function(n,e,t){var r=o.play_action(JSON.stringify(n),JSON.stringify(e),t);return JSON.parse(r)},e.available_actions=function(n,e){var t=o.available_actions(JSON.stringify(n),JSON.stringify(e));return JSON.parse(t)},e.plan_macro=function(n,e,t){var r=o.plan_macro(JSON.stringify(n),BigInt(e),t);return JSON.parse(r)},e.evaluate_macro=function(n,e,t){var r=o.evaluate_macro(JSON.stringify(n),JSON.stringify(e),BigInt(t));return JSON.parse(r)}},function(n,e,t){"use strict";var r=t.w[n.i];n.exports=r;t(4);r.n()},,,,,,function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.App=void 0;var a=t(6),i=t(25),o=t(37);e.App=function(n){return a.jsxs("div",r({className:"m-5"},{children:[a.jsx(o.LanguageSelector,{},void 0),a.jsx(i.CrafterGame,{},void 0)]}),void 0)}},function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.CrafterGame=void 0;var a,i=t(6),o=t(2),u=t(11),s=t(8),c=t(16),l=t(17),d=t(9),f=t(33),v=t(34),p=t(35),_=t(36);!function(n){n[n.CONFIGURING=0]="CONFIGURING",n[n.PLAYABLE=1]="PLAYABLE",n[n.SELECTING_NEXT_STATE=2]="SELECTING_NEXT_STATE"}(a||(a={})),e.CrafterGame=function(){var n,e=o.useState({params:{player:{job_level:80,craftsmanship:2978,control:2787,max_cp:655},item:{recipe_level:516,max_durability:55,max_progress:5059,max_quality:15474}},initialQuality:0}),t=e[0],h=e[1],m=o.useState(c.initial_state(t)),y=m[0],j=m[1],g=o.useState(a.CONFIGURING),b=g[0],x=g[1],w=o.useState(void 0),S=w[0],O=w[1],C=s.useLanguage(),P=C[0],M=(C[1],d.translationProvider(P)),T=l.available_actions(t.params,y);function I(n){return function(){var e=l.play_action(t.params,y,n);O(e.map((function(n){return n.state}))),x(a.SELECTING_NEXT_STATE)}}b===a.PLAYABLE&&"ONGOING"===y.result&&(n=l.search_best_move(t.params,y));var N=c.craftActions.map((function(e){var t,a;return e===n?(t=!1,a="success"):T.some((function(n){return n==e}))?(t=!1,a="primary"):(t=!0,a="secondary"),i.jsx(u.Button,r({variant:a,disabled:t,onClick:I(e)},{children:M(e)}),e)}));return i.jsxs("div",{children:[i.jsx(_.ParameterEditor,{config:t,onChange:function(n){h(n),x(a.CONFIGURING)}},void 0),i.jsx(u.Button,r({variant:"primary",onClick:function(){j(c.initial_state(t)),x(a.PLAYABLE)}},{children:"Start"}),void 0),i.jsx(f.GameStateView,{params:t.params,state:y},void 0),b===a.PLAYABLE?i.jsxs(u.Form,{children:[i.jsx(u.Form.Group,r({className:"mb-3"},{children:i.jsx(u.ButtonGroup,{children:N},void 0)}),void 0),i.jsxs(u.Form.Group,r({className:"mb-3"},{children:["AI: ",M(n)]}),void 0)]},void 0):b===a.SELECTING_NEXT_STATE?i.jsx(p.NextStateSelector,{options:S,onChange:function(n){j(n),x(a.PLAYABLE),O(void 0)}},void 0):null,i.jsx(u.Button,r({variant:"danger",onClick:function(){j(c.initial_state(t)),x(a.PLAYABLE),O(void 0)}},{children:"Reset"}),void 0),i.jsx(v.MacroPlanner,{craftParameter:t.params,initialQuality:t.initialQuality},void 0)]},void 0)}},,,,function(n,e,t){"use strict";t.r(e);var r=t(4);t.d(e,"search_best_move",(function(){return r.K})),t.d(e,"apply_action",(function(){return r.E})),t.d(e,"play_action",(function(){return r.J})),t.d(e,"available_actions",(function(){return r.F})),t.d(e,"initial_state",(function(){return r.H})),t.d(e,"plan_macro",(function(){return r.I})),t.d(e,"evaluate_macro",(function(){return r.G})),t.d(e,"__wbg_getRandomValues_3e46aa268da0fed1",(function(){return r.d})),t.d(e,"__wbg_randomFillSync_59fcc2add91fe7b3",(function(){return r.r})),t.d(e,"__wbg_process_f2b73829dbd321da",(function(){return r.q})),t.d(e,"__wbindgen_is_object",(function(){return r.x})),t.d(e,"__wbg_versions_cd82f79c98672a9f",(function(){return r.v})),t.d(e,"__wbindgen_object_drop_ref",(function(){return r.C})),t.d(e,"__wbg_node_ee3f6da4130bd35f",(function(){return r.n})),t.d(e,"__wbindgen_is_string",(function(){return r.y})),t.d(e,"__wbg_modulerequire_0a83c0c31d12d2c7",(function(){return r.i})),t.d(e,"__wbg_crypto_9e3521ed42436d35",(function(){return r.c})),t.d(e,"__wbg_msCrypto_c429c3f8f7a70bb5",(function(){return r.j})),t.d(e,"__wbg_instanceof_Window_434ce1849eb4e0fc",(function(){return r.g})),t.d(e,"__wbg_performance_bbca4ccfaef860b2",(function(){return r.p})),t.d(e,"__wbg_now_5fa0ca001e042f8a",(function(){return r.o})),t.d(e,"__wbg_newnoargs_f579424187aa1717",(function(){return r.l})),t.d(e,"__wbg_call_89558c3e96703ca1",(function(){return r.b})),t.d(e,"__wbg_self_e23d74ae45fb17d1",(function(){return r.s})),t.d(e,"__wbg_window_b4be7f48b24ac56e",(function(){return r.w})),t.d(e,"__wbg_globalThis_d61b1f48a57191ae",(function(){return r.e})),t.d(e,"__wbg_global_e7669da72fd7f239",(function(){return r.f})),t.d(e,"__wbindgen_is_undefined",(function(){return r.z})),t.d(e,"__wbg_buffer_5e74a88a1424a2e0",(function(){return r.a})),t.d(e,"__wbg_new_e3b800e570795b3c",(function(){return r.k})),t.d(e,"__wbg_set_5b8081e9d002f0df",(function(){return r.t})),t.d(e,"__wbg_length_30803400a8f15c59",(function(){return r.h})),t.d(e,"__wbg_newwithlength_5f4ce114a24dfe1e",(function(){return r.m})),t.d(e,"__wbg_subarray_a68f835ca2af506f",(function(){return r.u})),t.d(e,"__wbindgen_object_clone_ref",(function(){return r.B})),t.d(e,"__wbindgen_throw",(function(){return r.D})),t.d(e,"__wbindgen_memory",(function(){return r.A}))},,,function(n,e){function t(n){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}t.keys=function(){return[]},t.resolve=t,n.exports=t,t.id=32},function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.GameStateView=void 0;var r=t(6),a=t(8),i=t(9);e.GameStateView=function(n){for(var e=n.params,t=n.state,o=a.useLanguage(),u=o[0],s=(o[1],i.translationProvider(u)),c=[],l=0,d=["inner_quiet","innovation","veneration","muscle_memory","waste_not","great_strides","final_appraisal","manipulation"];l<d.length;l++){var f=d[l];t[f]>0&&c.push(s(f)+": "+t[f])}return r.jsxs("div",{children:[r.jsxs("p",{children:[s("durability"),": ",t.durability," / ",e.item.max_durability]},void 0),r.jsxs("p",{children:[s("progress"),": ",t.progress," / ",e.item.max_progress]},void 0),r.jsxs("p",{children:[s("quality"),": ",t.quality," / ",e.item.max_quality]},void 0),r.jsxs("p",{children:[s("cp"),": ",t.cp," / ",e.player.max_cp]},void 0),r.jsx("p",{children:c.join(", ")},void 0),r.jsxs("p",{children:[s("condition"),": ",s(t.condition)]},void 0)]},void 0)}},function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.MacroPlanner=void 0;var a=t(6),i=t(2),o=t(11),u=t(8),s=t(17),c=t(9);function l(n){return void 0!==["MastersMend","Observe","TrickOfTheTrade","Innovation","Veneration","WasteNot","WasteNotII","GreatStrides","FinalAppraisal","Manipulation"].find((function(e){return n===e}))?2:3}e.MacroPlanner=function(n){var e=n.craftParameter,t=n.initialQuality,d=i.useState(""),f=d[0],v=d[1],p=i.useState(""),_=p[0],h=p[1],m=u.useLanguage(),y=m[0],j=(m[1],c.translationProvider(y));function g(n){return function(){v(j("InProgress"));var r=s.plan_macro(e,t,n);v(function(n,e){for(var t=[],r=0;r<n.length;r+=15){var a=n.slice(r,Math.min(r+15,n.length)).map((function(n){return"/action "+e(n)+" <wait."+l(n)+">"})).join("\n");t.push(a)}return t.join("\n\n")}(r,j));var a=s.evaluate_macro(e,r,t),i=[j("SuccessRate")+": "+(100*a.success_rate).toFixed(2)+"%",j("MaxQualityRate")+": "+(100*a.max_quality_rate).toFixed(2)+"%",j("AverageQuality")+": "+Math.round(a.average_quality*e.item.max_quality),j("MacroLength")+": "+a.macro_length];h(i.join("\n"))}}return a.jsxs("div",r({className:"mt-5"},{children:[a.jsx("p",{children:j("Macro")},void 0),a.jsx(o.Button,r({variant:"primary",onClick:g(!1)},{children:j("PlanMacroFaster")}),void 0),a.jsx(o.Button,r({className:"ml-2",variant:"secondary",onClick:g(!0)},{children:j("PlanMacroBetter")}),void 0),a.jsxs(o.Form.Group,r({className:"mt-3",controlId:"macroOutput"},{children:[a.jsx(o.Form.Label,{children:j("OutputMacro")},void 0),a.jsx(o.Form.Control,{as:"textarea",value:f,rows:16},void 0)]}),void 0),a.jsxs(o.Form.Group,r({className:"mt-3",controlId:"macroAnalysis"},{children:[a.jsx(o.Form.Label,{children:j("MacroAnalysis")},void 0),a.jsx(o.Form.Control,{as:"textarea",value:_,rows:4},void 0)]}),void 0)]}),void 0)}},function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.NextStateSelector=void 0;var a=t(6),i=t(11),o=t(8),u=t(16),s=t(9);function c(n){return n.progress+n.quality+n.inner_quiet}function l(n,e){return n+"-"+e}e.NextStateSelector=function(n){var e=n.options,t=n.onChange,d=o.useLanguage(),f=d[0],v=(d[1],s.translationProvider(f)),p=Array.from(new Set(e.map(c)));p.sort((function(n,e){return e-n}));for(var _=u.statusConditions.filter((function(n){return e.some((function(e){return e.condition===n}))})),h=new Map,m=0,y=_;m<y.length;m++)for(var j=y[m],g=0,b=p;g<b.length;g++)for(var x=b[g],w=function(n){c(n)===x&&n.condition===j&&h.set(l(c(n),n.condition),a.jsx(i.Button,r({onClick:function(){return t(n)}},{children:" "}),void 0))},S=0,O=e;S<O.length;S++){w(O[S])}var C=p.map((function(n,e){return 0===e?v("Success"):1===e?v("Failure"):"? "+(e-1)}));return a.jsxs(i.Table,{children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{children:"#"},void 0),_.map((function(n){return a.jsx("th",{children:v(n)},n)}))]},void 0)},void 0),a.jsx("tbody",{children:p.map((function(n,e){var t=C[e];return a.jsxs("tr",{children:[a.jsx("td",{children:t},void 0),_.map((function(e){return a.jsx("td",{children:h.get(l(n,e))},l(n,e))}))]},e)}))},void 0)]},void 0)}},function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.ParameterEditor=void 0;var a=t(6),i=t(11),o=t(8),u=t(9),s={1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,"50★":55,"50★★":70,"50★★★":90,"50★★★★":110,51:120,52:125,53:130,54:133,55:136,56:139,57:142,58:145,59:148,60:150,"60★":160,"60★★":180,"60★★★":210,"60★★★★":250,61:260,62:265,63:270,64:273,65:276,66:279,67:282,68:285,69:288,70:290,"70★":300,"70★★":320,"70★★★":350,"70★★★★":380,71:390,72:395,73:400,74:403,75:406,76:409,77:412,78:415,79:418,80:430,"80★":440,"80★★":450,"80★★★ (480)":480,"80★★★ (490)":490,"80★★★★ (511)":511,"80★★★★ (512)":512,"80★★★★ (513)":513,"80★★★★ (514)":514,"80★★★★ (515)":515,"80★★★★★":516,81:517,82:520,83:525,84:530,85:535,86:540,87:545,88:550,89:555,90:560,"90★":570,"90★★":580};e.ParameterEditor=function(n){var e=n.config,t=n.onChange,c=o.useLanguage(),l=c[0],d=(c[1],u.translationProvider(l));function f(n){t(n)}function v(n){var t={player:e.params.player,item:n};f(r(r({},e),{params:t}))}function p(n){var t={player:n,item:e.params.item};f(r(r({},e),{params:t}))}var _=Object.keys(s);return _.sort((function(n,e){return s[n]-s[e]})),a.jsxs(i.Form,{children:[a.jsxs(i.Row,{children:[a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("ClassLevel")},void 0),a.jsx(i.Form.Control,{value:e.params.player.job_level,onChange:function(n){return p(r(r({},e.params.player),{job_level:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("Craftsmanship")},void 0),a.jsx(i.Form.Control,{value:e.params.player.craftsmanship,onChange:function(n){return p(r(r({},e.params.player),{craftsmanship:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("Control")},void 0),a.jsx(i.Form.Control,{value:e.params.player.control,onChange:function(n){return p(r(r({},e.params.player),{control:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("MaxCP")},void 0),a.jsx(i.Form.Control,{value:e.params.player.max_cp,onChange:function(n){return p(r(r({},e.params.player),{max_cp:parseInt(n.target.value)}))}},void 0)]}),void 0)]},void 0),a.jsxs(i.Row,{children:[a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("RecipeLevel")},void 0),a.jsx(i.Form.Control,r({as:"select",onChange:function(n){return t=parseInt(n.target.value),void v(r(r({},e.params.item),{recipe_level:t}));var t}},{children:_.map((function(n){return a.jsx("option",r({value:s[n],selected:s[n]===e.params.item.recipe_level},{children:n}),n)}))}),void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("MaxDurability")},void 0),a.jsx(i.Form.Control,{value:e.params.item.max_durability,onChange:function(n){return v(r(r({},e.params.item),{max_durability:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("MaxProgress")},void 0),a.jsx(i.Form.Control,{value:e.params.item.max_progress,onChange:function(n){return v(r(r({},e.params.item),{max_progress:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("MaxQuality")},void 0),a.jsx(i.Form.Control,{value:e.params.item.max_quality,onChange:function(n){return v(r(r({},e.params.item),{max_quality:parseInt(n.target.value)}))}},void 0)]}),void 0),a.jsxs(i.Form.Group,r({as:i.Col},{children:[a.jsx(i.Form.Label,{children:d("InitialQuality")},void 0),a.jsx(i.Form.Control,{value:e.initialQuality,onChange:function(n){return f(r(r({},e),{initialQuality:parseInt(n.target.value)}))}},void 0)]}),void 0)]},void 0)]},void 0)}},function(n,e,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(n){for(var e,t=1,r=arguments.length;t<r;t++)for(var a in e=arguments[t])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.LanguageSelector=void 0;var a=t(6),i=t(11),o=t(8),u=t(9),s={en:"English",ja:"日本語"};e.LanguageSelector=function(){var n=o.useLanguage(),e=n[0],t=n[1];return a.jsx(i.ButtonGroup,{children:u.supportedLanguages.map((function(n){return a.jsx(i.Button,r({variant:n===e?"secondary":"outline-secondary",onClick:function(e){return t(n)}},{children:s[n]}),n)}))},void 0)}}]]);
//# sourceMappingURL=2.bootstrap.js.map