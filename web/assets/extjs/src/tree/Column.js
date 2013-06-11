Ext.define("Ext.tree.Column",{extend:"Ext.grid.column.Column",alias:"widget.treecolumn",tdCls:Ext.baseCSSPrefix+"grid-cell-treecolumn",autoLock:true,lockable:false,draggable:false,hideable:false,treePrefix:Ext.baseCSSPrefix+"tree-",elbowPrefix:Ext.baseCSSPrefix+"tree-elbow-",expanderCls:Ext.baseCSSPrefix+"tree-expander",imgText:'<img src="{1}" class="{0}" />',checkboxText:'<input type="button" role="checkbox" class="{0}" {1} />',initComponent:function(){var a=this;a.origRenderer=a.renderer||a.defaultRenderer;a.origScope=a.scope||window;a.renderer=a.treeRenderer;a.scope=a;a.callParent()},treeRenderer:function(l,n,c,b,k,e,j){var s=this,r=[],p=Ext.String.format,u=c.getDepth(),q=s.treePrefix,d=s.elbowPrefix,m=s.expanderCls,h=s.imgText,v=s.checkboxText,g=s.origRenderer.apply(s.origScope,arguments),f=Ext.BLANK_IMAGE_URL,o=c.get("href"),t=c.get("hrefTarget"),a=c.get("cls"),i=s.getChildCls?s.getChildCls()+" ":"";while(c){if(!c.isRoot()||(c.isRoot()&&j.rootVisible)){if(c.getDepth()===u){r.unshift(p(h,i+q+"icon "+q+"icon"+(c.get("icon")?"-inline ":(c.isLeaf()?"-leaf ":"-parent "))+(c.get("iconCls")||""),c.get("icon")||f));if(c.get("checked")!==null){r.unshift(p(v,i+(q+"checkbox")+(c.get("checked")?" "+q+"checkbox-checked":""),c.get("checked")?'aria-checked="true"':""));if(c.get("checked")){n.tdCls+=(" "+q+"checked")}}if(c.isLast()){if(c.isExpandable()){r.unshift(p(h,(i+d+"end-plus "+m),f))}else{r.unshift(p(h,(i+d+"end"),f))}}else{if(c.isExpandable()){r.unshift(p(h,(i+d+"plus "+m),f))}else{r.unshift(p(h,(i+q+"elbow"),f))}}}else{if(c.isLast()||c.getDepth()===0){r.unshift(p(h,(i+d+"empty"),f))}else{if(c.getDepth()!==0){r.unshift(p(h,(i+d+"line"),f))}}}}c=c.parentNode}if(o){r.push('<a href="',o,'" target="',t,'">',g,"</a>")}else{r.push(g)}if(a){n.tdCls+=" "+a}return r.join("")},defaultRenderer:Ext.identityFn});