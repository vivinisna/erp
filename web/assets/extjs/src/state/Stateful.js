Ext.define("Ext.state.Stateful",{mixins:{observable:"Ext.util.Observable"},requires:["Ext.state.Manager"],stateful:false,saveDelay:100,constructor:function(a){var b=this;a=a||{};if(a.stateful!==undefined){b.stateful=a.stateful}if(a.saveDelay!==undefined){b.saveDelay=a.saveDelay}b.stateId=b.stateId||a.stateId;if(!b.stateEvents){b.stateEvents=[]}if(a.stateEvents){b.stateEvents.concat(a.stateEvents)}this.addEvents("beforestaterestore","staterestore","beforestatesave","statesave");b.mixins.observable.constructor.call(b);if(b.stateful!==false){b.addStateEvents(b.stateEvents);b.initState()}},addStateEvents:function(c){var e=this,b,d,a;if(e.stateful&&e.getStateId()){if(typeof c=="string"){c=Array.prototype.slice.call(arguments,0)}a=e.stateEventsByName||(e.stateEventsByName={});for(b=c.length;b--;){d=c[b];if(!a[d]){a[d]=1;e.on(d,e.onStateChange,e)}}}},onStateChange:function(){var c=this,a=c.saveDelay,d,b;if(!c.stateful){return}if(a){if(!c.stateTask){d=Ext.state.Stateful;b=d.runner||(d.runner=new Ext.util.TaskRunner());c.stateTask=b.newTask({run:c.saveState,scope:c,interval:a,repeat:1})}c.stateTask.start()}else{c.saveState()}},saveState:function(){var b=this,d=b.stateful&&b.getStateId(),a=b.hasListeners,c;if(d){c=b.getState()||{};if(!a.beforestatesave||b.fireEvent("beforestatesave",b,c)!==false){Ext.state.Manager.set(d,c);if(a.statesave){b.fireEvent("statesave",b,c)}}}},getState:function(){return null},applyState:function(a){if(a){Ext.apply(this,a)}},getStateId:function(){var a=this;return a.stateId||(a.autoGenId?null:a.id)},initState:function(){var b=this,d=b.stateful&&b.getStateId(),a=b.hasListeners,c;if(d){c=Ext.state.Manager.get(d);if(c){c=Ext.apply({},c);if(!a.beforestaterestore||b.fireEvent("beforestaterestore",b,c)!==false){b.applyState(c);if(a.staterestore){b.fireEvent("staterestore",b,c)}}}}},savePropToState:function(f,e,d){var b=this,c=b[f],a=b.initialConfig;if(b.hasOwnProperty(f)){if(!a||a[f]!==c){if(e){e[d||f]=c}return true}}return false},savePropsToState:function(e,c){var b=this,a,d;if(typeof e=="string"){b.savePropToState(e,c)}else{for(a=0,d=e.length;a<d;++a){b.savePropToState(e[a],c)}}return c},destroy:function(){var b=this,a=b.stateTask;if(a){a.destroy();b.stateTask=null}b.clearListeners()}});