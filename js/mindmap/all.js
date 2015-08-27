/*js/libs/jquery-ui-1.8.11.custom.min.js*/
/*!
 * jQuery UI 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.11",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,
"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");
if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,l,m){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(l)g-=parseFloat(c.curCSS(f,
"border"+this+"Width",true))||0;if(m)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,
d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){var b=a.nodeName.toLowerCase(),d=c.attr(a,"tabindex");if("area"===b){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&k(a)}return(/input|select|textarea|button|object/.test(b)?!a.disabled:"a"==b?a.href||!isNaN(d):!isNaN(d))&&k(a)},tabbable:function(a){var b=c.attr(a,"tabindex");return(isNaN(b)||b>=0)&&c(a).is(":focusable")}});
c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&
b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=
a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,e=a.which==1,f=typeof this.options.cancel=="string"?b(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(d){return c._mouseMove(d)};this._mouseUpDelegate=function(d){return c._mouseUp(d)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return a.originalEvent.mouseHandled=
true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Draggable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-
this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();
d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||
this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&
this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone():this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||
0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-
(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),
height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[(a.containment=="document"?0:d(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(a.containment=="document"?0:d(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?
document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){var b=d(a.containment)[0];if(b){a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),
10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),
10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom]}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&
d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])e=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])e=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=
this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;e=this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=this.containment?!(e-this.offset.click.left<this.containment[0]||e-this.offset.click.left>this.containment[2])?
e:!(e-this.offset.click.left<this.containment[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():
f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,
offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.11"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var g=d.data(this,"sortable");if(g&&!g.options.disabled){c.sortables.push({instance:g,shouldRevert:g.options.revert});g.refreshPositions();g._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},
b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=
d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};
a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&
this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",
{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","iframeFix",{start:function(){var a=d(this).data("draggable").options;d(a.iframeFix===true?"iframe":a.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+
"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")})},stop:function(){d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",
a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+
c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<
c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+
c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),
f=c.options,e=f.snapTolerance,g=b.offset.left,n=g+c.helperProportions.width,m=b.offset.top,o=m+c.helperProportions.height,h=c.snapElements.length-1;h>=0;h--){var i=c.snapElements[h].left,k=i+c.snapElements[h].width,j=c.snapElements[h].top,l=j+c.snapElements[h].height;if(i-e<g&&g<k+e&&j-e<m&&m<l+e||i-e<g&&g<k+e&&j-e<o&&o<l+e||i-e<n&&n<k+e&&j-e<m&&m<l+e||i-e<n&&n<k+e&&j-e<o&&o<l+e){if(f.snapMode!="inner"){var p=Math.abs(j-o)<=e,q=Math.abs(l-m)<=e,r=Math.abs(i-n)<=e,s=Math.abs(k-g)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(j-m)<=e;q=Math.abs(l-o)<=e;r=Math.abs(i-g)<=e;s=Math.abs(k-n)<=e;if(p)b.position.top=
c._convertPositionTo("relative",{top:j,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:l-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:i}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:k-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[h].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),
{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=p||q||r||s||t}else{c.snapElements[h].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[h].item}));c.snapElements[h].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=
parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
;/*
 * jQuery UI Resizable 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){e(this).removeClass("ui-resizable-autohide");b._handles.show()},function(){if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};
if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),
d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=
this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:
this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",
b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;
f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=
null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+
this.size.height,k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=
[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=
this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,
a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,
c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,
originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.11"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=
b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width",
"height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};
if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-
g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,
height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=
e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,
d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?
d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=
a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&
/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");
b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/
(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;/*
 * jQuery UI Button 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,f=a([]);if(c)f=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return f};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",
i);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",f="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",
function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||a(this).removeClass(f)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");
b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var e=b.element[0];h(e).not(e).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");
g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(e){if(c.disabled)return false;if(e.keyCode==a.ui.keyCode.SPACE||e.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",
c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var b=this.element.parents().filter(":last"),c="label[for="+this.element.attr("id")+"]";this.buttonElement=b.find(c);if(!this.buttonElement.length){b=b.length?b.siblings():this.element.siblings();this.buttonElement=b.filter(c);if(!this.buttonElement.length)this.buttonElement=b.find(c)}this.element.addClass("ui-helper-hidden-accessible");
(b=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,f=d.primary&&d.secondary,e=[];if(d.primary||d.secondary){if(this.options.text)e.push("ui-button-text-icon"+(f?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){e.push(f?"ui-button-icons-only":
"ui-button-icon-only");this.hasTitle||b.attr("title",c)}}else e.push("ui-button-text-only");b.addClass(e.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
;/*
 * jQuery UI Dialog 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c,j){var k={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},l={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&
c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",
-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role",
"button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=
b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&
a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");
isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);
d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});
c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,
h){h=c.isFunction(h)?{click:h,text:f}:h;f=c('<button type="button"></button>').attr(h,true).unbind("click").click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.fn.button&&f.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=
d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,
position:f.position,size:f.size}}a=a===j?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,
h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===
1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in k)e=true;if(g in
l)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");
break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=
this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&
this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.11",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===
0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
;/*
 * jQuery UI Slider 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,a=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");a.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=d([]);if(a.range){if(a.range===true){this.range=d("<div></div>");if(!a.values)a.values=[this._valueMin(),this._valueMin()];if(a.values.length&&a.values.length!==2)a.values=[a.values[0],a.values[0]]}else this.range=d("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(a.range==="min"||a.range==="max")this.range.addClass("ui-slider-range-"+a.range);this.range.addClass("ui-widget-header")}d(".ui-slider-handle",this.element).length===0&&d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(a.values&&a.values.length)for(;d(".ui-slider-handle",this.element).length<a.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=d(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(c){c.preventDefault()}).hover(function(){a.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(a.disabled)d(this).blur();
else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(c){d(this).data("index.ui-slider-handle",c)});this.handles.keydown(function(c){var e=true,f=d(this).data("index.ui-slider-handle"),h,g,i;if(!b.options.disabled){switch(c.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:e=
false;if(!b._keySliding){b._keySliding=true;d(this).addClass("ui-state-active");h=b._start(c,f);if(h===false)return}break}i=b.options.step;h=b.options.values&&b.options.values.length?(g=b.values(f)):(g=b.value());switch(c.keyCode){case d.ui.keyCode.HOME:g=b._valueMin();break;case d.ui.keyCode.END:g=b._valueMax();break;case d.ui.keyCode.PAGE_UP:g=b._trimAlignValue(h+(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:g=b._trimAlignValue(h-(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(h===
b._valueMax())return;g=b._trimAlignValue(h+i);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(h===b._valueMin())return;g=b._trimAlignValue(h-i);break}b._slide(c,f,g);return e}}).keyup(function(c){var e=d(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(c,e);b._change(c,e);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(b){var a=this.options,c,e,f,h,g;if(a.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:b.pageX,y:b.pageY});e=this._valueMax()-this._valueMin()+1;h=this;this.handles.each(function(i){var j=Math.abs(c-h.values(i));if(e>j){e=j;f=d(this);g=i}});if(a.range===true&&this.values(1)===a.min){g+=1;f=d(this.handles[g])}if(this._start(b,
g)===false)return false;this._mouseSliding=true;h._handleIndex=g;f.addClass("ui-state-active").focus();a=f.offset();this._clickOffset=!d(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-a.left-f.width()/2,top:b.pageY-a.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,g,c);return this._animateOff=true},_mouseStart:function(){return true},
_mouseDrag:function(b){var a=this._normValueFromMouse({x:b.pageX,y:b.pageY});this._slide(b,this._handleIndex,a);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(b){var a;
if(this.orientation==="horizontal"){a=this.elementSize.width;b=b.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{a=this.elementSize.height;b=b.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}a=b/a;if(a>1)a=1;if(a<0)a=0;if(this.orientation==="vertical")a=1-a;b=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+a*b)},_start:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=
this.values(a);c.values=this.values()}return this._trigger("start",b,c)},_slide:function(b,a,c){var e;if(this.options.values&&this.options.values.length){e=this.values(a?0:1);if(this.options.values.length===2&&this.options.range===true&&(a===0&&c>e||a===1&&c<e))c=e;if(c!==this.values(a)){e=this.values();e[a]=c;b=this._trigger("slide",b,{handle:this.handles[a],value:c,values:e});this.values(a?0:1);b!==false&&this.values(a,c,true)}}else if(c!==this.value()){b=this._trigger("slide",b,{handle:this.handles[a],
value:c});b!==false&&this.value(c)}},_stop:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("stop",b,c)},_change:function(b,a){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("change",b,c)}},value:function(b){if(arguments.length){this.options.value=
this._trimAlignValue(b);this._refreshValue();this._change(null,0)}return this._value()},values:function(b,a){var c,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(a);this._refreshValue();this._change(null,b)}if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;e=arguments[0];for(f=0;f<c.length;f+=1){c[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):this.value();
else return this._values()},_setOption:function(b,a){var c,e=0;if(d.isArray(this.options.values))e=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(b){case "disabled":if(a){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<e;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var b=this.options.value;return b=this._trimAlignValue(b)},_values:function(b){var a,c;if(arguments.length){a=this.options.values[b];
return a=this._trimAlignValue(a)}else{a=this.options.values.slice();for(c=0;c<a.length;c+=1)a[c]=this._trimAlignValue(a[c]);return a}},_trimAlignValue:function(b){if(b<=this._valueMin())return this._valueMin();if(b>=this._valueMax())return this._valueMax();var a=this.options.step>0?this.options.step:1,c=(b-this._valueMin())%a;alignValue=b-c;if(Math.abs(c)*2>=a)alignValue+=c>0?a:-a;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},
_refreshValue:function(){var b=this.options.range,a=this.options,c=this,e=!this._animateOff?a.animate:false,f,h={},g,i,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(k){f=(c.values(k)-c._valueMin())/(c._valueMax()-c._valueMin())*100;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";d(this).stop(1,1)[e?"animate":"css"](h,a.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(k===0)c.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},a.animate);
if(k===1)c.range[e?"animate":"css"]({width:f-g+"%"},{queue:false,duration:a.animate})}else{if(k===0)c.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},a.animate);if(k===1)c.range[e?"animate":"css"]({height:f-g+"%"},{queue:false,duration:a.animate})}g=f});else{i=this.value();j=this._valueMin();l=this._valueMax();f=l!==j?(i-j)/(l-j)*100:0;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](h,a.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,
1)[e?"animate":"css"]({width:f+"%"},a.animate);if(b==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:a.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},a.animate);if(b==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:a.animate})}}});d.extend(d.ui.slider,{version:"1.8.11"})})(jQuery);
;/*
 * jQuery UI Effects 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||function(f,j){function n(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return o.transparent;return o[f.trim(c).toLowerCase()]}function s(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return n(b)}function p(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function q(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in t||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function u(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:b in f.fx.speeds?f.fx.speeds[b]:f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}function m(c){if(!c||typeof c==="number"||f.fx.speeds[c])return true;if(typeof c==="string"&&!f.effects[c])return true;return false}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=s(b.elem,a);b.end=n(b.end);b.colorInit=true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var o={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},r=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,
d){if(f.isFunction(b)){d=b;b=null}return this.queue("fx",function(){var e=f(this),g=e.attr("style")||" ",h=q(p.call(this)),l,v=e.attr("className");f.each(r,function(w,i){c[i]&&e[i+"Class"](c[i])});l=q(p.call(this));e.attr("className",v);e.animate(u(h,l),a,b,function(){f.each(r,function(w,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments)});h=f.queue(this);l=h.splice(h.length-1,1)[0];
h.splice(1,0,l);f.dequeue(this)})};f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,
a):f.effects.animateClass.apply(this,[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.11",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,
a){var b;switch(c[0]){case "top":b=0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",
border:"none",margin:0,padding:0});c.wrap(b);b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(d,e){a[e]=c.css(e);if(isNaN(parseInt(a[e],10)))a[e]="auto"});c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return b.css(a).show()},removeWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent().replaceWith(c);
return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments),b={options:a[1],duration:a[2],callback:a[3]};a=b.options.mode;var d=f.effects[c];if(f.fx.off||!d)return a?this[a](b.duration,b.callback):this.each(function(){b.callback&&b.callback.call(this)});return d.call(this,b)},_show:f.fn.show,show:function(c){if(m(c))return this._show.apply(this,arguments);
else{var a=k.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(m(c))return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(m(c)||typeof c==="boolean"||f.isFunction(c))return this.__toggle.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),
b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,
a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(c,a,b,d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,
a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,10*(a/e-1))+b},easeOutExpo:function(c,a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==
e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=
g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/
h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,
a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+b;return f.easing.easeOutBounce(c,a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
;/*
 * jQuery UI Effects Slide 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(c){c.effects.slide=function(d){return this.queue(function(){var a=c(this),h=["position","top","bottom","left","right"],f=c.effects.setMode(a,d.options.mode||"show"),b=d.options.direction||"left";c.effects.save(a,h);a.show();c.effects.createWrapper(a).css({overflow:"hidden"});var g=b=="up"||b=="down"?"top":"left";b=b=="up"||b=="left"?"pos":"neg";var e=d.options.distance||(g=="top"?a.outerHeight({margin:true}):a.outerWidth({margin:true}));if(f=="show")a.css(g,b=="pos"?isNaN(e)?"-"+e:-e:e);
var i={};i[g]=(f=="show"?b=="pos"?"+=":"-=":b=="pos"?"-=":"+=")+e;a.animate(i,{queue:false,duration:d.duration,easing:d.options.easing,complete:function(){f=="hide"&&a.hide();c.effects.restore(a,h);c.effects.removeWrapper(a);d.callback&&d.callback.apply(this,arguments);a.dequeue()}})})}})(jQuery);
;/*
 * jQuery UI Effects Transfer 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(e){e.effects.transfer=function(a){return this.queue(function(){var b=e(this),c=e(a.options.to),d=c.offset();c={top:d.top,left:d.left,height:c.innerHeight(),width:c.innerWidth()};d=b.offset();var f=e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(a.options.className).css({top:d.top,left:d.left,height:b.innerHeight(),width:b.innerWidth(),position:"absolute"}).animate(c,a.duration,a.options.easing,function(){f.remove();a.callback&&a.callback.apply(b[0],arguments);
b.dequeue()})})}})(jQuery);
;


/*js/libs/dragscrollable.js*/
/*!
 * jQuery dragscrollable Plugin
 * version: 1.0 (25-Jun-2009)
 * Copyright (c) 2009 Miquel Herrera
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Modified by David Richard (2011)
 *   - added delegateMode option
 */
;
(function($) { // secure $ jQuery alias

	/**
	 * <pre>
	 * Adds the ability to manage elements scroll by dragging
	 * one or more of its descendant elements. Options parameter
	 * allow to specifically select which inner elements will
	 * respond to the drag events.
	 * 
	 * options properties:
	 * ------------------------------------------------------------------------		
	 *  dragSelector         | jquery selector to apply to each wrapped element 
	 *                       | to find which will be the dragging elements. 
	 *                       | Defaults to '&gt;:first' which is the first child of 
	 *                       | scrollable element
	 * ------------------------------------------------------------------------		
	 *  acceptPropagatedEvent| Will the dragging element accept propagated 
	 *                       | events? default is yes, a propagated mouse event 
	 *                       | on a inner element will be accepted and processed.
	 *                       | If set to false, only events originated on the
	 *                       | draggable elements will be processed.
	 * ------------------------------------------------------------------------
	 *  preventDefault       | Prevents the event to propagate further effectivey
	 *                       | dissabling other default actions. Defaults to true
	 * ------------------------------------------------------------------------
	 *  delegateMode	     | Attach the dragSelector using $.delegate() instead of $.bind()
	 *  
	 *  usage examples:
	 *  To add the scroll by drag to the element id=viewport when dragging its 
	 *  first child accepting any propagated events
	 * $('#viewport').dragscrollable(); 
	 *  To add the scroll by drag ability to any element div of class viewport
	 *  when dragging its first descendant of class dragMe responding only to
	 *  evcents originated on the '.dragMe' elements.
	 * $('div.viewport').dragscrollable({dragSelector:'.dragMe:first',
	 * 								  acceptPropagatedEvent: false});
	 *  Notice that some 'viewports' could be nested within others but events
	 *  would not interfere as acceptPropagatedEvent is set to false.
	 * </pre>
	 */
	$.fn.dragscrollable = function(options) {

		var settings = $.extend({
			dragSelector : '>:first',
			acceptPropagatedEvent : true,
			preventDefault : true,
			delegateMode : false
		}, options || {});

		var dragscroll = {
			mouseDownHandler : function(event) {
				// mousedown, left click, check propagation
				// if (event.which != 1
				// || (!event.data.acceptPropagatedEvent && event.target !=
				// this)) {
				// return false;
				// }

				// fix:
				// http://plugins.jquery.com/content/problems-input-boxes-inside-elements-draggable-area
				if (event.which != 1) {
					return false;
				} else if (!event.data.acceptPropagatedEvent) {
					if ((event.target.localName == "input")
							|| (event.target.localName == "textarea")) {
						return true;
					} else if (event.target != this) {
						return false;
					}
				}

				// Initial coordinates will be the last when dragging
				event.data.lastCoord = {
					left : event.clientX,
					top : event.clientY
				};

				$.event.add(document, "mouseup", dragscroll.mouseUpHandler,
						event.data);
				$.event.add(document, "mousemove", dragscroll.mouseMoveHandler,
						event.data);
				if (event.data.preventDefault) {
					event.preventDefault();
					return false;
				}
			},
			mouseMoveHandler : function(event) { // User is dragging
				// How much did the mouse move?
				var delta = {
					left : (event.clientX - event.data.lastCoord.left),
					top : (event.clientY - event.data.lastCoord.top)
				};

				// Set the scroll position relative to what ever the scroll is
				// now
				event.data.scrollable.scrollLeft(event.data.scrollable
						.scrollLeft()
						- delta.left);
				event.data.scrollable.scrollTop(event.data.scrollable
						.scrollTop()
						- delta.top);

				// Save where the cursor is
				event.data.lastCoord = {
					left : event.clientX,
					top : event.clientY
				};
				if (event.data.preventDefault) {
					event.preventDefault();
					return false;
				}

			},
			mouseUpHandler : function(event) { // Stop scrolling
				$.event.remove(document, "mousemove",
						dragscroll.mouseMoveHandler);
				$.event.remove(document, "mouseup", dragscroll.mouseUpHandler);
				if (event.data.preventDefault) {
					event.preventDefault();
					return false;
				}
			}
		};

		// set up the initial events
		this.each(function() {
			// closure object data for each scrollable element
			var data = {
				scrollable : $(this),
				acceptPropagatedEvent : settings.acceptPropagatedEvent,
				preventDefault : settings.preventDefault
			};

			// Set mouse initiating event on the desired descendant
			if (settings.delegateMode) {
				$(this).delegate(settings.dragSelector, 'mousedown', data,
						dragscroll.mouseDownHandler);
			} else {
				$(this).find(settings.dragSelector).bind('mousedown', data,
						dragscroll.mouseDownHandler);
			}

		});
	}; // end plugin dragscrollable

})(jQuery); // confine scope


/*js/libs/jquery.hotkeys.js*/
/*!
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" ");
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				 event.target.type === "text") ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );


/*js/libs/jquery.mousewheel.js*/
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(jQuery);


/*js/libs/jquery.minicolors.js*/
/*!
 * jQuery miniColors: A small color selector
 *
 * Copyright 2011 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Dual licensed under the MIT or GPL Version 2 licenses
 *
 */
/*
 * Usage:
 *
 *	1. Link to jQuery: <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
 *
 *  2. Link to miniColors: <script type="text/javascript" src="jquery.miniColors.js"></script>
 *
 *  3. Include miniColors stylesheet: <link type="text/css" rel="stylesheet" href="jquery.miniColors.css" />
 *
 *	4. Apply $([selector]).miniColors() to one or more INPUT elements
 *
 *
 * Options:
 *
 *	disabled		[true|false]
 *	readonly		[true|false]
 *
 *
 *  Specify options on creation:
 *
 *		$([selector]).miniColors({
 *
 *			optionName: value,
 *			optionName: value,
 *			...
 *
 *		});
 *
 *
 * Methods:
 *
 *	Call a method using: $([selector]).miniColors('methodName', [value]);
 *
 *	disabled		[true|false]
 *	readonly		[true|false]
 *	value			[hex value]
 *	destroy
 *
 *
 * Events:
 *
 *	Attach events on creation:
 *
 *		$([selector]).miniColors({
 *
 *			change: function(hex, rgb) { ... }
 *
 *		});
 *
 *	change(hex, rgb)	called when the color value changes; 'this' will refer to the original input element;
 *                      hex is the string hex value of the selected color; rgb is an object with the RGB values
 *
 *
 * Change log:
 *
 *	- v0.1 (2011-02-24) - Initial release
 *
 *
 * Attribution:
 *
 *	- The color picker icon is based on an icon from the amazing Fugue icon set: 
 *    http://p.yusukekamiyamane.com/
 *
 *	- The gradient image, the hue image, and the math functions are courtesy of 
 *    the eyecon.co jQuery color picker: http://www.eyecon.ro/colorpicker/
 *
 *
*/


/*
 * Changes by David (20/05/2011):
 * - added hide callback
 * - center colorpicker beneath trigger element (hardcoded) 
 * - add invisible overlay
 */

/*
 * Changes by David (25/04/2012):
 * - Add move callback
 */
