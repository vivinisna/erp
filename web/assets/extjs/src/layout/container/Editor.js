Ext.define("Ext.layout.container.Editor",{alias:"layout.editor",extend:"Ext.layout.container.Container",autoSizeDefault:{width:"field",height:"field"},getItemSizePolicy:function(c){var b=this,a=b.owner.autoSize;return b.sizePolicy||(b.sizePolicy={setsWidth:a&&a.width==="boundEl"?1:0,setsHeight:a&&a.height==="boundEl"?1:0})},calculate:function(f){var e=this,b=e.owner,a=b.autoSize,d,c;if(a===true){a=e.autoSizeDefault}if(a){d=e.getDimension(b,a.width,"getWidth",b.width);c=e.getDimension(b,a.height,"getHeight",b.height)}f.childItems[0].setSize(d,c);f.setWidth(d);f.setHeight(c);f.setContentSize(d||b.field.getWidth(),c||b.field.getHeight())},getDimension:function(a,b,d,c){switch(b){case"boundEl":return a.boundEl[d]();case"field":return undefined;default:return c}}});