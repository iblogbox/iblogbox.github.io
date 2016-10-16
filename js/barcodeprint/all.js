/*common.js*/
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
	if(!str || !str.replace) return '';
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
	if (s.length <= len) return s;			
	var s1,s2;	
	s1=s.substr(0,left);
	s2=s.substr(s.length-right,s.length);	
	return s1+'.....'+s2;
}

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

function number_format(number, decimals, dec_point, thousands_sep) {
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

function fillnumber(s){
	s=String(s);
	if ( s.length==1 ) { 
		return '0'+s;  
	}
	return s;
}	
function datetimetostring(ts,onlytime){
	var t=new Date(ts);
	var s='';
	if(!isNaN(t)){
		var y=t.getFullYear();
		var m=t.getMonth()+1;
		var d=t.getDate();
		if(onlytime) s=fillnumber(t.getHours())+':'+fillnumber(t.getMinutes())+':'+fillnumber(t.getSeconds());
		else s=y+'-'+fillnumber(m)+'-'+fillnumber(d)+' '+fillnumber(t.getHours())+':'+fillnumber(t.getMinutes())+':'+fillnumber(t.getSeconds());
	}
	return s;
}

var g_logcount=0;
function _log(name,s,state,noenc){
function proc_log(s){
	var obj=_getid(name);
	/*if(obj.style.display!='') obj.style.display='';
	if(g_logcount>200){
		g_logcount=0;
		obj.innerHTML='';
	}*/
	var a=document.createElement("div");
	a.setAttribute('style','display:block;');
	if(!state) state='';
	var s1=s; if(!noenc) s1=henc(s1);
	s='<font class="'+state+'">'+s1+'</font>';	
	a.innerHTML=s;
	obj.appendChild(a);  
	obj.scrollTop=obj.scrollHeight;
	g_logcount++;
}
	if(name=='log4' || name=='log5'){
		proc_log(s);
		return;
	}
	var a=_getid(name);
	var s1=a.value;
	if(s1) s1+='\n';
	a.value=s1+s;
	a.scrollTop=a.scrollHeight;
}

var iserror;
function proc_log(name,s,state,s2){
	if(name=='log1')name='log4';
	function go(name){
		var obj=_getid(name);
		if(!obj){
			alert(name);
			return;
		}
		var a=document.createElement("div");
		a.setAttribute('style','display:block;');
		if(!state) state='';
		var s3='<font class="'+state+'">'+henc(s)+'</font>';
		if(s2) s3+=' '+s2;
		a.innerHTML=s3;		
		obj.appendChild(a);  
		obj.scrollTop=obj.scrollHeight;
	}
	go(name);
	if(state=='error'){
		iserror=true;
		go('log5');
	}
}

function proc_switchlog(id,f){
	for(var i = 1; i <= 7; i++){
		var a=_getid("log"+i);
		if(a) a.style.display='none';
	}
	var a=_getid("log"+id);
	a.style.display='';

	var a=_getid("logtab").getElementsByTagName('A');
	for(var i = 0; i < a.length; i++){    
		a[i].style.fontWeight="normal";
	}
	f.style.fontWeight="bold";
	return false;
}

var gformats=[["pdf","application/pdf"],["gif","image/gif"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["png","image/png"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
["htm","text/html"],["html","text/html"],["txt","text/plain"],["text","text/plain"],["odt","application/vnd.oasis.opendocument.text"],
["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["odp","application/vnd.oasis.opendocument.presentation"],
["xls","application/vnd.ms-excel"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["csv","text/csv"],["tsv","text/tab-separated-values"]];
function getmimetype(s){
	var arr=(s || '').split(".");
	var ext=arr[arr.length-1].toLowerCase();
	for(var i=0; i <= gformats.length-1; i++){
		if(gformats[i][0]==ext){
			return gformats[i][1];
		}
	}
}

function getsize(fileSize){
	if(!fileSize) return 'Unknown';
	function humanFileSize(bytes){
		var thresh = 1024;
		if(bytes < thresh) return bytes + ' B';
		var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(bytes >= thresh);
		return bytes.toFixed(1)+' '+units[u];
	}
	return humanFileSize(fileSize);
}				

function getfilename(s){
	var arr=s.split('.');
	if(arr.length>1){
		arr.splice(arr.length-1,1);
	}
	return arr.join('.');
}

function getextension(s){
	var arr=(s || '').split('.');
	if(arr.length>1){
		return arr[arr.length-1].toLowerCase();
	}
	return '';
}


// file : bwip-js/bwipjs.js
//
// Graphics-context interface to the BWIPP cross-compiled code

function BWIPJS(freetype, monochrome) {
	if (this.constructor !== BWIPJS) {
		return new BWIPJS(freetype, monochrome);
	}
	this.bmap = null;	// bitmap interface
	this.gstk = [];		// graphics save/restore stack
	this.reset();

	// FreeType interface
	this.ft = {
		monochrome:freetype.cwrap("monochrome", 'number', ['number']),
		lookup:freetype.cwrap("find_font", 'number', ['string']),
		bitmap:freetype.cwrap("get_bitmap", 'number',
							['number','number','number','number']),
		width:freetype.cwrap("get_width", 'number', []),
		height:freetype.cwrap("get_height", 'number', []),
		left:freetype.cwrap("get_left", 'number', []),
		top:freetype.cwrap("get_top", 'number', []),
		advance:freetype.cwrap("get_advance", 'number', []),
		module:freetype,
	};

	this.ft.monochrome(monochrome ? 1 : 0);
}

BWIPJS.prototype.bitmap = function(bitmap) {
	if (bitmap) {
		this.bmap = bitmap;
	}
	return this.bmap;
}

// All graphics state that must be saved/restored is given a prefix of g_
BWIPJS.prototype.reset = function() {
	// Current Transform Matrix - since we don't do rotation, we can fake
	// the matrix math
	this.g_tdx	= 0;		// CTM x-offset
	this.g_tdy	= 0;		// CTM y-offset
	this.g_tsx	= 1;		// CTM x-scale factor
	this.g_tsy	= 1;		// CTM y-scale factor

	this.g_posx	= 0;		// current x position
	this.g_posy	= 0;		// current y position
	this.g_penw	= 1;		// current line/pen width
	this.g_path	= [];		// current path
	this.g_font	= null;		// current font object
	this.g_rgb  = [0,0,0];	// current color (black)
}
BWIPJS.prototype.save = function() {
	// clone all g_ properties
	var ctx = {};
	for (var id in this) {
		if (id.indexOf('g_') == 0) {
			ctx[id] = clone(this[id]);
		}
	}
	this.gstk.push(ctx);

	// Perform a deep clone of the graphics state properties
	function clone(v) {
		if (v instanceof Array) {
			var t = [];
			for (var i = 0; i < v.length; i++)
				t[i] = clone(v[i]);
			return t;
		}
		if (v instanceof Object) {
			var t = {};
			for (var id in v)
				t[id] = clone(v[id]);
			return t;
		}
		return v;
	}
}
BWIPJS.prototype.restore = function() {
	if (!this.gstk.length) {
		throw new Error('grestore: stack underflow');
	}
	var ctx = this.gstk.pop();
	for (var id in ctx) {
		this[id] = ctx[id];
	}
	// Color is part of the bitmap interface and must be restored separately.
	// We can run without a bitmap when running tests.
	if (this.bmap) {
		this.bmap.color(this.g_rgb[0], this.g_rgb[1], this.g_rgb[2]);
	}
}
// Per the postscript spec:
//	As discussed in Section 4.4.1, Current Path, points entered into a path
//	are immediately converted to device coordinates by the current
//	transformation matrix (CTM); subsequent modifications to the CTM do not
//	affect existing points.  `currentpoint` computes the user space
//	coordinates corresponding to the current point according to the current
//	value of the CTM. Thus, if a current point is set and then the CTM is
//	changed, the coordinates returned by currentpoint will be different
//	from those that were originally specified for the point. 
BWIPJS.prototype.currpos = function() {
	return { x:(this.g_posx-this.g_tdx)/this.g_tsx,
			 y:(this.g_posy-this.g_tdy)/this.g_tsy
		};
}
BWIPJS.prototype.currfont = function() {
	return this.g_font;
}
BWIPJS.prototype.findfont = function(name) {
	return { FontName:name };
}
BWIPJS.prototype.translate = function(x, y) {
	this.g_tdx = this.g_tsx * x;
	this.g_tdy = this.g_tsy * y;
}
BWIPJS.prototype.scale = function(x, y) {
	this.g_tsx *= x;
	this.g_tsy *= y;
}
BWIPJS.prototype.setlinewidth = function(w) {
	this.g_penw = w;
}
BWIPJS.prototype.setfont = function(f) {
	this.g_font = f;
}
BWIPJS.prototype.getfont = function() {
	// This is an internal method
	return this.ft.lookup(this.g_font.FontName.toString());
}
// Special function to replace setanycolor in BWIPP
// Takes a string of hex digits either 6 chars in length (rrggbb) or
// 8 chars (ccmmyykk).
BWIPJS.prototype.setcolor = function(s) {
	if (s.length == 6) {
		var r = parseInt(s.substr(0,2), 16);
		var g = parseInt(s.substr(2,2), 16);
		var b = parseInt(s.substr(4,2), 16);
	} else if (s.length == 8) {
		var c = parseInt(s.substr(0,2), 16) / 255;
		var m = parseInt(s.substr(2,2), 16) / 255;
		var y = parseInt(s.substr(4,2), 16) / 255;
		var k = parseInt(s.substr(6,2), 16) / 255;
		var r = Math.round((1-c) * (1-k) * 255);
		var g = Math.round((1-m) * (1-k) * 255);
		var b = Math.round((1-y) * (1-k) * 255);
	} else {
		throw 'bwipp.setcolor: invalid string length (' + s + ')' ;
	}

	this.bmap.color(r, g, b);
	this.g_rgb = [ r, g, b ];
}
BWIPJS.prototype.newpath = function() {
	this.g_path = [];
}
BWIPJS.prototype.closepath = function() {
	if (this.g_path.length)  {
		var c0 = this.g_path[0];
		var c1 = this.g_path[this.g_path.length-1];
		this.g_path.push([ c1[0], c1[1] ]);
		this.g_path.push(['c']);
		this.g_path.push([ c0[0], c0[1] ]);
	}
}
BWIPJS.prototype.moveto = function(x,y) {
	this.g_posx = this.g_tdx + this.g_tsx * x;
	this.g_posy = this.g_tdy + this.g_tsy * y;
}
BWIPJS.prototype.rmoveto = function(x,y) {
	this.g_posx += this.g_tsx * x;
	this.g_posy += this.g_tsy * y;
}
BWIPJS.prototype.lineto = function(x,y) {
	this.g_path.push([this.g_posx, this.g_posy]);
	this.g_path.push(['l']);
	this.g_posx = this.g_tdx + this.g_tsx * x;
	this.g_posy = this.g_tdy + this.g_tsy * y;
	this.g_path.push([this.g_posx, this.g_posy]);
}
BWIPJS.prototype.rlineto = function(x,y) {
	this.g_path.push([this.g_posx, this.g_posy]);
	this.g_path.push(['l']);
	this.g_posx += this.g_tsx * x;
	this.g_posy += this.g_tsy * y;
	this.g_path.push([this.g_posx, this.g_posy]);
}
BWIPJS.prototype.stringwidth = function(str) {
	var font = this.getfont();
	var size = +this.g_font.FontSize || 10;

	// str may be a uint8-string or normal string
	var cca = typeof str === 'string';

	// width, ascent, and descent of the char-path
	var w = 0, a = 0, d = 0;
	for (var i = 0; i < str.length; i++) {
		var cd = cca ? str.charCodeAt(i) : str[i];
		var offset = this.ft.bitmap(font,cd,size*this.g_tsx,size*this.g_tsy);
		w += this.ft.advance();
		if (!offset)
			continue;
		var h = this.ft.height();
		var t = this.ft.top();
		a = Math.max(a, t);
		d = Math.max(d, h-t);
	}
	return { w:w/this.g_tsx, h:(a+d)/this.g_tsy,
		 a:a/this.g_tsy, d:d/this.g_tsy };
}
BWIPJS.prototype.charpath = function(str, b) {
	var sw = this.stringwidth(str);

	// Emulate the char-path by placing a rectangle around it
	this.rlineto(0, sw.a);
	this.rlineto(sw.w, 0);
	this.rlineto(0, -sw.h);
}
BWIPJS.prototype.pathbbox = function() {
	if (!this.g_path.length)	throw new Error('pathbbox: --nocurrentpoint--');
	var pth = this.g_path;
	var llx = pth[0][0];
	var lly = pth[0][1];
	var urx = 0;
	var ury = 0;
	for (var i = 2, inc = 2; i < pth.length; i += inc) {
		if (llx > pth[i][0]) llx = pth[i][0];
		if (urx < pth[i][0]) urx = pth[i][0];
		if (lly > pth[i][1]) lly = pth[i][1];
		if (ury < pth[i][1]) ury = pth[i][1];
		inc = (inc == 2 ? 1 : 2);
	}

	// Convert to user-space coordinates
	var rv = {	llx:(llx-this.g_tdx)/this.g_tsx,
				lly:(lly-this.g_tdy)/this.g_tsy,
				urx:(urx-this.g_tdx)/this.g_tsx,
				ury:(ury-this.g_tdy)/this.g_tsy };
	return rv;
}
BWIPJS.prototype.stroke = function() {
	if (this.__miny === undefined)
		this.__miny = Infinity;
	var penx = this.g_penw*this.g_tsx;
	var peny = this.g_penw*this.g_tsy;
	var segs = this.g_path.length / 3;	// number of line segments
	if (this.g_path[this.g_path.length-2][0] == 'c')
		segs--;
	for (var i = 0; i < this.g_path.length; ) {
		var s = this.g_path[i++];	// start point
		var a = this.g_path[i++];	// args
		var e = this.g_path[i++];	// end point
		if (this.__miny > s[1])
			this.__miny = s[1];
		if (this.__miny > e[1])
			this.__miny = e[1];
		switch (a[0]) {
		case 'l':	// line
			this.drawline(true, s[0], s[1], e[0], e[1], penx, peny, segs > 1);
			break;
		case 'c':	// closepath
			break;
		default:
			throw new Error('stroke: undefined opcode: ' + a[0]);
		}
	}
	this.g_path = [];
}
BWIPJS.prototype.setextent = function() {
	if (!this.g_path.length)						 // Nothing to do?
		return;

	// pathbbox() without the user-space conversion
	var pth = this.g_path;
	var llx = pth[0][0];
	var lly = pth[0][1];
	var urx = 0;
	var ury = 0;
	for (var i = 2, inc = 2; i < pth.length; i += inc) {
		if (llx > pth[i][0]) llx = pth[i][0];
		if (urx < pth[i][0]) urx = pth[i][0];
		if (lly > pth[i][1]) lly = pth[i][1];
		if (ury < pth[i][1]) ury = pth[i][1];
		inc = (inc == 2 ? 1 : 2);
	}

	this.bmap.extent(llx, lly, urx, ury);
}
// source is an 8-bit bitmask
// This implementation is optimized for 2D bar codes.  That is, it does not
// distort the image due to rounding errors.  Every pixel is sized
// identically, so the resulting image may be smaller by a few pixels than
// the scaling factor would require.  And the transform matrix is not used.
BWIPJS.prototype.imagemask = function(width, height, source) {
	var sx = Math.round(this.g_tsx);
	var sy = Math.round(this.g_tsy);
	var dx = Math.floor(sx / width);		// pixel width
	var dy = Math.floor(sy / height);		// pixel height
	var rl = Math.ceil(width / 8); 	// row length (bytes per row)
	var y0 = Math.floor(this.g_tdy) + height * dy;
	var x0;
	
	for (var y = 0; y < height; y++) {
		x0 = Math.floor(this.g_tdx);
		y0 -= dy;
		for (var x = 0; x < width; x++) {
			var by = source[y*rl + (x>>>3)];
			var bt = by & (1 << 7-(x&7));
			if (bt) {
				var x1 = x0 + dx;
				var y1 = y0 + dy;
				for (var j = y0; j < y1; j++) {
					for (var k = x0; k < x1; k++) {
						this.bmap.set(k,j,255);
					}
				}
			}
			x0 += dx;
		}
	}
}
// dx,dy are inter-character gaps
BWIPJS.prototype.show = function(str, dx, dy) {	// str is a psstring
	var font = this.getfont();
	var size = +this.g_font.FontSize || 10;

	// The string can be either a uint8-string or regular string
	var cca = typeof str === 'string';

	// Convert dx,dy to device space
	dx = this.g_tsx * dx;
	dy = this.g_tsy * dy;

	// PostScript renders bottom-up, so we must render the glyphs inverted.
	for (var i = 0; i < str.length; i++) {
		var ch = cca ? str.charCodeAt(i) : str[i];
		var offset = this.ft.bitmap(font, ch, size*this.g_tsx, size*this.g_tsy);
		if (!offset) {
			this.g_posx += this.ft.advance() + dx;
			continue;
		}

		// The OCR digits seem to be about a half-point right compared to the
		// font metrics hard-coded into BWIPP.  This is especially apparent
		// in the EAN and UPC codes where the bars mix with the text.
		var l = this.g_posx + this.ft.left();
		if (font <= 1 && ch >= 48 && ch <= 57)
			l -= 0.5 * this.g_tsx;

		var t = this.g_posy + this.ft.top() + dy;
		var w = this.ft.width();
		var h = this.ft.height();
		var b = this.ft.module.HEAPU8.subarray(offset, offset + w * h);
		var a;  // alpha

		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				a = b[y * w + x];
				if (a)
					this.bmap.set(l+x, t-y, a);
			}
		}

		this.g_posx += this.ft.advance() + dx;
	}
}

// Line algorithm that produces a more symmetric line than Bresenham's
//
// optmz == boolean 
// x1,y1 == starting coordinates
// x2,y2 == ending coordinates
// penx,peny == pen dimensions
// merge == multi-line : merge the end points
//
// When optmz is true, we use the fast vertical/horizontal line drawing
// optimizations.  This works well for single lines.
// When optmz is false, we always use the arbitrary line drawing alg, as
// it better connects one line with the next.
BWIPJS.prototype.drawline = function(optmz, x1, y1, x2, y2, penx, peny, merge) {
	if (optmz && (x1 == x2 || y1 == y2)) {
		var lx = Math.round(penx);
		var ly = Math.round(peny);

		if (y2 < y1) { var t = y1; y1 = y2; y2 = t; }
		if (x2 < x1) { var t = x1; x1 = x2; x2 = t; }

		// Horizontal or vertical line?
		if (x1 == x2) {
			// Vertical line
			x1 = Math.floor(x1 - lx/2);
			x2 = Math.floor(x2 + lx/2);
			y1 = Math.floor(y1 - (merge ? ly/2 : 0));
			y2 = Math.floor(y2 + (merge ? ly/2 : 0));
		} else {
			// Horizontal line
			y1 = Math.floor(y1 - ly/2);
			y2 = Math.floor(y2 + ly/2);
			x1 = Math.floor(x1 - (merge ? lx/2 : 0));
			x2 = Math.floor(x2 + (merge ? lx/2 : 0));
		}
		for (var y = y1; y < y2; y++)
			for (var x = x1; x < x2; x++)
				this.bmap.set(x,y,255);

		return;
	}

	// Draw an arbitrary line
	x1 = Math.floor(x1);
	x2 = Math.floor(x2);
	y1 = Math.floor(y1);
	y2 = Math.floor(y2);

	var du = Math.abs(x2-x1);
	var dv = Math.abs(y2-y1);
	var kx = (x2 < x1 ? -1 : 1);
	var ky = (y2 < y1 ? -1 : 1);
	var x  = x1;
	var y  = y1;
	var d  = 0;

	// Calculate the effect of pen width
	var penw = Math.floor(Math.sqrt(penx*penx + peny*peny));
	var pixh = Math.round(Math.sqrt((penw*penw)/((dv*dv)/(du*du)+1))) || 1;
	var pixw = Math.round(Math.sqrt(penw*penw-pixh*pixh)) || 1;

	if (du >= dv) {
		// Increment on x
		while (x != x2) {
			for (var j = 0; j < pixh; j++)
				this.bmap.set(x, y+j, 255);
			d += dv;
			if (d >= du) {
				d -= du;
				y += ky;
			}
			x += kx;
		}
		for (var j = 0; j < pixh; j++)
			this.bmap.set(x, y+j, 255);
	} else {
		// Increment on y
		while (y != y2) {
			for (var j = 0; j < pixw; j++)
				this.bmap.set(x+j, y, 255);
			d += du;
			if (d >= dv) {
				d -= dv;
				x += kx;
			}
			y += ky;
		}
		for (var j = 0; j < pixw; j++)
			this.bmap.set(x+j, y, 255);
	}
} // end of drawline()

if (typeof module === 'object' && module.exports) {
	module.exports = BWIPJS;
}


/*bitmap*/
// file : bwip-js/lib/canvas.js
// 
// bwip-js bitmap interface for an HTML canvas.
//
// Copyright (c) 2011-2016 Mark Warren
//
// Licensed MIT.  See the LICENSE file in the bwip-js root directory
// for the extended copyright notice.

// bgcolor is optional, defaults to #fff.
function Bitmap(bgcolor) {
	var clr  = [0, 0, 0];
	var pts  = [];
	var minx = 0;	// min-x
	var miny = 0;	// min-y
	var maxx = 0;	// max-x
	var maxy = 0;	// max-y
	var padx = 0;	// padding-x
	var pady = 0;	// padding-y

	this.pad = function(x, y) {
		padx = x;
		pady = y;
	}

	this.color = function(r, g, b) {
		clr = [r, g, b];
	}

	// Sets the minimim size for the drawing surface (can grow larger).
	// BWIPP has logic for borders (padding) that without this custom call
	// gets lost.  See custom/ren*.ps.
	this.extent = function(llx, lly, urx, ury) {
		llx = Math.floor(llx);
		lly = Math.floor(lly);
		urx = Math.floor(urx);
		ury = Math.floor(ury);
		if (minx > llx) minx = llx;
		if (miny > lly) miny = lly;
		if (maxx < urx) maxx = urx;
		if (maxy < ury) maxy = ury;
	}

	// a is the alpha-level of the pixel [0 .. 255]
	this.set = function(x,y,a) {
		x = Math.floor(x);
		y = Math.floor(y);
		pts.push([ x, y, clr, a ]);
		if (minx > x) minx = x;
		if (miny > y) miny = y;
		if (maxx < x) maxx = x;
		if (maxy < y) maxy = y;
	}

	this.show = function(cvsid, rot) {
		var cvs = cvsid instanceof window.HTMLCanvasElement
					? cvsid : document.getElementById(cvsid);
		if (pts.length == 0) {
			cvs.width  = 32;
			cvs.height = 32;
			cvs.getContext('2d').clearRect(0, 0, cvs.width, cvs.height);
			cvs.style.visibility = 'visible';
			return;
		}

		if (rot == 'R' || rot == 'L') {
			var h = maxx-minx+1;
			var w = maxy-miny+1;
		} else {
			var w = maxx-minx+1;
			var h = maxy-miny+1;
		}

		cvs.width  = w + 2*padx;
		cvs.height = h + 2*pady;

		// Convert from cmyk?
		if (bgcolor && bgcolor.length == 8) {
			var c = parseInt(bgcolor.substr(0,2), 16) / 255;
			var m = parseInt(bgcolor.substr(2,2), 16) / 255;
			var y = parseInt(bgcolor.substr(4,2), 16) / 255;
			var k = parseInt(bgcolor.substr(6,2), 16) / 255;
			var r = Math.floor((1-c) * (1-k) * 255);
			var g = Math.floor((1-m) * (1-k) * 255);
			var b = Math.floor((1-y) * (1-k) * 255);
			bgcolor = 'rgb(' + r + ',' + g + ',' + b + ')';
		} else if (bgcolor) {
			bgcolor = '#' + bgcolor;
		}

		var ctx = cvs.getContext('2d');
		ctx.fillStyle = bgcolor || '#fff';
		ctx.fillRect(0, 0, cvs.width, cvs.height);
		ctx.fillStyle = '#000';

		var id  = ctx.getImageData(0, 0, cvs.width, cvs.height);
		var dat = id.data;

		for (var i = 0; i < pts.length; i++) {
			// PostScript builds bottom-up, we build top-down.
			var x = pts[i][0] - minx;
			var y = pts[i][1] - miny;
			var c = pts[i][2];
			var a = pts[i][3] / 255;

			if (rot == 'N') {
				y = h - y - 1; 	// Invert y
			} else if (rot == 'I') {
				x = w - x - 1;	// Invert x
			} else {
				y = w - y; 	// Invert y
				if (rot == 'L') {
					var t = y;
					y = h - x - 1;
					x = t - 1;
				} else {
					var t = x;
					x = w - y;
					y = t;
				}
			}

			var idx = (y * id.width + x) * 4
			dat[idx+0] = (dat[idx+0] * (1 - a) + c[0] * a)|0;
			dat[idx+1] = (dat[idx+1] * (1 - a) + c[1] * a)|0;
			dat[idx+2] = (dat[idx+2] * (1 - a) + c[2] * a)|0;
			dat[idx+3] = 255;
		}
		ctx.putImageData(id, padx, pady);
		cvs.style.visibility = 'visible';
	}
}

/*symdesc*/
// file: bwip-js/lib/symdesc.js
//
// This code was automatically generated from:
// Barcode Writer in Pure PostScript - Version 2016-06-03
//
// Copyright (c) 2011-2016 Mark Warren
// Copyright (c) 2004-2014 Terry Burton
//
// Licensed MIT.  See the LICENSE file in the bwip-js root directory
// for the extended copyright notice.
var symdesc = {
	"ean5":{ sym:"ean5",desc:"EAN-5 (5 digit addon)",text:"90200",opts:"includetext guardwhitespace" },
	"ean2":{ sym:"ean2",desc:"EAN-2 (2 digit addon)",text:"05",opts:"includetext guardwhitespace" },
	"ean13":{ sym:"ean13",desc:"EAN-13",text:"2112345678900",opts:"includetext guardwhitespace" },
	"ean8":{ sym:"ean8",desc:"EAN-8",text:"02345673",opts:"includetext guardwhitespace" },
	"upca":{ sym:"upca",desc:"UPC-A",text:"416000336108",opts:"includetext" },
	"upce":{ sym:"upce",desc:"UPC-E",text:"00123457",opts:"includetext" },
	"isbn":{ sym:"isbn",desc:"ISBN",text:"978-1-56581-231-4 52250",opts:"includetext guardwhitespace" },
	"ismn":{ sym:"ismn",desc:"ISMN",text:"979-0-2605-3211-3",opts:"includetext guardwhitespace" },
	"issn":{ sym:"issn",desc:"ISSN",text:"0311-175X 00 17",opts:"includetext guardwhitespace" },
	"code128":{ sym:"code128",desc:"Code 128",text:"Count01234567!",opts:"includetext" },
	"gs1-128":{ sym:"gs1-128",desc:"GS1-128",text:"(01)95012345678903(3103)000123",opts:"includetext" },
	"ean14":{ sym:"ean14",desc:"GS1-14",text:"(01) 0 46 01234 56789 3",opts:"includetext" },
	"sscc18":{ sym:"sscc18",desc:"SSCC-18",text:"(00) 0 0614141 123456789 0",opts:"includetext" },
	"code39":{ sym:"code39",desc:"Code 39",text:"THIS IS CODE 39",opts:"includetext includecheck includecheckintext" },
	"code39ext":{ sym:"code39ext",desc:"Code 39 Extended",text:"Code39 Ext!",opts:"includetext includecheck includecheckintext" },
	"code32":{ sym:"code32",desc:"Italian Pharmacode",text:"01234567",opts:"includetext" },
	"pzn":{ sym:"pzn",desc:"Pharmazentralnummer (PZN)",text:"123456",opts:"includetext" },
	"code93":{ sym:"code93",desc:"Code 93",text:"THIS IS CODE 93",opts:"includetext includecheck" },
	"code93ext":{ sym:"code93ext",desc:"Code 93 Extended",text:"Code93 Ext!",opts:"includetext includecheck" },
	"interleaved2of5":{ sym:"interleaved2of5",desc:"Interleaved 2 of 5 (ITF)",text:"2401234567",opts:"height=0.5 includecheck includetext includecheckintext" },
	"itf14":{ sym:"itf14",desc:"ITF-14",text:"0 46 01234 56789 3",opts:"includetext" },
	"identcode":{ sym:"identcode",desc:"Deutsche Post Identcode",text:"563102430313",opts:"includetext" },
	"leitcode":{ sym:"leitcode",desc:"Deutsche Post Leitcode",text:"21348075016401",opts:"includetext" },
	"databaromni":{ sym:"databaromni",desc:"GS1 DataBar Omnidirectional",text:"(01)24012345678905",opts:"" },
	"databarstacked":{ sym:"databarstacked",desc:"GS1 DataBar Stacked",text:"(01)24012345678905",opts:"" },
	"databarstackedomni":{ sym:"databarstackedomni",desc:"GS1 DataBar Stacked Omnidirectional",text:"(01)24012345678905",opts:"" },
	"databartruncated":{ sym:"databartruncated",desc:"GS1 DataBar Truncated",text:"(01)24012345678905",opts:"" },
	"databarlimited":{ sym:"databarlimited",desc:"GS1 DataBar Limited",text:"(01)15012345678907",opts:"" },
	"databarexpanded":{ sym:"databarexpanded",desc:"GS1 DataBar Expanded",text:"(01)95012345678903(3103)000123",opts:"" },
	"databarexpandedstacked":{ sym:"databarexpandedstacked",desc:"GS1 DataBar Expanded Stacked",text:"(01)95012345678903(3103)000123",opts:"segments=4" },
	"pharmacode":{ sym:"pharmacode",desc:"Pharmaceutical Binary Code",text:"117480",opts:"showborder" },
	"pharmacode2":{ sym:"pharmacode2",desc:"Two-track Pharmacode",text:"117480",opts:"includetext showborder" },
	"code2of5":{ sym:"code2of5",desc:"Code 25",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"industrial2of5":{ sym:"industrial2of5",desc:"Industrial 2 of 5",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"iata2of5":{ sym:"iata2of5",desc:"IATA 2 of 5",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"matrix2of5":{ sym:"matrix2of5",desc:"Matrix 2 of 5",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"coop2of5":{ sym:"coop2of5",desc:"COOP 2 of 5",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"datalogic2of5":{ sym:"datalogic2of5",desc:"Datalogic 2 of 5",text:"01234567",opts:"includetext includecheck includecheckintext" },
	"code11":{ sym:"code11",desc:"Code 11",text:"0123456789",opts:"includetext includecheck includecheckintext" },
	"bc412":{ sym:"bc412",desc:"BC412",text:"BC412",opts:"semi includetext includecheckintext" },
	"rationalizedCodabar":{ sym:"rationalizedCodabar",desc:"Codabar",text:"A0123456789B",opts:"includetext includecheck includecheckintext" },
	"onecode":{ sym:"onecode",desc:"USPS Intelligent Mail",text:"0123456709498765432101234567891",opts:"barcolor=FF0000" },
	"postnet":{ sym:"postnet",desc:"USPS POSTNET",text:"01234",opts:"includetext includecheckintext" },
	"planet":{ sym:"planet",desc:"USPS PLANET",text:"01234567890",opts:"includetext includecheckintext" },
	"royalmail":{ sym:"royalmail",desc:"Royal Mail 4 State Customer Code",text:"LE28HS9Z",opts:"includetext barcolor=FF0000" },
	"auspost":{ sym:"auspost",desc:"AusPost 4 State Customer Code",text:"5956439111ABA 9",opts:"includetext custinfoenc=character" },
	"kix":{ sym:"kix",desc:"Royal Dutch TPG Post KIX",text:"1231FZ13XHS",opts:"includetext" },
	"japanpost":{ sym:"japanpost",desc:"Japan Post 4 State Customer Code",text:"6540123789-A-K-Z",opts:"includetext includecheckintext" },
	"msi":{ sym:"msi",desc:"MSI Modified Plessey",text:"0123456789",opts:"includetext includecheck includecheckintext" },
	"plessey":{ sym:"plessey",desc:"Plessey UK",text:"01234ABCD",opts:"includetext includecheckintext" },
	"telepen":{ sym:"telepen",desc:"Telepen",text:"ABCDEF",opts:"includetext" },
	"telepennumeric":{ sym:"telepennumeric",desc:"Telepen Numeric",text:"01234567",opts:"includetext" },
	"posicode":{ sym:"posicode",desc:"PosiCode",text:"ABC123",opts:"version=b inkspread=-0.5 parsefnc includetext" },
	"codablockf":{ sym:"codablockf",desc:"Codablock F",text:"CODABLOCK F 34567890123456789010040digit",opts:"columns=8" },
	"code16k":{ sym:"code16k",desc:"Code 16K",text:"Abcd-1234567890-wxyZ",opts:"" },
	"code49":{ sym:"code49",desc:"Code 49",text:"MULTIPLE ROWS IN CODE 49",opts:"" },
	"channelcode":{ sym:"channelcode",desc:"Channel Code",text:"3493",opts:"height=0.5 includetext " },
	"flattermarken":{ sym:"flattermarken",desc:"Flattermarken",text:"11099",opts:"inkspread=-0.25 showborder borderleft=0 borderright=0" },
	"raw":{ sym:"raw",desc:"Custom 1D symbology",text:"331132131313411122131311333213114131131221323",opts:"height=0.5" },
	"daft":{ sym:"daft",desc:"Custom 4 state symbology",text:"FATDAFTDAD",opts:"" },
	"symbol":{ sym:"symbol",desc:"Miscellaneous symbols",text:"fima",opts:"backgroundcolor=DD000011" },
	"pdf417":{ sym:"pdf417",desc:"PDF417",text:"This is PDF417",opts:"columns=2" },
	"pdf417compact":{ sym:"pdf417compact",desc:"Compact PDF417",text:"This is compact PDF417",opts:"columns=2" },
	"micropdf417":{ sym:"micropdf417",desc:"MicroPDF417",text:"MicroPDF417",opts:"" },
	"datamatrix":{ sym:"datamatrix",desc:"Data Matrix",text:"This is Data Matrix!",opts:"" },
	"datamatrixrectangular":{ sym:"datamatrixrectangular",desc:"Data Matrix Rectangular",text:"1234",opts:"" },
	"qrcode":{ sym:"qrcode",desc:"QR Code",text:"This is QR Code sample text.",opts:"eclevel=M" },
	"microqrcode":{ sym:"microqrcode",desc:"Micro QR Code",text:"1234",opts:"" },
	"maxicode":{ sym:"maxicode",desc:"MaxiCode",text:"[)>^03001^02996152382802^029840^029001^0291Z00004951^029UPSN^02906X610^029159^0291234567^0291/1^029^029Y^029634 ALPHA DR^029PITTSBURGH^029PA^029^004",opts:"mode=2 parse" },
	"azteccode":{ sym:"azteccode",desc:"Aztec Code",text:"This is Aztec Code",opts:"format=full" },
	"azteccodecompact":{ sym:"azteccodecompact",desc:"Compact Aztec Code",text:"1234",opts:"" },
	"aztecrune":{ sym:"aztecrune",desc:"Aztec Runes",text:"1",opts:"" },
	"codeone":{ sym:"codeone",desc:"Code One",text:"Code One",opts:"" },
	"hanxin":{ sym:"hanxin",desc:"Han Xin Code",text:"This is Han Xin",opts:"" },
	"gs1-cc":{ sym:"gs1-cc",desc:"GS1 Composite 2D Component",text:"(01)95012345678903(3103)000123",opts:"ccversion=b cccolumns=4" },
	"ean13composite":{ sym:"ean13composite",desc:"EAN-13 Composite",text:"2112345678900|(99)1234-abcd",opts:"includetext" },
	"ean8composite":{ sym:"ean8composite",desc:"EAN-8 Composite",text:"02345673|(21)A12345678",opts:"includetext" },
	"upcacomposite":{ sym:"upcacomposite",desc:"UPC-A Composite",text:"416000336108|(99)1234-abcd",opts:"includetext" },
	"upcecomposite":{ sym:"upcecomposite",desc:"UPC-E Composite",text:"00123457|(15)021231",opts:"includetext" },
	"databaromnicomposite":{ sym:"databaromnicomposite",desc:"GS1 DataBar Omnidirectional Composite",text:"(01)03612345678904|(11)990102",opts:"" },
	"databarstackedcomposite":{ sym:"databarstackedcomposite",desc:"GS1 DataBar Stacked Composite",text:"(01)03412345678900|(17)010200",opts:"" },
	"databarstackedomnicomposite":{ sym:"databarstackedomnicomposite",desc:"GS1 DataBar Stacked Omnidirectional Composite",text:"(01)03612345678904|(11)990102",opts:"" },
	"databartruncatedcomposite":{ sym:"databartruncatedcomposite",desc:"GS1 DataBar Truncated Composite",text:"(01)03612345678904|(11)990102",opts:"" },
	"databarlimitedcomposite":{ sym:"databarlimitedcomposite",desc:"GS1 DataBar Limited Composite",text:"(01)03512345678907|(21)abcdefghijklmnopqrstuv",opts:"" },
	"databarexpandedcomposite":{ sym:"databarexpandedcomposite",desc:"GS1 DataBar Expanded Composite",text:"(01)93712345678904(3103)001234|(91)1A2B3C4D5E",opts:"" },
	"databarexpandedstackedcomposite":{ sym:"databarexpandedstackedcomposite",desc:"GS1 DataBar Expanded Stacked Composite",text:"(01)00012345678905(10)ABCDEF|(21)12345678",opts:"segments=4 " },
	"gs1-128composite":{ sym:"gs1-128composite",desc:"GS1-128 Composite",text:"(00)030123456789012340|(02)13012345678909(37)24(10)1234567ABCDEFG",opts:"ccversion=c" },
	"gs1datamatrix":{ sym:"gs1datamatrix",desc:"GS1 Data Matrix",text:"(01)03453120000011(17)120508(10)ABCD1234(410)9501101020917",opts:"" },
	"gs1datamatrixrectangular":{ sym:"gs1datamatrixrectangular",desc:"GS1 Data Matrix Rectangular",text:"(01)03453120000011(17)120508(10)ABCD1234(410)9501101020917",opts:"" },
	"gs1qrcode":{ sym:"gs1qrcode",desc:"GS1 QR Code",text:"(01)03453120000011(8200)http://www.abc.net(10)ABCD1234(410)9501101020917",opts:"" },
	"hibccode39":{ sym:"hibccode39",desc:"HIBC Code 39",text:"A123BJC5D6E71",opts:"includetext" },
	"hibccode128":{ sym:"hibccode128",desc:"HIBC Code 128",text:"A123BJC5D6E71",opts:"includetext" },
	"hibcdatamatrix":{ sym:"hibcdatamatrix",desc:"HIBC Data Matrix",text:"A123BJC5D6E71",opts:"" },
	"hibcdatamatrixrectangular":{ sym:"hibcdatamatrixrectangular",desc:"HIBC Data Matrix Rectangular",text:"A123BJC5D6E71",opts:"" },
	"hibcpdf417":{ sym:"hibcpdf417",desc:"HIBC PDF417",text:"A123BJC5D6E71",opts:"" },
	"hibcmicropdf417":{ sym:"hibcmicropdf417",desc:"HIBC MicroPDF417",text:"A123BJC5D6E71",opts:"" },
	"hibcqrcode":{ sym:"hibcqrcode",desc:"HIBC QR Code",text:"A123BJC5D6E71",opts:"" },
	"hibccodablockf":{ sym:"hibccodablockf",desc:"HIBC Codablock F",text:"A123BJC5D6E71",opts:"" },
	"hibcazteccode":{ sym:"hibcazteccode",desc:"HIBC Aztec Code",text:"A123BJC5D6E71",opts:"" }
};


/*!
	Papa Parse
	v4.1.2
	https://github.com/mholt/PapaParse
*/
(function(global)
{
	"use strict";

	var IS_WORKER = !global.document && !!global.postMessage,
		IS_PAPA_WORKER = IS_WORKER && /(\?|&)papaworker(=|&|$)/.test(global.location.search),
		LOADED_SYNC = false, AUTO_SCRIPT_PATH;
	var workers = {}, workerIdCounter = 0;

	var Papa = {};

	Papa.parse = CsvToJson;
	Papa.unparse = JsonToCsv;

	Papa.RECORD_SEP = String.fromCharCode(30);
	Papa.UNIT_SEP = String.fromCharCode(31);
	Papa.BYTE_ORDER_MARK = "\ufeff";
	Papa.BAD_DELIMITERS = ["\r", "\n", "\"", Papa.BYTE_ORDER_MARK];
	Papa.WORKERS_SUPPORTED = !IS_WORKER && !!global.Worker;
	Papa.SCRIPT_PATH = null;	// Must be set by your code if you use workers and this lib is loaded asynchronously

	// Configurable chunk sizes for local and remote files, respectively
	Papa.LocalChunkSize = 1024 * 1024 * 10;	// 10 MB
	Papa.RemoteChunkSize = 1024 * 1024 * 5;	// 5 MB
	Papa.DefaultDelimiter = ",";			// Used if not specified and detection fails

	// Exposed for testing and development only
	Papa.Parser = Parser;
	Papa.ParserHandle = ParserHandle;
	Papa.NetworkStreamer = NetworkStreamer;
	Papa.FileStreamer = FileStreamer;
	Papa.StringStreamer = StringStreamer;

	if (typeof module !== 'undefined' && module.exports)
	{
		// Export to Node...
		module.exports = Papa;
	}
	else if (isFunction(global.define) && global.define.amd)
	{
		// Wireup with RequireJS
		define(function() { return Papa; });
	}
	else
	{
		// ...or as browser global
		global.Papa = Papa;
	}

	if (global.jQuery)
	{
		var $ = global.jQuery;
		$.fn.parse = function(options)
		{
			var config = options.config || {};
			var queue = [];

			this.each(function(idx)
			{
				var supported = $(this).prop('tagName').toUpperCase() == "INPUT"
								&& $(this).attr('type').toLowerCase() == "file"
								&& global.FileReader;

				if (!supported || !this.files || this.files.length == 0)
					return true;	// continue to next input element

				for (var i = 0; i < this.files.length; i++)
				{
					queue.push({
						file: this.files[i],
						inputElem: this,
						instanceConfig: $.extend({}, config)
					});
				}
			});

			parseNextFile();	// begin parsing
			return this;		// maintains chainability


			function parseNextFile()
			{
				if (queue.length == 0)
				{
					if (isFunction(options.complete))
						options.complete();
					return;
				}

				var f = queue[0];

				if (isFunction(options.before))
				{
					var returned = options.before(f.file, f.inputElem);

					if (typeof returned === 'object')
					{
						if (returned.action == "abort")
						{
							error("AbortError", f.file, f.inputElem, returned.reason);
							return;	// Aborts all queued files immediately
						}
						else if (returned.action == "skip")
						{
							fileComplete();	// parse the next file in the queue, if any
							return;
						}
						else if (typeof returned.config === 'object')
							f.instanceConfig = $.extend(f.instanceConfig, returned.config);
					}
					else if (returned == "skip")
					{
						fileComplete();	// parse the next file in the queue, if any
						return;
					}
				}

				// Wrap up the user's complete callback, if any, so that ours also gets executed
				var userCompleteFunc = f.instanceConfig.complete;
				f.instanceConfig.complete = function(results)
				{
					if (isFunction(userCompleteFunc))
						userCompleteFunc(results, f.file, f.inputElem);
					fileComplete();
				};

				Papa.parse(f.file, f.instanceConfig);
			}

			function error(name, file, elem, reason)
			{
				if (isFunction(options.error))
					options.error({name: name}, file, elem, reason);
			}

			function fileComplete()
			{
				queue.splice(0, 1);
				parseNextFile();
			}
		}
	}


	if (IS_PAPA_WORKER)
	{
		global.onmessage = workerThreadReceivedMessage;
	}
	else if (Papa.WORKERS_SUPPORTED)
	{
		AUTO_SCRIPT_PATH = getScriptPath();

		// Check if the script was loaded synchronously
		if (!document.body)
		{
			// Body doesn't exist yet, must be synchronous
			LOADED_SYNC = true;
		}
		else
		{
			document.addEventListener('DOMContentLoaded', function () {
				LOADED_SYNC = true;
			}, true);
		}
	}




	function CsvToJson(_input, _config)
	{
		_config = _config || {};

		if (_config.worker && Papa.WORKERS_SUPPORTED)
		{
			var w = newWorker();

			w.userStep = _config.step;
			w.userChunk = _config.chunk;
			w.userComplete = _config.complete;
			w.userError = _config.error;

			_config.step = isFunction(_config.step);
			_config.chunk = isFunction(_config.chunk);
			_config.complete = isFunction(_config.complete);
			_config.error = isFunction(_config.error);
			delete _config.worker;	// prevent infinite loop

			w.postMessage({
				input: _input,
				config: _config,
				workerId: w.id
			});

			return;
		}

		var streamer = null;
		if (typeof _input === 'string')
		{
			if (_config.download)
				streamer = new NetworkStreamer(_config);
			else
				streamer = new StringStreamer(_config);
		}
		else if ((global.File && _input instanceof File) || _input instanceof Object)	// ...Safari. (see issue #106)
			streamer = new FileStreamer(_config);

		return streamer.stream(_input);
	}






	function JsonToCsv(_input, _config)
	{
		var _output = "";
		var _fields = [];

		// Default configuration

		/** whether to surround every datum with quotes */
		var _quotes = false;

		/** delimiting character */
		var _delimiter = ",";

		/** newline character(s) */
		var _newline = "\r\n";

		unpackConfig();

		if (typeof _input === 'string')
			_input = JSON.parse(_input);

		if (_input instanceof Array)
		{
			if (!_input.length || _input[0] instanceof Array)
				return serialize(null, _input);
			else if (typeof _input[0] === 'object')
				return serialize(objectKeys(_input[0]), _input);
		}
		else if (typeof _input === 'object')
		{
			if (typeof _input.data === 'string')
				_input.data = JSON.parse(_input.data);

			if (_input.data instanceof Array)
			{
				if (!_input.fields)
					_input.fields = _input.data[0] instanceof Array
									? _input.fields
									: objectKeys(_input.data[0]);

				if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
					_input.data = [_input.data];	// handles input like [1,2,3] or ["asdf"]
			}

			return serialize(_input.fields || [], _input.data || []);
		}

		// Default (any valid paths should return before this)
		throw "exception: Unable to serialize unrecognized input";


		function unpackConfig()
		{
			if (typeof _config !== 'object')
				return;

			if (typeof _config.delimiter === 'string'
				&& _config.delimiter.length == 1
				&& Papa.BAD_DELIMITERS.indexOf(_config.delimiter) == -1)
			{
				_delimiter = _config.delimiter;
			}

			if (typeof _config.quotes === 'boolean'
				|| _config.quotes instanceof Array)
				_quotes = _config.quotes;

			if (typeof _config.newline === 'string')
				_newline = _config.newline;
		}


		/** Turns an object's keys into an array */
		function objectKeys(obj)
		{
			if (typeof obj !== 'object')
				return [];
			var keys = [];
			for (var key in obj)
				keys.push(key);
			return keys;
		}

		/** The double for loop that iterates the data and writes out a CSV string including header row */
		function serialize(fields, data)
		{
			var csv = "";

			if (typeof fields === 'string')
				fields = JSON.parse(fields);
			if (typeof data === 'string')
				data = JSON.parse(data);

			var hasHeader = fields instanceof Array && fields.length > 0;
			var dataKeyedByField = !(data[0] instanceof Array);

			// If there a header row, write it first
			if (hasHeader)
			{
				for (var i = 0; i < fields.length; i++)
				{
					if (i > 0)
						csv += _delimiter;
					csv += safe(fields[i], i);
				}
				if (data.length > 0)
					csv += _newline;
			}

			// Then write out the data
			for (var row = 0; row < data.length; row++)
			{
				var maxCol = hasHeader ? fields.length : data[row].length;

				for (var col = 0; col < maxCol; col++)
				{
					if (col > 0)
						csv += _delimiter;
					var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
					csv += safe(data[row][colIdx], col);
				}

				if (row < data.length - 1)
					csv += _newline;
			}

			return csv;
		}

		/** Encloses a value around quotes if needed (makes a value safe for CSV insertion) */
		function safe(str, col)
		{
			if (typeof str === "undefined" || str === null)
				return "";

			str = str.toString().replace(/"/g, '""');

			var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
							|| (_quotes instanceof Array && _quotes[col])
							|| hasAny(str, Papa.BAD_DELIMITERS)
							|| str.indexOf(_delimiter) > -1
							|| str.charAt(0) == ' '
							|| str.charAt(str.length - 1) == ' ';

			return needsQuotes ? '"' + str + '"' : str;
		}

		function hasAny(str, substrings)
		{
			for (var i = 0; i < substrings.length; i++)
				if (str.indexOf(substrings[i]) > -1)
					return true;
			return false;
		}
	}

	/** ChunkStreamer is the base prototype for various streamer implementations. */
	function ChunkStreamer(config)
	{
		this._handle = null;
		this._paused = false;
		this._finished = false;
		this._input = null;
		this._baseIndex = 0;
		this._partialLine = "";
		this._rowCount = 0;
		this._start = 0;
		this._nextChunk = null;
		this.isFirstChunk = true;
		this._completeResults = {
			data: [],
			errors: [],
			meta: {}
		};
		replaceConfig.call(this, config);

		this.parseChunk = function(chunk)
		{
			// First chunk pre-processing
			if (this.isFirstChunk && isFunction(this._config.beforeFirstChunk))
			{
				var modifiedChunk = this._config.beforeFirstChunk(chunk);
				if (modifiedChunk !== undefined)
					chunk = modifiedChunk;
			}
			this.isFirstChunk = false;

			// Rejoin the line we likely just split in two by chunking the file
			var aggregate = this._partialLine + chunk;
			this._partialLine = "";

			var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
			
			if (this._handle.paused() || this._handle.aborted())
				return;
			
			var lastIndex = results.meta.cursor;
			
			if (!this._finished)
			{
				this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
				this._baseIndex = lastIndex;
			}

			if (results && results.data)
				this._rowCount += results.data.length;

			var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);

			if (IS_PAPA_WORKER)
			{
				global.postMessage({
					results: results,
					workerId: Papa.WORKER_ID,
					finished: finishedIncludingPreview
				});
			}
			else if (isFunction(this._config.chunk))
			{
				this._config.chunk(results, this._handle);
				if (this._paused)
					return;
				results = undefined;
				this._completeResults = undefined;
			}

			if (!this._config.step && !this._config.chunk) {
				this._completeResults.data = this._completeResults.data.concat(results.data);
				this._completeResults.errors = this._completeResults.errors.concat(results.errors);
				this._completeResults.meta = results.meta;
			}

			if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
				this._config.complete(this._completeResults);

			if (!finishedIncludingPreview && (!results || !results.meta.paused))
				this._nextChunk();

			return results;
		};

		this._sendError = function(error)
		{
			if (isFunction(this._config.error))
				this._config.error(error);
			else if (IS_PAPA_WORKER && this._config.error)
			{
				global.postMessage({
					workerId: Papa.WORKER_ID,
					error: error,
					finished: false
				});
			}
		};

		function replaceConfig(config)
		{
			// Deep-copy the config so we can edit it
			var configCopy = copy(config);
			configCopy.chunkSize = parseInt(configCopy.chunkSize);	// parseInt VERY important so we don't concatenate strings!
			if (!config.step && !config.chunk)
				configCopy.chunkSize = null;  // disable Range header if not streaming; bad values break IIS - see issue #196
			this._handle = new ParserHandle(configCopy);
			this._handle.streamer = this;
			this._config = configCopy;	// persist the copy to the caller
		}
	}


	function NetworkStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.RemoteChunkSize;
		ChunkStreamer.call(this, config);

		var xhr;

		if (IS_WORKER)
		{
			this._nextChunk = function()
			{
				this._readChunk();
				this._chunkLoaded();
			};
		}
		else
		{
			this._nextChunk = function()
			{
				this._readChunk();
			};
		}

		this.stream = function(url)
		{
			this._input = url;
			this._nextChunk();	// Starts streaming
		};

		this._readChunk = function()
		{
			if (this._finished)
			{
				this._chunkLoaded();
				return;
			}

			xhr = new XMLHttpRequest();
			
			if (!IS_WORKER)
			{
				xhr.onload = bindFunction(this._chunkLoaded, this);
				xhr.onerror = bindFunction(this._chunkError, this);
			}

			xhr.open("GET", this._input, !IS_WORKER);
			
			if (this._config.chunkSize)
			{
				var end = this._start + this._config.chunkSize - 1;	// minus one because byte range is inclusive
				xhr.setRequestHeader("Range", "bytes="+this._start+"-"+end);
				xhr.setRequestHeader("If-None-Match", "webkit-no-cache"); // https://bugs.webkit.org/show_bug.cgi?id=82672
			}

			try {
				xhr.send();
			}
			catch (err) {
				this._chunkError(err.message);
			}

			if (IS_WORKER && xhr.status == 0)
				this._chunkError();
			else
				this._start += this._config.chunkSize;
		}

		this._chunkLoaded = function()
		{
			if (xhr.readyState != 4)
				return;

			if (xhr.status < 200 || xhr.status >= 400)
			{
				this._chunkError();
				return;
			}

			this._finished = !this._config.chunkSize || this._start > getFileSize(xhr);
			this.parseChunk(xhr.responseText);
		}

		this._chunkError = function(errorMessage)
		{
			var errorText = xhr.statusText || errorMessage;
			this._sendError(errorText);
		}

		function getFileSize(xhr)
		{
			var contentRange = xhr.getResponseHeader("Content-Range");
			return parseInt(contentRange.substr(contentRange.lastIndexOf("/") + 1));
		}
	}
	NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
	NetworkStreamer.prototype.constructor = NetworkStreamer;


	function FileStreamer(config)
	{
		config = config || {};
		if (!config.chunkSize)
			config.chunkSize = Papa.LocalChunkSize;
		ChunkStreamer.call(this, config);

		var reader, slice;

		// FileReader is better than FileReaderSync (even in worker) - see http://stackoverflow.com/q/24708649/1048862
		// But Firefox is a pill, too - see issue #76: https://github.com/mholt/PapaParse/issues/76
		var usingAsyncReader = typeof FileReader !== 'undefined';	// Safari doesn't consider it a function - see issue #105

		this.stream = function(file)
		{
			this._input = file;
			slice = file.slice || file.webkitSlice || file.mozSlice;

			if (usingAsyncReader)
			{
				reader = new FileReader();		// Preferred method of reading files, even in workers
				reader.onload = bindFunction(this._chunkLoaded, this);
				reader.onerror = bindFunction(this._chunkError, this);
			}
			else
				reader = new FileReaderSync();	// Hack for running in a web worker in Firefox

			this._nextChunk();	// Starts streaming
		};

		this._nextChunk = function()
		{
			if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
				this._readChunk();
		}

		this._readChunk = function()
		{
			var input = this._input;
			if (this._config.chunkSize)
			{
				var end = Math.min(this._start + this._config.chunkSize, this._input.size);
				input = slice.call(input, this._start, end);
			}
			var txt = reader.readAsText(input, this._config.encoding);
			if (!usingAsyncReader)
				this._chunkLoaded({ target: { result: txt } });	// mimic the async signature
		}

		this._chunkLoaded = function(event)
		{
			// Very important to increment start each time before handling results
			this._start += this._config.chunkSize;
			this._finished = !this._config.chunkSize || this._start >= this._input.size;
			this.parseChunk(event.target.result);
		}

		this._chunkError = function()
		{
			this._sendError(reader.error);
		}

	}
	FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
	FileStreamer.prototype.constructor = FileStreamer;


	function StringStreamer(config)
	{
		config = config || {};
		ChunkStreamer.call(this, config);

		var string;
		var remaining;
		this.stream = function(s)
		{
			string = s;
			remaining = s;
			return this._nextChunk();
		}
		this._nextChunk = function()
		{
			if (this._finished) return;
			var size = this._config.chunkSize;
			var chunk = size ? remaining.substr(0, size) : remaining;
			remaining = size ? remaining.substr(size) : '';
			this._finished = !remaining;
			return this.parseChunk(chunk);
		}
	}
	StringStreamer.prototype = Object.create(StringStreamer.prototype);
	StringStreamer.prototype.constructor = StringStreamer;



	// Use one ParserHandle per entire CSV file or string
	function ParserHandle(_config)
	{
		// One goal is to minimize the use of regular expressions...
		var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;

		var self = this;
		var _stepCounter = 0;	// Number of times step was called (number of rows parsed)
		var _input;				// The input being parsed
		var _parser;			// The core parser being used
		var _paused = false;	// Whether we are paused or not
		var _aborted = false;   // Whether the parser has aborted or not
		var _delimiterError;	// Temporary state between delimiter detection and processing results
		var _fields = [];		// Fields are from the header row of the input, if there is one
		var _results = {		// The last results returned from the parser
			data: [],
			errors: [],
			meta: {}
		};

		if (isFunction(_config.step))
		{
			var userStep = _config.step;
			_config.step = function(results)
			{
				_results = results;

				if (needsHeaderRow())
					processResults();
				else	// only call user's step function after header row
				{
					processResults();

					// It's possbile that this line was empty and there's no row here after all
					if (_results.data.length == 0)
						return;

					_stepCounter += results.data.length;
					if (_config.preview && _stepCounter > _config.preview)
						_parser.abort();
					else
						userStep(_results, self);
				}
			};
		}

		/**
		 * Parses input. Most users won't need, and shouldn't mess with, the baseIndex
		 * and ignoreLastRow parameters. They are used by streamers (wrapper functions)
		 * when an input comes in multiple chunks, like from a file.
		 */
		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			if (!_config.newline)
				_config.newline = guessLineEndings(input);

			_delimiterError = false;
			if (!_config.delimiter)
			{
				var delimGuess = guessDelimiter(input);
				if (delimGuess.successful)
					_config.delimiter = delimGuess.bestDelimiter;
				else
				{
					_delimiterError = true;	// add error after parsing (otherwise it would be overwritten)
					_config.delimiter = Papa.DefaultDelimiter;
				}
				_results.meta.delimiter = _config.delimiter;
			}

			var parserConfig = copy(_config);
			if (_config.preview && _config.header)
				parserConfig.preview++;	// to compensate for header row

			_input = input;
			_parser = new Parser(parserConfig);
			_results = _parser.parse(_input, baseIndex, ignoreLastRow);
			processResults();
			return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
		};

		this.paused = function()
		{
			return _paused;
		};

		this.pause = function()
		{
			_paused = true;
			_parser.abort();
			_input = _input.substr(_parser.getCharIndex());
		};

		this.resume = function()
		{
			_paused = false;
			self.streamer.parseChunk(_input);
		};

		this.aborted = function () {
			return _aborted;
		}

		this.abort = function()
		{
			_aborted = true;
			_parser.abort();
			_results.meta.aborted = true;
			if (isFunction(_config.complete))
				_config.complete(_results);
			_input = "";
		};

		function processResults()
		{
			if (_results && _delimiterError)
			{
				addError("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '"+Papa.DefaultDelimiter+"'");
				_delimiterError = false;
			}

			if (_config.skipEmptyLines)
			{
				for (var i = 0; i < _results.data.length; i++)
					if (_results.data[i].length == 1 && _results.data[i][0] == "")
						_results.data.splice(i--, 1);
			}

			if (needsHeaderRow())
				fillHeaderFields();

			return applyHeaderAndDynamicTyping();
		}

		function needsHeaderRow()
		{
			return _config.header && _fields.length == 0;
		}

		function fillHeaderFields()
		{
			if (!_results)
				return;
			for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
				for (var j = 0; j < _results.data[i].length; j++)
					_fields.push(_results.data[i][j]);
			_results.data.splice(0, 1);
		}

		function applyHeaderAndDynamicTyping()
		{
			if (!_results || (!_config.header && !_config.dynamicTyping))
				return _results;

			for (var i = 0; i < _results.data.length; i++)
			{
				var row = {};

				for (var j = 0; j < _results.data[i].length; j++)
				{
					if (_config.dynamicTyping)
					{
						var value = _results.data[i][j];
						if (value == "true" || value == "TRUE")
							_results.data[i][j] = true;
						else if (value == "false" || value == "FALSE")
							_results.data[i][j] = false;
						else
							_results.data[i][j] = tryParseFloat(value);
					}

					if (_config.header)
					{
						if (j >= _fields.length)
						{
							if (!row["__parsed_extra"])
								row["__parsed_extra"] = [];
							row["__parsed_extra"].push(_results.data[i][j]);
						}
						else
							row[_fields[j]] = _results.data[i][j];
					}
				}

				if (_config.header)
				{
					_results.data[i] = row;
					if (j > _fields.length)
						addError("FieldMismatch", "TooManyFields", "Too many fields: expected " + _fields.length + " fields but parsed " + j, i);
					else if (j < _fields.length)
						addError("FieldMismatch", "TooFewFields", "Too few fields: expected " + _fields.length + " fields but parsed " + j, i);
				}
			}

			if (_config.header && _results.meta)
				_results.meta.fields = _fields;
			return _results;
		}

		function guessDelimiter(input)
		{
			var delimChoices = [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP];
			var bestDelim, bestDelta, fieldCountPrevRow;

			for (var i = 0; i < delimChoices.length; i++)
			{
				var delim = delimChoices[i];
				var delta = 0, avgFieldCount = 0;
				fieldCountPrevRow = undefined;

				var preview = new Parser({
					delimiter: delim,
					preview: 10
				}).parse(input);

				for (var j = 0; j < preview.data.length; j++)
				{
					var fieldCount = preview.data[j].length;
					avgFieldCount += fieldCount;

					if (typeof fieldCountPrevRow === 'undefined')
					{
						fieldCountPrevRow = fieldCount;
						continue;
					}
					else if (fieldCount > 1)
					{
						delta += Math.abs(fieldCount - fieldCountPrevRow);
						fieldCountPrevRow = fieldCount;
					}
				}

				if (preview.data.length > 0)
					avgFieldCount /= preview.data.length;

				if ((typeof bestDelta === 'undefined' || delta < bestDelta)
					&& avgFieldCount > 1.99)
				{
					bestDelta = delta;
					bestDelim = delim;
				}
			}

			_config.delimiter = bestDelim;

			return {
				successful: !!bestDelim,
				bestDelimiter: bestDelim
			}
		}

		function guessLineEndings(input)
		{
			input = input.substr(0, 1024*1024);	// max length 1 MB

			var r = input.split('\r');

			if (r.length == 1)
				return '\n';

			var numWithN = 0;
			for (var i = 0; i < r.length; i++)
			{
				if (r[i][0] == '\n')
					numWithN++;
			}

			return numWithN >= r.length / 2 ? '\r\n' : '\r';
		}

		function tryParseFloat(val)
		{
			var isNumber = FLOAT.test(val);
			return isNumber ? parseFloat(val) : val;
		}

		function addError(type, code, msg, row)
		{
			_results.errors.push({
				type: type,
				code: code,
				message: msg,
				row: row
			});
		}
	}





	/** The core parser implements speedy and correct CSV parsing */
	function Parser(config)
	{
		// Unpack the config object
		config = config || {};
		var delim = config.delimiter;
		var newline = config.newline;
		var comments = config.comments;
		var step = config.step;
		var preview = config.preview;
		var fastMode = config.fastMode;

		// Delimiter must be valid
		if (typeof delim !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(delim) > -1)
			delim = ",";

		// Comment character must be valid
		if (comments === delim)
			throw "Comment character same as delimiter";
		else if (comments === true)
			comments = "#";
		else if (typeof comments !== 'string'
			|| Papa.BAD_DELIMITERS.indexOf(comments) > -1)
			comments = false;

		// Newline must be valid: \r, \n, or \r\n
		if (newline != '\n' && newline != '\r' && newline != '\r\n')
			newline = '\n';

		// We're gonna need these at the Parser scope
		var cursor = 0;
		var aborted = false;

		this.parse = function(input, baseIndex, ignoreLastRow)
		{
			// For some reason, in Chrome, this speeds things up (!?)
			if (typeof input !== 'string')
				throw "Input must be a string";

			// We don't need to compute some of these every time parse() is called,
			// but having them in a more local scope seems to perform better
			var inputLen = input.length,
				delimLen = delim.length,
				newlineLen = newline.length,
				commentsLen = comments.length;
			var stepIsFunction = typeof step === 'function';

			// Establish starting state
			cursor = 0;
			var data = [], errors = [], row = [], lastCursor = 0;

			if (!input)
				return returnable();

			if (fastMode || (fastMode !== false && input.indexOf('"') === -1))
			{
				var rows = input.split(newline);
				for (var i = 0; i < rows.length; i++)
				{
					var row = rows[i];
					cursor += row.length;
					if (i !== rows.length - 1)
						cursor += newline.length;
					else if (ignoreLastRow)
						return returnable();
					if (comments && row.substr(0, commentsLen) == comments)
						continue;
					if (stepIsFunction)
					{
						data = [];
						pushRow(row.split(delim));
						doStep();
						if (aborted)
							return returnable();
					}
					else
						pushRow(row.split(delim));
					if (preview && i >= preview)
					{
						data = data.slice(0, preview);
						return returnable(true);
					}
				}
				return returnable();
			}

			var nextDelim = input.indexOf(delim, cursor);
			var nextNewline = input.indexOf(newline, cursor);

			// Parser loop
			for (;;)
			{
				// Field has opening quote
				if (input[cursor] == '"')
				{
					// Start our search for the closing quote where the cursor is
					var quoteSearch = cursor;

					// Skip the opening quote
					cursor++;

					for (;;)
					{
						// Find closing quote
						var quoteSearch = input.indexOf('"', quoteSearch+1);

						if (quoteSearch === -1)
						{
							if (!ignoreLastRow) {
								// No closing quote... what a pity
								errors.push({
									type: "Quotes",
									code: "MissingQuotes",
									message: "Quoted field unterminated",
									row: data.length,	// row has yet to be inserted
									index: cursor
								});
							}
							return finish();
						}

						if (quoteSearch === inputLen-1)
						{
							// Closing quote at EOF
							var value = input.substring(cursor, quoteSearch).replace(/""/g, '"');
							return finish(value);
						}

						// If this quote is escaped, it's part of the data; skip it
						if (input[quoteSearch+1] == '"')
						{
							quoteSearch++;
							continue;
						}

						if (input[quoteSearch+1] == delim)
						{
							// Closing quote followed by delimiter
							row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
							cursor = quoteSearch + 1 + delimLen;
							nextDelim = input.indexOf(delim, cursor);
							nextNewline = input.indexOf(newline, cursor);
							break;
						}

						if (input.substr(quoteSearch+1, newlineLen) === newline)
						{
							// Closing quote followed by newline
							row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
							saveRow(quoteSearch + 1 + newlineLen);
							nextDelim = input.indexOf(delim, cursor);	// because we may have skipped the nextDelim in the quoted field

							if (stepIsFunction)
							{
								doStep();
								if (aborted)
									return returnable();
							}
							
							if (preview && data.length >= preview)
								return returnable(true);

							break;
						}
					}

					continue;
				}

				// Comment found at start of new line
				if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments)
				{
					if (nextNewline == -1)	// Comment ends at EOF
						return returnable();
					cursor = nextNewline + newlineLen;
					nextNewline = input.indexOf(newline, cursor);
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// Next delimiter comes before next newline, so we've reached end of field
				if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1))
				{
					row.push(input.substring(cursor, nextDelim));
					cursor = nextDelim + delimLen;
					nextDelim = input.indexOf(delim, cursor);
					continue;
				}

				// End of row
				if (nextNewline !== -1)
				{
					row.push(input.substring(cursor, nextNewline));
					saveRow(nextNewline + newlineLen);

					if (stepIsFunction)
					{
						doStep();
						if (aborted)
							return returnable();
					}

					if (preview && data.length >= preview)
						return returnable(true);

					continue;
				}

				break;
			}


			return finish();


			function pushRow(row)
			{
				data.push(row);
				lastCursor = cursor;
			}

			/**
			 * Appends the remaining input from cursor to the end into
			 * row, saves the row, calls step, and returns the results.
			 */
			function finish(value)
			{
				if (ignoreLastRow)
					return returnable();
				if (typeof value === 'undefined')
					value = input.substr(cursor);
				row.push(value);
				cursor = inputLen;	// important in case parsing is paused
				pushRow(row);
				if (stepIsFunction)
					doStep();
				return returnable();
			}

			/**
			 * Appends the current row to the results. It sets the cursor
			 * to newCursor and finds the nextNewline. The caller should
			 * take care to execute user's step function and check for
			 * preview and end parsing if necessary.
			 */
			function saveRow(newCursor)
			{
				cursor = newCursor;
				pushRow(row);
				row = [];
				nextNewline = input.indexOf(newline, cursor);
			}

			/** Returns an object with the results, errors, and meta. */
			function returnable(stopped)
			{
				return {
					data: data,
					errors: errors,
					meta: {
						delimiter: delim,
						linebreak: newline,
						aborted: aborted,
						truncated: !!stopped,
						cursor: lastCursor + (baseIndex || 0)
					}
				};
			}

			/** Executes the user's step function and resets data & errors. */
			function doStep()
			{
				step(returnable());
				data = [], errors = [];
			}
		};

		/** Sets the abort flag */
		this.abort = function()
		{
			aborted = true;
		};

		/** Gets the cursor position */
		this.getCharIndex = function()
		{
			return cursor;
		};
	}


	// If you need to load Papa Parse asynchronously and you also need worker threads, hard-code
	// the script path here. See: https://github.com/mholt/PapaParse/issues/87#issuecomment-57885358
	function getScriptPath()
	{
		var scripts = document.getElementsByTagName('script');
		return scripts.length ? scripts[scripts.length - 1].src : '';
	}

	function newWorker()
	{
		if (!Papa.WORKERS_SUPPORTED)
			return false;
		if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
			throw new Error(
				'Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
				'You need to set Papa.SCRIPT_PATH manually.'
			);
		var workerUrl = Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH;
		// Append "papaworker" to the search string to tell papaparse that this is our worker.
		workerUrl += (workerUrl.indexOf('?') !== -1 ? '&' : '?') + 'papaworker';
		var w = new global.Worker(workerUrl);
		w.onmessage = mainThreadReceivedMessage;
		w.id = workerIdCounter++;
		workers[w.id] = w;
		return w;
	}

	/** Callback when main thread receives a message */
	function mainThreadReceivedMessage(e)
	{
		var msg = e.data;
		var worker = workers[msg.workerId];
		var aborted = false;

		if (msg.error)
			worker.userError(msg.error, msg.file);
		else if (msg.results && msg.results.data)
		{
			var abort = function() {
				aborted = true;
				completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
			};

			var handle = {
				abort: abort,
				pause: notImplemented,
				resume: notImplemented
			};

			if (isFunction(worker.userStep))
			{
				for (var i = 0; i < msg.results.data.length; i++)
				{
					worker.userStep({
						data: [msg.results.data[i]],
						errors: msg.results.errors,
						meta: msg.results.meta
					}, handle);
					if (aborted)
						break;
				}
				delete msg.results;	// free memory ASAP
			}
			else if (isFunction(worker.userChunk))
			{
				worker.userChunk(msg.results, handle, msg.file);
				delete msg.results;
			}
		}

		if (msg.finished && !aborted)
			completeWorker(msg.workerId, msg.results);
	}

	function completeWorker(workerId, results) {
		var worker = workers[workerId];
		if (isFunction(worker.userComplete))
			worker.userComplete(results);
		worker.terminate();
		delete workers[workerId];
	}

	function notImplemented() {
		throw "Not implemented.";
	}

	/** Callback when worker thread receives a message */
	function workerThreadReceivedMessage(e)
	{
		var msg = e.data;

		if (typeof Papa.WORKER_ID === 'undefined' && msg)
			Papa.WORKER_ID = msg.workerId;

		if (typeof msg.input === 'string')
		{
			global.postMessage({
				workerId: Papa.WORKER_ID,
				results: Papa.parse(msg.input, msg.config),
				finished: true
			});
		}
		else if ((global.File && msg.input instanceof File) || msg.input instanceof Object)	// thank you, Safari (see issue #106)
		{
			var results = Papa.parse(msg.input, msg.config);
			if (results)
				global.postMessage({
					workerId: Papa.WORKER_ID,
					results: results,
					finished: true
				});
		}
	}

	/** Makes a deep copy of an array or object (mostly) */
	function copy(obj)
	{
		if (typeof obj !== 'object')
			return obj;
		var cpy = obj instanceof Array ? [] : {};
		for (var key in obj)
			cpy[key] = copy(obj[key]);
		return cpy;
	}

	function bindFunction(f, self)
	{
		return function() { f.apply(self, arguments); };
	}

	function isFunction(func)
	{
		return typeof func === 'function';
	}
})(typeof window !== 'undefined' ? window : this);
