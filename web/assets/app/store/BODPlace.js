Ext.define("GatotKacaErp.store.BODPlace",{extend:"Ext.data.Store",model:"GatotKacaErp.model.District",autoLoad:false,autoSync:false,proxy:{type:"ajax",api:{read:BASE_URL+"district/getall"},actionMethods:{read:"POST"},reader:{type:"json",root:"data",successProperty:"success"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});