if(jQuery) (function($) {
	
	$.extend($.fn, {
		
		miniColors: function(o, data) {
			
			
			var create = function(input, o, data) {
				
				//
				// Creates a new instance of the miniColors selector
				//
				
				// Determine initial color (defaults to white)
				var color = cleanHex(input.val());
				if( !color ) color = 'FFFFFF';
				var hsb = hex2hsb(color);
				
				// Create trigger
				var trigger = $('<a class="miniColors-trigger" style="background-color: #' + color + '" href="#"></a>');
				trigger.insertAfter(input);
				
				// Add necessary attributes
				input.addClass('miniColors').attr('maxlength', 7).attr('autocomplete', 'off');
				
				// Set input data
				input.data('trigger', trigger);
				input.data('hsb', hsb);
				if( o.change ) input.data('change', o.change);
				if (o.hide) input.data('hide', o.hide);
				if (o.move) input.data('move', o.move);
				
				// Handle options
				if( o.readonly ) input.attr('readonly', true);
				if( o.disabled ) disable(input);
				
				// Show selector when trigger is clicked
				trigger.bind('click.miniColors', function(event) {
					event.preventDefault();
					input.trigger('focus');
				});
				
				// Show selector when input receives focus
				input.bind('focus.miniColors', function(event) {
					show(input);
				});
				
				// Hide on blur
				input.bind('blur.miniColors', function(event) {
					var hex = cleanHex(input.val());
					input.val( hex ? '#' + hex : '' );
				});
				
				// Hide when tabbing out of the input
				input.bind('keydown.miniColors', function(event) {
					if( event.keyCode === 9 ) hide(input);
				});
				
				// Update when color is typed in
				input.bind('keyup.miniColors', function(event) {
					// Remove non-hex characters
					var filteredHex = input.val().replace(/[^A-F0-9#]/ig, '');
					input.val(filteredHex);
					if( !setColorFromInput(input) ) {
						// Reset trigger color when color is invalid
						input.data('trigger').css('backgroundColor', '#FFF');
					}
				});
				
				// Handle pasting
				input.bind('paste.miniColors', function(event) {
					// Short pause to wait for paste to complete
					setTimeout( function() {
						input.trigger('keyup');
					}, 5);
				});
				
			};
			
			
			var destroy = function(input) {
				
				//
				// Destroys an active instance of the miniColors selector
				//
				
				hide();
				
				input = $(input);
				input.data('trigger').remove();
				input.removeAttr('autocomplete');
				input.removeData('trigger');
				input.removeData('selector');
				input.removeData('hsb');
				input.removeData('huePicker');
				input.removeData('colorPicker');
				input.removeData('mousebutton');
				input.removeData('moving');
				input.unbind('click.miniColors');
				input.unbind('focus.miniColors');
				input.unbind('blur.miniColors');
				input.unbind('keyup.miniColors');
				input.unbind('keydown.miniColors');
				input.unbind('paste.miniColors');
				
			};
			
			
			var enable = function(input) {
				
				//
				// Disables the input control and the selector
				//
				
				input.attr('disabled', false);
				input.data('trigger').css('opacity', 1);
				
			};
			
			
			var disable = function(input) {
				
				//
				// Disables the input control and the selector
				//
				
			
				input.attr('disabled', true);
				input.data('trigger').css('opacity', .5);
				hide(input);
				
			};
			
			
			var show = function(input) {
				
				//
				// Shows the miniColors selector
				//
				
				if( input.attr('disabled') ) return false;
				
				// Hide all other instances 
				hide();				
				
				// Generate the selector
				var selector = $('<div class="miniColors-selector"></div>');
				selector.append('<div class="miniColors-colors" style="background-color: #FFF;"><div class="miniColors-colorPicker"></div></div>');
				selector.append('<div class="miniColors-hues"><div class="miniColors-huePicker"></div></div>');
				selector.css({
					top: input.is(':visible') ? input.offset().top + input.outerHeight() : input.data('trigger').offset().top + input.data('trigger').outerHeight(),
					left: input.is(':visible') ? input.offset().left : input.data('trigger').offset().left - /** david: hack! - align middle*/ 87,
					display: 'none'
				}).addClass( input.attr('class') );
				
				// Set background for colors
				var hsb = input.data('hsb');
				selector.find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({ h: hsb.h, s: 100, b: 100 }));
				
				// Set colorPicker position
				var colorPosition = input.data('colorPosition');
				if( !colorPosition ) colorPosition = getColorPositionFromHSB(hsb);
				selector.find('.miniColors-colorPicker').css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');
				
				// Set huePicker position
				var huePosition = input.data('huePosition');
				if( !huePosition ) huePosition = getHuePositionFromHSB(hsb);
				selector.find('.miniColors-huePicker').css('top', huePosition.y + 'px');
				
				
				// Set input data
				input.data('selector', selector);
				input.data('huePicker', selector.find('.miniColors-huePicker'));
				input.data('colorPicker', selector.find('.miniColors-colorPicker'));
				input.data('mousebutton', 0);
				
				// invisible overlay accept clicks outside the color picker area
				var $overlay = $("<div class='miniColors-overlay no-select'/>").css({
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					"z-index": 10000
				}).appendTo("BODY").mousedown(function(){
					hide(input);
					$overlay.remove();
				});
				
				$('BODY').append(selector);
				
				
				
				selector.fadeIn(100);
				
				// Prevent text selection in IE
				selector.bind('selectstart', function() { return false; });
				
				selector.bind('mousedown.miniColors', function(event) {
					input.data('mousebutton', 1);
					
					if( $(event.target).hasClass('miniColors-colors') ) {
						event.preventDefault();
						input.data('moving', 'colors');
						moveColor(input, event);
					}
					
					if( $(event.target).hasClass('miniColors-hues') ) {
						event.preventDefault();
						input.data('moving', 'hues');
						moveHue(input, event);
					}

          if (input.data('move')) {
            input.data('move').call(input, input.val());
          }
				});
				
				selector.bind('mouseup.miniColors', function(event) {
					input.data('mousebutton', 0);
					input.removeData('moving');
				});
				
				selector.bind('mousemove.miniColors', function(event) {
					if( input.data('mousebutton') === 1 ) {
						if( input.data('moving') === 'colors' ) moveColor(input, event);
						if( input.data('moving') === 'hues' ) moveHue(input, event);

            if (input.data('move')) {
              input.data('move').call(input, input.val());
            }
					}
				});
				
			};
			
			
			var hide = function(input) {
				
				// call hide callback
				if (input) {
					if( input.data('hide') ) {
						input.data('hide').call(input, input.val());
					}
				}
				//
				// Hides one or more miniColors selectors
				//
				
				// Hide all other instances if input isn't specified
				if( !input ) input = '.miniColors';
				
				$(input).each( function() {
					var selector = $(this).data('selector');
					$(this).removeData('selector');
					$(selector).fadeOut(100, function() {
						$(this).remove();
					});
				});
			};
			
			
			var moveColor = function(input, event) {
				
				var colorPicker = input.data('colorPicker');
				
				colorPicker.hide();
				
				var position = {
					x: event.clientX - input.data('selector').find('.miniColors-colors').offset().left + $(document).scrollLeft() - 5,
					y: event.clientY - input.data('selector').find('.miniColors-colors').offset().top + $(document).scrollTop() - 5
				};
				
				if( position.x <= -5 ) position.x = -5;
				if( position.x >= 144 ) position.x = 144;
				if( position.y <= -5 ) position.y = -5;
				if( position.y >= 144 ) position.y = 144;
				input.data('colorPosition', position);
				colorPicker.css('left', position.x).css('top', position.y).show();
				
				// Calculate saturation
				var s = Math.round((position.x + 5) * .67);
				if( s < 0 ) s = 0;
				if( s > 100 ) s = 100;
				
				// Calculate brightness
				var b = 100 - Math.round((position.y + 5) * .67);
				if( b < 0 ) b = 0;
				if( b > 100 ) b = 100;
				
				// Update HSB values
				var hsb = input.data('hsb');
				hsb.s = s;
				hsb.b = b;
				
				// Set color
				setColor(input, hsb, true);
				
			};
			
			
			var moveHue = function(input, event) {
				
				var huePicker = input.data('huePicker');
				
				huePicker.hide();
				
				var position = {
					y: event.clientY - input.data('selector').find('.miniColors-colors').offset().top + $(document).scrollTop() - 1
				};
				
				if( position.y <= -1 ) position.y = -1;
				if( position.y >= 149 ) position.y = 149;
				input.data('huePosition', position);
				huePicker.css('top', position.y).show();
				
				// Calculate hue
				var h = Math.round((150 - position.y - 1) * 2.4);
				if( h < 0 ) h = 0;
				if( h > 360 ) h = 360;
				
				// Update HSB values
				var hsb = input.data('hsb');
				hsb.h = h;
				
				// Set color
				setColor(input, hsb, true);
				
			};
			
			
			var setColor = function(input, hsb, updateInputValue) {
				
				input.data('hsb', hsb);
				var hex = hsb2hex(hsb);	
				if( updateInputValue ) input.val('#' + hex);
				input.data('trigger').css('backgroundColor', '#' + hex);
				if( input.data('selector') ) input.data('selector').find('.miniColors-colors').css('backgroundColor', '#' + hsb2hex({ h: hsb.h, s: 100, b: 100 }));
				
				if( input.data('change') ) {
					input.data('change').call(input, '#' + hex, hsb2rgb(hsb));
				}
				
			};
			
			
			var setColorFromInput = function(input) {
				
				// Don't update if the hex color is invalid
				var hex = cleanHex(input.val());
				if( !hex ) return false;
				
				// Get HSB equivalent
				var hsb = hex2hsb(hex);
				
				// If color is the same, no change required
				var currentHSB = input.data('hsb');
				if( hsb.h === currentHSB.h && hsb.s === currentHSB.s && hsb.b === currentHSB.b ) return true;
				
				// Set colorPicker position
				var colorPosition = getColorPositionFromHSB(hsb);
				var colorPicker = $(input.data('colorPicker'));
				colorPicker.css('top', colorPosition.y + 'px').css('left', colorPosition.x + 'px');
				
				// Set huePosition position
				var huePosition = getHuePositionFromHSB(hsb);
				var huePicker = $(input.data('huePicker'));
				huePicker.css('top', huePosition.y + 'px');
				
				setColor(input, hsb, false);
				
				return true;
				
			};
			
			
			var getColorPositionFromHSB = function(hsb) {
				
				var x = Math.ceil(hsb.s / .67);
				if( x < 0 ) x = 0;
				if( x > 150 ) x = 150;
				
				var y = 150 - Math.ceil(hsb.b / .67);
				if( y < 0 ) y = 0;
				if( y > 150 ) y = 150;
				
				return { x: x - 5, y: y - 5 };
				
			}
			
			
			var getHuePositionFromHSB = function(hsb) {
				
				var y = 150 - (hsb.h / 2.4);
				if( y < 0 ) h = 0;
				if( y > 150 ) h = 150;				
				
				return { y: y - 1 };
				
			}
			
			
			var cleanHex = function(hex) {
				
				//
				// Turns a dirty hex string into clean, 6-character hex color
				//
				
				hex = hex.replace(/[^A-Fa-f0-9]/, '');
				
				if( hex.length == 3 ) {
					hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
				}
				
				return hex.length === 6 ? hex : null;
				
			};			
			
			
			var hsb2rgb = function(hsb) {
				var rgb = {};
				var h = Math.round(hsb.h);
				var s = Math.round(hsb.s*255/100);
				var v = Math.round(hsb.b*255/100);
				if(s == 0) {
					rgb.r = rgb.g = rgb.b = v;
				} else {
					var t1 = v;
					var t2 = (255 - s) * v / 255;
					var t3 = (t1 - t2) * (h % 60) / 60;
					if( h == 360 ) h = 0;
					if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
					else if( h<120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
					else if( h<180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
					else if( h<240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
					else if( h<300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
					else if( h<360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
					else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
				}
				return {
					r: Math.round(rgb.r),
					g: Math.round(rgb.g),
					b: Math.round(rgb.b)
				};
			};
			
			
			var rgb2hex = function(rgb) {
				
				var hex = [
					rgb.r.toString(16),
					rgb.g.toString(16),
					rgb.b.toString(16)
				];
				$.each(hex, function(nr, val) {
					if (val.length == 1) hex[nr] = '0' + val;
				});
				
				return hex.join('');
			};
			
			
			var hex2rgb = function(hex) {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				
				return {
					r: hex >> 16,
					g: (hex & 0x00FF00) >> 8,
					b: (hex & 0x0000FF)
				};
			};
			
			
			var rgb2hsb = function(rgb) {
				var hsb = { h: 0, s: 0, b: 0 };
				var min = Math.min(rgb.r, rgb.g, rgb.b);
				var max = Math.max(rgb.r, rgb.g, rgb.b);
				var delta = max - min;
				hsb.b = max;
				hsb.s = max != 0 ? 255 * delta / max : 0;
				if( hsb.s != 0 ) {
					if( rgb.r == max ) {
						hsb.h = (rgb.g - rgb.b) / delta;
					} else if( rgb.g == max ) {
						hsb.h = 2 + (rgb.b - rgb.r) / delta;
					} else {
						hsb.h = 4 + (rgb.r - rgb.g) / delta;
					}
				} else {
					hsb.h = -1;
				}
				hsb.h *= 60;
				if( hsb.h < 0 ) {
					hsb.h += 360;
				}
				hsb.s *= 100/255;
				hsb.b *= 100/255;
				return hsb;
			};			
			
			
			var hex2hsb = function(hex) {
				var hsb = rgb2hsb(hex2rgb(hex));
				// Zero out hue marker for black, white, and grays (saturation === 0)
				if( hsb.s === 0 ) hsb.h = 360;
				return hsb;
			};
			
			
			var hsb2hex = function(hsb) {
				return rgb2hex(hsb2rgb(hsb));
			};

			
			//
			// Handle calls to $([selector]).miniColors()
			//
			switch(o) {
			
				case 'readonly':
					
					$(this).each( function() {
						$(this).attr('readonly', data);
					});
					
					return $(this);
					
					break;
				
				case 'disabled':
					
					$(this).each( function() {
						if( data ) {
							disable($(this));
						} else {
							enable($(this));
						}
					});
										
					return $(this);
			
				case 'value':
					
					$(this).each( function() {
						$(this).val(data).trigger('keyup');
					});
					
					return $(this);
					
					break;
					
				case 'destroy':
					
					$(this).each( function() {
						destroy($(this));
					});
										
					return $(this);
				
				default:
					
					if( !o ) o = {};
					
					$(this).each( function() {
						
						// Must be called on an input element
						if( $(this)[0].tagName.toLowerCase() !== 'input' ) return;
						
						// If a trigger is present, the control was already created
						if( $(this).data('trigger') ) return;
						
						// Create the control
						create($(this), o, data);
						
					});
										
					return $(this);
					
			}
			
			
		}

			
	});
	
})(jQuery);





/*js/libs/jquery.tmpl.js*/
/*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( jQuery, undefined ){
	var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

	function newTmplItem( options, parentItem, fn, data ) {
		// Returns a template item data structure for a new rendered instance of a template (a 'template item').
		// The content field is a hierarchical array of strings and nested items (to be
		// removed and replaced by nodes field of dom elements, once inserted in DOM).
		var newItem = {
			data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
			_wrap: parentItem ? parentItem._wrap : null,
			tmpl: null,
			parent: parentItem || null,
			nodes: [],
			calls: tiCalls,
			nest: tiNest,
			wrap: tiWrap,
			html: tiHtml,
			update: tiUpdate
		};
		if ( options ) {
			jQuery.extend( newItem, options, { nodes: [], parent: parentItem });
		}
		if ( fn ) {
			// Build the hierarchical content to be used during insertion into DOM
			newItem.tmpl = fn;
			newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
			newItem.key = ++itemKey;
			// Keep track of new template item, until it is stored as jQuery Data on DOM element
			(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
		}
		return newItem;
	}

	// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

			appendToTmplItems = newTmplItems || {};
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				ret = this;
			} else {
				for ( i = 0, l = insert.length; i < l; i++ ) {
					cloneIndex = i;
					elems = (i > 0 ? this.clone(true) : this).get();
					jQuery( insert[i] )[ original ]( elems );
					ret = ret.concat( elems );
				}
				cloneIndex = 0;
				ret = this.pushStack( ret, name, insert.selector );
			}
			tmplItems = appendToTmplItems;
			appendToTmplItems = null;
			jQuery.tmpl.complete( tmplItems );
			return ret;
		};
	});

	jQuery.fn.extend({
		// Use first wrapped element as template markup.
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( data, options, parentItem ) {
			return jQuery.tmpl( this[0], data, options, parentItem );
		},

		// Find which rendered template item the first wrapped DOM element belongs to
		tmplItem: function() {
			return jQuery.tmplItem( this[0] );
		},

		// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
		template: function( name ) {
			return jQuery.template( name, this[0] );
		},

		domManip: function( args, table, callback, options ) {
			if ( args[0] && jQuery.isArray( args[0] )) {
				var dmArgs = jQuery.makeArray( arguments ), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
				while ( i < elemsLength && !(tmplItem = jQuery.data( elems[i++], "tmplItem" ))) {}
				if ( tmplItem && cloneIndex ) {
					dmArgs[2] = function( fragClone ) {
						// Handler called by oldManip when rendered template has been inserted into DOM.
						jQuery.tmpl.afterManip( this, fragClone, callback );
					};
				}
				oldManip.apply( this, dmArgs );
			} else {
				oldManip.apply( this, arguments );
			}
			cloneIndex = 0;
			if ( !appendToTmplItems ) {
				jQuery.tmpl.complete( newTmplItems );
			}
			return this;
		}
	});

	jQuery.extend({
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( tmpl, data, options, parentItem ) {
			var ret, topLevel = !parentItem;
			if ( topLevel ) {
				// This is a top-level tmpl call (not from a nested template using {{tmpl}})
				parentItem = topTmplItem;
				tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
				wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
			} else if ( !tmpl ) {
				// The template item is already associated with DOM - this is a refresh.
				// Re-evaluate rendered template for the parentItem
				tmpl = parentItem.tmpl;
				newTmplItems[parentItem.key] = parentItem;
				parentItem.nodes = [];
				if ( parentItem.wrapped ) {
					updateWrapped( parentItem, parentItem.wrapped );
				}
				// Rebuild, without creating a new template item
				return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
			}
			if ( !tmpl ) {
				return []; // Could throw...
			}
			if ( typeof data === "function" ) {
				data = data.call( parentItem || {} );
			}
			if ( options && options.wrapped ) {
				updateWrapped( options, options.wrapped );
			}
			ret = jQuery.isArray( data ) ?
				jQuery.map( data, function( dataItem ) {
					return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
				}) :
				[ newTmplItem( options, parentItem, tmpl, data ) ];
			return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
		},

		// Return rendered template item for an element.
		tmplItem: function( elem ) {
			var tmplItem;
			if ( elem instanceof jQuery ) {
				elem = elem[0];
			}
			while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
			return tmplItem || topTmplItem;
		},

		// Set:
		// Use $.template( name, tmpl ) to cache a named template,
		// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
		// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

		// Get:
		// Use $.template( name ) to access a cached template.
		// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
		// will return the compiled template, without adding a name reference.
		// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
		// to $.template( null, templateString )
		template: function( name, tmpl ) {
			if (tmpl) {
				// Compile template and associate with name
				if ( typeof tmpl === "string" ) {
					// This is an HTML string being passed directly in.
					tmpl = buildTmplFn( tmpl )
				} else if ( tmpl instanceof jQuery ) {
					tmpl = tmpl[0] || {};
				}
				if ( tmpl.nodeType ) {
					// If this is a template block, use cached copy, or generate tmpl function and cache.
					tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
					// Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
					// This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
					// To correct this, include space in tag: foo="${ x }" -> foo="value of x"
				}
				return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
			}
			// Return named compiled template
			return name ? (typeof name !== "string" ? jQuery.template( null, name ):
				(jQuery.template[name] ||
					// If not in map, and not containing at least on HTML tag, treat as a selector.
					// (If integrated with core, use quickExpr.exec)
					jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null;
		},

		encode: function( text ) {
			// Do HTML encoding replacing < > & and ' and " by corresponding entities.
			return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		}
	});

	jQuery.extend( jQuery.tmpl, {
		tag: {
			"tmpl": {
				_default: { $2: "null" },
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
				// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
				// This means that {{tmpl foo}} treats foo as a template (which IS a function).
				// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
			},
			"wrap": {
				_default: { $2: "null" },
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			"each": {
				_default: { $2: "$index, $value" },
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: { $1: "true" },
				open: "}else if(($notnull_1) && $1a){"
			},
			"html": {
				// Unecoded expression evaluation.
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				// Encoded expression evaluation. Abbreviated form is ${}.
				_default: { $1: "$data" },
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				// Comment tag. Skipped by parser
				open: ""
			}
		},

		// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
		complete: function( items ) {
			newTmplItems = {};
		},

		// Call this from code which overrides domManip, or equivalent
		// Manage cloning/storing template items etc.
		afterManip: function afterManip( elem, fragClone, callback ) {
			// Provides cloned fragment ready for fixup prior to and after insertion into DOM
			var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

			// Return fragment to original caller (e.g. append) for DOM insertion
			callback.call( elem, fragClone );

			// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
			storeTmplItems( content );
			cloneIndex++;
		}
	});

	//========================== Private helper functions, used by code above ==========================

	function build( tmplItem, nested, content ) {
		// Convert hierarchical content into flat string array
		// and finally return array of fragments ready for DOM insertion
		var frag, ret = content ? jQuery.map( content, function( item ) {
			return (typeof item === "string") ?
				// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
				// This is a child template item. Build nested template.
				build( item, tmplItem, item._ctnt );
		}) :
		// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
		tmplItem;
		if ( nested ) {
			return ret;
		}

		// top-level template
		ret = ret.join("");

		// Support templates which have initial or final text nodes, or consist only of text
		// Also support HTML entities within the HTML markup.
		ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
			frag = jQuery( middle ).get();

			storeTmplItems( frag );
			if ( before ) {
				frag = unencode( before ).concat(frag);
			}
			if ( after ) {
				frag = frag.concat(unencode( after ));
			}
		});
		return frag ? frag : unencode( ret );
	}

	function unencode( text ) {
		// Use createElement, since createTextNode will not render HTML entities correctly
		var el = document.createElement( "div" );
		el.innerHTML = text;
		return jQuery.makeArray(el.childNodes);
	}

	// Generate a reusable function that will serve to render a template against data
	function buildTmplFn( markup ) {
		return new Function("jQuery","$item",
			// Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
			"var $=jQuery,call,__=[],$data=$item.data;" +

			// Introduce the data as local variables using with(){}
			"with($data){__.push('" +

			// Convert the template into pure JavaScript
			jQuery.trim(markup)
				.replace( /([\\'])/g, "\\$1" )
				.replace( /[\r\t\n]/g, " " )
				.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
				.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function( all, slash, type, fnargs, target, parens, args ) {
					var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
					if ( !tag ) {
						throw "Unknown template tag: " + type;
					}
					def = tag._default || [];
					if ( parens && !/\w$/.test(target)) {
						target += parens;
						parens = "";
					}
					if ( target ) {
						target = unescape( target );
						args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
						// Support for target being things like a.toLowerCase();
						// In that case don't call with template item as 'this' pointer. Just evaluate...
						expr = parens ? (target.indexOf(".") > -1 ? target + unescape( parens ) : ("(" + target + ").call($item" + args)) : target;
						exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
					} else {
						exprAutoFnDetect = expr = def.$1 || "null";
					}
					fnargs = unescape( fnargs );
					return "');" +
						tag[ slash ? "close" : "open" ]
							.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
							.split( "$1a" ).join( exprAutoFnDetect )
							.split( "$1" ).join( expr )
							.split( "$2" ).join( fnargs || def.$2 || "" ) +
						"__.push('";
				}) +
			"');}return __;"
		);
	}
	function updateWrapped( options, wrapped ) {
		// Build the wrapped content.
		options._wrap = build( options, true,
			// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
		).join("");
	}

	function unescape( args ) {
		return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
	}
	function outerHtml( elem ) {
		var div = document.createElement("div");
		div.appendChild( elem.cloneNode(true) );
		return div.innerHTML;
	}

	// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
	function storeTmplItems( content ) {
		var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
		for ( i = 0, l = content.length; i < l; i++ ) {
			if ( (elem = content[i]).nodeType !== 1 ) {
				continue;
			}
			elems = elem.getElementsByTagName("*");
			for ( m = elems.length - 1; m >= 0; m-- ) {
				processItemKey( elems[m] );
			}
			processItemKey( elem );
		}
		function processItemKey( el ) {
			var pntKey, pntNode = el, pntItem, tmplItem, key;
			// Ensure that each rendered template inserted into the DOM has its own template item,
			if ( (key = el.getAttribute( tmplItmAtt ))) {
				while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
				if ( pntKey !== key ) {
					// The next ancestor with a _tmplitem expando is on a different key than this one.
					// So this is a top-level element within this template item
					// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
					pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
					if ( !(tmplItem = newTmplItems[key]) ) {
						// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
						tmplItem = wrappedItems[key];
						tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode] );
						tmplItem.key = ++itemKey;
						newTmplItems[itemKey] = tmplItem;
					}
					if ( cloneIndex ) {
						cloneTmplItem( key );
					}
				}
				el.removeAttribute( tmplItmAtt );
			} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
				// This was a rendered element, cloned during append or appendTo etc.
				// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
				cloneTmplItem( tmplItem.key );
				newTmplItems[tmplItem.key] = tmplItem;
				pntNode = jQuery.data( el.parentNode, "tmplItem" );
				pntNode = pntNode ? pntNode.key : 0;
			}
			if ( tmplItem ) {
				pntItem = tmplItem;
				// Find the template item of the parent element.
				// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
				while ( pntItem && pntItem.key != pntNode ) {
					// Add this element as a top-level node for this rendered template item, as well as for any
					// ancestor items between this item and the item of its parent element
					pntItem.nodes.push( el );
					pntItem = pntItem.parent;
				}
				// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
				delete tmplItem._ctnt;
				delete tmplItem._wrap;
				// Store template item as jQuery data on the element
				jQuery.data( el, "tmplItem", tmplItem );
			}
			function cloneTmplItem( key ) {
				key = key + keySuffix;
				tmplItem = newClonedItems[key] =
					(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent ));
			}
		}
	}

	//---- Helper functions for template item ----

	function tiCalls( content, tmpl, data, options ) {
		if ( !content ) {
			return stack.pop();
		}
		stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
	}

	function tiNest( tmpl, data, options ) {
		// nested template, using {{tmpl}} tag
		return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
	}

	function tiWrap( call, wrapped ) {
		// nested template, using {{wrap}} tag
		var options = call.options || {};
		options.wrapped = wrapped;
		// Apply the template, which may incorporate wrapped content,
		return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
	}

	function tiHtml( filter, textOnly ) {
		var wrapped = this._wrap;
		return jQuery.map(
			jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
			function(e) {
				return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
	}

	function tiUpdate() {
		var coll = this.nodes;
		jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
		jQuery( coll ).remove();
	}
})( jQuery );


/*js/libs/swfobject.js*/
/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();


/*js/libs/downloadify.min.js*/
/*! Downloadify 0.2 (c) 2009 by Douglas Neiner. Licensed under the MIT license */
/* See http://github.com/dcneiner/Downloadify for license and more info */
(function(){Downloadify=window.Downloadify={queue:{},uid:new Date().getTime(),getTextForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getData();return""},getFileNameForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getFilename();return""},getDataTypeForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getDataType();return""},saveComplete:function(a){var b=Downloadify.queue[a];if(b)b.complete();return true},saveCancel:function(a){var b=Downloadify.queue[a];if(b)b.cancel();return true},saveError:function(a){var b=Downloadify.queue[a];if(b)b.error();return true},addToQueue:function(a){Downloadify.queue[a.queue_name]=a},getUID:function(a){if(a.id=="")a.id='downloadify_'+Downloadify.uid++;return a.id}};Downloadify.create=function(a,b){var c=(typeof(a)=="string"?document.getElementById(a):a);return new Downloadify.Container(c,b)};Downloadify.Container=function(d,e){var f=this;f.el=d;f.enabled=true;f.dataCallback=null;f.filenameCallback=null;f.data=null;f.filename=null;var g=function(){f.options=e;if(!f.options.append)f.el.innerHTML="";f.flashContainer=document.createElement('span');f.el.appendChild(f.flashContainer);f.queue_name=Downloadify.getUID(f.flashContainer);if(typeof(f.options.filename)==="function")f.filenameCallback=f.options.filename;else if(f.options.filename)f.filename=f.options.filename;if(typeof(f.options.data)==="function")f.dataCallback=f.options.data;else if(f.options.data)f.data=f.options.data;var a={queue_name:f.queue_name,width:f.options.width,height:f.options.height};var b={allowScriptAccess:'always'};var c={id:f.flashContainer.id,name:f.flashContainer.id};if(f.options.enabled===false)f.enabled=false;if(f.options.transparent===true)b.wmode="transparent";if(f.options.downloadImage)a.downloadImage=f.options.downloadImage;swfobject.embedSWF(f.options.swf,f.flashContainer.id,f.options.width,f.options.height,"10",null,a,b,c);Downloadify.addToQueue(f)};f.enable=function(){var a=document.getElementById(f.flashContainer.id);a.setEnabled(true);f.enabled=true};f.disable=function(){var a=document.getElementById(f.flashContainer.id);a.setEnabled(false);f.enabled=false};f.getData=function(){if(!f.enabled)return"";if(f.dataCallback)return f.dataCallback();else if(f.data)return f.data;else return""};f.getFilename=function(){if(f.filenameCallback)return f.filenameCallback();else if(f.filename)return f.filename;else return""};f.getDataType=function(){if(f.options.dataType)return f.options.dataType;return"string"};f.complete=function(){if(typeof(f.options.onComplete)==="function")f.options.onComplete()};f.cancel=function(){if(typeof(f.options.onCancel)==="function")f.options.onCancel()};f.error=function(){if(typeof(f.options.onError)==="function")f.options.onError()};g()};Downloadify.defaultOptions={swf:'media/downloadify.swf',downloadImage:'images/download.png',width:100,height:30,transparent:true,append:false,dataType:"string"}})();if(typeof(jQuery)!="undefined"){(function($){$.fn.downloadify=function(b){return this.each(function(){b=$.extend({},Downloadify.defaultOptions,b);var a=Downloadify.create(this,b);$(this).data('Downloadify',a)})}})(jQuery)};if(typeof(MooTools)!='undefined'){Element.implement({downloadify:function(a){a=$merge(Downloadify.defaultOptions,a);return this.store('Downloadify',Downloadify.create(this,a))}})};


/*js/libs/events.js*/
/*!
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * modified 10/06/2011 (david):
 * - make compatabile for browser
 * - added augment function
 * - added aliases publish, subscribe, unsubscribe  
 */
var EventEmitter = function() {
};

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
EventEmitter.prototype.setMaxListeners = function(n) {
	if (!this._events)
		this._events = {};
	this._events.maxListeners = n;
};

EventEmitter.prototype.emit = function(type) {
	// If there is no 'error' event listener then throw.
	if (type === 'error') {
		if (!this._events
				|| !this._events.error
				|| (Array.isArray(this._events.error) && !this._events.error.length)) {
			if (arguments[1] instanceof Error) {
				throw arguments[1]; // Unhandled 'error' event
			} else {
				throw new Error("Uncaught, unspecified 'error' event.");
			}
			return false;
		}
	}

	if (!this._events)
		return false;
	var handler = this._events[type];
	if (!handler)
		return false;

	if (typeof handler == 'function') {
		switch (arguments.length) {
		// fast cases
		case 1:
			handler.call(this);
			break;
		case 2:
			handler.call(this, arguments[1]);
			break;
		case 3:
			handler.call(this, arguments[1], arguments[2]);
			break;
		// slower
		default:
			var args = Array.prototype.slice.call(arguments, 1);
			handler.apply(this, args);
		}
		return true;

	} else if (Array.isArray(handler)) {
		var args = Array.prototype.slice.call(arguments, 1);

		var listeners = handler.slice();
		for ( var i = 0, l = listeners.length; i < l; i++) {
			listeners[i].apply(this, args);
		}
		return true;

	} else {
		return false;
	}
};

EventEmitter.prototype.publish = EventEmitter.prototype.emit;

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
	if ('function' !== typeof listener) {
		throw new Error('addListener only takes instances of Function');
	}

	if (!this._events)
		this._events = {};

	// To avoid recursion in the case that type == "newListeners"! Before
	// adding it to the listeners, first emit "newListeners".
	this.emit('newListener', type, listener);

	if (!this._events[type]) {
		// Optimize the case of one listener. Don't need the extra array object.
		this._events[type] = listener;
	} else if (Array.isArray(this._events[type])) {

		// If we've already got an array, just append.
		this._events[type].push(listener);

		// Check for listener leak
		if (!this._events[type].warned) {
			var m;
			if (this._events.maxListeners !== undefined) {
				m = this._events.maxListeners;
			} else {
				m = 10;
			}

			if (m && m > 0 && this._events[type].length > m) {
				this._events[type].warned = true;
				console.error('(node) warning: possible EventEmitter memory '
						+ 'leak detected. %d listeners added. '
						+ 'Use emitter.setMaxListeners() to increase limit.',
						this._events[type].length);
				console.trace();
			}
		}
	} else {
		// Adding the second element, need to change to array.
		this._events[type] = [ this._events[type], listener ];
	}

	return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.subscribe = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
	if ('function' !== typeof listener) {
		throw new Error('.once only takes instances of Function');
	}

	var self = this;
	function g() {
		self.removeListener(type, g);
		listener.apply(this, arguments);
	}
	;

	g.listener = listener;
	self.on(type, g);

	return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
	if ('function' !== typeof listener) {
		throw new Error('removeListener only takes instances of Function');
	}

	// does not use listeners(), so no side effect of creating _events[type]
	if (!this._events || !this._events[type])
		return this;

	var list = this._events[type];

	if (Array.isArray(list)) {
		var position = -1;
		for ( var i = 0, length = list.length; i < length; i++) {
			if (list[i] === listener
					|| (list[i].listener && list[i].listener === listener)) {
				position = i;
				break;
			}
		}

		if (position < 0)
			return this;
		list.splice(position, 1);
		if (list.length == 0)
			delete this._events[type];
	} else if (list === listener
			|| (list.listener && list.listener === listener)) {
		delete this._events[type];
	}

	return this;
};

EventEmitter.prototype.unsubscribe = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function(type) {
	if (arguments.length === 0) {
		this._events = {};
		return this;
	}

	// does not use listeners(), so no side effect of creating _events[type]
	if (type && this._events && this._events[type])
		this._events[type] = null;
	return this;
};

EventEmitter.prototype.listeners = function(type) {
	if (!this._events)
		this._events = {};
	if (!this._events[type])
		this._events[type] = [];
	if (!Array.isArray(this._events[type])) {
		this._events[type] = [ this._events[type] ];
	}
	return this._events[type];
};

/**
 * Augment an object with the EventEmitter mixin
 * 
 * @param {object} obj The object to be augmented
 */
EventEmitter.mixin = function(obj) {
	for ( var method in EventEmitter.prototype) {
		if (!obj.prototype[method]) {
			obj.prototype[method] = EventEmitter.prototype[method];
		}
	}
};


/*js/MindMaps.js*/
/*!
 *  mindmaps - a HTML5 powered mind mapping application
 *  Copyright (C) 2011  David Richard
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Make sure this is the first file to be referenced in index.hml.
 */

// Use ECMA5 strict mode. see:
// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

/**
 * @namespace Application wide namespace for mindmaps.
 */
var mindmaps = mindmaps || {};
mindmaps.VERSION = "0.7.2";


// experimental app cache invalidator. from:
// http://www.html5rocks.com/en/tutorials/appcache/beginner/#toc-updating-cache/
// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {
  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      window.applicationCache.swapCache();
      window.onbeforeunload = null;
      if (confirm('A new version of the app is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false)

/**
 * Start up. This function is executed when the DOM is loaded.
 */
$(function() {
  removeEventLayerXY();

  // take car of old browsers
  createECMA5Shims();
  createHTML5Shims();

  setupConsole();
  trackErrors();

  if (!mindmaps.DEBUG) {
    addUnloadHook();
  }

  // create a new app controller and go
  var appController = new mindmaps.ApplicationController();
  appController.go();
  if(window.proc_loadlast) proc_loadlast(true); //edit
  if(window.init_load) init_load();
});

/**
 * Remove layerX and layerY from the jQuery event object, it causes heaps of deprecated
 * warnings in WebKit browsers.
 * See: http://stackoverflow.com/questions/7825448/webkit-issues-with-event-layerx-and-event-layery
 *
 * Can be removed when upgrading to jQuery 1.7+.
 */
function removeEventLayerXY() {
  // remove layerX and layerY
  var all = $.event.props,
  len = all.length,
  res = [];

  while (len--) {
    var el = all[len];
    if (el != 'layerX' && el != 'layerY') res.push(el);
  }
  $.event.props = res;
}

/**
* Adds a confirmation dialog when the user navigates away from the app.
*/
//edit
function addUnloadHook(){
  window.onbeforeunload = function (e) {
	  if(window.proc_savelast) proc_savelast();
/*    var msg = "Are you sure? Any unsaved progress will be lost."
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = msg;
    }

    // For Safari
    return msg;*/
  };
}


function trackErrors() {
  window.onerror = function(msg, url, line) {
    if (!window._gaq) {
      return;
    }

    // Track JS errors in GA.
    _gaq.push([ '_trackEvent', 'Error Log', msg, url + '_' + line ]);

    return false; // false prevents default error handling.
  };
}

/**
* Initialize the console object.
*/
function setupConsole() {
  var noOp = function() {};

  // provide console object and dummy functions if not built-in
  var console = window.console || {};
  ['log', 'info', 'debug', 'warn', 'error'].forEach(function(prop) {
    console[prop] = console[prop] || noOp;
  });

  // turn all console.xx calls into no-ops when in production mode except
  // for errors, do an alert.
  if (!mindmaps.DEBUG) {
    console.debug = noOp;
    console.info = noOp;
    console.log = noOp;
    console.warn = noOp;
    console.error = function(s) {
      window.alert("Error: " + s);
    };
  }

  window.console = console;
}

// warum sind manche leute nur so drauf...
$(function() {
  $("#bottombar table").remove();
  $("input[name='hosted_button_id']").val("123");
});

/**
* Creates ECMA5 shims if the browser does not implement them.
*/
function createECMA5Shims() {
  // from: https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js

  // ES-5 15.3.4.5
  // http://www.ecma-international.org/publications/files/drafts/tc39-2009-025.pdf
  if (!Function.prototype.bind) {
    var slice = Array.prototype.slice;
    Function.prototype.bind = function bind(that) { // .length is 1
      var target = this;
      if (typeof target.apply !== "function"
      || typeof target.call !== "function")
      return new TypeError();
      var args = slice.call(arguments);

      function bound() {

        if (this instanceof bound) {

          var self = Object.create(target.prototype);
          target.apply(self, args.concat(slice.call(arguments)));
          return self;
        } else {
          return target.call.apply(target, args.concat(slice
            .call(arguments)));
        }

      }
      bound.length = (typeof target === "function" ? Math.max(
      target.length - args.length, 0) : 0);
      return bound;
    };
  }

  // ES5 15.4.3.2
  if (!Array.isArray) {
    Array.isArray = function isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
  }

  // ES5 15.4.4.18
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(block, thisObject) {
      var len = +this.length;
      for ( var i = 0; i < len; i++) {
        if (i in this) {
          block.call(thisObject, this[i], i, this);
        }
      }
    };
  }

  // ES5 15.4.4.19
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
  if (!Array.prototype.map) {
    Array.prototype.map = function map(fun /* , thisp */) {
      var len = +this.length;
      if (typeof fun !== "function")
        throw new TypeError();

      var res = new Array(len);
      var thisp = arguments[1];
      for ( var i = 0; i < len; i++) {
        if (i in this)
          res[i] = fun.call(thisp, this[i], i, this);
      }

      return res;
    };
  }

  // ES5 15.4.4.20
  if (!Array.prototype.filter) {
    Array.prototype.filter = function filter(block /* , thisp */) {
      var values = [];
      var thisp = arguments[1];
      for ( var i = 0; i < this.length; i++)
        if (block.call(thisp, this[i]))
          values.push(this[i]);
        return values;
    };
  }

  // ES5 15.4.4.16
  if (!Array.prototype.every) {
    Array.prototype.every = function every(block /* , thisp */) {
      var thisp = arguments[1];
      for ( var i = 0; i < this.length; i++)
        if (!block.call(thisp, this[i]))
          return false;
        return true;
    };
  }

  // ES5 15.4.4.17
  if (!Array.prototype.some) {
    Array.prototype.some = function some(block /* , thisp */) {
      var thisp = arguments[1];
      for ( var i = 0; i < this.length; i++)
        if (block.call(thisp, this[i]))
          return true;
        return false;
    };
  }

  // ES5 15.4.4.21
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function reduce(fun /* , initial */) {
      var len = +this.length;
      if (typeof fun !== "function")
        throw new TypeError();

      // no value to return if no initial value and an empty array
      if (len === 0 && arguments.length === 1)
        throw new TypeError();

      var i = 0;
      if (arguments.length >= 2) {
        var rv = arguments[1];
      } else {
        do {
          if (i in this) {
            rv = this[i++];
            break;
          }

          // if array contains no values, no initial value to return
          if (++i >= len)
            throw new TypeError();
        } while (true);
      }

      for (; i < len; i++) {
        if (i in this)
          rv = fun.call(null, rv, this[i], i, this);
      }

      return rv;
    };
  }

  // ES5 15.4.4.22
  // https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight
  if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function reduceRight(fun /* , initial */) {
      var len = +this.length;
      if (typeof fun !== "function")
        throw new TypeError();

      // no value to return if no initial value, empty array
      if (len === 0 && arguments.length === 1)
        throw new TypeError();

      var rv, i = len - 1;
      if (arguments.length >= 2) {
        rv = arguments[1];
      } else {
        do {
          if (i in this) {
            rv = this[i--];
            break;
          }

          // if array contains no values, no initial value to return
          if (--i < 0)
            throw new TypeError();
        } while (true);
      }

      for (; i >= 0; i--) {
        if (i in this)
          rv = fun.call(null, rv, this[i], i, this);
      }

      return rv;
    };
  }

  // ES5 15.4.4.14
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function indexOf(value /* , fromIndex */) {
      var length = this.length;
      if (!length)
        return -1;
      var i = arguments[1] || 0;
      if (i >= length)
        return -1;
      if (i < 0)
        i += length;
      for (; i < length; i++) {
        if (!(i in this))
          continue;
        if (value === this[i])
          return i;
      }
      return -1;
    };
  }

  // ES5 15.4.4.15
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function lastIndexOf(value) {
      var length = this.length;
      if (!length)
        return -1;
      var i = arguments[1] || length;
      if (i < 0)
        i += length;
      i = Math.min(i, length - 1);
      for (; i >= 0; i--) {
        if (!(i in this))
          continue;
        if (value === this[i])
          return i;
      }
      return -1;
    };
  }

  // ES5 15.9.4.4
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }
}

