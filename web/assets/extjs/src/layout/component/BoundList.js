Ext.define("Ext.layout.component.BoundList",{extend:"Ext.layout.component.Auto",alias:"layout.boundlist",type:"component",beginLayout:function(d){var c=this,a=c.owner,b=a.pagingToolbar;c.callParent(arguments);if(a.floating){d.savedXY=a.getXY();a.setXY([0,-9999])}if(b){d.toolbarContext=d.context.getCmp(b)}d.listContext=d.getEl("listEl")},beginLayoutCycle:function(b){var a=this.owner;this.callParent(arguments);if(b.heightModel.auto){a.el.setHeight("auto");a.listEl.setHeight("auto")}},getLayoutItems:function(){var a=this.owner.pagingToolbar;return a?[a]:[]},isValidParent:function(){return true},finishedLayout:function(a){var b=a.savedXY;this.callParent(arguments);if(b){this.owner.setXY(b)}},measureContentWidth:function(a){return this.owner.listEl.getWidth()},measureContentHeight:function(a){return this.owner.listEl.getHeight()},publishInnerHeight:function(c,a){var b=c.toolbarContext,d=0;if(b){d=b.getProp("height")}if(d===undefined){this.done=false}else{c.listContext.setHeight(a-c.getFrameInfo().height-d)}},calculateOwnerHeightFromContentHeight:function(c){var a=this.callParent(arguments),b=c.toolbarContext;if(b){a+=b.getProp("height")}return a}});