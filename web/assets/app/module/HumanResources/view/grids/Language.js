Ext.define("GatotKacaErp.module.HumanResources.view.grids.Language",{extend:"Ext.grid.Panel",alias:"widget.gridlanguage",store:"GatotKacaErp.module.HumanResources.store.Language",id:"gridlanguage",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Language List",border:true,columns:[{xtype:"rownumberer",width:"5%"},{text:"From",dataIndex:"language_start",xtype:"datecolumn",format:"d-m-Y",width:"11%"},{text:"To",dataIndex:"language_end",xtype:"datecolumn",format:"d-m-Y",width:"11%"},{text:"Courses Name",dataIndex:"language_name",width:"33%"},{text:"Institute",dataIndex:"language_institute",width:"39%"}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}]});