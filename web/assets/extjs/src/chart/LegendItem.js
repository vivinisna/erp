Ext.define("Ext.chart.LegendItem",{extend:"Ext.draw.CompositeSprite",requires:["Ext.chart.Shape"],x:0,y:0,zIndex:500,boldRe:/bold\s\d{1,}.*/i,constructor:function(a){this.callParent(arguments);this.createLegend(a)},createLegend:function(r){var s=this,h=r.yFieldIndex,k=s.series,a=k.type,l=s.yFieldIndex,d=s.legend,o=s.surface,p=d.x+s.x,m=d.y+s.y,c,j=s.zIndex,b,i,q,e,n=false,g=Ext.apply(k.seriesStyle,k.style);function f(t){var u=k[t];return(Ext.isArray(u)?u[l]:u)}i=s.add("label",o.add({type:"text",x:20,y:0,zIndex:(j||0)+2,fill:d.labelColor,font:d.labelFont,text:f("title")||f("yField"),style:{cursor:"pointer"}}));if(a==="line"||a==="scatter"){if(a==="line"){s.add("line",o.add({type:"path",path:"M0.5,0.5L16.5,0.5",zIndex:(j||0)+2,"stroke-width":k.lineWidth,"stroke-linejoin":"round","stroke-dasharray":k.dash,stroke:g.stroke||k.getLegendColor(h)||"#000",style:{cursor:"pointer"}}))}if(k.showMarkers||a==="scatter"){b=Ext.apply(k.markerStyle,k.markerConfig||{},{fill:k.getLegendColor(h)});s.add("marker",Ext.chart.Shape[b.type](o,{fill:b.fill,x:8.5,y:0.5,zIndex:(j||0)+2,radius:b.radius||b.size,style:{cursor:"pointer"}}))}}else{s.add("box",o.add({type:"rect",zIndex:(j||0)+2,x:0,y:0,width:12,height:12,fill:k.getLegendColor(h),style:{cursor:"pointer"}}))}s.setAttributes({hidden:false},true);c=s.getBBox();q=s.add("mask",o.add({type:"rect",x:c.x,y:c.y,width:c.width||20,height:c.height||20,zIndex:(j||0)+1,fill:s.legend.boxFill,style:{cursor:"pointer"}}));s.on("mouseover",function(){i.setStyle({"font-weight":"bold"});q.setStyle({cursor:"pointer"});k._index=h;k.highlightItem()},s);s.on("mouseout",function(){i.setStyle({"font-weight":d.labelFont&&s.boldRe.test(d.labelFont)?"bold":"normal"});k._index=h;k.unHighlightItem()},s);if(!k.visibleInLegend(h)){n=true;i.setAttributes({opacity:0.5},true)}s.on("mousedown",function(){if(!n){k.hideAll(h);i.setAttributes({opacity:0.5},true)}else{k.showAll(h);i.setAttributes({opacity:1},true)}n=!n;s.legend.chart.redraw()},s);s.updatePosition({x:0,y:0})},updatePosition:function(c){var f=this,a=f.items,e=a.length,b=0,d;if(!c){c=f.legend}for(;b<e;b++){d=a[b];switch(d.type){case"text":d.setAttributes({x:20+c.x+f.x,y:c.y+f.y},true);break;case"rect":d.setAttributes({translate:{x:c.x+f.x,y:c.y+f.y-6}},true);break;default:d.setAttributes({translate:{x:c.x+f.x,y:c.y+f.y}},true)}}}});