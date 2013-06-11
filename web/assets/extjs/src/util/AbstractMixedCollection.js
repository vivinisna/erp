Ext.define("Ext.util.AbstractMixedCollection",{requires:["Ext.util.Filter"],mixins:{observable:"Ext.util.Observable"},isMixedCollection:true,generation:0,constructor:function(b,a){var c=this;c.items=[];c.map={};c.keys=[];c.length=0;c.allowFunctions=b===true;if(a){c.getKey=a}c.mixins.observable.constructor.call(c)},allowFunctions:false,add:function(b,e){var d=this,f=e,c=b,a;if(arguments.length==1){f=c;c=d.getKey(f)}if(typeof c!="undefined"&&c!==null){a=d.map[c];if(typeof a!="undefined"){return d.replace(c,f)}d.map[c]=f}d.generation++;d.length++;d.items.push(f);d.keys.push(c);if(d.hasListeners.add){d.fireEvent("add",d.length-1,f,c)}return f},getKey:function(a){return a.id},replace:function(c,e){var d=this,a,b;if(arguments.length==1){e=arguments[0];c=d.getKey(e)}a=d.map[c];if(typeof c=="undefined"||c===null||typeof a=="undefined"){return d.add(c,e)}d.generation++;b=d.indexOfKey(c);d.items[b]=e;d.map[c]=e;if(d.hasListeners.replace){d.fireEvent("replace",c,a,e)}return e},addAll:function(f){var e=this,d=0,b,a,c;if(arguments.length>1||Ext.isArray(f)){b=arguments.length>1?arguments:f;for(a=b.length;d<a;d++){e.add(b[d])}}else{for(c in f){if(f.hasOwnProperty(c)){if(e.allowFunctions||typeof f[c]!="function"){e.add(c,f[c])}}}}},each:function(e,d){var b=Ext.Array.push([],this.items),c=0,a=b.length,f;for(;c<a;c++){f=b[c];if(e.call(d||f,f,c,a)===false){break}}},eachKey:function(e,d){var f=this.keys,b=this.items,c=0,a=f.length;for(;c<a;c++){e.call(d||window,f[c],b[c],c,a)}},findBy:function(e,d){var f=this.keys,b=this.items,c=0,a=b.length;for(;c<a;c++){if(e.call(d||window,b[c],f[c])){return b[c]}}return null},find:function(){if(Ext.isDefined(Ext.global.console)){Ext.global.console.warn("Ext.util.MixedCollection: find has been deprecated. Use findBy instead.")}return this.findBy.apply(this,arguments)},insert:function(c,e,f){if(Ext.isIterable(e)){var d,b=e.length,a=[];for(d=0;d<b;d++){a.push(f?this.doInsert(c+d,e[d],f[d]):this.doInsert(c+d,e[d]))}return a}else{return this.doInsert.apply(this,arguments)}},doInsert:function(a,b,e){var d=this,c=b,f=e;if(arguments.length==2){f=c;c=d.getKey(f)}if(d.containsKey(c)){d.suspendEvents();d.removeAtKey(c);d.resumeEvents()}if(a>=d.length){return d.add(c,f)}d.generation++;d.length++;Ext.Array.splice(d.items,a,0,f);if(typeof c!="undefined"&&c!==null){d.map[c]=f}Ext.Array.splice(d.keys,a,0,c);if(d.hasListeners.add){d.fireEvent("add",a,f,c)}return f},remove:function(b){var a=this.removeAt(this.indexOf(b));if(a){this.generation++}return a},removeAll:function(a){var c=this,b;if(a||c.hasListeners.remove){if(a){for(b=a.length-1;b>=0;--b){c.remove(a[b])}}else{while(c.length){c.removeAt(0)}}}else{c.length=c.items.length=c.keys.length=0;c.map={};c.generation++}},removeAt:function(a){var c=this,d,b;if(a<c.length&&a>=0){c.length--;d=c.items[a];Ext.Array.erase(c.items,a,1);b=c.keys[a];if(typeof b!="undefined"){delete c.map[b]}Ext.Array.erase(c.keys,a,1);if(c.hasListeners.remove){c.fireEvent("remove",d,b)}c.generation++;return d}return false},removeAtKey:function(a){return this.removeAt(this.indexOfKey(a))},getCount:function(){return this.length},indexOf:function(a){return Ext.Array.indexOf(this.items,a)},indexOfKey:function(a){return Ext.Array.indexOf(this.keys,a)},get:function(b){var d=this,a=d.map[b],c=a!==undefined?a:(typeof b=="number")?d.items[b]:undefined;return typeof c!="function"||d.allowFunctions?c:null},getAt:function(a){return this.items[a]},getByKey:function(a){return this.map[a]},contains:function(a){return typeof this.map[this.getKey(a)]!="undefined"},containsKey:function(a){return typeof this.map[a]!="undefined"},clear:function(){var a=this;a.length=0;a.items=[];a.keys=[];a.map={};a.generation++;if(a.hasListeners.clear){a.fireEvent("clear")}},first:function(){return this.items[0]},last:function(){return this.items[this.length-1]},sum:function(g,b,h,a){var c=this.extractValues(g,b),f=c.length,e=0,d;h=h||0;a=(a||a===0)?a:f-1;for(d=h;d<=a;d++){e+=c[d]}return e},collect:function(j,e,g){var k=this.extractValues(j,e),a=k.length,b={},c=[],h,f,d;for(d=0;d<a;d++){h=k[d];f=String(h);if((g||!Ext.isEmpty(h))&&!b[f]){b[f]=true;c.push(h)}}return c},extractValues:function(c,a){var b=this.items;if(a){b=Ext.Array.pluck(b,a)}return Ext.Array.pluck(b,c)},hasRange:function(b,a){return(a<this.length)},getRange:function(f,a){var e=this,c=e.items,b=[],d;if(c.length<1){return b}f=f||0;a=Math.min(typeof a=="undefined"?e.length-1:a,e.length-1);if(f<=a){return c.slice(f,a+1)}else{for(d=f;d>=a;d--){b[b.length]=c[d]}}return b},filter:function(d,c,e,a){var b=[];if(Ext.isString(d)){b.push(new Ext.util.Filter({property:d,value:c,anyMatch:e,caseSensitive:a}))}else{if(Ext.isArray(d)||d instanceof Ext.util.Filter){b=b.concat(d)}}return this.filterBy(Ext.util.Filter.createFilterFn(b))},filterBy:function(e,d){var h=this,a=new this.self(),g=h.keys,b=h.items,f=b.length,c;a.getKey=h.getKey;for(c=0;c<f;c++){if(e.call(d||h,b[c],g[c])){a.add(g[c],b[c])}}return a},findIndex:function(c,b,e,d,a){if(Ext.isEmpty(b,false)){return -1}b=this.createValueMatcher(b,d,a);return this.findIndexBy(function(f){return f&&b.test(f[c])},null,e)},findIndexBy:function(e,d,h){var g=this,f=g.keys,b=g.items,c=h||0,a=b.length;for(;c<a;c++){if(e.call(d||g,b[c],f[c])){return c}}return -1},createValueMatcher:function(c,e,a,b){if(!c.exec){var d=Ext.String.escapeRegex;c=String(c);if(e===true){c=d(c)}else{c="^"+d(c);if(b===true){c+="$"}}c=new RegExp(c,a?"":"i")}return c},clone:function(){var e=this,f=new this.self(),d=e.keys,b=e.items,c=0,a=b.length;for(;c<a;c++){f.add(d[c],b[c])}f.getKey=e.getKey;return f}});