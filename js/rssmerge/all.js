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
  str = str.replace(/&#039;/gi, "'").replace(/&#39;/gi, "'").replace(/&#44;/gi, ",");
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
