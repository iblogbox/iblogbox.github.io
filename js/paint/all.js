function setstorage(name,value){
	if (window.localStorage){
		localStorage[name]=value+'';
	}else{
		//setCookie(name, value, 1000*60*60*24*365*10); 
	}
}
function getstorage(name){
	var s;
	if (window.localStorage){
		s=localStorage[name];
	}else{
		//s=getCookie(name);
	}
	return s;
}
function number_format (number, decimals, dec_point, thousands_sep) {
	if(!number)return 0;
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

	function getOffset(b) {
		var a = 0;
		var c = 0;
		while (b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop)) {
	        a += b.offsetLeft;
		    c += b.offsetTop;
			b = b.offsetParent;
		}      
	    return {
		    left: a,
			top: c
		}
	}

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
	if (!str || !str.replace) str='';
  	return str.replace(/^\s*|\s*$/g,"");
}

function html_entity_encode(str){
	if (!str || !str.replace) str='';
  str = str.replace(/&/gi, "&amp;");
  str = str.replace(/>/gi, "&gt;");
  str = str.replace(/</gi, "&lt;");
  str = str.replace(/\"/gi, "&quot;");
  str = str.replace(/\'/gi, "&#039;");
  return str;
}
var henc=html_entity_encode;

function shortstring(s,len){
	if (!s) s='';
	if (s.length > len) s=s.substr(0,len)+"...";
	return s;
}

function cutstringmiddle(s,len,left,right){
	if (!s) s='';
	if (s.length <= len) return s;			
	var s1,s2;	
	s1=s.substr(0,left);
	s2=s.substr(s.length-right,s.length);	
	return s1+'.....'+s2;
}
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

var messagetimer=null;
function show_message(s,x,y,padding,timeout){
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


/*! rgbHex - v1.1.2 - 2013-09-27 */window.rgbHex=function(){function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}function b(a){return a.replace(/^\s+|\s+$/g,"")}function c(c){return c=b(c),a(c)&&c>=0&&255>=c}function d(a){return/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(b(a))}function e(a){return a=parseInt(a,10).toString(16),1===a.length?"0"+a:a}function f(a){return parseInt(a,16).toString()}function g(b){return b=b.split(","),(3===b.length||4===b.length)&&c(b[0])&&c(b[1])&&c(b[2])?4!==b.length||a(b[3])?"#"+e(b[0]).toUpperCase()+e(b[1]).toUpperCase()+e(b[2]).toUpperCase():null:null}function h(a){return d(a)?(3===a.length&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)),"rgb("+f(a.substr(0,2))+","+f(a.substr(2,2))+","+f(a.substr(4,2))+")"):void 0}function i(a){return a.replace(/\s/g,"")}return function(a){if(!a)return null;var c=null,d=/^rgba?\((.*)\);?$/,e=/^#/;return a=b(a.toString()),"transparent"===a||"rgba(0,0,0,0)"===i(a)?"transparent":d.test(a)?g(a.match(d)[1]):e.test(a)?h(a.split("#").reverse()[0]):(c=a.split(","),1===c.length?h(a):3===c.length||4===c.length?g(a):void 0)}}(),jQuery&&jQuery.extend({rgbHex:function(a){return window.rgbHex(a)}});
/*! wColorPicker - v2.1.7 - 2013-09-27 */!function(a){function b(b,c){this.$el=a(b),this.options=c,this.init=!1,this.generate()}b.prototype={generate:function(){return this.$colorPicker||(this.$noneColorPalette=this._createPalette("none",[["transparent"]]),this.$simpleColorPalette=this._createPalette("simple",a.fn.wColorPicker.simpleColors),this.$mixedColorPalette=this._createPalette("mixed",a.fn.wColorPicker.mixedColors),this.$colorTarget=a('<div class="wColorPicker-color-target"></div>'),this.$customInput=a('<input type="text" class="wColorPicker-custom-input"/>').keyup(a.proxy(this._customInputKeyup,this)),this.options.dropperButton&&(this.$dropperButton=this._createDropperButton()),this.$colorPickerPalettesHolder=a('<div class="wColorPicker-palettes-holder"></div>').append(this.$noneColorPalette).append(this.$colorTarget).append(this.$customInput).append(this.$dropperButton).append("<br/>").append(this.$simpleColorPalette).append(this.$mixedColorPalette),this.$colorPickerHolder=a('<div class="wColorPicker-holder"></div>').append(this.$colorPickerPalettesHolder),this.$colorPickerBg=a('<div class="wColorPicker-bg"></div>'),this.$colorPicker=a('<div class="wColorPicker" title=""></div>').mouseenter(function(a){a.stopPropagation()}).bind("mouseenter mousemove click",function(a){a.stopPropagation()}).append(this.$colorPickerBg).append(this.$colorPickerHolder),this.setOpacity(this.options.opacity),this.setTheme(this.options.theme),this.setColor(this.options.color),a("body").append(this.$colorPicker),this.width=this.$colorPickerPalettesHolder.width(),this.height=this.$colorPickerPalettesHolder.height(),this.$colorPickerPalettesHolder.width(this.width),this.$colorPickerPalettesHolder.height(this.height),this.$el.append(this.$colorPicker),this.setMode(this.options.mode),this.setPosition(this.options.position)),this.init=!0,this},setTheme:function(a){this.$colorPicker.attr("class",this.$colorPicker.attr("class").replace(/wColorPicker-theme-.+\s|wColorPicker-theme-.+$/,"")),this.$colorPicker.addClass("wColorPicker-theme-"+a)},setOpacity:function(a){this.$colorPickerBg.css("opacity",a)},setColor:function(a){return window.rgbHex(a)?(this.options.color=a,this.$colorTarget.css("backgroundColor",a),this.$customInput.val(a),this.init&&this.options.onSelect&&this.options.onSelect.apply(this,[a]),void 0):!0},setMode:function(b){var c=this,d=function(){c._toggleEffect("show")},e=function(){c._toggleEffect("hide")};if("flat"===b?this.$colorPicker.removeClass("wColorPicker-zindex").css({position:"relative",display:""}):this.$colorPicker.addClass("wColorPicker-zindex").css({position:"absolute"}).hide(),this.$el.find("wColorPicker-button").remove(),this.$el.unbind("mouseenter",d).unbind("mouseleave",e),a(document).unbind("click",e),"flat"!==b){var f=null,g=null,h=function(a){a.stopPropagation(),c.options.generateButton&&g.css("backgroundColor",c.options.color),c._toggleEffect()};this.options.generateButton&&(f=a('<div class="wColorPicker-button"></div>'),g=a('<div class="wColorPicker-button-color"></div>').css("backgroundColor",this.options.color),this.$el.append(f),f.append(g.height(this.$el.height()-f.outerHeight(!0)))),this.$noneColorPalette.bind("click",h),this.$simpleColorPalette.bind("click",h),this.$mixedColorPalette.bind("click",h)}"click"===b?(this.$el.click(function(a){c._toggleEffect(),a.stopPropagation()}),this.$colorPicker.click(function(a){a.stopPropagation()}),a(document).bind("click",e)):"hover"===b&&this.$el.bind("mouseenter",d).bind("mouseleave",e)},setEffect:function(a){return"flat"===this.options.mode?!0:(this.$colorPicker.css("opacity",1),this.$colorPickerHolder.width(this.width).height(this.height),"fade"===a?this.$colorPicker.css("opacity",0):"slide"===a&&this.$colorPickerHolder.width("x"===this.positionAxis?0:this.width).height("y"===this.positionAxis?0:this.height),void 0)},setPosition:function(a){if("flat"===this.options.mode)return!0;var b=this.$el.outerWidth(),c=this.$el.outerHeight(),d=this.$el.outerWidth()/2-this.$colorPicker.outerWidth()/2,e=this.$el.outerHeight()/2-this.$colorPicker.outerHeight()/2,f={left:"",right:"",top:"",bottom:""},g=this.options.position.charAt(0);switch("t"===g||"b"===g?this.positionAxis="y":("l"===g||"r"===g)&&(this.positionAxis="x"),a){case"tl":f.left=0,f.bottom=c;break;case"tc":f.left=d,f.bottom=c;break;case"tr":f.right=0,f.bottom=c;break;case"rt":f.left=b,f.top=0;break;case"rm":f.left=b,f.top=e;break;case"rb":f.left=b,f.bottom=0;break;case"br":f.right=0,f.top=c;break;case"bc":f.left=d,f.top=c;break;case"bl":f.left=0,f.top=c;break;case"lb":f.right=b,f.bottom=0;break;case"lm":f.right=b,f.top=e;break;case"lt":f.right=b,f.top=0}this.$colorPicker.css(f),this.setEffect(this.options.effect)},_createPalette:function(b,c){var d=0,e=0,f=0,g=0,h=null,i=a('<div class="wColorPicker-palette wColorPicker-palette-'+b+'"></div>');for(d=0,e=c.length;e>d;d++){for(f=0,g=c[d].length;g>f;f++)h=this._createColor(f,c[d][f]),0===d&&h.addClass("wColorPicker-palette-color-top"),0===f&&h.addClass("wColorPicker-palette-color-left"),i.append(h);e>d&&i.append("<br/>")}return i},_createColor:function(b,c){var d=this;return a('<div class="wColorPicker-palette-color"></div>').attr("id","wColorPicker-palette-color-"+b).addClass("wColorPicker-palette-color-"+b).css("backgroundColor",c).hover(function(){d._colorMouseenter(a(this))},function(){d._colorMouseleave(a(this))}).click(function(){d.setColor(window.rgbHex(a(this).css("backgroundColor")))})},_createDropperButton:function(){return a('<div class="wColorPicker-dropper"></div>').click(a.proxy(this.options.onDropper,this))},_customInputKeyup:function(b){var c=a(b.target).val();window.rgbHex(c)&&(this.$colorTarget.css("backgroundColor",c),13===b.keyCode&&this.setColor(c))},_colorMouseenter:function(a){var b=window.rgbHex(a.css("backgroundColor"));a.addClass("active").prev().addClass("active-right"),a.prevAll("."+a.attr("id")+":first").addClass("active-bottom"),this.$colorTarget.css("backgroundColor",b),this.$customInput.val(b),this.options.onMouseover&&this.options.onMouseover.apply(this,[b])},_colorMouseleave:function(a){a.removeClass("active").prev().removeClass("active-right"),a.prevAll("."+a.attr("id")+":first").removeClass("active-bottom"),this.$colorTarget.css("backgroundColor",this.options.color),this.$customInput.val(this.options.color),this.options.onMouseout&&this.options.onMouseout.apply(this,[this.options.color])},_toggleEffect:function(a){var b=this.$colorPicker.hasClass("wColorPicker-visible");(!a||"show"===a&&b===!1||"hide"===a&&b===!0)&&(b||this.setPosition(this.options.position),this["_"+this.options.effect+"Effect"+(b?"Hide":"Show")](),this.$colorPicker.toggleClass("wColorPicker-visible"))},_noneEffectShow:function(){this.$colorPicker.css("display","inline-block")},_noneEffectHide:function(){this.$colorPicker.hide()},_fadeEffectShow:function(){this.$colorPicker.stop(!0,!1).css({display:"inline-block"}).animate({opacity:1},this.options.showSpeed)},_fadeEffectHide:function(){this.$colorPicker.stop(!0,!1).animate({opacity:0},this.options.hideSpeed,a.proxy(function(){this.$colorPicker.hide()},this))},_slideEffectShow:function(){var a="y"===this.positionAxis?{height:this.height}:{width:this.width};this.$colorPicker.css("display","inline-block"),this.$colorPickerHolder.stop(!0,!1).animate(a,this.options.showSpeed)},_slideEffectHide:function(){var b="y"===this.positionAxis?{height:0}:{width:0};this.$colorPickerHolder.stop(!0,!1).animate(b,this.options.hideSpeed,a.proxy(function(){this.$colorPicker.hide()},this))}},a.fn.wColorPicker=function(c,d){function e(d){var e,f=a.data(d,"wColorPicker");return f||(e=a.extend({},a.fn.wColorPicker.defaults,c),e.color=window.rgbHex(e.color)?e.color:"transparent",f=new b(d,e),a.data(d,"wColorPicker",f)),f}if("string"==typeof c){var f=[],g=null,h=null,i=null;return h=this.each(function(){g=a(this).data("wColorPicker"),g&&(i=(d?"set":"get")+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase(),g[c]?f.push(g[c].apply(g,[d])):d?(g[i]&&g[i].apply(g,[d]),g.options[c]&&(g.options[c]=d)):g[i]?f.push(g[i].apply(g,[d])):g.options[c]?f.push(g.options[c]):f.push(null))}),1===f.length?f[0]:f.length>0?f:h}return this.each(function(){e(this)})},a.fn.wColorPicker.defaults={theme:"classic",opacity:.9,color:"#FF0000",mode:"flat",position:"bl",generateButton:!0,dropperButton:!1,effect:"slide",showSpeed:500,hideSpeed:500,onMouseover:null,onMouseout:null,onSelect:null,onDropper:null},a.fn.wColorPicker.mixedColors=[["#000000","#003300","#006600","#009900","#00CC00","#00FF00","#330000","#333300","#336600","#339900","#33CC00","#33FF00","#660000","#663300","#666600","#669900","#66CC00","#66FF00"],["#000033","#003333","#006633","#009933","#00CC33","#00FF33","#330033","#333333","#336633","#339933","#33CC33","#33FF33","#660033","#663333","#666633","#669933","#66CC33","#66FF33"],["#000066","#003366","#006666","#009966","#00CC66","#00FF66","#330066","#333366","#336666","#339966","#33CC66","#33FF66","#660066","#663366","#666666","#669966","#66CC66","#66FF66"],["#000099","#003399","#006699","#009999","#00CC99","#00FF99","#330099","#333399","#336699","#339999","#33CC99","#33FF99","#660099","#663399","#666699","#669999","#66CC99","#66FF99"],["#0000CC","#0033CC","#0066CC","#0099CC","#00CCCC","#00FFCC","#3300CC","#3333CC","#3366CC","#3399CC","#33CCCC","#33FFCC","#6600CC","#6633CC","#6666CC","#6699CC","#66CCCC","#66FFCC"],["#0000FF","#0033FF","#0066FF","#0099FF","#00CCFF","#00FFFF","#3300FF","#3333FF","#3366FF","#3399FF","#33CCFF","#33FFFF","#6600FF","#6633FF","#6666FF","#6699FF","#66CCFF","#66FFFF"],["#990000","#993300","#996600","#999900","#99CC00","#99FF00","#CC0000","#CC3300","#CC6600","#CC9900","#CCCC00","#CCFF00","#FF0000","#FF3300","#FF6600","#FF9900","#FFCC00","#FFFF00"],["#990033","#993333","#996633","#999933","#99CC33","#99FF33","#CC0033","#CC3333","#CC6633","#CC9933","#CCCC33","#CCFF33","#FF0033","#FF3333","#FF6633","#FF9933","#FFCC33","#FFFF33"],["#990066","#993366","#996666","#999966","#99CC66","#99FF66","#CC0066","#CC3366","#CC6666","#CC9966","#CCCC66","#CCFF66","#FF0066","#FF3366","#FF6666","#FF9966","#FFCC66","#FFFF66"],["#990099","#993399","#996699","#999999","#99CC99","#99FF99","#CC0099","#CC3399","#CC6699","#CC9999","#CCCC99","#CCFF99","#FF0099","#FF3399","#FF6699","#FF9999","#FFCC99","#FFFF99"],["#9900CC","#9933CC","#9966CC","#9999CC","#99CCCC","#99FFCC","#CC00CC","#CC33CC","#CC66CC","#CC99CC","#CCCCCC","#CCFFCC","#FF00CC","#FF33CC","#FF66CC","#FF99CC","#FFCCCC","#FFFFCC"],["#9900FF","#9933FF","#9966FF","#9999FF","#99CCFF","#99FFFF","#CC00FF","#CC33FF","#CC66FF","#CC99FF","#CCCCFF","#CCFFFF","#FF00FF","#FF33FF","#FF66FF","#FF99FF","#FFCCFF","#FFFFFF"]],a.fn.wColorPicker.simpleColors=[["#000000"],["#333333"],["#666666"],["#999999"],["#CCCCCC"],["#FFFFFF"],["#FF0000"],["#00FF00"],["#0000FF"],["#FFFF00"],["#00FFFF"],["#FF00FF"]]}(jQuery);

var g_paint_obj;
!function(e){function h(a,b){this.$el=e(a);this.options=b;this.init=!1;this.menus={primary:null,active:null,all:{}};this.previousMode=null;this.width=this.$el.width();this.height=this.$el.height();this.ctxResize=this.ctxBgResize=!1;this.generate();this._init()}function l(a,b,c){this.wPaint=a;this.options=c;this.name=b;this.type=a.menus.primary?"secondary":"primary";this.docked=!0;this.dockOffset={left:0,top:0};this.generate()}h.prototype={generate:function(){function a(a){var d=a?a.capitalize():"",
f="canvas"+d,d="ctx"+d;return b[f]=document.createElement("canvas"),b[d]=b[f].getContext("2d"),b["$"+f]=e(b[f]),b["$"+f].attr("class","wPaint-canvas"+(a?"-"+a:"")).attr("width",b.width+"px").attr("height",b.height+"px").css({position:"absolute",left:0,top:0}),b.$el.append(b["$"+f]),b["$"+f]}if(this.init)return this;var b=this;a("bg");a("").on("mousedown",function(a){a.preventDefault();a.stopPropagation();b.draw=!0;a.canvasEvent="down";b._closeSelectBoxes();b._callShapeFunc.apply(b,[a])}).bindMobileEvents();
a("temp").hide();e(document).on("mousemove",function(a){b.draw&&(a.canvasEvent="move",b._callShapeFunc.apply(b,[a]))}).on("mousedown",e.proxy(this._closeSelectBoxes,this)).on("mouseup",function(a){b.draw&&(b.draw=!1,a.canvasEvent="up",b._callShapeFunc.apply(b,[a]))});this.setTheme(this.options.theme)},_init:function(){g_paint_obj=this;var a=null,b=null;this.init=!0;for(a in this.options)b="set"+a.capitalize(),this[b]&&this[b](this.options[a]);this._fixMenus();this.menus.primary._getIcon(this.options.mode).trigger("click")},
getoption:function(a){a&&a(this.options,this.undoCurrent)},resize:function(a){var b=this.getBg(),c=this.getImage();this.width=this.$el.width();this.height=this.$el.height();this.canvasBg.width=this.width;this.canvasBg.height=this.height;this.canvas.width=this.width;this.canvas.height=this.height;var d=this;!1===this.ctxBgResize?(this.ctxBgResize=!0,this.setBg(b,!0,function(){!1===d.ctxResize?(d.ctxResize=!0,d.setImage(c,"",!0,a)):a&&a()})):!1===this.ctxResize?(this.ctxResize=!0,this.setImage(c,"",
!0,a)):a&&a()},setTheme:function(a){var b,c;a=a.split(" ");this.$el.attr("class",(this.$el.attr("class")||"").replace(/wPaint-theme-.+\s|wPaint-theme-.+$/,""));b=0;for(c=a.length;c>b;b++)this.$el.addClass("wPaint-theme-"+a[b])},setMode:function(a){this.setCursor(a);this.previousMode=this.options.mode;this.options.mode=a},setImage:function(a,b,c,d){function f(){var a=1,e=0,f=0,h=0,l=0,n=m.width,p=m.height;c||((m.width>k.width||m.height>k.height)&&(e=k.width/m.width,f=k.height/m.height,a=f>e?e:f,n=
m.width*a,p=m.height*a),h=(k.width-n)/2,l=(k.height-p)/2);g.clearRect(0,0,k.width,k.height);g.drawImage(m,h,l,n,p);g||k._imageOnload();k[b+"Resize"]=!1;d&&("bg"!=b&&k._addUndo(),d(!0))}if(!a)return!0;var k=this,m=null,g="";b="ctx"+(b||"").capitalize();g=this[b];window.rgbHex(a)?(g.clearRect(0,0,this.width,this.height),g.fillStyle=a,g.rect(0,0,this.width,this.height),g.fill()):(m=new Image,m.onerror=function(){d&&d(!1)},m.src=a.toString(),e(m).load(f))},setBg:function(a,b,c){return a?(this.setImage(a,
"bg",b,c),void 0):!0},setCursor:function(a){a=e.fn.wPaint.cursors[a]||e.fn.wPaint.cursors["default"];this.$el.css("cursor",'url("'+this.options.path+a.path+'") '+a.left+" "+a.top+", default")},getImage:function(a){var b=document.createElement("canvas"),c=b.getContext("2d");return a=!1===a?!1:!0,e(b).css({display:"none",position:"absolute",left:0,top:0}).attr("width",this.width).attr("height",this.height),a&&c.drawImage(this.canvasBg,0,0),c.drawImage(this.canvas,0,0),b.toDataURL()},getBg:function(){return this.canvasBg.toDataURL()},
_displayStatus:function(a){var b=this;this.$status||(this.$status=e('<div class="wPaint-status"></div>'),this.$el.append(this.$status));this.$status.html(a);clearTimeout(this.displayStatusTimer);this.$status.fadeIn(500,function(){b.displayStatusTimer=setTimeout(function(){b.$status.fadeOut(500)},1500)})},_showModal:function(a){function b(){d.remove();e.remove();c._createModal(a)}var c=this,d=this.$el.children(".wPaint-modal-bg"),e=this.$el.children(".wPaint-modal");d.length?e.fadeOut(500,b):this._createModal(a)},
_createModal:function(a){function b(){c.remove();d.remove()}a=e('<div class="wPaint-modal-content"></div>').append(a.children());var c=e('<div class="wPaint-modal-bg"></div>'),d=e('<div class="wPaint-modal"></div>'),f=e('<div class="wPaint-modal-holder"></div>'),k=e('<div class="wPaint-modal-close">X</div>');k.on("click",function(){d.fadeOut(500,b)});d.append(f.append(a)).append(k);this.$el.append(c).append(d);d.css({left:this.$el.outerWidth()/2-d.outerWidth(!0)/2,top:this.$el.outerHeight()/2-d.outerHeight(!0)/
2});d.fadeIn(500)},_createMenu:function(a,b){return b=b||{},b.alignment=this.options.menuOrientation,b.handle=this.options.menuHandle,new l(this,a,b)},_fixMenus:function(){function a(a,c){var d=e(c),g=d.clone();g.appendTo(b.$el);g.outerHeight()===g.get(0).scrollHeight&&d.css({overflowY:"auto"});g.remove()}var b=this,c=null,d;for(d in this.menus.all)c=b.menus.all[d].$menu.find(".wPaint-menu-select-holder"),c.length&&c.children().each(a)},_closeSelectBoxes:function(a){var b,c;for(b in this.menus.all)c=
this.menus.all[b].$menuHolder.children(".wPaint-menu-icon-select"),a&&(c=c.not(".wPaint-menu-icon-name-"+a.name)),c.children(".wPaint-menu-select-holder").hide()},_imageOnload:function(){},_callShapeFunc:function(a){var b=this.$canvas.offset(),c=a.canvasEvent.capitalize(),d="_draw"+this.options.mode.capitalize()+c;a.pageX=Math.floor(a.pageX-b.left);a.pageY=Math.floor(a.pageY-b.top);this[d]&&this[d].apply(this,[a]);this.options["draw"+c]&&this.options["_draw"+c].apply(this,[a])},_stopPropagation:function(a){a.stopPropagation()},
_drawShapeDown:function(a){this.$canvasTemp.css({left:a.PageX,top:a.PageY}).attr("width",0).attr("height",0).show();this.canvasTempLeftOriginal=a.pageX;this.canvasTempTopOriginal=a.pageY;this.options.onShapeDown&&this.options.onShapeDown.apply(this,[a])},_drawShapeMove:function(a,b){var c=this.canvasTempLeftOriginal,d=this.canvasTempTopOriginal;b=b||2;a.left=a.pageX<c?a.pageX:c;a.top=a.pageY<d?a.pageY:d;a.width=Math.abs(a.pageX-c);a.height=Math.abs(a.pageY-d);a.x=this.options.lineWidth/2*b;a.y=this.options.lineWidth/
2*b;a.w=a.width-this.options.lineWidth*b;a.h=a.height-this.options.lineWidth*b;e(this.canvasTemp).css({left:a.left,top:a.top}).attr("width",a.width).attr("height",a.height);this.canvasTempLeftNew=a.left;this.canvasTempTopNew=a.top;this.ctxTemp.fillStyle=this.options.fillStyle;this.ctxTemp.strokeStyle=this.options.strokeStyle;this.ctxTemp.lineWidth=this.options.lineWidth*(b||2);this.options.onShapeDown&&this.options.onShapeMove.apply(this,[a])},_drawShapeUp:function(a){this.ctx.drawImage(this.canvasTemp,
this.canvasTempLeftNew,this.canvasTempTopNew);this.$canvasTemp.hide();this.options.onShapeDown&&this.options.onShapeUp.apply(this,[a])},_drawDropperDown:function(a){a=this._getPixel(this.ctx,{x:a.pageX,y:a.pageY});var b=null,b="rgba("+[a.r,a.g,a.b,a.a].join()+")";this.options[this.dropper]=b;this.menus.active._getIcon(this.dropper).wColorPicker("color",b)},_drawDropperUp:function(){this.setMode(this.previousMode)},_getPixel:function(a,b){var c=a.getImageData(0,0,this.width,this.height),d=c.data,c=
4*(b.y*c.width+b.x);return{r:d[c],g:d[c+1],b:d[c+2],a:d[c+3]}}};l.prototype={generate:function(){var a=null;this.$menu=e('<div class="wPaint-menu"></div>');this.$menuHolder=e('<div class="wPaint-menu-holder wPaint-menu-name-'+this.name+'"></div>');this.options.handle?this.$menuHandle=this._createHandle():this.$menu.addClass("wPaint-menu-nohandle");"primary"===this.type?(this.wPaint.menus.primary=this,this.setOffsetLeft(this.options.offsetLeft),this.setOffsetTop(this.options.offsetTop)):"secondary"===
this.type&&this.$menu.hide();this.$menu.append(this.$menuHolder.append(this.$menuHandle));this.reset();this.setAlignment(this.options.alignment);this.wPaint.$el.append(this.$menu);a=this.$menu.css("left");this.$menu.css("left",-1E4);this.$menu.width(this.$menu.width()+1);this.$menu.css("left",a);"secondary"===this.type&&("horizontal"===this.options.alignment?this.dockOffset.top=this.wPaint.menus.primary.$menu.outerHeight(!0):this.dockOffset.left=this.wPaint.menus.primary.$menu.outerWidth(!0))},reset:function(){var a,
b=e.fn.wPaint.menus[this.name];for(a in b.items)this.$menuHolder.children(".wPaint-menu-icon-name-"+a).length||(b.items[a].name=a,b.items[a].img=this.wPaint.options.path+(b.items[a].img||b.img),this._appendItem(b.items[a]))},_appendItem:function(a){var b=this["_createIcon"+a.icon.capitalize()](a);a.after?this.$menuHolder.children(".wPaint-menu-icon-name-"+a.after).after(b):this.$menuHolder.append(b)},setOffsetLeft:function(a){this.$menu.css({left:a})},setOffsetTop:function(a){this.$menu.css({top:a})},
setAlignment:function(a){this.$menu.attr("class",this.$menu.attr("class").replace(/wPaint-menu-alignment-.+\s|wPaint-menu-alignment-.+$/,""));this.$menu.addClass("wPaint-menu-alignment-"+a)},_createHandle:function(){function a(){d.docked=!1;d._setDrag()}function b(){e.each(d.$menu.data("ui-draggable").snapElements,function(a,b){var c=d.$menu.offset(),e=d.wPaint.menus.primary.$menu.offset();d.dockOffset.left=c.left-e.left;d.dockOffset.top=c.top-e.top;d.docked=b.snapping});d._setDrag()}function c(){d._setIndex()}
var d=this,f=e('<div class="wPaint-menu-handle"></div>');return this.$menu.draggable({handle:f}),"secondary"===this.type&&(this.$menu.draggable("option","snap",this.wPaint.menus.primary.$menu),this.$menu.draggable("option","start",a),this.$menu.draggable("option","stop",b),this.$menu.draggable("option","drag",c)),f.bindMobileEvents(),f},_createIconBase:function(a){var b=this,c=e('<div class="wPaint-menu-icon wPaint-menu-icon-name-'+a.name+'"></div>'),d=e('<div class="wPaint-menu-icon-img"></div>'),
f=d.realWidth(null,null,this.wPaint.$el);return c.attr("title",a.title).on("mousedown",e.proxy(this.wPaint._closeSelectBoxes,this.wPaint,a)).on("mouseenter",function(a){a=e(a.currentTarget);a.siblings(".hover").removeClass("hover");a.hasClass("disabled")||a.addClass("hover")}).on("mouseleave",function(a){e(a.currentTarget).removeClass("hover")}).on("click",function(){b.wPaint.menus.active=b}),e.isNumeric(a.index)&&d.css({backgroundImage:"url("+a.img+")",backgroundPosition:-f*a.index+"px 0px"}),c.append(d)},
_createIconGroup:function(a){function b(){k.children(".wPaint-menu-select-holder").is(":visible")||a.callback.apply(d.wPaint,[])}function c(){k.addClass("active").siblings(".active").removeClass("active")}var d=this,f={backgroundImage:"url("+a.img+")"},k=this.$menuHolder.children(".wPaint-menu-icon-group-"+a.group),m=k.length,g=null,h=null,l=null,q=0;return m||(k=this._createIconBase(a).addClass("wPaint-menu-icon-group wPaint-menu-icon-group-"+a.group).on("click.setIcon",b).on("mousedown",e.proxy(this._iconClick,
this))),q=k.children(".wPaint-menu-icon-img").realWidth(null,null,this.wPaint.$el),f.backgroundPosition=-q*a.index+"px center",g=k.children(".wPaint-menu-select-holder"),g.length||(g=this._createSelectBox(k),g.children().on("click",c)),l=e('<div class="wPaint-menu-icon-select-img"></div>').attr("title",a.title).css(f),h=this._createSelectOption(g,l).addClass("wPaint-menu-icon-name-"+a.name).on("click",function(){k.attr("title",a.title).off("click.setIcon").on("click.setIcon",b);k.children(".wPaint-menu-icon-img").css(f);
a.callback.apply(d.wPaint,[])}),a.after&&g.children(".wPaint-menu-select").children(".wPaint-menu-icon-name-"+a.after).after(h),m?void 0:k},_createIconGeneric:function(a){return this._createIconActivate(a)},_createIconActivate:function(a){if(a.group)return this._createIconGroup(a);var b=this,c=this._createIconBase(a);return c.on("click",function(c){"generic"!==a.icon&&b._iconClick(c);a.callback.apply(b.wPaint,[c])}),c},_isIconDisabled:function(a){return this.$menuHolder.children(".wPaint-menu-icon-name-"+
a).hasClass("disabled")},_setIconDisabled:function(a,b){var c=this.$menuHolder.children(".wPaint-menu-icon-name-"+a);b?c.addClass("disabled").removeClass("hover"):c.removeClass("disabled")},_getIcon:function(a){return this.$menuHolder.children(".wPaint-menu-icon-name-"+a)},_iconClick:function(a){a=e(a.currentTarget);var b=this.wPaint.menus.all,c;for(c in b)b[c]&&"secondary"===b[c].type&&b[c].$menu.hide();a.siblings(".active").removeClass("active");a.hasClass("disabled")||a.addClass("active")},_createIconToggle:function(a){var b=
this,c=this._createIconBase(a);return c.on("click",function(){c.toggleClass("active");a.callback.apply(b.wPaint,[c.hasClass("active")])}),c},_createIconSelect:function(a){function b(b){m.children(".wPaint-menu-icon-img").html(e(b.currentTarget).html());a.callback.apply(k.wPaint,[e(b.currentTarget).html()])}var c,d,f,k=this,m=this._createIconBase(a),g=this._createSelectBox(m);c=0;for(d=a.range.length;d>c;c++)f=this._createSelectOption(g,a.range[c]),f.on("click",b),a.useRange&&f.css(a.name,a.range[c]);
return m},_createSelectBox:function(a){function b(){m=setTimeout(function(){f.toggle()},200)}function c(){clearTimeout(m)}function d(){f.toggle()}var f=e('<div class="wPaint-menu-select-holder"></div>'),k=e('<div class="wPaint-menu-select"></div>'),m=null;return f.on("mousedown mouseup",this.wPaint._stopPropagation).on("click",function(a){a.stopPropagation();f.hide()}).hide(),"horizontal"===this.options.alignment?f.css({left:0,top:a.children(".wPaint-menu-icon-img").realHeight("outer",!0,this.wPaint.$el)}):
f.css({left:a.children(".wPaint-menu-icon-img").realWidth("outer",!0,this.wPaint.$el),top:0}),a.addClass("wPaint-menu-icon-select").append('<div class="wPaint-menu-icon-group-arrow"></div>').append(f.append(k)),a.hasClass("wPaint-menu-icon-group")?a.on("mousedown",b).on("mouseup",c):a.on("click",d),f},_createSelectOption:function(a,b){var c=a.children(".wPaint-menu-select"),d=e('<div class="wPaint-menu-select-option"></div>').append(b);return c.children().length||d.addClass("first"),c.append(d),d},
_setSelectValue:function(a,b){this._getIcon(a).children(".wPaint-menu-icon-img").html(b)},_createIconColorPicker:function(a){var b=this,c=this._createIconBase(a);return c.on("click",function(){"dropper"===b.wPaint.options.mode&&b.wPaint.setMode(b.wPaint.previousMode)}).addClass("wPaint-menu-colorpicker").wColorPicker({mode:"click",generateButton:!1,dropperButton:!0,onSelect:function(c){a.callback.apply(b.wPaint,[c])},onDropper:function(){c.trigger("click");b.wPaint.dropper=a.name;b.wPaint.setMode("dropper")}}),
c},_setColorPickerValue:function(a,b){this._getIcon(a).children(".wPaint-menu-icon-img").css("backgroundColor",b)},_createIconMenu:function(a){var b=this,c=this._createIconActivate(a);return c.on("click",function(){b.wPaint.setCursor(a.name);var c=b.wPaint.menus.all[a.name];c.$menu.toggle();c._setDrag()}),c},_setDrag:function(){var a=null,b=null;this.$menu.is(":visible")&&(this.docked&&(a=b=e.proxy(this._setPosition,this),this._setPosition()),this.wPaint.menus.primary.$menu.draggable("option","drag",
a),this.wPaint.menus.primary.$menu.draggable("option","stop",b))},_setPosition:function(){var a=this.wPaint.menus.primary.$menu.position();this.$menu.css({left:a.left+this.dockOffset.left,top:a.top+this.dockOffset.top})},_setIndex:function(){var a=this.wPaint.menus.primary.$menu.offset(),b=this.$menu.offset();b.top<a.top||b.left<a.left?this.$menu.addClass("wPaint-menu-behind"):this.$menu.removeClass("wPaint-menu-behind")}};e.support.canvas=document.createElement("canvas").getContext;e.fn.wPaint=function(a,
b){function c(c,f){var g=e(f).data("wPaint"),h=null;g&&(h=(b?"set":"get")+a.charAt(0).toUpperCase()+a.substring(1).toLowerCase(),g[a]?g[a].apply(g,[b]):b?(g[h]&&g[h].apply(g,[b]),g.options[a]&&(g.options[a]=b)):g[h]?d.push(g[h].apply(g,[b])):g.options[a]?d.push(g.options[a]):d.push(null))}if("string"==typeof a){var d=[],f=null;return f=this.each(c),1===d.length?d[0]:0<d.length?d:f}return a=e.extend({},e.fn.wPaint.defaults,a),this.each(function(b,c){var d;e.support.canvas?(d=e.data(c,"wPaint"),d||
(d=e.extend(!0,{},a),d.lineWidth=parseInt(d.lineWidth,10),d.fontSize=parseInt(d.fontSize,10),d=new h(c,d),e.data(c,"wPaint",d)),d=void 0):d=(e(c).html("Browser does not support HTML5 canvas, please upgrade to a more modern browser."),!1);return d})};e.fn.wPaint.extend=function(a,b){function c(c){if(b[c]){var d=h.prototype[c],e=a[c];b[c]=function(){d.apply(this,arguments);e.apply(this,arguments)}}else b[c]=a[c]}var d;b="menu"===b?l.prototype:h.prototype;for(d in a)c(d)};e.fn.wPaint.menus={};e.fn.wPaint.cursors=
{};e.fn.wPaint.defaults={path:"/",theme:"standard classic",autoScaleImage:!0,autoCenterImage:!0,menuHandle:!0,menuOrientation:"horizontal",menuOffsetLeft:5,menuOffsetTop:5,bg:null,image:null,onShapeDown:null,onShapeMove:null,onShapeUp:null}}(jQuery);(function(){String.prototype.capitalize||(String.prototype.capitalize=function(){return this.slice(0,1).toUpperCase()+this.slice(1)})})();
(function(e){e.fn.realWidth=function(h,l,a){var b=null,c=null,d=null;return h="inner"===h||"outer"===h?h:"",d=""===h?"width":h+"Width",l=!0===l?!0:!1,c=e(this).clone().css({position:"absolute",left:-1E4}).appendTo(a||"body"),b=l?c[d](l):c[d](),c.remove(),b};e.fn.realHeight=function(h,l,a){var b=null,c=null,d=null;return h="inner"===h||"outer"===h?h:"",d=""===h?"height":h+"Height",l=!0===l?!0:!1,c=e(this).clone().css({position:"absolute",left:-1E4}).appendTo(a||"body"),b=l?c[d](l):c[d](),c.remove(),
b};e.fn.bindMobileEvents=function(){e(this).on("touchstart touchmove touchend touchcancel",function(){var e=event.changedTouches[0],l="";switch(event.type){case "touchstart":l="mousedown";break;case "touchmove":l="mousemove";event.preventDefault();break;case "touchend":l="mouseup";break;default:return}var a=document.createEvent("MouseEvent");a.initMouseEvent(l,!0,!0,window,1,e.screenX,e.screenY,e.clientX,e.clientY,!1,!1,!1,!1,0,null);e.target.dispatchEvent(a)})}})(jQuery);


/*wPaint.menu.main.min.js*/
!function(a){a.fn.wPaint.menus.main={img:"plugins/main/img/icons-menu-main.png",items:{undo:{icon:"generic",title:"Undo",index:0,callback:function(){this.undo()}},redo:{icon:"generic",title:"Redo",index:1,callback:function(){this.redo()}},clear:{icon:"generic",title:"Clear",index:2,callback:function(){this.clear()}},rectangle:{icon:"activate",title:"Rectangle",index:3,callback:function(){this.setMode("rectangle")}},ellipse:{icon:"activate",title:"Ellipse",index:4,callback:function(){this.setMode("ellipse")}},line:{icon:"activate",title:"Line",index:5,callback:function(){this.setMode("line")}},pencil:{icon:"activate",title:"Pencil",index:6,callback:function(){this.setMode("pencil")}},eraser:{icon:"activate",title:"Eraser",index:8,callback:function(){this.setMode("eraser")}},bucket:{icon:"activate",title:"Bucket",index:9,callback:function(){this.setMode("bucket")}},fillStyle:{title:"Fill Color",icon:"colorPicker",callback:function(a){this.setFillStyle(a)}},lineWidth:{icon:"select",title:"Stroke Width",range:[1,2,3,4,5,6,7,8,9,10,12,14,16,18,20,25,30,35,40,45,50,60,70,80,90],value:2,callback:function(a){this.setLineWidth(a)}},strokeStyle:{icon:"colorPicker",title:"Stroke Color",callback:function(a){this.setStrokeStyle(a)}}}},a.extend(a.fn.wPaint.cursors,{"default":{path:"plugins/main/img/cursor-crosshair.png",left:7,top:7},dropper:{path:"plugins/main/img/cursor-dropper.png",left:0,top:12},pencil:{path:"plugins/main/img/cursor-pencil.png",left:0,top:11.99},bucket:{path:"plugins/main/img/cursor-bucket.png",left:0,top:10},eraser1:{path:"plugins/main/img/cursor-eraser1.png",left:1,top:1},eraser2:{path:"plugins/main/img/cursor-eraser2.png",left:2,top:2},eraser3:{path:"plugins/main/img/cursor-eraser3.png",left:2,top:2},eraser4:{path:"plugins/main/img/cursor-eraser4.png",left:3,top:3},eraser5:{path:"plugins/main/img/cursor-eraser5.png",left:3,top:3},eraser6:{path:"plugins/main/img/cursor-eraser6.png",left:4,top:4},eraser7:{path:"plugins/main/img/cursor-eraser7.png",left:4,top:4},eraser8:{path:"plugins/main/img/cursor-eraser8.png",left:5,top:5},eraser9:{path:"plugins/main/img/cursor-eraser9.png",left:5,top:5},eraser10:{path:"plugins/main/img/cursor-eraser10.png",left:6,top:6}}),a.extend(a.fn.wPaint.defaults,{mode:"pencil",lineWidth:"3",fillStyle:"#FFFFFF",strokeStyle:"#FFFF00"}),a.fn.wPaint.extend({undoCurrent:-1,undoArray:[],setUndoFlag:!0,generate:function(){this.menus.all.main=this._createMenu("main",{offsetLeft:this.options.menuOffsetLeft,offsetTop:this.options.menuOffsetTop})},_init:function(){this._addUndo(),this.menus.all.main._setIconDisabled("clear",!0)},setStrokeStyle:function(a){this.options.strokeStyle=a,this.menus.all.main._setColorPickerValue("strokeStyle",a)},setLineWidth:function(a){this.options.lineWidth=a,this.menus.all.main._setSelectValue("lineWidth",a),this.setCursor(this.options.mode)},setFillStyle:function(a){this.options.fillStyle=a,this.menus.all.main._setColorPickerValue("fillStyle",a)},setCursor:function(a){"eraser"===a&&this.setCursor("eraser"+this.options.lineWidth)},undo:function(){this.undoArray[this.undoCurrent-1]&&this._setUndo(--this.undoCurrent),this._undoToggleIcons()},redo:function(){this.undoArray[this.undoCurrent+1]&&this._setUndo(++this.undoCurrent),this._undoToggleIcons()},_addUndo:function(){for(this.undoCurrent<this.undoArray.length-1?this.undoArray[++this.undoCurrent]=this.getImage(!1):(this.undoArray.push(this.getImage(!1)),this.undoArray.length>this.undoMax?this.undoArray=this.undoArray.slice(1,this.undoArray.length):this.undoCurrent++);this.undoCurrent!==this.undoArray.length-1;)this.undoArray.pop();this._undoToggleIcons(),this.menus.all.main._setIconDisabled("clear",!1)},_undoToggleIcons:function(){var a=this.undoCurrent>0&&this.undoArray.length>1?0:1,b=this.undoCurrent<this.undoArray.length-1?2:3;this.menus.all.main._setIconDisabled("undo",1===a?!0:!1),this.menus.all.main._setIconDisabled("redo",3===b?!0:!1)},_setUndo:function(a){this.setUndoFlag=!1,this.setImage(this.undoArray[a])},_imageOnload:function(){this.setUndoFlag&&this._addUndo(),this.setUndoFlag=!0},clear:function(){this.menus.all.main._isIconDisabled("clear")||(this.ctx.clearRect(0,0,this.width,this.height),this._addUndo(),this.menus.all.main._setIconDisabled("clear",!0))},_drawRectangleDown:function(a){this._drawShapeDown(a)},_drawRectangleMove:function(a){this._drawShapeMove(a),this.ctxTemp.rect(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRectangleUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawEllipseDown:function(a){this._drawShapeDown(a)},_drawEllipseMove:function(a){this._drawShapeMove(a),this.ctxTemp.ellipse(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawEllipseUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawLineDown:function(a){this._drawShapeDown(a)},_drawLineMove:function(a){this._drawShapeMove(a,1);var b=this.canvasTempLeftOriginal,c=this.canvasTempTopOriginal;a.pageX<b&&(a.x=a.x+a.w,a.w=-1*a.w),a.pageY<c&&(a.y=a.y+a.h,a.h=-1*a.h),this.ctxTemp.lineJoin="round",this.ctxTemp.beginPath(),this.ctxTemp.moveTo(a.x,a.y),this.ctxTemp.lineTo(a.x+a.w,a.y+a.h),this.ctxTemp.closePath(),this.ctxTemp.stroke()},_drawLineUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawPencilDown:function(a){this.ctx.lineJoin="round",this.ctx.lineCap="round",this.ctx.strokeStyle=this.options.strokeStyle,this.ctx.fillStyle=this.options.strokeStyle,this.ctx.lineWidth=this.options.lineWidth,this.ctx.beginPath(),this.ctx.arc(a.pageX,a.pageY,this.options.lineWidth/2,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill(),this.ctx.beginPath(),this.ctx.moveTo(a.pageX,a.pageY)},_drawPencilMove:function(a){this.ctx.lineTo(a.pageX,a.pageY),this.ctx.stroke()},_drawPencilUp:function(){this.ctx.closePath(),this._addUndo()},_drawEraserDown:function(a){this.ctx.save(),this.ctx.globalCompositeOperation="destination-out",this._drawPencilDown(a)},_drawEraserMove:function(a){this._drawPencilMove(a)},_drawEraserUp:function(a){this._drawPencilUp(a),this.ctx.restore()},_drawBucketDown:function(a){this.ctx.fillArea(a.pageX,a.pageY,this.options.fillStyle),this._addUndo()}})}(jQuery),!function(){window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.fillArea=function(a,b,c){function d(a){return{r:p[a],g:p[a+1],b:p[a+2],a:p[a+3]}}function e(a){p[a]=c.r,p[a+1]=c.g,p[a+2]=c.b,p[a+3]=c.a}function f(a){return g.r===a.r&&g.g===a.g&&g.b===a.b&&g.a===a.a}if(!a||!b||!c)return!0;var g,h,i,j,k,l,m=this.canvas.width,n=this.canvas.height,o=this.getImageData(0,0,m,n),p=o.data,q=[[a,b]];if(g=d(4*(b*m+a)),l=this.canvas.style.color,this.canvas.style.color=c,c=this.canvas.style.color.match(/^rgba?\((.*)\);?$/)[1].split(","),this.canvas.style.color=l,c={r:parseInt(c[0],10),g:parseInt(c[1],10),b:parseInt(c[2],10),a:parseInt(c[3]||255,10)},f(c))return!0;for(;q.length;){for(h=q.pop(),i=4*(h[1]*m+h[0]);h[1]-->=0&&f(d(i));)i-=4*m;for(i+=4*m,++h[1],j=!1,k=!1;h[1]++<n-1&&f(d(i));)e(i),h[0]>0&&(f(d(i-4))?j||(q.push([h[0]-1,h[1]]),j=!0):j&&(j=!1)),h[0]<m-1&&(f(d(i+4))?k||(q.push([h[0]+1,h[1]]),k=!0):k&&(k=!1)),i+=4*m}this.putImageData(o,0,0)})}();

/*wPaint.menu.text.min.js*/
!function(a){a.fn.wPaint.menus.text={img:"plugins/text/img/icons-menu-text.png",items:{bold:{icon:"toggle",title:"Bold",index:0,callback:function(a){this.setFontBold(a)}},italic:{icon:"toggle",title:"Italic",index:1,callback:function(a){this.setFontItalic(a)}},fontSize:{title:"Font Size",icon:"select",range:[8,9,10,12,14,16,20,24,30,36,48,60,72,84,96,120,144],value:12,callback:function(a){this.setFontSize(a)}},fontFamily:{icon:"select",title:"Font Family",range:["Arial","Courier","Times","Verdana"],useRange:!0,value:"Arial",callback:function(a){this.setFontFamily(a)}}}},a.fn.wPaint.menus.main.items.text={icon:"menu",after:"pencil",title:"Text",index:7,callback:function(){this.setMode("text")}},a.extend(a.fn.wPaint.defaults,{fontSize:"12",fontFamily:"Arial",fontBold:!1,fontItalic:!1,fontUnderline:!1}),a.fn.wPaint.extend({generate:function(){this.$textCalc=a("<div></div>").hide(),this.$textInput=a('<textarea class="wPaint-text-input" spellcheck="false"></textarea>').on("mousedown",this._stopPropagation).css({position:"absolute"}).hide(),a("body").append(this.$textCalc),this.$el.append(this.$textInput),this.menus.all.text=this._createMenu("text")},_init:function(){function b(){c._drawTextIfNotEmpty(),c.$textInput.hide(),c.$canvasTemp.hide()}var c=this;for(var d in this.menus.all)this.menus.all[d].$menu.on("click",b).on("mousedown",this._stopPropagation);a(document).on("mousedown",b)},setFillStyle:function(a){this.$textInput.css("color",a)},setFontSize:function(a){this.options.fontSize=parseInt(a,10),this._setFont({fontSize:a+"px",lineHeight:a+"px"}),this.menus.all.text._setSelectValue("fontSize",a)},setFontFamily:function(a){this.options.fontFamily=a,this._setFont({fontFamily:a}),this.menus.all.text._setSelectValue("fontFamily",a)},setFontBold:function(a){this.options.fontBold=a,this._setFont({fontWeight:a?"bold":""})},setFontItalic:function(a){this.options.fontItalic=a,this._setFont({fontStyle:a?"italic":""})},setFontUnderline:function(a){this.options.fontUnderline=a,this._setFont({fontWeight:a?"underline":""})},_setFont:function(a){this.$textInput.css(a),this.$textCalc.css(a)},_drawTextDown:function(a){this._drawTextIfNotEmpty(),this._drawShapeDown(a,1),this.$textInput.css({left:a.pageX-1,top:a.pageY-1,width:0,height:0}).show().focus()},_drawTextMove:function(a){this._drawShapeMove(a,1),this.$textInput.css({left:a.left-1,top:a.top-1,width:a.width,height:a.height})},_drawTextIfNotEmpty:function(){""!==this.$textInput.val()&&this._drawText()},_drawText:function(){var a,b,c,d,e="",f=this.$textInput.val().split("\n"),g=[],h=this.$textInput.width()-2,i=0,j=0,k=this.$textInput.position(),l=k.left+1,m=k.top+1;for(this.options.fontItalic&&(e+="italic "),this.options.fontBold&&(e+="bold "),e+=this.options.fontSize+"px "+this.options.fontFamily,a=0,b=f.length;b>a;a++){for(this.$textCalc.html(""),j=0,c=0,d=f[0].length;d>c;c++)i=this.$textCalc.append(f[a][c]).width(),i>h&&(g.push(f[a].substring(j,c)),j=c,this.$textCalc.html(f[a][c]));j!==c&&g.push(f[a].substring(j,c))}for(f=this.$textInput.val(g.join("\n")).val().split("\n"),a=0,b=f.length;b>a;a++)this.ctx.fillStyle=this.options.fillStyle,this.ctx.textBaseline="top",this.ctx.font=e,this.ctx.fillText(f[a],l,m),m+=this.options.fontSize;this.$textInput.val(""),this._addUndo()}})}(jQuery);

/*wPaint.menu.main.shapes.min.js*/
!function(a){var b="plugins/shapes/img/icons-menu-main-shapes.png";a.extend(!0,a.fn.wPaint.menus.main.items,{rectangle:{group:"shapes"},roundedRect:{icon:"activate",group:"shapes",title:"Rounded Rectangle",img:b,index:0,callback:function(){this.setMode("roundedRect")}},square:{icon:"activate",group:"shapes",title:"Square",img:b,index:1,callback:function(){this.setMode("square")}},roundedSquare:{icon:"activate",group:"shapes",title:"Rounded Square",img:b,index:2,callback:function(){this.setMode("roundedSquare")}},diamond:{icon:"activate",group:"shapes",title:"Diamond",img:b,index:4,callback:function(){this.setMode("diamond")}},ellipse:{group:"shapes2"},circle:{icon:"activate",group:"shapes2",title:"Circle",img:b,index:3,callback:function(){this.setMode("circle")}},pentagon:{icon:"activate",group:"shapes2",title:"Pentagon",img:b,index:5,callback:function(){this.setMode("pentagon")}},hexagon:{icon:"activate",group:"shapes2",title:"Hexagon",img:b,index:6,callback:function(){this.setMode("hexagon")}}}),a.fn.wPaint.extend({_drawRoundedRectDown:function(a){this._drawShapeDown(a)},_drawRoundedRectMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h/a.w:a.w/a.h;this.ctxTemp.roundedRect(a.x,a.y,a.w,a.h,Math.ceil(b*.001*a.w*a.h)),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRoundedRectUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawSquareDown:function(a){this._drawShapeDown(a)},_drawSquareMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.rect(a.x,a.y,b,b),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawSquareUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawRoundedSquareDown:function(a){this._drawShapeDown(a)},_drawRoundedSquareMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.roundedRect(a.x,a.y,b,b,Math.ceil(.001*b*b)),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawRoundedSquareUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawDiamondDown:function(a){this._drawShapeDown(a)},_drawDiamondMove:function(a){this._drawShapeMove(a),this.ctxTemp.diamond(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawDiamondUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawCircleDown:function(a){this._drawShapeDown(a)},_drawCircleMove:function(a){this._drawShapeMove(a);var b=a.w>a.h?a.h:a.w;this.ctxTemp.ellipse(a.x,a.y,b,b),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawCircleUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawPentagonDown:function(a){this._drawShapeDown(a)},_drawPentagonMove:function(a){this._drawShapeMove(a),this.ctxTemp.pentagon(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawPentagonUp:function(a){this._drawShapeUp(a),this._addUndo()},_drawHexagonDown:function(a){this._drawShapeDown(a)},_drawHexagonMove:function(a){this._drawShapeMove(a),this.ctxTemp.hexagon(a.x,a.y,a.w,a.h),this.ctxTemp.stroke(),this.ctxTemp.fill()},_drawHexagonUp:function(a){this._drawShapeUp(a),this._addUndo()}})}(jQuery),!function(){window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.diamond=function(a,b,c,d){return a&&b&&c&&d?(this.beginPath(),this.moveTo(a+.5*c,b),this.lineTo(a,b+.5*d),this.lineTo(a+.5*c,b+d),this.lineTo(a+c,b+.5*d),this.lineTo(a+.5*c,b),this.closePath(),void 0):!0}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.ellipse=function(a,b,c,d){if(!(a&&b&&c&&d))return!0;var e=.5522848,f=c/2*e,g=d/2*e,h=a+c,i=b+d,j=a+c/2,k=b+d/2;this.beginPath(),this.moveTo(a,k),this.bezierCurveTo(a,k-g,j-f,b,j,b),this.bezierCurveTo(j+f,b,h,k-g,h,k),this.bezierCurveTo(h,k+g,j+f,i,j,i),this.bezierCurveTo(j-f,i,a,k+g,a,k),this.closePath()}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.hexagon=function(a,b,c,d){if(!(a&&b&&c&&d))return!0;var e=.225,f=1-e;this.beginPath(),this.moveTo(a+.5*c,b),this.lineTo(a,b+d*e),this.lineTo(a,b+d*f),this.lineTo(a+.5*c,b+d),this.lineTo(a+c,b+d*f),this.lineTo(a+c,b+d*e),this.lineTo(a+.5*c,b),this.closePath()}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.pentagon=function(a,b,c,d){return a&&b&&c&&d?(this.beginPath(),this.moveTo(a+c/2,b),this.lineTo(a,b+.4*d),this.lineTo(a+.2*c,b+d),this.lineTo(a+.8*c,b+d),this.lineTo(a+c,b+.4*d),this.lineTo(a+c/2,b),this.closePath(),void 0):!0}),window.CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.roundedRect=function(a,b,c,d,e){return a&&b&&c&&d?(e||(e=5),this.beginPath(),this.moveTo(a+e,b),this.lineTo(a+c-e,b),this.quadraticCurveTo(a+c,b,a+c,b+e),this.lineTo(a+c,b+d-e),this.quadraticCurveTo(a+c,b+d,a+c-e,b+d),this.lineTo(a+e,b+d),this.quadraticCurveTo(a,b+d,a,b+d-e),this.lineTo(a,b+e),this.quadraticCurveTo(a,b,a+e,b),this.closePath(),void 0):!0})}();

/*wPaint.menu.main.file.min.js*/
!function(a){var b="plugins/file/img/icons-menu-main-file.png";a.extend(!0,a.fn.wPaint.menus.main.items,{save:{icon:"generic",title:"Save Image",img:b,index:0,
	callback:function(){
	/*var self=this;
	function gimg(){
		try{
			return self.getImage();
		}catch(err){
			alert(err); //svg...
			throw err;
		}
	}*/
	this.options.saveImg.apply(this,[this.getImage()])	
	}},loadBg:{icon:"generic",group:"loadImg",title:"Load Image to Foreground",img:b,index:2,callback:function(){this.options.loadImgFg.apply(this,[])}},loadFg:{icon:"generic",group:"loadImg",title:"Load Image to Background",img:b,index:1,callback:function(){this.options.loadImgBg.apply(this,[])}}}),a.extend(a.fn.wPaint.defaults,{saveImg:null,loadImgFg:null,loadImgBg:null}),a.fn.wPaint.extend({_showFileModal:function(b,c){function d(a,b){function c(c){c.stopPropagation(),"fg"===a?e.setImage(b):"bg"===a&&e.setBg(b)}g.on("click",c)}for(var e=this,f=a("<div></div>"),g=null,h=0,i=c.length;i>h;h++)g=a('<img class="wPaint-modal-img"/>').attr("src",c[h]),g=a('<div class="wPaint-modal-img-holder"></div>').append(g),d(b,c[h]),f.append(g);this._showModal(f)}})}(jQuery);


function proc_savesetting(){
	$('#wPaint').wPaint('getoption',function(a,undoCurrent){	
		if(undoCurrent>0) g_changed=true;
		if(window.JSON){
			setstorage("c_paint_settings",JSON.stringify(a));
		}
	});
}
function proc_loadsetting(){
	if(!window.JSON) return;
	var s=getstorage("c_paint_settings");
	var a={};
	try{
		a=JSON.parse(s);
	}catch(err){
		a={};
	}
	if(!a) a={};
	if(!a.mode) a.mode="pencil";
	if(!a.lineWidth) a.lineWidth="3";
	if(!a.fillStyle) a.fillStyle="#008000";
	if(!a.strokeStyle) a.strokeStyle="#000000";
	if(!a.fontSize) a.fontSize="12";
	if(!a.fontFamily) a.fontFamily="Arial";

	$.extend($.fn.wPaint.defaults, {
		mode: a.mode,
		lineWidth: a.lineWidth,
		fillStyle: a.fillStyle, 
		strokeStyle: a.strokeStyle,
		fontSize: a.fontSize,   
		fontFamily: a.fontFamily
	});
}


/*function proc_clipboard(){
	alert('This feature only supports Chrome browser.\n\nLoad a image from clipboard. Press the Ctrl+V, Shift+Ins, AppleKey+V after copying the image.');
}*/
function init_clipboard(){
	if(!window.addEventListener)return;
//chrome
function pasteHandler(e){
	if(e.clipboardData) {
		var items = e.clipboardData.items;
		if (items){
			for (var i = 0; i < items.length; i++) {
				if (items[i].type.indexOf("image") !== -1) {
					if(!g_imageobj) g_imageobj=g_paint_obj;
					if(!g_imageobj){
						alert('Not yet selected "Foreground or Background". Click the "Load Image" button on the toolbar.');
						return;
					}		
					var blob = items[i].getAsFile();
					var reader = new FileReader();
				    reader.onload = function(e) {
						paste_createImage(e.target.result);
				    }
					reader.readAsDataURL(blob);
					return;
				}
			}
		}
	}
}
function paste_createImage(source){
	if(source.length>cp_maxsize*1024*1024){
		alert('The image size is too large to load.');
		return;
	}
	proc_imageset(g_imageobj,g_imagetype,source,function(result){
		if(!result) show_message("Image error!!");
	});
	proc_closeimage();
}
	var isChromium = window.chrome,
    isOpera = window.navigator.userAgent.indexOf("OPR") > -1,
    isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
	if(isChromium !== null && isChromium !== undefined && isOpera == false && isIEedge == false){
		window.addEventListener("paste", pasteHandler);
	}else{
		$('#demopaste').pastableTextarea();
	    $('#demopaste').on('pasteImage', function(ev, data){	 
			paste_createImage(data.dataURL);
			_getid('demopaste').value='';
		}).on('pasteText', function(ev, data){
			_getid('demopaste').value='';
		});
	}
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}


// WebcamJS v1.0.6
// Webcam library for capturing JPEG/PNG images in JavaScript
// Attempts getUserMedia, falls back to Flash
// Author: Joseph Huckaby: http://github.com/jhuckaby
// Based on JPEGCam: http://code.google.com/p/jpegcam/
// Copyright (c) 2012 - 2015 Joseph Huckaby
// Licensed under the MIT License

(function(window) {

var Webcam = {
	version: '1.0.6',
	
	// globals
	protocol: location.protocol.match(/https/i) ? 'https' : 'http',
	swfURL: '',      // URI to webcam.swf movie (defaults to the js location)
	loaded: false,   // true when webcam movie finishes loading
	live: false,     // true when webcam is initialized and ready to snap
	userMedia: true, // true when getUserMedia is supported natively
	
	params: {
		width: 0,
		height: 0,
		dest_width: 0,         // size of captured image
		dest_height: 0,        // these default to width/height
		image_format: 'jpeg',  // image format (may be jpeg or png)
		jpeg_quality: 90,      // jpeg image quality from 0 (worst) to 100 (best)
		force_flash: false,    // force flash mode,
		flip_horiz: false,     // flip image horiz (mirror mode)
		fps: 30,               // camera frames per second
		upload_name: 'webcam', // name of file in upload post data
		constraints: null      // custom user media constraints
	},
	
	hooks: {}, // callback hook functions
	
	init: function() {
		// initialize, check for getUserMedia support
		var self = this;
		
		// Setup getUserMedia, with polyfill for older browsers
		// Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
		this.mediaDevices = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ? 
			navigator.mediaDevices : ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
				getUserMedia: function(c) {
					return new Promise(function(y, n) {
						(navigator.mozGetUserMedia ||
						navigator.webkitGetUserMedia).call(navigator, c, y, n);
					});
				}
		} : null);
		
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		this.userMedia = this.userMedia && !!this.mediaDevices && !!window.URL;
		
		// Older versions of firefox (< 21) apparently claim support but user media does not actually work
		if (navigator.userAgent.match(/Firefox\D+(\d+)/)) {
			if (parseInt(RegExp.$1, 10) < 21) this.userMedia = null;
		}
		
		// Make sure media stream is closed when navigating away from page
		if (this.userMedia) {
			window.addEventListener( 'beforeunload', function(event) {
				self.reset();
			} );
		}
	},
	
	attach: function(elem) {
		// create webcam preview and attach to DOM element
		// pass in actual DOM reference, ID, or CSS selector
		if (typeof(elem) == 'string') {
			elem = document.getElementById(elem) || document.querySelector(elem);
		}
		if (!elem) {
			return this.dispatch('error', "Could not locate DOM element to attach to.");
		}
		this.container = elem;
		elem.innerHTML = ''; // start with empty element
		
		// insert "peg" so we can insert our preview canvas adjacent to it later on
		var peg = document.createElement('div');
		elem.appendChild( peg );
		this.peg = peg;
		
		// set width/height if not already set
		if (!this.params.width) this.params.width = elem.offsetWidth;
		if (!this.params.height) this.params.height = elem.offsetHeight;
		
		// set defaults for dest_width / dest_height if not set
		if (!this.params.dest_width) this.params.dest_width = this.params.width;
		if (!this.params.dest_height) this.params.dest_height = this.params.height;
		
		// if force_flash is set, disable userMedia
		if (this.params.force_flash) this.userMedia = null;
		
		// check for default fps
		if (typeof this.params.fps !== "number") this.params.fps = 30;

		// adjust scale if dest_width or dest_height is different
		var scaleX = this.params.width / this.params.dest_width;
		var scaleY = this.params.height / this.params.dest_height;
		
		if (this.userMedia) {
			// setup webcam video container
			var video = document.createElement('video');
			video.setAttribute('autoplay', 'autoplay');
			video.style.width = '' + this.params.dest_width + 'px';
			video.style.height = '' + this.params.dest_height + 'px';
			
			if ((scaleX != 1.0) || (scaleY != 1.0)) {
				elem.style.overflow = 'hidden';
				video.style.webkitTransformOrigin = '0px 0px';
				video.style.mozTransformOrigin = '0px 0px';
				video.style.msTransformOrigin = '0px 0px';
				video.style.oTransformOrigin = '0px 0px';
				video.style.transformOrigin = '0px 0px';
				video.style.webkitTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.mozTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.msTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.oTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			}
			
			// add video element to dom
			elem.appendChild( video );
			this.video = video;
			
			// ask user for access to their camera
			var self = this;
			this.mediaDevices.getUserMedia({
				"audio": false,
				"video": this.params.constraints || {
					mandatory: {
						minWidth: this.params.dest_width,
						minHeight: this.params.dest_height
					}
				}
			})
			.then( function(stream) {
				// got access, attach stream to video
				video.src = window.URL.createObjectURL( stream ) || stream;
				self.stream = stream;
				self.loaded = true;
				self.live = true;
				self.dispatch('load');
				self.dispatch('live');
				self.flip();
			})
			.catch( function(err) {
				return self.dispatch('error', "Could not access webcam: " + err.name + ": " + err.message, err);
			});
		}
		else {
			// flash fallback
			window.Webcam = Webcam; // needed for flash-to-js interface
			var div = document.createElement('div');
			div.innerHTML = this.getSWFHTML();
			elem.appendChild( div );
		}
		
		// setup final crop for live preview
		if (this.params.crop_width && this.params.crop_height) {
			var scaled_crop_width = Math.floor( this.params.crop_width * scaleX );
			var scaled_crop_height = Math.floor( this.params.crop_height * scaleY );
			
			elem.style.width = '' + scaled_crop_width + 'px';
			elem.style.height = '' + scaled_crop_height + 'px';
			elem.style.overflow = 'hidden';
			
			elem.scrollLeft = Math.floor( (this.params.width / 2) - (scaled_crop_width / 2) );
			elem.scrollTop = Math.floor( (this.params.height / 2) - (scaled_crop_height / 2) );
		}
		else {
			// no crop, set size to desired
			elem.style.width = '' + this.params.width + 'px';
			elem.style.height = '' + this.params.height + 'px';
		}
	},
	
	reset: function() {
		// shutdown camera, reset to potentially attach again
		if (this.preview_active) this.unfreeze();
		
		// attempt to fix issue #64
		this.unflip();
		
		if (this.userMedia) {
			if (this.stream) {
				if (this.stream.getVideoTracks) {
					// get video track to call stop on it
					var tracks = this.stream.getVideoTracks();
					if (tracks && tracks[0] && tracks[0].stop) tracks[0].stop();
				}
				else if (this.stream.stop) {
					// deprecated, may be removed in future
					this.stream.stop();
				}
			}
			delete this.stream;
			delete this.video;
		}
		
		if (this.container) {
			this.container.innerHTML = '';
			delete this.container;
		}
	
		this.loaded = false;
		this.live = false;
	},
	
	set: function() {
		// set one or more params
		// variable argument list: 1 param = hash, 2 params = key, value
		if (arguments.length == 1) {
			for (var key in arguments[0]) {
				this.params[key] = arguments[0][key];
			}
		}
		else {
			this.params[ arguments[0] ] = arguments[1];
		}
	},
	
	on: function(name, callback) {
		// set callback hook
		name = name.replace(/^on/i, '').toLowerCase();
		if (!this.hooks[name]) this.hooks[name] = [];
		this.hooks[name].push( callback );
	},
	
	off: function(name, callback) {
		// remove callback hook
		name = name.replace(/^on/i, '').toLowerCase();
		if (this.hooks[name]) {
			if (callback) {
				// remove one selected callback from list
				var idx = this.hooks[name].indexOf(callback);
				if (idx > -1) this.hooks[name].splice(idx, 1);
			}
			else {
				// no callback specified, so clear all
				this.hooks[name] = [];
			}
		}
	},
	
	dispatch: function() {
		// fire hook callback, passing optional value to it
		var name = arguments[0].replace(/^on/i, '').toLowerCase();
		var args = Array.prototype.slice.call(arguments, 1);
		
		if (this.hooks[name] && this.hooks[name].length) {
			for (var idx = 0, len = this.hooks[name].length; idx < len; idx++) {
				var hook = this.hooks[name][idx];
				
				if (typeof(hook) == 'function') {
					// callback is function reference, call directly
					hook.apply(this, args);
				}
				else if ((typeof(hook) == 'object') && (hook.length == 2)) {
					// callback is PHP-style object instance method
					hook[0][hook[1]].apply(hook[0], args);
				}
				else if (window[hook]) {
					// callback is global function name
					window[ hook ].apply(window, args);
				}
			} // loop
			return true;
		}
		else if (name == 'error') {
			// default error handler if no custom one specified
			alert("Error: " + args[0]);
		}
		
		return false; // no hook defined
	},
	
	setSWFLocation: function(url) {
		// set location of SWF movie (defaults to webcam.swf in cwd)
		this.swfURL = url;
	},
	
	detectFlash: function() {
		// return true if browser supports flash, false otherwise
		// Code snippet borrowed from: https://github.com/swfobject/swfobject
		var SHOCKWAVE_FLASH = "Shockwave Flash",
			SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        	FLASH_MIME_TYPE = "application/x-shockwave-flash",
        	win = window,
        	nav = navigator,
        	hasFlash = false;
        
        if (typeof nav.plugins !== "undefined" && typeof nav.plugins[SHOCKWAVE_FLASH] === "object") {
        	var desc = nav.plugins[SHOCKWAVE_FLASH].description;
        	if (desc && (typeof nav.mimeTypes !== "undefined" && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
        		hasFlash = true;
        	}
        }
        else if (typeof win.ActiveXObject !== "undefined") {
        	try {
        		var ax = new ActiveXObject(SHOCKWAVE_FLASH_AX);
        		if (ax) {
        			var ver = ax.GetVariable("$version");
        			if (ver) hasFlash = true;
        		}
        	}
        	catch (e) {;}
        }
        
        return hasFlash;
	},
	
	getSWFHTML: function() {
		// Return HTML for embedding flash based webcam capture movie		
		var html = '';
		
		// make sure we aren't running locally (flash doesn't work)
		if (location.protocol.match(/file/)) {
			this.dispatch('error', "Flash does not work from local disk.  Please run from a web server.");
			return '<font style="color:#aa2222;font-size:15px">ERROR: The Flash fallback does not work from local disk.  Please run it from a web server.</font>';
		}
		
		// make sure we have flash
		/*if (!this.detectFlash()) {
			this.dispatch('error', "Adobe Flash Player not found.  Please install from get.adobe.com/flashplayer and try again.");
			return '<font style="color:#aa2222;font-size:15px">ERROR: No Adobe Flash Player detected.</font>'; //Webcam.js relies on Flash for browsers that do not support getUserMedia (like yours).
		}*/
		
		// set default swfURL if not explicitly set
		if (!this.swfURL) {
			// find our script tag, and use that base URL
			var base_url = '';
			var scpts = document.getElementsByTagName('script');
			for (var idx = 0, len = scpts.length; idx < len; idx++) {
				var src = scpts[idx].getAttribute('src');
				if (src && src.match(/\/webcam(\.min)?\.js/)) {
					base_url = src.replace(/\/webcam(\.min)?\.js.*$/, '');
					idx = len;
				}
			}
			if (base_url) this.swfURL = base_url + '/webcam.swf';
			else this.swfURL = 'webcam.swf';
		}
		
		// if this is the user's first visit, set flashvar so flash privacy settings panel is shown first
		if (window.localStorage && !localStorage.getItem('visited')) {
			this.params.new_user = 1;
			localStorage.setItem('visited', 1);
		}
		
		// construct flashvars string
		var flashvars = '';
		for (var key in this.params) {
			if (flashvars) flashvars += '&';
			flashvars += key + '=' + escape(this.params[key]);
		}
		
		// construct object/embed tag
		html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="'+this.protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+this.params.width+'" height="'+this.params.height+'" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+this.swfURL+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><embed id="webcam_movie_embed" src="'+this.swfURL+'" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+this.params.width+'" height="'+this.params.height+'" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'"></embed></object>';
		
		return html;
	},
	
	getMovie: function() {
		// get reference to movie object/embed in DOM
		if (!this.loaded) return this.dispatch('error', "Flash Movie is not loaded yet");
		var movie = document.getElementById('webcam_movie_obj');
		if (!movie || !movie._snap) movie = document.getElementById('webcam_movie_embed');
		if (!movie) this.dispatch('error', "Cannot locate Flash movie in DOM");
		return movie;
	},
	
	freeze: function() {
		// show preview, freeze camera
		var self = this;
		var params = this.params;
		
		// kill preview if already active
		if (this.preview_active) this.unfreeze();
		
		// determine scale factor
		var scaleX = this.params.width / this.params.dest_width;
		var scaleY = this.params.height / this.params.dest_height;
		
		// must unflip container as preview canvas will be pre-flipped
		this.unflip();
		
		// calc final size of image
		var final_width = params.crop_width || params.dest_width;
		var final_height = params.crop_height || params.dest_height;
		
		// create canvas for holding preview
		var preview_canvas = document.createElement('canvas');
		preview_canvas.width = final_width;
		preview_canvas.height = final_height;
		var preview_context = preview_canvas.getContext('2d');
		
		// save for later use
		this.preview_canvas = preview_canvas;
		this.preview_context = preview_context;
		
		// scale for preview size
		if ((scaleX != 1.0) || (scaleY != 1.0)) {
			preview_canvas.style.webkitTransformOrigin = '0px 0px';
			preview_canvas.style.mozTransformOrigin = '0px 0px';
			preview_canvas.style.msTransformOrigin = '0px 0px';
			preview_canvas.style.oTransformOrigin = '0px 0px';
			preview_canvas.style.transformOrigin = '0px 0px';
			preview_canvas.style.webkitTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.mozTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.msTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.oTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
		}
		
		// take snapshot, but fire our own callback
		this.snap( function() {
			// add preview image to dom, adjust for crop
			preview_canvas.style.position = 'relative';
			preview_canvas.style.left = '' + self.container.scrollLeft + 'px';
			preview_canvas.style.top = '' + self.container.scrollTop + 'px';
			
			self.container.insertBefore( preview_canvas, self.peg );
			self.container.style.overflow = 'hidden';
			
			// set flag for user capture (use preview)
			self.preview_active = true;
			
		}, preview_canvas );
	},
	
	unfreeze: function() {
		// cancel preview and resume live video feed
		if (this.preview_active) {
			// remove preview canvas
			this.container.removeChild( this.preview_canvas );
			delete this.preview_context;
			delete this.preview_canvas;
			
			// unflag
			this.preview_active = false;
			
			// re-flip if we unflipped before
			this.flip();
		}
	},
	
	flip: function() {
		// flip container horiz (mirror mode) if desired
		if (this.params.flip_horiz) {
			var sty = this.container.style;
			sty.webkitTransform = 'scaleX(-1)';
			sty.mozTransform = 'scaleX(-1)';
			sty.msTransform = 'scaleX(-1)';
			sty.oTransform = 'scaleX(-1)';
			sty.transform = 'scaleX(-1)';
			sty.filter = 'FlipH';
			sty.msFilter = 'FlipH';
		}
	},
	
	unflip: function() {
		// unflip container horiz (mirror mode) if desired
		if (this.params.flip_horiz) {
			var sty = this.container.style;
			sty.webkitTransform = 'scaleX(1)';
			sty.mozTransform = 'scaleX(1)';
			sty.msTransform = 'scaleX(1)';
			sty.oTransform = 'scaleX(1)';
			sty.transform = 'scaleX(1)';
			sty.filter = '';
			sty.msFilter = '';
		}
	},
	
	savePreview: function(user_callback, user_canvas) {
		// save preview freeze and fire user callback
		var params = this.params;
		var canvas = this.preview_canvas;
		var context = this.preview_context;
		
		// render to user canvas if desired
		if (user_canvas) {
			var user_context = user_canvas.getContext('2d');
			user_context.drawImage( canvas, 0, 0 );
		}
		
		// fire user callback if desired
		user_callback(
			user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100 ),
			canvas,
			context
		);
		
		// remove preview
		this.unfreeze();
	},
	
	snap: function(user_callback, user_canvas) {
		// take snapshot and return image data uri
		var self = this;
		var params = this.params;
		
		if (!this.loaded) return this.dispatch('error', "Webcam is not loaded yet");
		// if (!this.live) return this.dispatch('error', "Webcam is not live yet");
		if (!user_callback) return this.dispatch('error', "Please provide a callback function or canvas to snap()");
		
		// if we have an active preview freeze, use that
		if (this.preview_active) {
			this.savePreview( user_callback, user_canvas );
			return null;
		}
		
		// create offscreen canvas element to hold pixels
		var canvas = document.createElement('canvas');
		canvas.width = this.params.dest_width;
		canvas.height = this.params.dest_height;
		var context = canvas.getContext('2d');
		
		// flip canvas horizontally if desired
		if (this.params.flip_horiz) {
			context.translate( params.dest_width, 0 );
			context.scale( -1, 1 );
		}
		
		// create inline function, called after image load (flash) or immediately (native)
		var func = function() {
			// render image if needed (flash)
			if (this.src && this.width && this.height) {
				context.drawImage(this, 0, 0, params.dest_width, params.dest_height);
			}
			
			// crop if desired
			if (params.crop_width && params.crop_height) {
				var crop_canvas = document.createElement('canvas');
				crop_canvas.width = params.crop_width;
				crop_canvas.height = params.crop_height;
				var crop_context = crop_canvas.getContext('2d');
				
				crop_context.drawImage( canvas, 
					Math.floor( (params.dest_width / 2) - (params.crop_width / 2) ),
					Math.floor( (params.dest_height / 2) - (params.crop_height / 2) ),
					params.crop_width,
					params.crop_height,
					0,
					0,
					params.crop_width,
					params.crop_height
				);
				
				// swap canvases
				context = crop_context;
				canvas = crop_canvas;
			}
			
			// render to user canvas if desired
			if (user_canvas) {
				var user_context = user_canvas.getContext('2d');
				user_context.drawImage( canvas, 0, 0 );
			}
			
			// fire user callback if desired
			user_callback(
				user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100 ),
				canvas,
				context
			);
		};
		
		// grab image frame from userMedia or flash movie
		if (this.userMedia) {
			// native implementation
			context.drawImage(this.video, 0, 0, this.params.dest_width, this.params.dest_height);
			
			// fire callback right away
			func();
		}
		else {
			// flash fallback
			var raw_data = this.getMovie()._snap();
			
			// render to image, fire callback when complete
			var img = new Image();
			img.onload = func;
			img.src = 'data:image/'+this.params.image_format+';base64,' + raw_data;
		}
		
		return null;
	},
	
	configure: function(panel) {
		// open flash configuration panel -- specify tab name:
		// "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
		if (!panel) panel = "camera";
		this.getMovie()._configure(panel);
	},
	
	flashNotify: function(type, msg) {
		// receive notification from flash about event
		switch (type) {
			case 'flashLoadComplete':
				// movie loaded successfully
				this.loaded = true;
				this.dispatch('load');
				break;
			
			case 'cameraLive':
				// camera is live and ready to snap
				this.live = true;
				this.dispatch('live');
				this.flip();
				break;

			case 'error':
				// Flash error
				this.dispatch('error', msg);
				break;

			default:
				// catch-all event, just in case
				// console.log("webcam flash_notify: " + type + ": " + msg);
				break;
		}
	},
	
	b64ToUint6: function(nChr) {
		// convert base64 encoded character to 6-bit integer
		// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
		return nChr > 64 && nChr < 91 ? nChr - 65
			: nChr > 96 && nChr < 123 ? nChr - 71
			: nChr > 47 && nChr < 58 ? nChr + 4
			: nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
	},

	base64DecToArr: function(sBase64, nBlocksSize) {
		// convert base64 encoded string to Uintarray
		// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
		var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
			nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, 
			taBytes = new Uint8Array(nOutLen);
		
		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= this.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;
			}
		}
		return taBytes;
	},
	
	upload: function(image_data_uri, target_url, callback) {
		// submit image data to server using binary AJAX
		var form_elem_name = this.params.upload_name || 'webcam';
		
		// detect image format from within image_data_uri
		var image_fmt = '';
		if (image_data_uri.match(/^data\:image\/(\w+)/))
			image_fmt = RegExp.$1;
		else
			throw "Cannot locate image format in Data URI";
		
		// extract raw base64 data from Data URI
		var raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
		
		// contruct use AJAX object
		var http = new XMLHttpRequest();
		http.open("POST", target_url, true);
		
		// setup progress events
		if (http.upload && http.upload.addEventListener) {
			http.upload.addEventListener( 'progress', function(e) {
				if (e.lengthComputable) {
					var progress = e.loaded / e.total;
					Webcam.dispatch('uploadProgress', progress, e);
				}
			}, false );
		}
		
		// completion handler
		var self = this;
		http.onload = function() {
			if (callback) callback.apply( self, [http.status, http.responseText, http.statusText] );
			Webcam.dispatch('uploadComplete', http.status, http.responseText, http.statusText);
		};
		
		// create a blob and decode our base64 to binary
		var blob = new Blob( [ this.base64DecToArr(raw_image_data) ], {type: 'image/'+image_fmt} );
		
		// stuff into a form, so servers can easily receive it as a standard file upload
		var form = new FormData();
		form.append( form_elem_name, blob, form_elem_name+"."+image_fmt.replace(/e/, '') );
		
		// send data to server
		http.send(form);
	}
	
};

Webcam.init();

if (typeof define === 'function' && define.amd) {
	define( function() { return Webcam; } );
} 
else if (typeof module === 'object' && module.exports) {
	module.exports = Webcam;
} 
else {
	window.Webcam = Webcam;
}

}(window));
