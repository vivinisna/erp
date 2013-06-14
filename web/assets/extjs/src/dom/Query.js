Ext.ns("Ext.core");Ext.dom.Query=Ext.core.DomQuery=Ext.DomQuery=(function(){var DQ,doc=document,cache={},simpleCache={},valueCache={},useClassList=!!doc.documentElement.classList,useElementPointer=!!doc.documentElement.firstElementChild,useChildrenCollection=(function(){var d=doc.createElement("div");d.innerHTML="<!-- -->text<!-- -->";return d.children&&(d.children.length===0)})(),nonSpace=/\S/,trimRe=/^\s+|\s+$/g,tplRe=/\{(\d+)\}/g,modeRe=/^(\s?[\/>+~]\s?|\s|$)/,tagTokenRe=/^(#)?([\w\-\*\|\\]+)/,nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/,startIdRe=/^\s*#/,isIE=window.ActiveXObject?true:false,key=30803,longHex=/\\([0-9a-fA-F]{6})/g,shortHex=/\\([0-9a-fA-F]{1,6})\s{0,1}/g,nonHex=/\\([^0-9a-fA-F]{1})/g,escapes=/\\/g,num,hasEscapes,supportsColonNsSeparator=(function(){var xmlDoc,xmlString='<r><a:b xmlns:a="n"></a:b></r>';if(window.DOMParser){xmlDoc=(new DOMParser()).parseFromString(xmlString,"application/xml")}else{xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.loadXML(xmlString)}return !!xmlDoc.getElementsByTagName("a:b").length})(),longHexToChar=function($0,$1){return String.fromCharCode(parseInt($1,16))},shortToLongHex=function($0,$1){while($1.length<6){$1="0"+$1}return"\\"+$1},charToLongHex=function($0,$1){num=$1.charCodeAt(0).toString(16);if(num.length===1){num="0"+num}return"\\0000"+num},unescapeCssSelector=function(selector){return(hasEscapes)?selector.replace(longHex,longHexToChar):selector},setupEscapes=function(path){hasEscapes=(path.indexOf("\\")>-1);if(hasEscapes){path=path.replace(shortHex,shortToLongHex).replace(nonHex,charToLongHex).replace(escapes,"\\\\")}return path};eval("var batch = 30803, child, next, prev, byClassName;");child=useChildrenCollection?function child(parent,index){return parent.children[index]}:function child(parent,index){var i=0,n=parent.firstChild;while(n){if(n.nodeType==1){if(++i==index){return n}}n=n.nextSibling}return null};next=useElementPointer?function(n){return n.nextElementSibling}:function(n){while((n=n.nextSibling)&&n.nodeType!=1){}return n};prev=useElementPointer?function(n){return n.previousElementSibling}:function(n){while((n=n.previousSibling)&&n.nodeType!=1){}return n};function children(parent){var n=parent.firstChild,nodeIndex=-1,nextNode;while(n){nextNode=n.nextSibling;if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){parent.removeChild(n)}else{n.nodeIndex=++nodeIndex}n=nextNode}return this}byClassName=useClassList?function(nodeSet,cls){cls=unescapeCssSelector(cls);if(!cls){return nodeSet}var result=[],ri=-1,i,ci,classList;for(i=0;ci=nodeSet[i];i++){classList=ci.classList;if(classList){if(classList.contains(cls)){result[++ri]=ci}}else{if((" "+ci.className+" ").indexOf(cls)!==-1){result[++ri]=ci}}}return result}:function(nodeSet,cls){cls=unescapeCssSelector(cls);if(!cls){return nodeSet}var result=[],ri=-1,i,ci;for(i=0;ci=nodeSet[i];i++){if((" "+ci.className+" ").indexOf(cls)!==-1){result[++ri]=ci}}return result};function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0]}if(!n){return null}if(attr=="for"){return n.htmlFor}if(attr=="class"||attr=="className"){return n.className}return n.getAttribute(attr)||n[attr]}function getNodes(ns,mode,tagName){var result=[],ri=-1,cs,i,ni,j,ci,cn,utag,n,cj;if(!ns){return result}tagName=tagName.replace("|",":")||"*";if(typeof ns.getElementsByTagName!="undefined"){ns=[ns]}if(!mode){tagName=unescapeCssSelector(tagName);if(!supportsColonNsSeparator&&DQ.isXml(ns[0])&&tagName.indexOf(":")!==-1){for(i=0;ni=ns[i];i++){cs=ni.getElementsByTagName(tagName.split(":").pop());for(j=0;ci=cs[j];j++){if(ci.tagName===tagName){result[++ri]=ci}}}}else{for(i=0;ni=ns[i];i++){cs=ni.getElementsByTagName(tagName);for(j=0;ci=cs[j];j++){result[++ri]=ci}}}}else{if(mode=="/"||mode==">"){utag=tagName.toUpperCase();for(i=0;ni=ns[i];i++){cn=ni.childNodes;for(j=0;cj=cn[j];j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=="*"){result[++ri]=cj}}}}else{if(mode=="+"){utag=tagName.toUpperCase();for(i=0;n=ns[i];i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=="*")){result[++ri]=n}}}else{if(mode=="~"){utag=tagName.toUpperCase();for(i=0;n=ns[i];i++){while((n=n.nextSibling)){if(n.nodeName==utag||n.nodeName==tagName||tagName=="*"){result[++ri]=n}}}}}}}return result}function concat(a,b){a.push.apply(a,b);return a}function byTag(cs,tagName){if(cs.tagName||cs===doc){cs=[cs]}if(!tagName){return cs}var result=[],ri=-1,i,ci;tagName=tagName.toLowerCase();for(i=0;ci=cs[i];i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){result[++ri]=ci}}return result}function byId(cs,id){id=unescapeCssSelector(id);if(cs.tagName||cs===doc){cs=[cs]}if(!id){return cs}var result=[],ri=-1,i,ci;for(i=0;ci=cs[i];i++){if(ci&&ci.id==id){result[++ri]=ci;return result}}return result}function byAttribute(cs,attr,value,op,custom){var result=[],ri=-1,useGetStyle=custom=="{",fn=DQ.operators[op],a,xml,hasXml,i,ci;value=unescapeCssSelector(value);for(i=0;ci=cs[i];i++){if(ci.nodeType===1){if(!hasXml){xml=DQ.isXml(ci);hasXml=true}if(!xml){if(useGetStyle){a=DQ.getStyle(ci,attr)}else{if(attr=="class"||attr=="className"){a=ci.className}else{if(attr=="for"){a=ci.htmlFor}else{if(attr=="href"){a=ci.getAttribute("href",2)}else{a=ci.getAttribute(attr)}}}}}else{a=ci.getAttribute(attr)}if((fn&&fn(a,value))||(!fn&&a)){result[++ri]=ci}}}return result}function byPseudo(cs,name,value){value=unescapeCssSelector(value);return DQ.pseudos[name](cs,value)}function nodupIEXml(cs){var d=++key,r,i,len,c;cs[0].setAttribute("_nodup",d);r=[cs[0]];for(i=1,len=cs.length;i<len;i++){c=cs[i];if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);r[r.length]=c}}for(i=0,len=cs.length;i<len;i++){cs[i].removeAttribute("_nodup")}return r}function nodup(cs){if(!cs){return[]}var len=cs.length,c,i,r=cs,cj,ri=-1,d,j;if(!len||typeof cs.nodeType!="undefined"||len==1){return cs}if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs)}d=++key;cs[0]._nodup=d;for(i=1;c=cs[i];i++){if(c._nodup!=d){c._nodup=d}else{r=[];for(j=0;j<i;j++){r[++ri]=cs[j]}for(j=i+1;cj=cs[j];j++){if(cj._nodup!=d){cj._nodup=d;r[++ri]=cj}}return r}}return r}function quickDiffIEXml(c1,c2){var d=++key,r=[],i,len;for(i=0,len=c1.length;i<len;i++){c1[i].setAttribute("_qdiff",d)}for(i=0,len=c2.length;i<len;i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i]}}for(i=0,len=c1.length;i<len;i++){c1[i].removeAttribute("_qdiff")}return r}function quickDiff(c1,c2){var len1=c1.length,d=++key,r=[],i,len;if(!len1){return c2}if(isIE&&typeof c1[0].selectSingleNode!="undefined"){return quickDiffIEXml(c1,c2)}for(i=0;i<len1;i++){c1[i]._qdiff=d}for(i=0,len=c2.length;i<len;i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i]}}return r}function quickId(ns,mode,root,id){if(ns==root){id=unescapeCssSelector(id);var d=root.ownerDocument||root;return d.getElementById(id)}ns=getNodes(ns,mode,"*");return byId(ns,id)}return DQ={getStyle:function(el,name){return Ext.fly(el,"_DomQuery").getStyle(name)},compile:function(path,type){type=type||"select";var fn=["var f = function(root) {\n var mode; ++batch; var n = root || document;\n"],lastPath,matchers=DQ.matchers,matchersLn=matchers.length,modeMatch,lmode=path.match(modeRe),tokenMatch,matched,j,t,m;path=setupEscapes(path);if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';path=path.replace(lmode[1],"")}while(path.substr(0,1)=="/"){path=path.substr(1)}while(path&&lastPath!=path){lastPath=path;tokenMatch=path.match(tagTokenRe);if(type=="select"){if(tokenMatch){if(tokenMatch[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tokenMatch[2]+'");'}else{fn[fn.length]='n = getNodes(n, mode, "'+tokenMatch[2]+'");'}path=path.replace(tokenMatch[0],"")}else{if(path.substr(0,1)!="@"){fn[fn.length]='n = getNodes(n, mode, "*");'}}}else{if(tokenMatch){if(tokenMatch[1]=="#"){fn[fn.length]='n = byId(n, "'+tokenMatch[2]+'");'}else{fn[fn.length]='n = byTag(n, "'+tokenMatch[2]+'");'}path=path.replace(tokenMatch[0],"")}}while(!(modeMatch=path.match(modeRe))){matched=false;for(j=0;j<matchersLn;j++){t=matchers[j];m=path.match(t.re);if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i]});path=path.replace(m[0],"");matched=true;break}}if(!matched){Ext.Error.raise({sourceClass:"Ext.DomQuery",sourceMethod:"compile",msg:'Error parsing selector. Parsing failed at "'+path+'"'})}}if(modeMatch[1]){fn[fn.length]='mode="'+modeMatch[1].replace(trimRe,"")+'";';path=path.replace(modeMatch[1],"")}}fn[fn.length]="return nodup(n);\n}";eval(fn.join(""));return f},jsSelect:function(path,root,type){root=root||doc;if(typeof root=="string"){root=doc.getElementById(root)}var paths=path.split(","),results=[],i,len,subPath,result;for(i=0,len=paths.length;i<len;i++){subPath=paths[i].replace(trimRe,"");if(!cache[subPath]){cache[subPath]=DQ.compile(subPath,type);if(!cache[subPath]){Ext.Error.raise({sourceClass:"Ext.DomQuery",sourceMethod:"jsSelect",msg:subPath+" is not a valid selector"})}}else{setupEscapes(subPath)}result=cache[subPath](root);if(result&&result!==doc){results=results.concat(result)}}if(paths.length>1){return nodup(results)}return results},isXml:function(el){var docEl=(el?el.ownerDocument||el:0).documentElement;return docEl?docEl.nodeName!=="HTML":false},select:doc.querySelectorAll?function(path,root,type,single){root=root||doc;if(!DQ.isXml(root)){try{if(root.parentNode&&(root.nodeType!==9)&&path.indexOf(",")===-1&&!startIdRe.test(path)){path="#"+Ext.escapeId(Ext.id(root))+" "+path;root=root.parentNode}return single?[root.querySelector(path)]:Ext.Array.toArray(root.querySelectorAll(path))}catch(e){}}return DQ.jsSelect.call(this,path,root,type)}:function(path,root,type){return DQ.jsSelect.call(this,path,root,type)},selectNode:function(path,root){return Ext.DomQuery.select(path,root,null,true)[0]},selectValue:function(path,root,defaultValue){path=path.replace(trimRe,"");if(!valueCache[path]){valueCache[path]=DQ.compile(path,"select")}else{setupEscapes(path)}var n=valueCache[path](root),v;n=n[0]?n[0]:n;if(typeof n.normalize=="function"){n.normalize()}v=(n&&n.firstChild?n.firstChild.nodeValue:null);return((v===null||v===undefined||v==="")?defaultValue:v)},selectNumber:function(path,root,defaultValue){var v=DQ.selectValue(path,root,defaultValue||0);return parseFloat(v)},is:function(el,ss){if(typeof el=="string"){el=doc.getElementById(el)}var isArray=Ext.isArray(el),result=DQ.filter(isArray?el:[el],ss);return isArray?(result.length==el.length):(result.length>0)},filter:function(els,ss,nonMatches){ss=ss.replace(trimRe,"");if(!simpleCache[ss]){simpleCache[ss]=DQ.compile(ss,"simple")}else{setupEscapes(ss)}var result=simpleCache[ss](els);return nonMatches?quickDiff(result,els):result},matchers:[{re:/^\.([\w\-\\]+)/,select:useClassList?'n = byClassName(n, "{1}");':'n = byClassName(n, " {1} ");'},{re:/^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},{re:/^#([\w\-\\]+)/,select:'n = byId(n, "{1}");'},{re:/^@([\w\-\.]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}],operators:{"=":function(a,v){return a==v},"!=":function(a,v){return a!=v},"^=":function(a,v){return a&&a.substr(0,v.length)==v},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v},"*=":function(a,v){return a&&a.indexOf(v)!==-1},"%=":function(a,v){return(a%v)==0},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+"-")},"~=":function(a,v){return a&&(" "+a+" ").indexOf(" "+v+" ")!=-1}},pseudos:{"first-child":function(c){var r=[],ri=-1,n,i,ci;for(i=0;(ci=n=c[i]);i++){while((n=n.previousSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci}}return r},"last-child":function(c){var r=[],ri=-1,n,i,ci;for(i=0;(ci=n=c[i]);i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci}}return r},"nth-child":function(c,a){var r=[],ri=-1,m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a),f=(m[1]||1)-0,l=m[2]-0,i,n,j,cn,pn;for(i=0;n=c[i];i++){pn=n.parentNode;if(batch!=pn._batch){j=0;for(cn=pn.firstChild;cn;cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j}}pn._batch=batch}if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n}}else{if((n.nodeIndex+l)%f==0){r[++ri]=n}}}return r},"only-child":function(c){var r=[],ri=-1,i,ci;for(i=0;ci=c[i];i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci}}return r},empty:function(c){var r=[],ri=-1,i,ci,cns,j,cn,empty;for(i=0;ci=c[i];i++){cns=ci.childNodes;j=0;empty=true;while(cn=cns[j]){++j;if(cn.nodeType==1||cn.nodeType==3){empty=false;break}}if(empty){r[++ri]=ci}}return r},contains:function(c,v){var r=[],ri=-1,i,ci;for(i=0;ci=c[i];i++){if((ci.textContent||ci.innerText||ci.text||"").indexOf(v)!=-1){r[++ri]=ci}}return r},nodeValue:function(c,v){var r=[],ri=-1,i,ci;for(i=0;ci=c[i];i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci}}return r},checked:function(c){var r=[],ri=-1,i,ci;for(i=0;ci=c[i];i++){if(ci.checked==true){r[++ri]=ci}}return r},not:function(c,ss){return DQ.filter(c,ss,true)},any:function(c,selectors){var ss=selectors.split("|"),r=[],ri=-1,s,i,ci,j;for(i=0;ci=c[i];i++){for(j=0;s=ss[j];j++){if(DQ.is(ci,s)){r[++ri]=ci;break}}}return r},odd:function(c){return this["nth-child"](c,"odd")},even:function(c){return this["nth-child"](c,"even")},nth:function(c,a){return c[a-1]||[]},first:function(c){return c[0]||[]},last:function(c){return c[c.length-1]||[]},has:function(c,ss){var s=DQ.select,r=[],ri=-1,i,ci;for(i=0;ci=c[i];i++){if(s(ss,ci).length>0){r[++ri]=ci}}return r},next:function(c,ss){var is=DQ.is,r=[],ri=-1,i,ci,n;for(i=0;ci=c[i];i++){n=next(ci);if(n&&is(n,ss)){r[++ri]=ci}}return r},prev:function(c,ss){var is=DQ.is,r=[],ri=-1,i,ci,n;for(i=0;ci=c[i];i++){n=prev(ci);if(n&&is(n,ss)){r[++ri]=ci}}return r},focusable:function(candidates){var len=candidates.length,results=[],i=0,c;for(;i<len;i++){c=candidates[i];if(Ext.fly(c,"_DomQuery").isFocusable()){results.push(c)}}return results},visible:function(candidates,deep){var len=candidates.length,results=[],i=0,c;for(;i<len;i++){c=candidates[i];if(Ext.fly(c,"_DomQuery").isVisible(deep)){results.push(c)}}return results}}}}());Ext.query=Ext.DomQuery.select;