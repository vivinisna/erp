Ext.define("Ext.tip.QuickTipManager",(function(){var b,a=false;return{requires:["Ext.tip.QuickTip"],singleton:true,alternateClassName:"Ext.QuickTips",init:function(f,d){if(!b){if(!Ext.isReady){Ext.onReady(function(){Ext.tip.QuickTipManager.init(f,d)});return}var c=Ext.apply({disabled:a,id:"ext-quicktips-tip"},d),e=c.className,g=c.xtype;if(e){delete c.className}else{if(g){e="widget."+g;delete c.xtype}}if(f!==false){c.renderTo=document.body;if(c.renderTo.tagName.toUpperCase()!="BODY"){Ext.Error.raise({sourceClass:"Ext.tip.QuickTipManager",sourceMethod:"init",msg:"Cannot init QuickTipManager: no document body"})}}b=Ext.create(e||"Ext.tip.QuickTip",c);Ext.quickTipsActive=true}},destroy:function(){if(b){var c;b.destroy();b=c}},ddDisable:function(){if(b&&!a){b.disable()}},ddEnable:function(){if(b&&!a){b.enable()}},enable:function(){if(b){b.enable()}a=false},disable:function(){if(b){b.disable()}a=true},isEnabled:function(){return b!==undefined&&!b.disabled},getQuickTip:function(){return b},register:function(){b.register.apply(b,arguments)},unregister:function(){b.unregister.apply(b,arguments)},tips:function(){b.register.apply(b,arguments)}}}()));