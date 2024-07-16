"use strict";(self.webpackChunkffxiv_crafter_frontend=self.webpackChunkffxiv_crafter_frontend||[]).push([[629],{8957:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.d(n,{g:()=>_});var r=a(7557),i=a(9526),o=a(8611),c=a(3216),s=a(8441),l=a(9881),u=a(730),d=e([o]);o=(d.then?(await d)():d)[0];var f=function(){return f=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},f.apply(this,arguments)};function _(e){var n=(0,l.Z)(),a=n[0],t=(n[1],(0,i.useState)(!0)),d=t[0],_=t[1],p=(0,s.P)(a);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",f({className:"m-5"},{children:[d?(0,r.jsxs)(u.Z,f({variant:"primary",onClose:function(){return _(!1)},dismissible:!0},{children:[(0,r.jsx)("p",{children:p("DawntrailReleased")}),(0,r.jsx)("div",{children:(0,r.jsx)(u.Z.Link,f({href:"https://github.com/amylase/ffxiv-crafter-rust/issues/"},{children:p("ReportBug")}))}),(0,r.jsxs)("div",{children:[(0,r.jsx)(u.Z.Link,f({href:"https://www.shigure-hash.com/ffxiv-crafter-rust/endwalker/"},{children:p("EndwalkerHere")})),(0,r.jsxs)("span",{children:[" ",p("EndwalkerForKoreaChina")]})]})]})):null,(0,r.jsx)(c.$,{}),(0,r.jsx)(o.l,{})]})),(0,r.jsxs)("div",f({className:"ml-5 mb-2"},{children:["© 2024 ",(0,r.jsx)("a",f({href:"https://github.com/amylase"},{children:"amylase"}))," (Shigure Hash@Typhon) and contributors. ",(0,r.jsx)("a",f({href:"https://github.com/amylase/ffxiv-crafter-rust/issues"},{children:p("ReportBug")}))]}))]})}t()}catch(p){t(p)}}))},8611:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.d(n,{l:()=>k});var r=a(7557),i=a(9526),o=a(8759),c=a(8101),s=a(630),l=a(7887),u=a(5074),d=a(4936),f=a(9881),_=a(8918),p=a(3425),h=a(8441),g=a(989),m=a(4388),v=a(6631),y=a(7179),b=e([p,m]);[p,m]=b.then?(await b)():b;var j,x=function(){return x=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},x.apply(this,arguments)};function k(){var e,n=(0,d.Y)(),a=n.getCraftConfig,t=n.setCraftConfig,b=a(),k=(0,i.useState)((0,_.kT)(b)),w=k[0],C=k[1],S=(0,i.useState)(j.CONFIGURING),T=S[0],M=S[1],P=(0,i.useState)(void 0),O=P[0],I=P[1],A=(0,f.Z)(),Z=A[0],N=(A[1],(0,h.P)(Z)),E=(0,p.Ho)(b.params,w);function L(e){return function(){var n=(0,p.fC)(b.params,w,e);I(n.map((function(e){return e.state}))),M(j.SELECTING_NEXT_STATE)}}T===j.PLAYABLE&&"ONGOING"===w.result&&(e=(0,p.UP)(b.params,w));for(var R=_.GP.map((function(n){var a,t;return n===e?(a=!1,t="success"):E.some((function(e){return e==n}))?(a=!1,t="primary"):(a=!0,t="secondary"),(0,r.jsx)(o.Z,x({variant:t,disabled:a,onClick:L(n)},{children:N(n)}),n)})),G=[],q=0;q<R.length;q+=6)G.push(R.slice(q,Math.min(q+6,R.length)));return(0,r.jsxs)("div",{children:[(0,r.jsx)("div",x({className:"mt-3"},{children:(0,r.jsx)(y.j,{initialValue:b,onChange:function(e){t(e),M(j.CONFIGURING)}})})),(0,r.jsxs)(c.Z,x({className:"mt-3"},{children:[(0,r.jsx)(s.Z,x({eventKey:"macro",title:N("Macro")},{children:(0,r.jsx)(m.w,{})})),(0,r.jsx)(s.Z,x({eventKey:"advice",title:N("Advisor")},{children:(0,r.jsxs)("div",x({className:"mt-3"},{children:[(0,r.jsx)(o.Z,x({variant:"primary",onClick:function(){(0,_.OK)(b)?(C((0,_.kT)(b)),M(j.PLAYABLE)):alert(N("InvalidParameters"))}},{children:"Start"})),(0,r.jsx)(g.r,{params:b.params,state:w}),T===j.PLAYABLE?(0,r.jsxs)(l.Z,{children:[(0,r.jsx)(l.Z.Group,x({className:"mb-3"},{children:G.map((function(e){return(0,r.jsx)("div",x({className:"mt-1"},{children:(0,r.jsx)(u.Z,{children:e})}))}))})),(0,r.jsxs)(l.Z.Group,x({className:"mb-3"},{children:["AI: ",N(e)]}))]}):T===j.SELECTING_NEXT_STATE?(0,r.jsx)(v.k,{options:O,onChange:function(e){C(e),M(j.PLAYABLE),I(void 0)}}):null,(0,r.jsx)(o.Z,x({variant:"danger",onClick:function(){(0,_.OK)(b)?(C((0,_.kT)(b)),M(j.PLAYABLE),I(void 0)):alert(N("InvalidParameters"))}},{children:"Reset"}))]}))}))]}))]})}!function(e){e[e.CONFIGURING=0]="CONFIGURING",e[e.PLAYABLE=1]="PLAYABLE",e[e.SELECTING_NEXT_STATE=2]="SELECTING_NEXT_STATE"}(j||(j={})),t()}catch(w){t(w)}}))},989:(e,n,a)=>{a.d(n,{r:()=>o});var t=a(7557),r=a(9881),i=a(8441);function o(e){for(var n=e.params,a=e.state,o=(0,r.Z)(),c=o[0],s=(o[1],(0,i.P)(c)),l=[],u=0,d=["inner_quiet","innovation","veneration","muscle_memory","waste_not","great_strides","final_appraisal","manipulation","expedience","trained_perfection"];u<d.length;u++){var f=d[u];a[f]>0&&l.push("".concat(s(f),": ").concat(a[f]))}return(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{children:[s("durability"),": ",a.durability," / ",n.item.max_durability]}),(0,t.jsxs)("p",{children:[s("progress"),": ",a.progress," / ",n.item.max_progress]}),(0,t.jsxs)("p",{children:[s("quality"),": ",a.quality," / ",n.item.max_quality]}),(0,t.jsxs)("p",{children:[s("cp"),": ",a.cp," / ",n.player.max_cp]}),(0,t.jsx)("p",{children:l.join(", ")}),(0,t.jsxs)("p",{children:[s("condition"),": ",s(a.condition)]})]})}},3216:(e,n,a)=>{a.d(n,{$:()=>u});var t=a(7557),r=a(5074),i=a(8759),o=a(9881),c=a(8441),s=function(){return s=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},s.apply(this,arguments)},l={en:"English",ja:"日本語",ko:"한국어"};function u(){var e=(0,o.Z)(),n=e[0],a=e[1];return(0,t.jsx)(r.Z,{children:c.J.map((function(e){return(0,t.jsx)(i.Z,s({variant:e===n?"secondary":"outline-secondary",onClick:function(n){return a(e)}},{children:l[e]}),e)}))})}},4388:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.d(n,{w:()=>b});var r=a(7557),i=a(9526),o=a(8759),c=a(7887),s=a(4936),l=a(9881),u=a(8918),d=a(9402),f=a(3425),_=a(8441),p=e([f]);f=(p.then?(await p)():p)[0];var h=function(){return h=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},h.apply(this,arguments)};function g(e){return void 0!==["Observe","TrickOfTheTrade","Innovation","Veneration","WasteNot","WasteNotII","GreatStrides","FinalAppraisal","Manipulation"].find((function(n){return e===n}))?2:3}function m(e,n){var a=n(e);return a.indexOf(" ")>=0?'"'.concat(a,'"'):a}function v(e,n){for(var a=0,t=0,r=[],i=0;i<e.length;i++){var o=e[i],c=i===e.length-1,s="/action ".concat(m(o,n)," <wait.").concat(g(o),">");a>=14&&(a>=15||!c)&&(t+=1,r.push("/echo Next <se.".concat(t,">")),r.push(""),a=0),r.push(s),a+=1}return r.join("\n")}function y(e){for(var n=[],a=0,t=e.split("\n");a<t.length;a++){var r=t[a];if((r=r.trim()).startsWith("/ac")){var i=r.indexOf('"'),o=void 0;if(i>=0){var c=r.lastIndexOf('"');o=r.substring(i,c+1)}else o=r.split(" ").map((function(e){return e.trim()})).filter((function(e){return e.length>0}))[1];for(var s=void 0,l=0,d=_.J;l<d.length;l++){for(var f=d[l],p=(0,_.P)(f),h=0,g=u.GP;h<g.length;h++){var v=g[h];if(o===m(v,p)){s=v;break}}if(s)break}s&&n.push(s)}}return n}function b(){var e=(0,i.useState)(""),n=e[0],a=e[1],t=(0,i.useState)(""),p=t[0],g=t[1],m=(0,i.useState)(!1),b=m[0],j=m[1],x=(0,l.Z)(),k=x[0],w=(x[1],(0,_.P)(k)),C=(0,s.Y)().getCraftConfig;function S(e){a(e),function(e){var n=C(),a=n.params,t=n.initialQuality,r=y(e);if(r){var i=(0,f.bi)(a,r,t),o=["".concat(w("SuccessRate"),": ").concat((100*i.success_rate).toFixed(2),"%"),"".concat(w("MaxQualityRate"),": ").concat((100*i.max_quality_rate).toFixed(2),"%"),"".concat(w("AverageQuality"),": ").concat(Math.round(i.average_quality*a.item.max_quality)),"".concat(w("MacroLength"),": ").concat(i.macro_length)];g(o.join("\n"))}}(e)}function T(e){return function(){var n,t=C(),r=t.params,i=t.initialQuality;if((0,u.OK)({params:r,initialQuality:i})){a(w("InProgress")),j(!0);for(var o=null!==(n=navigator.hardwareConcurrency)&&void 0!==n?n:1,c=e?.8:.4,s=Math.max(Math.floor(o*c),1),l=[],_=0;_<s;_++)l.push((0,d.i)(r,i,e));Promise.all(l).then((function(e){var n=e.map((function(e){return(0,f.bi)(r,e,i)})).map((function(e){return e.success_rate<1?e.success_rate:e.max_quality_rate<1?1+e.average_quality:1+e.average_quality+1/e.macro_length})),a=Math.max.apply(Math,n);return e[n.findIndex((function(e){return e===a}))]})).then((function(e){S(v(e,w))})).catch((function(e){a(e)})).finally((function(){j(!1)}))}else alert(w("InvalidParameters"))}}return(0,r.jsxs)("div",h({className:"mt-3"},{children:[(0,r.jsx)(o.Z,h({variant:"primary",disabled:b,onClick:T(!1)},{children:w("PlanMacroFaster")})),(0,r.jsx)(o.Z,h({className:"ml-2",variant:"secondary",disabled:b,onClick:T(!0)},{children:w("PlanMacroBetter")})),(0,r.jsxs)(c.Z.Group,h({className:"mt-3",controlId:"macroOutput"},{children:[(0,r.jsx)(c.Z.Label,{children:w("OutputMacro")}),(0,r.jsx)(c.Z.Control,{as:"textarea",value:n,onChange:function(e){return S(e.target.value)},rows:15})]})),(0,r.jsxs)(c.Z.Group,h({className:"mt-3",controlId:"macroAnalysis"},{children:[(0,r.jsx)(c.Z.Label,{children:w("MacroAnalysis")}),(0,r.jsx)(c.Z.Control,{as:"textarea",value:p,rows:4,readOnly:!0})]}))]}))}t()}catch(j){t(j)}}))},6631:(e,n,a)=>{a.d(n,{k:()=>f});var t=a(7557),r=a(8759),i=a(102),o=a(9881),c=a(8918),s=a(8441),l=function(){return l=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},l.apply(this,arguments)};function u(e){return e.progress+e.quality+e.inner_quiet}function d(e,n){return"".concat(e,"-").concat(n)}function f(e){var n=e.options,a=e.onChange,f=(0,o.Z)(),_=f[0],p=(f[1],(0,s.P)(_)),h=Array.from(new Set(n.map(u)));h.sort((function(e,n){return n-e}));for(var g=c.fl.filter((function(e){return n.some((function(n){return n.condition===e}))})),m=new Map,v=0,y=g;v<y.length;v++)for(var b=y[v],j=0,x=h;j<x.length;j++)for(var k=x[j],w=function(e){u(e)===k&&e.condition===b&&m.set(d(u(e),e.condition),(0,t.jsx)(r.Z,l({onClick:function(){return a(e)}},{children:" "})))},C=0,S=n;C<S.length;C++)w(S[C]);var T=h.map((function(e,n){return 0===n?p("Success"):1===n?p("Failure"):"? ".concat(n-1)}));return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"#"}),g.map((function(e){return(0,t.jsx)("th",{children:p(e)},e)}))]})}),(0,t.jsx)("tbody",{children:h.map((function(e,n){var a=T[n];return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:a}),g.map((function(n){return(0,t.jsx)("td",{children:m.get(d(e,n))},d(e,n))}))]},n)}))})]})}},7179:(e,n,a)=>{a.d(n,{j:()=>f});var t=a(7557),r=a(9526),i=a(7887),o=a(1599),c=a(8048),s=a(9881),l=a(8441),u=function(){return u=Object.assign||function(e){for(var n,a=1,t=arguments.length;a<t;a++)for(var r in n=arguments[a])Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);return e},u.apply(this,arguments)},d={1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,"50★":55,"50★★":70,"50★★★":90,"50★★★★":110,51:115,52:125,53:130,54:133,55:136,56:139,57:142,58:145,59:148,60:150,"60★":160,"60★★":180,"60★★★":210,"60★★★★":250,61:260,62:265,63:270,64:273,65:276,66:279,67:282,68:285,69:288,70:290,"70★":300,"70★★":320,"70★★★":350,"70★★★★":380,71:390,72:395,73:400,74:403,75:406,76:409,77:412,78:415,79:418,80:430,"80★":440,"80★★":450,"80★★★":490,"80★★★ (Expert)":481,"80★★★★":515,"80★★★★★":516,81:517,82:520,83:525,84:530,85:535,86:540,87:545,88:550,89:555,90:560,"90★":570,"90★★":580,"90★★★":610,"90★★★ (Expert)":611,"90★★★★":620,"90★★★★ (Expert)":641,91:650,92:653,93:656,94:660,95:665,96:670,97:675,98:680,99:685,100:690,"100★":700,"100★★":710};function f(e){var n=e.initialValue,a=e.onChange,f=(0,s.Z)(),_=f[0],p=(f[1],(0,r.useState)(n.params.player.job_level.toString())),h=p[0],g=p[1],m=(0,r.useState)(n.params.player.craftsmanship.toString()),v=m[0],y=m[1],b=(0,r.useState)(n.params.player.control.toString()),j=b[0],x=b[1],k=(0,r.useState)(n.params.player.max_cp.toString()),w=k[0],C=k[1],S=(0,r.useState)(n.params.item.recipe_level),T=S[0],M=S[1],P=(0,r.useState)(n.params.item.max_durability.toString()),O=P[0],I=P[1],A=(0,r.useState)(n.params.item.max_progress.toString()),Z=A[0],N=A[1],E=(0,r.useState)(n.params.item.max_quality.toString()),L=E[0],R=E[1],G=(0,r.useState)(n.initialQuality.toString()),q=G[0],B=G[1],D=(0,r.useState)(!n.params.player.unavailable_actions.includes("Manipulation")),F=D[0],Q=D[1],H=(0,r.useState)(!n.params.player.unavailable_actions.includes("Reflect")),Y=H[0],J=H[1],U=(0,l.P)(_);function W(e){var n=[];return e.isManipulationAvailable||n.push("Manipulation"),e.isFirstTurnActionAvailable||(n.push("MuscleMemory"),n.push("Reflect")),n}var X={params:{player:{job_level:parseInt(h),craftsmanship:parseInt(v),control:parseInt(j),max_cp:parseInt(w),unavailable_actions:W({isFirstTurnActionAvailable:Y,isManipulationAvailable:F})},item:{recipe_level:T,max_durability:parseInt(O),max_progress:parseInt(Z),max_quality:parseInt(L)}},initialQuality:parseInt(q)};function K(e){a(u(u({},X),e))}function V(e){K({params:u(u({},X.params),e)})}function $(e){V({item:u(u({},X.params.item),e)})}function z(e){V({player:u(u({},X.params.player),e)})}function ee(e){z({unavailable_actions:W(u({isFirstTurnActionAvailable:Y,isManipulationAvailable:F},e))})}function ne(e,n){var a=parseInt(e);Number.isInteger(a)&&n(a)}var ae=Object.keys(d);return ae.sort((function(e,n){return d[e]-d[n]})),(0,t.jsxs)(i.Z,{children:[(0,t.jsxs)(o.Z,{children:[(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("ClassLevel")}),(0,t.jsx)(i.Z.Control,{value:h,onChange:function(e){g(e.target.value),ne(e.target.value,(function(e){return z({job_level:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("Craftsmanship")}),(0,t.jsx)(i.Z.Control,{value:v,onChange:function(e){y(e.target.value),ne(e.target.value,(function(e){return z({craftsmanship:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("Control")}),(0,t.jsx)(i.Z.Control,{value:j,onChange:function(e){x(e.target.value),ne(e.target.value,(function(e){return z({control:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("MaxCP")}),(0,t.jsx)(i.Z.Control,{value:w,onChange:function(e){C(e.target.value),ne(e.target.value,(function(e){return z({max_cp:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("AvailableActions")}),(0,t.jsx)(i.Z.Check,{type:"checkbox",checked:F,label:U("Manipulation"),onChange:function(e){Q(e.target.checked),ee({isManipulationAvailable:e.target.checked})}}),(0,t.jsx)(i.Z.Check,{type:"checkbox",checked:Y,label:U("Reflect")+"/"+U("MuscleMemory"),onChange:function(e){J(e.target.checked),ee({isFirstTurnActionAvailable:e.target.checked})}})]}))]}),(0,t.jsxs)(o.Z,{children:[(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("RecipeLevel")}),(0,t.jsx)(i.Z.Control,u({as:"select",value:T,onChange:function(e){var n=parseInt(e.target.value);M(n),$({recipe_level:n})}},{children:ae.map((function(e){return(0,t.jsx)("option",u({value:d[e]},{children:e}),e)}))}))]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("MaxDurability")}),(0,t.jsx)(i.Z.Control,{value:O,onChange:function(e){I(e.target.value),ne(e.target.value,(function(e){return $({max_durability:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("MaxProgress")}),(0,t.jsx)(i.Z.Control,{value:Z,onChange:function(e){N(e.target.value),ne(e.target.value,(function(e){return $({max_progress:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("MaxQuality")}),(0,t.jsx)(i.Z.Control,{value:L,onChange:function(e){R(e.target.value),ne(e.target.value,(function(e){return $({max_quality:e})}))}})]})),(0,t.jsxs)(i.Z.Group,u({as:c.Z},{children:[(0,t.jsx)(i.Z.Label,{children:U("InitialQuality")}),(0,t.jsx)(i.Z.Control,{value:q,onChange:function(e){B(e.target.value),ne(e.target.value,(function(e){return K({initialQuality:e})}))}})]}))]})]})}},4936:(e,n,a)=>{a.d(n,{Y:()=>r});var t="ffxiv-crafter-craft-configuration";function r(){return{getCraftConfig:function(){var e;return(e=localStorage.getItem(t)?JSON.parse(localStorage.getItem(t)):{params:{player:{job_level:80,craftsmanship:2978,control:2787,max_cp:655,unavailable_actions:[]},item:{recipe_level:516,max_durability:55,max_progress:5059,max_quality:15474}},initialQuality:0}).params.player.unavailable_actions||(e.params.player.unavailable_actions=[]),e},setCraftConfig:function(e){localStorage.setItem(t,JSON.stringify(e))}}}},9881:(e,n,a)=>{a.d(n,{Z:()=>r});var t="ffxiv-crafter-language";function r(){var e=new URLSearchParams(window.location.search.substring(1)).get("lang");return e||(e=localStorage.getItem(t)),e||(e="en"),[e,function(e){localStorage.setItem(t,e),location.search="?lang=".concat(e)}]}},2629:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.r(n);var r=a(7557),i=a(9526),o=a(3961),c=a(8957),s=e([c]);c=(s.then?(await s)():s)[0],o.render((0,r.jsx)(i.StrictMode,{children:(0,r.jsx)(c.g,{})}),document.getElementById("root")),t()}catch(e){t(e)}}))},8918:(e,n,a)=>{a.d(n,{GP:()=>r,OK:()=>o,fl:()=>t,kT:()=>i});var t=["NORMAL","GOOD","EXCELLENT","POOR","CENTRED","PLIANT","STURDY","MALLEABLE","PRIMED","GOOD_OMEN"],r=["BasicSynthesis","BasicTouch","MastersMend","DelicateSynthesis","CarefulSynthesis","Groundwork","Observe","ByregotBlessing","PreparatoryTouch","RapidSynthesis","IntensiveSynthesis","HastyTouch","PreciseTouch","TrickOfTheTrade","Innovation","Veneration","MuscleMemory","StandardTouch","Reflect","WasteNot","WasteNotII","PrudentTouch","GreatStrides","FinalAppraisal","Manipulation","AdvancedTouch","PrudentSynthesis","TrainedFinesse","RefinedTouch","DaringTouch","ImmaculateMend","TrainedPerfection"];function i(e){var n=e.params,a=e.initialQuality;return{durability:n.item.max_durability,progress:0,quality:a,cp:n.player.max_cp,condition:"NORMAL",inner_quiet:0,innovation:0,veneration:0,muscle_memory:0,waste_not:0,great_strides:0,final_appraisal:0,manipulation:0,expedience:0,trained_perfection:0,standard_touch_ready:!1,advanced_touch_ready:!1,trained_perfection_remain:1,turn:1,result:"ONGOING"}}function o(e){return!(e.initialQuality<0||e.initialQuality>e.params.item.max_quality||e.params.player.job_level<1||e.params.player.job_level>100||e.params.player.craftsmanship<0||e.params.player.control<0||e.params.player.max_cp<0||e.params.item.recipe_level<1||e.params.item.max_durability<=0||e.params.item.max_progress<=0||e.params.item.max_quality<=0)}},9402:(e,n,a)=>{var t,r;function i(e,n,a){return r=[t.PLAN_MACRO,e,n,a],i=new Worker("./worker.js"),new Promise((function(e,n){i.onmessage=function(n){"worker ready"!==n.data?(i.terminate(),e(n.data)):i.postMessage(r)},i.onerror=function(e){i.terminate(),n(e)},i.onmessageerror=function(){i.terminate()}}));var r,i}a.d(n,{i:()=>i}),(r=t||(t={}))[r.PLAN_MACRO=0]="PLAN_MACRO",r[r.SEARCH_BEST_MOVE=1]="SEARCH_BEST_MOVE"},3425:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.d(n,{Ho:()=>s,UP:()=>o,bi:()=>l,fC:()=>c});var r=a(9749),i=e([r]);function o(e,n){return JSON.parse(r.UP(JSON.stringify(e),JSON.stringify(n)))}function c(e,n,a){var t=r.fC(JSON.stringify(e),JSON.stringify(n),a);return JSON.parse(t)}function s(e,n){var a=r.Ho(JSON.stringify(e),JSON.stringify(n));return JSON.parse(a)}function l(e,n,a){var t=r.bi(JSON.stringify(e),JSON.stringify(n),BigInt(a));return JSON.parse(t)}r=(i.then?(await i)():i)[0],t()}catch(u){t(u)}}))},8441:(e,n,a)=>{a.d(n,{J:()=>t,P:()=>i});var t=["en","ja","ko"],r={durability:{en:"Durability",ja:"耐久",ko:"내구"},progress:{en:"Progress",ja:"工数",ko:"공정"},quality:{en:"Quality",ja:"品質",ko:"품질"},cp:{en:"CP",ja:"CP",ko:"CP"},condition:{en:"Condition",ja:"状態",ko:"상태"},BasicSynthesis:{en:"Basic Synthesis",ja:"作業",ko:"작업"},BasicTouch:{en:"Basic Touch",ja:"加工",ko:"가공"},MastersMend:{en:"Master's Mend",ja:"マスターズメンド",ko:"능숙한 땜질"},InnerQuiet:{en:"Inner Quiet",ja:"インナークワイエット",ko:"정신 집중"},DelicateSynthesis:{en:"Delicate Synthesis",ja:"精密作業",ko:"정밀 작업"},CarefulSynthesis:{en:"Careful Synthesis",ja:"模範作業",ko:"모범 작업"},Groundwork:{en:"Groundwork",ja:"下地作業",ko:"밑작업"},Observe:{en:"Observe",ja:"経過観察",ko:"경과 관찰"},ByregotBlessing:{en:"Byregot's Blessing",ja:"ビエルゴの祝福",ko:"비레고의 축복"},PreparatoryTouch:{en:"Preparatory Touch",ja:"下地加工",ko:"밑가공"},RapidSynthesis:{en:"Rapid Synthesis",ja:"突貫作業",ko:"강행 작업"},IntensiveSynthesis:{en:"Intensive Synthesis",ja:"集中作業",ko:"집중 작업"},HastyTouch:{en:"Hasty Touch",ja:"ヘイスティタッチ",ko:"성급한 손길"},PreciseTouch:{en:"Precise Touch",ja:"集中加工",ko:"집중 가공"},PatientTouch:{en:"Patient Touch",ja:"専心加工",ko:"전념 가공"},TrickOfTheTrade:{en:"Tricks of the Trade",ja:"秘訣",ko:"비결"},Innovation:{en:"Innovation",ja:"イノベーション",ko:"혁신"},Veneration:{en:"Veneration",ja:"ヴェネレーション",ko:"공경"},MuscleMemory:{en:"Muscle Memory",ja:"確信",ko:"확신"},StandardTouch:{en:"Standard Touch",ja:"中級加工",ko:"중급 가공"},Reflect:{en:"Reflect",ja:"真価",ko:"진가"},WasteNot:{en:"Waste Not",ja:"倹約",ko:"근검절약"},WasteNotII:{en:"Waste Not II",ja:"長期倹約",ko:"장기 절약"},PrudentTouch:{en:"Prudent Touch",ja:"倹約加工",ko:"절약 가공"},GreatStrides:{en:"Great Strides",ja:"グレートストライド",ko:"장족의 발전"},FinalAppraisal:{en:"Final Appraisal",ja:"最終確認",ko:"최종 확인"},Manipulation:{en:"Manipulation",ja:"マニピュレーション",ko:"교묘한 손놀림"},AdvancedTouch:{en:"Advanced Touch",ja:"上級加工",ko:"상급 가공"},PrudentSynthesis:{en:"Prudent Synthesis",ja:"倹約作業",ko:"절약 작업"},TrainedFinesse:{en:"Trained Finesse",ja:"匠の神業",ko:"장인의 황금손"},RefinedTouch:{en:"Refined touch",ja:"洗練加工"},DaringTouch:{en:"Daring Touch",ja:"デアリングタッチ"},ImmaculateMend:{en:"Immaculate Mend",ja:"パーフェクトメンド"},TrainedPerfection:{en:"Trained Perfection",ja:"匠の絶技"},NORMAL:{en:"Normal",ja:"通常",ko:"보통"},GOOD:{en:"Good",ja:"高品質",ko:"고품질"},EXCELLENT:{en:"Excellent",ja:"最高品質",ko:"최고품질"},POOR:{en:"Poor",ja:"低品質",ko:"저품질"},CENTRED:{en:"Centred",ja:"安定",ko:"안정"},PLIANT:{en:"Pliant",ja:"高能率",ko:"고효율"},STURDY:{en:"Sturdy",ja:"頑丈",ko:"견고"},MALLEABLE:{en:"Malleable",ja:"高進捗",ko:"빠른 진행"},PRIMED:{en:"Primed",ja:"長持続",ko:"장기 지속"},GOOD_OMEN:{en:"Good Omen",ja:"良兆候",ko:"길조"},inner_quiet:{en:"Inner Quiet",ja:"インナークワイエット",ko:"정신 집중"},innovation:{en:"Innovation",ja:"イノベーション",ko:"혁신"},veneration:{en:"Veneration",ja:"ヴェネレーション",ko:"공경"},muscle_memory:{en:"Muscle Memory",ja:"確信",ko:"확신"},waste_not:{en:"Waste Not",ja:"倹約",ko:"근검절약"},great_strides:{en:"Great Strides",ja:"グレートストライド",ko:"장족의 발전"},final_appraisal:{en:"Final Appraisal",ja:"最終確認",ko:"최종 확인"},manipulation:{en:"Manipulation",ja:"マニピュレーション",ko:"교묘한 손놀림"},expedience:{en:"Expedience",ja:"匠の好機"},trained_perfection:{en:"Trained Perfection",ja:"匠の絶技"},EnableAIAdvice:{en:"Enable AI Advice",ja:"AIの候補を表示",ko:"AI의 후보를 표시"},Success:{en:"Success",ja:"成功",ko:"성공"},Failure:{en:"Failure",ja:"失敗",ko:"실패"},ClassLevel:{en:"Class Level",ja:"クラフターレベル",ko:"제작직 레벨"},Craftsmanship:{en:"Craftsmanship",ja:"作業精度",ko:"작업 숙련도"},Control:{en:"Control",ja:"加工精度",ko:"가공 숙련도"},MaxCP:{en:"Max CP",ja:"最大CP",ko:"최대 CP"},RecipeLevel:{en:"Recipe Level",ja:"レシピレベル",ko:"레시피 레벨"},MaxDurability:{en:"Durability",ja:"耐久",ko:"내구도"},MaxProgress:{en:"Max Progress",ja:"必要工数",ko:"작업량"},MaxQuality:{en:"Max Quality",ja:"最大品質",ko:"최대 품질"},InitialQuality:{en:"Initial Quality",ja:"初期品質",ko:"초기 품질"},IsExpert:{en:"Expert Recipe",ja:"高難易度レシピ",ko:"고난이도 레시피"},Advisor:{en:"Advisor",ja:"アドバイザー",ko:"어드바이저"},Macro:{en:"Macro",ja:"マクロ",ko:"매크로"},PlanMacroFaster:{en:"Generate Macro (faster)",ja:"マクロ作成 (高速)",ko:"매크로 작성 (고속)"},PlanMacroBetter:{en:"Generate Macro (better)",ja:"マクロ作成 (高性能)",ko:"매크로 작성 (고성능)"},SuccessRate:{en:"success rate",ja:"製作成功確率",ko:"제작 성공 확률"},MaxQualityRate:{en:"max quality rate",ja:"最高品質達成率",ko:"최고품질 달성 확률"},AverageQuality:{en:"average quality",ja:"平均品質",ko:"평균 품질"},MacroLength:{en:"macro length",ja:"マクロの長さ",ko:"매크로 길이"},InProgress:{en:"In progress...",ja:"計算中...",ko:"계산중..."},OutputMacro:{en:"Macro",ja:"マクロ",ko:"매크로"},MacroAnalysis:{en:"Macro Quality",ja:"マクロ評価",ko:"매크로의 품질"},InvalidParameters:{en:"Invalid Parameters",ja:"パラメータの値が正しくありません",ko:"파라미터가 올바르지 않습니다"},AvailableActions:{en:"Available Actions",ja:"使用可能なアクション",ko:"사용 가능한 액션"},ReportBug:{en:"Report a bug",ja:"バグを報告",ko:"버그 신고"},DawntrailReleased:{en:"Dawntrail feature is supported.",ja:"黄金のレガシーに対応しました。",ko:"황금의 유산에 대응했습니다."},EndwalkerHere:{en:"Endwalker version",ja:"暁月バージョン",ko:"효월의 종언 버전"},EndwalkerForKoreaChina:{en:"(for users from South Korea or China)",ja:"（韓国・中国サーバー向け）",ko:"(한국·중국 서버용)"}};function i(e){return function(n){if(void 0!==n)return n in r?e in r[n]?r[n][e]:"err: language ".concat(e," does not exist for key ").concat(n,"."):"err: key ".concat(n," does not exist.")}}},9749:(e,n,a)=>{a.a(e,(async(e,t)=>{try{a.d(n,{Ho:()=>i.Ho,UP:()=>i.UP,bi:()=>i.bi,fC:()=>i.fC});var r=a(6184),i=a(8944),o=e([r]);r=(o.then?(await o)():o)[0],(0,i.oT)(r),t()}catch(e){t(e)}}))},8944:(e,n,a)=>{let t;function r(e){t=e}a.d(n,{Bg:()=>J,EI:()=>X,HE:()=>q,Ho:()=>x,Iu:()=>L,KX:()=>$,OQ:()=>A,Or:()=>ae,Sp:()=>Q,UP:()=>b,Wl:()=>T,XP:()=>W,YY:()=>Y,_D:()=>K,a6:()=>V,bi:()=>k,eY:()=>I,eh:()=>F,eo:()=>M,fC:()=>j,fH:()=>z,h4:()=>Z,hc:()=>N,iX:()=>te,kW:()=>ne,m7:()=>H,m_:()=>R,mv:()=>G,nD:()=>U,o$:()=>D,oH:()=>E,oT:()=>r,q4:()=>S,ql:()=>ee,qs:()=>B,qx:()=>O,uY:()=>P,ug:()=>C});const i=new Array(128).fill(void 0);function o(e){return i[e]}i.push(void 0,null,!0,!1);let c=i.length;function s(e){const n=o(e);return function(e){e<132||(i[e]=c,c=e)}(e),n}let l=new("undefined"==typeof TextDecoder?(0,module.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});l.decode();let u=null;function d(){return null!==u&&0!==u.byteLength||(u=new Uint8Array(t.memory.buffer)),u}function f(e,n){return e>>>=0,l.decode(d().subarray(e,e+n))}function _(e){c===i.length&&i.push(i.length+1);const n=c;return c=i[n],i[n]=e,n}let p=0,h=new("undefined"==typeof TextEncoder?(0,module.require)("util").TextEncoder:TextEncoder)("utf-8");const g="function"==typeof h.encodeInto?function(e,n){return h.encodeInto(e,n)}:function(e,n){const a=h.encode(e);return n.set(a),{read:e.length,written:a.length}};function m(e,n,a){if(void 0===a){const a=h.encode(e),t=n(a.length,1)>>>0;return d().subarray(t,t+a.length).set(a),p=a.length,t}let t=e.length,r=n(t,1)>>>0;const i=d();let o=0;for(;o<t;o++){const n=e.charCodeAt(o);if(n>127)break;i[r+o]=n}if(o!==t){0!==o&&(e=e.slice(o)),r=a(r,t,t=o+3*e.length,1)>>>0;const n=d().subarray(r+o,r+t);o+=g(e,n).written,r=a(r,t,o,1)>>>0}return p=o,r}let v=null;function y(){return null!==v&&0!==v.byteLength||(v=new Int32Array(t.memory.buffer)),v}function b(e,n){let a,r;try{const c=t.__wbindgen_add_to_stack_pointer(-16),s=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),l=p,u=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),d=p;t.search_best_move(c,s,l,u,d);var i=y()[c/4+0],o=y()[c/4+1];return a=i,r=o,f(i,o)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(a,r,1)}}function j(e,n,a){let r,i;try{const s=t.__wbindgen_add_to_stack_pointer(-16),l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),u=p,d=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),_=p,h=m(a,t.__wbindgen_malloc,t.__wbindgen_realloc),g=p;t.play_action(s,l,u,d,_,h,g);var o=y()[s/4+0],c=y()[s/4+1];return r=o,i=c,f(o,c)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,i,1)}}function x(e,n){let a,r;try{const c=t.__wbindgen_add_to_stack_pointer(-16),s=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),l=p,u=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),d=p;t.available_actions(c,s,l,u,d);var i=y()[c/4+0],o=y()[c/4+1];return a=i,r=o,f(i,o)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(a,r,1)}}function k(e,n,a){let r,i;try{const s=t.__wbindgen_add_to_stack_pointer(-16),l=m(e,t.__wbindgen_malloc,t.__wbindgen_realloc),u=p,d=m(n,t.__wbindgen_malloc,t.__wbindgen_realloc),_=p;t.evaluate_macro(s,l,u,d,_,a);var o=y()[s/4+0],c=y()[s/4+1];return r=o,i=c,f(o,c)}finally{t.__wbindgen_add_to_stack_pointer(16),t.__wbindgen_free(r,i,1)}}function w(e,n){try{return e.apply(this,n)}catch(e){t.__wbindgen_exn_store(_(e))}}function C(e){s(e)}function S(e){return _(o(e).crypto)}function T(e){const n=o(e);return"object"==typeof n&&null!==n}function M(e){return _(o(e).process)}function P(e){return _(o(e).versions)}function O(e){return _(o(e).node)}function I(e){return"string"==typeof o(e)}function A(){return w((function(){return _(module.require)}),arguments)}function Z(e,n){return _(f(e,n))}function N(e){return _(o(e).msCrypto)}function E(){return w((function(e,n){o(e).randomFillSync(s(n))}),arguments)}function L(){return w((function(e,n){o(e).getRandomValues(o(n))}),arguments)}function R(e){return _(o(e))}function G(e){let n;try{n=o(e)instanceof Window}catch(e){n=!1}return n}function q(e){const n=o(e).performance;return null==n?0:_(n)}function B(e){return o(e).now()}function D(e){return"function"==typeof o(e)}function F(e,n){return _(new Function(f(e,n)))}function Q(){return w((function(e,n){return _(o(e).call(o(n)))}),arguments)}function H(){return w((function(){return _(self.self)}),arguments)}function Y(){return w((function(){return _(window.window)}),arguments)}function J(){return w((function(){return _(globalThis.globalThis)}),arguments)}function U(){return w((function(){return _(global.global)}),arguments)}function W(e){return void 0===o(e)}function X(){return w((function(e,n,a){return _(o(e).call(o(n),o(a)))}),arguments)}function K(e){return _(o(e).buffer)}function V(e,n,a){return _(new Uint8Array(o(e),n>>>0,a>>>0))}function $(e){return _(new Uint8Array(o(e)))}function z(e,n,a){o(e).set(o(n),a>>>0)}function ee(e){return _(new Uint8Array(e>>>0))}function ne(e,n,a){return _(o(e).subarray(n>>>0,a>>>0))}function ae(e,n){throw new Error(f(e,n))}function te(){return _(t.memory)}},6184:(e,n,a)=>{var t=a(8944);e.exports=a.v(n,e.id,"1f3af26ab7e700780905",{"./ffxiv_crafter_rust_bg.js":{__wbindgen_object_drop_ref:t.ug,__wbg_crypto_1d1f22824a6a080c:t.q4,__wbindgen_is_object:t.Wl,__wbg_process_4a72847cc503995b:t.eo,__wbg_versions_f686565e586dd935:t.uY,__wbg_node_104a2ff8d6ea03a2:t.qx,__wbindgen_is_string:t.eY,__wbg_require_cca90b1a94a0255b:t.OQ,__wbindgen_string_new:t.h4,__wbg_msCrypto_eb05e62b530a1508:t.hc,__wbg_randomFillSync_5c9c955aa56b6049:t.oH,__wbg_getRandomValues_3aa56aa6edec874c:t.Iu,__wbindgen_object_clone_ref:t.m_,__wbg_instanceof_Window_f401953a2cf86220:t.mv,__wbg_performance_3298a9628a5c8aa4:t.HE,__wbg_now_4e659b3d15f470d9:t.qs,__wbindgen_is_function:t.o$,__wbg_newnoargs_e258087cd0daa0ea:t.eh,__wbg_call_27c0f87801dedf93:t.Sp,__wbg_self_ce0dbfc45cf2f5be:t.m7,__wbg_window_c6fb939a7f436783:t.YY,__wbg_globalThis_d1e6af4856ba331b:t.Bg,__wbg_global_207b558942527489:t.nD,__wbindgen_is_undefined:t.XP,__wbg_call_b3ca7c6051f9bec1:t.EI,__wbg_buffer_12d079cc21e14bdb:t._D,__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb:t.a6,__wbg_new_63b92bc8671ed464:t.KX,__wbg_set_a47bac70306a19a7:t.fH,__wbg_newwithlength_e9b4878cebadb3d3:t.ql,__wbg_subarray_a1f73cd4b5b42fe1:t.kW,__wbindgen_throw:t.Or,__wbindgen_memory:t.iX}})}}]);
//# sourceMappingURL=629.js.map