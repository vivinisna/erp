Ext.define("Ext.rtl.grid.column.Column",{override:"Ext.grid.column.Column",isOnLeftEdge:function(a){return(!this.getHierarchyState().rtl!==!Ext.rootHierarchyState.rtl)?(this.getX()+this.getWidth()-a.getXY()[0]<=this.handleWidth):this.callParent(arguments)},isOnRightEdge:function(a){return(!this.getHierarchyState().rtl!==!Ext.rootHierarchyState.rtl)?(a.getXY()[0]-this.getX()<=this.handleWidth):this.callParent(arguments)}});