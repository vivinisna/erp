Ext.define("GatotKacaErp.module.GeneralSetup.view.OfficeHour",{extend:"GatotKacaErp.view.Base",requires:["GatotKacaErp.module.GeneralSetup.view.grids.OfficeHour","GatotKacaErp.module.GeneralSetup.view.tabs.OfficeHour"],bodyStyle:"padding : 5px; background : transparent",layout:{type:"hbox",align:"stretch"},items:[{xtype:"gridofficehour",flex:1,margin:"0px 5px 0px 0px"},{xtype:"tabofficehour",flex:3}]});