Ext.define("Ext.rtl.resizer.ResizeTracker",{override:"Ext.resizer.ResizeTracker",_rtlRegionNames:{south:"south",north:"north",east:"west",west:"east",northeast:"northwest",southeast:"southwest",southwest:"southeast",northwest:"northeast"},convertRegionName:function(a){return(Ext.rootHierarchyState.rtl)?this._rtlRegionNames[a]:a}});