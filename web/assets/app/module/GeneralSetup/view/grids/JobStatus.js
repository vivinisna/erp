Ext.define("GatotKacaErp.module.GeneralSetup.view.grids.JobStatus",{extend:"Ext.grid.Panel",store:"GatotKacaErp.module.GeneralSetup.store.JobStatus",requires:["Ext.ux.CheckColumn"],alias:"widget.gridjobstatus",id:"gridjobstatus",layout:{type:"fit"},bodyStyle:"background : transparent",title:"Job Level List",border:true,columns:[{xtype:"rownumberer",width:"11%"},{text:"Name",dataIndex:"jobstatus_name",width:"50%"},{text:"Permanent?",dataIndex:"jobstatus_ispermanent",width:"17%",xtype:"checkcolumn",processEvent:function(){return false}},{text:"Active?",dataIndex:"jobstatus_status",width:"17%",xtype:"checkcolumn",processEvent:function(){return false}}],tbar:[{fieldLabel:"Search",xtype:"textfield",enableKeyEvents:true,labelWidth:55,width:"100%",action:"search"}],bbar:["->",{text:"Refresh",xtype:"button",iconCls:"icon-arrow_refresh",action:"refresh"}]});