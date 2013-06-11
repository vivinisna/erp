Ext.define("Ext.Layer",{extend:"Ext.Element",uses:["Ext.Shadow"],statics:{shims:[]},isLayer:true,constructor:function(b,a){b=b||{};var c=this,d=Ext.DomHelper,f=b.parentEl,e=f?Ext.getDom(f):document.body,g=b.hideMode;if(a){c.dom=Ext.getDom(a)}if(!c.dom){c.dom=d.append(e,b.dh||{tag:"div",cls:Ext.baseCSSPrefix+"layer"})}else{c.addCls(Ext.baseCSSPrefix+"layer");if(!c.dom.parentNode){e.appendChild(c.dom)}}if(b.id){c.id=c.dom.id=b.id}else{c.id=Ext.id(c.dom)}Ext.Element.addToCache(c);if(b.cls){c.addCls(b.cls)}c.constrain=b.constrain!==false;if(g){c.setVisibilityMode(Ext.Element[g.toUpperCase()]);if(c.visibilityMode==Ext.Element.ASCLASS){c.visibilityCls=b.visibilityCls}}else{if(b.useDisplay){c.setVisibilityMode(Ext.Element.DISPLAY)}else{c.setVisibilityMode(Ext.Element.VISIBILITY)}}if(b.shadow){c.shadowOffset=b.shadowOffset||4;c.shadow=new Ext.Shadow({offset:c.shadowOffset,mode:b.shadow});c.disableShadow()}else{c.shadowOffset=0}c.useShim=b.shim!==false&&Ext.useShims;if(b.hidden===true){c.hide()}else{c.show()}},getZIndex:function(){return parseInt((this.getShim()||this).getStyle("z-index"),10)},getShim:function(){var b=this,c,a;if(!b.useShim){return null}if(!b.shim){c=b.self.shims.shift();if(!c){c=b.createShim();c.enableDisplayMode("block");c.hide()}a=b.dom.parentNode;if(c.dom.parentNode!=a){a.insertBefore(c.dom,b.dom)}b.shim=c}return b.shim},hideShim:function(){var a=this;if(a.shim){a.shim.setDisplayed(false);a.self.shims.push(a.shim);delete a.shim}},disableShadow:function(){var a=this;if(a.shadow&&!a.shadowDisabled){a.shadowDisabled=true;a.shadow.hide();a.lastShadowOffset=a.shadowOffset;a.shadowOffset=0}},enableShadow:function(a){var b=this;if(b.shadow&&b.shadowDisabled){b.shadowDisabled=false;b.shadowOffset=b.lastShadowOffset;delete b.lastShadowOffset;if(a){b.sync(true)}}},sync:function(b){var i=this,m=i.shadow,g,e,a,d,c,n,k,f,j;if(!i.updating&&i.isVisible()&&(m||i.useShim)){d=i.getShim();c=i.getLocalX();n=i.getLocalY();k=i.dom.offsetWidth;f=i.dom.offsetHeight;if(m&&!i.shadowDisabled){if(b&&!m.isVisible()){m.show(i)}else{m.realign(c,n,k,f)}if(d){j=d.getStyle("z-index");if(j>i.zindex){i.shim.setStyle("z-index",i.zindex-2)}d.show();if(m.isVisible()){g=m.el.getXY();e=d.dom.style;a=m.el.getSize();if(Ext.supports.CSS3BoxShadow){a.height+=6;a.width+=4;g[0]-=2;g[1]-=4}e.left=(g[0])+"px";e.top=(g[1])+"px";e.width=(a.width)+"px";e.height=(a.height)+"px"}else{d.setSize(k,f);d.setLeftTop(c,n)}}}else{if(d){j=d.getStyle("z-index");if(j>i.zindex){i.shim.setStyle("z-index",i.zindex-2)}d.show();d.setSize(k,f);d.setLeftTop(c,n)}}}return i},remove:function(){this.hideUnders();this.callParent()},beginUpdate:function(){this.updating=true},endUpdate:function(){this.updating=false;this.sync(true)},hideUnders:function(){if(this.shadow){this.shadow.hide()}this.hideShim()},constrainXY:function(){if(this.constrain){var f=Ext.Element.getViewWidth(),b=Ext.Element.getViewHeight(),k=Ext.getDoc().getScroll(),j=this.getXY(),g=j[0],e=j[1],a=this.shadowOffset,i=this.dom.offsetWidth+a,c=this.dom.offsetHeight+a,d=false;if((g+i)>f+k.left){g=f-i-a;d=true}if((e+c)>b+k.top){e=b-c-a;d=true}if(g<k.left){g=k.left;d=true}if(e<k.top){e=k.top;d=true}if(d){Ext.Layer.superclass.setXY.call(this,[g,e]);this.sync()}}return this},getConstrainOffset:function(){return this.shadowOffset},setVisible:function(e,b,d,g,f){var c=this,a;a=function(){if(e){c.sync(true)}if(g){g()}};if(!e){c.hideUnders(true)}c.callParent([e,b,d,g,f]);if(!b){a()}return c},beforeFx:function(){this.beforeAction();return this.callParent(arguments)},afterFx:function(){this.callParent(arguments);this.sync(this.isVisible())},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide()}},setLeft:function(a){this.callParent(arguments);return this.sync()},setTop:function(a){this.callParent(arguments);return this.sync()},setLeftTop:function(b,a){this.callParent(arguments);return this.sync()},setXY:function(d,a,c,f,e){var b=this;f=b.createCB(f);b.fixDisplay();b.beforeAction();b.callParent([d,a,c,f,e]);if(!a){f()}return b},createCB:function(c){var a=this,b=a.shadow&&a.shadow.isVisible();return function(){a.constrainXY();a.sync(b);if(c){c()}}},setX:function(a,b,c,e,d){this.setXY([a,this.getY()],b,c,e,d);return this},setY:function(e,a,b,d,c){this.setXY([this.getX(),e],a,b,d,c);return this},setSize:function(a,c,b,e,g,f){var d=this;g=d.createCB(g);d.beforeAction();d.callParent([a,c,b,e,g,f]);if(!b){g()}return d},setWidth:function(a,b,d,f,e){var c=this;f=c.createCB(f);c.beforeAction();c.callParent([a,b,d,f,e]);if(!b){f()}return c},setHeight:function(b,a,d,f,e){var c=this;f=c.createCB(f);c.beforeAction();c.callParent([b,a,d,f,e]);if(!a){f()}return c},setBounds:function(g,f,a,i,b,c,h,d){var e=this;h=e.createCB(h);e.beforeAction();if(!b){Ext.Layer.superclass.setXY.call(e,[g,f]);Ext.Layer.superclass.setSize.call(e,a,i);h()}else{e.callParent([g,f,a,i,b,c,h,d])}return e},setZIndex:function(a){var b=this;b.zindex=a;if(b.getShim()){b.shim.setStyle("z-index",a++)}if(b.shadow){b.shadow.setZIndex(a++)}return b.setStyle("z-index",a)},onOpacitySet:function(a){var b=this.shadow;if(b){b.setOpacity(a)}}});