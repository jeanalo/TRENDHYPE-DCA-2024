(()=>{"use strict";var e,t,n={750:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.ImgSideAttribute=void 0,function(e){e.img="img",e.trendtext="trendtext",e.opacitylayer="opacitylayer"}(n||(t.ImgSideAttribute=n={}));class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}static get observedAttributes(){return Object.values(n)}attributeChangedCallback(e,t,n){this[e]=n,this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n              <link rel="stylesheet" href="./src/components/imgSide/imgSide.css">\n              <img id="trendHypePhoto" src="${this.img}" alt="">\n              <p>TrendHype ${this.trendtext}</p>\n              <div id="photoOpacity" style="opacity:${this.opacitylayer};"></div>\n          `)}}customElements.define("img-banner-component",r),t.default=r},508:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.RegisterAttribute=void 0,function(e){e.utittle="utittle",e.firstname="firstname",e.lastname="lastname",e.email="email",e.password="password",e.singupbutton="singupbutton"}(n||(t.RegisterAttribute=n={}));class r extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}static get observedAttributes(){return Object.values(n)}attributeChangedCallback(e,t,n){this[e]=n,this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n               \n                <link rel="stylesheet" href="./src/components/loginField/loginField.css">\n                <form>\n                      <p>Sign up </p>\n\n                      <label for="name"> First Name </label>\n                      <input id="firstname" type="name" placeholder="First name " ${this.firstname}>\n\n                      <label for="lastname"> Last Name </label>\n                      <input id="lastname" type="name" placeholder="Last name" ${this.lastname}>\n\n                      <label for="email">e-mail address</label>\n                      <input id="email" type="email" placeholder="e-mail address" ${this.email}>\n  \n                      <label for="password">Password</label>\n                      <input id="password" type="password" placeholder="password"${this.password}>\n  \n                      <button>Log in${this.singupbutton}</button>\n  \n                  </form>\n            `)}}customElements.define("register-component",r),t.default=r},365:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},809:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return i(t,e),t},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{d(r.next(e))}catch(e){o(e)}}function s(e){try{d(r.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}d((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const s=o(n(750)),d=o(n(508)),c=n(482),l=n(997),u=n(155),p=n(445),h={email:"",password:"",firstname:"",lastname:""};class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}changeEmail(e){h.email=e.target.value}changePassword(e){h.password=e.target.value}changeFirstName(e){h.firstname=e.target.value}changeLastName(e){h.lastname=e.target.value}submitForm(){return a(this,void 0,void 0,(function*(){(yield(0,p.registerUser)(h))?(0,c.dispatch)((0,l.navigate)(u.Screens.DASHBOARD)):alert("No se pudo crear el usuario")}))}render(){return a(this,void 0,void 0,(function*(){if(this.shadowRoot){this.shadowRoot.innerHTML="";const e=new s.default;e.setAttribute(s.ImgSideAttribute.img,"path/to/image.jpg"),e.setAttribute(s.ImgSideAttribute.trendtext,"Welcome to TrendHype"),e.setAttribute(s.ImgSideAttribute.opacitylayer,"0.5"),this.shadowRoot.appendChild(e);const t=new d.default;t.setAttribute(d.RegisterAttribute.utittle,"Sing Up"),t.setAttribute(d.RegisterAttribute.email,""),t.setAttribute(d.RegisterAttribute.password,""),t.setAttribute(d.RegisterAttribute.firstname,""),t.setAttribute(d.RegisterAttribute.lastname,""),t.setAttribute(d.RegisterAttribute.singupbutton,"Register"),this.shadowRoot.appendChild(t)}}))}}customElements.define("app-register",f),t.default=f},997:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{d(r.next(e))}catch(e){o(e)}}function s(e){try{d(r.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}d((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getProductsAction=t.navigate=void 0;const i=n(155),o=n(445);t.navigate=e=>({action:i.Actions.NAVIGATE,payload:e}),t.getProductsAction=()=>r(void 0,void 0,void 0,(function*(){const e=yield(0,o.getPosts)();return{action:i.Actions.GETPOSTS,payload:e}}))},482:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.addObserver=t.dispatch=t.appState=void 0;const i=n(950),o=r(n(167));t.appState=o.default.get("STORE",{screen:"LOGIN",publications:[]});let a=[];t.dispatch=e=>{const n=JSON.parse(JSON.stringify(t.appState)),r=(0,i.reducer)(e,n);var s;t.appState=r,s=r,o.default.set("STORE",s),a.forEach((e=>e.render()))},t.addObserver=e=>{a=[...a,e]}},950:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.reducer=void 0;const r=n(155);t.reducer=(e,t)=>{const{action:n,payload:i}=e;switch(n){case r.Actions.NAVIGATE:return Object.assign(Object.assign({},t),{screen:i});case r.Actions.GETPOSTS:return Object.assign(Object.assign({},t),{products:i});default:return t}}},155:(e,t)=>{var n,r;Object.defineProperty(t,"__esModule",{value:!0}),t.Actions=t.Screens=void 0,function(e){e.REGISTER="REGISTER",e.LOGIN="LOGIN",e.DASHBOARD="DASHBOARD"}(n||(t.Screens=n={})),function(e){e.NAVIGATE="NAVIGATE",e.GETPOSTS="GETPOSTS"}(r||(t.Actions=r={}))},445:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(i,o){function a(e){try{d(r.next(e))}catch(e){o(e)}}function s(e){try{d(r.throw(e))}catch(e){o(e)}}function d(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}d((r=r.apply(e,t||[])).next())}))};let i,o;Object.defineProperty(t,"__esModule",{value:!0}),t.loginUser=t.registerUser=t.getPosts=t.addPosts=void 0;const a=()=>r(void 0,void 0,void 0,(function*(){if(!i){const{getFirestore:e}=yield Promise.all([n.e(990),n.e(594)]).then(n.bind(n,594)),{initializeApp:t}=yield Promise.all([n.e(990),n.e(223)]).then(n.bind(n,223)),{getAuth:r}=yield Promise.all([n.e(990),n.e(873)]).then(n.bind(n,873)),a=t({apiKey:"AIzaSyD-u3jetStWs47fMyfvAGsF5X4ggGwej4A",authDomain:"trendhype.firebaseapp.com",projectId:"trendhype",storageBucket:"trendhype.appspot.com",messagingSenderId:"128542655290",appId:"1:128542655290:web:452dd40b18fa84b4cc4603",measurementId:"G-8LGLM4JT81"});i=e(a),o=r(a)}return{db:i,auth:o}}));t.addPosts=e=>r(void 0,void 0,void 0,(function*(){try{const{db:t}=yield a(),{collection:r,addDoc:i}=yield Promise.all([n.e(990),n.e(594)]).then(n.bind(n,594)),o=r(t,"publications");yield i(o,e),console.log("Se añadió con exito")}catch(e){console.error("Error adding document",e)}})),t.getPosts=()=>r(void 0,void 0,void 0,(function*(){try{const{db:e}=yield a(),{collection:t,getDocs:r}=yield Promise.all([n.e(990),n.e(594)]).then(n.bind(n,594)),i=t(e,"publications"),o=yield r(i),s=[];return o.forEach((e=>{s.push(e.data())})),s}catch(e){console.error("Error getting documents",e)}})),t.registerUser=e=>r(void 0,void 0,void 0,(function*(){try{const{auth:t,db:r}=yield a(),{createUserWithEmailAndPassword:i}=yield Promise.all([n.e(990),n.e(873)]).then(n.bind(n,873)),{doc:o,setDoc:s}=yield Promise.all([n.e(990),n.e(594)]).then(n.bind(n,594)),d=o(r,"users",(yield i(t,e.email,e.password)).user.uid),c={userName:e.userName,name:e.name};return yield s(d,c),!0}catch(e){return console.error(e),!1}})),t.loginUser=(e,t)=>r(void 0,void 0,void 0,(function*(){try{const{auth:r}=yield a(),{signInWithEmailAndPassword:i}=yield Promise.all([n.e(990),n.e(873)]).then(n.bind(n,873)),o=yield i(r,e,t);return console.log(o.user),!0}catch(e){return console.error(e),!1}}))},167:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={get:(e,t)=>{const n=localStorage.getItem(e)||sessionStorage.getItem(e);return n?JSON.parse(n):t},set:(e,t,n=!1)=>{const r=n?sessionStorage:localStorage,i=JSON.stringify(t);r.setItem(e,i)}}}},r={};function i(e){var t=r[e];if(void 0!==t)return t.exports;var o=r[e]={exports:{}};return n[e].call(o.exports,o,o.exports,i),o.exports}i.m=n,i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>e+".bundle.js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="trendhype-dca24:",i.l=(n,r,o,a)=>{if(e[n])e[n].push(r);else{var s,d;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var u=c[l];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+o){s=u;break}}s||(d=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.setAttribute("data-webpack",t+o),s.src=n),e[n]=[r];var p=(t,r)=>{s.onerror=s.onload=null,clearTimeout(h);var i=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((e=>e(r))),t)return t(r)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),d&&document.head.appendChild(s)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&(!e||!/^http(s?):/.test(e));)e=n[r--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={792:0};i.f.j=(t,n)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,i)=>r=e[t]=[n,i]));n.push(r[2]=o);var a=i.p+i.u(t),s=new Error;i.l(a,(n=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,r[1](s)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,o,[a,s,d]=n,c=0;if(a.some((t=>0!==e[t]))){for(r in s)i.o(s,r)&&(i.m[r]=s[r]);d&&d(i)}for(t&&t(n);c<a.length;c++)o=a[c],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0},n=self.webpackChunktrendhype_dca24=self.webpackChunktrendhype_dca24||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{const e=i(482),t=i(155);i(365),i(809);class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),(0,e.addObserver)(this)}connectedCallback(){this.render()}render(){if(console.log(e.appState),console.log("hello"),this.shadowRoot)switch(this.shadowRoot.innerHTML="",e.appState.screen){case t.Screens.REGISTER:const e=document.createElement("app-register");this.shadowRoot.appendChild(e);break;case t.Screens.LOGIN:const n=document.createElement("app-login");this.shadowRoot.appendChild(n);break;case t.Screens.DASHBOARD:const r=document.createElement("app-dashboard");this.shadowRoot.appendChild(r)}}}customElements.define("app-container",n)})()})();