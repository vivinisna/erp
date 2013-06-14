Ext.define("Ext.chart.theme.Base",{requires:["Ext.chart.theme.Theme"],constructor:function(a){var b=Ext.identityFn;Ext.chart.theme.call(this,a,{background:false,axis:{stroke:"#444","stroke-width":1},axisLabelTop:{fill:"#444",font:"12px Arial, Helvetica, sans-serif",spacing:2,padding:5,renderer:b},axisLabelRight:{fill:"#444",font:"12px Arial, Helvetica, sans-serif",spacing:2,padding:5,renderer:b},axisLabelBottom:{fill:"#444",font:"12px Arial, Helvetica, sans-serif",spacing:2,padding:5,renderer:b},axisLabelLeft:{fill:"#444",font:"12px Arial, Helvetica, sans-serif",spacing:2,padding:5,renderer:b},axisTitleTop:{font:"bold 18px Arial",fill:"#444"},axisTitleRight:{font:"bold 18px Arial",fill:"#444",rotate:{x:0,y:0,degrees:270}},axisTitleBottom:{font:"bold 18px Arial",fill:"#444"},axisTitleLeft:{font:"bold 18px Arial",fill:"#444",rotate:{x:0,y:0,degrees:270}},series:{"stroke-width":0},seriesLabel:{font:"12px Arial",fill:"#333"},marker:{stroke:"#555",radius:3,size:3},colors:["#94ae0a","#115fa6","#a61120","#ff8809","#ffd13e","#a61187","#24ad9a","#7c7474","#a66111"],seriesThemes:[{fill:"#115fa6"},{fill:"#94ae0a"},{fill:"#a61120"},{fill:"#ff8809"},{fill:"#ffd13e"},{fill:"#a61187"},{fill:"#24ad9a"},{fill:"#7c7474"},{fill:"#115fa6"},{fill:"#94ae0a"},{fill:"#a61120"},{fill:"#ff8809"},{fill:"#ffd13e"},{fill:"#a61187"},{fill:"#24ad9a"},{fill:"#7c7474"},{fill:"#a66111"}],markerThemes:[{fill:"#115fa6",type:"circle"},{fill:"#94ae0a",type:"cross"},{fill:"#115fa6",type:"plus"},{fill:"#94ae0a",type:"circle"},{fill:"#a61120",type:"cross"}]})}},function(){var c=["#b1da5a","#4ce0e7","#e84b67","#da5abd","#4d7fe6","#fec935"],h=["Green","Sky","Red","Purple","Blue","Yellow"],g=0,f=0,b=c.length,a=Ext.chart.theme,d=[["#f0a50a","#c20024","#2044ba","#810065","#7eae29"],["#6d9824","#87146e","#2a9196","#d39006","#1e40ac"],["#fbbc29","#ce2e4e","#7e0062","#158b90","#57880e"],["#ef5773","#fcbd2a","#4f770d","#1d3eaa","#9b001f"],["#7eae29","#fdbe2a","#910019","#27b4bc","#d74dbc"],["#44dce1","#0b2592","#996e05","#7fb325","#b821a1"]],e=d.length;for(;g<b;g++){a[h[g]]=(function(i){return Ext.extend(a.Base,{constructor:function(j){a.Base.prototype.constructor.call(this,Ext.apply({baseColor:i},j))}})}(c[g]))}for(g=0;g<e;g++){a["Category"+(g+1)]=(function(i){return Ext.extend(a.Base,{constructor:function(j){a.Base.prototype.constructor.call(this,Ext.apply({colors:i},j))}})}(d[g]))}});