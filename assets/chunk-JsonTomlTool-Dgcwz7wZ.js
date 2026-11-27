var oe=Object.defineProperty;var Z=e=>{throw TypeError(e)};var le=(e,n,r)=>n in e?oe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var v=(e,n,r)=>le(e,typeof n!="symbol"?n+"":n,r),V=(e,n,r)=>n.has(e)||Z("Cannot "+r);var O=(e,n,r)=>(V(e,n,"read from private field"),r?r.call(e):n.get(e)),k=(e,n,r)=>n.has(e)?Z("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(e):n.set(e,r),A=(e,n,r,t)=>(V(e,n,"write to private field"),t?t.call(e,r):n.set(e,r),r);import{u as ae,r as J,j as p,C as fe,a as ue,B as L,F as G,T as K}from"./chunk-main-D7HMwKs5.js";import{F as W,c as de}from"./chunk-tool-utils-PPPJgd05.js";/* empty css                          *//* empty css                            */import{A as Y}from"./chunk-arrow-right-left-woXGFDmL.js";import{F as pe}from"./chunk-flask-conical-D-krOgib.js";import{E as he}from"./chunk-eraser-B_7ou-ke.js";import{C as q}from"./chunk-copy-2kRKbwlh.js";import{D as X}from"./chunk-download-BxjTcxXZ.js";/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function me(e,n){let r=e.slice(0,n).split(/\r?\n/);return[r.length,r.pop().length+1]}function ce(e,n,r){let t=e.split(/\r?\n/),o="",s=(Math.log10(n+1)|0)+1;for(let i=n-1;i<=n+1;i++){let l=t[i-1];l&&(o+=i.toString().padEnd(s," "),o+=":  ",o+=l,o+=`
`,i===n&&(o+=" ".repeat(s+r+2),o+=`^
`))}return o}class u extends Error{constructor(r,t){const[o,s]=me(t.toml,t.ptr),i=ce(t.toml,o,s);super(`Invalid TOML document: ${r}

${i}`,t);v(this,"line");v(this,"column");v(this,"codeblock");this.line=o,this.column=s,this.codeblock=i}static x(r,t,o){throw new u(r,{toml:t.s,ptr:o??t.p})}}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function ee(e){let n=e.p,r=e.s.charCodeAt(e.p++),t=r,o=r===39,s=r===e.s.charCodeAt(e.p)&&r===e.s.charCodeAt(e.p+1);s&&((r=e.s.charCodeAt(e.p+=2))===10?e.p++:r===13&&e.s.charCodeAt(e.p+1)===10&&(e.p+=2));let i="",l=e.p,f=0;for(;e.p<e.s.length;e.p++)if(r=e.s.charCodeAt(e.p),s&&(r===10||r===13&&e.s.charCodeAt(e.p+1)===10))f=f&&3;else if(r<32&&r!==9||r===127)u.x("control characters are not allowed in strings",e);else if((!f||f===3)&&r===t&&(!s||e.s.charCodeAt(e.p+1)===t&&e.s.charCodeAt(e.p+2)===t)){if(s&&(e.s.charCodeAt(e.p+3)===t&&e.p++,e.s.charCodeAt(e.p+3)===t&&e.p++),!f){let a=e.s.slice(l,e.p);i=i?i+a:a}return e.p+=s?3:1,i}else if(!f)!o&&r===92&&(i+=e.s.slice(l,l=e.p),f=1);else if(f===1)if(r===120||r===117||r===85){let a=e.p++-1,d=0,h=r===120?2:r===117?4:8;for(let g=0;g<h;g++,e.p++){let c=e.s.charCodeAt(e.p),b=c>=48&&c<=57?c-48:c>=65&&c<=70?c-65+10:c>=97&&c<=102?c-97+10:-1;b<0&&u.x("invalid non-hex character in unicode escape",e),d=d<<4|b}(d<0||d>1114111||d>=55296&&d<=57343)&&u.x("invalid unicode escape",e,a),i+=String.fromCodePoint(d),l=e.p--,f=0}else s&&(r===32||r===9)?f=2:(r===98?i+="\b":r===116?i+="	":r===110?i+=`
`:r===102?i+="\f":r===114?i+="\r":r===101?i+="\x1B":r===34?i+='"':r===92?i+="\\":u.x("unrecognised escape sequence",e),l=e.p+1,f=0);else r!==32&&r!==9&&(f===2&&u.x("invalid escape: only line-ending whitespace may be escaped",e,l),f=!o&&r===92?1:0,l=e.p);u.x("unfinished string",e,n)}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */let ge=/^(\d{4}-\d{2}-\d{2})?[Tt ]?(?:(\d{2}):\d{2}(?::\d{2}(?:\.\d+)?)?)?(Z|z|[-+]\d{2}:\d{2})?$/i;var C,y,T;const _=class _ extends Date{constructor(r,t,o){let s=!0,i=!0,l="Z",f;if(typeof r=="string")if(t)e:{if(t<3){if(+r.slice(11,13)>23){r="";break e}t===2?(l=null,r+="Z"):(f=r.charCodeAt(r.length-1))!==90&&f!==122&&(l=r.slice(r.length-6)),o&&(r=r.slice(0,10)+"T"+r.slice(11))}else t===4&&(r=+r.slice(0,2)>23?"":`0000-01-01T${r}Z`);s=t!==4,i=t!==3}else{let a=r.match(ge);a?(a[1]||(s=!1,r=`0000-01-01T${r}`),i=!!a[2],i&&r[10]===" "&&(r=r.replace(" ","T")),a[2]&&+a[2]>23?r="":(l=a[3]||null,!l&&i&&(r+="Z"))):r=""}super(r);k(this,C,!1);k(this,y,!1);k(this,T,null);isNaN(this.getTime())||(A(this,C,s),A(this,y,i),A(this,T,l))}isDateTime(){return O(this,C)&&O(this,y)}isLocal(){return!O(this,C)||!O(this,y)||!O(this,T)}isDate(){return O(this,C)&&!O(this,y)}isTime(){return O(this,y)&&!O(this,C)}isValid(){return O(this,C)||O(this,y)}toISOString(){let r=super.toISOString();if(this.isDate())return r.slice(0,10);if(this.isTime())return r.slice(11,23);if(O(this,T)===null)return r.slice(0,-1);if(O(this,T)==="Z"||O(this,T)==="z")return r;let t=+O(this,T).slice(1,3)*60+ +O(this,T).slice(4,6);return t=O(this,T)[0]==="-"?t:-t,new Date(this.getTime()-t*6e4).toISOString().slice(0,-1)+O(this,T)}static wrapAsOffsetDateTime(r,t="Z"){let o=new _(r);return A(o,T,t),o}static wrapAsLocalDateTime(r){let t=new _(r);return A(t,T,null),t}static wrapAsLocalDate(r){let t=new _(r);return A(t,y,!1),A(t,T,null),t}static wrapAsLocalTime(r){let t=new _(r);return A(t,C,!1),A(t,T,null),t}};C=new WeakMap,y=new WeakMap,T=new WeakMap;let $=_;/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function S(e,n=10){return n===16?e>47&&e<58||e>64&&e<71||e>96&&e<103:e>47&&e<48+n}function x(e,n){return e===32||e===9||e===10||e===13||n&&(e===n||e===44)||e===35}function F(e,n){let r=e.p,t=e.s.charCodeAt(e.p);if(t===91||t===123){e.d--||u.x("document contains excessively nested structures. aborting.",e);let o=t===91?be(e):Se(e);return e.d++,o}return t===34||t===39?ee(e):t===116?((e.s.charCodeAt(++e.p)!==114||e.s.charCodeAt(++e.p)!==117||e.s.charCodeAt(++e.p)!==101)&&u.x("invalid value",e,r),e.p++,!0):t===102?((e.s.charCodeAt(++e.p)!==97||e.s.charCodeAt(++e.p)!==108||e.s.charCodeAt(++e.p)!==115||e.s.charCodeAt(++e.p)!==101)&&u.x("invalid value",e,r),e.p++,!1):t===43||t===45?I(e,e.p,e.s.charCodeAt(++e.p),44-t,n):e.s.charCodeAt(e.p+4)===45&&e.s.charCodeAt(e.p+7)===45?Oe(e,t,n):e.s.charCodeAt(e.p+2)===58?Te(e,t,n):I(e,e.p,t,0,n)}function I(e,n,r,t,o){let s=r,i=0,l=!1;if(s===105)return(e.s.charCodeAt(++e.p)!==110||e.s.charCodeAt(++e.p)!==102)&&u.x("invalid value",e,n),e.p++,(t||1)/0;if(s===110)return(e.s.charCodeAt(++e.p)!==97||e.s.charCodeAt(++e.p)!==110)&&u.x("invalid value",e,n),e.p++,NaN;if(s===48){if(++e.p>=e.s.length||x(s=e.s.charCodeAt(e.p),o))return e.bi===!0?0n:0;if(!t){if(s===120)return D(e,n,16,o);if(s===98)return D(e,n,2,o);if(s===111)return D(e,n,8,o)}s===46?i=2:s===101||s===69?i=4:u.x("illegal leading zero",e,n)}else S(s)||u.x("invalid value",e,n);for(;++e.p<e.s.length&&(s=e.s.charCodeAt(e.p),!x(s,o));)i||(i=1),s===95?(i&1||u.x("illegal underscore",e),i+=11,l=!0):i===1&&s===46?i=2:(i===1||i===3)&&(s===101||s===69)?i=4:i===4&&(s===43||s===45)?i=6:S(s)?i>9?i-=11:i&1||i++:u.x("illegal character in numeric literal",e);if(!i){let a=(r-48)*(t||1);return e.bi===!0?BigInt(a):a}i&1||u.x("unfinished numeric value",e,n);let f=e.s.slice(n,e.p);return l&&(f=f.replaceAll("_","")),i>1?parseFloat(f):re(e,f,10,n)}function D(e,n,r,t){let o,s=1;for(;++e.p<e.s.length&&(o=e.s.charCodeAt(e.p),!x(o,t));)o===95?(s&1&&u.x("illegal underscore",e),s=3):S(o,r)?s&1&&s--:u.x("illegal character in numeric literal",e);s&1&&u.x("unfinished numeric value",e);let i=e.s.slice(n+2,e.p);return s&&(i=i.replaceAll("_","")),re(e,i,r,n)}function re(e,n,r,t){if(e.bi!==!0)e:{let o=parseInt(n,r);if(!Number.isSafeInteger(o)){if(e.bi)break e;u.x("integer value cannot be represented losslessly",e,t)}return o}return BigInt(r===10?n:(r===2?"0b":r===8?"0o":"0x")+n)}function Oe(e,n,r){let t=e.p++,o;if(!S(n)||!S(e.s.charCodeAt(e.p++))||!S(e.s.charCodeAt(e.p++))||!S(e.s.charCodeAt(e.p++)))return I(e,e.p=t,n,0,r);if(e.p+=5,S(e.s.charCodeAt(e.p++))||u.x("invalid date-time: date part is malformed",e,t),e.p>=e.s.length||((n=e.s.charCodeAt(e.p))!==32||(o=!0,!S(e.s.charCodeAt(e.p+1))))&&n!==84&&n!==116){let i=e.s.slice(t,e.p);return E(e,i,3,!1,t)}if(e.s.charCodeAt(e.p+=3)!==58&&u.x("invalid date-time: time part is malformed",e,t),e.s.charCodeAt(e.p+=3)===58&&(e.p+=3),e.s.charCodeAt(e.p)===46)for(;S(e.s.charCodeAt(++e.p)););if(n=e.s.charCodeAt(e.p)){if(n===90||n===122){let i=e.s.slice(t,++e.p);return E(e,i,1,o,t,"[+00:00]")}if(n===43||n===45){let i=e.s.slice(t,e.p+=6);return E(e,i,1,o,t,!e.ld&&"["+e.s.slice(e.p-6,e.p)+"]")}}let s=e.s.slice(t,e.p);return E(e,s,2,o,t)}function Te(e,n,r){let t=e.p;if(!S(n)||!S(e.s.charCodeAt(++e.p)))return I(e,--e.p,n,0,r);if(e.s.charCodeAt(e.p+=4)===58&&(e.p+=3),e.s.charCodeAt(e.p)===46)for(;S(e.s.charCodeAt(++e.p)););let o=e.s.slice(t,e.p);return E(e,o,4,!1,t)}function E(e,n,r,t,o,s){if(e.ld){let i=new $(n,r,t);return i.isValid()||u.x("invalid date",e,o),i}try{switch(s&&(n+=s),r){case 1:return Temporal.ZonedDateTime.from(n);case 2:return Temporal.PlainDateTime.from(n);case 3:return Temporal.PlainDate.from(n);case 4:return Temporal.PlainTime.from(n)}}catch(i){u.x(i instanceof Error?i.message:""+i,e,o)}}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function Ne(e){for(;e.p<e.s.length;e.p++){let n=e.s.charCodeAt(e.p);if(n===10)break;if(n===13&&e.s.charCodeAt(e.p+1)===10){e.p++;break}(n<32&&n!==9||n===127)&&u.x("control characters are not allowed in comments",e)}}function w(e,n,r){let t;for(;e.p<e.s.length;){for(;e.p<e.s.length&&((t=e.s.charCodeAt(e.p))===32||t===9||!n&&(t===10||t===13&&e.s.charCodeAt(e.p+1)===10));)e.p++;if(r||t!==35)break;Ne(e)}}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function U(e,n=61){let r,t=0,o=[],s,i=e.s.charCodeAt(r=e.p);do{if(i===n)return t||u.x("unexpected end of key",e),t===1&&o.push(e.s.slice(s,e.p)),e.p++,o;i===46?(t||u.x("illegal empty bare key",e),t===1&&o.push(e.s.slice(s,e.p)),t=0):!t&&(i===34||i===39)?(i===e.s.charCodeAt(e.p+1)&&i===e.s.charCodeAt(e.p+2)&&u.x("illegal quoted key: multiline strings are not allowed",e),o.push(ee(e)),t=2,e.p--):i===32||i===9?t===1&&(o.push(e.s.slice(s,e.p)),t=2):t===2||i<48&&i!==45||i>57&&i<65||i>90&&i<97&&i!==95||i>122?u.x("illegal character in key",e):t||(t=1,s=e.p)}while(i=e.s.charCodeAt(++e.p));u.x("incomplete key-value: cannot find end of key",e,r)}function Se(e){let n=e.p++,r=Object.create(null),t=new Set,o;for(;e.p<e.s.length;){if(w(e),(o=e.s.charCodeAt(e.p))===125)return e.p++,r;let s,i=r,l=!1,f=e.p,a=U(e);for(let h=0;h<a.length;h++){h&&(i=l?i[s]:i[s]=Object.create(null)),s=a[h],(l=Object.hasOwn(i,s))&&(typeof i[s]!="object"||t.has(i[s]))&&u.x("trying to redefine an already defined value",e,f);let g=s==="__proto__";if(e.uk&&(g||s==="constructor")){i=e.uk!==1&&u.x("document contains an unsafe property",e,f);break}!l&&g&&Object.defineProperty(i,s,{enumerable:!0,configurable:!0,writable:!0})}l&&u.x("trying to redefine an already defined value",e,f),w(e,!0,!0);let d=F(e,125);if(i&&typeof(i[s]=d)=="object"&&t.add(d),w(e),(o=e.s.charCodeAt(e.p++))===125)return r;o!==44&&u.x("expected comma or end of structure",e,e.p-1)}u.x("unfinished table",e,n)}function be(e){let n=e.p++,r=[],t;for(;e.p<e.s.length;){if(w(e),(t=e.s.charCodeAt(e.p))===93)return e.p++,r;if(r.push(F(e,93)),w(e),(t=e.s.charCodeAt(e.p++))===93)return r;t!==44&&u.x("expected comma or end of structure",e,e.p-1)}u.x("unfinished array",e,n)}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */function H(e,n,r,t,o){var d,h;let s=r,i=t,l,f=!1,a;for(let g=0;g<n.length;g++){if(g){if(s=f?s[l]:s[l]=Object.create(null),i=(a=i[l]).c,o===0&&(a.t===1||a.t===2))return null;if(a.t===2){let c=s.length-1;s=s[c],i=i[c].c}}if(l=n[g],(f=Object.hasOwn(s,l))&&((d=i[l])==null?void 0:d.t)===0&&((h=i[l])!=null&&h.d))return null;if(!f){let c=l==="__proto__";if(e.uk&&(c||l==="constructor"))return!1;c&&(Object.defineProperty(s,l,{enumerable:!0,configurable:!0,writable:!0}),Object.defineProperty(i,l,{enumerable:!0,configurable:!0,writable:!0})),i[l]={t:g<n.length-1&&o===2?3:o,d:!1,i:0,c:Object.create(null)}}}if(a=i[l],a.t!==o&&!(o===1&&a.t===3)||(o===2&&(a.d||(a.d=!0,s[l]=[]),s[l].push(s=Object.create(null)),a.c[a.i++]=a={t:1,d:!1,i:0,c:Object.create(null)}),a.d))return null;if(a.d=!0,o===1)s=f?s[l]:s[l]=Object.create(null);else if(o===0&&f)return null;return[l,s,a.c]}function Q(e,n,r){(n===null||e.uk===2)&&u.x(n===null?"trying to redefine an already defined table or value":"document contains an unsafe property",e,r)}function Ae(e,n={}){let r={s:e,p:0,d:n.maxDepth??1e3,bi:n.integersAsBigInt??!1,ld:n.useLegacyDate??!0,uk:n.unsafeKeyBehaviour==="throw"?2:n.unsafeKeyBehaviour==="drop"?1:0},t=Object.create(null),o=Object.create(null),s,i=!1,l=t,f=o;for(e.charCodeAt(0)===65279&&r.p++,w(r);r.p<e.length;){if(e.charCodeAt(r.p)===91){let a=e.charCodeAt(++r.p)===91;s=r.p+=+a,i=!1;let d=U(r,93);a&&(e.charCodeAt(r.p)!==93&&u.x("expected end of table array declaration",r),r.p++);let h=H(r,d,t,o,a?2:1);h?(f=h[2],l=h[1]):(Q(r,h,s),i=!0)}else{s=r.p;let a=U(r),d=H(r,a,l,f,0);!d&&!i&&Q(r,d,s),w(r,!0,!0);let h=F(r,void 0);d&&!i&&(d[1][d[0]]=h)}w(r,!0),r.p<e.length&&(s=e.charCodeAt(r.p))!==10&&(s!==13||e.charCodeAt(r.p+1)!==10)&&u.x("each key-value declaration must be followed by an end-of-line",r),w(r)}return t}/*!
 * Copyright (c) Squirrel Chat et al., All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */let Ce=/^[a-z0-9-_]+$/i,ne=!!"".isWellFormed;function M(e){let n=typeof e;if(n==="object"){if(Array.isArray(e))return"array";if(typeof e.getUTCDate=="function"&&e instanceof Date)return"date";if(globalThis.Temporal){if(e.until){if(e instanceof Temporal.ZonedDateTime)return"temporal/tz+uc";if(e instanceof Temporal.PlainDateTime||e instanceof Temporal.PlainDate)return"temporal/uc";if(e instanceof Temporal.PlainTime||e instanceof Temporal.Instant)return"temporal";if(e instanceof Temporal.PlainYearMonth)return"temporal/x"}else if(e.toPlainDate&&e instanceof Temporal.PlainMonthDay||e.negated&&e instanceof Temporal.Duration)return"temporal/x"}}return n}function ye(e){for(let n=0;n<e.length;n++)if(M(e[n])!=="object")return!1;return e.length!=0}function te(e){return JSON.stringify(e).replaceAll("","\\u007f")}function we(e){return te(ne?e.toWellFormed():e)}function ie(e){if(Ce.test(e))return e;if(ne&&!e.isWellFormed())throw new RangeError("key contains illegal lone surrogates");return te(e)}function R(e,n,r,t,o){if(r===0)throw new Error("Could not stringify the object: maximum object depth exceeded");switch(n){case"number":if(isNaN(e))return"nan";if(e===1/0)return"inf";if(e===-1/0)return"-inf";if(Number.isInteger(e)&&(t||!Number.isSafeInteger(e)))return e.toFixed(1);case"bigint":case"boolean":case"temporal":return e.toString();case"string":return we(e);case"date":if(isNaN(e.getTime()))throw new TypeError("cannot serialize invalid date");return e.toISOString();case"object":return Le(e,r,t,o);case"array":return je(e,r,t,o);case"temporal/tz+uc":if(o){let s=e.timeZoneId,i=s.charCodeAt(0);if(i!==43&&i!==45&&(i!==85&&i!==71&&i!==90&&i!==69||s!=="UTC"&&s!=="UCT"&&s!=="Universal"&&s!=="Zulu"&&!s.startsWith("GMT")&&s!=="Greenwich"&&!s.startsWith("Etc/")))throw new TypeError("Temporal objects with an IANA timezone are not allowed in Temporal strict mode")}case"temporal/uc":if(o&&e.calendarId!=="iso8601")throw new TypeError("Temporal objects with a non-default calendar are not allowed in Temporal strict mode");return e.toString({calendarName:"never",timeZoneName:"never"});case"temporal/x":throw new TypeError("Unsupported "+e[Symbol.toStringTag])}}function Le(e,n,r,t){let o=Object.keys(e);if(o.length===0)return"{}";let s="{ ";for(let i=0;i<o.length;i++){let l=o[i];i&&(s+=", "),s+=ie(l)+" = "+R(e[l],M(e[l]),n-1,r,t)}return s+" }"}function je(e,n,r,t){if(e.length===0)return"[]";let o="[ ";for(let s=0;s<e.length;s++){if(s&&(o+=", "),e[s]===null||e[s]===void 0)throw new TypeError("arrays cannot contain null or undefined values");o+=R(e[s],M(e[s]),n-1,r,t)}return o+" ]"}function _e(e,n,r,t,o){if(r===0)throw new Error("Could not stringify the object: maximum object depth exceeded");let s="";for(let i=0;i<e.length;i++)s+=`${s&&`
`}[[${n}]]
`,s+=B(0,e[i],n,r,t,o);return s}function B(e,n,r,t,o,s){if(t===0)throw new Error("Could not stringify the object: maximum object depth exceeded");let i="",l="",f=Object.keys(n);for(let a=0;a<f.length;a++){let d=f[a];if(n[d]!==null&&n[d]!==void 0){let h=M(n[d]);if(h==="symbol"||h==="function")throw new TypeError(`cannot serialize values of type '${h}'`);let g=ie(d);if(h==="array"&&ye(n[d]))l+=(l&&`
`)+_e(n[d],r?`${r}.${g}`:g,t-1,o,s);else if(h==="object"){let c=r?`${r}.${g}`:g;l+=(l&&`
`)+B(c,n[d],c,t-1,o,s)}else i+=g,i+=" = ",i+=R(n[d],h,t,o,s),i+=`
`}}return e&&(i||!l)&&(i=i?`[${e}]
${i}`:`[${e}]`),i&&l?`${i}
${l}`:i||l}function Ee(e,{maxDepth:n=1e3,numbersAsFloat:r=!1,strictTemporal:t=!1}={}){if(M(e)!=="object")throw new TypeError("stringify can only be called with an object");let o=B(0,e,"",n,r,t);return o[o.length-1]!==`
`?o+`
`:o}const Me=new Set(["__proto__","prototype","constructor"]),m=Object.freeze({maxLength:2e5,maxDepth:40,maxNodes:2e4});function N(e,n,r){const t=new Error(`${n} / ${r}`);return t.code=e,t}function se(e){if(typeof e!="string"||!e.trim())throw N("EMPTY_INPUT","请先输入需要转换的内容。","Enter content before converting.");if(e.length>m.maxLength)throw N("INPUT_TOO_LARGE",`单次最多 ${m.maxLength.toLocaleString("en-US")} 字符，请分段转换。`,`Use at most ${m.maxLength.toLocaleString("en-US")} characters per conversion.`)}function z(e,n=1,r={count:0}){if(n>m.maxDepth)throw N("JSON_TOO_DEEP",`JSON 嵌套超过 ${m.maxDepth} 层，请简化结构。`,`JSON nesting exceeds ${m.maxDepth} levels.`);if(r.count+=1,r.count>m.maxNodes)throw N("TOO_MANY_NODES",`JSON 节点超过 ${m.maxNodes.toLocaleString("en-US")} 个，请分批转换。`,`JSON exceeds ${m.maxNodes.toLocaleString("en-US")} nodes.`);if(e===null)throw N("TOML_NULL","TOML 不支持 null，请移除该字段或改用字符串。","TOML has no null value. Remove the field or use a string instead.");if(typeof e=="number"){if(!Number.isFinite(e))throw N("NON_FINITE_NUMBER","JSON 包含非有限数字，请移除或改用字符串。","JSON contains a non-finite number. Remove it or use a string instead.");if(Number.isInteger(e)&&!Number.isSafeInteger(e))throw N("INTEGER_RANGE","JSON 整数超出安全范围，请改用字符串。","The JSON integer is outside the safe number range. Use a string instead.")}if(Array.isArray(e)){for(const t of e)z(t,n+1,r);return}if(e&&typeof e=="object")for(const[t,o]of Object.entries(e)){if(Me.has(t))throw N("UNSAFE_KEY",`JSON 包含不安全保留键“${t}”，已停止转换。`,`JSON contains the reserved unsafe key "${t}". Conversion stopped.`);z(o,n+1,r)}}function P(e,n=1,r={count:0}){if(n>m.maxDepth)throw N("TOML_TOO_DEEP",`TOML 嵌套超过 ${m.maxDepth} 层，请简化结构。`,`TOML nesting exceeds ${m.maxDepth} levels.`);if(r.count+=1,r.count>m.maxNodes)throw N("TOO_MANY_NODES",`TOML 节点超过 ${m.maxNodes.toLocaleString("en-US")} 个，请分批转换。`,`TOML exceeds ${m.maxNodes.toLocaleString("en-US")} nodes.`);if(e instanceof Date)return e.toISOString();if(typeof e=="number"&&!Number.isFinite(e))throw N("NON_FINITE_NUMBER","TOML 包含 inf 或 nan，JSON 无法表示，请改用字符串。","TOML contains inf or nan, which JSON cannot represent. Use a string instead.");if(typeof e=="bigint"){if(e<=BigInt(Number.MAX_SAFE_INTEGER)&&e>=BigInt(Number.MIN_SAFE_INTEGER))return Number(e);throw N("INTEGER_RANGE","TOML 整数超出 JSON 安全范围，请改用字符串。","The TOML integer is outside JSON's safe number range. Use a string instead.")}return Array.isArray(e)?e.map(t=>P(t,n+1,r)):e&&typeof e=="object"?Object.fromEntries(Object.entries(e).map(([t,o])=>[t,P(o,n+1,r)])):e}function ve(e){se(e);let n;try{n=JSON.parse(e)}catch{throw N("INVALID_JSON","JSON 格式无效，请检查引号、逗号和括号。","Invalid JSON. Check quotes, commas and brackets.")}if(!n||typeof n!="object"||Array.isArray(n))throw N("TOML_ROOT",'JSON 顶层必须是对象，例如 {"root": {"name": "UTool"}}。','The top-level JSON value must be an object, for example {"root":{"name":"UTool"}}.');z(n);try{return Ee(n)}catch{throw N("TOML_CONVERSION","当前 JSON 值无法转换为 TOML。","This JSON value cannot be converted to TOML.")}}function ke(e){se(e);let n;try{n=Ae(e,{integersAsBigInt:"asNeeded",unsafeKeyBehaviour:"throw"})}catch{throw N("INVALID_TOML","TOML 格式无效，请检查键名、等号和值。","Invalid TOML. Check keys, equals signs and values.")}const r=P(n);return`${JSON.stringify(r,null,2)}
`}const Ie=`{
  "title": "UTool",
  "enabled": true,
  "port": 8080,
  "owner": {
    "name": "Ada",
    "active": true
  },
  "tags": ["json", "toml"],
  "servers": [
    { "host": "192.168.1.10", "port": 8080 },
    { "host": "192.168.1.11", "port": 8081 }
  ]
}`,Je=`title = "UTool"
enabled = true
port = 8080
tags = ["json", "toml"]

[owner]
name = "Ada"
active = true

[[servers]]
host = "192.168.1.10"
port = 8080

[[servers]]
host = "192.168.1.11"
port = 8081
`;function Ve({language:e}){const n=(b,j)=>e==="en"?j:b,r=ae(),[t,o]=J.useState(""),[s,i]=J.useState(""),[l,f]=J.useState({tone:"note",message:n("粘贴 JSON 或 TOML，点击对应按钮转换。所有内容仅在浏览器本地处理。","Paste JSON or TOML and choose a conversion. Everything stays in your browser.")});function a(){f({tone:"note",message:n("粘贴 JSON 或 TOML，点击对应按钮转换。所有内容仅在浏览器本地处理。","Paste JSON or TOML and choose a conversion. Everything stays in your browser.")})}function d(b){try{b==="json-to-toml"?(i(ve(t)),f({tone:"success",message:n("JSON 已转换为 TOML，可复制或下载。","JSON converted to TOML. Copy or download the result.")})):(o(ke(s)),f({tone:"success",message:n("TOML 已转换为 JSON，可复制或下载。","TOML converted to JSON. Copy or download the result.")}))}catch(j){f({tone:"error",message:j.message}),r(j.message,"error")}}function h(){o(Ie),i(Je),f({tone:"note",message:n("示例已载入，可从任意一侧开始转换。","Examples loaded. Start conversion from either side.")})}function g(){o(""),i(""),a()}async function c(b,j){try{await de(b),r(n(`已复制 ${j}`,`${j} copied`),"success")}catch{r(n("复制失败，请手动选择内容复制。","Copy failed. Select and copy the content manually."),"error")}}return p.jsx(fe,{className:"xml-json-tool workspace-card--compact",children:p.jsxs(ue,{className:"local-tool__content",children:[p.jsx("div",{className:"xml-json-tool__toolbar",children:p.jsxs("div",{className:"button-row",children:[p.jsxs(L,{onClick:()=>d("json-to-toml"),children:[p.jsx(Y,{size:16}),n("JSON → TOML","JSON → TOML")]}),p.jsxs(L,{onClick:()=>d("toml-to-json"),children:[p.jsx(Y,{size:16}),n("TOML → JSON","TOML → JSON")]}),p.jsxs(L,{variant:"outline",onClick:h,children:[p.jsx(pe,{size:16}),n("加载示例","Load example")]}),p.jsxs(L,{variant:"ghost",onClick:g,children:[p.jsx(he,{size:16}),n("清空","Clear")]})]})}),p.jsx("p",{role:"status",className:`local-tool__${l.tone}`,children:l.message}),p.jsxs("div",{className:"xml-json-tool__editors",children:[p.jsxs("section",{className:"xml-json-tool__editor",children:[p.jsx(G,{label:`${n("JSON 内容","JSON content")} · ${t.length}`,htmlFor:"json-toml-json",children:p.jsx(K,{id:"json-toml-json",className:"xml-json-tool__code",mono:!0,size:"lg",value:t,maxLength:m.maxLength,spellCheck:!1,autoCapitalize:"off",autoCorrect:"off",onChange:b=>{o(b.target.value),a()},placeholder:n('粘贴 JSON，例如 {"name":"UTool","port":8080}','Paste JSON, for example {"name":"UTool","port":8080}')})}),p.jsxs("div",{className:"button-row xml-json-tool__editor-actions",children:[p.jsxs(L,{variant:"outline",size:"sm",disabled:!t,onClick:()=>c(t,"JSON"),children:[p.jsx(q,{size:15}),n("复制 JSON","Copy JSON")]}),p.jsxs(L,{variant:"outline",size:"sm",disabled:!t,onClick:()=>W("result.json",t,"application/json;charset=utf-8"),children:[p.jsx(X,{size:15}),n("下载 JSON","Download JSON")]})]})]}),p.jsxs("section",{className:"xml-json-tool__editor",children:[p.jsx(G,{label:`${n("TOML 内容","TOML content")} · ${s.length}`,htmlFor:"json-toml-toml",children:p.jsx(K,{id:"json-toml-toml",className:"xml-json-tool__code",mono:!0,size:"lg",value:s,maxLength:m.maxLength,spellCheck:!1,autoCapitalize:"off",autoCorrect:"off",onChange:b=>{i(b.target.value),a()},placeholder:n('粘贴 TOML，例如 title = "UTool"','Paste TOML, for example title = "UTool"')})}),p.jsxs("div",{className:"button-row xml-json-tool__editor-actions",children:[p.jsxs(L,{variant:"outline",size:"sm",disabled:!s,onClick:()=>c(s,"TOML"),children:[p.jsx(q,{size:15}),n("复制 TOML","Copy TOML")]}),p.jsxs(L,{variant:"outline",size:"sm",disabled:!s,onClick:()=>W("result.toml",s,"application/toml;charset=utf-8"),children:[p.jsx(X,{size:15}),n("下载 TOML","Download TOML")]})]})]})]}),p.jsx("p",{className:"local-tool__note",children:n("支持 TOML 1.1 的键、表格、数组表格、数组、内联表、注释与日期时间。日期时间转为 ISO 字符串；TOML 不支持 null，遇到该值会明确报错。","Supports TOML 1.1 keys, tables, arrays of tables, arrays, inline tables, comments and date/time values. Dates become ISO strings; TOML has no null value, so null is reported clearly.")}),p.jsx("p",{className:"local-tool__note",children:n(`单次最多 ${m.maxLength.toLocaleString("zh-CN")} 字符、${m.maxDepth} 层嵌套和 ${m.maxNodes.toLocaleString("zh-CN")} 个节点。所有转换均在浏览器本地完成，不上传或保存输入。`,`Limits: ${m.maxLength.toLocaleString("en-US")} characters, ${m.maxDepth} nesting levels and ${m.maxNodes.toLocaleString("en-US")} nodes. Conversion runs locally; input is never uploaded or stored.`)})]})})}export{Ve as JsonTomlTool};
