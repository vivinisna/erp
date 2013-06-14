Ext.define("GatotKacaErp.module.GeneralSetup.view.forms.Country",{extend:"Ext.form.Panel",alias:"widget.formcountry",id:"formcountry",border:true,autoHeight:true,title:"Country Detail",bodyStyle:"padding: 5px; background : transparent;",labelWidth:55,width:"100%",items:[{name:"country_id",xtype:"hidden"},{xtype:"fieldset",title:"Country Information",defaults:{fieldAlign:"left",anchor:"100%",layout:{type:"hbox"}},items:[{xtype:"fieldcontainer",fieldLabel:"Description",combineErrors:true,hideLabel:true,beforeLabelTextTpl:REQUIRED,msgTarget:"side",layout:{type:"hbox"},defaults:{flex:1,hideLabel:false,allowBlank:false,labelWidth:77},items:[{fieldLabel:"Code",xtype:"textfield",beforeLabelTextTpl:REQUIRED,emptyText:"XX",maxLength:3,name:"country_code",margins:"0px 5px 0px 0px"},{fieldLabel:"Name",xtype:"textfield",beforeLabelTextTpl:REQUIRED,emptyText:"Country Name",flex:3,name:"country_name",margins:"0px 5px 0px 0px"},{fieldLabel:"Phonecode",beforeLabelTextTpl:REQUIRED,emptyText:"Phonecode",xtype:"numberfield",maxLength:5,hideTrigger:true,name:"country_phonecode",checked:true}]}]}],tbar:[{text:"Save",iconCls:"icon-disk",action:"save"},{text:"Reset",iconCls:"icon-error",action:"reset"}]});