/**
* Create shims for HTML5 functionality if not supported by browser.
*/
function createHTML5Shims() {
  // localstorage dummy (does nothing)
  if (typeof window.localStorage == 'undefined') {
    window.localStorage = {
      getItem : function() {
        return null;
      },
      setItem : function() {
      },
      clear : function() {
      },
      removeItem : function() {
      },
      length : 0,
      key : function() {
        return null;
      }
    };
  }
}


/*js/Command.js*/
/**
 * Creates a new command. Base class for all commands
 * 
 * @constructor
 * @borrows EventEmitter
 */
mindmaps.Command = function() {
  this.id = "BASE_COMMAND";
  this.shortcut = null;
  /**
   * The handler function.
   * 
   * @private
   * @function
   */
  this.handler = null;
  this.label = null;
  this.description = null;

  /**
   * @private
   */
  this.enabled = false;
};

/**
 * Events that can be emitted by a command object.
 * @namespace
 */
mindmaps.Command.Event = {
  HANDLER_REGISTERED : "HandlerRegisteredCommandEvent",
  HANDLER_REMOVED : "HandlerRemovedCommandEvent",
  ENABLED_CHANGED : "EnabledChangedCommandEvent"
};

mindmaps.Command.prototype = {
  /**
   * Executes the command. Tries to call the handler function.
   */
  execute : function() {
    if (this.handler) {
      this.handler();
      if (mindmaps.DEBUG) {
        console.log("handler called for", this.id);
      }
    } else {
      if (mindmaps.DEBUG) {
        console.log("no handler found for", this.id);
      }
    }
  },

  /**
   * Registers a new handler.
   * 
   * @param {Function} handler
   */
  setHandler : function(handler) {
    this.removeHandler();
    this.handler = handler;
    this.publish(mindmaps.Command.Event.HANDLER_REGISTERED);
  },

  /**
   * Removes the current handler.
   */
  removeHandler : function() {
    this.handler = null;
    this.publish(mindmaps.Command.Event.HANDLER_REMOVED);
  },

  /**
   * Sets the enabled state of the command.
   * 
   * @param {Boolean} enabled
   */
  setEnabled : function(enabled) {
    this.enabled = enabled;
    this.publish(mindmaps.Command.Event.ENABLED_CHANGED, enabled);
  }
};
/**
 * Mixin EventEmitter into command objects.
 */
EventEmitter.mixin(mindmaps.Command);

/**
 * Node commands
 */

/**
 * Creates a new CreateNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.CreateNodeCommand = function() {
  this.id = "CREATE_NODE_COMMAND";
  this.shortcut = "tab";
  this.label = "Add";
  this.icon = "ui-icon-plusthick";
  this.description = "Creates a new node";
};
mindmaps.CreateNodeCommand.prototype = new mindmaps.Command();

/**
 * Creates a new CreateSiblingNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.CreateSiblingNodeCommand = function() {
  this.id = "CREATE_SIBLING_NODE_COMMAND";
  this.shortcut = "shift+tab";
  this.label = "Add";
  this.icon = "ui-icon-plusthick";
  this.description = "Creates a new sibling node";
};
mindmaps.CreateSiblingNodeCommand.prototype = new mindmaps.Command();

/**
 * Creates a new DeleteNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.DeleteNodeCommand = function() {
  this.id = "DELETE_NODE_COMMAND";
  this.shortcut = ["del", "backspace"];
  this.label = "Delete";
  this.icon = "ui-icon-minusthick";
  this.description = "Deletes a new node";
};
mindmaps.DeleteNodeCommand.prototype = new mindmaps.Command();

/**
 * Creates a new EditNodeCaptionCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.EditNodeCaptionCommand = function() {
  this.id = "EDIT_NODE_CAPTION_COMMAND";
  this.shortcut = ["F2", "return"];
  this.label = "Edit node caption";
  this.description = "Edits the node text";
};
mindmaps.EditNodeCaptionCommand.prototype = new mindmaps.Command();

/**
 * Creates a new ToggleNodeFoldedCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.ToggleNodeFoldedCommand = function() {
  this.id = "TOGGLE_NODE_FOLDED_COMMAND";
  this.shortcut = "space";
  this.description = "Show or hide the node's children";
};
mindmaps.ToggleNodeFoldedCommand.prototype = new mindmaps.Command();

/**
 * Undo commands
 */

/**
 * Creates a new UndoCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.UndoCommand = function() {
  this.id = "UNDO_COMMAND";
  this.shortcut = ["ctrl+z", "meta+z"];
  this.label = "Undo";
  this.icon = "ui-icon-arrowreturnthick-1-w";
  this.description = "Undo";
};
mindmaps.UndoCommand.prototype = new mindmaps.Command();

/**
 * Creates a new RedoCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.RedoCommand = function() {
  this.id = "REDO_COMMAND";
  this.shortcut = ["ctrl+y", "meta+shift+z"];
  this.label = "Redo";
  this.icon = "ui-icon-arrowreturnthick-1-e";
  this.description = "Redo";
};
mindmaps.RedoCommand.prototype = new mindmaps.Command();

/**
 * Clipboard commands
 */

/**
 * Creates a new CopyNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.CopyNodeCommand = function() {
  this.id = "COPY_COMMAND";
  this.shortcut = ["ctrl+c", "meta+c"];
  this.label = "Copy";
  this.icon = "ui-icon-copy";
  this.description = "Copy a branch";
};
mindmaps.CopyNodeCommand.prototype = new mindmaps.Command();

/**
 * Creates a new CutNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.CutNodeCommand = function() {
  this.id = "CUT_COMMAND";
  this.shortcut = ["ctrl+x", "meta+x"];
  this.label = "Cut";
  this.icon = "ui-icon-scissors";
  this.description = "Cut a branch";
};
mindmaps.CutNodeCommand.prototype = new mindmaps.Command();

/**
 * Creates a new PasteNodeCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.PasteNodeCommand = function() {
  this.id = "PASTE_COMMAND";
  this.shortcut = ["ctrl+v", "meta+v"];
  this.label = "Paste";
  this.icon = "ui-icon-clipboard";
  this.description = "Paste a branch";
};
mindmaps.PasteNodeCommand.prototype = new mindmaps.Command();

/**
 * Document commands
 */

/**
 * Creates a new NewDocumentCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.NewDocumentCommand = function() {
  this.id = "NEW_DOCUMENT_COMMAND";
  this.label = "New";
  this.icon = "ui-icon-document-b";
  this.description = "Start working on a new mind map";
};
mindmaps.NewDocumentCommand.prototype = new mindmaps.Command();

/**
 * Creates a new OpenDocumentCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.OpenDocumentCommand = function() {
  this.id = "OPEN_DOCUMENT_COMMAND";
  this.label = "Open...";
  this.shortcut = ["ctrl+o", "meta+o"];
  this.icon = "ui-icon-folder-open";
  this.description = "Open an existing mind map";
};
mindmaps.OpenDocumentCommand.prototype = new mindmaps.Command();

/**
 * Creates a new SaveDocumentCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.SaveDocumentCommand = function() {
  this.id = "SAVE_DOCUMENT_COMMAND";
  this.label = "Save...";
  this.shortcut = ["ctrl+s", "meta+s"];
  this.icon = "ui-icon-disk";
  this.description = "Save the mind map";
};
mindmaps.SaveDocumentCommand.prototype = new mindmaps.Command();

/**
 * Creates a new CloseDocumentCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.CloseDocumentCommand = function() {
  this.id = "CLOSE_DOCUMENT_COMMAND";
  this.label = "Close";
  this.icon = "ui-icon-close";
  this.description = "Close the mind map";
};
mindmaps.CloseDocumentCommand.prototype = new mindmaps.Command();

/**
 * Creates a new HelpCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.HelpCommand = function() {
  this.id = "HELP_COMMAND";
  this.enabled = true;
  this.icon = "ui-icon-help";
  this.label = "Help";
  this.shortcut = "F1";
  this.description = "Get help!";
};
mindmaps.HelpCommand.prototype = new mindmaps.Command();

/**
 * Creates a new PrintCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.PrintCommand = function() {
  this.id = "PRINT_COMMAND";
  this.icon = "ui-icon-print";
  this.label = "Print";
  this.shortcut = ["ctrl+p", "meta+p"];
  this.description = "Print the mind map";
};
mindmaps.PrintCommand.prototype = new mindmaps.Command();

/**
 * Creates a new ExportCommand.
 * 
 * @constructor
 * @augments mindmaps.Command
 */
mindmaps.ExportCommand = function() {
  this.id = "EXPORT_COMMAND";
  this.icon = "ui-icon-image";
  this.label = "Export As Image...";
  this.description = "Export the mind map";
};
mindmaps.ExportCommand.prototype = new mindmaps.Command();


/*js/CommandRegistry.js*/
/**
 * Creates a new CommandRegistry.
 * 
 * @constructor
 * @param {mindmaps.ShortcutController} [shortcutController]
 */
mindmaps.CommandRegistry = function(shortcutController) {
  this.commands = {};

  function registerShortcut(command) {
    if (command.shortcut && command.execute) {
      shortcutController.register(command.shortcut, command.execute
          .bind(command));
    }
  }

  function unregisterShortcut(command) {
    if (command.shortcut) {
      shortcutController.unregister(command.shortcut);
    }
  }

  /**
   * Returns a command object for the given command type.
   * 
   * @param commandType
   * @returns {mindmaps.Command} a command object.
   */
  this.get = function(commandType) {
    var command = this.commands[commandType];
    if (!command) {
      command = new commandType;
      this.commands[commandType] = command;

      if (shortcutController) {
        registerShortcut(command);
      }
    }
    return command;
  };

  /**
   * Removes the command object for the given command type.
   * 
   * @param commandType
   */
  this.remove = function(commandType) {
    // TODO remove by object
    var command = this.commands[commandType];
    if (!command) {
      return;
    }

    delete this.commands[commandType];

    if (shortcutController) {
      unregisterShortcut(command);
    }
  };
};


/*js/Action.js*/
/**
 * @namespace
 */
mindmaps.action = {};

/**
 * Creates a new action.
 * 
 * @constructor
 */
mindmaps.action.Action = function() {
};

mindmaps.action.Action.prototype = {
  /**
   * Make this action un-undoable.
   * 
   * @returns {Action}
   */
  noUndo : function() {
    delete this.undo;
    delete this.redo;
    return this;
  },

  /**
   * Don't emit an event after execution.
   * 
   * @returns {Action}
   */
  noEvent : function() {
    delete this.event;
    return this;
  },

  /**
   * Executes this action. Explicitly returning false will cancel this action
   * and not raise an event or undoable action.
   * 
   */
  execute : function() {
  },

  cancel : function() {
    this.cancelled = true;
  }
};

/**
 * Creates a new MoveNodeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {Point} offset
 */
mindmaps.action.MoveNodeAction = function(node, offset) {
  var oldOffset = node.offset;

  this.execute = function() {
    node.offset = offset;
  };

  this.event = [ mindmaps.Event.NODE_MOVED, node ];
  this.undo = function() {
    return new mindmaps.action.MoveNodeAction(node, oldOffset);
  };
};
mindmaps.action.MoveNodeAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new DeleteNodeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {mindmaps.MindMap} mindmap
 */
mindmaps.action.DeleteNodeAction = function(node, mindmap) {
  var parent = node.getParent();

  this.execute = function() {
    if (node.isRoot()) {
      return false;
    }
    mindmap.removeNode(node);
  };

  this.event = [ mindmaps.Event.NODE_DELETED, node, parent ];
  this.undo = function() {
    return new mindmaps.action.CreateNodeAction(node, parent, mindmap);
  };
};
mindmaps.action.DeleteNodeAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new CreateAutoPositionedNodeAction.
 * 
 * @constructor
 * @param {mindmaps.Node} parent
 * @param {mindmaps.MindMap} mindmap
 * @returns {CreateNodeAction}
 */
mindmaps.action.CreateAutoPositionedNodeAction = function(parent, mindmap) {
  if (parent.isRoot()) {
    var branchColor = mindmaps.Util.randomColor();

    // calculate position
    // magic formula
    var leftRight = Math.random() > 0.49 ? 1 : -1;
    var topBottom = Math.random() > 0.49 ? 1 : -1;
    var x = leftRight * (100 + Math.random() * 250);
    var y = topBottom * (Math.random() * 250);
  } else {
    var branchColor = parent.branchColor;

    // calculate position
    var leftRight = parent.offset.x > 0 ? 1 : -1;
    var x = leftRight * (150 + Math.random() * 10);

    // put into random height when child nodes are there
    if (parent.isLeaf()) {
      var max = 5, min = -5;
    } else {
      var max = 150, min = -150;
    }

    var y = Math.floor(Math.random() * (max - min + 1) + min);
  }
  var node = new mindmaps.Node();
  node.branchColor = branchColor;
  node.shouldEditCaption = true;
  node.offset = new mindmaps.Point(x, y);

  return new mindmaps.action.CreateNodeAction(node, parent, mindmap);
};

/**
 * Creates a new CreateNodeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {mindmaps.Node} parent
 * @param {mindmaps.MindMap} mindmap
 */
mindmaps.action.CreateNodeAction = function(node, parent, mindmap) {
  this.execute = function() {
    mindmap.addNode(node);
    parent.addChild(node);
  };

  this.event = [ mindmaps.Event.NODE_CREATED, node ];
  this.undo = function() {
    return new mindmaps.action.DeleteNodeAction(node, mindmap);
  };
};
mindmaps.action.CreateNodeAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new ToggleNodeFoldAction.
 * 
 * 
 * @constructor
 * @param {mindmaps.Node} node
 * @returns {Action}
 */
mindmaps.action.ToggleNodeFoldAction = function(node) {
  if (node.foldChildren) {
    return new mindmaps.action.OpenNodeAction(node);
  } else {
    return new mindmaps.action.CloseNodeAction(node);
  }
};

/**
 * Creates a new OpenNodeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 */
mindmaps.action.OpenNodeAction = function(node) {
  this.execute = function() {
    node.foldChildren = false;
  };

  this.event = [ mindmaps.Event.NODE_OPENED, node ];

};
mindmaps.action.OpenNodeAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new CloseNodeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 */
mindmaps.action.CloseNodeAction = function(node) {
  this.execute = function() {
    node.foldChildren = true;
  };

  this.event = [ mindmaps.Event.NODE_CLOSED, node ];

};
mindmaps.action.CloseNodeAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new ChangeNodeCaptionAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {String} caption
 */
mindmaps.action.ChangeNodeCaptionAction = function(node, caption) {
  var oldCaption = node.getCaption();

  this.execute = function() {
    // dont update if nothing has changed
    if (oldCaption === caption) {
      return false;
    }
    node.setCaption(caption);
  };

  this.event = [ mindmaps.Event.NODE_TEXT_CAPTION_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.ChangeNodeCaptionAction(node, oldCaption);
  };
};
mindmaps.action.ChangeNodeCaptionAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new ChageNodeFontSizeAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {Integer} step
 */
mindmaps.action.ChangeNodeFontSizeAction = function(node, step) {
  this.execute = function() {
    node.text.font.size += step;
  };

  this.event = [ mindmaps.Event.NODE_FONT_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.ChangeNodeFontSizeAction(node, -step);
  };
};
mindmaps.action.ChangeNodeFontSizeAction.prototype = new mindmaps.action.Action();

/**
 * @constructor
 * @param {mindmaps.Node} node
 * @returns {ChangeNodeFontSizeAction}
 */
mindmaps.action.DecreaseNodeFontSizeAction = function(node) {
  return new mindmaps.action.ChangeNodeFontSizeAction(node, -4);
};

/**
 * @constructor
 * @param {mindmaps.Node} node
 * @returns {ChangeNodeFontSizeAction}
 */
mindmaps.action.IncreaseNodeFontSizeAction = function(node) {
  return new mindmaps.action.ChangeNodeFontSizeAction(node, 4);
};

/**
 * Creates a new SetFontWeightAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {Boolean} bold
 */
mindmaps.action.SetFontWeightAction = function(node, bold) {
  this.execute = function() {
    var weight = bold ? "bold" : "normal";
    node.text.font.weight = weight;
  };

  this.event = [ mindmaps.Event.NODE_FONT_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.SetFontWeightAction(node, !bold);
  };
};
mindmaps.action.SetFontWeightAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new SetFontStyleAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {Boolean} italic
 */
mindmaps.action.SetFontStyleAction = function(node, italic) {
  this.execute = function() {
    var style = italic ? "italic" : "normal";
    node.text.font.style = style;
  };

  this.event = [ mindmaps.Event.NODE_FONT_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.SetFontStyleAction(node, !italic);
  };
};
mindmaps.action.SetFontStyleAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new SetFontDecorationAction. Possible styles: "none", "underline",
 * "line-through".
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {String} style
 */
mindmaps.action.SetFontDecorationAction = function(node, style) {
  var oldDecoration = node.text.font.decoration;
  this.execute = function() {
    node.text.font.decoration = style;
  };

  this.event = [ mindmaps.Event.NODE_FONT_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.SetFontDecorationAction(node, oldDecoration);
  };
};
mindmaps.action.SetFontDecorationAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new SetFontColorAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {String} fontColor color as hex
 */
mindmaps.action.SetFontColorAction = function(node, fontColor) {
  var oldColor = node.text.font.color;
  this.execute = function() {
    node.text.font.color = fontColor;
  };

  this.event = [ mindmaps.Event.NODE_FONT_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.SetFontColorAction(node, oldColor);
  };
};
mindmaps.action.SetFontColorAction.prototype = new mindmaps.action.Action();

/**
 * Creates a new SetBranchColorAction.
 * 
 * @constructor
 * @augments mindmaps.action.Action
 * @param {mindmaps.Node} node
 * @param {String} branchColor color as hex
 */
mindmaps.action.SetBranchColorAction = function(node, branchColor) {
  var oldColor = node.branchColor;
  this.execute = function() {
    if (branchColor === node.branchColor) {
      return false;
    }
    node.branchColor = branchColor;
  };

  this.event = [ mindmaps.Event.NODE_BRANCH_COLOR_CHANGED, node ];
  this.undo = function() {
    return new mindmaps.action.SetBranchColorAction(node, oldColor);
  };
};
mindmaps.action.SetBranchColorAction.prototype = new mindmaps.action.Action();

/**
* A composite action is a group of actions.
*/
mindmaps.action.CompositeAction = function() {
  this.actions = [];
};

mindmaps.action.CompositeAction.prototype.addAction = function(action) {
  this.actions.push(action);
};

/**
* Apply fn on each action.
*/
mindmaps.action.CompositeAction.prototype.forEachAction = function(fn) {
  this.actions.forEach(fn)
};


/**
* Changes the branch color of all the node's children to branch
* color of the node.
*/
mindmaps.action.SetChildrenBranchColorAction = function(node) {
  mindmaps.action.CompositeAction.call(this);
  var branchColor = node.branchColor;
  var self = this;

  node.forEachDescendant(function(desc) {
    self.addAction(new mindmaps.action.SetBranchColorAction(desc, branchColor)); 
  });
}
mindmaps.action.SetChildrenBranchColorAction.prototype = new mindmaps.action.CompositeAction();


/*js/Util.js*/
/**
 * @namespace
 */
mindmaps.Util = mindmaps.Util || {};

/**
 * Tracks an event to google analytics.
 */
mindmaps.Util.trackEvent = function(category, action, label) {
    if (!window._gaq) {
      return;
    }

    if (label) {
      _gaq.push([ '_trackEvent', category, action, label]);
    } else {
      _gaq.push([ '_trackEvent', category, action]);
    }
}

/**
 * Creates a UUID in compliance with RFC4122.
 * 
 * @static
 * @returns {String} a unique id
 */
mindmaps.Util.createUUID = function() {
  // http://www.ietf.org/rfc/rfc4122.txt
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Returns an ID used by model objects.
 * 
 * @returns {String} id
 */
mindmaps.Util.getId = function() {
  return mindmaps.Util.createUUID();
};

/**
 * Creates a random color.
 * 
 * @returns {String} color in hex format
 */
mindmaps.Util.randomColor = function() {
  // http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript/5365036#5365036
  // return "#"+((1<<24)*Math.random()|0).toString(16);

  // http://paulirish.com/2009/random-hex-color-code-snippets/#comment-34808
  // return '#'+~~(Math.random()*(1<<24)).toString(16);

  // http://paulirish.com/2009/random-hex-color-code-snippets/#comment-34878
  return (function(h) {
    return '#000000'.substr(0, 7 - h.length) + h;
  })((~~(Math.random() * (1 << 24))).toString(16));
};


mindmaps.Util.getUrlParams = function() {
  // http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript/2880929#2880929
  var urlParams = {};
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       urlParams[d(e[1])] = d(e[2]);
    
  return urlParams;
};

function timeit(func, caption) {
  var start = new Date().getTime();
  func();
  var stop = new Date().getTime();
  var diff = stop - start;
  console.log(caption || "", diff, "ms");
}

mindmaps.Util.distance = function(offsetX, offsetY) {
  return Math.sqrt(offsetX * offsetX + offsetY * offsetY);
};


/**
 * test Default documents
 */

function getBinaryMapWithDepth(depth) {
  var mm = new mindmaps.MindMap();
  var root = mm.root;

  function createTwoChildren(node, depth) {
    if (depth === 0) {
      return;
    }

    var left = mm.createNode();
    left.text.caption = "Node " + left.id;
    node.addChild(left);
    createTwoChildren(left, depth - 1);

    var right = mm.createNode();
    right.text.caption = "Node " + right.id;
    node.addChild(right);
    createTwoChildren(right, depth - 1);
  }

  // depth 10: about 400kb, 800kb in chrome
  // depth 12: about 1600kb
  // depth 16: 25mb
  var depth = depth || 10;
  createTwoChildren(root, depth);

  // generate positions for all nodes.
  // tree grows balanced from left to right
  root.offset = new mindmaps.Point(400, 400);
  // var offset = Math.pow(2, depth-1) * 10;
  var offset = 80;
  var c = root.children.values();
  setOffset(c[0], 0, -offset);
  setOffset(c[1], 0, offset);
  function setOffset(node, depth, offsetY) {
    node.offset = new mindmaps.Point((depth + 1) * 50, offsetY);

    if (node.isLeaf()) {
      return;
    }

    var c = node.children.values();
    var left = c[0];
    setOffset(left, depth + 1, offsetY - offsetY / 2);

    var right = c[1];
    setOffset(right, depth + 1, offsetY + offsetY / 2);
  }

  // color nodes
  c[0].branchColor = mindmaps.Util.randomColor();
  c[0].forEachDescendant(function(node) {
    node.branchColor = mindmaps.Util.randomColor();
  });
  c[1].branchColor = mindmaps.Util.randomColor();
  c[1].forEachDescendant(function(node) {
    node.branchColor = mindmaps.Util.randomColor();
  });

  return mm;
}

/**
 * <pre>
 *        r
 *    /     |        \
 *   0    1     2
 *       / \     / | \  \
 *        10  11  20 21 22 23
 *        |
 *        100
 *        |
 *        1000
 * </pre>
 */
function getDefaultTestMap() {
  var mm = new mindmaps.MindMap();
  var root = mm.root;

  var n0 = mm.createNode();
  var n1 = mm.createNode();
  var n2 = mm.createNode();
  root.addChild(n0);
  root.addChild(n1);
  root.addChild(n2);

  var n10 = mm.createNode();
  var n11 = mm.createNode();
  n1.addChild(n10);
  n1.addChild(n11);

  var n20 = mm.createNode();
  var n21 = mm.createNode();
  var n22 = mm.createNode();
  var n23 = mm.createNode();
  n2.addChild(n20);
  n2.addChild(n21);
  n2.addChild(n22);
  n2.addChild(n23);

  var n100 = mm.createNode();
  n10.addChild(n100);

  var n1000 = mm.createNode();
  n100.addChild(n1000);

  return mm;
}

function getDefaultTestDocument() {
  var doc = new mindmaps.Document();
  doc.title = "test document";
  doc.mindmap = getDefaultTestMap();

  return doc;
}

function getSimpleMap() {
  var mm = new mindmaps.MindMap();
  var root = mm.root;

  var n0 = mm.createNode();
  var n1 = mm.createNode();
  root.addChild(n0);
  root.addChild(n1);

  return mm;
}


/*js/Point.js*/
/**
 * Point class.
 * 
 * @constructor
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 */
mindmaps.Point = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
};

/**
 * Returns a new point object from generic obj.
 * 
 * @static
 * @param obj
 * @returns {mindmaps.Point}
 */
mindmaps.Point.fromObject = function(obj) {
  return new mindmaps.Point(obj.x, obj.y);
};

/**
 * Clones a the point.
 * 
 * @returns {mindmaps.Point}
 */
mindmaps.Point.prototype.clone = function() {
  return new mindmaps.Point(this.x, this.y);
};

/**
 * Adds a point to the point.
 * @param {mindmaps.Point} point
 */
mindmaps.Point.prototype.add = function(point) {
  this.x += point.x;
  this.y += point.y;
};

/**
 * Returns a String representation.
 * @returns {String}
 */
mindmaps.Point.prototype.toString = function() {
  return "{x: " + this.x + " y: " + this.y + "}";
};


/*js/Document.js*/
/**
 * Creates a new Document.
 * 
 * @constructor
 */
mindmaps.Document = function() {
  this.id = mindmaps.Util.createUUID();
  this.title = "New Document";
  this.mindmap = new mindmaps.MindMap();
  this.dates = {
    created : new Date(),
    modified : null
  };

  this.dimensions = new mindmaps.Point(4000, 2000);
  this.autosave = false;
};

/**
 * Creates a new document object from a JSON string.
 * 
 * @static
 * @param {String} json
 * @returns {mindmaps.Document}
 */
mindmaps.Document.fromJSON = function(json) {
  return mindmaps.Document.fromObject(JSON.parse(json))
};

/**
 * Creates a new document object from a generic object.
 * 
 * @static
 * @param {Object} json
 * @returns {mindmaps.Document}
 */
mindmaps.Document.fromObject = function(obj) {
	if(!obj || !obj.mindmap || !obj.dates){
		alert('Error!! This is not a valid mindmap file.'); //edit
		return;
	}
  var doc = new mindmaps.Document();
  doc.id = obj.id;
  doc.title = obj.title;
  doc.mindmap = mindmaps.MindMap.fromObject(obj.mindmap);
  doc.dates = {
    created : new Date(obj.dates.created),
    modified : obj.dates.modified ? new Date(obj.dates.modified) : null
  };

  doc.dimensions = mindmaps.Point.fromObject(obj.dimensions);
  doc.autosave = obj.autosave;

  return doc;
};

/**
 * Called by JSON.stringify().
 * 
 * @private
 */
mindmaps.Document.prototype.toJSON = function() {
  // store dates in milliseconds since epoch
  var dates = {
    created : this.dates.created.getTime()
  };

  if (this.dates.modified) {
    dates.modified = this.dates.modified.getTime();
  }

  return {
    id : this.id,
    title : this.title,
    mindmap : this.mindmap,
    dates : dates,
    dimensions : this.dimensions,
    autosave: this.autosave
  };
};

/**
 * Returns a JSON representation of the object.
 * 
 * @returns {String} the json.
 */
mindmaps.Document.prototype.serialize = function() {
  return JSON.stringify(this);
};

/**
 * Updates modified date and title for saving.
 */
mindmaps.Document.prototype.prepareSave = function() {
  this.dates.modified = new Date();
  this.title = this.mindmap.getRoot().getCaption();
  return this;
};

/**
 * Sort function for Array.sort().
 * 
 * @static
 * @param {mindmaps.Document} doc1
 * @param {mindmaps.Document} doc2
 */
mindmaps.Document.sortByModifiedDateDescending = function(doc1, doc2) {
  if (doc1.dates.modified > doc2.dates.modified) {
    return -1;
  }
  if (doc1.dates.modified < doc2.dates.modified) {
    return 1;
  }
  return 0;
};

/**
 * Tells whether this document considerd as "new", that is has not been saved
 * yet.
 * 
 * @returns {Boolean}
 */
mindmaps.Document.prototype.isNew = function() {
  return this.dates.modified === null;
};

/**
 * Returns the created date.
 * 
 * @returns {Date}
 */
mindmaps.Document.prototype.getCreatedDate = function() {
  return this.dates.created;
};

/**
 * Gets the width of the document.
 * 
 * @returns {Number}
 */
mindmaps.Document.prototype.getWidth = function() {
  return this.dimensions.x;
};

/**
 * Gets the height of the document.
 * 
 * @returns {Number}
 */
mindmaps.Document.prototype.getHeight = function() {
  return this.dimensions.y;
};


mindmaps.Document.prototype.isAutoSave = function() {
  return this.autosave;
}


/**
 * Sets autosave setting.
 *
 * @param {Boolean}
 */
mindmaps.Document.prototype.setAutoSave = function(autosave) {
  this.autosave = autosave;
}


/*js/MindMap.js*/
/**
 * 
 * Creates a new mind map.
 * 
 * @constructor
 * @param {mindmaps.Node} [root]
 */
mindmaps.MindMap = function(root) {
  /**
   * nodes is only used for quick lookup of a node by id. Each node must be
   * registered in this map via createNode() or addNode(node).
   */
  this.nodes = new mindmaps.NodeMap();

  if (root) {
    this.root = root;
  } else {
    this.root = new mindmaps.Node();
    this.root.text.font.size = 20;
    this.root.text.font.weight = "bold";
    this.root.text.caption = "Central Idea";
  }

  this.addNode(this.root);
};

/**
 * Creates a new mind map object from JSON String.
 * 
 * @static
 * @param {String} json
 * @returns {mindmaps.MindMap}
 */
mindmaps.MindMap.fromJSON = function(json) {
  return mindmaps.MindMap.fromObject(JSON.parse(json));
};

/**
 * Creates a new mind map object from generic object.
 * 
 * @static
 * @param {Object} obj
 * @returns {mindmaps.MindMap}
 */
mindmaps.MindMap.fromObject = function(obj) {
  var root = mindmaps.Node.fromObject(obj.root);
  var mm = new mindmaps.MindMap(root);

  // register all nodes in the map
  root.forEachDescendant(function(descendant) {
    mm.addNode(descendant);
  });

  return mm;
};

/**
 * Called by JSON.stringify().
 * 
 * @private
 * 
 */
mindmaps.MindMap.prototype.toJSON = function() {
  var obj = {
    root : this.root
  };
  return obj;
};

/**
 * Creates a JSON representation of the mind map.
 * 
 * @returns {String}
 */
