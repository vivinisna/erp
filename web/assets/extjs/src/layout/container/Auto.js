Ext.define("Ext.layout.container.Auto",{alias:["layout.auto","layout.autocontainer"],extend:"Ext.layout.container.Container",type:"autocontainer",childEls:["outerCt","innerCt","clearEl"],reserveScrollbar:false,managePadding:true,manageOverflow:false,lastOverflowAdjust:{width:0,height:0},renderTpl:["{% if (!(Ext.isIEQuirks || Ext.isIE7m)) { %}",'<span id="{ownerId}-outerCt" style="display:table;">','<div id="{ownerId}-innerCt" style="display:table-cell;height:100%;','vertical-align:top;{%this.renderPadding(out, values)%}">',"{%this.renderBody(out,values)%}","</div>","</span>","{% } else if (values.shrinkWrapWidth) { %}",'<table id="{ownerId}-outerCt" style="font-size:1em;">',"<tr>",'<td id="{ownerId}-innerCt" style="vertical-align:top;','{%this.renderPadding(out, values)%}">',"{%this.renderBody(out,values)%}",'<div id="{ownerId}-clearEl" class="',Ext.baseCSSPrefix,'clear"','role="presentation"></div>',"</td>","</tr>","</table>","{% } else { %}",'<div id="{ownerId}-outerCt" style="zoom:1;{%this.renderPadding(out, values)%}">','<div id="{ownerId}-innerCt" style="zoom:1;height:100%;">',"{%this.renderBody(out,values)%}",'<div id="{ownerId}-clearEl" class="',Ext.baseCSSPrefix,'clear"','role="presentation"></div>',"</div>","</div>","{% values.$layout.isShrinkWrapTpl = false %}","{% } %}"],tableTpl:['<table id="{ownerId}-outerCt" style="font-size:1em;">',"<tr>",'<td id="{ownerId}-innerCt" style="vertical-align:top;','{%this.renderPadding(out, values)%}">',"</td>","</tr>","</table>"],isShrinkWrapTpl:true,beginLayout:function(e){var d=this,a,b,c,f;d.callParent(arguments);d.initContextItems(e);if(!d.isShrinkWrapTpl){if(e.widthModel.shrinkWrap){f=true}if(Ext.isStrict&&Ext.isIE7){c=d.getOverflowXStyle(e);if((c==="auto"||c==="scroll")&&e.paddingContext.getPaddingInfo().right){f=true}}if(f){d.insertTableCt(e)}}if(!d.isShrinkWrapTpl&&Ext.isIE7&&Ext.isStrict&&!d.clearElHasPadding){a=e.paddingContext.getPaddingInfo().bottom;b=d.getOverflowYStyle(e);if(a&&(b==="auto"||b==="scroll")){d.clearEl.setStyle("height",a);d.clearElHasPadding=true}}e.state.overflowAdjust=d.lastOverflowAdjust},beginLayoutCycle:function(d){var i=this,b=i.outerCt,h=i.lastOuterCtWidth||"",g=i.lastOuterCtHeight||"",j=i.lastOuterCtTableLayout||"",k,e,f,l,c,a;i.callParent(arguments);f=l=c="";if(!d.widthModel.shrinkWrap&&i.isShrinkWrapTpl){if(Ext.isIE7m&&Ext.isStrict){e=i.getOverflowYStyle(d);if(e==="auto"||e==="scroll"){a=true}}if(!a){f="100%"}k=i.getOverflowXStyle(d);c=(k==="auto"||k==="scroll")?"":"fixed"}if(!d.heightModel.shrinkWrap&&!Ext.supports.PercentageHeightOverflowBug){l="100%"}if((f!==h)||i.hasOuterCtPxWidth){b.setStyle("width",f);i.lastOuterCtWidth=f;i.hasOuterCtPxWidth=false}if(c!==j){b.setStyle("table-layout",c);i.lastOuterCtTableLayout=c}if((l!==g)||i.hasOuterCtPxHeight){b.setStyle("height",l);i.lastOuterCtHeight=l;i.hasOuterCtPxHeight=false}if(i.hasInnerCtPxHeight){i.innerCt.setStyle("height","");i.hasInnerCtPxHeight=false}},calculate:function(c){var a=this,b=c.state,e=a.getContainerSize(c,true),d=b.calculatedItems||(b.calculatedItems=a.calculateItems?a.calculateItems(c,e):true);a.setCtSizeIfNeeded(c,e);if(d&&c.hasDomProp("containerChildrenSizeDone")){a.calculateContentSize(c);if(e.gotAll){if(a.manageOverflow&&!c.state.secondPass&&!a.reserveScrollbar){a.calculateOverflow(c,e)}return}}a.done=false},calculateContentSize:function(f){var e=this,a=((f.widthModel.shrinkWrap?1:0)|(f.heightModel.shrinkWrap?2:0)),c=(a&1)||undefined,g=(a&2)||undefined,d=0,b=f.props;if(c){if(isNaN(b.contentWidth)){++d}else{c=undefined}}if(g){if(isNaN(b.contentHeight)){++d}else{g=undefined}}if(d){if(c&&!f.setContentWidth(e.measureContentWidth(f))){e.done=false}if(g&&!f.setContentHeight(e.measureContentHeight(f))){e.done=false}}},calculateOverflow:function(c){var g=this,b,i,a,f,e,d,h;e=(g.getOverflowXStyle(c)==="auto");d=(g.getOverflowYStyle(c)==="auto");if(e||d){a=Ext.getScrollbarSize();h=c.targetContext.el.dom;f=0;if(h.scrollWidth>h.clientWidth){f|=1}if(h.scrollHeight>h.clientHeight){f|=2}b=(d&&(f&2))?a.width:0;i=(e&&(f&1))?a.height:0;if(b!==g.lastOverflowAdjust.width||i!==g.lastOverflowAdjust.height){g.done=false;c.invalidate({state:{overflowAdjust:{width:b,height:i},overflowState:f,secondPass:true}})}}},completeLayout:function(a){this.lastOverflowAdjust=a.state.overflowAdjust},doRenderPadding:function(b,d){var c=d.$layout,a=d.$layout.owner,e=a[a.contentPaddingProperty];if(c.managePadding&&e){b.push("padding:",Ext.Element.unitizeBox(e))}},finishedLayout:function(b){var a=this.innerCt;this.callParent(arguments);if(Ext.isIEQuirks||Ext.isIE8m){a.repaint()}if(Ext.isOpera){a.setStyle("position","relative");a.dom.scrollWidth;a.setStyle("position","")}},getContainerSize:function(b,c){var a=this.callParent(arguments),d=b.state.overflowAdjust;if(d){a.width-=d.width;a.height-=d.height}return a},getRenderData:function(){var a=this.owner,b=this.callParent();if((Ext.isIEQuirks||Ext.isIE7m)&&((a.shrinkWrap&1)||(a.floating&&!a.width))){b.shrinkWrapWidth=true}return b},getRenderTarget:function(){return this.innerCt},getElementTarget:function(){return this.innerCt},getOverflowXStyle:function(a){return a.overflowXStyle||(a.overflowXStyle=this.owner.scrollFlags.overflowX||a.targetContext.getStyle("overflow-x"))},getOverflowYStyle:function(a){return a.overflowYStyle||(a.overflowYStyle=this.owner.scrollFlags.overflowY||a.targetContext.getStyle("overflow-y"))},initContextItems:function(b){var a=this,c=b.target;b.outerCtContext=b.getEl("outerCt",a);b.innerCtContext=b.getEl("innerCt",a);if(c[c.contentPaddingProperty]!==undefined){b.paddingContext=a.isShrinkWrapTpl?b.innerCtContext:b.outerCtContext}},initLayout:function(){var c=this,b=Ext.getScrollbarSize().width,a=c.owner;c.callParent();if(b&&c.manageOverflow&&!c.hasOwnProperty("lastOverflowAdjust")){if(a.autoScroll||c.reserveScrollbar){c.lastOverflowAdjust={width:b,height:0}}}},insertTableCt:function(b){var g=this,a=g.owner,c=0,e,f,j,d,h;e=Ext.XTemplate.getTpl(this,"tableTpl");e.renderPadding=g.doRenderPadding;g.outerCt.dom.removeChild(g.innerCt.dom);f=document.createDocumentFragment();j=g.innerCt.dom.childNodes;d=j.length;for(;c<d;c++){f.appendChild(j[0])}h=g.getTarget();h.dom.innerHTML=e.apply({$layout:g,ownerId:g.owner.id});h.down("td").dom.appendChild(f);g.applyChildEls(a.el,a.id);g.isShrinkWrapTpl=true;b.removeEl(g.outerCt);b.removeEl(g.innerCt);g.initContextItems(b)},measureContentHeight:function(b){var a=this.outerCt.getHeight(),c=b.target;if(this.managePadding&&(c[c.contentPaddingProperty]===undefined)){a+=b.targetContext.getPaddingInfo().height}return a},measureContentWidth:function(b){var a=this.outerCt.getWidth(),c=b.target;if(this.managePadding&&(c[c.contentPaddingProperty]===undefined)){a+=b.targetContext.getPaddingInfo().width}return a},setCtSizeIfNeeded:function(d,m){var r=this,k=m.width,h=m.height,f=d.paddingContext.getPaddingInfo(),i=r.getTarget(),e=r.getOverflowXStyle(d),j=r.getOverflowYStyle(d),n=(e==="auto"||e==="scroll"),l=(j==="auto"||j==="scroll"),o=Ext.getScrollbarSize(),p=r.isShrinkWrapTpl,b=r.manageOverflow,a,q,g,c;if(k&&!d.widthModel.shrinkWrap&&((Ext.isIE7m&&Ext.isStrict&&p&&l)||(Ext.isIEQuirks&&!p&&!n))){if(!b){if(l&&(i.dom.scrollHeight>i.dom.clientHeight)){k-=o.width}}d.outerCtContext.setProp("width",k+f.width);r.hasOuterCtPxWidth=true}if(h&&!d.heightModel.shrinkWrap){if(Ext.supports.PercentageHeightOverflowBug){q=true}if(((Ext.isIE8&&Ext.isStrict)||Ext.isIE7m&&Ext.isStrict&&p)){g=true;c=!Ext.isIE8}if((q||g)&&n&&(i.dom.scrollWidth>i.dom.clientWidth)){h-=o.height}if(q){d.outerCtContext.setProp("height",h+f.height);r.hasOuterCtPxHeight=true}if(g){if(c){h+=f.height}d.innerCtContext.setProp("height",h);r.hasInnerCtPxHeight=true}}if(Ext.isIE7&&Ext.isStrict&&!p&&(j==="auto")){a=(e==="auto")?"overflow-x":"overflow-y";i.setStyle(a,"hidden");i.setStyle(a,"auto")}},setupRenderTpl:function(a){this.callParent(arguments);a.renderPadding=this.doRenderPadding},getContentTarget:function(){return this.innerCt}});