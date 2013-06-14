Ext.define("GatotKacaErp.module.GeneralSetup.view.grids.Country",{extend:"Ext.grid.Panel",store:"GatotKacaErp.module.GeneralSetup.store.Country",alias:"widget.gridcountry",id:"gridcountry",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Country List",border:true,columns:[{xtype:"rownumberer",width:"11%"},{text:"Code",dataIndex:"country_code",width:"17%"},{text:"Name",dataIndex:"country_name",width:"70%"}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}],bbar:["->",{text:"Refresh",xtype:"button",iconCls:"icon-arrow_refresh",action:"refresh"}]});