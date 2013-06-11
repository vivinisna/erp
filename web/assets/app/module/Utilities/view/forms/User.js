Ext.define("GatotKacaErp.module.Utilities.view.forms.User",{extend:"Ext.form.Panel",requires:["GatotKacaErp.module.Utilities.view.grids.UserRole"],alias:"widget.formuser",id:"formuser",title:"User Detail",border:true,autoHeight:true,layout:{type:"vbox",align:"stretch"},bodyStyle:"padding : 5px; background : transparent;",labelWidth:97,defaultType:"textfield",items:[{name:"user_id",xtype:"hidden"},{xtype:"fieldset",title:"User Information",defaults:{fieldAlign:"left",labelWidth:87,anchor:"100%",layout:{type:"hbox"}},items:[{xtype:"fieldcontainer",fieldLabel:"User Field",combineErrors:true,hideLabel:true,msgTarget:"side",defaults:{flex:1,labelWidth:97,hideLabel:false,beforeLabelTextTpl:REQUIRED},defaultType:"textfield",items:[{fieldLabel:"Username",emptyText:"Username",name:"user_name",allowBlank:false,readOnly:true,margins:"0px 5px 0px 0px"},{fieldLabel:"Group",emptyText:"Select Group",store:"GatotKacaErp.store.Group",name:"group_name",displayField:"group_name",valueField:"group_id",query:"local",xtype:"combo"}]},{xtype:"fieldcontainer",fieldLabel:"User Account Assosiation",combineErrors:true,hideLabel:true,msgTarget:"side",defaults:{flex:1,labelWidth:97,hideLabel:false,beforeLabelTextTpl:REQUIRED},defaultType:"textfield",items:[{fieldLabel:"First Name",emptyText:"First Name",name:"fname",allowBlank:false,readOnly:true,margins:"0px 5px 0px 0px"},{fieldLabel:"Last Name",emptyText:"Last Name",name:"lname",allowBlank:false,readOnly:true}]},{xtype:"fieldcontainer",fieldLabel:"Status",combineErrors:true,hideLabel:true,msgTarget:"side",defaults:{flex:1,labelWidth:97,hideLabel:false},defaultType:"checkboxfield",items:[{fieldLabel:"Active",name:"user_status",checked:true,action:"change",margins:"0px 5px 0px 0px"},{fieldLabel:"Online",name:"user_online"},{fieldLabel:"New Password",emptyText:"New Password",inputType:"password",name:"npassword",xtype:"textfield",flex:2}]}]},{xtype:"gridrole",flex:2}],tbar:[{text:"Save",iconCls:"icon-disk",action:"save"}]});