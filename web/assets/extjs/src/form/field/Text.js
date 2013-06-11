Ext.define("Ext.form.field.Text",{extend:"Ext.form.field.Base",alias:"widget.textfield",requires:["Ext.form.field.VTypes","Ext.layout.component.field.Text"],alternateClassName:["Ext.form.TextField","Ext.form.Text"],size:20,growMin:30,growMax:800,growAppend:"W",allowBlank:true,allowOnlyWhitespace:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",blankText:"This field is required",regexText:"",emptyCls:Ext.baseCSSPrefix+"form-empty-field",requiredCls:Ext.baseCSSPrefix+"form-required-field",componentLayout:"textfield",valueContainsPlaceholder:false,initComponent:function(){var a=this;if(a.allowOnlyWhitespace===false){a.allowBlank=false}a.callParent();a.addEvents("autosize","keydown","keyup","keypress");a.addStateEvents("change");a.setGrowSizePolicy()},setGrowSizePolicy:function(){if(this.grow){this.shrinkWrap|=1}},initEvents:function(){var b=this,a=b.inputEl;b.callParent();if(b.selectOnFocus||b.emptyText){b.mon(a,"mousedown",b.onMouseDown,b)}if(b.maskRe||(b.vtype&&b.disableKeyFilter!==true&&(b.maskRe=Ext.form.field.VTypes[b.vtype+"Mask"]))){b.mon(a,"keypress",b.filterKeys,b)}if(b.enableKeyEvents){b.mon(a,{scope:b,keyup:b.onKeyUp,keydown:b.onKeyDown,keypress:b.onKeyPress})}},isEqual:function(b,a){return this.isEqualAsString(b,a)},onChange:function(){this.callParent();this.autoSize()},getSubTplData:function(){var b=this,c=b.getRawValue(),e=b.emptyText&&c.length<1,a=b.maxLength,d;if(b.enforceMaxLength){if(a===Number.MAX_VALUE){a=undefined}}else{a=undefined}if(e){if(Ext.supports.Placeholder){d=b.emptyText}else{c=b.emptyText;b.valueContainsPlaceholder=true}}return Ext.apply(b.callParent(),{maxLength:a,readOnly:b.readOnly,placeholder:d,value:c,fieldCls:b.fieldCls+((e&&(d||c))?" "+b.emptyCls:"")+(b.allowBlank?"":" "+b.requiredCls)})},afterRender:function(){this.autoSize();this.callParent()},onMouseDown:function(b){var a=this;if(!a.hasFocus){a.mon(a.inputEl,"mouseup",Ext.emptyFn,a,{single:true,preventDefault:true})}},processRawValue:function(b){var a=this,d=a.stripCharsRe,c;if(d){c=b.replace(d,"");if(c!==b){a.setRawValue(c);b=c}}return b},onDisable:function(){this.callParent();if(Ext.isIE){this.inputEl.dom.unselectable="on"}},onEnable:function(){this.callParent();if(Ext.isIE){this.inputEl.dom.unselectable=""}},onKeyDown:function(a){this.fireEvent("keydown",this,a)},onKeyUp:function(a){this.fireEvent("keyup",this,a)},onKeyPress:function(a){this.fireEvent("keypress",this,a)},reset:function(){this.callParent();this.applyEmptyText()},applyEmptyText:function(){var b=this,a=b.emptyText,c;if(b.rendered&&a){c=b.getRawValue().length<1&&!b.hasFocus;if(Ext.supports.Placeholder){b.inputEl.dom.placeholder=a}else{if(c){b.setRawValue(a);b.valueContainsPlaceholder=true}}if(c){b.inputEl.addCls(b.emptyCls)}b.autoSize()}},afterFirstLayout:function(){this.callParent();if(Ext.isIE&&this.disabled){var a=this.inputEl;if(a){a.dom.unselectable="on"}}},beforeFocus:function(){var b=this,c=b.inputEl,a=b.emptyText,d;b.callParent(arguments);if((a&&!Ext.supports.Placeholder)&&(c.dom.value===b.emptyText&&b.valueContainsPlaceholder)){b.setRawValue("");d=true;c.removeCls(b.emptyCls);b.valueContainsPlaceholder=false}else{if(Ext.supports.Placeholder){b.inputEl.removeCls(b.emptyCls)}}if(b.selectOnFocus||d){if(Ext.isWebKit){if(!b.inputFocusTask){b.inputFocusTask=new Ext.util.DelayedTask(b.focusInput,b)}b.inputFocusTask.delay(1)}else{c.dom.select()}}},focusInput:function(){var a=this.inputEl;if(a){a=a.dom;if(a){a.select()}}},onFocus:function(){var a=this;a.callParent(arguments);if(a.emptyText){a.autoSize()}},postBlur:function(){this.callParent(arguments);this.applyEmptyText()},filterKeys:function(c){if(c.ctrlKey&&!c.altKey){return}var b=c.getKey(),a=String.fromCharCode(c.getCharCode());if((Ext.isGecko||Ext.isOpera)&&(c.isNavKeyPress()||b===c.BACKSPACE||(b===c.DELETE&&c.button===-1))){return}if((!Ext.isGecko&&!Ext.isOpera)&&c.isSpecialKey()&&!a){return}if(!this.maskRe.test(a)){c.stopEvent()}},getState:function(){return this.addPropertyToState(this.callParent(),"value")},applyState:function(a){this.callParent(arguments);if(a.hasOwnProperty("value")){this.setValue(a.value)}},getRawValue:function(){var b=this,a=b.callParent();if(a===b.emptyText&&b.valueContainsPlaceholder){a=""}return a},setValue:function(b){var a=this,c=a.inputEl;if(c&&a.emptyText&&!Ext.isEmpty(b)){c.removeCls(a.emptyCls);a.valueContainsPlaceholder=false}a.callParent(arguments);a.applyEmptyText();return a},getErrors:function(l){var g=this,k=g.callParent(arguments),a=g.validator,d=g.emptyText,c=g.allowBlank,e=g.vtype,h=Ext.form.field.VTypes,i=g.regex,j=Ext.String.format,b,f;l=l||g.processRawValue(g.getRawValue());if(Ext.isFunction(a)){b=a.call(g,l);if(b!==true){k.push(b)}}f=g.allowOnlyWhitespace?l:Ext.String.trim(l);if(f.length<1||(l===g.emptyText&&g.valueContainsPlaceholder)){if(!c){k.push(g.blankText)}return k}if(l.length<g.minLength){k.push(j(g.minLengthText,g.minLength))}if(l.length>g.maxLength){k.push(j(g.maxLengthText,g.maxLength))}if(e){if(!h[e](l,g)){k.push(g.vtypeText||h[e+"Text"])}}if(i&&!i.test(l)){k.push(g.regexText||g.invalidText)}return k},selectText:function(h,a){var g=this,c=g.getRawValue(),d=true,f=g.inputEl.dom,e,b;if(c.length>0){h=h===e?0:h;a=a===e?c.length:a;if(f.setSelectionRange){f.setSelectionRange(h,a)}else{if(f.createTextRange){b=f.createTextRange();b.moveStart("character",h);b.moveEnd("character",a-c.length);b.select()}}d=Ext.isGecko||Ext.isOpera}if(d){g.focus()}},autoSize:function(){var a=this;if(a.grow&&a.rendered){a.autoSizing=true;a.updateLayout()}},afterComponentLayout:function(){var b=this,a;b.callParent(arguments);if(b.autoSizing){a=b.inputEl.getWidth();if(a!==b.lastInputWidth){b.fireEvent("autosize",b,a);b.lastInputWidth=a;delete b.autoSizing}}},onDestroy:function(){var a=this;a.callParent();if(a.inputFocusTask){a.inputFocusTask.cancel();a.inputFocusTask=null}}});