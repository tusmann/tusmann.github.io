parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"KA2S":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];!function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"==typeof module,h=t.regeneratorRuntime;if(h)u&&(module.exports=h);else{(h=t.regeneratorRuntime=u?module.exports:{}).wrap=w;var f="suspendedStart",s="suspendedYield",l="executing",p="completed",y={},v={};v[i]=function(){return this};var d=Object.getPrototypeOf,g=d&&d(d(P([])));g&&g!==e&&n.call(g,i)&&(v=g);var m=b.prototype=x.prototype=Object.create(v);E.prototype=m.constructor=b,b.constructor=E,b[c]=E.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===E||"GeneratorFunction"===(r.displayName||r.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(m),t},h.awrap=function(t){return{__await:t}},_(j.prototype),j.prototype[a]=function(){return this},h.AsyncIterator=j,h.async=function(t,r,e,n){var o=new j(w(t,r,e,n));return h.isGeneratorFunction(r)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(m),m[c]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},h.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},h.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(G),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),h=n.call(a,"finallyLoc");if(u&&h){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!h)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),G(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;G(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}}}function w(t,r,e,n){var o=r&&r.prototype instanceof x?r:x,i=Object.create(o.prototype),a=new N(n||[]);return i._invoke=function(t,r,e){var n=f;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return F()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=O(a,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===f)throw n=p,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=l;var u=L(t,r,e);if("normal"===u.type){if(n=e.done?p:s,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=p,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function L(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function x(){}function E(){}function b(){}function _(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function j(t){var r;this._invoke=function(e,o){function i(){return new Promise(function(r,i){!function r(e,o,i,a){var c=L(t[e],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?Promise.resolve(h.__await).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(h).then(function(t){u.value=t,i(u)},function(t){return r("throw",t,i,a)})}a(c.arg)}(e,o,r,i)})}return r=r?r.then(i,i):i()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=L(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function G(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:F}}function F(){return{value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")());
},{}],"GCZq":[function(require,module,exports) {
var e=function(){return this||"object"==typeof self&&self}()||Function("return this")(),r=e.regeneratorRuntime&&Object.getOwnPropertyNames(e).indexOf("regeneratorRuntime")>=0,t=r&&e.regeneratorRuntime;if(e.regeneratorRuntime=void 0,module.exports=require("./runtime"),r)e.regeneratorRuntime=t;else try{delete e.regeneratorRuntime}catch(n){e.regeneratorRuntime=void 0}
},{"./runtime":"KA2S"}],"8m4e":[function(require,module,exports) {
module.exports=require("regenerator-runtime");
},{"regenerator-runtime":"GCZq"}],"2fws":[function(require,module,exports) {
function n(n,t,o,r,e,i,u){try{var c=n[i](u),v=c.value}catch(a){return void o(a)}c.done?t(v):Promise.resolve(v).then(r,e)}function t(t){return function(){var o=this,r=arguments;return new Promise(function(e,i){var u=t.apply(o,r);function c(t){n(u,e,i,c,v,"next",t)}function v(t){n(u,e,i,c,v,"throw",t)}c(void 0)})}}module.exports=t;
},{}],"0+UA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.parseArticle=n;var e=r(require("@babel/runtime/regenerator")),t=r(require("@babel/runtime/helpers/asyncToGenerator"));function r(e){return e&&e.__esModule?e:{default:e}}function n(e){return a.apply(this,arguments)}function a(){return(a=(0,t.default)(e.default.mark(function t(r){var n,a,u,o,i,s,l;return e.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(r);case 2:return n=e.sent,e.next=5,n.text();case 5:return a=e.sent,u=new DOMParser,o=u.parseFromString(a,"text/html"),i=o.querySelector("body"),s=new URL(r,window.location.href),new URL(window.location.href),l=s.pathname.substring(0,s.pathname.lastIndexOf("/")),i.querySelectorAll("img").forEach(function(e){var t=new URL(e.src),r=t.pathname.split("/"),n=r[r.length-1];e.src=t.origin+l+"/"+n}),e.abrupt("return",{body:i,title:o.querySelector("title").text});case 14:case"end":return e.stop()}},t)}))).apply(this,arguments)}
},{"@babel/runtime/regenerator":"8m4e","@babel/runtime/helpers/asyncToGenerator":"2fws"}],"QFLc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addSpecialArticle=a,exports.addArticle=o;var e=n(require("@babel/runtime/regenerator")),r=n(require("@babel/runtime/helpers/asyncToGenerator")),t=require("./article-parser");function n(e){return e&&e.__esModule?e:{default:e}}function a(e,r){return c.apply(this,arguments)}function c(){return(c=(0,r.default)(e.default.mark(function r(n,a){var c,o,d,i,u,s,l,m;return e.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,t.parseArticle)(n);case 2:return c=e.sent,e.next=5,(0,t.parseArticle)(a);case 5:o=e.sent,document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection").forEach(function(e){e.classList.add("hidden")}),document.querySelector(".reader").className=document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g,""),document.querySelector(".reader").innerHTML="",(d=document.querySelector(".reader")).classList.add("grid-container"),d.classList.remove("reader"),i=document.createElement("section"),u=document.createElement("section"),i.className="reader right",u.className="reader left",(s=document.querySelector("section.grid-container")).insertAdjacentElement("afterbegin",i),s.insertAdjacentElement("afterbegin",u),l=document.querySelector("section.reader.left"),Array.from(c.body.childNodes).forEach(function(e){l.appendChild(e)}),m=document.querySelector("section.reader.right"),Array.from(o.body.childNodes).forEach(function(e){m.appendChild(e)});case 26:case"end":return e.stop()}},r)}))).apply(this,arguments)}function o(e){return d.apply(this,arguments)}function d(){return(d=(0,r.default)(e.default.mark(function r(n){var a,c,o;return e.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,t.parseArticle)(n);case 2:a=e.sent,document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection").forEach(function(e){e.classList.add("hidden")}),document.querySelector(".reader").className=document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g,""),c=document.querySelector("section.grid-container"),document.body.contains(c)&&(c.classList.add("reader"),c.classList.remove("grid-container"),Array.from(c.childNodes).forEach(function(e){c.removeChild(e)})),document.querySelector(".reader").innerHTML="",o=document.querySelector(".reader"),Array.from(a.body.childNodes).forEach(function(e){o.appendChild(e)});case 12:case"end":return e.stop()}},r)}))).apply(this,arguments)}
},{"@babel/runtime/regenerator":"8m4e","@babel/runtime/helpers/asyncToGenerator":"2fws","./article-parser":"0+UA"}],"lt/V":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.articlesSidebarSelection=a,exports.specialArticleSidebarSelection=n;var e=require("./article-parser"),t=require("./addArticle.js"),r={"Japan's Prisons Are a Haven for Elderly Women":"./articles/Bloomberg/ShihoFukada.html","As Goes the South, so Goes the Nation":"./articles/Harpers/ImaniPerry.html","Jerry And Marge Go Large":"./articles/HuffingtonPost/JasonFagone.html","How Anna Delvey Tricked New York’s Party People":"./articles/TheCut/JessicaPresler.html","God is in the machine":"./articles/Times Literary Supplement/CarlMiller.html"};function a(){r.forEach(function(e,r){var a=r,n=e,c=document.createElement("li"),l=document.createElement("a");l.className="close-menu-doc",l.appendChild(document.createTextNode(a)),c.appendChild(l),l.addEventListener("click",function(){return(0,t.addArticle)(n)}),document.querySelector(".placeholder").insertAdjacentElement("afterbegin",c)})}function n(e,r,a){var n=document.createElement("li"),c=document.createElement("a");c.className="close-menu-doc",c.appendChild(document.createTextNode(e)),n.appendChild(c),c.addEventListener("click",function(){return(0,t.addSpecialArticle)(r,a)}),document.querySelector(".placeholder").insertAdjacentElement("afterbegin",n)}
},{"./article-parser":"0+UA","./addArticle.js":"QFLc"}],"epB2":[function(require,module,exports) {
"use strict";var e=require("./article-parser"),r=require("./addArticle.js"),t=require("./articlesSelectionButtons");function c(){document.querySelector(".nav-list").className=document.querySelector(".nav-list").className.replace(/(?:^|\s)hidden(?!\S)/g,"")}Object.prototype.forEach||Object.defineProperty(Object.prototype,"forEach",{value:function(e,r){if(null==this)throw new TypeError("Not an object");for(var t in r=r||window,this)this.hasOwnProperty(t)&&e.call(r,this[t],t,this)}}),(0,t.articlesSidebarSelection)(),(0,t.specialArticleSidebarSelection)("EUR-Lex","./articles/EUDirective/L125-75.html","./articles/EUDirective/EUDirectiveItalian.html"),document.querySelector(".style-selector-first").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/first/first.css"},document.querySelector(".style-selector-second").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/second/second.css"},document.querySelector(".style-selector-third").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/third.css"},document.querySelector(".style-selector-fourth").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/fourth.css"},document.querySelector(".style-selector-fifth").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/fifth.css"},document.querySelector(".style-selector-sixth").onclick=function(){document.querySelector(".reader").innerHTML="";var e=document.querySelector(".reader");e.classList.add("grid-container"),e.classList.remove("reader");var r=document.querySelector("section.grid-container");document.body.contains(r)&&(r.classList.add("reader"),r.classList.remove("grid-container"),Array.from(r.childNodes).forEach(function(e){r.removeChild(e)}));document.querySelector("link.secondSheet").href="./styles/sixth.css"};var o=document.querySelectorAll(".doc-sel");function n(){document.querySelector(".nav-list").classList.add("hidden")}o.forEach(function(e){e.addEventListener("click",c)});var i=document.querySelector(".doc-close");i.addEventListener("click",n);var d=document.querySelectorAll(".close-menu-doc");d.forEach(function(e){e.addEventListener("click",n)});var s=document.querySelector(".container"),a=document.querySelectorAll(".opened-doc-list"),l=document.querySelector(".close-menu"),u=document.querySelectorAll(".close-menu-doc"),m=function(){s.classList.toggle("opened-nav")};a.forEach(function(e){e.addEventListener("click",m,!1)}),l.addEventListener("click",m,!1),u.forEach(function(e){e.addEventListener("click",m,!1)}),document.querySelector(".aboutPageButton").onclick=function(){document.querySelector(".aboutPageSection").classList.remove("hidden"),document.querySelectorAll(".jumbo, .tutorial, .disclaimerPageSection, .reader, .documentationPageSection").forEach(function(e){e.classList.add("hidden")})},document.querySelector(".disclaimerPageButton").onclick=function(){document.querySelector(".disclaimerPageSection").classList.remove("hidden"),document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .reader, .documentationPageSection").forEach(function(e){e.classList.add("hidden")})},document.querySelector(".documentationPageButton").onclick=function(){document.querySelector(".documentationPageSection").classList.remove("hidden"),document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .reader, .disclaimerPageSection").forEach(function(e){e.classList.add("hidden")})};var y,S=document.getElementsByClassName("collapsible");for(y=0;y<S.length;y++)S[y].addEventListener("click",function(){this.classList.toggle("active");var e=this.nextElementSibling;"block"===e.style.display?e.style.display="none":e.style.display="block"});
},{"./article-parser":"0+UA","./addArticle.js":"QFLc","./articlesSelectionButtons":"lt/V"}]},{},["epB2"], null)
//# sourceMappingURL=main.839f2a07.js.map