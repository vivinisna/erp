Ext.define("GatotKacaErp.module.GeneralSetup.controller.Country",{extend:"GatotKacaErp.controller.Base",views:["GatotKacaErp.module.GeneralSetup.view.Country"],store:"GatotKacaErp.module.GeneralSetup.store.Country",fmSelector:"formcountry",init:function(){var b=this;var a=b.getStore(b.store);b.getStore("GatotKacaErp.module.GeneralSetup.store.Country");a.addListener("load",b.onStoreLoad,b);b.loadStore(a);b.control({"formcountry button[action=reset]":{click:b.resetForm},"formcountry button[action=save]":{click:b.save},"gridcountry  button[action=refresh]":{click:b.reloadStore},"gridcountry textfield[action=search]":{keypress:b.search},gridcountry:{itemclick:b.viewDetail,itemcontextmenu:b.showContextMenu}});b.callParent(arguments)},reloadStore:function(){this.loadStore(this.store)},search:function(d,a,c){var b=this;if(a.ENTER==a.getKey()){b.loadStore(b.store,{query:d.getValue()})}},viewDetail:function(d,c,g,a,b,f){var e=this.getForm(this.fmSelector);this.ajaxRequest(BASE_URL+"country/getbyid",{country_id:c.data.country_id},function(h){e.setValues(h.data[0])})},save:function(b,a,e){var d=this;var c=b.up("form").getForm();if(c.isValid()){d.ajaxRequest(BASE_URL+"country/save",{country:Ext.JSON.encode(c.getValues())},function(f){d.showMessage({title:"SERVER MESSAGE",msg:f.msg,icon:Ext.MessageBox.INFO,buttons:Ext.MessageBox.OK});d.reloadStore();d.resetForm();store.removeAll()})}else{d.showMessage({title:"ERROR MESSAGE",msg:"Form is not valid",icon:Ext.MessageBox.WARNING,buttons:Ext.MessageBox.OK})}},resetForm:function(){var a=this.getForm(this.fmSelector);a.reset()}});