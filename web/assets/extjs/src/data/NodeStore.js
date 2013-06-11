Ext.define("Ext.data.NodeStore",{extend:"Ext.data.Store",alias:"store.node",requires:["Ext.data.NodeInterface"],isNodeStore:true,node:null,recursive:false,rootVisible:false,collapseCount:0,constructor:function(a){var c=this,b;a=a||{};Ext.apply(c,a);if(Ext.isDefined(c.proxy)){Ext.Error.raise("A NodeStore cannot be bound to a proxy. Instead bind it to a record decorated with the NodeInterface by setting the node config.")}c.useModelWarning=false;a.proxy={type:"proxy"};c.callParent([a]);b=c.node;if(b){c.node=null;c.setNode(b)}},setNode:function(b){var a=this;if(a.node&&a.node!=b){a.mun(a.node,{expand:a.onNodeExpand,collapse:a.onNodeCollapse,append:a.onNodeAppend,insert:a.onNodeInsert,remove:a.onNodeRemove,sort:a.onNodeSort,scope:a});a.node=null}if(b){Ext.data.NodeInterface.decorate(b.self);a.removeAll();if(a.rootVisible){a.add(b)}else{if(!b.isExpanded()&&a.treeStore.autoLoad!==false){b.expand()}}a.mon(b,{expand:a.onNodeExpand,collapse:a.onNodeCollapse,append:a.onNodeAppend,insert:a.onNodeInsert,remove:a.onNodeRemove,sort:a.onNodeSort,scope:a});a.node=b;if(b.isExpanded()&&b.isLoaded()){a.onNodeExpand(b,b.childNodes,true)}}},onNodeSort:function(b,c){var a=this;if((a.indexOf(b)!==-1||(b===a.node&&!a.rootVisible)&&b.isExpanded())){a.onNodeCollapse(b,c,true);a.onNodeExpand(b,c,true)}},onNodeExpand:function(f,d,c){var h=this,a=h.indexOf(f)+1,g=d?d.length:0,e,b;if(!h.recursive&&f!==h.node){return}if(f!==this.node&&!h.isVisible(f)){return}if(!c&&h.fireEvent("beforeexpand",f,d,a)===false){return}if(g){h.insert(a,d);for(e=0;e<g;e++){b=d[e];if(b.isExpanded()){if(b.isLoaded()){h.onNodeExpand(b,b.childNodes,true)}else{b.set("expanded",false);b.expand()}}}}if(!c){h.fireEvent("expand",f,d)}},onNodeCollapse:function(g,a,j){var f=this,e=a.length,h=f.indexOf(g)+1,b=f.collapseCount===0,c,d;if(!f.recursive&&g!==f.node){return}if(!j&&f.fireEvent("beforecollapse",g,a,h)===false){return}++f.collapseCount;if(b){f.fireEvent("collapsestart",f,g)}for(c=0;c<e;c++){d=a[c];f.remove(d);if(d.isExpanded()){f.onNodeCollapse(d,d.childNodes,true)}}if(b){f.fireEvent("collapsecomplete",f,g)}--f.collapseCount;if(!j){f.fireEvent("collapse",g,a,h)}},onNodeAppend:function(d,f,b){var e=this,a,c;if(e.isVisible(f)){if(b===0){a=d}else{c=f.previousSibling;while(c.isExpanded()&&c.lastChild){c=c.lastChild}a=c}e.insert(e.indexOf(a)+1,f);if(!f.isLeaf()&&f.isExpanded()){if(f.isLoaded()){e.onNodeExpand(f,f.childNodes,true)}else{f.set("expanded",false);f.expand()}}}},onNodeInsert:function(c,e,a){var d=this,b=this.indexOf(a);if(b!=-1&&d.isVisible(e)){d.insert(b,e);if(!e.isLeaf()&&e.isExpanded()){if(e.isLoaded()){d.onNodeExpand(e,e.childNodes,true)}else{e.set("expanded",false);e.expand()}}}},onNodeRemove:function(b,d,a){var c=this;if(c.indexOf(d)!=-1){if(!d.isLeaf()&&d.isExpanded()){c.onNodeCollapse(d,d.childNodes,true)}c.remove(d)}},isVisible:function(b){var a=b.parentNode;while(a){if(a===this.node&&!this.rootVisible&&a.isExpanded()){return true}if(this.indexOf(a)===-1||!a.isExpanded()){return false}a=a.parentNode}return true}});