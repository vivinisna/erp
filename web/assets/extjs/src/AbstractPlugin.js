Ext.define("Ext.AbstractPlugin",{disabled:false,constructor:function(a){this.initialConfig=a;Ext.apply(this,a)},clone:function(){return new this.self(this.initialConfig)},getCmp:function(){return this.cmp},init:Ext.emptyFn,destroy:Ext.emptyFn,enable:function(){this.disabled=false},disable:function(){this.disabled=true}});