(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const Bf=()=>{};var yc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},qf=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},iu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,d=u?n[s+2]:0,p=i>>2,_=(i&3)<<4|l>>4;let T=(l&15)<<2|d>>6,P=d&63;u||(P=64,a||(T=64)),r.push(t[p],t[_],t[T],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(su(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):qf(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const _=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||d==null||_==null)throw new jf;const T=i<<2|l>>4;if(r.push(T),d!==64){const P=l<<4&240|d>>2;if(r.push(P),_!==64){const V=d<<6&192|_;r.push(V)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class jf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zf=function(n){const e=su(n);return iu.encodeByteArray(e,!0)},ds=function(n){return zf(n).replace(/\./g,"")},ou=function(n){try{return iu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=()=>Wf().__FIREBASE_DEFAULTS__,Gf=()=>{if(typeof process>"u"||typeof yc>"u")return;const n=yc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Kf=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ou(n[1]);return e&&JSON.parse(e)},Ns=()=>{try{return Bf()||Hf()||Gf()||Kf()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},au=n=>{var e,t;return(t=(e=Ns())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Qf=n=>{const e=au(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},cu=()=>{var n;return(n=Ns())==null?void 0:n.config},lu=n=>{var e;return(e=Ns())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ds(JSON.stringify(t)),ds(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ie())}function Zf(){var e;const n=(e=Ns())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ep(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uu(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function tp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function np(){const n=Ie();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function rp(){return!Zf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function hu(){try{return typeof indexedDB=="object"}catch{return!1}}function du(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function sp(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="FirebaseError";class Be extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=ip,Object.setPrototypeOf(this,Be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,nn.prototype.create)}}class nn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?op(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Be(s,l,r)}}function op(n,e){return n.replace(ap,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ap=/\{\$([^}]+)}/g;function cp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function bt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Ec(i)&&Ec(a)){if(!bt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ec(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function er(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function tr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function lp(n,e){const t=new up(n,e);return t.subscribe.bind(t)}class up{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");hp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Pi),s.error===void 0&&(s.error=Pi),s.complete===void 0&&(s.complete=Pi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function hp(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Pi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp=1e3,fp=2,pp=14400*1e3,mp=.5;function vc(n,e=dp,t=fp){const r=e*Math.pow(t,n),s=Math.round(mp*r*(Math.random()-.5)*2);return Math.min(pp,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function fu(n){return(await fetch(n,{credentials:"include"})).ok}class Fe{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Yf;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yp(e))try{this.getOrInitializeService({instanceIdentifier:jt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=jt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=jt){return this.instances.has(e)}getOptions(e=jt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_p(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=jt){return this.component?this.component.multipleInstances?e:jt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _p(n){return n===jt?void 0:n}function yp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new gp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const vp={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Ip=q.INFO,Tp={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},wp=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Tp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Os{constructor(e){this.name=e,this._logLevel=Ip,this._logHandler=wp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?vp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const Ap=(n,e)=>e.some(t=>n instanceof t);let Ic,Tc;function bp(){return Ic||(Ic=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rp(){return Tc||(Tc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pu=new WeakMap,ji=new WeakMap,mu=new WeakMap,Ci=new WeakMap,go=new WeakMap;function Sp(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(It(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&pu.set(t,n)}).catch(()=>{}),go.set(e,n),e}function Pp(n){if(ji.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});ji.set(n,e)}let zi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||mu.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return It(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Cp(n){zi=n(zi)}function kp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ki(this),e,...t);return mu.set(r,e.sort?e.sort():[e]),It(r)}:Rp().includes(n)?function(...e){return n.apply(ki(this),e),It(pu.get(this))}:function(...e){return It(n.apply(ki(this),e))}}function Vp(n){return typeof n=="function"?kp(n):(n instanceof IDBTransaction&&Pp(n),Ap(n,bp())?new Proxy(n,zi):n)}function It(n){if(n instanceof IDBRequest)return Sp(n);if(Ci.has(n))return Ci.get(n);const e=Vp(n);return e!==n&&(Ci.set(n,e),go.set(e,n)),e}const ki=n=>go.get(n);function gu(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=It(a);return r&&a.addEventListener("upgradeneeded",u=>{r(It(a.result),u.oldVersion,u.newVersion,It(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const Dp=["get","getKey","getAll","getAllKeys","count"],Np=["put","add","delete","clear"],Vi=new Map;function wc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Vi.get(e))return Vi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Np.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Dp.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[t](...l),s&&u.done]))[0]};return Vi.set(e,i),i}Cp(n=>({...n,get:(e,t,r)=>wc(e,t)||n.get(e,t,r),has:(e,t)=>!!wc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(xp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function xp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Wi="@firebase/app",Ac="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=new Os("@firebase/app"),Lp="@firebase/app-compat",Mp="@firebase/analytics-compat",Fp="@firebase/analytics",Up="@firebase/app-check-compat",$p="@firebase/app-check",Bp="@firebase/auth",qp="@firebase/auth-compat",jp="@firebase/database",zp="@firebase/data-connect",Wp="@firebase/database-compat",Hp="@firebase/functions",Gp="@firebase/functions-compat",Kp="@firebase/installations",Qp="@firebase/installations-compat",Yp="@firebase/messaging",Jp="@firebase/messaging-compat",Xp="@firebase/performance",Zp="@firebase/performance-compat",em="@firebase/remote-config",tm="@firebase/remote-config-compat",nm="@firebase/storage",rm="@firebase/storage-compat",sm="@firebase/firestore",im="@firebase/ai",om="@firebase/firestore-compat",am="firebase",cm="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi="[DEFAULT]",lm={[Wi]:"fire-core",[Lp]:"fire-core-compat",[Fp]:"fire-analytics",[Mp]:"fire-analytics-compat",[$p]:"fire-app-check",[Up]:"fire-app-check-compat",[Bp]:"fire-auth",[qp]:"fire-auth-compat",[jp]:"fire-rtdb",[zp]:"fire-data-connect",[Wp]:"fire-rtdb-compat",[Hp]:"fire-fn",[Gp]:"fire-fn-compat",[Kp]:"fire-iid",[Qp]:"fire-iid-compat",[Yp]:"fire-fcm",[Jp]:"fire-fcm-compat",[Xp]:"fire-perf",[Zp]:"fire-perf-compat",[em]:"fire-rc",[tm]:"fire-rc-compat",[nm]:"fire-gcs",[rm]:"fire-gcs-compat",[sm]:"fire-fst",[om]:"fire-fst-compat",[im]:"fire-vertex","fire-js":"fire-js",[am]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=new Map,um=new Map,Gi=new Map;function bc(n,e){try{n.container.addComponent(e)}catch(t){ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Je(n){const e=n.name;if(Gi.has(e))return ot.debug(`There were multiple attempts to register component ${e}.`),!1;Gi.set(e,n);for(const t of fs.values())bc(t,n);for(const t of um.values())bc(t,n);return!0}function rn(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function De(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tt=new nn("app","Firebase",hm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=cm;function _u(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Hi,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Tt.create("bad-app-name",{appName:String(s)});if(t||(t=cu()),!t)throw Tt.create("no-options");const i=fs.get(s);if(i){if(bt(t,i.options)&&bt(r,i.config))return i;throw Tt.create("duplicate-app",{appName:s})}const a=new Ep(s);for(const u of Gi.values())a.addComponent(u);const l=new dm(t,r,a);return fs.set(s,l),l}function _o(n=Hi){const e=fs.get(n);if(!e&&n===Hi&&cu())return _u();if(!e)throw Tt.create("no-app",{appName:n});return e}function Oe(n,e,t){let r=lm[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ot.warn(a.join(" "));return}Je(new Fe(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm="firebase-heartbeat-database",pm=1,hr="firebase-heartbeat-store";let Di=null;function yu(){return Di||(Di=gu(fm,pm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(hr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Tt.create("idb-open",{originalErrorMessage:n.message})})),Di}async function mm(n){try{const t=(await yu()).transaction(hr),r=await t.objectStore(hr).get(Eu(n));return await t.done,r}catch(e){if(e instanceof Be)ot.warn(e.message);else{const t=Tt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ot.warn(t.message)}}}async function Rc(n,e){try{const r=(await yu()).transaction(hr,"readwrite");await r.objectStore(hr).put(e,Eu(n)),await r.done}catch(t){if(t instanceof Be)ot.warn(t.message);else{const r=Tt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ot.warn(r.message)}}}function Eu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gm=1024,_m=30;class ym{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new vm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Sc();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>_m){const a=Im(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ot.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Sc(),{heartbeatsToSend:r,unsentEntries:s}=Em(this._heartbeatsCache.heartbeats),i=ds(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return ot.warn(t),""}}}function Sc(){return new Date().toISOString().substring(0,10)}function Em(n,e=gm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Pc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Pc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class vm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return hu()?du().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await mm(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Rc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Rc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Pc(n){return ds(JSON.stringify({version:2,heartbeats:n})).length}function Im(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(n){Je(new Fe("platform-logger",e=>new Op(e),"PRIVATE")),Je(new Fe("heartbeat",e=>new ym(e),"PRIVATE")),Oe(Wi,Ac,n),Oe(Wi,Ac,"esm2020"),Oe("fire-js","")}Tm("");var wm="firebase",Am="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Oe(wm,Am,"app");function vu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const bm=vu,Iu=new nn("auth","Firebase",vu());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=new Os("@firebase/auth");function Rm(n,...e){ps.logLevel<=q.WARN&&ps.warn(`Auth (${Cn}): ${n}`,...e)}function ts(n,...e){ps.logLevel<=q.ERROR&&ps.error(`Auth (${Cn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,...e){throw yo(n,...e)}function He(n,...e){return yo(n,...e)}function Tu(n,e,t){const r={...bm(),[e]:t};return new nn("auth","Firebase",r).create(e,{appName:n.name})}function rt(n){return Tu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Iu.create(n,...e)}function M(n,e,...t){if(!n)throw yo(e,...t)}function tt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ts(e),new Error(e)}function at(n,e){n||tt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Sm(){return Cc()==="http:"||Cc()==="https:"}function Cc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Sm()||uu()||"connection"in navigator)?navigator.onLine:!0}function Cm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e,t){this.shortDelay=e,this.longDelay=t,at(t>e,"Short delay should be less than long delay!"),this.isMobile=Xf()||tp()}get(){return Pm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eo(n,e){at(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const km={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Dm=new Ar(3e4,6e4);function Dt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Nt(n,e,t,r,s={}){return Au(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Tr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...i};return ep()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&wr(n.emulatorConfig.host)&&(d.credentials="include"),wu.fetch()(await bu(n,n.config.apiHost,t,l),d)})}async function Au(n,e,t){n._canInitEmulator=!1;const r={...km,...e};try{const s=new Om(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw Qr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,d]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qr(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Qr(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw Qr(n,"user-disabled",a);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Tu(n,p,d);Ue(n,p)}}catch(s){if(s instanceof Be)throw s;Ue(n,"network-request-failed",{message:String(s)})}}async function br(n,e,t,r,s={}){const i=await Nt(n,e,t,r,s);return"mfaPendingCredential"in i&&Ue(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function bu(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Eo(n.config,s):`${n.config.apiScheme}://${s}`;return Vm.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Nm(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Om{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(He(this.auth,"network-request-failed")),Dm.get())})}}function Qr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=He(n,e,r);return s.customData._tokenResponse=t,s}function kc(n){return n!==void 0&&n.enterprise!==void 0}class xm{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Nm(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Lm(n,e){return Nt(n,"GET","/v2/recaptchaConfig",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mm(n,e){return Nt(n,"POST","/v1/accounts:delete",e)}async function ms(n,e){return Nt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fm(n,e=!1){const t=se(n),r=await t.getIdToken(e),s=vo(r);M(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:or(Ni(s.auth_time)),issuedAtTime:or(Ni(s.iat)),expirationTime:or(Ni(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ni(n){return Number(n)*1e3}function vo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return ts("JWT malformed, contained fewer than 3 sections"),null;try{const s=ou(t);return s?JSON.parse(s):(ts("Failed to decode base64 JWT payload"),null)}catch(s){return ts("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Vc(n){const e=vo(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Be&&Um(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Um({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=or(this.lastLoginAt),this.creationTime=or(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gs(n){var _;const e=n.auth,t=await n.getIdToken(),r=await dr(n,ms(e,{idToken:t}));M(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(_=s.providerUserInfo)!=null&&_.length?Ru(s.providerUserInfo):[],a=qm(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=l?u:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Qi(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Bm(n){const e=se(n);await gs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qm(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Ru(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jm(n,e){const t=await Au(n,{},async()=>{const r=Tr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await bu(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&wr(n.emulatorConfig.host)&&(u.credentials="include"),wu.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function zm(n,e){return Nt(n,"POST","/v2/accounts:revokeToken",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=Vc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await jm(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new _n;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(M(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(M(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _n,this.toJSON())}_performRefresh(){return tt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class xe{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new $m(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Qi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await dr(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Fm(this,e)}reload(){return Bm(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new xe({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await gs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(De(this.auth.app))return Promise.reject(rt(this.auth));const e=await this.getIdToken();return await dr(this,Mm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:_,emailVerified:T,isAnonymous:P,providerData:V,stsTokenManager:x}=t;M(_&&x,e,"internal-error");const N=_n.fromJSON(this.name,x);M(typeof _=="string",e,"internal-error"),gt(r,e.name),gt(s,e.name),M(typeof T=="boolean",e,"internal-error"),M(typeof P=="boolean",e,"internal-error"),gt(i,e.name),gt(a,e.name),gt(l,e.name),gt(u,e.name),gt(d,e.name),gt(p,e.name);const H=new xe({uid:_,auth:e,email:s,emailVerified:T,displayName:r,isAnonymous:P,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:N,createdAt:d,lastLoginAt:p});return V&&Array.isArray(V)&&(H.providerData=V.map(K=>({...K}))),u&&(H._redirectEventId=u),H}static async _fromIdTokenResponse(e,t,r=!1){const s=new _n;s.updateFromServerResponse(t);const i=new xe({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await gs(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];M(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Ru(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new _n;l.updateFromIdToken(r);const u=new xe({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Qi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,d),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc=new Map;function nt(n){at(n instanceof Function,"Expected a class definition");let e=Dc.get(n);return e?(at(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Dc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Su.type="NONE";const Nc=Su;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n,e,t){return`firebase:${n}:${e}:${t}`}class yn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ns(this.userKey,s.apiKey,i),this.fullPersistenceKey=ns("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ms(this.auth,{idToken:e}).catch(()=>{});return t?xe._fromGetAccountInfoResponse(this.auth,t,e):null}return xe._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new yn(nt(Nc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||nt(Nc);const a=ns(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){let _;if(typeof p=="string"){const T=await ms(e,{idToken:p}).catch(()=>{});if(!T)break;_=await xe._fromGetAccountInfoResponse(e,T,p)}else _=xe._fromJSON(e,p);d!==i&&(l=_),i=d;break}}catch{}const u=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new yn(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new yn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Vu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nu(e))return"Blackberry";if(Ou(e))return"Webos";if(Cu(e))return"Safari";if((e.includes("chrome/")||ku(e))&&!e.includes("edge/"))return"Chrome";if(Du(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Pu(n=Ie()){return/firefox\//i.test(n)}function Cu(n=Ie()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ku(n=Ie()){return/crios\//i.test(n)}function Vu(n=Ie()){return/iemobile/i.test(n)}function Du(n=Ie()){return/android/i.test(n)}function Nu(n=Ie()){return/blackberry/i.test(n)}function Ou(n=Ie()){return/webos/i.test(n)}function Io(n=Ie()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Wm(n=Ie()){var e;return Io(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Hm(){return np()&&document.documentMode===10}function xu(n=Ie()){return Io(n)||Du(n)||Ou(n)||Nu(n)||/windows phone/i.test(n)||Vu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(n,e=[]){let t;switch(n){case"Browser":t=Oc(Ie());break;case"Worker":t=`${Oc(Ie())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Cn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Km(n,e={}){return Nt(n,"GET","/v2/passwordPolicy",Dt(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm=6;class Ym{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Qm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xc(this),this.idTokenSubscription=new xc(this),this.beforeStateQueue=new Gm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Iu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=nt(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await yn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ms(this,{idToken:e}),r=await xe._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(De(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await gs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Cm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(De(this.app))return Promise.reject(rt(this));const t=e?se(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return De(this.app)?Promise.reject(rt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return De(this.app)?Promise.reject(rt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(nt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Km(this),t=new Ym(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new nn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await zm(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&nt(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await yn.create(this,[nt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(De(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Rm(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function sn(n){return se(n)}class xc{constructor(e){this.auth=e,this.observer=null,this.addObserver=lp(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Xm(n){xs=n}function Mu(n){return xs.loadJS(n)}function Zm(){return xs.recaptchaEnterpriseScript}function eg(){return xs.gapiScript}function tg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class ng{constructor(){this.enterprise=new rg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class rg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const sg="recaptcha-enterprise",Fu="NO_RECAPTCHA";class ig{constructor(e){this.type=sg,this.auth=sn(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{Lm(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new xm(u);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;kc(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(Fu)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ng().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&kc(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Zm();u.length!==0&&(u+=l),Mu(u).then(()=>{s(l,i,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}async function Lc(n,e,t,r=!1,s=!1){const i=new ig(n);let a;if(s)a=Fu;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Yi(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Lc(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Lc(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function og(n,e){const t=rn(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(bt(i,e??{}))return s;Ue(s,"already-initialized")}return t.initialize({options:e})}function ag(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(nt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function cg(n,e,t){const r=sn(n);M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Uu(e),{host:a,port:l}=lg(e),u=l===null?"":`:${l}`,d={url:`${i}//${a}${u}/`},p=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){M(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),M(bt(d,r.config.emulator)&&bt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,wr(a)?fu(`${i}//${a}${u}`):ug()}function Uu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function lg(n){const e=Uu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Mc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Mc(a)}}}function Mc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function ug(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return tt("not implemented")}_getIdTokenResponse(e){return tt("not implemented")}_linkToIdToken(e,t){return tt("not implemented")}_getReauthenticationResolver(e){return tt("not implemented")}}async function hg(n,e){return Nt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dg(n,e){return br(n,"POST","/v1/accounts:signInWithPassword",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fg(n,e){return br(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}async function pg(n,e){return br(n,"POST","/v1/accounts:signInWithEmailLink",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr extends To{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new fr(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new fr(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yi(e,t,"signInWithPassword",dg);case"emailLink":return fg(e,{email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Yi(e,r,"signUpPassword",hg);case"emailLink":return pg(e,{idToken:t,email:this._email,oobCode:this._password});default:Ue(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(n,e){return br(n,"POST","/v1/accounts:signInWithIdp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg="http://localhost";class Kt extends To{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Kt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ue("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new Kt(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return En(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,En(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,En(e,t)}buildRequest(){const e={requestUri:mg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Tr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _g(n){const e=er(tr(n)).link,t=e?er(tr(e)).deep_link_id:null,r=er(tr(n)).deep_link_id;return(r?er(tr(r)).link:null)||r||t||e||n}class wo{constructor(e){const t=er(tr(e)),r=t.apiKey??null,s=t.oobCode??null,i=gg(t.mode??null);M(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=_g(e);try{return new wo(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(){this.providerId=kn.PROVIDER_ID}static credential(e,t){return fr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=wo.parseLink(t);return M(r,"argument-error"),fr._fromEmailAndCode(e,r.code,r.tenantId)}}kn.PROVIDER_ID="password";kn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";kn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends $u{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Rr{constructor(){super("facebook.com")}static credential(e){return Kt._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _t.credential(e.oauthAccessToken)}catch{return null}}}_t.FACEBOOK_SIGN_IN_METHOD="facebook.com";_t.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et extends Rr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Kt._fromParams({providerId:et.PROVIDER_ID,signInMethod:et.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return et.credentialFromTaggedObject(e)}static credentialFromError(e){return et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return et.credential(t,r)}catch{return null}}}et.GOOGLE_SIGN_IN_METHOD="google.com";et.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt extends Rr{constructor(){super("github.com")}static credential(e){return Kt._fromParams({providerId:yt.PROVIDER_ID,signInMethod:yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yt.credentialFromTaggedObject(e)}static credentialFromError(e){return yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yt.credential(e.oauthAccessToken)}catch{return null}}}yt.GITHUB_SIGN_IN_METHOD="github.com";yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends Rr{constructor(){super("twitter.com")}static credential(e,t){return Kt._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Et.credential(t,r)}catch{return null}}}Et.TWITTER_SIGN_IN_METHOD="twitter.com";Et.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yg(n,e){return br(n,"POST","/v1/accounts:signUp",Dt(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await xe._fromIdTokenResponse(e,r,s),a=Fc(r);return new Qt({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Fc(r);return new Qt({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Fc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends Be{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,_s.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new _s(e,t,r,s)}}function Bu(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?_s._fromErrorAndOperation(n,i,e,r):i})}async function Eg(n,e,t=!1){const r=await dr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qt._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vg(n,e,t=!1){const{auth:r}=n;if(De(r.app))return Promise.reject(rt(r));const s="reauthenticate";try{const i=await dr(n,Bu(r,s,e,n),t);M(i.idToken,r,"internal-error");const a=vo(i.idToken);M(a,r,"internal-error");const{sub:l}=a;return M(n.uid===l,r,"user-mismatch"),Qt._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ue(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qu(n,e,t=!1){if(De(n.app))return Promise.reject(rt(n));const r="signIn",s=await Bu(n,r,e),i=await Qt._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Ig(n,e){return qu(sn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ju(n){const e=sn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Tg(n,e,t){if(De(n.app))return Promise.reject(rt(n));const r=sn(n),a=await Yi(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",yg).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&ju(n),u}),l=await Qt._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function wg(n,e,t){return De(n.app)?Promise.reject(rt(n)):Ig(se(n),kn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ju(n),r})}function Ag(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function bg(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function Rg(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Sg(n){return se(n).signOut()}const ys="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(ys,"1"),this.storage.removeItem(ys),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=1e3,Cg=10;class Wu extends zu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=xu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);Hm()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Cg):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Pg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Wu.type="LOCAL";const kg=Wu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu extends zu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hu.type="SESSION";const Gu=Hu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ls(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async d=>d(t.origin,i)),u=await Vg(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ls.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const d=Ao("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(_){const T=_;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(T.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ge(){return window}function Ng(n){Ge().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(){return typeof Ge().WorkerGlobalScope<"u"&&typeof Ge().importScripts=="function"}async function Og(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function xg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Lg(){return Ku()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qu="firebaseLocalStorageDb",Mg=1,Es="firebaseLocalStorage",Yu="fbase_key";class Sr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ms(n,e){return n.transaction([Es],e?"readwrite":"readonly").objectStore(Es)}function Fg(){const n=indexedDB.deleteDatabase(Qu);return new Sr(n).toPromise()}function Ji(){const n=indexedDB.open(Qu,Mg);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Es,{keyPath:Yu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Es)?e(r):(r.close(),await Fg(),e(await Ji()))})})}async function Uc(n,e,t){const r=Ms(n,!0).put({[Yu]:e,value:t});return new Sr(r).toPromise()}async function Ug(n,e){const t=Ms(n,!1).get(e),r=await new Sr(t).toPromise();return r===void 0?null:r.value}function $c(n,e){const t=Ms(n,!0).delete(e);return new Sr(t).toPromise()}const $g=800,Bg=3;class Ju{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ji(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Bg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ku()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ls._getInstance(Lg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Og(),!this.activeServiceWorker)return;this.sender=new Dg(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||xg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ji();return await Uc(e,ys,"1"),await $c(e,ys),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Uc(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Ug(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$c(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ms(s,!1).getAll();return new Sr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$g)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ju.type="LOCAL";const qg=Ju;new Ar(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jg(n,e){return e?nt(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo extends To{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return En(e,this._buildIdpRequest())}_linkToIdToken(e,t){return En(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return En(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zg(n){return qu(n.auth,new bo(n),n.bypassAuthState)}function Wg(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),vg(t,new bo(n),n.bypassAuthState)}async function Hg(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Eg(t,new bo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zg;case"linkViaPopup":case"linkViaRedirect":return Hg;case"reauthViaPopup":case"reauthViaRedirect":return Wg;default:Ue(this.auth,"internal-error")}}resolve(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gg=new Ar(2e3,1e4);class gn extends Xu{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,gn.currentPopupAction&&gn.currentPopupAction.cancel(),gn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){at(this.filter.length===1,"Popup operations only handle one event");const e=Ao();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(He(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(He(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,gn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(He(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Gg.get())};e()}}gn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="pendingRedirect",rs=new Map;class Qg extends Xu{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=rs.get(this.auth._key());if(!e){try{const r=await Yg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}rs.set(this.auth._key(),e)}return this.bypassAuthState||rs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yg(n,e){const t=Zg(e),r=Xg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Jg(n,e){rs.set(n._key(),e)}function Xg(n){return nt(n._redirectPersistence)}function Zg(n){return ns(Kg,n.config.apiKey,n.name)}async function e_(n,e,t=!1){if(De(n.app))return Promise.reject(rt(n));const r=sn(n),s=jg(r,e),a=await new Qg(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_=600*1e3;class n_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!r_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Zu(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(He(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=t_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bc(e))}saveEventToCache(e){this.cachedEventUids.add(Bc(e)),this.lastProcessedEventTime=Date.now()}}function Bc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Zu({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function r_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Zu(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s_(n,e={}){return Nt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,o_=/^https?/;async function a_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await s_(n);for(const t of e)try{if(c_(t))return}catch{}Ue(n,"unauthorized-domain")}function c_(n){const e=Ki(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!o_.test(t))return!1;if(i_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=new Ar(3e4,6e4);function qc(){const n=Ge().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function u_(n){return new Promise((e,t)=>{var s,i,a;function r(){qc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qc(),t(He(n,"network-request-failed"))},timeout:l_.get()})}if((i=(s=Ge().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=Ge().gapi)!=null&&a.load)r();else{const l=tg("iframefcb");return Ge()[l]=()=>{gapi.load?r():t(He(n,"network-request-failed"))},Mu(`${eg()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw ss=null,e})}let ss=null;function h_(n){return ss=ss||u_(n),ss}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=new Ar(5e3,15e3),f_="__/auth/iframe",p_="emulator/auth/iframe",m_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},g_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function __(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Eo(e,p_):`https://${n.config.authDomain}/${f_}`,r={apiKey:e.apiKey,appName:n.name,v:Cn},s=g_.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Tr(r).slice(1)}`}async function y_(n){const e=await h_(n),t=Ge().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:__(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:m_,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=He(n,"network-request-failed"),l=Ge().setTimeout(()=>{i(a)},d_.get());function u(){Ge().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},v_=500,I_=600,T_="_blank",w_="http://localhost";class jc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function A_(n,e,t,r=v_,s=I_){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...E_,width:r.toString(),height:s.toString(),top:i,left:a},d=Ie().toLowerCase();t&&(l=ku(d)?T_:t),Pu(d)&&(e=e||w_,u.scrollbars="yes");const p=Object.entries(u).reduce((T,[P,V])=>`${T}${P}=${V},`,"");if(Wm(d)&&l!=="_self")return b_(e||"",l),new jc(null);const _=window.open(e||"",l,p);M(_,n,"popup-blocked");try{_.focus()}catch{}return new jc(_)}function b_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R_="__/auth/handler",S_="emulator/auth/handler",P_=encodeURIComponent("fac");async function zc(n,e,t,r,s,i){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Cn,eventId:s};if(e instanceof $u){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",cp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,_]of Object.entries({}))a[p]=_}if(e instanceof Rr){const p=e.getScopes().filter(_=>_!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await n._getAppCheckToken(),d=u?`#${P_}=${encodeURIComponent(u)}`:"";return`${C_(n)}?${Tr(l).slice(1)}${d}`}function C_({config:n}){return n.emulator?Eo(n,S_):`https://${n.authDomain}/${R_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi="webStorageSupport";class k_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Gu,this._completeRedirectFn=e_,this._overrideRedirectResult=Jg}async _openPopup(e,t,r,s){var a;at((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await zc(e,t,r,Ki(),s);return A_(e,i,Ao())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await zc(e,t,r,Ki(),s);return Ng(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(at(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await y_(e),r=new n_(e);return t.register("authEvent",s=>(M(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Oi,{type:Oi},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Oi];i!==void 0&&t(!!i),Ue(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=a_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return xu()||Cu()||Io()}}const V_=k_;var Wc="@firebase/auth",Hc="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function O_(n){Je(new Fe("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lu(n)},d=new Jm(r,s,i,u);return ag(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Je(new Fe("auth-internal",e=>{const t=sn(e.getProvider("auth").getImmediate());return(r=>new D_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Oe(Wc,Hc,N_(n)),Oe(Wc,Hc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_=300,L_=lu("authIdTokenMaxAge")||x_;let Gc=null;const M_=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>L_)return;const s=t==null?void 0:t.token;Gc!==s&&(Gc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function F_(n=_o()){const e=rn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=og(n,{popupRedirectResolver:V_,persistence:[qg,kg,Gu]}),r=lu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=M_(i.toString());bg(t,a,()=>a(t.currentUser)),Ag(t,l=>a(l))}}const s=au("auth");return s&&cg(t,`http://${s}`),t}function U_(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Xm({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=He("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",U_().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});O_("Browser");var Kc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wt,eh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,m){function y(){}y.prototype=m.prototype,v.F=m.prototype,v.prototype=new y,v.prototype.constructor=v,v.D=function(I,E,A){for(var g=Array(arguments.length-2),be=2;be<arguments.length;be++)g[be-2]=arguments[be];return m.prototype[E].apply(I,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,m,y){y||(y=0);const I=Array(16);if(typeof m=="string")for(var E=0;E<16;++E)I[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;E<16;++E)I[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=v.g[0],y=v.g[1],E=v.g[2];let A=v.g[3],g;g=m+(A^y&(E^A))+I[0]+3614090360&4294967295,m=y+(g<<7&4294967295|g>>>25),g=A+(E^m&(y^E))+I[1]+3905402710&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(y^A&(m^y))+I[2]+606105819&4294967295,E=A+(g<<17&4294967295|g>>>15),g=y+(m^E&(A^m))+I[3]+3250441966&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(A^y&(E^A))+I[4]+4118548399&4294967295,m=y+(g<<7&4294967295|g>>>25),g=A+(E^m&(y^E))+I[5]+1200080426&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(y^A&(m^y))+I[6]+2821735955&4294967295,E=A+(g<<17&4294967295|g>>>15),g=y+(m^E&(A^m))+I[7]+4249261313&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(A^y&(E^A))+I[8]+1770035416&4294967295,m=y+(g<<7&4294967295|g>>>25),g=A+(E^m&(y^E))+I[9]+2336552879&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(y^A&(m^y))+I[10]+4294925233&4294967295,E=A+(g<<17&4294967295|g>>>15),g=y+(m^E&(A^m))+I[11]+2304563134&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(A^y&(E^A))+I[12]+1804603682&4294967295,m=y+(g<<7&4294967295|g>>>25),g=A+(E^m&(y^E))+I[13]+4254626195&4294967295,A=m+(g<<12&4294967295|g>>>20),g=E+(y^A&(m^y))+I[14]+2792965006&4294967295,E=A+(g<<17&4294967295|g>>>15),g=y+(m^E&(A^m))+I[15]+1236535329&4294967295,y=E+(g<<22&4294967295|g>>>10),g=m+(E^A&(y^E))+I[1]+4129170786&4294967295,m=y+(g<<5&4294967295|g>>>27),g=A+(y^E&(m^y))+I[6]+3225465664&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(A^m))+I[11]+643717713&4294967295,E=A+(g<<14&4294967295|g>>>18),g=y+(A^m&(E^A))+I[0]+3921069994&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(y^E))+I[5]+3593408605&4294967295,m=y+(g<<5&4294967295|g>>>27),g=A+(y^E&(m^y))+I[10]+38016083&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(A^m))+I[15]+3634488961&4294967295,E=A+(g<<14&4294967295|g>>>18),g=y+(A^m&(E^A))+I[4]+3889429448&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(y^E))+I[9]+568446438&4294967295,m=y+(g<<5&4294967295|g>>>27),g=A+(y^E&(m^y))+I[14]+3275163606&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(A^m))+I[3]+4107603335&4294967295,E=A+(g<<14&4294967295|g>>>18),g=y+(A^m&(E^A))+I[8]+1163531501&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(E^A&(y^E))+I[13]+2850285829&4294967295,m=y+(g<<5&4294967295|g>>>27),g=A+(y^E&(m^y))+I[2]+4243563512&4294967295,A=m+(g<<9&4294967295|g>>>23),g=E+(m^y&(A^m))+I[7]+1735328473&4294967295,E=A+(g<<14&4294967295|g>>>18),g=y+(A^m&(E^A))+I[12]+2368359562&4294967295,y=E+(g<<20&4294967295|g>>>12),g=m+(y^E^A)+I[5]+4294588738&4294967295,m=y+(g<<4&4294967295|g>>>28),g=A+(m^y^E)+I[8]+2272392833&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^y)+I[11]+1839030562&4294967295,E=A+(g<<16&4294967295|g>>>16),g=y+(E^A^m)+I[14]+4259657740&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^A)+I[1]+2763975236&4294967295,m=y+(g<<4&4294967295|g>>>28),g=A+(m^y^E)+I[4]+1272893353&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^y)+I[7]+4139469664&4294967295,E=A+(g<<16&4294967295|g>>>16),g=y+(E^A^m)+I[10]+3200236656&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^A)+I[13]+681279174&4294967295,m=y+(g<<4&4294967295|g>>>28),g=A+(m^y^E)+I[0]+3936430074&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^y)+I[3]+3572445317&4294967295,E=A+(g<<16&4294967295|g>>>16),g=y+(E^A^m)+I[6]+76029189&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(y^E^A)+I[9]+3654602809&4294967295,m=y+(g<<4&4294967295|g>>>28),g=A+(m^y^E)+I[12]+3873151461&4294967295,A=m+(g<<11&4294967295|g>>>21),g=E+(A^m^y)+I[15]+530742520&4294967295,E=A+(g<<16&4294967295|g>>>16),g=y+(E^A^m)+I[2]+3299628645&4294967295,y=E+(g<<23&4294967295|g>>>9),g=m+(E^(y|~A))+I[0]+4096336452&4294967295,m=y+(g<<6&4294967295|g>>>26),g=A+(y^(m|~E))+I[7]+1126891415&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~y))+I[14]+2878612391&4294967295,E=A+(g<<15&4294967295|g>>>17),g=y+(A^(E|~m))+I[5]+4237533241&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~A))+I[12]+1700485571&4294967295,m=y+(g<<6&4294967295|g>>>26),g=A+(y^(m|~E))+I[3]+2399980690&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~y))+I[10]+4293915773&4294967295,E=A+(g<<15&4294967295|g>>>17),g=y+(A^(E|~m))+I[1]+2240044497&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~A))+I[8]+1873313359&4294967295,m=y+(g<<6&4294967295|g>>>26),g=A+(y^(m|~E))+I[15]+4264355552&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~y))+I[6]+2734768916&4294967295,E=A+(g<<15&4294967295|g>>>17),g=y+(A^(E|~m))+I[13]+1309151649&4294967295,y=E+(g<<21&4294967295|g>>>11),g=m+(E^(y|~A))+I[4]+4149444226&4294967295,m=y+(g<<6&4294967295|g>>>26),g=A+(y^(m|~E))+I[11]+3174756917&4294967295,A=m+(g<<10&4294967295|g>>>22),g=E+(m^(A|~y))+I[2]+718787259&4294967295,E=A+(g<<15&4294967295|g>>>17),g=y+(A^(E|~m))+I[9]+3951481745&4294967295,v.g[0]=v.g[0]+m&4294967295,v.g[1]=v.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+A&4294967295}r.prototype.v=function(v,m){m===void 0&&(m=v.length);const y=m-this.blockSize,I=this.C;let E=this.h,A=0;for(;A<m;){if(E==0)for(;A<=y;)s(this,v,A),A+=this.blockSize;if(typeof v=="string"){for(;A<m;)if(I[E++]=v.charCodeAt(A++),E==this.blockSize){s(this,I),E=0;break}}else for(;A<m;)if(I[E++]=v[A++],E==this.blockSize){s(this,I),E=0;break}}this.h=E,this.o+=m},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var m=1;m<v.length-8;++m)v[m]=0;m=this.o*8;for(var y=v.length-8;y<v.length;++y)v[y]=m&255,m/=256;for(this.v(v),v=Array(16),m=0,y=0;y<4;++y)for(let I=0;I<32;I+=8)v[m++]=this.g[y]>>>I&255;return v};function i(v,m){var y=l;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=m(v)}function a(v,m){this.h=m;const y=[];let I=!0;for(let E=v.length-1;E>=0;E--){const A=v[E]|0;I&&A==m||(y[E]=A,I=!1)}this.g=y}var l={};function u(v){return-128<=v&&v<128?i(v,function(m){return new a([m|0],m<0?-1:0)}):new a([v|0],v<0?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return _;if(v<0)return N(d(-v));const m=[];let y=1;for(let I=0;v>=y;I++)m[I]=v/y|0,y*=4294967296;return new a(m,0)}function p(v,m){if(v.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(v.charAt(0)=="-")return N(p(v.substring(1),m));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(m,8));let I=_;for(let A=0;A<v.length;A+=8){var E=Math.min(8,v.length-A);const g=parseInt(v.substring(A,A+E),m);E<8?(E=d(Math.pow(m,E)),I=I.j(E).add(d(g))):(I=I.j(y),I=I.add(d(g)))}return I}var _=u(0),T=u(1),P=u(16777216);n=a.prototype,n.m=function(){if(x(this))return-N(this).m();let v=0,m=1;for(let y=0;y<this.g.length;y++){const I=this.i(y);v+=(I>=0?I:4294967296+I)*m,m*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(V(this))return"0";if(x(this))return"-"+N(this).toString(v);const m=d(Math.pow(v,6));var y=this;let I="";for(;;){const E=Ve(y,m).g;y=H(y,E.j(m));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(v);if(y=E,V(y))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function V(v){if(v.h!=0)return!1;for(let m=0;m<v.g.length;m++)if(v.g[m]!=0)return!1;return!0}function x(v){return v.h==-1}n.l=function(v){return v=H(this,v),x(v)?-1:V(v)?0:1};function N(v){const m=v.g.length,y=[];for(let I=0;I<m;I++)y[I]=~v.g[I];return new a(y,~v.h).add(T)}n.abs=function(){return x(this)?N(this):this},n.add=function(v){const m=Math.max(this.g.length,v.g.length),y=[];let I=0;for(let E=0;E<=m;E++){let A=I+(this.i(E)&65535)+(v.i(E)&65535),g=(A>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);I=g>>>16,A&=65535,g&=65535,y[E]=g<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function H(v,m){return v.add(N(m))}n.j=function(v){if(V(this)||V(v))return _;if(x(this))return x(v)?N(this).j(N(v)):N(N(this).j(v));if(x(v))return N(this.j(N(v)));if(this.l(P)<0&&v.l(P)<0)return d(this.m()*v.m());const m=this.g.length+v.g.length,y=[];for(var I=0;I<2*m;I++)y[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<v.g.length;E++){const A=this.i(I)>>>16,g=this.i(I)&65535,be=v.i(E)>>>16,Mt=v.i(E)&65535;y[2*I+2*E]+=g*Mt,K(y,2*I+2*E),y[2*I+2*E+1]+=A*Mt,K(y,2*I+2*E+1),y[2*I+2*E+1]+=g*be,K(y,2*I+2*E+1),y[2*I+2*E+2]+=A*be,K(y,2*I+2*E+2)}for(v=0;v<m;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=m;v<2*m;v++)y[v]=0;return new a(y,0)};function K(v,m){for(;(v[m]&65535)!=v[m];)v[m+1]+=v[m]>>>16,v[m]&=65535,m++}function ee(v,m){this.g=v,this.h=m}function Ve(v,m){if(V(m))throw Error("division by zero");if(V(v))return new ee(_,_);if(x(v))return m=Ve(N(v),m),new ee(N(m.g),N(m.h));if(x(m))return m=Ve(v,N(m)),new ee(N(m.g),m.h);if(v.g.length>30){if(x(v)||x(m))throw Error("slowDivide_ only works with positive integers.");for(var y=T,I=m;I.l(v)<=0;)y=me(y),I=me(I);var E=ge(y,1),A=ge(I,1);for(I=ge(I,2),y=ge(y,2);!V(I);){var g=A.add(I);g.l(v)<=0&&(E=E.add(y),A=g),I=ge(I,1),y=ge(y,1)}return m=H(v,E.j(m)),new ee(E,m)}for(E=_;v.l(m)>=0;){for(y=Math.max(1,Math.floor(v.m()/m.m())),I=Math.ceil(Math.log(y)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=d(y),g=A.j(m);x(g)||g.l(v)>0;)y-=I,A=d(y),g=A.j(m);V(A)&&(A=T),E=E.add(A),v=H(v,g)}return new ee(E,v)}n.B=function(v){return Ve(this,v).h},n.and=function(v){const m=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<m;I++)y[I]=this.i(I)&v.i(I);return new a(y,this.h&v.h)},n.or=function(v){const m=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<m;I++)y[I]=this.i(I)|v.i(I);return new a(y,this.h|v.h)},n.xor=function(v){const m=Math.max(this.g.length,v.g.length),y=[];for(let I=0;I<m;I++)y[I]=this.i(I)^v.i(I);return new a(y,this.h^v.h)};function me(v){const m=v.g.length+1,y=[];for(let I=0;I<m;I++)y[I]=v.i(I)<<1|v.i(I-1)>>>31;return new a(y,v.h)}function ge(v,m){const y=m>>5;m%=32;const I=v.g.length-y,E=[];for(let A=0;A<I;A++)E[A]=m>0?v.i(A+y)>>>m|v.i(A+y+1)<<32-m:v.i(A+y);return new a(E,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,eh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,wt=a}).apply(typeof Kc<"u"?Kc:typeof self<"u"?self:typeof window<"u"?window:{});var Yr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var th,nr,nh,is,Xi,rh,sh,ih;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yr=="object"&&Yr];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var w=o[f];if(!(w in h))break e;h=h[w]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var h=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&h.push([f,c[f]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function l(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function u(o,c,h){return o.call.apply(o.bind,arguments)}function d(o,c,h){return d=u,d.apply(null,arguments)}function p(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function _(o,c){function h(){}h.prototype=c.prototype,o.Z=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(f,w,b){for(var C=Array(arguments.length-2),B=2;B<arguments.length;B++)C[B-2]=arguments[B];return c.prototype[w].apply(f,C)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function P(o){const c=o.length;if(c>0){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function V(o,c){for(let f=1;f<arguments.length;f++){const w=arguments[f];var h=typeof w;if(h=h!="object"?h:w?Array.isArray(w)?"array":h:"null",h=="array"||h=="object"&&typeof w.length=="number"){h=o.length||0;const b=w.length||0;o.length=h+b;for(let C=0;C<b;C++)o[h+C]=w[C]}else o.push(w)}}class x{constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function N(o){a.setTimeout(()=>{throw o},0)}function H(){var o=v;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class K{constructor(){this.h=this.g=null}add(c,h){const f=ee.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var ee=new x(()=>new Ve,o=>o.reset());class Ve{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let me,ge=!1,v=new K,m=()=>{const o=Promise.resolve(void 0);me=()=>{o.then(y)}};function y(){for(var o;o=H();){try{o.h.call(o.g)}catch(h){N(h)}var c=ee;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}ge=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var A=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,c),a.removeEventListener("test",h,c)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function be(o,c){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}_(be,E),be.prototype.init=function(o,c){const h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&be.Z.h.call(this)},be.prototype.h=function(){be.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Mt="closure_listenable_"+(Math.random()*1e6|0),lf=0;function uf(o,c,h,f,w){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=w,this.key=++lf,this.da=this.fa=!1}function Or(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function xr(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function hf(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function _a(o){const c={};for(const h in o)c[h]=o[h];return c}const ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ea(o,c){let h,f;for(let w=1;w<arguments.length;w++){f=arguments[w];for(h in f)o[h]=f[h];for(let b=0;b<ya.length;b++)h=ya[b],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function Lr(o){this.src=o,this.g={},this.h=0}Lr.prototype.add=function(o,c,h,f,w){const b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);const C=ii(o,c,f,w);return C>-1?(c=o[C],h||(c.fa=!1)):(c=new uf(c,this.src,b,!!f,w),c.fa=h,o.push(c)),c};function si(o,c){const h=c.type;if(h in o.g){var f=o.g[h],w=Array.prototype.indexOf.call(f,c,void 0),b;(b=w>=0)&&Array.prototype.splice.call(f,w,1),b&&(Or(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function ii(o,c,h,f){for(let w=0;w<o.length;++w){const b=o[w];if(!b.da&&b.listener==c&&b.capture==!!h&&b.ha==f)return w}return-1}var oi="closure_lm_"+(Math.random()*1e6|0),ai={};function va(o,c,h,f,w){if(Array.isArray(c)){for(let b=0;b<c.length;b++)va(o,c[b],h,f,w);return null}return h=wa(h),o&&o[Mt]?o.J(c,h,l(f)?!!f.capture:!1,w):df(o,c,h,!1,f,w)}function df(o,c,h,f,w,b){if(!c)throw Error("Invalid event type");const C=l(w)?!!w.capture:!!w;let B=li(o);if(B||(o[oi]=B=new Lr(o)),h=B.add(c,h,f,C,b),h.proxy)return h;if(f=ff(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)A||(w=C),w===void 0&&(w=!1),o.addEventListener(c.toString(),f,w);else if(o.attachEvent)o.attachEvent(Ta(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function ff(){function o(h){return c.call(o.src,o.listener,h)}const c=pf;return o}function Ia(o,c,h,f,w){if(Array.isArray(c))for(var b=0;b<c.length;b++)Ia(o,c[b],h,f,w);else f=l(f)?!!f.capture:!!f,h=wa(h),o&&o[Mt]?(o=o.i,b=String(c).toString(),b in o.g&&(c=o.g[b],h=ii(c,h,f,w),h>-1&&(Or(c[h]),Array.prototype.splice.call(c,h,1),c.length==0&&(delete o.g[b],o.h--)))):o&&(o=li(o))&&(c=o.g[c.toString()],o=-1,c&&(o=ii(c,h,f,w)),(h=o>-1?c[o]:null)&&ci(h))}function ci(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[Mt])si(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(Ta(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=li(c))?(si(h,o),h.h==0&&(h.src=null,c[oi]=null)):Or(o)}}}function Ta(o){return o in ai?ai[o]:ai[o]="on"+o}function pf(o,c){if(o.da)o=!0;else{c=new be(c,this);const h=o.listener,f=o.ha||o.src;o.fa&&ci(o),o=h.call(f,c)}return o}function li(o){return o=o[oi],o instanceof Lr?o:null}var ui="__closure_events_fn_"+(Math.random()*1e9>>>0);function wa(o){return typeof o=="function"?o:(o[ui]||(o[ui]=function(c){return o.handleEvent(c)}),o[ui])}function _e(){I.call(this),this.i=new Lr(this),this.M=this,this.G=null}_(_e,I),_e.prototype[Mt]=!0,_e.prototype.removeEventListener=function(o,c,h,f){Ia(this,o,c,h,f)};function Te(o,c){var h,f=o.G;if(f)for(h=[];f;f=f.G)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new E(c,o);else if(c instanceof E)c.target=c.target||o;else{var w=c;c=new E(f,o),Ea(c,w)}w=!0;let b,C;if(h)for(C=h.length-1;C>=0;C--)b=c.g=h[C],w=Mr(b,f,!0,c)&&w;if(b=c.g=o,w=Mr(b,f,!0,c)&&w,w=Mr(b,f,!1,c)&&w,h)for(C=0;C<h.length;C++)b=c.g=h[C],w=Mr(b,f,!1,c)&&w}_e.prototype.N=function(){if(_e.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const h=o.g[c];for(let f=0;f<h.length;f++)Or(h[f]);delete o.g[c],o.h--}}this.G=null},_e.prototype.J=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},_e.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Mr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let w=!0;for(let b=0;b<c.length;++b){const C=c[b];if(C&&!C.da&&C.capture==h){const B=C.listener,ce=C.ha||C.src;C.fa&&si(o.i,C),w=B.call(ce,f)!==!1&&w}}return w&&!f.defaultPrevented}function mf(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Aa(o){o.g=mf(()=>{o.g=null,o.i&&(o.i=!1,Aa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class gf extends I{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Aa(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Mn(o){I.call(this),this.h=o,this.g={}}_(Mn,I);var ba=[];function Ra(o){xr(o.g,function(c,h){this.g.hasOwnProperty(h)&&ci(c)},o),o.g={}}Mn.prototype.N=function(){Mn.Z.N.call(this),Ra(this)},Mn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var hi=a.JSON.stringify,_f=a.JSON.parse,yf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function Sa(){}function Pa(){}var Fn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function di(){E.call(this,"d")}_(di,E);function fi(){E.call(this,"c")}_(fi,E);var Ft={},Ca=null;function Fr(){return Ca=Ca||new _e}Ft.Ia="serverreachability";function ka(o){E.call(this,Ft.Ia,o)}_(ka,E);function Un(o){const c=Fr();Te(c,new ka(c))}Ft.STAT_EVENT="statevent";function Va(o,c){E.call(this,Ft.STAT_EVENT,o),this.stat=c}_(Va,E);function we(o){const c=Fr();Te(c,new Va(c,o))}Ft.Ja="timingevent";function Da(o,c){E.call(this,Ft.Ja,o),this.size=c}_(Da,E);function $n(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function Bn(){this.g=!0}Bn.prototype.ua=function(){this.g=!1};function Ef(o,c,h,f,w,b){o.info(function(){if(o.g)if(b){var C="",B=b.split("&");for(let Q=0;Q<B.length;Q++){var ce=B[Q].split("=");if(ce.length>1){const ue=ce[0];ce=ce[1];const je=ue.split("_");C=je.length>=2&&je[1]=="type"?C+(ue+"="+ce+"&"):C+(ue+"=redacted&")}}}else C=null;else C=b;return"XMLHTTP REQ ("+f+") [attempt "+w+"]: "+c+`
`+h+`
`+C})}function vf(o,c,h,f,w,b,C){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+w+"]: "+c+`
`+h+`
`+b+" "+C})}function cn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Tf(o,h)+(f?" "+f:"")})}function If(o,c){o.info(function(){return"TIMEOUT: "+c})}Bn.prototype.info=function(){};function Tf(o,c){if(!o.g)return c;if(!c)return null;try{const b=JSON.parse(c);if(b){for(o=0;o<b.length;o++)if(Array.isArray(b[o])){var h=b[o];if(!(h.length<2)){var f=h[1];if(Array.isArray(f)&&!(f.length<1)){var w=f[0];if(w!="noop"&&w!="stop"&&w!="close")for(let C=1;C<f.length;C++)f[C]=""}}}}return hi(b)}catch{return c}}var Ur={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Na={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Oa;function pi(){}_(pi,Sa),pi.prototype.g=function(){return new XMLHttpRequest},Oa=new pi;function qn(o){return encodeURIComponent(String(o))}function wf(o){var c=1;o=o.split(":");const h=[];for(;c>0&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function ut(o,c,h,f){this.j=o,this.i=c,this.l=h,this.S=f||1,this.V=new Mn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new xa}function xa(){this.i=null,this.g="",this.h=!1}var La={},mi={};function gi(o,c,h){o.M=1,o.A=Br(qe(c)),o.u=h,o.R=!0,Ma(o,null)}function Ma(o,c){o.F=Date.now(),$r(o),o.B=qe(o.A);var h=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),Ya(h.i,"t",f),o.C=0,h=o.j.L,o.h=new xa,o.g=pc(o.j,h?c:null,!o.u),o.P>0&&(o.O=new gf(d(o.Y,o,o.g),o.P)),c=o.V,h=o.g,f=o.ba;var w="readystatechange";Array.isArray(w)||(w&&(ba[0]=w.toString()),w=ba);for(let b=0;b<w.length;b++){const C=va(h,w[b],f||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=o.J?_a(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),Un(),Ef(o.i,o.v,o.B,o.l,o.S,o.u)}ut.prototype.ba=function(o){o=o.target;const c=this.O;c&&ft(o)==3?c.j():this.Y(o)},ut.prototype.Y=function(o){try{if(o==this.g)e:{const B=ft(this.g),ce=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||rc(this.g)))){this.K||B!=4||ce==7||(ce==8||Q<=0?Un(3):Un(2)),_i(this);var c=this.g.ca();this.X=c;var h=Af(this);if(this.o=c==200,vf(this.i,this.v,this.B,this.l,this.S,B,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,w=this.g;if((f=w.g?w.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var b=f;break t}}b=null}if(o=b)cn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,yi(this,o);else{this.o=!1,this.m=3,we(12),Ut(this),jn(this);break e}}if(this.R){o=!0;let ue;for(;!this.K&&this.C<h.length;)if(ue=bf(this,h),ue==mi){B==4&&(this.m=4,we(14),o=!1),cn(this.i,this.l,null,"[Incomplete Response]");break}else if(ue==La){this.m=4,we(15),cn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else cn(this.i,this.l,ue,null),yi(this,ue);if(Fa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||h.length!=0||this.h.h||(this.m=1,we(16),o=!1),this.o=this.o&&o,!o)cn(this.i,this.l,h,"[Invalid Chunked Response]"),Ut(this),jn(this);else if(h.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),Ri(C),C.P=!0,we(11))}}else cn(this.i,this.l,h,null),yi(this,h);B==4&&Ut(this),this.o&&!this.K&&(B==4?uc(this.j,this):(this.o=!1,$r(this)))}else Uf(this.g),c==400&&h.indexOf("Unknown SID")>0?(this.m=3,we(12)):(this.m=0,we(13)),Ut(this),jn(this)}}}catch{}finally{}};function Af(o){if(!Fa(o))return o.g.la();const c=rc(o.g);if(c==="")return"";let h="";const f=c.length,w=ft(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Ut(o),jn(o),"";o.h.i=new a.TextDecoder}for(let b=0;b<f;b++)o.h.h=!0,h+=o.h.i.decode(c[b],{stream:!(w&&b==f-1)});return c.length=0,o.h.g+=h,o.C=0,o.h.g}function Fa(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function bf(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?mi:(h=Number(c.substring(h,f)),isNaN(h)?La:(f+=1,f+h>c.length?mi:(c=c.slice(f,f+h),o.C=f+h,c)))}ut.prototype.cancel=function(){this.K=!0,Ut(this)};function $r(o){o.T=Date.now()+o.H,Ua(o,o.H)}function Ua(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=$n(d(o.aa,o),c)}function _i(o){o.D&&(a.clearTimeout(o.D),o.D=null)}ut.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(If(this.i,this.B),this.M!=2&&(Un(),we(17)),Ut(this),this.m=2,jn(this)):Ua(this,this.T-o)};function jn(o){o.j.I==0||o.K||uc(o.j,o)}function Ut(o){_i(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,Ra(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function yi(o,c){try{var h=o.j;if(h.I!=0&&(h.g==o||Ei(h.h,o))){if(!o.L&&Ei(h.h,o)&&h.I==3){try{var f=h.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var w=f;if(w[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)Hr(h),zr(h);else break e;bi(h),we(18)}}else h.xa=w[1],0<h.xa-h.K&&w[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=$n(d(h.Va,h),6e3));qa(h.h)<=1&&h.ta&&(h.ta=void 0)}else Bt(h,11)}else if((o.L||h.g==o)&&Hr(h),!g(c))for(w=h.Ba.g.parse(c),c=0;c<w.length;c++){let Q=w[c];const ue=Q[0];if(!(ue<=h.K))if(h.K=ue,Q=Q[1],h.I==2)if(Q[0]=="c"){h.M=Q[1],h.ba=Q[2];const je=Q[3];je!=null&&(h.ka=je,h.j.info("VER="+h.ka));const qt=Q[4];qt!=null&&(h.za=qt,h.j.info("SVER="+h.za));const pt=Q[5];pt!=null&&typeof pt=="number"&&pt>0&&(f=1.5*pt,h.O=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const mt=o.g;if(mt){const Kr=mt.g?mt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Kr){var b=f.h;b.g||Kr.indexOf("spdy")==-1&&Kr.indexOf("quic")==-1&&Kr.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(vi(b,b.h),b.h=null))}if(f.G){const Si=mt.g?mt.g.getResponseHeader("X-HTTP-Session-Id"):null;Si&&(f.wa=Si,J(f.J,f.G,Si))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),f=h;var C=o;if(f.na=fc(f,f.L?f.ba:null,f.W),C.L){ja(f.h,C);var B=C,ce=f.O;ce&&(B.H=ce),B.D&&(_i(B),$r(B)),f.g=C}else cc(f);h.i.length>0&&Wr(h)}else Q[0]!="stop"&&Q[0]!="close"||Bt(h,7);else h.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Bt(h,7):Ai(h):Q[0]!="noop"&&h.l&&h.l.qa(Q),h.A=0)}}Un(4)}catch{}}var Rf=class{constructor(o,c){this.g=o,this.map=c}};function $a(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Ba(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function qa(o){return o.h?1:o.g?o.g.size:0}function Ei(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function vi(o,c){o.g?o.g.add(c):o.h=c}function ja(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}$a.prototype.cancel=function(){if(this.i=za(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function za(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.G);return c}return P(o.i)}var Wa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Sf(o,c){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const f=o[h].indexOf("=");let w,b=null;f>=0?(w=o[h].substring(0,f),b=o[h].substring(f+1)):w=o[h],c(w,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function ht(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ht?(this.l=o.l,zn(this,o.j),this.o=o.o,this.g=o.g,Wn(this,o.u),this.h=o.h,Ii(this,Ja(o.i)),this.m=o.m):o&&(c=String(o).match(Wa))?(this.l=!1,zn(this,c[1]||"",!0),this.o=Hn(c[2]||""),this.g=Hn(c[3]||"",!0),Wn(this,c[4]),this.h=Hn(c[5]||"",!0),Ii(this,c[6]||"",!0),this.m=Hn(c[7]||"")):(this.l=!1,this.i=new Kn(null,this.l))}ht.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Gn(c,Ha,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Gn(c,Ha,!0),"@"),o.push(qn(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Gn(h,h.charAt(0)=="/"?kf:Cf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Gn(h,Df)),o.join("")},ht.prototype.resolve=function(o){const c=qe(this);let h=!!o.j;h?zn(c,o.j):h=!!o.o,h?c.o=o.o:h=!!o.g,h?c.g=o.g:h=o.u!=null;var f=o.h;if(h)Wn(c,o.u);else if(h=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var w=c.h.lastIndexOf("/");w!=-1&&(f=c.h.slice(0,w+1)+f)}if(w=f,w==".."||w==".")f="";else if(w.indexOf("./")!=-1||w.indexOf("/.")!=-1){f=w.lastIndexOf("/",0)==0,w=w.split("/");const b=[];for(let C=0;C<w.length;){const B=w[C++];B=="."?f&&C==w.length&&b.push(""):B==".."?((b.length>1||b.length==1&&b[0]!="")&&b.pop(),f&&C==w.length&&b.push("")):(b.push(B),f=!0)}f=b.join("/")}else f=w}return h?c.h=f:h=o.i.toString()!=="",h?Ii(c,Ja(o.i)):h=!!o.m,h&&(c.m=o.m),c};function qe(o){return new ht(o)}function zn(o,c,h){o.j=h?Hn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Wn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Ii(o,c,h){c instanceof Kn?(o.i=c,Nf(o.i,o.l)):(h||(c=Gn(c,Vf)),o.i=new Kn(c,o.l))}function J(o,c,h){o.i.set(c,h)}function Br(o){return J(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Hn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Pf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Pf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ha=/[#\/\?@]/g,Cf=/[#\?:]/g,kf=/[#\?]/g,Vf=/[#\?@]/g,Df=/#/g;function Kn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function $t(o){o.g||(o.g=new Map,o.h=0,o.i&&Sf(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=Kn.prototype,n.add=function(o,c){$t(this),this.i=null,o=ln(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Ga(o,c){$t(o),c=ln(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Ka(o,c){return $t(o),c=ln(o,c),o.g.has(c)}n.forEach=function(o,c){$t(this),this.g.forEach(function(h,f){h.forEach(function(w){o.call(c,w,f,this)},this)},this)};function Qa(o,c){$t(o);let h=[];if(typeof c=="string")Ka(o,c)&&(h=h.concat(o.g.get(ln(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)h=h.concat(o[c]);return h}n.set=function(o,c){return $t(this),this.i=null,o=ln(this,o),Ka(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=Qa(this,o),o.length>0?String(o[0]):c):c};function Ya(o,c,h){Ga(o,c),h.length>0&&(o.i=null,o.g.set(ln(o,c),P(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var h=c[f];const w=qn(h);h=Qa(this,h);for(let b=0;b<h.length;b++){let C=w;h[b]!==""&&(C+="="+qn(h[b])),o.push(C)}}return this.i=o.join("&")};function Ja(o){const c=new Kn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function ln(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Nf(o,c){c&&!o.j&&($t(o),o.i=null,o.g.forEach(function(h,f){const w=f.toLowerCase();f!=w&&(Ga(this,f),Ya(this,w,h))},o)),o.j=c}function Of(o,c){const h=new Bn;if(a.Image){const f=new Image;f.onload=p(dt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=p(dt,h,"TestLoadImage: error",!1,c,f),f.onabort=p(dt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(dt,h,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function xf(o,c){const h=new Bn,f=new AbortController,w=setTimeout(()=>{f.abort(),dt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(b=>{clearTimeout(w),b.ok?dt(h,"TestPingServer: ok",!0,c):dt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(w),dt(h,"TestPingServer: error",!1,c)})}function dt(o,c,h,f,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),f(h)}catch{}}function Lf(){this.g=new yf}function Ti(o){this.i=o.Sb||null,this.h=o.ab||!1}_(Ti,Sa),Ti.prototype.g=function(){return new qr(this.i,this.h)};function qr(o,c){_e.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}_(qr,_e),n=qr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,Yn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Qn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Yn(this)),this.g&&(this.readyState=3,Yn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Xa(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function Xa(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Qn(this):Yn(this),this.readyState==3&&Xa(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Qn(this))},n.Na=function(o){this.g&&(this.response=o,Qn(this))},n.ga=function(){this.g&&Qn(this)};function Qn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Yn(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Yn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(qr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Za(o){let c="";return xr(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function wi(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Za(h),typeof o=="string"?h!=null&&qn(h):J(o,c,h))}function te(o){_e.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}_(te,_e);var Mf=/^https?$/i,Ff=["POST","PUT"];n=te.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Oa.g(),this.g.onreadystatechange=T(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(b){ec(this,b);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var w in f)h.set(w,f[w]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const b of f.keys())h.set(b,f.get(b));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),w=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(Ff,c,void 0)>=0)||f||w||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,C]of h)this.g.setRequestHeader(b,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(b){ec(this,b)}};function ec(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,tc(o),jr(o)}function tc(o){o.A||(o.A=!0,Te(o,"complete"),Te(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Te(this,"complete"),Te(this,"abort"),jr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jr(this,!0)),te.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?nc(this):this.Xa())},n.Xa=function(){nc(this)};function nc(o){if(o.h&&typeof i<"u"){if(o.v&&ft(o)==4)setTimeout(o.Ca.bind(o),0);else if(Te(o,"readystatechange"),ft(o)==4){o.h=!1;try{const b=o.ca();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=b===0){let C=String(o.D).match(Wa)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),f=!Mf.test(C?C.toLowerCase():"")}h=f}if(h)Te(o,"complete"),Te(o,"success");else{o.o=6;try{var w=ft(o)>2?o.g.statusText:""}catch{w=""}o.l=w+" ["+o.ca()+"]",tc(o)}}finally{jr(o)}}}}function jr(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,c||Te(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ft(o){return o.g?o.g.readyState:0}n.ca=function(){try{return ft(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),_f(c)}};function rc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Uf(o){const c={};o=(o.g&&ft(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(g(o[f]))continue;var h=wf(o[f]);const w=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const b=c[w]||[];c[w]=b,b.push(h)}hf(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Jn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function sc(o){this.za=0,this.i=[],this.j=new Bn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Jn("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Jn("baseRetryDelayMs",5e3,o),this.Za=Jn("retryDelaySeedMs",1e4,o),this.Ta=Jn("forwardChannelMaxRetries",2,o),this.va=Jn("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new $a(o&&o.concurrentRequestLimit),this.Ba=new Lf,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=sc.prototype,n.ka=8,n.I=1,n.connect=function(o,c,h,f){we(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.J=fc(this,null,this.W),Wr(this)};function Ai(o){if(ic(o),o.I==3){var c=o.V++,h=qe(o.J);if(J(h,"SID",o.M),J(h,"RID",c),J(h,"TYPE","terminate"),Xn(o,h),c=new ut(o,o.j,c),c.M=2,c.A=Br(qe(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=c.A,h=!0),h||(c.g=pc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),$r(c)}dc(o)}function zr(o){o.g&&(Ri(o),o.g.cancel(),o.g=null)}function ic(o){zr(o),o.v&&(a.clearTimeout(o.v),o.v=null),Hr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Wr(o){if(!Ba(o.h)&&!o.m){o.m=!0;var c=o.Ea;me||m(),ge||(me(),ge=!0),v.add(c,o),o.D=0}}function $f(o,c){return qa(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=$n(d(o.Ea,o,c),hc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const w=new ut(this,this.j,o);let b=this.o;if(this.U&&(b?(b=_a(b),Ea(b,this.U)):b=this.U),this.u!==null||this.R||(w.J=b,b=null),this.S)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=ac(this,w,c),h=qe(this.J),J(h,"RID",o),J(h,"CVER",22),this.G&&J(h,"X-HTTP-Session-Id",this.G),Xn(this,h),b&&(this.R?c="headers="+qn(Za(b))+"&"+c:this.u&&wi(h,this.u,b)),vi(this.h,w),this.Ra&&J(h,"TYPE","init"),this.S?(J(h,"$req",c),J(h,"SID","null"),w.U=!0,gi(w,h,null)):gi(w,h,c),this.I=2}}else this.I==3&&(o?oc(this,o):this.i.length==0||Ba(this.h)||oc(this))};function oc(o,c){var h;c?h=c.l:h=o.V++;const f=qe(o.J);J(f,"SID",o.M),J(f,"RID",h),J(f,"AID",o.K),Xn(o,f),o.u&&o.o&&wi(f,o.u,o.o),h=new ut(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),c&&(o.i=c.G.concat(o.i)),c=ac(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),vi(o.h,h),gi(h,f,c)}function Xn(o,c){o.H&&xr(o.H,function(h,f){J(c,f,h)}),o.l&&xr({},function(h,f){J(c,f,h)})}function ac(o,c,h){h=Math.min(o.i.length,h);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var w=o.i;let B=-1;for(;;){const ce=["count="+h];B==-1?h>0?(B=w[0].g,ce.push("ofs="+B)):B=0:ce.push("ofs="+B);let Q=!0;for(let ue=0;ue<h;ue++){var b=w[ue].g;const je=w[ue].map;if(b-=B,b<0)B=Math.max(0,w[ue].g-100),Q=!1;else try{b="req"+b+"_"||"";try{var C=je instanceof Map?je:Object.entries(je);for(const[qt,pt]of C){let mt=pt;l(pt)&&(mt=hi(pt)),ce.push(b+qt+"="+encodeURIComponent(mt))}}catch(qt){throw ce.push(b+"type="+encodeURIComponent("_badmap")),qt}}catch{f&&f(je)}}if(Q){C=ce.join("&");break e}}C=void 0}return o=o.i.splice(0,h),c.G=o,C}function cc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;me||m(),ge||(me(),ge=!0),v.add(c,o),o.A=0}}function bi(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=$n(d(o.Da,o),hc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,lc(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=$n(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,we(10),zr(this),lc(this))};function Ri(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function lc(o){o.g=new ut(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=qe(o.na);J(c,"RID","rpc"),J(c,"SID",o.M),J(c,"AID",o.K),J(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&J(c,"TO",o.ia),J(c,"TYPE","xmlhttp"),Xn(o,c),o.u&&o.o&&wi(c,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=Br(qe(c)),h.u=null,h.R=!0,Ma(h,o)}n.Va=function(){this.C!=null&&(this.C=null,zr(this),bi(this),we(19))};function Hr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function uc(o,c){var h=null;if(o.g==c){Hr(o),Ri(o),o.g=null;var f=2}else if(Ei(o.h,c))h=c.G,ja(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){h=c.u?c.u.length:0,c=Date.now()-c.F;var w=o.D;f=Fr(),Te(f,new Da(f,h)),Wr(o)}else cc(o);else if(w=c.m,w==3||w==0&&c.X>0||!(f==1&&$f(o,c)||f==2&&bi(o)))switch(h&&h.length>0&&(c=o.h,c.i=c.i.concat(h)),w){case 1:Bt(o,5);break;case 4:Bt(o,10);break;case 3:Bt(o,6);break;default:Bt(o,2)}}}function hc(o,c){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*c}function Bt(o,c){if(o.j.info("Error code "+c),c==2){var h=d(o.bb,o),f=o.Ua;const w=!f;f=new ht(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||zn(f,"https"),Br(f),w?Of(f.toString(),h):xf(f.toString(),h)}else we(2);o.I=0,o.l&&o.l.pa(c),dc(o),ic(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),we(2)):(this.j.info("Failed to ping google.com"),we(1))};function dc(o){if(o.I=0,o.ja=[],o.l){const c=za(o.h);(c.length!=0||o.i.length!=0)&&(V(o.ja,c),V(o.ja,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.oa()}}function fc(o,c,h){var f=h instanceof ht?qe(h):new ht(h);if(f.g!="")c&&(f.g=c+"."+f.g),Wn(f,f.u);else{var w=a.location;f=w.protocol,c=c?c+"."+w.hostname:w.hostname,w=+w.port;const b=new ht(null);f&&zn(b,f),c&&(b.g=c),w&&Wn(b,w),h&&(b.h=h),f=b}return h=o.G,c=o.wa,h&&c&&J(f,h,c),J(f,"VER",o.ka),Xn(o,f),f}function pc(o,c,h){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new te(new Ti({ab:h})):new te(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function mc(){}n=mc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Gr(){}Gr.prototype.g=function(o,c){return new Pe(o,c)};function Pe(o,c){_e.call(this),this.g=new sc(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!g(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new un(this)}_(Pe,_e),Pe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Pe.prototype.close=function(){Ai(this.g)},Pe.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=hi(o),o=h);c.i.push(new Rf(c.Ya++,o)),c.I==3&&Wr(c)},Pe.prototype.N=function(){this.g.l=null,delete this.j,Ai(this.g),delete this.g,Pe.Z.N.call(this)};function gc(o){di.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}_(gc,di);function _c(){fi.call(this),this.status=1}_(_c,fi);function un(o){this.g=o}_(un,mc),un.prototype.ra=function(){Te(this.g,"a")},un.prototype.qa=function(o){Te(this.g,new gc(o))},un.prototype.pa=function(o){Te(this.g,new _c)},un.prototype.oa=function(){Te(this.g,"b")},Gr.prototype.createWebChannel=Gr.prototype.g,Pe.prototype.send=Pe.prototype.o,Pe.prototype.open=Pe.prototype.m,Pe.prototype.close=Pe.prototype.close,ih=function(){return new Gr},sh=function(){return Fr()},rh=Ft,Xi={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ur.NO_ERROR=0,Ur.TIMEOUT=8,Ur.HTTP_ERROR=6,is=Ur,Na.COMPLETE="complete",nh=Na,Pa.EventType=Fn,Fn.OPEN="a",Fn.CLOSE="b",Fn.ERROR="c",Fn.MESSAGE="d",_e.prototype.listen=_e.prototype.J,nr=Pa,te.prototype.listenOnce=te.prototype.K,te.prototype.getLastError=te.prototype.Ha,te.prototype.getLastErrorCode=te.prototype.ya,te.prototype.getStatus=te.prototype.ca,te.prototype.getResponseJson=te.prototype.La,te.prototype.getResponseText=te.prototype.la,te.prototype.send=te.prototype.ea,te.prototype.setWithCredentials=te.prototype.Fa,th=te}).apply(typeof Yr<"u"?Yr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn="12.11.0";function $_(n){Vn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new Os("@firebase/firestore");function dn(){return Yt.logLevel}function D(n,...e){if(Yt.logLevel<=q.DEBUG){const t=e.map(Ro);Yt.debug(`Firestore (${Vn}): ${n}`,...t)}}function ct(n,...e){if(Yt.logLevel<=q.ERROR){const t=e.map(Ro);Yt.error(`Firestore (${Vn}): ${n}`,...t)}}function Jt(n,...e){if(Yt.logLevel<=q.WARN){const t=e.map(Ro);Yt.warn(`Firestore (${Vn}): ${n}`,...t)}}function Ro(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,oh(n,r,t)}function oh(n,e,t){let r=`FIRESTORE (${Vn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ct(r),new Error(r)}function G(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||oh(e,s,r)}function $(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Be{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class B_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ee.UNAUTHENTICATED)))}shutdown(){}}class q_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class j_{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){G(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new st;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new st,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},l=u=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>l(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new st)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new ah(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return G(e===null||typeof e=="string",2055,{h:e}),new Ee(e)}}class z_{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class W_{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new z_(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ee.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Qc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class H_{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,De(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){G(this.o===void 0,3512);const r=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Qc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(G(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Qc(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G_(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=G_(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function j(n,e){return n<e?-1:n>e?1:0}function Zi(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return xi(s)===xi(i)?j(s,i):xi(s)?1:-1}return j(n.length,e.length)}const K_=55296,Q_=57343;function xi(n){const e=n.charCodeAt(0);return e>=K_&&e<=Q_}function An(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yc="__name__";class ze{constructor(e,t,r){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&F(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ze.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ze?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=ze.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return j(e.length,t.length)}static compareSegments(e,t){const r=ze.isNumericId(e),s=ze.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ze.extractNumericId(e).compare(ze.extractNumericId(t)):Zi(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return wt.fromString(e.substring(4,e.length-2))}}class Y extends ze{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new k(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Y(t)}static emptyPath(){return new Y([])}}const Y_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends ze{construct(e,t,r){return new fe(e,t,r)}static isValidIdentifier(e){return Y_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yc}static keyField(){return new fe([Yc])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new k(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new k(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new k(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(n,e,t){if(!t)throw new k(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function J_(n,e,t,r){if(e===!0&&r===!0)throw new k(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Jc(n){if(!L.isDocumentKey(n))throw new k(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Xc(n){if(L.isDocumentKey(n))throw new k(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function lh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Fs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function Xe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new k(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Fs(n);throw new k(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function X_(n,e){if(e<=0)throw new k(R.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(n,e){const t={typeString:n};return e&&(t.value=e),t}function Pr(n,e){if(!lh(n))throw new k(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new k(R.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc=-62135596800,el=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(e){return X.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*el);return new X(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Zc)throw new k(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/el}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Pr(e,X._jsonSchema))return new X(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Zc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:ae("string",X._jsonSchemaVersion),seconds:ae("number"),nanoseconds:ae("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static fromTimestamp(e){return new U(e)}static min(){return new U(new X(0,0))}static max(){return new U(new X(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=-1;function Z_(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=U.fromTimestamp(r===1e9?new X(t+1,0):new X(t,r));return new Rt(s,L.empty(),e)}function ey(n){return new Rt(n.readTime,n.key,pr)}class Rt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Rt(U.min(),L.empty(),pr)}static max(){return new Rt(U.max(),L.empty(),pr)}}function ty(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ny="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ry{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dn(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==ny)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new S(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof S?t:S.resolve(t)}catch(t){return S.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):S.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):S.reject(t)}static resolve(e){return new S(((t,r)=>{t(e)}))}static reject(e){return new S(((t,r)=>{r(e)}))}static waitFor(e){return new S(((t,r)=>{let s=0,i=0,a=!1;e.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=S.resolve(!1);for(const r of e)t=t.next((s=>s?S.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new S(((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const d=u;t(e[d]).next((p=>{a[d]=p,++l,l===i&&r(a)}),(p=>s(p)))}}))}static doWhile(e,t){return new S(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function sy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Nn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Us.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po=-1;function $s(n){return n==null}function vs(n){return n===0&&1/n==-1/0}function iy(n){return typeof n=="number"&&Number.isInteger(n)&&!vs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="";function oy(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=tl(e)),e=ay(n.get(t),e);return tl(e)}function ay(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case uh:t+="";break;default:t+=i}}return t}function tl(n){return n+uh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ot(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function hh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.comparator=e,this.root=t||de.EMPTY}insert(e,t){return new Z(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new Z(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Jr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Jr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Jr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Jr(this.root,e,this.comparator,!0)}}class Jr{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class de{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??de.RED,this.left=s??de.EMPTY,this.right=i??de.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new de(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return de.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return de.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}}de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new de(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.comparator=e,this.data=new Z(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rl(this.data.getIterator())}getIteratorFrom(e){return new rl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new le(this.comparator);return t.data=e,t}}class rl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new Ce([])}unionWith(e){let t=new le(fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ce(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return An(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new dh("Invalid base64 string: "+i):i}})(e);return new pe(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pe.EMPTY_BYTE_STRING=new pe("");const cy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(n){if(G(!!n,39018),typeof n=="string"){let e=0;const t=cy.exec(n);if(G(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ne(n.seconds),nanos:ne(n.nanos)}}function ne(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Pt(n){return typeof n=="string"?pe.fromBase64String(n):pe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="server_timestamp",ph="__type__",mh="__previous_value__",gh="__local_write_time__";function Co(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ph])==null?void 0:r.stringValue)===fh}function Bs(n){const e=n.mapValue.fields[mh];return Co(e)?Bs(e):e}function mr(n){const e=St(n.mapValue.fields[gh].timestampValue);return new X(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t,r,s,i,a,l,u,d,p,_){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=_}}const Is="(default)";class gr{constructor(e,t){this.projectId=e,this.database=t||Is}static empty(){return new gr("","")}get isDefaultDatabase(){return this.database===Is}isEqual(e){return e instanceof gr&&e.projectId===this.projectId&&e.database===this.database}}function uy(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new k(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="__type__",hy="__max__",Xr={mapValue:{}},yh="__vector__",Ts="value";function Ct(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Co(n)?4:fy(n)?9007199254740991:dy(n)?10:11:F(28295,{value:n})}function Ze(n,e){if(n===e)return!0;const t=Ct(n);if(t!==Ct(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return mr(n).isEqual(mr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=St(s.timestampValue),l=St(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Pt(s.bytesValue).isEqual(Pt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return ne(s.geoPointValue.latitude)===ne(i.geoPointValue.latitude)&&ne(s.geoPointValue.longitude)===ne(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ne(s.integerValue)===ne(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=ne(s.doubleValue),l=ne(i.doubleValue);return a===l?vs(a)===vs(l):isNaN(a)&&isNaN(l)}return!1})(n,e);case 9:return An(n.arrayValue.values||[],e.arrayValue.values||[],Ze);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(nl(a)!==nl(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Ze(a[u],l[u])))return!1;return!0})(n,e);default:return F(52216,{left:n})}}function _r(n,e){return(n.values||[]).find((t=>Ze(t,e)))!==void 0}function bn(n,e){if(n===e)return 0;const t=Ct(n),r=Ct(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const l=ne(i.integerValue||i.doubleValue),u=ne(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1})(n,e);case 3:return sl(n.timestampValue,e.timestampValue);case 4:return sl(mr(n),mr(e));case 5:return Zi(n.stringValue,e.stringValue);case 6:return(function(i,a){const l=Pt(i),u=Pt(a);return l.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const l=i.split("/"),u=a.split("/");for(let d=0;d<l.length&&d<u.length;d++){const p=j(l[d],u[d]);if(p!==0)return p}return j(l.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const l=j(ne(i.latitude),ne(a.latitude));return l!==0?l:j(ne(i.longitude),ne(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return il(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var T,P,V,x;const l=i.fields||{},u=a.fields||{},d=(T=l[Ts])==null?void 0:T.arrayValue,p=(P=u[Ts])==null?void 0:P.arrayValue,_=j(((V=d==null?void 0:d.values)==null?void 0:V.length)||0,((x=p==null?void 0:p.values)==null?void 0:x.length)||0);return _!==0?_:il(d,p)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Xr.mapValue&&a===Xr.mapValue)return 0;if(i===Xr.mapValue)return 1;if(a===Xr.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),d=a.fields||{},p=Object.keys(d);u.sort(),p.sort();for(let _=0;_<u.length&&_<p.length;++_){const T=Zi(u[_],p[_]);if(T!==0)return T;const P=bn(l[u[_]],d[p[_]]);if(P!==0)return P}return j(u.length,p.length)})(n.mapValue,e.mapValue);default:throw F(23264,{he:t})}}function sl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);const t=St(n),r=St(e),s=j(t.seconds,r.seconds);return s!==0?s:j(t.nanos,r.nanos)}function il(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=bn(t[s],r[s]);if(i)return i}return j(t.length,r.length)}function Rn(n){return eo(n)}function eo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=St(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Pt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=eo(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${eo(t.fields[a])}`;return s+"}"})(n.mapValue):F(61005,{value:n})}function os(n){switch(Ct(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Bs(n);return e?16+os(e):16;case 5:return 2*n.stringValue.length;case 6:return Pt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+os(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Ot(r.fields,((i,a)=>{s+=i.length+os(a)})),s})(n.mapValue);default:throw F(13486,{value:n})}}function ol(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function to(n){return!!n&&"integerValue"in n}function ko(n){return!!n&&"arrayValue"in n}function al(n){return!!n&&"nullValue"in n}function cl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function as(n){return!!n&&"mapValue"in n}function dy(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[_h])==null?void 0:r.stringValue)===yh}function ar(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Ot(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=ar(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ar(n.arrayValue.values[t]);return e}return{...n}}function fy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===hy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.value=e}static empty(){return new Se({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!as(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ar(t)}setAll(e){let t=fe.emptyPath(),r={},s=[];e.forEach(((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=ar(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());as(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];as(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Ot(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Se(ar(this.value))}}function Eh(n){const e=[];return Ot(n.fields,((t,r)=>{const s=new fe([t]);if(as(r)){const i=Eh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Ce(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new ve(e,0,U.min(),U.min(),U.min(),Se.empty(),0)}static newFoundDocument(e,t,r,s){return new ve(e,1,t,U.min(),r,s,0)}static newNoDocument(e,t){return new ve(e,2,t,U.min(),U.min(),Se.empty(),0)}static newUnknownDocument(e,t){return new ve(e,3,t,U.min(),U.min(),Se.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Se.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Se.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.position=e,this.inclusive=t}}function ll(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=bn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ul(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ze(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t="asc"){this.field=e,this.dir=t}}function py(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{}class oe extends vh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new gy(e,t,r):t==="array-contains"?new Ey(e,r):t==="in"?new vy(e,r):t==="not-in"?new Iy(e,r):t==="array-contains-any"?new Ty(e,r):new oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new _y(e,r):new yy(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(bn(t,this.value)):t!==null&&Ct(this.value)===Ct(t)&&this.matchesComparison(bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $e extends vh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new $e(e,t)}matches(e){return Ih(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ih(n){return n.op==="and"}function Th(n){return my(n)&&Ih(n)}function my(n){for(const e of n.filters)if(e instanceof $e)return!1;return!0}function no(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+Rn(n.value);if(Th(n))return n.filters.map((e=>no(e))).join(",");{const e=n.filters.map((t=>no(t))).join(",");return`${n.op}(${e})`}}function wh(n,e){return n instanceof oe?(function(r,s){return s instanceof oe&&r.op===s.op&&r.field.isEqual(s.field)&&Ze(r.value,s.value)})(n,e):n instanceof $e?(function(r,s){return s instanceof $e&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&wh(a,s.filters[l])),!0):!1})(n,e):void F(19439)}function Ah(n){return n instanceof oe?(function(t){return`${t.field.canonicalString()} ${t.op} ${Rn(t.value)}`})(n):n instanceof $e?(function(t){return t.op.toString()+" {"+t.getFilters().map(Ah).join(" ,")+"}"})(n):"Filter"}class gy extends oe{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class _y extends oe{constructor(e,t){super(e,"in",t),this.keys=bh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class yy extends oe{constructor(e,t){super(e,"not-in",t),this.keys=bh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function bh(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>L.fromName(r.referenceValue)))}class Ey extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ko(t)&&_r(t.arrayValue,this.value)}}class vy extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&_r(this.value.arrayValue,t)}}class Iy extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(_r(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!_r(this.value.arrayValue,t)}}class Ty extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ko(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>_r(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function hl(n,e=null,t=[],r=[],s=null,i=null,a=null){return new wy(n,e,t,r,s,i,a)}function Vo(n){const e=$(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>no(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),$s(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Rn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Rn(r))).join(",")),e.Te=t}return e.Te}function Do(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!py(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!wh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!ul(n.startAt,e.startAt)&&ul(n.endAt,e.endAt)}function ro(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Ay(n,e,t,r,s,i,a,l){return new On(n,e,t,r,s,i,a,l)}function No(n){return new On(n)}function dl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function by(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Rh(n){return n.collectionGroup!==null}function cr(n){const e=$(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new le(fe.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((d=>{d.isInequality()&&(l=l.add(d.field))}))})),l})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new yr(i,r))})),t.has(fe.keyField().canonicalString())||e.Ee.push(new yr(fe.keyField(),r))}return e.Ee}function Ke(n){const e=$(n);return e.Ie||(e.Ie=Ry(e,cr(n))),e.Ie}function Ry(n,e){if(n.limitType==="F")return hl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new yr(s.field,i)}));const t=n.endAt?new ws(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ws(n.startAt.position,n.startAt.inclusive):null;return hl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function so(n,e){const t=n.filters.concat([e]);return new On(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Sy(n,e){const t=n.explicitOrderBy.concat([e]);return new On(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function As(n,e,t){return new On(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function qs(n,e){return Do(Ke(n),Ke(e))&&n.limitType===e.limitType}function Sh(n){return`${Vo(Ke(n))}|lt:${n.limitType}`}function fn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Ah(s))).join(", ")}]`),$s(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Rn(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Rn(s))).join(",")),`Target(${r})`})(Ke(n))}; limitType=${n.limitType})`}function js(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of cr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,l,u){const d=ll(a,l,u);return a.inclusive?d<=0:d<0})(r.startAt,cr(r),s)||r.endAt&&!(function(a,l,u){const d=ll(a,l,u);return a.inclusive?d>=0:d>0})(r.endAt,cr(r),s))})(n,e)}function Py(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Ph(n){return(e,t)=>{let r=!1;for(const s of cr(n)){const i=Cy(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Cy(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(i,a,l){const u=a.data.field(i),d=l.data.field(i);return u!==null&&d!==null?bn(u,d):F(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ot(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return hh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky=new Z(L.comparator);function lt(){return ky}const Ch=new Z(L.comparator);function rr(...n){let e=Ch;for(const t of n)e=e.insert(t.key,t);return e}function kh(n){let e=Ch;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function zt(){return lr()}function Vh(){return lr()}function lr(){return new on((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Vy=new Z(L.comparator),Dy=new le(L.comparator);function z(...n){let e=Dy;for(const t of n)e=e.add(t);return e}const Ny=new le(j);function Oy(){return Ny}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vs(e)?"-0":e}}function Dh(n){return{integerValue:""+n}}function Nh(n,e){return iy(e)?Dh(e):Oo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs{constructor(){this._=void 0}}function xy(n,e,t){return n instanceof bs?(function(s,i){const a={fields:{[ph]:{stringValue:fh},[gh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Co(i)&&(i=Bs(i)),i&&(a.fields[mh]=i),{mapValue:a}})(t,e):n instanceof Er?xh(n,e):n instanceof vr?Lh(n,e):(function(s,i){const a=Oh(s,i),l=fl(a)+fl(s.Ae);return to(a)&&to(s.Ae)?Dh(l):Oo(s.serializer,l)})(n,e)}function Ly(n,e,t){return n instanceof Er?xh(n,e):n instanceof vr?Lh(n,e):t}function Oh(n,e){return n instanceof Ir?(function(r){return to(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class bs extends zs{}class Er extends zs{constructor(e){super(),this.elements=e}}function xh(n,e){const t=Mh(e);for(const r of n.elements)t.some((s=>Ze(s,r)))||t.push(r);return{arrayValue:{values:t}}}class vr extends zs{constructor(e){super(),this.elements=e}}function Lh(n,e){let t=Mh(e);for(const r of n.elements)t=t.filter((s=>!Ze(s,r)));return{arrayValue:{values:t}}}class Ir extends zs{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function fl(n){return ne(n.integerValue||n.doubleValue)}function Mh(n){return ko(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e,t){this.field=e,this.transform=t}}function Fy(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Er&&s instanceof Er||r instanceof vr&&s instanceof vr?An(r.elements,s.elements,Ze):r instanceof Ir&&s instanceof Ir?Ze(r.Ae,s.Ae):r instanceof bs&&s instanceof bs})(n.transform,e.transform)}class Uy{constructor(e,t){this.version=e,this.transformResults=t}}class Le{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Le}static exists(e){return new Le(void 0,e)}static updateTime(e){return new Le(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function cs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ws{}function Fh(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new $h(n.key,Le.none()):new Cr(n.key,n.data,Le.none());{const t=n.data,r=Se.empty();let s=new le(fe.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new xt(n.key,r,new Ce(s.toArray()),Le.none())}}function $y(n,e,t){n instanceof Cr?(function(s,i,a){const l=s.value.clone(),u=ml(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):n instanceof xt?(function(s,i,a){if(!cs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=ml(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(Uh(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function ur(n,e,t,r){return n instanceof Cr?(function(i,a,l,u){if(!cs(i.precondition,a))return l;const d=i.value.clone(),p=gl(i.fieldTransforms,u,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,r):n instanceof xt?(function(i,a,l,u){if(!cs(i.precondition,a))return l;const d=gl(i.fieldTransforms,u,a),p=a.data;return p.setAll(Uh(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((_=>_.field)))})(n,e,t,r):(function(i,a,l){return cs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,e,t)}function By(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Oh(r.transform,s||null);i!=null&&(t===null&&(t=Se.empty()),t.set(r.field,i))}return t||null}function pl(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&An(r,s,((i,a)=>Fy(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Cr extends Ws{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class xt extends Ws{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Uh(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function ml(n,e,t){const r=new Map;G(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,Ly(a,l,t[s]))}return r}function gl(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,xy(i,a,e))}return r}class $h extends Ws{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class qy extends Ws{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&$y(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ur(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ur(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Vh();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=Fh(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(U.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),z())}isEqual(e){return this.batchId===e.batchId&&An(this.mutations,e.mutations,((t,r)=>pl(t,r)))&&An(this.baseMutations,e.baseMutations,((t,r)=>pl(t,r)))}}class xo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){G(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return Vy})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new xo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie,W;function Hy(n){switch(n){case R.OK:return F(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function Bh(n){if(n===void 0)return ct("GRPC error has no .code"),R.UNKNOWN;switch(n){case ie.OK:return R.OK;case ie.CANCELLED:return R.CANCELLED;case ie.UNKNOWN:return R.UNKNOWN;case ie.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case ie.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case ie.INTERNAL:return R.INTERNAL;case ie.UNAVAILABLE:return R.UNAVAILABLE;case ie.UNAUTHENTICATED:return R.UNAUTHENTICATED;case ie.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case ie.NOT_FOUND:return R.NOT_FOUND;case ie.ALREADY_EXISTS:return R.ALREADY_EXISTS;case ie.PERMISSION_DENIED:return R.PERMISSION_DENIED;case ie.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case ie.ABORTED:return R.ABORTED;case ie.OUT_OF_RANGE:return R.OUT_OF_RANGE;case ie.UNIMPLEMENTED:return R.UNIMPLEMENTED;case ie.DATA_LOSS:return R.DATA_LOSS;default:return F(39323,{code:n})}}(W=ie||(ie={}))[W.OK=0]="OK",W[W.CANCELLED=1]="CANCELLED",W[W.UNKNOWN=2]="UNKNOWN",W[W.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",W[W.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",W[W.NOT_FOUND=5]="NOT_FOUND",W[W.ALREADY_EXISTS=6]="ALREADY_EXISTS",W[W.PERMISSION_DENIED=7]="PERMISSION_DENIED",W[W.UNAUTHENTICATED=16]="UNAUTHENTICATED",W[W.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",W[W.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",W[W.ABORTED=10]="ABORTED",W[W.OUT_OF_RANGE=11]="OUT_OF_RANGE",W[W.UNIMPLEMENTED=12]="UNIMPLEMENTED",W[W.INTERNAL=13]="INTERNAL",W[W.UNAVAILABLE=14]="UNAVAILABLE",W[W.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=new wt([4294967295,4294967295],0);function _l(n){const e=Gy().encode(n),t=new eh;return t.update(e),new Uint8Array(t.digest())}function yl(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new wt([t,r],0),new wt([s,i],0)]}class Lo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new sr(`Invalid padding: ${t}`);if(r<0)throw new sr(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new sr(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new sr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=wt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(wt.fromNumber(r)));return s.compare(Ky)===1&&(s=new wt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=_l(e),[r,s]=yl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Lo(i,s,t);return r.forEach((l=>a.insert(l))),a}insert(e){if(this.ge===0)return;const t=_l(e),[r,s]=yl(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class sr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,kr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Hs(U.min(),s,new Z(j),lt(),z())}}class kr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new kr(r,t,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class qh{constructor(e,t){this.targetId=e,this.Ce=t}}class jh{constructor(e,t,r=pe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class El{constructor(){this.ve=0,this.Fe=vl(),this.Me=pe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=z(),t=z(),r=z();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:F(38017,{changeType:i})}})),new kr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=vl()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class Qy{constructor(e){this.Ge=e,this.ze=new Map,this.je=lt(),this.Je=Zr(),this.He=Zr(),this.Ze=new Z(j)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:F(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(ro(i))if(r===0){const a=new L(i.path);this.et(t,a,ve.newNoDocument(a,U.min()))}else G(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Pt(r).toUint8Array()}catch(u){if(u instanceof dh)return Jt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Lo(a,s,i)}catch(u){return Jt(u instanceof sr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const l=this.ot(a);if(l){if(i.current&&ro(l.target)){const u=new L(l.target.path);this.Et(u).has(a)||this.It(a,u)||this.et(a,u,ve.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=z();this.He.forEach(((i,a)=>{let l=!0;a.forEachWhile((u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new Hs(e,t,this.Ze,this.je,r);return this.je=lt(),this.Je=Zr(),this.He=Zr(),this.Ze=new Z(j),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new El,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new le(j),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new le(j),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new El),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Zr(){return new Z(L.comparator)}function vl(){return new Z(L.comparator)}const Yy={asc:"ASCENDING",desc:"DESCENDING"},Jy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Xy={and:"AND",or:"OR"};class Zy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function io(n,e){return n.useProto3Json||$s(e)?e:{value:e}}function Rs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function zh(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function eE(n,e){return Rs(n,e.toTimestamp())}function Qe(n){return G(!!n,49232),U.fromTimestamp((function(t){const r=St(t);return new X(r.seconds,r.nanos)})(n))}function Mo(n,e){return oo(n,e).canonicalString()}function oo(n,e){const t=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Wh(n){const e=Y.fromString(n);return G(Yh(e),10190,{key:e.toString()}),e}function ao(n,e){return Mo(n.databaseId,e.path)}function Li(n,e){const t=Wh(e);if(t.get(1)!==n.databaseId.projectId)throw new k(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new k(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Gh(t))}function Hh(n,e){return Mo(n.databaseId,e)}function tE(n){const e=Wh(n);return e.length===4?Y.emptyPath():Gh(e)}function co(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Gh(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Il(n,e,t){return{name:ao(n,e),fields:t.value.mapValue.fields}}function nE(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:F(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(d,p){return d.useProto3Json?(G(p===void 0||typeof p=="string",58123),pe.fromBase64String(p||"")):(G(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),pe.fromUint8Array(p||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&(function(d){const p=d.code===void 0?R.UNKNOWN:Bh(d.code);return new k(p,d.message||"")})(a);t=new jh(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Li(n,r.document.name),i=Qe(r.document.updateTime),a=r.document.createTime?Qe(r.document.createTime):U.min(),l=new Se({mapValue:{fields:r.document.fields}}),u=ve.newFoundDocument(s,i,a,l),d=r.targetIds||[],p=r.removedTargetIds||[];t=new ls(d,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Li(n,r.document),i=r.readTime?Qe(r.readTime):U.min(),a=ve.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ls([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Li(n,r.document),i=r.removedTargetIds||[];t=new ls([],i,s,null)}else{if(!("filter"in e))return F(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new Wy(s,i),l=r.targetId;t=new qh(l,a)}}return t}function rE(n,e){let t;if(e instanceof Cr)t={update:Il(n,e.key,e.value)};else if(e instanceof $h)t={delete:ao(n,e.key)};else if(e instanceof xt)t={update:Il(n,e.key,e.data),updateMask:dE(e.fieldMask)};else{if(!(e instanceof qy))return F(16599,{dt:e.type});t={verify:ao(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof bs)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Er)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof vr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ir)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw F(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:eE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F(27497)})(n,e.precondition)),t}function sE(n,e){return n&&n.length>0?(G(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Qe(s.updateTime):Qe(i);return a.isEqual(U.min())&&(a=Qe(i)),new Uy(a,s.transformResults||[])})(t,e)))):[]}function iE(n,e){return{documents:[Hh(n,e.path)]}}function oE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Hh(n,s);const i=(function(d){if(d.length!==0)return Qh($e.create(d,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((p=>(function(T){return{field:pn(T.field),direction:lE(T.dir)}})(p)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=io(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ft:t,parent:s}}function aE(n){let e=tE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){G(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=(function(_){const T=Kh(_);return T instanceof $e&&Th(T)?T.getFilters():[T]})(t.where));let a=[];t.orderBy&&(a=(function(_){return _.map((T=>(function(V){return new yr(mn(V.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(T)))})(t.orderBy));let l=null;t.limit&&(l=(function(_){let T;return T=typeof _=="object"?_.value:_,$s(T)?null:T})(t.limit));let u=null;t.startAt&&(u=(function(_){const T=!!_.before,P=_.values||[];return new ws(P,T)})(t.startAt));let d=null;return t.endAt&&(d=(function(_){const T=!_.before,P=_.values||[];return new ws(P,T)})(t.endAt)),Ay(e,s,a,i,l,"F",u,d)}function cE(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Kh(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=mn(t.unaryFilter.field);return oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=mn(t.unaryFilter.field);return oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=mn(t.unaryFilter.field);return oe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=mn(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(t){return oe.create(mn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return $e.create(t.compositeFilter.filters.map((r=>Kh(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(t.compositeFilter.op))})(n):F(30097,{filter:n})}function lE(n){return Yy[n]}function uE(n){return Jy[n]}function hE(n){return Xy[n]}function pn(n){return{fieldPath:n.canonicalString()}}function mn(n){return fe.fromServerFormat(n.fieldPath)}function Qh(n){return n instanceof oe?(function(t){if(t.op==="=="){if(cl(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NAN"}};if(al(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cl(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NOT_NAN"}};if(al(t.value))return{unaryFilter:{field:pn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pn(t.field),op:uE(t.op),value:t.value}}})(n):n instanceof $e?(function(t){const r=t.getFilters().map((s=>Qh(s)));return r.length===1?r[0]:{compositeFilter:{op:hE(t.op),filters:r}}})(n):F(54877,{filter:n})}function dE(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Yh(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Jh(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t,r,s,i=U.min(),a=U.min(),l=pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new vt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fE{constructor(e){this.yt=e}}function pE(n){const e=aE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?As(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{constructor(){this.bn=new gE}addToCollectionParentIndex(e,t){return this.bn.add(t),S.resolve()}getCollectionParents(e,t){return S.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return S.resolve()}deleteFieldIndex(e,t){return S.resolve()}deleteAllFieldIndexes(e){return S.resolve()}createTargetIndexes(e,t){return S.resolve()}getDocumentsMatchingTarget(e,t){return S.resolve(null)}getIndexType(e,t){return S.resolve(0)}getFieldIndexes(e,t){return S.resolve([])}getNextCollectionGroupToUpdate(e){return S.resolve(null)}getMinOffset(e,t){return S.resolve(Rt.min())}getMinOffsetFromCollectionGroup(e,t){return S.resolve(Rt.min())}updateCollectionGroup(e,t,r){return S.resolve()}updateIndexEntries(e,t){return S.resolve()}}class gE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new le(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new le(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tl={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Xh=41943040;class Re{static withCacheSize(e){return new Re(e,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Re.DEFAULT_COLLECTION_PERCENTILE=10,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Re.DEFAULT=new Re(Xh,Re.DEFAULT_COLLECTION_PERCENTILE,Re.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Re.DISABLED=new Re(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Sn(0)}static ar(){return new Sn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl="LruGarbageCollector",_E=1048576;function Al([n,e],[t,r]){const s=j(n,t);return s===0?j(e,r):s}class yE{constructor(e){this.Pr=e,this.buffer=new le(Al),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Al(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class EE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){D(wl,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Nn(t)?D(wl,"Ignoring IndexedDB error during garbage collection: ",t):await Dn(t)}await this.Ar(3e5)}))}}class vE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return S.resolve(Us.ce);const r=new yE(t);return this.Vr.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(Tl)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Tl):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,a,l,u,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((_=>(_>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),s=this.params.maximumSequenceNumbersToCollect):s=_,a=Date.now(),this.nthSequenceNumber(e,s)))).next((_=>(r=_,l=Date.now(),this.removeTargets(e,r,t)))).next((_=>(i=_,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((_=>(d=Date.now(),dn()<=q.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${_} documents in `+(d-u)+`ms
Total Duration: ${d-p}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:_}))))}}function IE(n,e){return new vE(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(){this.changes=new on((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?S.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&ur(r.mutation,s,Ce.empty(),X.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,z()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=z()){const s=zt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=rr();return i.forEach(((l,u)=>{a=a.insert(l,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=zt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,z())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,l)=>{t.set(a,l)}))}))}computeViews(e,t,r,s){let i=lt();const a=lr(),l=(function(){return lr()})();return t.forEach(((u,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof xt)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),ur(p.mutation,d,p.mutation.getFieldMask(),X.now())):a.set(d.key,Ce.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((d,p)=>a.set(d,p))),t.forEach(((d,p)=>l.set(d,new wE(p,a.get(d)??null)))),l)))}recalculateAndSaveOverlays(e,t){const r=lr();let s=new Z(((a,l)=>a-l)),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const l of a)l.keys().forEach((u=>{const d=t.get(u);if(d===null)return;let p=r.get(u)||Ce.empty();p=l.applyToLocalView(d,p),r.set(u,p);const _=(s.get(l.batchId)||z()).add(u);s=s.insert(l.batchId,_)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),d=u.key,p=u.value,_=Vh();p.forEach((T=>{if(!i.has(T)){const P=Fh(t.get(T),r.get(T));P!==null&&_.set(T,P),i=i.add(T)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,_))}return S.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return by(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Rh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):S.resolve(zt());let l=pr,u=i;return a.next((d=>S.forEach(d,((p,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),i.get(p)?S.resolve():this.remoteDocumentCache.getEntry(e,p).next((T=>{u=u.insert(p,T)}))))).next((()=>this.populateOverlays(e,d,i))).next((()=>this.computeViews(e,u,d,z()))).next((p=>({batchId:l,changes:kh(p)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let s=rr();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=rr();return this.indexManager.getCollectionParents(e,i).next((l=>S.forEach(l,(u=>{const d=(function(_,T){return new On(T,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next((p=>{p.forEach(((_,T)=>{a=a.insert(_,T)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,ve.newInvalidDocument(p)))}));let l=rr();return a.forEach(((u,d)=>{const p=i.get(u);p!==void 0&&ur(p.mutation,d,Ce.empty(),X.now()),js(t,d)&&(l=l.insert(u,d))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return S.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Qe(s.createTime)}})(t)),S.resolve()}getNamedQuery(e,t){return S.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:pE(s.bundledQuery),readTime:Qe(s.readTime)}})(t)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(){this.overlays=new Z(L.comparator),this.Lr=new Map}getOverlay(e,t){return S.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zt();return S.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),S.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),S.resolve()}getOverlaysForCollection(e,t,r){const s=zt(),i=t.length+1,a=new L(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return S.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Z(((d,p)=>d-p));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=zt(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const l=zt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((d,p)=>l.set(d,p))),!(l.size()>=s)););return S.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new zy(t,r));let i=this.Lr.get(t);i===void 0&&(i=z(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return S.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(){this.kr=new le(he.qr),this.Kr=new le(he.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new he(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new he(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new L(new Y([])),r=new he(t,e),s=new he(t,e+1),i=[];return this.Kr.forEachInRange([r,s],(a=>{this.Wr(a),i.push(a.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new L(new Y([])),r=new he(t,e),s=new he(t,e+1);let i=z();return this.Kr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new he(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class he{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return L.comparator(e.key,t.key)||j(e.Jr,t.Jr)}static Ur(e,t){return j(e.Jr,t.Jr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new le(he.qr)}checkEmpty(e){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new jy(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Hr=this.Hr.add(new he(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return S.resolve(a)}lookupMutationBatch(e,t){return S.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return S.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Po:this.Yn-1)}getAllMutationBatches(e){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new he(t,0),s=new he(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(a=>{const l=this.Zr(a.Jr);i.push(l)})),S.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new le(j);return t.forEach((s=>{const i=new he(s,0),a=new he(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,a],(l=>{r=r.add(l.Jr)}))})),S.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const a=new he(new L(i),0);let l=new le(j);return this.Hr.forEachWhile((u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(l=l.add(u.Jr)),!0)}),a),S.resolve(this.Yr(l))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){G(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return S.forEach(t.mutations,(s=>{const i=new he(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new he(t,0),s=this.Hr.firstAfterOrEqual(r);return S.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,S.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e){this.ti=e,this.docs=(function(){return new Z(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return S.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=lt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ve.newInvalidDocument(s))})),S.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=lt();const a=t.path,l=new L(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:d,value:{document:p}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ty(ey(p),r)<=0||(s.has(p.key)||js(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return S.resolve(i)}getAllFromCollectionGroup(e,t,r,s){F(9500)}ni(e,t){return S.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new kE(this)}getSize(e){return S.resolve(this.size)}}class kE extends TE{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),S.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e){this.persistence=e,this.ri=new on((t=>Vo(t)),Do),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.ii=0,this.si=new Fo,this.targetCount=0,this.oi=Sn._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),S.resolve()}getLastRemoteSnapshotVersion(e){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return S.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),S.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Sn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,S.resolve()}updateTargetData(e,t){return this.lr(t),S.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,S.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),S.waitFor(i).next((()=>s))}getTargetCount(e){return S.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return S.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),S.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),S.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),S.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return S.resolve(r)}containsKey(e,t){return S.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zh{constructor(e,t){this._i={},this.overlays={},this.ai=new Us(0),this.ui=!1,this.ui=!0,this.ci=new SE,this.referenceDelegate=e(this),this.li=new VE(this),this.indexManager=new mE,this.remoteDocumentCache=(function(s){return new CE(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new fE(t),this.Pi=new bE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new RE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new PE(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);const s=new DE(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return S.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class DE extends ry{constructor(e){super(),this.currentSequenceNumber=e}}class Uo{constructor(e){this.persistence=e,this.Ri=new Fo,this.Ai=null}static Vi(e){return new Uo(e)}get di(){if(this.Ai)return this.Ai;throw F(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),S.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),S.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),S.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.di,(r=>{const s=L.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,U.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return S.or([()=>S.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ss{constructor(e,t){this.persistence=e,this.fi=new on((r=>oy(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=IE(this,t)}static Vi(e,t){return new Ss(e,t)}Ti(){}Ei(e){return S.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return S.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?S.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(a=>this.wr(e,a,t).next((l=>{l||(r++,i.removeEntry(a,U.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),S.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),S.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=os(e.data.value)),t}wr(e,t,r){return S.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=z(),s=z();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new $o(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return rp()?8:sy(Ie())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new NE;return this.ys(e,t,a).next((l=>{if(i.result=l,this.As)return this.ws(e,t,a,l.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(dn()<=q.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",fn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),S.resolve()):(dn()<=q.DEBUG&&D("QueryEngine","Query:",fn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(dn()<=q.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",fn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):S.resolve())}gs(e,t){if(dl(t))return S.resolve(null);let r=Ke(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=As(t,null,"F"),r=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=z(...i);return this.fs.getDocuments(e,a).next((l=>this.indexManager.getMinOffset(e,r).next((u=>{const d=this.Ss(t,l);return this.bs(t,d,a,u.readTime)?this.gs(e,As(t,null,"F")):this.Ds(e,d,t,u)}))))})))))}ps(e,t,r,s){return dl(t)||s.isEqual(U.min())?S.resolve(null):this.fs.getDocuments(e,r).next((i=>{const a=this.Ss(t,i);return this.bs(t,a,r,s)?S.resolve(null):(dn()<=q.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),fn(t)),this.Ds(e,a,t,Z_(s,pr)).next((l=>l)))}))}Ss(e,t){let r=new le(Ph(e));return t.forEach(((s,i)=>{js(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return dn()<=q.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",fn(t)),this.fs.getDocumentsMatchingQuery(e,t,Rt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="LocalStore",xE=3e8;class LE{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new Z(j),this.Fs=new on((i=>Vo(i)),Do),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new AE(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function ME(n,e,t,r){return new LE(n,e,t,r)}async function ed(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let u=z();for(const d of s){a.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}for(const d of i){l.push(d.batchId);for(const p of d.mutations)u=u.add(p.key)}return t.localDocuments.getDocuments(r,u).next((d=>({Ns:d,removedBatchIds:a,addedBatchIds:l})))}))}))}function FE(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(l,u,d,p){const _=d.batch,T=_.keys();let P=S.resolve();return T.forEach((V=>{P=P.next((()=>p.getEntry(u,V))).next((x=>{const N=d.docVersions.get(V);G(N!==null,48541),x.version.compareTo(N)<0&&(_.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),p.addEntry(x)))}))})),P.next((()=>l.mutationQueue.removeMutationBatch(u,_)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let u=z();for(let d=0;d<l.mutationResults.length;++d)l.mutationResults[d].transformResults.length>0&&(u=u.add(l.batch.mutations[d].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function td(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function UE(n,e){const t=$(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const l=[];e.targetChanges.forEach(((p,_)=>{const T=s.get(_);if(!T)return;l.push(t.li.removeMatchingKeys(i,p.removedDocuments,_).next((()=>t.li.addMatchingKeys(i,p.addedDocuments,_))));let P=T.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(_)!==null?P=P.withResumeToken(pe.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,r)),s=s.insert(_,P),(function(x,N,H){return x.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=xE?!0:H.addedDocuments.size+H.modifiedDocuments.size+H.removedDocuments.size>0})(T,P,p)&&l.push(t.li.updateTargetData(i,P))}));let u=lt(),d=z();if(e.documentUpdates.forEach((p=>{e.resolvedLimboDocuments.has(p)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))})),l.push($E(i,a,e.documentUpdates).next((p=>{u=p.Bs,d=p.Ls}))),!r.isEqual(U.min())){const p=t.li.getLastRemoteSnapshotVersion(i).next((_=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(p)}return S.waitFor(l).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,d))).next((()=>u))})).then((i=>(t.vs=s,i)))}function $E(n,e,t){let r=z(),s=z();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=lt();return t.forEach(((l,u)=>{const d=i.get(l);u.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(U.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):D(Bo,"Ignoring outdated watch update for ",l,". Current version:",d.version," Watch version:",u.version)})),{Bs:a,Ls:s}}))}function BE(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Po),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function qE(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,S.resolve(s)):t.li.allocateTargetId(r).next((a=>(s=new vt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function lo(n,e,t){const r=$(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Nn(a))throw a;D(Bo,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function bl(n,e,t){const r=$(n);let s=U.min(),i=z();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,d,p){const _=$(u),T=_.Fs.get(p);return T!==void 0?S.resolve(_.vs.get(T)):_.li.getTargetData(d,p)})(r,a,Ke(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next((u=>{i=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:U.min(),t?i:z()))).next((l=>(jE(r,Py(e),l),{documents:l,ks:i})))))}function jE(n,e,t){let r=n.Ms.get(e)||U.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}class Rl{constructor(){this.activeTargetIds=Oy()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class zE{constructor(){this.vo=new Rl,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Rl,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl="ConnectivityMonitor";class Pl{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(Sl,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){D(Sl,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let es=null;function uo(){return es===null?es=(function(){return 268435456+Math.round(2147483648*Math.random())})():es++,"0x"+es.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi="RestConnection",HE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class GE{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===Is?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=uo(),l=this.Qo(e,t.toUriEncodedString());D(Mi,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,s,i);const{host:d}=new URL(l),p=wr(d);return this.zo(e,l,u,r,p).then((_=>(D(Mi,`Received RPC '${e}' ${a}: `,_),_)),(_=>{throw Jt(Mi,`RPC '${e}' ${a} failed with error: `,_,"url: ",l,"request:",r),_}))}jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Vn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=HE[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="WebChannelConnection",Zn=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class vn extends GE{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!vn.c_){const e=sh();Zn(e,rh.STAT_EVENT,(t=>{t.stat===Xi.PROXY?D(ye,"STAT_EVENT: detected buffering proxy"):t.stat===Xi.NOPROXY&&D(ye,"STAT_EVENT: detected no buffering proxy")})),vn.c_=!0}}zo(e,t,r,s,i){const a=uo();return new Promise(((l,u)=>{const d=new th;d.setWithCredentials(!0),d.listenOnce(nh.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case is.NO_ERROR:const _=d.getResponseJson();D(ye,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(_)),l(_);break;case is.TIMEOUT:D(ye,`RPC '${e}' ${a} timed out`),u(new k(R.DEADLINE_EXCEEDED,"Request time out"));break;case is.HTTP_ERROR:const T=d.getStatus();if(D(ye,`RPC '${e}' ${a} failed with status:`,T,"response text:",d.getResponseText()),T>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const V=P==null?void 0:P.error;if(V&&V.status&&V.message){const x=(function(H){const K=H.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(K)>=0?K:R.UNKNOWN})(V.status);u(new k(x,V.message))}else u(new k(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new k(R.UNAVAILABLE,"Connection failed."));break;default:F(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{D(ye,`RPC '${e}' ${a} completed.`)}}));const p=JSON.stringify(s);D(ye,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)}))}T_(e,t,r){const s=uo(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const d=i.join("");D(ye,`Creating RPC '${e}' stream ${s}: ${d}`,l);const p=a.createWebChannel(d,l);this.E_(p);let _=!1,T=!1;const P=new KE({Jo:V=>{T?D(ye,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(_||(D(ye,`Opening RPC '${e}' stream ${s} transport.`),p.open(),_=!0),D(ye,`RPC '${e}' stream ${s} sending:`,V),p.send(V))},Ho:()=>p.close()});return Zn(p,nr.EventType.OPEN,(()=>{T||(D(ye,`RPC '${e}' stream ${s} transport opened.`),P.i_())})),Zn(p,nr.EventType.CLOSE,(()=>{T||(T=!0,D(ye,`RPC '${e}' stream ${s} transport closed`),P.o_(),this.I_(p))})),Zn(p,nr.EventType.ERROR,(V=>{T||(T=!0,Jt(ye,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),P.o_(new k(R.UNAVAILABLE,"The operation could not be completed")))})),Zn(p,nr.EventType.MESSAGE,(V=>{var x;if(!T){const N=V.data[0];G(!!N,16349);const H=N,K=(H==null?void 0:H.error)||((x=H[0])==null?void 0:x.error);if(K){D(ye,`RPC '${e}' stream ${s} received error:`,K);const ee=K.status;let Ve=(function(v){const m=ie[v];if(m!==void 0)return Bh(m)})(ee),me=K.message;ee==="NOT_FOUND"&&me.includes("database")&&me.includes("does not exist")&&me.includes(this.databaseId.database)&&Jt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Ve===void 0&&(Ve=R.INTERNAL,me="Unknown error status: "+ee+" with message "+K.message),T=!0,P.o_(new k(Ve,me)),p.close()}else D(ye,`RPC '${e}' stream ${s} received:`,N),P.__(N)}})),vn.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ih()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QE(n){return new vn(n)}function Fi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(n){return new Zy(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vn.c_=!1;class nd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cl="PersistentStream";class rd{constructor(e,t,r,s,i,a,l,u){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new nd(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(ct(t.toString()),ct("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new k(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return D(Cl,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(D(Cl,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class YE extends rd{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=nE(this.serializer,e),r=(function(i){if(!("targetChange"in i))return U.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Qe(a.readTime):U.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=co(this.serializer),t.addTarget=(function(i,a){let l;const u=a.target;if(l=ro(u)?{documents:iE(i,u)}:{query:oE(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=zh(i,a.resumeToken);const d=io(i,a.expectedCount);d!==null&&(l.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){l.readTime=Rs(i,a.snapshotVersion.toTimestamp());const d=io(i,a.expectedCount);d!==null&&(l.expectedCount=d)}return l})(this.serializer,e);const r=cE(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=co(this.serializer),t.removeTarget=e,this.q_(t)}}class JE extends rd{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return G(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,G(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){G(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=sE(e.writeResults,e.commitTime),r=Qe(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=co(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>rE(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XE{}class ZE extends XE{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Wo(e,oo(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(R.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.jo(e,oo(t,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(R.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function ev(n,e,t,r){return new ZE(n,e,t,r)}class tv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ct(t),this.aa=!1):D("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="RemoteStore";class nv{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{an(this)&&(D(Xt,"Restarting streams for network reachability change."),await(async function(u){const d=$(u);d.Ia.add(4),await Vr(d),d.Va.set("Unknown"),d.Ia.delete(4),await Ks(d)})(this))}))})),this.Va=new tv(r,s)}}async function Ks(n){if(an(n))for(const e of n.Ra)await e(!0)}async function Vr(n){for(const e of n.Ra)await e(!1)}function sd(n,e){const t=$(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Wo(t)?zo(t):xn(t).O_()&&jo(t,e))}function qo(n,e){const t=$(n),r=xn(t);t.Ea.delete(e),r.O_()&&id(t,e),t.Ea.size===0&&(r.O_()?r.L_():an(t)&&t.Va.set("Unknown"))}function jo(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}xn(n).Z_(e)}function id(n,e){n.da.$e(e),xn(n).X_(e)}function zo(n){n.da=new Qy({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),xn(n).start(),n.Va.ua()}function Wo(n){return an(n)&&!xn(n).x_()&&n.Ea.size>0}function an(n){return $(n).Ia.size===0}function od(n){n.da=void 0}async function rv(n){n.Va.set("Online")}async function sv(n){n.Ea.forEach(((e,t)=>{jo(n,e)}))}async function iv(n,e){od(n),Wo(n)?(n.Va.ha(e),zo(n)):n.Va.set("Unknown")}async function ov(n,e,t){if(n.Va.set("Online"),e instanceof jh&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ea.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ea.delete(l),s.da.removeTarget(l))})(n,e)}catch(r){D(Xt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ps(n,r)}else if(e instanceof ls?n.da.Xe(e):e instanceof qh?n.da.st(e):n.da.tt(e),!t.isEqual(U.min()))try{const r=await td(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const l=i.da.Tt(a);return l.targetChanges.forEach(((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.Ea.get(d);p&&i.Ea.set(d,p.withResumeToken(u.resumeToken,a))}})),l.targetMismatches.forEach(((u,d)=>{const p=i.Ea.get(u);if(!p)return;i.Ea.set(u,p.withResumeToken(pe.EMPTY_BYTE_STRING,p.snapshotVersion)),id(i,u);const _=new vt(p.target,u,d,p.sequenceNumber);jo(i,_)})),i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){D(Xt,"Failed to raise snapshot:",r),await Ps(n,r)}}async function Ps(n,e,t){if(!Nn(e))throw e;n.Ia.add(1),await Vr(n),n.Va.set("Offline"),t||(t=()=>td(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{D(Xt,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Ks(n)}))}function ad(n,e){return e().catch((t=>Ps(n,t,e)))}async function Qs(n){const e=$(n),t=kt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Po;for(;av(e);)try{const s=await BE(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,cv(e,s)}catch(s){await Ps(e,s)}cd(e)&&ld(e)}function av(n){return an(n)&&n.Ta.length<10}function cv(n,e){n.Ta.push(e);const t=kt(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function cd(n){return an(n)&&!kt(n).x_()&&n.Ta.length>0}function ld(n){kt(n).start()}async function lv(n){kt(n).ra()}async function uv(n){const e=kt(n);for(const t of n.Ta)e.ea(t.mutations)}async function hv(n,e,t){const r=n.Ta.shift(),s=xo.from(r,e,t);await ad(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await Qs(n)}async function dv(n,e){e&&kt(n).Y_&&await(async function(r,s){if((function(a){return Hy(a)&&a!==R.ABORTED})(s.code)){const i=r.Ta.shift();kt(r).B_(),await ad(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await Qs(r)}})(n,e),cd(n)&&ld(n)}async function kl(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),D(Xt,"RemoteStore received new credentials");const r=an(t);t.Ia.add(3),await Vr(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ks(t)}async function fv(n,e){const t=$(n);e?(t.Ia.delete(2),await Ks(t)):e||(t.Ia.add(2),await Vr(t),t.Va.set("Unknown"))}function xn(n){return n.ma||(n.ma=(function(t,r,s){const i=$(t);return i.sa(),new YE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:rv.bind(null,n),Yo:sv.bind(null,n),t_:iv.bind(null,n),H_:ov.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Wo(n)?zo(n):n.Va.set("Unknown")):(await n.ma.stop(),od(n))}))),n.ma}function kt(n){return n.fa||(n.fa=(function(t,r,s){const i=$(t);return i.sa(),new JE(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:lv.bind(null,n),t_:dv.bind(null,n),ta:uv.bind(null,n),na:hv.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await Qs(n)):(await n.fa.stop(),n.Ta.length>0&&(D(Xt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new st,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new Ho(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Go(n,e){if(ct("AsyncQueue",`${e}: ${n}`),Nn(n))return new k(R.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{static emptySet(e){return new In(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=rr(),this.sortedSet=new Z(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof In)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new In;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(){this.ga=new Z(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):F(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Pn{constructor(e,t,r,s,i,a,l,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((l=>{a.push({type:0,doc:l})})),new Pn(e,t,In.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&qs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class mv{constructor(){this.queries=Dl(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=$(t),i=s.queries;s.queries=Dl(),i.forEach(((a,l)=>{for(const u of l.Sa)u.onError(r)}))})(this,new k(R.ABORTED,"Firestore shutting down"))}}function Dl(){return new on((n=>Sh(n)),qs)}async function ud(n,e){const t=$(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new pv,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=Go(a,`Initialization of query '${fn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&Ko(t)}async function hd(n,e){const t=$(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function gv(n,e){const t=$(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Ko(t)}function _v(n,e,t){const r=$(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function Ko(n){n.Ca.forEach((e=>{e.next()}))}var ho,Nl;(Nl=ho||(ho={})).Ma="default",Nl.Cache="cache";class dd{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Pn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Pn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==ho.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e){this.key=e}}class pd{constructor(e){this.key=e}}class yv{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=z(),this.mutatedKeys=z(),this.eu=Ph(e),this.tu=new In(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Vl,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((p,_)=>{const T=s.get(p),P=js(this.query,_)?_:null,V=!!T&&this.mutatedKeys.has(T.key),x=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let N=!1;T&&P?T.data.isEqual(P.data)?V!==x&&(r.track({type:3,doc:P}),N=!0):this.su(T,P)||(r.track({type:2,doc:P}),N=!0,(u&&this.eu(P,u)>0||d&&this.eu(P,d)<0)&&(l=!0)):!T&&P?(r.track({type:0,doc:P}),N=!0):T&&!P&&(r.track({type:1,doc:T}),N=!0,(u||d)&&(l=!0)),N&&(P?(a=a.add(P),i=x?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,bs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((p,_)=>(function(P,V){const x=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{Vt:N})}};return x(P)-x(V)})(p.type,_.type)||this.eu(p.doc,_.doc))),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Ya.size===0&&this.current&&!s?1:0,d=u!==this.Xa;return this.Xa=u,a.length!==0||d?{snapshot:new Pn(this.query,e.tu,i,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Vl,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=z(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new pd(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new fd(r))})),t}cu(e){this.Za=e.ks,this.Ya=z();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Pn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Qo="SyncEngine";class Ev{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class vv{constructor(e){this.key=e,this.hu=!1}}class Iv{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new on((l=>Sh(l)),qs),this.Eu=new Map,this.Iu=new Set,this.Ru=new Z(L.comparator),this.Au=new Map,this.Vu=new Fo,this.du={},this.mu=new Map,this.fu=Sn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Tv(n,e,t=!0){const r=vd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await md(r,e,t,!0),s}async function wv(n,e){const t=vd(n);await md(t,e,!0,!1)}async function md(n,e,t,r){const s=await qE(n.localStore,Ke(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await Av(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&sd(n.remoteStore,s),l}async function Av(n,e,t,r,s){n.pu=(_,T,P)=>(async function(x,N,H,K){let ee=N.view.ru(H);ee.bs&&(ee=await bl(x.localStore,N.query,!1).then((({documents:v})=>N.view.ru(v,ee))));const Ve=K&&K.targetChanges.get(N.targetId),me=K&&K.targetMismatches.get(N.targetId)!=null,ge=N.view.applyChanges(ee,x.isPrimaryClient,Ve,me);return xl(x,N.targetId,ge.au),ge.snapshot})(n,_,T,P);const i=await bl(n.localStore,e,!0),a=new yv(e,i.ks),l=a.ru(i.documents),u=kr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(l,n.isPrimaryClient,u);xl(n,t,d.au);const p=new Ev(e,t,a);return n.Tu.set(e,p),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),d.snapshot}async function bv(n,e,t){const r=$(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter((a=>!qs(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await lo(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&qo(r.remoteStore,s.targetId),fo(r,s.targetId)})).catch(Dn)):(fo(r,s.targetId),await lo(r.localStore,s.targetId,!0))}async function Rv(n,e){const t=$(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),qo(t.remoteStore,r.targetId))}async function Sv(n,e,t){const r=Ov(n);try{const s=await(function(a,l){const u=$(a),d=X.now(),p=l.reduce(((P,V)=>P.add(V.key)),z());let _,T;return u.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let V=lt(),x=z();return u.xs.getEntries(P,p).next((N=>{V=N,V.forEach(((H,K)=>{K.isValidDocument()||(x=x.add(H))}))})).next((()=>u.localDocuments.getOverlayedDocuments(P,V))).next((N=>{_=N;const H=[];for(const K of l){const ee=By(K,_.get(K.key).overlayedDocument);ee!=null&&H.push(new xt(K.key,ee,Eh(ee.value.mapValue),Le.exists(!0)))}return u.mutationQueue.addMutationBatch(P,d,H,l)})).next((N=>{T=N;const H=N.applyToLocalDocumentSet(_,x);return u.documentOverlayCache.saveOverlays(P,N.batchId,H)}))})).then((()=>({batchId:T.batchId,changes:kh(_)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,u){let d=a.du[a.currentUser.toKey()];d||(d=new Z(j)),d=d.insert(l,u),a.du[a.currentUser.toKey()]=d})(r,s.batchId,t),await Dr(r,s.changes),await Qs(r.remoteStore)}catch(s){const i=Go(s,"Failed to persist write");t.reject(i)}}async function gd(n,e){const t=$(n);try{const r=await UE(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?G(a.hu,14607):s.removedDocuments.size>0&&(G(a.hu,42227),a.hu=!1))})),await Dr(t,r,e)}catch(r){await Dn(r)}}function Ol(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const u=$(a);u.onlineState=l;let d=!1;u.queries.forEach(((p,_)=>{for(const T of _.Sa)T.va(l)&&(d=!0)})),d&&Ko(u)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Pv(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new Z(L.comparator);a=a.insert(i,ve.newNoDocument(i,U.min()));const l=z().add(i),u=new Hs(U.min(),new Map,new Z(j),a,l);await gd(r,u),r.Ru=r.Ru.remove(i),r.Au.delete(e),Yo(r)}else await lo(r.localStore,e,!1).then((()=>fo(r,e,t))).catch(Dn)}async function Cv(n,e){const t=$(n),r=e.batch.batchId;try{const s=await FE(t.localStore,e);yd(t,r,null),_d(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Dr(t,s)}catch(s){await Dn(s)}}async function kv(n,e,t){const r=$(n);try{const s=await(function(a,l){const u=$(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let p;return u.mutationQueue.lookupMutationBatch(d,l).next((_=>(G(_!==null,37113),p=_.keys(),u.mutationQueue.removeMutationBatch(d,_)))).next((()=>u.mutationQueue.performConsistencyCheck(d))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(d,p,l))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p))).next((()=>u.localDocuments.getDocuments(d,p)))}))})(r.localStore,e);yd(r,e,t),_d(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Dr(r,s)}catch(s){await Dn(s)}}function _d(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function yd(n,e,t){const r=$(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function fo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||Ed(n,r)}))}function Ed(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(qo(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Yo(n))}function xl(n,e,t){for(const r of t)r instanceof fd?(n.Vu.addReference(r.key,e),Vv(n,r)):r instanceof pd?(D(Qo,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Ed(n,r.key)):F(19791,{wu:r})}function Vv(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(D(Qo,"New document in limbo: "+t),n.Iu.add(r),Yo(n))}function Yo(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(Y.fromString(e)),r=n.fu.next();n.Au.set(r,new vv(t)),n.Ru=n.Ru.insert(t,r),sd(n.remoteStore,new vt(Ke(No(t.path)),r,"TargetPurposeLimboResolution",Us.ce))}}async function Dr(n,e,t){const r=$(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,u)=>{a.push(r.pu(u,e,t).then((d=>{var p;if((d||t)&&r.isPrimaryClient){const _=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(d){s.push(d);const _=$o.Is(u.targetId,d);i.push(_)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(u,d){const p=$(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(_=>S.forEach(d,(T=>S.forEach(T.Ts,(P=>p.persistence.referenceDelegate.addReference(_,T.targetId,P))).next((()=>S.forEach(T.Es,(P=>p.persistence.referenceDelegate.removeReference(_,T.targetId,P)))))))))}catch(_){if(!Nn(_))throw _;D(Bo,"Failed to update sequence numbers: "+_)}for(const _ of d){const T=_.targetId;if(!_.fromCache){const P=p.vs.get(T),V=P.snapshotVersion,x=P.withLastLimboFreeSnapshotVersion(V);p.vs=p.vs.insert(T,x)}}})(r.localStore,i))}async function Dv(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){D(Qo,"User change. New user:",e.toKey());const r=await ed(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((l=>{l.forEach((u=>{u.reject(new k(R.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Dr(t,r.Ns)}}function Nv(n,e){const t=$(n),r=t.Au.get(e);if(r&&r.hu)return z().add(r.key);{let s=z();const i=t.Eu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function vd(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=gd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Nv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Pv.bind(null,e),e.Pu.H_=gv.bind(null,e.eventManager),e.Pu.yu=_v.bind(null,e.eventManager),e}function Ov(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Cv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=kv.bind(null,e),e}class Cs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gs(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return ME(this.persistence,new OE,e.initialUser,this.serializer)}Cu(e){return new Zh(Uo.Vi,this.serializer)}Du(e){return new zE}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Cs.provider={build:()=>new Cs};class xv extends Cs{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){G(this.persistence.referenceDelegate instanceof Ss,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new EE(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Re.withCacheSize(this.cacheSizeBytes):Re.DEFAULT;return new Zh((r=>Ss.Vi(r,t)),this.serializer)}}class po{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ol(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Dv.bind(null,this.syncEngine),await fv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new mv})()}createDatastore(e){const t=Gs(e.databaseInfo.databaseId),r=QE(e.databaseInfo);return ev(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,l){return new nv(r,s,i,a,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ol(this.syncEngine,t,0)),(function(){return Pl.v()?new Pl:new WE})())}createSyncEngine(e,t){return(function(s,i,a,l,u,d,p){const _=new Iv(s,i,a,l,u,d);return p&&(_.gu=!0),_})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=$(s);D(Xt,"RemoteStore shutting down."),i.Ia.add(5),await Vr(i),i.Aa.shutdown(),i.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}po.provider={build:()=>new po};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ct("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt="FirestoreClient";class Lv{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=Ee.UNAUTHENTICATED,this.clientId=So.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{D(Vt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(D(Vt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new st;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Go(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Ui(n,e){n.asyncQueue.verifyOperationInProgress(),D(Vt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await ed(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Ll(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Mv(n);D(Vt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>kl(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>kl(e.remoteStore,s))),n._onlineComponents=e}async function Mv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(Vt,"Using user provided OfflineComponentProvider");try{await Ui(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===R.FAILED_PRECONDITION||s.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Jt("Error using user provided cache. Falling back to memory cache: "+t),await Ui(n,new Cs)}}else D(Vt,"Using default OfflineComponentProvider"),await Ui(n,new xv(void 0));return n._offlineComponents}async function Td(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(Vt,"Using user provided OnlineComponentProvider"),await Ll(n,n._uninitializedComponentsProvider._online)):(D(Vt,"Using default OnlineComponentProvider"),await Ll(n,new po))),n._onlineComponents}function Fv(n){return Td(n).then((e=>e.syncEngine))}async function wd(n){const e=await Td(n),t=e.eventManager;return t.onListen=Tv.bind(null,e.syncEngine),t.onUnlisten=bv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=wv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Rv.bind(null,e.syncEngine),t}function Uv(n,e,t={}){const r=new st;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,u,d){const p=new Id({next:T=>{p.Nu(),a.enqueueAndForget((()=>hd(i,_)));const P=T.docs.has(l);!P&&T.fromCache?d.reject(new k(R.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&T.fromCache&&u&&u.source==="server"?d.reject(new k(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),_=new dd(No(l.path),p,{includeMetadataChanges:!0,qa:!0});return ud(i,_)})(await wd(n),n.asyncQueue,e,t,r))),r.promise}function $v(n,e,t={}){const r=new st;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,u,d){const p=new Id({next:T=>{p.Nu(),a.enqueueAndForget((()=>hd(i,_))),T.fromCache&&u.source==="server"?d.reject(new k(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),_=new dd(l,p,{includeMetadataChanges:!0,qa:!0});return ud(i,_)})(await wd(n),n.asyncQueue,e,t,r))),r.promise}function Bv(n,e){const t=new st;return n.asyncQueue.enqueueAndForget((async()=>Sv(await Fv(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qv="ComponentProvider",Ml=new Map;function jv(n,e,t,r,s){return new ly(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Ad(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="firestore.googleapis.com",Fl=!0;class Ul{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=bd,this.ssl=Fl}else this.host=e.host,this.ssl=e.ssl??Fl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Xh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<_E)throw new k(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}J_("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ad(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new k(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new k(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new k(R.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ys{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ul({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ul(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new B_;switch(r.type){case"firstParty":return new W_(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new k(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Ml.get(t);r&&(D(qv,"Removing Datastore"),Ml.delete(t),r.terminate())})(this),Promise.resolve()}}function zv(n,e,t,r={}){var d;n=Xe(n,Ys);const s=wr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&fu(`https://${l}`),i.host!==bd&&i.host!==l&&Jt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!bt(u,a)&&(n._setSettings(u),r.mockUserToken)){let p,_;if(typeof r.mockUserToken=="string")p=r.mockUserToken,_=Ee.MOCK_USER;else{p=Jf(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new k(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new Ee(T)}n._authCredentials=new q_(new ah(p,_))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Lt(this.firestore,e,this._query)}}class re{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new At(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new re(this.firestore,e,this._key)}toJSON(){return{type:re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Pr(t,re._jsonSchema))return new re(e,r||null,new L(Y.fromString(t.referencePath)))}}re._jsonSchemaVersion="firestore/documentReference/1.0",re._jsonSchema={type:ae("string",re._jsonSchemaVersion),referencePath:ae("string")};class At extends Lt{constructor(e,t,r){super(e,t,No(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new re(this.firestore,null,new L(e))}withConverter(e){return new At(this.firestore,e,this._path)}}function Js(n,e,...t){if(n=se(n),ch("collection","path",e),n instanceof Ys){const r=Y.fromString(e,...t);return Xc(r),new At(n,null,r)}{if(!(n instanceof re||n instanceof At))throw new k(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Xc(r),new At(n.firestore,null,r)}}function Wt(n,e,...t){if(n=se(n),arguments.length===1&&(e=So.newId()),ch("doc","path",e),n instanceof Ys){const r=Y.fromString(e,...t);return Jc(r),new re(n,null,new L(r))}{if(!(n instanceof re||n instanceof At))throw new k(R.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return Jc(r),new re(n.firestore,n instanceof At?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $l="AsyncQueue";class Bl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new nd(this,"async_queue_retry"),this._c=()=>{const r=Fi();r&&D($l,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Fi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Fi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new st;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Nn(e))throw e;D($l,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,ct("INTERNAL UNHANDLED ERROR: ",ql(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Ho.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&F(47125,{Pc:ql(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ql(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Ln extends Ys{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Bl,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Bl(e),this._firestoreClient=void 0,await e}}}function Wv(n,e){const t=typeof n=="object"?n:_o(),r=typeof n=="string"?n:Is,s=rn(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Qf("firestore");i&&zv(s,...i)}return s}function Jo(n){if(n._terminated)throw new k(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Hv(n),n._firestoreClient}function Hv(n){var r,s,i,a;const e=n._freezeSettings(),t=jv(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Lv(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const d=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(d),_online:d}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ne(pe.fromBase64String(e))}catch(t){throw new k(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ne(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Ne._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Pr(e,Ne._jsonSchema))return Ne.fromBase64String(e.bytes)}}Ne._jsonSchemaVersion="firestore/bytes/1.0",Ne._jsonSchema={type:ae("string",Ne._jsonSchemaVersion),bytes:ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ye._jsonSchemaVersion}}static fromJSON(e){if(Pr(e,Ye._jsonSchema))return new Ye(e.latitude,e.longitude)}}Ye._jsonSchemaVersion="firestore/geoPoint/1.0",Ye._jsonSchema={type:ae("string",Ye._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Me._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Pr(e,Me._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Me(e.vectorValues);throw new k(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Me._jsonSchemaVersion="firestore/vectorValue/1.0",Me._jsonSchema={type:ae("string",Me._jsonSchemaVersion),vectorValues:ae("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gv=/^__.*__$/;class Kv{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Cr(e,this.data,t,this.fieldTransforms)}}class Rd{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new xt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Sd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{dataSource:n})}}class Zo{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new Zo({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return ks(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Sd(this.dataSource)&&Gv.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class Qv{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Gs(e)}A(e,t,r,s=!1){return new Zo({dataSource:e,methodName:t,targetDoc:r,path:fe.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Zs(n){const e=n._freezeSettings(),t=Gs(n._databaseId);return new Qv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Pd(n,e,t,r,s,i={}){const a=n.A(i.merge||i.mergeFields?2:0,e,t,s);ta("Data must be an object, but it was:",a,r);const l=Cd(r,a);let u,d;if(i.merge)u=new Ce(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const _ of i.mergeFields){const T=Zt(e,_,t);if(!a.contains(T))throw new k(R.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Dd(p,T)||p.push(T)}u=new Ce(p),d=a.fieldTransforms.filter((_=>u.covers(_.field)))}else u=null,d=a.fieldTransforms;return new Kv(new Se(l),u,d)}class ei extends Xs{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ei}}class ea extends Xs{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new Ir(e.serializer,Nh(e.serializer,this.bc));return new My(e.path,t)}isEqual(e){return e instanceof ea&&this.bc===e.bc}}function Yv(n,e,t,r){const s=n.A(1,e,t);ta("Data must be an object, but it was:",s,r);const i=[],a=Se.empty();Ot(r,((u,d)=>{const p=Vd(e,u,t);d=se(d);const _=s.fc(p);if(d instanceof ei)i.push(p);else{const T=Nr(d,_);T!=null&&(i.push(p),a.set(p,T))}}));const l=new Ce(i);return new Rd(a,l,s.fieldTransforms)}function Jv(n,e,t,r,s,i){const a=n.A(1,e,t),l=[Zt(e,r,t)],u=[s];if(i.length%2!=0)throw new k(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<i.length;T+=2)l.push(Zt(e,i[T])),u.push(i[T+1]);const d=[],p=Se.empty();for(let T=l.length-1;T>=0;--T)if(!Dd(d,l[T])){const P=l[T];let V=u[T];V=se(V);const x=a.fc(P);if(V instanceof ei)d.push(P);else{const N=Nr(V,x);N!=null&&(d.push(P),p.set(P,N))}}const _=new Ce(d);return new Rd(p,_,a.fieldTransforms)}function Xv(n,e,t,r=!1){return Nr(t,n.A(r?4:3,e))}function Nr(n,e){if(kd(n=se(n)))return ta("Unsupported field value:",e,n),Cd(n,e);if(n instanceof Xs)return(function(r,s){if(!Sd(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let u=Nr(l,s.gc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Nh(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=X.fromDate(r);return{timestampValue:Rs(s.serializer,i)}}if(r instanceof X){const i=new X(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Rs(s.serializer,i)}}if(r instanceof Ye)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ne)return{bytesValue:zh(s.serializer,r._byteString)};if(r instanceof re){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Mo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Me)return(function(a,l){const u=a instanceof Me?a.toArray():a;return{mapValue:{fields:{[_h]:{stringValue:yh},[Ts]:{arrayValue:{values:u.map((p=>{if(typeof p!="number")throw l.yc("VectorValues must only contain numeric values.");return Oo(l.serializer,p)}))}}}}}})(r,s);if(Jh(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Fs(r)}`)})(n,e)}function Cd(n,e){const t={};return hh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ot(n,((r,s)=>{const i=Nr(s,e.dc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function kd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof X||n instanceof Ye||n instanceof Ne||n instanceof re||n instanceof Xs||n instanceof Me||Jh(n))}function ta(n,e,t){if(!kd(t)||!lh(t)){const r=Fs(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function Zt(n,e,t){if((e=se(e))instanceof Xo)return e._internalPath;if(typeof e=="string")return Vd(n,e);throw ks("Field path arguments must be of type string or ",n,!1,void 0,t)}const Zv=new RegExp("[~\\*/\\[\\]]");function Vd(n,e,t){if(e.search(Zv)>=0)throw ks(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Xo(...e.split("."))._internalPath}catch{throw ks(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ks(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new k(R.INVALID_ARGUMENT,l+n+u)}function Dd(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{convertValue(e,t="none"){switch(Ct(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ne(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Pt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ot(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Ts].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>ne(a.doubleValue)));return new Me(t)}convertGeoPoint(e){return new Ye(ne(e.latitude),ne(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Bs(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(mr(e));default:return null}}convertTimestamp(e){const t=St(e);return new X(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);G(Yh(r),9688,{name:e});const s=new gr(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||ct(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd extends eI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ne(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new re(this.firestore,null,t)}}function hn(n){return new ea("increment",n)}const jl="@firebase/firestore",zl="4.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Zt("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class tI extends Od{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new k(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class na{}class ra extends na{}function sa(n,e,...t){let r=[];e instanceof na&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof ia)).length,l=i.filter((u=>u instanceof ti)).length;if(a>1||a>0&&l>0)throw new k(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ti extends ra{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ti(e,t,r)}_apply(e){const t=this._parse(e);return Md(e._query,t),new Lt(e.firestore,e.converter,so(e._query,t))}_parse(e){const t=Zs(e.firestore);return(function(i,a,l,u,d,p,_){let T;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new k(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Hl(_,p);const V=[];for(const x of _)V.push(Wl(u,i,x));T={arrayValue:{values:V}}}else T=Wl(u,i,_)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Hl(_,p),T=Xv(l,a,_,p==="in"||p==="not-in");return oe.create(d,p,T)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function xd(n,e,t){const r=e,s=Zt("where",n);return ti._create(s,r,t)}class ia extends na{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new ia(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:$e.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)Md(a,u),a=so(a,u)})(e._query,t),new Lt(e.firestore,e.converter,so(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class oa extends ra{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new oa(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new k(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new yr(i,a)})(e._query,this._field,this._direction);return new Lt(e.firestore,e.converter,Sy(e._query,t))}}function rI(n,e="asc"){const t=e,r=Zt("orderBy",n);return oa._create(r,t)}class aa extends ra{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new aa(e,t,r)}_apply(e){return new Lt(e.firestore,e.converter,As(e._query,this._limit,this._limitType))}}function Ld(n){return X_("limit",n),aa._create("limit",n,"F")}function Wl(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new k(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Rh(e)&&t.indexOf("/")!==-1)throw new k(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!L.isDocumentKey(r))throw new k(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ol(n,new L(r))}if(t instanceof re)return ol(n,t._key);throw new k(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Fs(t)}.`)}function Hl(n,e){if(!Array.isArray(n)||n.length===0)throw new k(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Md(n,e){const t=(function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Fd(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class ir{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Gt extends Od{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new us(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Zt("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Gt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Gt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Gt._jsonSchema={type:ae("string",Gt._jsonSchemaVersion),bundleSource:ae("string","DocumentSnapshot"),bundleName:ae("string"),bundle:ae("string")};class us extends Gt{data(e={}){return super.data(e)}}class Tn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ir(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new us(this._firestore,this._userDataWriter,r.key,r,new ir(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const u=new us(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ir(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>i||l.type!==3)).map((l=>{const u=new us(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ir(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return l.type!==0&&(d=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),p=a.indexOf(l.doc.key)),{type:sI(l.type),doc:u,oldIndex:d,newIndex:p}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Tn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=So.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function sI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tn._jsonSchemaVersion="firestore/querySnapshot/1.0",Tn._jsonSchema={type:ae("string",Tn._jsonSchemaVersion),bundleSource:ae("string","QuerySnapshot"),bundleName:ae("string"),bundle:ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(n){n=Xe(n,re);const e=Xe(n.firestore,Ln),t=Jo(e);return Uv(t,n._key).then((r=>oI(e,n,r)))}function ca(n){n=Xe(n,Lt);const e=Xe(n.firestore,Ln),t=Jo(e),r=new Nd(e);return nI(n._query),$v(t,n._query).then((s=>new Tn(e,r,n,s)))}function $d(n,e,t){n=Xe(n,re);const r=Xe(n.firestore,Ln),s=Fd(n.converter,e),i=Zs(r);return la(r,[Pd(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Le.none())])}function Gl(n,e,t,...r){n=Xe(n,re);const s=Xe(n.firestore,Ln),i=Zs(s);let a;return a=typeof(e=se(e))=="string"||e instanceof Xo?Jv(i,"updateDoc",n._key,e,t,r):Yv(i,"updateDoc",n._key,e),la(s,[a.toMutation(n._key,Le.exists(!0))])}function iI(n,e){const t=Xe(n.firestore,Ln),r=Wt(n),s=Fd(n.converter,e),i=Zs(n.firestore);return la(t,[Pd(i,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Le.exists(!1))]).then((()=>r))}function la(n,e){const t=Jo(n);return Bv(t,e)}function oI(n,e,t){const r=t.docs.get(e._key),s=new Nd(n);return new Gt(n,s,e._key,r,new ir(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){$_(Cn),Je(new Fe("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Ln(new j_(r.getProvider("auth-internal")),new H_(a,r.getProvider("app-check-internal")),uy(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),Oe(jl,zl,e),Oe(jl,zl,"esm2020")})();const Bd="@firebase/installations",ua="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd=1e4,jd=`w:${ua}`,zd="FIS_v2",aI="https://firebaseinstallations.googleapis.com/v1",cI=3600*1e3,lI="installations",uI="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},en=new nn(lI,uI,hI);function Wd(n){return n instanceof Be&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd({projectId:n}){return`${aI}/projects/${n}/installations`}function Gd(n){return{token:n.token,requestStatus:2,expiresIn:fI(n.expiresIn),creationTime:Date.now()}}async function Kd(n,e){const r=(await e.json()).error;return en.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Qd({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function dI(n,{refreshToken:e}){const t=Qd(n);return t.append("Authorization",pI(e)),t}async function Yd(n){const e=await n();return e.status>=500&&e.status<600?n():e}function fI(n){return Number(n.replace("s","000"))}function pI(n){return`${zd} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=Hd(n),s=Qd(n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={fid:t,authVersion:zd,appId:n.appId,sdkVersion:jd},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await Yd(()=>fetch(r,l));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:Gd(d.authToken)}}else throw await Kd("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gI(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I=/^[cdef][\w-]{21}$/,mo="";function yI(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=EI(n);return _I.test(t)?t:mo}catch{return mo}}function EI(n){return gI(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ni(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd=new Map;function Zd(n,e){const t=ni(n);ef(t,e),vI(t,e)}function ef(n,e){const t=Xd.get(n);if(t)for(const r of t)r(e)}function vI(n,e){const t=II();t&&t.postMessage({key:n,fid:e}),TI()}let Ht=null;function II(){return!Ht&&"BroadcastChannel"in self&&(Ht=new BroadcastChannel("[Firebase] FID Change"),Ht.onmessage=n=>{ef(n.data.key,n.data.fid)}),Ht}function TI(){Xd.size===0&&Ht&&(Ht.close(),Ht=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI="firebase-installations-database",AI=1,tn="firebase-installations-store";let $i=null;function ha(){return $i||($i=gu(wI,AI,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(tn)}}})),$i}async function Vs(n,e){const t=ni(n),s=(await ha()).transaction(tn,"readwrite"),i=s.objectStore(tn),a=await i.get(t);return await i.put(e,t),await s.done,(!a||a.fid!==e.fid)&&Zd(n,e.fid),e}async function tf(n){const e=ni(n),r=(await ha()).transaction(tn,"readwrite");await r.objectStore(tn).delete(e),await r.done}async function ri(n,e){const t=ni(n),s=(await ha()).transaction(tn,"readwrite"),i=s.objectStore(tn),a=await i.get(t),l=e(a);return l===void 0?await i.delete(t):await i.put(l,t),await s.done,l&&(!a||a.fid!==l.fid)&&Zd(n,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function da(n){let e;const t=await ri(n.appConfig,r=>{const s=bI(r),i=RI(n,s);return e=i.registrationPromise,i.installationEntry});return t.fid===mo?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function bI(n){const e=n||{fid:yI(),registrationStatus:0};return nf(e)}function RI(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(en.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=SI(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:PI(n)}:{installationEntry:e}}async function SI(n,e){try{const t=await mI(n,e);return Vs(n.appConfig,t)}catch(t){throw Wd(t)&&t.customData.serverCode===409?await tf(n.appConfig):await Vs(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function PI(n){let e=await Kl(n.appConfig);for(;e.registrationStatus===1;)await Jd(100),e=await Kl(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await da(n);return r||t}return e}function Kl(n){return ri(n,e=>{if(!e)throw en.create("installation-not-found");return nf(e)})}function nf(n){return CI(n)?{fid:n.fid,registrationStatus:0}:n}function CI(n){return n.registrationStatus===1&&n.registrationTime+qd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kI({appConfig:n,heartbeatServiceProvider:e},t){const r=VI(n,t),s=dI(n,t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={installation:{sdkVersion:jd,appId:n.appId}},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await Yd(()=>fetch(r,l));if(u.ok){const d=await u.json();return Gd(d)}else throw await Kd("Generate Auth Token",u)}function VI(n,{fid:e}){return`${Hd(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(n,e=!1){let t;const r=await ri(n.appConfig,i=>{if(!rf(i))throw en.create("not-registered");const a=i.authToken;if(!e&&OI(a))return i;if(a.requestStatus===1)return t=DI(n,e),i;{if(!navigator.onLine)throw en.create("app-offline");const l=LI(i);return t=NI(n,l),l}});return t?await t:r.authToken}async function DI(n,e){let t=await Ql(n.appConfig);for(;t.authToken.requestStatus===1;)await Jd(100),t=await Ql(n.appConfig);const r=t.authToken;return r.requestStatus===0?fa(n,e):r}function Ql(n){return ri(n,e=>{if(!rf(e))throw en.create("not-registered");const t=e.authToken;return MI(t)?{...e,authToken:{requestStatus:0}}:e})}async function NI(n,e){try{const t=await kI(n,e),r={...e,authToken:t};return await Vs(n.appConfig,r),t}catch(t){if(Wd(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await tf(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Vs(n.appConfig,r)}throw t}}function rf(n){return n!==void 0&&n.registrationStatus===2}function OI(n){return n.requestStatus===2&&!xI(n)}function xI(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+cI}function LI(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function MI(n){return n.requestStatus===1&&n.requestTime+qd<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(n){const e=n,{installationEntry:t,registrationPromise:r}=await da(e);return r?r.catch(console.error):fa(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UI(n,e=!1){const t=n;return await $I(t),(await fa(t,e)).token}async function $I(n){const{registrationPromise:e}=await da(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(n){if(!n||!n.options)throw Bi("App Configuration");if(!n.name)throw Bi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Bi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Bi(n){return en.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf="installations",qI="installations-internal",jI=n=>{const e=n.getProvider("app").getImmediate(),t=BI(e),r=rn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},zI=n=>{const e=n.getProvider("app").getImmediate(),t=rn(e,sf).getImmediate();return{getId:()=>FI(t),getToken:s=>UI(t,s)}};function WI(){Je(new Fe(sf,jI,"PUBLIC")),Je(new Fe(qI,zI,"PRIVATE"))}WI();Oe(Bd,ua);Oe(Bd,ua,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds="analytics",HI="firebase_id",GI="origin",KI=60*1e3,QI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",pa="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=new Os("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YI={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ke=new nn("analytics","Analytics",YI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JI(n){if(!n.startsWith(pa)){const e=ke.create("invalid-gtag-resource",{gtagURL:n});return Ae.warn(e.message),""}return n}function of(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function XI(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function ZI(n,e){const t=XI("firebase-js-sdk-policy",{createScriptURL:JI}),r=document.createElement("script"),s=`${pa}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function eT(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function tT(n,e,t,r,s,i){const a=r[s];try{if(a)await e[a];else{const u=(await of(t)).find(d=>d.measurementId===s);u&&await e[u.appId]}}catch(l){Ae.error(l)}n("config",s,i)}async function nT(n,e,t,r,s){try{let i=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=await of(t);for(const u of a){const d=l.find(_=>_.measurementId===u),p=d&&e[d.appId];if(p)i.push(p);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),n("event",r,s||{})}catch(i){Ae.error(i)}}function rT(n,e,t,r){async function s(i,...a){try{if(i==="event"){const[l,u]=a;await nT(n,e,t,l,u)}else if(i==="config"){const[l,u]=a;await tT(n,e,t,r,l,u)}else if(i==="consent"){const[l,u]=a;n("consent",l,u)}else if(i==="get"){const[l,u,d]=a;n("get",l,u,d)}else if(i==="set"){const[l]=a;n("set",l)}else n(i,...a)}catch(l){Ae.error(l)}}return s}function sT(n,e,t,r,s){let i=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=rT(i,n,e,t),{gtagCore:i,wrappedGtag:window[s]}}function iT(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(pa)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oT=30,aT=1e3;class cT{constructor(e={},t=aT){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const af=new cT;function lT(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function uT(n){var a;const{appId:e,apiKey:t}=n,r={method:"GET",headers:lT(t)},s=QI.replace("{app-id}",e),i=await fetch(s,r);if(i.status!==200&&i.status!==304){let l="";try{const u=await i.json();(a=u.error)!=null&&a.message&&(l=u.error.message)}catch{}throw ke.create("config-fetch-failed",{httpStatus:i.status,responseMessage:l})}return i.json()}async function hT(n,e=af,t){const{appId:r,apiKey:s,measurementId:i}=n.options;if(!r)throw ke.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw ke.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new pT;return setTimeout(async()=>{l.abort()},KI),cf({appId:r,apiKey:s,measurementId:i},a,l,e)}async function cf(n,{throttleEndTimeMillis:e,backoffCount:t},r,s=af){var l;const{appId:i,measurementId:a}=n;try{await dT(r,e)}catch(u){if(a)return Ae.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:i,measurementId:a};throw u}try{const u=await uT(n);return s.deleteThrottleMetadata(i),u}catch(u){const d=u;if(!fT(d)){if(s.deleteThrottleMetadata(i),a)return Ae.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:i,measurementId:a};throw u}const p=Number((l=d==null?void 0:d.customData)==null?void 0:l.httpStatus)===503?vc(t,s.intervalMillis,oT):vc(t,s.intervalMillis),_={throttleEndTimeMillis:Date.now()+p,backoffCount:t+1};return s.setThrottleMetadata(i,_),Ae.debug(`Calling attemptFetch again in ${p} millis`),cf(n,_,r,s)}}function dT(n,e){return new Promise((t,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(i),r(ke.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function fT(n){if(!(n instanceof Be)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class pT{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function mT(n,e,t,r,s){if(s&&s.global){n("event",t,r);return}else{const i=await e,a={...r,send_to:i};n("event",t,a)}}async function gT(n,e,t,r){if(r&&r.global){const s={};for(const i of Object.keys(t))s[`user_properties.${i}`]=t[i];return n("set",s),Promise.resolve()}else{const s=await e;n("config",s,{update:!0,user_properties:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _T(){if(hu())try{await du()}catch(n){return Ae.warn(ke.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Ae.warn(ke.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function yT(n,e,t,r,s,i,a){const l=hT(n);l.then(T=>{t[T.measurementId]=T.appId,n.options.measurementId&&T.measurementId!==n.options.measurementId&&Ae.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${T.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(T=>Ae.error(T)),e.push(l);const u=_T().then(T=>{if(T)return r.getId()}),[d,p]=await Promise.all([l,u]);iT(i)||ZI(i,d.measurementId),s("js",new Date);const _=(a==null?void 0:a.config)??{};return _[GI]="firebase",_.update=!0,p!=null&&(_[HI]=p),s("config",d.measurementId,_),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(e){this.app=e}_delete(){return delete wn[this.app.options.appId],Promise.resolve()}}let wn={},Yl=[];const Jl={};let qi="dataLayer",vT="gtag",Xl,ma,Zl=!1;function IT(){const n=[];if(uu()&&n.push("This is a browser extension environment."),sp()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),t=ke.create("invalid-analytics-context",{errorInfo:e});Ae.warn(t.message)}}function TT(n,e,t){IT();const r=n.options.appId;if(!r)throw ke.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Ae.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ke.create("no-api-key");if(wn[r]!=null)throw ke.create("already-exists",{id:r});if(!Zl){eT(qi);const{wrappedGtag:i,gtagCore:a}=sT(wn,Yl,Jl,qi,vT);ma=i,Xl=a,Zl=!0}return wn[r]=yT(n,Yl,Jl,e,Xl,qi,t),new ET(n)}function wT(n=_o()){n=se(n);const e=rn(n,Ds);return e.isInitialized()?e.getImmediate():AT(n)}function AT(n,e={}){const t=rn(n,Ds);if(t.isInitialized()){const s=t.getImmediate();if(bt(e,t.getOptions()))return s;throw ke.create("already-initialized")}return t.initialize({options:e})}function bT(n,e,t){n=se(n),gT(ma,wn[n.app.options.appId],e,t).catch(r=>Ae.error(r))}function RT(n,e,t,r){n=se(n),mT(ma,wn[n.app.options.appId],e,t,r).catch(s=>Ae.error(s))}const eu="@firebase/analytics",tu="0.10.21";function ST(){Je(new Fe(Ds,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return TT(r,s,t)},"PUBLIC")),Je(new Fe("analytics-internal",n,"PRIVATE")),Oe(eu,tu),Oe(eu,tu,"esm2020");function n(e){try{const t=e.getProvider(Ds).getImmediate();return{logEvent:(r,s,i)=>RT(t,r,s,i),setUserProperties:(r,s)=>bT(t,r,s)}}catch(t){throw ke.create("interop-component-reg-failed",{reason:t})}}}ST();const PT={apiKey:"AIzaSyBSCNq6CfGbzb5ZZh1jZEQ8B0ULFA40A-g",authDomain:"skillbazzar-f25a5.firebaseapp.com",projectId:"skillbazzar-f25a5",storageBucket:"skillbazzar-f25a5.firebasestorage.app",messagingSenderId:"293298225357",appId:"1:293298225357:web:a258a7d26c7fdc18de6984",measurementId:"G-S3DF7M0NY5"},ga=_u(PT);wT(ga);const hs=F_(ga),We=Wv(ga);new et;const CT=()=>{const n={};return window.location.search.substring(1).split("&").forEach(e=>{if(e==="")return;const[t,r]=e.split("=");n[decodeURIComponent(t)]=decodeURIComponent(r||"")}),n},kT=n=>{navigator.clipboard.writeText(n).then(()=>{const e=document.createElement("div");e.className="animate-fade",e.style.cssText="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #4ade80; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 700; z-index: 9999; box-shadow: 0 10px 20px rgba(0,0,0,0.1);",e.innerHTML='<i class="fas fa-check-circle"></i> Linked Copied Successfully!',document.body.appendChild(e),setTimeout(()=>e.remove(),2500)})},O={view:"home",user:null,userData:null,leaderboard:[],team:[],courses:[{title:"Sales Mastery",img:"https://futurefiix.com/assets/images/courses/sales.jpg"},{title:"Lead Generation",img:"https://futurefiix.com/assets/images/courses/lead.jpg"},{title:"Affiliate Marketing",img:"https://futurefiix.com/assets/images/courses/affiliate.jpg"},{title:"Video Editing",img:"https://futurefiix.com/assets/images/courses/video.jpg"},{title:"Instagram Mastery",img:"https://futurefiix.com/assets/images/courses/insta.jpg"},{title:"Canva Mastery",img:"https://futurefiix.com/assets/images/courses/canva.jpg"},{title:"Google AdSense",img:"https://futurefiix.com/assets/images/courses/google.jpg"},{title:"YouTube Mastery",img:"https://futurefiix.com/assets/images/courses/youtube.jpg"},{title:"Facebook Ads",img:"https://futurefiix.com/assets/images/courses/fb.jpg"},{title:"Instagram Theme Page",img:"https://futurefiix.com/assets/images/courses/theme.jpg"},{title:"WordPress Development",img:"https://futurefiix.com/assets/images/courses/wp.jpg"},{title:"Communication Skills",img:"https://futurefiix.com/assets/images/courses/comm.jpg"},{title:"Digital Marketing",img:"https://futurefiix.com/assets/images/courses/digital.jpg"},{title:"Drop Shipping",img:"https://futurefiix.com/assets/images/courses/drop.jpg"},{title:"Chat GPT Mastery",img:"https://futurefiix.com/assets/images/courses/gpt.jpg"},{title:"Stock Market",img:"https://futurefiix.com/assets/images/courses/stock.jpg"}]},VT=async n=>{const e=await Ud(Wt(We,"users",n));if(e.exists())O.userData=e.data(),it();else{const t={name:O.user.displayName||"Learner",email:O.user.email,todayEarnings:0,weeklyEarnings:0,monthlyEarnings:0,allTimeEarnings:0,passiveEarnings:0,industryEarnings:0,paidEarnings:0,referralCode:`FF-${n.substring(0,5).toUpperCase()}`,joinedAt:new Date().toISOString()};await $d(Wt(We,"users",n),t),O.userData=t,it()}},DT=async()=>{const n=sa(Js(We,"users"),rI("allTimeEarnings","desc"),Ld(10)),e=await ca(n);O.leaderboard=e.docs.map(t=>t.data()),it()},NT=async()=>{const n=sa(Js(We,"users"),xd("referrerId","==",O.user.uid)),e=await ca(n);O.team=e.docs.map(t=>t.data()),it()},OT=async(n,e)=>{const t=O.userData.allTimeEarnings-O.userData.paidEarnings;if(n>t)return alert("Insufficient balance!");await iI(Js(We,"payoutRequests"),{userId:O.user.uid,userName:O.userData.name,amount:n,upi:e,status:"pending",createdAt:new Date().toISOString()}),alert("Payout request submitted successfully!"),O.view="dashboard",it()},xT=()=>`
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 5px;">
        <img src="/logo.png" alt="Logo" style="height: 40px;"/>
        <div style="font-size: 1.8rem; font-weight: 800; color: #4338ca; letter-spacing: -1px;">SkillFutures</div>
      </div>
      <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; padding-left: 52px; margin-top: -10px;">"Crafting Careers, Creating Incomes."</div>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-item ${O.view==="dashboard"?"active":""} animate-fade-up stagger-1" data-route="dashboard">
        <i class="fas fa-desktop"></i> Affiliate Dashboard
      </li>
      <li class="sidebar-item ${O.view==="profile"?"active":""} animate-fade-up stagger-2" data-route="profile">
        <i class="fas fa-user"></i> My Profile
      </li>
      <li class="sidebar-item ${O.view==="affiliate-link"?"active":""} animate-fade-up stagger-3" data-route="affiliate-link">
        <i class="fas fa-link"></i> Affiliate Link
      </li>
      <li class="sidebar-item ${O.view==="courses"?"active":""} animate-fade-up stagger-4" data-route="courses">
        <i class="fas fa-tablet-screen-button"></i> My Courses
      </li>
      <li class="sidebar-item ${O.view==="upgrade"?"active":""} animate-fade-up stagger-5" data-route="upgrade">
        <i class="fas fa-chart-line"></i> Upgrade
      </li>
      <li class="sidebar-item ${O.view==="leaderboard"?"active":""} animate-fade-up stagger-6" data-route="leaderboard">
        <i class="fas fa-chart-bar"></i> Leaderboard
      </li>
      <li class="sidebar-item ${O.view==="team"?"active":""} animate-fade-up stagger-1" data-route="team">
        <i class="fas fa-users"></i> My Team
      </li>
      <li class="sidebar-item ${O.view==="reports"?"active":""} animate-fade-up stagger-2" data-route="reports">
        <i class="fas fa-file-alt"></i> Reports <i class="fas fa-chevron-right arrow"></i>
      </li>
      <li class="sidebar-item ${O.view==="training"?"active":""} animate-fade-up stagger-3" data-route="training">
        <i class="fas fa-video"></i> Training
      </li>
      <li class="sidebar-item ${O.view==="webinars"?"active":""} animate-fade-up stagger-4" data-route="webinars">
        <i class="fas fa-video"></i> Webinars
      </li>
      <li class="sidebar-item ${O.view==="offers"?"active":""} animate-fade-up stagger-5" data-route="offers">
        <i class="fas fa-bullseye"></i> Offers
      </li>
      <li class="sidebar-item ${O.view==="earning-target"?"active":""} animate-fade-up stagger-6" data-route="earning-target">
        <i class="fas fa-dollar-sign"></i> Earning Target
      </li>
      <li class="sidebar-item ${O.view==="wallet"?"active":""} animate-fade-up stagger-1" data-route="wallet">
        <i class="fas fa-user-check"></i> Wallet Request
      </li>
      <li class="sidebar-item ${O.view==="create-account"?"active":""} animate-fade-up stagger-2" data-route="create-account">
        <i class="fas fa-user-plus"></i> Create Account
      </li>
    </ul>
    
    <div style="padding: 1.5rem; border-top: 1px solid #f1f5f9; margin-top: auto;">
      <button id="logoutBtn" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: #fee2e2; color: #ef4444; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  </aside>
`,LT=()=>{const n=O.userData||{};return`
    <section class="main-content">
      <div class="profile-banner">
        <div class="profile-avatar"></div>
        <div>
          <h2 style="font-size: 1.8rem;">Welcome back, ${n.name||"Learner"} !</h2>
          <div style="background: var(--accent); display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; margin-top: 0.5rem;">
            Premium Package
          </div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card card-today animate-fade-up stagger-1">
          <div class="metric-info">
            <h3>₹ ${n.todayEarnings||0} /-</h3>
            <span>Today's Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-weekly animate-fade-up stagger-2">
          <div class="metric-info">
            <h3>₹ ${n.weeklyEarnings||0} /-</h3>
            <span>Weekly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-monthly animate-fade-up stagger-3">
          <div class="metric-info">
            <h3>₹ ${n.monthlyEarnings||0} /-</h3>
            <span>Monthly Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-alltime animate-fade-up stagger-4">
          <div class="metric-info">
            <h3>₹ ${n.allTimeEarnings||0} /-</h3>
            <span>All Time Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-passive animate-fade-up stagger-5">
          <div class="metric-info">
            <h3>₹ ${n.passiveEarnings||0} /-</h3>
            <span>Total Passive Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
        <div class="metric-card card-industry animate-fade-up stagger-6">
          <div class="metric-info">
            <h3>₹ ${n.industryEarnings||0} /-</h3>
            <span>Industry Earning</span>
          </div>
          <div class="metric-icon">₹</div>
        </div>
      </div>

      <div class="chart-container">
        <h3 style="margin-bottom: 2rem;">7 Days Sales Graph</h3>
        <div style="height: 300px; display: flex; align-items: flex-end; gap: 10%; padding: 0 2rem; border-bottom: 1px solid var(--card-border);">
          <div style="flex: 1; height: 10%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 15%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 5%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 20%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 12%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 8%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
          <div style="flex: 1; height: 30%; background: var(--accent); border-radius: 4px 4px 0 0;"></div>
        </div>
      </div>
    </section>
  `},MT=()=>`
  <section class="main-content animate-fade-up">
    <h1 style="margin-bottom: 3rem;">Leaderboard</h1>
    <div class="chart-container" style="background: white; border: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse; color: #0f172a;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <th style="padding: 1.2rem;">Rank</th>
            <th style="padding: 1.2rem;">User</th>
            <th style="padding: 1.2rem;">Total Earnings</th>
          </tr>
        </thead>
        <tbody>
          ${O.leaderboard.map((n,e)=>`
            <tr style="border-bottom: 1px solid #f8fafc; transition: background 0.2s;" class="animate-fade stagger-${e%6+1}">
              <td style="padding: 1.2rem; font-weight: 800; color: ${e<3?"#fbbf24":"#64748b"};">#${e+1}</td>
              <td style="padding: 1.2rem; display: flex; align-items: center; gap: 1rem;">
                <div style="width: 35px; height: 35px; background: #e2e8f0; border-radius: 50%;"></div>
                <span style="font-weight: 600;">${n.name}</span>
              </td>
              <td style="padding: 1.2rem; color: #16a34a; font-weight: 700;">₹ ${n.allTimeEarnings}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </section>
`,FT=()=>`
  <section class="main-content animate-fade-up">
    <h1 style="margin-bottom: 3rem;">My Team</h1>
    <div class="chart-container" style="background: white; border: 1px solid #f1f5f9;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="text-align: left; border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <th style="padding: 1.2rem;">Name</th>
            <th style="padding: 1.2rem;">Email</th>
            <th style="padding: 1.2rem;">Joined At</th>
          </tr>
        </thead>
        <tbody>
          ${O.team.map((n,e)=>`
            <tr style="border-bottom: 1px solid #f8fafc;" class="animate-fade stagger-${e%6+1}">
              <td style="padding: 1.2rem; font-weight: 600;">${n.name}</td>
              <td style="padding: 1.2rem; color: #64748b;">${n.email}</td>
              <td style="padding: 1.2rem; color: #64748b;">${new Date(n.joinedAt).toLocaleDateString()}</td>
            </tr>
          `).join("")}
          ${O.team.length===0?'<tr><td colspan="3" style="padding: 3rem; text-align: center; color: var(--text-dim);">No team members yet. Start sharing your link!</td></tr>':""}
        </tbody>
      </table>
    </div>
  </section>
`,UT=()=>{const n=O.userData||{},e=(n.allTimeEarnings||0)-(n.paidEarnings||0);return`
    <section class="main-content">
      <h1 style="margin-bottom: 3rem;">Wallet Request</h1>
      <div class="metrics-grid" style="grid-template-columns: 1fr;">
        <div class="metric-card card-industry" style="height: 150px;">
          <div class="metric-info">
            <h3>₹ ${e} /-</h3>
            <span>Available for Withdrawal</span>
          </div>
          <div class="metric-icon">💰</div>
        </div>
      </div>
      
      <div class="chart-container">
        <h3>Submit Payout Request</h3>
        <form id="payoutForm" style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">Withdrawal Amount (₹)</label>
            <input type="number" id="payoutAmount" value="${e}" max="${e}" required style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--card-border); background: rgba(0,0,0,0.3); color: white;"/>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dim);">UPI ID / Bank Details</label>
            <textarea id="payoutUpi" required placeholder="example@upi or Bank: Name, A/C, IFSC" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--card-border); background: rgba(0,0,0,0.3); color: white; height: 100px;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit Request</button>
        </form>
      </div>
    </section>
  `},$T=()=>{const e=(O.userData||{}).referralCode||"FF-GUEST",t=window.location.origin;return`
    <section class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
        <h1>Refer & Earn</h1>
        <div style="background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 10px 20px; border-radius: 50px; border: 1px solid rgba(74, 222, 128, 0.2); font-weight: 600;">
          Active Affiliate Account
        </div>
      </div>

      <div class="metrics-grid" style="grid-template-columns: 1fr 1fr; margin-bottom: 3rem;">
        <div class="metric-card card-today">
          <div class="metric-info">
            <h3>₹ 400 /-</h3>
            <span>Direct Commission</span>
          </div>
        </div>
        <div class="metric-card card-passive">
          <div class="metric-info">
            <h3>₹ 100 /-</h3>
            <span>Passive Commission</span>
          </div>
        </div>
      </div>

      <div class="chart-container" style="margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Your Unique Referral Hub</h3>
        <p style="color: var(--text-dim); margin-bottom: 2rem;">Share your code with friends and earn on every successful referral.</p>
        
        <label style="color: var(--text-dim); display: block; margin-bottom: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Unique Referral Code</label>
        <div style="display: flex; gap: 1rem; margin-bottom: 2.5rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; border: 1px dashed var(--accent);">
          <input type="text" value="${e}" readonly style="flex-grow: 1; background: transparent; border: none; color: white; padding: 12px; font-size: 1.2rem; font-weight: 700; letter-spacing: 2px;"/>
          <button class="btn btn-primary copy-btn" data-text="${e}" style="padding: 0 30px;">Copy Code</button>
        </div>

        <label style="color: var(--text-dim); display: block; margin-bottom: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Direct Signup Link</label>
        <div style="display: flex; gap: 1rem; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 12px; border: 1px solid var(--card-border);">
          <input type="text" value="${t}/?ref=${e}" readonly style="flex-grow: 1; background: transparent; border: none; color: white; padding: 12px; font-size: 0.9rem;"/>
          <button class="btn btn-outline copy-btn" data-text="${t}/?ref=${e}" style="border-radius: 8px;">Copy Link</button>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%); padding: 2rem; border-radius: 20px; border: 1px solid rgba(147, 51, 234, 0.2);">
        <h4 style="color: var(--accent); margin-bottom: 1rem;">How it works?</h4>
        <ul style="color: var(--text-dim); line-height: 1.8; font-size: 0.95rem;">
          <li>1. Copy your unique referral link or code.</li>
          <li>2. Share it with your audience or friends.</li>
          <li>3. When they sign up, you get <strong>₹400</strong> instantly.</li>
          <li>4. When your team makes a sale, you get <strong>₹100</strong> passive income!</li>
        </ul>
      </div>
    </section>
  `},BT=()=>`
  <section class="main-content">
    <h1 style="margin-bottom: 3rem;">Courses</h1>
    <div class="course-grid">
      ${O.courses.map(n=>`
        <div class="course-card">
          <img src="${n.img}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover;"/>
          <h3>${n.title}</h3>
          <button class="btn-start">START NOW</button>
        </div>
      `).join("")}
    </div>
  </section>
`,qT=()=>`
  <div class="hero">
    <img src="/logo.png" alt="SkillFutures Logo" style="height: 80px; margin-bottom: 2rem;">
    <h1>SkillFutures</h1>
    <h2>Empower Your Digital Journey</h2>
    <p style="font-size: 1.2rem; color: var(--text-dim); max-width: 600px; margin: 0 auto 2rem;">
      The ultimate platform to master digital skills and build a sustainable affiliate income.
    </p>
    <button class="btn btn-primary" data-route="signup">Start Your Journey</button>
  </div>
`,nu=n=>`
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2 class="auth-title">${n==="login"?"Login Account":"Create Account"}</h2>
      <p class="auth-subtitle">
        ${n==="login"?"Hey there! Ready to log in? Just enter your email and password below and you'll be back in action in no time. Let's go!":"Join our community of digital entrepreneurs and start building your future today."}
      </p>
      
      <form id="${n}Form">
        ${n==="signup"?`
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <input type="text" id="signupName" class="auth-input" placeholder="Full Name" required>
          </div>
        `:""}
        
        <div class="form-field">
          <label class="form-label">Email</label>
          <input type="email" id="${n}Email" class="auth-input" placeholder="Email" required>
        </div>
        
        <div class="form-field">
          <label class="form-label">Password</label>
          <div class="password-container">
            <input type="password" id="${n}Password" class="auth-input" placeholder="Password" required>
            <i class="fas fa-eye visibility-toggle" onclick="const p = document.getElementById('${n}Password'); p.type = p.type === 'password' ? 'text' : 'password'; this.classList.toggle('fa-eye'); this.classList.toggle('fa-eye-slash');"></i>
          </div>
        </div>
        
        <div class="auth-options">
          <label class="remember-me">
            <input type="checkbox"> Remember me
          </label>
          <a href="#" class="forgot-link">Forgot Password?</a>
        </div>
        
        ${n==="signup"?`
          <div class="form-field">
            <label class="form-label">Referral Code (Optional)</label>
            <input type="text" id="signupReferral" class="auth-input" placeholder="Referral Code">
          </div>
        `:""}
        
        <button type="submit" class="btn-auth">
          ${n==="login"?"Sign In":"Sign Up"} <i class="fas fa-arrow-right"></i>
        </button>
      </form>
      
      <div class="auth-footer">
        ${n==="login"?`Don't have an account? <span id="toSignUp" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Sign Up</span>`:'Already have an account? <span id="toSignIn" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Login</span>'}
      </div>
    </div>
  </div>
`,ru=()=>`
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col" style="flex: 1.5;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
          <img src="/logo.png" alt="Logo" style="height: 40px;"/>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent);">SkillFutures</div>
        </div>
        <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">"Empower Your Digital Journey"</div>
        <p class="footer-description">
          SkillFutures is an E-learning platform. this platform helps people to make own personal brand on social media and create passive income.
        </p>
        <div class="footer-socials">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      
      <div class="footer-col">
        <h3>Course/Packages</h3>
        <ul class="footer-links">
          <li><a>Grow package</a></li>
          <li><a>Creator package</a></li>
          <li><a>Finance Package</a></li>
          <li><a>Prime Package</a></li>
          <li><a>Premium Package</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h3>Quick Links</h3>
        <ul class="footer-links">
          <li><a>Contact Us</a></li>
          <li><a>Disclaimer</a></li>
          <li><a>Privacy Policy</a></li>
          <li><a>Refund Policy</a></li>
          <li><a>Terms & Conditions</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h3>Get In Touch</h3>
        <p class="footer-description" style="margin-top: 0;">We are always open to questions and feedback</p>
        <div class="footer-contact-item">
          <i class="fas fa-phone"></i>
          <span>9548797492</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-envelope"></i>
          <span>skillfuturessupport@gmail.com</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>Village karanpur barki madayye sarkara khas District Moradabad (244001) (Uttar pradesh) Near by KGN hospital 🏥</span>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div>Copyright © 2026 SkillFutures. All rights reserved.</div>
      <div class="developed-by">Developed by <span>Bizfunnel</span></div>
    </div>
    
    <div class="scroll-top" id="scrollTopBtn">
      <i class="fas fa-chevron-up"></i>
    </div>
  </footer>
`,it=()=>{var e;const n=document.querySelector("#app");if(O.user)n.innerHTML=`<div class="dashboard-container">${xT()}<div id="main-view" style="flex-grow: 1; overflow-y: auto;">
      ${O.view==="dashboard"?LT():""}
      ${O.view==="courses"?BT():""}
      ${O.view==="affiliate-link"?$T():""}
      ${O.view==="leaderboard"?MT():""}
      ${O.view==="team"?FT():""}
      ${O.view==="wallet"?UT():""}
      ${O.view==="profile"?`
        <section class="main-content">
          <h1>My Profile</h1>
          <div class="chart-container">
            <p>Name: <strong>${(e=O.userData)==null?void 0:e.name}</strong></p>
            <p>Email: ${O.user.email}</p>
            <p style="margin-top: 1rem;">KYC Status: <strong style="color: #4ade80;">APPROVED ✅</strong></p>
          </div>
        </section>
      `:""}
      ${O.view==="training"?`
        <section class="main-content animate-fade">
          <h1 style="margin-bottom: 2rem;">Student Training Hub</h1>
          <div class="metrics-grid" style="grid-template-columns: 2fr 1fr;">
            <div class="chart-container" style="padding: 0; overflow: hidden; background: black;">
              <iframe width="100%" height="400" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="chart-container" style="overflow-y: auto; max-height: 400px;">
              <h3 style="margin-bottom: 1rem;">Course Modules</h3>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="padding: 1rem; background: #f8fafc; border-radius: 10px; border-left: 4px solid #4338ca;">1. Introduction to Affiliate</div>
                <div style="padding: 1rem; background: white; border-radius: 10px; border: 1px solid #f1f5f9;">2. Setting up your Profile</div>
                <div style="padding: 1rem; background: white; border-radius: 10px; border: 1px solid #f1f5f9;">3. Lead Generation Masterclass</div>
                <div style="padding: 1rem; background: white; border-radius: 10px; border: 1px solid #f1f5f9;">4. Closing the Sale</div>
              </div>
            </div>
          </div>
        </section>
      `:""}
      ${O.view==="webinars"?`
        <section class="main-content animate-fade">
          <h1 style="margin-bottom: 2rem;">Live Webinars</h1>
          <div class="metrics-grid">
            <div class="chart-container" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: white; border: none;">
              <div style="font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Next Session</div>
              <h2>Strategic Scaling & Passive Income</h2>
              <p style="margin: 1rem 0; opacity: 0.9;">Join us this Sunday for an exclusive session with top earners.</p>
              <div style="display: flex; gap: 20px; font-weight: 700;">
                <div>24h : 12m : 44s</div>
              </div>
              <button class="btn" style="background: white; color: #4338ca; margin-top: 2rem; width: 100%;">Set Reminder</button>
            </div>
            <div class="chart-container">
              <h3>Recent Recordings</h3>
              <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                  <span>Sales Psychology 101</span>
                  <i class="fas fa-play-circle" style="color: #4338ca; font-size: 1.2rem;"></i>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                  <span>Lead Magnet Optimization</span>
                  <i class="fas fa-play-circle" style="color: #4338ca; font-size: 1.2rem;"></i>
                </div>
              </div>
            </div>
          </div>
        </section>
      `:""}
      ${["upgrade","reports","offers","earning-target","create-account"].includes(O.view)?`
        <section class="main-content animate-fade-up">
          <h1>${O.view.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}</h1>
          <div class="chart-container" style="text-align: center; padding: 5rem;">
            <i class="fas fa-tools" style="font-size: 4rem; color: #6366f1; margin-bottom: 2rem;"></i>
            <h2>Section Under Development</h2>
            <p style="color: #64748b;">We are working hard to bring this feature to your dashboard very soon!</p>
          </div>
        </section>
      `:""}
      ${ru()}
    </div></div>`,O.view==="leaderboard"&&O.leaderboard.length===0&&DT(),O.view==="team"&&O.team.length===0&&NT();else if(n.innerHTML=`<header style="padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--card-border);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="/logo.png" alt="Logo" style="height: 35px;"/>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent);">SkillFutures</div>
      </div>
      <nav>${O.view==="home"?'<button class="btn btn-primary" data-route="signup">Join Now</button><button class="btn btn-outline" data-route="login" style="margin-left:1rem;">Login</button>':""}</nav>
    </header>
    <main>${O.view==="home"?qT():O.view==="login"?nu("login"):nu("signup")}</main>
    ${ru()}`,O.view==="signup"){const t=CT();if(t.ref){const r=document.querySelector("#signupReferral");r&&(r.value=t.ref)}}jT()},jT=()=>{document.querySelectorAll("[data-route]").forEach(l=>{l.onclick=()=>{O.view=l.dataset.route,it()}});const n=document.querySelector("#logoutBtn");n&&(n.onclick=()=>Sg(hs));const e=document.querySelector("#loginForm");e&&(e.onsubmit=async l=>{l.preventDefault();const u=document.querySelector("#loginEmail").value,d=document.querySelector("#loginPassword").value;try{await wg(hs,u,d)}catch(p){alert(p.message)}});const t=document.querySelector("#signupForm");t&&(t.onsubmit=async l=>{l.preventDefault();const u=document.querySelector("#signupEmail").value,d=document.querySelector("#signupPassword").value,p=document.querySelector("#signupName").value,_=document.querySelector("#signupReferral").value;try{let T=null;if(_){const x=sa(Js(We,"users"),xd("referralCode","==",_.trim().toUpperCase()),Ld(1)),N=await ca(x);N.empty||(T=N.docs[0].id)}const P=await Tg(hs,u,d),V={name:p,email:u,todayEarnings:0,weeklyEarnings:0,monthlyEarnings:0,allTimeEarnings:0,passiveEarnings:0,industryEarnings:0,paidEarnings:0,referralCode:`FF-${P.user.uid.substring(0,5).toUpperCase()}`,referrerId:T,joinedAt:new Date().toISOString()};if(await $d(Wt(We,"users",P.user.uid),V),T){await Gl(Wt(We,"users",T),{todayEarnings:hn(400),weeklyEarnings:hn(400),monthlyEarnings:hn(400),allTimeEarnings:hn(400)});const x=await Ud(Wt(We,"users",T));if(x.exists()&&x.data().referrerId){const N=x.data().referrerId;await Gl(Wt(We,"users",N),{passiveEarnings:hn(100),allTimeEarnings:hn(100)})}}}catch(T){console.error(T),alert(T.message)}});const r=document.querySelector("#payoutForm");r&&(r.onsubmit=l=>{l.preventDefault(),OT(Number(document.querySelector("#payoutAmount").value),document.querySelector("#payoutUpi").value)}),document.querySelectorAll(".copy-btn").forEach(l=>{l.onclick=()=>kT(l.dataset.text)});const s=document.querySelector("#toSignUp");s&&(s.onclick=()=>{O.view="signup",it()});const i=document.querySelector("#toSignIn");i&&(i.onclick=()=>{O.view="login",it()});const a=document.querySelector("#scrollTopBtn");a&&(a.onclick=()=>window.scrollTo({top:0,behavior:"smooth"}),window.onscroll=()=>{window.scrollY>300?a.style.display="flex":a.style.display="none"},a.style.display="none")};Rg(hs,n=>{O.user=n,n?(VT(n.uid),["home","login","signup"].includes(O.view)&&(O.view="dashboard")):(O.userData=null,["login","signup"].includes(O.view)||(O.view="home")),it()});
