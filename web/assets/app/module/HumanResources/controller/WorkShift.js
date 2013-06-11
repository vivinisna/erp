Ext.define("GatotKacaErp.module.HumanResources.controller.WorkShift",{extend:"GatotKacaErp.controller.Base",views:["GatotKacaErp.module.HumanResources.view.WorkShift"],store:"GatotKacaErp.module.HumanResources.store.WorkShift",fmSelector:"formworkshift",init:function(){var b=this;var a=b.getStore(b.store);a.addListener("load",b.onStoreLoad,b);b.loadStore(a);b.getStore("GatotKacaErp.store.OfficeHour").load();b.getStore("GatotKacaErp.module.HumanResources.store.Shiftment");b.control({"gridworkshift textfield[action=search]":{keypress:b.search},"gridworkshift button[action=refresh]":{click:b.reloadStore},gridworkshift:{select:b.viewDetail},"formworkshift button[action=save]":{click:b.save},"formworkshift button[action=reset]":{click:b.resetForm},gridshiftment:{select:b.viewShiftment}});b.callParent(arguments)},search:function(d,a,c){var b=this;if(a.ENTER==a.getKey()){this.loadStore(b.store,{query:d.getValue()})}},reloadStore:function(){this.loadStore(this.store)},viewDetail:function(b,e,j,h,i,a){var c=this.getForm(this.fmSelector);c.findField("employee_id").setValue(e.data.employee_id);var d=new Date();var g=new Date(d.getFullYear(),d.getMonth(),1);var f=new Date(d.getFullYear(),d.getMonth()+1,0);this.loadStore("GatotKacaErp.module.HumanResources.store.Shiftment",{employee_id:e.data.employee_id,from:g,to:f})},save:function(b,a,e){var d=this;var c=d.getForm(d.fmSelector);if(c.findField("employee_id").getValue()!=""){if(c.isValid()){d.ajaxRequest(BASE_URL+"human_resources/employee/saveshiftment",{shiftment:Ext.JSON.encode(c.getValues())},function(f){d.showMessage({title:"SERVER MESSAGE",msg:f.msg,icon:Ext.MessageBox.INFO,buttons:Ext.MessageBox.OK});var g=new Date();var i=new Date(g.getFullYear(),g.getMonth(),1);var h=new Date(g.getFullYear(),g.getMonth()+1,0);d.loadStore("GatotKacaErp.module.HumanResources.store.Shiftment",{employee_id:c.findField("employee_id").getValue(),from:i,to:h});d.resetForm()})}else{d.showMessage({title:"ERROR MESSAGE",msg:"Form is not valid",icon:Ext.MessageBox.WARNING,buttons:Ext.MessageBox.OK})}}else{d.showMessage({title:"ERROR MESSAGE",msg:"Employee must be selected",icon:Ext.MessageBox.WARNING,buttons:Ext.MessageBox.OK})}},resetForm:function(d,b,f){var e=this.getForm(this.fmSelector);var c=e.findField("employee_id");var a=c.getValue();e.reset();e.findField("shift_date").setReadOnly(false);c.setValue(a)},viewShiftment:function(d,c,h,a,b,g){var f=this;var e=f.getForm(f.fmSelector);f.ajaxRequest(BASE_URL+"human_resources/employee/shiftmentdetail",{shift_id:c.data.shift_id},function(i){e.setValues(i.data[0]);e.findField("shift_date").setReadOnly(true)})}});