mindmaps.MindMap.prototype.serialize = function() {
  return JSON.stringify(this);
};

/**
 * Create a node and add to nodes map.
 * 
 * @returns {mindmaps.Node}
 */
mindmaps.MindMap.prototype.createNode = function() {
  var node = new mindmaps.Node();
  this.addNode(node);
  return node;
};

/**
 * Adds an existing node and all its children to the nodes map.
 * 
 * @param {mindmaps.Node} node
 */
mindmaps.MindMap.prototype.addNode = function(node) {
  this.nodes.add(node);

  // add all children
  var self = this;
  node.forEachDescendant(function(descendant) {
    self.nodes.add(descendant);
  });
};

/**
 * Removes a node from the mind map. Severs tie to the parent.
 * 
 * @param {mindmaps.Node} node
 */
mindmaps.MindMap.prototype.removeNode = function(node) {
  // detach node from parent
  var parent = node.parent;
  parent.removeChild(node);

  // clear nodes table: remove node and its children
  var self = this;
  node.forEachDescendant(function(descendant) {
    self.nodes.remove(descendant);
  });

  this.nodes.remove(node);
};

/**
 * Get the root of the mind map.
 * 
 * @returns {mindmaps.Node}
 */
mindmaps.MindMap.prototype.getRoot = function() {
  return this.root;
};


/*js/Node.js*/
/**
 * Creates a new node.
 * 
 * @constructor
 */
mindmaps.Node = function() {
  this.id = mindmaps.Util.getId();
  this.parent = null;
  this.children = new mindmaps.NodeMap();
  this.text = {
    caption : "New Idea",
    font : {
      style : "normal",
      weight : "normal",
      decoration : "none",
      /** unit: pixel */
      size : 15,
      color : "#000000"
    }
  };
  this.offset = new mindmaps.Point();
  this.foldChildren = false;
  this.branchColor = "#000000";
};

/**
 * Creates a deep copy of this node, where all nodes have a new IDs.
 * 
 * @returns {mindmaps.Node} the cloned node
 */
mindmaps.Node.prototype.clone = function() {
  var clone = new mindmaps.Node();
  var text = {
    caption : this.text.caption
  };
  var font = {
    weight : this.text.font.weight,
    style : this.text.font.style,
    decoration : this.text.font.decoration,
    size : this.text.font.size,
    color : this.text.font.color
  };
  text.font = font;
  clone.text = text;
  clone.offset = this.offset.clone();
  clone.foldChildren = this.foldChildren;
  clone.branchColor = this.branchColor;

  this.forEachChild(function(child) {
    var childClone = child.clone();
    clone.addChild(childClone);
  });

  return clone;
};

/**
 * Creates a new node object from JSON String.
 * 
 * @param {String} json
 * @returns {mindmaps.Node}
 */
mindmaps.Node.fromJSON = function(json) {
  return mindmaps.Node.fromObject(JSON.parse(json));
};

/**
 * Creates a new node object from a generic object.
 * 
 * @param {Object} obj
 * @returns {mindmaps.Node}
 */
mindmaps.Node.fromObject = function(obj) {
  var node = new mindmaps.Node();
  node.id = obj.id;
  node.text = obj.text;
  node.offset = mindmaps.Point.fromObject(obj.offset);
  node.foldChildren = obj.foldChildren;
  node.branchColor = obj.branchColor;

  // extract all children from array of objects
  obj.children.forEach(function(child) {
    var childNode = mindmaps.Node.fromObject(child);
    node.addChild(childNode);
  });

  return node;
};

/**
 * Returns a presentation of this node and its children ready for serialization.
 * Called by JSON.stringify().
 * 
 * @private
 */
mindmaps.Node.prototype.toJSON = function() {
  // TODO see if we cant improve this
  // http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
  // copy all children into array
  var self = this;
  var children = (function() {
    var result = [];
    self.forEachChild(function(child) {
      result.push(child.toJSON());
    });
    return result;
  })();

  var obj = {
    id : this.id,
    // store parent as id since we have to avoid circular references
    parentId : this.parent ? this.parent.id : null,
    text : this.text,
    offset : this.offset,
    foldChildren : this.foldChildren,
    branchColor : this.branchColor,
    children : children
  };

  return obj;
};

/**
 * Creates a JSON representation of the node.
 * 
 * @returns {String}
 */
mindmaps.Node.prototype.serialize = function() {
  return JSON.stringify(this);
};

/**
 * Adds a child to the node.
 * 
 * @param {mindmaps.Node} node
 */
mindmaps.Node.prototype.addChild = function(node) {
  node.parent = this;
  this.children.add(node);
};

/**
 * Removes a direct child.
 * 
 * @param {mindmaps.Node} node
 */
mindmaps.Node.prototype.removeChild = function(node) {
  node.parent = null;
  this.children.remove(node);
};

/**
 * Returns whether this node is a root.
 * 
 * @returns {Boolean}
 */
mindmaps.Node.prototype.isRoot = function() {
  return this.parent === null;
};

/**
 * Returns whether this node is a leaf.
 * 
 * @returns {Boolean}
 */
mindmaps.Node.prototype.isLeaf = function() {
  return this.children.size() === 0;
};

/**
 * Returns the parent node.
 * 
 * @returns {mindmaps.Node}
 */
mindmaps.Node.prototype.getParent = function() {
  return this.parent;
};

/**
 * Returns the root if this node is part of a tree structure, otherwise it
 * returns itself.
 * 
 * @returns {mindmaps.Node} The root of the tree structure.
 */
mindmaps.Node.prototype.getRoot = function() {
  var root = this;
  while (root.parent) {
    root = root.parent;
  }

  return root;
};

/**
 * Gets the position of the node relative to the root.
 * 
 * @returns {mindmaps.Point}
 */
mindmaps.Node.prototype.getPosition = function() {
  var pos = this.offset.clone();
  var node = this.parent;

  while (node) {
    pos.add(node.offset);
    node = node.parent;
  }
  return pos;
};

/**
 * Gets the depth of the node. Root has a depth of 0.
 * 
 * @returns {Number}
 */
mindmaps.Node.prototype.getDepth = function() {
  var node = this.parent;
  var depth = 0;

  while (node) {
    depth++;
    node = node.parent;
  }

  return depth;
};

/**
 * Gets the children of the node. Traverses the whole sub tree if recursive is
 * true.
 * 
 * @param recursive
 * @returns {Array}
 * @deprecated
 */
mindmaps.Node.prototype.getChildren = function(recursive) {
  var nodes = [];

  this.children.each(function(node) {
    if (recursive) {
      var childNodes = node.getChildren(true);
      childNodes.forEach(function(child) {
        nodes.push(child);
      });
    }
    nodes.push(node);
  });

  return nodes;
};

/**
 * Iterator. Traverses all child nodes.
 * 
 * @param {Function} func
 */
mindmaps.Node.prototype.forEachChild = function(func) {
  this.children.each(func);
};

/**
 * Iterator. Traverses all child nodes recursively.
 * 
 * @param {Function} func
 */
mindmaps.Node.prototype.forEachDescendant = function(func) {
  this.children.each(function(node) {
    func(node);
    node.forEachDescendant(func);
  });
};

/**
 * Sets the caption for the node
 * 
 * @param {String} caption
 */
mindmaps.Node.prototype.setCaption = function(caption) {
  this.text.caption = caption;
};

/**
 * Gets the caption for the node.
 * 
 * @returns {String}
 */
mindmaps.Node.prototype.getCaption = function() {
  return this.text.caption;
};

/**
 * Tests (depth-first) whether the other node is a descendant of this node.
 * 
 * @param {mindmaps.Node} other
 * @returns {Boolean} true if descendant, false otherwise.
 */
mindmaps.Node.prototype.isDescendant = function(other) {
  function test(node) {
    var children = node.children.values();
    for ( var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      if (test(child)) {
        return true;
      }

      if (child === other) {
        return true;
      }
    }
    return false;
  }

  return test(this);
};


/*js/NodeMap.js*/
/**
 * Creates a new NodeMap object. Map implementation for nodes. The key is
 * automatically set to the node id.
 * 
 * @constructor
 */
mindmaps.NodeMap = function() {
  this.nodes = {};
  this.count = 0;
};

/**
 * Return a node by its ID.
 * 
 * @param {String} nodeId
 * @returns {mindmaps.Node}
 */
mindmaps.NodeMap.prototype.get = function(nodeId) {
  return this.nodes[nodeId];
};

/**
 * Adds a node to the map if it hasn't been added before.
 * 
 * @param {mindmaps.Node} node
 * @returns {Boolean} true if added, false otherwise.
 */
mindmaps.NodeMap.prototype.add = function(node) {
  if (!this.nodes.hasOwnProperty(node.id)) {
    this.nodes[node.id] = node;
    this.count++;
    return true;
  }
  return false;
};

/**
 * Removes a node from the map.
 * 
 * @param {mindmaps.Node} node
 * @returns {Boolean} true if removed, false otherwise.
 */
mindmaps.NodeMap.prototype.remove = function(node) {
  if (this.nodes.hasOwnProperty(node.id)) {
    delete this.nodes[node.id];
    this.count--;
    return true;
  }
  return false;
};

/**
 * Returns the number of nodes in the map.
 * 
 * @returns {Number}
 */
mindmaps.NodeMap.prototype.size = function() {
  return this.count;
};

/**
 * Returns all nodes in the map.
 * 
 * @returns {Array}
 */
mindmaps.NodeMap.prototype.values = function() {
  return Object.keys(this.nodes).map(function(key) {
    return this.nodes[key];
  }, this);
};

/**
 * Iterator for nodes.
 * 
 * @param {Function} callback, first argument should be the node.
 */
mindmaps.NodeMap.prototype.each = function(callback) {
  for ( var id in this.nodes) {
    callback(this.nodes[id]);
  }
};


/*js/UndoManager.js*/
/**
 * Creates a new UndoManager
 * 
 * @constructor
 * @param {Integer} [maxStackSize=64]
 */
function UndoManager(maxStackSize) {
  this.maxStackSize = maxStackSize || 64;

  var State = {
    UNDO : "undo",
    REDO : "redo"
  };

  var self = this;
  var undoStack = new UndoManager.CircularStack(this.maxStackSize);
  var redoStack = new UndoManager.CircularStack(this.maxStackSize);
  var undoContext = false;
  var currentAction = null;
  var currentState = null;

  var onStateChange = function() {
    if (self.stateChanged) {
      self.stateChanged();
    }
  };

  var callAction = function(action) {
    currentAction = action;
    undoContext = true;
    switch (currentState) {
    case State.UNDO:
      action.undo();
      break;
    case State.REDO:
      action.redo();
      break;
    }
    undoContext = false;
  };

  /**
   * Register an undo operation. A call to .undo() will cause the undo
   * function to be executed. If you omit the second argument and the undo
   * function will cause the registration of another undo operation, then this
   * operation will be used as the redo function.
   * 
   * If you provide both arguments, a call to addUndo() during an undo() or
   * redo() will have no effect.
   * 
   * 
   * @param {Function} undoFunc The function that should undo the changes.
   * @param {Function} [redoFunc] The function that should redo the undone
   *            changes.
   */
  this.addUndo = function(undoFunc, redoFunc) {
    if (undoContext) {
      /**
       * If we are currently undoing an action and don't have a redo
       * function yet, store the undo function to the undo function, which
       * is in turn the redo function.
       */
      if (currentAction.redo == null && currentState == State.UNDO) {
        currentAction.redo = undoFunc;
      }
    } else {
      /**
       * We are not undoing right now. Store the functions as an action.
       */
      var action = {
        undo : undoFunc,
        redo : redoFunc
      };
      undoStack.push(action);
      // clear redo stack
      redoStack.clear();

      onStateChange();
    }
  };

  /**
   * Undoes the last action.
   */
  this.undo = function() {
    if (this.canUndo()) {
      currentState = State.UNDO;
      var action = undoStack.pop();
      callAction(action);

      if (action.redo) {
        redoStack.push(action);
      }

      onStateChange();
    }
  };

  /**
   * Redoes the last action.
   */
  this.redo = function() {
    if (this.canRedo()) {
      currentState = State.REDO;
      var action = redoStack.pop();
      callAction(action);

      if (action.undo) {
        undoStack.push(action);
      }

      onStateChange();
    }
  };

  /**
   * 
   * @returns {Boolean} true if undo is possible, false otherwise.
   */
  this.canUndo = function() {
    return !undoStack.isEmpty();
  };

  /**
   * 
   * @returns {Boolean} true if redo is possible, false otherwise.
   */
  this.canRedo = function() {
    return !redoStack.isEmpty();
  };

  /**
   * Resets this instance of the undo manager.
   */
  this.reset = function() {
    undoStack.clear();
    redoStack.clear();
    undoContext = false;
    currentAction = null;
    currentState = null;

    onStateChange();
  };

  /**
   * Event that is fired when undo or redo state changes.
   * 
   * @event
   */
  this.stateChanged = function() {
  };
}

/**
 * Creates a new CircularStack. This is a stack implementation backed by a
 * circular buffer where the oldest entries automatically are overwritten when
 * new items are pushed onto the stack and the maximum size has been reached.
 * 
 * @constructor
 * @param {Integer} [maxSize=32]
 */
UndoManager.CircularStack = function(maxSize) {
  this.maxSize = maxSize || 32;
  this.buffer = [];
  this.nextPointer = 0;
};

/**
 * Pushes a new item onto the stack.
 * 
 * @param {Any} item
 */
UndoManager.CircularStack.prototype.push = function(item) {
  this.buffer[this.nextPointer] = item;
  this.nextPointer = (this.nextPointer + 1) % this.maxSize;
};

/**
 * Checks whether the stack is empty.
 * 
 * @returns {Boolean} true if empty, false otherwise.
 */
UndoManager.CircularStack.prototype.isEmpty = function() {
  if (this.buffer.length === 0) {
    return true;
  }

  var prevPointer = this.getPreviousPointer();
  if (prevPointer === null) {
    return true;
  } else {
    return this.buffer[prevPointer] === null;
  }
};

/**
 * Gets the position of the previously inserted item in the buffer.
 * 
 * @private
 * @returns {Integer} the previous pointer position or null if no previous
 *          exists.
 */
UndoManager.CircularStack.prototype.getPreviousPointer = function() {
  if (this.nextPointer > 0) {
    return this.nextPointer - 1;
  } else {
    if (this.buffer.length < this.maxSize) {
      return null;
    } else {
      return this.maxSize - 1;
    }
  }
};

/**
 * Clears the stack.
 */
UndoManager.CircularStack.prototype.clear = function() {
  this.buffer.length = 0;
  this.nextPointer = 0;
};

/**
 * Returns and removes the top most item of the stack.
 * 
 * @returns {Any} the last inserted item or null if stack is empty.
 */
UndoManager.CircularStack.prototype.pop = function() {
  if (this.isEmpty()) {
    return null;
  }

  var previousPointer = this.getPreviousPointer();
  var item = this.buffer[previousPointer];
  this.buffer[previousPointer] = null;
  this.nextPointer = previousPointer;

  return item;
};

/**
 * Returns but not removes the top most item of the stack.
 * 
 * @returns {Any} the last inserted item or null if stack is empty.
 */
UndoManager.CircularStack.prototype.peek = function() {
  if (this.isEmpty()) {
    return null;
  }
  return this.buffer[this.getPreviousPointer()];
};


/*js/UndoController.js*/
/**
 * Creates a new UndoController. The undo controller manages an instance of
 * UndoManager and delegates all undo and redo commands to the undo manager.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 */
mindmaps.UndoController = function(eventBus, commandRegistry) {

  /**
   * Initialise.
   * 
   * @private
   */
  this.init = function() {
    this.undoManager = new UndoManager(128);
    this.undoManager.stateChanged = this.undoStateChanged.bind(this);

    this.undoCommand = commandRegistry.get(mindmaps.UndoCommand);
    this.undoCommand.setHandler(this.doUndo.bind(this));

    this.redoCommand = commandRegistry.get(mindmaps.RedoCommand);
    this.redoCommand.setHandler(this.doRedo.bind(this));

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, this.documentOpened
        .bind(this));

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, this.documentClosed
        .bind(this));
  };

  /**
   * Handler for state changed event from undo manager.
   */
  this.undoStateChanged = function() {
    this.undoCommand.setEnabled(this.undoManager.canUndo());
    this.redoCommand.setEnabled(this.undoManager.canRedo());
  };

  /**
   * @see mindmaps.UndoManager#addUndo
   */
  this.addUndo = function(undoFunc, redoFunc) {
    this.undoManager.addUndo(undoFunc, redoFunc);
  };

  /**
   * Handler for undo command.
   */
  this.doUndo = function() {
    this.undoManager.undo();
  };

  /**
   * Handler for redo command.
   */
  this.doRedo = function() {
    this.undoManager.redo();
  };

  /**
   * Handler for document opened event.
   */
  this.documentOpened = function() {
    this.undoManager.reset();
    this.undoStateChanged();
  };

  /**
   * Handler for document closed event.
   */
  this.documentClosed = function() {
    this.undoManager.reset();
    this.undoStateChanged();
  };

  this.init();
};


/*js/ClipboardController.js*/
/**
 * Creates a new ClipboardController.
 * Handles copy, cut and paste commands.
 * 
 * @constructor
 * 
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 * @param {mindmaps.MindMapModel} mindmapModel
 */
mindmaps.ClipboardController = function(eventBus, commandRegistry, mindmapModel) {
  var node, copyCommand, cutCommand, pasteCommand;

  function init() {
    copyCommand = commandRegistry.get(mindmaps.CopyNodeCommand);
    copyCommand.setHandler(doCopy);

    cutCommand = commandRegistry.get(mindmaps.CutNodeCommand);
    cutCommand.setHandler(doCut);

    pasteCommand = commandRegistry.get(mindmaps.PasteNodeCommand);
    pasteCommand.setHandler(doPaste);
    pasteCommand.setEnabled(false);

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
      copyCommand.setEnabled(false);
      cutCommand.setEnabled(false);
      pasteCommand.setEnabled(false);
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
      copyCommand.setEnabled(true);
      cutCommand.setEnabled(true);
      pasteCommand.setEnabled(node != null);
    });

  }

  function copySelectedNode() {
    node = mindmapModel.selectedNode.clone();
    pasteCommand.setEnabled(true);
  }

  function doCopy() {
    copySelectedNode();
  }

  function doCut() {
    copySelectedNode();
    mindmapModel.deleteNode(mindmapModel.selectedNode);
  }

  function doPaste() {
    if (!node) {
      return;
    }

    // send a cloned copy of our node, so we can paste multiple times
    mindmapModel.createNode(node.clone(), mindmapModel.selectedNode);
  }

  init();
};


/*js/ZoomController.js*/
/**
 * Creates a new ZoomController. Object that controls the zoom setting.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 */
mindmaps.ZoomController = function(eventBus, commandRegistry) {
  var self = this;

  /**
   * @constant
   */
  this.ZOOM_STEP = 0.25;

  /**
   * @constant
   */
  this.MAX_ZOOM = 3;

  /**
   * @constant
   */
  this.MIN_ZOOM = 0.25;

  /**
   * @constant
   */
  this.DEFAULT_ZOOM = 1;

  /**
   * @private
   */
  this.zoomFactor = this.DEFAULT_ZOOM;

  /**
   * Sets the zoom factor if param is within MIN_ZOOM and MAX_ZOOM bounds.
   * 
   * @param {Number} factor
   */
  this.zoomTo = function(factor) {
    if (factor <= this.MAX_ZOOM && factor >= this.MIN_ZOOM) {
      this.zoomFactor = factor;
      eventBus.publish(mindmaps.Event.ZOOM_CHANGED, factor);
    }
  };

  /**
   * Zooms in by ZOOM_STEP.
   * 
   * @returns {Number} the new zoomFactor.
   */
  this.zoomIn = function() {
    this.zoomFactor += this.ZOOM_STEP;
    if (this.zoomFactor > this.MAX_ZOOM) {
      this.zoomFactor -= this.ZOOM_STEP;
    } else {
      eventBus.publish(mindmaps.Event.ZOOM_CHANGED, this.zoomFactor);
    }

    return this.zoomFactor;
  };

  /**
   * Zooms out by ZOOM_STEP,
   * 
   * @returns {Number} the new zoomFactor.
   */
  this.zoomOut = function() {
    this.zoomFactor -= this.ZOOM_STEP;
    if (this.zoomFactor < this.MIN_ZOOM) {
      this.zoomFactor += this.ZOOM_STEP;
    } else {
      eventBus.publish(mindmaps.Event.ZOOM_CHANGED, this.zoomFactor);
    }

    return this.zoomFactor;
  };

  /**
   * Reset zoom factor when document was closed.
   * 
   * @ignore
   */
  eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function(doc) {
    self.zoomTo(self.DEFAULT_ZOOM);
  });
};


/*js/ShortcutController.js*/
/**
 * Creates a new ShortcutController. This object takes care of all keyboard
 * shortcuts.
 * 
 * @constructor
 */
mindmaps.ShortcutController = function() {
  // set to save shortcuts in
  /**
   * @private
   */
  this.shortcuts = {};

  /**
   * Set the event type and add namespace for later removal.
   * 
   * @param {String} shortcut the key combination
   * @param {String} [type="keydown"]
   * @returns {String}
   */
  function getType(shortcut, type) {
    type = type || "keydown";
    return type + "." + shortcut;
  }

  /**
   * Registers a new application wide shortcut. shortcuts can be
   * either a string or an array containing multiple possible
   * shortcuts for the same action.
   * 
   * @param {String|Array} shortcuts
   * @param {Function} handler
   * @param {String} [type="keydown"]
   */
  this.register = function(shortcuts, handler, type) {
    if (!Array.isArray(shortcuts)) {
      shortcuts = [shortcuts];
    }

    var self = this;
    shortcuts.forEach(function(shortcut) {
      type = getType(shortcut, type);
      $(document).bind(type, shortcut, function(e) {
        // try best to cancel default actions on shortcuts like ctrl+n
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        handler();
        return false;
        self.shortcut[type] = true
      });
    });
  };

  /**
   * Unregisters a application shortcut.
   * 
   * @param {String} shortcut
   * @param {String} [type="keydown"]
   */
  this.unregister = function(shortcut, type) {
    type = getType(shortcut, type);
    $(document).unbind(type);
    delete this.shortcuts[type];
  };

  /**
   * Removes all shortcuts.
   */
  this.unregisterAll = function() {
    for ( var shortcut in shortcuts) {
      $(document).unbind(shortcut);
    }
  };
};


/*js/HelpController.js*/
/**
 * <pre>
 * Listens to HELP_COMMAND and displays notifications.
 * Provides interactive tutorial for first time users.
 * </pre>
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.commandRegistry} commandRegistry
 */
mindmaps.HelpController = function(eventBus, commandRegistry) {

  /**
   * Prepare tutorial guiders.
   */
  function setupInteractiveMode() {
    if (isTutorialDone()) {
      console.debug("skipping tutorial");
      return;
    }

    var notifications = [];
    var interactiveMode = true;

    // start tutorial after a short delay
    eventBus.once(mindmaps.Event.DOCUMENT_OPENED, function() {
      setTimeout(start, 1000);
    });

    function closeAllNotifications() {
      notifications.forEach(function(n) {
        n.close();
      });
    }

    var helpMain, helpRoot;
    function start() {
      helpMain = new mindmaps.Notification(
          "#toolbar",
          {
            position : "bottomMiddle",
            maxWidth : 550,
            title : "Welcome to mindmaps",
            content : "Hello there, it seems like you are new here! These bubbles "
                + "will guide you through the app. Or they won't if you want to skip this tutorial and <a class='skip-tutorial link'>click here<a/>."
          });
      notifications.push(helpMain);
      helpMain.$().find("a.skip-tutorial").click(function() {
        interactiveMode = false;
        closeAllNotifications();
        tutorialDone();
      });
      setTimeout(theRoot, 2000);
    }

    function theRoot() {
      if (isTutorialDone())
        return;

      helpRoot = new mindmaps.Notification(
          ".node-caption.root",
          {
            position : "bottomMiddle",
            closeButton : true,
            maxWidth : 350,
            title : "This is where you start - your main idea",
            content : "Double click the idea to change what it says. This will be the main topic of your mind map."
          });
      notifications.push(helpRoot);

      eventBus.once(mindmaps.Event.NODE_TEXT_CAPTION_CHANGED, function() {
        helpRoot.close();
        setTimeout(theNub, 900);
      });
    }

    function theNub() {
      if (isTutorialDone())
        return;

      var helpNub = new mindmaps.Notification(
          ".node-caption.root",
          {
            position : "bottomMiddle",
            closeButton : true,
            maxWidth : 350,
            padding : 20,
            title : "Creating new ideas",
            content : "Now it's time to build your mind map.<br/> Move your mouse over the idea, click and then drag"
                + " the <span style='color:red'>red circle</span> away from the root. This is how you create a new branch."
          });
      notifications.push(helpNub);
      eventBus.once(mindmaps.Event.NODE_CREATED, function() {
        helpMain.close();
        helpNub.close();
        setTimeout(newNode, 900);
      });
    }

    function newNode() {
      if (isTutorialDone())
        return;

      var helpNewNode = new mindmaps.Notification(
          ".node-container.root > .node-container:first",
          {
            position : "bottomMiddle",
            closeButton : true,
            maxWidth : 350,
            title : "Your first branch",
            content : "Great! This is easy, right? The red circle is your most important tool. Now, you can move your idea"
                + " around by dragging it or double click to change the text again."
          });
      notifications.push(helpNewNode);
      setTimeout(inspector, 2000);

      eventBus.once(mindmaps.Event.NODE_MOVED, function() {
        helpNewNode.close();
        setTimeout(navigate, 0);
        setTimeout(toolbar, 15000);
        setTimeout(menu, 10000);
        setTimeout(tutorialDone, 20000);
      });
    }

    function navigate() {
      if (isTutorialDone())
        return;

      var helpNavigate = new mindmaps.Notification(
          ".float-panel:has(#navigator)",
          {
            position : "bottomRight",
            closeButton : true,
            maxWidth : 350,
            expires : 10000,
            title : "Navigation",
            content : "You can click and drag the background of the map to move around. Use your mousewheel or slider over there to zoom in and out."
          });
      notifications.push(helpNavigate);
    }

    function inspector() {
      if (isTutorialDone())
        return;

      var helpInspector = new mindmaps.Notification(
          "#inspector",
          {
            position : "leftBottom",
            closeButton : true,
            maxWidth : 350,
            padding : 20,
            title : "Don't like the colors?",
            content : "Use these controls to change the appearance of your ideas. "
                + "Try clicking the icon in the upper right corner to minimize this panel."
          });
      notifications.push(helpInspector);
    }

    function toolbar() {
      if (isTutorialDone())
        return;

      var helpToolbar = new mindmaps.Notification(
          "#toolbar .buttons-left",
          {
            position : "bottomLeft",
            closeButton : true,
            maxWidth : 350,
            padding : 20,
            title : "The tool bar",
            content : "Those buttons do what they say. You can use them or work with keyboard shortcuts. "
                + "Hover over the buttons for the key combinations."
          });
      notifications.push(helpToolbar);
    }

    function menu() {
      if (isTutorialDone())
        return;

      var helpMenu = new mindmaps.Notification(
          "#toolbar .buttons-right",
          {
            position : "leftTop",
            closeButton : true,
            maxWidth : 350,
            title : "Save your work",
            content : "The button to the right opens a menu where you can save your mind map or start working "
                + "on another one if you like."
          });
      notifications.push(helpMenu);
    }

    function isTutorialDone() {
      return mindmaps.LocalStorage.get("mindmaps.tutorial.done") == 1;
    }

    function tutorialDone() {
      mindmaps.LocalStorage.put("mindmaps.tutorial.done", 1);
    }

  }

  /**
   * Prepares notfications to show for help command.
   */
  function setupHelpButton() {
    var command = commandRegistry.get(mindmaps.HelpCommand);
    command.setHandler(showHelp);

    var notifications = [];
    function showHelp() {
      // true if atleast one notifications is still on screen
      var displaying = notifications.some(function(noti) {
        return noti.isVisible();
      });

      // hide notifications if visible
      if (displaying) {
        notifications.forEach(function(noti) {
          noti.close();
        });
        notifications.length = 0;
        return;
      }

      // show notifications
      var helpRoot = new mindmaps.Notification(
          ".node-caption.root",
          {
            position : "bottomLeft",
            closeButton : true,
            maxWidth : 350,
            title : "This is your main idea",
            content : "Double click an idea to edit its text. Move the mouse over "
                + "an idea and drag the red circle to create a new idea."
          });

      var helpNavigator = new mindmaps.Notification(
          "#navigator",
          {
            position : "leftTop",
            closeButton : true,
            maxWidth : 350,
            padding : 20,
            title : "This is the navigator",
            content : "Use this panel to get an overview of your map. "
                + "You can navigate around by dragging the red rectangle or change the zoom by clicking on the magnifier buttons."
          });

      var helpInspector = new mindmaps.Notification(
          "#inspector",
          {
            position : "leftTop",
            closeButton : true,
            maxWidth : 350,
            padding : 20,
            title : "This is the inspector",
            content : "Use these controls to change the appearance of your ideas. "
                + "Try clicking the icon in the upper right corner to minimize this panel."
          });

      var helpToolbar = new mindmaps.Notification(
          "#toolbar .buttons-left",
          {
            position : "bottomLeft",
            closeButton : true,
            maxWidth : 350,
            title : "This is your toolbar",
            content : "Those buttons do what they say. You can use them or work with keyboard shortcuts. "
                + "Hover over the buttons for the key combinations."
          });

      notifications.push(helpRoot, helpNavigator, helpInspector,
          helpToolbar);
    }
  }

  setupInteractiveMode();
  setupHelpButton();
};


/*js/FloatPanel.js*/
/**
 * Creates a new FloatPanelFactory. This factory object can create new instances
 * of mindmaps.FloatPanel that are constrained inside the container.
 * 
 * @constructor
 * @param container
 */
mindmaps.FloatPanelFactory = function(container) {
  var $container = container.getContent();
  var dialogs = [];
  var paddingRight = 15;
  var paddingTop = 5;

  function setPosition(dialog) {
    // reposition dialog on window resize
    container.subscribe(mindmaps.CanvasContainer.Event.RESIZED, function() {
      dialogs.forEach(function(dialog) {
        if (dialog.visible) {
          dialog.ensurePosition();
        }
      });
    });

    var ccw = $container.outerWidth();
    var hh = $container.offset().top;
    var dw = dialog.width();
    var dh = dialog.height();
    var heightOffset = dialogs.reduce(function(memo, dialog) {
      return memo + dialog.height() + paddingTop;
    }, 0);

    dialog.setPosition(ccw - dw - paddingRight, hh + paddingTop
        + heightOffset);
  }

  /**
   * Creates a new FloatPanel.
   * 
   * @param {String} caption the float panel title
   * @param {jQuery} $content the content as a jquery object
   * @returns {mindmaps.FloatPanel}
   */
  this.create = function(caption, $content) {
    var dialog = new mindmaps.FloatPanel(caption, $container, $content);
    setPosition(dialog);
    dialogs.push(dialog);
    return dialog;
  };
};

/**
 * A reusable, draggable panel gui element. The panel is contained within the
 * container. When a $hideTarget is set, the hide/show animations will show a
 * transfer effect.
 * 
 * @constructor
 * @param {String} caption the float panel title
 * @param {jQuery} $container the surrounding container jquery object
 * @param {jQuery} $content the content as a jquery object
 */
