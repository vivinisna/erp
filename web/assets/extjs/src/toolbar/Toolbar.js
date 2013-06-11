Ext.define("Ext.toolbar.Toolbar",{extend:"Ext.container.Container",requires:["Ext.toolbar.Fill","Ext.layout.container.HBox","Ext.layout.container.VBox"],uses:["Ext.toolbar.Separator"],alias:"widget.toolbar",alternateClassName:"Ext.Toolbar",isToolbar:true,baseCls:Ext.baseCSSPrefix+"toolbar",ariaRole:"toolbar",defaultType:"button",vertical:false,enableOverflow:false,menuTriggerCls:Ext.baseCSSPrefix+"toolbar-more-icon",trackMenus:true,itemCls:Ext.baseCSSPrefix+"toolbar-item",statics:{shortcuts:{"-":"tbseparator"," ":"tbspacer"},shortcutsHV:{0:{"->":{xtype:"tbfill",height:0}},1:{"->":{xtype:"tbfill",width:0}}}},initComponent:function(){var a=this;if(!a.layout&&a.enableOverflow){a.layout={overflowHandler:"Menu"}}if(a.dock==="right"||a.dock==="left"){a.vertical=true}a.layout=Ext.applyIf(Ext.isString(a.layout)?{type:a.layout}:a.layout||{},{type:a.vertical?"vbox":"hbox",align:a.vertical?"stretchmax":"middle"});if(a.vertical){a.addClsWithUI("vertical")}if(a.ui==="footer"){a.ignoreBorderManagement=true}a.callParent();a.addEvents("overflowchange")},getRefItems:function(a){var e=this,b=e.callParent(arguments),d=e.layout,c;if(a&&e.enableOverflow){c=d.overflowHandler;if(c&&c.menu){b=b.concat(c.menu.getRefItems(a))}}return b},lookupComponent:function(e){var d=arguments;if(typeof e=="string"){var b=Ext.toolbar.Toolbar,a=b.shortcutsHV[this.vertical?1:0][e]||b.shortcuts[e];if(typeof a=="string"){e={xtype:a}}else{if(a){e=Ext.apply({},a)}else{e={xtype:"tbtext",text:e}}}this.applyDefaults(e);d=[e]}return this.callParent(d)},applyDefaults:function(a){if(!Ext.isString(a)){a=this.callParent(arguments)}return a},trackMenu:function(c,a){if(this.trackMenus&&c.menu){var d=a?"mun":"mon",b=this;b[d](c,"mouseover",b.onButtonOver,b);b[d](c,"menushow",b.onButtonMenuShow,b);b[d](c,"menuhide",b.onButtonMenuHide,b)}},constructButton:function(a){return a.events?a:Ext.widget(a.split?"splitbutton":this.defaultType,a)},onBeforeAdd:function(a){if(a.is("field")||(a.is("button")&&this.ui!="footer")){a.ui=a.ui+"-toolbar"}if(a instanceof Ext.toolbar.Separator){a.setUI((this.vertical)?"vertical":"horizontal")}this.callParent(arguments)},onAdd:function(a){this.callParent(arguments);this.trackMenu(a)},onRemove:function(a){this.callParent(arguments);this.trackMenu(a,true)},getChildItemsToDisable:function(){return this.items.getRange()},onButtonOver:function(a){if(this.activeMenuBtn&&this.activeMenuBtn!=a){this.activeMenuBtn.hideMenu();a.showMenu();this.activeMenuBtn=a}},onButtonMenuShow:function(a){this.activeMenuBtn=a},onButtonMenuHide:function(a){delete this.activeMenuBtn}});