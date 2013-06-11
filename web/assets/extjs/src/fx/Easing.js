Ext.require("Ext.fx.CubicBezier",function(){var e=Math,g=e.PI,d=e.pow,b=e.sin,f=e.sqrt,a=e.abs,c=1.70158;Ext.define("Ext.fx.Easing",{singleton:true,linear:Ext.identityFn,ease:function(k){var h=0.07813-k/2,l=-0.25,m=f(0.0066+h*h),p=m-h,j=d(a(p),1/3)*(p<0?-1:1),o=-m-h,i=d(a(o),1/3)*(o<0?-1:1),r=j+i+0.25;return d(1-r,2)*3*r*0.1+(1-r)*3*r*r+r*r*r},easeIn:function(h){return d(h,1.7)},easeOut:function(h){return d(h,0.48)},easeInOut:function(p){var k=0.48-p/1.04,j=f(0.1734+k*k),h=j-k,o=d(a(h),1/3)*(h<0?-1:1),m=-j-k,l=d(a(m),1/3)*(m<0?-1:1),i=o+l+0.5;return(1-i)*3*i*i+i*i*i},backIn:function(h){return h*h*((c+1)*h-c)},backOut:function(h){h=h-1;return h*h*((c+1)*h+c)+1},elasticIn:function(j){if(j===0||j===1){return j}var i=0.3,h=i/4;return d(2,-10*j)*b((j-h)*(2*g)/i)+1},elasticOut:function(h){return 1-Ext.fx.Easing.elasticIn(1-h)},bounceIn:function(h){return 1-Ext.fx.Easing.bounceOut(1-h)},bounceOut:function(k){var i=7.5625,j=2.75,h;if(k<(1/j)){h=i*k*k}else{if(k<(2/j)){k-=(1.5/j);h=i*k*k+0.75}else{if(k<(2.5/j)){k-=(2.25/j);h=i*k*k+0.9375}else{k-=(2.625/j);h=i*k*k+0.984375}}}return h}},function(){var i=Ext.fx.Easing.self,h=i.prototype;i.implement({"back-in":h.backIn,"back-out":h.backOut,"ease-in":h.easeIn,"ease-out":h.easeOut,"elastic-in":h.elasticIn,"elastic-out":h.elasticOut,"bounce-in":h.bounceIn,"bounce-out":h.bounceOut,"ease-in-out":h.easeInOut})})});