mindmaps.FloatPanel = function(caption, $container, $content) {
  var self = this;
  var animating = false;

  this.caption = caption;
  this.visible = false;
  this.animationDuration = 400;

  /**
   * Replaces the content in the panel.
   * 
   * @param {jQuery} $content
   */
  this.setContent = function($content) {
    this.clearContent();
    $("div.ui-dialog-content", this.$widget).append($content);
  };

  /**
   * Clears the content of the panel.
   */
  this.clearContent = function() {
    $("div.ui-dialog-content", this.$widget).children().detach();
  };

  /**
   * @private
   */
  this.$widget = (function() {
    var $panel = $("#template-float-panel").tmpl({
      title : caption
    });
    
    // hide button
    $panel.find(".ui-dialog-titlebar-close").click(function() {
      self.hide();
    });

    // add content panel
    if ($content) {
      $panel.find(".ui-dialog-content").append($content);
    }
    
    // make draggable, hide, append to container
    $panel.draggable({
      containment : "parent",
      handle : "div.ui-dialog-titlebar",
      opacity : 0.75
    }).hide().appendTo($container);
    
    return $panel;
  })();

  /**
   * Hides the panel. Will show transfer effect if $hideTarget is set.
   */
  this.hide = function() {
    if (!animating && this.visible) {
      this.visible = false;
      this.$widget.fadeOut(this.animationDuration * 1.5);

      // show transfer effect is hide target is set
      if (this.$hideTarget) {
        this.transfer(this.$widget, this.$hideTarget);
      }
    }
  };

  /**
   * Shows the panel. Will show transfer effect if $hideTarget is set.
   */
  this.show = function() {
    if (!animating && !this.visible) {
      this.visible = true;
      this.$widget.fadeIn(this.animationDuration * 1.5);
      this.ensurePosition();

      // show transfer effect is hide target is set
      if (this.$hideTarget) {
        this.transfer(this.$hideTarget, this.$widget);
      }
    }
  };

  /**
   * Shows or hides the panel.
   */
  this.toggle = function() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  };

  /**
   * Shows a transfer effect.
   * 
   * @private
   * @param {jQuery} $from
   * @param {jQuery} $to
   */
  this.transfer = function($from, $to) {
    animating = true;
    var endPosition = $to.offset(), animation = {
      top : endPosition.top,
      left : endPosition.left,
      height : $to.innerHeight(),
      width : $to.innerWidth()
    }, startPosition = $from.offset(), transfer = $(
        '<div class="ui-effects-transfer"></div>').appendTo(
        document.body).css({
      top : startPosition.top,
      left : startPosition.left,
      height : $from.innerHeight(),
      width : $from.innerWidth(),
      position : 'absolute'
    }).animate(animation, this.animationDuration, "linear", function() {
      // end
      transfer.remove();
      animating = false;
    });
  };

  /**
   * 
   * @returns {Number} the width.
   */
  this.width = function() {
    return this.$widget.outerWidth();
  };

  /**
   * 
   * @returns {Number} the height.
   */
  this.height = function() {
    return this.$widget.outerHeight();
  };

  /**
   * 
   * @returns {Object} the offset
   */
  this.offset = function() {
    return this.$widget.offset();
  };

  /**
   * Sets the position of the panel relative to the container.
   * 
   * @param {Number} x
   * @param {Number} y
   */
  this.setPosition = function(x, y) {
    this.$widget.offset({
      left : x,
      top : y
    });
  };

  /**
   * Moves panel into view port if position exceeds the bounds of the
   * container.
   * 
   * @private
   */
  this.ensurePosition = function() {
    var cw = $container.outerWidth();
    var ch = $container.outerHeight();
    var col = $container.offset().left;
    var cot = $container.offset().top;
    var dw = this.width();
    var dh = this.height();
    var dol = this.offset().left;
    var dot = this.offset().top;

    // window width is too small for current dialog position but bigger than
    // dialog width
    if (cw + col < dw + dol && cw >= dw) {
      this.setPosition(cw + col - dw, dot);
    }

    // window height is too small for current dialog position but bigger
    // than dialog height
    if (ch + cot < dh + dot && ch >= dh) {
      this.setPosition(dol, ch + cot - dh);
    }
  };

  /**
   * Sets the hide target for the panel.
   * 
   * @param {jQuery} $target
   */
  this.setHideTarget = function($target) {
    this.$hideTarget = $target;
  };
};


/*js/Navigator.js*/
/**
 * Creates a NavigatorView. This view shows a minified version of the mindmap +
 * controls for adjusting the zoom.
 * 
 * @constructor
 */
mindmaps.NavigatorView = function() {
  var self = this;

  var $content = $("#template-navigator").tmpl();
  var $contentActive = $content.children(".active").hide();
  var $contentInactive = $content.children(".inactive").hide();
  var $dragger = $("#navi-canvas-overlay", $content);
  var $canvas = $("#navi-canvas", $content);

  /**
   * Returns the content.
   * 
   * @returns {jQuery}
   */
  this.getContent = function() {
    return $content;
  };

  /**
   * Shows the active content.
   */
  this.showActiveContent = function() {
    $contentInactive.hide();
    $contentActive.show();
  };

  /**
   * Shows the inactive content.
   */
  this.showInactiveContent = function() {
    $contentActive.hide();
    $contentInactive.show();
  };

  /**
   * Adjusts the size of the red rectangle.
   * 
   * @param {Number} width
   * @param {Nubmer} height
   */
  this.setDraggerSize = function(width, height) {
    $dragger.css({
      width : width,
      height : height
    });
  };

  /**
   * Sets the position of the dragger rectangle.
   * 
   * @param {Number} x
   * @param {Number} y
   */
  this.setDraggerPosition = function(x, y) {
    $dragger.css({
      left : x,
      top : y
    });
  };

  /**
   * Sets the height of the mini canvas.
   * 
   * @param {Number} height
   */
  this.setCanvasHeight = function(height) {
    $("#navi-canvas", $content).css({
      height : height
    });
  };

  /**
   * Gets the width of the mini canvas.
   * 
   * @returns {Number}
   */
  this.getCanvasWidth = function() {
    return $("#navi-canvas", $content).width();
  };

  this.init = function(canvasSize) {
    $("#navi-slider", $content).slider({
      // TODO remove magic numbers. get values from presenter
      min : 0,
      max : 11,
      step : 1,
      value : 3,
      slide : function(e, ui) {
        if (self.sliderChanged) {
          self.sliderChanged(ui.value);
        }
      }
    });

    $("#button-navi-zoom-in", $content).button({
      text : false,
      icons : {
        primary : "ui-icon-zoomin"
      }
    }).click(function() {
      if (self.buttonZoomInClicked) {
        self.buttonZoomInClicked();
      }
    });

    $("#button-navi-zoom-out", $content).button({
      text : false,
      icons : {
        primary : "ui-icon-zoomout"
      }
    }).click(function() {
      if (self.buttonZoomOutClicked) {
        self.buttonZoomOutClicked();
      }
    });

    // make draggable
    $dragger.draggable({
      containment : "parent",
      start : function(e, ui) {
        if (self.dragStart) {
          self.dragStart();
        }
      },
      drag : function(e, ui) {
        if (self.dragging) {
          var x = ui.position.left;
          var y = ui.position.top;
          self.dragging(x, y);
        }
      },
      stop : function(e, ui) {
        if (self.dragStop) {
          self.dragStop();
        }
      }
    });
  };

  /**
   * Draws the complete mindmap onto the mini canvas.
   * 
   * @param {mindmaps.MindMap} mindmap
   * @param {Number} scaleFactor
   */
  this.draw = function(mindmap, scaleFactor) {
    var root = mindmap.root;
    var canvas = $canvas[0];
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.8;

    drawNode(root, width / 2, height / 2);

    // draw rect for root
    ctx.fillRect(width / 2 - 4, height / 2 - 2, 8, 4);

    function scale(value) {
      return value / scaleFactor;
    }

    function drawNode(node, x, y) {
      ctx.save();
      ctx.translate(x, y);

      if (!node.collapseChildren) {
        node.forEachChild(function(child) {
          ctx.beginPath();
          ctx.strokeStyle = child.branchColor;
          ctx.moveTo(0, 0);
          var posX = scale(child.offset.x);
          var posY = scale(child.offset.y);
          // var textWidth =
          // ctx.measureText(child.getCaption()).width;
          var textWidth = 5;

          /**
           * draw two lines: one going up to the node, and a second
           * horizontal line for the node caption. if node is left of
           * the parent (posX < 0), we shorten the first line and draw
           * the rest horizontally to arrive at the node's offset
           * position. in the other case, we draw the line to the
           * node's offset and draw another for the text.
           */
          if (posX < 0) {
            var firstStop = posX + textWidth;
            var secondStop = posX;
          } else {
            var firstStop = posX;
            var secondStop = posX + textWidth;
          }
          ctx.lineTo(firstStop, posY);
          ctx.lineTo(secondStop, posY);

          ctx.stroke();
          drawNode(child, secondStop, posY);
        });
      }
      ctx.restore();
    }
  };

  /**
   * Shows the zoom level as percentage.
   * 
   * @param {String} zoom
   */
  this.showZoomLevel = function(zoom) {
    $("#navi-zoom-level").text(zoom);
  };

  /**
   * Sets the value of the zoom slider.
   * 
   * @param {Integer} value
   */
  this.setSliderValue = function(value) {
    $("#navi-slider").slider("value", value);
  };
};

/**
 * Creates a new NavigatorPresenter.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.NavigatorView} view
 * @param {mindmaps.CanvasContainer} container
 * @param {mindmaps.ZoomController} zoomController
 */
mindmaps.NavigatorPresenter = function(eventBus, view, container,
    zoomController) {
  var self = this;
  var $container = container.getContent();
  var viewDragging = false;
  var scale = zoomController.DEFAULT_ZOOM;
  var canvasSize = new mindmaps.Point();
  var docSize = null;
  var mindmap = null;

  /**
   * Calculates and sets the size of the dragger element.
   */
  function calculateDraggerSize() {
    var cw = $container.width() / scale;
    var ch = $container.height() / scale;
    // doc.x / container.x = canvas.x / dragger.x
    var width = (cw * canvasSize.x) / docSize.x;
    var height = (ch * canvasSize.y) / docSize.y;

    // limit size to bounds of canvas
    if (width > canvasSize.x) {
      width = canvasSize.x;
    }

    if (height > canvasSize.y) {
      height = canvasSize.y;
    }

    view.setDraggerSize(width, height);
  }

  /**
   * Calculates and sets the size of the mini canvas.
   */
  function calculateCanvasSize() {
    var width = view.getCanvasWidth();
    var _scale = docSize.x / width;
    var height = docSize.y / _scale;

    view.setCanvasHeight(height);

    canvasSize.x = width;
    canvasSize.y = height;
  }

  /**
   * Calculates and sets the possition of the dragger element.
   */
  function calculateDraggerPosition() {
    var sl = $container.scrollLeft() / scale;
    var st = $container.scrollTop() / scale;

    // sl / dox = dl / cw
    // dl = sl * cw / dox
    var left = sl * canvasSize.x / docSize.x;
    var top = st * canvasSize.y / docSize.y;
    view.setDraggerPosition(left, top);
  }

  /**
   * Calculates and sets the zoom level.
   */
  function calculateZoomLevel() {
    var zoomlevel = scale * 100 + " %";
    view.showZoomLevel(zoomlevel);
  }

  /**
   * Calculates and sets the slider value for the zoom level.
   */
  function calculateSliderValue() {
    var val = scale / zoomController.ZOOM_STEP - 1;
    view.setSliderValue(val);
  }

  /**
   * Initialize view when a document was opened.
   */
  function documentOpened(doc) {
    docSize = doc.dimensions;
    mindmap = doc.mindmap;

    calculateCanvasSize();
    calculateDraggerPosition();
    calculateDraggerSize();
    calculateZoomLevel();
    calculateSliderValue();
    renderView();

    view.showActiveContent();

    // move dragger when container was scrolled
    $container.bind("scroll.navigator-view", function() {
      if (!viewDragging) {
        calculateDraggerPosition();
      }
    });
  }

  /**
   * Update the canvas of the view component.
   */
  function renderView() {
    // draw canvas
    var scale = docSize.x / canvasSize.x;
    view.draw(mindmap, scale);
  }

  /**
   * Reset when document was closed.
   */
  function documentClosed() {
    docSize = null;
    mindmap = null;
    scale = 1;
    // clean up
    // remove listeners
    $container.unbind("scroll.navigator-view");

    view.showInactiveContent();
  }

  /**
   * View callbacks.
   * 
   * @ignore
   */

  view.dragStart = function() {
    viewDragging = true;
  };

  // scroll container when the dragger is dragged
  view.dragging = function(x, y) {
    var scrollLeft = scale * docSize.x * x / canvasSize.x;
    var scrollTop = scale * docSize.y * y / canvasSize.y;
    $container.scrollLeft(scrollLeft).scrollTop(scrollTop);
  };

  view.dragStop = function() {
    viewDragging = false;
  };

  view.buttonZoomInClicked = function() {
    zoomController.zoomIn();
  };

  view.buttonZoomOutClicked = function() {
    zoomController.zoomOut();
  };

  view.sliderChanged = function(value) {
    zoomController.zoomTo((value + 1) * zoomController.ZOOM_STEP);
  };

  // set dragger size when container was resized
  container.subscribe(mindmaps.CanvasContainer.Event.RESIZED, function() {
    if (docSize) {
      calculateDraggerSize();
    }
  });

  // document events
  eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, documentOpened);
  eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, documentClosed);

  // node events
  eventBus.subscribe(mindmaps.Event.NODE_MOVED, renderView);
  eventBus.subscribe(mindmaps.Event.NODE_BRANCH_COLOR_CHANGED, renderView);
  eventBus.subscribe(mindmaps.Event.NODE_CREATED, renderView);
  eventBus.subscribe(mindmaps.Event.NODE_DELETED, renderView);
  eventBus.subscribe(mindmaps.Event.NODE_OPENED, renderView);
  eventBus.subscribe(mindmaps.Event.NODE_CLOSED, renderView);

  eventBus.subscribe(mindmaps.Event.ZOOM_CHANGED, function(zoomFactor) {
    scale = zoomFactor;
    calculateDraggerPosition();
    calculateDraggerSize();
    calculateZoomLevel();
    calculateSliderValue();
  });

  this.go = function() {
    view.init();
    view.showInactiveContent();
  };
};


/*js/Inspector.js*/
/**
 * Creates a new InspectorView.
 * 
 * @constructor
 */
mindmaps.InspectorView = function() {
  var self = this;
  var $content = $("#template-inspector").tmpl();
  var $sizeDecreaseButton = $("#inspector-button-font-size-decrease",
      $content);
  var $sizeIncreaseButton = $("#inspector-button-font-size-increase",
      $content);
  var $boldCheckbox = $("#inspector-checkbox-font-bold", $content);
  var $italicCheckbox = $("#inspector-checkbox-font-italic", $content);
  var $underlineCheckbox = $("#inspector-checkbox-font-underline", $content);
  var $linethroughCheckbox = $("#inspector-checkbox-font-linethrough",
      $content);
  var $branchColorChildrenButton = $("#inspector-button-branch-color-children", $content);
  var branchColorPicker = $("#inspector-branch-color-picker", $content);
  var fontColorPicker = $("#inspector-font-color-picker", $content);
  var $allButtons = [ $sizeDecreaseButton, $sizeIncreaseButton,
      $boldCheckbox, $italicCheckbox, $underlineCheckbox,
      $linethroughCheckbox, $branchColorChildrenButton ];
  var $allColorpickers = [ branchColorPicker, fontColorPicker ];

  /**
   * Returns a jquery object.
   * 
   * @returns {jQuery}
   */
  this.getContent = function() {
    return $content;
  };

  /**
   * Sets the enabled state of all controls.
   * 
   * @param {Boolean} enabled
   */
  this.setControlsEnabled = function(enabled) {
    var state = enabled ? "enable" : "disable";
    $allButtons.forEach(function($button) {
      $button.button(state);
    });

    $allColorpickers.forEach(function($colorpicker) {
      $colorpicker.miniColors("disabled", !enabled);
    });
  };

  /**
   * Sets the checked state of the bold font option.
   * 
   * @param {Boolean} checked
   */
  this.setBoldCheckboxState = function(checked) {
    $boldCheckbox.prop("checked", checked).button("refresh");
  };

  /**
   * Sets the checked state of the italic font option.
   * 
   * @param {Boolean} checked
   */
  this.setItalicCheckboxState = function(checked) {
    $italicCheckbox.prop("checked", checked).button("refresh");
  };

  /**
   * Sets the checked state of the underline font option.
   * 
   * @param {Boolean} checked
   */
  this.setUnderlineCheckboxState = function(checked) {
    $underlineCheckbox.prop("checked", checked).button("refresh");
  };

  /**
   * Sets the checked state of the linethrough font option.
   * 
   * @param {Boolean} checked
   */
  this.setLinethroughCheckboxState = function(checked) {
    $linethroughCheckbox.prop("checked", checked).button("refresh");
  };

  /**
   * Sets the color of the branch color picker.
   * 
   * @param {String} color
   */
  this.setBranchColorPickerColor = function(color) {
    branchColorPicker.miniColors("value", color);
  };

  /**
   * Sets the color of the font color picker.
   * 
   * @param {String} color
   */
  this.setFontColorPickerColor = function(color) {
    fontColorPicker.miniColors("value", color);
  };

  /**
   * Initialise
   */
  this.init = function() {
    $(".buttonset", $content).buttonset();
    $branchColorChildrenButton.button();

    $sizeDecreaseButton.click(function() {
      if (self.fontSizeDecreaseButtonClicked) {
        self.fontSizeDecreaseButtonClicked();
      }
    });

    $sizeIncreaseButton.click(function() {
      if (self.fontSizeIncreaseButtonClicked) {
        self.fontSizeIncreaseButtonClicked();
      }
    });

    $boldCheckbox.click(function() {
      if (self.fontBoldCheckboxClicked) {
        var checked = $(this).prop("checked");
        self.fontBoldCheckboxClicked(checked);
      }
    });

    $italicCheckbox.click(function() {
      if (self.fontItalicCheckboxClicked) {
        var checked = $(this).prop("checked");
        self.fontItalicCheckboxClicked(checked);
      }
    });

    $underlineCheckbox.click(function() {
      if (self.fontUnderlineCheckboxClicked) {
        var checked = $(this).prop("checked");
        self.fontUnderlineCheckboxClicked(checked);
      }
    });

    $linethroughCheckbox.click(function() {
      if (self.fontLinethroughCheckboxClicked) {
        var checked = $(this).prop("checked");
        self.fontLinethroughCheckboxClicked(checked);
      }
    });

    branchColorPicker.miniColors({
      hide : function(hex) {
        // dont emit event if picker was hidden due to disable
        if (this.attr('disabled')) {
          return;
        }

        console.log("hide branch", hex);
        if (self.branchColorPicked) {
          self.branchColorPicked(hex);
        }
      },

      move : function(hex) {
        if (self.branchColorPreview) {
          self.branchColorPreview(hex);
        }
      }
    });

    fontColorPicker.miniColors({
      hide : function(hex) {
        // dont emit event if picker was hidden due to disable
        if (this.attr('disabled')) {
          return;
        }
        console.log("font", hex);
        if (self.fontColorPicked) {
          self.fontColorPicked(hex);
        }
      },

      move: function(hex) {
        if (self.fontColorPreview) {
          self.fontColorPreview(hex);
        }
      }
    });

    $branchColorChildrenButton.click(function() {
      if (self.branchColorChildrenButtonClicked) {
        self.branchColorChildrenButtonClicked();
      }
    });
  };
};

/**
 * Creates a new InspectorPresenter. This presenter manages basic node
 * attributes like font settings and branch color.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.MindMapModel} mindmapModel
 * @param {mindmaps.InspectorView} view
 */
mindmaps.InspectorPresenter = function(eventBus, mindmapModel, view) {
  var self = this;

  /**
   * View callbacks: React to user input and execute appropiate action.
   */

  view.fontSizeDecreaseButtonClicked = function() {
    var action = new mindmaps.action.DecreaseNodeFontSizeAction(
        mindmapModel.selectedNode);
    mindmapModel.executeAction(action);
  };

  view.fontSizeIncreaseButtonClicked = function() {
    var action = new mindmaps.action.IncreaseNodeFontSizeAction(
        mindmapModel.selectedNode);
    mindmapModel.executeAction(action);
  };

  view.fontBoldCheckboxClicked = function(checked) {
    var action = new mindmaps.action.SetFontWeightAction(
        mindmapModel.selectedNode, checked);
    mindmapModel.executeAction(action);
  };

  view.fontItalicCheckboxClicked = function(checked) {
    var action = new mindmaps.action.SetFontStyleAction(
        mindmapModel.selectedNode, checked);
    mindmapModel.executeAction(action);
  };

  view.fontUnderlineCheckboxClicked = function(checked) {
    var action = new mindmaps.action.SetFontDecorationAction(
        mindmapModel.selectedNode, checked ? "underline" : "none");
    mindmapModel.executeAction(action);
  };

  view.fontLinethroughCheckboxClicked = function(checked) {
    var action = new mindmaps.action.SetFontDecorationAction(
        mindmapModel.selectedNode, checked ? "line-through" : "none");
    mindmapModel.executeAction(action);
  };

  view.branchColorPicked = function(color) {
    var action = new mindmaps.action.SetBranchColorAction(mindmapModel.selectedNode, color);
    mindmapModel.executeAction(action);
  };

  view.branchColorPreview = function(color) {
    eventBus.publish(mindmaps.Event.NODE_BRANCH_COLOR_PREVIEW, 
        mindmapModel.selectedNode, color);
  }

  view.fontColorPicked = function(color) {
    var action = new mindmaps.action.SetFontColorAction(
        mindmapModel.selectedNode, color);
    mindmapModel.executeAction(action);
  };

  view.fontColorPreview = function(color) {
    eventBus.publish(mindmaps.Event.NODE_FONT_COLOR_PREVIEW, 
        mindmapModel.selectedNode, color);
  };

  /**
   * Change branch color of all the node's children.
   */
  view.branchColorChildrenButtonClicked = function() {
    var action = new mindmaps.action.SetChildrenBranchColorAction(
        mindmapModel.selectedNode);
    mindmapModel.executeAction(action);
  }

  /**
   * Update view on font events.
   */
  eventBus.subscribe(mindmaps.Event.NODE_FONT_CHANGED, function(node) {
    if (mindmapModel.selectedNode === node) {
      updateView(node);
    }
  });

  eventBus.subscribe(mindmaps.Event.NODE_BRANCH_COLOR_CHANGED,
      function(node) {
        if (mindmapModel.selectedNode === node) {
          updateView(node);
        }
      });

  eventBus.subscribe(mindmaps.Event.NODE_SELECTED, function(node) {
    updateView(node);
  });

  /**
   * Enable controls when a document has been opened.
   */
  eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
    view.setControlsEnabled(true);
  });

  /**
   * Disable controls when document was closed.
   */
  eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
    view.setControlsEnabled(false);
  });

  /**
   * Sets the view params to match the node's attributes.
   * 
   * @param {mindmaps.Node} node
   */
  function updateView(node) {
    var font = node.text.font;
    view.setBoldCheckboxState(font.weight === "bold");
    view.setItalicCheckboxState(font.style === "italic");
    view.setUnderlineCheckboxState(font.decoration === "underline");
    view.setLinethroughCheckboxState(font.decoration === "line-through");
    view.setFontColorPickerColor(font.color);
    view.setBranchColorPickerColor(node.branchColor);
  }

  this.go = function() {
    view.init();
  };
};


/*js/ToolBar.js*/
/**
 * Creates a new ToolBarView.
 * 
 * @constructor
 */
mindmaps.ToolBarView = function() {
  var self = this;

  this.init = function() {
  };

  /**
   * Adds a button to the toolbar with the given align function.
   * 
   * @param {mindmaps.ToolBarButton} button
   * @param {Function} alignFunc
   */
  this.addButton = function(button, alignFunc) {
    // var $button = this.createButton(button);
    alignFunc(button.asJquery());
  };

  /**
   * Adds a set of buttons grouped together to the toolbar.
   * 
   * @param {mindmaps.ToolBarButton[]} buttons
   * @param {Function} alignFunc
   */
  this.addButtonGroup = function(buttons, alignFunc) {
    var $buttonset = $("<span/>");
    buttons.forEach(function(button) {
      // var $button = self.createButton(button);
      $buttonset.append(button.asJquery());
    });
    $buttonset.buttonset();
    alignFunc($buttonset);
  };

  /**
   * Adds a menu to the toolbar.
   * 
   * @param {mindmaps.ToolBarMenu} menu
   */
  this.addMenu = function(menu) {
    this.alignRight(menu.getContent());
  };

  /**
   * Adds the element to the left side of the toolbar.
   * 
   * @param {jQuery} $el
   */
  this.alignLeft = function($el) {
    $el.appendTo("#toolbar .buttons-left");
  };

  /**
   * Adds the element to the right side of the toolbar.
   * 
   * @param {jQuery} $el
   */
  this.alignRight = function($el) {
    $el.appendTo("#toolbar .buttons-right");
  };
};

/**
 * Toolbar button model.
 * 
 * @constructor
 * @param {mindmaps.Command} command
 */

mindmaps.ToolBarButton = function(command) {
  this.command = command;

  // callback to update display state
  var self = this;
  command.subscribe(mindmaps.Command.Event.ENABLED_CHANGED,
      function(enabled) {
        if (self.setEnabled) {
          self.setEnabled(enabled);
        }
      });
};

/**
 * Returns whether the button should have an enabled style.
 * 
 * @returns {Boolean}
 */
mindmaps.ToolBarButton.prototype.isEnabled = function() {
  return this.command.enabled;
};

/**
 * Executes the button's command.
 */
mindmaps.ToolBarButton.prototype.click = function() {
  this.command.execute();
};

/**
 * Gets the button's title.
 * 
 * @returns {String}
 */
mindmaps.ToolBarButton.prototype.getTitle = function() {
  return this.command.label;
};

/**
 * Gets the tooltip.
 * 
 * @returns {String}
 */
mindmaps.ToolBarButton.prototype.getToolTip = function() {
  var tooltip = this.command.description; 
  
  var shortcut = this.command.shortcut;
  if (shortcut) {
    if (Array.isArray(shortcut)) {
      shortcut = shortcut.join(", ");
    }

    tooltip += " [" + shortcut.toUpperCase() + "]";
  }

  return tooltip;
};

/**
 * Gets the unique id of the button.
 * 
 * @returns {String}
 */
mindmaps.ToolBarButton.prototype.getId = function() {
  return "button-" + this.command.id;
};

/**
 * Constructs a jQuery element that represents the button.
 * 
 * @returns {jQuery}
 */
mindmaps.ToolBarButton.prototype.asJquery = function() {
  var self = this;
  var $button = $("<button/>", {
    id : this.getId(),
    title : this.getToolTip()
  }).click(function() {
    self.click();
  }).button({
    label : this.getTitle(),
    disabled : !this.isEnabled()
  });

  var icon = this.command.icon;
  if (icon) {
    $button.button({
      icons : {
        primary : icon
      }
    });
  }

  // callback to update display state
  this.setEnabled = function(enabled) {
    $button.button(enabled ? "enable" : "disable");
  };

  return $button;
};

/**
 * Creates a new ToolBarMenu.
 * 
 * @constructor
 * @param {String} title
 * @param {String} icon
 */
mindmaps.ToolBarMenu = function(title, icon) {
  var self = this;
  this.$menuWrapper = $("<span/>", {
    "class" : "menu-wrapper"
  }).hover(function() {
    self.$menu.show();
  }, function() {
    self.$menu.hide();
  });

  this.$menuButton = $("<button/>").button({
    label : title,
    icons : {
      primary : icon,
      secondary : "ui-icon-triangle-1-s"
    }
  }).appendTo(this.$menuWrapper);

  this.$menu = $("<div/>", {
    "class" : "menu"
  }).click(function() {
    self.$menu.hide();
  }).appendTo(this.$menuWrapper);

  /**
   * Adds a new button entry to the menu.
   * 
   * @param {mindmaps.ToolBarButton|mindmaps.ToolBarButtons[]} buttons a
   *            single button or an array of buttons
   */
  this.add = function(buttons) {
    if (!Array.isArray(buttons)) {
      buttons = [ buttons ];
    }

    buttons.forEach(function(button) {
      var $button = button.asJquery().removeClass("ui-corner-all")
          .addClass("menu-item");
      this.$menu.append($button);
    }, this);

    // last item gets rounded corners
    this.$menu.children().last().addClass("ui-corner-bottom").prev()
        .removeClass("ui-corner-bottom");
  };

  /**
   * Returns the underlying jquery object.
   * 
   * @returns {jQuery}
   */
  this.getContent = function() {
    return this.$menuWrapper;
  };
};

/**
 * Creates a new ToolBarPresenter.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 * @param {mindmaps.ToolBarView} view
 * @param {mindmaps.MindMapModel} mindmapModel
 */
mindmaps.ToolBarPresenter = function(eventBus, commandRegistry, view,
    mindmapModel) {
  /**
   * Returns a button that registers with a command of the given commandType
   * 
   * @param {mindmaps.Command} commandType
   * @returns {mindmaps.ToolBarButton}
   */
  function commandToButton(commandType) {
    var command = commandRegistry.get(commandType);
    return new mindmaps.ToolBarButton(command);
  }

  function commandsToButtons(commands) {
    return commands.map(commandToButton);
  }

  // populate toolbar

  // node buttons
  var nodeCommands = [ mindmaps.CreateNodeCommand, mindmaps.DeleteNodeCommand ];
  var nodeButtons = commandsToButtons(nodeCommands);
  view.addButtonGroup(nodeButtons, view.alignLeft);

  // undo buttons
  var undoCommands = [ mindmaps.UndoCommand, mindmaps.RedoCommand ];
  var undoButtons = commandsToButtons(undoCommands);
  view.addButtonGroup(undoButtons, view.alignLeft);

  // clipboard buttons.
  var clipboardCommands = [ mindmaps.CopyNodeCommand,
      mindmaps.CutNodeCommand, mindmaps.PasteNodeCommand ];
  var clipboardButtons = commandsToButtons(clipboardCommands);
  view.addButtonGroup(clipboardButtons, view.alignLeft);

  // file menu
  var fileMenu = new mindmaps.ToolBarMenu("Mind map", "ui-icon-document");
  var fileCommands = [ mindmaps.NewDocumentCommand,
      mindmaps.OpenDocumentCommand, mindmaps.SaveDocumentCommand,
      mindmaps.ExportCommand, mindmaps.PrintCommand,
      mindmaps.CloseDocumentCommand ];
  var fileButtons = commandsToButtons(fileCommands);
  fileMenu.add(fileButtons);
  view.addMenu(fileMenu);

  // help button
  view.addButton(commandToButton(mindmaps.HelpCommand), view.alignRight);

  this.go = function() {
    view.init();
  };
};


/*js/StatusBar.js*/
// TODO Rename those objects to TaskBar*

/**
 * Creates a new StatusBarView.
 * 
 * @constructor
 */
mindmaps.StatusBarView = function() {
  var self = this;
  var $statusbar = $("#statusbar");

  this.init = function() {
  };

  /**
   * Creates and adds a new button to the stats baar.
   * 
   * @param {String} id
   * @param {String} text
   * @returns {jQuery}
   */
  this.createButton = function(id, text) {
    return $("<button/>", {
      id : "statusbar-button-" + id
    }).button({
      label : text
    }).click(function() {
      if (self.buttonClicked) {
        self.buttonClicked(id);
      }
    }).prependTo($statusbar.find(".buttons"));
  };

  /**
   * Returns the underlying jquery object.
   * 
   * @returns {jQuery}
   */
  this.getContent = function() {
    return $statusbar;
  };
};

/**
 * Creates a new StatusBarPresenter. This object provides buttons for the
 * floating panels for a taskbar-like behaviour.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.StatusBarView} view
 */
