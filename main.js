(()=>{"use strict";var e,t={607:(e,t,o)=>{o(814);var i=o(23);document.querySelectorAll('input[name="resize-type"]').forEach((e=>{e.addEventListener("change",(()=>{const t=e.value;document.getElementById(t).classList.remove("d-none"),document.getElementById("scale-group"===t?"dimensions-group":"scale-group").classList.add("d-none")}))})),document.querySelector(".btn").addEventListener("click",(()=>{const e=document.querySelector("#file").files[0];if(!e)return void alert("File is missing...");let t;if(document.querySelector("#dimensions-radio").checked){const e=parseInt(document.querySelector("#width").value),o=parseInt(document.querySelector("#height").value);t=Object.assign(Object.assign({},!isNaN(e)&&{width:e}),!isNaN(o)&&{height:o})}else{const e=parseInt(document.querySelector("#scale").value);t=Object.assign({},!isNaN(e)&&{scale:e})}i.resize(e,t).then((e=>i.toBlob(e))).then((e=>{const t=document.createElement("a");t.setAttribute("target","_blank"),t.href=e,t.click()})).catch((e=>{alert("Something went wrong..."),console.error(e)}))}))},23:function(e,t){var o=this&&this.__awaiter||function(e,t,o,i){return new(o||(o=Promise))((function(r,a){function s(e){try{l(i.next(e))}catch(e){a(e)}}function n(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,n)}l((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.toImage=t.toFile=t.toBlob=t.toBase64=t.resize=void 0;const i=e=>new Promise(((t,o)=>{const i=new Image;i.addEventListener("load",(()=>t(i))),i.addEventListener("error",o),i.crossOrigin="true",i.src=e})),r=e=>{var t,o;if(e instanceof HTMLCanvasElement)return null!==(o=null===(t=e.getAttribute("data-extension"))||void 0===t?void 0:t.replace("jpg","jpeg"))&&void 0!==o?o:"png";{const t=e.match(/data:image\/([A-z]+);base64/);if(t)return t[1];{const t=e.split(".");return t[t.length-1]}}},a=e=>`image/${r(e)}`;t.resize=(e,a={})=>new Promise(((s,n)=>o(void 0,void 0,void 0,(function*(){try{const{element:n,extension:l}=yield(e=>new Promise(((a,s)=>o(void 0,void 0,void 0,(function*(){try{if("string"==typeof e)a({element:yield i(e),extension:r(e)});else switch(e.__proto__.toString()){case"[object HTMLImageElement]":case"[object HTMLImageElementPrototype]":return a({element:yield i(e.src),extension:r(e.src)});case"[object HTMLCanvasElement]":case"[object HTMLCanvasElementPrototype]":return a({element:yield(0,t.toImage)(e),extension:"png"});case"[object File]":case"[object FilePrototype]":if(!e.type.match(/image/))return s(new Error("File is not an image"));const n=new FileReader;n.addEventListener("load",(t=>o(void 0,void 0,void 0,(function*(){a({element:yield i(t.target.result),extension:r(e.name)})})))),n.addEventListener("error",(()=>s)),n.readAsDataURL(e);break;default:s("Image not found")}}catch(e){s(e)}})))))(e),c=n.naturalWidth||n.width,g=n.naturalHeight||n.height;let d,v;a.scale>0?(d=c*a.scale/100,v=g*a.scale/100):a.width>0&&a.height>0?(d=a.width,v=a.height):a.width>0?(d=a.width,v=g/(c/d)):a.height>0?(v=a.height,d=c/(g/v)):(d=c,v=g),d=parseInt(d),v=parseInt(v);const h=document.createElement("canvas"),w=h.getContext("2d"),m=document.createElement("canvas"),p=m.getContext("2d");if(h.setAttribute("data-extension",l),h.width=c,h.height=g,d!==c||v!==g)for(w.drawImage(n,0,0,c,g);h.width!==d||h.height!==v;){const e=h.width/2,t=h.height/2;e>=d&&t>=v?(m.width=e,m.height=t):(m.width=d,m.height=v),p.drawImage(h,0,0,m.width,m.height),h.width=m.width,h.height=m.height,w.drawImage(m,0,0,h.width,h.height)}else w.drawImage(n,0,0,d,v);s(h)}catch(e){n(e)}})))),t.toBase64=e=>e.toDataURL(a(e),1),t.toBlob=e=>new Promise((t=>{e.toBlob((e=>{t(URL.createObjectURL(e))}),a(e),1)})),t.toFile=(e,t="image")=>new Promise((o=>{e.toBlob((i=>{const s=new File([i],`${t}.${r(e)}`,{type:a(e)});o(s)}),a(e),1)})),t.toImage=e=>new Promise(((o,i)=>{const r=new Image;r.addEventListener("load",(()=>{r.width=r.naturalWidth,r.height=r.naturalHeight,o(r)})),r.addEventListener("error",i),r.src=(0,t.toBase64)(e)}))},204:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%272%27 fill=%27%23fff%27/%3e%3c/svg%3e"},609:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%2386b7fe%27/%3e%3c/svg%3e"},469:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e"},486:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27rgba%280, 0, 0, 0.25%29%27/%3e%3c/svg%3e"},144:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e"},254:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23000%27%3e%3cpath d=%27M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z%27/%3e%3c/svg%3e"},740:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%230c63e4%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},460:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23212529%27%3e%3cpath fill-rule=%27evenodd%27 d=%27M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},647:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z%27/%3e%3c/svg%3e"},692:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27 fill=%27%23fff%27%3e%3cpath d=%27M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z%27/%3e%3c/svg%3e"},770:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"},931:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27M6 10h8%27/%3e%3c/svg%3e"},199:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27%3e%3cpath fill=%27none%27 stroke=%27%23fff%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%273%27 d=%27m6 10 3 3 6-6%27/%3e%3c/svg%3e"},217:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%280, 0, 0, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},956:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 30 30%27%3e%3cpath stroke=%27rgba%28255, 255, 255, 0.55%29%27 stroke-linecap=%27round%27 stroke-miterlimit=%2710%27 stroke-width=%272%27 d=%27M4 7h22M4 15h22M4 23h22%27/%3e%3c/svg%3e"},122:e=>{e.exports="data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%23198754%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e"}},o={};function i(e){var r=o[e];if(void 0!==r)return r.exports;var a=o[e]={id:e,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.exports}i.m=t,e=[],i.O=(t,o,r,a)=>{if(!o){var s=1/0;for(g=0;g<e.length;g++){for(var[o,r,a]=e[g],n=!0,l=0;l<o.length;l++)(!1&a||s>=a)&&Object.keys(i.O).every((e=>i.O[e](o[l])))?o.splice(l--,1):(n=!1,a<s&&(s=a));if(n){e.splice(g--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var g=e.length;g>0&&e[g-1][2]>a;g--)e[g]=e[g-1];e[g]=[o,r,a]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{i.b=document.baseURI||self.location.href;var e={179:0};i.O.j=t=>0===e[t];var t=(t,o)=>{var r,a,[s,n,l]=o,c=0;if(s.some((t=>0!==e[t]))){for(r in n)i.o(n,r)&&(i.m[r]=n[r]);if(l)var g=l(i)}for(t&&t(o);c<s.length;c++)a=s[c],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(g)},o=self.webpackChunk_cevad_tokatli_image_resize_playground=self.webpackChunk_cevad_tokatli_image_resize_playground||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),i.nc=void 0;var r=i.O(void 0,[216],(()=>i(607)));r=i.O(r)})();