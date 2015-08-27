function setCookie(name, value, expires) { 
  if (!expires) expires=1000*60*60*24*365*5;
  path="/";
  domain=document.domain;
  secure=false;
  var today = new Date(); 
  today.setTime( today.getTime() ); 
  var expires_date = new Date( today.getTime() + (expires) ); 
  document.cookie = name + "=" +escape( value ) + 
          ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString() 
          ( ( path ) ? ";path=" + path : "" ) + 
          ( ( domain ) ? ";domain=" + domain : "" ) + 
          ( ( secure ) ? ";secure" : "" ); 
} 

function getCookie( name ) {
  var nameOfCookie = name + "=";
  var x = 0;
  while ( x <= document.cookie.length ) {
    var y = (x+nameOfCookie.length);
    if ( document.cookie.substring( x, y ) == nameOfCookie ) {
      if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
         endOfCookie = document.cookie.length;
      return unescape( document.cookie.substring( y, endOfCookie ) );
    }
    x = document.cookie.indexOf( " ", x ) + 1;
    if ( x == 0 ) break;
  }
  return "";
}

function _getid(id){
	return document.getElementById(id);
}

function trim(str) {
  	return str.replace(/^\s*|\s*$/g,"");
}

function html_entity_encode(str){
  str = str.replace(/&/gi, "&amp;");
  str = str.replace(/>/gi, "&gt;");
  str = str.replace(/</gi, "&lt;");
  str = str.replace(/\"/gi, "&quot;");
  str = str.replace(/\'/gi, "&#039;");
  return str;
}

function shortstring(s,len){
	if (!s) s='';
	if (s.length > len) s=s.substr(0,len)+"...";
	return s;
}

function cutstringmiddle(s,len,left,right){
	if (s.length <= len) return s;			
	var s1,s2;	
	s1=s.substr(0,left);
	s2=s.substr(s.length-right,s.length);	
	return s1+'.....'+s2;
}

var messagetimer=null;
function show_message(s,x,y,padding,timeout){
function getWindowWidth(){
    var windowWidth = 0;
    if (typeof(window.innerWidth) == 'number'){
        windowWidth = window.innerWidth;
    }else{
        var ieStrict = document.documentElement.clientWidth;
        var ieQuirks = document.body.clientWidth; 
        windowWidth = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
	if(!windowWidth) windowWidth=0;
    return windowWidth;
}
function getWindowHeight(){
    var windowHeight = 0;
    if (typeof(window.innerHeight) == 'number'){
        windowHeight = window.innerHeight;
    }else{
        var ieStrict = document.documentElement.clientHeight; 
        var ieQuirks = document.body.clientHeight;
        windowHeight = (ieStrict > 0) ? ieStrict : ieQuirks;
    }
	if(!windowHeight) windowHeight=0;
    return windowHeight;
}

function getScrollLeft(){
    var scrollLeft;
	if(document.body && document.body.scrollLeft){
		scrollLeft = document.body.scrollLeft;
	}else if(document.documentElement && document.documentElement.scrollLeft){
		scrollLeft = document.documentElement.scrollLeft;
	}
	if(!scrollLeft) scrollLeft=0;
    return scrollLeft;
}

function getScrollTop(){
    var scrollTop;
	if(document.body && document.body.scrollTop){
		scrollTop = document.body.scrollTop;
	}else if(document.documentElement && document.documentElement.scrollTop){
		scrollTop = document.documentElement.scrollTop;
	}
	if(!scrollTop) scrollTop=0;
    return scrollTop;
} 

	if (!x) x=10;
	if (!y) y=10;
	if (!padding) padding=5;
	if (!timeout) timeout=2000;

	var kind=1;
	for(var i=1; i <= 4; i++){
		var s1="layer_message";
		if (i>1) s1="layer_message"+i;
		var obj=document.getElementById(s1);
		if (obj){
			kind=i;
			break;
		}
	}
			
	obj.style.left="1px";
	obj.style.top="1px";		
	obj.innerHTML="<label>"+s+"</label>";
	obj.style.display="";	
	
	if (kind==1) {
		x=getScrollLeft()+x;	
		y=getScrollTop()+y;
	} else if (kind==2) {
		x=getScrollLeft()+((getWindowWidth()-obj.clientWidth) / 2);
		y=getScrollTop()+((getWindowHeight()-obj.clientHeight) / 2);
	} else if (kind==3) {
		x=document.body.offsetWidth-obj.clientWidth-5;
		y=getScrollTop()+y;
	} else {
		x=getScrollLeft()+((getWindowWidth()-obj.clientWidth) / 2);
		y=getScrollTop()+y;
	}
	x=parseInt(x);
	y=parseInt(y);
	
	obj.style["border"]="1px solid #000000";
	obj.style["padding"]=padding+"px";
	obj.style.left=x+"px";
	obj.style.top=y+"px";
	
	if (messagetimer) clearTimeout(messagetimer);
	messagetimer=setTimeout(hide_message, timeout);
}

function hide_message(){
	for(var i=1; i <= 4; i++){
		var s1="layer_message";
		if (i>1) s1="layer_message"+i;
		var obj=document.getElementById(s1);
		if (obj){
			obj.style.display="none";
		}
	}
}


/* Downloadify 0.2 (c) 2009 by Douglas Neiner. Licensed under the MIT license */
/* See http://github.com/dcneiner/Downloadify for license and more info */
(function(){Downloadify=window.Downloadify={queue:{},uid:new Date().getTime(),getTextForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getData();return""},getFileNameForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getFilename();return""},getDataTypeForSave:function(a){var b=Downloadify.queue[a];if(b)return b.getDataType();return""},saveComplete:function(a){var b=Downloadify.queue[a];if(b)b.complete();return true},saveCancel:function(a){var b=Downloadify.queue[a];if(b)b.cancel();return true},saveError:function(a){var b=Downloadify.queue[a];if(b)b.error();return true},addToQueue:function(a){Downloadify.queue[a.queue_name]=a},getUID:function(a){if(a.id=="")a.id='downloadify_'+Downloadify.uid++;return a.id}};Downloadify.create=function(a,b){var c=(typeof(a)=="string"?document.getElementById(a):a);return new Downloadify.Container(c,b)};Downloadify.Container=function(d,e){var f=this;f.el=d;f.enabled=true;f.dataCallback=null;f.filenameCallback=null;f.data=null;f.filename=null;var g=function(){f.options=e;if(!f.options.append)f.el.innerHTML="";f.flashContainer=document.createElement('span');f.el.appendChild(f.flashContainer);f.queue_name=Downloadify.getUID(f.flashContainer);if(typeof(f.options.filename)==="function")f.filenameCallback=f.options.filename;else if(f.options.filename)f.filename=f.options.filename;if(typeof(f.options.data)==="function")f.dataCallback=f.options.data;else if(f.options.data)f.data=f.options.data;var a={queue_name:f.queue_name,width:f.options.width,height:f.options.height};var b={allowScriptAccess:'always'};var c={id:f.flashContainer.id,name:f.flashContainer.id};if(f.options.enabled===false)f.enabled=false;if(f.options.transparent===true)b.wmode="transparent";if(f.options.downloadImage)a.downloadImage=f.options.downloadImage;swfobject.embedSWF(f.options.swf,f.flashContainer.id,f.options.width,f.options.height,"10",null,a,b,c);Downloadify.addToQueue(f)};f.enable=function(){var a=document.getElementById(f.flashContainer.id);a.setEnabled(true);f.enabled=true};f.disable=function(){var a=document.getElementById(f.flashContainer.id);a.setEnabled(false);f.enabled=false};f.getData=function(){if(!f.enabled)return"";if(f.dataCallback)return f.dataCallback();else if(f.data)return f.data;else return""};f.getFilename=function(){if(f.filenameCallback)return f.filenameCallback();else if(f.filename)return f.filename;else return""};f.getDataType=function(){if(f.options.dataType)return f.options.dataType;return"string"};f.complete=function(){if(typeof(f.options.onComplete)==="function")f.options.onComplete()};f.cancel=function(){if(typeof(f.options.onCancel)==="function")f.options.onCancel()};f.error=function(){if(typeof(f.options.onError)==="function")f.options.onError()};g()};Downloadify.defaultOptions={swf:'media/downloadify.swf',downloadImage:'images/download.png',width:100,height:30,transparent:true,append:false,dataType:"string"}})();if(typeof(jQuery)!="undefined"){(function($){$.fn.downloadify=function(b){return this.each(function(){b=$.extend({},Downloadify.defaultOptions,b);var a=Downloadify.create(this,b);$(this).data('Downloadify',a)})}})(jQuery)};if(typeof(MooTools)!='undefined'){Element.implement({downloadify:function(a){a=$merge(Downloadify.defaultOptions,a);return this.store('Downloadify',Downloadify.create(this,a))}})};

/*! rgbHex - v1.1.2 - 2013-09-27 */window.rgbHex=function(){function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}function b(a){return a.replace(/^\s+|\s+$/g,"")}function c(c){return c=b(c),a(c)&&c>=0&&255>=c}function d(a){return/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(b(a))}function e(a){return a=parseInt(a,10).toString(16),1===a.length?"0"+a:a}function f(a){return parseInt(a,16).toString()}function g(b){return b=b.split(","),(3===b.length||4===b.length)&&c(b[0])&&c(b[1])&&c(b[2])?4!==b.length||a(b[3])?"#"+e(b[0]).toUpperCase()+e(b[1]).toUpperCase()+e(b[2]).toUpperCase():null:null}function h(a){return d(a)?(3===a.length&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),"rgb("+f(a.substr(0,2))+","+f(a.substr(2,2))+","+f(a.substr(4,2))+")"):void 0}function i(a){return a.replace(/\s/g,"")}return function(a){if(!a)return null;var c=null,d=/^rgba?\((.*)\);?$/,e=/^#/;return a=b(a.toString()),"transparent"===a||"rgba(0,0,0,0)"===i(a)?"transparent":d.test(a)?g(a.match(d)[1]):e.test(a)?h(a.split("#").reverse()[0]):(c=a.split(","),1===c.length?h(a):3===c.length||4===c.length?g(a):void 0)}}(),jQuery&&jQuery.extend({rgbHex:function(a){return window.rgbHex(a)}});
/*! wColorPicker - v2.1.7 - 2013-09-27 */!function(a){function b(b,c){this.$el=a(b),this.options=c,this.init=!1,this.generate()}b.prototype={generate:function(){return this.$colorPicker||(this.$noneColorPalette=this._createPalette("none",[["transparent"]]),this.$simpleColorPalette=this._createPalette("simple",a.fn.wColorPicker.simpleColors),this.$mixedColorPalette=this._createPalette("mixed",a.fn.wColorPicker.mixedColors),this.$colorTarget=a('<div class="wColorPicker-color-target"></div>'),this.$customInput=a('<input type="text" class="wColorPicker-custom-input"/>').keyup(a.proxy(this._customInputKeyup,this)),this.options.dropperButton&&(this.$dropperButton=this._createDropperButton()),this.$colorPickerPalettesHolder=a('<div class="wColorPicker-palettes-holder"></div>').append(this.$noneColorPalette).append(this.$colorTarget).append(this.$customInput).append(this.$dropperButton).append("<br/>").append(this.$simpleColorPalette).append(this.$mixedColorPalette),this.$colorPickerHolder=a('<div class="wColorPicker-holder"></div>').append(this.$colorPickerPalettesHolder),this.$colorPickerBg=a('<div class="wColorPicker-bg"></div>'),this.$colorPicker=a('<div class="wColorPicker" title=""></div>').mouseenter(function(a){a.stopPropagation()}).bind("mouseenter mousemove click",function(a){a.stopPropagation()}).append(this.$colorPickerBg).append(this.$colorPickerHolder),this.setOpacity(this.options.opacity),this.setTheme(this.options.theme),this.setColor(this.options.color),a("body").append(this.$colorPicker),this.width=this.$colorPickerPalettesHolder.width(),this.height=this.$colorPickerPalettesHolder.height(),this.$colorPickerPalettesHolder.width(this.width),this.$colorPickerPalettesHolder.height(this.height),this.$el.append(this.$colorPicker),this.setMode(this.options.mode),this.setPosition(this.options.position)),this.init=!0,this},setTheme:function(a){this.$colorPicker.attr("class",this.$colorPicker.attr("class").replace(/wColorPicker-theme-.+\s|wColorPicker-theme-.+$/,"")),this.$colorPicker.addClass("wColorPicker-theme-"+a)},setOpacity:function(a){this.$colorPickerBg.css("opacity",a)},setColor:function(a){return window.rgbHex(a)?(this.options.color=a,this.$colorTarget.css("backgroundColor",a),this.$customInput.val(a),this.init&&this.options.onSelect&&this.options.onSelect.apply(this,[a]),void 0):!0},setMode:function(b){var c=this,d=function(){c._toggleEffect("show")},e=function(){c._toggleEffect("hide")};if("flat"===b?this.$colorPicker.removeClass("wColorPicker-zindex").css({position:"relative",display:""}):this.$colorPicker.addClass("wColorPicker-zindex").css({position:"absolute"}).hide(),this.$el.find("wColorPicker-button").remove(),this.$el.unbind("mouseenter",d).unbind("mouseleave",e),a(document).unbind("click",e),"flat"!==b){var f=null,g=null,h=function(a){a.stopPropagation(),c.options.generateButton&&g.css("backgroundColor",c.options.color),c._toggleEffect()};this.options.generateButton&&(f=a('<div class="wColorPicker-button"></div>'),g=a('<div class="wColorPicker-button-color"></div>').css("backgroundColor",this.options.color),this.$el.append(f),f.append(g.height(this.$el.height()-f.outerHeight(!0)))),this.$noneColorPalette.bind("click",h),this.$simpleColorPalette.bind("click",h),this.$mixedColorPalette.bind("click",h)}"click"===b?(this.$el.click(function(a){c._toggleEffect(),a.stopPropagation()}),this.$colorPicker.click(function(a){a.stopPropagation()}),a(document).bind("click",e)):"hover"===b&&this.$el.bind("mouseenter",d).bind("mouseleave",e)},setEffect:function(a){return"flat"===this.options.mode?!0:(this.$colorPicker.css("opacity",1),this.$colorPickerHolder.width(this.width).height(this.height),"fade"===a?this.$colorPicker.css("opacity",0):"slide"===a&&this.$colorPickerHolder.width("x"===this.positionAxis?0:this.width).height("y"===this.positionAxis?0:this.height),void 0)},setPosition:function(a){if("flat"===this.options.mode)return!0;var b=this.$el.outerWidth(),c=this.$el.outerHeight(),d=this.$el.outerWidth()/2-this.$colorPicker.outerWidth()/2,e=this.$el.outerHeight()/2-this.$colorPicker.outerHeight()/2,f={left:"",right:"",top:"",bottom:""},g=this.options.position.charAt(0);switch("t"===g||"b"===g?this.positionAxis="y":("l"===g||"r"===g)&&(this.positionAxis="x"),a){case"tl":f.left=0,f.bottom=c;break;case"tc":f.left=d,f.bottom=c;break;case"tr":f.right=0,f.bottom=c;break;case"rt":f.left=b,f.top=0;break;case"rm":f.left=b,f.top=e;break;case"rb":f.left=b,f.bottom=0;break;case"br":f.right=0,f.top=c;break;case"bc":f.left=d,f.top=c;break;case"bl":f.left=0,f.top=c;break;case"lb":f.right=b,f.bottom=0;break;case"lm":f.right=b,f.top=e;break;case"lt":f.right=b,f.top=0}this.$colorPicker.css(f),this.setEffect(this.options.effect)},_createPalette:function(b,c){var d=0,e=0,f=0,g=0,h=null,i=a('<div class="wColorPicker-palette wColorPicker-palette-'+b+'"></div>');for(d=0,e=c.length;e>d;d++){for(f=0,g=c[d].length;g>f;f++)h=this._createColor(f,c[d][f]),0===d&&h.addClass("wColorPicker-palette-color-top"),0===f&&h.addClass("wColorPicker-palette-color-left"),i.append(h);e>d&&i.append("<br/>")}return i},_createColor:function(b,c){var d=this;return a('<div class="wColorPicker-palette-color"></div>').attr("id","wColorPicker-palette-color-"+b).addClass("wColorPicker-palette-color-"+b).css("backgroundColor",c).hover(function(){d._colorMouseenter(a(this))},function(){d._colorMouseleave(a(this))}).click(function(){d.setColor(window.rgbHex(a(this).css("backgroundColor")))})},_createDropperButton:function(){return a('<div class="wColorPicker-dropper"></div>').click(a.proxy(this.options.onDropper,this))},_customInputKeyup:function(b){var c=a(b.target).val();window.rgbHex(c)&&(this.$colorTarget.css("backgroundColor",c),13===b.keyCode&&this.setColor(c))},_colorMouseenter:function(a){var b=window.rgbHex(a.css("backgroundColor"));a.addClass("active").prev().addClass("active-right"),a.prevAll("."+a.attr("id")+":first").addClass("active-bottom"),this.$colorTarget.css("backgroundColor",b),this.$customInput.val(b),this.options.onMouseover&&this.options.onMouseover.apply(this,[b])},_colorMouseleave:function(a){a.removeClass("active").prev().removeClass("active-right"),a.prevAll("."+a.attr("id")+":first").removeClass("active-bottom"),this.$colorTarget.css("backgroundColor",this.options.color),this.$customInput.val(this.options.color),this.options.onMouseout&&this.options.onMouseout.apply(this,[this.options.color])},_toggleEffect:function(a){var b=this.$colorPicker.hasClass("wColorPicker-visible");(!a||"show"===a&&b===!1||"hide"===a&&b===!0)&&(b||this.setPosition(this.options.position),this["_"+this.options.effect+"Effect"+(b?"Hide":"Show")](),this.$colorPicker.toggleClass("wColorPicker-visible"))},_noneEffectShow:function(){this.$colorPicker.css("display","inline-block")},_noneEffectHide:function(){this.$colorPicker.hide()},_fadeEffectShow:function(){this.$colorPicker.stop(!0,!1).css({display:"inline-block"}).animate({opacity:1},this.options.showSpeed)},_fadeEffectHide:function(){this.$colorPicker.stop(!0,!1).animate({opacity:0},this.options.hideSpeed,a.proxy(function(){this.$colorPicker.hide()},this))},_slideEffectShow:function(){var a="y"===this.positionAxis?{height:this.height}:{width:this.width};this.$colorPicker.css("display","inline-block"),this.$colorPickerHolder.stop(!0,!1).animate(a,this.options.showSpeed)},_slideEffectHide:function(){var b="y"===this.positionAxis?{height:0}:{width:0};this.$colorPickerHolder.stop(!0,!1).animate(b,this.options.hideSpeed,a.proxy(function(){this.$colorPicker.hide()},this))}},a.fn.wColorPicker=function(c,d){function e(d){var e,f=a.data(d,"wColorPicker");return f||(e=a.extend({},a.fn.wColorPicker.defaults,c),e.color=window.rgbHex(e.color)?e.color:"transparent",f=new b(d,e),a.data(d,"wColorPicker",f)),f}if("string"==typeof c){var f=[],g=null,h=null,i=null;return h=this.each(function(){g=a(this).data("wColorPicker"),g&&(i=(d?"set":"get")+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase(),g[c]?f.push(g[c].apply(g,[d])):d?(g[i]&&g[i].apply(g,[d]),g.options[c]&&(g.options[c]=d)):g[i]?f.push(g[i].apply(g,[d])):g.options[c]?f.push(g.options[c]):f.push(null))}),1===f.length?f[0]:f.length>0?f:h}return this.each(function(){e(this)})},a.fn.wColorPicker.defaults={theme:"classic",opacity:.9,color:"#FF0000",mode:"flat",position:"bl",generateButton:!0,dropperButton:!1,effect:"slide",showSpeed:500,hideSpeed:500,onMouseover:null,onMouseout:null,onSelect:null,onDropper:null},a.fn.wColorPicker.mixedColors=[["#000000","#003300","#006600","#009900","#00CC00","#00FF00","#330000","#333300","#336600","#339900","#33CC00","#33FF00","#660000","#663300","#666600","#669900","#66CC00","#66FF00"],["#000033","#003333","#006633","#009933","#00CC33","#00FF33","#330033","#333333","#336633","#339933","#33CC33","#33FF33","#660033","#663333","#666633","#669933","#66CC33","#66FF33"],["#000066","#003366","#006666","#009966","#00CC66","#00FF66","#330066","#333366","#336666","#339966","#33CC66","#33FF66","#660066","#663366","#666666","#669966","#66CC66","#66FF66"],["#000099","#003399","#006699","#009999","#00CC99","#00FF99","#330099","#333399","#336699","#339999","#33CC99","#33FF99","#660099","#663399","#666699","#669999","#66CC99","#66FF99"],["#0000CC","#0033CC","#0066CC","#0099CC","#00CCCC","#00FFCC","#3300CC","#3333CC","#3366CC","#3399CC","#33CCCC","#33FFCC","#6600CC","#6633CC","#6666CC","#6699CC","#66CCCC","#66FFCC"],["#0000FF","#0033FF","#0066FF","#0099FF","#00CCFF","#00FFFF","#3300FF","#3333FF","#3366FF","#3399FF","#33CCFF","#33FFFF","#6600FF","#6633FF","#6666FF","#6699FF","#66CCFF","#66FFFF"],["#990000","#993300","#996600","#999900","#99CC00","#99FF00","#CC0000","#CC3300","#CC6600","#CC9900","#CCCC00","#CCFF00","#FF0000","#FF3300","#FF6600","#FF9900","#FFCC00","#FFFF00"],["#990033","#993333","#996633","#999933","#99CC33","#99FF33","#CC0033","#CC3333","#CC6633","#CC9933","#CCCC33","#CCFF33","#FF0033","#FF3333","#FF6633","#FF9933","#FFCC33","#FFFF33"],["#990066","#993366","#996666","#999966","#99CC66","#99FF66","#CC0066","#CC3366","#CC6666","#CC9966","#CCCC66","#CCFF66","#FF0066","#FF3366","#FF6666","#FF9966","#FFCC66","#FFFF66"],["#990099","#993399","#996699","#999999","#99CC99","#99FF99","#CC0099","#CC3399","#CC6699","#CC9999","#CCCC99","#CCFF99","#FF0099","#FF3399","#FF6699","#FF9999","#FFCC99","#FFFF99"],["#9900CC","#9933CC","#9966CC","#9999CC","#99CCCC","#99FFCC","#CC00CC","#CC33CC","#CC66CC","#CC99CC","#CCCCCC","#CCFFCC","#FF00CC","#FF33CC","#FF66CC","#FF99CC","#FFCCCC","#FFFFCC"],["#9900FF","#9933FF","#9966FF","#9999FF","#99CCFF","#99FFFF","#CC00FF","#CC33FF","#CC66FF","#CC99FF","#CCCCFF","#CCFFFF","#FF00FF","#FF33FF","#FF66FF","#FF99FF","#FFCCFF","#FFFFFF"]],a.fn.wColorPicker.simpleColors=[["#000000"],["#333333"],["#666666"],["#999999"],["#CCCCCC"],["#FFFFFF"],["#FF0000"],["#00FF00"],["#0000FF"],["#FFFF00"],["#00FFFF"],["#FF00FF"]]}(jQuery);

var g_paint_obj;

!function(e){function d(a,g){this.$el=e(a),this.options=g,this.init=!1,this.menus={primary:null,active:null,all:{}},this.previousMode=null,this.width=this.$el.width(),this.height=this.$el.height(),this.ctxBgResize=!1,this.ctxResize=!1,this.generate(),this._init()}function f(h,g,i){this.wPaint=h,this.options=i,this.name=g,this.type=h.menus.primary?"secondary":"primary",this.docked=!0,this.dockOffset={left:0,top:0},this.generate()}d.prototype={generate:function(){function a(k){var n=k?k.capitalize():"",m="canvas"+n,l="ctx"+n;return g[m]=document.createElement("canvas"),g[l]=g[m].getContext("2d"),g["$"+m]=e(g[m]),g["$"+m].attr("class","wPaint-canvas"+(k?"-"+k:"")).attr("width",g.width+"px").attr("height",g.height+"px").css({position:"absolute",left:0,top:0}),g.$el.append(g["$"+m]),g["$"+m]}function j(b){b.preventDefault(),b.stopPropagation(),g.draw=!0,b.canvasEvent="down",g._closeSelectBoxes(),g._callShapeFunc.apply(g,[b])}function i(b){g.draw&&(b.canvasEvent="move",g._callShapeFunc.apply(g,[b]))}function h(b){g.draw&&(g.draw=!1,b.canvasEvent="up",g._callShapeFunc.apply(g,[b]))}if(this.init){return this}var g=this;a("bg"),a("").on("mousedown",j).bindMobileEvents(),a("temp").hide(),e(document).on("mousemove",i).on("mousedown",e.proxy(this._closeSelectBoxes,this)).on("mouseup",h),this.setTheme(this.options.theme)},_init:function(){g_paint_obj=this;var g=null,c=null;this.init=!0;for(g in this.options){c="set"+g.capitalize(),this[c]&&this[c](this.options[g])}this._fixMenus(),this.menus.primary._getIcon(this.options.mode).trigger("click")},getoption:function(a){if(a){a(this.options,this.undoCurrent)}},resize:function(){var g=this.getBg(),c=this.getImage();this.width=this.$el.width(),this.height=this.$el.height(),this.canvasBg.width=this.width,this.canvasBg.height=this.height,this.canvas.width=this.width,this.canvas.height=this.height,this.ctxBgResize===!1&&(this.ctxBgResize=!0,this.setBg(g,!0)),this.ctxResize===!1&&(this.ctxResize=!0,this.setImage(c,"",!0))},setTheme:function(h){var g,i;for(h=h.split(" "),this.$el.attr("class",(this.$el.attr("class")||"").replace(/wPaint-theme-.+\s|wPaint-theme-.+$/,"")),g=0,i=h.length;i>g;g++){this.$el.addClass("wPaint-theme-"+h[g])}},setMode:function(b){this.setCursor(b),this.previousMode=this.options.mode,this.options.mode=b},setImage:function(a,o,m,n){function l(){var h=1,c=0,s=0,r=0,q=0,p=j.width,g=j.height;m||((j.width>k.width||j.height>k.height)&&(c=k.width/j.width,s=k.height/j.height,h=s>c?c:s,p=j.width*h,g=j.height*h),r=(k.width-p)/2,q=(k.height-g)/2),i.clearRect(0,0,k.width,k.height),i.drawImage(j,r,q,p,g),i||k._imageOnload(),k[o+"Resize"]=!1;if(n){if(o!="bg"){k._addUndo()}n(true)}}if(!a){return !0}var k=this,j=null,i="";o="ctx"+(o||"").capitalize(),i=this[o],window.rgbHex(a)?(i.clearRect(0,0,this.width,this.height),i.fillStyle=a,i.rect(0,0,this.width,this.height),i.fill()):(j=new Image,j.onerror=function(){if(n){n(false)}},j.src=a.toString(),e(j).load(l))},setBg:function(g,c,h){return g?(this.setImage(g,"bg",c,h),void 0):!0},setCursor:function(a){a=e.fn.wPaint.cursors[a]||e.fn.wPaint.cursors["default"],this.$el.css("cursor",'url("'+this.options.path+a.path+'") '+a.left+" "+a.top+", default")},getImage:function(a){var h=document.createElement("canvas"),g=h.getContext("2d");return a=a===!1?!1:!0,e(h).css({display:"none",position:"absolute",left:0,top:0}).attr("width",this.width).attr("height",this.height),a&&g.drawImage(this.canvasBg,0,0),g.drawImage(this.canvas,0,0),h.toDataURL()},getBg:function(){return this.canvasBg.toDataURL()},_displayStatus:function(a){var g=this;this.$status||(this.$status=e('<div class="wPaint-status"></div>'),this.$el.append(this.$status)),this.$status.html(a),clearTimeout(this.displayStatusTimer),this.$status.fadeIn(500,function(){g.displayStatusTimer=setTimeout(function(){g.$status.fadeOut(500)},1500)})},_showModal:function(h){function g(){j.remove(),i.remove(),k._createModal(h)}var k=this,j=this.$el.children(".wPaint-modal-bg"),i=this.$el.children(".wPaint-modal");j.length?i.fadeOut(500,g):this._createModal(h)},_createModal:function(a){function n(){k.fadeOut(500,m)}function m(){l.remove(),k.remove()}a=e('<div class="wPaint-modal-content"></div>').append(a.children());var l=e('<div class="wPaint-modal-bg"></div>'),k=e('<div class="wPaint-modal"></div>'),j=e('<div class="wPaint-modal-holder"></div>'),i=e('<div class="wPaint-modal-close">X</div>');i.on("click",n),k.append(j.append(a)).append(i),this.$el.append(l).append(k),k.css({left:this.$el.outerWidth()/2-k.outerWidth(!0)/2,top:this.$el.outerHeight()/2-k.outerHeight(!0)/2}),k.fadeIn(500)},_createMenu:function(g,c){return c=c||{},c.alignment=this.options.menuOrientation,c.handle=this.options.menuHandle,new f(this,g,c)},_fixMenus:function(){function a(c,l){var k=e(l),j=k.clone();j.appendTo(i.$el),j.outerHeight()===j.get(0).scrollHeight&&k.css({overflowY:"auto"}),j.remove()}var i=this,h=null;for(var g in this.menus.all){h=i.menus.all[g].$menu.find(".wPaint-menu-select-holder"),h.length&&h.children().each(a)}},_closeSelectBoxes:function(h){var g,i;for(g in this.menus.all){i=this.menus.all[g].$menuHolder.children(".wPaint-menu-icon-select"),h&&(i=i.not(".wPaint-menu-icon-name-"+h.name)),i.children(".wPaint-menu-select-holder").hide()}},_imageOnload:function(){},_callShapeFunc:function(h){var g=this.$canvas.offset(),j=h.canvasEvent.capitalize(),i="_draw"+this.options.mode.capitalize()+j;h.pageX=Math.floor(h.pageX-g.left),h.pageY=Math.floor(h.pageY-g.top),this[i]&&this[i].apply(this,[h]),this.options["draw"+j]&&this.options["_draw"+j].apply(this,[h])},_stopPropagation:function(b){b.stopPropagation()},_drawShapeDown:function(b){this.$canvasTemp.css({left:b.PageX,top:b.PageY}).attr("width",0).attr("height",0).show(),this.canvasTempLeftOriginal=b.pageX,this.canvasTempTopOriginal=b.pageY,this.options.onShapeDown&&this.options.onShapeDown.apply(this,[b])},_drawShapeMove:function(a,i){var h=this.canvasTempLeftOriginal,g=this.canvasTempTopOriginal;i=i||2,a.left=a.pageX<h?a.pageX:h,a.top=a.pageY<g?a.pageY:g,a.width=Math.abs(a.pageX-h),a.height=Math.abs(a.pageY-g),a.x=this.options.lineWidth/2*i,a.y=this.options.lineWidth/2*i,a.w=a.width-this.options.lineWidth*i,a.h=a.height-this.options.lineWidth*i,e(this.canvasTemp).css({left:a.left,top:a.top}).attr("width",a.width).attr("height",a.height),this.canvasTempLeftNew=a.left,this.canvasTempTopNew=a.top,i=i||2,this.ctxTemp.fillStyle=this.options.fillStyle,this.ctxTemp.strokeStyle=this.options.strokeStyle,this.ctxTemp.lineWidth=this.options.lineWidth*i,this.options.onShapeDown&&this.options.onShapeMove.apply(this,[a])},
_drawShapeUp:function(b){try{this.ctx.drawImage(this.canvasTemp,this.canvasTempLeftNew,this.canvasTempTopNew),this.$canvasTemp.hide(),	this.options.onShapeDown&&this.options.onShapeUp.apply(this,[b])}catch(err){}},
_drawDropperDown:function(h){var g={x:h.pageX,y:h.pageY},j=this._getPixel(this.ctx,g),i=null;i="rgba("+[j.r,j.g,j.b,j.a].join(",")+")",this.options[this.dropper]=i,this.menus.active._getIcon(this.dropper).wColorPicker("color",i)},_drawDropperUp:function(){this.setMode(this.previousMode)},_getPixel:function(h,g){var k=h.getImageData(0,0,this.width,this.height),j=k.data,i=4*(g.y*k.width+g.x);return{r:j[i],g:j[i+1],b:j[i+2],a:j[i+3]}}},f.prototype={generate:function(){var a=null;this.$menu=e('<div class="wPaint-menu"></div>'),this.$menuHolder=e('<div class="wPaint-menu-holder wPaint-menu-name-'+this.name+'"></div>'),this.options.handle?this.$menuHandle=this._createHandle():this.$menu.addClass("wPaint-menu-nohandle"),"primary"===this.type?(this.wPaint.menus.primary=this,this.setOffsetLeft(this.options.offsetLeft),this.setOffsetTop(this.options.offsetTop)):"secondary"===this.type&&this.$menu.hide(),this.$menu.append(this.$menuHolder.append(this.$menuHandle)),this.reset(),this.setAlignment(this.options.alignment),this.wPaint.$el.append(this.$menu),a=this.$menu.css("left"),this.$menu.css("left",-10000),this.$menu.width(this.$menu.width()),this.$menu.css("left",a),"secondary"===this.type&&("horizontal"===this.options.alignment?this.dockOffset.top=this.wPaint.menus.primary.$menu.outerHeight(!0):this.dockOffset.left=this.wPaint.menus.primary.$menu.outerWidth(!0))},reset:function(){function a(b){h._appendItem(b)}var i,h=this,g=e.fn.wPaint.menus[this.name];for(i in g.items){this.$menuHolder.children(".wPaint-menu-icon-name-"+i).length||(g.items[i].name=i,g.items[i].img=h.wPaint.options.path+(g.items[i].img||g.img),a(g.items[i]))}},_appendItem:function(g){var c=this["_createIcon"+g.icon.capitalize()](g);g.after?this.$menuHolder.children(".wPaint-menu-icon-name-"+g.after).after(c):this.$menuHolder.append(c)},setOffsetLeft:function(b){this.$menu.css({left:b})},setOffsetTop:function(b){this.$menu.css({top:b})},setAlignment:function(b){this.$menu.attr("class",this.$menu.attr("class").replace(/wPaint-menu-alignment-.+\s|wPaint-menu-alignment-.+$/,"")),this.$menu.addClass("wPaint-menu-alignment-"+b)},_createHandle:function(){function a(){h.docked=!1,h._setDrag()}function j(){e.each(h.$menu.data("ui-draggable").snapElements,function(l,k){var n=h.$menu.offset(),m=h.wPaint.menus.primary.$menu.offset();h.dockOffset.left=n.left-m.left,h.dockOffset.top=n.top-m.top,h.docked=k.snapping}),h._setDrag()}function i(){h._setIndex()}var h=this,g=e('<div class="wPaint-menu-handle"></div>');return this.$menu.draggable({handle:g}),"secondary"===this.type&&(this.$menu.draggable("option","snap",this.wPaint.menus.primary.$menu),this.$menu.draggable("option","start",a),this.$menu.draggable("option","stop",j),this.$menu.draggable("option","drag",i)),g.bindMobileEvents(),g},_createIconBase:function(a){function p(g){var h=e(g.currentTarget);h.siblings(".hover").removeClass("hover"),h.hasClass("disabled")||h.addClass("hover")}function o(c){e(c.currentTarget).removeClass("hover")}function n(){m.wPaint.menus.active=m}var m=this,l=e('<div class="wPaint-menu-icon wPaint-menu-icon-name-'+a.name+'"></div>'),k=e('<div class="wPaint-menu-icon-img"></div>'),j=k.realWidth(null,null,this.wPaint.$el);return l.attr("title",a.title).on("mousedown",e.proxy(this.wPaint._closeSelectBoxes,this.wPaint,a)).on("mouseenter",p).on("mouseleave",o).on("click",n),e.isNumeric(a.index)&&k.css({backgroundImage:"url("+a.img+")",backgroundPosition:-j*a.index+"px 0px"}),l.append(k)},_createIconGroup:function(x){function w(){r.children(".wPaint-menu-select-holder").is(":visible")||x.callback.apply(t.wPaint,[])}function v(){r.addClass("active").siblings(".active").removeClass("active")}function u(){r.attr("title",x.title).off("click.setIcon").on("click.setIcon",w),r.children(".wPaint-menu-icon-img").css(s),x.callback.apply(t.wPaint,[])}var t=this,s={backgroundImage:"url("+x.img+")"},r=this.$menuHolder.children(".wPaint-menu-icon-group-"+x.group),q=r.length,p=null,o=null,n=null,a=0;return q||(r=this._createIconBase(x).addClass("wPaint-menu-icon-group wPaint-menu-icon-group-"+x.group).on("click.setIcon",w).on("mousedown",e.proxy(this._iconClick,this))),a=r.children(".wPaint-menu-icon-img").realWidth(null,null,this.wPaint.$el),s.backgroundPosition=-a*x.index+"px center",p=r.children(".wPaint-menu-select-holder"),p.length||(p=this._createSelectBox(r),p.children().on("click",v)),n=e('<div class="wPaint-menu-icon-select-img"></div>').attr("title",x.title).css(s),o=this._createSelectOption(p,n).addClass("wPaint-menu-icon-name-"+x.name).on("click",u),x.after&&p.children(".wPaint-menu-select").children(".wPaint-menu-icon-name-"+x.after).after(o),q?void 0:r},_createIconGeneric:function(b){return this._createIconActivate(b)},_createIconActivate:function(h){function g(a){"generic"!==h.icon&&j._iconClick(a),h.callback.apply(j.wPaint,[a])}if(h.group){return this._createIconGroup(h)}var j=this,i=this._createIconBase(h);return i.on("click",g),i},_isIconDisabled:function(b){return this.$menuHolder.children(".wPaint-menu-icon-name-"+b).hasClass("disabled")},_setIconDisabled:function(h,g){var i=this.$menuHolder.children(".wPaint-menu-icon-name-"+h);g?i.addClass("disabled").removeClass("hover"):i.removeClass("disabled")},_getIcon:function(b){return this.$menuHolder.children(".wPaint-menu-icon-name-"+b)},_iconClick:function(a){var i=e(a.currentTarget),h=this.wPaint.menus.all;for(var g in h){h[g]&&"secondary"===h[g].type&&h[g].$menu.hide()}i.siblings(".active").removeClass("active"),i.hasClass("disabled")||i.addClass("active")},_createIconToggle:function(h){function g(){i.toggleClass("active"),h.callback.apply(j.wPaint,[i.hasClass("active")])}var j=this,i=this._createIconBase(h);return i.on("click",g),i},_createIconSelect:function(a){function p(b){k.children(".wPaint-menu-icon-img").html(e(b.currentTarget).html()),a.callback.apply(l.wPaint,[e(b.currentTarget).html()])}var o,n,m,l=this,k=this._createIconBase(a),j=this._createSelectBox(k);for(o=0,n=a.range.length;n>o;o++){m=this._createSelectOption(j,a.range[o]),m.on("click",p),a.useRange&&m.css(a.name,a.range[o])}return k},_createSelectBox:function(a){function p(b){b.stopPropagation(),l.hide()}function o(){j=setTimeout(function(){l.toggle()},200)}function n(){clearTimeout(j)}function m(){l.toggle()}var l=e('<div class="wPaint-menu-select-holder"></div>'),k=e('<div class="wPaint-menu-select"></div>'),j=null;return l.on("mousedown mouseup",this.wPaint._stopPropagation).on("click",p).hide(),"horizontal"===this.options.alignment?l.css({left:0,top:a.children(".wPaint-menu-icon-img").realHeight("outer",!0,this.wPaint.$el)}):l.css({left:a.children(".wPaint-menu-icon-img").realWidth("outer",!0,this.wPaint.$el),top:0}),a.addClass("wPaint-menu-icon-select").append('<div class="wPaint-menu-icon-group-arrow"></div>').append(l.append(k)),a.hasClass("wPaint-menu-icon-group")?a.on("mousedown",o).on("mouseup",n):a.on("click",m),l},_createSelectOption:function(a,i){var h=a.children(".wPaint-menu-select"),g=e('<div class="wPaint-menu-select-option"></div>').append(i);return h.children().length||g.addClass("first"),h.append(g),g},_setSelectValue:function(g,c){this._getIcon(g).children(".wPaint-menu-icon-img").html(c)},_createIconColorPicker:function(h){function g(){"dropper"===j.wPaint.options.mode&&j.wPaint.setMode(j.wPaint.previousMode)}function l(a){h.callback.apply(j.wPaint,[a])}function k(){i.trigger("click"),j.wPaint.dropper=h.name,j.wPaint.setMode("dropper")}var j=this,i=this._createIconBase(h);return i.on("click",g).addClass("wPaint-menu-colorpicker").wColorPicker({mode:"click",generateButton:!1,dropperButton:!0,onSelect:l,onDropper:k}),i},_setColorPickerValue:function(g,c){this._getIcon(g).children(".wPaint-menu-icon-img").css("backgroundColor",c)},_createIconMenu:function(h){function g(){j.wPaint.setCursor(h.name);var a=j.wPaint.menus.all[h.name];a.$menu.toggle(),a._setDrag()}var j=this,i=this._createIconActivate(h);return i.on("click",g),i},_setDrag:function(){var a=this.$menu,h=null,g=null;a.is(":visible")&&(this.docked&&(h=g=e.proxy(this._setPosition,this),this._setPosition()),this.wPaint.menus.primary.$menu.draggable("option","drag",h),this.wPaint.menus.primary.$menu.draggable("option","stop",g))},_setPosition:function(){var b=this.wPaint.menus.primary.$menu.position();this.$menu.css({left:b.left+this.dockOffset.left,top:b.top+this.dockOffset.top})},_setIndex:function(){var g=this.wPaint.menus.primary.$menu.offset(),c=this.$menu.offset();c.top<g.top||c.left<g.left?this.$menu.addClass("wPaint-menu-behind"):this.$menu.removeClass("wPaint-menu-behind")}},e.support.canvas=document.createElement("canvas").getContext,e.fn.wPaint=function(n,m){function l(c,o){var i=e(o).data("wPaint"),h=null;i&&(h=(m?"set":"get")+n.charAt(0).toUpperCase()+n.substring(1).toLowerCase(),i[n]?i[n].apply(i,[m]):m?(i[h]&&i[h].apply(i,[m]),i.options[n]&&(i.options[n]=m)):i[h]?b.push(i[h].apply(i,[m])):i.options[n]?b.push(i.options[n]):b.push(null))}function k(g,h){return e.support.canvas?(j(h),void 0):(e(h).html("Browser does not support HTML5 canvas, please upgrade to a more modern browser."),!1)}function j(h){var g=e.data(h,"wPaint");if(!g){var c=e.extend(!0,{},n);c.lineWidth=parseInt(c.lineWidth,10),c.fontSize=parseInt(c.fontSize,10),g=new d(h,c),e.data(h,"wPaint",g)}return g}if("string"==typeof n){var b=[],a=null;return a=this.each(l),1===b.length?b[0]:b.length>0?b:a}return n=e.extend({},e.fn.wPaint.defaults,n),this.each(k)},e.fn.wPaint.extend=function(b,h){function g(j){if(h[j]){var i=d.prototype[j],a=b[j];h[j]=function(){i.apply(this,arguments),a.apply(this,arguments)}}else{h[j]=b[j]}}var c;h="menu"===h?f.prototype:d.prototype;for(c in b){g(c)}},e.fn.wPaint.menus={},e.fn.wPaint.cursors={},e.fn.wPaint.defaults={path:"/",theme:"standard classic",autoScaleImage:!0,autoCenterImage:!0,menuHandle:!0,menuOrientation:"horizontal",menuOffsetLeft:5,menuOffsetTop:5,bg:null,image:null,onShapeDown:null,onShapeMove:null,onShapeUp:null}}(jQuery),function(){String.prototype.capitalize||(String.prototype.capitalize=function(){return this.slice(0,1).toUpperCase()+this.slice(1)})}(),function(b){b.fn.realWidth=function(a,l,k){var j=null,i=null,h=null;return a="inner"===a||"outer"===a?a:"",h=""===a?"width":a+"Width",l=l===!0?!0:!1,i=b(this).clone().css({position:"absolute",left:-10000}).appendTo(k||"body"),j=l?i[h](l):i[h](),i.remove(),j},b.fn.realHeight=function(a,l,k){var j=null,i=null,h=null;return a="inner"===a||"outer"===a?a:"",h=""===a?"height":a+"Height",l=l===!0?!0:!1,i=b(this).clone().css({position:"absolute",left:-10000}).appendTo(k||"body"),j=l?i[h](l):i[h](),i.remove(),j},b.fn.bindMobileEvents=function(){b(this).on("touchstart touchmove touchend touchcancel",function(){var f=event.changedTouches,e=f[0],h="";switch(event.type){case"touchstart":h="mousedown";break;case"touchmove":h="mousemove",event.preventDefault();break;case"touchend":h="mouseup";break;default:return}var g=document.createEvent("MouseEvent");g.initMouseEvent(h,!0,!0,window,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(g)})}}(jQuery);

/*wPaint.menu.main.min.js*/
!function(a){a.fn.wPaint.menus.main={img:"plugins/main/img/icons-menu-main.png",items:{undo:{icon:"generic",title:"Undo",index:0,callback:function(){this.undo()}},redo:{icon:"generic",title:"Redo",index:1,callback:function(){this.redo()}},clear:{icon:"generic",title:"Clear",index:2,callback:function(){this.clear()}},rectangle:{icon:"activate",title:"Rectangle",index:3,callback:function(){this.setMode("rectangle")}},ellipse:{icon:"activate",title:"Ellipse",index:4,callback:function(){this.setMode("ellipse")}},line:{icon:"activate",title:"Line",index:5,callback:function(){this.setMode("line")}},pencil:{icon:"activate",title:"Pencil",index:6,callback:function(){this.setMode("pencil")}},eraser:{icon:"activate",title:"Eraser",index:8,callback:function(){this.setMode("eraser")}},bucket:{icon:"activate",title:"Bucket",index:9,callback:function(){this.setMode("bucket")}},fillStyle:{title:"Fill Color",icon:"colorPicker",callback:function(a){this.setFillStyle(a)}},lineWidth:{icon:"select",title:"Stroke Width",range:[1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50,60,70,80,90],value:2,callback:function(a){this.setLineWidth(a)}},strokeStyle:{icon:"colorPicker",title:"Stroke Color",callback:function(a){this.setStrokeStyle(a)}}}},a.extend(a.fn.wPaint.cursors,{"default":{path:"plugins/main/img/cursor-crosshair.png",left:7,top:7},dropper:{path:"plugins/main/img/cursor-dropper.png",left:0,top:12},pencil:{path:"plugins/main/img/cursor-pencil.png",left:0,top:11.99},bucket:{path:"plugins/main/img/cursor-bucket.png",left:0,top:10},eraser1:{path:"plugins/main/img/cursor-eraser1.png",left:1,top:1},eraser2:{path:"plugins/main/img/cursor-eraser2.png",left:2,top:2},eraser3:{path:"plugins/main/img/cursor-eraser3.png",left:2,top:2},eraser4:{path:"plugins/main/img/cursor-eraser4.png",left:3,top:3},eraser5:{path:"plugins/main/img/cursor-eraser5.png",left:3,top:3},eraser6:{path:"plugins/main/img/cursor-eraser6.png",left:4,top:4},eraser7:{path:"plugins/main/img/cursor-eraser7.png",left:4,top:4},eraser8:{path:"plugins/main/img/cursor-eraser8.png",left:5,top:5},eraser9:{path:"plugins/main/img/cursor-eraser9.png",left:5,top:5},eraser10:{path:"plugins/main/img/cursor-eraser10.png",left:6,top:6}}),a.extend(a.fn.wPaint.defaults,{mode:"pencil",lineWidth:"3",fillStyle:"#FFFFFF",strokeStyle:"#FFFF00"}),a.fn.wPaint.extend({undoCurrent:-1,undoArray:[],setUndoFlag:!0,generate:function(){this.menus.all.main=this._createMenu("main",{offsetLeft:this.options.menuOffsetLeft,offsetTop:this.options.menuOffsetTop})},_init:function(){this._addUndo(),this.menus.all.main._setIconDisabled("clear",!0)},setStrokeStyle:function(a){this.options.strokeStyle=a,this.menus.all.main._setColorPickerValue("strokeStyle",a)},setLineWidth:function(a){this.options.lineWidth=a,this.menus.all.main._setSelectValue("lineWidth",a),this.setCursor(this.options.mode)},setFillStyle:function(a){this.options.fillStyle=a,this.menus.all.main._setColorPickerValue("fillStyle",a)},setCursor:function(a){"eraser"===a&&this.setCursor("eraser"+this.options.lineWidth)},undo:function(){this.undoArray[this.undoCurrent-1]&&this._setUndo(--this.undoCurrent),this._undoToggleIcons()},redo:function(){this.undoArray[this.undoCurrent+1]&&this._setUndo(++this.undoCurrent),this._undoToggleIcons()},_addUndo:function(){for(this.undoCurrent<this.undoArray.length-1?this.undoArray[++this.undoCurrent]=this.getImage(!1):(this.undoArray.push(this.getImage(!1)),this.undoArray.length>this.undoMax?this.undoArray=this.undoArray.slice(1,this.undoArray.length):this.undoCurrent++);this.undoCurrent!==this.undoArray.length-1;)this.undoArray.pop();this._undoToggleIcons(),this.menus.all.main._setIconDisabled("clear",!1)},_undoToggleIcons:function(){var a=this.undoCurrent>0&&this.undoArray.length>1?0:1,b=this.undoCurrent<this.undoArray.length-1?2:3;this.menus.all.main._setIconDisabled("undo",1===a?!0:!1),this.menus.all.main._setIconDisabled("redo",3===b?!0:!1)},_setUndo:function(a){this.setUndoFlag=!1,this.setImage(this.undoArray[a])},_imageOnload:function(){this.setUndoFlag&&this._addUndo(),this.setUndoFlag=!0},clear:function(){this.menus.all.main._isIconDisabled("clear")||(this.ctx.clearRect(0,0,this.width,this.height),this._addUndo(),this.menus.all.main._setIconDisabled("clear",!0))},_drawRectangleDown:function(a){this._drawShapeDown(a)},_drawRectangleMove:function(a){this._drawShapeMove(a),this.ctxTemp.rect(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRectangleUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawEllipseDown:function(a){this._drawShapeDown(a)},_drawEllipseMove:function(a){this._drawShapeMove(a),this.ctxTemp.ellipse(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawEllipseUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawLineDown:function(a){this._drawShapeDown(a)},_drawLineMove:function(a){this._drawShapeMove(a,1);var b=this.canvasTempLeftOriginal,c=this.canvasTempTopOriginal;a.pageX<b&&(a.x=a.x+a.w,a.w=-1*a.w),a.pageY<c&&(a.y=a.y+a.h,a.h=-1*a.h),this.ctxTemp.lineJoin="round",this.ctxTemp.beginPath(),this.ctxTemp.moveTo(a.x,a.y),this.ctxTemp.lineTo(a.x+a.w,a.y+a.h),this.ctxTemp.closePath(),this.ctxTemp.stroke()},_drawLineUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawPencilDown:function(a){this.ctx.lineJoin="round",this.ctx.lineCap="round",this.ctx.strokeStyle=this.options.strokeStyle,this.ctx.fillStyle=this.options.strokeStyle,this.ctx.lineWidth=this.options.lineWidth,this.ctx.beginPath(),this.ctx.arc(a.pageX,a.pageY,this.options.lineWidth/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.moveTo(a.pageX,a.pageY)},_drawPencilMove:function(a){this.ctx.lineTo(a.pageX,a.pageY),this.ctx.stroke()},_drawPencilUp:function(){this.ctx.closePath(),this._addUndo()},_drawEraserDown:function(a){this.ctx.save(),this.ctx.globalCompositeOperation="destination-out",this._drawPencilDown(a)},_drawEraserMove:function(a){this._drawPencilMove(a)},_drawEraserUp:function(a){this._drawPencilUp(a),this.ctx.restore()},_drawBucketDown:function(a){this.ctx.fillArea(a.pageX,a.pageY,this.options.fillStyle),this._addUndo()}})}(jQuery),!function(){window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.fillArea=function(a,b,c){function d(a){return{r:p[a],g:p[a+1],b:p[a+2],a:p[a+3]}}function e(a){p[a]=c.r,p[a+1]=c.g,p[a+2]=c.b,p[a+3]=c.a}function f(a){return g.r===a.r&&g.g===a.g&&g.b===a.b&&g.a===a.a}if(!a||!b||!c)return!0;var g,h,i,j,k,l,m=this.canvas.width,n=this.canvas.height,o=this.getImageData(0,0,m,n),p=o.data,q=[[a,b]];if(g=d(4*(b*m+a)),l=this.canvas.style.color,this.canvas.style.color=c,c=this.canvas.style.color.match(/^rgba?\((.*)\);?$/)[1].split(","),this.canvas.style.color=l,c={r:parseInt(c[0],10),g:parseInt(c[1],10),b:parseInt(c[2],10),a:parseInt(c[3]||255,10)},f(c))return!0;for(;q.length;){for(h=q.pop(),i=4*(h[1]*m+h[0]);h[1]-->=0&&f(d(i));)i-=4*m;for(i+=4*m,++h[1],j=!1,k=!1;h[1]++<n-1&&f(d(i));)e(i),h[0]>0&&(f(d(i-4))?j||(q.push([h[0]-1,h[1]]),j=!0):j&&(j=!1)),h[0]<m-1&&(f(d(i+4))?k||(q.push([h[0]+1,h[1]]),k=!0):k&&(k=!1)),i+=4*m}this.putImageData(o,0,0)})}();

/*wPaint.menu.text.min.js*/
!function(a){a.fn.wPaint.menus.text={img:"plugins/text/img/icons-menu-text.png",items:{bold:{icon:"toggle",title:"Bold",index:0,callback:function(a){this.setFontBold(a)}},italic:{icon:"toggle",title:"Italic",index:1,callback:function(a){this.setFontItalic(a)}},fontSize:{title:"Font Size",icon:"select",range:[8,9,10,12,14,16,20,24,30,36,48,60,72,84,96,120,144],value:12,callback:function(a){this.setFontSize(a)}},fontFamily:{icon:"select",title:"Font Family",range:["Arial","Courier","Times","Verdana"],useRange:!0,value:"Arial",callback:function(a){this.setFontFamily(a)}}}},a.fn.wPaint.menus.main.items.text={icon:"menu",after:"pencil",title:"Text",index:7,callback:function(){this.setMode("text")}},a.extend(a.fn.wPaint.defaults,{fontSize:"12",fontFamily:"Arial",fontBold:!1,fontItalic:!1,fontUnderline:!1}),a.fn.wPaint.extend({generate:function(){this.$textCalc=a("<div></div>").hide(),this.$textInput=a('<textarea class="wPaint-text-input" spellcheck="false"></textarea>').on("mousedown",this._stopPropagation).css({position:"absolute"}).hide(),a("body").append(this.$textCalc),this.$el.append(this.$textInput),this.menus.all.text=this._createMenu("text")},_init:function(){function b(){c._drawTextIfNotEmpty(),c.$textInput.hide(),c.$canvasTemp.hide()}var c=this;for(var d in this.menus.all)this.menus.all[d].$menu.on("click",b).on("mousedown",this._stopPropagation);a(document).on("mousedown",b)},setFillStyle:function(a){this.$textInput.css("color",a)},setFontSize:function(a){this.options.fontSize=parseInt(a,10),this._setFont({fontSize:a+"px",lineHeight:a+"px"}),this.menus.all.text._setSelectValue("fontSize",a)},setFontFamily:function(a){this.options.fontFamily=a,this._setFont({fontFamily:a}),this.menus.all.text._setSelectValue("fontFamily",a)},setFontBold:function(a){this.options.fontBold=a,this._setFont({fontWeight:a?"bold":""})},setFontItalic:function(a){this.options.fontItalic=a,this._setFont({fontStyle:a?"italic":""})},setFontUnderline:function(a){this.options.fontUnderline=a,this._setFont({fontWeight:a?"underline":""})},_setFont:function(a){this.$textInput.css(a),this.$textCalc.css(a)},_drawTextDown:function(a){this._drawTextIfNotEmpty(),this._drawShapeDown(a,1),this.$textInput.css({left:a.pageX-1,top:a.pageY-1,width:0,height:0}).show().focus()},_drawTextMove:function(a){this._drawShapeMove(a,1),this.$textInput.css({left:a.left-1,top:a.top-1,width:a.width,height:a.height})},_drawTextIfNotEmpty:function(){""!==this.$textInput.val()&&this._drawText()},_drawText:function(){var a,b,c,d,e="",f=this.$textInput.val().split("\n"),g=[],h=this.$textInput.width()-2,i=0,j=0,k=this.$textInput.position(),l=k.left+1,m=k.top+1;for(this.options.fontItalic&&(e+="italic "),this.options.fontBold&&(e+="bold "),e+=this.options.fontSize+"px "+this.options.fontFamily,a=0,b=f.length;b>a;a++){for(this.$textCalc.html(""),j=0,c=0,d=f[0].length;d>c;c++)i=this.$textCalc.append(f[a][c]).width(),i>h&&(g.push(f[a].substring(j,c)),j=c,this.$textCalc.html(f[a][c]));j!==c&&g.push(f[a].substring(j,c))}for(f=this.$textInput.val(g.join("\n")).val().split("\n"),a=0,b=f.length;b>a;a++)this.ctx.fillStyle=this.options.fillStyle,this.ctx.textBaseline="top",this.ctx.font=e,this.ctx.fillText(f[a],l,m),m+=this.options.fontSize;this.$textInput.val(""),this._addUndo()}})}(jQuery);

/*wPaint.menu.main.shapes.min.js*/
!function(a){var b="plugins/shapes/img/icons-menu-main-shapes.png";a.extend(!0,a.fn.wPaint.menus.main.items,{rectangle:{group:"shapes"},roundedRect:{icon:"activate",group:"shapes",title:"Rounded Rectangle",img:b,index:0,callback:function(){this.setMode("roundedRect")}},square:{icon:"activate",group:"shapes",title:"Square",img:b,index:1,callback:function(){this.setMode("square")}},roundedSquare:{icon:"activate",group:"shapes",title:"Rounded Square",img:b,index:2,callback:function(){this.setMode("roundedSquare")}},diamond:{icon:"activate",group:"shapes",title:"Diamond",img:b,index:4,callback:function(){this.setMode("diamond")}},ellipse:{group:"shapes2"},circle:{icon:"activate",group:"shapes2",title:"Circle",img:b,index:3,callback:function(){this.setMode("circle")}},pentagon:{icon:"activate",group:"shapes2",title:"Pentagon",img:b,index:5,callback:function(){this.setMode("pentagon")}},hexagon:{icon:"activate",group:"shapes2",title:"Hexagon",img:b,index:6,callback:function(){this.setMode("hexagon")}}}),a.fn.wPaint.extend({_drawRoundedRectDown:function(a){this._drawShapeDown(a)},_drawRoundedRectMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h/a.w:a.w/a.h;this.ctxTemp.roundedRect(a.x,a.y,a.w,a.h,Math.ceil(b*.001*a.w*a.h)),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRoundedRectUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawSquareDown:function(a){this._drawShapeDown(a)},_drawSquareMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.rect(a.x,a.y,b,b),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawSquareUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawRoundedSquareDown:function(a){this._drawShapeDown(a)},_drawRoundedSquareMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.roundedRect(a.x,a.y,b,b,Math.ceil(.001*b*b)),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRoundedSquareUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawDiamondDown:function(a){this._drawShapeDown(a)},_drawDiamondMove:function(a){this._drawShapeMove(a),this.ctxTemp.diamond(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawDiamondUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawCircleDown:function(a){this._drawShapeDown(a)},_drawCircleMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.ellipse(a.x,a.y,b,b),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawCircleUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawPentagonDown:function(a){this._drawShapeDown(a)},_drawPentagonMove:function(a){this._drawShapeMove(a),this.ctxTemp.pentagon(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawPentagonUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawHexagonDown:function(a){this._drawShapeDown(a)},_drawHexagonMove:function(a){this._drawShapeMove(a),this.ctxTemp.hexagon(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawHexagonUp:function(a){this._drawShapeUp(a),this._addUndo()}})}(jQuery),!function(){window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.diamond=function(a,b,c,d){return a&&b&&c&&d?(this.beginPath(),this.moveTo(a+.5*c,b),this.lineTo(a,b+.5*d),this.lineTo(a+.5*c,b+d),this.lineTo(a+c,b+.5*d),this.lineTo(a+.5*c,b),this.closePath(),void 0):!0}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.ellipse=function(a,b,c,d){if(!(a&&b&&c&&d))return!0;var e=.5522848,f=c/2*e,g=d/2*e,h=a+c,i=b+d,j=a+c/2,k=b+d/2;this.beginPath(),this.moveTo(a,k),this.bezierCurveTo(a,k-g,j-f,b,j,b),this.bezierCurveTo(j+f,b,h,k-g,h,k),this.bezierCurveTo(h,k+g,j+f,i,j,i),this.bezierCurveTo(j-f,i,a,k+g,a,k),this.closePath()}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.hexagon=function(a,b,c,d){if(!(a&&b&&c&&d))return!0;var e=.225,f=1-e;this.beginPath(),this.moveTo(a+.5*c,b),this.lineTo(a,b+d*e),this.lineTo(a,b+d*f),this.lineTo(a+.5*c,b+d),this.lineTo(a+c,b+d*f),this.lineTo(a+c,b+d*e),this.lineTo(a+.5*c,b),this.closePath()}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.pentagon=function(a,b,c,d){return a&&b&&c&&d?(this.beginPath(),this.moveTo(a+c/2,b),this.lineTo(a,b+.4*d),this.lineTo(a+.2*c,b+d),this.lineTo(a+.8*c,b+d),this.lineTo(a+c,b+.4*d),this.lineTo(a+c/2,b),this.closePath(),void 0):!0}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.roundedRect=function(a,b,c,d,e){return a&&b&&c&&d?(e||(e=5),this.beginPath(),this.moveTo(a+e,b),this.lineTo(a+c-e,b),this.quadraticCurveTo(a+c,b,a+c,b+e),this.lineTo(a+c,b+d-e),this.quadraticCurveTo(a+c,b+d,a+c-e,b+d),this.lineTo(a+e,b+d),this.quadraticCurveTo(a,b+d,a,b+d-e),this.lineTo(a,b+e),this.quadraticCurveTo(a,b,a+e,b),this.closePath(),void 0):!0})}();

/*wPaint.menu.main.file.min.js*/
!function(a){var b="plugins/file/img/icons-menu-main-file.png";a.extend(!0,a.fn.wPaint.menus.main.items,{save:{icon:"generic",title:"Save Image",img:b,index:0,callback:function(){this.options.saveImg.apply(this,[this.getImage()])}},loadBg:{icon:"generic",group:"loadImg",title:"Load Image to Foreground",img:b,index:2,callback:function(){this.options.loadImgFg.apply(this,[])}},loadFg:{icon:"generic",group:"loadImg",title:"Load Image to Background",img:b,index:1,callback:function(){this.options.loadImgBg.apply(this,[])}}}),a.extend(a.fn.wPaint.defaults,{saveImg:null,loadImgFg:null,loadImgBg:null}),a.fn.wPaint.extend({_showFileModal:function(b,c){function d(a,b){function c(c){c.stopPropagation(),"fg"===a?e.setImage(b):"bg"===a&&e.setBg(b)}g.on("click",c)}for(var e=this,f=a("<div></div>"),g=null,h=0,i=c.length;i>h;h++)g=a('<img class="wPaint-modal-img"/>').attr("src",c[h]),g=a('<div class="wPaint-modal-img-holder"></div>').append(g),d(b,c[h]),f.append(g);this._showModal(f)}})}(jQuery);


/*
 * Say Cheese!
 * Lee Machin, 2012
 * http://leemach.in, http://new-bamboo.co.uk
 *
 * Minimal javascript library for integrating a webcam and snapshots into your app.
 *
 * Handles starting up the webcam and rendering the element, and also capturing shots
 * in a separate canvas element.
 *
 * Depends on video and canvas, and of course, getUserMedia. It's unlikely to work
 * on anything but the newest browsers.
 */

var SayCheese = (function() {
  var SayCheese;
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia ||
                            false);

  window.AudioContext = (window.AudioContext ||
                         window.webkitAudioContext);

  window.URL = (window.URL ||
                window.webkitURL);

  SayCheese = function SayCheese(element, options) {
    this.snapshots = [],
    this.video = null,
    this.events = {},
    this.stream = null,
    this.options = {
      snapshots: true,
      audio: false
    };

    this.setOptions(options);
    this.element = document.querySelector(element);
    return this;
  };

  SayCheese.prototype.on = function on(evt, handler) {
    if (this.events.hasOwnProperty(evt) === false) {
      this.events[evt] = [];
    }

    this.events[evt].push(handler)
  };

  SayCheese.prototype.off = function off(evt, handler) {
    this.events = this.events[evt].filter(function(h) {
      if (h !== handler) {
        return h;
      }
    });
  };

  SayCheese.prototype.trigger = function trigger(evt, data) {
    if (this.events.hasOwnProperty(evt) === false) {
      return false;
    }

    this.events[evt].forEach(function(handler) {
      handler.call(this, data);
    }.bind(this));
  };

  SayCheese.prototype.setOptions = function setOptions(options) {
    // just use naïve, shallow cloning
    for (var opt in options) {
      this.options[opt] = options[opt];
    }
  }

  SayCheese.prototype.getStreamUrl = function getStreamUrl() {
    if (window.URL && window.URL.createObjectURL) {
      return window.URL.createObjectURL(this.stream);
    } else {
      return this.stream;
    }
  };

  SayCheese.prototype.createVideo = function createVideo() {
    var width     = 320,
        height    = 0,
        streaming = false;

    this.video = document.createElement('video');
    this.video.addEventListener('canplay', function() {
      if (!streaming) {
        height = this.video.videoHeight / (this.video.videoWidth / width);
        this.video.style.width = parseInt(width)+'px';
        this.video.style.height = parseInt(height)+'px';
        streaming = true;
        return this.trigger('start');
      }
    }.bind(this), false);
  };

  SayCheese.prototype.linkAudio = function linkAudio() {
    this.audioCtx = new window.AudioContext();
    this.audioStream = this.audioCtx.createMediaStreamSource(this.stream);

    var biquadFilter = this.audioCtx.createBiquadFilter();

    this.audioStream.connect(biquadFilter);
    biquadFilter.connect(this.audioCtx.destination);
  };

  SayCheese.prototype.takeSnapshot = function takeSnapshot(width, height) {
    if (this.options.snapshots === false) {
      return false;
    }

    width  = width || this.video.videoWidth;
    height = height || this.video.videoHeight;

    var snapshot = document.createElement('canvas'),
        ctx      = snapshot.getContext('2d');

    snapshot.width  = width;
    snapshot.height = height;

    ctx.drawImage(this.video, 0, 0, width, height);

    this.snapshots.push(snapshot);
    this.trigger('snapshot', snapshot);

    ctx = null;
  };

  /* Start up the stream, if possible */
  SayCheese.prototype.start = function start() {

    // fail fast and softly if browser not supported
    if (navigator.getUserMedia === false) {
      this.trigger('error', 'NOT_SUPPORTED');
      return false;
    }

    var success = function success(stream) {
		var a=document.getElementById("div_webcamopen");
		if(a && a.style.display=='none') return;
		var a=this.element.getElementsByTagName('VIDEO');
		if(a.length>0) {
			return;
		}

      this.stream = stream;
      this.createVideo();

      if (navigator.mozGetUserMedia) {
        this.video.mozSrcObject = stream;
      } else {
        this.video.src = this.getStreamUrl();
      }

      if (this.options.audio === true) {
        try {
          this.linkAudio();
        } catch(e) {
          this.trigger('error', 'AUDIO_NOT_SUPPORTED');
        }
      }

      this.element.appendChild(this.video);
      this.video.play();
    }.bind(this);

    /* error is also called when someone denies access */
    var error = function error(error) {
      this.trigger('error', error);
    }.bind(this);

    return navigator.getUserMedia({ video: true, audio: this.options.audio }, success, error);
  };

  SayCheese.prototype.stop = function stop() {
	 if(this.stream.stop) this.stream.stop();

    if (window.URL && window.URL.revokeObjectURL) {
      window.URL.revokeObjectURL(this.video.src);
    }

    return this.trigger('stop');
  };

  return SayCheese;

})();