mindmaps.StatusBarPresenter = function(eventBus, view) {
  var buttonCounter = 0;
  var buttonIdPanelMap = {};
  var statusController = new mindmaps.StatusNotificationController(eventBus,
      view.getContent());

  view.buttonClicked = function(id) {
    buttonIdPanelMap[id].toggle();
  };

  this.go = function() {
    view.init();

  };

  /**
   * Adds a new button for a panel to the statusbar and registers the button
   * as a hide target for the panel.
   * 
   * @param {mindmaps.FloatPanel} panel
   */
  this.addEntry = function(panel) {
    var id = buttonCounter++;
    var $button = view.createButton(id, panel.caption);
    panel.setHideTarget($button);
    buttonIdPanelMap[id] = panel;
  };
};

/**
 * This object subscribes to some events and displays status messages in the
 * bottom right corner.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.StatusBarView} view
 */
mindmaps.StatusNotificationController = function(eventBus, view) {
  var $anchor = $("<div class='notification-anchor'/>").css({
    position : "absolute",
    right : 20
  }).appendTo(view);

  eventBus.subscribe(mindmaps.Event.DOCUMENT_SAVED, function() {
    var n = new mindmaps.Notification($anchor, {
      position : "topRight",
      expires : 2500,
      content : "Mind map saved"
    });
  });
  
  eventBus.subscribe(mindmaps.Event.NOTIFICATION_INFO, function(message) {
    var n = new mindmaps.Notification($anchor, {
      position : "topRight",
      content : message,
      expires : 2500,
      type: "info"
    });
  });
  
  eventBus.subscribe(mindmaps.Event.NOTIFICATION_WARN, function(message) {
    var n = new mindmaps.Notification($anchor, {
      position : "topRight",
      title: "Warning",
      content : message,
      expires : 3000,
      type: "warn"
    });
  });
  
  
  eventBus.subscribe(mindmaps.Event.NOTIFICATION_ERROR, function(message) {
    var n = new mindmaps.Notification($anchor, {
      position : "topRight",
      title: "Error",
      content : message,
      expires : 3500,
      type: "error"
    });
  });
};


/*js/CanvasDrawingTools.js*/
mindmaps.CanvasDrawingUtil = {
  /**
   * Calculates the width of a branch for a node for the given depth
   * 
   * @param {Integer} depth the depth of the node
   * @returns {Number}
   */
  getLineWidth : function(zoomFactor, depth) {
    // var width = this.zoomFactor * (10 - depth);
    var width = zoomFactor * (12 - depth * 2);

    if (width < 2) {
      width = 2;
    }

    return width;
  },

  /**
   * Draws a rounded rectangle
   * @param ctx
   * @param x
   * @param y
   * @param width
   * @param height
   * @param radius
   */
  roundedRect : function roundedRect(ctx, x, y, width, height, radius) {
    // from MDN docs
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height
        - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
    ctx.fill();
  }
};

/**
 * Object that draws the line connection (the branch) between two nodes onto a
 * canvas object.
 * 
 * @constructor
 */
mindmaps.CanvasBranchDrawer = function() {
  /**
   * Callback during render() method. Is called after calculating the
   * boundaries of the line and before actual drawing.
   * 
   * @event
   */
  this.beforeDraw = function(width, height, left, top) {

  };

  /**
   * Render that.
   * 
   * @param {CanvasRenderingContext2D} ctx
   * @param {Integer} depth
   * @param {Number} offsetX
   * @param {Number} offsetY
   * @param {jQuery} $node
   * @param {jQuery} $parent
   * @param {String} color
   * @param {Number} zoomFactor
   */
  this.render = function(ctx, depth, offsetX, offsetY, $node, $parent, color,
      zoomFactor) {

    offsetX = offsetX * zoomFactor;
    offsetY = offsetY * zoomFactor;

    var pw = $parent.width();
    var nw = $node.width();
    var pih = $parent.innerHeight();
    var nih = $node.innerHeight();

    // line is drawn from node to parent
    // draw direction
    var leftToRight, topToBottom;

    // node overlaps with parent above or delow
    var overlap = false;

    // canvas attributes
    var left, top, width, height;
    var bColor;

    // position relative to parent
    var nodeLeft = offsetX + nw / 2 < pw / 2;
    if (nodeLeft) {
      var aOffsetX = Math.abs(offsetX);
      if (aOffsetX > nw) {
        // normal left

        // make it one pixel too wide to fix firefox rounding issues
        width = aOffsetX - nw + 1;
        left = nw;
        leftToRight = true;

        // bColor = "red";
      } else {
        // left overlap
        left = -offsetX;
        width = nw + offsetX;
        leftToRight = false;
        overlap = true;

        // bColor = "orange";
      }
    } else {
      if (offsetX > pw) {
        // normal right

        // make it one pixel too wide to fix firefox rounding issues
        width = offsetX - pw + 1;
        left = pw - offsetX;
        leftToRight = false;

        // bColor = "green";
      } else {
        // right overlap
        width = pw - offsetX;
        left = 0;
        leftToRight = true;
        overlap = true;

        // bColor = "yellow";
      }
    }

    var lineWidth = mindmaps.CanvasDrawingUtil.getLineWidth(zoomFactor,
        depth);
    var halfLineWidth = lineWidth / 2;

    // avoid zero widths
    if (width < lineWidth) {
      width = lineWidth;
    }

    var nodeAbove = offsetY + nih < pih;
    if (nodeAbove) {
      top = nih;
      height = $parent.outerHeight() - offsetY - top;

      topToBottom = true;
    } else {
      top = pih - offsetY;
      height = $node.outerHeight() - top;

      topToBottom = false;
    }

    // fire before draw event
    this.beforeDraw(width, height, left, top);

    // determine start and end coordinates
    var startX, startY, endX, endY;
    if (leftToRight) {
      startX = 0;
      endX = width;
    } else {
      startX = width;
      endX = 0;
    }

    // calculate difference in line width to parent node
    // and position line vertically centered to parent line
    var pLineWidth = mindmaps.CanvasDrawingUtil.getLineWidth(zoomFactor,
        depth - 1);
    var diff = (pLineWidth - lineWidth) / 2;

    if (topToBottom) {
      startY = 0 + halfLineWidth;
      endY = height - halfLineWidth - diff;
    } else {
      startY = height - halfLineWidth;
      endY = 0 + halfLineWidth + diff;
    }

    // calculate bezier points
    if (!overlap) {
      var cp2x = startX > endX ? startX / 5 : endX - (endX / 5);
      var cp2y = endY;

      var cp1x = Math.abs(startX - endX) / 2;
      var cp1y = startY;
    } else {
      // node overlaps with parent

      // take left and right a bit away so line fits fully in canvas
      if (leftToRight) {
        startX += halfLineWidth;
        endX -= halfLineWidth;
      } else {
        startX -= halfLineWidth;
        endX += halfLineWidth;
      }

      // reversed bezier for overlap
      var cp1x = startX;
      var cp1y = Math.abs(startY - endY) / 2;

      var cp2x = endX;
      var cp2y = startY > endY ? startY / 5 : endY - (endY / 5);
    }

    // draw
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    ctx.stroke();

    var drawControlPoints = false;
    if (drawControlPoints) {
      // control points
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(cp1x, cp1y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "green";
      ctx.arc(cp2x, cp2y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };
};

/**
 * Utility module that calculates how much space a text would take up in a node.
 * This is done through a dummy div that has the same formatting as the node and
 * gets the text injected.
 * 
 */
mindmaps.TextMetrics = (function() {
  var $div = $("<div/>", {
    "class" : "node-text-behaviour"
  }).css({
    position : "absolute",
    visibility : "hidden",
    height : "auto",
    width : "auto"
  }).prependTo($("body"));

  return {
    /**
     * @constant
     */
    ROOT_CAPTION_MIN_WIDTH : 100,

    /**
     * @constant
     */
    NODE_CAPTION_MIN_WIDTH : 70,

    /**
     * @constant
     */
    NODE_CAPTION_MAX_WIDTH : 150,

    /**
     * Calculates the width and height a node would have to provide to show
     * the text.
     * 
     * @param {mindmaps.Node} node the node whose text is to be measured.
     * @param {mindmaps.Node} [text] use this instead of the text of node
     * @returns {Object} object with properties width and height.
     */
    getTextMetrics : function(node, zoomFactor, text) {
      zoomFactor = zoomFactor || 1;
      text = text || node.getCaption();
      var font = node.text.font;
      var minWidth = node.isRoot() ? this.ROOT_CAPTION_MIN_WIDTH
          : this.NODE_CAPTION_MIN_WIDTH;
      var maxWidth = this.NODE_CAPTION_MAX_WIDTH;

      $div.css({
        "font-size" : zoomFactor * font.size,
        "min-width" : zoomFactor * minWidth,
        "max-width" : zoomFactor * maxWidth,
        "font-weight" : font.weight
      }).text(text);

      // add some safety pixels for firefox, otherwise it doesnt render
      // right on textareas
      var w = $div.width() + 2;
      var h = $div.height() + 2;

      return {
        width : w,
        height : h
      };
    }
  };
})();


/*js/CanvasView.js*/
// TODO take container as argument,c reate drawing area dynamically. remove on
// clear();, recreate on init()

/**
 * Creates a new CanvasView. This is the base class for all canvas view
 * implementations.
 * 
 * @constructor
 */
mindmaps.CanvasView = function() {
  /**
   * Returns the element that used to draw the map upon.
   * 
   * @returns {jQuery}
   */
  this.$getDrawingArea = function() {
    return $("#drawing-area");
  };

  /**
   * Returns the element that contains the drawing area.
   * 
   * @returns {jQuery}
   */
  this.$getContainer = function() {
    return $("#canvas-container");
  };

  /**
   * Scrolls the container to show the center of the drawing area.
   */
  this.center = function() {
    var c = this.$getContainer();
    var area = this.$getDrawingArea();
    var w = area.width() - c.width();
    var h = area.height() - c.height();
    this.scroll(w / 2, h / 2);
  };

  /**
   * Scrolls the container.
   * 
   * @param {Number} x
   * @param {Number} y
   */
  this.scroll = function(x, y) {
    var c = this.$getContainer();
    c.scrollLeft(x).scrollTop(y);
  };

  /**
   * Changes the size of the drawing area to match with with the new zoom
   * factor and scrolls the container to adjust the view port.
   */
  this.applyViewZoom = function() {
    var delta = this.zoomFactorDelta;
    // console.log(delta);

    var c = this.$getContainer();
    var sl = c.scrollLeft();
    var st = c.scrollTop();

    var cw = c.width();
    var ch = c.height();
    var cx = cw / 2 + sl;
    var cy = ch / 2 + st;

    cx *= this.zoomFactorDelta;
    cy *= this.zoomFactorDelta;

    sl = cx - cw / 2;
    st = cy - ch / 2;
    // console.log(sl, st);

    var drawingArea = this.$getDrawingArea();
    var width = drawingArea.width();
    var height = drawingArea.height();
    drawingArea.width(width * delta).height(height * delta);

    // scroll only after drawing area's width was set.
    this.scroll(sl, st);

    // adjust background size
    var backgroundSize = parseFloat(drawingArea.css("background-size"));
    if (isNaN(backgroundSize)) {
      // parsing could possibly fail in the future.
      console.warn("Could not set background-size!");
    }
    drawingArea.css("background-size", backgroundSize * delta);
  };

  /**
   * Applies the new size according to current zoom factor.
   * 
   * @param {Integer} width
   * @param {Integer} height
   */
  this.setDimensions = function(width, height) {
    width = width * this.zoomFactor;
    height = height * this.zoomFactor;

    var drawingArea = this.$getDrawingArea();
    drawingArea.width(width).height(height);
  };

  /**
   * Sets the new zoom factor and stores the delta to the old one.
   * 
   * @param {Number} zoomFactor
   */
  this.setZoomFactor = function(zoomFactor) {
    this.zoomFactorDelta = zoomFactor / (this.zoomFactor || 1);
    this.zoomFactor = zoomFactor;
  };
};

/**
 * Should draw the mind map onto the drawing area.
 * 
 * @param {mindmaps.MindMap} map
 */
mindmaps.CanvasView.prototype.drawMap = function(map) {
  throw new Error("Not implemented");
};

/**
 * Creates a new DefaultCanvasView. This is the reference implementation for
 * drawing mind maps.
 * 
 * @extends mindmaps.CanvasView
 * @constructor
 */
mindmaps.DefaultCanvasView = function() {
  var self = this;
  var nodeDragging = false;
  var creator = new Creator(this);
  var captionEditor = new CaptionEditor(this);
  captionEditor.commit = function(node, text) {
    if (self.nodeCaptionEditCommitted) {
      self.nodeCaptionEditCommitted(node, text);
    }
  };

  var textMetrics = mindmaps.TextMetrics;
  var branchDrawer = new mindmaps.CanvasBranchDrawer();
  branchDrawer.beforeDraw = function(width, height, left, top) {
    this.$canvas.attr({
      width : width,
      height : height
    }).css({
      left : left,
      top : top
    });
  };

  /**
   * Enables dragging of the map with the mouse.
   */
  function makeDraggable() {
    self.$getContainer().dragscrollable({
      dragSelector : "#drawing-area, canvas.line-canvas",
      acceptPropagatedEvent : false,
      delegateMode : true,
      preventDefault : true
    });
  }

  function $getNodeCanvas(node) {
    return $("#node-canvas-" + node.id);
  }

  function $getNode(node) {
    return $("#node-" + node.id);
  }

  function $getNodeCaption(node) {
    return $("#node-caption-" + node.id);
  }

  function drawLineCanvas($canvas, depth, offsetX, offsetY, $node, $parent,
      color) {
    var canvas = $canvas[0];
    var ctx = canvas.getContext("2d");

    // set $canvas for beforeDraw() callback.
    branchDrawer.$canvas = $canvas;
    branchDrawer.render(ctx, depth, offsetX, offsetY, $node, $parent,
        color, self.zoomFactor);
  }

  this.init = function() {
    makeDraggable();
    this.center();

    var $drawingArea = this.$getDrawingArea();
    $drawingArea.addClass("mindmap");

    // setup delegates
    $drawingArea.delegate("div.node-caption", "mousedown", function(e) {
      var node = $(this).parent().data("node");
      if (self.nodeMouseDown) {
        self.nodeMouseDown(node);
      }
    });

    $drawingArea.delegate("div.node-caption", "mouseup", function(e) {
      var node = $(this).parent().data("node");
      if (self.nodeMouseUp) {
        self.nodeMouseUp(node);
      }
    });

    $drawingArea.delegate("div.node-caption", "dblclick", function(e) {
      var node = $(this).parent().data("node");
      if (self.nodeDoubleClicked) {
        self.nodeDoubleClicked(node);
      }
    });

    $drawingArea.delegate("div.node-container", "mouseover", function(e) {
      if (e.target === this) {
        var node = $(this).data("node");
        if (self.nodeMouseOver) {
          self.nodeMouseOver(node);
        }
      }
      return false;
    });

    $drawingArea.delegate("div.node-caption", "mouseover", function(e) {
      if (e.target === this) {
        var node = $(this).parent().data("node");
        if (self.nodeCaptionMouseOver) {
          self.nodeCaptionMouseOver(node);
        }
      }
      return false;
    });

    // mouse wheel listener
    this.$getContainer().bind("mousewheel", function(e, delta) {
      if (self.mouseWheeled) {
		  //edit
    	if (e.preventDefault) {e.preventDefault(); e.stopPropagation();}
		else {e.returnValue = false; e.cancelBubble = true;}		
        self.mouseWheeled(delta);
      }
    });
  };

  /**
   * Clears the drawing area.
   */
  this.clear = function() {
    var drawingArea = this.$getDrawingArea();
    drawingArea.children().remove();
    drawingArea.width(0).height(0);
  };

  /**
   * Calculates the width of a branch for a node for the given depth
   * 
   * @param {Integer} depth the depth of the node
   * @returns {Number}
   */
  this.getLineWidth = function(depth) {
    return mindmaps.CanvasDrawingUtil.getLineWidth(this.zoomFactor, depth);
  };

  /**
   * Draws the complete map onto the drawing area. This should only be called
   * once for a mind map.
   */
  this.drawMap = function(map) {
    var now = new Date().getTime();
    var $drawingArea = this.$getDrawingArea();

    // clear map first
    $drawingArea.children().remove();

    var root = map.root;

    // 1.5. do NOT detach for now since DIV dont have widths and heights,
    // and loading maps draws wrong canvases (or create nodes and then draw
    // canvases)

    var detach = false;
    if (detach) {
      // detach drawing area during map creation to avoid unnecessary DOM
      // repaint events. (binary7 is 3 times faster)
      var $parent = $drawingArea.parent();
      $drawingArea.detach();
      self.createNode(root, $drawingArea);
      $drawingArea.appendTo($parent);
    } else {
      self.createNode(root, $drawingArea);
    }

    console.debug("draw map ms: ", new Date().getTime() - now);
  };

  /**
   * Inserts a new node including all of its children into the DOM.
   * 
   * @param {mindmaps.Node} node - The model of the node.
   * @param {jQuery} [$parent] - optional jquery parent object the new node is
   *            appended to. Usually the parent node. If argument is omitted,
   *            the getParent() method of the node is called to resolve the
   *            parent.
   * @param {Integer} [depth] - Optional. The depth of the tree relative to
   *            the root. If argument is omitted the getDepth() method of the
   *            node is called to resolve the depth.
   */
  this.createNode = function(node, $parent, depth) {
    var parent = node.getParent();
    var $parent = $parent || $getNode(parent);
    var depth = depth || node.getDepth();
    var offsetX = node.offset.x;
    var offsetY = node.offset.y;

    // div node container
    var $node = $("<div/>", {
      id : "node-" + node.id,
      "class" : "node-container"
    }).data({
      node : node
    }).css({
      "font-size" : node.text.font.size
    });
    $node.appendTo($parent);

    if (node.isRoot()) {
      var w = this.getLineWidth(depth);
      $node.css("border-bottom-width", w);
    }

    if (!node.isRoot()) {
      // draw border and position manually only non-root nodes
      var bThickness = this.getLineWidth(depth);
      var bColor = node.branchColor;
      var bb = bThickness + "px solid " + bColor;

      $node.css({
        left : this.zoomFactor * offsetX,
        top : this.zoomFactor * offsetY,
        "border-bottom" : bb
      });

      // node drag behaviour
      /**
       * Only attach the drag handler once we mouse over it. this speeds
       * up loading of big maps.
       */
      $node.one("mouseenter", function() {
        $node.draggable({
          // could be set
          // revert: true,
          // revertDuration: 0,
          handle : "div.node-caption:first",
          start : function() {
            nodeDragging = true;
          },
          drag : function(e, ui) {
            // reposition and draw canvas while dragging
            var offsetX = ui.position.left / self.zoomFactor;
            var offsetY = ui.position.top / self.zoomFactor;
            var color = node.branchColor;
            var $canvas = $getNodeCanvas(node);

            drawLineCanvas($canvas, depth, offsetX, offsetY, $node,
                $parent, color);

            // fire dragging event
            if (self.nodeDragging) {
              self.nodeDragging();
            }
          },
          stop : function(e, ui) {
            nodeDragging = false;
            var pos = new mindmaps.Point(ui.position.left
                / self.zoomFactor, ui.position.top
                / self.zoomFactor);

            // fire dragged event
            if (self.nodeDragged) {
              self.nodeDragged(node, pos);
            }
          }
        });
      });
    }

    // text caption
    var font = node.text.font;
    var $text = $("<div/>", {
      id : "node-caption-" + node.id,
      "class" : "node-caption node-text-behaviour",
      text : node.text.caption
    }).css({
      "color" : font.color,
      "font-size" : this.zoomFactor * 100 + "%",
      "font-weight" : font.weight,
      "font-style" : font.style,
      "text-decoration" : font.decoration
    }).appendTo($node);

    var metrics = textMetrics.getTextMetrics(node, this.zoomFactor);
    $text.css(metrics);

    // create fold button for parent if he hasn't one already
    var parentAlreadyHasFoldButton = $parent.data("foldButton");
    var nodeOrParentIsRoot = node.isRoot() || parent.isRoot();
    if (!parentAlreadyHasFoldButton && !nodeOrParentIsRoot) {
      this.createFoldButton(parent);
    }

    if (!node.isRoot()) {
      // toggle visibility
      if (parent.foldChildren) {
        $node.hide();
      } else {
        $node.show();
      }

      // draw canvas to parent if node is not a root
      var $canvas = $("<canvas/>", {
        id : "node-canvas-" + node.id,
        "class" : "line-canvas"
      });

      // position and draw connection
      drawLineCanvas($canvas, depth, offsetX, offsetY, $node, $parent,
          node.branchColor);
      $canvas.appendTo($node);
    }

    if (node.isRoot()) {
      $node.children().andSelf().addClass("root");
    }

    // draw child nodes
    node.forEachChild(function(child) {
      self.createNode(child, $node, depth + 1);
    });
  };

  /**
   * Removes a node from the view and with it all its children and the branch
   * leading to the parent.
   * 
   * @param {mindmaps.Node} node
   */
  this.deleteNode = function(node) {
    // detach creator first, we need still him
    // creator.detach();

    // delete all DOM below
    var $node = $getNode(node);
    $node.remove();
  };

  /**
   * Highlights a node to show that it is selected.
   * 
   * @param {mindmaps.Node} node
   */
  this.highlightNode = function(node) {
    var $text = $getNodeCaption(node);
    $text.addClass("selected");
  };

  /**
   * Removes the hightlight of a node.
   * 
   * @param {mindmaps.Node} node
   */
  this.unhighlightNode = function(node) {
    var $text = $getNodeCaption(node);
    $text.removeClass("selected");
  };

  /**
   * Hides all children of a node.
   * 
   * @param {mindmaps.Node} node
   */
  this.closeNode = function(node) {
    var $node = $getNode(node);
    $node.children(".node-container").hide();

    var $foldButton = $node.children(".button-fold").first();
    $foldButton.removeClass("open").addClass("closed");
  };

  /**
   * Shows all children of a node.
   * 
   * @param {mindmaps.Node} node
   */
  this.openNode = function(node) {
    var $node = $getNode(node);
    $node.children(".node-container").show();

    var $foldButton = $node.children(".button-fold").first();
    $foldButton.removeClass("closed").addClass("open");
  };

  /**
   * Creates the fold button for a node that shows/hides its children.
   * 
   * @param {mindmaps.Node} node
   */
  this.createFoldButton = function(node) {
    var position = node.offset.x > 0 ? " right" : " left";
    var openClosed = node.foldChildren ? " closed" : " open";
    var $foldButton = $("<div/>", {
      "class" : "button-fold no-select" + openClosed + position
    }).click(function(e) {
      // fire event
      if (self.foldButtonClicked) {
        self.foldButtonClicked(node);
      }

      e.preventDefault();
      return false;
    });

    // remember that foldButton was set and attach to node
    var $node = $getNode(node);
    $node.data({
      foldButton : true
    }).append($foldButton);
  };

  /**
   * Removes the fold button.
   * 
   * @param {mindmaps.Node} node
   */
  this.removeFoldButton = function(node) {
    var $node = $getNode(node);
    $node.data({
      foldButton : false
    }).children(".button-fold").remove();
  };

  /**
   * Goes into edit mode for a node.
   * 
   * @param {mindmaps.Node} node
   */
  this.editNodeCaption = function(node) {
    captionEditor.edit(node, this.$getDrawingArea());
  };

  /**
   * Stops the current edit mode.
   */
  this.stopEditNodeCaption = function() {
    captionEditor.stop();
  };

  /**
   * Updates the text caption for a node.
   * 
   * @param {mindmaps.Node} node
   * @param {String} value
   */
  this.setNodeText = function(node, value) {
    var $text = $getNodeCaption(node);
    var metrics = textMetrics.getTextMetrics(node, this.zoomFactor, value);
    $text.css(metrics).text(value);
  };

  /**
   * Get a reference to the creator tool.
   * 
   * @returns {Creator}
   */
  this.getCreator = function() {
    return creator;
  };

  /**
   * Returns whether a node is currently being dragged.
   * 
   * @returns {Boolean}
   */
  this.isNodeDragging = function() {
    return nodeDragging;
  };

  /**
   * Redraws a node's branch to its parent.
   * 
   * @param {mindmaps.Node} node
   * @param {String} optional color
   */
  function drawNodeCanvas(node, color) {
    var parent = node.getParent();
    var depth = node.getDepth();
    var offsetX = node.offset.x;
    var offsetY = node.offset.y;
    color = color || node.branchColor;

    var $node = $getNode(node);
    var $parent = $getNode(parent);
    var $canvas = $getNodeCanvas(node);

    drawLineCanvas($canvas, depth, offsetX, offsetY, $node, $parent, color);
  }

  /**
   * Redraws all branches that a node is connected to.
   * 
   * @param {mindmaps.Node} node
   */
  this.redrawNodeConnectors = function(node) {

    // redraw canvas to parent
    if (!node.isRoot()) {
      drawNodeCanvas(node);
    }

    // redraw all child canvases
    if (!node.isLeaf()) {
      node.forEachChild(function(child) {
        drawNodeCanvas(child);
      });
    }
  };

  /**
   * Changes only the color of the branch leading up to it's parent.
   */
  this.updateBranchColor = function(node, color) {
    var $node = $getNode(node);
    $node.css("border-bottom-color", color);
    
    // redraw canvas to parent
    if (!node.isRoot()) {
      drawNodeCanvas(node, color);
    }
  };

  /**
   * Changes only the font color of a node.
   */
  this.updateFontColor = function(node, color) {
    var $text = $getNodeCaption(node);
    $text.css("color", color);
  };

  /**
   * Does a complete visual update of a node to reflect all of its attributes.
   * 
   * @param {mindmaps.Node} node
   */
  this.updateNode = function(node) {
    var $node = $getNode(node);
    var $text = $getNodeCaption(node);
    var font = node.text.font;
    $node.css({
      "font-size" : font.size,
      "border-bottom-color" : node.branchColor
    });

    var metrics = textMetrics.getTextMetrics(node, this.zoomFactor);

    $text.css({
      "color" : font.color,
      "font-weight" : font.weight,
      "font-style" : font.style,
      "text-decoration" : font.decoration
    }).css(metrics);

    this.redrawNodeConnectors(node);
  };

  /**
   * Moves the node a new position.
   * 
   * @param {mindmaps.Node} node
   */
  this.positionNode = function(node) {
    var $node = $getNode(node);
    // TODO try animate
    // position
    $node.css({
      left : this.zoomFactor * node.offset.x,
      top : this.zoomFactor * node.offset.y
    });

    // redraw canvas to parent
    drawNodeCanvas(node);
  };

  /**
   * Redraws the complete map to adapt to a new zoom factor.
   */
  this.scaleMap = function() {
    var zoomFactor = this.zoomFactor;
    var $root = this.$getDrawingArea().children().first();
    var root = $root.data("node");

    var w = this.getLineWidth(0);
    $root.css("border-bottom-width", w);

    // handle root differently
    var $text = $getNodeCaption(root);
    var metrics = textMetrics.getTextMetrics(root, this.zoomFactor);
    $text.css(
        {
          "font-size" : zoomFactor * 100 + "%",
          "left" : zoomFactor
              * -mindmaps.TextMetrics.ROOT_CAPTION_MIN_WIDTH / 2
        }).css(metrics);

    root.forEachChild(function(child) {
      scale(child, 1);
    });

    function scale(node, depth) {
      var $node = $getNode(node);

      // draw border and position manually
      var bWidth = self.getLineWidth(depth);

      $node.css({
        left : zoomFactor * node.offset.x,
        top : zoomFactor * node.offset.y,
        "border-bottom-width" : bWidth
      });

      var $text = $getNodeCaption(node);
      $text.css({
        "font-size" : zoomFactor * 100 + "%"
      });

      var metrics = textMetrics.getTextMetrics(node, self.zoomFactor);
      $text.css(metrics);

      // redraw canvas to parent
      drawNodeCanvas(node);

      // redraw all child canvases
      if (!node.isLeaf()) {
        node.forEachChild(function(child) {
          scale(child, depth + 1);
        });
      }
    }
  };

  /**
   * Creates a new CaptionEditor. This tool offers an inline editor component
   * to change a node's caption.
   * 
   * @constructor
   * @param {mindmaps.CanvasView} view
   */
  function CaptionEditor(view) {
    var self = this;
    var attached = false;

    // text input for node edits.
    var $editor = $("<textarea/>", {
      id : "caption-editor",
      "class" : "node-text-behaviour"
    }).bind("keydown", "esc", function() {
      self.stop();
    }).bind("keydown", "return", function() {
      commitText();
    }).mousedown(function(e) {
      // avoid premature canceling
      e.stopPropagation();
    }).blur(function() {
      commitText();
    }).bind(
        "input",
        function() {
          var metrics = textMetrics.getTextMetrics(self.node,
              view.zoomFactor, $editor.val());
          $editor.css(metrics);
          alignBranches();
        });

    function commitText() {
      if (attached && self.commit) {
        self.commit(self.node, $editor.val());
      }
    }

    function alignBranches() {
      // slightly defer execution for better performance on slow
      // browsers
      setTimeout(function() {
        view.redrawNodeConnectors(self.node);
      }, 1);
    }

    /**
     * Attaches the textarea to the node and temporarily removes the
     * original node caption.
     * 
     * @param {mindmaps.Node} node
     * @param {jQuery} $cancelArea
     */
    this.edit = function(node, $cancelArea) {
      if (attached) {
        return;
      }
      this.node = node;
      attached = true;

      // TODO put text into span and hide()
      this.$text = $getNodeCaption(node);
      this.$cancelArea = $cancelArea;

      this.text = this.$text.text();

      this.$text.css({
        width : "auto",
        height : "auto"
      }).empty().addClass("edit");

      // jquery ui prevents blur() event from happening when dragging a
      // draggable. need this
      // workaround to detect click on other draggable
      $cancelArea.bind("mousedown.editNodeCaption", function(e) {
        commitText();
      });

      var metrics = textMetrics.getTextMetrics(self.node,
          view.zoomFactor, this.text);
      $editor.attr({
        value : this.text
      }).css(metrics).appendTo(this.$text).select();

    };

    /**
     * Removes the editor from the node and restores its old text value.
     */
    this.stop = function() {
      if (attached) {
        attached = false;
        this.$text.removeClass("edit");
        $editor.detach();
        this.$cancelArea.unbind("mousedown.editNodeCaption");
        view.setNodeText(this.node, this.text);

        alignBranches();
      }
    };
  }

  /**
   * Creates a new Creator. This tool is used to drag out new branches to
   * create new nodes.
   * 
   * @constructor
   * @param {mindmaps.CanvasView} view
   * @returns {Creator}
   */
  function Creator(view) {
    var self = this;
    var dragging = false;

    this.node = null;
    this.lineColor = null;

    var $wrapper = $("<div/>", {
      id : "creator-wrapper"
    }).bind("remove", function(e) {
      // detach the creator when some removed the node or opened a new map
      self.detach();
      // and avoid removing from DOM
      e.stopImmediatePropagation();

      console.debug("creator detached.");
      return false;
    });

    // red dot creator element
    var $nub = $("<div/>", {
      id : "creator-nub"
    }).appendTo($wrapper);

    var $fakeNode = $("<div/>", {
      id : "creator-fakenode"
    }).appendTo($nub);

    // canvas used by the creator tool to draw new lines
    var $canvas = $("<canvas/>", {
      id : "creator-canvas",
      "class" : "line-canvas"
    }).hide().appendTo($wrapper);

    // make it draggable
    $wrapper.draggable({
      revert : true,
      revertDuration : 0,
      start : function() {
        dragging = true;
        // show creator canvas
        $canvas.show();
        if (self.dragStarted) {
          self.lineColor = self.dragStarted(self.node);
        }
      },
      drag : function(e, ui) {
        // update creator canvas
        var offsetX = ui.position.left / view.zoomFactor;
        var offsetY = ui.position.top / view.zoomFactor;

        // set depth+1 because we are drawing the canvas for the child
        var $node = $getNode(self.node);
        drawLineCanvas($canvas, self.depth + 1, offsetX, offsetY,
            $fakeNode, $node, self.lineColor);
      },
      stop : function(e, ui) {
        dragging = false;
        // remove creator canvas, gets replaced by real canvas
        $canvas.hide();
        if (self.dragStopped) {
          var $wp = $wrapper.position();
          var $wpLeft = $wp.left / view.zoomFactor;
          var $wpTop = $wp.top / view.zoomFactor;
          var nubLeft = ui.position.left / view.zoomFactor;
          var nubTop = ui.position.top / view.zoomFactor;

          var distance = mindmaps.Util.distance($wpLeft - nubLeft,
              $wpTop - nubTop);
          self.dragStopped(self.node, nubLeft, nubTop, distance);
        }

        // remove any positioning that the draggable might have caused
        $wrapper.css({
          left : "",
          top : ""
        });
      }
    });

    /**
     * Attaches the tool to a node.
     * 
     * @param {mindmaps.Node} node
     */
    this.attachToNode = function(node) {
      if (this.node === node) {
        return;
      }
      this.node = node;

      // position the nub correctly
      $wrapper.removeClass("left right");
      if (node.offset.x > 0) {
        $wrapper.addClass("right");
      } else if (node.offset.x < 0) {
        $wrapper.addClass("left");
      }

      // set border on our fake node for correct line drawing
      this.depth = node.getDepth();
      var w = view.getLineWidth(this.depth + 1);
      $fakeNode.css("border-bottom-width", w);

      var $node = $getNode(node);
      $wrapper.appendTo($node);
    };

    /**
     * Removes the tool from the current node.
     */
    this.detach = function() {
      $wrapper.detach();
      this.node = null;
    };

    /**
     * Returns whether the tool is currently in use being dragged.
     * 
     * @returns {Boolean}
     */
    this.isDragging = function() {
      return dragging;
    };
  }
};

// inherit from base canvas view
mindmaps.DefaultCanvasView.prototype = new mindmaps.CanvasView();


/*js/CanvasPresenter.js*/
/**
 * Creates a new CanvasPresenter. The canvas presenter is responsible for drawing the mind map onto a
 * canvas view and reacting to user input on the map (e.g. dragging a node, double clicking it etc.)
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 * @param {mindmaps.MindMapModel} mindmapModel
 * @param {mindmaps.CanvasView} view
 * @param {mindmaps.ZoomController} zoomController
 */
mindmaps.CanvasPresenter = function(eventBus, commandRegistry, mindmapModel,
    view, zoomController) {
  var self = this;
  var creator = view.getCreator();

  /**
   * Initializes this presenter.
   */
  this.init = function() {
    var editCaptionCommand = commandRegistry
        .get(mindmaps.EditNodeCaptionCommand);
    editCaptionCommand.setHandler(this.editNodeCaption.bind(this));

    var toggleNodeFoldedCommand = commandRegistry
        .get(mindmaps.ToggleNodeFoldedCommand);
    toggleNodeFoldedCommand.setHandler(toggleFold);
  };

  /**
   * Handles the edit caption command. Tells view to start edit mode for node.
   * 
   * @param {mindmaps.Node} node
   */
  this.editNodeCaption = function(node) {
    if (!node) {
      node = mindmapModel.selectedNode;
    }
    view.editNodeCaption(node);
  };

  /**
   * Toggles the fold state of a node.
   * 
   * @param {mindmaps.Node} node
   */
  var toggleFold = function(node) {
    if (!node) {
      node = mindmapModel.selectedNode;
    }

    // toggle node visibility
    var action = new mindmaps.action.ToggleNodeFoldAction(node);
    mindmapModel.executeAction(action);
  };

  /**
   * Tells the view to select a node.
   * 
   * @param {mindmaps.Node} selectedNode
   * @param {mindmaps.Node} oldSelectedNode
   */
  var selectNode = function(selectedNode, oldSelectedNode) {

    // deselect old node
    if (oldSelectedNode) {
      view.unhighlightNode(oldSelectedNode);
    }
    view.highlightNode(selectedNode);
  };

  // listen to events from view
  /**
   * View callback: Zoom on mouse wheel.
   * 
   * @ignore
   */
  view.mouseWheeled = function(delta) {
    view.stopEditNodeCaption();

    if (delta > 0) {
      zoomController.zoomIn();
    } else {
      zoomController.zoomOut();
    }
  };

  /**
   * View callback: Attach creator to node if mouse hovers over node.
   * 
   * @ignore
   */
  view.nodeMouseOver = function(node) {
    if (view.isNodeDragging() || creator.isDragging()) {
      // dont relocate the creator if we are dragging
    } else {
      creator.attachToNode(node);
    }
  };

  /**
   * View callback: Attach creator to node if mouse hovers over node caption.
   * 
   * @ignore
   */
  view.nodeCaptionMouseOver = function(node) {
    if (view.isNodeDragging() || creator.isDragging()) {
      // dont relocate the creator if we are dragging
    } else {
      creator.attachToNode(node);
    }
  };

  /**
   * View callback: Select node if mouse was pressed.
   * 
   * @ignore
   */
  view.nodeMouseDown = function(node) {
    mindmapModel.selectNode(node);
    // show creator
    creator.attachToNode(node);
  };

  // view.nodeMouseUp = function(node) {
  // };

  /**
   * View callback: Go into edit mode when node was double clicked.
   * 
   * @ignore
   */
  view.nodeDoubleClicked = function(node) {
    view.editNodeCaption(node);
  };

  // view.nodeDragging = function() {
  // };

  /**
   * View callback: Execute MoveNodeAction when node was dragged.
   * 
   * @ignore
   */
  view.nodeDragged = function(node, offset) {
    // view has updated itself

    // update model
    var action = new mindmaps.action.MoveNodeAction(node, offset);
    mindmapModel.executeAction(action);
  };

  /**
   * View callback: Toggle fold mode when fold button was clicked.
   * 
   * @ignore
   */
  view.foldButtonClicked = function(node) {
    toggleFold(node);
  };

  // CREATOR TOOL
  /**
   * View callback: Return new random color to view when creator tool was
   * started to drag.
   * 
   * @ignore
   */
  creator.dragStarted = function(node) {
    // set edge color for new node. inherit from parent or random when root
    var color = node.isRoot() ? mindmaps.Util.randomColor()
        : node.branchColor;
    return color;
  };

  /**
   * View callback: Create a new node when creator tool was stopped.
   * 
   * @ignore
   */
  creator.dragStopped = function(parent, offsetX, offsetY, distance) {
    // disregard if the creator was only dragged a bit
    if (distance < 50) {
      return;
    }

    // update the model
    var node = new mindmaps.Node();
    node.branchColor = creator.lineColor;
    node.offset = new mindmaps.Point(offsetX, offsetY);
    // indicate that we want to set this nodes caption after creation
    node.shouldEditCaption = true;

    mindmapModel.createNode(node, parent);
  };

  /**
   * View callback: Change node caption when text change was committed in
   * view.
   * 
   * @ignore
   * @param {mindmaps.Node} node
   * @param {String} str
   */
  view.nodeCaptionEditCommitted = function(node, str) {
    // avoid whitespace only strings
    var str = $.trim(str);
    if (!str) {
      return;
    }

    view.stopEditNodeCaption();
    mindmapModel.changeNodeCaption(node, str);
  };

  this.go = function() {
    view.init();
  };

  /**
   * Draw the mind map on the canvas.
   * 
   * @param {mindmaps.Document} doc
   */
  function showMindMap(doc) {
    view.setZoomFactor(zoomController.DEFAULT_ZOOM);
    var dimensions = doc.dimensions;
    view.setDimensions(dimensions.x, dimensions.y);
    var map = doc.mindmap;
    view.drawMap(map);
    view.center();

    mindmapModel.selectNode(map.root);
  }

  /**
   * Hook up with EventBus.
   */
  function bind() {
    // listen to global events
    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function(doc,
        newDocument) {
      showMindMap(doc);

      // if (doc.isNew()) {
      // // edit root node on start
      // var root = doc.mindmap.root;
      // view.editNodeCaption(root);
      // }
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function(doc) {
      view.clear();
    });

    eventBus.subscribe(mindmaps.Event.NODE_MOVED, function(node) {
      view.positionNode(node);
    });

    eventBus.subscribe(mindmaps.Event.NODE_TEXT_CAPTION_CHANGED, function(
        node) {
      view.setNodeText(node, node.getCaption());

      // redraw node in case height has changed
      // TODO maybe only redraw if height has changed
      view.redrawNodeConnectors(node);
    });

    eventBus.subscribe(mindmaps.Event.NODE_CREATED, function(node) {
      view.createNode(node);

      // edit node caption immediately if requested
      if (node.shouldEditCaption) {
        delete node.shouldEditCaption;
        // open parent node when creating a new child and the other
        // children are hidden
        var parent = node.getParent();
        if (parent.foldChildren) {
          var action = new mindmaps.action.OpenNodeAction(parent);
          mindmapModel.executeAction(action);
        }

        // select and go into edit mode on new node
        mindmapModel.selectNode(node);
        // attach creator manually, sometimes the mouseover listener wont fire
        creator.attachToNode(node);
        view.editNodeCaption(node);
      }
    });

    eventBus.subscribe(mindmaps.Event.NODE_DELETED, function(node, parent) {
      // select parent if we are deleting a selected node or a descendant
      var selected = mindmapModel.selectedNode;
      if (node === selected || node.isDescendant(selected)) {
        // deselectCurrentNode();
        mindmapModel.selectNode(parent);
      }

      // update view
      view.deleteNode(node);
      if (parent.isLeaf()) {
        view.removeFoldButton(parent);
      }
    });

    eventBus.subscribe(mindmaps.Event.NODE_SELECTED, selectNode);
    
    eventBus.subscribe(mindmaps.Event.NODE_OPENED, function(node) {
      view.openNode(node);
    });

    eventBus.subscribe(mindmaps.Event.NODE_CLOSED, function(node) {
      view.closeNode(node);
    });

    eventBus.subscribe(mindmaps.Event.NODE_FONT_CHANGED, function(node) {
      view.updateNode(node);
    });

    eventBus.subscribe(mindmaps.Event.NODE_FONT_COLOR_PREVIEW, function(node, color) {
      view.updateFontColor(node, color);
    });

    eventBus.subscribe(mindmaps.Event.NODE_BRANCH_COLOR_CHANGED, function(
        node) {
      view.updateNode(node);
    });
    
    eventBus.subscribe(mindmaps.Event.NODE_BRANCH_COLOR_PREVIEW, function(node, color) {
      view.updateBranchColor(node, color)
    });

    eventBus.subscribe(mindmaps.Event.ZOOM_CHANGED, function(zoomFactor) {
      view.setZoomFactor(zoomFactor);
      view.applyViewZoom();
      view.scaleMap();
    });
  }

  bind();
  this.init();
};


/*js/ApplicationController.js*/
/**
 * Creates a new Application Controller.
 * 
 * @constructor
 */
 //edit
var g_mindmapModel;

mindmaps.ApplicationController = function() {
  var eventBus = new mindmaps.EventBus();
  var shortcutController = new mindmaps.ShortcutController();
  var commandRegistry = new mindmaps.CommandRegistry(shortcutController);
  var undoController = new mindmaps.UndoController(eventBus, commandRegistry);
  var mindmapModel = new mindmaps.MindMapModel(eventBus, commandRegistry, undoController);
  g_mindmapModel=mindmapModel;
  var clipboardController = new mindmaps.ClipboardController(eventBus,
      commandRegistry, mindmapModel);
  var helpController = new mindmaps.HelpController(eventBus, commandRegistry);
  var printController = new mindmaps.PrintController(eventBus,
      commandRegistry, mindmapModel);
  var autosaveController = new mindmaps.AutoSaveController(eventBus, mindmapModel);
  var filePicker = new mindmaps.FilePicker(eventBus, mindmapModel);

  /**
   * Handles the new document command.
   */
  function doNewDocument() {
    // close old document first
    var doc = mindmapModel.getDocument();
    doCloseDocument();

    var presenter = new mindmaps.NewDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.NewDocumentView());
    presenter.go();
  }

  /**
   * Handles the save document command.
   */
  function doSaveDocument() {
    var presenter = new mindmaps.SaveDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.SaveDocumentView(), autosaveController, filePicker);
    presenter.go();
  }

  /**
   * Handles the close document command.
   */
  function doCloseDocument() {
    var doc = mindmapModel.getDocument();
    if (doc) {
		if(window.proc_savelast) proc_savelast(); //edit
      // TODO for now simply publish events, should be intercepted by
      // someone	  
      mindmapModel.setDocument(null);
    }
  }

  /**
   * Handles the open document command.
   */
  function doOpenDocument() {
    var presenter = new mindmaps.OpenDocumentPresenter(eventBus,
        mindmapModel, new mindmaps.OpenDocumentView(), filePicker);
    presenter.go();
  }

  function doExportDocument() {
    var presenter = new mindmaps.ExportMapPresenter(eventBus,
        mindmapModel, new mindmaps.ExportMapView());
    presenter.go();
  }

  /**
   * Initializes the controller, registers for all commands and subscribes to
   * event bus.
   */
  this.init = function() {
    var newDocumentCommand = commandRegistry
        .get(mindmaps.NewDocumentCommand);
    newDocumentCommand.setHandler(doNewDocument);
    newDocumentCommand.setEnabled(true);

    var openDocumentCommand = commandRegistry
        .get(mindmaps.OpenDocumentCommand);
    openDocumentCommand.setHandler(doOpenDocument);
    openDocumentCommand.setEnabled(true);

    var saveDocumentCommand = commandRegistry
        .get(mindmaps.SaveDocumentCommand);
    saveDocumentCommand.setHandler(doSaveDocument);

    var closeDocumentCommand = commandRegistry
        .get(mindmaps.CloseDocumentCommand);
    closeDocumentCommand.setHandler(doCloseDocument);

    var exportCommand = commandRegistry.get(mindmaps.ExportCommand);
    exportCommand.setHandler(doExportDocument);

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
      saveDocumentCommand.setEnabled(false);
      closeDocumentCommand.setEnabled(false);
      exportCommand.setEnabled(false);
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
      saveDocumentCommand.setEnabled(true);
      closeDocumentCommand.setEnabled(true);
      exportCommand.setEnabled(true);
    });
  };

  /**
   * Launches the main view controller.
   */
  this.go = function() {
    var viewController = new mindmaps.MainViewController(eventBus,
        mindmapModel, commandRegistry);
    viewController.go();

    doNewDocument();
  };

  this.init();
};


