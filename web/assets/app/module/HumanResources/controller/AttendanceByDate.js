Ext.define("GatotKacaErp.module.HumanResources.controller.AttendanceByDate",{extend:"GatotKacaErp.controller.Base",views:["GatotKacaErp.module.HumanResources.view.AttendanceByDate"],store:"GatotKacaErp.module.HumanResources.store.AttendanceByDate",init:function(){var b=this;var a=b.getStore(b.store);a.addListener("load",b.onStoreLoad,b);b.loadStore(a);b.control({"gridattendancebydate datefield[name=attByDateFilterFrom]":{change:b.filterAttendance},"gridattendancebydate datefield[name=attByDateFilterTo]":{change:b.filterAttendance},"gridattendancebydate checkbox[name=attByDateAbsence]":{change:b.filterAttendance}});b.callParent(arguments)},filterAttendance:function(c,b,e){var d=this;var g=Ext.Date.format(Ext.getCmp("attByDateFilterFrom").getValue(),"Y-m-d");var f=Ext.Date.format(Ext.getCmp("attByDateFilterTo").getValue(),"Y-m-d");var a=Ext.getCmp("attByDateAbsence").getValue();if(g!=""&&f!=""){this.loadStore(d.store,{from:g,to:f,absence:a})}}});