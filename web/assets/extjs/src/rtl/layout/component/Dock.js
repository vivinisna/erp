Ext.define("Ext.rtl.layout.component.Dock",{override:"Ext.layout.component.Dock",rtlPositions:{top:"top",right:"left",bottom:"bottom",left:"right"},getDockCls:function(a){return"docked-"+(this.owner.getHierarchyState().rtl?this.rtlPositions[a]:a)}});