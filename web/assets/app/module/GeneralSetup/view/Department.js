Ext.define("GatotKacaErp.module.GeneralSetup.view.Department",{extend:"GatotKacaErp.view.Base",requires:["GatotKacaErp.module.GeneralSetup.view.grids.Department","GatotKacaErp.module.GeneralSetup.view.tabs.Department"],bodyStyle:"padding : 5px; background : transparent",layout:{type:"hbox",align:"stretch"},items:[{xtype:"griddepartment",flex:1,margin:"0px 5px 0px 0px"},{xtype:"tabdepartment",flex:3}]});