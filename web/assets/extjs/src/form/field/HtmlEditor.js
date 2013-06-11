Ext.define("Ext.form.field.HtmlEditor",{extend:"Ext.Component",mixins:{labelable:"Ext.form.Labelable",field:"Ext.form.field.Field"},alias:"widget.htmleditor",alternateClassName:"Ext.form.HtmlEditor",requires:["Ext.tip.QuickTipManager","Ext.picker.Color","Ext.toolbar.Item","Ext.toolbar.Toolbar","Ext.util.Format","Ext.layout.component.field.HtmlEditor"],childEls:["iframeEl","textareaEl","wrapEl"],fieldSubTpl:["{beforeTextAreaTpl}",'<textarea id="{cmpId}-textareaEl" name="{name}" tabIndex="-1" {inputAttrTpl}',' class="{textareaCls}" style="{size}" autocomplete="off">',"{[Ext.util.Format.htmlEncode(values.value)]}","</textarea>","{afterTextAreaTpl}","{beforeIFrameTpl}",'<iframe id="{cmpId}-iframeEl" name="{iframeName}" frameBorder="0" {iframeAttrTpl}',' style="{size}" src="{iframeSrc}" class="{iframeCls}"></iframe>',"{afterIFrameTpl}",{disableFormats:true}],stretchInputElFixed:true,subTplInsertions:["beforeTextAreaTpl","afterTextAreaTpl","beforeIFrameTpl","afterIFrameTpl","iframeAttrTpl","inputAttrTpl"],enableFormat:true,enableFontSize:true,enableColors:true,enableAlignments:true,enableLists:true,enableSourceEdit:true,enableLinks:true,enableFont:true,createLinkText:"Please enter the URL for the link:",defaultLinkValue:"http://",fontFamilies:["Arial","Courier New","Tahoma","Times New Roman","Verdana"],defaultFont:"Tahoma",defaultValue:(Ext.isOpera||Ext.isIE6)?"&#160;":"&#8203;",editorWrapCls:Ext.baseCSSPrefix+"html-editor-wrap",componentLayout:"htmleditor",initialized:false,activated:false,sourceEditMode:false,iframePad:3,hideMode:"offsets",afterBodyEl:"</div>",maskOnDisable:true,initComponent:function(){var a=this;a.addEvents("initialize","activate","beforesync","beforepush","sync","push","editmodechange");a.callParent(arguments);a.createToolbar(a);a.initLabelable();a.initField()},getRefItems:function(){return[this.toolbar]},createToolbar:function(f){var h=this,g=[],c,k=Ext.quickTipsActive&&Ext.tip.QuickTipManager.isEnabled(),e=Ext.baseCSSPrefix,d,j,b;function a(m,i,l){return{itemId:m,cls:e+"btn-icon",iconCls:e+"edit-"+m,enableToggle:i!==false,scope:f,handler:l||f.relayBtnCmd,clickEvent:"mousedown",tooltip:k?f.buttonTips[m]||b:b,overflowText:f.buttonTips[m].title||b,tabIndex:-1}}if(h.enableFont&&!Ext.isSafari2){d=Ext.widget("component",{renderTpl:['<select id="{id}-selectEl" class="{cls}">','<tpl for="fonts">','<option value="{[values.toLowerCase()]}" style="font-family:\'{.}\'"<tpl if="values.toLowerCase()==parent.defaultFont.toLowerCase()"> selected</tpl>>{.}</option>',"</tpl>","</select>"],renderData:{cls:e+"font-select",fonts:h.fontFamilies,defaultFont:h.defaultFont},childEls:["selectEl"],afterRender:function(){h.fontSelect=this.selectEl;Ext.Component.prototype.afterRender.apply(this,arguments);h.relayCmd("fontName",h.defaultFont);h.deferFocus()},onDisable:function(){var i=this.selectEl;if(i){i.dom.disabled=true}Ext.Component.prototype.onDisable.apply(this,arguments)},onEnable:function(){var i=this.selectEl;if(i){i.dom.disabled=false}Ext.Component.prototype.onEnable.apply(this,arguments)},listeners:{change:function(){h.win.focus();h.relayCmd("fontName",h.fontSelect.dom.value);h.deferFocus()},element:"selectEl"}});g.push(d,"-")}if(h.enableFormat){g.push(a("bold"),a("italic"),a("underline"))}if(h.enableFontSize){g.push("-",a("increasefontsize",false,h.adjustFont),a("decreasefontsize",false,h.adjustFont))}if(h.enableColors){g.push("-",{itemId:"forecolor",cls:e+"btn-icon",iconCls:e+"edit-forecolor",overflowText:f.buttonTips.forecolor.title,tooltip:k?f.buttonTips.forecolor||b:b,tabIndex:-1,menu:Ext.widget("menu",{plain:true,focusOnToFront:!!Ext.isIE,items:[{xtype:"colorpicker",allowReselect:true,focus:Ext.emptyFn,value:"000000",plain:true,clickEvent:"mousedown",handler:function(l,i){h.execCmd("forecolor",Ext.isWebKit||Ext.isIE?"#"+i:i);h.deferFocus();this.up("menu").hide()}}]})},{itemId:"backcolor",cls:e+"btn-icon",iconCls:e+"edit-backcolor",overflowText:f.buttonTips.backcolor.title,tooltip:k?f.buttonTips.backcolor||b:b,tabIndex:-1,menu:Ext.widget("menu",{plain:true,focusOnToFront:!!Ext.isIE,items:[{xtype:"colorpicker",focus:Ext.emptyFn,value:"FFFFFF",plain:true,allowReselect:true,clickEvent:"mousedown",handler:function(l,i){if(Ext.isGecko){h.execCmd("useCSS",false);h.execCmd("hilitecolor","#"+i);h.execCmd("useCSS",true);h.deferFocus()}else{h.execCmd(Ext.isOpera?"hilitecolor":"backcolor",Ext.isWebKit||Ext.isIE||Ext.isOpera?"#"+i:i);h.deferFocus()}this.up("menu").hide()}}]})})}if(h.enableAlignments){g.push("-",a("justifyleft"),a("justifycenter"),a("justifyright"))}if(!Ext.isSafari2){if(h.enableLinks){g.push("-",a("createlink",false,h.createLink))}if(h.enableLists){g.push("-",a("insertorderedlist"),a("insertunorderedlist"))}if(h.enableSourceEdit){g.push("-",a("sourceedit",true,function(i){h.toggleSourceEdit(!h.sourceEditMode)}))}}for(c=0;c<g.length;c++){if(g[c].itemId!=="sourceedit"){g[c].disabled=true}}j=Ext.widget("toolbar",{id:h.id+"-toolbar",ownerCt:h,cls:Ext.baseCSSPrefix+"html-editor-tb",enableOverflow:true,items:g,ownerLayout:h.getComponentLayout(),listeners:{click:function(i){i.preventDefault()},element:"el"}});h.toolbar=j},getMaskTarget:function(){return Ext.isGecko?this.wrapEl:this.bodyEl},setReadOnly:function(e){var d=this,c=d.textareaEl,b=d.iframeEl,a;d.readOnly=e;if(c){c.dom.readOnly=e}if(d.initialized){a=d.getEditorBody();if(Ext.isIE){b.setDisplayed(false);a.contentEditable=!e;b.setDisplayed(true)}else{d.setDesignMode(!e)}if(a){a.style.cursor=e?"default":"text"}d.disableItems(e)}},getDocMarkup:function(){var b=this,a=b.iframeEl.getHeight()-b.iframePad*2,c=(Ext.isIE6||Ext.isIE7||Ext.isIE8);return Ext.String.format((c?"":"<!DOCTYPE html>")+'<html><head><style type="text/css">'+(Ext.isOpera?"p{margin:0}":"")+"body{border:0;margin:0;padding:{0}px;"+(c?"":"min-")+"height:{1}px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:text;background-color:white;"+(Ext.isIE?"":"font-size:12px;font-family:{2}")+"}</style></head><body></body></html>",b.iframePad,a,b.defaultFont)},getEditorBody:function(){var a=this.getDoc();return a.body||a.documentElement},getDoc:function(){return(!Ext.isIE&&this.iframeEl.dom.contentDocument)||this.getWin().document},getWin:function(){return Ext.isIE?this.iframeEl.dom.contentWindow:window.frames[this.iframeEl.dom.name]},finishRenderChildren:function(){this.callParent();this.toolbar.finishRender()},onRender:function(){var a=this;a.callParent(arguments);a.inputEl=a.iframeEl;a.monitorTask=Ext.TaskManager.start({run:a.checkDesignMode,scope:a,interval:100})},initRenderTpl:function(){var a=this;if(!a.hasOwnProperty("renderTpl")){a.renderTpl=a.getTpl("labelableRenderTpl")}return a.callParent()},initRenderData:function(){var a=this;a.beforeSubTpl='<div id="'+a.id+'-wrapEl" class="'+a.editorWrapCls+'">'+Ext.DomHelper.markup(a.toolbar.getRenderTree());return Ext.applyIf(a.callParent(),a.getLabelableRenderData())},getSubTplData:function(){var a=this;return{$comp:a,cmpId:a.id,id:a.getInputId(),name:a.name,textareaCls:Ext.baseCSSPrefix+"hidden",value:a.value,iframeName:Ext.id(),iframeSrc:Ext.SSL_SECURE_URL,iframeCls:Ext.baseCSSPrefix+"htmleditor-iframe",size:"height:100px;width:100%"}},getSubTplMarkup:function(){return this.getTpl("fieldSubTpl").apply(this.getSubTplData())},initFrameDoc:function(){var b=this,c,a;Ext.TaskManager.stop(b.monitorTask);c=b.getDoc();b.win=b.getWin();c.open();c.write(b.getDocMarkup());c.close();a={run:function(){var d=b.getDoc();if(d.body||d.readyState==="complete"){Ext.TaskManager.stop(a);b.setDesignMode(true);Ext.defer(b.initEditor,10,b)}},interval:10,duration:10000,scope:b};Ext.TaskManager.start(a)},checkDesignMode:function(){var a=this,b=a.getDoc();if(b&&(!b.editorInitialized||a.getDesignMode()!=="on")){a.initFrameDoc()}},setDesignMode:function(c){var a=this,b=a.getDoc();if(b){if(a.readOnly){c=false}b.designMode=(/on|true/i).test(String(c).toLowerCase())?"on":"off"}},getDesignMode:function(){var a=this.getDoc();return !a?"":String(a.designMode).toLowerCase()},disableItems:function(d){var b=this.getToolbar().items.items,c,a=b.length,e;for(c=0;c<a;c++){e=b[c];if(e.getItemId()!=="sourceedit"){e.setDisabled(d)}}},toggleSourceEdit:function(b){var f=this,d=f.iframeEl,a=f.textareaEl,e=Ext.baseCSSPrefix+"hidden",c=f.getToolbar().getComponent("sourceedit");if(!Ext.isBoolean(b)){b=!f.sourceEditMode}f.sourceEditMode=b;if(c.pressed!==b){c.toggle(b)}if(b){f.disableItems(true);f.syncValue();d.addCls(e);a.removeCls(e);a.dom.removeAttribute("tabIndex");a.focus();f.inputEl=a}else{if(f.initialized){f.disableItems(f.readOnly)}f.pushValue();d.removeCls(e);a.addCls(e);a.dom.setAttribute("tabIndex",-1);f.deferFocus();f.inputEl=d}f.fireEvent("editmodechange",f,b);f.updateLayout()},createLink:function(){var a=prompt(this.createLinkText,this.defaultLinkValue);if(a&&a!=="http://"){this.relayCmd("createlink",a)}},clearInvalid:Ext.emptyFn,setValue:function(c){var b=this,a=b.textareaEl;b.mixins.field.setValue.call(b,c);if(c===null||c===undefined){c=""}if(a){a.dom.value=c}b.pushValue();return this},cleanHtml:function(a){a=String(a);if(Ext.isWebKit){a=a.replace(/\sclass="(?:Apple-style-span|Apple-tab-span|khtml-block-placeholder)"/gi,"")}if(a.charCodeAt(0)===parseInt(this.defaultValue.replace(/\D/g,""),10)){a=a.substring(1)}return a},syncValue:function(){var e=this,b,f,d,a,c;if(e.initialized){b=e.getEditorBody();d=b.innerHTML;if(Ext.isWebKit){a=b.getAttribute("style");c=a.match(/text-align:(.*?);/i);if(c&&c[1]){d='<div style="'+c[0]+'">'+d+"</div>"}}d=e.cleanHtml(d);if(e.fireEvent("beforesync",e,d)!==false){if(e.textareaEl.dom.value!=d){e.textareaEl.dom.value=d;f=true}e.fireEvent("sync",e,d);if(f){e.checkChange()}}}},getValue:function(){var a=this,b;if(!a.sourceEditMode){a.syncValue()}b=a.rendered?a.textareaEl.dom.value:a.value;a.value=b;return b},pushValue:function(){var b=this,a;if(b.initialized){a=b.textareaEl.dom.value||"";if(!b.activated&&a.length<1){a=b.defaultValue}if(b.fireEvent("beforepush",b,a)!==false){b.getEditorBody().innerHTML=a;if(Ext.isGecko){b.setDesignMode(false);b.setDesignMode(true)}b.fireEvent("push",b,a)}}},deferFocus:function(){this.focus(false,true)},getFocusEl:function(){var a=this,b=a.win;return b&&!a.sourceEditMode?b:a.textareaEl},focus:function(d,b){var c=this,e,a;if(b){if(!c.focusTask){c.focusTask=new Ext.util.DelayedTask(c.focus)}c.focusTask.delay(Ext.isNumber(b)?b:10,null,c,[d,false])}else{if(d){if(c.textareaEl&&c.textareaEl.dom){e=c.textareaEl.dom.value}if(e&&e.length){c.execCmd("selectall",true)}}a=c.getFocusEl();if(a&&(a.isComponent||a.dom)){a.focus()}}return c},initEditor:function(){try{var f=this,d=f.getEditorBody(),b=f.textareaEl.getStyles("font-size","font-family","background-image","background-repeat","background-color","color"),h,c;b["background-attachment"]="fixed";d.bgProperties="fixed";Ext.DomHelper.applyStyles(d,b);h=f.getDoc();if(h){try{Ext.EventManager.removeAll(h)}catch(g){}}c=Ext.Function.bind(f.onEditorEvent,f);Ext.EventManager.on(h,{mousedown:c,dblclick:c,click:c,keyup:c,buffer:100});c=f.onRelayedEvent;Ext.EventManager.on(h,{mousedown:c,mousemove:c,mouseup:c,click:c,dblclick:c,scope:f});if(Ext.isGecko){Ext.EventManager.on(h,"keypress",f.applyCommand,f)}if(f.fixKeys){Ext.EventManager.on(h,"keydown",f.fixKeys,f)}Ext.EventManager.onWindowUnload(f.beforeDestroy,f);h.editorInitialized=true;f.initialized=true;f.pushValue();f.setReadOnly(f.readOnly);f.fireEvent("initialize",f)}catch(a){}},beforeDestroy:function(){var a=this,d=a.monitorTask,c,f;if(d){Ext.TaskManager.stop(d)}if(a.rendered){Ext.EventManager.removeUnloadListener(a.beforeDestroy,a);try{c=a.getDoc();if(c){Ext.EventManager.removeAll(Ext.fly(c));for(f in c){if(c.hasOwnProperty&&c.hasOwnProperty(f)){delete c[f]}}}}catch(b){}Ext.destroyMembers(a,"iframeEl","textareaEl","wrapEl")}Ext.destroyMembers(a,"toolbar");a.callParent()},onRelayedEvent:function(c){var b=this.iframeEl,d=b.getXY(),a=c.getXY();c.xy=[d[0]+a[0],d[1]+a[1]];c.injectEvent(b);c.xy=a},onFirstFocus:function(){var c=this,b,a;c.activated=true;c.disableItems(c.readOnly);if(Ext.isGecko){c.win.focus();b=c.win.getSelection();if(!b.focusNode||b.focusNode.nodeType!==3){a=b.getRangeAt(0);a.selectNodeContents(c.getEditorBody());a.collapse(true);c.deferFocus()}try{c.execCmd("useCSS",true);c.execCmd("styleWithCSS",false)}catch(d){}}c.fireEvent("activate",c)},adjustFont:function(d){var e=d.getItemId()==="increasefontsize"?1:-1,c=this.getDoc().queryCommandValue("FontSize")||"2",a=Ext.isString(c)&&c.indexOf("px")!==-1,b;c=parseInt(c,10);if(a){if(c<=10){c=1+e}else{if(c<=13){c=2+e}else{if(c<=16){c=3+e}else{if(c<=18){c=4+e}else{if(c<=24){c=5+e}else{c=6+e}}}}}c=Ext.Number.constrain(c,1,6)}else{b=Ext.isSafari;if(b){e*=2}c=Math.max(1,c+e)+(b?"px":0)}this.execCmd("FontSize",c)},onEditorEvent:function(a){this.updateToolbar()},updateToolbar:function(){var h=this,e,c,d,j,b,f,a,g;if(h.readOnly){return}if(!h.activated){h.onFirstFocus();return}d=h.getToolbar().items.map;j=h.getDoc();if(h.enableFont&&!Ext.isSafari2){f=j.queryCommandValue("fontName");b=(f?f.split(",")[0].replace(/^'/,"").replace(/'$/,""):h.defaultFont).toLowerCase();a=h.fontSelect.dom;if(b!==a.value||b!=f){a.value=b}}function k(){for(e=0,c=arguments.length,b;e<c;e++){b=arguments[e];d[b].toggle(j.queryCommandState(b))}}if(h.enableFormat){k("bold","italic","underline")}if(h.enableAlignments){k("justifyleft","justifycenter","justifyright")}if(!Ext.isSafari2&&h.enableLists){k("insertorderedlist","insertunorderedlist")}g=h.toolbar.query("menu");for(e=0;e<g.length;e++){g[e].hide()}h.syncValue()},relayBtnCmd:function(a){this.relayCmd(a.getItemId())},relayCmd:function(b,a){Ext.defer(function(){var c=this;if(!this.isDestroyed){c.focus();c.execCmd(b,a);c.updateToolbar()}},10,this)},execCmd:function(c,b){var a=this,d=a.getDoc();d.execCommand(c,false,(b==undefined?null:b));a.syncValue()},applyCommand:function(d){if(d.ctrlKey){var a=this,f=d.getCharCode(),b;if(f>0){f=String.fromCharCode(f);switch(f){case"b":b="bold";break;case"i":b="italic";break;case"u":b="underline";break}if(b){a.win.focus();a.execCmd(b);a.deferFocus();d.preventDefault()}}}},insertAtCursor:function(c){var b=this,a;if(b.activated){b.win.focus();if(Ext.isIE){a=b.getDoc().selection.createRange();if(a){a.pasteHTML(c);b.syncValue();b.deferFocus()}}else{b.execCmd("InsertHTML",c);b.deferFocus()}}},fixKeys:(function(){if(Ext.isIE){return function(g){var c=this,b=g.getKey(),f=c.getDoc(),h=c.readOnly,a,d;if(b===g.TAB){g.stopEvent();if(!h){a=f.selection.createRange();if(a){a.collapse(true);a.pasteHTML("&#160;&#160;&#160;&#160;");c.deferFocus()}}}else{if(b===g.ENTER){if(!h){a=f.selection.createRange();if(a){d=a.parentElement();if(!d||d.tagName.toLowerCase()!=="li"){g.stopEvent();a.pasteHTML("<br />");a.collapse(false);a.select()}}}}}}}if(Ext.isOpera){return function(c){var b=this,a=c.getKey(),d=b.readOnly;if(a===c.TAB){c.stopEvent();if(!d){b.win.focus();b.execCmd("InsertHTML","&#160;&#160;&#160;&#160;");b.deferFocus()}}}}return null}()),getToolbar:function(){return this.toolbar},buttonTips:{bold:{title:"Bold (Ctrl+B)",text:"Make the selected text bold.",cls:Ext.baseCSSPrefix+"html-editor-tip"},italic:{title:"Italic (Ctrl+I)",text:"Make the selected text italic.",cls:Ext.baseCSSPrefix+"html-editor-tip"},underline:{title:"Underline (Ctrl+U)",text:"Underline the selected text.",cls:Ext.baseCSSPrefix+"html-editor-tip"},increasefontsize:{title:"Grow Text",text:"Increase the font size.",cls:Ext.baseCSSPrefix+"html-editor-tip"},decreasefontsize:{title:"Shrink Text",text:"Decrease the font size.",cls:Ext.baseCSSPrefix+"html-editor-tip"},backcolor:{title:"Text Highlight Color",text:"Change the background color of the selected text.",cls:Ext.baseCSSPrefix+"html-editor-tip"},forecolor:{title:"Font Color",text:"Change the color of the selected text.",cls:Ext.baseCSSPrefix+"html-editor-tip"},justifyleft:{title:"Align Text Left",text:"Align text to the left.",cls:Ext.baseCSSPrefix+"html-editor-tip"},justifycenter:{title:"Center Text",text:"Center text in the editor.",cls:Ext.baseCSSPrefix+"html-editor-tip"},justifyright:{title:"Align Text Right",text:"Align text to the right.",cls:Ext.baseCSSPrefix+"html-editor-tip"},insertunorderedlist:{title:"Bullet List",text:"Start a bulleted list.",cls:Ext.baseCSSPrefix+"html-editor-tip"},insertorderedlist:{title:"Numbered List",text:"Start a numbered list.",cls:Ext.baseCSSPrefix+"html-editor-tip"},createlink:{title:"Hyperlink",text:"Make the selected text a hyperlink.",cls:Ext.baseCSSPrefix+"html-editor-tip"},sourceedit:{title:"Source Edit",text:"Switch to source editing mode.",cls:Ext.baseCSSPrefix+"html-editor-tip"}}});