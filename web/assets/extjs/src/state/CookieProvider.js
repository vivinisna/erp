Ext.define("Ext.state.CookieProvider",{extend:"Ext.state.Provider",constructor:function(a){var b=this;b.path="/";b.expires=new Date(new Date().getTime()+(1000*60*60*24*7));b.domain=null;b.secure=false;b.callParent(arguments);b.state=b.readCookies()},set:function(a,c){var b=this;if(typeof c=="undefined"||c===null){b.clear(a);return}b.setCookie(a,c);b.callParent(arguments)},clear:function(a){this.clearCookie(a);this.callParent(arguments)},readCookies:function(){var e={},i=document.cookie+";",d=/\s?(.*?)=(.*?);/g,h=this.prefix,a=h.length,g,b,f;while((g=d.exec(i))!=null){b=g[1];f=g[2];if(b&&b.substring(0,a)==h){e[b.substr(a)]=this.decodeValue(f)}}return e},setCookie:function(a,c){var b=this;document.cookie=b.prefix+a+"="+b.encodeValue(c)+((b.expires==null)?"":("; expires="+b.expires.toGMTString()))+((b.path==null)?"":("; path="+b.path))+((b.domain==null)?"":("; domain="+b.domain))+((b.secure==true)?"; secure":"")},clearCookie:function(a){var b=this;document.cookie=b.prefix+a+"=null; expires=Thu, 01-Jan-70 00:00:01 GMT"+((b.path==null)?"":("; path="+b.path))+((b.domain==null)?"":("; domain="+b.domain))+((b.secure==true)?"; secure":"")}});