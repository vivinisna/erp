Ext.define("Ext.chart.Mask",{requires:["Ext.chart.MaskLayer"],constructor:function(a){var b=this;b.addEvents("select");if(a){Ext.apply(b,a)}if(b.enableMask){b.on("afterrender",function(){var c=new Ext.chart.MaskLayer({renderTo:b.el,hidden:true});c.el.on({mousemove:function(d){b.onMouseMove(d)},mouseup:function(d){b.onMouseUp(d)}});c.initDraggable();b.maskType=b.mask;b.mask=c;b.maskSprite=b.surface.add({type:"path",path:["M",0,0],zIndex:1001,opacity:0.6,hidden:true,stroke:"#00f",cursor:"crosshair"})},b,{single:true})}},onMouseUp:function(c){var a=this,d=a.bbox||a.chartBBox,b;a.maskMouseDown=false;a.mouseDown=false;if(a.mouseMoved){a.handleMouseEvent(c);a.mouseMoved=false;b=a.maskSelection;a.fireEvent("select",a,{x:b.x-d.x,y:b.y-d.y,width:b.width,height:b.height})}},onMouseDown:function(a){this.handleMouseEvent(a)},onMouseMove:function(a){this.handleMouseEvent(a)},handleMouseEvent:function(d){var g=this,r=g.maskType,n=g.bbox||g.chartBBox,k=n.x,i=n.y,j=Math,c=j.floor,q=j.abs,b=j.min,h=j.max,m=c(i+n.height),a=c(k+n.width),o=d.getPageX()-g.el.getX(),l=d.getPageY()-g.el.getY(),f=g.maskMouseDown,p;o=h(o,k);l=h(l,i);o=b(o,a);l=b(l,m);if(d.type==="mousedown"){g.mouseDown=true;g.mouseMoved=false;g.maskMouseDown={x:o,y:l}}else{g.mouseMoved=g.mouseDown;if(f&&g.mouseDown){if(r=="horizontal"){l=i;f.y=m}else{if(r=="vertical"){o=k;f.x=a}}a=f.x-o;m=f.y-l;p=["M",o,l,"l",a,0,0,m,-a,0,"z"];g.maskSelection={x:(a>0?o:o+a)+g.el.getX(),y:(m>0?l:l+m)+g.el.getY(),width:q(a),height:q(m)};g.mask.updateBox(g.maskSelection);g.mask.show();g.maskSprite.setAttributes({hidden:true},true)}else{if(r=="horizontal"){p=["M",o,i,"L",o,m]}else{if(r=="vertical"){p=["M",k,l,"L",a,l]}else{p=["M",o,i,"L",o,m,"M",k,l,"L",a,l]}}g.maskSprite.setAttributes({path:p,"stroke-width":r===true?1:1,hidden:false},true)}}},onMouseLeave:function(b){var a=this;a.mouseMoved=false;a.mouseDown=false;a.maskMouseDown=false;a.mask.hide();a.maskSprite.hide(true)}});