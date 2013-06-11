Ext.define("Ext.data.Connection",{mixins:{observable:"Ext.util.Observable"},statics:{requestId:0},url:null,async:true,method:null,username:"",password:"",disableCaching:true,withCredentials:false,binary:false,cors:false,disableCachingParam:"_dc",timeout:30000,useDefaultHeader:true,defaultPostHeader:"application/x-www-form-urlencoded; charset=UTF-8",useDefaultXhrHeader:true,defaultXhrHeader:"XMLHttpRequest",constructor:function(a){a=a||{};Ext.apply(this,a);this.requests={};this.mixins.observable.constructor.call(this)},request:function(j){j=j||{};var f=this,i=j.scope||window,e=j.username||f.username,g=j.password||f.password||"",b,c,d,a,h;if(f.fireEvent("beforerequest",f,j)!==false){c=f.setOptions(j,i);if(f.isFormUpload(j)){f.upload(j.form,c.url,c.data,j);return null}if(j.autoAbort||f.autoAbort){f.abort()}b=j.async!==false?(j.async||f.async):false;h=f.openRequest(j,c,b,e,g);a=f.setupHeaders(h,j,c.data,c.params);d={id:++Ext.data.Connection.requestId,xhr:h,headers:a,options:j,async:b,binary:j.binary||f.binary,timeout:setTimeout(function(){d.timedout=true;f.abort(d)},j.timeout||f.timeout)};f.requests[d.id]=d;f.latestId=d.id;if(b){h.onreadystatechange=Ext.Function.bind(f.onStateChange,f,[d])}h.send(c.data);if(!b){return f.onComplete(d)}return d}else{Ext.callback(j.callback,j.scope,[j,undefined,undefined]);return null}},upload:function(b,f,r,e){b=Ext.getDom(b);e=e||{};var m=Ext.id(),k=document.createElement("iframe"),c=[],d="multipart/form-data",q={target:b.target,method:b.method,encoding:b.encoding,enctype:b.enctype,action:b.action},a=function(h,t){g=document.createElement("input");Ext.fly(g).set({type:"hidden",value:t,name:h});b.appendChild(g);c.push(g)},g,j,o,s,n,i,l,p;Ext.fly(k).set({id:m,name:m,cls:Ext.baseCSSPrefix+"hide-display",src:Ext.SSL_SECURE_URL});document.body.appendChild(k);if(document.frames){document.frames[m].name=m}Ext.fly(b).set({target:m,method:"POST",enctype:d,encoding:d,action:f||q.action});if(r){j=Ext.Object.fromQueryString(r)||{};for(s in j){if(j.hasOwnProperty(s)){o=j[s];if(Ext.isArray(o)){n=o.length;for(i=0;i<n;i++){a(s,o[i])}}else{a(s,o)}}}}Ext.fly(k).on("load",Ext.Function.bind(this.onUploadComplete,this,[k,e]),null,{single:!Ext.isOpera});b.submit();Ext.fly(b).set(q);l=c.length;for(p=0;p<l;p++){Ext.removeNode(c[p])}},onUploadComplete:function(h,c){var d=this,b={responseText:"",responseXML:null},g,a;try{g=h.contentWindow.document||h.contentDocument||window.frames[h.id].document;if(g){if(Ext.isOpera&&g.location=="about:blank"){return}if(g.body){if((a=g.body.firstChild)&&/pre/i.test(a.tagName)){b.responseText=a.innerText}else{if((a=g.getElementsByTagName("textarea")[0])){b.responseText=a.value}else{b.responseText=g.body.textContent||g.body.innerText}}}b.responseXML=g.XMLDocument||g}}catch(f){}d.fireEvent("requestcomplete",d,b,c);Ext.callback(c.success,c.scope,[b,c]);Ext.callback(c.callback,c.scope,[c,true,b]);setTimeout(function(){Ext.removeNode(h)},100)},isFormUpload:function(a){var b=this.getForm(a);if(b){return(a.isUpload||(/multipart\/form-data/i).test(b.getAttribute("enctype")))}return false},getForm:function(a){return Ext.getDom(a.form)||null},setOptions:function(k,j){var h=this,e=k.params||{},g=h.extraParams,d=k.urlParams,c=k.url||h.url,i=k.jsonData,b,a,f;if(Ext.isFunction(e)){e=e.call(j,k)}if(Ext.isFunction(c)){c=c.call(j,k)}c=this.setupUrl(k,c);if(!c){Ext.Error.raise({options:k,msg:"No URL specified"})}f=k.rawData||k.xmlData||i||null;if(i&&!Ext.isPrimitive(i)){f=Ext.encode(f)}if(Ext.isObject(e)){e=Ext.Object.toQueryString(e)}if(Ext.isObject(g)){g=Ext.Object.toQueryString(g)}e=e+((g)?((e)?"&":"")+g:"");d=Ext.isObject(d)?Ext.Object.toQueryString(d):d;e=this.setupParams(k,e);b=(k.method||h.method||((e||f)?"POST":"GET")).toUpperCase();this.setupMethod(k,b);a=k.disableCaching!==false?(k.disableCaching||h.disableCaching):false;if(b==="GET"&&a){c=Ext.urlAppend(c,(k.disableCachingParam||h.disableCachingParam)+"="+(new Date().getTime()))}if((b=="GET"||f)&&e){c=Ext.urlAppend(c,e);e=null}if(d){c=Ext.urlAppend(c,d)}return{url:c,method:b,data:f||e||null}},setupUrl:function(b,a){var c=this.getForm(b);if(c){a=a||c.action}return a},setupParams:function(a,d){var c=this.getForm(a),b;if(c&&!this.isFormUpload(a)){b=Ext.Element.serializeForm(c);d=d?(d+"&"+b):b}return d},setupMethod:function(a,b){if(this.isFormUpload(a)){return"POST"}return b},setupHeaders:function(l,m,d,c){var h=this,b=Ext.apply({},m.headers||{},h.defaultHeaders||{}),k=h.defaultPostHeader,i=m.jsonData,a=m.xmlData,j,f;if(!b["Content-Type"]&&(d||c)){if(d){if(m.rawData){k="text/plain"}else{if(a&&Ext.isDefined(a)){k="text/xml"}else{if(i&&Ext.isDefined(i)){k="application/json"}}}}b["Content-Type"]=k}if(h.useDefaultXhrHeader&&!b["X-Requested-With"]){b["X-Requested-With"]=h.defaultXhrHeader}try{for(j in b){if(b.hasOwnProperty(j)){f=b[j];l.setRequestHeader(j,f)}}}catch(g){h.fireEvent("exception",j,f)}return b},newRequest:function(a){var b;if((a.cors||this.cors)&&Ext.isIE&&Ext.ieVersion>=8){b=new XDomainRequest()}else{b=this.getXhrInstance()}return b},openRequest:function(c,a,d,f,b){var e=this.newRequest(c);if(f){e.open(a.method,a.url,d,f,b)}else{e.open(a.method,a.url,d)}if(c.binary||this.binary){if(window.Uint8Array){e.responseType="arraybuffer"}else{if(e.overrideMimeType){e.overrideMimeType("text/plain; charset=x-user-defined")}else{if(!Ext.isIE){Ext.log.warn("Your does not support loading binary data using Ajax.")}}}}if(c.withCredentials||this.withCredentials){e.withCredentials=true}return e},getXhrInstance:(function(){var b=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject("MSXML2.XMLHTTP.3.0")},function(){return new ActiveXObject("MSXML2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],c=0,a=b.length,f;for(;c<a;++c){try{f=b[c];f();break}catch(d){}}return f}()),isLoading:function(a){if(!a){a=this.getLatest()}if(!(a&&a.xhr)){return false}var b=a.xhr.readyState;return !(b===0||b==4)},abort:function(b){var a=this,d;if(!b){b=a.getLatest()}if(b&&a.isLoading(b)){d=b.xhr;try{d.onreadystatechange=null}catch(c){d.onreadystatechange=Ext.emptyFn}d.abort();a.clearTimeout(b);if(!b.timedout){b.aborted=true}a.onComplete(b);a.cleanup(b)}},abortAll:function(){var b=this.requests,a;for(a in b){if(b.hasOwnProperty(a)){this.abort(b[a])}}},getLatest:function(){var b=this.latestId,a;if(b){a=this.requests[b]}return a||null},onStateChange:function(a){if(a.xhr.readyState==4){this.clearTimeout(a);this.onComplete(a);this.cleanup(a);Ext.EventManager.idleEvent.fire()}},clearTimeout:function(a){clearTimeout(a.timeout);delete a.timeout},cleanup:function(a){a.xhr=null;delete a.xhr},onComplete:function(f){var d=this,c=f.options,a,h,b;try{a=d.parseStatus(f.xhr.status)}catch(g){a={success:false,isException:false}}h=a.success;if(h){b=d.createResponse(f);d.fireEvent("requestcomplete",d,b,c);Ext.callback(c.success,c.scope,[b,c])}else{if(a.isException||f.aborted||f.timedout){b=d.createException(f)}else{b=d.createResponse(f)}d.fireEvent("requestexception",d,b,c);Ext.callback(c.failure,c.scope,[b,c])}Ext.callback(c.callback,c.scope,[c,h,b]);delete d.requests[f.id];return b},parseStatus:function(a){a=a==1223?204:a;var c=(a>=200&&a<300)||a==304,b=false;if(!c){switch(a){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:b=true;break}}return{success:c,isException:b}},createResponse:function(d){var h=d.xhr,b={},i=h.getAllResponseHeaders().replace(/\r\n/g,"\n").split("\n"),e=i.length,j,f,g,c,a;while(e--){j=i[e];f=j.indexOf(":");if(f>=0){g=j.substr(0,f).toLowerCase();if(j.charAt(f+1)==" "){++f}b[g]=j.substr(f+1)}}d.xhr=null;delete d.xhr;c={request:d,requestId:d.id,status:h.status,statusText:h.statusText,getResponseHeader:function(k){return b[k.toLowerCase()]},getAllResponseHeaders:function(){return b}};if(d.binary){c.responseBytes=this.getByteArray(h)}else{c.responseText=h.responseText;c.responseXML=h.responseXML}h=null;return c},createException:function(a){return{request:a,requestId:a.id,status:a.aborted?-1:0,statusText:a.aborted?"transaction aborted":"communication failure",aborted:a.aborted,timedout:a.timedout}},getByteArray:function(j){var c=j.response,h=j.responseBody,b,f,a,d;if(window.Uint8Array){b=c?new Uint8Array(c):[]}else{if(Ext.isIE9p){try{b=new VBArray(h).toArray()}catch(g){b=[]}}else{if(Ext.isIE){if(!this.self.vbScriptInjected){this.injectVBScript()}getIEByteArray(j.responseBody,b=[])}else{b=[];f=j.responseText;a=f.length;for(d=0;d<a;d++){b.push(f.charCodeAt(d)&255)}}}}return b},injectVBScript:function(){var a=document.createElement("script");a.type="text/vbscript";a.text=["Function getIEByteArray(byteArray, out)","Dim len, i","len = LenB(byteArray)","For i = 1 to len","out.push(AscB(MidB(byteArray, i, 1)))","Next","End Function"].join("\n");Ext.getHead().dom.appendChild(a);this.self.vbScriptInjected=true}});