Ext.define("Ext.selection.TreeModel",{extend:"Ext.selection.RowModel",alias:"selection.treemodel",pruneRemoved:false,onKeyRight:function(d,b){var c=this.getLastFocused(),a=this.view;if(c){if(c.isExpanded()){this.onKeyDown(d,b)}else{if(c.isExpandable()){a.expand(c)}}}},onKeyLeft:function(g,d){var f=this.getLastFocused(),c=this.view,b=c.getSelectionModel(),a;if(f){a=f.parentNode;if(f.isExpanded()){c.collapse(f)}else{if(a&&!a.isRoot()){if(g.shiftKey){b.selectRange(a,f,g.ctrlKey,"up");b.setLastFocused(a)}else{if(g.ctrlKey){b.setLastFocused(a)}else{b.select(a)}}}}}},onKeySpace:function(b,a){this.toggleCheck(b)},onKeyEnter:function(b,a){this.toggleCheck(b)},toggleCheck:function(b){b.stopEvent();var a=this.getLastSelected();if(a){this.view.onCheckChange(a)}}});