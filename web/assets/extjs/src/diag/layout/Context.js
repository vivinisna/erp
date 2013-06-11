Ext.define("Ext.diag.layout.Context",{override:"Ext.layout.Context",requires:["Ext.perf.Monitor"],logOn:{0:0},cancelComponent:function(a){if(this.logOn.cancelComponent){Ext.log("cancelCmp: ",a.id)}this.callParent(arguments)},cancelLayout:function(a){if(this.logOn.cancelLayout){Ext.log("cancelLayout: ",this.getLayoutName(a))}this.callParent(arguments)},callLayout:function(c,b){var a=this.accumByType[c.type],d=a&&a.enter();this.callParent(arguments);if(a){d.leave()}},checkRemainingLayouts:function(){var d=this,c=0,a,b;for(a in d.layouts){b=d.layouts[a];if(d.layouts.hasOwnProperty(a)&&b.running){++c}}if(d.remainingLayouts!=c){Ext.Error.raise({msg:"Bookkeeping error me.remainingLayouts"})}},flush:function(){if(this.logOn.flush){var a=this.flushQueue;Ext.log("--- Flush ",a&&a.getCount())}return this.callParent(arguments)},flushInvalidates:function(){if(this.logOn.flushInvalidate){Ext.log(">> flushInvalidates")}var a=this.callParent(arguments);if(this.logOn.flushInvalidate){Ext.log("<< flushInvalidates")}return a},getCmp:function(b){var a=this.callParent(arguments);if(!a.wrapsComponent){Ext.Error.raise({msg:b.id+" is not a component"})}return a},getEl:function(b,c){var a=this.callParent(arguments);if(a&&a.wrapsComponent){Ext.Error.raise({msg:b.id+"/"+c.id+" is a component (expected element)"})}return a},getLayoutName:function(a){return a.owner.id+"<"+a.type+">"},layoutDone:function(c){var b=this,a=b.getLayoutName(c);if(b.logOn.layoutDone){Ext.log("layoutDone: ",a," ( ",b.remainingLayouts," running)")}if(!c.running){Ext.Error.raise({msg:a+" is already done"})}if(!b.remainingLayouts){Ext.Error.raise({msg:a+" finished but no layouts are running"})}b.callParent(arguments)},layoutTreeHasFailures:function(d,a){var c=this;function e(h){var f=!h.done,g,i;if(h.done){for(g in c.layouts){if(c.layouts.hasOwnProperty(g)){i=c.layouts[g];if(i.owner.ownerLayout===h){if(e(i)){f=true}}}}}return f}if(e(d)){return true}function b(g){var f,h;a[g.id]=1;for(f in c.layouts){if(c.layouts.hasOwnProperty(f)){h=c.layouts[f];if(h.owner.ownerLayout===g){b(h)}}}}b(d);return false},queueLayout:function(a){if(a.done||a.blockCount||a.pending){Ext.Error.raise({msg:this.getLayoutName(a)+" should not be queued for layout"})}if(this.logOn.queueLayout){Ext.log("Queue ",this.getLayoutName(a))}return this.callParent(arguments)},reportLayoutResult:function(h,p){var k=this,a=h.owner,d=k.getCmp(a),f=[],g=[],n,m,e,b,l,o,j,c;p[h.id]=1;for(n in h.blockedBy){if(h.blockedBy.hasOwnProperty(n)){f.push(h.blockedBy[n])}}f.sort();for(n in k.triggersByLayoutId[h.id]){if(k.triggersByLayoutId[h.id].hasOwnProperty(n)){m=k.triggersByLayoutId[h.id][n];g.push({name:n,info:m})}}g.sort(function(q,i){return q.name<i.name?-1:(i.name<q.name?1:0)});Ext.log({indent:1},(h.done?"++":"--"),k.getLayoutName(h),(d.isBoxParent?" [isBoxParent]":""),(d.boxChildren?" - boxChildren: "+d.state.boxesMeasured+"/"+d.boxChildren.length:""),d.boxParent?(" - boxParent: "+d.boxParent.id):""," - size: ",d.widthModel.name,"/",d.heightModel.name);if(!h.done||k.reportOnSuccess){if(f.length){++Ext.log.indent;Ext.log({indent:1},"blockedBy:  count=",h.blockCount);b=f.length;for(e=0;e<b;e++){Ext.log(f[e])}Ext.log.indent-=2}if(g.length){++Ext.log.indent;Ext.log({indent:1},"triggeredBy: count="+h.triggerCount);b=g.length;for(e=0;e<b;e++){c=m.info||m;o=c.item;j=(o.setBy&&o.setBy[c.name])||"?";m=g[e];Ext.log(m.name," (",o.props[c.name],") dirty: ",(o.dirty?!!o.dirty[c.name]:false),", setBy: ",j)}Ext.log.indent-=2}}for(n in k.layouts){if(k.layouts.hasOwnProperty(n)){l=k.layouts[n];if(!l.done&&l.owner.ownerLayout===h){k.reportLayoutResult(l,p)}}}for(n in k.layouts){if(k.layouts.hasOwnProperty(n)){l=k.layouts[n];if(l.done&&l.owner.ownerLayout===h){k.reportLayoutResult(l,p)}}}--Ext.log.indent},resetLayout:function(e){var d=this,c=e.type,b=d.getLayoutName(e),a=d.accumByType[c],f;if(d.logOn.resetLayout){Ext.log("resetLayout: ",b," ( ",d.remainingLayouts," running)")}if(!d.state){if(!a&&d.profileLayoutsByType){d.accumByType[c]=a=Ext.Perf.get("layout_"+e.type)}d.numByType[c]=(d.numByType[c]||0)+1}f=a&&a.enter();d.callParent(arguments);if(a){f.leave()}d.checkRemainingLayouts()},round:function(a){return Math.round(a*1000)/1000},run:function(){var m=this,h,d,q,p,f,g,j,b,c,r,l,a,o,k,e;m.accumByType={};m.calcsByType={};m.numByType={};m.timesByType={};m.triggersByLayoutId={};Ext.log.indentSize=3;Ext.log("==================== LAYOUT ====================");d=Ext.perf.getTimestamp();h=m.callParent(arguments);d=Ext.perf.getTimestamp()-d;if(m.logOn.boxParent&&m.boxParents){for(q in m.boxParents){if(m.boxParents.hasOwnProperty(q)){j=m.boxParents[q];b=j.boxChildren;c=b.length;Ext.log("boxParent: ",j.id);for(f=0;f<c;++f){Ext.log(" --> ",b[f].id)}}}}if(h){Ext.log("----------------- SUCCESS -----------------")}else{Ext.log({level:"error"},"----------------- FAILURE -----------------")}for(q in m.layouts){if(m.layouts.hasOwnProperty(q)){g=m.layouts[q];if(g.running){Ext.log.error("Layout left running: ",m.getLayoutName(g))}if(g.ownerContext){Ext.log.error("Layout left connected: ",m.getLayoutName(g))}}}if(!h||m.reportOnSuccess){r={};l=0;for(q in m.layouts){if(m.layouts.hasOwnProperty(q)){g=m.layouts[q];if(m.items[g.owner.el.id].isTopLevel){if(m.reportOnSuccess||m.layoutTreeHasFailures(g,r)){m.reportLayoutResult(g,r)}}}}for(q in m.layouts){if(m.layouts.hasOwnProperty(q)){g=m.layouts[q];if(!r[g.id]){if(!l){Ext.log("----- Unreported!! -----")}++l;m.reportLayoutResult(g,r)}}}}Ext.log("Cycles: ",m.cycleCount,", Flushes: ",m.flushCount,", Calculates: ",m.calcCount," in ",m.round(d)," msec");Ext.log("Calculates by type:");a=[];for(q in m.numByType){if(m.numByType.hasOwnProperty(q)){o=m.numByType[q];a.push({type:q,total:o,calcs:m.calcsByType[q],multiple:Math.round(m.calcsByType[q]/o*10)/10,calcTime:m.round(m.timesByType[q]),avgCalcTime:m.round(m.timesByType[q]/m.calcsByType[q])})}}a.sort(function(n,i){return i.calcTime-n.calcTime});k=a.length;for(f=0;f<k;f++){e=a[f];Ext.log(e.type,": ",e.total," in ",e.calcs," tries (",e.multiple,"x) at ",e.calcTime," msec (avg ",e.avgCalcTime," msec)")}return h},runCycle:function(){if(this.logOn.runCycle){Ext.log(">>> Cycle ",this.cycleCount," (queue length: ",this.layoutQueue.length,")")}return this.callParent(arguments)},runLayout:function(e){var d=this,c=e.type,a=d.accumByType[c],g,b,f;if(d.logOn.calculate){Ext.log("-- calculate ",this.getLayoutName(e))}g=a&&a.enter();f=Ext.perf.getTimestamp();b=d.callParent(arguments);f=Ext.perf.getTimestamp()-f;if(a){g.leave()}d.calcsByType[c]=(d.calcsByType[c]||0)+1;d.timesByType[c]=(d.timesByType[c]||0)+f;return b}});