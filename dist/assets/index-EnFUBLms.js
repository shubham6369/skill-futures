(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const cm=()=>{};var ul={};/**
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
 */const ch=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},lm=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},lh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,c=a?n[i+1]:0,u=i+2<n.length,d=u?n[i+2]:0,f=s>>2,y=(s&3)<<4|c>>4;let E=(c&15)<<2|d>>6,R=d&63;u||(R=64,a||(E=64)),r.push(t[f],t[y],t[E],t[R])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ch(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):lm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const d=i<n.length?t[n.charAt(i)]:64;++i;const y=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||y==null)throw new um;const E=s<<2|c>>4;if(r.push(E),d!==64){const R=c<<4&240|d>>2;if(r.push(R),y!==64){const k=d<<6&192|y;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class um extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const hm=function(n){const e=ch(n);return lh.encodeByteArray(e,!0)},Li=function(n){return hm(n).replace(/\./g,"")},uh=function(n){try{return lh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function dm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fm=()=>dm().__FIREBASE_DEFAULTS__,pm=()=>{if(typeof process>"u"||typeof ul>"u")return;const n=ul.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},mm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&uh(n[1]);return e&&JSON.parse(e)},ss=()=>{try{return cm()||fm()||pm()||mm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hh=n=>{var e,t;return(t=(e=ss())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},dh=n=>{const e=hh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},fh=()=>{var n;return(n=ss())==null?void 0:n.config},ph=n=>{var e;return(e=ss())==null?void 0:e[`_${n}`]};/**
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
 */class gm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function mh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Li(JSON.stringify(t)),Li(JSON.stringify(a)),""].join(".")}/**
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
 */function Se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ym(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Se())}function _m(){var e;const n=(e=ss())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function vm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function wm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bm(){const n=Se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Em(){return!_m()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function yh(){try{return typeof indexedDB=="object"}catch{return!1}}function _h(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}function Tm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Im="FirebaseError";class Ge extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Im,Object.setPrototypeOf(this,Ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,bn.prototype.create)}}class bn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Am(s,r):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Ge(i,c,r)}}function Am(n,e){return n.replace(Rm,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Rm=/\{\$([^}]+)}/g;function Sm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Mt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(hl(s)&&hl(a)){if(!Mt(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function hl(n){return n!==null&&typeof n=="object"}/**
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
 */function jr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function wr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function br(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Pm(n,e){const t=new Cm(n,e);return t.subscribe.bind(t)}class Cm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");km(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=oo),i.error===void 0&&(i.error=oo),i.complete===void 0&&(i.complete=oo);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function km(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function oo(){}/**
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
 */const xm=1e3,Dm=2,Nm=14400*1e3,Vm=.5;function dl(n,e=xm,t=Dm){const r=e*Math.pow(t,n),i=Math.round(Vm*r*(Math.random()-.5)*2);return Math.min(Nm,r+i)}/**
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
 */function En(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ea(n){return(await fetch(n,{credentials:"include"})).ok}class We{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const sn="[DEFAULT]";/**
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
 */class Om{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new gm;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Mm(e))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=sn){return this.instances.has(e)}getOptions(e=sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lm(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=sn){return this.component?this.component.multipleInstances?e:sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lm(n){return n===sn?void 0:n}function Mm(n){return n.instantiationMode==="EAGER"}/**
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
 */class Um{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Om(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const Fm={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},$m=W.INFO,qm={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Bm=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=qm[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class os{constructor(e){this.name=e,this._logLevel=$m,this._logHandler=Bm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Fm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const zm=(n,e)=>e.some(t=>n instanceof t);let fl,pl;function jm(){return fl||(fl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wm(){return pl||(pl=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vh=new WeakMap,Ao=new WeakMap,wh=new WeakMap,ao=new WeakMap,ta=new WeakMap;function Hm(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Nt(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&vh.set(t,n)}).catch(()=>{}),ta.set(e,n),e}function Gm(n){if(Ao.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});Ao.set(n,e)}let Ro={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ao.get(n);if(e==="objectStoreNames")return n.objectStoreNames||wh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Nt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Km(n){Ro=n(Ro)}function Qm(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(co(this),e,...t);return wh.set(r,e.sort?e.sort():[e]),Nt(r)}:Wm().includes(n)?function(...e){return n.apply(co(this),e),Nt(vh.get(this))}:function(...e){return Nt(n.apply(co(this),e))}}function Ym(n){return typeof n=="function"?Qm(n):(n instanceof IDBTransaction&&Gm(n),zm(n,jm())?new Proxy(n,Ro):n)}function Nt(n){if(n instanceof IDBRequest)return Hm(n);if(ao.has(n))return ao.get(n);const e=Ym(n);return e!==n&&(ao.set(n,e),ta.set(e,n)),e}const co=n=>ta.get(n);function bh(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),c=Nt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(Nt(a.result),u.oldVersion,u.newVersion,Nt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Jm=["get","getKey","getAll","getAllKeys","count"],Xm=["put","add","delete","clear"],lo=new Map;function ml(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(lo.get(e))return lo.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Xm.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Jm.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&u.done]))[0]};return lo.set(e,s),s}Km(n=>({...n,get:(e,t,r)=>ml(e,t)||n.get(e,t,r),has:(e,t)=>!!ml(e,t)||n.has(e,t)}));/**
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
 */class Zm{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(eg(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function eg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const So="@firebase/app",gl="0.14.10";/**
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
 */const yt=new os("@firebase/app"),tg="@firebase/app-compat",ng="@firebase/analytics-compat",rg="@firebase/analytics",ig="@firebase/app-check-compat",sg="@firebase/app-check",og="@firebase/auth",ag="@firebase/auth-compat",cg="@firebase/database",lg="@firebase/data-connect",ug="@firebase/database-compat",hg="@firebase/functions",dg="@firebase/functions-compat",fg="@firebase/installations",pg="@firebase/installations-compat",mg="@firebase/messaging",gg="@firebase/messaging-compat",yg="@firebase/performance",_g="@firebase/performance-compat",vg="@firebase/remote-config",wg="@firebase/remote-config-compat",bg="@firebase/storage",Eg="@firebase/storage-compat",Tg="@firebase/firestore",Ig="@firebase/ai",Ag="@firebase/firestore-compat",Rg="firebase",Sg="12.11.0";/**
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
 */const Po="[DEFAULT]",Pg={[So]:"fire-core",[tg]:"fire-core-compat",[rg]:"fire-analytics",[ng]:"fire-analytics-compat",[sg]:"fire-app-check",[ig]:"fire-app-check-compat",[og]:"fire-auth",[ag]:"fire-auth-compat",[cg]:"fire-rtdb",[lg]:"fire-data-connect",[ug]:"fire-rtdb-compat",[hg]:"fire-fn",[dg]:"fire-fn-compat",[fg]:"fire-iid",[pg]:"fire-iid-compat",[mg]:"fire-fcm",[gg]:"fire-fcm-compat",[yg]:"fire-perf",[_g]:"fire-perf-compat",[vg]:"fire-rc",[wg]:"fire-rc-compat",[bg]:"fire-gcs",[Eg]:"fire-gcs-compat",[Tg]:"fire-fst",[Ag]:"fire-fst-compat",[Ig]:"fire-vertex","fire-js":"fire-js",[Rg]:"fire-js-all"};/**
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
 */const Mi=new Map,Cg=new Map,Co=new Map;function yl(n,e){try{n.container.addComponent(e)}catch(t){yt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Je(n){const e=n.name;if(Co.has(e))return yt.debug(`There were multiple attempts to register component ${e}.`),!1;Co.set(e,n);for(const t of Mi.values())yl(t,n);for(const t of Cg.values())yl(t,n);return!0}function jt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Oe(n){return n==null?!1:n.settings!==void 0}/**
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
 */const kg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vt=new bn("app","Firebase",kg);/**
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
 */class xg{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new We("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vt.create("app-deleted",{appName:this._name})}}/**
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
 */const Tn=Sg;function Eh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Po,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Vt.create("bad-app-name",{appName:String(i)});if(t||(t=fh()),!t)throw Vt.create("no-options");const s=Mi.get(i);if(s){if(Mt(t,s.options)&&Mt(r,s.config))return s;throw Vt.create("duplicate-app",{appName:i})}const a=new Um(i);for(const u of Co.values())a.addComponent(u);const c=new xg(t,r,a);return Mi.set(i,c),c}function as(n=Po){const e=Mi.get(n);if(!e&&n===Po&&fh())return Eh();if(!e)throw Vt.create("no-app",{appName:n});return e}function Me(n,e,t){let r=Pg[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),yt.warn(a.join(" "));return}Je(new We(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Dg="firebase-heartbeat-database",Ng=1,Nr="firebase-heartbeat-store";let uo=null;function Th(){return uo||(uo=bh(Dg,Ng,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Nr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Vt.create("idb-open",{originalErrorMessage:n.message})})),uo}async function Vg(n){try{const t=(await Th()).transaction(Nr),r=await t.objectStore(Nr).get(Ih(n));return await t.done,r}catch(e){if(e instanceof Ge)yt.warn(e.message);else{const t=Vt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});yt.warn(t.message)}}}async function _l(n,e){try{const r=(await Th()).transaction(Nr,"readwrite");await r.objectStore(Nr).put(e,Ih(n)),await r.done}catch(t){if(t instanceof Ge)yt.warn(t.message);else{const r=Vt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});yt.warn(r.message)}}}function Ih(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Og=1024,Lg=30;class Mg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Fg(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=vl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Lg){const a=$g(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){yt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=vl(),{heartbeatsToSend:r,unsentEntries:i}=Ug(this._heartbeatsCache.heartbeats),s=Li(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return yt.warn(t),""}}}function vl(){return new Date().toISOString().substring(0,10)}function Ug(n,e=Og){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),wl(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),wl(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Fg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yh()?_h().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Vg(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return _l(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return _l(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function wl(n){return Li(JSON.stringify({version:2,heartbeats:n})).length}function $g(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function qg(n){Je(new We("platform-logger",e=>new Zm(e),"PRIVATE")),Je(new We("heartbeat",e=>new Mg(e),"PRIVATE")),Me(So,gl,n),Me(So,gl,"esm2020"),Me("fire-js","")}qg("");var Bg="firebase",zg="12.11.0";/**
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
 */Me(Bg,zg,"app");function Ah(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const jg=Ah,Rh=new bn("auth","Firebase",Ah());/**
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
 */const Ui=new os("@firebase/auth");function Wg(n,...e){Ui.logLevel<=W.WARN&&Ui.warn(`Auth (${Tn}): ${n}`,...e)}function Ri(n,...e){Ui.logLevel<=W.ERROR&&Ui.error(`Auth (${Tn}): ${n}`,...e)}/**
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
 */function He(n,...e){throw ra(n,...e)}function Qe(n,...e){return ra(n,...e)}function na(n,e,t){const r={...jg(),[e]:t};return new bn("auth","Firebase",r).create(e,{appName:n.name})}function ft(n){return na(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Hg(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&He(n,"argument-error"),na(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ra(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Rh.create(n,...e)}function M(n,e,...t){if(!n)throw ra(e,...t)}function ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ri(e),new Error(e)}function _t(n,e){n||ht(e)}/**
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
 */function ko(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Gg(){return bl()==="http:"||bl()==="https:"}function bl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function Kg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gg()||gh()||"connection"in navigator)?navigator.onLine:!0}function Qg(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Wr{constructor(e,t){this.shortDelay=e,this.longDelay=t,_t(t>e,"Short delay should be less than long delay!"),this.isMobile=ym()||wm()}get(){return Kg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ia(n,e){_t(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Sh{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Yg={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Jg=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xg=new Wr(3e4,6e4);function Wt(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Ht(n,e,t,r,i={}){return Ph(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=jr({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:u,...s};return vm()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&En(n.emulatorConfig.host)&&(d.credentials="include"),Sh.fetch()(await Ch(n,n.config.apiHost,t,c),d)})}async function Ph(n,e,t){n._canInitEmulator=!1;const r={...Yg,...e};try{const i=new ey(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw _i(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw _i(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw _i(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw _i(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw na(n,f,d);He(n,f)}}catch(i){if(i instanceof Ge)throw i;He(n,"network-request-failed",{message:String(i)})}}async function Hr(n,e,t,r,i={}){const s=await Ht(n,e,t,r,i);return"mfaPendingCredential"in s&&He(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Ch(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?ia(n.config,i):`${n.config.apiScheme}://${i}`;return Jg.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Zg(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ey{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Qe(this.auth,"network-request-failed")),Xg.get())})}}function _i(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Qe(n,e,r);return i.customData._tokenResponse=t,i}function El(n){return n!==void 0&&n.enterprise!==void 0}class ty{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zg(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ny(n,e){return Ht(n,"GET","/v2/recaptchaConfig",Wt(n,e))}/**
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
 */async function ry(n,e){return Ht(n,"POST","/v1/accounts:delete",e)}async function Fi(n,e){return Ht(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Rr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function iy(n,e=!1){const t=se(n),r=await t.getIdToken(e),i=sa(r);M(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Rr(ho(i.auth_time)),issuedAtTime:Rr(ho(i.iat)),expirationTime:Rr(ho(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ho(n){return Number(n)*1e3}function sa(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ri("JWT malformed, contained fewer than 3 sections"),null;try{const i=uh(t);return i?JSON.parse(i):(Ri("Failed to decode base64 JWT payload"),null)}catch(i){return Ri("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Tl(n){const e=sa(n);return M(e,"internal-error"),M(typeof e.exp<"u","internal-error"),M(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Vr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ge&&sy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function sy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class oy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class xo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rr(this.lastLoginAt),this.creationTime=Rr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function $i(n){var y;const e=n.auth,t=await n.getIdToken(),r=await Vr(n,Fi(e,{idToken:t}));M(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(y=i.providerUserInfo)!=null&&y.length?kh(i.providerUserInfo):[],a=cy(n.providerData,s),c=n.isAnonymous,u=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),d=c?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new xo(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,f)}async function ay(n){const e=se(n);await $i(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function cy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function kh(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function ly(n,e){const t=await Ph(n,{},async()=>{const r=jr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Ch(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&En(n.emulatorConfig.host)&&(u.credentials="include"),Sh.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function uy(n,e){return Ht(n,"POST","/v2/accounts:revokeToken",Wt(n,e))}/**
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
 */class Ln{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){M(e.idToken,"internal-error"),M(typeof e.idToken<"u","internal-error"),M(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Tl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){M(e.length!==0,"internal-error");const t=Tl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(M(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await ly(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Ln;return r&&(M(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(M(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(M(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ln,this.toJSON())}_performRefresh(){return ht("not implemented")}}/**
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
 */function St(n,e){M(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ke{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new oy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new xo(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Vr(this,this.stsTokenManager.getToken(this.auth,e));return M(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return iy(this,e)}reload(){return ay(this)}_assign(e){this!==e&&(M(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ke({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){M(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await $i(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Oe(this.auth.app))return Promise.reject(ft(this.auth));const e=await this.getIdToken();return await Vr(this,ry(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,d=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:y,emailVerified:E,isAnonymous:R,providerData:k,stsTokenManager:D}=t;M(y&&D,e,"internal-error");const x=Ln.fromJSON(this.name,D);M(typeof y=="string",e,"internal-error"),St(r,e.name),St(i,e.name),M(typeof E=="boolean",e,"internal-error"),M(typeof R=="boolean",e,"internal-error"),St(s,e.name),St(a,e.name),St(c,e.name),St(u,e.name),St(d,e.name),St(f,e.name);const B=new Ke({uid:y,auth:e,email:i,emailVerified:E,displayName:r,isAnonymous:R,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:x,createdAt:d,lastLoginAt:f});return k&&Array.isArray(k)&&(B.providerData=k.map(F=>({...F}))),u&&(B._redirectEventId=u),B}static async _fromIdTokenResponse(e,t,r=!1){const i=new Ln;i.updateFromServerResponse(t);const s=new Ke({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await $i(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];M(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?kh(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Ln;c.updateFromIdToken(r);const u=new Ke({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new xo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,d),u}}/**
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
 */const Il=new Map;function dt(n){_t(n instanceof Function,"Expected a class definition");let e=Il.get(n);return e?(_t(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Il.set(n,e),e)}/**
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
 */class xh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}xh.type="NONE";const Al=xh;/**
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
 */function Si(n,e,t){return`firebase:${n}:${e}:${t}`}class Mn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Si(this.userKey,i.apiKey,s),this.fullPersistenceKey=Si("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Fi(this.auth,{idToken:e}).catch(()=>{});return t?Ke._fromGetAccountInfoResponse(this.auth,t,e):null}return Ke._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mn(dt(Al),e,r);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||dt(Al);const a=Si(r,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){let y;if(typeof f=="string"){const E=await Fi(e,{idToken:f}).catch(()=>{});if(!E)break;y=await Ke._fromGetAccountInfoResponse(e,E,f)}else y=Ke._fromJSON(e,f);d!==s&&(c=y),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new Mn(s,e,r):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new Mn(s,e,r))}}/**
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
 */function Rl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Oh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mh(e))return"Blackberry";if(Uh(e))return"Webos";if(Nh(e))return"Safari";if((e.includes("chrome/")||Vh(e))&&!e.includes("edge/"))return"Chrome";if(Lh(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Dh(n=Se()){return/firefox\//i.test(n)}function Nh(n=Se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Vh(n=Se()){return/crios\//i.test(n)}function Oh(n=Se()){return/iemobile/i.test(n)}function Lh(n=Se()){return/android/i.test(n)}function Mh(n=Se()){return/blackberry/i.test(n)}function Uh(n=Se()){return/webos/i.test(n)}function oa(n=Se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function hy(n=Se()){var e;return oa(n)&&!!((e=window.navigator)!=null&&e.standalone)}function dy(){return bm()&&document.documentMode===10}function Fh(n=Se()){return oa(n)||Lh(n)||Uh(n)||Mh(n)||/windows phone/i.test(n)||Oh(n)}/**
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
 */function $h(n,e=[]){let t;switch(n){case"Browser":t=Rl(Se());break;case"Worker":t=`${Rl(Se())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Tn}/${r}`}/**
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
 */class fy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function py(n,e={}){return Ht(n,"GET","/v2/passwordPolicy",Wt(n,e))}/**
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
 */const my=6;class gy{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??my,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class yy{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Sl(this),this.idTokenSubscription=new Sl(this),this.beforeStateQueue=new fy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Mn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Fi(this,{idToken:e}),r=await Ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(Oe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return M(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await $i(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qg()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Oe(this.app))return Promise.reject(ft(this));const t=e?se(e):null;return t&&M(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&M(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Oe(this.app)?Promise.reject(ft(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Oe(this.app)?Promise.reject(ft(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await py(this),t=new gy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new bn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await uy(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dt(e)||this._popupRedirectResolver;M(t,this,"argument-error"),this.redirectPersistenceManager=await Mn.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(M(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return M(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$h(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Wg(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Gt(n){return se(n)}class Sl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Pm(t=>this.observer=t)}get next(){return M(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let cs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _y(n){cs=n}function qh(n){return cs.loadJS(n)}function vy(){return cs.recaptchaEnterpriseScript}function wy(){return cs.gapiScript}function by(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class Ey{constructor(){this.enterprise=new Ty}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ty{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Iy="recaptcha-enterprise",Bh="NO_RECAPTCHA";class Ay{constructor(e){this.type=Iy,this.auth=Gt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{ny(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const d=new ty(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(u=>{c(u)})})}function i(s,a,c){const u=window.grecaptcha;El(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Bh)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ey().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&El(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=vy();u.length!==0&&(u+=c),qh(u).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}}async function Pl(n,e,t,r=!1,i=!1){const s=new Ay(n);let a;if(i)a=Bh;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const u=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Do(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Pl(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Pl(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
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
 */function Ry(n,e){const t=jt(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Mt(s,e??{}))return i;He(i,"already-initialized")}return t.initialize({options:e})}function Sy(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(dt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Py(n,e,t){const r=Gt(n);M(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=zh(e),{host:a,port:c}=Cy(e),u=c===null?"":`:${c}`,d={url:`${s}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){M(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),M(Mt(d,r.config.emulator)&&Mt(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,En(a)?ea(`${s}//${a}${u}`):ky()}function zh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Cy(n){const e=zh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Cl(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Cl(a)}}}function Cl(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function ky(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class aa{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ht("not implemented")}_getIdTokenResponse(e){return ht("not implemented")}_linkToIdToken(e,t){return ht("not implemented")}_getReauthenticationResolver(e){return ht("not implemented")}}async function xy(n,e){return Ht(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Dy(n,e){return Hr(n,"POST","/v1/accounts:signInWithPassword",Wt(n,e))}/**
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
 */async function Ny(n,e){return Hr(n,"POST","/v1/accounts:signInWithEmailLink",Wt(n,e))}async function Vy(n,e){return Hr(n,"POST","/v1/accounts:signInWithEmailLink",Wt(n,e))}/**
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
 */class Or extends aa{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new Or(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Or(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Do(e,t,"signInWithPassword",Dy);case"emailLink":return Ny(e,{email:this._email,oobCode:this._password});default:He(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Do(e,r,"signUpPassword",xy);case"emailLink":return Vy(e,{idToken:t,email:this._email,oobCode:this._password});default:He(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Un(n,e){return Hr(n,"POST","/v1/accounts:signInWithIdp",Wt(n,e))}/**
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
 */const Oy="http://localhost";class dn extends aa{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new dn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):He("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new dn(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Un(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Un(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Un(e,t)}buildRequest(){const e={requestUri:Oy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=jr(t)}return e}}/**
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
 */function Ly(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function My(n){const e=wr(br(n)).link,t=e?wr(br(e)).deep_link_id:null,r=wr(br(n)).deep_link_id;return(r?wr(br(r)).link:null)||r||t||e||n}class ca{constructor(e){const t=wr(br(e)),r=t.apiKey??null,i=t.oobCode??null,s=Ly(t.mode??null);M(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=My(e);try{return new ca(t)}catch{return null}}}/**
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
 */class Qn{constructor(){this.providerId=Qn.PROVIDER_ID}static credential(e,t){return Or._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ca.parseLink(t);return M(r,"argument-error"),Or._fromEmailAndCode(e,r.code,r.tenantId)}}Qn.PROVIDER_ID="password";Qn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Qn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class la{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Gr extends la{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Pt extends Gr{constructor(){super("facebook.com")}static credential(e){return dn._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Pt.PROVIDER_ID="facebook.com";/**
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
 */class ut extends Gr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return dn._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ut.credential(t,r)}catch{return null}}}ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";/**
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
 */class Ct extends Gr{constructor(){super("github.com")}static credential(e){return dn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ct.credential(e.oauthAccessToken)}catch{return null}}}Ct.GITHUB_SIGN_IN_METHOD="github.com";Ct.PROVIDER_ID="github.com";/**
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
 */class kt extends Gr{constructor(){super("twitter.com")}static credential(e,t){return dn._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return kt.credential(t,r)}catch{return null}}}kt.TWITTER_SIGN_IN_METHOD="twitter.com";kt.PROVIDER_ID="twitter.com";/**
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
 */async function Uy(n,e){return Hr(n,"POST","/v1/accounts:signUp",Wt(n,e))}/**
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
 */class fn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await Ke._fromIdTokenResponse(e,r,i),a=kl(r);return new fn({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=kl(r);return new fn({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function kl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class qi extends Ge{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,qi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new qi(e,t,r,i)}}function jh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?qi._fromErrorAndOperation(n,s,e,r):s})}async function Fy(n,e,t=!1){const r=await Vr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return fn._forOperation(n,"link",r)}/**
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
 */async function $y(n,e,t=!1){const{auth:r}=n;if(Oe(r.app))return Promise.reject(ft(r));const i="reauthenticate";try{const s=await Vr(n,jh(r,i,e,n),t);M(s.idToken,r,"internal-error");const a=sa(s.idToken);M(a,r,"internal-error");const{sub:c}=a;return M(n.uid===c,r,"user-mismatch"),fn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&He(r,"user-mismatch"),s}}/**
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
 */async function Wh(n,e,t=!1){if(Oe(n.app))return Promise.reject(ft(n));const r="signIn",i=await jh(n,r,e),s=await fn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function qy(n,e){return Wh(Gt(n),e)}/**
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
 */async function Hh(n){const e=Gt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function By(n,e,t){if(Oe(n.app))return Promise.reject(ft(n));const r=Gt(n),a=await Do(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Uy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Hh(n),u}),c=await fn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(c.user),c}function zy(n,e,t){return Oe(n.app)?Promise.reject(ft(n)):qy(se(n),Qn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Hh(n),r})}function jy(n,e,t,r){return se(n).onIdTokenChanged(e,t,r)}function Wy(n,e,t){return se(n).beforeAuthStateChanged(e,t)}function Hy(n,e,t,r){return se(n).onAuthStateChanged(e,t,r)}function Gy(n){return se(n).signOut()}const Bi="__sak";/**
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
 */class Gh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Bi,"1"),this.storage.removeItem(Bi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Ky=1e3,Qy=10;class Kh extends Gh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fh(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);dy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Qy):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ky)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kh.type="LOCAL";const Yy=Kh;/**
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
 */class Qh extends Gh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Qh.type="SESSION";const Yh=Qh;/**
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
 */function Jy(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new ls(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),u=await Jy(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ls.receivers=[];/**
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
 */function ua(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Xy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const d=ua("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(y){const E=y;if(E.data.eventId===d)switch(E.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(E.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function it(){return window}function Zy(n){it().location.href=n}/**
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
 */function Jh(){return typeof it().WorkerGlobalScope<"u"&&typeof it().importScripts=="function"}async function e_(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function t_(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function n_(){return Jh()?self:null}/**
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
 */const Xh="firebaseLocalStorageDb",r_=1,zi="firebaseLocalStorage",Zh="fbase_key";class Kr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function us(n,e){return n.transaction([zi],e?"readwrite":"readonly").objectStore(zi)}function i_(){const n=indexedDB.deleteDatabase(Xh);return new Kr(n).toPromise()}function No(){const n=indexedDB.open(Xh,r_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(zi,{keyPath:Zh})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(zi)?e(r):(r.close(),await i_(),e(await No()))})})}async function xl(n,e,t){const r=us(n,!0).put({[Zh]:e,value:t});return new Kr(r).toPromise()}async function s_(n,e){const t=us(n,!1).get(e),r=await new Kr(t).toPromise();return r===void 0?null:r.value}function Dl(n,e){const t=us(n,!0).delete(e);return new Kr(t).toPromise()}const o_=800,a_=3;class ed{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await No(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>a_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Jh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ls._getInstance(n_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await e_(),!this.activeServiceWorker)return;this.sender=new Xy(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||t_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await No();return await xl(e,Bi,"1"),await Dl(e,Bi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>xl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>s_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Dl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=us(i,!1).getAll();return new Kr(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),o_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ed.type="LOCAL";const c_=ed;new Wr(3e4,6e4);/**
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
 */function td(n,e){return e?dt(e):(M(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class ha extends aa{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Un(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Un(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Un(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function l_(n){return Wh(n.auth,new ha(n),n.bypassAuthState)}function u_(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),$y(t,new ha(n),n.bypassAuthState)}async function h_(n){const{auth:e,user:t}=n;return M(t,e,"internal-error"),Fy(t,new ha(n),n.bypassAuthState)}/**
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
 */class nd{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return l_;case"linkViaPopup":case"linkViaRedirect":return h_;case"reauthViaPopup":case"reauthViaRedirect":return u_;default:He(this.auth,"internal-error")}}resolve(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){_t(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const d_=new Wr(2e3,1e4);async function f_(n,e,t){if(Oe(n.app))return Promise.reject(Qe(n,"operation-not-supported-in-this-environment"));const r=Gt(n);Hg(n,e,la);const i=td(r,t);return new an(r,"signInViaPopup",e,i).executeNotNull()}class an extends nd{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return M(e,this.auth,"internal-error"),e}async onExecution(){_t(this.filter.length===1,"Popup operations only handle one event");const e=ua();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,d_.get())};e()}}an.currentPopupAction=null;/**
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
 */const p_="pendingRedirect",Pi=new Map;class m_ extends nd{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Pi.get(this.auth._key());if(!e){try{const r=await g_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Pi.set(this.auth._key(),e)}return this.bypassAuthState||Pi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function g_(n,e){const t=v_(e),r=__(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function y_(n,e){Pi.set(n._key(),e)}function __(n){return dt(n._redirectPersistence)}function v_(n){return Si(p_,n.config.apiKey,n.name)}async function w_(n,e,t=!1){if(Oe(n.app))return Promise.reject(ft(n));const r=Gt(n),i=td(r,e),a=await new m_(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const b_=600*1e3;class E_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!T_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!rd(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Qe(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=b_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Nl(e))}saveEventToCache(e){this.cachedEventUids.add(Nl(e)),this.lastProcessedEventTime=Date.now()}}function Nl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function rd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function T_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rd(n);default:return!1}}/**
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
 */async function I_(n,e={}){return Ht(n,"GET","/v1/projects",e)}/**
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
 */const A_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,R_=/^https?/;async function S_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await I_(n);for(const t of e)try{if(P_(t))return}catch{}He(n,"unauthorized-domain")}function P_(n){const e=ko(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!R_.test(t))return!1;if(A_.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const C_=new Wr(3e4,6e4);function Vl(){const n=it().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function k_(n){return new Promise((e,t)=>{var i,s,a;function r(){Vl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Vl(),t(Qe(n,"network-request-failed"))},timeout:C_.get()})}if((s=(i=it().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=it().gapi)!=null&&a.load)r();else{const c=by("iframefcb");return it()[c]=()=>{gapi.load?r():t(Qe(n,"network-request-failed"))},qh(`${wy()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Ci=null,e})}let Ci=null;function x_(n){return Ci=Ci||k_(n),Ci}/**
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
 */const D_=new Wr(5e3,15e3),N_="__/auth/iframe",V_="emulator/auth/iframe",O_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},L_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function M_(n){const e=n.config;M(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ia(e,V_):`https://${n.config.authDomain}/${N_}`,r={apiKey:e.apiKey,appName:n.name,v:Tn},i=L_.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${jr(r).slice(1)}`}async function U_(n){const e=await x_(n),t=it().gapi;return M(t,n,"internal-error"),e.open({where:document.body,url:M_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:O_,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Qe(n,"network-request-failed"),c=it().setTimeout(()=>{s(a)},D_.get());function u(){it().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(a)})}))}/**
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
 */const F_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$_=500,q_=600,B_="_blank",z_="http://localhost";class Ol{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function j_(n,e,t,r=$_,i=q_){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...F_,width:r.toString(),height:i.toString(),top:s,left:a},d=Se().toLowerCase();t&&(c=Vh(d)?B_:t),Dh(d)&&(e=e||z_,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[R,k])=>`${E}${R}=${k},`,"");if(hy(d)&&c!=="_self")return W_(e||"",c),new Ol(null);const y=window.open(e||"",c,f);M(y,n,"popup-blocked");try{y.focus()}catch{}return new Ol(y)}function W_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const H_="__/auth/handler",G_="emulator/auth/handler",K_=encodeURIComponent("fac");async function Ll(n,e,t,r,i,s){M(n.config.authDomain,n,"auth-domain-config-required"),M(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Tn,eventId:i};if(e instanceof la){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Sm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,y]of Object.entries({}))a[f]=y}if(e instanceof Gr){const f=e.getScopes().filter(y=>y!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),d=u?`#${K_}=${encodeURIComponent(u)}`:"";return`${Q_(n)}?${jr(c).slice(1)}${d}`}function Q_({config:n}){return n.emulator?ia(n,G_):`https://${n.authDomain}/${H_}`}/**
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
 */const fo="webStorageSupport";class Y_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yh,this._completeRedirectFn=w_,this._overrideRedirectResult=y_}async _openPopup(e,t,r,i){var a;_t((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await Ll(e,t,r,ko(),i);return j_(e,s,ua())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Ll(e,t,r,ko(),i);return Zy(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(_t(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await U_(e),r=new E_(e);return t.register("authEvent",i=>(M(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(fo,{type:fo},i=>{var a;const s=(a=i==null?void 0:i[0])==null?void 0:a[fo];s!==void 0&&t(!!s),He(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=S_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fh()||Nh()||oa()}}const J_=Y_;var Ml="@firebase/auth",Ul="1.12.2";/**
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
 */class X_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){M(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Z_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ev(n){Je(new We("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;M(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$h(n)},d=new yy(r,i,s,u);return Sy(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Je(new We("auth-internal",e=>{const t=Gt(e.getProvider("auth").getImmediate());return(r=>new X_(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Me(Ml,Ul,Z_(n)),Me(Ml,Ul,"esm2020")}/**
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
 */const tv=300,nv=ph("authIdTokenMaxAge")||tv;let Fl=null;const rv=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>nv)return;const i=t==null?void 0:t.token;Fl!==i&&(Fl=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function iv(n=as()){const e=jt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ry(n,{popupRedirectResolver:J_,persistence:[c_,Yy,Yh]}),r=ph("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=rv(s.toString());Wy(t,a,()=>a(t.currentUser)),jy(t,c=>a(c))}}const i=hh("auth");return i&&Py(t,`http://${i}`),t}function sv(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}_y({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Qe("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",sv().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ev("Browser");var $l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ot,id;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,g){function v(){}v.prototype=g.prototype,b.F=g.prototype,b.prototype=new v,b.prototype.constructor=b,b.D=function(T,w,A){for(var _=Array(arguments.length-2),De=2;De<arguments.length;De++)_[De-2]=arguments[De];return g.prototype[w].apply(T,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(b,g,v){v||(v=0);const T=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)T[w]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(w=0;w<16;++w)T[w]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=b.g[0],v=b.g[1],w=b.g[2];let A=b.g[3],_;_=g+(A^v&(w^A))+T[0]+3614090360&4294967295,g=v+(_<<7&4294967295|_>>>25),_=A+(w^g&(v^w))+T[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(v^A&(g^v))+T[2]+606105819&4294967295,w=A+(_<<17&4294967295|_>>>15),_=v+(g^w&(A^g))+T[3]+3250441966&4294967295,v=w+(_<<22&4294967295|_>>>10),_=g+(A^v&(w^A))+T[4]+4118548399&4294967295,g=v+(_<<7&4294967295|_>>>25),_=A+(w^g&(v^w))+T[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(v^A&(g^v))+T[6]+2821735955&4294967295,w=A+(_<<17&4294967295|_>>>15),_=v+(g^w&(A^g))+T[7]+4249261313&4294967295,v=w+(_<<22&4294967295|_>>>10),_=g+(A^v&(w^A))+T[8]+1770035416&4294967295,g=v+(_<<7&4294967295|_>>>25),_=A+(w^g&(v^w))+T[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(v^A&(g^v))+T[10]+4294925233&4294967295,w=A+(_<<17&4294967295|_>>>15),_=v+(g^w&(A^g))+T[11]+2304563134&4294967295,v=w+(_<<22&4294967295|_>>>10),_=g+(A^v&(w^A))+T[12]+1804603682&4294967295,g=v+(_<<7&4294967295|_>>>25),_=A+(w^g&(v^w))+T[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=w+(v^A&(g^v))+T[14]+2792965006&4294967295,w=A+(_<<17&4294967295|_>>>15),_=v+(g^w&(A^g))+T[15]+1236535329&4294967295,v=w+(_<<22&4294967295|_>>>10),_=g+(w^A&(v^w))+T[1]+4129170786&4294967295,g=v+(_<<5&4294967295|_>>>27),_=A+(v^w&(g^v))+T[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^v&(A^g))+T[11]+643717713&4294967295,w=A+(_<<14&4294967295|_>>>18),_=v+(A^g&(w^A))+T[0]+3921069994&4294967295,v=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(v^w))+T[5]+3593408605&4294967295,g=v+(_<<5&4294967295|_>>>27),_=A+(v^w&(g^v))+T[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^v&(A^g))+T[15]+3634488961&4294967295,w=A+(_<<14&4294967295|_>>>18),_=v+(A^g&(w^A))+T[4]+3889429448&4294967295,v=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(v^w))+T[9]+568446438&4294967295,g=v+(_<<5&4294967295|_>>>27),_=A+(v^w&(g^v))+T[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^v&(A^g))+T[3]+4107603335&4294967295,w=A+(_<<14&4294967295|_>>>18),_=v+(A^g&(w^A))+T[8]+1163531501&4294967295,v=w+(_<<20&4294967295|_>>>12),_=g+(w^A&(v^w))+T[13]+2850285829&4294967295,g=v+(_<<5&4294967295|_>>>27),_=A+(v^w&(g^v))+T[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=w+(g^v&(A^g))+T[7]+1735328473&4294967295,w=A+(_<<14&4294967295|_>>>18),_=v+(A^g&(w^A))+T[12]+2368359562&4294967295,v=w+(_<<20&4294967295|_>>>12),_=g+(v^w^A)+T[5]+4294588738&4294967295,g=v+(_<<4&4294967295|_>>>28),_=A+(g^v^w)+T[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^v)+T[11]+1839030562&4294967295,w=A+(_<<16&4294967295|_>>>16),_=v+(w^A^g)+T[14]+4259657740&4294967295,v=w+(_<<23&4294967295|_>>>9),_=g+(v^w^A)+T[1]+2763975236&4294967295,g=v+(_<<4&4294967295|_>>>28),_=A+(g^v^w)+T[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^v)+T[7]+4139469664&4294967295,w=A+(_<<16&4294967295|_>>>16),_=v+(w^A^g)+T[10]+3200236656&4294967295,v=w+(_<<23&4294967295|_>>>9),_=g+(v^w^A)+T[13]+681279174&4294967295,g=v+(_<<4&4294967295|_>>>28),_=A+(g^v^w)+T[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^v)+T[3]+3572445317&4294967295,w=A+(_<<16&4294967295|_>>>16),_=v+(w^A^g)+T[6]+76029189&4294967295,v=w+(_<<23&4294967295|_>>>9),_=g+(v^w^A)+T[9]+3654602809&4294967295,g=v+(_<<4&4294967295|_>>>28),_=A+(g^v^w)+T[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=w+(A^g^v)+T[15]+530742520&4294967295,w=A+(_<<16&4294967295|_>>>16),_=v+(w^A^g)+T[2]+3299628645&4294967295,v=w+(_<<23&4294967295|_>>>9),_=g+(w^(v|~A))+T[0]+4096336452&4294967295,g=v+(_<<6&4294967295|_>>>26),_=A+(v^(g|~w))+T[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~v))+T[14]+2878612391&4294967295,w=A+(_<<15&4294967295|_>>>17),_=v+(A^(w|~g))+T[5]+4237533241&4294967295,v=w+(_<<21&4294967295|_>>>11),_=g+(w^(v|~A))+T[12]+1700485571&4294967295,g=v+(_<<6&4294967295|_>>>26),_=A+(v^(g|~w))+T[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~v))+T[10]+4293915773&4294967295,w=A+(_<<15&4294967295|_>>>17),_=v+(A^(w|~g))+T[1]+2240044497&4294967295,v=w+(_<<21&4294967295|_>>>11),_=g+(w^(v|~A))+T[8]+1873313359&4294967295,g=v+(_<<6&4294967295|_>>>26),_=A+(v^(g|~w))+T[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~v))+T[6]+2734768916&4294967295,w=A+(_<<15&4294967295|_>>>17),_=v+(A^(w|~g))+T[13]+1309151649&4294967295,v=w+(_<<21&4294967295|_>>>11),_=g+(w^(v|~A))+T[4]+4149444226&4294967295,g=v+(_<<6&4294967295|_>>>26),_=A+(v^(g|~w))+T[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=w+(g^(A|~v))+T[2]+718787259&4294967295,w=A+(_<<15&4294967295|_>>>17),_=v+(A^(w|~g))+T[9]+3951481745&4294967295,b.g[0]=b.g[0]+g&4294967295,b.g[1]=b.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,b.g[2]=b.g[2]+w&4294967295,b.g[3]=b.g[3]+A&4294967295}r.prototype.v=function(b,g){g===void 0&&(g=b.length);const v=g-this.blockSize,T=this.C;let w=this.h,A=0;for(;A<g;){if(w==0)for(;A<=v;)i(this,b,A),A+=this.blockSize;if(typeof b=="string"){for(;A<g;)if(T[w++]=b.charCodeAt(A++),w==this.blockSize){i(this,T),w=0;break}}else for(;A<g;)if(T[w++]=b[A++],w==this.blockSize){i(this,T),w=0;break}}this.h=w,this.o+=g},r.prototype.A=function(){var b=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);b[0]=128;for(var g=1;g<b.length-8;++g)b[g]=0;g=this.o*8;for(var v=b.length-8;v<b.length;++v)b[v]=g&255,g/=256;for(this.v(b),b=Array(16),g=0,v=0;v<4;++v)for(let T=0;T<32;T+=8)b[g++]=this.g[v]>>>T&255;return b};function s(b,g){var v=c;return Object.prototype.hasOwnProperty.call(v,b)?v[b]:v[b]=g(b)}function a(b,g){this.h=g;const v=[];let T=!0;for(let w=b.length-1;w>=0;w--){const A=b[w]|0;T&&A==g||(v[w]=A,T=!1)}this.g=v}var c={};function u(b){return-128<=b&&b<128?s(b,function(g){return new a([g|0],g<0?-1:0)}):new a([b|0],b<0?-1:0)}function d(b){if(isNaN(b)||!isFinite(b))return y;if(b<0)return x(d(-b));const g=[];let v=1;for(let T=0;b>=v;T++)g[T]=b/v|0,v*=4294967296;return new a(g,0)}function f(b,g){if(b.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(b.charAt(0)=="-")return x(f(b.substring(1),g));if(b.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=d(Math.pow(g,8));let T=y;for(let A=0;A<b.length;A+=8){var w=Math.min(8,b.length-A);const _=parseInt(b.substring(A,A+w),g);w<8?(w=d(Math.pow(g,w)),T=T.j(w).add(d(_))):(T=T.j(v),T=T.add(d(_)))}return T}var y=u(0),E=u(1),R=u(16777216);n=a.prototype,n.m=function(){if(D(this))return-x(this).m();let b=0,g=1;for(let v=0;v<this.g.length;v++){const T=this.i(v);b+=(T>=0?T:4294967296+T)*g,g*=4294967296}return b},n.toString=function(b){if(b=b||10,b<2||36<b)throw Error("radix out of range: "+b);if(k(this))return"0";if(D(this))return"-"+x(this).toString(b);const g=d(Math.pow(b,6));var v=this;let T="";for(;;){const w=Y(v,g).g;v=B(v,w.j(g));let A=((v.g.length>0?v.g[0]:v.h)>>>0).toString(b);if(v=w,k(v))return A+T;for(;A.length<6;)A="0"+A;T=A+T}},n.i=function(b){return b<0?0:b<this.g.length?this.g[b]:this.h};function k(b){if(b.h!=0)return!1;for(let g=0;g<b.g.length;g++)if(b.g[g]!=0)return!1;return!0}function D(b){return b.h==-1}n.l=function(b){return b=B(this,b),D(b)?-1:k(b)?0:1};function x(b){const g=b.g.length,v=[];for(let T=0;T<g;T++)v[T]=~b.g[T];return new a(v,~b.h).add(E)}n.abs=function(){return D(this)?x(this):this},n.add=function(b){const g=Math.max(this.g.length,b.g.length),v=[];let T=0;for(let w=0;w<=g;w++){let A=T+(this.i(w)&65535)+(b.i(w)&65535),_=(A>>>16)+(this.i(w)>>>16)+(b.i(w)>>>16);T=_>>>16,A&=65535,_&=65535,v[w]=_<<16|A}return new a(v,v[v.length-1]&-2147483648?-1:0)};function B(b,g){return b.add(x(g))}n.j=function(b){if(k(this)||k(b))return y;if(D(this))return D(b)?x(this).j(x(b)):x(x(this).j(b));if(D(b))return x(this.j(x(b)));if(this.l(R)<0&&b.l(R)<0)return d(this.m()*b.m());const g=this.g.length+b.g.length,v=[];for(var T=0;T<2*g;T++)v[T]=0;for(T=0;T<this.g.length;T++)for(let w=0;w<b.g.length;w++){const A=this.i(T)>>>16,_=this.i(T)&65535,De=b.i(w)>>>16,Xt=b.i(w)&65535;v[2*T+2*w]+=_*Xt,F(v,2*T+2*w),v[2*T+2*w+1]+=A*Xt,F(v,2*T+2*w+1),v[2*T+2*w+1]+=_*De,F(v,2*T+2*w+1),v[2*T+2*w+2]+=A*De,F(v,2*T+2*w+2)}for(b=0;b<g;b++)v[b]=v[2*b+1]<<16|v[2*b];for(b=g;b<2*g;b++)v[b]=0;return new a(v,0)};function F(b,g){for(;(b[g]&65535)!=b[g];)b[g+1]+=b[g]>>>16,b[g]&=65535,g++}function z(b,g){this.g=b,this.h=g}function Y(b,g){if(k(g))throw Error("division by zero");if(k(b))return new z(y,y);if(D(b))return g=Y(x(b),g),new z(x(g.g),x(g.h));if(D(g))return g=Y(b,x(g)),new z(x(g.g),g.h);if(b.g.length>30){if(D(b)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var v=E,T=g;T.l(b)<=0;)v=Z(v),T=Z(T);var w=ee(v,1),A=ee(T,1);for(T=ee(T,2),v=ee(v,2);!k(T);){var _=A.add(T);_.l(b)<=0&&(w=w.add(v),A=_),T=ee(T,1),v=ee(v,1)}return g=B(b,w.j(g)),new z(w,g)}for(w=y;b.l(g)>=0;){for(v=Math.max(1,Math.floor(b.m()/g.m())),T=Math.ceil(Math.log(v)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),A=d(v),_=A.j(g);D(_)||_.l(b)>0;)v-=T,A=d(v),_=A.j(g);k(A)&&(A=E),w=w.add(A),b=B(b,_)}return new z(w,b)}n.B=function(b){return Y(this,b).h},n.and=function(b){const g=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<g;T++)v[T]=this.i(T)&b.i(T);return new a(v,this.h&b.h)},n.or=function(b){const g=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<g;T++)v[T]=this.i(T)|b.i(T);return new a(v,this.h|b.h)},n.xor=function(b){const g=Math.max(this.g.length,b.g.length),v=[];for(let T=0;T<g;T++)v[T]=this.i(T)^b.i(T);return new a(v,this.h^b.h)};function Z(b){const g=b.g.length+1,v=[];for(let T=0;T<g;T++)v[T]=b.i(T)<<1|b.i(T-1)>>>31;return new a(v,b.h)}function ee(b,g){const v=g>>5;g%=32;const T=b.g.length-v,w=[];for(let A=0;A<T;A++)w[A]=g>0?b.i(A+v)>>>g|b.i(A+v+1)<<32-g:b.i(A+v);return new a(w,b.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,id=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Ot=a}).apply(typeof $l<"u"?$l:typeof self<"u"?self:typeof window<"u"?window:{});var vi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sd,Er,od,ki,Vo,ad,cd,ld;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof vi=="object"&&vi];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,l){if(l)e:{var h=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var I=o[p];if(!(I in h))break e;h=h[I]}o=o[o.length-1],p=h[o],l=l(p),l!=p&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}i("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(o){return o||function(l){var h=[],p;for(p in l)Object.prototype.hasOwnProperty.call(l,p)&&h.push([p,l[p]]);return h}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},a=this||self;function c(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function u(o,l,h){return o.call.apply(o.bind,arguments)}function d(o,l,h){return d=u,d.apply(null,arguments)}function f(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function y(o,l){function h(){}h.prototype=l.prototype,o.Z=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Ob=function(p,I,S){for(var N=Array(arguments.length-2),j=2;j<arguments.length;j++)N[j-2]=arguments[j];return l.prototype[I].apply(p,N)}}var E=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function R(o){const l=o.length;if(l>0){const h=Array(l);for(let p=0;p<l;p++)h[p]=o[p];return h}return[]}function k(o,l){for(let p=1;p<arguments.length;p++){const I=arguments[p];var h=typeof I;if(h=h!="object"?h:I?Array.isArray(I)?"array":h:"null",h=="array"||h=="object"&&typeof I.length=="number"){h=o.length||0;const S=I.length||0;o.length=h+S;for(let N=0;N<S;N++)o[h+N]=I[N]}else o.push(I)}}class D{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function x(o){a.setTimeout(()=>{throw o},0)}function B(){var o=b;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class F{constructor(){this.h=this.g=null}add(l,h){const p=z.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var z=new D(()=>new Y,o=>o.reset());class Y{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Z,ee=!1,b=new F,g=()=>{const o=Promise.resolve(void 0);Z=()=>{o.then(v)}};function v(){for(var o;o=B();){try{o.h.call(o.g)}catch(h){x(h)}var l=z;l.j(o),l.h<100&&(l.h++,o.next=l.g,l.g=o)}ee=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var A=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};a.addEventListener("test",h,l),a.removeEventListener("test",h,l)}catch{}return o})();function _(o){return/^[\s\xa0]*$/.test(o)}function De(o,l){w.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,l)}y(De,w),De.prototype.init=function(o,l){const h=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget,l||(h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement)),this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&De.Z.h.call(this)},De.prototype.h=function(){De.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Xt="closure_listenable_"+(Math.random()*1e6|0),kp=0;function xp(o,l,h,p,I){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=I,this.key=++kp,this.da=this.fa=!1}function ri(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function ii(o,l,h){for(const p in o)l.call(h,o[p],p,o)}function Dp(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function lc(o){const l={};for(const h in o)l[h]=o[h];return l}const uc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function hc(o,l){let h,p;for(let I=1;I<arguments.length;I++){p=arguments[I];for(h in p)o[h]=p[h];for(let S=0;S<uc.length;S++)h=uc[S],Object.prototype.hasOwnProperty.call(p,h)&&(o[h]=p[h])}}function si(o){this.src=o,this.g={},this.h=0}si.prototype.add=function(o,l,h,p,I){const S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);const N=Ms(o,l,p,I);return N>-1?(l=o[N],h||(l.fa=!1)):(l=new xp(l,this.src,S,!!p,I),l.fa=h,o.push(l)),l};function Ls(o,l){const h=l.type;if(h in o.g){var p=o.g[h],I=Array.prototype.indexOf.call(p,l,void 0),S;(S=I>=0)&&Array.prototype.splice.call(p,I,1),S&&(ri(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ms(o,l,h,p){for(let I=0;I<o.length;++I){const S=o[I];if(!S.da&&S.listener==l&&S.capture==!!h&&S.ha==p)return I}return-1}var Us="closure_lm_"+(Math.random()*1e6|0),Fs={};function dc(o,l,h,p,I){if(Array.isArray(l)){for(let S=0;S<l.length;S++)dc(o,l[S],h,p,I);return null}return h=mc(h),o&&o[Xt]?o.J(l,h,c(p)?!!p.capture:!1,I):Np(o,l,h,!1,p,I)}function Np(o,l,h,p,I,S){if(!l)throw Error("Invalid event type");const N=c(I)?!!I.capture:!!I;let j=qs(o);if(j||(o[Us]=j=new si(o)),h=j.add(l,h,p,N,S),h.proxy)return h;if(p=Vp(),h.proxy=p,p.src=o,p.listener=h,o.addEventListener)A||(I=N),I===void 0&&(I=!1),o.addEventListener(l.toString(),p,I);else if(o.attachEvent)o.attachEvent(pc(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Vp(){function o(h){return l.call(o.src,o.listener,h)}const l=Op;return o}function fc(o,l,h,p,I){if(Array.isArray(l))for(var S=0;S<l.length;S++)fc(o,l[S],h,p,I);else p=c(p)?!!p.capture:!!p,h=mc(h),o&&o[Xt]?(o=o.i,S=String(l).toString(),S in o.g&&(l=o.g[S],h=Ms(l,h,p,I),h>-1&&(ri(l[h]),Array.prototype.splice.call(l,h,1),l.length==0&&(delete o.g[S],o.h--)))):o&&(o=qs(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Ms(l,h,p,I)),(h=o>-1?l[o]:null)&&$s(h))}function $s(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Xt])Ls(l.i,o);else{var h=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(h,p,o.capture):l.detachEvent?l.detachEvent(pc(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=qs(l))?(Ls(h,o),h.h==0&&(h.src=null,l[Us]=null)):ri(o)}}}function pc(o){return o in Fs?Fs[o]:Fs[o]="on"+o}function Op(o,l){if(o.da)o=!0;else{l=new De(l,this);const h=o.listener,p=o.ha||o.src;o.fa&&$s(o),o=h.call(p,l)}return o}function qs(o){return o=o[Us],o instanceof si?o:null}var Bs="__closure_events_fn_"+(Math.random()*1e9>>>0);function mc(o){return typeof o=="function"?o:(o[Bs]||(o[Bs]=function(l){return o.handleEvent(l)}),o[Bs])}function Te(){T.call(this),this.i=new si(this),this.M=this,this.G=null}y(Te,T),Te.prototype[Xt]=!0,Te.prototype.removeEventListener=function(o,l,h,p){fc(this,o,l,h,p)};function Pe(o,l){var h,p=o.G;if(p)for(h=[];p;p=p.G)h.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new w(l,o);else if(l instanceof w)l.target=l.target||o;else{var I=l;l=new w(p,o),hc(l,I)}I=!0;let S,N;if(h)for(N=h.length-1;N>=0;N--)S=l.g=h[N],I=oi(S,p,!0,l)&&I;if(S=l.g=o,I=oi(S,p,!0,l)&&I,I=oi(S,p,!1,l)&&I,h)for(N=0;N<h.length;N++)S=l.g=h[N],I=oi(S,p,!1,l)&&I}Te.prototype.N=function(){if(Te.Z.N.call(this),this.i){var o=this.i;for(const l in o.g){const h=o.g[l];for(let p=0;p<h.length;p++)ri(h[p]);delete o.g[l],o.h--}}this.G=null},Te.prototype.J=function(o,l,h,p){return this.i.add(String(o),l,!1,h,p)},Te.prototype.K=function(o,l,h,p){return this.i.add(String(o),l,!0,h,p)};function oi(o,l,h,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();let I=!0;for(let S=0;S<l.length;++S){const N=l[S];if(N&&!N.da&&N.capture==h){const j=N.listener,me=N.ha||N.src;N.fa&&Ls(o.i,N),I=j.call(me,p)!==!1&&I}}return I&&!p.defaultPrevented}function Lp(o,l){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:a.setTimeout(o,l||0)}function gc(o){o.g=Lp(()=>{o.g=null,o.i&&(o.i=!1,gc(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Mp extends T{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:gc(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nr(o){T.call(this),this.h=o,this.g={}}y(nr,T);var yc=[];function _c(o){ii(o.g,function(l,h){this.g.hasOwnProperty(h)&&$s(l)},o),o.g={}}nr.prototype.N=function(){nr.Z.N.call(this),_c(this)},nr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zs=a.JSON.stringify,Up=a.JSON.parse,Fp=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function vc(){}function wc(){}var rr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function js(){w.call(this,"d")}y(js,w);function Ws(){w.call(this,"c")}y(Ws,w);var Zt={},bc=null;function ai(){return bc=bc||new Te}Zt.Ia="serverreachability";function Ec(o){w.call(this,Zt.Ia,o)}y(Ec,w);function ir(o){const l=ai();Pe(l,new Ec(l))}Zt.STAT_EVENT="statevent";function Tc(o,l){w.call(this,Zt.STAT_EVENT,o),this.stat=l}y(Tc,w);function Ce(o){const l=ai();Pe(l,new Tc(l,o))}Zt.Ja="timingevent";function Ic(o,l){w.call(this,Zt.Ja,o),this.size=l}y(Ic,w);function sr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},l)}function or(){this.g=!0}or.prototype.ua=function(){this.g=!1};function $p(o,l,h,p,I,S){o.info(function(){if(o.g)if(S){var N="",j=S.split("&");for(let te=0;te<j.length;te++){var me=j[te].split("=");if(me.length>1){const _e=me[0];me=me[1];const tt=_e.split("_");N=tt.length>=2&&tt[1]=="type"?N+(_e+"="+me+"&"):N+(_e+"=redacted&")}}}else N=null;else N=S;return"XMLHTTP REQ ("+p+") [attempt "+I+"]: "+l+`
`+h+`
`+N})}function qp(o,l,h,p,I,S,N){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+I+"]: "+l+`
`+h+`
`+S+" "+N})}function Sn(o,l,h,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+zp(o,h)+(p?" "+p:"")})}function Bp(o,l){o.info(function(){return"TIMEOUT: "+l})}or.prototype.info=function(){};function zp(o,l){if(!o.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(o=0;o<S.length;o++)if(Array.isArray(S[o])){var h=S[o];if(!(h.length<2)){var p=h[1];if(Array.isArray(p)&&!(p.length<1)){var I=p[0];if(I!="noop"&&I!="stop"&&I!="close")for(let N=1;N<p.length;N++)p[N]=""}}}}return zs(S)}catch{return l}}var ci={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ac={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Rc;function Hs(){}y(Hs,vc),Hs.prototype.g=function(){return new XMLHttpRequest},Rc=new Hs;function ar(o){return encodeURIComponent(String(o))}function jp(o){var l=1;o=o.split(":");const h=[];for(;l>0&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function bt(o,l,h,p){this.j=o,this.i=l,this.l=h,this.S=p||1,this.V=new nr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Sc}function Sc(){this.i=null,this.g="",this.h=!1}var Pc={},Gs={};function Ks(o,l,h){o.M=1,o.A=ui(et(l)),o.u=h,o.R=!0,Cc(o,null)}function Cc(o,l){o.F=Date.now(),li(o),o.B=et(o.A);var h=o.B,p=o.S;Array.isArray(p)||(p=[String(p)]),Bc(h.i,"t",p),o.C=0,h=o.j.L,o.h=new Sc,o.g=ol(o.j,h?l:null,!o.u),o.P>0&&(o.O=new Mp(d(o.Y,o,o.g),o.P)),l=o.V,h=o.g,p=o.ba;var I="readystatechange";Array.isArray(I)||(I&&(yc[0]=I.toString()),I=yc);for(let S=0;S<I.length;S++){const N=dc(h,I[S],p||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=o.J?lc(o.J):{},o.u?(o.v||(o.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,l)):(o.v="GET",o.g.ea(o.B,o.v,null,l)),ir(),$p(o.i,o.v,o.B,o.l,o.S,o.u)}bt.prototype.ba=function(o){o=o.target;const l=this.O;l&&It(o)==3?l.j():this.Y(o)},bt.prototype.Y=function(o){try{if(o==this.g)e:{const j=It(this.g),me=this.g.ya(),te=this.g.ca();if(!(j<3)&&(j!=3||this.g&&(this.h.h||this.g.la()||Qc(this.g)))){this.K||j!=4||me==7||(me==8||te<=0?ir(3):ir(2)),Qs(this);var l=this.g.ca();this.X=l;var h=Wp(this);if(this.o=l==200,qp(this.i,this.v,this.B,this.l,this.S,j,l),this.o){if(this.U&&!this.L){t:{if(this.g){var p,I=this.g;if((p=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(p)){var S=p;break t}}S=null}if(o=S)Sn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ys(this,o);else{this.o=!1,this.m=3,Ce(12),en(this),cr(this);break e}}if(this.R){o=!0;let _e;for(;!this.K&&this.C<h.length;)if(_e=Hp(this,h),_e==Gs){j==4&&(this.m=4,Ce(14),o=!1),Sn(this.i,this.l,null,"[Incomplete Response]");break}else if(_e==Pc){this.m=4,Ce(15),Sn(this.i,this.l,h,"[Invalid Chunk]"),o=!1;break}else Sn(this.i,this.l,_e,null),Ys(this,_e);if(kc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),j!=4||h.length!=0||this.h.h||(this.m=1,Ce(16),o=!1),this.o=this.o&&o,!o)Sn(this.i,this.l,h,"[Invalid Chunked Response]"),en(this),cr(this);else if(h.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+h.length),io(N),N.P=!0,Ce(11))}}else Sn(this.i,this.l,h,null),Ys(this,h);j==4&&en(this),this.o&&!this.K&&(j==4?nl(this.j,this):(this.o=!1,li(this)))}else om(this.g),l==400&&h.indexOf("Unknown SID")>0?(this.m=3,Ce(12)):(this.m=0,Ce(13)),en(this),cr(this)}}}catch{}finally{}};function Wp(o){if(!kc(o))return o.g.la();const l=Qc(o.g);if(l==="")return"";let h="";const p=l.length,I=It(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return en(o),cr(o),"";o.h.i=new a.TextDecoder}for(let S=0;S<p;S++)o.h.h=!0,h+=o.h.i.decode(l[S],{stream:!(I&&S==p-1)});return l.length=0,o.h.g+=h,o.C=0,o.h.g}function kc(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Hp(o,l){var h=o.C,p=l.indexOf(`
`,h);return p==-1?Gs:(h=Number(l.substring(h,p)),isNaN(h)?Pc:(p+=1,p+h>l.length?Gs:(l=l.slice(p,p+h),o.C=p+h,l)))}bt.prototype.cancel=function(){this.K=!0,en(this)};function li(o){o.T=Date.now()+o.H,xc(o,o.H)}function xc(o,l){if(o.D!=null)throw Error("WatchDog timer not null");o.D=sr(d(o.aa,o),l)}function Qs(o){o.D&&(a.clearTimeout(o.D),o.D=null)}bt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Bp(this.i,this.B),this.M!=2&&(ir(),Ce(17)),en(this),this.m=2,cr(this)):xc(this,this.T-o)};function cr(o){o.j.I==0||o.K||nl(o.j,o)}function en(o){Qs(o);var l=o.O;l&&typeof l.dispose=="function"&&l.dispose(),o.O=null,_c(o.V),o.g&&(l=o.g,o.g=null,l.abort(),l.dispose())}function Ys(o,l){try{var h=o.j;if(h.I!=0&&(h.g==o||Js(h.h,o))){if(!o.L&&Js(h.h,o)&&h.I==3){try{var p=h.Ba.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var I=p;if(I[0]==0){e:if(!h.v){if(h.g)if(h.g.F+3e3<o.F)mi(h),fi(h);else break e;ro(h),Ce(18)}}else h.xa=I[1],0<h.xa-h.K&&I[2]<37500&&h.F&&h.A==0&&!h.C&&(h.C=sr(d(h.Va,h),6e3));Vc(h.h)<=1&&h.ta&&(h.ta=void 0)}else nn(h,11)}else if((o.L||h.g==o)&&mi(h),!_(l))for(I=h.Ba.g.parse(l),l=0;l<I.length;l++){let te=I[l];const _e=te[0];if(!(_e<=h.K))if(h.K=_e,te=te[1],h.I==2)if(te[0]=="c"){h.M=te[1],h.ba=te[2];const tt=te[3];tt!=null&&(h.ka=tt,h.j.info("VER="+h.ka));const rn=te[4];rn!=null&&(h.za=rn,h.j.info("SVER="+h.za));const At=te[5];At!=null&&typeof At=="number"&&At>0&&(p=1.5*At,h.O=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;const Rt=o.g;if(Rt){const yi=Rt.g?Rt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(yi){var S=p.h;S.g||yi.indexOf("spdy")==-1&&yi.indexOf("quic")==-1&&yi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Xs(S,S.h),S.h=null))}if(p.G){const so=Rt.g?Rt.g.getResponseHeader("X-HTTP-Session-Id"):null;so&&(p.wa=so,re(p.J,p.G,so))}}h.I=3,h.l&&h.l.ra(),h.aa&&(h.T=Date.now()-o.F,h.j.info("Handshake RTT: "+h.T+"ms")),p=h;var N=o;if(p.na=sl(p,p.L?p.ba:null,p.W),N.L){Oc(p.h,N);var j=N,me=p.O;me&&(j.H=me),j.D&&(Qs(j),li(j)),p.g=N}else el(p);h.i.length>0&&pi(h)}else te[0]!="stop"&&te[0]!="close"||nn(h,7);else h.I==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?nn(h,7):no(h):te[0]!="noop"&&h.l&&h.l.qa(te),h.A=0)}}ir(4)}catch{}}var Gp=class{constructor(o,l){this.g=o,this.map=l}};function Dc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Nc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Vc(o){return o.h?1:o.g?o.g.size:0}function Js(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Xs(o,l){o.g?o.g.add(l):o.h=l}function Oc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}Dc.prototype.cancel=function(){if(this.i=Lc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Lc(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.G);return l}return R(o.i)}var Mc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Kp(o,l){if(o){o=o.split("&");for(let h=0;h<o.length;h++){const p=o[h].indexOf("=");let I,S=null;p>=0?(I=o[h].substring(0,p),S=o[h].substring(p+1)):I=o[h],l(I,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Et(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;o instanceof Et?(this.l=o.l,lr(this,o.j),this.o=o.o,this.g=o.g,ur(this,o.u),this.h=o.h,Zs(this,zc(o.i)),this.m=o.m):o&&(l=String(o).match(Mc))?(this.l=!1,lr(this,l[1]||"",!0),this.o=hr(l[2]||""),this.g=hr(l[3]||"",!0),ur(this,l[4]),this.h=hr(l[5]||"",!0),Zs(this,l[6]||"",!0),this.m=hr(l[7]||"")):(this.l=!1,this.i=new fr(null,this.l))}Et.prototype.toString=function(){const o=[];var l=this.j;l&&o.push(dr(l,Uc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(dr(l,Uc,!0),"@"),o.push(ar(h).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.u,h!=null&&o.push(":",String(h))),(h=this.h)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(dr(h,h.charAt(0)=="/"?Jp:Yp,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",dr(h,Zp)),o.join("")},Et.prototype.resolve=function(o){const l=et(this);let h=!!o.j;h?lr(l,o.j):h=!!o.o,h?l.o=o.o:h=!!o.g,h?l.g=o.g:h=o.u!=null;var p=o.h;if(h)ur(l,o.u);else if(h=!!o.h){if(p.charAt(0)!="/")if(this.g&&!this.h)p="/"+p;else{var I=l.h.lastIndexOf("/");I!=-1&&(p=l.h.slice(0,I+1)+p)}if(I=p,I==".."||I==".")p="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){p=I.lastIndexOf("/",0)==0,I=I.split("/");const S=[];for(let N=0;N<I.length;){const j=I[N++];j=="."?p&&N==I.length&&S.push(""):j==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),p&&N==I.length&&S.push("")):(S.push(j),p=!0)}p=S.join("/")}else p=I}return h?l.h=p:h=o.i.toString()!=="",h?Zs(l,zc(o.i)):h=!!o.m,h&&(l.m=o.m),l};function et(o){return new Et(o)}function lr(o,l,h){o.j=h?hr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function ur(o,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);o.u=l}else o.u=null}function Zs(o,l,h){l instanceof fr?(o.i=l,em(o.i,o.l)):(h||(l=dr(l,Xp)),o.i=new fr(l,o.l))}function re(o,l,h){o.i.set(l,h)}function ui(o){return re(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function hr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function dr(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Qp),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Qp(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Uc=/[#\/\?@]/g,Yp=/[#\?:]/g,Jp=/[#\?]/g,Xp=/[#\?@]/g,Zp=/#/g;function fr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function tn(o){o.g||(o.g=new Map,o.h=0,o.i&&Kp(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}n=fr.prototype,n.add=function(o,l){tn(this),this.i=null,o=Pn(this,o);let h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function Fc(o,l){tn(o),l=Pn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function $c(o,l){return tn(o),l=Pn(o,l),o.g.has(l)}n.forEach=function(o,l){tn(this),this.g.forEach(function(h,p){h.forEach(function(I){o.call(l,I,p,this)},this)},this)};function qc(o,l){tn(o);let h=[];if(typeof l=="string")$c(o,l)&&(h=h.concat(o.g.get(Pn(o,l))));else for(o=Array.from(o.g.values()),l=0;l<o.length;l++)h=h.concat(o[l]);return h}n.set=function(o,l){return tn(this),this.i=null,o=Pn(this,o),$c(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},n.get=function(o,l){return o?(o=qc(this,o),o.length>0?String(o[0]):l):l};function Bc(o,l,h){Fc(o,l),h.length>0&&(o.i=null,o.g.set(Pn(o,l),R(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(let p=0;p<l.length;p++){var h=l[p];const I=ar(h);h=qc(this,h);for(let S=0;S<h.length;S++){let N=I;h[S]!==""&&(N+="="+ar(h[S])),o.push(N)}}return this.i=o.join("&")};function zc(o){const l=new fr;return l.i=o.i,o.g&&(l.g=new Map(o.g),l.h=o.h),l}function Pn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function em(o,l){l&&!o.j&&(tn(o),o.i=null,o.g.forEach(function(h,p){const I=p.toLowerCase();p!=I&&(Fc(this,p),Bc(this,I,h))},o)),o.j=l}function tm(o,l){const h=new or;if(a.Image){const p=new Image;p.onload=f(Tt,h,"TestLoadImage: loaded",!0,l,p),p.onerror=f(Tt,h,"TestLoadImage: error",!1,l,p),p.onabort=f(Tt,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=f(Tt,h,"TestLoadImage: timeout",!1,l,p),a.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function nm(o,l){const h=new or,p=new AbortController,I=setTimeout(()=>{p.abort(),Tt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(S=>{clearTimeout(I),S.ok?Tt(h,"TestPingServer: ok",!0,l):Tt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(I),Tt(h,"TestPingServer: error",!1,l)})}function Tt(o,l,h,p,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),p(h)}catch{}}function rm(){this.g=new Fp}function eo(o){this.i=o.Sb||null,this.h=o.ab||!1}y(eo,vc),eo.prototype.g=function(){return new hi(this.i,this.h)};function hi(o,l){Te.call(this),this.H=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(hi,Te),n=hi.prototype,n.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=l,this.readyState=1,mr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(l.body=o),(this.H||a).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,pr(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,mr(this)),this.g&&(this.readyState=3,mr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;jc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function jc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?pr(this):mr(this),this.readyState==3&&jc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,pr(this))},n.Na=function(o){this.g&&(this.response=o,pr(this))},n.ga=function(){this.g&&pr(this)};function pr(o){o.readyState=4,o.l=null,o.j=null,o.B=null,mr(o)}n.setRequestHeader=function(o,l){this.A.append(o,l)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function mr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(hi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Wc(o){let l="";return ii(o,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function to(o,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=Wc(h),typeof o=="string"?h!=null&&ar(h):re(o,l,h))}function le(o){Te.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(le,Te);var im=/^https?$/i,sm=["POST","PUT"];n=le.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Rc.g(),this.g.onreadystatechange=E(d(this.Ca,this));try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(S){Hc(this,S);return}if(o=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var I in p)h.set(I,p[I]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())h.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),I=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(sm,l,void 0)>=0)||p||I||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,N]of h)this.g.setRequestHeader(S,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(S){Hc(this,S)}};function Hc(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.o=5,Gc(o),di(o)}function Gc(o){o.A||(o.A=!0,Pe(o,"complete"),Pe(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Pe(this,"complete"),Pe(this,"abort"),di(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),di(this,!0)),le.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Kc(this):this.Xa())},n.Xa=function(){Kc(this)};function Kc(o){if(o.h&&typeof s<"u"){if(o.v&&It(o)==4)setTimeout(o.Ca.bind(o),0);else if(Pe(o,"readystatechange"),It(o)==4){o.h=!1;try{const S=o.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=S===0){let N=String(o.D).match(Mc)[1]||null;!N&&a.self&&a.self.location&&(N=a.self.location.protocol.slice(0,-1)),p=!im.test(N?N.toLowerCase():"")}h=p}if(h)Pe(o,"complete"),Pe(o,"success");else{o.o=6;try{var I=It(o)>2?o.g.statusText:""}catch{I=""}o.l=I+" ["+o.ca()+"]",Gc(o)}}finally{di(o)}}}}function di(o,l){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const h=o.g;o.g=null,l||Pe(o,"ready");try{h.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function It(o){return o.g?o.g.readyState:0}n.ca=function(){try{return It(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Up(l)}};function Qc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function om(o){const l={};o=(o.g&&It(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(_(o[p]))continue;var h=jp(o[p]);const I=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=l[I]||[];l[I]=S,S.push(h)}Dp(l,function(p){return p.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function gr(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Yc(o){this.za=0,this.i=[],this.j=new or,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gr("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gr("baseRetryDelayMs",5e3,o),this.Za=gr("retryDelaySeedMs",1e4,o),this.Ta=gr("forwardChannelMaxRetries",2,o),this.va=gr("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new Dc(o&&o.concurrentRequestLimit),this.Ba=new rm,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Yc.prototype,n.ka=8,n.I=1,n.connect=function(o,l,h,p){Ce(0),this.W=o,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.J=sl(this,null,this.W),pi(this)};function no(o){if(Jc(o),o.I==3){var l=o.V++,h=et(o.J);if(re(h,"SID",o.M),re(h,"RID",l),re(h,"TYPE","terminate"),yr(o,h),l=new bt(o,o.j,l),l.M=2,l.A=ui(et(h)),h=!1,a.navigator&&a.navigator.sendBeacon)try{h=a.navigator.sendBeacon(l.A.toString(),"")}catch{}!h&&a.Image&&(new Image().src=l.A,h=!0),h||(l.g=ol(l.j,null),l.g.ea(l.A)),l.F=Date.now(),li(l)}il(o)}function fi(o){o.g&&(io(o),o.g.cancel(),o.g=null)}function Jc(o){fi(o),o.v&&(a.clearTimeout(o.v),o.v=null),mi(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function pi(o){if(!Nc(o.h)&&!o.m){o.m=!0;var l=o.Ea;Z||g(),ee||(Z(),ee=!0),b.add(l,o),o.D=0}}function am(o,l){return Vc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=l.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=sr(d(o.Ea,o,l),rl(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const I=new bt(this,this.j,o);let S=this.o;if(this.U&&(S?(S=lc(S),hc(S,this.U)):S=this.U),this.u!==null||this.R||(I.J=S,S=null),this.S)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,l>4096){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Zc(this,I,l),h=et(this.J),re(h,"RID",o),re(h,"CVER",22),this.G&&re(h,"X-HTTP-Session-Id",this.G),yr(this,h),S&&(this.R?l="headers="+ar(Wc(S))+"&"+l:this.u&&to(h,this.u,S)),Xs(this.h,I),this.Ra&&re(h,"TYPE","init"),this.S?(re(h,"$req",l),re(h,"SID","null"),I.U=!0,Ks(I,h,null)):Ks(I,h,l),this.I=2}}else this.I==3&&(o?Xc(this,o):this.i.length==0||Nc(this.h)||Xc(this))};function Xc(o,l){var h;l?h=l.l:h=o.V++;const p=et(o.J);re(p,"SID",o.M),re(p,"RID",h),re(p,"AID",o.K),yr(o,p),o.u&&o.o&&to(p,o.u,o.o),h=new bt(o,o.j,h,o.D+1),o.u===null&&(h.J=o.o),l&&(o.i=l.G.concat(o.i)),l=Zc(o,h,1e3),h.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),Xs(o.h,h),Ks(h,p,l)}function yr(o,l){o.H&&ii(o.H,function(h,p){re(l,p,h)}),o.l&&ii({},function(h,p){re(l,p,h)})}function Zc(o,l,h){h=Math.min(o.i.length,h);const p=o.l?d(o.l.Ka,o.l,o):null;e:{var I=o.i;let j=-1;for(;;){const me=["count="+h];j==-1?h>0?(j=I[0].g,me.push("ofs="+j)):j=0:me.push("ofs="+j);let te=!0;for(let _e=0;_e<h;_e++){var S=I[_e].g;const tt=I[_e].map;if(S-=j,S<0)j=Math.max(0,I[_e].g-100),te=!1;else try{S="req"+S+"_"||"";try{var N=tt instanceof Map?tt:Object.entries(tt);for(const[rn,At]of N){let Rt=At;c(At)&&(Rt=zs(At)),me.push(S+rn+"="+encodeURIComponent(Rt))}}catch(rn){throw me.push(S+"type="+encodeURIComponent("_badmap")),rn}}catch{p&&p(tt)}}if(te){N=me.join("&");break e}}N=void 0}return o=o.i.splice(0,h),l.G=o,N}function el(o){if(!o.g&&!o.v){o.Y=1;var l=o.Da;Z||g(),ee||(Z(),ee=!0),b.add(l,o),o.A=0}}function ro(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=sr(d(o.Da,o),rl(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,tl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=sr(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Ce(10),fi(this),tl(this))};function io(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function tl(o){o.g=new bt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var l=et(o.na);re(l,"RID","rpc"),re(l,"SID",o.M),re(l,"AID",o.K),re(l,"CI",o.F?"0":"1"),!o.F&&o.ia&&re(l,"TO",o.ia),re(l,"TYPE","xmlhttp"),yr(o,l),o.u&&o.o&&to(l,o.u,o.o),o.O&&(o.g.H=o.O);var h=o.g;o=o.ba,h.M=1,h.A=ui(et(l)),h.u=null,h.R=!0,Cc(h,o)}n.Va=function(){this.C!=null&&(this.C=null,fi(this),ro(this),Ce(19))};function mi(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function nl(o,l){var h=null;if(o.g==l){mi(o),io(o),o.g=null;var p=2}else if(Js(o.h,l))h=l.G,Oc(o.h,l),p=1;else return;if(o.I!=0){if(l.o)if(p==1){h=l.u?l.u.length:0,l=Date.now()-l.F;var I=o.D;p=ai(),Pe(p,new Ic(p,h)),pi(o)}else el(o);else if(I=l.m,I==3||I==0&&l.X>0||!(p==1&&am(o,l)||p==2&&ro(o)))switch(h&&h.length>0&&(l=o.h,l.i=l.i.concat(h)),I){case 1:nn(o,5);break;case 4:nn(o,10);break;case 3:nn(o,6);break;default:nn(o,2)}}}function rl(o,l){let h=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(h*=2),h*l}function nn(o,l){if(o.j.info("Error code "+l),l==2){var h=d(o.bb,o),p=o.Ua;const I=!p;p=new Et(p||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||lr(p,"https"),ui(p),I?tm(p.toString(),h):nm(p.toString(),h)}else Ce(2);o.I=0,o.l&&o.l.pa(l),il(o),Jc(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Ce(2)):(this.j.info("Failed to ping google.com"),Ce(1))};function il(o){if(o.I=0,o.ja=[],o.l){const l=Lc(o.h);(l.length!=0||o.i.length!=0)&&(k(o.ja,l),k(o.ja,o.i),o.h.i.length=0,R(o.i),o.i.length=0),o.l.oa()}}function sl(o,l,h){var p=h instanceof Et?et(h):new Et(h);if(p.g!="")l&&(p.g=l+"."+p.g),ur(p,p.u);else{var I=a.location;p=I.protocol,l=l?l+"."+I.hostname:I.hostname,I=+I.port;const S=new Et(null);p&&lr(S,p),l&&(S.g=l),I&&ur(S,I),h&&(S.h=h),p=S}return h=o.G,l=o.wa,h&&l&&re(p,h,l),re(p,"VER",o.ka),yr(o,p),p}function ol(o,l,h){if(l&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Aa&&!o.ma?new le(new eo({ab:h})):new le(o.ma),l.Fa(o.L),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function al(){}n=al.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function gi(){}gi.prototype.g=function(o,l){return new Fe(o,l)};function Fe(o,l){Te.call(this),this.g=new Yc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(o?o["X-WebChannel-Client-Profile"]=l.sa:o={"X-WebChannel-Client-Profile":l.sa}),this.g.U=o,(o=l&&l.Qb)&&!_(o)&&(this.g.u=o),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new Cn(this)}y(Fe,Te),Fe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Fe.prototype.close=function(){no(this.g)},Fe.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.v&&(h={},h.__data__=zs(o),o=h);l.i.push(new Gp(l.Ya++,o)),l.I==3&&pi(l)},Fe.prototype.N=function(){this.g.l=null,delete this.j,no(this.g),delete this.g,Fe.Z.N.call(this)};function cl(o){js.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}y(cl,js);function ll(){Ws.call(this),this.status=1}y(ll,Ws);function Cn(o){this.g=o}y(Cn,al),Cn.prototype.ra=function(){Pe(this.g,"a")},Cn.prototype.qa=function(o){Pe(this.g,new cl(o))},Cn.prototype.pa=function(o){Pe(this.g,new ll)},Cn.prototype.oa=function(){Pe(this.g,"b")},gi.prototype.createWebChannel=gi.prototype.g,Fe.prototype.send=Fe.prototype.o,Fe.prototype.open=Fe.prototype.m,Fe.prototype.close=Fe.prototype.close,ld=function(){return new gi},cd=function(){return ai()},ad=Zt,Vo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},ci.NO_ERROR=0,ci.TIMEOUT=8,ci.HTTP_ERROR=6,ki=ci,Ac.COMPLETE="complete",od=Ac,wc.EventType=rr,rr.OPEN="a",rr.CLOSE="b",rr.ERROR="c",rr.MESSAGE="d",Te.prototype.listen=Te.prototype.J,Er=wc,le.prototype.listenOnce=le.prototype.K,le.prototype.getLastError=le.prototype.Ha,le.prototype.getLastErrorCode=le.prototype.ya,le.prototype.getStatus=le.prototype.ca,le.prototype.getResponseJson=le.prototype.La,le.prototype.getResponseText=le.prototype.la,le.prototype.send=le.prototype.ea,le.prototype.setWithCredentials=le.prototype.Fa,sd=le}).apply(typeof vi<"u"?vi:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class Ae{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ae.UNAUTHENTICATED=new Ae(null),Ae.GOOGLE_CREDENTIALS=new Ae("google-credentials-uid"),Ae.FIRST_PARTY=new Ae("first-party-uid"),Ae.MOCK_USER=new Ae("mock-user");/**
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
 */let Yn="12.11.0";function ov(n){Yn=n}/**
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
 */const pn=new os("@firebase/firestore");function xn(){return pn.logLevel}function O(n,...e){if(pn.logLevel<=W.DEBUG){const t=e.map(da);pn.debug(`Firestore (${Yn}): ${n}`,...t)}}function vt(n,...e){if(pn.logLevel<=W.ERROR){const t=e.map(da);pn.error(`Firestore (${Yn}): ${n}`,...t)}}function mn(n,...e){if(pn.logLevel<=W.WARN){const t=e.map(da);pn.warn(`Firestore (${Yn}): ${n}`,...t)}}function da(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function U(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,ud(n,r,t)}function ud(n,e,t){let r=`FIRESTORE (${Yn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw vt(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||ud(e,i,r)}function q(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Ge{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class pt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class hd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class av{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ae.UNAUTHENTICATED)))}shutdown(){}}class cv{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class lv{constructor(e){this.t=e,this.currentUser=Ae.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new pt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new pt,e.enqueueRetryable((()=>i(this.currentUser)))};const a=()=>{const u=s;e.enqueueRetryable((async()=>{await u.promise,await i(this.currentUser)}))},c=u=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new pt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new hd(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new Ae(e)}}class uv{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ae.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class hv{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new uv(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ae.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ql{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class dv{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Oe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);const r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new ql(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ql(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function fv(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class fa{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=fv(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function H(n,e){return n<e?-1:n>e?1:0}function Oo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return po(i)===po(s)?H(i,s):po(i)?1:-1}return H(n.length,e.length)}const pv=55296,mv=57343;function po(n){const e=n.charCodeAt(0);return e>=pv&&e<=mv}function zn(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}/**
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
 */const Bl="__name__";class nt{constructor(e,t,r){t===void 0?t=0:t>e.length&&U(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&U(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return nt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof nt?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=nt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return H(e.length,t.length)}static compareSegments(e,t){const r=nt.isNumericId(e),i=nt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?nt.extractNumericId(e).compare(nt.extractNumericId(t)):Oo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ot.fromString(e.substring(4,e.length-2))}}class ne extends nt{construct(e,t,r){return new ne(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new ne(t)}static emptyPath(){return new ne([])}}const gv=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class be extends nt{construct(e,t,r){return new be(e,t,r)}static isValidIdentifier(e){return gv.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Bl}static keyField(){return new be([Bl])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(t)}static emptyPath(){return new be([])}}/**
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
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(ne.fromString(e))}static fromName(e){return new L(ne.fromString(e).popFirst(5))}static empty(){return new L(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new ne(e.slice()))}}/**
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
 */function dd(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function yv(n,e,t,r){if(e===!0&&r===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function zl(n){if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function jl(n){if(L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function fd(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function hs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U(12329,{type:typeof n})}function Xe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hs(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function _v(n,e){if(e<=0)throw new V(P.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */function pe(n,e){const t={typeString:n};return e&&(t.value=e),t}function Qr(n,e){if(!fd(n))throw new V(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(P.INVALID_ARGUMENT,t);return!0}/**
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
 */const Wl=-62135596800,Hl=1e6;class ie{static now(){return ie.fromMillis(Date.now())}static fromDate(e){return ie.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Hl);return new ie(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Wl)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Hl}_compareTo(e){return this.seconds===e.seconds?H(this.nanoseconds,e.nanoseconds):H(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ie._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Qr(e,ie._jsonSchema))return new ie(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wl;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ie._jsonSchemaVersion="firestore/timestamp/1.0",ie._jsonSchema={type:pe("string",ie._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
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
 */class ${static fromTimestamp(e){return new $(e)}static min(){return new $(new ie(0,0))}static max(){return new $(new ie(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Lr=-1;function vv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=$.fromTimestamp(r===1e9?new ie(t+1,0):new ie(t,r));return new Ut(i,L.empty(),e)}function wv(n){return new Ut(n.readTime,n.key,Lr)}class Ut{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Ut($.min(),L.empty(),Lr)}static max(){return new Ut($.max(),L.empty(),Lr)}}function bv(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:H(n.largestBatchId,e.largestBatchId))}/**
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
 */const Ev="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Tv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Jn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Ev)throw n;O("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C(((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):C.reject(t)}static resolve(e){return new C(((t,r)=>{t(e)}))}static reject(e){return new C(((t,r)=>{r(e)}))}static waitFor(e){return new C(((t,r)=>{let i=0,s=0,a=!1;e.forEach((c=>{++i,c.next((()=>{++s,a&&s===i&&t()}),(u=>r(u)))})),a=!0,s===i&&t()}))}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next((i=>i?C.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,s)=>{r.push(t.call(this,i,s))})),this.waitFor(r)}static mapArray(e,t){return new C(((r,i)=>{const s=e.length,a=new Array(s);let c=0;for(let u=0;u<s;u++){const d=u;t(e[d]).next((f=>{a[d]=f,++c,c===s&&r(a)}),(f=>i(f)))}}))}static doWhile(e,t){return new C(((r,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):r()};s()}))}}function Iv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Xn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ds{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ds.ce=-1;/**
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
 */const pa=-1;function fs(n){return n==null}function ji(n){return n===0&&1/n==-1/0}function Av(n){return typeof n=="number"&&Number.isInteger(n)&&!ji(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const pd="";function Rv(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Gl(e)),e=Sv(n.get(t),e);return Gl(e)}function Sv(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case pd:t+="";break;default:t+=s}}return t}function Gl(n){return n+pd+""}/**
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
 */function Kl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Kt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function md(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ae{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new wi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new wi(this.root,e,this.comparator,!1)}getReverseIterator(){return new wi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new wi(this.root,e,this.comparator,!0)}}class wi{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??we.RED,this.left=i??we.EMPTY,this.right=s??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new we(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return we.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw U(43730,{key:this.key,value:this.value});if(this.right.isRed())throw U(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw U(27949);return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw U(57766)}get value(){throw U(16141)}get color(){throw U(16727)}get left(){throw U(29726)}get right(){throw U(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ye{constructor(e){this.comparator=e,this.data=new ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ql(this.data.getIterator())}getIteratorFrom(e){return new Ql(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class Ql{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class $e{constructor(e){this.fields=e,e.sort(be.comparator)}static empty(){return new $e([])}unionWith(e){let t=new ye(be.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new $e(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zn(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class gd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ee{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new gd("Invalid base64 string: "+s):s}})(e);return new Ee(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s})(e);return new Ee(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return H(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ee.EMPTY_BYTE_STRING=new Ee("");const Pv=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ft(n){if(X(!!n,39018),typeof n=="string"){let e=0;const t=Pv.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function $t(n){return typeof n=="string"?Ee.fromBase64String(n):Ee.fromUint8Array(n)}/**
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
 */const yd="server_timestamp",_d="__type__",vd="__previous_value__",wd="__local_write_time__";function ma(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[_d])==null?void 0:r.stringValue)===yd}function ps(n){const e=n.mapValue.fields[vd];return ma(e)?ps(e):e}function Mr(n){const e=Ft(n.mapValue.fields[wd].timestampValue);return new ie(e.seconds,e.nanos)}/**
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
 */class Cv{constructor(e,t,r,i,s,a,c,u,d,f,y){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d,this.isUsingEmulator=f,this.apiKey=y}}const Wi="(default)";class Ur{constructor(e,t){this.projectId=e,this.database=t||Wi}static empty(){return new Ur("","")}get isDefaultDatabase(){return this.database===Wi}isEqual(e){return e instanceof Ur&&e.projectId===this.projectId&&e.database===this.database}}function kv(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ur(n.options.projectId,e)}/**
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
 */const bd="__type__",xv="__max__",bi={mapValue:{}},Ed="__vector__",Hi="value";function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ma(n)?4:Nv(n)?9007199254740991:Dv(n)?10:11:U(28295,{value:n})}function ct(n,e){if(n===e)return!0;const t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Mr(n).isEqual(Mr(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Ft(i.timestampValue),c=Ft(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return $t(i.bytesValue).isEqual($t(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return ue(i.geoPointValue.latitude)===ue(s.geoPointValue.latitude)&&ue(i.geoPointValue.longitude)===ue(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return ue(i.integerValue)===ue(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=ue(i.doubleValue),c=ue(s.doubleValue);return a===c?ji(a)===ji(c):isNaN(a)&&isNaN(c)}return!1})(n,e);case 9:return zn(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return(function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Kl(a)!==Kl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!ct(a[u],c[u])))return!1;return!0})(n,e);default:return U(52216,{left:n})}}function Fr(n,e){return(n.values||[]).find((t=>ct(t,e)))!==void 0}function jn(n,e){if(n===e)return 0;const t=qt(n),r=qt(e);if(t!==r)return H(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,e.booleanValue);case 2:return(function(s,a){const c=ue(s.integerValue||s.doubleValue),u=ue(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(n,e);case 3:return Yl(n.timestampValue,e.timestampValue);case 4:return Yl(Mr(n),Mr(e));case 5:return Oo(n.stringValue,e.stringValue);case 6:return(function(s,a){const c=$t(s),u=$t(a);return c.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(s,a){const c=s.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=H(c[d],u[d]);if(f!==0)return f}return H(c.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,a){const c=H(ue(s.latitude),ue(a.latitude));return c!==0?c:H(ue(s.longitude),ue(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Jl(n.arrayValue,e.arrayValue);case 10:return(function(s,a){var E,R,k,D;const c=s.fields||{},u=a.fields||{},d=(E=c[Hi])==null?void 0:E.arrayValue,f=(R=u[Hi])==null?void 0:R.arrayValue,y=H(((k=d==null?void 0:d.values)==null?void 0:k.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return y!==0?y:Jl(d,f)})(n.mapValue,e.mapValue);case 11:return(function(s,a){if(s===bi.mapValue&&a===bi.mapValue)return 0;if(s===bi.mapValue)return 1;if(a===bi.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let y=0;y<u.length&&y<f.length;++y){const E=Oo(u[y],f[y]);if(E!==0)return E;const R=jn(c[u[y]],d[f[y]]);if(R!==0)return R}return H(u.length,f.length)})(n.mapValue,e.mapValue);default:throw U(23264,{he:t})}}function Yl(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return H(n,e);const t=Ft(n),r=Ft(e),i=H(t.seconds,r.seconds);return i!==0?i:H(t.nanos,r.nanos)}function Jl(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=jn(t[i],r[i]);if(s)return s}return H(t.length,r.length)}function Wn(n){return Lo(n)}function Lo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Ft(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return $t(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Lo(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Lo(t.fields[a])}`;return i+"}"})(n.mapValue):U(61005,{value:n})}function xi(n){switch(qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ps(n);return e?16+xi(e):16;case 5:return 2*n.stringValue.length;case 6:return $t(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+xi(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return Kt(r.fields,((s,a)=>{i+=s.length+xi(a)})),i})(n.mapValue);default:throw U(13486,{value:n})}}function Xl(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Mo(n){return!!n&&"integerValue"in n}function ga(n){return!!n&&"arrayValue"in n}function Zl(n){return!!n&&"nullValue"in n}function eu(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Di(n){return!!n&&"mapValue"in n}function Dv(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[bd])==null?void 0:r.stringValue)===Ed}function Sr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Kt(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Sr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Sr(n.arrayValue.values[t]);return e}return{...n}}function Nv(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===xv}/**
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
 */class Le{constructor(e){this.value=e}static empty(){return new Le({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Di(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Sr(t)}setAll(e){let t=be.emptyPath(),r={},i=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=Sr(a):i.push(c.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());Di(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Di(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Kt(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new Le(Sr(this.value))}}function Td(n){const e=[];return Kt(n.fields,((t,r)=>{const i=new be([t]);if(Di(r)){const s=Td(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)})),new $e(e)}/**
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
 */class Re{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Re(e,0,$.min(),$.min(),$.min(),Le.empty(),0)}static newFoundDocument(e,t,r,i){return new Re(e,1,t,$.min(),r,i,0)}static newNoDocument(e,t){return new Re(e,2,t,$.min(),$.min(),Le.empty(),0)}static newUnknownDocument(e,t){return new Re(e,3,t,$.min(),$.min(),Le.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Le.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Le.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Re&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Re(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Gi{constructor(e,t){this.position=e,this.inclusive=t}}function tu(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=jn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function nu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class $r{constructor(e,t="asc"){this.field=e,this.dir=t}}function Vv(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Id{}class fe extends Id{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Lv(e,t,r):t==="array-contains"?new Fv(e,r):t==="in"?new $v(e,r):t==="not-in"?new qv(e,r):t==="array-contains-any"?new Bv(e,r):new fe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Mv(e,r):new Uv(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(jn(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(jn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ze extends Id{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ze(e,t)}matches(e){return Ad(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ad(n){return n.op==="and"}function Rd(n){return Ov(n)&&Ad(n)}function Ov(n){for(const e of n.filters)if(e instanceof Ze)return!1;return!0}function Uo(n){if(n instanceof fe)return n.field.canonicalString()+n.op.toString()+Wn(n.value);if(Rd(n))return n.filters.map((e=>Uo(e))).join(",");{const e=n.filters.map((t=>Uo(t))).join(",");return`${n.op}(${e})`}}function Sd(n,e){return n instanceof fe?(function(r,i){return i instanceof fe&&r.op===i.op&&r.field.isEqual(i.field)&&ct(r.value,i.value)})(n,e):n instanceof Ze?(function(r,i){return i instanceof Ze&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,a,c)=>s&&Sd(a,i.filters[c])),!0):!1})(n,e):void U(19439)}function Pd(n){return n instanceof fe?(function(t){return`${t.field.canonicalString()} ${t.op} ${Wn(t.value)}`})(n):n instanceof Ze?(function(t){return t.op.toString()+" {"+t.getFilters().map(Pd).join(" ,")+"}"})(n):"Filter"}class Lv extends fe{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class Mv extends fe{constructor(e,t){super(e,"in",t),this.keys=Cd("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Uv extends fe{constructor(e,t){super(e,"not-in",t),this.keys=Cd("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Cd(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>L.fromName(r.referenceValue)))}class Fv extends fe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ga(t)&&Fr(t.arrayValue,this.value)}}class $v extends fe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Fr(this.value.arrayValue,t)}}class qv extends fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Fr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Fr(this.value.arrayValue,t)}}class Bv extends fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ga(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Fr(this.value.arrayValue,r)))}}/**
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
 */class zv{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Te=null}}function ru(n,e=null,t=[],r=[],i=null,s=null,a=null){return new zv(n,e,t,r,i,s,a)}function ya(n){const e=q(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Uo(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),fs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Wn(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Wn(r))).join(",")),e.Te=t}return e.Te}function _a(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Vv(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Sd(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!nu(n.startAt,e.startAt)&&nu(n.endAt,e.endAt)}function Fo(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Zn{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function jv(n,e,t,r,i,s,a,c){return new Zn(n,e,t,r,i,s,a,c)}function va(n){return new Zn(n)}function iu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Wv(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function kd(n){return n.collectionGroup!==null}function Pr(n){const e=q(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ee.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ye(be.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ee.push(new $r(s,r))})),t.has(be.keyField().canonicalString())||e.Ee.push(new $r(be.keyField(),r))}return e.Ee}function st(n){const e=q(n);return e.Ie||(e.Ie=Hv(e,Pr(n))),e.Ie}function Hv(n,e){if(n.limitType==="F")return ru(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new $r(i.field,s)}));const t=n.endAt?new Gi(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Gi(n.startAt.position,n.startAt.inclusive):null;return ru(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function $o(n,e){const t=n.filters.concat([e]);return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Gv(n,e){const t=n.explicitOrderBy.concat([e]);return new Zn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ki(n,e,t){return new Zn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ms(n,e){return _a(st(n),st(e))&&n.limitType===e.limitType}function xd(n){return`${ya(st(n))}|lt:${n.limitType}`}function Dn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>Pd(i))).join(", ")}]`),fs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Wn(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Wn(i))).join(",")),`Target(${r})`})(st(n))}; limitType=${n.limitType})`}function gs(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):L.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of Pr(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(a,c,u){const d=tu(a,c,u);return a.inclusive?d<=0:d<0})(r.startAt,Pr(r),i)||r.endAt&&!(function(a,c,u){const d=tu(a,c,u);return a.inclusive?d>=0:d>0})(r.endAt,Pr(r),i))})(n,e)}function Kv(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Dd(n){return(e,t)=>{let r=!1;for(const i of Pr(n)){const s=Qv(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Qv(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(s,a,c){const u=a.data.field(s),d=c.data.field(s);return u!==null&&d!==null?jn(u,d):U(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return U(19790,{direction:n.dir})}}/**
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
 */class In{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Kt(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return md(this.inner)}size(){return this.innerSize}}/**
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
 */const Yv=new ae(L.comparator);function wt(){return Yv}const Nd=new ae(L.comparator);function Tr(...n){let e=Nd;for(const t of n)e=e.insert(t.key,t);return e}function Vd(n){let e=Nd;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function cn(){return Cr()}function Od(){return Cr()}function Cr(){return new In((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Jv=new ae(L.comparator),Xv=new ye(L.comparator);function G(...n){let e=Xv;for(const t of n)e=e.add(t);return e}const Zv=new ye(H);function ew(){return Zv}/**
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
 */function wa(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ji(e)?"-0":e}}function Ld(n){return{integerValue:""+n}}function Md(n,e){return Av(e)?Ld(e):wa(n,e)}/**
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
 */class ys{constructor(){this._=void 0}}function tw(n,e,t){return n instanceof Qi?(function(i,s){const a={fields:{[_d]:{stringValue:yd},[wd]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ma(s)&&(s=ps(s)),s&&(a.fields[vd]=s),{mapValue:a}})(t,e):n instanceof qr?Fd(n,e):n instanceof Br?$d(n,e):(function(i,s){const a=Ud(i,s),c=su(a)+su(i.Ae);return Mo(a)&&Mo(i.Ae)?Ld(c):wa(i.serializer,c)})(n,e)}function nw(n,e,t){return n instanceof qr?Fd(n,e):n instanceof Br?$d(n,e):t}function Ud(n,e){return n instanceof zr?(function(r){return Mo(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class Qi extends ys{}class qr extends ys{constructor(e){super(),this.elements=e}}function Fd(n,e){const t=qd(e);for(const r of n.elements)t.some((i=>ct(i,r)))||t.push(r);return{arrayValue:{values:t}}}class Br extends ys{constructor(e){super(),this.elements=e}}function $d(n,e){let t=qd(e);for(const r of n.elements)t=t.filter((i=>!ct(i,r)));return{arrayValue:{values:t}}}class zr extends ys{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function su(n){return ue(n.integerValue||n.doubleValue)}function qd(n){return ga(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class rw{constructor(e,t){this.field=e,this.transform=t}}function iw(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof qr&&i instanceof qr||r instanceof Br&&i instanceof Br?zn(r.elements,i.elements,ct):r instanceof zr&&i instanceof zr?ct(r.Ae,i.Ae):r instanceof Qi&&i instanceof Qi})(n.transform,e.transform)}class sw{constructor(e,t){this.version=e,this.transformResults=t}}class je{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new je}static exists(e){return new je(void 0,e)}static updateTime(e){return new je(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ni(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class _s{}function Bd(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ba(n.key,je.none()):new Yr(n.key,n.data,je.none());{const t=n.data,r=Le.empty();let i=new ye(be.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Qt(n.key,r,new $e(i.toArray()),je.none())}}function ow(n,e,t){n instanceof Yr?(function(i,s,a){const c=i.value.clone(),u=au(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,e,t):n instanceof Qt?(function(i,s,a){if(!Ni(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=au(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(zd(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function kr(n,e,t,r){return n instanceof Yr?(function(s,a,c,u){if(!Ni(s.precondition,a))return c;const d=s.value.clone(),f=cu(s.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,r):n instanceof Qt?(function(s,a,c,u){if(!Ni(s.precondition,a))return c;const d=cu(s.fieldTransforms,u,a),f=a.data;return f.setAll(zd(s)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((y=>y.field)))})(n,e,t,r):(function(s,a,c){return Ni(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,e,t)}function aw(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=Ud(r.transform,i||null);s!=null&&(t===null&&(t=Le.empty()),t.set(r.field,s))}return t||null}function ou(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&zn(r,i,((s,a)=>iw(s,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Yr extends _s{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Qt extends _s{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function zd(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function au(n,e,t){const r=new Map;X(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,nw(a,c,t[i]))}return r}function cu(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,tw(s,a,e))}return r}class ba extends _s{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class cw extends _s{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class lw{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&ow(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=kr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=kr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Od();return this.mutations.forEach((i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const u=Bd(a,c);u!==null&&r.set(i.key,u),a.isValidDocument()||a.convertToNoDocument($.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&zn(this.mutations,e.mutations,((t,r)=>ou(t,r)))&&zn(this.baseMutations,e.baseMutations,((t,r)=>ou(t,r)))}}class Ea{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=(function(){return Jv})();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new Ea(e,t,r,i)}}/**
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
 */class uw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class hw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var de,K;function dw(n){switch(n){case P.OK:return U(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return U(15467,{code:n})}}function jd(n){if(n===void 0)return vt("GRPC error has no .code"),P.UNKNOWN;switch(n){case de.OK:return P.OK;case de.CANCELLED:return P.CANCELLED;case de.UNKNOWN:return P.UNKNOWN;case de.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case de.INTERNAL:return P.INTERNAL;case de.UNAVAILABLE:return P.UNAVAILABLE;case de.UNAUTHENTICATED:return P.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case de.NOT_FOUND:return P.NOT_FOUND;case de.ALREADY_EXISTS:return P.ALREADY_EXISTS;case de.PERMISSION_DENIED:return P.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case de.ABORTED:return P.ABORTED;case de.OUT_OF_RANGE:return P.OUT_OF_RANGE;case de.UNIMPLEMENTED:return P.UNIMPLEMENTED;case de.DATA_LOSS:return P.DATA_LOSS;default:return U(39323,{code:n})}}(K=de||(de={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function fw(){return new TextEncoder}/**
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
 */const pw=new Ot([4294967295,4294967295],0);function lu(n){const e=fw().encode(n),t=new id;return t.update(e),new Uint8Array(t.digest())}function uu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ot([t,r],0),new Ot([i,s],0)]}class Ta{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ir(`Invalid padding: ${t}`);if(r<0)throw new Ir(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ir(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ir(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ot.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(Ot.fromNumber(r)));return i.compare(pw)===1&&(i=new Ot([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=lu(e),[r,i]=uu(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);if(!this.we(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Ta(s,i,t);return r.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=lu(e),[r,i]=uu(t);for(let s=0;s<this.hashCount;s++){const a=this.ye(r,i,s);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ir extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class vs{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Jr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new vs($.min(),i,new ae(H),wt(),G())}}class Jr{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Jr(r,t,G(),G(),G())}}/**
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
 */class Vi{constructor(e,t,r,i){this.be=e,this.removedTargetIds=t,this.key=r,this.De=i}}class Wd{constructor(e,t){this.targetId=e,this.Ce=t}}class Hd{constructor(e,t,r=Ee.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class hu{constructor(){this.ve=0,this.Fe=du(),this.Me=Ee.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),r=G();return this.Fe.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:U(38017,{changeType:s})}})),new Jr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=du()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class mw{constructor(e){this.Ge=e,this.ze=new Map,this.je=wt(),this.Je=Ei(),this.He=Ei(),this.Ze=new ae(H)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:U(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,i)=>{this.rt(i)&&t(i)}))}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(Fo(s))if(r===0){const a=new L(s.path);this.et(t,a,Re.newNoDocument(a,$.min()))}else X(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=$t(r).toUint8Array()}catch(u){if(u instanceof gd)return mn("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Ta(a,i,s)}catch(u){return mn(u instanceof Ir?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)})),i}Tt(e){const t=new Map;this.ze.forEach(((s,a)=>{const c=this.ot(a);if(c){if(s.current&&Fo(c.target)){const u=new L(c.target.path);this.Et(u).has(a)||this.It(a,u)||this.et(a,u,Re.newNoDocument(u,e))}s.Be&&(t.set(a,s.ke()),s.qe())}}));let r=G();this.He.forEach(((s,a)=>{let c=!0;a.forEachWhile((u=>{const d=this.ot(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(s))})),this.je.forEach(((s,a)=>a.setReadTime(e)));const i=new vs(e,t,this.Ze,this.je,r);return this.je=wt(),this.Je=Ei(),this.He=Ei(),this.Ze=new ae(H),i}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.It(e,t)?i.Ke(t,1):i.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new hu,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new ye(H),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new ye(H),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new hu),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ei(){return new ae(L.comparator)}function du(){return new ae(L.comparator)}const gw={asc:"ASCENDING",desc:"DESCENDING"},yw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_w={and:"AND",or:"OR"};class vw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function qo(n,e){return n.useProto3Json||fs(e)?e:{value:e}}function Yi(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ww(n,e){return Yi(n,e.toTimestamp())}function ot(n){return X(!!n,49232),$.fromTimestamp((function(t){const r=Ft(t);return new ie(r.seconds,r.nanos)})(n))}function Ia(n,e){return Bo(n,e).canonicalString()}function Bo(n,e){const t=(function(i){return new ne(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Kd(n){const e=ne.fromString(n);return X(Zd(e),10190,{key:e.toString()}),e}function zo(n,e){return Ia(n.databaseId,e.path)}function mo(n,e){const t=Kd(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Yd(t))}function Qd(n,e){return Ia(n.databaseId,e)}function bw(n){const e=Kd(n);return e.length===4?ne.emptyPath():Yd(e)}function jo(n){return new ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Yd(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function fu(n,e,t){return{name:zo(n,e),fields:t.value.mapValue.fields}}function Ew(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:U(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(d,f){return d.useProto3Json?(X(f===void 0||typeof f=="string",58123),Ee.fromBase64String(f||"")):(X(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ee.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(d){const f=d.code===void 0?P.UNKNOWN:jd(d.code);return new V(f,d.message||"")})(a);t=new Hd(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=mo(n,r.document.name),s=ot(r.document.updateTime),a=r.document.createTime?ot(r.document.createTime):$.min(),c=new Le({mapValue:{fields:r.document.fields}}),u=Re.newFoundDocument(i,s,a,c),d=r.targetIds||[],f=r.removedTargetIds||[];t=new Vi(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=mo(n,r.document),s=r.readTime?ot(r.readTime):$.min(),a=Re.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Vi([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=mo(n,r.document),s=r.removedTargetIds||[];t=new Vi([],s,i,null)}else{if(!("filter"in e))return U(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new hw(i,s),c=r.targetId;t=new Wd(c,a)}}return t}function Tw(n,e){let t;if(e instanceof Yr)t={update:fu(n,e.key,e.value)};else if(e instanceof ba)t={delete:zo(n,e.key)};else if(e instanceof Qt)t={update:fu(n,e.key,e.data),updateMask:Dw(e.fieldMask)};else{if(!(e instanceof cw))return U(16599,{dt:e.type});t={verify:zo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,a){const c=a.transform;if(c instanceof Qi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof qr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Br)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof zr)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw U(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:ww(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:U(27497)})(n,e.precondition)),t}function Iw(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map((t=>(function(i,s){let a=i.updateTime?ot(i.updateTime):ot(s);return a.isEqual($.min())&&(a=ot(s)),new sw(a,i.transformResults||[])})(t,e)))):[]}function Aw(n,e){return{documents:[Qd(n,e.path)]}}function Rw(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Qd(n,i);const s=(function(d){if(d.length!==0)return Xd(Ze.create(d,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const a=(function(d){if(d.length!==0)return d.map((f=>(function(E){return{field:Nn(E.field),direction:Cw(E.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=qo(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ft:t,parent:i}}function Sw(n){let e=bw(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){X(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=(function(y){const E=Jd(y);return E instanceof Ze&&Rd(E)?E.getFilters():[E]})(t.where));let a=[];t.orderBy&&(a=(function(y){return y.map((E=>(function(k){return new $r(Vn(k.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(E)))})(t.orderBy));let c=null;t.limit&&(c=(function(y){let E;return E=typeof y=="object"?y.value:y,fs(E)?null:E})(t.limit));let u=null;t.startAt&&(u=(function(y){const E=!!y.before,R=y.values||[];return new Gi(R,E)})(t.startAt));let d=null;return t.endAt&&(d=(function(y){const E=!y.before,R=y.values||[];return new Gi(R,E)})(t.endAt)),jv(e,i,a,s,c,"F",u,d)}function Pw(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U(28987,{purpose:i})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Jd(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Vn(t.unaryFilter.field);return fe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Vn(t.unaryFilter.field);return fe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Vn(t.unaryFilter.field);return fe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Vn(t.unaryFilter.field);return fe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return U(61313);default:return U(60726)}})(n):n.fieldFilter!==void 0?(function(t){return fe.create(Vn(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return U(58110);default:return U(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Ze.create(t.compositeFilter.filters.map((r=>Jd(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return U(1026)}})(t.compositeFilter.op))})(n):U(30097,{filter:n})}function Cw(n){return gw[n]}function kw(n){return yw[n]}function xw(n){return _w[n]}function Nn(n){return{fieldPath:n.canonicalString()}}function Vn(n){return be.fromServerFormat(n.fieldPath)}function Xd(n){return n instanceof fe?(function(t){if(t.op==="=="){if(eu(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NAN"}};if(Zl(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(eu(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NAN"}};if(Zl(t.value))return{unaryFilter:{field:Nn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Nn(t.field),op:kw(t.op),value:t.value}}})(n):n instanceof Ze?(function(t){const r=t.getFilters().map((i=>Xd(i)));return r.length===1?r[0]:{compositeFilter:{op:xw(t.op),filters:r}}})(n):U(54877,{filter:n})}function Dw(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Zd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function ef(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class Dt{constructor(e,t,r,i,s=$.min(),a=$.min(),c=Ee.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Dt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class Nw{constructor(e){this.yt=e}}function Vw(n){const e=Sw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ki(e,e.limit,"L"):e}/**
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
 */class Ow{constructor(){this.bn=new Lw}addToCollectionParentIndex(e,t){return this.bn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(Ut.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(Ut.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Lw{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ye(ne.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ye(ne.comparator)).toArray()}}/**
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
 */const pu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},tf=41943040;class Ne{static withCacheSize(e){return new Ne(e,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */Ne.DEFAULT_COLLECTION_PERCENTILE=10,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ne.DEFAULT=new Ne(tf,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ne.DISABLED=new Ne(-1,0,0);/**
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
 */class Hn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Hn(0)}static ar(){return new Hn(-1)}}/**
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
 */const mu="LruGarbageCollector",Mw=1048576;function gu([n,e],[t,r]){const i=H(n,t);return i===0?H(e,r):i}class Uw{constructor(e){this.Pr=e,this.buffer=new ye(gu),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();gu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Fw{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){O(mu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Xn(t)?O(mu,"Ignoring IndexedDB error during garbage collection: ",t):await Jn(t)}await this.Ar(3e5)}))}}class $w{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return C.resolve(ds.ce);const r=new Uw(t);return this.Vr.forEachTarget(e,(i=>r.Ir(i.sequenceNumber))).next((()=>this.Vr.mr(e,(i=>r.Ir(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(pu)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),pu):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((y=>(y>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),i=this.params.maximumSequenceNumbersToCollect):i=y,a=Date.now(),this.nthSequenceNumber(e,i)))).next((y=>(r=y,c=Date.now(),this.removeTargets(e,r,t)))).next((y=>(s=y,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((y=>(d=Date.now(),xn()<=W.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${y} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:y}))))}}function qw(n,e){return new $w(n,e)}/**
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
 */class Bw{constructor(){this.changes=new In((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Re.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class zw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class jw{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&kr(r.mutation,i,$e.empty(),ie.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,G()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=G()){const i=cn();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let a=Tr();return s.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=cn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,G())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,r,i){let s=wt();const a=Cr(),c=(function(){return Cr()})();return t.forEach(((u,d)=>{const f=r.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof Qt)?s=s.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),kr(f.mutation,d,f.mutation.getFieldMask(),ie.now())):a.set(d.key,$e.empty())})),this.recalculateAndSaveOverlays(e,s).next((u=>(u.forEach(((d,f)=>a.set(d,f))),t.forEach(((d,f)=>c.set(d,new zw(f,a.get(d)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Cr();let i=new ae(((a,c)=>a-c)),s=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const d=t.get(u);if(d===null)return;let f=r.get(u)||$e.empty();f=c.applyToLocalView(d,f),r.set(u,f);const y=(i.get(c.batchId)||G()).add(u);i=i.insert(c.batchId,y)}))})).next((()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,y=Od();f.forEach((E=>{if(!s.has(E)){const R=Bd(t.get(E),r.get(E));R!==null&&y.set(E,R),s=s.add(E)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return C.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return Wv(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):kd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):C.resolve(cn());let c=Lr,u=s;return a.next((d=>C.forEach(d,((f,y)=>(c<y.largestBatchId&&(c=y.largestBatchId),s.get(f)?C.resolve():this.remoteDocumentCache.getEntry(e,f).next((E=>{u=u.insert(f,E)}))))).next((()=>this.populateOverlays(e,d,s))).next((()=>this.computeViews(e,u,d,G()))).next((f=>({batchId:c,changes:Vd(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let i=Tr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Tr();return this.indexManager.getCollectionParents(e,s).next((c=>C.forEach(c,(u=>{const d=(function(y,E){return new Zn(E,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next((f=>{f.forEach(((y,E)=>{a=a.insert(y,E)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((a=>{s.forEach(((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Re.newInvalidDocument(f)))}));let c=Tr();return a.forEach(((u,d)=>{const f=s.get(u);f!==void 0&&kr(f.mutation,d,$e.empty(),ie.now()),gs(t,d)&&(c=c.insert(u,d))})),c}))}}/**
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
 */class Ww{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return C.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:ot(i.createTime)}})(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(i){return{name:i.name,query:Vw(i.bundledQuery),readTime:ot(i.readTime)}})(t)),C.resolve()}}/**
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
 */class Hw{constructor(){this.overlays=new ae(L.comparator),this.Lr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=cn();return C.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.St(e,t,s)})),C.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Lr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const i=cn(),s=t.length+1,a=new L(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return C.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ae(((d,f)=>d-f));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let f=s.get(d.largestBatchId);f===null&&(f=cn(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=cn(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((d,f)=>c.set(d,f))),!(c.size()>=i)););return C.resolve(c)}St(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new uw(t,r));let s=this.Lr.get(t);s===void 0&&(s=G(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
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
 */class Gw{constructor(){this.sessionToken=Ee.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
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
 */class Aa{constructor(){this.kr=new ye(ve.qr),this.Kr=new ye(ve.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new ve(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new ve(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new L(new ne([])),r=new ve(t,e),i=new ve(t,e+1),s=[];return this.Kr.forEachInRange([r,i],(a=>{this.Wr(a),s.push(a.key)})),s}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new L(new ne([])),r=new ve(t,e),i=new ve(t,e+1);let s=G();return this.Kr.forEachInRange([r,i],(a=>{s=s.add(a.key)})),s}containsKey(e){const t=new ve(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ve{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return L.comparator(e.key,t.key)||H(e.Jr,t.Jr)}static Ur(e,t){return H(e.Jr,t.Jr)||L.comparator(e.key,t.key)}}/**
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
 */class Kw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new ye(ve.qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new lw(s,t,r,i);this.mutationQueue.push(a);for(const c of i)this.Hr=this.Hr.add(new ve(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return C.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?pa:this.Yn-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ve(t,0),i=new ve(t,Number.POSITIVE_INFINITY),s=[];return this.Hr.forEachInRange([r,i],(a=>{const c=this.Zr(a.Jr);s.push(c)})),C.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(H);return t.forEach((i=>{const s=new ve(i,0),a=new ve(i,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([s,a],(c=>{r=r.add(c.Jr)}))})),C.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;L.isDocumentKey(s)||(s=s.child(""));const a=new ve(new L(s),0);let c=new ye(H);return this.Hr.forEachWhile((u=>{const d=u.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.Jr)),!0)}),a),C.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach((r=>{const i=this.Zr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){X(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return C.forEach(t.mutations,(i=>{const s=new ve(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new ve(t,0),i=this.Hr.firstAfterOrEqual(r);return C.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Qw{constructor(e){this.ti=e,this.docs=(function(){return new ae(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():Re.newInvalidDocument(t))}getEntries(e,t){let r=wt();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Re.newInvalidDocument(i))})),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=wt();const a=t.path,c=new L(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||bv(wv(f),r)<=0||(i.has(f.key)||gs(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return C.resolve(s)}getAllFromCollectionGroup(e,t,r,i){U(9500)}ni(e,t){return C.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Yw(this)}getSize(e){return C.resolve(this.size)}}class Yw extends Bw{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)})),C.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class Jw{constructor(e){this.persistence=e,this.ri=new In((t=>ya(t)),_a),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.ii=0,this.si=new Aa,this.targetCount=0,this.oi=Hn._r()}forEachTarget(e,t){return this.ri.forEach(((r,i)=>t(i))),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),C.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Hn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.lr(t),C.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach(((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)})),C.waitFor(s).next((()=>i))}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((a=>{s.push(i.markPotentiallyOrphaned(e,a))})),C.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.si.containsKey(t))}}/**
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
 */class nf{constructor(e,t){this._i={},this.overlays={},this.ai=new ds(0),this.ui=!1,this.ui=!0,this.ci=new Gw,this.referenceDelegate=e(this),this.li=new Jw(this),this.indexManager=new Ow,this.remoteDocumentCache=(function(i){return new Qw(i)})((r=>this.referenceDelegate.hi(r))),this.serializer=new Nw(t),this.Pi=new Ww(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Hw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new Kw(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const i=new Xw(this.ai.next());return this.referenceDelegate.Ti(),r(i).next((s=>this.referenceDelegate.Ei(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Ii(e,t){return C.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class Xw extends Tv{constructor(e){super(),this.currentSequenceNumber=e}}class Ra{constructor(e){this.persistence=e,this.Ri=new Aa,this.Ai=null}static Vi(e){return new Ra(e)}get di(){if(this.Ai)return this.Ai;throw U(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((i=>this.di.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.di.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.di,(r=>{const i=L.fromPath(r);return this.mi(e,i).next((s=>{s||t.removeEntry(i,$.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return C.or([()=>C.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ji{constructor(e,t){this.persistence=e,this.fi=new In((r=>Rv(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=qw(this,t)}static Vi(e,t){return new Ji(e,t)}Ti(){}Ei(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return C.forEach(this.fi,((r,i)=>this.wr(e,r,i).next((s=>s?C.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,(a=>this.wr(e,a,t).next((c=>{c||(r++,s.removeEntry(a,$.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),C.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=xi(e.data.value)),t}wr(e,t,r){return C.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return C.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Sa{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=i}static Is(e,t){let r=G(),i=G();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Sa(e,t.fromCache,r,i)}}/**
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
 */class Zw{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class eb{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return Em()?8:Iv(Se())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next((a=>{s.result=a})).next((()=>{if(!s.result)return this.ps(e,t,i,r).next((a=>{s.result=a}))})).next((()=>{if(s.result)return;const a=new Zw;return this.ys(e,t,a).next((c=>{if(s.result=c,this.As)return this.ws(e,t,a,c.size)}))})).next((()=>s.result))}ws(e,t,r,i){return r.documentReadCount<this.Vs?(xn()<=W.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",Dn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(xn()<=W.DEBUG&&O("QueryEngine","Query:",Dn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(xn()<=W.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",Dn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,st(t))):C.resolve())}gs(e,t){if(iu(t))return C.resolve(null);let r=st(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=Ki(t,null,"F"),r=st(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const a=G(...s);return this.fs.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const d=this.Ss(t,c);return this.bs(t,d,a,u.readTime)?this.gs(e,Ki(t,null,"F")):this.Ds(e,d,t,u)}))))})))))}ps(e,t,r,i){return iu(t)||i.isEqual($.min())?C.resolve(null):this.fs.getDocuments(e,r).next((s=>{const a=this.Ss(t,s);return this.bs(t,a,r,i)?C.resolve(null):(xn()<=W.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Dn(t)),this.Ds(e,a,t,vv(i,Lr)).next((c=>c)))}))}Ss(e,t){let r=new ye(Dd(e));return t.forEach(((i,s)=>{gs(e,s)&&(r=r.add(s))})),r}bs(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return xn()<=W.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",Dn(t)),this.fs.getDocumentsMatchingQuery(e,t,Ut.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((a=>{s=s.insert(a.key,a)})),s)))}}/**
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
 */const Pa="LocalStore",tb=3e8;class nb{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new ae(H),this.Fs=new In((s=>ya(s)),_a),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jw(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function rb(n,e,t,r){return new nb(n,e,t,r)}async function rf(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const a=[],c=[];let u=G();for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of s){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((d=>({Ns:d,removedBatchIds:a,addedBatchIds:c})))}))}))}function ib(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return(function(c,u,d,f){const y=d.batch,E=y.keys();let R=C.resolve();return E.forEach((k=>{R=R.next((()=>f.getEntry(u,k))).next((D=>{const x=d.docVersions.get(k);X(x!==null,48541),D.version.compareTo(x)<0&&(y.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),f.addEntry(D)))}))})),R.next((()=>c.mutationQueue.removeMutationBatch(u,y)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let u=G();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function sf(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function sb(n,e){const t=q(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach(((f,y)=>{const E=i.get(y);if(!E)return;c.push(t.li.removeMatchingKeys(s,f.removedDocuments,y).next((()=>t.li.addMatchingKeys(s,f.addedDocuments,y))));let R=E.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(y)!==null?R=R.withResumeToken(Ee.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,r)),i=i.insert(y,R),(function(D,x,B){return D.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=tb?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0})(E,R,f)&&c.push(t.li.updateTargetData(s,R))}));let u=wt(),d=G();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))})),c.push(ob(s,a,e.documentUpdates).next((f=>{u=f.Bs,d=f.Ls}))),!r.isEqual($.min())){const f=t.li.getLastRemoteSnapshotVersion(s).next((y=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r)));c.push(f)}return C.waitFor(c).next((()=>a.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,u,d))).next((()=>u))})).then((s=>(t.vs=i,s)))}function ob(n,e,t){let r=G(),i=G();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let a=wt();return t.forEach(((c,u)=>{const d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):O(Pa,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)})),{Bs:a,Ls:i}}))}function ab(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=pa),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function cb(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.li.getTargetData(r,e).next((s=>s?(i=s,C.resolve(i)):t.li.allocateTargetId(r).next((a=>(i=new Dt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function Wo(n,e,t){const r=q(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(a=>r.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!Xn(a))throw a;O(Pa,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function yu(n,e,t){const r=q(n);let i=$.min(),s=G();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,d,f){const y=q(u),E=y.Fs.get(f);return E!==void 0?C.resolve(y.vs.get(E)):y.li.getTargetData(d,f)})(r,a,st(e)).next((c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,c.targetId).next((u=>{s=u}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:$.min(),t?s:G()))).next((c=>(lb(r,Kv(e),c),{documents:c,ks:s})))))}function lb(n,e,t){let r=n.Ms.get(e)||$.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.Ms.set(e,r)}class _u{constructor(){this.activeTargetIds=ew()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ub{constructor(){this.vo=new _u,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new _u,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class hb{Mo(e){}shutdown(){}}/**
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
 */const vu="ConnectivityMonitor";class wu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){O(vu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){O(vu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Ti=null;function Ho(){return Ti===null?Ti=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ti++,"0x"+Ti.toString(16)}/**
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
 */const go="RestConnection",db={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class fb{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===Wi?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=Ho(),c=this.Qo(e,t.toUriEncodedString());O(go,`Sending RPC '${e}' ${a}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,i,s);const{host:d}=new URL(c),f=En(d);return this.zo(e,c,u,r,f).then((y=>(O(go,`Received RPC '${e}' ${a}: `,y),y)),(y=>{throw mn(go,`RPC '${e}' ${a} failed with error: `,y,"url: ",c,"request:",r),y}))}jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Yn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((i,s)=>e[s]=i)),r&&r.headers.forEach(((i,s)=>e[s]=i))}Qo(e,t){const r=db[e];let i=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */class pb{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const Ie="WebChannelConnection",_r=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(i){setTimeout((()=>{throw i}),0)}}))};class Fn extends fb{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Fn.c_){const e=cd();_r(e,ad.STAT_EVENT,(t=>{t.stat===Vo.PROXY?O(Ie,"STAT_EVENT: detected buffering proxy"):t.stat===Vo.NOPROXY&&O(Ie,"STAT_EVENT: detected no buffering proxy")})),Fn.c_=!0}}zo(e,t,r,i,s){const a=Ho();return new Promise(((c,u)=>{const d=new sd;d.setWithCredentials(!0),d.listenOnce(od.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case ki.NO_ERROR:const y=d.getResponseJson();O(Ie,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),c(y);break;case ki.TIMEOUT:O(Ie,`RPC '${e}' ${a} timed out`),u(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case ki.HTTP_ERROR:const E=d.getStatus();if(O(Ie,`RPC '${e}' ${a} failed with status:`,E,"response text:",d.getResponseText()),E>0){let R=d.getResponseJson();Array.isArray(R)&&(R=R[0]);const k=R==null?void 0:R.error;if(k&&k.status&&k.message){const D=(function(B){const F=B.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(F)>=0?F:P.UNKNOWN})(k.status);u(new V(D,k.message))}else u(new V(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else u(new V(P.UNAVAILABLE,"Connection failed."));break;default:U(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{O(Ie,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(i);O(Ie,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",f,r,15)}))}T_(e,t,r){const i=Ho(),s=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const d=s.join("");O(Ie,`Creating RPC '${e}' stream ${i}: ${d}`,c);const f=a.createWebChannel(d,c);this.E_(f);let y=!1,E=!1;const R=new pb({Jo:k=>{E?O(Ie,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(y||(O(Ie,`Opening RPC '${e}' stream ${i} transport.`),f.open(),y=!0),O(Ie,`RPC '${e}' stream ${i} sending:`,k),f.send(k))},Ho:()=>f.close()});return _r(f,Er.EventType.OPEN,(()=>{E||(O(Ie,`RPC '${e}' stream ${i} transport opened.`),R.i_())})),_r(f,Er.EventType.CLOSE,(()=>{E||(E=!0,O(Ie,`RPC '${e}' stream ${i} transport closed`),R.o_(),this.I_(f))})),_r(f,Er.EventType.ERROR,(k=>{E||(E=!0,mn(Ie,`RPC '${e}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),R.o_(new V(P.UNAVAILABLE,"The operation could not be completed")))})),_r(f,Er.EventType.MESSAGE,(k=>{var D;if(!E){const x=k.data[0];X(!!x,16349);const B=x,F=(B==null?void 0:B.error)||((D=B[0])==null?void 0:D.error);if(F){O(Ie,`RPC '${e}' stream ${i} received error:`,F);const z=F.status;let Y=(function(b){const g=de[b];if(g!==void 0)return jd(g)})(z),Z=F.message;z==="NOT_FOUND"&&Z.includes("database")&&Z.includes("does not exist")&&Z.includes(this.databaseId.database)&&mn(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Y===void 0&&(Y=P.INTERNAL,Z="Unknown error status: "+z+" with message "+F.message),E=!0,R.o_(new V(Y,Z)),f.close()}else O(Ie,`RPC '${e}' stream ${i} received:`,x),R.__(x)}})),Fn.u_(),setTimeout((()=>{R.s_()}),0),R}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ld()}}/**
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
 */function mb(n){return new Fn(n)}function yo(){return typeof document<"u"?document:null}/**
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
 */function ws(n){return new vw(n,!0)}/**
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
 */Fn.c_=!1;class of{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const bu="PersistentStream";class af{constructor(e,t,r,i,s,a,c,u){this.Ci=e,this.S_=r,this.b_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new of(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(vt(t.toString()),vt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.D_===t&&this.G_(r,i)}),(r=>{e((()=>{const i=new V(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((i=>{r((()=>this.z_(i)))})),this.stream.onMessage((i=>{r((()=>++this.F_==1?this.J_(i):this.onNext(i)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return O(bu,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(O(bu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class gb extends af{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Ew(this.serializer,e),r=(function(s){if(!("targetChange"in s))return $.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?ot(a.readTime):$.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=jo(this.serializer),t.addTarget=(function(s,a){let c;const u=a.target;if(c=Fo(u)?{documents:Aw(s,u)}:{query:Rw(s,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Gd(s,a.resumeToken);const d=qo(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo($.min())>0){c.readTime=Yi(s,a.snapshotVersion.toTimestamp());const d=qo(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,e);const r=Pw(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=jo(this.serializer),t.removeTarget=e,this.q_(t)}}class yb extends af{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Iw(e.writeResults,e.commitTime),r=ot(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=jo(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Tw(this.serializer,r)))};this.q_(t)}}/**
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
 */class _b{}class vb extends _b{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,a])=>this.connection.Wo(e,Bo(t,r),i,s,a))).catch((s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(P.UNKNOWN,s.toString())}))}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.jo(e,Bo(t,r),i,a,c,s))).catch((a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(P.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function wb(n,e,t,r){return new vb(n,e,t,r)}class bb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(vt(t),this.aa=!1):O("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const gn="RemoteStore";class Eb{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{An(this)&&(O(gn,"Restarting streams for network reachability change."),await(async function(u){const d=q(u);d.Ia.add(4),await Xr(d),d.Va.set("Unknown"),d.Ia.delete(4),await bs(d)})(this))}))})),this.Va=new bb(r,i)}}async function bs(n){if(An(n))for(const e of n.Ra)await e(!0)}async function Xr(n){for(const e of n.Ra)await e(!1)}function cf(n,e){const t=q(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),Da(t)?xa(t):er(t).O_()&&ka(t,e))}function Ca(n,e){const t=q(n),r=er(t);t.Ea.delete(e),r.O_()&&lf(t,e),t.Ea.size===0&&(r.O_()?r.L_():An(t)&&t.Va.set("Unknown"))}function ka(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}er(n).Z_(e)}function lf(n,e){n.da.$e(e),er(n).X_(e)}function xa(n){n.da=new mw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),er(n).start(),n.Va.ua()}function Da(n){return An(n)&&!er(n).x_()&&n.Ea.size>0}function An(n){return q(n).Ia.size===0}function uf(n){n.da=void 0}async function Tb(n){n.Va.set("Online")}async function Ib(n){n.Ea.forEach(((e,t)=>{ka(n,e)}))}async function Ab(n,e){uf(n),Da(n)?(n.Va.ha(e),xa(n)):n.Va.set("Unknown")}async function Rb(n,e,t){if(n.Va.set("Online"),e instanceof Hd&&e.state===2&&e.cause)try{await(async function(i,s){const a=s.cause;for(const c of s.targetIds)i.Ea.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ea.delete(c),i.da.removeTarget(c))})(n,e)}catch(r){O(gn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Xi(n,r)}else if(e instanceof Vi?n.da.Xe(e):e instanceof Wd?n.da.st(e):n.da.tt(e),!t.isEqual($.min()))try{const r=await sf(n.localStore);t.compareTo(r)>=0&&await(function(s,a){const c=s.da.Tt(a);return c.targetChanges.forEach(((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ea.get(d);f&&s.Ea.set(d,f.withResumeToken(u.resumeToken,a))}})),c.targetMismatches.forEach(((u,d)=>{const f=s.Ea.get(u);if(!f)return;s.Ea.set(u,f.withResumeToken(Ee.EMPTY_BYTE_STRING,f.snapshotVersion)),lf(s,u);const y=new Dt(f.target,u,d,f.sequenceNumber);ka(s,y)})),s.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){O(gn,"Failed to raise snapshot:",r),await Xi(n,r)}}async function Xi(n,e,t){if(!Xn(e))throw e;n.Ia.add(1),await Xr(n),n.Va.set("Offline"),t||(t=()=>sf(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{O(gn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await bs(n)}))}function hf(n,e){return e().catch((t=>Xi(n,t,e)))}async function Es(n){const e=q(n),t=Bt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:pa;for(;Sb(e);)try{const i=await ab(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,Pb(e,i)}catch(i){await Xi(e,i)}df(e)&&ff(e)}function Sb(n){return An(n)&&n.Ta.length<10}function Pb(n,e){n.Ta.push(e);const t=Bt(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function df(n){return An(n)&&!Bt(n).x_()&&n.Ta.length>0}function ff(n){Bt(n).start()}async function Cb(n){Bt(n).ra()}async function kb(n){const e=Bt(n);for(const t of n.Ta)e.ea(t.mutations)}async function xb(n,e,t){const r=n.Ta.shift(),i=Ea.from(r,e,t);await hf(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await Es(n)}async function Db(n,e){e&&Bt(n).Y_&&await(async function(r,i){if((function(a){return dw(a)&&a!==P.ABORTED})(i.code)){const s=r.Ta.shift();Bt(r).B_(),await hf(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Es(r)}})(n,e),df(n)&&ff(n)}async function Eu(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),O(gn,"RemoteStore received new credentials");const r=An(t);t.Ia.add(3),await Xr(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await bs(t)}async function Nb(n,e){const t=q(n);e?(t.Ia.delete(2),await bs(t)):e||(t.Ia.add(2),await Xr(t),t.Va.set("Unknown"))}function er(n){return n.ma||(n.ma=(function(t,r,i){const s=q(t);return s.sa(),new gb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:Tb.bind(null,n),Yo:Ib.bind(null,n),t_:Ab.bind(null,n),H_:Rb.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),Da(n)?xa(n):n.Va.set("Unknown")):(await n.ma.stop(),uf(n))}))),n.ma}function Bt(n){return n.fa||(n.fa=(function(t,r,i){const s=q(t);return s.sa(),new yb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:Cb.bind(null,n),t_:Db.bind(null,n),ta:kb.bind(null,n),na:xb.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await Es(n)):(await n.fa.stop(),n.Ta.length>0&&(O(gn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
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
 */class Na{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,c=new Na(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Va(n,e){if(vt("AsyncQueue",`${e}: ${n}`),Xn(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class $n{static emptySet(e){return new $n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Tr(),this.sortedSet=new ae(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $n)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new $n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Tu{constructor(){this.ga=new ae(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):U(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Gn{constructor(e,t,r,i,s,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new Gn(e,t,$n.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ms(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class Vb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Ob{constructor(){this.queries=Iu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=q(t),s=i.queries;i.queries=Iu(),s.forEach(((a,c)=>{for(const u of c.Sa)u.onError(r)}))})(this,new V(P.ABORTED,"Firestore shutting down"))}}function Iu(){return new In((n=>xd(n)),ms)}async function pf(n,e){const t=q(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.ba()&&e.Da()&&(r=2):(s=new Vb,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=Va(a,`Initialization of query '${Dn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.Sa.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Oa(t)}async function mf(n,e){const t=q(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.Sa.indexOf(e);a>=0&&(s.Sa.splice(a,1),s.Sa.length===0?i=e.Da()?0:1:!s.ba()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Lb(n,e){const t=q(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.Sa)c.Fa(i)&&(r=!0);a.wa=i}}r&&Oa(t)}function Mb(n,e,t){const r=q(n),i=r.queries.get(e);if(i)for(const s of i.Sa)s.onError(t);r.queries.delete(e)}function Oa(n){n.Ca.forEach((e=>{e.next()}))}var Go,Au;(Au=Go||(Go={})).Ma="default",Au.Cache="cache";class gf{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Gn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Gn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Go.Cache}}/**
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
 */class yf{constructor(e){this.key=e}}class _f{constructor(e){this.key=e}}class Ub{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=G(),this.mutatedKeys=G(),this.eu=Dd(e),this.tu=new $n(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Tu,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,y)=>{const E=i.get(f),R=gs(this.query,y)?y:null,k=!!E&&this.mutatedKeys.has(E.key),D=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let x=!1;E&&R?E.data.isEqual(R.data)?k!==D&&(r.track({type:3,doc:R}),x=!0):this.su(E,R)||(r.track({type:2,doc:R}),x=!0,(u&&this.eu(R,u)>0||d&&this.eu(R,d)<0)&&(c=!0)):!E&&R?(r.track({type:0,doc:R}),x=!0):E&&!R&&(r.track({type:1,doc:E}),x=!0,(u||d)&&(c=!0)),x&&(R?(a=a.add(R),s=D?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,bs:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((f,y)=>(function(R,k){const D=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U(20277,{Vt:x})}};return D(R)-D(k)})(f.type,y.type)||this.eu(f.doc,y.doc))),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],u=this.Ya.size===0&&this.current&&!i?1:0,d=u!==this.Xa;return this.Xa=u,a.length!==0||d?{snapshot:new Gn(this.query,e.tu,s,a,e.mutatedKeys,u===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Tu,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=G(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new _f(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new yf(r))})),t}cu(e){this.Za=e.ks,this.Ya=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Gn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const La="SyncEngine";class Fb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class $b{constructor(e){this.key=e,this.hu=!1}}class qb{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new In((c=>xd(c)),ms),this.Eu=new Map,this.Iu=new Set,this.Ru=new ae(L.comparator),this.Au=new Map,this.Vu=new Aa,this.du={},this.mu=new Map,this.fu=Hn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Bb(n,e,t=!0){const r=If(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await vf(r,e,t,!0),i}async function zb(n,e){const t=If(n);await vf(t,e,!0,!1)}async function vf(n,e,t,r){const i=await cb(n.localStore,st(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await jb(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&cf(n.remoteStore,i),c}async function jb(n,e,t,r,i){n.pu=(y,E,R)=>(async function(D,x,B,F){let z=x.view.ru(B);z.bs&&(z=await yu(D.localStore,x.query,!1).then((({documents:b})=>x.view.ru(b,z))));const Y=F&&F.targetChanges.get(x.targetId),Z=F&&F.targetMismatches.get(x.targetId)!=null,ee=x.view.applyChanges(z,D.isPrimaryClient,Y,Z);return Su(D,x.targetId,ee.au),ee.snapshot})(n,y,E,R);const s=await yu(n.localStore,e,!0),a=new Ub(e,s.ks),c=a.ru(s.documents),u=Jr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,u);Su(n,t,d.au);const f=new Fb(e,t,a);return n.Tu.set(e,f),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),d.snapshot}async function Wb(n,e,t){const r=q(n),i=r.Tu.get(e),s=r.Eu.get(i.targetId);if(s.length>1)return r.Eu.set(i.targetId,s.filter((a=>!ms(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Wo(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Ca(r.remoteStore,i.targetId),Ko(r,i.targetId)})).catch(Jn)):(Ko(r,i.targetId),await Wo(r.localStore,i.targetId,!0))}async function Hb(n,e){const t=q(n),r=t.Tu.get(e),i=t.Eu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ca(t.remoteStore,r.targetId))}async function Gb(n,e,t){const r=eE(n);try{const i=await(function(a,c){const u=q(a),d=ie.now(),f=c.reduce(((R,k)=>R.add(k.key)),G());let y,E;return u.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let k=wt(),D=G();return u.xs.getEntries(R,f).next((x=>{k=x,k.forEach(((B,F)=>{F.isValidDocument()||(D=D.add(B))}))})).next((()=>u.localDocuments.getOverlayedDocuments(R,k))).next((x=>{y=x;const B=[];for(const F of c){const z=aw(F,y.get(F.key).overlayedDocument);z!=null&&B.push(new Qt(F.key,z,Td(z.value.mapValue),je.exists(!0)))}return u.mutationQueue.addMutationBatch(R,d,B,c)})).next((x=>{E=x;const B=x.applyToLocalDocumentSet(y,D);return u.documentOverlayCache.saveOverlays(R,x.batchId,B)}))})).then((()=>({batchId:E.batchId,changes:Vd(y)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(a,c,u){let d=a.du[a.currentUser.toKey()];d||(d=new ae(H)),d=d.insert(c,u),a.du[a.currentUser.toKey()]=d})(r,i.batchId,t),await Zr(r,i.changes),await Es(r.remoteStore)}catch(i){const s=Va(i,"Failed to persist write");t.reject(s)}}async function wf(n,e){const t=q(n);try{const r=await sb(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const a=t.Au.get(s);a&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.hu=!0:i.modifiedDocuments.size>0?X(a.hu,14607):i.removedDocuments.size>0&&(X(a.hu,42227),a.hu=!1))})),await Zr(t,r,e)}catch(r){await Jn(r)}}function Ru(n,e,t){const r=q(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach(((s,a)=>{const c=a.view.va(e);c.snapshot&&i.push(c.snapshot)})),(function(a,c){const u=q(a);u.onlineState=c;let d=!1;u.queries.forEach(((f,y)=>{for(const E of y.Sa)E.va(c)&&(d=!0)})),d&&Oa(u)})(r.eventManager,e),i.length&&r.Pu.H_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Kb(n,e,t){const r=q(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let a=new ae(L.comparator);a=a.insert(s,Re.newNoDocument(s,$.min()));const c=G().add(s),u=new vs($.min(),new Map,new ae(H),a,c);await wf(r,u),r.Ru=r.Ru.remove(s),r.Au.delete(e),Ma(r)}else await Wo(r.localStore,e,!1).then((()=>Ko(r,e,t))).catch(Jn)}async function Qb(n,e){const t=q(n),r=e.batch.batchId;try{const i=await ib(t.localStore,e);Ef(t,r,null),bf(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Zr(t,i)}catch(i){await Jn(i)}}async function Yb(n,e,t){const r=q(n);try{const i=await(function(a,c){const u=q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next((y=>(X(y!==null,37113),f=y.keys(),u.mutationQueue.removeMutationBatch(d,y)))).next((()=>u.mutationQueue.performConsistencyCheck(d))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f))).next((()=>u.localDocuments.getDocuments(d,f)))}))})(r.localStore,e);Ef(r,e,t),bf(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Zr(r,i)}catch(i){await Jn(i)}}function bf(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function Ef(n,e,t){const r=q(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function Ko(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||Tf(n,r)}))}function Tf(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Ca(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Ma(n))}function Su(n,e,t){for(const r of t)r instanceof yf?(n.Vu.addReference(r.key,e),Jb(n,r)):r instanceof _f?(O(La,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Tf(n,r.key)):U(19791,{wu:r})}function Jb(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(O(La,"New document in limbo: "+t),n.Iu.add(r),Ma(n))}function Ma(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(ne.fromString(e)),r=n.fu.next();n.Au.set(r,new $b(t)),n.Ru=n.Ru.insert(t,r),cf(n.remoteStore,new Dt(st(va(t.path)),r,"TargetPurposeLimboResolution",ds.ce))}}async function Zr(n,e,t){const r=q(n),i=[],s=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,u)=>{a.push(r.pu(u,e,t).then((d=>{var f;if((d||t)&&r.isPrimaryClient){const y=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,y?"current":"not-current")}if(d){i.push(d);const y=Sa.Is(u.targetId,d);s.push(y)}})))})),await Promise.all(a),r.Pu.H_(i),await(async function(u,d){const f=q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>C.forEach(d,(E=>C.forEach(E.Ts,(R=>f.persistence.referenceDelegate.addReference(y,E.targetId,R))).next((()=>C.forEach(E.Es,(R=>f.persistence.referenceDelegate.removeReference(y,E.targetId,R)))))))))}catch(y){if(!Xn(y))throw y;O(Pa,"Failed to update sequence numbers: "+y)}for(const y of d){const E=y.targetId;if(!y.fromCache){const R=f.vs.get(E),k=R.snapshotVersion,D=R.withLastLimboFreeSnapshotVersion(k);f.vs=f.vs.insert(E,D)}}})(r.localStore,s))}async function Xb(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){O(La,"User change. New user:",e.toKey());const r=await rf(t.localStore,e);t.currentUser=e,(function(s,a){s.mu.forEach((c=>{c.forEach((u=>{u.reject(new V(P.CANCELLED,a))}))})),s.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Zr(t,r.Ns)}}function Zb(n,e){const t=q(n),r=t.Au.get(e);if(r&&r.hu)return G().add(r.key);{let i=G();const s=t.Eu.get(e);if(!s)return i;for(const a of s){const c=t.Tu.get(a);i=i.unionWith(c.view.nu)}return i}}function If(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=wf.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Zb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Kb.bind(null,e),e.Pu.H_=Lb.bind(null,e.eventManager),e.Pu.yu=Mb.bind(null,e.eventManager),e}function eE(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Qb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Yb.bind(null,e),e}class Zi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ws(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return rb(this.persistence,new eb,e.initialUser,this.serializer)}Cu(e){return new nf(Ra.Vi,this.serializer)}Du(e){return new ub}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Zi.provider={build:()=>new Zi};class tE extends Zi{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){X(this.persistence.referenceDelegate instanceof Ji,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Fw(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new nf((r=>Ji.Vi(r,t)),this.serializer)}}class Qo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ru(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xb.bind(null,this.syncEngine),await Nb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Ob})()}createDatastore(e){const t=ws(e.databaseInfo.databaseId),r=mb(e.databaseInfo);return wb(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,a,c){return new Eb(r,i,s,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ru(this.syncEngine,t,0)),(function(){return wu.v()?new wu:new hb})())}createSyncEngine(e,t){return(function(i,s,a,c,u,d,f){const y=new qb(i,s,a,c,u,d);return f&&(y.gu=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=q(i);O(gn,"RemoteStore shutting down."),s.Ia.add(5),await Xr(s),s.Aa.shutdown(),s.Va.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Qo.provider={build:()=>new Qo};/**
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
 */class Af{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):vt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */const zt="FirestoreClient";class nE{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=Ae.UNAUTHENTICATED,this.clientId=fa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async a=>{O(zt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(O(zt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Va(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function _o(n,e){n.asyncQueue.verifyOperationInProgress(),O(zt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await rf(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Pu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await rE(n);O(zt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Eu(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>Eu(e.remoteStore,i))),n._onlineComponents=e}async function rE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(zt,"Using user provided OfflineComponentProvider");try{await _o(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;mn("Error using user provided cache. Falling back to memory cache: "+t),await _o(n,new Zi)}}else O(zt,"Using default OfflineComponentProvider"),await _o(n,new tE(void 0));return n._offlineComponents}async function Rf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(zt,"Using user provided OnlineComponentProvider"),await Pu(n,n._uninitializedComponentsProvider._online)):(O(zt,"Using default OnlineComponentProvider"),await Pu(n,new Qo))),n._onlineComponents}function iE(n){return Rf(n).then((e=>e.syncEngine))}async function Sf(n){const e=await Rf(n),t=e.eventManager;return t.onListen=Bb.bind(null,e.syncEngine),t.onUnlisten=Wb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=zb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Hb.bind(null,e.syncEngine),t}function sE(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,a,c,u,d){const f=new Af({next:E=>{f.Nu(),a.enqueueAndForget((()=>mf(s,y)));const R=E.docs.has(c);!R&&E.fromCache?d.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&E.fromCache&&u&&u.source==="server"?d.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(E)},error:E=>d.reject(E)}),y=new gf(va(c.path),f,{includeMetadataChanges:!0,qa:!0});return pf(s,y)})(await Sf(n),n.asyncQueue,e,t,r))),r.promise}function oE(n,e,t={}){const r=new pt;return n.asyncQueue.enqueueAndForget((async()=>(function(s,a,c,u,d){const f=new Af({next:E=>{f.Nu(),a.enqueueAndForget((()=>mf(s,y))),E.fromCache&&u.source==="server"?d.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(E)},error:E=>d.reject(E)}),y=new gf(c,f,{includeMetadataChanges:!0,qa:!0});return pf(s,y)})(await Sf(n),n.asyncQueue,e,t,r))),r.promise}function aE(n,e){const t=new pt;return n.asyncQueue.enqueueAndForget((async()=>Gb(await iE(n),e,t))),t.promise}/**
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
 */function Pf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const cE="ComponentProvider",Cu=new Map;function lE(n,e,t,r,i){return new Cv(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Pf(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
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
 */const Cf="firestore.googleapis.com",ku=!0;class xu{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Cf,this.ssl=ku}else this.host=e.host,this.ssl=e.ssl??ku;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=tf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Mw)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}yv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Pf(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ts{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new xu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new xu(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new av;switch(r.type){case"firstParty":return new hv(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Cu.get(t);r&&(O(cE,"Removing Datastore"),Cu.delete(t),r.terminate())})(this),Promise.resolve()}}function uE(n,e,t,r={}){var d;n=Xe(n,Ts);const i=En(e),s=n._getSettings(),a={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&ea(`https://${c}`),s.host!==Cf&&s.host!==c&&mn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:c,ssl:i,emulatorOptions:r};if(!Mt(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,y;if(typeof r.mockUserToken=="string")f=r.mockUserToken,y=Ae.MOCK_USER;else{f=mh(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const E=r.mockUserToken.sub||r.mockUserToken.user_id;if(!E)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");y=new Ae(E)}n._authCredentials=new cv(new hd(f,y))}}/**
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
 */class Yt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Yt(this.firestore,e,this._query)}}class he{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new he(this.firestore,e,this._key)}toJSON(){return{type:he._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Qr(t,he._jsonSchema))return new he(e,r||null,new L(ne.fromString(t.referencePath)))}}he._jsonSchemaVersion="firestore/documentReference/1.0",he._jsonSchema={type:pe("string",he._jsonSchemaVersion),referencePath:pe("string")};class Lt extends Yt{constructor(e,t,r){super(e,t,va(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new he(this.firestore,null,new L(e))}withConverter(e){return new Lt(this.firestore,e,this._path)}}function Ue(n,e,...t){if(n=se(n),dd("collection","path",e),n instanceof Ts){const r=ne.fromString(e,...t);return jl(r),new Lt(n,null,r)}{if(!(n instanceof he||n instanceof Lt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return jl(r),new Lt(n.firestore,null,r)}}function ge(n,e,...t){if(n=se(n),arguments.length===1&&(e=fa.newId()),dd("doc","path",e),n instanceof Ts){const r=ne.fromString(e,...t);return zl(r),new he(n,null,new L(r))}{if(!(n instanceof he||n instanceof Lt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ne.fromString(e,...t));return zl(r),new he(n.firestore,n instanceof Lt?n.converter:null,new L(r))}}/**
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
 */const Du="AsyncQueue";class Nu{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new of(this,"async_queue_retry"),this._c=()=>{const r=yo();r&&O(Du,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=yo();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=yo();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new pt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Xn(e))throw e;O(Du,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,vt("INTERNAL UNHANDLED ERROR: ",Vu(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=Na.createAndSchedule(this,e,t,r,(s=>this.hc(s)));return this.tc.push(i),i}uc(){this.nc&&U(47125,{Pc:Vu(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Vu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Rn extends Ts{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Nu,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Nu(e),this._firestoreClient=void 0,await e}}}function hE(n,e){const t=typeof n=="object"?n:as(),r=typeof n=="string"?n:Wi,i=jt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=dh("firestore");s&&uE(i,...s)}return i}function Ua(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||dE(n),n._firestoreClient}function dE(n){var r,i,s,a;const e=n._freezeSettings(),t=lE(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((a=e.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new nE(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(u){const d=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(d),_online:d}})(n._componentsProvider))}/**
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
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze(Ee.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze(Ee.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Qr(e,ze._jsonSchema))return ze.fromBase64String(e.bytes)}}ze._jsonSchemaVersion="firestore/bytes/1.0",ze._jsonSchema={type:pe("string",ze._jsonSchemaVersion),bytes:pe("string")};/**
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
 */class Fa{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new be(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Is{constructor(e){this._methodName=e}}/**
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
 */class at{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return H(this._lat,e._lat)||H(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:at._jsonSchemaVersion}}static fromJSON(e){if(Qr(e,at._jsonSchema))return new at(e.latitude,e.longitude)}}at._jsonSchemaVersion="firestore/geoPoint/1.0",at._jsonSchema={type:pe("string",at._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
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
 */class Ye{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Ye._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Qr(e,Ye._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Ye(e.vectorValues);throw new V(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ye._jsonSchemaVersion="firestore/vectorValue/1.0",Ye._jsonSchema={type:pe("string",Ye._jsonSchemaVersion),vectorValues:pe("object")};/**
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
 */const fE=/^__.*__$/;class pE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Qt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Yr(e,this.data,t,this.fieldTransforms)}}class kf{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Qt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function xf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U(40011,{dataSource:n})}}class $a{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new $a({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return es(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(xf(this.dataSource)&&fE.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class mE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ws(e)}A(e,t,r,i=!1){return new $a({dataSource:e,methodName:t,targetDoc:r,path:be.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function As(n){const e=n._freezeSettings(),t=ws(n._databaseId);return new mE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Df(n,e,t,r,i,s={}){const a=n.A(s.merge||s.mergeFields?2:0,e,t,i);Ba("Data must be an object, but it was:",a,r);const c=Nf(r,a);let u,d;if(s.merge)u=new $e(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const y of s.mergeFields){const E=yn(e,y,t);if(!a.contains(E))throw new V(P.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);Lf(f,E)||f.push(E)}u=new $e(f),d=a.fieldTransforms.filter((y=>u.covers(y.field)))}else u=null,d=a.fieldTransforms;return new pE(new Le(c),u,d)}class Rs extends Is{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.yc(`${this._methodName}() can only appear at the top level of your update data`):e.yc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Rs}}class qa extends Is{constructor(e,t){super(e),this.bc=t}_toFieldTransform(e){const t=new zr(e.serializer,Md(e.serializer,this.bc));return new rw(e.path,t)}isEqual(e){return e instanceof qa&&this.bc===e.bc}}function gE(n,e,t,r){const i=n.A(1,e,t);Ba("Data must be an object, but it was:",i,r);const s=[],a=Le.empty();Kt(r,((u,d)=>{const f=Of(e,u,t);d=se(d);const y=i.fc(f);if(d instanceof Rs)s.push(f);else{const E=ei(d,y);E!=null&&(s.push(f),a.set(f,E))}}));const c=new $e(s);return new kf(a,c,i.fieldTransforms)}function yE(n,e,t,r,i,s){const a=n.A(1,e,t),c=[yn(e,r,t)],u=[i];if(s.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let E=0;E<s.length;E+=2)c.push(yn(e,s[E])),u.push(s[E+1]);const d=[],f=Le.empty();for(let E=c.length-1;E>=0;--E)if(!Lf(d,c[E])){const R=c[E];let k=u[E];k=se(k);const D=a.fc(R);if(k instanceof Rs)d.push(R);else{const x=ei(k,D);x!=null&&(d.push(R),f.set(R,x))}}const y=new $e(d);return new kf(f,y,a.fieldTransforms)}function _E(n,e,t,r=!1){return ei(t,n.A(r?4:3,e))}function ei(n,e){if(Vf(n=se(n)))return Ba("Unsupported field value:",e,n),Nf(n,e);if(n instanceof Is)return(function(r,i){if(!xf(i.dataSource))throw i.yc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.yc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(r,i){const s=[];let a=0;for(const c of r){let u=ei(c,i.gc(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=se(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Md(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ie.fromDate(r);return{timestampValue:Yi(i.serializer,s)}}if(r instanceof ie){const s=new ie(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Yi(i.serializer,s)}}if(r instanceof at)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ze)return{bytesValue:Gd(i.serializer,r._byteString)};if(r instanceof he){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ia(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Ye)return(function(a,c){const u=a instanceof Ye?a.toArray():a;return{mapValue:{fields:{[bd]:{stringValue:Ed},[Hi]:{arrayValue:{values:u.map((f=>{if(typeof f!="number")throw c.yc("VectorValues must only contain numeric values.");return wa(c.serializer,f)}))}}}}}})(r,i);if(ef(r))return r._toProto(i.serializer);throw i.yc(`Unsupported field value: ${hs(r)}`)})(n,e)}function Nf(n,e){const t={};return md(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Kt(n,((r,i)=>{const s=ei(i,e.dc(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function Vf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ie||n instanceof at||n instanceof ze||n instanceof he||n instanceof Is||n instanceof Ye||ef(n))}function Ba(n,e,t){if(!Vf(t)||!fd(t)){const r=hs(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function yn(n,e,t){if((e=se(e))instanceof Fa)return e._internalPath;if(typeof e=="string")return Of(n,e);throw es("Field path arguments must be of type string or ",n,!1,void 0,t)}const vE=new RegExp("[~\\*/\\[\\]]");function Of(n,e,t){if(e.search(vE)>=0)throw es(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Fa(...e.split("."))._internalPath}catch{throw es(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function es(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${r}`),a&&(u+=` in document ${i}`),u+=")"),new V(P.INVALID_ARGUMENT,c+n+u)}function Lf(n,e){return n.some((t=>t.isEqual(e)))}/**
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
 */class wE{convertValue(e,t="none"){switch(qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes($t(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Kt(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[Hi].arrayValue)==null?void 0:i.values)==null?void 0:s.map((a=>ue(a.doubleValue)));return new Ye(t)}convertGeoPoint(e){return new at(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ps(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Mr(e));default:return null}}convertTimestamp(e){const t=Ft(e);return new ie(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ne.fromString(e);X(Zd(r),9688,{name:e});const i=new Ur(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(t)||vt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */class Mf extends wE{constructor(e){super(),this.firestore=e}convertBytes(e){return new ze(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new he(this.firestore,null,t)}}function on(n){return new qa("increment",n)}const Ou="@firebase/firestore",Lu="4.13.0";/**
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
 */class Uf{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new he(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new bE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(yn("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class bE extends Uf{data(){return super.data()}}/**
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
 */function EE(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class za{}class ja extends za{}function Jt(n,e,...t){let r=[];e instanceof za&&r.push(e),r=r.concat(t),(function(s){const a=s.filter((u=>u instanceof Wa)).length,c=s.filter((u=>u instanceof Ss)).length;if(a>1||a>0&&c>0)throw new V(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Ss extends ja{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ss(e,t,r)}_apply(e){const t=this._parse(e);return Ff(e._query,t),new Yt(e.firestore,e.converter,$o(e._query,t))}_parse(e){const t=As(e.firestore);return(function(s,a,c,u,d,f,y){let E;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new V(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Uu(y,f);const k=[];for(const D of y)k.push(Mu(u,s,D));E={arrayValue:{values:k}}}else E=Mu(u,s,y)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Uu(y,f),E=_E(c,a,y,f==="in"||f==="not-in");return fe.create(d,f,E)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Kn(n,e,t){const r=e,i=yn("where",n);return Ss._create(i,r,t)}class Wa extends za{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Wa(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Ze.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let a=i;const c=s.getFlattenedFilters();for(const u of c)Ff(a,u),a=$o(a,u)})(e._query,t),new Yt(e.firestore,e.converter,$o(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ha extends ja{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ha(e,t)}_apply(e){const t=(function(i,s,a){if(i.startAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new V(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new $r(s,a)})(e._query,this._field,this._direction);return new Yt(e.firestore,e.converter,Gv(e._query,t))}}function Ps(n,e="asc"){const t=e,r=yn("orderBy",n);return Ha._create(r,t)}class Ga extends ja{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ga(e,t,r)}_apply(e){return new Yt(e.firestore,e.converter,Ki(e._query,this._limit,this._limitType))}}function Ka(n){return _v("limit",n),Ga._create("limit",n,"F")}function Mu(n,e,t){if(typeof(t=se(t))=="string"){if(t==="")throw new V(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!kd(e)&&t.indexOf("/")!==-1)throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ne.fromString(t));if(!L.isDocumentKey(r))throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Xl(n,new L(r))}if(t instanceof he)return Xl(n,t._key);throw new V(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hs(t)}.`)}function Uu(n,e){if(!Array.isArray(n)||n.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Ff(n,e){const t=(function(i,s){for(const a of i)for(const c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new V(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function $f(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Ar{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class un extends Uf{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Oi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(yn("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=un._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}un._jsonSchemaVersion="firestore/documentSnapshot/1.0",un._jsonSchema={type:pe("string",un._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class Oi extends un{data(e={}){return super.data(e)}}class qn{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Ar(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Oi(this._firestore,this._userDataWriter,r.key,r,new Ar(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((c=>{const u=new Oi(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ar(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((c=>s||c.type!==3)).map((c=>{const u=new Oi(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Ar(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:TE(c.type),doc:u,oldIndex:d,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=qn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fa.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach((s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function TE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U(61501,{type:n})}}/**
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
 */qn._jsonSchemaVersion="firestore/querySnapshot/1.0",qn._jsonSchema={type:pe("string",qn._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};/**
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
 */function Qa(n){n=Xe(n,he);const e=Xe(n.firestore,Rn),t=Ua(e);return sE(t,n._key).then((r=>IE(e,n,r)))}function lt(n){n=Xe(n,Yt);const e=Xe(n.firestore,Rn),t=Ua(e),r=new Mf(e);return EE(n._query),oE(t,n._query).then((i=>new qn(e,r,n,i)))}function Cs(n,e,t){n=Xe(n,he);const r=Xe(n.firestore,Rn),i=$f(n.converter,e),s=As(r);return xs(r,[Df(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,je.none())])}function mt(n,e,t,...r){n=Xe(n,he);const i=Xe(n.firestore,Rn),s=As(i);let a;return a=typeof(e=se(e))=="string"||e instanceof Fa?yE(s,"updateDoc",n._key,e,t,r):gE(s,"updateDoc",n._key,e),xs(i,[a.toMutation(n._key,je.exists(!0))])}function qf(n){return xs(Xe(n.firestore,Rn),[new ba(n._key,je.none())])}function ks(n,e){const t=Xe(n.firestore,Rn),r=ge(n),i=$f(n.converter,e),s=As(n.firestore);return xs(t,[Df(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,je.exists(!1))]).then((()=>r))}function xs(n,e){const t=Ua(n);return aE(t,e)}function IE(n,e,t){const r=t.docs.get(e._key),i=new Mf(n);return new un(n,i,e._key,r,new Ar(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){ov(Tn),Je(new We("firestore",((r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),c=new Rn(new lv(r.getProvider("auth-internal")),new dv(a,r.getProvider("app-check-internal")),kv(a,i),a);return s={useFetchStreams:t,...s},c._setSettings(s),c}),"PUBLIC").setMultipleInstances(!0)),Me(Ou,Lu,e),Me(Ou,Lu,"esm2020")})();/**
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
 */const Bf="firebasestorage.googleapis.com",zf="storageBucket",AE=120*1e3,RE=600*1e3,SE=1e3;/**
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
 */class ce extends Ge{constructor(e,t,r=0){super(vo(e),`Firebase Storage: ${t} (${vo(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ce.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return vo(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var oe;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(oe||(oe={}));function vo(n){return"storage/"+n}function Ya(){const n="An unknown error occurred, please check the error payload for server response.";return new ce(oe.UNKNOWN,n)}function PE(n){return new ce(oe.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function CE(n){return new ce(oe.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function kE(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ce(oe.UNAUTHENTICATED,n)}function xE(){return new ce(oe.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function DE(n){return new ce(oe.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function jf(){return new ce(oe.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Wf(){return new ce(oe.CANCELED,"User canceled the upload/download.")}function NE(n){return new ce(oe.INVALID_URL,"Invalid URL '"+n+"'.")}function VE(n){return new ce(oe.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function OE(){return new ce(oe.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+zf+"' property when initializing the app?")}function Hf(){return new ce(oe.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function LE(){return new ce(oe.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function ME(){return new ce(oe.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function UE(n){return new ce(oe.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Yo(n){return new ce(oe.INVALID_ARGUMENT,n)}function Gf(){return new ce(oe.APP_DELETED,"The Firebase app was deleted.")}function FE(n){return new ce(oe.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function xr(n,e){return new ce(oe.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function vr(n){throw new ce(oe.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class qe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=qe.makeFromUrl(e,t)}catch{return new qe(e,"")}if(r.path==="")return r;throw VE(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(Y){Y.path.charAt(Y.path.length-1)==="/"&&(Y.path_=Y.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+i+a,"i"),u={bucket:1,path:3};function d(Y){Y.path_=decodeURIComponent(Y.path)}const f="v[A-Za-z0-9_]+",y=t.replace(/[.]/g,"\\."),E="(/([^?#]*).*)?$",R=new RegExp(`^https?://${y}/${f}/b/${i}/o${E}`,"i"),k={bucket:1,path:3},D=t===Bf?"(?:storage.googleapis.com|storage.cloud.google.com)":t,x="([^?#]*)",B=new RegExp(`^https?://${D}/${i}/${x}`,"i"),z=[{regex:c,indices:u,postModify:s},{regex:R,indices:k,postModify:d},{regex:B,indices:{bucket:1,path:2},postModify:d}];for(let Y=0;Y<z.length;Y++){const Z=z[Y],ee=Z.regex.exec(e);if(ee){const b=ee[Z.indices.bucket];let g=ee[Z.indices.path];g||(g=""),r=new qe(b,g),Z.postModify(r);break}}if(r==null)throw NE(e);return r}}class $E{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function qE(n,e,t){let r=1,i=null,s=null,a=!1,c=0;function u(){return c===2}let d=!1;function f(...x){d||(d=!0,e.apply(null,x))}function y(x){i=setTimeout(()=>{i=null,n(R,u())},x)}function E(){s&&clearTimeout(s)}function R(x,...B){if(d){E();return}if(x){E(),f.call(null,x,...B);return}if(u()||a){E(),f.call(null,x,...B);return}r<64&&(r*=2);let z;c===1?(c=2,z=0):z=(r+Math.random())*1e3,y(z)}let k=!1;function D(x){k||(k=!0,E(),!d&&(i!==null?(x||(c=2),clearTimeout(i),y(0)):x||(c=1)))}return y(0),s=setTimeout(()=>{a=!0,D(!0)},t),D}function BE(n){n(!1)}/**
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
 */function zE(n){return n!==void 0}function jE(n){return typeof n=="function"}function WE(n){return typeof n=="object"&&!Array.isArray(n)}function Ds(n){return typeof n=="string"||n instanceof String}function Fu(n){return Ja()&&n instanceof Blob}function Ja(){return typeof Blob<"u"}function $u(n,e,t,r){if(r<e)throw Yo(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Yo(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function ti(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Kf(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var hn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(hn||(hn={}));/**
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
 */function Qf(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
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
 */class HE{constructor(e,t,r,i,s,a,c,u,d,f,y,E=!0,R=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=d,this.progressCallback_=f,this.connectionFactory_=y,this.retry=E,this.isUsingEmulator=R,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,D)=>{this.resolve_=k,this.reject_=D,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Ii(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const a=c=>{const u=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,d)};this.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(a),this.pendingConnection_=null;const c=s.getErrorCode()===hn.NO_ERROR,u=s.getStatus();if(!c||Qf(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===hn.ABORT;r(!1,new Ii(!1,null,f));return}const d=this.successCodes_.indexOf(u)!==-1;r(!0,new Ii(d,s))})},t=(r,i)=>{const s=this.resolve_,a=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());zE(u)?s(u):s()}catch(u){a(u)}else if(c!==null){const u=Ya();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(i.canceled){const u=this.appDelete_?Gf():Wf();a(u)}else{const u=jf();a(u)}};this.canceled_?t(!1,new Ii(!1,null,!0)):this.backoffId_=qE(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&BE(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ii{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function GE(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function KE(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function QE(n,e){e&&(n["X-Firebase-GMPID"]=e)}function YE(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function JE(n,e,t,r,i,s,a=!0,c=!1){const u=Kf(n.urlParams),d=n.url+u,f=Object.assign({},n.headers);return QE(f,e),GE(f,t),KE(f,s),YE(f,r),new HE(d,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,a,c)}/**
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
 */function XE(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function ZE(...n){const e=XE();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Ja())return new Blob(n);throw new ce(oe.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function eT(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function tT(n){if(typeof atob>"u")throw UE("base-64");return atob(n)}/**
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
 */const rt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class wo{constructor(e,t){this.data=e,this.contentType=t||null}}function nT(n,e){switch(n){case rt.RAW:return new wo(Yf(e));case rt.BASE64:case rt.BASE64URL:return new wo(Jf(n,e));case rt.DATA_URL:return new wo(iT(e),sT(e))}throw Ya()}function Yf(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,a=n.charCodeAt(++t);r=65536|(s&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function rT(n){let e;try{e=decodeURIComponent(n)}catch{throw xr(rt.DATA_URL,"Malformed data URL.")}return Yf(e)}function Jf(n,e){switch(n){case rt.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw xr(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case rt.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw xr(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=tT(e)}catch(i){throw i.message.includes("polyfill")?i:xr(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class Xf{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw xr(rt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=oT(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function iT(n){const e=new Xf(n);return e.base64?Jf(rt.BASE64,e.rest):rT(e.rest)}function sT(n){return new Xf(n).contentType}function oT(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class xt{constructor(e,t){let r=0,i="";Fu(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Fu(this.data_)){const r=this.data_,i=eT(r,e,t);return i===null?null:new xt(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new xt(r,!0)}}static getBlob(...e){if(Ja()){const t=e.map(r=>r instanceof xt?r.data_:r);return new xt(ZE.apply(null,t))}else{const t=e.map(a=>Ds(a)?nT(rt.RAW,a).data:a.data_);let r=0;t.forEach(a=>{r+=a.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)i[s++]=a[c]}),new xt(i,!0)}}uploadData(){return this.data_}}/**
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
 */function Zf(n){let e;try{e=JSON.parse(n)}catch{return null}return WE(e)?e:null}/**
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
 */function aT(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function cT(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function ep(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function lT(n,e){return e}class ke{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||lT}}let Ai=null;function uT(n){return!Ds(n)||n.length<2?n:ep(n)}function tp(){if(Ai)return Ai;const n=[];n.push(new ke("bucket")),n.push(new ke("generation")),n.push(new ke("metageneration")),n.push(new ke("name","fullPath",!0));function e(s,a){return uT(a)}const t=new ke("name");t.xform=e,n.push(t);function r(s,a){return a!==void 0?Number(a):a}const i=new ke("size");return i.xform=r,n.push(i),n.push(new ke("timeCreated")),n.push(new ke("updated")),n.push(new ke("md5Hash",null,!0)),n.push(new ke("cacheControl",null,!0)),n.push(new ke("contentDisposition",null,!0)),n.push(new ke("contentEncoding",null,!0)),n.push(new ke("contentLanguage",null,!0)),n.push(new ke("contentType",null,!0)),n.push(new ke("metadata","customMetadata",!0)),Ai=n,Ai}function hT(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new qe(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function dT(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const a=t[s];r[a.local]=a.xform(r,e[a.server])}return hT(r,n),r}function np(n,e,t){const r=Zf(e);return r===null?null:dT(n,r,t)}function fT(n,e,t,r){const i=Zf(e);if(i===null||!Ds(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const a=encodeURIComponent;return s.split(",").map(d=>{const f=n.bucket,y=n.fullPath,E="/b/"+a(f)+"/o/"+a(y),R=ti(E,t,r),k=Kf({alt:"media",token:d});return R+k})[0]}function rp(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class tr{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function gt(n){if(!n)throw Ya()}function Xa(n,e){function t(r,i){const s=np(n,i,e);return gt(s!==null),s}return t}function pT(n,e){function t(r,i){const s=np(n,i,e);return gt(s!==null),fT(s,i,n.host,n._protocol)}return t}function ni(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=xE():i=kE():t.getStatus()===402?i=CE(n.bucket):t.getStatus()===403?i=DE(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function ip(n){const e=ni(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=PE(n.path)),s.serverResponse=i.serverResponse,s}return t}function mT(n,e,t){const r=e.fullServerUrl(),i=ti(r,n.host,n._protocol),s="GET",a=n.maxOperationRetryTime,c=new tr(i,s,Xa(n,t),a);return c.errorHandler=ip(e),c}function gT(n,e,t){const r=e.fullServerUrl(),i=ti(r,n.host,n._protocol),s="GET",a=n.maxOperationRetryTime,c=new tr(i,s,pT(n,t),a);return c.errorHandler=ip(e),c}function yT(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function sp(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=yT(null,e)),r}function _T(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let z="";for(let Y=0;Y<2;Y++)z=z+Math.random().toString().slice(2);return z}const u=c();a["Content-Type"]="multipart/related; boundary="+u;const d=sp(e,r,i),f=rp(d,t),y="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+d.contentType+`\r
\r
`,E=`\r
--`+u+"--",R=xt.getBlob(y,r,E);if(R===null)throw Hf();const k={name:d.fullPath},D=ti(s,n.host,n._protocol),x="POST",B=n.maxUploadRetryTime,F=new tr(D,x,Xa(n,t),B);return F.urlParams=k,F.headers=a,F.body=R.uploadData(),F.errorHandler=ni(e),F}class ts{constructor(e,t,r,i){this.current=e,this.total=t,this.finalized=!!r,this.metadata=i||null}}function Za(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch{gt(!1)}return gt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function vT(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),a=sp(e,r,i),c={name:a.fullPath},u=ti(s,n.host,n._protocol),d="POST",f={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${r.size()}`,"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},y=rp(a,t),E=n.maxUploadRetryTime;function R(D){Za(D);let x;try{x=D.getResponseHeader("X-Goog-Upload-URL")}catch{gt(!1)}return gt(Ds(x)),x}const k=new tr(u,d,R,E);return k.urlParams=c,k.headers=f,k.body=y,k.errorHandler=ni(e),k}function wT(n,e,t,r){const i={"X-Goog-Upload-Command":"query"};function s(d){const f=Za(d,["active","final"]);let y=null;try{y=d.getResponseHeader("X-Goog-Upload-Size-Received")}catch{gt(!1)}y||gt(!1);const E=Number(y);return gt(!isNaN(E)),new ts(E,r.size(),f==="final")}const a="POST",c=n.maxUploadRetryTime,u=new tr(t,a,s,c);return u.headers=i,u.errorHandler=ni(e),u}const qu=256*1024;function bT(n,e,t,r,i,s,a,c){const u=new ts(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=r.size()),r.size()!==u.total)throw LE();const d=u.total-u.current;let f=d;i>0&&(f=Math.min(f,i));const y=u.current,E=y+f;let R="";f===0?R="finalize":d===f?R="upload, finalize":R="upload";const k={"X-Goog-Upload-Command":R,"X-Goog-Upload-Offset":`${u.current}`},D=r.slice(y,E);if(D===null)throw Hf();function x(Y,Z){const ee=Za(Y,["active","final"]),b=u.current+f,g=r.size();let v;return ee==="final"?v=Xa(e,s)(Y,Z):v=null,new ts(b,g,ee==="final",v)}const B="POST",F=e.maxUploadRetryTime,z=new tr(t,B,x,F);return z.headers=k,z.body=D.uploadData(),z.progressCallback=c||null,z.errorHandler=ni(n),z}const Ve={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function bo(n){switch(n){case"running":case"pausing":case"canceling":return Ve.RUNNING;case"paused":return Ve.PAUSED;case"success":return Ve.SUCCESS;case"canceled":return Ve.CANCELED;case"error":return Ve.ERROR;default:return Ve.ERROR}}/**
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
 */class ET{constructor(e,t,r){if(jE(e)||t!=null||r!=null)this.next=e,this.error=t??void 0,this.complete=r??void 0;else{const s=e;this.next=s.next,this.error=s.error,this.complete=s.complete}}}/**
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
 */function kn(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}class TT{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=hn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=hn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=hn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i,s){if(this.sent_)throw vr("cannot .send() more than once");if(En(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const a in s)s.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,s[a].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw vr("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw vr("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw vr("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw vr("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class IT extends TT{initXhr(){this.xhr_.responseType="text"}}function On(){return new IT}/**
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
 */class AT{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=tp(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=i=>{if(this._request=void 0,this._chunkMultiplier=1,i._codeEquals(oe.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const s=this.isExponentialBackoffExpired();if(Qf(i.status,[]))if(s)i=jf();else{this.sleepTime=Math.max(this.sleepTime*2,SE),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=i,this._transition("error")}},this._metadataErrorHandler=i=>{this._request=void 0,i._codeEquals(oe.CANCELED)?this.completeTransitions_():(this._error=i,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((i,s)=>{this._resolve=i,this._reject=s,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const r=vT(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,On,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._uploadUrl=s,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,r)=>{const i=wT(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(i,On,t,r);this._request=s,s.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=qu*this._chunkMultiplier,t=new ts(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((i,s)=>{let a;try{a=bT(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(u){this._error=u,this._transition("error");return}const c=this._ref.storage._makeRequest(a,On,i,s,!1);this._request=c,c.getPromise().then(u=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(u.current),u.finalized?(this._metadata=u.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){qu*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const r=mT(this._ref.storage,this._ref._location,this._mappings),i=this._ref.storage._makeRequest(r,On,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const r=_T(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,On,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=Wf(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=bo(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,i){const s=new ET(t||void 0,r||void 0,i||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(bo(this._state)){case Ve.SUCCESS:kn(this._resolve.bind(null,this.snapshot))();break;case Ve.CANCELED:case Ve.ERROR:const t=this._reject;kn(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(bo(this._state)){case Ve.RUNNING:case Ve.PAUSED:e.next&&kn(e.next.bind(e,this.snapshot))();break;case Ve.SUCCESS:e.complete&&kn(e.complete.bind(e))();break;case Ve.CANCELED:case Ve.ERROR:e.error&&kn(e.error.bind(e,this._error))();break;default:e.error&&kn(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
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
 */class _n{constructor(e,t){this._service=e,t instanceof qe?this._location=t:this._location=qe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new _n(e,t)}get root(){const e=new qe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return ep(this._location.path)}get storage(){return this._service}get parent(){const e=aT(this._location.path);if(e===null)return null;const t=new qe(this._location.bucket,e);return new _n(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw FE(e)}}function RT(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new AT(n,new xt(e),t)}function ST(n){n._throwIfRoot("getDownloadURL");const e=gT(n.storage,n._location,tp());return n.storage.makeRequestWithTokens(e,On).then(t=>{if(t===null)throw ME();return t})}function PT(n,e){const t=cT(n._location.path,e),r=new qe(n._location.bucket,t);return new _n(n.storage,r)}/**
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
 */function CT(n){return/^[A-Za-z]+:\/\//.test(n)}function kT(n,e){return new _n(n,e)}function op(n,e){if(n instanceof ec){const t=n;if(t._bucket==null)throw OE();const r=new _n(t,t._bucket);return e!=null?op(r,e):r}else return e!==void 0?PT(n,e):n}function xT(n,e){if(e&&CT(e)){if(n instanceof ec)return kT(n,e);throw Yo("To use ref(service, url), the first argument must be a Storage instance.")}else return op(n,e)}function Bu(n,e){const t=e==null?void 0:e[zf];return t==null?null:qe.makeFromBucketSpec(t,n)}function DT(n,e,t,r={}){n.host=`${e}:${t}`;const i=En(e);i&&ea(`https://${n.host}/b`),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:mh(s,n.app.options.projectId))}class ec{constructor(e,t,r,i,s,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=a,this._bucket=null,this._host=Bf,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=AE,this._maxUploadRetryTime=RE,this._requests=new Set,i!=null?this._bucket=qe.makeFromBucketSpec(i,this._host):this._bucket=Bu(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=qe.makeFromBucketSpec(this._url,e):this._bucket=Bu(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){$u("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){$u("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new _n(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new $E(Gf());{const a=JE(e,this._appId,r,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const zu="@firebase/storage",ju="0.14.2";/**
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
 */const ap="storage";function NT(n,e,t){return n=se(n),RT(n,e,t)}function VT(n){return n=se(n),ST(n)}function OT(n,e){return n=se(n),xT(n,e)}function LT(n=as(),e){n=se(n);const r=jt(n,ap).getImmediate({identifier:e}),i=dh("storage");return i&&MT(r,...i),r}function MT(n,e,t,r={}){DT(n,e,t,r)}function UT(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new ec(t,r,i,e,Tn)}function FT(){Je(new We(ap,UT,"PUBLIC").setMultipleInstances(!0)),Me(zu,ju,""),Me(zu,ju,"esm2020")}FT();const cp="@firebase/installations",tc="0.6.21";/**
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
 */const lp=1e4,up=`w:${tc}`,hp="FIS_v2",$T="https://firebaseinstallations.googleapis.com/v1",qT=3600*1e3,BT="installations",zT="Installations";/**
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
 */const jT={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},vn=new bn(BT,zT,jT);function dp(n){return n instanceof Ge&&n.code.includes("request-failed")}/**
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
 */function fp({projectId:n}){return`${$T}/projects/${n}/installations`}function pp(n){return{token:n.token,requestStatus:2,expiresIn:HT(n.expiresIn),creationTime:Date.now()}}async function mp(n,e){const r=(await e.json()).error;return vn.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function gp({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function WT(n,{refreshToken:e}){const t=gp(n);return t.append("Authorization",GT(e)),t}async function yp(n){const e=await n();return e.status>=500&&e.status<600?n():e}function HT(n){return Number(n.replace("s","000"))}function GT(n){return`${hp} ${n}`}/**
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
 */async function KT({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=fp(n),i=gp(n),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={fid:t,authVersion:hp,appId:n.appId,sdkVersion:up},c={method:"POST",headers:i,body:JSON.stringify(a)},u=await yp(()=>fetch(r,c));if(u.ok){const d=await u.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:pp(d.authToken)}}else throw await mp("Create Installation",u)}/**
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
 */function _p(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function QT(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const YT=/^[cdef][\w-]{21}$/,Jo="";function JT(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=XT(n);return YT.test(t)?t:Jo}catch{return Jo}}function XT(n){return QT(n).substr(0,22)}/**
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
 */function Ns(n){return`${n.appName}!${n.appId}`}/**
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
 */const vp=new Map;function wp(n,e){const t=Ns(n);bp(t,e),ZT(t,e)}function bp(n,e){const t=vp.get(n);if(t)for(const r of t)r(e)}function ZT(n,e){const t=eI();t&&t.postMessage({key:n,fid:e}),tI()}let ln=null;function eI(){return!ln&&"BroadcastChannel"in self&&(ln=new BroadcastChannel("[Firebase] FID Change"),ln.onmessage=n=>{bp(n.data.key,n.data.fid)}),ln}function tI(){vp.size===0&&ln&&(ln.close(),ln=null)}/**
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
 */const nI="firebase-installations-database",rI=1,wn="firebase-installations-store";let Eo=null;function nc(){return Eo||(Eo=bh(nI,rI,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(wn)}}})),Eo}async function ns(n,e){const t=Ns(n),i=(await nc()).transaction(wn,"readwrite"),s=i.objectStore(wn),a=await s.get(t);return await s.put(e,t),await i.done,(!a||a.fid!==e.fid)&&wp(n,e.fid),e}async function Ep(n){const e=Ns(n),r=(await nc()).transaction(wn,"readwrite");await r.objectStore(wn).delete(e),await r.done}async function Vs(n,e){const t=Ns(n),i=(await nc()).transaction(wn,"readwrite"),s=i.objectStore(wn),a=await s.get(t),c=e(a);return c===void 0?await s.delete(t):await s.put(c,t),await i.done,c&&(!a||a.fid!==c.fid)&&wp(n,c.fid),c}/**
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
 */async function rc(n){let e;const t=await Vs(n.appConfig,r=>{const i=iI(r),s=sI(n,i);return e=s.registrationPromise,s.installationEntry});return t.fid===Jo?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function iI(n){const e=n||{fid:JT(),registrationStatus:0};return Tp(e)}function sI(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(vn.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=oI(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:aI(n)}:{installationEntry:e}}async function oI(n,e){try{const t=await KT(n,e);return ns(n.appConfig,t)}catch(t){throw dp(t)&&t.customData.serverCode===409?await Ep(n.appConfig):await ns(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function aI(n){let e=await Wu(n.appConfig);for(;e.registrationStatus===1;)await _p(100),e=await Wu(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await rc(n);return r||t}return e}function Wu(n){return Vs(n,e=>{if(!e)throw vn.create("installation-not-found");return Tp(e)})}function Tp(n){return cI(n)?{fid:n.fid,registrationStatus:0}:n}function cI(n){return n.registrationStatus===1&&n.registrationTime+lp<Date.now()}/**
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
 */async function lI({appConfig:n,heartbeatServiceProvider:e},t){const r=uI(n,t),i=WT(n,t),s=e.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const a={installation:{sdkVersion:up,appId:n.appId}},c={method:"POST",headers:i,body:JSON.stringify(a)},u=await yp(()=>fetch(r,c));if(u.ok){const d=await u.json();return pp(d)}else throw await mp("Generate Auth Token",u)}function uI(n,{fid:e}){return`${fp(n)}/${e}/authTokens:generate`}/**
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
 */async function ic(n,e=!1){let t;const r=await Vs(n.appConfig,s=>{if(!Ip(s))throw vn.create("not-registered");const a=s.authToken;if(!e&&fI(a))return s;if(a.requestStatus===1)return t=hI(n,e),s;{if(!navigator.onLine)throw vn.create("app-offline");const c=mI(s);return t=dI(n,c),c}});return t?await t:r.authToken}async function hI(n,e){let t=await Hu(n.appConfig);for(;t.authToken.requestStatus===1;)await _p(100),t=await Hu(n.appConfig);const r=t.authToken;return r.requestStatus===0?ic(n,e):r}function Hu(n){return Vs(n,e=>{if(!Ip(e))throw vn.create("not-registered");const t=e.authToken;return gI(t)?{...e,authToken:{requestStatus:0}}:e})}async function dI(n,e){try{const t=await lI(n,e),r={...e,authToken:t};return await ns(n.appConfig,r),t}catch(t){if(dp(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Ep(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await ns(n.appConfig,r)}throw t}}function Ip(n){return n!==void 0&&n.registrationStatus===2}function fI(n){return n.requestStatus===2&&!pI(n)}function pI(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+qT}function mI(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function gI(n){return n.requestStatus===1&&n.requestTime+lp<Date.now()}/**
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
 */async function yI(n){const e=n,{installationEntry:t,registrationPromise:r}=await rc(e);return r?r.catch(console.error):ic(e).catch(console.error),t.fid}/**
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
 */async function _I(n,e=!1){const t=n;return await vI(t),(await ic(t,e)).token}async function vI(n){const{registrationPromise:e}=await rc(n);e&&await e}/**
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
 */function wI(n){if(!n||!n.options)throw To("App Configuration");if(!n.name)throw To("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw To(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function To(n){return vn.create("missing-app-config-values",{valueName:n})}/**
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
 */const Ap="installations",bI="installations-internal",EI=n=>{const e=n.getProvider("app").getImmediate(),t=wI(e),r=jt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},TI=n=>{const e=n.getProvider("app").getImmediate(),t=jt(e,Ap).getImmediate();return{getId:()=>yI(t),getToken:i=>_I(t,i)}};function II(){Je(new We(Ap,EI,"PUBLIC")),Je(new We(bI,TI,"PRIVATE"))}II();Me(cp,tc);Me(cp,tc,"esm2020");/**
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
 */const rs="analytics",AI="firebase_id",RI="origin",SI=60*1e3,PI="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",sc="https://www.googletagmanager.com/gtag/js";/**
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
 */const xe=new os("@firebase/analytics");/**
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
 */const CI={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Be=new bn("analytics","Analytics",CI);/**
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
 */function kI(n){if(!n.startsWith(sc)){const e=Be.create("invalid-gtag-resource",{gtagURL:n});return xe.warn(e.message),""}return n}function Rp(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function xI(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function DI(n,e){const t=xI("firebase-js-sdk-policy",{createScriptURL:kI}),r=document.createElement("script"),i=`${sc}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function NI(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function VI(n,e,t,r,i,s){const a=r[i];try{if(a)await e[a];else{const u=(await Rp(t)).find(d=>d.measurementId===i);u&&await e[u.appId]}}catch(c){xe.error(c)}n("config",i,s)}async function OI(n,e,t,r,i){try{let s=[];if(i&&i.send_to){let a=i.send_to;Array.isArray(a)||(a=[a]);const c=await Rp(t);for(const u of a){const d=c.find(y=>y.measurementId===u),f=d&&e[d.appId];if(f)s.push(f);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),n("event",r,i||{})}catch(s){xe.error(s)}}function LI(n,e,t,r){async function i(s,...a){try{if(s==="event"){const[c,u]=a;await OI(n,e,t,c,u)}else if(s==="config"){const[c,u]=a;await VI(n,e,t,r,c,u)}else if(s==="consent"){const[c,u]=a;n("consent",c,u)}else if(s==="get"){const[c,u,d]=a;n("get",c,u,d)}else if(s==="set"){const[c]=a;n("set",c)}else n(s,...a)}catch(c){xe.error(c)}}return i}function MI(n,e,t,r,i){let s=function(...a){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=LI(s,n,e,t),{gtagCore:s,wrappedGtag:window[i]}}function UI(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(sc)&&t.src.includes(n))return t;return null}/**
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
 */const FI=30,$I=1e3;class qI{constructor(e={},t=$I){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Sp=new qI;function BI(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function zI(n){var a;const{appId:e,apiKey:t}=n,r={method:"GET",headers:BI(t)},i=PI.replace("{app-id}",e),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let c="";try{const u=await s.json();(a=u.error)!=null&&a.message&&(c=u.error.message)}catch{}throw Be.create("config-fetch-failed",{httpStatus:s.status,responseMessage:c})}return s.json()}async function jI(n,e=Sp,t){const{appId:r,apiKey:i,measurementId:s}=n.options;if(!r)throw Be.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Be.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new GI;return setTimeout(async()=>{c.abort()},SI),Pp({appId:r,apiKey:i,measurementId:s},a,c,e)}async function Pp(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=Sp){var c;const{appId:s,measurementId:a}=n;try{await WI(r,e)}catch(u){if(a)return xe.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:s,measurementId:a};throw u}try{const u=await zI(n);return i.deleteThrottleMetadata(s),u}catch(u){const d=u;if(!HI(d)){if(i.deleteThrottleMetadata(s),a)return xe.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:s,measurementId:a};throw u}const f=Number((c=d==null?void 0:d.customData)==null?void 0:c.httpStatus)===503?dl(t,i.intervalMillis,FI):dl(t,i.intervalMillis),y={throttleEndTimeMillis:Date.now()+f,backoffCount:t+1};return i.setThrottleMetadata(s,y),xe.debug(`Calling attemptFetch again in ${f} millis`),Pp(n,y,r,i)}}function WI(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(s),r(Be.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function HI(n){if(!(n instanceof Ge)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class GI{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function KI(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const s=await e,a={...r,send_to:s};n("event",t,a)}}async function QI(n,e,t,r){if(r&&r.global){const i={};for(const s of Object.keys(t))i[`user_properties.${s}`]=t[s];return n("set",i),Promise.resolve()}else{const i=await e;n("config",i,{update:!0,user_properties:t})}}/**
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
 */async function YI(){if(yh())try{await _h()}catch(n){return xe.warn(Be.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return xe.warn(Be.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function JI(n,e,t,r,i,s,a){const c=jI(n);c.then(E=>{t[E.measurementId]=E.appId,n.options.measurementId&&E.measurementId!==n.options.measurementId&&xe.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${E.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(E=>xe.error(E)),e.push(c);const u=YI().then(E=>{if(E)return r.getId()}),[d,f]=await Promise.all([c,u]);UI(s)||DI(s,d.measurementId),i("js",new Date);const y=(a==null?void 0:a.config)??{};return y[RI]="firebase",y.update=!0,f!=null&&(y[AI]=f),i("config",d.measurementId,y),d.measurementId}/**
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
 */class XI{constructor(e){this.app=e}_delete(){return delete Bn[this.app.options.appId],Promise.resolve()}}let Bn={},Gu=[];const Ku={};let Io="dataLayer",ZI="gtag",Qu,oc,Yu=!1;function e0(){const n=[];if(gh()&&n.push("This is a browser extension environment."),Tm()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>`(${i+1}) ${r}`).join(" "),t=Be.create("invalid-analytics-context",{errorInfo:e});xe.warn(t.message)}}function t0(n,e,t){e0();const r=n.options.appId;if(!r)throw Be.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)xe.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Be.create("no-api-key");if(Bn[r]!=null)throw Be.create("already-exists",{id:r});if(!Yu){NI(Io);const{wrappedGtag:s,gtagCore:a}=MI(Bn,Gu,Ku,Io,ZI);oc=s,Qu=a,Yu=!0}return Bn[r]=JI(n,Gu,Ku,e,Qu,Io,t),new XI(n)}function n0(n=as()){n=se(n);const e=jt(n,rs);return e.isInitialized()?e.getImmediate():r0(n)}function r0(n,e={}){const t=jt(n,rs);if(t.isInitialized()){const i=t.getImmediate();if(Mt(e,t.getOptions()))return i;throw Be.create("already-initialized")}return t.initialize({options:e})}function i0(n,e,t){n=se(n),QI(oc,Bn[n.app.options.appId],e,t).catch(r=>xe.error(r))}function s0(n,e,t,r){n=se(n),KI(oc,Bn[n.app.options.appId],e,t,r).catch(i=>xe.error(i))}const Ju="@firebase/analytics",Xu="0.10.21";function o0(){Je(new We(rs,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return t0(r,i,t)},"PUBLIC")),Je(new We("analytics-internal",n,"PRIVATE")),Me(Ju,Xu),Me(Ju,Xu,"esm2020");function n(e){try{const t=e.getProvider(rs).getImmediate();return{logEvent:(r,i,s)=>s0(t,r,i,s),setUserProperties:(r,i)=>i0(t,r,i)}}catch(t){throw Be.create("interop-component-reg-failed",{reason:t})}}}o0();const a0={apiKey:"AIzaSyAit3eL37pTaeVW5O4uzaSWqcwjzNGOzfc",authDomain:"skillfuture-9ce01.firebaseapp.com",projectId:"skillfuture-9ce01",storageBucket:"skillfuture-9ce01.firebasestorage.app",messagingSenderId:"572586687847",appId:"1:572586687847:web:da088da422ae058343c3c2",measurementId:"G-Q5KCHHHXEE"},Os=Eh(a0);n0(Os);const Dr=iv(Os),J=hE(Os),c0=LT(Os),l0=new ut,u0=()=>{const n={};return window.location.search.substring(1).split("&").forEach(e=>{if(e==="")return;const[t,r]=e.split("=");n[decodeURIComponent(t)]=decodeURIComponent(r||"")}),n},h0=()=>{const{ref:n}=u0();if(n){sessionStorage.setItem("referralCode",n.trim().toUpperCase());const e=window.location.origin+window.location.pathname;window.history.replaceState({},document.title,e)}};h0();const d0=n=>{navigator.clipboard.writeText(n).then(()=>{const e=document.createElement("div");e.className="animate-fade",e.style.cssText="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #4ade80; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 700; z-index: 9999; box-shadow: 0 10px 20px rgba(0,0,0,0.1);",e.innerHTML='<i class="fas fa-check-circle"></i> Linked Copied Successfully!',document.body.appendChild(e),setTimeout(()=>e.remove(),2500)})},m={view:"home",user:null,userData:null,isAdmin:!1,leaderboard:[],team:[],courses:[],userCourses:[],allUsers:[],allPayouts:[],allNotices:[],userPayouts:[],selectedCourseId:null,uploadingProfile:!1,showWelcomeModal:!1,profileTab:"details",isSidebarVisible:!0,developerMode:!0,loading:{leaderboard:!1,team:!1,courses:!1,userPayouts:!1,adminUsers:!1,adminPayouts:!1,adminSettings:!1,adminNotices:!1},fetched:{userPayouts:!1,adminUsers:!1,adminPayouts:!1,adminSettings:!1,adminNotices:!1},commissionSettings:{direct:400,passive:100,referralDiscount:100},trainings:[{id:"tr-1",title:"Affiliate Marketing Masterclass | Complete Success Roadmap",desc:"Learn the secrets of high-ticket affiliate marketing.",thumb:"training_thumbnail_1_1774767017754.png"},{id:"tr-2",title:"Lead Generation Formula | 100+ Leads Daily Strategy",desc:"How to automate your lead generation process.",thumb:"training_thumbnail_2_1774767039736.png"},{id:"tr-3",title:"MLM Leadership Blueprint | Build a Massive Team",desc:"The psychology of building long-term teams.",thumb:"training_thumbnail_3_1774767068804.png"},{id:"tr-4",title:"Sales Closing Secrets | Handle Every Objection",desc:"Close deals with confidence and authority.",thumb:"training_thumbnail_1_1774767017754.png"},{id:"tr-5",title:"Personal Branding | Become an Industry Authority",desc:"Build a brand that attracts premium clients.",thumb:"training_thumbnail_2_1774767039736.png"},{id:"tr-6",title:"Instagram Growth Hack | 10k Followers in 30 Days",desc:"Algorithm secrets to go viral consistently.",thumb:"training_thumbnail_3_1774767068804.png"}]},f0=async n=>{const e=await Qa(ge(J,"users",n));if(e.exists())m.userData=e.data(),m.isAdmin=m.userData.role==="admin",Q();else{const t={name:m.user.displayName||"Learner",email:m.user.email,todayEarnings:0,weeklyEarnings:0,monthlyEarnings:0,allTimeEarnings:0,passiveEarnings:0,industryEarnings:0,paidEarnings:0,role:"user",referralCode:`FF-${n.substring(0,5).toUpperCase()}`,joinedAt:new Date().toISOString()};await Cs(ge(J,"users",n),t),m.userData=t,m.isAdmin=!1,Q()}},p0=async()=>{if(m.loading.leaderboard)return;m.loading.leaderboard=!0;const n=Jt(Ue(J,"users"),Ps("allTimeEarnings","desc"),Ka(10)),e=await lt(n);m.leaderboard=e.docs.map(t=>t.data()),m.loading.leaderboard=!1,Q()},m0=async()=>{if(m.loading.team)return;m.loading.team=!0;const n=Jt(Ue(J,"users"),Kn("referrerId","==",m.user.uid)),e=await lt(n);m.team=e.docs.map(t=>t.data()),m.loading.team=!1,Q()},ac=async()=>{if(m.loading.courses)return;m.loading.courses=!0;const e=(await lt(Ue(J,"courses"))).docs.map(t=>({id:t.id,...t.data()}));m.courses=e.length>0?e:m.courses,m.loading.courses=!1,Q()},cc=async()=>{const n=Jt(Ue(J,"userCourses"),Kn("userId","==",m.user.uid)),e=await lt(n);m.userCourses=e.docs.map(t=>t.data()),Q()},g0=async n=>{if(m.userCourses.find(t=>t.courseId===n)){m.selectedCourseId=n,m.view="training",Q();return}await ks(Ue(J,"userCourses"),{userId:m.user.uid,courseId:n,enrolledAt:new Date().toISOString(),progress:0,status:"active",completedLessons:[]}),await cc(),m.selectedCourseId=n,m.view="training",Q()},y0=async(n,e)=>{const t=m.userCourses.find(f=>f.courseId===n);if(!t)return;const r=t.completedLessons||[];if(r.includes(e))return;const i=[...r,e],s=m.courses.find(f=>f.id===n),a=(s==null?void 0:s.totalLessons)||1,c=Math.round(i.length/a*100),u=Jt(Ue(J,"userCourses"),Kn("userId","==",m.user.uid),Kn("courseId","==",n),Ka(1)),d=await lt(u);d.empty||(await mt(ge(J,"userCourses",d.docs[0].id),{completedLessons:i,progress:c}),await cc())},Cp=async()=>{if(!(!m.user||m.loading.userPayouts)){m.loading.userPayouts=!0;try{const n=Jt(Ue(J,"payoutRequests"),Kn("userId","==",m.user.uid),Ps("createdAt","desc")),e=await lt(n);m.userPayouts=e.docs.map(t=>({id:t.id,...t.data()})),m.fetched.userPayouts=!0}catch(n){console.error("Error fetching user payouts:",n)}m.loading.userPayouts=!1,Q()}},_0=async(n,e)=>{const t=m.userData,r=(t.allTimeEarnings||0)-(t.paidEarnings||0);if(n<=0)return alert("Please enter a valid amount.");if(n<100)return alert("Minimum withdrawal amount is ₹100.");if(n>r)return alert("Insufficient balance! You only have ₹"+r+" available.");if(!e||e.trim().length<3)return alert("Please enter valid UPI ID or bank details.");if(m.userPayouts.find(s=>s.status==="pending"))return alert("You already have a pending withdrawal request. Please wait for it to be processed.");try{await ks(Ue(J,"payoutRequests"),{userId:m.user.uid,userName:m.userData.name,userEmail:m.user.email,amount:n,upi:e.trim(),status:"pending",createdAt:new Date().toISOString()}),alert("✅ Withdrawal request of ₹"+n+" submitted successfully! You will be notified once it is processed."),m.fetched.userPayouts=!1,await Cp()}catch(s){alert("Error submitting request: "+s.message)}},v0=async()=>{try{await f_(Dr,l0)}catch(n){n.code!=="auth/popup-closed-by-user"&&alert(n.message)}};window.uploadProfileImage=async n=>{const e=n.target.files[0];if(e){if(e.size>5*1024*1024){alert("Image size should be less than 5MB");return}m.uploadingProfile=!0,Q();try{const t=OT(c0,`users/${m.user.uid}/profile_${Date.now()}`),r=NT(t,e);r.on("state_changed",i=>{},i=>{console.error("Upload failed:",i),alert("Upload failed. Ensure Firebase Storage is configured."),m.uploadingProfile=!1,Q()},async()=>{const i=await VT(r.snapshot.ref);await mt(ge(J,"users",m.user.uid),{profileImage:i}),m.userData.profileImage=i,m.uploadingProfile=!1,Q()})}catch(t){console.error("Error initiating upload:",t),alert("Upload error."),m.uploadingProfile=!1,Q()}}};const Xo=async()=>{if(!(!m.isAdmin||m.loading.adminUsers)){m.loading.adminUsers=!0;try{const n=Jt(Ue(J,"users"),Ps("joinedAt","desc")),e=await lt(n);m.allUsers=e.docs.map(t=>({id:t.id,...t.data()})),m.fetched.adminUsers=!0}catch(n){console.error("Error fetching users:",n)}m.loading.adminUsers=!1,Q()}},w0=async()=>{if(!(!m.isAdmin||m.loading.adminSettings)){m.loading.adminSettings=!0;try{const n=await Qa(ge(J,"settings","commissions"));n.exists()?m.commissionSettings=n.data():await Cs(ge(J,"settings","commissions"),m.commissionSettings),m.fetched.adminSettings=!0}catch(n){console.error("Error fetching settings:",n)}m.loading.adminSettings=!1,Q()}},b0=async n=>{try{await Cs(ge(J,"settings","commissions"),n),m.commissionSettings=n,alert("System settings updated successfully!"),Q()}catch(e){alert("Error saving settings: "+e.message)}},E0=async(n,e)=>{try{await mt(ge(J,"users",n),e),alert("User profile updated successfully!"),await Xo(),m.adminModal=null,Q()}catch(t){alert("Error saving user: "+t.message)}},Zo=async()=>{if(!(!m.isAdmin||m.loading.adminPayouts)){m.loading.adminPayouts=!0;try{const n=Jt(Ue(J,"payoutRequests"),Ps("createdAt","desc")),e=await lt(n);m.allPayouts=e.docs.map(t=>({id:t.id,...t.data()})),m.fetched.adminPayouts=!0}catch(n){console.error("Error fetching payouts:",n)}m.loading.adminPayouts=!1,Q()}},T0=async(n,e,t,r)=>{try{const i=ge(J,"payoutRequests",n);if(await mt(i,{status:r}),r==="approved"){const s=ge(J,"users",e);await mt(s,{paidEarnings:on(t)})}alert(`Payout ${r} successfully!`),await Zo()}catch(i){alert("Error updating payout: "+i.message)}},I0=async n=>{if(confirm("Are you sure you want to delete this course?"))try{await qf(ge(J,"courses",n)),alert("Course deleted!"),await ac()}catch(e){alert("Error deleting course: "+e.message)}},A0=async n=>{try{if(n.id){const{id:e,...t}=n;await mt(ge(J,"courses",e),t)}else await ks(Ue(J,"courses"),n);alert("Course saved successfully!"),await ac(),m.adminModal=null,Q()}catch(e){alert("Error saving course: "+e.message)}},is=async()=>{if(!(!m.isAdmin||m.loading.adminNotices)){m.loading.adminNotices=!0;try{const n=await lt(Ue(J,"notices"));m.allNotices=n.docs.map(e=>({id:e.id,...e.data()})),m.fetched.adminNotices=!0}catch(n){console.error("Error fetching notices:",n)}m.loading.adminNotices=!1,Q()}},R0=async n=>{try{await ks(Ue(J,"notices"),{...n,createdAt:new Date().toISOString()}),alert("Notice posted!"),is()}catch(e){alert("Error posting notice: "+e.message)}},S0=async n=>{confirm("Delete this notice?")&&(await qf(ge(J,"notices",n)),is())},Zu=()=>m.showWelcomeModal?`
    <div class="modal-overlay" id="welcomeModalOverlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Follow Us</h2>
          <button class="modal-close" id="closeWelcomeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="video-wrapper">
            <iframe 
              src="https://www.youtube.com/embed/vNdteWdkweM?autoplay=1" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
        </div>
        <div class="modal-footer">
          <label class="checkbox-label">
            <input type="checkbox" id="doNotShowCheckbox"> 
            Do not show again for next 24 hours.
          </label>
        </div>
      </div>
    </div>
  `:"",eh=()=>{if(!m.adminModal)return"";const{type:n,data:e}=m.adminModal;return n==="course"?`
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 550px;">
          <div class="modal-header">
            <h2><i class="fas fa-graduation-cap"></i> ${e!=null&&e.id?"Reference Node Editor":"Create New Course"}</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminCourseForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <input type="hidden" id="courseId" value="${(e==null?void 0:e.id)||""}">
              
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Course Title</label>
                <input type="text" id="courseTitle" class="form-input-styled" value="${(e==null?void 0:e.title)||""}" required placeholder="e.g. High-Ticket Sales Mastery">
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Category</label>
                  <input type="text" id="courseCategory" class="form-input-styled" value="${(e==null?void 0:e.category)||"Premium"}" required>
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Price (₹)</label>
                  <input type="number" id="coursePrice" class="form-input-styled" value="${(e==null?void 0:e.price)||599}" required>
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Cover Image URL</label>
                <input type="url" id="courseImg" class="form-input-styled" value="${(e==null?void 0:e.img)||""}" required placeholder="https://images.unsplash.com/...">
              </div>

              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Total Lessons</label>
                <input type="number" id="courseLessons" class="form-input-styled" value="${(e==null?void 0:e.totalLessons)||12}" required>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px;">
                  <i class="fas fa-save"></i> COMMITTING CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `:n==="notice"?`
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 500px;">
          <div class="modal-header">
            <h2><i class="fas fa-bullhorn"></i> Broadcast Systems</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminNoticeForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Subject</label>
                <input type="text" id="noticeTitle" class="form-input-styled" required placeholder="e.g. Server Maintenance or New Promo">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label>Message Content</label>
                <textarea id="noticeMessage" class="form-input-styled" style="height: 120px; resize: none;" required placeholder="Type your broadcast message here..."></textarea>
              </div>
              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; background: #f59e0b; border-radius: 12px;">
                  <i class="fas fa-paper-plane"></i> DEPLOY BROADCAST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `:n==="user-edit"?`
      <div class="modal-overlay" id="adminModalOverlay">
        <div class="modal-container" style="max-width: 500px;">
          <div class="modal-header">
            <h2><i class="fas fa-user-edit"></i> Edit User Profile</h2>
            <button class="modal-close" onclick="AppState.adminModal = null; render();">&times;</button>
          </div>
          <div class="modal-body">
            <form id="adminUserEditForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <input type="hidden" id="editUserId" value="${(e==null?void 0:e.id)||""}" />
              
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="editUserName" class="form-input-styled" value="${(e==null?void 0:e.name)||""}" required />
              </div>

              <div class="form-group">
                <label>Platform Role</label>
                <select id="editUserRole" class="form-input-styled" style="width: 100%; appearance: none; padding-right: 2rem; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right%200.7rem%20top%2050%25; background-size: 0.65rem%20auto;">
                  <option value="user" ${(e==null?void 0:e.role)==="user"?"selected":""}>Standard User</option>
                  <option value="admin" ${(e==null?void 0:e.role)==="admin"?"selected":""}>Administrator</option>
                </select>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label>Earnings (All Time)</label>
                  <input type="number" id="editUserEarnings" class="form-input-styled" value="${(e==null?void 0:e.allTimeEarnings)||0}" required />
                </div>
                <div class="form-group">
                  <label>Paid (₹)</label>
                  <input type="number" id="editUserPaid" class="form-input-styled" value="${(e==null?void 0:e.paidEarnings)||0}" required />
                </div>
              </div>

              <div class="modal-actions" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-save" style="width: 100%; border-radius: 12px;">
                  <i class="fas fa-check-circle"></i> UPDATE IDENTITY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `:""},P0=()=>{const n=m.userData||{},e=n.allTimeEarnings-n.paidEarnings||0;return`
    <section class="main-content animate-fade">
      <h1 style="margin-bottom: 2rem;">My Profile</h1>
      
      <div class="profile-section-container">
        <!-- Left Card -->
        <div class="profile-card card-left">
          <div class="profile-overview-header" style="position: relative;">
            <label for="profileImageInput" style="cursor: pointer; display: inline-block; position: relative; margin: 0 auto;">
              <img src="${n.profileImage||n.profilePic||"https://via.placeholder.com/150"}" class="profile-image-large" alt="Profile" style="opacity: ${m.uploadingProfile?"0.5":"1"};">
              ${m.uploadingProfile?'<div style="position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); color: white; font-size: 1.5rem;"><i class="fas fa-spinner fa-spin"></i></div>':'<div style="position: absolute; bottom: 0; right: 0; background: var(--accent); color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 2px solid white; font-size: 0.9rem;"><i class="fas fa-camera"></i></div>'}
            </label>
            <input type="file" id="profileImageInput" accept="image/*" style="display: none;" onchange="window.uploadProfileImage(event)">
            <h3>${n.name||"Learner"}</h3>
            <p>${m.user.email}</p>
          </div>
          
          <div class="profile-details-list">
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-id-badge"></i> Ref Code</span>
              <span class="detail-value">${n.referralCode||"N/A"} <i class="fas fa-copy copy-btn" data-text="${n.referralCode}"></i></span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-box"></i> Package</span>
              <span class="detail-value">${n.package||"Premium Package"}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-check-circle"></i> KYC Status</span>
              <span class="detail-value" style="color: #14b8a6;">${n.kycStatus||"approved"}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label"><i class="fas fa-user-friends"></i> Sponsor</span>
              <span class="detail-value">${n.sponsor||"Juned khan (N)"}</span>
            </div>
          </div>
          
          <div class="wallet-mini-grid">
            <div class="wallet-mini-card">
              <h4>${e}</h4>
              <span>Wallet Balance</span>
            </div>
            <div class="wallet-mini-card">
              <h4>${n.pendingWithdrawal||0}</h4>
              <span>Pending Withdrawal</span>
            </div>
          </div>
          
          <div class="profile-actions">
            <button class="btn btn-profile-action btn-withdraw" onclick="AppState.view='wallet'; render();">Withdraw Amount</button>
            <button class="btn btn-profile-action btn-history">Payout History</button>
          </div>
        </div>

        <!-- Right Card (Editor) -->
        <div class="profile-card card-right">
          <div class="editor-tabs">
            <button class="tab-btn ${m.profileTab==="details"?"active":""}" data-tab="details">Profile Details</button>
            <button class="tab-btn ${m.profileTab==="kyc"?"active":""}" data-tab="kyc">Kyc Details</button>
            <button class="tab-btn ${m.profileTab==="password"?"active":""}" data-tab="password">Change Password</button>
          </div>
          
          <div class="editor-content">
            ${m.profileTab==="details"?`
              <form id="profileDetailsForm">
                <div class="form-group">
                  <label>Profile Picture</label>
                  <div class="file-input-wrapper">
                    <span class="custom-file-btn">Choose File</span>
                    <span style="color: #64748b; font-size: 0.9rem;">No file chosen</span>
                  </div>
                  <p class="upload-hint">Upload profile in size (1:1) for proper fit.</p>
                </div>
                
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-input-styled" id="editName" value="${n.name||""}" placeholder="Enter your name">
                </div>
                
                <div class="form-group">
                  <label>Phone</label>
                  <input type="text" class="form-input-styled" id="editPhone" value="${n.phone||""}" placeholder="Enter phone number">
                </div>
                
                <div class="form-group">
                  <label>Email ID</label>
                  <input type="email" class="form-input-styled form-input-readonly" value="${m.user.email}" readonly>
                </div>
                
                <button type="submit" class="btn btn-save">SAVE CHANGES</button>
              </form>
            `:""}
            
            ${m.profileTab==="kyc"?`
              <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-university" style="font-size: 3rem; color: #4f46e5; margin-bottom: 1rem;"></i>
                <h3>KYC and Bank Details</h3>
                <p style="color: #64748b;">Submit your banking and ID details for payouts.</p>
                <button class="btn btn-save" style="margin-top: 1.5rem;">UPDATE KYC</button>
              </div>
            `:""}
            
            ${m.profileTab==="password"?`
              <form id="changePasswordForm">
                <div class="form-group">
                  <label>Current Password</label>
                  <input type="password" class="form-input-styled" placeholder="••••••••">
                </div>
                <div class="form-group">
                  <label>New Password</label>
                  <input type="password" class="form-input-styled" placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-save">UPDATE PASSWORD</button>
              </form>
            `:""}
          </div>
        </div>
      </div>
    </section>
  `},C0=()=>{const n=m.allUsers.length,e=m.allPayouts.filter(i=>i.status==="pending").length,t=m.courses.length,r=m.allNotices.length;return`
    <section class="main-content animate-fade">
      <div class="admin-section-header">
        <h1>Admin Control Center</h1>
        <div class="badge-admin status-badge"><i class="fas fa-shield-alt"></i> Systems Online</div>
      </div>

      <div class="metrics-grid">
        <div class="admin-card-metric">
          <span class="label">User Base</span>
          <div class="value">${n}</div>
          <div class="trend trend-up"><i class="fas fa-arrow-up"></i> 12% growth</div>
        </div>
        <div class="admin-card-metric">
          <span class="label">Pending Review</span>
          <div class="value">${e}</div>
          <span class="label" style="font-size: 0.7rem; color: #f43f5e;">Action Required</span>
        </div>
        <div class="admin-card-metric">
          <span class="label">Total Courses</span>
          <div class="value">${t}</div>
          <div class="trend"><i class="fas fa-book-open"></i> Catalog Size</div>
        </div>
        <div class="admin-card-metric">
          <span class="label">Active Notices</span>
          <div class="value">${r}</div>
          <div class="trend"><i class="fas fa-bullhorn"></i> Broadcasts</div>
        </div>
      </div>
      
      <div class="chart-container" style="margin-top: 2rem;">
        <h3 style="margin-bottom: 1.5rem;">Quick Management</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;">
          <button class="btn btn-auth" style="padding: 1rem;" onclick="AppState.view='admin-courses'; render();">
            <i class="fas fa-edit"></i> Manage Courses
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #10b981;" onclick="AppState.view='admin-payouts'; render();">
            <i class="fas fa-check-double"></i> Review Payouts
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #f59e0b;" onclick="AppState.view='admin-notices'; render();">
            <i class="fas fa-bullhorn"></i> Post Notice
          </button>
          <button class="btn btn-auth" style="padding: 1rem; background: #64748b;" onclick="AppState.view='admin-users'; render();">
            <i class="fas fa-users-cog"></i> User Audit
          </button>
        </div>
      </div>
    </section>
  `},k0=()=>`
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>User Management</h1>
      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.6rem 1.2rem; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <i class="fas fa-search" style="color: #94a3b8;"></i>
        <input type="text" placeholder="Search by name, email, or ref..." style="border: none; outline: none; font-size: 0.95rem; width: 250px;" oninput="window.filterAdminUsers(this.value)"/>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>User Identity</th>
            <th>Referral Details</th>
            <th>Earnings Profile</th>
            <th>Platform Access</th>
            <th style="text-align: right;">Operations</th>
          </tr>
        </thead>
        <tbody>
          ${m.allUsers.length===0?`
            <tr>
              <td colspan="5">
                <div class="empty-state-container">
                  <i class="fas fa-users-slash empty-state-icon"></i>
                  <h3>No users found</h3>
                  <p>Check back later as new users join the platform.</p>
                </div>
              </td>
            </tr>
          `:m.allUsers.map(n=>`
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; border-radius: 10px; background: #eef2ff; color: #4338ca; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">
                    ${(n.name||"U").substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style="font-weight: 700; color: #0f172a;">${n.name||"Unnamed User"}</div>
                    <div style="font-size: 0.8rem; color: #64748b;">${n.email}</div>
                  </div>
                </div>
              </td>
              <td style="font-family: monospace; font-size: 0.85rem; color: #4338ca;">
                ${n.referralCode}
              </td>
              <td>
                <div style="font-weight: 800; color: #10b981;">₹ ${(n.allTimeEarnings||0).toLocaleString()}</div>
                <div style="font-size: 0.75rem; color: #64748b;">Paid: ₹ ${(n.paidEarnings||0).toLocaleString()}</div>
              </td>
              <td>
                <span class="status-badge ${n.role==="admin"?"badge-admin":"badge-user"}">
                  ${n.role==="admin"?'<i class="fas fa-user-shield"></i>':'<i class="fas fa-user"></i>'}
                  ${n.role||"user"}
                </span>
              </td>
              <td style="text-align: right;">
                <button class="admin-action-btn" title="Edit User" onclick="window.showUserEditModal('${n.id}')">
                   <i class="fas fa-user-edit"></i>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </section>
`,x0=()=>`
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Course Catalog</h1>
      <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem;" onclick="window.showCourseModal()">
        <i class="fas fa-plus"></i> Add New Course
      </button>
    </div>
    <div class="course-grid">
      ${m.courses.length===0?`
        <div style="grid-column: 1/-1;">
          <div class="empty-state-container">
            <i class="fas fa-book-open empty-state-icon"></i>
            <h3>The catalog is empty</h3>
            <button class="btn btn-primary" onclick="window.showCourseModal()">Add your first course</button>
          </div>
        </div>
      `:m.courses.map(n=>`
        <div class="course-card-v2">
          <img src="${n.img||"https://via.placeholder.com/300x200?text=SkillFutures"}" class="course-img-v2" alt="${n.title}"/>
          <div style="padding: 0.5rem 0.75rem 0.25rem;">
            <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem;">${n.category||"Premium"}</div>
            <h3 style="margin-bottom: 1.25rem; font-size: 1.1rem; text-align: left;">${n.title}</h3>
            <div style="display: flex; gap: 8px;">
              <button class="admin-action-btn" title="Edit Course" onclick="window.showCourseModal('${n.id}')"><i class="fas fa-pen"></i></button>
              <button class="admin-action-btn btn-danger" title="Delete Course" onclick="window.deleteCourse('${n.id}')"><i class="fas fa-trash"></i></button>
              <div style="margin-left: auto; text-align: right;">
                <div style="font-weight: 800; color: #0f172a;">₹ ${n.price||599}</div>
                <div style="font-size: 0.7rem; color: #64748b;">${n.totalLessons||12} Lessons</div>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </section>
`,D0=()=>`
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Financial Queue</h1>
      <div class="badge-pending status-badge"><i class="fas fa-clock"></i> Action Items</div>
    </div>
    
    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Payout Amount</th>
            <th>UPI Address</th>
            <th>Current Status</th>
            <th style="text-align: right;">Operations</th>
          </tr>
        </thead>
        <tbody>
          ${m.allPayouts.length===0?`
            <tr>
              <td colspan="5">
                <div class="empty-state-container">
                  <i class="fas fa-wallet empty-state-icon"></i>
                  <h3>No payout requests</h3>
                  <p>All clear! There are no pending requests at the moment.</p>
                </div>
              </td>
            </tr>
          `:m.allPayouts.map(n=>`
            <tr>
              <td>
                <div style="font-weight: 700; color: #0f172a;">${n.userName}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${new Date(n.createdAt).toLocaleDateString()}</div>
              </td>
              <td style="color: #10b981; font-weight: 800; font-size: 1.1rem;">₹ ${n.amount.toLocaleString()}</td>
              <td style="font-family: monospace; font-size: 0.9rem; color: #475569;">${n.upi}</td>
              <td>
                <span class="status-badge ${n.status==="pending"?"badge-pending":n.status==="approved"?"badge-approved":"badge-rejected"}">
                  <i class="fas ${n.status==="pending"?"fa-hourglass-start":n.status==="approved"?"fa-check-circle":"fa-times-circle"}"></i>
                  ${n.status}
                </span>
              </td>
              <td style="text-align: right;">
                ${n.status==="pending"?`
                  <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="btn btn-auth" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: #10b981;" onclick="window.updatePayoutStatus('${n.id}', '${n.userId}', ${n.amount}, 'approved')">
                      Approve
                    </button>
                    <button class="btn btn-auth" style="padding: 0.5rem 1rem; font-size: 0.75rem; background: #ef4444;" onclick="window.updatePayoutStatus('${n.id}', '${n.userId}', ${n.amount}, 'rejected')">
                      Reject
                    </button>
                  </div>
                `:'<span style="color: #94a3b8; font-size: 0.8rem; font-weight: 700;">PROCESSED</span>'}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  </section>
`,N0=()=>`
  <section class="main-content animate-fade">
    <div class="admin-section-header">
      <h1>Platform Notices</h1>
      <button class="btn btn-auth" style="width: auto; padding: 0.8rem 1.5rem; background: #f59e0b;" onclick="window.showNoticeModal()">
        <i class="fas fa-bullhorn"></i> New Broadcast
      </button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 1.5rem;">
        ${m.allNotices.length===0?`
          <div style="grid-column: 1/-1;">
            <div class="empty-state-container">
              <i class="fas fa-scroll empty-state-icon"></i>
              <h3>No active notices</h3>
              <p>Keep your users informed about updates or maintenance.</p>
            </div>
          </div>
        `:m.allNotices.map(n=>`
          <div style="padding: 1.75rem; background: white; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 15px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; position: relative;">
            <div class="badge-admin status-badge" style="position: absolute; top: 1rem; right: 1rem; font-size: 0.6rem;">Broadcast</div>
            <div>
              <h3 style="margin-bottom: 0.75rem; color: #1e293b; font-weight: 800; font-size: 1.2rem;">${n.title}</h3>
              <p style="color: #64748b; font-size: 0.95rem; line-height: 1.6;">${n.message}</p>
            </div>
            <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid #f1f5f9;">
              <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fas fa-clock"></i> ${new Date(n.createdAt).toLocaleDateString()}</span>
              <button class="admin-action-btn btn-danger" onclick="window.deleteNotice('${n.id}')">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        `).join("")}
    </div>
  </section>
`,V0=()=>{const n=m.commissionSettings;return`
    <section class="main-content animate-fade">
      <div class="admin-section-header">
        <h1>Global System Configuration</h1>
        <div class="badge-admin status-badge" style="background: #f59e0b;"><i class="fas fa-cog"></i> Advanced Settings</div>
      </div>

      <div class="chart-container" style="max-width: 600px;">
        <h3 style="margin-bottom: 2rem;"><i class="fas fa-percentage"></i> Commission Architecture</h3>
        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 2.5rem;">Configure the payout amounts for referrals and passive income. Any changes here will be applied immediately to all new affiliate registrations.</p>
        
        <form id="adminSettingsForm" style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Direct Referral Commission (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(99, 102, 241, 0.1); color: #4338ca; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="directComm" class="form-input-styled" value="${n.direct}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The fixed amount awarded to the direct referrer of a new premium signup.</p>
          </div>

          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Passive Team Commission (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(16, 185, 129, 0.1); color: #059669; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="passiveComm" class="form-input-styled" value="${n.passive}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The indirect commission awarded to the sponsor of the referrer.</p>
          </div>

          <div class="form-group">
            <label style="font-weight: 700; color: #1e293b;">Referral Discount for New Users (₹)</label>
            <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px;">
               <div style="background: rgba(245, 158, 11, 0.1); color: #b45309; width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800;">₹</div>
               <input type="number" id="referralDiscount" class="form-input-styled" value="${n.referralDiscount||100}" required style="font-size: 1.2rem; font-weight: 800;">
            </div>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 8px;">The discount amount given to a new user if they join via a referral link.</p>
          </div>

          <div style="margin-top: 1rem; padding-top: 2rem; border-top: 1px solid #f1f5f9;">
            <button type="submit" class="btn btn-save" style="width: 100%; height: 55px; border-radius: 15px; background: #0f172a; font-size: 1rem; letter-spacing: 0.5px;">
              <i class="fas fa-shield-check"></i> SYNC SYSTEM CONFIGURATION
            </button>
          </div>
        </form>
      </div>
    </section>
  `},O0=()=>`
  <div class="mobile-overlay ${m.isSidebarVisible?"active":""}" id="adminMobileOverlay"></div>
  <button id="sidebarToggle" class="sidebar-toggle-btn floating-toggle" style="color: #94a3b8; border-color: #1e293b; background: #0f172a; ${m.isSidebarVisible?"display: none;":""}">
    <i class="fas fa-bars"></i>
  </button>
  <aside class="sidebar ${m.isSidebarVisible?"":"collapsed"} ${m.isSidebarVisible?"mobile-active":""}" style="background: #0f172a; border-right: 1px solid #1e293b;">
    <div class="sidebar-logo" style="border-bottom: 1px solid #1e293b;">
      <div class="logo-content" style="${m.isSidebarVisible?"":"display: none;"}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.png" alt="Logo" style="height: 32px; flex-shrink: 0; filter: brightness(0) invert(1);"/>
        </div>
        <div style="font-size: 0.6rem; color: #94a3b8; font-weight: 600; padding-left: 0px; margin-top: 4px;">"Platform Control Center"</div>
      </div>
      <button id="sidebarToggleClose" class="sidebar-toggle-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <ul class="sidebar-nav">
      <li style="padding: 1.5rem 1.5rem 0.5rem; font-size: 0.7rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px;">Main Dashboard</li>
      <li class="sidebar-item ${m.view==="dashboard"?"active":""}" data-route="dashboard" style="color: #94a3b8;">
        <i class="fas fa-arrow-left"></i> Back to User Site
      </li>
      
      <li style="padding: 1.5rem 1.5rem 0.5rem; font-size: 0.7rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 1px;">Management</li>
      <li class="sidebar-item ${m.view==="admin-dashboard"?"active":""}" data-route="admin-dashboard" style="color: #94a3b8;">
        <i class="fas fa-chart-pie"></i> Admin Overview
      </li>
      <li class="sidebar-item ${m.view==="admin-users"?"active":""}" data-route="admin-users" style="color: #94a3b8;">
        <i class="fas fa-users-gear"></i> Manage Users
      </li>
      <li class="sidebar-item ${m.view==="admin-courses"?"active":""}" data-route="admin-courses" style="color: #94a3b8;">
        <i class="fas fa-layer-group"></i> Manage Courses
      </li>
      <li class="sidebar-item ${m.view==="admin-payouts"?"active":""}" data-route="admin-payouts" style="color: #94a3b8;">
        <i class="fas fa-hand-holding-dollar"></i> Payout Requests
      </li>
      <li class="sidebar-item ${m.view==="admin-notices"?"active":""}" data-route="admin-notices" style="color: #94a3b8;">
        <i class="fas fa-bullhorn"></i> Global Notices
      </li>
      <li class="sidebar-item ${m.view==="admin-settings"?"active":""}" data-route="admin-settings" style="color: #94a3b8;">
        <i class="fas fa-cog"></i> Global Settings
      </li>
    </ul>

    <div style="padding: 1.5rem; border-top: 1px solid #1e293b; margin-top: auto;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; padding: 0.5rem;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">AD</div>
        <div style="${m.isSidebarVisible?"":"display: none;"}">
          <div style="font-size: 0.8rem; font-weight: 700; color: white;">Admin User</div>
          <div style="font-size: 0.6rem; color: #64748b;">Super Admin</div>
        </div>
      </div>
      <button id="logoutBtn" style="width: 100%; padding: 0.7rem; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.85rem;">
        <i class="fas fa-power-off"></i> Logout
      </button>
    </div>
  </aside>
`,L0=()=>`
  <div class="mobile-overlay ${m.isSidebarVisible?"active":""}" id="mobileOverlay"></div>
  <button id="sidebarToggle" class="sidebar-toggle-btn floating-toggle" style="${m.isSidebarVisible?"display: none;":""}">
    <i class="fas fa-bars"></i>
  </button>
  <aside class="sidebar ${m.isSidebarVisible?"":"collapsed"} ${m.isSidebarVisible?"mobile-active":""}">
    <div class="sidebar-logo">
      <div class="logo-content" style="${m.isSidebarVisible?"":"display: none;"}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/logo.png" alt="Logo" style="height: 32px; flex-shrink: 0;"/>
        </div>
        <div style="font-size: 0.6rem; color: #64748b; font-weight: 600; padding-left: 0px; margin-top: 4px;">"Crafting Careers, Creating Incomes."</div>
      </div>
      <button id="sidebarToggleClose" class="sidebar-toggle-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <ul class="sidebar-nav">
      <li class="sidebar-item ${m.view==="dashboard"?"active":""}" data-route="dashboard">
        <i class="fas fa-desktop"></i> Affiliate Dashboard
      </li>
      <li class="sidebar-item ${m.view==="profile"?"active":""}" data-route="profile">
        <i class="fas fa-user"></i> My Profile
      </li>
      <li class="sidebar-item ${m.view==="trainings"?"active":""}" data-route="trainings">
        <i class="fas fa-video"></i> Trainings
      </li>
      <li class="sidebar-item ${m.view==="affiliate-link"?"active":""}" data-route="affiliate-link">
        <i class="fas fa-link"></i> Refer & Earn
      </li>
      <li class="sidebar-item ${m.view==="courses"?"active":""}" data-route="courses">
        <i class="fas fa-tablet-screen-button"></i> My Courses
      </li>
      <li class="sidebar-item ${m.view==="upgrade"?"active":""}" data-route="upgrade">
        <i class="fas fa-chart-line"></i> Upgrade
      </li>
      <li class="sidebar-item ${m.view==="leaderboard"?"active":""}" data-route="leaderboard">
        <i class="fas fa-chart-bar"></i> Leaderboard
      </li>
      <li class="sidebar-item ${m.view==="team"?"active":""}" data-route="team">
        <i class="fas fa-users"></i> My Team
      </li>
      <li class="sidebar-item ${m.view==="reports"?"active":""}" data-route="reports">
        <i class="fas fa-file-alt"></i> Reports <i class="fas fa-chevron-right arrow"></i>
      </li>
      <li class="sidebar-item ${m.view==="trainings"?"active":""}" data-route="trainings">
        <i class="fas fa-video"></i> Trainings
      </li>
      <li class="sidebar-item ${m.view==="webinars"?"active":""}" data-route="webinars">
        <i class="fas fa-video"></i> Webinars
      </li>
      <li class="sidebar-item ${m.view==="offers"?"active":""}" data-route="offers">
        <i class="fas fa-bullseye"></i> Offers
      </li>
      <li class="sidebar-item ${m.view==="earning-target"?"active":""}" data-route="earning-target">
        <i class="fas fa-dollar-sign"></i> Earning Target
      </li>
      <li class="sidebar-item ${m.view==="wallet"?"active":""}" data-route="wallet">
        <i class="fas fa-user-check"></i> Wallet Request
      </li>
      <li class="sidebar-item ${m.view==="create-account"?"active":""}" data-route="create-account">
        <i class="fas fa-user-plus"></i> Create Account
      </li>
    </ul>
    
    <div style="padding: 1.5rem; border-top: 1px solid #f1f5f9; margin-top: auto;">
      <button id="logoutBtn" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: #fee2e2; color: #ef4444; border: none; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  </aside>
`,M0=n=>`
  <div class="dashboard-container admin-layout ${m.isSidebarVisible?"":"sidebar-hidden"}" style="background: #f8fafc;">
    ${O0()}
    <div id="main-view" style="flex-grow: 1; overflow-y: auto; background: #f8fafc;">
      ${n}
    </div>
  </div>
`,th=()=>{const n=m.userData||{};return`
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
        <div style="height: 300px; display: flex; align-items: flex-end; gap: clamp(10px, 5vw, 2rem); padding: 0 1rem; border-bottom: 1px solid var(--card-border);">
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
  `},U0=()=>`
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
          ${m.leaderboard.map((n,e)=>`
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
`,F0=()=>`
  <section class="main-content animate-fade">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3rem;">
      <h1>Trainings 🎓</h1>
      <p style="color: #64748b; font-weight: 500;">Access exclusive sessions & webinars</p>
    </div>

    <div class="training-grid">
      ${m.trainings.map((n,e)=>`
        <div class="training-card animate-fade-up stagger-${e%6+1}">
          <div class="training-thumb-container">
            <img src="${n.thumb}" alt="${n.title}" class="training-thumb" loading="lazy">
            <div class="play-overlay">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
          </div>
          <div class="training-info">
            <h3 class="training-title">${n.title}</h3>
            <div class="training-desc">
              <span>Exclusive Session</span>
              <span>•</span>
              <span>HD Mastery</span>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </section>
`,$0=()=>`
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
          ${m.team.map((n,e)=>`
            <tr style="border-bottom: 1px solid #f8fafc;" class="animate-fade stagger-${e%6+1}">
              <td style="padding: 1.2rem; font-weight: 600;">${n.name}</td>
              <td style="padding: 1.2rem; color: #64748b;">${n.email}</td>
              <td style="padding: 1.2rem; color: #64748b;">${new Date(n.joinedAt).toLocaleDateString()}</td>
            </tr>
          `).join("")}
          ${m.team.length===0?'<tr><td colspan="3" style="padding: 3rem; text-align: center; color: var(--text-dim);">No team members yet. Start sharing your link!</td></tr>':""}
        </tbody>
      </table>
    </div>
  </section>
`,q0=()=>{const n=m.userData||{},e=n.allTimeEarnings||0,t=n.paidEarnings||0,r=m.userPayouts.filter(a=>a.status==="pending").reduce((a,c)=>a+(c.amount||0),0),i=e-t,s=m.userPayouts.some(a=>a.status==="pending");return`
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="margin-bottom: 0.25rem;">Wallet & Withdrawals</h1>
          <p style="color: #64748b; font-size: 0.9rem;">Manage your earnings and request payouts</p>
        </div>
        ${s?'<div style="background: #fef3c7; color: #92400e; padding: 8px 18px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; border: 1px solid #fde68a;"><i class="fas fa-clock"></i> Pending Request Active</div>':""}
      </div>

      <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2.5rem;">
        <div class="metric-card animate-fade-up stagger-1" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${e.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Total Earned</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-coins"></i></div>
        </div>
        <div class="metric-card animate-fade-up stagger-2" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${i.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Available Balance</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-wallet"></i></div>
        </div>
        <div class="metric-card animate-fade-up stagger-3" style="background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">&#8377;${t.toLocaleString()}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Total Withdrawn</span>
          </div>
          <div class="metric-icon" style="color: rgba(255,255,255,0.3); font-size: 2.5rem;"><i class="fas fa-arrow-up-from-bracket"></i></div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 2rem; align-items: start;">
        <div class="chart-container animate-fade-up stagger-4" style="position: sticky; top: 2rem;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg, #4338ca, #6366f1); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-paper-plane"></i></div>
            <div>
              <h3 style="margin: 0; font-size: 1.1rem;">Request Withdrawal</h3>
              <p style="margin: 0; font-size: 0.75rem; color: #94a3b8;">Min. &#8377;100 | Processed within 24-48 hrs</p>
            </div>
          </div>
          
          ${s?`
            <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem; text-align: center;">
              <i class="fas fa-hourglass-half" style="font-size: 2rem; color: #f59e0b; margin-bottom: 0.75rem;"></i>
              <p style="color: #92400e; font-weight: 600; font-size: 0.9rem; margin: 0;">You have a pending withdrawal of &#8377;${r.toLocaleString()}. Please wait for it to be processed.</p>
            </div>
          `:`
            <form id="payoutForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b; font-size: 0.85rem;">Withdrawal Amount</label>
                <div style="position: relative;">
                  <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-weight: 800; color: #4338ca; font-size: 1.1rem;">&#8377;</span>
                  <input type="number" id="payoutAmount" value="${i}" min="100" max="${i}" required style="width: 100%; padding: 14px 14px 14px 36px; border-radius: 12px; border: 2px solid #e2e8f0; background: #f8fafc; color: #0f172a; font-size: 1.2rem; font-weight: 800; outline: none; transition: border 0.2s;" onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='#e2e8f0'"/>
                </div>
                <p style="margin: 6px 0 0; font-size: 0.75rem; color: #94a3b8;">Available: &#8377;${i.toLocaleString()} | Min: &#8377;100</p>
              </div>
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b; font-size: 0.85rem;">UPI ID / Bank Details</label>
                <textarea id="payoutUpi" required placeholder="yourname@upi or Bank: Name, A/C, IFSC" style="width: 100%; padding: 14px; border-radius: 12px; border: 2px solid #e2e8f0; background: #f8fafc; color: #0f172a; height: 100px; resize: none; font-size: 0.9rem; outline: none; transition: border 0.2s; font-family: inherit;" onfocus="this.style.borderColor='#6366f1'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%; height: 50px; border-radius: 12px; font-size: 0.95rem; font-weight: 700; background: linear-gradient(135deg, #4338ca, #6366f1); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(99,102,241,0.4)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                <i class="fas fa-paper-plane"></i> Submit Withdrawal Request
              </button>
            </form>
          `}
        </div>

        <div class="chart-container animate-fade-up stagger-5">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="margin: 0;"><i class="fas fa-receipt" style="color: #6366f1; margin-right: 8px;"></i>Transaction History</h3>
            <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">${m.userPayouts.length} transactions</span>
          </div>
          ${m.loading.userPayouts?`
            <div style="text-align: center; padding: 3rem; color: #94a3b8;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem;"></i><p style="margin-top: 1rem;">Loading transactions...</p></div>
          `:m.userPayouts.length===0?`
            <div style="text-align: center; padding: 3rem;">
              <i class="fas fa-inbox" style="font-size: 3rem; color: #e2e8f0; margin-bottom: 1rem;"></i>
              <h4 style="color: #94a3b8; font-weight: 600;">No transactions yet</h4>
              <p style="color: #cbd5e1; font-size: 0.85rem;">Your withdrawal requests will appear here</p>
            </div>
          `:`
            <div style="display: flex; flex-direction: column; gap: 12px; max-height: 500px; overflow-y: auto;">
              ${m.userPayouts.map((a,c)=>{const u={pending:{bg:"#fef3c7",text:"#92400e",icon:"fa-clock"},approved:{bg:"#dcfce7",text:"#166534",icon:"fa-check-circle"},rejected:{bg:"#fee2e2",text:"#991b1b",icon:"fa-times-circle"}},d=u[a.status]||u.pending;return`
                  <div style="padding: 1.25rem; background: #fafbfc; border-radius: 14px; border: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; gap: 1rem; transition: all 0.2s;" class="animate-fade stagger-${c%6+1}">
                    <div style="display: flex; align-items: center; gap: 1rem; flex: 1;">
                      <div style="width: 42px; height: 42px; border-radius: 12px; background: ${d.bg}; display: flex; align-items: center; justify-content: center; color: ${d.text}; flex-shrink: 0;">
                        <i class="fas ${d.icon}"></i>
                      </div>
                      <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 700; color: #0f172a; font-size: 1rem;">&#8377;${a.amount.toLocaleString()}</div>
                        <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${a.upi}</div>
                      </div>
                    </div>
                    <div style="text-align: right; flex-shrink: 0;">
                      <div style="background: ${d.bg}; color: ${d.text}; padding: 4px 12px; border-radius: 50px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                        <i class="fas ${d.icon}" style="margin-right: 4px;"></i>${a.status}
                      </div>
                      <div style="font-size: 0.7rem; color: #cbd5e1; margin-top: 6px;">${new Date(a.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                  </div>
                `}).join("")}
            </div>
          `}
        </div>
      </div>
    </section>
  `},B0=()=>{const e=(m.userData||{}).referralCode||"FF-GUEST",t=window.location.origin,r=m.commissionSettings.direct,i=m.commissionSettings.passive,s=m.commissionSettings.referralDiscount;return`
    <section class="main-content animate-fade">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem;">
        <div>
          <h1 style="margin-bottom: 0.5rem;">Refer & Earn 🚀</h1>
          <p style="color: #64748b;">Invite friends and earn rewards as they grow.</p>
        </div>
        <div style="background: rgba(74, 222, 128, 0.1); color: #4ade80; padding: 12px 24px; border-radius: 50px; border: 1px solid rgba(74, 222, 128, 0.2); font-weight: 700; font-size: 0.9rem;">
          <i class="fas fa-certificate" style="margin-right: 8px;"></i> Verified Affiliate Account
        </div>
      </div>

      <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
        <div class="metric-card" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${r}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Direct Earning</span>
          </div>
        </div>
        <div class="metric-card" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${i}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Passive Earning</span>
          </div>
        </div>
        <div class="metric-card" style="background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%); border: none;">
          <div class="metric-info">
            <h3 style="color: white; font-size: 1.8rem;">₹${s}</h3>
            <span style="color: rgba(255,255,255,0.8); font-weight: 600;">Friend's Discount</span>
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 3rem;">
        <div class="chart-container" style="margin-bottom: 0;">
          <h3 style="margin-bottom: 1.5rem;"><i class="fas fa-share-nodes" style="color: #6366f1; margin-right: 12px;"></i>Your Referral Hub</h3>
          <p style="color: #64748b; margin-bottom: 2.5rem; line-height: 1.6;">Use the tools below to share your unique link. When someone joins through you, they get an instant <strong>₹${s} discount</strong>, and you earn <strong>₹${r}</strong>!</p>
          
          <div style="margin-bottom: 2rem;">
            <label style="color: #64748b; display: block; margin-bottom: 0.75rem; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Direct Affiliate Link</label>
            <div style="display: flex; gap: 10px; background: #f8fafc; padding: 8px; border-radius: 12px; border: 1px solid #e2e8f0; align-items: center;">
              <code style="flex-grow: 1; padding: 10px; color: #1e293b; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t}/?ref=${e}</code>
              <button class="btn btn-primary copy-btn" data-text="${t}/?ref=${e}" style="padding: 10px 20px; font-size: 0.9rem; border-radius: 8px; flex-shrink: 0;">
                <i class="fas fa-copy"></i> Copy Link
              </button>
            </div>
          </div>

          <div>
            <label style="color: #64748b; display: block; margin-bottom: 0.75rem; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;">Personal Referral Code</label>
            <div style="display: flex; gap: 10px; background: #f8fafc; padding: 8px; border-radius: 12px; border: 1px dashed #6366f1; align-items: center;">
              <div style="flex-grow: 1; padding: 10px; color: #6366f1; font-weight: 800; font-size: 1.4rem; letter-spacing: 2px;">${e}</div>
              <button class="btn btn-outline copy-btn" data-text="${e}" style="padding: 10px 20px; font-size: 0.9rem; border-radius: 8px; border-color: #6366f1; color: #6366f1; flex-shrink: 0;">
                <i class="fas fa-copy"></i> Copy Code
              </button>
            </div>
          </div>
        </div>

        <div class="chart-container" style="margin-bottom: 0; background: #0f172a; color: white;">
          <h4 style="color: white; margin-bottom: 2rem; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-info-circle" style="color: #4ade80;"></i> How it works?
          </h4>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">1</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Share your link</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">People signup using your unique affiliate URL or code.</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">2</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Friend gets discount</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">They receive an instant ₹${s} discount on any package they buy.</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">3</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">You get paid</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">You earn ₹${r} direct commission per signup!</div>
              </div>
            </div>
            <div style="display: flex; gap: 15px;">
              <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #4ade80; font-weight: 800;">4</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 4px;">Passive earnings</div>
                <div style="font-size: 0.85rem; color: #94a3b8;">Earn ₹${i} for every sale made by your direct referrals.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(to right, #f8fafc, #eff6ff); border-radius: 20px; padding: 2rem; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 60px; height: 60px; background: white; border-radius: 15px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05); font-size: 1.5rem;">🏆</div>
          <div>
            <h4 style="margin-bottom: 4px;">Top Affiliate Program</h4>
            <p style="color: #64748b; font-size: 0.9rem; margin: 0;">Be a part of our elite community and earn globally.</p>
          </div>
        </div>
        <button class="btn btn-outline" style="border-radius: 10px;">View Affiliate Policy</button>
      </div>
    </section>
  `},z0=()=>{const e=!!(m.userData||{}).referrerId,t=m.commissionSettings.referralDiscount||100,r=[{name:"Grow",price:599,features:["Social Media Basics","Profile Optimization","Basics of Affiliate"]},{name:"Creator",price:1299,features:["Video Editing","Content Strategy","Canva Design Mastery"]},{name:"Premium",price:2499,features:["Advanced Sales Funnels","Meta Ads Mastery","Personal Branding","1-on-1 Mentorship"],best:!0}];return`
    <section class="main-content animate-fade">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Scale Your Success 🚀</h1>
        <p style="color: #64748b; font-size: 1.1rem; max-width: 700px; margin: 0 auto;">
          Choose the perfect path to accelerate your digital career and maximize your earning potential.
        </p>
        ${e?`
          <div style="margin-top: 2rem; display: inline-flex; align-items: center; gap: 10px; background: #ecfdf5; color: #059669; padding: 12px 24px; border-radius: 50px; border: 1px solid #10b981; font-weight: 700; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);">
            <i class="fas fa-gift"></i> Special Referral Discount Applied: -₹${t}
          </div>
        `:""}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding-bottom: 4rem;">
        ${r.map(i=>{const s=e?i.price-t:i.price;return`
            <div class="upgrade-card ${i.best?"featured":""}" style="background: white; border-radius: 24px; padding: 2.5rem; border: 1px solid #f1f5f9; display: flex; flex-direction: column; position: relative; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); ${i.best?"box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25); border: 2px solid #6366f1;":"box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);"}">
              ${i.best?'<div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #6366f1; color: white; padding: 6px 20px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; letter-spacing: 1px;">BEST VALUE</div>':""}
              <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem;">${i.name} Package</h3>
                <div style="display: flex; align-items: baseline; gap: 8px;">
                  <span style="font-size: 2.5rem; font-weight: 900; color: #0f172a;">₹${s}</span>
                  ${e?`<span style="text-decoration: line-through; color: #94a3b8; font-weight: 600;">₹${i.price}</span>`:""}
                </div>
              </div>
              <ul style="list-style: none; padding: 0; margin: 0 0 2.5rem; flex-grow: 1;">
                ${i.features.map(a=>`
                  <li style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; color: #475569; font-weight: 500;">
                    <i class="fas fa-check-circle" style="color: #6366f1;"></i> ${a}
                  </li>
                `).join("")}
              </ul>
              <button class="btn" style="width: 100%; height: 55px; border-radius: 12px; font-weight: 800; font-size: 1rem; transition: all 0.2s; ${i.best?"background: #6366f1; color: white;":"background: #f8fafc; color: #1e293b; border: 1px solid #e2e8f0;"}">
                Get Started Now <i class="fas fa-arrow-right" style="margin-left: 8px; font-size: 0.8rem;"></i>
              </button>
            </div>
          `}).join("")}
      </div>
      
      <div style="background: #f8fafc; border-radius: 20px; padding: 2.5rem; text-align: center; border: 1px dashed #cbd5e1;">
        <h3>Custom Enterprise Solutions?</h3>
        <p style="color: #64748b; margin: 0.5rem 0 1.5rem;">For team licenses or custom training bundles, contact our support team.</p>
        <button class="btn btn-outline" style="border-radius: 10px;">Contact Support</button>
      </div>
    </section>
  `},nh=()=>`
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Privacy Policy 🛡️</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Your trust is our priority. Learn how we handle your data with care at Skill Futures.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(99, 102, 241, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid #6366f1; margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #4338ca;">Welcome to Skill Futures 🚀</h2>
          <p>We are delighted to welcome you to Skill Futures, a platform dedicated to empowering individuals through skills, learning, and growth. Your trust is extremely important to us, and we are committed to protecting your privacy while providing you with a safe and valuable learning experience.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Introduction</h3>
            <p style="color: #475569;">At Skill Futures, we value your trust and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, protect, and manage your data in a transparent and responsible manner.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Information We Collect</h3>
            <p style="color: #475569;">When you use our website or services, we may collect basic information such as your name, contact details, and your activity on our platform. This information is collected only to the extent necessary to provide you with a better and more personalized experience.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Use of Your Information</h3>
            <p style="color: #475569;">Your information is used strictly to enhance your experience. This includes recommending relevant courses, sending important updates, and understanding your needs. We do not misuse your data for any unethical or unauthorized purposes.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Secure Transactions</h3>
            <p style="color: #475569;">All payments made on our platform are processed through secure and trusted payment gateways. We do not store your financial information, ensuring complete safety of your transactions.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Data Protection & Security</h3>
            <p style="color: #475569;">We implement advanced security measures to protect your personal data from unauthorized access, misuse, or disclosure. However, due to the nature of the internet, we also encourage users to remain cautious and protect their personal information.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">6. Use of Cookies</h3>
            <p style="color: #475569;">We use cookies to analyze user behavior and improve website performance. Cookies help us make the platform faster, smoother, and more user-friendly. You have full control over whether to accept or disable cookies.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">7. Data Sharing Policy</h3>
            <p style="color: #475569;">We respect your privacy and do not sell your personal information. Your data may only be shared with trusted partners when necessary for essential services such as payment processing or technical support.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">8. User Rights</h3>
            <p style="color: #475569;">You have full control over your data. You can access, update, or request deletion of your personal information at any time. We ensure that all such requests are handled promptly and responsibly.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">9. Third-Party Links</h3>
            <p style="color: #475569;">Our platform may contain links to external websites. Once you leave our platform, your privacy will be governed by the policies of those respective websites. We recommend reviewing their policies carefully.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">10. Policy Updates</h3>
            <p style="color: #475569;">We may update this Privacy Policy from time to time as our services evolve. All updates will be clearly communicated on this page to keep you informed.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">11. Contact & Support</h3>
            <p style="color: #475569;">If you have any questions, concerns, or requests regarding your privacy, you can contact us anytime. We are always here to support and assist you.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">12. Data Retention</h3>
            <p style="color: #475569;">We retain your personal information only for as long as necessary to provide services or comply with legal obligations. Once the data is no longer needed, it is securely deleted.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">13. Automated Systems & Tracking</h3>
            <p style="color: #475569;">We may use automated tools to analyze user behavior, such as tracking page visits and engagement. This helps us improve our services and user experience without compromising your privacy.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">14. Children’s Privacy</h3>
            <p style="color: #475569;">Our services are not specifically intended for individuals under the age of 18. We do not knowingly collect data from minors. If such data is identified, it will be removed immediately.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">15. Misuse Protection</h3>
            <p style="color: #475569;">To maintain a safe environment, we monitor activities on our platform. Any suspicious or harmful behavior may result in temporary or permanent account suspension.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">16. Learning Eligibility</h3>
            <p style="color: #475569;">Our platform is open to anyone who is willing to learn and grow. However, users under the age of 18 are advised to use our services under parental or guardian guidance.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">17. User Conduct & Legal Action</h3>
            <p style="color: #475569;">We maintain a strict policy against misconduct, abusive behavior, fraud, or misleading activities. Any violation may lead to strict actions including account suspension, permanent ban, or legal proceedings if required.</p>
          </article>
        </div>

        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #f1f5f9; text-align: center;">
          <h3 style="color: #1e1b4b;">Final Agreement</h3>
          <p style="color: #64748b;">By accessing and using Skill Futures, you agree to this Privacy Policy. We are committed to maintaining transparency, trust, and a secure environment for all our users.</p>
          
          <div style="margin-top: 2rem;">
            <div style="color: #4338ca; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">🌟 Our Mission</div>
            <p style="color: #64748b;">To empower individuals with skills, knowledge, and opportunities that transform their future.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`,rh=()=>`
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Refund & Return Policy 💳</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Clear, fair, and transparent policies for your peace of mind.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(14, 165, 233, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid var(--accent); margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #0284c7;">1. Overview</h2>
          <p>At Skill Futures, we aim to provide high-quality digital learning experiences to all our users. We believe in transparency and fairness, and our refund policy is designed to ensure a smooth and trustworthy experience.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Refund Window</h3>
            <p style="color: #475569;">We offer a <strong>3-day refund window</strong> from the date of purchase. Users can request a refund within this period if they are not satisfied with their purchase.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Eligibility Criteria</h3>
            <ul style="color: #475569; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
              <li>The request must be made within 3 days of purchase.</li>
              <li>The course/service should not be significantly accessed or completed.</li>
              <li>Valid purchase details or proof must be provided.</li>
            </ul>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Affiliate / Referral Purchases</h3>
            <p style="color: #475569;">In case of purchases made through any affiliate or referral link, refund requests are still accepted within the 3-day window. However, once the allowed time period has passed, no refund requests will be considered.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Processing Charges</h3>
            <p style="color: #475569;">For all approved refunds, a <strong>2% processing fee</strong> will be deducted from the total paid amount. The remaining amount will be refunded to the original payment method.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">6. Refund Process</h3>
            <p style="color: #475569;">Once a refund request is submitted, our team will review and verify the request. You will be notified via email regarding the approval or rejection. If approved, the refund will be processed within 5–7 business days.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">7. Late or Missing Refunds</h3>
            <p style="color: #475569;">If you haven’t received your refund, please check your bank account or contact your payment provider. If needed, reaching out to our support team is always an option.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">8. How to Request a Refund</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 1rem; font-weight: 700;">Please provide these details:</p>
              <ul style="list-style: none; color: #475569; display: flex; flex-direction: column; gap: 0.4rem;">
                <li>📍 Full Name</li>
                <li>📧 Registered Email ID</li>
                <li>📅 Date of Purchase</li>
                <li>🎓 Course Name</li>
                <li>💡 Reason for Refund</li>
              </ul>
              <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dotted #cbd5e1;">
                <p><strong>Contact Support:</strong> skillfuturessupport@gmail.com</p>
                <p><strong>WhatsApp:</strong> +91 8923938520</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`,ih=()=>`
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Website Disclaimer ⚖️</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Important information regarding our services and your success journey.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(99, 102, 241, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid #6366f1; margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #4338ca;">Welcome to Skill Futures 🚀</h2>
          <p>We are glad to have you here. At Skill Futures, our mission is to guide you with the right knowledge, practical skills, and continuous support so you can grow and achieve your personal and professional goals with confidence.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Educational Purposes Only</h3>
            <p style="color: #475569;">All information, courses, and services provided on this website are intended for educational and informational purposes only. Our goal is to provide you with the right direction and essential skills to achieve your goals effectively.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. Results May Vary</h3>
            <p style="color: #475569;">Any examples related to earnings, digital marketing, or affiliate marketing shared on our platform are for educational and motivational purposes only. Actual results depend on individual effort, learning ability, consistency, and implementation.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Personal Responsibility</h3>
            <p style="color: #475569;">Any decisions or actions you take based on the information provided on this platform involve your active participation and responsibility. We encourage you to make informed and thoughtful decisions.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Our Commitment</h3>
            <p style="color: #475569;">At Skill Futures, we are committed to providing you with the right guidance and continuous support. Our team and founder sincerely work towards helping you grow and move forward confidently towards your goals.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Safe Learning Environment</h3>
            <p style="color: #475569;">Our objective is to create a positive, safe, and supportive learning environment for everyone. Your trust is extremely important to us, and we are committed to maintaining it with honesty and dedication.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">Need Help?</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 1rem; color: #475569;">For any information or support, our team is here to assist you:</p>
              <div style="display: flex; flex-direction: column; gap: 0.8rem; font-weight: 600;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fas fa-envelope" style="color: #6366f1;"></i>
                  <span>skillfuturessupport@gmail.com</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fab fa-whatsapp" style="color: #25d366;"></i>
                  <span>8923938520</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`,sh=()=>`
  <section class="main-content animate-fade">
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Terms & Conditions 📜</h1>
        <p style="color: #64748b; font-size: 1.1rem;">Please read these terms carefully before using our platform.</p>
      </div>

      <div class="chart-container" style="padding: 3rem; line-height: 1.8;">
        <div style="background: rgba(14, 165, 233, 0.05); padding: 2rem; border-radius: 15px; border-left: 4px solid var(--accent); margin-bottom: 3rem;">
          <h2 style="margin-top: 0; color: #0284c7;">Welcome to Skill Futures</h2>
          <p>By accessing and using our platform, you agree to follow the guidelines mentioned below. Our platform is intended for educational and skill development purposes, providing you with the right knowledge, guidance, and support to help you grow effectively.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">1. Performance & Results</h3>
            <p style="color: #475569;">Results achieved through our platform may vary from person to person, as they depend on individual effort, consistency, and implementation. We provide the tools, but your success is in your hands.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">2. User Conduct</h3>
            <p style="color: #475569;">Users are expected to maintain respectful and positive behavior at all times. Any activity that negatively affects other users or the platform environment may lead to restricted or removed access.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">3. Commitment & Responsibility</h3>
            <p style="color: #475569;">Skill Futures promotes transparency and responsibility. If any user is involved in commitments related to services, it is expected that they act honestly and deliver as promised.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">4. Intellectual Property</h3>
            <p style="color: #475569;">All content available on this platform, including text, videos, and materials, belongs to Skill Futures. Unauthorized use, copying, or distribution is strictly prohibited.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">5. Service Improvements</h3>
            <p style="color: #475569;">Skill Futures may update or improve its services, content, or policies at any time to enhance the user experience and maintain the highest quality of education.</p>
          </article>

          <article>
            <h3 style="color: #0f172a; margin-bottom: 0.75rem;">Need Help?</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
              <p style="margin-bottom: 0.5rem; color: #475569;">If you have any questions, reach out to us:</p>
              <div style="display: flex; align-items: center; gap: 10px; font-weight: 600;">
                <i class="fas fa-envelope" style="color: var(--accent);"></i>
                <span>skillfuturessupport@gmail.com</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
`,j0=()=>`
  <div class="hero">
    <img src="/logo.png" alt="Logo" style="height: 80px; margin-bottom: 2rem;">
    <h2>Empower Your Digital Journey</h2>
    <p style="font-size: 1.2rem; color: var(--text-dim); max-width: 600px; margin: 0 auto 2rem;">
      The ultimate platform to master digital skills and build a sustainable affiliate income.
    </p>
    <button class="btn btn-primary" data-route="signup">Start Your Journey</button>
  </div>
`,oh=n=>`
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
            <input type="text" id="signupReferral" class="auth-input" placeholder="Referral Code" value="${sessionStorage.getItem("referralCode")||""}">
            ${sessionStorage.getItem("referralCode")?'<p style="font-size: 0.75rem; color: #4ade80; font-weight: 600; margin-top: 4px;"><i class="fas fa-check-circle"></i> Referral Applied!</p>':""}
          </div>
        `:""}
        
        <button type="submit" class="btn-auth">
          ${n==="login"?"Sign In":"Sign Up"} <i class="fas fa-arrow-right"></i>
        </button>
      </form>

      <div class="auth-divider">
        <span>OR</span>
      </div>

      <button class="btn-google" id="googleSignInBtn">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" alt="Google">
        Continue with Google
      </button>
      
      <div class="auth-footer">
        ${n==="login"?`Don't have an account? <span id="toSignUp" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Sign Up</span>`:'Already have an account? <span id="toSignIn" style="color: #5e5ce6; font-weight: 700; cursor: pointer;">Login</span>'}
      </div>
    </div>
  </div>
`,ah=()=>`
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-col" style="flex: 1.5;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1rem;">
          <img src="/logo.png" alt="Logo" style="height: 40px;"/>
        </div>
        <div style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">"Empower Your Digital Journey"</div>
        <p class="footer-description">
          An E-learning platform that helps people build their own personal brand on social media and create passive income.
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
          <li><a data-route="disclaimer" style="cursor: pointer;">Disclaimer</a></li>
          <li><a data-route="privacy-policy" style="cursor: pointer;">Privacy Policy</a></li>
          <li><a data-route="refund-policy" style="cursor: pointer;">Refund Policy</a></li>
          <li><a data-route="terms" style="cursor: pointer;">Terms & Conditions</a></li>
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
      </div>
    </div>
    
    <div class="footer-bottom">
      <div>Copyright © 2026. All rights reserved.</div>
      <div data-route="admin-dashboard" style="color: #ef4444; font-weight: 800; cursor: pointer; font-size: 0.75rem; letter-spacing: 1px; margin-left: 1rem;">[ ADMIN PANEL ]</div>
    </div>
  </footer>
`,Q=()=>{const n=document.querySelector("#app");if(m.user){const e=m.view.startsWith("admin-")&&(m.isAdmin||m.developerMode);m.view.startsWith("admin-")&&m.isAdmin;let t="";switch(m.view){case"dashboard":t=th();break;case"trainings":t=F0();break;case"courses":t=CourseListView();break;case"affiliate-link":t=B0();break;case"leaderboard":t=U0();break;case"team":t=$0();break;case"wallet":t=q0();break;case"profile":t=P0();break;case"privacy-policy":t=nh();break;case"refund-policy":t=rh();break;case"disclaimer":t=ih();break;case"terms":t=sh();break;case"upgrade":t=z0();break;case"admin-dashboard":t=C0();break;case"admin-users":t=k0();break;case"admin-courses":t=x0();break;case"admin-payouts":t=D0();break;case"admin-notices":t=N0();break;case"admin-settings":t=V0();break;case"training":t=(()=>{const r=m.courses.find(a=>a.id===m.selectedCourseId)||m.courses[0]||{},i=m.userCourses.find(a=>a.courseId===r.id)||{},s=i.completedLessons||[];return`
            <section class="main-content animate-fade">
              <h1 style="margin-bottom: 0.5rem;">${r.title||"Course Training"}</h1>
              <p style="color: #64748b; margin-bottom: 2rem;">Master your skills with ${r.title}</p>
              <div class="metrics-grid training-player-grid" style="grid-template-columns: 2fr 1fr; gap: 2rem;">
                <div class="chart-container" style="padding: 0; overflow: hidden; background: black; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
                  <div style="aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; background: #1e1b4b;">
                    <i class="fas fa-play-circle" style="font-size: 5rem; color: #4338ca; cursor: pointer;"></i>
                  </div>
                </div>
                <div class="chart-container" style="overflow-y: auto; max-height: 500px; display: flex; flex-direction: column;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0;">Course Modules</h3>
                    <span style="font-size: 0.8rem; font-weight: 700; color: #16a34a;">${i.progress||0}% Complete</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${Array.from({length:r.totalLessons||5}).map((a,c)=>{const u=`L${c+1}`,d=s.includes(u);return`
                        <div class="training-module ${d?"completed":""}" 
                             onclick="window.updateProgress('${r.id}', '${u}')"
                             style="padding: 1.2rem; background: ${d?"#f0fdf4":"white"}; border-radius: 12px; border: 1px solid ${d?"#bcf0da":"#f1f5f9"}; display: flex; align-items: center; gap: 1rem; cursor: pointer; transition: all 0.2s;">
                          <div style="width: 24px; height: 24px; border-radius: 50%; background: ${d?"#22c55e":"#f1f5f9"}; display: flex; align-items: center; justify-content: center; color: ${d?"white":"#94a3b8"};">
                            ${d?'<i class="fas fa-check" style="font-size: 0.7rem;"></i>':c+1}
                          </div>
                          <span style="font-weight: 600; color: ${d?"#166534":"#1e293b"}; flex-grow: 1;">Lesson ${c+1}: Module Title</span>
                          ${d?"":'<i class="fas fa-play" style="font-size: 0.8rem; color: #4338ca;"></i>'}
                        </div>`}).join("")}
                  </div>
                </div>
              </div>
            </section>`})();break;case"webinars":t=`
          <section class="main-content animate-fade">
            <h1 style="margin-bottom: 2rem;">Live Webinars</h1>
            <div class="metrics-grid">
              <div class="chart-container" style="background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: white; border: none;">
                <div style="font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem;">Next Session</div>
                <h2>Strategic Scaling & Passive Income</h2>
                <p style="margin: 1rem 0; opacity: 0.9;">Join us this Sunday for an exclusive session with top earners.</p>
                <div style="display: flex; gap: 20px; font-weight: 700;"><div>24h : 12m : 44s</div></div>
                <button class="btn" style="background: white; color: #4338ca; margin-top: 2rem; width: 100%;">Set Reminder</button>
              </div>
              <div class="chart-container"><h3>Recent Recordings</h3></div>
            </div>
          </section>`;break;default:["reports","offers","earning-target","create-account"].includes(m.view)?t=`
            <section class="main-content animate-fade-up">
              <h1>${m.view.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}</h1>
              <div class="chart-container" style="text-align: center; padding: 5rem;">
                <i class="fas fa-tools" style="font-size: 4rem; color: #6366f1; margin-bottom: 2rem;"></i>
                <h2>Section Under Development</h2>
                <p style="color: #64748b;">We are working hard to bring this feature to your dashboard very soon!</p>
              </div>
            </section>`:t=th()}e?n.innerHTML=`
        ${eh?eh():""}
        ${M0(t)}
      `:n.innerHTML=`
        ${Zu?Zu():""}
        <div class="dashboard-container ${m.isSidebarVisible?"":"sidebar-hidden"}">
          ${L0()}
          <div id="main-view" style="flex-grow: 1; overflow-y: auto;">
            ${t}
            ${ah()}
          </div>
        </div>
      `,m.view==="wallet"&&!m.fetched.userPayouts&&!m.loading.userPayouts&&Cp(),m.view==="leaderboard"&&m.leaderboard.length===0&&!m.loading.leaderboard&&p0(),m.view==="team"&&m.team.length===0&&!m.loading.team&&m0(),m.view==="courses"&&m.courses.length===0&&!m.loading.courses&&(ac(),cc()),m.view==="admin-dashboard"&&(!m.fetched.adminUsers&&!m.loading.adminUsers&&Xo(),!m.fetched.adminPayouts&&!m.loading.adminPayouts&&Zo(),!m.fetched.adminNotices&&!m.loading.adminNotices&&is()),m.view==="admin-users"&&!m.fetched.adminUsers&&!m.loading.adminUsers&&Xo(),m.view==="admin-payouts"&&!m.fetched.adminPayouts&&!m.loading.adminPayouts&&Zo(),m.view==="admin-notices"&&!m.fetched.adminNotices&&!m.loading.adminNotices&&is(),m.view==="admin-settings"&&!m.fetched.adminSettings&&!m.loading.adminSettings&&w0()}else n.innerHTML=`
      <header style="padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--card-border);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="/logo.png" alt="Logo" style="height: 35px;"/>
        </div>
        <nav>${m.view==="home"?'<button class="btn btn-primary" data-route="signup">Join Now</button><button class="btn btn-outline" data-route="login" style="margin-left:1rem;">Login</button>':""}</nav>
      </header>
      <main>${m.view==="home"?j0():m.view==="privacy-policy"?nh():m.view==="refund-policy"?rh():m.view==="disclaimer"?ih():m.view==="terms"?sh():m.view==="login"?oh("login"):oh("signup")}</main>
      ${ah()}
    `;W0()},W0=()=>{document.querySelectorAll("[data-route]").forEach(R=>{R.onclick=()=>{m.view=R.dataset.route,window.innerWidth<=768&&(m.isSidebarVisible=!1),Q()}});const n=document.querySelector("#mobileOverlay")||document.querySelector("#adminMobileOverlay");n&&(n.onclick=()=>{m.isSidebarVisible=!1,Q()});const e=document.querySelector("#logoutBtn");e&&(e.onclick=()=>Gy(Dr));const t=document.querySelector("#sidebarToggle");t&&(t.onclick=()=>{m.isSidebarVisible=!m.isSidebarVisible,Q()});const r=document.querySelector("#sidebarToggleClose");r&&(r.onclick=()=>{m.isSidebarVisible=!1,Q()});const i=document.querySelector("#loginForm");i&&(i.onsubmit=async R=>{R.preventDefault();const k=document.querySelector("#loginEmail").value,D=document.querySelector("#loginPassword").value;try{await zy(Dr,k,D)}catch(x){alert(x.message)}});const s=document.querySelector("#googleSignInBtn");s&&(s.onclick=v0);const a=document.querySelector("#signupForm");a&&(a.onsubmit=async R=>{R.preventDefault();const k=document.querySelector("#signupEmail").value,D=document.querySelector("#signupPassword").value,x=document.querySelector("#signupName").value,B=document.querySelector("#signupReferral").value;try{let F=null;if(B){const Z=Jt(Ue(J,"users"),Kn("referralCode","==",B.trim().toUpperCase()),Ka(1)),ee=await lt(Z);ee.empty||(F=ee.docs[0].id)}const z=await By(Dr,k,D),Y={name:x,email:k,todayEarnings:0,weeklyEarnings:0,monthlyEarnings:0,allTimeEarnings:0,passiveEarnings:0,industryEarnings:0,paidEarnings:0,referralCode:`FF-${z.user.uid.substring(0,5).toUpperCase()}`,referrerId:F,joinedAt:new Date().toISOString()};if(await Cs(ge(J,"users",z.user.uid),Y),F){await mt(ge(J,"users",F),{todayEarnings:on(m.commissionSettings.direct),weeklyEarnings:on(m.commissionSettings.direct),monthlyEarnings:on(m.commissionSettings.direct),allTimeEarnings:on(m.commissionSettings.direct)});const Z=await Qa(ge(J,"users",F));if(Z.exists()&&Z.data().referrerId){const ee=Z.data().referrerId;await mt(ge(J,"users",ee),{passiveEarnings:on(m.commissionSettings.passive),allTimeEarnings:on(m.commissionSettings.passive)})}}}catch(F){console.error(F),alert(F.message)}});const c=document.querySelector("#payoutForm");c&&(c.onsubmit=R=>{R.preventDefault(),_0(Number(document.querySelector("#payoutAmount").value),document.querySelector("#payoutUpi").value)}),window.enrollInCourse=g0,window.updateProgress=y0,document.querySelectorAll(".copy-btn").forEach(R=>{R.onclick=()=>d0(R.dataset.text)});const u=document.querySelector("#toSignUp");u&&(u.onclick=()=>{m.view="signup",Q()});const d=document.querySelector("#toSignIn");d&&(d.onclick=()=>{m.view="login",Q()}),document.querySelectorAll(".tab-btn").forEach(R=>{R.onclick=()=>{m.profileTab=R.dataset.tab,Q()}});const f=document.querySelector("#profileDetailsForm");f&&(f.onsubmit=async R=>{R.preventDefault();const k=document.querySelector("#editName").value,D=document.querySelector("#editPhone").value;try{await mt(ge(J,"users",m.user.uid),{name:k,phone:D}),m.userData.name=k,m.userData.phone=D,alert("Profile updated successfully! ✅"),Q()}catch(x){alert("Error updating profile: "+x.message)}});const y=document.querySelector("#welcomeModalOverlay");if(y){const R=document.querySelector("#closeWelcomeModal"),k=document.querySelector("#doNotShowCheckbox"),D=()=>{if(k&&k.checked){const x=new Date().getTime()+864e5;localStorage.setItem("hideWelcomeModalUntil",x)}m.showWelcomeModal=!1,Q()};R&&(R.onclick=D),y.onclick=x=>{x.target===y&&D()}}window.showCourseModal=R=>{const k=R?m.courses.find(x=>x.id===R):null;m.adminModal={type:"course",data:k},Q();const D=document.querySelector("#adminCourseForm");D&&(D.onsubmit=x=>{x.preventDefault(),A0({id:document.querySelector("#courseId").value,title:document.querySelector("#courseTitle").value,img:document.querySelector("#courseImg").value,category:document.querySelector("#courseCategory").value,totalLessons:Number(document.querySelector("#courseLessons").value)})})},window.filterAdminUsers=R=>{const k=R.toLowerCase();document.querySelectorAll("admin-users tbody tr"),document.querySelectorAll("tbody tr").forEach(D=>{const x=D.innerText.toLowerCase();D.style.display=x.includes(k)?"":"none"})},window.updatePayoutStatus=T0,window.deleteCourse=I0,window.showUserEditModal=R=>{const k=m.allUsers.find(x=>x.id===R);m.adminModal={type:"user-edit",data:k},Q();const D=document.querySelector("#adminUserEditForm");D&&(D.onsubmit=x=>{x.preventDefault(),E0(R,{name:document.querySelector("#editUserName").value,role:document.querySelector("#editUserRole").value,allTimeEarnings:Number(document.querySelector("#editUserEarnings").value),paidEarnings:Number(document.querySelector("#editUserPaid").value)})})};const E=document.querySelector("#adminSettingsForm");E&&(E.onsubmit=R=>{R.preventDefault(),b0({direct:Number(document.querySelector("#directComm").value),passive:Number(document.querySelector("#passiveComm").value),referralDiscount:Number(document.querySelector("#referralDiscount").value)})}),window.showNoticeModal=()=>{m.adminModal={type:"notice",data:null},Q();const R=document.querySelector("#adminNoticeForm");R&&(R.onsubmit=k=>{k.preventDefault(),R0({title:document.querySelector("#noticeTitle").value,message:document.querySelector("#noticeMessage").value}),m.adminModal=null,Q()})},window.deleteNotice=S0};Hy(Dr,n=>{if(m.user=n,n){if(f0(n.uid),["home","login","signup"].includes(m.view)){m.view="dashboard";const e=localStorage.getItem("hideWelcomeModalUntil"),t=new Date().getTime();(!e||t>parseInt(e))&&(m.showWelcomeModal=!0)}}else m.userData=null,["login","signup"].includes(m.view)||(m.view="home");Q()});