/*js/MindMapModel.js*/
/**
 * <pre>
 * Creates a new MindMapModel. 
 * 
 * This object represents the underlying mind map model and provides access 
 * to the document, the mind map and the currently selected node.
 * 
 * All changes to the mind map pass through this object, either through calling
 * methods directly or using the executeAction() method to perform NodeActions.
 * </pre>
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 */
mindmaps.MindMapModel = function(eventBus, commandRegistry, undoController) {
  var self = this;
  this.document = null;
  this.selectedNode = null;

  /**
   * Gets the current document.
   * 
   * @returns {mindmaps.Document} the current document.
   */
  this.getDocument = function() {
    return this.document;
  };

  /**
   * Sets the current document and will publish a DOCUMENT_OPENED or
   * DOCUMENT_CLOSED event.
   * 
   * @param {mindmaps.Document} doc or pass null to close the document
   */
  this.setDocument = function(doc) {
    this.document = doc;
    if (doc) {
      eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, doc);
    } else {
      eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
    }
  };

  /**
   * Gets the current mind map associated with the document.
   * 
   * @returns {mindmaps.MindMap} the mind map or null
   */
  this.getMindMap = function() {
    if (this.document) {
      return this.document.mindmap;
    }
    return null;
  };

  /**
   * Initialise.
   * 
   * @private
   */
  this.init = function() {
    var createNodeCommand = commandRegistry.get(mindmaps.CreateNodeCommand);
    createNodeCommand.setHandler(this.createNode.bind(this));

    var createSiblingNodeCommand = commandRegistry
        .get(mindmaps.CreateSiblingNodeCommand);
    createSiblingNodeCommand.setHandler(this.createSiblingNode.bind(this));

    var deleteNodeCommand = commandRegistry.get(mindmaps.DeleteNodeCommand);
    deleteNodeCommand.setHandler(this.deleteNode.bind(this));

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
      createNodeCommand.setEnabled(false);
      createSiblingNodeCommand.setEnabled(false);
      deleteNodeCommand.setEnabled(false);
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
      createNodeCommand.setEnabled(true);
      createSiblingNodeCommand.setEnabled(true);
      deleteNodeCommand.setEnabled(true);
    });
  };

  /**
   * Deletes a node or the currently selected one if no argument is passed.
   * 
   * @param {mindmaps.Node} [node] defaults to currently selected.
   */
  this.deleteNode = function(node) {
    if (!node) {
      node = this.selectedNode;
    }
    var map = this.getMindMap();
    var action = new mindmaps.action.DeleteNodeAction(node, map);
    this.executeAction(action);
  };

  /**
   * Attaches a new node the mind map. If invoked without arguments, it will
   * add a new child to the selected node with an automatically generated
   * position.
   * 
   * @param {mindmaps.Node} node the new node
   * @param {mindmaps.Node} parent
   */
  this.createNode = function(node, parent) {
    var map = this.getMindMap();
    if (!(node && parent)) {
      parent = this.selectedNode;
      var action = new mindmaps.action.CreateAutoPositionedNodeAction(
          parent, map);
    } else {
      var action = new mindmaps.action.CreateNodeAction(node, parent, map);
    }

    this.executeAction(action);
  };

  /**
   * Creates a new auto positioned node as a sibling to the current selected
   * node.
   */
  this.createSiblingNode = function() {
    var map = this.getMindMap();
    var selected = this.selectedNode;
    var parent = selected.getParent();

    // root nodes dont have a parent
    if (parent === null) {
      return;
    }

    var action = new mindmaps.action.CreateAutoPositionedNodeAction(parent,
        map);
    this.executeAction(action);
  };

  /**
   * Sets the node as the currently selected.
   * 
   * @param {mindmaps.Node} node
   */
  this.selectNode = function(node) {
    if (node === this.selectedNode) {
      return;
    }

    var oldSelected = this.selectedNode;
    this.selectedNode = node;
    eventBus.publish(mindmaps.Event.NODE_SELECTED, node, oldSelected);
  };

  /**
   * Changes the caption for the passed node or for the selected one if node
   * is null.
   * 
   * @param {mindmaps.Node} node
   * @param {String} caption
   */
  this.changeNodeCaption = function(node, caption) {
    if (!node) {
      node = this.selectedNode;
    }

    var action = new mindmaps.action.ChangeNodeCaptionAction(node, caption);
    this.executeAction(action);
  };

  /**
   * Executes a node action. An executed action might raise an event over the
   * event bus and cause an undo event to be emitted via
   * MindMapModel#undoAction.
   * 
   * @param {mindmaps.Action} action
   */
  this.executeAction = function(action) {
    // a composite action consists of multiple actions which are
    // processed individually.
    if (action instanceof mindmaps.action.CompositeAction) {
      var execute = this.executeAction.bind(this);
      action.forEachAction(execute);
      return;
    }

    var executed = action.execute();

    // cancel action if false was returned
    if (executed !== undefined && !executed) {
      return false;
    }

    // publish event
    if (action.event) {
      if (!Array.isArray(action.event)) {
        action.event = [ action.event ];
      }
      eventBus.publish.apply(eventBus, action.event);
    }

    // register undo function if available
    if (action.undo) {
      var undoFunc = function() {
        self.executeAction(action.undo());
      };

      // register redo function
      if (action.redo) {
        var redoFunc = function() {
          self.executeAction(action.redo());
        };
      }

      undoController.addUndo(undoFunc, redoFunc);
    }
  };

  /**
   * Saves a document to the localstorage and publishes DOCUMENT_SAVED event on success.
   *
   * @returns {Boolean} whether the save was successful.
   */
  this.saveToLocalStorage = function() {
    var doc = this.document.prepareSave();
    var success = mindmaps.LocalDocumentStorage.saveDocument(doc);
    if (success) {
      eventBus.publish(mindmaps.Event.DOCUMENT_SAVED, doc);
    }

    return success;
  };
	
	//edit
	//g_mindmapModel.saveToLocalStorage2();
  this.saveToLocalStorage2 = function() {
	var s;
    var doc = this.document.prepareSave();	
	if(doc) s=doc.serialize();
	//alert(s);
	return s;
	//console.log(doc);
  };

  //g_mindmapModel.setDocument(mindmaps.Document.fromJSON('{"id":"c930fdba-ee58-49ac-91d2-293e582d0b11","title":"Central Idea","mindmap":{"root":{"id":"49306275-b937-4d19-bb9d-b4e804e72fd0","parentId":null,"text":{"caption":"Central Idea","font":{"style":"normal","weight":"bold","decoration":"none","size":20,"color":"#000000"}},"offset":{"x":0,"y":0},"foldChildren":false,"branchColor":"#000000","children":[]}},"dates":{"created":1425615209732,"modified":1425615260673},"dimensions":{"x":4000,"y":2000},"autosave":false}'));
  this.loadFromLocalStorage2 = function(s) {
	  var doc=mindmaps.Document.fromJSON(s);
	  if(doc){
		g_mindmapModel.setDocument(doc);
	  }
  }

  this.init();
};



/*js/NewDocument.js*/
/**
 * Unused for now.
 * 
 * @constructor
 */
mindmaps.NewDocumentView = function() {

};

/**
 * Creates a new NewDocumentPresenter. This presenter has no view associated
 * with it for now. It simply creates a new document. It could in the future
 * display a dialog where the user could chose options like document title and
 * such.
 * 
 * @constructor
 */
mindmaps.NewDocumentPresenter = function(eventBus, mindmapModel, view) {

  this.go = function() {
    var doc = new mindmaps.Document();
    mindmapModel.setDocument(doc);
  };
};


/*js/OpenDocument.js*/
/**
 * Creates a new OpenDocumentView. This view shows a dialog from which the user
 * can select a mind map from the local storage or a hard disk.
 * 
 * @constructor
 */
mindmaps.OpenDocumentView = function() {
  var self = this;

  // create dialog
  var $dialog = $("#template-open").tmpl().dialog({
    autoOpen : false,
    modal : true,
    zIndex : 5000,
    width : 550,
    close : function() {
      $(this).dialog("destroy");
      $(this).remove();
    }
  });

  var $openCloudButton = $("#button-open-cloud").button().click(function() {
    if (self.openCloudButtonClicked) {
      self.openCloudButtonClicked();
    }
  });
	
	//edit
	if(navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("windows")>=0){
		var a=document.getElementById('fileload1');
		if(a) a.setAttribute("accept",".mindmap,.json");
	}

  $dialog.find(".file-chooser input").bind("change", function(e) {
    if (self.openExernalFileClicked) {
      self.openExernalFileClicked(e);
    }
  });

  var $table = $dialog.find(".localstorage-filelist");
  $table.delegate("a.title", "click", function() {
    if (self.documentClicked) {
      var t = $(this).tmplItem();
      self.documentClicked(t.data);
    }
  }).delegate("a.delete", "click", function() {
    if (self.deleteDocumentClicked) {
      var t = $(this).tmplItem();
      self.deleteDocumentClicked(t.data);
    }
  });

  /**
  * Render list of documents in the local storage
  * 
  * @param {mindmaps.Document[]} docs
  */
  this.render = function(docs) {
    // empty list and insert list of documents
    var $list = $(".document-list", $dialog).empty();

    $("#template-open-table-item").tmpl(docs, {
      format : function(date) {
        if (!date) return "";

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + "/" + month + "/" + year;
      }
    }).appendTo($list);
  };

  /**
  * Shows the dialog.
  * 
  * @param {mindmaps.Document[]} docs
  */
  this.showOpenDialog = function(docs) {
    this.render(docs);
    $dialog.dialog("open");
  };

  /**
  * Hides the dialog.
  */
  this.hideOpenDialog = function() {
    $dialog.dialog("close");
  };

  this.showCloudError = function(msg) {
    $dialog.find('.cloud-loading').removeClass('loading');
    $dialog.find('.cloud-error').text(msg);
  };

  this.showCloudLoading = function() {
    $dialog.find('.cloud-error').text('');
    $dialog.find('.cloud-loading').addClass('loading');
  };

  this.hideCloudLoading = function() {
    $dialog.find('.cloud-loading').removeClass('loading');
  };
};

/**
* Creates a new OpenDocumentPresenter. The presenter can load documents from
* the local storage or hard disk.
* 
* @constructor
* @param {mindmaps.EventBus} eventBus
* @param {mindmaps.MindMapModel} mindmapModel
* @param {mindmaps.OpenDocumentView} view
* @param {mindmaps.FilePicker} filePicker
*/
mindmaps.OpenDocumentPresenter = function(eventBus, mindmapModel, view, filePicker) {

  /**
   * Open file via cloud
   */
  view.openCloudButtonClicked = function(e) {
    mindmaps.Util.trackEvent("Clicks", "cloud-open");

    filePicker.open({
      load: function() {
        view.showCloudLoading();
      },
      success: function() {
        view.hideOpenDialog();
      },
      error: function(msg) {
        view.showCloudError(msg);
      }
    });
  };

  // http://www.w3.org/TR/FileAPI/#dfn-filereader
  /**
  * View callback: external file has been selected. Try to read and parse a
  * valid mindmaps Document.
  * 
  * @ignore
  */
  view.openExernalFileClicked = function(e) {
    mindmaps.Util.trackEvent("Clicks", "hdd-open");

    var files = e.target.files;
    var file = files[0];

    var reader = new FileReader();
    reader.onload = function() {
      try {
        var doc = mindmaps.Document.fromJSON(reader.result);
      } catch (e) {
        eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, 'File is not a valid mind map!');
        throw new Error('Error while opening map from hdd', e);
      }
      mindmapModel.setDocument(doc);
      view.hideOpenDialog();
    };

    reader.readAsText(file);
  };

  /**
  * View callback: A document in the local storage list has been clicked.
  * Load the document and close view.
  * 
  * @ignore
  * @param {mindmaps.Document} doc
  */
  //edit
  view.documentClicked = function(doc) {
    mindmaps.Util.trackEvent("Clicks", "localstorage-open");
    
    mindmapModel.setDocument(doc);
    view.hideOpenDialog();
  };

  /**
  * View callback: The delete link the local storage list has been clicked.
  * Delete the document, and render list again.
  * 
  * @ignore
  * @param {mindmaps.Document} doc
  */
  view.deleteDocumentClicked = function(doc) {
    // TODO event
    mindmaps.LocalDocumentStorage.deleteDocument(doc);

    // re-render view
    var docs = mindmaps.LocalDocumentStorage.getDocuments();
    view.render(docs);
  };

  /**
  * Initialize.
  */
  this.go = function() {
    var docs = mindmaps.LocalDocumentStorage.getDocuments();
    docs.sort(mindmaps.Document.sortByModifiedDateDescending);
    view.showOpenDialog(docs);
  };
};


/*js/SaveDocument.js*/
/**
* Creates a new SaveDocumentView. This view renders a dialog where the user can
* save the mind map.
* 
* @constructor
*/
mindmaps.SaveDocumentView = function() {
  var self = this;

  var $dialog = $("#template-save").tmpl().dialog({
    autoOpen : false,
    modal : true,
    zIndex : 5000,
    width : 550,
    close : function() {
      // remove dialog from DOM
      $(this).dialog("destroy");
      $(this).remove();
    }
  });


  var $saveCloudStorageButton = $("#button-save-cloudstorage").button().click(
    function() {
      if (self.cloudStorageButtonClicked) {
        self.cloudStorageButtonClicked();
      }
    });

  var $localSorageButton = $("#button-save-localstorage").button().click(
    function() {
      if (self.localStorageButtonClicked) {
        self.localStorageButtonClicked();
      }
    });

  var $autoSaveCheckbox = $("#checkbox-autosave-localstorage").click(
    function() {
      if (self.autoSaveCheckboxClicked) {
        self.autoSaveCheckboxClicked($(this).prop("checked"));
      }
    });

  var $hddSaveButton = $("#button-save-hdd").button().downloadify({
    filename : function() {
      if (self.fileNameRequested) {
        return self.fileNameRequested();
      }
    },
    data : function() {
      if (self.fileContentsRequested) {
        return self.fileContentsRequested();
      }
    },
    onComplete : function() {
      if (self.saveToHddComplete) {
        self.saveToHddComplete();
      }
    },
    onError : function() {
      console.log("error while saving to hdd");
    },
    swf : 'media/downloadify.swf',
    downloadImage : 'img/transparent.png',
    width : 65,
    height : 29,
    append : true
  });

  this.setAutoSaveCheckboxState = function(checked) {
    $autoSaveCheckbox.prop("checked", checked);
  }

  this.showSaveDialog = function() {
    $dialog.dialog("open");
  };

  this.hideSaveDialog = function() {
    $dialog.dialog("close");
  };

  this.showCloudError = function(msg) {
    $dialog.find('.cloud-error').text(msg);
  }

//edit
var okflash=null;
function check_flash(){
	if(okflash!=null)return;
	okflash=false;
	try{
		if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))okflash=true;
	}catch(e){
		var a=navigator.mimeTypes;
		if(a && a['application/x-shockwave-flash'] != undefined && a['application/x-shockwave-flash'].enabledPlugin)okflash=true;
	}
}
	check_flash();
	if(!okflash){
		var a=document.getElementById('button-save-hdd');
		if(a) a.innerHTML='Adobe Flash Player is required. Check the flash player is installed.';
	}
};

/**
* Creates a new SaveDocumentPresenter. The presenter can store documents in the
* local storage or to a hard disk.
* 
* @constructor
* @param {mindmaps.EventBus} eventBus
* @param {mindmaps.MindMapModel} mindmapModel
* @param {mindmaps.SaveDocumentView} view
* @param {mindmaps.AutoSaveController} autosaveController
* @param {mindmaps.FilePicker} filePicker
*/
mindmaps.SaveDocumentPresenter = function(eventBus, mindmapModel, view, autosaveController, filePicker) {

  /**
  * Save in cloud button was clicked.
  */
  view.cloudStorageButtonClicked = function() {
    mindmaps.Util.trackEvent("Clicks", "cloud-save");

    filePicker.save({
      success: function() {
        view.hideSaveDialog();
      },
      error: function(msg) {
        view.showCloudError(msg);
      }
    });
  };

  /**
  * View callback when local storage button was clicked. Saves the document
  * in the local storage.
  * 
  * @ignore
  */
  view.localStorageButtonClicked = function() {
    mindmaps.Util.trackEvent("Clicks", "localstorage-save");

    var success = mindmapModel.saveToLocalStorage();
    if (success) {
      view.hideSaveDialog();
    } else {
      eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, "Error while saving to local storage");
    }
  };

  /**
  * View callback: Enables or disables the autosave function for localstorage.
  *
  * @ignore
  */
  view.autoSaveCheckboxClicked = function(checked) {
    if (checked) {
      autosaveController.enable();
    } else {
      autosaveController.disable();
    }
  }

  /**
  * View callback: Returns the filename for the document for saving on hard
  * drive.
  * 
  * @ignore
  * @returns {String}
  */
  view.fileNameRequested = function() {
    mindmaps.Util.trackEvent("Clicks", "hdd-save");
    return mindmapModel.getMindMap().getRoot().getCaption() + ".mindmap"; //edit
  };

  /**
  * View callback: Returns the serialized document.
  * 
  * @ignore
  * @returns {String}
  */
  view.fileContentsRequested = function() {
    var doc = mindmapModel.getDocument();
    return doc.prepareSave().serialize();
  };

  /**
  * View callback: Saving to the hard drive was sucessful.
  * 
  * @ignore
  */
  view.saveToHddComplete = function() {
    var doc = mindmapModel.getDocument();
    eventBus.publish(mindmaps.Event.DOCUMENT_SAVED, doc);
    view.hideSaveDialog();
  };

  this.go = function() {
    view.setAutoSaveCheckboxState(autosaveController.isEnabled());
    view.showSaveDialog();
  };
};


