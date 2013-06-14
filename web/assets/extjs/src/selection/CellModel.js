Ext.define("Ext.selection.CellModel",{extend:"Ext.selection.Model",alias:"selection.cellmodel",requires:["Ext.util.KeyNav"],isCellModel:true,enableKeyNav:true,preventWrap:false,noSelection:{row:-1,column:-1},constructor:function(){this.addEvents("deselect","select");this.callParent(arguments)},bindComponent:function(a){var c=this,b=a.ownerCt;c.primaryView=a;c.views=c.views||[];c.views.push(a);c.bindStore(a.getStore(),true);a.on({cellmousedown:c.onMouseDown,refresh:c.onViewRefresh,scope:c});if(b.optimizedColumnMove!==false){b.on("columnmove",c.onColumnMove,c)}if(c.enableKeyNav){c.initKeyNav(a)}},initKeyNav:function(a){var b=this;if(!a.rendered){a.on("render",Ext.Function.bind(b.initKeyNav,b,[a],0),b,{single:true});return}a.el.set({tabIndex:-1});b.keyNav=new Ext.util.KeyNav({target:a.el,ignoreInputFields:true,up:b.onKeyUp,down:b.onKeyDown,right:b.onKeyRight,left:b.onKeyLeft,tab:b.onKeyTab,scope:b})},getHeaderCt:function(){var b=this.getCurrentPosition(),a=b?b.view:this.primaryView;return a.headerCt},onKeyUp:function(b,a){this.doMove("up",b)},onKeyDown:function(b,a){this.doMove("down",b)},onKeyLeft:function(b,a){this.doMove("left",b)},onKeyRight:function(b,a){this.doMove("right",b)},doMove:function(b,a){this.keyNavigation=true;this.move(b,a);this.keyNavigation=false},move:function(a,d){var c=this,f=c.getCurrentPosition(),b;if(f){b=f.view.walkCells(f,a,d,c.preventWrap);if(b){b.view=f.view;return c.setCurrentPosition(b)}}return null},getCurrentPosition:function(){return this.selecting?this.nextSelection:this.selection},setCurrentPosition:function(c){var b=this,a=b.selection;b.lastSelection=a;if(a){if(c&&(c.row===a.row&&c.column===a.column&&c.view===a.view)){c=null}else{b.onCellDeselect(b.selection)}}if(c){b.nextSelection=new b.Selection(b);b.nextSelection.setPosition(c);b.selecting=true;b.onCellSelect(b.nextSelection);b.selecting=false;return(b.selection=b.nextSelection)}return null},isCellSelected:function(d,b){var c=this,a,e=c.getCurrentPosition();if(e){a=new this.Selection(c);a.setPosition(d,b);return(a.record===e.record)&&(a.columnHeader===e.columnHeader)}},onStoreRemove:function(j,b,e){var g=this,h=g.getCurrentPosition(),c,a=b.length,f,d=0;g.callParent(arguments);if(h){if(e[0]>h.row){return}for(c=0;c<a;c++){f=e[c];if(f<h.row){d++}else{break}}if(d){h.setRow(h.row-d)}}},onMouseDown:function(c,a,d,b,g,h,f){if(h!==-1){this.setCurrentPosition({view:c,row:h,column:d})}},onCellSelect:function(a,b){if(a&&a.row!==undefined&&a.row>-1){this.doSelect(a.record,false,b)}},onCellDeselect:function(a,b){if(a&&a.row!==undefined){this.doDeselect(a.record,b)}},onSelectChange:function(b,e,d,g){var f=this,h,c,a;if(e){h=f.nextSelection;c="select"}else{h=f.lastSelection||f.noSelection;c="deselect"}a=h.view||f.primaryView;if((d||f.fireEvent("before"+c,f,b,h.row,h.column))!==false&&g()!==false){if(e){a.onCellSelect(h);a.onCellFocus(h)}else{a.onCellDeselect(h);delete f.selection}if(!d){f.fireEvent(c,f,b,h.row,h.column)}}},onKeyTab:function(d,b){var c=this,f=c.getCurrentPosition(),a;if(f){a=f.view.editingPlugin;if(a&&c.wasEditing){c.onEditorTab(a,d)}else{c.move(d.shiftKey?"left":"right",d)}}},onEditorTab:function(b,f){var c=this,d=f.shiftKey?"left":"right",a=c.move(d,f);if(a){if(b.startEdit(a.row,a.column)){c.wasEditing=false}else{c.wasEditing=true;if(!a.columnHeader.dataIndex){c.onEditorTab(b,f)}}}},refresh:function(){var b=this.getCurrentPosition(),a;if(b&&(a=this.store.indexOf(this.selected.last()))!==-1){b.row=a}},onColumnMove:function(d,e,b,c){var a=d.up("tablepanel");if(a){this.onViewRefresh(a.view)}},onUpdate:function(a){var b=this,c;if(b.isSelected(a)){c=b.selecting?b.nextSelection:b.selection;b.view.onCellSelect(c)}},onViewRefresh:function(b){var c=this,f=c.getCurrentPosition(),e=b.headerCt,a,d;if(f&&f.view===b){a=f.record;d=f.columnHeader;if(!d.isDescendantOf(e)){d=e.queryById(d.id)||e.down('[text="'+d.text+'"]')||e.down('[dataIndex="'+d.dataIndex+'"]')}if(d&&(b.store.indexOfId(a.getId())!==-1)){c.setCurrentPosition({row:a,column:d,view:b})}}},selectByPosition:function(a){this.setCurrentPosition(a)}},function(){var a=this.prototype.Selection=function(b){this.model=b;this.view=b.primaryView};a.prototype.setPosition=function(d,b){var c=this;if(arguments.length===1){if(d.view){c.view=d.view}b=d.column;d=d.row}c.setRow(d);c.setColumn(b);return c};a.prototype.setRow=function(c){var b=this;if(c!==undefined){if(typeof c==="number"){b.row=Math.max(Math.min(c,b.view.store.getCount()-1),0);b.record=b.view.store.getAt(c)}else{if(c.isModel){b.record=c;b.row=b.view.indexOf(c)}else{if(c.tagName){b.record=b.view.getRecord(c);b.row=b.view.indexOf(b.record)}}}}};a.prototype.setColumn=function(b){var c=this;if(b!==undefined){if(typeof b==="number"){c.column=b;c.columnHeader=c.view.getHeaderAtIndex(b)}else{if(b.isHeader){c.columnHeader=b;c.column=b.getIndex()}}}}});