Ext.define("GatotKacaErp.module.GeneralSetup.view.grids.Division",{extend:"Ext.grid.Panel",requires:["Ext.ux.CheckColumn"],store:"GatotKacaErp.module.GeneralSetup.store.Division",alias:"widget.griddivision",id:"griddivision",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Division List",border:true,columns:[{xtype:"rownumberer",width:"11%"},{text:"Code",dataIndex:"department_code",width:"11%"},{text:"Parent",dataIndex:"department_pname",width:"27%"},{text:"Name",dataIndex:"department_name",width:"27%"},{text:"Status",dataIndex:"division_status",width:"11%",xtype:"checkcolumn"}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}]});