/*js/MainViewController.js*/
/**
 * The canvas container is the area in between the toolbar and the statusbar.
 * Inside the mind map will be drawn and the floating panels are contained
 * within this area.
 * 
 * @constructor
 */
mindmaps.CanvasContainer = function() {
  var self = this;
  var $content = $("#canvas-container");

  /**
   * @returns {jQuery}
   */
  this.getContent = function() {
    return $content;
  };

  /**
   * Sets the height of the canvas to fit between header and footer.
   */
  this.setSize = function() {
    var windowHeight = $(window).height();
    var headerHeight = $("#topbar").outerHeight(true);
    var footerHeight = $("#bottombar").outerHeight(true);
    var height = windowHeight - headerHeight - footerHeight;
    $content.height(height);

    var size = new mindmaps.Point($content.width(), height);
    self.publish(mindmaps.CanvasContainer.Event.RESIZED, size);
  };

  /**
   * Set up the container to accept drag and drop of files from the desktop.
   */
  this.acceptFileDrop = function() {

    function ignore(e) {
      e.originalEvent.stopPropagation();
      e.originalEvent.preventDefault();
    }

    function handleDragOver(e) {
      ignore(e);
    }

    function handleDrop(e) {
      ignore(e);

      var files = e.originalEvent.dataTransfer.files;
      var file = files[0];

      var reader = new FileReader();
      reader.onload = function() {
        self.receivedFileDrop(reader.result);
      };
      reader.readAsText(file);
    }

    $content.bind('dragover', handleDragOver);
    $content.bind('drop', handleDrop);
  };

  this.init = function() {
    // recalculate size when window is resized.
    $(window).resize(function() {
      self.setSize();
    });

    this.setSize();
    this.acceptFileDrop();
  };

  /**
   * Callback for when a file was dropped onto the container.
   * 
   * @event
   * @param {String} result
   */
  this.receivedFileDrop = function(result) {
  };

};
EventEmitter.mixin(mindmaps.CanvasContainer);

/**
 * Events fired by the container.
 * 
 * @namespace
 */
mindmaps.CanvasContainer.Event = {
  /**
   * Fired when the container has been resized.
   * 
   * @event
   * @param {mindmaps.Point} point the new size
   */
  RESIZED : "ResizedEvent"
};

/**
 * Creates a new MainViewController. The controller is responsible for creating
 * all main ui elements.
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.MindMapModel} mindmapModel
 * @param {mindmaps.InspectorView} view
 */
mindmaps.MainViewController = function(eventBus, mindmapModel, commandRegistry) {
  var zoomController = new mindmaps.ZoomController(eventBus, commandRegistry);
  var canvasContainer = new mindmaps.CanvasContainer();

  /**
   * When a file was dropped on the canvas container try to open it.
   */
  canvasContainer.receivedFileDrop = function(result) {
    try {
      var doc = mindmaps.Document.fromJSON(result);
      mindmapModel.setDocument(doc);
    } catch (e) {
      eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, "Could not read the file.");
      console.warn("Could not open the mind map via drag and drop.");
    }
  };

  this.go = function() {
    canvasContainer.init();

    // init all presenters

    // toolbar
    var toolbar = new mindmaps.ToolBarView();
    var toolbarPresenter = new mindmaps.ToolBarPresenter(eventBus,
        commandRegistry, toolbar, mindmapModel);
    toolbarPresenter.go();

    // canvas
    var canvas = new mindmaps.DefaultCanvasView();
    var canvasPresenter = new mindmaps.CanvasPresenter(eventBus,
        commandRegistry, mindmapModel, canvas, zoomController);
    canvasPresenter.go();

    // statusbar
    var statusbar = new mindmaps.StatusBarView();
    var statusbarPresenter = new mindmaps.StatusBarPresenter(eventBus,
        statusbar);
    statusbarPresenter.go();

    // floating Panels
    var fpf = new mindmaps.FloatPanelFactory(canvasContainer);

    // inspector
    var inspectorView = new mindmaps.InspectorView();
    var inspectorPresenter = new mindmaps.InspectorPresenter(eventBus,
        mindmapModel, inspectorView);
    inspectorPresenter.go();

    var inspectorPanel = fpf
        .create("Inspector", inspectorView.getContent());
    inspectorPanel.show();
    statusbarPresenter.addEntry(inspectorPanel);

    // navigator
    var naviView = new mindmaps.NavigatorView();
    var naviPresenter = new mindmaps.NavigatorPresenter(eventBus, naviView,
        canvasContainer, zoomController);
    naviPresenter.go();

    var navigatorPanel = fpf.create("Navigator", naviView.getContent());
    navigatorPanel.show();
    statusbarPresenter.addEntry(navigatorPanel);
  };
};


/*js/Storage.js*/
// TODO store a wrapper object with doc title, modified date and document as string in localstorage.
// in open document window show wrapper object and only parse document on demand.
// when many large documents are stored in LS, opening of window takes a rather long time
mindmaps.LocalStorage = (function() {
  return {
    put : function(key, value) {
      localStorage.setItem(key, value);
    },
    get : function(key) {
      return localStorage.getItem(key);
    },
    clear : function() {
      localStorage.clear();
    }
  };
})();

mindmaps.SessionStorage = (function() {
  return {
    put : function(key, value) {
      sessionStorage.setItem(key, value);
    },
    get : function(key) {
      return sessionStorage.getItem(key);
    },
    clear : function() {
      sessionStorage.clear();
    }
  };
})();

/**
 * @namespace
 */
mindmaps.LocalDocumentStorage = (function() {
  var prefix = "mindmaps.document.";

  var getDocumentByKey = function(key) {
    var json = localStorage.getItem(key);
    if (json === null) {
      return null;
    }

    /**
     * Catch any SytaxErrors when document can't be parsed.
     */
    try {
		//alert(json);
      return mindmaps.Document.fromJSON(json);
    } catch (error) {
      console.error("Error while loading document from local storage",
          error);
      return null;
    }
  };

  /**
   * Public API
   * @scope mindmaps.LocalDocumentStorage
   */
  return {
    /**
     * Saves a document to the localstorage. Overwrites the old document if
     * one with the same id exists.
     * 
     * @param {mindmaps.Document} doc
     * 
     * @returns {Boolean} true if save was successful, false otherwise.
     */
    saveDocument : function(doc) {
      try {
        localStorage.setItem(prefix + doc.id, doc.serialize());
        return true;
      } catch (error) {
        // QUOTA_EXCEEDED
        console.error("Error while saving document to local storage",
            error);
        return false;
      }
    },

    /**
     * Loads a document from the local storage.
     * 
     * @param {String} docId
     * 
     * @returns {mindmaps.Document} the document or null if not found.
     */
    loadDocument : function(docId) {
      return getDocumentByKey(prefix + docId);
    },

    /**
     * Finds all documents in the local storage object.
     * 
     * @returns {Array} an Array of documents
     */
    getDocuments : function() {
      var documents = [];
      // search localstorage for saved documents
      for ( var i = 0, max = localStorage.length; i < max; i++) {
        var key = localStorage.key(i);
        // value is a document if key confirms to prefix
        if (key.indexOf(prefix) == 0) {
          var doc = getDocumentByKey(key);
          if (doc) {
            documents.push(doc);
          }
        }
      }
      return documents;
    },

    /**
     * Gets all document ids found in the local storage object.
     * 
     * @returns {Array} an Array of document ids
     */
    getDocumentIds : function() {
      var ids = [];
      // search localstorage for saved documents
      for ( var i = 0, max = localStorage.length; i < max; i++) {
        var key = localStorage.key(i);
        // value is a document if key confirms to prefix
        if (key.indexOf(prefix) == 0) {
          ids.push(key.substring(prefix.length));
        }
      }
      return ids;
    },

    /**
     * Deletes a document from the local storage.
     * 
     * @param {mindmaps.Document} doc
     */
    deleteDocument : function(doc) {
      localStorage.removeItem(prefix + doc.id);
    },

    /**
     * Deletes all documents from the local storage.
     */
    deleteAllDocuments : function() {
      this.getDocuments().forEach(this.deleteDocument);
    }
  };
})();


/*js/Event.js*/
/**
 * Events that the event bus carries.
 * 
 * @namespace
 */
mindmaps.Event = {
  /**
   * @event
   * @param {mindmaps.Document} document
   */
  DOCUMENT_OPENED : "DocumentOpenedEvent",

  /**
   * @event
   * @param {mindmaps.Document} document
   */
  DOCUMENT_SAVED : "DocumentSavedEvent",

  /**
   * @event
   * @param {mindmaps.Document} document
   */
  DOCUMENT_CLOSED : "DocumentClosedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   * @param {mindmaps.Node} oldSelectedNode
   */
  NODE_SELECTED : "NodeSelectedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_DESELECTED : "NodeDeselectedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_MOVED : "NodeMovedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_TEXT_CAPTION_CHANGED : "NodeTextCaptionChangedEvent",

  /**
   * Some parameter of the node font attribute has changed.
   * 
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_FONT_CHANGED : "NodeFontChangedEvent",

  /**
   * Preview event for node font color changes.
   *
   * @event
   * @param {mindmaps.Node} node
   * @param {String} color
   */
  NODE_FONT_COLOR_PREVIEW: "NodeFontColorPreviewEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_BRANCH_COLOR_CHANGED : "NodeBranchColorChangedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   * @param {String} color
   */
  NODE_BRANCH_COLOR_PREVIEW : "NodeBranchColorPreviewEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_CREATED : "NodeCreatedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   * @param {mindmaps.Node} parent
   */
  NODE_DELETED : "NodeDeletedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_OPENED : "NodeOpenedEvent",

  /**
   * @event
   * @param {mindmaps.Node} node
   */
  NODE_CLOSED : "NodeClosedEvent",

  /**
   * @event
   * @param {Number} zoomFactor
   */
  ZOOM_CHANGED : "ZoomChangedEvent",
  
  /**
   * @event
   * @param {String} message
   */
  NOTIFICATION_INFO: "NotificationInfoEvent",
  
  /**
   * @event
   * @param {String} message
   */
  NOTIFICATION_WARN: "NotificationWarnEvent",
  
  /**
   * @event
   * @param {String} message
   */
  NOTIFICATION_ERROR: "NotificationErrorEvent"
};

/**
 * Simple Event bus powered by EventEmitter.
 * 
 * @constructor
 * @augments EventEmitter
 * 
 */
mindmaps.EventBus = EventEmitter;

if (mindmaps.DEBUG) {
  // overwrite publish func and display amount of listeners
  var old = mindmaps.EventBus.prototype.emit;
  mindmaps.EventBus.prototype.publish = function(type) {
    var l = this.listeners(type).length;
    console.log("EventBus > publish: " + type, "(Listeners: " + l + ")");

    old.apply(this, arguments);
  };
}


/*js/Notification.js*/
/**
 * Creates a new notification and attaches it to the target selector. If the
 * selector matches more than one element, the first one is taken.
 * 
 * @constructor
 * @param {String} targetSelector
 * @param [options] the options
 * @param {String} [options.title] the title of the notification
 * @param {String} [options.content] the content
 * @param {String} [options.position] possible values: topLeft, topMiddle,
 *            topRight, rightTop, rightMiddle, rightBottom, bottomLeft,
 *            bottomMiddle, bottomRight, leftTop, leftMiddle, leftBottom
 * @param {Integer} [options.padding]
 * @param {Integer} [options.expires]
 * @param {Boolean} [options.closeButton]
 * @param {Integer} [options.maxWidth]
 * @param {String} [options.type] possible values: info, warn, error
 */
mindmaps.Notification = function(targetSelector, options) {
  var self = this;
  options = $.extend({}, mindmaps.Notification.Defaults, options);

  // render template
  var $notification = this.$el = $("#template-notification").tmpl(options)
      .css({
        "max-width" : options.maxWidth
      }).addClass(options.type);

  // notification target
  var $target = $(targetSelector);
  if ($target.length === 0) {
    /**
     * Return unfinished, invisible notification if selector didn't match.
     * It will simply not show up, and does not have to be handled specially
     * by the caller.
     */
    return this;
  }

  var offset = $target.offset();
  var targetLeft = offset.left;
  var targetTop = offset.top;
  var targetWidth = $target.outerWidth();
  var targetHeight = $target.outerHeight();

  // add to dom. we need measurings
  $notification.appendTo($("body"));
  var notiWidth = $notification.outerWidth();
  var notiHeight = $notification.outerHeight();
  var notiLeft, notiTop;
  var padding = options.padding;

  // position
  switch (options.position) {

  case "topLeft":
    notiTop = targetTop - padding - notiHeight;
    notiLeft = targetLeft;
    break;
  case "topMiddle":
    notiTop = targetTop - padding - notiHeight;
    if (notiWidth < targetWidth) {
      notiLeft = targetLeft + (targetWidth - notiWidth) / 2;
    } else {
      notiLeft = targetLeft - (notiWidth - targetWidth) / 2;
    }
    break;
  case "topRight":
    notiTop = targetTop - padding - notiHeight;
    notiLeft = targetLeft + targetWidth - notiWidth;
    break;
  case "rightTop":
    notiTop = targetTop;

    break;
  case "rightMiddle":
    if (notiHeight < targetHeight) {
      notiTop = targetTop + (targetHeight - notiHeight) / 2;
    } else {
      notiTop = targetTop - (notiHeight - targetHeight) / 2;
    }
    notiLeft = targetLeft + padding + targetWidth;
    break;
  case "rightBottom":
    notiTop = targetTop + targetHeight - notiHeight;
    notiLeft = targetLeft + padding + targetWidth;
    break;
  case "bottomLeft":
    notiTop = targetTop + padding + targetHeight;
    notiLeft = targetLeft;
    break;
  case "bottomMiddle":
    notiTop = targetTop + padding + targetHeight;
    if (notiWidth < targetWidth) {
      notiLeft = targetLeft + (targetWidth - notiWidth) / 2;
    } else {
      notiLeft = targetLeft - (notiWidth - targetWidth) / 2;
    }
    break;
  case "bottomRight":
    notiTop = targetTop + padding + targetHeight;
    notiLeft = targetLeft + targetWidth - notiWidth;
    break;
  case "leftTop":
    notiTop = targetTop;
    notiLeft = targetLeft - padding - notiWidth;
    break;
  case "leftMiddle":
    if (notiHeight < targetHeight) {
      notiTop = targetTop + (targetHeight - notiHeight) / 2;
    } else {
      notiTop = targetTop - (notiHeight - targetHeight) / 2;
    }
    notiLeft = targetLeft - padding - notiWidth;
    break;
  case "leftBottom":
    notiTop = targetTop + targetHeight - notiHeight;
    notiLeft = targetLeft - padding - notiWidth;
    break;
  }

  $notification.offset({
    left : notiLeft,
    top : notiTop
  });

  // fadeout?
  if (options.expires) {
    setTimeout(function() {
      self.close();
    }, options.expires);
  }

  // close button
  if (options.closeButton) {
    $notification.find(".close-button").click(function() {
      self.close();
    });
  }

  // display
  $notification.fadeIn(600);
};

mindmaps.Notification.prototype = {
  /**
   * Removes the notification.
   */
  close : function() {
    var n = this.$el;
    n.fadeOut(800, function() {
      n.remove();
      this.removed = true;
    });
  },
  /**
   * Returns whether the notification is still on screen.
   * 
   * @returns {Boolean}
   */
  isVisible : function() {
    return !this.removed;
  },
  /**
   * Returns the element as a jQuery object.
   * 
   * @returns {jQuery}
   */
  $ : function() {
    return this.$el;
  }
};

/**
 * The default options.
 */
mindmaps.Notification.Defaults = {
  title : null,
  content : "New Notification",
  position : "topLeft",
  padding : 10,
  expires : 0,
  closeButton : false,
  maxWidth : 500,
  type : "info"
};


/*js/StaticCanvas.js*/
// TODO proper emulation of line-break: word-wrap

/**
 * Object that renders a mindmap model onto a single canvas object. The map will
 * be drawn without it's interactive elements (fold buttons, creator nub) and
 * the resulting image will be trimmed to fit the map plus a bit of padding onto
 * it.
 * 
 * @constructor
 */
mindmaps.StaticCanvasRenderer = function() {

  // magic number. node caption padding top/bottom + node padding bottom - two
  // extra pixel from text metrics
  var padding = 8;
  var zoomFactor = 1;
  var self = this;

  var $canvas = $("<canvas/>", {
    "class" : "map"
  });
  var ctx = $canvas[0].getContext("2d");

  var branchDrawer = new mindmaps.CanvasBranchDrawer();
  branchDrawer.beforeDraw = function(width, height, left, top) {
    ctx.translate(left, top);
  };

  function drawBranch(node, $parent) {
    ctx.save();
    branchDrawer.render(ctx, node.getDepth(), node.offset.x, node.offset.y,
        node, $parent, node.branchColor, zoomFactor);
    ctx.restore();
  }

  /**
   * Adds some information to each node which are needed for rendering.
   * 
   * @param mindmap
   * @returns
   */
  function prepareNodes(mindmap) {
    // clone tree since we modify it
    var root = mindmap.getRoot().clone();

    function addProps(node) {
      var lineWidth = mindmaps.CanvasDrawingUtil.getLineWidth(zoomFactor,
          node.getDepth());
      var metrics = mindmaps.TextMetrics.getTextMetrics(node, zoomFactor);

      var props = {
        lineWidth : lineWidth,
        textMetrics : metrics,
        width : function() {
          if (node.isRoot()) {
            return 0;
          }
          return metrics.width;
        },
        innerHeight : function() {
          return metrics.height + padding;
        },

        outerHeight : function() {
          return metrics.height + lineWidth + padding;
        }
      };

      $.extend(node, props);

      node.forEachChild(function(child) {
        addProps(child);
      });
    }

    addProps(root);

    return root;
  }

  /**
   * Finds the nodes which are farthest away from the root and calculates the
   * actual dimensions of the mind map.
   * 
   * @param {mindmaps.Node} root
   * @returns {object} with properties width and height
   */
  function getMindMapDimensions(root) {
    var pos = root.getPosition();
    var left = 0, top = 0, right = 0, bottom = 0;
    var padding = 50;

    function checkDimensions(node) {
      var pos = node.getPosition();
      var tm = node.textMetrics;

      if (pos.x < left) {
        left = pos.x;
      }

      if (pos.x + tm.width > right) {
        right = pos.x + tm.width;
      }

      if (pos.y < top) {
        top = pos.y;
      }

      if (pos.y + node.outerHeight() > bottom) {
        bottom = pos.y + node.outerHeight();
      }
    }

    checkDimensions(root);
    root.forEachDescendant(function(node) {
      checkDimensions(node);
    });

    // find the longest offset to either side and use twice the length for
    // canvas width
    var horizontal = Math.max(Math.abs(right), Math.abs(left));
    var vertical = Math.max(Math.abs(bottom), Math.abs(top));

    return {
      width : 2 * horizontal + padding,
      height : 2 * vertical + padding
    };
  }

  /**
   * Returns the canvas image in Base64 encoding. The canvas has to be
   * rendered first.
   * 
   * @param {mindmaps.Document} document
   * @returns {String}
   */
  this.getImageData = function(document) {
    renderCanvas(document);
    return $canvas[0].toDataURL("image/png");
  };

  /**
   * Returns a jquery object containing an IMG object with the map as PNG.
   * 
   * @param {mindmaps.Document} document
   * @returns {jQuery}
   */
  this.renderAsPNG = function(document) {
    var data = this.getImageData(document);

    var $img = $("<img/>", {
      src : data,
      "class" : "map"
    });

    return $img;
  };

  /**
   * Returns the rendered canvas as a jQuery object.
   * 
   * @param {mindmaps.Document} document
   * @returns {jQuery}
   */
  this.renderAsCanvas = function(document) {
    renderCanvas(document);
    return $canvas;
  };

  /**
   * Renders the map onto the canvas.
   * 
   * @param {mindmaps.Document} document
   */
  function renderCanvas(document) {
    var map = document.mindmap;
    var root = prepareNodes(map);
    var dimensions = getMindMapDimensions(root);

    var width = dimensions.width;
    var height = dimensions.height;
    $canvas.attr({
      width : width,
      height : height
    });

    ctx.textBaseline = "top";
    ctx.textAlign = "center";

    // fill background white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.translate(width / 2, height / 2);

    // render in two passes: 1. lines, 2. captions. because we have
    // no z-index, captions should not be covered by lines
    drawLines(root);
    drawCaptions(root);

    /**
     * Draws all branches
     */
    function drawLines(node, parent) {
      ctx.save();
      var x = node.offset.x;
      var y = node.offset.y;
      ctx.translate(x, y);

      // branch
      if (parent) {
        drawBranch(node, parent);
      }

      // bottom border
      if (!node.isRoot()) {
        ctx.fillStyle = node.branchColor;
        var tm = node.textMetrics;
        ctx.fillRect(0, tm.height + padding, tm.width, node.lineWidth);
      }

      node.forEachChild(function(child) {
        drawLines(child, node);
      });

      ctx.restore();
    }

    /**
     * Draws all captions.
     * 
     * @param node
     */
    function drawCaptions(node) {
      ctx.save();
      var x = node.offset.x;
      var y = node.offset.y;
      ctx.translate(x, y);

      var tm = node.textMetrics;
      var caption = node.getCaption();
      var font = node.text.font;

      // ctx.strokeStyle = "#CCC";
      // ctx.strokeRect(0, 0, tm.width, tm.height);

      ctx.font = font.style + " " + font.weight + " " + font.size
          + "px sans-serif";

      var captionX = tm.width / 2;
      var captionY = 0;
      if (node.isRoot()) {
        // TODO remove magic numbers
        captionX = 0;
        captionY = 20;

        // root box
        ctx.lineWidth = 5.0;
        ctx.strokeStyle = "orange";
        ctx.fillStyle = "white";
        mindmaps.CanvasDrawingUtil.roundedRect(ctx,
            0 - tm.width / 2 - 4, 20 - 4, tm.width + 8,
            tm.height + 8, 10);
      }

      ctx.strokeStyle = font.color;
      ctx.fillStyle = font.color;

      // TODO underline manually. canvas doesnt support it
      // TODO strike through manually

      function checkLength(str) {
        var ctm = ctx.measureText(str);
        return ctm.width <= tm.width;
      }

      // write node caption.

      if (checkLength(caption)) {
        // easy part only one line
        ctx.fillText(caption, captionX, captionY);
      } else {
        /**
         * caption consists of multiple lines. needs special handling
         * that imitates the line breaking algorithm "word-wrap:
         * break-word;"
         * 
         * <pre>
         * 1. break up string into words
         * 2. cut words that are too long into smaller pieces so they fit on a line
         * 3. construct lines: fit as many words as possible on a line
         * 4. print lines
         * </pre>
         */

        /**
         * step 1
         */
        // check all words and break words that are too long for a one
        // line
        // TODO not perfect yet
        // find words in string (special treatment for hyphens)
        // a hyphen breaks like a white-space does
        // var regex = /(\w+-+)|(\w+)|(-+)/gi;
        // var regex = /[^- ]+[- ]*/gi;
        // var regex = /[^ -]+-* *|[- ]+/gi;
        // for now just match for words and the trailing space
        // hyphenating has probably be done in step 2
        var regex = /[^ ]+ */gi;
        var words1 = caption.match(regex);
        console.log("words1", words1);

        /**
         * step 2
         */
        var words2 = [];
        words1.forEach(function(word) {
          if (!checkLength(word)) {
            var part = "";
            for ( var i = 0; i < word.length; i++) {
              var c = word.charAt(i);
              if (checkLength(part + c)) {
                part += c;
                continue;
              } else {
                words2.push(part);
                part = c;
              }
            }
            words2.push(part);
          } else {
            words2.push(word);
          }
        });

        console.log("words2", words2);

        /**
         * step 3
         */
        var wordWidth = function(str) {
          return ctx.measureText(str).width;
        };

        var lines = [];
        var line = "";
        var lineWidth = tm.width;

        // construct invidual lines
        words2.forEach(function(word) {
          if (line === "") {
            line = word;
          } else {
            if (wordWidth(line + " " + word) > lineWidth) {
              lines.push(line);
              line = word;
            } else {
              line += " " + word;
            }
          }
        });
        lines.push(line);
        console.log("lines", lines);

        /**
         * step 4
         */
        // print lines
        for ( var j = 0; j < lines.length; j++) {
          var line = lines[j];
          ctx.fillText(line, captionX, captionY + j * font.size);
        }
      }

      node.forEachChild(function(child) {
        drawCaptions(child);
      });

      ctx.restore();
    }
  }
};


/*js/PrintController.js*/
/**
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 * @param {mindmaps.MindMapModel} mindmapModel
 */
mindmaps.PrintController = function(eventBus, commandRegistry, mindmapModel) {
  var printCommand = commandRegistry.get(mindmaps.PrintCommand);
  printCommand.setHandler(doPrintDocument);

  var renderer = new mindmaps.StaticCanvasRenderer();

  function doPrintDocument() {
    var $img = renderer.renderAsPNG(mindmapModel.getDocument());
    $("#print-area").html($img);
    window.print();

    // TODO chrome only: after print() opens a new tab, and one switches
    // back to the old tab the canvas container has scrolled top-left.
  }

  eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
    printCommand.setEnabled(false);
  });

  eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
    printCommand.setEnabled(true);
  });
};


/*js/ExportMap.js*/
/**
 * 
 * @constructor
 */
mindmaps.ExportMapView = function() {
  var self = this;

  // create dialog
  var $dialog = $("#template-export-map").tmpl().dialog({
    autoOpen : false,
    modal : true,
    zIndex : 5000,
    width : "auto",
    height : "auto",
    close : function() {
      $(this).dialog("destroy");
      $(this).remove();
    },
    open : function() {
      $(this).css({
        "max-width" : $(window).width() * 0.9,
        "max-height" : $(window).height() * 0.8
      });
      $dialog.dialog("option", "position", "center");
    },
    buttons : {
      "Ok" : function() {
        $(this).dialog("close");
      }
    }
  });

  /**
   * Shows the dialog.
   * 
   */
  this.showDialog = function() {
    $dialog.dialog("open");
  };

  /**
   * Hides the dialog.
   */
  this.hideDialog = function() {
    $dialog.dialog("close");
  };

  this.setImage = function($img) {
    $("#export-preview").html($img);
  };
};

/**
 * 
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.MindMapModel} mindmapModel
 * @param {mindmaps.ExportMapView} view
 */
mindmaps.ExportMapPresenter = function(eventBus, mindmapModel, view) {
  var renderer = new mindmaps.StaticCanvasRenderer();

  this.go = function() {
    var $img = renderer.renderAsPNG(mindmapModel.getDocument());
    view.setImage($img);

    // slightly delay showing the dialog. otherwise dialog is not correctly
    // centered, because the image is inserted too late
    setTimeout(function() {
      view.showDialog();
    }, 30);
  };
};


/*js/AutoSaveController.js*/
/**
 * Creates a new AutoSaveController. This controller is able to automatically
 * save the document every X minutes. This setting is global for all mindmaps.
 *
 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.MindMapModel} mindmapModel
 */
mindmaps.AutoSaveController = function(eventBus, mindmapModel) {
  var SAVE_INTERVAL = 1000 * 60; // 1 minute
  var timer = null;

  function save() {
    console.debug("Autosaving...");
    mindmapModel.saveToLocalStorage();
  }

  function autosave() {
    if (!timer) {
      timer = setInterval(save, SAVE_INTERVAL);
    }
  }

  function stopAutosave() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  /**
   * Enable autosave.
   */
  this.enable = function() {
    autosave();
    mindmapModel.getDocument().setAutoSave(true);
  }

  /**
   * Disable autosave.
   */
  this.disable = function() {
    stopAutosave();
    mindmapModel.getDocument().setAutoSave(false);
  }

  this.isEnabled = function() {
    return mindmapModel.getDocument().isAutoSave();
  }

  this.init = function() {
    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, this.documentOpened
        .bind(this));

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, this.documentClosed
        .bind(this));
  }

  this.documentOpened = function(doc) {
    if (this.isEnabled()) {
      autosave();
    }
  }

  this.documentClosed = function() {
    stopAutosave();
  }

  this.init();
}


/*js/FilePicker.js*/
/**
 * Class for interaction with the filepicker API. Provides open and save
 * from/to cloud storages.
 *
 * @constructor
 */
mindmaps.FilePicker = function(eventBus, mindmapModel) {

  // filepicker is not defined when we are offline
  if (window.filepicker) {
    var filepicker = window.filepicker;
    filepicker.setKey('P9tQ4bicRwyIe8ZUsny5');

    var mimetype = "application/json";

    var openOptions = {
      modal: true,
      services: [
        filepicker.SERVICES.GOOGLE_DRIVE,
        filepicker.SERVICES.DROPBOX,
        filepicker.SERVICES.BOX,
        filepicker.SERVICES.URL
      ]
    };

    var saveOptions = {
      modal: true,
      services: [
        filepicker.SERVICES.GOOGLE_DRIVE,
        filepicker.SERVICES.DROPBOX,
        filepicker.SERVICES.BOX,
      ]
    };
  }

  /**
   * Shows the open dialog and tries to open a mindmap.
   */
  this.open = function(options) {
    options = options || {};

    if (!filepicker || !navigator.onLine) {
      options.error && options.error("Cannot access cloud, it appears you are offline.");
      return;
    }

    filepicker.getFile(mimetype, openOptions, function(url, data) {
      // load callback
      options.load && options.load();

      // load mindmap
      $.ajax({
        url: url, 
        success: function(data) {

          try {
            // convert to object first if response is a string
            if (Object.prototype.toString.call(data) == '[object String]') {
              data = JSON.parse(data);
            }

            var doc = mindmaps.Document.fromObject(data);
          } catch (e) {
            eventBus.publish(mindmaps.Event.NOTIFICATION_ERROR, 'File is not a valid mind map!');
            throw new Error('Error while parsing map from cloud', e);
          }

          mindmapModel.setDocument(doc);

          // execute callback
          if (options.success) {
            options.success(doc);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (options.error) {
            options.error("Error: Could not open mind map!");
          }
          throw new Error('Error while loading map from filepicker. ' + textStatus + ' ' + errorThrown);
        }
      });
    });
  };

  /**
   * Shows the save dialog where the user can save the current mindmap. Skips
   * the dialog and saves directly when options.saveAs = true is passed and
   * a cloud storage file is currently open.
   */
  this.save = function(options) {
    options = options || {};

    if (!filepicker || !navigator.onLine) {
      options.error && options.error("Cannot access cloud, it appears you are offline.");
      return;
    }

    var doc = mindmapModel.getDocument();
    var data = doc.prepareSave().serialize()

    var success = function(url) {
      console.log('saved to:', url);
      eventBus.publish(mindmaps.Event.DOCUMENT_SAVED, doc);

      if (options.success) {
        options.success();
      }
    };

    // save dialog
    filepicker.getUrlFromData(data, function(dataUrl) {
      filepicker.saveAs(dataUrl, mimetype, saveOptions, success);
    });
  }
}
