Ext.define("GatotKacaErp.module.GeneralSetup.store.JobTitle",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.model.JobTitle",primary:"jobtitle_id",initial:"jobtitle_name",proxy:{type:"ajax",api:{read:BASE_URL+"jobtitle/getlist",destroy:BASE_URL+"jobtitle/delete"},actionMethods:{read:"POST"},extraParams:{status:"all"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});