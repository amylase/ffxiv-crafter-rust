"use strict";(self.webpackChunkffxiv_crafter_frontend=self.webpackChunkffxiv_crafter_frontend||[]).push([[629],{5456:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.d(e,{Ho:()=>i.Ho,UP:()=>i.UP,bi:()=>i.bi,fC:()=>i.fC});var r=a(6184),i=a(7729),o=n([r]);r=(o.then?(await o)():o)[0],(0,i.oT)(r),t()}catch(n){t(n)}}))},7729:(n,e,a)=>{let t;function r(n){t=n}a.d(e,{BE:()=>nn,Bj:()=>I,F:()=>S,HH:()=>H,Ho:()=>x,JI:()=>z,Kz:()=>X,OQ:()=>V,Or:()=>an,Oy:()=>J,QQ:()=>D,Sc:()=>A,TE:()=>T,UP:()=>b,Vb:()=>P,Wc:()=>Z,Wl:()=>M,XP:()=>Y,YN:()=>q,Yh:()=>Q,bi:()=>k,cN:()=>F,cU:()=>O,dj:()=>W,eH:()=>K,eY:()=>N,fC:()=>j,gj:()=>L,h4:()=>E,m_:()=>en,o$:()=>B,oH:()=>tn,oT:()=>r,tf:()=>$,ug:()=>C,vN:()=>R,yR:()=>G,zp:()=>U}),n=a.hmd(n);const i=new Array(128).fill(void 0);function o(n){return i[n]}i.push(void 0,null,!0,!1);let c=i.length;function s(n){const e=o(n);return function(n){n<132||(i[n]=c,c=n)}(n),e}let l=new("undefined"==typeof TextDecoder?(0,n.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});l.decode();let u=null;function d(){return null!==u&&0!==u.byteLength||(u=new Uint8Array(t.memory.buffer)),u}function _(n,e){return n>>>=0,l.decode(d().subarray(n,n+e))}function f(n){c===i.length&&i.push(i.length+1);const e=c;return c=i[e],i[e]=n,e}let p=0,h=new("undefined"==typeof TextEncoder?(0,n.require)("util").TextEncoder:TextEncoder)("utf-8");const g="function"==typeof h.encodeInto?function(n,e){return h.encodeInto(n,e)}:function(n,e){const a=h.encode(n);return e.set(a),{read:n.length,written:a.length}};function y(n,e,a){if(void 0===a){const a=h.encode(n),t=e(a.length)>>>0;return d().subarray(t,t+a.length).set(a),p=a.length,t}let t=n.length,r=e(t)>>>0;const i=d();let o=0;for(;o<t;o++){const e=n.charCodeAt(o);if(e>127)break;i[r+o]=e}if(o!==t){0!==o&&(n=n.slice(o)),r=a(r,t,t=o+3*n.length)>>>0;const e=d().subarray(r+o,r+t);o+=g(n,e).written}return p=o,r}let v=null;function m(){return null!==v&&0!==v.byteLength||(v=new Int32Array(t.memory.buffer)),v}function b(n,e){let a,r;try{const c=t.__wbindgen_add_to_stack_pointer(-16),s=y(n,t.__wbindgen_malloc,t.__wbindgen_realloc),l=p,u=y(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=p;t.search_best_move(c,s,l,u,d);var i=m()[c/4+0],o=m()[c/4+1];return a=i,r=o,_(i,o)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(a,r)}}function j(n,e,a){let r,i;try{const s=t.__wbindgen_add_to_stack_pointer(-16),l=y(n,t.__wbindgen_malloc,t.__wbindgen_realloc),u=p,d=y(e,t.__wbindgen_malloc,t.__wbindgen_realloc),f=p,h=y(a,t.__wbindgen_malloc,t.__wbindgen_realloc),g=p;t.play_action(s,l,u,d,f,h,g);var o=m()[s/4+0],c=m()[s/4+1];return r=o,i=c,_(o,c)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,i)}}function x(n,e){let a,r;try{const c=t.__wbindgen_add_to_stack_pointer(-16),s=y(n,t.__wbindgen_malloc,t.__wbindgen_realloc),l=p,u=y(e,t.__wbindgen_malloc,t.__wbindgen_realloc),d=p;t.available_actions(c,s,l,u,d);var i=m()[c/4+0],o=m()[c/4+1];return a=i,r=o,_(i,o)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(a,r)}}function k(n,e,a){let r,i;try{const s=t.__wbindgen_add_to_stack_pointer(-16),l=y(n,t.__wbindgen_malloc,t.__wbindgen_realloc),u=p,d=y(e,t.__wbindgen_malloc,t.__wbindgen_realloc),f=p;t.evaluate_macro(s,l,u,d,f,a);var o=m()[s/4+0],c=m()[s/4+1];return r=o,i=c,_(o,c)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,i)}}function w(n,e){try{return n.apply(this,e)}catch(n){t.__wbindgen_exn_store(f(n))}}function S(){return w((function(n,e){o(n).randomFillSync(s(e))}),arguments)}function C(n){s(n)}function T(){return w((function(n,e){o(n).getRandomValues(o(e))}),arguments)}function A(n){return f(o(n).crypto)}function M(n){const e=o(n);return"object"==typeof e&&null!==e}function P(n){return f(o(n).process)}function O(n){return f(o(n).versions)}function I(n){return f(o(n).node)}function N(n){return"string"==typeof o(n)}function Z(){return w((function(){return f(n.require)}),arguments)}function E(n,e){return f(_(n,e))}function L(n){return f(o(n).msCrypto)}function G(n){let e;try{e=o(n)instanceof Window}catch{e=!1}return e}function R(n){return o(n).now()}function F(n){const e=o(n).performance;return null==e?0:f(e)}function B(n){return"function"==typeof o(n)}function Q(n,e){return f(new Function(_(n,e)))}function q(){return w((function(n,e){return f(o(n).call(o(e)))}),arguments)}function H(){return w((function(){return f(self.self)}),arguments)}function J(){return w((function(){return f(window.window)}),arguments)}function U(){return w((function(){return f(globalThis.globalThis)}),arguments)}function D(){return w((function(){return f(a.g.global)}),arguments)}function Y(n){return void 0===o(n)}function W(){return w((function(n,e,a){return f(o(n).call(o(e),o(a)))}),arguments)}function V(n){return f(o(n).buffer)}function K(n,e,a){return f(new Uint8Array(o(n),e>>>0,a>>>0))}function X(n){return f(new Uint8Array(o(n)))}function z(n,e,a){o(n).set(o(e),a>>>0)}function $(n){return f(new Uint8Array(n>>>0))}function nn(n,e,a){return f(o(n).subarray(e>>>0,a>>>0))}function en(n){return f(o(n))}function an(n,e){throw new Error(_(n,e))}function tn(){return f(t.memory)}},8957:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.d(e,{g:()=>l});var r=a(7557),i=a(8611),o=a(3216),c=n([i]);i=(c.then?(await c)():c)[0];var s=function(){return s=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},s.apply(this,arguments)};function l(n){return(0,r.jsxs)("div",s({className:"m-5"},{children:[(0,r.jsx)(o.$,{}),(0,r.jsx)(i.l,{})]}))}t()}catch(u){t(u)}}))},8611:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.d(e,{l:()=>k});var r=a(7557),i=a(9526),o=a(8759),c=a(8415),s=a(630),l=a(9959),u=a(5074),d=a(4936),_=a(9881),f=a(8918),p=a(3425),h=a(8441),g=a(989),y=a(4388),v=a(6631),m=a(7179),b=n([p,y]);[p,y]=b.then?(await b)():b;var j,x=function(){return x=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},x.apply(this,arguments)};function k(){var n,e=(0,d.Y)(),a=e.getCraftConfig,t=e.setCraftConfig,b=a(),k=(0,i.useState)((0,f.kT)(b)),w=k[0],S=k[1],C=(0,i.useState)(j.CONFIGURING),T=C[0],A=C[1],M=(0,i.useState)(void 0),P=M[0],O=M[1],I=(0,_.Z)(),N=I[0],Z=(I[1],(0,h.P)(N)),E=(0,p.Ho)(b.params,w);function L(n){return function(){var e=(0,p.fC)(b.params,w,n);O(e.map((function(n){return n.state}))),A(j.SELECTING_NEXT_STATE)}}T===j.PLAYABLE&&"ONGOING"===w.result&&(n=(0,p.UP)(b.params,w));for(var G=f.GP.map((function(e){var a,t;return e===n?(a=!1,t="success"):E.some((function(n){return n==e}))?(a=!1,t="primary"):(a=!0,t="secondary"),(0,r.jsx)(o.Z,x({variant:t,disabled:a,onClick:L(e)},{children:Z(e)}),e)})),R=[],F=0;F<G.length;F+=6)R.push(G.slice(F,Math.min(F+6,G.length)));return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",x({className:"mt-3"},{children:(0,r.jsx)(m.j,{initialValue:b,onChange:function(n){t(n),A(j.CONFIGURING)}})})),(0,r.jsxs)(c.Z,x({className:"mt-3"},{children:[(0,r.jsx)(s.Z,x({eventKey:"macro",title:Z("Macro")},{children:(0,r.jsx)(y.w,{})})),(0,r.jsx)(s.Z,x({eventKey:"advice",title:Z("Advisor")},{children:(0,r.jsxs)("div",x({className:"mt-3"},{children:[(0,r.jsx)(o.Z,x({variant:"primary",onClick:function(){(0,f.OK)(b)?(S((0,f.kT)(b)),A(j.PLAYABLE)):alert(Z("InvalidParameters"))}},{children:"Start"})),(0,r.jsx)(g.r,{params:b.params,state:w}),T===j.PLAYABLE?(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(l.Z.Group,x({className:"mb-3"},{children:R.map((function(n){return(0,r.jsx)("div",x({className:"mt-1"},{children:(0,r.jsx)(u.Z,{children:n})}))}))})),(0,r.jsxs)(l.Z.Group,x({className:"mb-3"},{children:["AI: ",Z(n)]}))]}):T===j.SELECTING_NEXT_STATE?(0,r.jsx)(v.k,{options:P,onChange:function(n){S(n),A(j.PLAYABLE),O(void 0)}}):null,(0,r.jsx)(o.Z,x({variant:"danger",onClick:function(){(0,f.OK)(b)?(S((0,f.kT)(b)),A(j.PLAYABLE),O(void 0)):alert(Z("InvalidParameters"))}},{children:"Reset"}))]}))}))]}))]})}!function(n){n[n.CONFIGURING=0]="CONFIGURING",n[n.PLAYABLE=1]="PLAYABLE",n[n.SELECTING_NEXT_STATE=2]="SELECTING_NEXT_STATE"}(j||(j={})),t()}catch(w){t(w)}}))},989:(n,e,a)=>{a.d(e,{r:()=>o});var t=a(7557),r=a(9881),i=a(8441);function o(n){for(var e=n.params,a=n.state,o=(0,r.Z)(),c=o[0],s=(o[1],(0,i.P)(c)),l=[],u=0,d=["inner_quiet","innovation","veneration","muscle_memory","waste_not","great_strides","final_appraisal","manipulation"];u<d.length;u++){var _=d[u];a[_]>0&&l.push("".concat(s(_),": ").concat(a[_]))}return(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{children:[s("durability"),": ",a.durability," / ",e.item.max_durability]}),(0,t.jsxs)("p",{children:[s("progress"),": ",a.progress," / ",e.item.max_progress]}),(0,t.jsxs)("p",{children:[s("quality"),": ",a.quality," / ",e.item.max_quality]}),(0,t.jsxs)("p",{children:[s("cp"),": ",a.cp," / ",e.player.max_cp]}),(0,t.jsx)("p",{children:l.join(", ")}),(0,t.jsxs)("p",{children:[s("condition"),": ",s(a.condition)]})]})}},3216:(n,e,a)=>{a.d(e,{$:()=>u});var t=a(7557),r=a(5074),i=a(8759),o=a(9881),c=a(8441),s=function(){return s=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},s.apply(this,arguments)},l={en:"English",ja:"日本語",ko:"한국어"};function u(){var n=(0,o.Z)(),e=n[0],a=n[1];return(0,t.jsx)(r.Z,{children:c.J.map((function(n){return(0,t.jsx)(i.Z,s({variant:n===e?"secondary":"outline-secondary",onClick:function(e){return a(n)}},{children:l[n]}),n)}))})}},4388:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.d(e,{w:()=>b});var r=a(7557),i=a(9526),o=a(8759),c=a(9959),s=a(4936),l=a(9881),u=a(8918),d=a(9402),_=a(3425),f=a(8441),p=n([_]);_=(p.then?(await p)():p)[0];var h=function(){return h=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},h.apply(this,arguments)};function g(n){return void 0!==["Observe","TrickOfTheTrade","Innovation","Veneration","WasteNot","WasteNotII","GreatStrides","FinalAppraisal","Manipulation"].find((function(e){return n===e}))?2:3}function y(n,e){var a=e(n);return a.indexOf(" ")>=0?'"'.concat(a,'"'):a}function v(n,e){for(var a=0,t=0,r=[],i=0;i<n.length;i++){var o=n[i],c=i===n.length-1,s="/action ".concat(y(o,e)," <wait.").concat(g(o),">");a>=14&&(a>=15||!c)&&(t+=1,r.push("/echo Next <se.".concat(t,">")),r.push(""),a=0),r.push(s),a+=1}return r.join("\n")}function m(n){for(var e=[],a=0,t=n.split("\n");a<t.length;a++){var r=t[a];if((r=r.trim()).startsWith("/ac")){var i=r.indexOf('"'),o=void 0;if(i>=0){var c=r.lastIndexOf('"');o=r.substring(i,c+1)}else o=r.split(" ").map((function(n){return n.trim()})).filter((function(n){return n.length>0}))[1];for(var s=void 0,l=0,d=f.J;l<d.length;l++){for(var _=d[l],p=(0,f.P)(_),h=0,g=u.GP;h<g.length;h++){var v=g[h];if(o===y(v,p)){s=v;break}}if(s)break}s&&e.push(s)}}return e}function b(){var n=(0,i.useState)(""),e=n[0],a=n[1],t=(0,i.useState)(""),p=t[0],g=t[1],y=(0,i.useState)(!1),b=y[0],j=y[1],x=(0,l.Z)(),k=x[0],w=(x[1],(0,f.P)(k)),S=(0,s.Y)().getCraftConfig;function C(n){a(n),function(n){var e=S(),a=e.params,t=e.initialQuality,r=m(n);if(r){var i=(0,_.bi)(a,r,t),o=["".concat(w("SuccessRate"),": ").concat((100*i.success_rate).toFixed(2),"%"),"".concat(w("MaxQualityRate"),": ").concat((100*i.max_quality_rate).toFixed(2),"%"),"".concat(w("AverageQuality"),": ").concat(Math.round(i.average_quality*a.item.max_quality)),"".concat(w("MacroLength"),": ").concat(i.macro_length)];g(o.join("\n"))}}(n)}function T(n){return function(){var e,t=S(),r=t.params,i=t.initialQuality;if((0,u.OK)({params:r,initialQuality:i})){a(w("InProgress")),j(!0);for(var o=null!==(e=navigator.hardwareConcurrency)&&void 0!==e?e:1,c=Math.max(Math.floor(.8*o),1),s=[],l=0;l<c;l++)s.push((0,d.i)(r,i,n));Promise.all(s).then((function(n){var e=n.map((function(n){return(0,_.bi)(r,n,i)})).map((function(n){return n.success_rate<1?n.success_rate:n.max_quality_rate<1?1+n.average_quality:1+n.average_quality+1/n.macro_length})),a=Math.max.apply(Math,e);return n[e.findIndex((function(n){return n===a}))]})).then((function(n){C(v(n,w))})).catch((function(n){a(n)})).finally((function(){j(!1)}))}else alert(w("InvalidParameters"))}}return(0,r.jsxs)("div",h({className:"mt-3"},{children:[(0,r.jsx)(o.Z,h({variant:"primary",disabled:b,onClick:T(!1)},{children:w("PlanMacroFaster")})),(0,r.jsx)(o.Z,h({className:"ml-2",variant:"secondary",disabled:b,onClick:T(!0)},{children:w("PlanMacroBetter")})),(0,r.jsxs)(c.Z.Group,h({className:"mt-3",controlId:"macroOutput"},{children:[(0,r.jsx)(c.Z.Label,{children:w("OutputMacro")}),(0,r.jsx)(c.Z.Control,{as:"textarea",value:e,onChange:function(n){return C(n.target.value)},rows:15})]})),(0,r.jsxs)(c.Z.Group,h({className:"mt-3",controlId:"macroAnalysis"},{children:[(0,r.jsx)(c.Z.Label,{children:w("MacroAnalysis")}),(0,r.jsx)(c.Z.Control,{as:"textarea",value:p,rows:4,readOnly:!0})]}))]}))}t()}catch(j){t(j)}}))},6631:(n,e,a)=>{a.d(e,{k:()=>_});var t=a(7557),r=a(8759),i=a(102),o=a(9881),c=a(8918),s=a(8441),l=function(){return l=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},l.apply(this,arguments)};function u(n){return n.progress+n.quality+n.inner_quiet}function d(n,e){return"".concat(n,"-").concat(e)}function _(n){var e=n.options,a=n.onChange,_=(0,o.Z)(),f=_[0],p=(_[1],(0,s.P)(f)),h=Array.from(new Set(e.map(u)));h.sort((function(n,e){return e-n}));for(var g=c.fl.filter((function(n){return e.some((function(e){return e.condition===n}))})),y=new Map,v=0,m=g;v<m.length;v++)for(var b=m[v],j=0,x=h;j<x.length;j++)for(var k=x[j],w=function(n){u(n)===k&&n.condition===b&&y.set(d(u(n),n.condition),(0,t.jsx)(r.Z,l({onClick:function(){return a(n)}},{children:" "})))},S=0,C=e;S<C.length;S++)w(C[S]);var T=h.map((function(n,e){return 0===e?p("Success"):1===e?p("Failure"):"? ".concat(e-1)}));return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"#"}),g.map((function(n){return(0,t.jsx)("th",{children:p(n)},n)}))]})}),(0,t.jsx)("tbody",{children:h.map((function(n,e){var a=T[e];return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:a}),g.map((function(e){return(0,t.jsx)("td",{children:y.get(d(n,e))},d(n,e))}))]},e)}))})]})}},7179:(n,e,a)=>{a.d(e,{j:()=>_});var t=a(7557),r=a(9526),i=a(9959),o=a(1599),c=a(8048),s=a(9881),l=a(8441),u=function(){return u=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var r in e=arguments[a])Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},u.apply(this,arguments)},d={1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,"50★":55,"50★★":70,"50★★★":90,"50★★★★":110,51:120,52:125,53:130,54:133,55:136,56:139,57:142,58:145,59:148,60:150,"60★":160,"60★★":180,"60★★★":210,"60★★★★":250,61:260,62:265,63:270,64:273,65:276,66:279,67:282,68:285,69:288,70:290,"70★":300,"70★★":320,"70★★★":350,"70★★★★":380,71:390,72:395,73:400,74:403,75:406,76:409,77:412,78:415,79:418,80:430,"80★":440,"80★★":450,"80★★★":490,"80★★★ (Expert)":481,"80★★★★":515,"80★★★★★":516,81:517,82:520,83:525,84:530,85:535,86:540,87:545,88:550,89:555,90:560,"90★":570,"90★★":580,"90★★★":610,"90★★★ (Expert)":611,"90★★★★":620};function _(n){var e=n.initialValue,a=n.onChange,_=(0,s.Z)(),f=_[0],p=(_[1],(0,r.useState)(e.params.player.job_level.toString())),h=p[0],g=p[1],y=(0,r.useState)(e.params.player.craftsmanship.toString()),v=y[0],m=y[1],b=(0,r.useState)(e.params.player.control.toString()),j=b[0],x=b[1],k=(0,r.useState)(e.params.player.max_cp.toString()),w=k[0],S=k[1],C=(0,r.useState)(e.params.item.recipe_level),T=C[0],A=C[1],M=(0,r.useState)(e.params.item.max_durability.toString()),P=M[0],O=M[1],I=(0,r.useState)(e.params.item.max_progress.toString()),N=I[0],Z=I[1],E=(0,r.useState)(e.params.item.max_quality.toString()),L=E[0],G=E[1],R=(0,r.useState)(e.initialQuality.toString()),F=R[0],B=R[1],Q=(0,r.useState)(!e.params.player.unavailable_actions.includes("Manipulation")),q=Q[0],H=Q[1],J=(0,r.useState)(!e.params.player.unavailable_actions.includes("Reflect")),U=J[0],D=J[1],Y=(0,l.P)(f);function W(n){var e=[];return n.isManipulationAvailable||e.push("Manipulation"),n.isFirstTurnActionAvailable||(e.push("MuscleMemory"),e.push("Reflect")),e}var V={params:{player:{job_level:parseInt(h),craftsmanship:parseInt(v),control:parseInt(j),max_cp:parseInt(w),unavailable_actions:W({isFirstTurnActionAvailable:U,isManipulationAvailable:q})},item:{recipe_level:T,max_durability:parseInt(P),max_progress:parseInt(N),max_quality:parseInt(L)}},initialQuality:parseInt(F)};function K(n){a(u(u({},V),n))}function X(n){K({params:u(u({},V.params),n)})}function z(n){X({item:u(u({},V.params.item),n)})}function $(n){X({player:u(u({},V.params.player),n)})}function nn(n){$({unavailable_actions:W(u({isFirstTurnActionAvailable:U,isManipulationAvailable:q},n))})}function en(n,e){var a=parseInt(n);Number.isInteger(a)&&e(a)}var an=Object.keys(d);return an.sort((function(n,e){return d[n]-d[e]})),(0,t.jsxs)(i.Z,{children:[(0,t.jsxs)(o.Z,{children:[(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("ClassLevel")}),(0,t.jsx)(i.Z.Control,{value:h,onChange:function(n){g(n.target.value),en(n.target.value,(function(n){return $({job_level:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("Craftsmanship")}),(0,t.jsx)(i.Z.Control,{value:v,onChange:function(n){m(n.target.value),en(n.target.value,(function(n){return $({craftsmanship:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("Control")}),(0,t.jsx)(i.Z.Control,{value:j,onChange:function(n){x(n.target.value),en(n.target.value,(function(n){return $({control:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("MaxCP")}),(0,t.jsx)(i.Z.Control,{value:w,onChange:function(n){S(n.target.value),en(n.target.value,(function(n){return $({max_cp:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("AvailableActions")}),(0,t.jsx)(i.Z.Check,{type:"checkbox",checked:q,label:Y("Manipulation"),onChange:function(n){H(n.target.checked),nn({isManipulationAvailable:n.target.checked})}}),(0,t.jsx)(i.Z.Check,{type:"checkbox",checked:U,label:Y("Reflect")+"/"+Y("MuscleMemory"),onChange:function(n){D(n.target.checked),nn({isFirstTurnActionAvailable:n.target.checked})}})]}))]}),(0,t.jsxs)(o.Z,{children:[(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("RecipeLevel")}),(0,t.jsx)(i.Z.Control,u({as:"select",value:T,onChange:function(n){var e=parseInt(n.target.value);A(e),z({recipe_level:e})}},{children:an.map((function(n){return(0,t.jsx)("option",u({value:d[n]},{children:n}),n)}))}))]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("MaxDurability")}),(0,t.jsx)(i.Z.Control,{value:P,onChange:function(n){O(n.target.value),en(n.target.value,(function(n){return z({max_durability:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("MaxProgress")}),(0,t.jsx)(i.Z.Control,{value:N,onChange:function(n){Z(n.target.value),en(n.target.value,(function(n){return z({max_progress:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("MaxQuality")}),(0,t.jsx)(i.Z.Control,{value:L,onChange:function(n){G(n.target.value),en(n.target.value,(function(n){return z({max_quality:n})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:Y("InitialQuality")}),(0,t.jsx)(i.Z.Control,{value:F,onChange:function(n){B(n.target.value),en(n.target.value,(function(n){return K({initialQuality:n})}))}})]}))]})]})}},4936:(n,e,a)=>{a.d(e,{Y:()=>r});var t="ffxiv-crafter-craft-configuration";function r(){return{getCraftConfig:function(){var n;return(n=localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):{params:{player:{job_level:80,craftsmanship:2978,control:2787,max_cp:655,unavailable_actions:[]},item:{recipe_level:516,max_durability:55,max_progress:5059,max_quality:15474}},initialQuality:0}).params.player.unavailable_actions||(n.params.player.unavailable_actions=[]),n},setCraftConfig:function(n){localStorage.setItem(t,JSON.stringify(n))}}}},9881:(n,e,a)=>{a.d(e,{Z:()=>r});var t="ffxiv-crafter-language";function r(){var n=new URLSearchParams(window.location.search.substring(1)).get("lang");return n||(n=localStorage.getItem(t)),n||(n="en"),[n,function(n){localStorage.setItem(t,n),location.search="?lang=".concat(n)}]}},2629:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.r(e);var r=a(7557),i=a(9526),o=a(3961),c=a(8957),s=n([c]);c=(s.then?(await s)():s)[0],o.render((0,r.jsx)(i.StrictMode,{children:(0,r.jsx)(c.g,{})}),document.getElementById("root")),t()}catch(n){t(n)}}))},8918:(n,e,a)=>{a.d(e,{GP:()=>r,OK:()=>o,fl:()=>t,kT:()=>i});var t=["NORMAL","GOOD","EXCELLENT","POOR","CENTRED","PLIANT","STURDY","MALLEABLE","PRIMED"],r=["BasicSynthesis","BasicTouch","MastersMend","DelicateSynthesis","CarefulSynthesis","Groundwork","Observe","ByregotBlessing","PreparatoryTouch","RapidSynthesis","IntensiveSynthesis","HastyTouch","PreciseTouch","TrickOfTheTrade","Innovation","Veneration","MuscleMemory","FocusedSynthesis","StandardTouch","FocusedTouch","Reflect","WasteNot","WasteNotII","PrudentTouch","GreatStrides","FinalAppraisal","Manipulation","AdvancedTouch","PrudentSynthesis","TrainedFinesse"];function i(n){var e=n.params,a=n.initialQuality;return{durability:e.item.max_durability,progress:0,quality:a,cp:e.player.max_cp,condition:"NORMAL",inner_quiet:0,innovation:0,veneration:0,muscle_memory:0,waste_not:0,great_strides:0,final_appraisal:0,manipulation:0,standard_touch_ready:!1,advanced_touch_ready:!1,turn:1,result:"ONGOING"}}function o(n){return!(n.initialQuality<0||n.initialQuality>n.params.item.max_quality||n.params.player.job_level<1||n.params.player.job_level>90||n.params.player.craftsmanship<0||n.params.player.control<0||n.params.player.max_cp<0||n.params.item.recipe_level<1||n.params.item.max_durability<=0||n.params.item.max_progress<=0||n.params.item.max_quality<=0)}},9402:(n,e,a)=>{var t,r;function i(n,e,a){return r=[t.PLAN_MACRO,n,e,a],i=new Worker("./worker.js"),new Promise((function(n,e){i.onmessage=function(e){"worker ready"!==e.data?(i.terminate(),n(e.data)):i.postMessage(r)},i.onerror=function(n){i.terminate(),e(n)},i.onmessageerror=function(){i.terminate()}}));var r,i}a.d(e,{i:()=>i}),(r=t||(t={}))[r.PLAN_MACRO=0]="PLAN_MACRO",r[r.SEARCH_BEST_MOVE=1]="SEARCH_BEST_MOVE"},3425:(n,e,a)=>{a.a(n,(async(n,t)=>{try{a.d(e,{Ho:()=>s,UP:()=>o,bi:()=>l,fC:()=>c});var r=a(5456),i=n([r]);function o(n,e){return JSON.parse(r.UP(JSON.stringify(n),JSON.stringify(e)))}function c(n,e,a){var t=r.fC(JSON.stringify(n),JSON.stringify(e),a);return JSON.parse(t)}function s(n,e){var a=r.Ho(JSON.stringify(n),JSON.stringify(e));return JSON.parse(a)}function l(n,e,a){var t=r.bi(JSON.stringify(n),JSON.stringify(e),BigInt(a));return JSON.parse(t)}r=(i.then?(await i)():i)[0],t()}catch(u){t(u)}}))},8441:(n,e,a)=>{a.d(e,{J:()=>t,P:()=>i});var t=["en","ja","ko"],r={durability:{en:"Durability",ja:"耐久",ko:"내구"},progress:{en:"Progress",ja:"工数",ko:"공정"},quality:{en:"Quality",ja:"品質",ko:"품질"},cp:{en:"CP",ja:"CP",ko:"CP"},condition:{en:"Condition",ja:"状態",ko:"상태"},BasicSynthesis:{en:"Basic Synthesis",ja:"作業",ko:"작업"},BasicTouch:{en:"Basic Touch",ja:"加工",ko:"가공"},MastersMend:{en:"Master's Mend",ja:"マスターズメンド",ko:"능숙한 땜질"},InnerQuiet:{en:"Inner Quiet",ja:"インナークワイエット",ko:"정신 집중"},DelicateSynthesis:{en:"Delicate Synthesis",ja:"精密作業",ko:"정밀 작업"},CarefulSynthesis:{en:"Careful Synthesis",ja:"模範作業",ko:"모범 작업"},Groundwork:{en:"Groundwork",ja:"下地作業",ko:"밑작업"},Observe:{en:"Observe",ja:"経過観察",ko:"경과 관찰"},ByregotBlessing:{en:"Byregot's Blessing",ja:"ビエルゴの祝福",ko:"비레고의 축복"},PreparatoryTouch:{en:"Preparatory Touch",ja:"下地加工",ko:"밑가공"},RapidSynthesis:{en:"Rapid Synthesis",ja:"突貫作業",ko:"강행 작업"},IntensiveSynthesis:{en:"Intensive Synthesis",ja:"集中作業",ko:"집중 작업"},HastyTouch:{en:"Hasty Touch",ja:"ヘイスティタッチ",ko:"성급한 손길"},PreciseTouch:{en:"Precise Touch",ja:"集中加工",ko:"집중 가공"},PatientTouch:{en:"Patient Touch",ja:"専心加工",ko:"전념 가공"},TrickOfTheTrade:{en:"Tricks of the Trade",ja:"秘訣",ko:"비결"},Innovation:{en:"Innovation",ja:"イノベーション",ko:"혁신"},Veneration:{en:"Veneration",ja:"ヴェネレーション",ko:"공경"},MuscleMemory:{en:"Muscle Memory",ja:"確信",ko:"확신"},FocusedSynthesis:{en:"Focused Synthesis",ja:"注視作業",ko:"주시 작업"},StandardTouch:{en:"Standard Touch",ja:"中級加工",ko:"중급 가공"},FocusedTouch:{en:"Focused Touch",ja:"注視加工",ko:"주시 가공"},Reflect:{en:"Reflect",ja:"真価",ko:"진가"},WasteNot:{en:"Waste Not",ja:"倹約",ko:"근검절약"},WasteNotII:{en:"Waste Not II",ja:"長期倹約",ko:"장기 절약"},PrudentTouch:{en:"Prudent Touch",ja:"倹約加工",ko:"절약 가공"},GreatStrides:{en:"Great Strides",ja:"グレートストライド",ko:"장족의 발전"},FinalAppraisal:{en:"Final Appraisal",ja:"最終確認",ko:"최종 확인"},Manipulation:{en:"Manipulation",ja:"マニピュレーション",ko:"교묘한 손놀림"},AdvancedTouch:{en:"Advanced Touch",ja:"上級加工",ko:"상급 가공"},PrudentSynthesis:{en:"Prudent Synthesis",ja:"倹約作業",ko:"절약 작업"},TrainedFinesse:{en:"Trained Finesse",ja:"匠の神業",ko:"장인의 황금손"},NORMAL:{en:"Normal",ja:"通常",ko:"보통"},GOOD:{en:"Good",ja:"高品質",ko:"고품질"},EXCELLENT:{en:"Excellent",ja:"最高品質",ko:"최고품질"},POOR:{en:"Poor",ja:"低品質",ko:"저품질"},CENTRED:{en:"Centred",ja:"安定",ko:"안정"},PLIANT:{en:"Pliant",ja:"高能率",ko:"고효율"},STURDY:{en:"Sturdy",ja:"頑丈",ko:"견고"},MALLEABLE:{en:"Malleable",ja:"高進捗",ko:"빠른 진행"},PRIMED:{en:"Primed",ja:"長持続",ko:"장기 지속"},inner_quiet:{en:"Inner Quiet",ja:"インナークワイエット",ko:"정신 집중"},innovation:{en:"Innovation",ja:"イノベーション",ko:"혁신"},veneration:{en:"Veneration",ja:"ヴェネレーション",ko:"공경"},muscle_memory:{en:"Muscle Memory",ja:"確信",ko:"확신"},waste_not:{en:"Waste Not",ja:"倹約",ko:"근검절약"},great_strides:{en:"Great Strides",ja:"グレートストライド",ko:"장족의 발전"},final_appraisal:{en:"Final Appraisal",ja:"最終確認",ko:"최종 확인"},manipulation:{en:"Manipulation",ja:"マニピュレーション",ko:"교묘한 손놀림"},EnableAIAdvice:{en:"Enable AI Advice",ja:"AIの候補を表示",ko:"AI의 후보를 표시"},Success:{en:"Success",ja:"成功",ko:"성공"},Failure:{en:"Failure",ja:"失敗",ko:"실패"},ClassLevel:{en:"Class Level",ja:"クラフターレベル",ko:"제작직 레벨"},Craftsmanship:{en:"Craftsmanship",ja:"作業精度",ko:"작업 숙련도"},Control:{en:"Control",ja:"加工精度",ko:"가공 숙련도"},MaxCP:{en:"Max CP",ja:"最大CP",ko:"최대 CP"},RecipeLevel:{en:"Recipe Level",ja:"レシピレベル",ko:"레시피 레벨"},MaxDurability:{en:"Durability",ja:"耐久",ko:"내구도"},MaxProgress:{en:"Max Progress",ja:"必要工数",ko:"작업량"},MaxQuality:{en:"Max Quality",ja:"最大品質",ko:"최대 품질"},InitialQuality:{en:"Initial Quality",ja:"初期品質",ko:"초기 품질"},IsExpert:{en:"Expert Recipe",ja:"高難易度レシピ",ko:"고난이도 레시피"},Advisor:{en:"Advisor",ja:"アドバイザー",ko:"어드바이저"},Macro:{en:"Macro",ja:"マクロ",ko:"매크로"},PlanMacroFaster:{en:"Generate Macro (faster)",ja:"マクロ作成 (高速)",ko:"매크로 작성 (고속)"},PlanMacroBetter:{en:"Generate Macro (better)",ja:"マクロ作成 (高性能)",ko:"매크로 작성 (고성능)"},SuccessRate:{en:"success rate",ja:"製作成功確率",ko:"제작 성공 확률"},MaxQualityRate:{en:"max quality rate",ja:"最高品質達成率",ko:"최고품질 달성 확률"},AverageQuality:{en:"average quality",ja:"平均品質",ko:"평균 품질"},MacroLength:{en:"macro length",ja:"マクロの長さ",ko:"매크로 길이"},InProgress:{en:"In progress...",ja:"計算中...",ko:"계산중..."},OutputMacro:{en:"Macro",ja:"マクロ",ko:"매크로"},MacroAnalysis:{en:"Macro Quality",ja:"マクロ評価",ko:"매크로의 품질"},InvalidParameters:{en:"Invalid Parameters",ja:"パラメータの値が正しくありません",ko:"파라미터가 올바르지 않습니다"},AvailableActions:{en:"Available Actions",ja:"使用可能なアクション",ko:"사용 가능한 액션"}};function i(n){return function(e){if(void 0!==e)return e in r?n in r[e]?r[e][n]:"err: language ".concat(n," does not exist for key ").concat(e,"."):"err: key ".concat(e," does not exist.")}}},6184:(n,e,a)=>{var t=a(7729);n.exports=a.v(e,n.id,"e38ae857b88fee6fd3d4",{"./ffxiv_crafter_rust_bg.js":{__wbg_randomFillSync_dc1e9a60c158336d:t.F,__wbindgen_object_drop_ref:t.ug,__wbg_getRandomValues_37fa2ca9e4e07fab:t.TE,__wbg_crypto_c48a774b022d20ac:t.Sc,__wbindgen_is_object:t.Wl,__wbg_process_298734cf255a885d:t.Vb,__wbg_versions_e2e78e134e3e5d01:t.cU,__wbg_node_1cd7a5d853dbea79:t.Bj,__wbindgen_is_string:t.eY,__wbg_require_8f08ceecec0f4fee:t.Wc,__wbindgen_string_new:t.h4,__wbg_msCrypto_bcb970640f50a1e8:t.gj,__wbg_instanceof_Window_c5579e140698a9dc:t.yR,__wbg_now_c97f243e7947c4ac:t.vN,__wbg_performance_01a75a1b70b2c191:t.cN,__wbindgen_is_function:t.o$,__wbg_newnoargs_c9e6043b8ad84109:t.Yh,__wbg_call_557a2f2deacc4912:t.YN,__wbg_self_742dd6eab3e9211e:t.HH,__wbg_window_c409e731db53a0e2:t.Oy,__wbg_globalThis_b70c095388441f2d:t.zp,__wbg_global_1c72617491ed7194:t.QQ,__wbindgen_is_undefined:t.XP,__wbg_call_587b30eea3e09332:t.dj,__wbg_buffer_55ba7a6b1b92e2ac:t.OQ,__wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b:t.eH,__wbg_new_09938a7d020f049b:t.Kz,__wbg_set_3698e3ca519b3c3c:t.JI,__wbg_newwithlength_89eeca401d8918c2:t.tf,__wbg_subarray_d82be056deb4ad27:t.BE,__wbindgen_object_clone_ref:t.m_,__wbindgen_throw:t.Or,__wbindgen_memory:t.oH}})}}]);
//# sourceMappingURL=629.js.map