(()=>{var e,r,t,n,o,a,i,s,c={},l={};function u(e){var r=l[e];if(void 0!==r)return r.exports;var t=l[e]={id:e,loaded:!1,exports:{}};return c[e](t,t.exports,u),t.loaded=!0,t.exports}u.m=c,e="function"==typeof Symbol?Symbol("webpack then"):"__webpack_then__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",t="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=e=>{e&&(e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},o=e=>!--e.r&&e(),a=(e,r)=>e?e.push(r):o(r),u.a=(i,s,c)=>{var l,u,p,f=c&&[],d=i.exports,b=!0,m=!1,h=(r,t,n)=>{m||(m=!0,t.r+=r.length,r.map(((r,o)=>r[e](t,n))),m=!1)},v=new Promise(((e,r)=>{p=r,u=()=>(e(d),n(f),f=0)}));v[r]=d,v[e]=(e,r)=>{if(b)return o(e);l&&h(l,e,r),a(f,e),v.catch(r)},i.exports=v,s((i=>{var s;l=(i=>i.map((i=>{if(null!==i&&"object"==typeof i){if(i[e])return i;if(i.then){var s=[];i.then((e=>{c[r]=e,n(s),s=0}),(e=>{c[t]=e,n(s),s=0}));var c={};return c[e]=(e,r)=>(a(s,e),i.catch(r)),c}}var l={};return l[e]=e=>o(e),l[r]=i,l})))(i);var c=()=>l.map((e=>{if(e[t])throw e[t];return e[r]})),u=new Promise(((e,r)=>{(s=()=>e(c)).r=0,h(l,s,r)}));return s.r?u:c()}),(e=>(e&&p(v[t]=e),u()))),b=!1},u.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return u.d(r,{a:r}),r},u.d=(e,r)=>{for(var t in r)u.o(r,t)&&!u.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},u.f={},u.e=e=>Promise.all(Object.keys(u.f).reduce(((r,t)=>(u.f[t](e,r),r)),[])),u.u=e=>e+".js",u.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),u.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),u.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),i={},s="ffxiv-crafter-frontend:",u.l=(e,r,t,n)=>{if(i[e])i[e].push(r);else{var o,a;if(void 0!==t)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var p=c[l];if(p.getAttribute("src")==e||p.getAttribute("data-webpack")==s+t){o=p;break}}o||(a=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,u.nc&&o.setAttribute("nonce",u.nc),o.setAttribute("data-webpack",s+t),o.src=e),i[e]=[r];var f=(r,t)=>{o.onerror=o.onload=null,clearTimeout(d);var n=i[e];if(delete i[e],o.parentNode&&o.parentNode.removeChild(o),n&&n.forEach((e=>e(t))),r)return r(t)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=f.bind(null,o.onerror),o.onload=f.bind(null,o.onload),a&&document.head.appendChild(o)}},u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.v=(e,r,t,n)=>{var o=fetch(u.p+""+t+".module.wasm");return"function"==typeof WebAssembly.instantiateStreaming?WebAssembly.instantiateStreaming(o,n).then((r=>Object.assign(e,r.instance.exports))):o.then((e=>e.arrayBuffer())).then((e=>WebAssembly.instantiate(e,n))).then((r=>Object.assign(e,r.instance.exports)))},(()=>{var e;u.g.importScripts&&(e=u.g.location+"");var r=u.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),u.p=e})(),(()=>{var e={672:0};u.f.j=(r,t)=>{var n=u.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(((t,o)=>n=e[r]=[t,o]));t.push(n[2]=o);var a=u.p+u.u(r),i=new Error;u.l(a,(t=>{if(u.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+o+": "+a+")",i.name="ChunkLoadError",i.type=o,i.request=a,n[1](i)}}),"chunk-"+r,r)}};var r=(r,t)=>{var n,o,[a,i,s]=t,c=0;if(a.some((r=>0!==e[r]))){for(n in i)u.o(i,n)&&(u.m[n]=i[n]);s&&s(u)}for(r&&r(t);c<a.length;c++)o=a[c],u.o(e,o)&&e[o]&&e[o][0](),e[o]=0},t=self.webpackChunkffxiv_crafter_frontend=self.webpackChunkffxiv_crafter_frontend||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),Promise.all([u.e(902),u.e(629)]).then(u.bind(u,2629)).catch((e=>console.error("Error importing `index`:",e)))})();
//# sourceMappingURL=bootstrap.js.map