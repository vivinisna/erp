Ext.define("Ext.dom.Element_anim",{override:"Ext.dom.Element",animate:function(b){var d=this,c,e,a=d.dom.id||Ext.id(d.dom);if(!Ext.fx.Manager.hasFxBlock(a)){if(b.listeners){c=b.listeners;delete b.listeners}if(b.internalListeners){b.listeners=b.internalListeners;delete b.internalListeners}e=new Ext.fx.Anim(d.anim(b));if(c){e.on(c)}Ext.fx.Manager.queueFx(e)}return d},anim:function(a){if(!Ext.isObject(a)){return(a)?{}:false}var b=this,c=a.duration||Ext.fx.Anim.prototype.duration,e=a.easing||"ease",d;if(a.stopAnimation){b.stopAnimation()}Ext.applyIf(a,Ext.fx.Manager.getFxDefaults(b.id));Ext.fx.Manager.setFxDefaults(b.id,{delay:0});d={target:b.dom,remove:a.remove,alternate:a.alternate||false,duration:c,easing:e,callback:a.callback,listeners:a.listeners,iterations:a.iterations||1,scope:a.scope,block:a.block,concurrent:a.concurrent,delay:a.delay||0,paused:true,keyframes:a.keyframes,from:a.from||{},to:Ext.apply({},a)};Ext.apply(d.to,a.to);delete d.to.to;delete d.to.from;delete d.to.remove;delete d.to.alternate;delete d.to.keyframes;delete d.to.iterations;delete d.to.listeners;delete d.to.target;delete d.to.paused;delete d.to.callback;delete d.to.scope;delete d.to.duration;delete d.to.easing;delete d.to.concurrent;delete d.to.block;delete d.to.stopAnimation;delete d.to.delay;return d},slideIn:function(d,c,e){var g=this,b=g.dom,j=b.style,i,a,f,h;d=d||"t";c=c||{};i=function(){var o=this,n=c.listeners,m=Ext.fly(b,"_anim"),p,k,q,l;if(!e){m.fixDisplay()}p=m.getBox();if((d=="t"||d=="b")&&p.height===0){p.height=b.scrollHeight}else{if((d=="l"||d=="r")&&p.width===0){p.width=b.scrollWidth}}k=m.getStyles("width","height","left","right","top","bottom","position","z-index",true);m.setSize(p.width,p.height);if(c.preserveScroll){f=m.cacheScrollValues()}l=m.wrap({id:Ext.id()+"-anim-wrap-for-"+m.dom.id,style:{visibility:e?"visible":"hidden"}});h=l.dom.parentNode;l.setPositioning(m.getPositioning(true));if(l.isStyle("position","static")){l.position("relative")}m.clearPositioning("auto");l.clip();if(f){f()}m.setStyle({visibility:"",position:"absolute"});if(e){l.setSize(p.width,p.height)}switch(d){case"t":q={from:{width:p.width+"px",height:"0px"},to:{width:p.width+"px",height:p.height+"px"}};j.bottom="0px";break;case"l":q={from:{width:"0px",height:p.height+"px"},to:{width:p.width+"px",height:p.height+"px"}};g.anchorAnimX(d);break;case"r":q={from:{x:p.x+p.width,width:"0px",height:p.height+"px"},to:{x:p.x,width:p.width+"px",height:p.height+"px"}};g.anchorAnimX(d);break;case"b":q={from:{y:p.y+p.height,width:p.width+"px",height:"0px"},to:{y:p.y,width:p.width+"px",height:p.height+"px"}};break;case"tl":q={from:{x:p.x,y:p.y,width:"0px",height:"0px"},to:{width:p.width+"px",height:p.height+"px"}};j.bottom="0px";g.anchorAnimX("l");break;case"bl":q={from:{y:p.y+p.height,width:"0px",height:"0px"},to:{y:p.y,width:p.width+"px",height:p.height+"px"}};g.anchorAnimX("l");break;case"br":q={from:{x:p.x+p.width,y:p.y+p.height,width:"0px",height:"0px"},to:{x:p.x,y:p.y,width:p.width+"px",height:p.height+"px"}};g.anchorAnimX("r");break;case"tr":q={from:{x:p.x+p.width,width:"0px",height:"0px"},to:{x:p.x,width:p.width+"px",height:p.height+"px"}};j.bottom="0px";g.anchorAnimX("r");break}l.show();a=Ext.apply({},c);delete a.listeners;a=new Ext.fx.Anim(Ext.applyIf(a,{target:l,duration:500,easing:"ease-out",from:e?q.to:q.from,to:e?q.from:q.to}));a.on("afteranimate",function(){var r=Ext.fly(b,"_anim");r.setStyle(k);if(e){if(c.useDisplay){r.setDisplayed(false)}else{r.hide()}}if(l.dom){if(l.dom.parentNode){l.dom.parentNode.insertBefore(r.dom,l.dom)}else{h.appendChild(r.dom)}l.remove()}if(f){f()}o.end()});if(n){a.on(n)}};g.animate({duration:c.duration?Math.max(c.duration,500)*2:1000,listeners:{beforeanimate:i}});return g},slideOut:function(a,b){return this.slideIn(a,b,true)},puff:function(e){var d=this,f=d.dom,b,c=d.getBox(),a=d.getStyles("width","height","left","right","top","bottom","position","z-index","font-size","opacity",true);e=Ext.applyIf(e||{},{easing:"ease-out",duration:500,useDisplay:false});b=function(){var g=Ext.fly(f,"_anim");g.clearOpacity();g.show();this.to={width:c.width*2,height:c.height*2,x:c.x-(c.width/2),y:c.y-(c.height/2),opacity:0,fontSize:"200%"};this.on("afteranimate",function(){var h=Ext.fly(f,"_anim");if(h){if(e.useDisplay){h.setDisplayed(false)}else{h.hide()}h.setStyle(a);Ext.callback(e.callback,e.scope)}})};d.animate({duration:e.duration,easing:e.easing,listeners:{beforeanimate:{fn:b}}});return d},switchOff:function(c){var b=this,d=b.dom,a;c=Ext.applyIf(c||{},{easing:"ease-in",duration:500,remove:false,useDisplay:false});a=function(){var i=Ext.fly(d,"_anim"),h=this,g=i.getSize(),j=i.getXY(),f,e;i.clearOpacity();i.clip();e=i.getPositioning();f=new Ext.fx.Animator({target:d,duration:c.duration,easing:c.easing,keyframes:{33:{opacity:0.3},66:{height:1,y:j[1]+g.height/2},100:{width:1,x:j[0]+g.width/2}}});f.on("afteranimate",function(){var k=Ext.fly(d,"_anim");if(c.useDisplay){k.setDisplayed(false)}else{k.hide()}k.clearOpacity();k.setPositioning(e);k.setSize(g);h.end()})};b.animate({duration:(Math.max(c.duration,500)*2),listeners:{beforeanimate:{fn:a}}});return b},frame:function(a,d,e){var c=this,f=c.dom,b;a=a||"#C3DAF9";d=d||1;e=e||{};b=function(){var j=Ext.fly(f,"_anim"),i=this,k,h,g;j.show();k=j.getBox();h=Ext.getBody().createChild({id:j.dom.id+"-anim-proxy",style:{position:"absolute","pointer-events":"none","z-index":35000,border:"0px solid "+a}});g=new Ext.fx.Anim({target:h,duration:e.duration||1000,iterations:d,from:{top:k.y,left:k.x,borderWidth:0,opacity:1,height:k.height,width:k.width},to:{top:k.y-20,left:k.x-20,borderWidth:10,opacity:0,height:k.height+40,width:k.width+40}});g.on("afteranimate",function(){h.remove();i.end()})};c.animate({duration:(Math.max(e.duration,500)*2)||2000,listeners:{beforeanimate:{fn:b}}});return c},ghost:function(a,d){var c=this,e=c.dom,b;a=a||"b";b=function(){var i=Ext.fly(e,"_anim"),h=i.getWidth(),g=i.getHeight(),j=i.getXY(),f=i.getPositioning(),k={opacity:0};switch(a){case"t":k.y=j[1]-g;break;case"l":k.x=j[0]-h;break;case"r":k.x=j[0]+h;break;case"b":k.y=j[1]+g;break;case"tl":k.x=j[0]-h;k.y=j[1]-g;break;case"bl":k.x=j[0]-h;k.y=j[1]+g;break;case"br":k.x=j[0]+h;k.y=j[1]+g;break;case"tr":k.x=j[0]+h;k.y=j[1]-g;break}this.to=k;this.on("afteranimate",function(){var l=Ext.fly(e,"_anim");if(l){l.hide();l.clearOpacity();l.setPositioning(f)}})};c.animate(Ext.applyIf(d||{},{duration:500,easing:"ease-out",listeners:{beforeanimate:b}}));return c},highlight:function(d,b){var h=this,e=h.dom,j={},g,k,f,c,a,i;if(e.tagName.match(h.tableTagRe)){return h.select("div").highlight(d,b)}b=b||{};c=b.listeners||{};f=b.attr||"backgroundColor";j[f]=d||"ffff9c";if(!b.to){k={};k[f]=b.endColor||h.getColor(f,"ffffff","")}else{k=b.to}b.listeners=Ext.apply(Ext.apply({},c),{beforeanimate:function(){g=e.style[f];var l=Ext.fly(e,"_anim");l.clearOpacity();l.show();a=c.beforeanimate;if(a){i=a.fn||a;return i.apply(a.scope||c.scope||window,arguments)}},afteranimate:function(){if(e){e.style[f]=g}a=c.afteranimate;if(a){i=a.fn||a;i.apply(a.scope||c.scope||window,arguments)}}});h.animate(Ext.apply({},b,{duration:1000,easing:"ease-in",from:j,to:k}));return h},pause:function(a){var b=this;Ext.fx.Manager.setFxDefaults(b.id,{delay:a});return b},fadeIn:function(c){var a=this,b=a.dom;a.animate(Ext.apply({},c,{opacity:1,internalListeners:{beforeanimate:function(e){var d=Ext.fly(b,"_anim");if(d.isStyle("display","none")){d.setDisplayed("")}else{d.show()}}}}));return this},fadeOut:function(c){var a=this,b=a.dom;c=Ext.apply({opacity:0,internalListeners:{afteranimate:function(e){if(b&&e.to.opacity===0){var d=Ext.fly(b,"_anim");if(c.useDisplay){d.setDisplayed(false)}else{d.hide()}}}}},c);a.animate(c);return a},scale:function(a,b,c){this.animate(Ext.apply({},c,{width:a,height:b}));return this},shift:function(a){this.animate(a);return this},anchorAnimX:function(a){var b=(a==="l")?"right":"left";this.dom.style[b]="0px"}});