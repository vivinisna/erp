Ext.define("Ext.util.MixedCollection",{extend:"Ext.util.AbstractMixedCollection",mixins:{sortable:"Ext.util.Sortable"},constructor:function(){var a=this;a.callParent(arguments);a.addEvents("sort");a.mixins.sortable.initSortable.call(a)},doSort:function(a){this.sortBy(a)},_sort:function(k,a,j){var h=this,d,e,b=String(a).toUpperCase()=="DESC"?-1:1,g=[],l=h.keys,f=h.items;j=j||function(i,c){return i-c};for(d=0,e=f.length;d<e;d++){g[g.length]={key:l[d],value:f[d],index:d}}Ext.Array.sort(g,function(i,c){var m=j(i[k],c[k])*b;if(m===0){m=(i.index<c.index?-1:1)}return m});for(d=0,e=g.length;d<e;d++){f[d]=g[d].value;l[d]=g[d].key}h.fireEvent("sort",h)},sortBy:function(c){var g=this,b=g.items,f=g.keys,e=b.length,a=[],d;for(d=0;d<e;d++){a[d]={key:f[d],value:b[d],index:d}}Ext.Array.sort(a,function(i,h){var j=c(i.value,h.value);if(j===0){j=(i.index<h.index?-1:1)}return j});for(d=0;d<e;d++){b[d]=a[d].value;f[d]=a[d].key}g.fireEvent("sort",g,b,f)},findInsertionIndex:function(e,d){var f=this,b=f.items,h=0,a=b.length-1,c,g;if(!d){d=f.generateComparator()}while(h<=a){c=(h+a)>>1;g=d(e,b[c]);if(g>=0){h=c+1}else{if(g<0){a=c-1}}}return h},reorder:function(d){var g=this,b=g.items,c=0,f=b.length,a=[],e=[],h;g.suspendEvents();for(h in d){a[d[h]]=b[h]}for(c=0;c<f;c++){if(d[c]==undefined){e.push(b[c])}}for(c=0;c<f;c++){if(a[c]==undefined){a[c]=e.shift()}}g.clear();g.addAll(a);g.resumeEvents();g.fireEvent("sort",g)},sortByKey:function(a,b){this._sort("key",a,b||function(d,c){var f=String(d).toUpperCase(),e=String(c).toUpperCase();return f>e?1:(f<e?-1:0)})}});