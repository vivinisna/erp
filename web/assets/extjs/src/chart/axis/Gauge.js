Ext.define("Ext.chart.axis.Gauge",{extend:"Ext.chart.axis.Abstract",position:"gauge",alias:"axis.gauge",drawAxis:function(p){var h=this.chart,a=h.surface,o=h.chartBBox,d=o.x+(o.width/2),b=o.y+o.height,c=this.margin||10,l=Math.min(o.width,2*o.height)/2+c,g=[],m,k=this.steps,e,f=Math.PI,n=Math.cos,j=Math.sin;if(this.sprites&&!h.resizing){this.drawLabel();return}if(this.margin>=0){if(!this.sprites){for(e=0;e<=k;e++){m=a.add({type:"path",path:["M",d+(l-c)*n(e/k*f-f),b+(l-c)*j(e/k*f-f),"L",d+l*n(e/k*f-f),b+l*j(e/k*f-f),"Z"],stroke:"#ccc"});m.setAttributes({hidden:false},true);g.push(m)}}else{g=this.sprites;for(e=0;e<=k;e++){g[e].setAttributes({path:["M",d+(l-c)*n(e/k*f-f),b+(l-c)*j(e/k*f-f),"L",d+l*n(e/k*f-f),b+l*j(e/k*f-f),"Z"],stroke:"#ccc"},true)}}}this.sprites=g;this.drawLabel();if(this.title){this.drawTitle()}},drawTitle:function(){var e=this,d=e.chart,a=d.surface,f=d.chartBBox,c=e.titleSprite,b;if(!c){e.titleSprite=c=a.add(Ext.apply({type:"text",zIndex:2},e.axisTitleStyle,e.labelTitle))}c.setAttributes(Ext.apply({text:e.title},e.label||{}),true);b=c.getBBox();c.setAttributes({x:f.x+(f.width/2)-(b.width/2),y:f.y+f.height-(b.height/2)-4},true)},setTitle:function(a){this.title=a;this.drawTitle()},drawLabel:function(){var k=this.chart,o=k.surface,b=k.chartBBox,h=b.x+(b.width/2),g=b.y+b.height,l=this.margin||10,d=Math.min(b.width,2*b.height)/2+2*l,t=Math.round,m=[],f,r=this.maximum||0,j=this.minimum||0,q=this.steps,p=0,u,s=Math.PI,c=Math.cos,a=Math.sin,e=this.label,n=e.renderer||function(i){return i};if(!this.labelArray){for(p=0;p<=q;p++){u=(p===0||p===q)?7:0;f=o.add({type:"text",text:n(t(j+p/q*(r-j))),x:h+d*c(p/q*s-s),y:g+d*a(p/q*s-s)-u,"text-anchor":"middle","stroke-width":0.2,zIndex:10,stroke:"#333"});f.setAttributes({hidden:false},true);m.push(f)}}else{m=this.labelArray;for(p=0;p<=q;p++){u=(p===0||p===q)?7:0;m[p].setAttributes({text:n(t(j+p/q*(r-j))),x:h+d*c(p/q*s-s),y:g+d*a(p/q*s-s)-u},true)}}this.labelArray=m}});