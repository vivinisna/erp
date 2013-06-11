Ext.define("Ext.view.TableChunker",{singleton:true,requires:["Ext.XTemplate"],metaTableTpl:["{%if (this.openTableWrap)out.push(this.openTableWrap())%}",'<table class="'+Ext.baseCSSPrefix+"grid-table "+Ext.baseCSSPrefix+'grid-table-resizer" border="0" cellspacing="0" cellpadding="0" {[this.embedFullWidth(values)]}>',"<tbody>",'<tr class="'+Ext.baseCSSPrefix+'grid-header-row">','<tpl for="columns">','<th class="'+Ext.baseCSSPrefix+'grid-col-resizer-{id}" style="width: {width}px; height: 0px;"></th>',"</tpl>","</tr>","{[this.openRows()]}","{row}",'<tpl for="features">',"{[this.embedFeature(values, parent, xindex, xcount)]}","</tpl>","{[this.closeRows()]}","</tbody>","</table>","{%if (this.closeTableWrap)out.push(this.closeTableWrap())%}"],constructor:function(){Ext.XTemplate.prototype.recurse=function(b,a){return this.apply(a?b[a]:b)}},embedFeature:function(b,d,a,e){var c="";if(!b.disabled){c=b.getFeatureTpl(b,d,a,e)}return c},embedFullWidth:function(b){var a='style="width:{fullWidth}px;';if(!b.rowCount){a+="height:1px;"}return a+'"'},openRows:function(){return'<tpl for="rows">'},closeRows:function(){return"</tpl>"},metaRowTpl:['<tr class="'+Ext.baseCSSPrefix+'grid-row {[this.embedRowCls()]}" {[this.embedRowAttr()]}>','<tpl for="columns">','<td class="{cls} '+Ext.baseCSSPrefix+"grid-cell "+Ext.baseCSSPrefix+'grid-cell-{columnId} {{id}-modified} {{id}-tdCls} {[this.firstOrLastCls(xindex, xcount)]}" {{id}-tdAttr}>','<div {unselectableAttr} class="'+Ext.baseCSSPrefix+'grid-cell-inner {unselectableCls}" style="text-align: {align}; {{id}-style};">{{id}}</div>',"</td>","</tpl>","</tr>"],firstOrLastCls:function(a,b){if(a===1){return Ext.view.Table.prototype.firstCls}else{if(a===b){return Ext.view.Table.prototype.lastCls}}},embedRowCls:function(){return"{rowCls}"},embedRowAttr:function(){return"{rowAttr}"},openTableWrap:undefined,closeTableWrap:undefined,getTableTpl:function(j,b){var h,g={openRows:this.openRows,closeRows:this.closeRows,embedFeature:this.embedFeature,embedFullWidth:this.embedFullWidth,openTableWrap:this.openTableWrap,closeTableWrap:this.closeTableWrap},f={},c=j.features||[],l=c.length,e=0,k={embedRowCls:this.embedRowCls,embedRowAttr:this.embedRowAttr,firstOrLastCls:this.firstOrLastCls,unselectableAttr:j.enableTextSelection?"":'unselectable="on"',unselectableCls:j.enableTextSelection?"":Ext.baseCSSPrefix+"unselectable"},d=Array.prototype.slice.call(this.metaRowTpl,0),a;for(;e<l;e++){if(!c[e].disabled){c[e].mutateMetaRowTpl(d);Ext.apply(k,c[e].getMetaRowTplFragments());Ext.apply(f,c[e].getFragmentTpl());Ext.apply(g,c[e].getTableFragments())}}d=new Ext.XTemplate(d.join(""),k);j.row=d.applyTemplate(j);a=new Ext.XTemplate(this.metaTableTpl.join(""),g);h=a.applyTemplate(j);if(!b){h=new Ext.XTemplate(h,f)}return h}});