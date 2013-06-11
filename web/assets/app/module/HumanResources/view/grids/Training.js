Ext.define("GatotKacaErp.module.HumanResources.view.grids.Training",{extend:"Ext.grid.Panel",alias:"widget.gridtraining",store:"GatotKacaErp.module.HumanResources.store.Training",id:"gridtraining",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Training List",border:true,columns:[{xtype:"rownumberer",width:"5%"},{text:"From",dataIndex:"training_start",xtype:"datecolumn",format:"d-m-Y",width:"11%"},{text:"To",dataIndex:"training_end",xtype:"datecolumn",format:"d-m-Y",width:"11%"},{text:"Courses Name",dataIndex:"training_name",width:"33%"},{text:"Institute",dataIndex:"training_institute",width:"39%"}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}]});