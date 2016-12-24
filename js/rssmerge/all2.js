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
function proc_show2(name){
	var a=_getid(name);
	if(!a)return;
	if(a.style.display=='') a.style.display='none';
	else a.style.display='';
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
  domain=".overbits.net";
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

function cutstring(s,len){
function isunicode(el) {
    return (escape(el).search(/%u/i) == -1 ? false : true );
}
	var k=0;
	for (var i = 0 ; i < s.length ; i++) {
		if (isunicode(s[i])) k=k+2;
		else k=k+1
		if (k >= len) {
			return s.substr(0,i)+"...";
		}
	}	
	return s;
}

var ajaxBox_offsetX=0;var ajaxBox_offsetY=0;var ajax_list_externalFile="ajaxlist.php";var minimumLettersBeforeLookup=1;var ajax_list_objects=new Array();var ajax_list_cachedLists=new Array();var ajax_list_activeInput=false;var ajax_list_activeItem;var ajax_list_optionDivFirstItem=false;var ajax_optionDiv=false;var ajax_optionDiv_iframe=false;var ajax_list_MSIE=false;var ajax_list_Safari=false;if(navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Opera")<0){ajax_list_MSIE=true}if(navigator.userAgent.indexOf("Safari")>=0){ajax_list_Safari=true}var currentListIndex=0;function ajax_getTopPos(a){var b=a.offsetTop;while((a=a.offsetParent)!=null){b+=a.offsetTop}return b}function ajax_list_cancelEvent(){return false}function ajax_getLeftPos(a){var b=a.offsetLeft;while((a=a.offsetParent)!=null){b+=a.offsetLeft}return b}function ajax_option_setValue(c,b){if(!b){b=this}var a=b.innerHTML;if(ajax_list_MSIE){a=b.innerText}else{a=b.textContent}if(!a){a=b.innerHTML}db=a;ajax_list_activeInput.value=a;if(document.getElementById(ajax_list_activeInput.name+"_hidden")){document.getElementById(ajax_list_activeInput.name+"_hidden").value=b.id}ajax_options_hide();if(window.proc_search){proc_search()}}function ajax_option_setValue2(c,b){if(!b){b=this}var a=b.innerHTML;if(ajax_list_MSIE){a=b.innerText}else{a=b.textContent}if(!a){a=b.innerHTML}db=a;ajax_list_activeInput.value=a;if(document.getElementById(ajax_list_activeInput.name+"_hidden")){document.getElementById(ajax_list_activeInput.name+"_hidden").value=b.id}}function ajax_options_hide(){if(ajax_optionDiv){ajax_optionDiv.style.display="none"}if(ajax_optionDiv_iframe){ajax_optionDiv_iframe.style.display="none"}}function ajax_options_rollOverActiveItem(a,b){if(ajax_list_activeItem){ajax_list_activeItem.className="optionDiv"}a.className="optionDivSelected";ajax_list_activeItem=a;if(b){if(ajax_list_activeItem.offsetTop>ajax_optionDiv.offsetHeight){ajax_optionDiv.scrollTop=ajax_list_activeItem.offsetTop-ajax_optionDiv.offsetHeight+ajax_list_activeItem.offsetHeight+2}if(ajax_list_activeItem.offsetTop<ajax_optionDiv.scrollTop){ajax_optionDiv.scrollTop=0}}}function ajax_option_list_buildList(f,b){if(tricktimer==null){return}ajax_optionDiv.innerHTML="";ajax_list_activeItem=false;if(ajax_list_cachedLists[b][f.toLowerCase()].length<=1){ajax_options_hide();return}ajax_list_optionDivFirstItem=false;var d=false;for(var c=0;c<ajax_list_cachedLists[b][f.toLowerCase()].length;c++){if(ajax_list_cachedLists[b][f.toLowerCase()][c].length==0){continue}d=true;var e=document.createElement("DIV");var a=ajax_list_cachedLists[b][f.toLowerCase()][c].split(/###/gi);if(ajax_list_cachedLists[b][f.toLowerCase()].length==1&&ajax_list_activeInput.value==a[0]){ajax_options_hide();return}e.innerHTML=a[a.length-1];e.id=a[0];e.className="optionDiv";e.onmouseover=function(){ajax_options_rollOverActiveItem(this,false)};e.onclick=ajax_option_setValue;if(!ajax_list_optionDivFirstItem){ajax_list_optionDivFirstItem=e}ajax_optionDiv.appendChild(e)}if(d){ajax_optionDiv.style.display="block";if(ajax_optionDiv_iframe){ajax_optionDiv_iframe.style.width=(ajax_optionDiv.offsetWidth)+"px";ajax_optionDiv_iframe.style.height=(ajax_optionDiv.offsetHeight)+"px";ajax_optionDiv_iframe.style.display=""}}}function ajax_option_list_showContent(b,f,a,e){if(e!=currentListIndex){return}var c=ajax_list_objects[b].response;var d=c.split("|");ajax_list_cachedLists[a][f.toLowerCase()]=d;ajax_option_list_buildList(f,a)}function ajax_option_resize(a){ajax_optionDiv.style.top=(ajax_getTopPos(a)+a.offsetHeight+ajaxBox_offsetY)+"px";ajax_optionDiv.style.left=(ajax_getLeftPos(a)+ajaxBox_offsetX)+"px";if(ajax_optionDiv_iframe){ajax_optionDiv_iframe.style.left=ajax_optionDiv.style.left;ajax_optionDiv_iframe.style.top=ajax_optionDiv.style.top}}function ajax_showOptions(a,c,n){if(n==13||n==9||n==229){return}if(n>=37&&n<=40){return}if(!ajax_list_cachedLists[c]){ajax_list_cachedLists[c]=new Array()}if(!ajax_optionDiv){ajax_optionDiv=document.createElement("DIV");ajax_optionDiv.id="ajax_listOfOptions";document.body.appendChild(ajax_optionDiv);ajax_optionDiv_iframe=document.createElement("IFRAME");ajax_optionDiv_iframe.border="0";ajax_optionDiv_iframe.style.width=ajax_optionDiv.clientWidth+"px";ajax_optionDiv_iframe.style.height=ajax_optionDiv.clientHeight+"px";ajax_optionDiv_iframe.id="ajax_listOfOptions_iframe";document.body.appendChild(ajax_optionDiv_iframe);ajax_optionDiv_iframe.style.width=a.style.width;ajax_options_hide();var j=document.getElementsByTagName("INPUT");for(var m=0;m<j.length;m++){if(!j[m].onkeyup){j[m].onfocus=ajax_options_hide}}var g=document.getElementsByTagName("SELECT");for(var m=0;m<g.length;m++){g[m].onfocus=ajax_options_hide}var i=document.body.onkeydown;if(typeof i!="function"){document.body.onkeydown=ajax_option_keyNavigation}else{document.body.onkeydown=function(){i();ajax_option_keyNavigation()}}var f=window.onresize;if(typeof f!="function"){window.onresize=function(){ajax_option_resize(a)}}else{window.onresize=function(){f();ajax_option_resize(a)}}}if(a.value.length<minimumLettersBeforeLookup){ajax_options_hide();return}ajax_optionDiv.style.top=(ajax_getTopPos(a)+a.offsetHeight+ajaxBox_offsetY)+"px";ajax_optionDiv.style.left=(ajax_getLeftPos(a)+ajaxBox_offsetX)+"px";if(ajax_optionDiv_iframe){ajax_optionDiv_iframe.style.left=ajax_optionDiv.style.left;ajax_optionDiv_iframe.style.top=ajax_optionDiv.style.top}ajax_list_activeInput=a;ajax_optionDiv.onselectstart=ajax_list_cancelEvent;currentListIndex++;var b=0;for(x in ajax_list_cachedLists[c]){b++}if(b>20){for(x in ajax_list_cachedLists[c]){delete ajax_list_cachedLists[c][x];break}}if(ajax_list_cachedLists[c][a.value.toLowerCase()]){ajax_option_list_buildList(a.value,c,currentListIndex)}else{var e=window.navigator.language||window.navigator.userLanguage||"en";var h=a.value;var d="";var l=d+h;$.ajax({type:"get",dataType:"json",url:"http://suggestqueries.google.com/complete/search?output=json&client=chrome&hl="+e+"&q="+encodeURIComponent(l)+"&callback=?",success:function(p){var o=[];if(p[1]){for(var k=0;k<p[1].length;k++){l=p[1][k];if(l.indexOf("http://")!=0&&l.indexOf("https://")!=0){o.push("###"+l);if(o.length>10){break}}}}else{return}ajax_list_cachedLists[c][h.toLowerCase()]=o;ajax_option_list_buildList(h,c)},error:function(){}})}}function ajax_option_keyNavigation(b){if(document.all){b=event}if(!ajax_optionDiv){return}if(ajax_optionDiv.style.display=="none"){return}function a(){if(navigator.userAgent.indexOf("Firefox")>=0){if(b.preventDefault){b.preventDefault();b.stopPropagation()}else{b.returnValue=false;b.cancelBubble=true}}}if(b.keyCode==38){a();if(!ajax_list_activeItem){return}if(ajax_list_activeItem&&!ajax_list_activeItem.previousSibling){return}ajax_options_rollOverActiveItem(ajax_list_activeItem.previousSibling,true);ajax_option_setValue2(false,ajax_list_activeItem)}if(b.keyCode==40){a();if(!ajax_list_activeItem){ajax_options_rollOverActiveItem(ajax_list_optionDivFirstItem,true)}else{if(!ajax_list_activeItem.nextSibling){return}ajax_options_rollOverActiveItem(ajax_list_activeItem.nextSibling,true)}ajax_option_setValue2(false,ajax_list_activeItem)}if(b.keyCode==13){}if(b.keyCode==27){ajax_options_hide()}}document.documentElement.onclick=autoHideList;function autoHideList(a){if(document.all){a=event}if(a.target){source=a.target}else{if(a.srcElement){source=a.srcElement}}if(source.nodeType==3){source=source.parentNode}if(source.tagName.toLowerCase()!="input"&&source.tagName.toLowerCase()!="textarea"){ajax_options_hide()}};


/*Main*/
function setstorage(name,value){
	if (window.localStorage){
		localStorage[name]=value+'';
	}else{
		setCookie(name, value, 1000*60*60*24*365*10); 
	}
}

function getstorage(name){
	var s;
	if (window.localStorage){
		s=localStorage[name];
	}else{
		s=getCookie(name);
	}
	return s;
}
function proc_addevent(obj,name,func){
	if (obj.addEventListener){
		obj.addEventListener(name, func, false);
	}else if (obj.attachEvent){
		obj.attachEvent("on"+name, func);
	}
}

function getparam(s,name){
	name=name+"=";
	name=name.toLowerCase();
	var p1=s.toLowerCase().indexOf(name);
	if (p1<0) return "";
	s=s.substr(p1+name.length);
	var p2=s.toLowerCase().indexOf("&");
	if (p2>=0) {
		return s.substr(0,p2);
	} else {
		return s;
	}
}	

function _decodeURI(s){
	var s1=s;
	try{
		s1=decodeURIComponent(s);
	}catch(err){}
	return s1;
}

var ischrome=false;
var isgecko=false;
var isopera=false;
var ismsie=false;
var iswebkit=false;
if (navigator.appName=="Netscape"){
	if (navigator.userAgent.indexOf("Chrome")>=0) ischrome=true;
	if (navigator.userAgent.indexOf("Gecko")>=0) isgecko=true;
	if (navigator.userAgent.indexOf("WebKit")>=0) iswebkit=true;	
} else {
	if (navigator.userAgent.indexOf("Opera")>=0) isopera=true;
	if (navigator.userAgent.indexOf("MSIE")>=0) ismsie=true;
}
var isfirefox=isgecko && !ischrome && !iswebkit;
function addspace(s){
	s=s.split("")
	var k=0;
	for(var i=0; i<s.length; i++){
		if(s[i]==" ")k=0;
		else k++;
		if(k>80){
			s[i]=s[i]+" ";
			k=0;
		}
	}
	return s.join("");
}
function html_entity_decode(str){
  str = str.replace(/&gt;/gi, ">");
  str = str.replace(/&lt;/gi, "<");
  str = str.replace(/&quot;/gi, "\"");
  str = str.replace(/&#039;/gi, "'").replace(/&#39;/gi, "'").replace(/&#44;/gi, ",").replace(/&#34;/gi, '"');
  str = str.replace(/&amp;/gi, "&");  
  return str;
}
function getWindowHeight(){
	//http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
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
function regex_decode(str){
  str = str.replace(/\\/gi, "\\\\");
  str = str.replace(/\^/gi, "\\^");
  str = str.replace(/\$/gi, "\\$");
  str = str.replace(/\*/gi, "\\*");
  str = str.replace(/\+/gi, "\\+");
  str = str.replace(/\?/gi, "\\?");
  str = str.replace(/\./gi, "\\.");
  str = str.replace(/\(/gi, "\\(");
  str = str.replace(/\)/gi, "\\)");
  str = str.replace(/\|/gi, "\\|");
  str = str.replace(/\{/gi, "\\{");
  str = str.replace(/\}/gi, "\\}");
  str = str.replace(/\[/gi, "\\[");		
  str = str.replace(/\]/gi, "\\]");
  return str;
}
function getOffset(b,e) {
    var a = 0;
    var c = 0;

    while (b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop)) {
        a += b.offsetLeft;
        c += b.offsetTop;
        b = b.offsetParent;
    }

    if (e) {
    	b2=e.target;
    	while (b2 && !isNaN(b2.scrollLeft) && !isNaN(b2.scrollTop)) {
    		if (b2==document.body) break;
      	  	a = a-b2.scrollLeft;
      	  	c = c-b2.scrollTop;
			if (b2.parentElement) b2=b2.parentElement;
			else b2=b2.parentNode;
    	}
    }
       
    return {
        left: a,
        top: c
    }
}
function striptags(s){
	if(!s) s="";
	var a=_getid("divtags");
	a.innerHTML=s;
	return a.textContent || a.innerText || "";
}
function isurl_links(s) {
	var regexp = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+([a-z]{2,6}|[0-9]{1,6})/i;	
	return regexp.test(s);
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

///////////////////////////////////////////////////////////////////
/////Suggestions
///////////////////////////////////////////////////////////////////
	if(ischrome) ajaxBox_offsetX=1;
   var db = "";
   var tricktimer=null;
   function trick() {
	   var b;
	  if(document.f1) b=document.f1.rssquery;
	  else b=_getid("rssquery");
	  if(!b) return;
	  if (db != b.value) {
		  ajax_showOptions(b,'getCountriesByLetters',0);
		  db = b.value;
	  }
   }	   
   
   function keydown_safari(event){  
  	  	 if (event.keyCode==38) {
   	  	 	return false;
  	  	 }
   }
   function trickstart(event){
   	  if ((event.keyCode==13) || (event.keyCode >=35 && event.keyCode<=40)) {
   	  	 clearInterval(tricktimer);
   	  	 tricktimer=null;   	  	   	  	    	  	
   	  	 return;
   	  }
   	  if(event.keyCode==27) {
   	  	 ajax_options_hide();
   	  }
   	  if (tricktimer!=null) return;  	  
     tricktimer=setInterval("trick()", 110);       
   }
   
	function autocomp_onkeyup(evt){
		var evt2=evt;
		if (ajax_list_MSIE) evt2=event;
		//if ((ajax_list_MSIE) || (ajax_list_Safari))
		trickstart(evt2);
	}
	
	function autocomp_onkeydown(evt){
		if (ajax_list_Safari) return keydown_safari(evt);
	}
	
	function autocomp_onkeypress(evt){
		if ((!ajax_list_MSIE) && (!ajax_list_Safari)) trickstart(evt);
	}

	function proc_setautocomp() {
		var b;
	  if(document.f1) b=document.f1.rssquery;
	  else b=_getid("rssquery");
	  if (!b) return;
      if(true){	
      		b.onkeyup=autocomp_onkeyup;
      		b.onkeydown=autocomp_onkeydown;
      		b.onkeypress=autocomp_onkeypress;
      		b.setAttribute("autocomplete", "off");
      }else{
      		b.onkeyup=null;
      		b.onkeydown=null;
      		b.onkeypress=null;
      		b.setAttribute("autocomplete", "on");
   	  	 	clearInterval(tricktimer);
   	  	 	tricktimer=null;   	  	   	  	    	  	
      }      
	}
///////////////////////////////////////////////////////////////////


function openWindow(url, name, w, h) {
  var winX = 0;
  var winY = 0;
  if (parseInt(navigator.appVersion) >= 4) {
    winX = (screen.availWidth - w)*.5;
    winY = (screen.availHeight - h)*.5;
  }
  var features = 'width=' + w + ',height=' + h + ',left=' + winX + ',top=' + winY +', resizable=yes, scrollbars=yes';
  window.open(url, name, features);
}

function proc_opensetting(){
	if(!window.JSON || !window.localStorage){
		alert("Your browser is not supported.");
		return;
	}
	openWindow("setting.php","",550,290);
}
function proc_opennmsoft(){
	if(!window.JSON || !window.localStorage){
		alert("Your browser is not supported.");
		return;
	}
	openWindow("http://rssmerge.nmsoft.net/userdata.php","",550,290);
}

function show_onoff(name){
	var a=_getid(name);
	if(a.style.display=="") 
		a.style.display="none";
	else{		
		a.style.display="";
		if(name=='filters'){
			var a=_getid('filterquery');
			a.focus();
			a.select();
		}else if(name=='divhelp'){
			var data=proc_optdata();
			var a=document.getElementsByTagName('*');
			for(var i = 0; i < a.length; i++){    
				if(a[i].id && a[i].id.indexOf("opt_")==0){	
					if(a[i].type=='checkbox'){
						a[i].checked=data[a[i].id];
						a[i].onclick=function(){proc_setopt(this);}
					}
				}
			}
		}
	}
}

function getextension(s){
	var arr=(s || '').split('.');
	if(arr.length>1) return arr[arr.length-1].toLowerCase();
	else return '';
}

function _getfrmdoc(ifrm){
	return (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
}
var g_mediasupport=null;
function proc_testmedia(){
	if(g_mediasupport==null){
		var a= document.createElement("audio");
		a=!!(a && a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, '') && a.canPlayType('audio/mp4;').replace(/no/, ''));
		var b= document.createElement("video");		
		b=!!(b && b.canPlayType && b.canPlayType('video/mp4;').replace(/no/, ''));		
		g_mediasupport={audio: a, video: b, audio2: a};
	}
	return g_mediasupport;
}
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

function _striptags(a,d){a||(a="");return a.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,"").replace(/\x3c!--(.*)--\x3e/g,"").replace(/&lt;!--(.*)--&gt;/g,"")}function _cutstring(a,d){a||(a="");for(var c=0,b=0;b<a.length;b++)if(c++,c>=d&&(" "==a.substr(b,1)||b==a.length-1))return a.substr(0,b)+"...";return a}function _clean(a){a||(a="");return a.replace(/<(script|style)\b[^<]*(?:(?!<\/(script|style)>)<[^<]*)*<\/(script|style)>/gi,"")}function _trim(a){return a.replace(/^\s*|\s*$/g,"")}
function _cutstring2(a,d){a||(a="");for(var c=0,b=0;b<a.length;b++)if(c=-1!=escape(a[b]).search(/%u/i)?c+2:c+1,c>=d)return a.substr(0,b)+"...";return a};

///////////////////////////////////////////////////////////////////
/////Common
///////////////////////////////////////////////////////////////////
var gcontentstyle="button.ksc{position:absolute;left:-1000px;width:0px;}body,table,td,span,button,select{font-size:13px;font-family:"+g_ui_font+"}A:link{color:#0860a8;text-decoration:none}A:visited{color:#0860a8;text-decoration:none}A:active{color:#0860a8;text-decoration:underline}A:hover{color:#0860a8;text-decoration:underline}h1,h2,h3,h4,h5,h6{color:#b40404;margin-top:10px;margin-bottom:5px}A:link{text-decoration:underline}A:visited{color:purple;text-decoration:underline}A:active{text-decoration:underline}A:hover{text-decoration:underline}pre{white-space:pre-wrap}A.showcontent{font-size:16px}A.showcontent:visited{color:#0860a8 !important}A.showcontent2{font-size:15px}A.showcontent2:visited{color:#0860a8 !important}";
function proc_set_clock(isfirst){
	var lang=_getid("clock_language").value;
	if (!lang){
		lang="";
	}
	lang=lang.replace('lang_', '');

	setCookie(g_lang_cookie_name,lang);
	var q=getparam(location.href,"q");
	var tag=getparam(location.href,"tag");
	var s="?lang="+lang;
	if(q) s+="&q="+q;
	if(tag) s+="&tag="+tag;
	location.href=s;
}

function init_language(){
	/*var lang=window.navigator.language;
	if (!lang) lang=window.navigator.userLanguage;
	if (!lang) lang="en";	*/
	var a=_getid("clock_language");
	if(a){
		a.value="lang_"+g_lang;
		if (!a.value) _getid("clock_language").value="lang_en";
	}
}

var g_jobs={};
var blockimg="feedburner.com|feedsportal.com|gravatar.com|photo.gif|.mp4|.avi|.mp3|.flv|.m4a|.m4v|images.fandango|javascript:".split("|");
var g_default_img="images/article2.png";
var g_default_img2="images/articlephoto.png";
function isblockimg(imgurl){
	if(!imgurl) return;
	imgurl=imgurl.toLowerCase();
	for (var i = 0; i < blockimg.length; i++) {
		if(imgurl.indexOf(blockimg[i])>=0){
			return true;
		}
	}
}
function proc_imgerr(f,idx){
	f.onerror=null;
	f.src=g_default_img;
	if(idx!=undefined && g_feeds[idx]) g_feeds[idx].defaultimg=true;
}
function proc_imgload(f,idx){
	var w=f.naturalWidth;
	var h=f.naturalHeight;
	if(w && h){
		if( w<=30 || h<=30 || w>2000 || h>2000 || (getextension(f.src)=='gif' && (w>300 || h>300)) ){
			f.onload=null;
			f.onerror=null;
			f.src=g_default_img;
			if(idx!=undefined && g_feeds[idx]) g_feeds[idx].defaultimg=true;
		}
	}
	/*var newImg = new Image();
	newImg.onload = function(){
		if(newImg.width<=30 || newImg.height<=30){
			f.onload=null;
			f.onerror=null;
			f.src=g_default_img;
		}
    }
    newImg.src=f.src;*/
}

function proc_feed(surl,uniqid,jobname,cdata,jobobj,callback,retry){
	function parse(data){
		//console.log(data);
		var source=data.feed.title;
		if(!source) source="";
		source=html_entity_decode(source);

		var sourcelink=data.feed.link;
		if(!sourcelink) sourcelink="";
		if(jobobj) jobobj.source=source;
		else g_jobs[jobname].source=source;

		var sn,imgurl,audiourl,videourl,geopoint,s1,imgs,duration;

		function checkmedia(type,url,onlyimg){
			if(!url) return;
			if(!type) type="";type=type.toLowerCase();
			if(onlyimg){
				if(type.indexOf("image/")>=0) imgurl=url;
				if(!imgurl && /(\.jpg|\.jpeg|\.png)($|\?)/i.test(url)) imgurl=url;
				return;
			}
			if(type.indexOf("audio")>=0 || type.indexOf("mp3")>=0){
				audiourl=url;
			}else if(type.indexOf("video")>=0){
				videourl=url;
			}
			if(!audiourl && /(\.mp3)($|\?)/i.test(url)) audiourl=url;
			if(!videourl && /(\.mp4|\.m4v)($|\?)/i.test(url)) videourl=url;
		}

		for (var i = 0; i < data.feed.entries.length; i++) {
            var entry = data.feed.entries[i];
			if(!entry.title) continue;
			if(!entry.link) entry.link="";
			var rl=feed_remove_redirect(entry.link);
			if(rl) entry.link=rl;

			entry.title=entry.title.replace(/&amp;nbsp;/g,"&nbsp;");
			if(/^\//i.test(entry.link)){
				s=trim(sourcelink);
				if(s.lastIndexOf("/")==s.length-1) s=s.substr(0,s.length-1);
				entry.link=s+entry.link;
			}
			
			if(!entry.content) entry.content="";			
			sn=entry.contentSnippet;
			if(!sn) sn="";
			sn=sn.replace(/<!--(.*)-->/g,"");
			sn=sn.replace(/&lt;!--(.*)--&gt;/g,"");			
			
			geopoint="";
			//entry.xmlNode=$.parseXML('<rss><lat>55</lat><long>55</long></rss>');
			if(entry.xmlNode){
				function findcontent(name){
					var s1;
					var a=entry.xmlNode.getElementsByTagName(name);
					if(a && a[0]){
						s1=a[0].textContent || a[0].text;						
						if(s1 && /(\<iframe )/i.test(s1)){
							entry.content=s1;
							return true;
						}
						if(a[0].firstChild){
							s1=a[0].firstChild.innerHTML;
							if(s1 && /(\<iframe )/i.test(s1)){
								entry.content=s1;
								return true;
							}
						}
					}
				}
				s1=findcontent("description") || findcontent("encoded") || findcontent("content:encoded") || findcontent("content");
				if(entry.link.indexOf("cmgdigital.com")>=0){
					var a=entry.xmlNode.getElementsByTagName("link");
					if(a && a[0]){
						s1=a[0].textContent || a[0].text;						
						if(s1 && entry.link!=s1 && isurl_links(s1)) entry.link=s1;
					}
				}
				var latnode = entry.xmlNode.getElementsByTagName("lat");
				var longnode = entry.xmlNode.getElementsByTagName("long");
				if(latnode && latnode[0] && (latnode[0].textContent || latnode[0].text) && longnode && longnode[0] && (longnode[0].textContent || longnode[0].text)){
					geopoint=(latnode[0].textContent || latnode[0].text)+" "+(longnode[0].textContent || longnode[0].text);
				}
			}

			imgurl="";audiourl="";videourl="";imgs="";

			var a=entry.mediaGroups;
			if(a && a.length>0 && a[0].contents && a[0].contents.length>0){
				var c=a[0].contents[0];
				var t=c.thumbnails;
				if(t && t.length>0){
					imgurl=t[0].url;
				}
				if(!imgurl){
					if(c.type) checkmedia(c.type,c.url,true);
					else imgurl=c.url;
					if(imgurl && ((c.width && c.width>1000) || (c.height && c.height>1000))){
						imgs=imgurl;
						imgurl=g_default_img2;
					}
				}
				checkmedia(c.type,c.url);
				if(!imgs){
					for(var j = 0; j < a[0].contents.length; j++){
						c=a[0].contents[j];
						if(c.type && c.type.indexOf("image/")>=0){imgs=c.url;break;}
					}
				}
			}
			if(entry.xmlNode){
				var a=entry.xmlNode.getElementsByTagName("enclosure");
				if(a){
					if(!imgurl && a[0]){
						checkmedia(a[0].getAttribute("type"),a[0].getAttribute("url"),true);
						if(imgurl) imgs=imgurl;
						if(imgurl && a[0].getAttribute("length")>1000000) imgurl=g_default_img;
					}
					for (var j=0; j<a.length; j++) {
						checkmedia(a[j].getAttribute("type"),a[j].getAttribute("url"));
						if(audiourl || videourl) break;
					}
				}
			}			
			if(isblockimg(imgurl)) imgurl="";
			if(!imgurl && entry.content){
				var match=entry.content.match(/<img (.*?)src=('|")(.*?)('|")/i);
				if(match && match.length>3) imgurl=match[3];
			}
			if(!imgurl || isblockimg(imgurl)){				
				imgurl=g_default_img;
			}			
			var ytcode;
			if(entry.link){
				if(!audiourl && /(\.mp3)($|\?)/i.test(entry.link)) audiourl=entry.link;
				if(!videourl && /(\.mp4|\.m4v)($|\?)/i.test(entry.link)) videourl=entry.link;			
				if(/^http(s)?:\/\/((www.)?youtube.com\/watch\?v=|youtu.be\/)/i.test(entry.link)) ytcode=getparam(entry.link,"v");
			}			
			/*if(!ytcode && entry.content){
				var match=entry.content.match(/src=(\'|\")http:\/\/img.youtube.com\/vi\/(.*?)\/0.jpg(\'|\")/i);
				if(match && match.length>2) ytcode=match[2];
			}*/
			if(ytcode) entry.content='<iframe width="640" height="360" src="//www.youtube.com/embed/'+ytcode+'" frameborder="0" allowfullscreen></iframe><p></p>'+entry.content;
			if(imgs && entry.content.indexOf(imgs)<0) entry.content='<div style="width:'+(g_rsswidth-10)+'px"><img src="'+imgs+'"></div>'+entry.content;
			duration='';
			if((audiourl || videourl) && entry.xmlNode){
				var a=entry.xmlNode.getElementsByTagName("duration");
				if(!a || !a[0]) a=entry.xmlNode.getElementsByTagName("itunes:duration");
				if(a && a[0]){
					duration=a[0].textContent || (a[0].firstChild && a[0].firstChild.nodeValue);
				}
			}

			var c={};
			c.title=html_entity_decode(entry.title);
			c.link=entry.link;
			c.content=entry.content;
			c.contentsnippet=sn;
			c.pubdate=new Date(entry.publishedDate);
			if(!c.pubdate || isNaN(c.pubdate)){
				//Wed, 12 Oct 2016 20:07:31 -05:00
				s1=trim((entry.publishedDate || '').replace(/ (\+|-)(.*?)( |$)/,' '));
				c.pubdate=new Date(s1);
			}
			c.source=source;
			c.sourcelink=sourcelink;
			c.geopoint=geopoint;
			c.imgurl=imgurl;		
			c.audiourl=audiourl;
			c.videourl=videourl;
			c.duration=duration;
			c.jobname=jobname;
			
			if(jobobj) jobobj.list.push(c);
			else g_jobs[jobname].list.push(c);
		}				
	}

	var resurl=surl;
	if(!retry) retry=0;

	function getuniq(){
		var today=feed_get_today();		
		if(retry==0) return today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate()+""+Math.floor(today.getHours()/2);
		else return today.getTime();
	}

	var maxnum=parseInt(cdata.maxnum);
	if(!maxnum || isNaN(maxnum)) maxnum=20;
	if(maxnum<5) maxnum=5;
	if(maxnum>g_rssmaxnum) maxnum=g_rssmaxnum;

	function _complete(){
		if(jobobj){
			if(callback) callback();
		}else{
			g_jobs[jobname].complete=true;
		}			
	}
	
		var opt={
			url:surl, max:maxnum, cdata:cdata,
			check:function(){
				if(g_jobs["id"]==uniqid || jobobj) return true;
				else return;
			},
			success:function(data){
				try{parse(data);}catch(err){}
				_complete();
			},
			error:function(){
				_complete();
			}
		};
	
	if(_twitter({'url':surl,'checkid':true})){
		_twitter(opt);
		return;	
	}else if(_gplus({'url':surl,'checkid':true})){
		_gplus(opt);
		return;
	}else 	if(cdata && cdata.query && surl.toLowerCase().indexOf("{userquery}")>=0){
		surl=surl.replace(/{userquery}/gi,encodeURIComponent(cdata.query));
		//if(surl.indexOf("?")<0) surl+="?";//surl+="&t="+getuniq();
		_getfeed({
			url:surl, max:maxnum, 
			check:function(){
				if(g_jobs["id"]==uniqid || jobobj) return true;
				else return;
			},
			success:function(data){
				try{parse(data);}catch(err){}
				_complete();
			},
			error:function(){
				_complete();
			}
		});
		return;
	}

	var feed = new google.feeds.Feed(surl);
	if(cdata.historical) feed.includeHistoricalEntries();
	feed.setNumEntries(maxnum);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);	
	//feed.setResultFormat(google.feeds.Feed.XML_FORMAT);		
	feed.load(function(data) {
		if(g_jobs["id"]==uniqid || jobobj){
	        if(!data.error){
				try{parse(data);}catch(err){}
			}else{
				if(retry<=3){
					retry++;
					setTimeout(function(){
						proc_feed(resurl,uniqid,jobname,cdata,jobobj,callback,retry);
					},100);
					return;
				}
			}
			_complete();
		}else{
			//console.log("aborted: "+jobname);
		}
	});
}

///////////////////////////////////////////////////////////////////
////Favorite
///////////////////////////////////////////////////////////////////
var g_history_default="default";

function get_history(){
	var s=getstorage("c_rss_history");
	if (!s) s="{}";
	var a={};
	try{
		a=JSON.parse(s);
	}catch(err){
		a={};
	}
	if(!a) a={};
	if(!a[g_history_default]) a[g_history_default]=[];
	return a;
}
function set_history(hdata){
	if(window.JSON) setstorage("c_rss_history",JSON.stringify(hdata));
}
function proc_add(isedit){
	if (!window.JSON){
		alert("This browser does not support.");
		return;
	}

	var rssurl=trim(_getid("rssurl").value);
	if(!rssurl){
		alert(msg_enterrssurls);
		return;
	}

	var hdata=get_history();
	var a=hdata[g_history_default];
	if (a.length>50){
		alert('You can not add anymore.\nThe maximum possible number is 50.');
		return;
	}

	if(isedit){
		for(var i = 0; i <= a.length-1; i++){
			if(a[i].id==g_edit_id){
				var answer=confirm("Save to \""+a[i].name+"\"\n\n"+msg_areyousure);
				if(!answer) break;
				get_options(a[i]);
				a[i].url=[];
				var d=rssurl.split("\n");
				for(var j = 0; j <= d.length-1; j++){
					var f={};
					f.url=d[j];
					a[i].url.push(f);
				}
				set_history(hdata);
				show_message(msg_savedsucc);				
				break;
			}
		}
		return;
	}
	
	var name=getstorage("c_rss_lasyhname");
	if(!name) name="";
	var gls;

	if(g_jobs && g_jobs["job0"] && g_jobs["job0"].source) gls=g_jobs["job0"].source;
	if(gls) name=gls;
	name=prompt(msg_entername,name);	
	if(!name) return;
	if(!gls) setstorage("c_rss_lasyhname",name);
	/*while(true){
		name=prompt("Enter a name.",name);
		if(!name) return;		
		var flag=false;
		for(var i = 0; i <= a.length-1; i++){
			if (a[i].name==name){
				flag=true;
				break;
			}
		}
		if(flag){
			alert('same name exit.');
		}else{
			break;
		}
	}*/
	var c={};
	get_options(c);
	c.id=(new Date()).getTime();
	c.name=name;
	c.url=[];
	var d=rssurl.split("\n");
	for(var i = 0; i <= d.length-1; i++){
		var f={};
		f.url=d[i];
		c.url.push(f);
	}
	a.push(c);
	
	set_history(hdata);

	var optn = document.createElement("OPTION");
	optn.value=c.id;
	optn.appendChild(document.createTextNode(c.name));		         
	var cc=_getid("sel_history");
	cc.appendChild(optn);		   
	
	for(var i=cc.options.length-1;i>=0;i--){
		if(cc.options[i].selected) cc.options[i].selected=false;
	}
	cc.selectedIndex=cc.options.length-1;

	_getid("btn_edit").disabled=false;
	_getid("btn_rename").style.display="";
	_getid("labelcurrent").innerHTML=henc(cutstring(c.name,g_title_length));
	g_edit_id=c.id;
	//_getid("btn_edit").disabled=true;
	//_getid("labelcurrent").innerHTML="";

	proc_history_show(true);
}
function proc_rename(){
	var hdata=get_history();
	var a=hdata[g_history_default];

	for(var i = 0; i <= a.length-1; i++){
		if(a[i].id==g_edit_id){
			var name=a[i].name;
			name=prompt(msg_entername,name);
			if(!name) return;
			setstorage("c_rss_lasyhname",name);
			a[i].name=name;
			set_history(hdata);
			
			var cc=_getid("sel_history");
			for(var j=cc.options.length-1;j>=0;j--){
				if(cc.options[j].value==a[i].id){
					cc.options[j].text=name;
					break;
				}
			}
			_getid("labelcurrent").innerHTML=henc(cutstring(name,g_title_length));
			show_message(msg_renamedsucc);			
			break;
		}
	}
}
function proc_displayhistory(isfirst,f,e){
	if (!window.JSON){
		if(!f) alert("This browser does not support.");
		return;
	}
var mu=_getid('btn_moveup');
var md=_getid('btn_movedn');
if(f){
	if(!e) e=window.event;
	if(!e) return;
	if(e.keyCode==40){
		var c=_getid("sel_history");
		c.focus();
		if(c.options.length>0){
			setTimeout(function(){
				c.selectedIndex=0;
			},10);
		}		
    	if (e.preventDefault) {e.preventDefault(); e.stopPropagation();}
		else {e.returnValue = false; e.cancelBubble = true;}		
		return;
	}
	var s=trim(f.value);
	g_favquery=s;
	if(!s){
		proc_displayhistory();
		return;
	}	
	var qarr=[];
	var s1=s.split(" ");
	for (var  j= 0; j < s1.length; j++) {
		s1[j]=trim(s1[j]);
		if (!s1[j]) continue;
		var a={};
		a.word=s1[j].toLowerCase();
		qarr.push(a);
	}
	mu.disabled=true;
	md.disabled=true;
}else{
	mu.disabled=false;
	md.disabled=false;
}
	var hdata=get_history();
	var a=hdata[g_history_default];

	var c=_getid("sel_history");
	for(var i=c.options.length-1;i>=0;i--){
		c.remove(i);
	}	
	var s3;
	for(var i = 0; i <= a.length-1; i++){
		if(f){
			s3=(a[i].name || "").toLowerCase();
			var flag=true;
			for (var  j= 0; j < qarr.length; j++) {
				if (s3.indexOf(qarr[j].word) < 0){
					flag=false;
					break;
				}
			}
			if (!flag) continue;
		}
		var optn = document.createElement("OPTION");
		optn.value=a[i].id;
		optn.appendChild(document.createTextNode(a[i].name));		         
		c.appendChild(optn);		      
	}
}

var g_hlist=[];
var g_hpoint=0;
/*function setvaluehistory(s){
	var obj=_getid("rssurl");
	var flag=false;
	try{
		if((ischrome || iswebkit) && document.queryCommandSupported('insertText')) flag=true;
	}catch(err){
		flag=false;
	}
	if(flag){
		flag=false;
		try{
			obj.focus();
			obj.select();
			document.execCommand('insertText', false, s);
			if(obj2) obj2.focus();
			flag=true;
		}catch(err){}
		if(!flag) obj.value=s;
	}else{
		obj.value=s;
	}
}*/
function proc_hadd(data2,setpoint){
	var data={};
	get_options(data);
	if(data.url){
		if(g_hlist.length==0 || g_hlist[g_hlist.length-1].url!=data.url)
			g_hlist.push(data);
		if(g_hlist.length>15){
			g_hlist.splice(0,1);
			if(!data2 && !setpoint) g_hpoint--;
		}
	}	
	if(data2 || setpoint) g_hpoint=g_hlist.length;

if(data2){	
	var s="";
	if(data2.url){
		if(typeof data2.url==='string'){
			s=data2.url;
		}else{
			for(var j = 0; j <= data2.url.length-1; j++){
				if(s) s+="\n";
				s+=data2.url[j].url;
			}
		}
	}
	data2.url=s;
	_getid("rssurl").value=data2.url;
	_getid("rssquery").value=data2.query;
	_getid("rsssort").value=data2.sort;
	_getid("rssmaxnum").value=data2.maxnum;
	_getid("rsshistorical").checked=data2.historical;	
	if(data2.url){
		if(g_hlist.length==0 || g_hlist[g_hlist.length-1].url!=data2.url)
			g_hlist.push(data2);
	}
}
	proc_hcontrol();
	if(window.JSON) setstorage("c_rss_hlist",JSON.stringify(g_hlist));
}
function proc_hcontrol(){
	var a=_getid("btn_hprev");
	var b=_getid("btn_hnext");
	a.disabled=true;
	b.disabled=true;
	if(g_hpoint-1>=0 && g_hpoint-1<=g_hlist.length-1) a.disabled=false;
	if(g_hpoint+1>=0 && g_hpoint+1<=g_hlist.length-1) b.disabled=false;
	if(a.disabled && b.disabled && g_hlist.length>0){
		g_hpoint=g_hlist.length;
		a.disabled=false;
	}
	var k=g_hpoint+1;
	if(k>g_hlist.length) k=g_hlist.length;
	_getid("hposition").innerHTML=k+"/"+g_hlist.length;
	if(window.ajax_options_hide){
		ajax_options_hide();
		clearInterval(tricktimer);
		tricktimer=null;
	}
}
function proc_hmove(isprev){
	while(true){
		var idx;
		if(isprev) idx=g_hpoint-1;
		else idx=g_hpoint+1;
		if(idx>=0 && idx<=g_hlist.length-1){
			g_hpoint=idx;
			var data=g_hlist[idx];
			if(_getid("rssurl").value==data.url) 
				continue;
			/*_getid("rssquery").value=data.query;
			_getid("rsssort").value=data.sort;
			_getid("rssmaxnum").value=data.maxnum;*/
			_getid("rssurl").value=data.url;
		}
		break;
	}
	proc_hcontrol();
}
function proc_selectall(){
	var a=_getid("rssurl");
	a.focus();
	a.select();
}

var g_edit_id;
function sel_history_change(){
	var hdata=get_history();
	var a=hdata[g_history_default];

	var c=_getid("sel_history");
	for(var i = 0; i <= a.length-1; i++){
		if(a[i].id==c.value){
			proc_hadd(a[i]);
			_getid("btn_edit").disabled=false;
			_getid("btn_rename").style.display="";
			_getid("labelcurrent").innerHTML=henc(cutstring(a[i].name,g_title_length));
			g_edit_id=a[i].id;
			break;
		}
	}	
}
function sel_history_dblclick(){
	if(!_getid("sel_history").value) return;
	sel_history_change();
	proc_go(true);
}

function proc_history_delete(){
	var hdata=get_history();
	var a=hdata[g_history_default];
	
	var answer=false;
	var c=_getid("sel_history");
	var k=-1;
	for(var i=c.options.length-1;i>=0;i--){
		if(c.options[i].selected) {
			if(!answer){
				answer=confirm(msg_deleteitem+"\n\n"+msg_areyousure);				
				if(!answer) return;
			}
			for(var j = 0; i <= a.length-1; j++){
				if(a[j].id==c.options[i].value){
					a.splice(j,1);
					break;
				}
			}
			c.remove(i);
			k=i;
		}
	}	
	if(k>=0) set_history(hdata);
	
	if (k>c.options.length-1) k=c.options.length-1;
	if (k>=0){
		c.selectedIndex=k;
	}
	_getid("btn_edit").disabled=true;
	_getid("btn_rename").style.display="none";
	_getid("labelcurrent").innerHTML="";
	sel_history_change();
}
function proc_history_move(direct){
	if(_getid('btn_moveup').disabled)return;
	var hdata=get_history();
	var a=hdata[g_history_default];

	var c=_getid("sel_history");
	if(c.options.length==0) return;

	var k=0;
	for (var i = 0 ; i < c.options.length; i++) {		
		if (c.options[i].selected) k++;
	}
	if (k!=1){
		alert(msg_selectone);
		return;
	}
	if (direct==1){ //down
		for (var i = c.options.length - 2; i >= 0; i--) {
  			var b = c.options[i];
  			if (b.selected) {
				var nextOpt = c.options[i+1];
				b = c.removeChild(b);
				nextOpt = c.replaceChild(b, nextOpt);
				c.insertBefore(nextOpt, b);
				c.selectedIndex=i+1;
				
				var c=a[i];
				var d=a[i+1];
				a[i+1]=c;
				a[i]=d;				
				set_history(hdata);
				break;
			}
		}	
	} else { //up
		for (var i = 0 ; i < c.options.length; i++) {		
			var b=c.options[i];
			if (b.selected) {
				if (i==0) break;
	  			c.removeChild(b);
   				c.insertBefore(b, c[i-1]);		
				c.selectedIndex=i-1;
   				
				var c=a[i];
				var d=a[i-1];
				a[i-1]=c;
				a[i]=d;
				set_history(hdata);
				break;
			}
		}	
	}
}
function proc_history_show(isshow){
	var a=_getid("historylist1");
	var b=_getid("historylist2");
	if(isshow){
		a.style.display="";
		b.style.display="none";
	}else{
		a.style.display="none";
		b.style.display="";
	}
	if(isshow) setCookie("c_rss_showhistory","1");
	else setCookie("c_rss_showhistory","");
}
var g_changed=false;
function init2(){
	_getid("rssurl").value=_getid("rssurlsample").value;
	try{
		g_hlist=JSON.parse(getstorage("c_rss_hlist"));
	}catch(err){
		g_hlist=[];
	}
	if(!g_hlist) g_hlist=[];
	g_hpoint=g_hlist.length;
	proc_hcontrol();

	var s=getCookie("c_rss_showhistory");
	if(s==1) proc_history_show(true);
	else proc_history_show(false);
}
function proc_sample(){	
	var data={};
	data.query="";
	data.sort=0;
	data.maxnum=20;
	data.historical=false;
	data.url=_getid("rssurlsample").value+"";
	proc_hadd(data);
}
function proc_clear(){
	proc_hadd(false,true);
	_getid("rssquery").value="";
	_getid("rsssort").value=0;
	_getid("rssmaxnum").value=20;
	_getid("rsshistorical").checked=false;
	_getid("rssurl").value="";
}
function proc_change(f){
	g_changed=true;
}
