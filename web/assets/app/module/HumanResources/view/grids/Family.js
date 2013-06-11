Ext.define("GatotKacaErp.module.HumanResources.view.grids.Family",{extend:"Ext.grid.Panel",alias:"widget.gridfamily",store:"GatotKacaErp.module.HumanResources.store.Family",id:"gridfamily",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Families List",border:true,columns:[{xtype:"rownumberer",width:"5%"},{text:"Status",dataIndex:"family_level",width:"17%",renderer:function(b,c,a){switch(b){case 1:b="PARENT";break;case 2:b="SPOUSE";break;case 3:b="SIBLING";break;case 4:b="CHILD";break}return b}},{text:"First Name",dataIndex:"family_fname",width:"27%"},{text:"Last Name",dataIndex:"family_lname",width:"27%"},{text:"BOD",dataIndex:"family_born",xtype:"datecolumn",format:"d-m-Y",width:"11%"},{text:"Education",dataIndex:"family_eduname",width:"11%"}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}]});