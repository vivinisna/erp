Ext.define("GatotKacaErp.store.JobStatus",{extend:"Ext.data.Store",model:"GatotKacaErp.model.JobStatus",autoLoad:false,autoSync:false,proxy:{type:"ajax",api:{read:BASE_URL+"jobstatus/getlist"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});