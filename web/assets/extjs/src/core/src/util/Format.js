(function(){Ext.ns("Ext.util");Ext.util.Format={};var f=Ext.util.Format,e=/<\/?[^>]+>/gi,c=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,b=/\r?\n/g,d=/[^\d\.]/g,a;Ext.apply(f,{thousandSeparator:",",decimalSeparator:".",currencyPrecision:2,currencySign:"$",currencyAtEnd:false,undef:function(g){return g!==undefined?g:""},defaultValue:function(h,g){return h!==undefined&&h!==""?h:g},substr:"ab".substr(-1)!="b"?function(h,j,g){var i=String(h);return(j<0)?i.substr(Math.max(i.length+j,0),g):i.substr(j,g)}:function(h,i,g){return String(h).substr(i,g)},lowercase:function(g){return String(g).toLowerCase()},uppercase:function(g){return String(g).toUpperCase()},usMoney:function(g){return f.currency(g,"$",2)},currency:function(j,l,h,g){var n="",m=",0",k=0;j=j-0;if(j<0){j=-j;n="-"}h=Ext.isDefined(h)?h:f.currencyPrecision;m+=m+(h>0?".":"");for(;k<h;k++){m+="0"}j=f.number(j,m);if((g||f.currencyAtEnd)===true){return Ext.String.format("{0}{1}{2}",n,j,l||f.currencySign)}else{return Ext.String.format("{0}{1}{2}",n,l||f.currencySign,j)}},date:function(g,h){if(!g){return""}if(!Ext.isDate(g)){g=new Date(Date.parse(g))}return Ext.Date.dateFormat(g,h||Ext.Date.defaultFormat)},dateRenderer:function(g){return function(h){return f.date(h,g)}},stripTags:function(g){return !g?g:String(g).replace(e,"")},stripScripts:function(g){return !g?g:String(g).replace(c,"")},fileSize:function(g){if(g<1024){return g+" bytes"}else{if(g<1048576){return(Math.round(((g*10)/1024))/10)+" KB"}else{return(Math.round(((g*10)/1048576))/10)+" MB"}}},math:(function(){var g={};return function(i,h){if(!g[h]){g[h]=Ext.functionFactory("v","return v "+h+";")}return g[h](i)}}()),round:function(i,h){var g=Number(i);if(typeof h=="number"){h=Math.pow(10,h);g=Math.round(i*h)/h}return g},number:function(x,r){if(!r){return x}x=Ext.Number.from(x,NaN);if(isNaN(x)){return""}var y=f.thousandSeparator,p=f.decimalSeparator,q=x<0,h,g,w,u,o,s,l,k,t;x=Math.abs(x);if(r.substr(r.length-2)=="/i"){if(!a){a=new RegExp("[^\\d\\"+f.decimalSeparator+"]","g")}r=r.substr(0,r.length-2);h=r.indexOf(y)!=-1;g=r.replace(a,"").split(p)}else{h=r.indexOf(",")!=-1;g=r.replace(d,"").split(".")}if(g.length>2){Ext.Error.raise({sourceClass:"Ext.util.Format",sourceMethod:"number",value:x,formatString:r,msg:"Invalid number format, should have no more than 1 decimal"})}else{if(g.length>1){x=Ext.Number.toFixed(x,g[1].length)}else{x=Ext.Number.toFixed(x,0)}}w=x.toString();g=w.split(".");if(h){u=g[0];o=[];s=u.length;l=Math.floor(s/3);k=u.length%3||3;for(t=0;t<s;t+=k){if(t!==0){k=3}o[o.length]=u.substr(t,k);l-=1}w=o.join(y);if(g[1]){w+=p+g[1]}}else{if(g[1]){w=g[0]+p+g[1]}}if(q){q=w.replace(/[^1-9]/g,"")!==""}return(q?"-":"")+r.replace(/[\d,?\.?]+/,w)},numberRenderer:function(g){return function(h){return f.number(h,g)}},attributes:function(h){if(typeof h==="object"){var g=[],i;for(i in h){g.push(i,'="',i==="style"?Ext.DomHelper.generateStyles(h[i]):Ext.htmlEncode(h[i]),'"')}h=g.join("")}return h||""},plural:function(g,h,i){return g+" "+(g==1?h:(i?i:h+"s"))},nl2br:function(g){return Ext.isEmpty(g)?"":g.replace(b,"<br/>")},capitalize:Ext.String.capitalize,ellipsis:Ext.String.ellipsis,format:Ext.String.format,htmlDecode:Ext.String.htmlDecode,htmlEncode:Ext.String.htmlEncode,leftPad:Ext.String.leftPad,trim:Ext.String.trim,parseBox:function(h){h=h||0;if(typeof h==="number"){return{top:h,right:h,bottom:h,left:h}}var i=h.split(" "),g=i.length;if(g==1){i[1]=i[2]=i[3]=i[0]}else{if(g==2){i[2]=i[0];i[3]=i[1]}else{if(g==3){i[3]=i[1]}}}return{top:parseInt(i[0],10)||0,right:parseInt(i[1],10)||0,bottom:parseInt(i[2],10)||0,left:parseInt(i[3],10)||0}},escapeRegex:function(g){return g.replace(/([\-.*+?\^${}()|\[\]\/\\])/g,"\\$1")}})}());