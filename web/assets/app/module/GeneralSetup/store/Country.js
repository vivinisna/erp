Ext.define("GatotKacaErp.module.GeneralSetup.store.Country",{extend:"GatotKacaErp.store.Base",model:"GatotKacaErp.model.Country",primary:"country_id",initial:"country_name",proxy:{type:"ajax",api:{read:BASE_URL+"country/getlist",destroy:BASE_URL+"country/delete"},actionMethods:{read:"POST"},extraParams:{status:"all"},reader:{type:"json",root:"data",successProperty:"success",totalProperty:"total"},writer:{type:"json",writeAllFields:true,root:"data",encode:true}}});