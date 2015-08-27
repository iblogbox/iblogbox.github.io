var issafari=false;
var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') <0){ 
	issafari=true;
}
var isopera=false;
if (navigator.appName=="Netscape"){
}else{
	if(navigator.userAgent.indexOf("Opera")>=0) isopera=true;
}

window.URL=window.URL || window.webkitURL;
var glastbloburl;

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

function proc_setimg(fileIdx){
	_getid('img_title').innerHTML='';
	setdown();
	var obj=document.getElementsByClassName("thumb")[0];
	var a=obj.getElementsByTagName('LI');
	for(var i = 0; i < a.length; i++){    
		a[i].style.outline='red solid 0px';
	}
	if(!fileIdx)return;
	var a=obj.getElementsByTagName('IMG');
	for(var i = 0; i < a.length; i++){    
		if(a[i].fileIdx==fileIdx){
			if(a[i].parentNode) a[i].parentNode.style.outline='red dashed 2px';
			var s=a[i].name || '';
			if(a[i].resp){
				set_img_title(s, a[i].resp);
			}else{
				if(a[i].fileSize) s+=getsize(a[i].fileSize);
				_getid('img_title').innerHTML=henc(s);
			}
			setdown(a[i].resp);
			break;
		}
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

/**
 * 이미지 객체를 담고 있는 배열
 * @class
 * @name PhotoEditor.
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 16
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.File = function(){
};
PhotoEditor.File.prototype = {
    FILE_MAX_COUNT : 6,
    FILE_MAX_SIZE_MB : 5,
    ERROR_TYPE_OVER_MAX_SIZE : "size_error",
    ERROR_TYPE_NOT_IMAGE : "type_error",

    validFiles: function (files) {
        var fileErrorType = this._checkFileError(files);
        if (fileErrorType === this.ERROR_TYPE_NOT_IMAGE) {
            alert("You can only select a image file.");
            return false;
        }

        if(fileErrorType === this.ERROR_TYPE_OVER_MAX_SIZE){
			alert('The maximum size for loading image is '+ this.FILE_MAX_SIZE_MB +' M.');
            return false;
        }
//        if (files.length > this.FILE_MAX_COUNT) {
//            alert("이미지는 " + this.FILE_MAX_COUNT + "개까지 선택 가능합니다.");
//            return false;
//        }
        return true;
    },
	validFile: function (file) {
		if(file.size > 1024 * 1024 * this.FILE_MAX_SIZE_MB){
			alert(file.name+' ('+number_format(file.size)+')\n\nThe maximum size for loading image is '+ this.FILE_MAX_SIZE_MB +' M.');
            return false;
		}
		return true;
	},
    _checkFileError : function(files){
        var fileCount = files.length,
            fileErrorType = "";
        for(var fi=0; fi < fileCount; fi += 1){
            //if(files[fi].type.match(/image.*/) === null){
              //  fileErrorType = this.ERROR_TYPE_NOT_IMAGE;
            //}
            if(files[fi].size > 1024 * 1024 * this.FILE_MAX_SIZE_MB){
                fileErrorType = this.ERROR_TYPE_OVER_MAX_SIZE;
            }
        }
        return fileErrorType;
    }

};


/**
 * 캔버스
 * @class
 * @name PhotoEditor.
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 16
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Canvas = function (options) {
    $.extend(this, options || {});
    this.init();
};
PhotoEditor.Canvas.prototype = {
    canvasDefaultWidth: 800,
    canvasDefaultHeight: 510,
    init: function () {
        this._setElement();
    },
    _setElement: function () {
        this._canvasElement = $("#canvas");
        this._canvas = document.getElementById("canvas");
        this._context = this._canvas.getContext("2d");
    },
    getCanvasElement : function(){
        return this._canvasElement;
    },
    getCanvas: function () {
        return this._canvas;
    },
    getContext: function () {
        return this._context;
    },
    drawImage: function (Image) {
        var photo = Image.getImage();
        var photoWidth = Image.getWidth(),
            photoHeight = Image.getHeight();
        var percent = this._getPercent(photoWidth, photoHeight),
            scaledPhotoWidth = photoWidth * percent,
            scaledPhotoHeight = photoHeight * percent;

        this.setCanvasWidth(scaledPhotoWidth);
        this.setCanvasHeight(scaledPhotoHeight);
        Image.setWidth(scaledPhotoWidth);
        Image.setHeight(scaledPhotoHeight);
        this._context.drawImage(photo, 0, 0, photoWidth, photoHeight, 0,0, scaledPhotoWidth, scaledPhotoHeight);
    },
    _getPercent: function (photoWidth, photoHeight) {
        var percent = 1;
        //canvas보다 이미지 사이즈가 작을 경우 100%
        /*if(this.canvasDefaultWidth >= photoWidth && this.canvasDefaultHeight >= photoHeight){
            return percent;
        }
        percent = Math.min(this.canvasDefaultWidth, photoWidth) / Math.max(this.canvasDefaultWidth, photoWidth);*/
        return percent;//edit
    },
    clear: function () {
        this._context.fillStyle = "#ffffff";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    },
    save: function () {
        this._context.save();
    },
    restore: function () {
        return this._context.restore();
    },
    setCanvasWidth: function (width) {
        this._canvas.width = width;
    },
    setCanvasHeight: function (height) {
        this._canvas.height = height;
    },
    getCanvasWidth : function(){
        return this._canvas.width;
    },
    getCanvasHeight : function(){
        return this._canvas.height;
    }
};

/**
 *
 * @class
 * @name PhotoEditor.
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 16
 * @copyright heyonmi.kim
 */
var g_Thumbnail;
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Canvas = PhotoEditor.Canvas || {};
PhotoEditor.Canvas.Controller = function (options) {
    $.extend(this, options || {});
    this.init();
};
PhotoEditor.Canvas.Controller.prototype = {
    init: function () {
        this._createInstance();
        this._setElement();
        this._attachEvnet();
		this._dragdrop();
    },
_dragdrop: function(){
		var self=this;
function handleFileSelect(files){
	if(!window.FileReader || !window.XMLHttpRequest){
		alert("This browser does not support.");
		return;
	}
	if(!files || files.length==0) return;
	self._Thumbnail.createImage(files);
}
	var holder = document.body;
	holder.ondragover = function (e) { 
		try{var ua=navigator.userAgent;
			if(ua && ua.indexOf("Chrome")>=0){					
				if(e.originalEvent) e = e.originalEvent;
				if(e.dataTransfer){
					var b = e.dataTransfer.effectAllowed;
					e.dataTransfer.dropEffect = ('move' === b || 'linkMove' === b) ? 'move' : 'copy';
				}
			}
		}catch(err){}
		return false; 
	};
	holder.ondragend = function () { return false; };
	holder.ondrop = function (e) {
		e.preventDefault();				
		handleFileSelect(e.dataTransfer.files);
		return false;
	}
},
    _createInstance: function () {
        this._Canvas = new PhotoEditor.Canvas();
        this._Effect = new PhotoEditor.Effect();
        this._File = new PhotoEditor.File();
        this._Thumbnail = new PhotoEditor.Thumbnail();
		g_Thumbnail=this._Thumbnail;
        this._Crop = new PhotoEditor.Edit.Crop();
    },
    _setElement: function () {
        this._welAddFileBtn = $("#add_photo");
        this._welFileUpload = $("#file_upload");

        this._allDelete = $(".btn_delete");
        this._resizeSel = $("#_resize_slt");
        this._undoneBtn = $("#_undone_btn");
        this._resotreBtn = $("#_restore_btn");
        this._rotateRightBtn = $("#_rotate_right_btn");
        this._rotateLeftBtn = $("#_rotate_left_btn");
        this._flipVtc = $("#_flip_vtc");
        this._flipHrz = $("#_flip_hrz");
        this._cropBtn = $("#_crop_btn");
        this._imageWidth = $("#_photo_width");
        this._imageHeight = $("#_photo_height");
        this._isDrag = false;
        this._isCrop = false;
        this._CanvasImage = null;
    },
    _attachEvnet: function () {
        this._welAddFileBtn.on("click", $.proxy(this._onClickAddFileBtn, this));
        this._welFileUpload.on("change", $.proxy(this._onChangeFileUpload, this));

        /** Thumbnail */
        $(".thumb ul li").on("click", "img",$.proxy(this._onClickThumbnail, this));
        /** Edit Button */
        this._resizeSel.on("change", $.proxy(function(){
			var r=this._onChangeResizeSel();
			_getid('_resize_slt').value=800;
			return r;
		}, this));
        this._rotateRightBtn.on("click", $.proxy(this._onClickClockRotateBtn, this));
        this._rotateLeftBtn.on("click", $.proxy(this._onClickUnClockRotateBtn, this));
        this._flipHrz.on("click", $.proxy(this._onClickFlipHrzBtn, this));
        this._flipVtc.on("click", $.proxy(this._onClickFlipVtcBtn, this));
        this._cropBtn.on("click", $.proxy(this._onClickCropBtn, this));
        /** Crop event */
        this._Canvas.getCanvasElement().on("mousedown", $.proxy(this._onMouseDownCanvas, this));
        $(window).on("mousemove", $.proxy(this._onMouseMoveCanvas, this));
        $(document).on("mouseup", $.proxy(this._onMouseUpCanvas, this));
        /** Filter Canvas */
		$("#_origin").on("click", $.proxy(function(){ //edit
			if(this._gthumbnail){
			    this.createCanvasImageBy(this._gthumbnail,true);
		        this._initResizeSelect();
			}
		}, this));
        $("#_grayscale").on("click", $.proxy(this._onClickFilters, this, "GrayScale"));
        $("#_brightness").on("click", $.proxy(this._onClickFilters, this, "Brightness"));
        $("#_brown").on("click", $.proxy(this._onClickFilters, this, "Brown"));
        $("#_sepia").on("click", $.proxy(this._onClickFilters, this, "Sepia"));
        $("#_negative").on("click", $.proxy(this._onClickFilters, this, "Negative"));
        $("#_blur").on("click", $.proxy(this._onClickFilters, this, "Blur"));
        $("#_emboss").on("click", $.proxy(this._onClickFilters, this, "Emboss"));
        $("#_sharpen").on("click", $.proxy(this._onClickFilters, this, "Sharpen"));
        $("#_laplacian").on("click", $.proxy(this._onClickFilters, this, "Laplacian"));

        $("#_dawn").on("click", $.proxy(this._onClickFilters, this, "Dawn"));
        $("#_pink").on("click", $.proxy(this._onClickFilters, this, "Pink"));

        $(".btn_save").on("click", $.proxy(function(){
			this._onClickSave(false,true);
		}, this));
        $(".btn_save2").on("click", $.proxy(function(){
			this._onClickSave();
		}, this));
		$("#btn_gsave").on("click", $.proxy(function(){
			this._onClickSave(true);
		}, this));
		$("#btn_gsave2").on("click", $.proxy(function(){
			this._onClickSave(true);
		}, this));
        this._allDelete.on("click", $.proxy(this._onClickAllDelete, this));
    },
    /** Crop */
    _onClickCropBtn: function () {
        if(this._Crop.isNotCrop()){
            this._Crop.setCrop(true);
			_getid('_crop_btn').style.outline='red dashed 2px';
        }else{
            this._Crop.setCrop(false);
			_getid('_crop_btn').style.outline='red solid 0px';
        }
    },
    _onMouseDownCanvas: function (event) {
		var b=event.target || event.srcElement;
		//if(b && b.tagName!='CANVAS' && b.id!='rubberband' && b.className!='canvas') return;
		if(b && b.tagName=='INPUT') return;
        if(this._Crop.isNotCrop() || !this._CanvasImage){
            return;
        }
        this._setCanvasMinMax();
        this._Crop.startCrop(event);
    },
    _setCanvasMinMax: function () {
        var canvasBox = this._Canvas.getCanvas().getBoundingClientRect();
        this._canvasMinX = canvasBox.left;
        this._canvasMinY = canvasBox.top;

		var w=this._Canvas.getCanvasWidth();
		var h=this._Canvas.getCanvasHeight();
		var f=_getid('_scale_slt');
		var r=f.value/100;
		if(r<0.2)r=0.2;
		w=Math.floor(w*r);
		h=Math.floor(h*r);

        this._canvasMaxX = w + this._canvasMinX;
        this._canvasMaxY = h + this._canvasMinY;
    },
    _onMouseMoveCanvas: function (event) {
		var b=event.target || event.srcElement;
		if(b && b.tagName=='INPUT') return;
        if(this._Crop.isNotCrop()){
            return;
        }
        if (this._Crop.isNotDrag()) {
            return;
        }

        if(event.clientX >= this._canvasMaxX){
            event.clientX = this._canvasMaxX;
        }else if(event.clientX <= this._canvasMinX){
            event.clientX = this._canvasMinX;
        }

        if(event.clientY >= this._canvasMaxY){
            event.clientY = this._canvasMaxY;
        }else if(event.clientY <= this._canvasMinY){
            event.clientY = this._canvasMinY;
        }

        this._Crop.cropping(event);
    },
    _onMouseUpCanvas: function (event) {
		var b=event.target || event.srcElement;
		if(b && b.tagName=='INPUT') return;
        if(this._Crop.isNotCrop()){
            return;
        }
		/*if(this._Crop.isNotDrag()) {
			this._Crop.setCrop(false);
			_getid('_crop_btn').style.outline='red solid 0px';
			return;
		}*/

        var canvasBox = this._Canvas.getCanvas().getBoundingClientRect(),
            rubberbandRect = this._Crop.getRubberbandRect(),
            canvas = this._Canvas,
            context = canvas.getContext();
        var sourceWidth = rubberbandRect.width,
            sourceHeight = rubberbandRect.height,
            sourceX = rubberbandRect.left - canvasBox.left,
            sourceY = rubberbandRect.top - canvasBox.top;

		var f=_getid('_scale_slt');
		var r=f.value/100;
		if(r<0.2)r=0.2;
		sourceX=Math.floor(sourceX/r);
		sourceY=Math.floor(sourceY/r);
		sourceWidth=Math.floor(sourceWidth/r);
		sourceHeight=Math.floor(sourceHeight/r);

        if(sourceWidth < 10 || sourceHeight < 10){
            return;
        }

        canvas.save();
        canvas.setCanvasWidth(sourceWidth);
        canvas.setCanvasHeight(sourceHeight);
        context.drawImage(this._CanvasImage.getImage(),
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, sourceWidth, sourceHeight);
        this._saveCanvasImage();
        this._setChangeCanvasImageSize(sourceWidth, sourceHeight);
        canvas.restore();

        this._Crop.stopCrop(event);
    },
    /**
     * 썸네일 클릭시 호출되는 이벤트
     * @param event
     * @private
     */
    _onClickThumbnail : function(event){
        var thumbnail = $(event.currentTarget);
		this._gthumbnail=thumbnail;
        this.createCanvasImageBy(thumbnail);
        this._initResizeSelect();

    },
    _initResizeSelect : function(){
        var selectBox = this._resizeSel.find("option:eq(0)");
        selectBox.val(this._Canvas.canvasDefaultWidth);
        selectBox.prop("selected","selected");
    },
    /**
     * 효과탭의 필터 미리 보기 클릭시 호출되는 이벤트
     * @param filterName
     * @private
     */
    _onClickFilters: function (filterName) {
        this._putFilterImage(filterName);
    },
    /**
     * 해당 필터를 편집하고 있는 캔버스에 적용 시킨다
     * @param filter
     * @private
     */
    _putFilterImage: function (filter) {
        var canvas = this._Canvas;
        var context = canvas.getContext();
        var imageData = context.getImageData(0, 0, canvas.getCanvasWidth(), canvas.getCanvasHeight());
        var filterName = PhotoEditor.Filters[filter];
        var filteredImageData = filterName.call(PhotoEditor.Filters, imageData);
        context.putImageData(filteredImageData, 0, 0);
        this._saveCanvasImage();
    },
    /** 가로 크기 변경 */
    _onChangeResizeSel: function () {
		var parseHeight, parseWidth;
        var CanvasImage = this._CanvasImage;
		if(!CanvasImage) return false;
	    var imgWidth = CanvasImage.getWidth(), imgHeight = CanvasImage.getHeight();

        var width = this._resizeSel.children(":selected").val();
		if(width==800) return false; //edit
		if(!width){
			width=getstorage('c_scalewidth') || 300;			
			width=prompt("Enter a width to resize?",width);	
			width=parseInt(width);
			if(width && !isNaN(width)) setstorage('c_scalewidth',width)
		}else if(width==1){
			var height=getstorage('c_scaleheight') || 300;			
			height=prompt("Enter a height to resize?",height);	
			height=parseInt(height);
			if(height && !isNaN(height)){
				setstorage('c_scaleheight',height);
				parseHeight = height;
				parseWidth = Math.floor((imgWidth * parseHeight) / imgHeight);
			}else{
				return false;
			}
		}else if(width==2){
			width=getstorage('c_scalewidth2') || 300;			
			width=prompt("Enter a width to resize?",width);	
			width=parseInt(width);
			var height=getstorage('c_scaleheight2') || 300;			
			height=prompt("Enter a height to resize?",height);	
			height=parseInt(height);
			if(width && !isNaN(width) && height && !isNaN(height)){
				setstorage('c_scalewidth2',width);
				setstorage('c_scaleheight2',height);
				parseWidth=width;
				parseHeight=height;
			}else{
				return false;
			}
		}
        if(!width || isNaN(width)){
            return false;
        }
        var Canvas = this._Canvas,
            Context = Canvas.getContext();
		if(!parseHeight && !parseWidth){
			parseWidth = parseInt(width, 10);
            parseHeight = Math.floor((imgHeight * parseWidth) / imgWidth);
		}

        Canvas.setCanvasWidth(parseWidth);
        Canvas.setCanvasHeight(parseHeight);
        Context.drawImage(CanvasImage.getImage(), 0, 0, parseWidth, parseHeight);
        this._saveCanvasImage();
        this._setChangeCanvasImageSize(parseWidth, parseHeight);		
    },

    /**
     * image download
     * @private
     */

    _onClickSave : function(gdrive,preview){
		var blobLink=_getid('btn_save2_link');
		blobLink.href='javascript:void(0);';

        if(this._CanvasImage === null){
            alert("Please select a Photo Image.");
            return false;
        }
		
		var arr=(this._CanvasImage.fileName || '').split('.');
		var ext=arr[arr.length-1].toLowerCase();
		if(arr.length>1) arr.splice(arr.length-1,1);
		var filename=arr.join('.');

		var resp=this._CanvasImage.resp;
		if(resp && resp.mimeType){
			var s=resp.mimeType.toLowerCase();
			if(s.indexOf("jpg")>=0 || s.indexOf("jpeg")>=0){
				if(ext!='jpg' && ext!='jpeg') ext='jpg';
			}else if(s.indexOf("png")>=0){
				ext='png';
			}
		}
		if(ext!='png' && ext!='jpg' && ext!='jpeg'){
			ext=getstorage('c_preferformat') || 'jpg';
		}

		if(ext=='png'){
	        var strMime = "image/png";
		    var strData = this._Canvas.getCanvas().toDataURL("image/png");
		}else{
	        var strMime = "image/jpeg";
		    var strData = this._Canvas.getCanvas().toDataURL("image/jpeg");
		}

		if(gdrive){
			proc_save(this._CanvasImage.fileIdx, resp, strMime, strData.substr(strData.indexOf(",")+1,strData.length), filename+'.'+ext);
		}else{
			if(preview){
				if(navigator.msSaveBlob){			
					var blob=b64toBlob(strData.substr(strData.indexOf(",")+1,strData.length), strMime);
					navigator.msSaveBlob(blob, filename+'.'+ext);
				}else{
					window.open(strData); //edit
				}
			}else{
					var blob=b64toBlob(strData.substr(strData.indexOf(",")+1,strData.length), strMime);
					if(navigator.msSaveBlob){
						navigator.msSaveBlob(blob, filename+'.'+ext);
					}else{
						if(!window.URL){
							alert("This browser does not support.");
							return;
						}
						blobLink.download = filename+'.'+ext;
						if(glastbloburl) window.URL.revokeObjectURL(glastbloburl);
						glastbloburl=window.URL.createObjectURL(blob);
						if(issafari){
							window.open(glastbloburl);
						}else{						
							blobLink.target='_blank';
							blobLink.href=glastbloburl;
						}
					}
			}
		}
		//var strDownloadMime = "image/octet-stream";
        //document.location.href = strData.replace(strMime, strDownloadMime);
    },
    /**
     * thumbnail all delete
     * @private
     */
    _onClickAllDelete : function(){
        if(this._Thumbnail.isEmptyThumbnail()){
            alert("No Photo Image to remove");
            return false;
        }
        this._Thumbnail.deleteImages();
        this._Canvas.clear();
        this._CanvasImage = null;
		proc_setimg();
    },
    /** file upload*/
    _onClickAddFileBtn : function(){
        if(this._Thumbnail.isNotAddThumbnail()){
            alert("You can not add a Photo Image anymore.");
            return false;
        }
        this._welFileUpload.trigger("click");
    },
    _onChangeFileUpload : function(event){
        var files = event.target.files;
        //if(this._File.validFiles(files)){
            this._Thumbnail.createImage(files);
        //}
    },
    /**
     * 썸네일 클릭시 캔버스 이미지 객체를 만든다
     * @param thumbnail
     */
    createCanvasImageBy: function (thumbnail,origin) {
        this._CanvasImage = new PhotoEditor.Image({
			"resp": thumbnail[0].resp, 	
			"fileName": thumbnail[0].name, 	
            "fileSrc": thumbnail[0].src,
			"fileSize": thumbnail[0].fileSize,
			"fileIdx": thumbnail[0].fileIdx,
            "callback": $.proxy(this._loadImage, this)
        });
		if(!origin) proc_setimg(thumbnail[0].fileIdx);
    },
    /**
     * 캔버스의 이미지가 로드됐을때 호출된다
     * @private
     */
    _loadImage: function () {
        this._Canvas.drawImage(this._CanvasImage);
        this._saveCanvasImage();
        this._setChangeCanvasImageSize(this._CanvasImage.getWidth(), this._CanvasImage.getHeight());
        this._Effect.onLoadFilter(this._CanvasImage);
    },
    /** rotate */
    _onClickClockRotateBtn: function () {
        var changeArea = PhotoEditor.Edit.Rotate(this._Canvas, this._CanvasImage, 90);
        this._saveCanvasImage();
        this._setChangeCanvasImageSize(changeArea.changeWidth, changeArea.changeHeight);
    },

    _onClickUnClockRotateBtn: function () {
        var changeArea = PhotoEditor.Edit.Rotate(this._Canvas, this._CanvasImage, -90);
        this._saveCanvasImage();
        this._setChangeCanvasImageSize(changeArea.changeWidth, changeArea.changeHeight);
    },
    /** flip */
    _onClickFlipHrzBtn: function () {
        PhotoEditor.Edit.Flip(this._Canvas, this._CanvasImage, "Horizon");
        this._saveCanvasImage();
    },
    _onClickFlipVtcBtn: function () {
        PhotoEditor.Edit.Flip(this._Canvas, this._CanvasImage, "Verticalty");
        this._saveCanvasImage();
    },
    /**
     * 현재 캔버스의 이미지를 저장한다
     * @param {number} changeWidth
     * @param {number} changeHeight
     */
    _saveCanvasImage: function () {
        var imageData = this._Canvas.getCanvas().toDataURL();
		if(this._CanvasImage){
	        this._CanvasImage.setCallback(null);
		    this._CanvasImage.setImageSrc(imageData);
		}
    },
    /**
     * 현재 캔버스에 넓이와 높이를 적용시킨다
     * @param {number} changeWidth
     * @param {number} changeHeight
     * @private
     */
    _setChangeCanvasImageSize : function(changeWidth, changeHeight){
        if (isNaN(changeWidth) === false) {
            this._CanvasImage.setWidth(changeWidth);
        }
        if (isNaN(changeHeight) === false) {
            this._CanvasImage.setHeight(changeHeight);
        }
        this._imageWidth.text(changeWidth);
        this._imageHeight.text(changeHeight);
		_scale_slt_onchange(_getid('_scale_slt'));
    }
};

/**
 * 좌우, 상하 반전
 * @names nts.PhotoEditor
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 19.
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Edit = PhotoEditor.Edit || {};
PhotoEditor.Edit.Flip = function(Canvas, Image, direction){
        var canvas = Canvas;
        var context = canvas.getContext();
        var photoWidth = Image.getWidth(),
            photoHeight = Image.getHeight();
        //이전의 상태값을 저장
        canvas.save();
        if(direction === "Verticalty"){
            context.translate(photoWidth, 0);
            context.scale(-1, 1);
        }else if(direction === "Horizon"){
            context.translate(0, photoHeight);
            context.scale(1, -1);
        }

        context.drawImage(Image.getImage(),  0, 0);
        canvas.restore();
}

/**
 * 이미지 시계방향,반시계방향 회전
 * @names nts.PhotoEditor
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 19.
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Edit = PhotoEditor.Edit || {};
PhotoEditor.Edit.Rotate = function(Canvas, Image, degrees){
    var canvas = Canvas,
        context = canvas.getContext();
    var photoWidth = Image.getWidth(),
        photoHeight = Image.getHeight(),
        changeWidth = photoHeight,
        changeHeight = photoWidth,
        changeX = 0,
        changeY = 0,
        angleInRadians = degrees * Math.PI / 180;

    if (degrees === 90) {
        changeY = photoHeight * (-1);
    } else if (degrees === -90) {
        changeX = photoWidth * (-1);
    }

    canvas.setCanvasWidth(changeWidth);
    canvas.setCanvasHeight(changeHeight);
    context.save();
    context.rotate(angleInRadians);
    context.drawImage(Image.getImage(), changeX, changeY);
    context.restore();
    return {changeWidth : changeWidth,  changeHeight : changeHeight};
};

/**
 * 크롭 이벤트
 * @names nts.PhotoEditor
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 21.
 * @copyright Copyright (c) 2012, NHN Technology Services inc.
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Edit = PhotoEditor.Edit || {};
PhotoEditor.Edit.Crop = function(){
    this.init();
};
PhotoEditor.Edit.Crop.prototype = {
    init : function(){
        this._setElement();
        this._initRubberband();
    },
    _setElement : function(){
        this._isDrag = false;
        this._isCrop = false;
        this._rubberband = $("#rubberband");
        this._wrapper = $(".wrap");
        this._MouseDownPosition = { x : 0, y : 0};
    },
    setCrop : function(flag){
        this._isCrop = flag;
    },
    _getCrop : function(){
        return this._isCrop;
    },
    setDrag : function(flag){
        this._isDrag = flag;
    },
    _getDrag : function(){
        return this._isDrag;
    },
    isNotCrop : function(){
        return !this._getCrop();
    },
    isNotDrag : function(){
        return !this._getDrag();
    },
    _initRubberband: function () {
        this._rubberbandRect = { top: 0, left: 0, width: 0, height: 0};
    },
    getRubberbandRect : function(){
        return this._rubberbandRect;
    },
    _setRubberbandPosition: function (x, y) {
            this._rubberbandRect.left = x;
            this._rubberbandRect.top = y;

    },
    _setRubberbandSize: function (x, y) {
            this._rubberbandRect.width = Math.abs(x - this._MouseDownPosition.x);
            this._rubberbandRect.height = Math.abs(y - this._MouseDownPosition.y);
    },
    _setMouseDownPosition: function (x, y) {
        this._MouseDownPosition.x = x;
        this._MouseDownPosition.y = y;
    },
    startCrop: function (event) {
        this._setRubberbandPosition(event.clientX, event.clientY);
        this._setMouseDownPosition(event.clientX, event.clientY);
        event.preventDefault();
        this._moveRubberband();
        this._showRubberband();
        this.setDrag(true);
        this._wrapper.css("cursor", "crosshair");
    },
    considerPosition: function (event) {
        var positionX = event.clientX < this._MouseDownPosition.x ? event.clientX : this._MouseDownPosition.x,
            positionY = event.clientY < this._MouseDownPosition.y ? event.clientY : this._MouseDownPosition.y;
        return {positionX: positionX, positionY: positionY};
    },
    cropping: function (event) {
        event.preventDefault();

        var startPostion = this.considerPosition(event);
        this._setRubberbandPosition(startPostion.positionX, startPostion.positionY);
        this._setRubberbandSize(event.clientX, event.clientY);
        this._moveRubberband();
        this._resizeRubberband();
    },
    stopCrop: function (event) {
        event.preventDefault();

        this._hideRubberband();
        this._initRubberband();
        this._resizeRubberband();
        this.setDrag(false);
        //this.setCrop(false);
        this._wrapper.css("cursor", "auto");

    },
    _moveRubberband: function () {
        var scrollTop = $(document).scrollTop();
        this._rubberband.css({
            top: this._rubberbandRect.top + scrollTop,
            left: this._rubberbandRect.left
        });
    },
    _resizeRubberband: function () {
        this._rubberband.css({
            width: this._rubberbandRect.width,
            height: this._rubberbandRect.height
        });
    },
    _showRubberband: function () {
        this._rubberband.show();
    },
    _hideRubberband: function () {
        this._rubberband.hide();
    }
};

/**
 * 썸네일 관련 이벤트 모음
 * @class
 * @name PhotoEditor.
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 16
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Thumbnail = function (options) {
    $.extend(this, options || {});
    this.init();
};
PhotoEditor.Thumbnail.prototype = {
    init: function () {
        this._setElement();
        this._attachEvent();
        this.index = 0;
        this._images = [];
    },
    _setElement: function () {
        this._thumbnails = $(".thumb ul li");
        this._progress = document.getElementById("progress");
        this._progressArea = $(".progress_area");
        this._thumbnailCount = this._thumbnails.length;
    },
    _attachEvent: function () {

    },
    createImage : function(files){
        var fileCount = files.length;
		var self=this;
        var reader = new FileReader();
        reader.onloadstart = $.proxy(this._onloadstartImage, this);
        reader.onprogress = $.proxy(this._onprogressImage, this);
        reader.onload = $.proxy(function(progressEvent){
			progressEvent.target.size=reader.size;
			this._onloadImage(progressEvent);
		}, this);
        reader.onerror = $.proxy(this._onerrorImage, this);
        //reader.onloadend = $.proxy(this._onloadendImage, this);
		reader.onloadend = function(){
			self._onloadendImage();
			var idx=reader.idx;
			idx++;
			go(idx);
		}
		function go(idx){
			if(idx>fileCount-1)return;
	        if(self.isNotAddThumbnail()){
	            alert("You can not add a Photo Image anymore.");
		        return;
			}
            var file = files[idx];
			if(canvasController && !canvasController._File.validFile(file)){
				idx++;
				go(idx);
				return;
			}
			reader.idx=idx;
			reader.name=file.name;
			reader.size=file.size;
            reader.readAsDataURL(file); //edit
		}
		go(0);
    },
    _callbackCreateImage : function(image){
        this._addImage(image);
        this._setFileToThumbnail(image);
    },
    _onloadstartImage : function(){
         this._showProgress();
    },
    _onprogressImage : function(progressEvent){
        if(progressEvent.lengthComputable){
            this._progress.max = progressEvent.total;
            this._progress.value = progressEvent.loaded;
        }
    },
    _onloadImage : function(progressEvent){		
		//g_Thumbnail._onloadImage2(null,progressEvent.target.name,progressEvent.target.result);
        //dataURL
        var image = new PhotoEditor.Image({
								"resp": null, 	
								"fileName": progressEvent.target.name, 	
								"fileSrc" : progressEvent.target.result,
								"fileSize": progressEvent.target.size, 	
								"fileIdx": (new Date()).getTime(),
                                "callback" : $.proxy(this._callbackCreateImage, this)
                            });
    },
    _onloadImage2 : function(resp,fileName,fileSrc){ //edit
        var image = new PhotoEditor.Image({
								"resp": resp, 	
								"fileName": fileName, 	
								"fileSrc" : fileSrc,
								"fileIdx": (new Date()).getTime(),
                                "callback" : $.proxy(this._callbackCreateImage, this)
                            });
    },
    _onerrorImage : function(progressEvent){
		alert('Read Error: '+(progressEvent.target.name || ''));
        //console.log(progressEvent.target.error);
    },
    _onloadendImage : function(){
        this._hideProgress();
    },
    deleteImages : function(){
        this._thumbnails.find("img").remove();
    },
    _getThumbnailImageCount: function () {
        return this._thumbnails.find("img").length;
    },
    _getThumbnailCount: function () {
        return this._thumbnailCount;
    },
    isNotAddThumbnail : function(){
        return this._getThumbnailCount() - this._getThumbnailImageCount() <= 0;
    },
    isEmptyThumbnail : function(){
        return this._getThumbnailImageCount() <= 0;
    },
    _addImage : function(image){
        this._images.push(image);
    },
    _setFileToThumbnail: function (images) {
        for(var fi = 0; fi < this._getThumbnailCount(); fi +=1){
            var thumbnail = $(this._thumbnails[fi]);
            if(thumbnail.find("img").length === 0){
                thumbnail.append(images);
				var a=thumbnail.find("img");
				if(a){
					for(var i = 0; i < a.length; i++){    
						a[i].ondragstart = function(){return false;};
					}
				}
                return true;
            }
        }
    },
    _showProgress : function(){
        this._progressArea.show();
    },
    _hideProgress : function(){
        this._progressArea.hide();
    }
};

/**
 * 이미지 객체
 * @class
 * @name PhotoEditor.
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 13
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Image = function (options) {
    $.extend(this, options ||{});
    this.init();
};

PhotoEditor.Image.prototype = {
    init : function(){
        this._callback = this.callback;
        this._image = new Image();
        this._attachEvent();
        this._image.src = this.fileSrc;
		this._image.name=this.fileName || '';
		this._image.fileSize=this.fileSize;		
		var s=this._image.name;
		if(this.resp) s+=getsize(this.resp.fileSize)+' (Google Drive)';
		else if(this.fileSize) s+=getsize(this.fileSize);
		this._image.title=s;
		this._image.resp=this.resp;
		this._image.fileIdx=this.fileIdx;
    },
    _attachEvent : function(){
        $(this._image).on("load", $.proxy(this._loadImage, this));
		$(this._image).on("error", $.proxy(function(){
			var s=this._image.name || '';
			if(s) s+='\n\n';
			s+='Image Error, This is not a valid image.';
			alert(s);
		}, this));
    },
    _loadImage : function(){
        if(this._callback instanceof Function){
            this._callback(this._image);
        }
        return this;
    },
    setImageSrc: function (src) {
        this._image.src = src;
    },
    getImage: function () {
        return this._image;
    },
    setCallback : function(callback){
        this._callback = callback;
    },
    getWidth : function(){
        return this._image.width;
    },
    getHeight : function(){
        return this._image.height;
    },
    setWidth : function(width){
        this._image.width = width;
    },
    setHeight : function(height){
        this._image.height = height;
    }
};

/**
 * 사진 효과에 적용하는 필터 모음
 * @names nts.PhotoEditor
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 19.
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Filters = {
    getContext : function() {
        var tmpCanvas = document.createElement("canvas");
        return tmpCanvas.getContext("2d");
    },

    copyImageData : function(imageData){
        var tmpContext = this.getContext();
        var copyImageData = tmpContext.createImageData(imageData.width, imageData.height);

        for(var index=0; index < imageData.data.length; index +=4){
            copyImageData.data[index] = imageData.data[index];
            copyImageData.data[index+1] = imageData.data[index+1];
            copyImageData.data[index+2] = imageData.data[index+2];
            copyImageData.data[index+3] = imageData.data[index+3];
        }
        return copyImageData;
    },

    Convolve : function(imageData, matrix, offset) {
        var olddata = this.copyImageData(imageData);
        var oldpx = olddata.data;
        var newdata = this.getContext().createImageData(olddata);
        var newpx = newdata.data
        var len = newpx.length;
        var res = 0;
        var w = imageData.width;
        for (var i = 0; i < len; i++) {
            if ((i + 1) % 4 === 0) {
                newpx[i] = oldpx[i];
                continue;
            }
            res = 0;
            var these = [
                oldpx[i - w * 4 - 4] || oldpx[i],
                oldpx[i - w * 4]     || oldpx[i],
                oldpx[i - w * 4 + 4] || oldpx[i],
                oldpx[i - 4]         || oldpx[i],
                oldpx[i],
                oldpx[i + 4]         || oldpx[i],
                oldpx[i + w * 4 - 4] || oldpx[i],
                oldpx[i + w * 4]     || oldpx[i],
                oldpx[i + w * 4 + 4] || oldpx[i]
            ];
            for (var j = 0; j < 9; j++) {
                res += these[j] * matrix[j];
            }

            if (offset) {
                res += offset;
            }
            newpx[i] = res;
        }
        return newdata;
    },

    GrayScale : function(imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var index = 0; index < d.length-4; index += 4) {
            var average = (d[index] + d[index+1] + d[index+2])/3
            d[index] = d[index+1] = d[index+2] = average;
        }
        return copyImageData;
    },

    Brightness : function (imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        var adjustment = 30;
        for (var j = 0; j < d.length; j += 4) {
            d[j] += adjustment;
            d[j+1] += adjustment;
            d[j+2] += adjustment;
        }
        return copyImageData;
    },

    Sepia : function (imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var index = 0; index < d.length-4; index += 4) {
            var average = (d[index] + d[index+1] + d[index+2])/3;
            d[index] =  average + 100;
            d[index+1] = average + 50;
            d[index+2] = average;
        }
        return copyImageData;
    },

    Brown : function(imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var j = 0; j < d.length-4; j += 4) {
            d[j] =  d[j] + 30;
            d[j+1] = d[j+1] + 10;
            d[j+2] = d[j+2];
        }
        return copyImageData;
    },
    Dawn : function(imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var j = 0; j < d.length-4; j += 4) {
            d[j] =  d[j];
            d[j+1] = d[j+1] + 10;
            d[j+2] = d[j+2] + 35;
        }
        return copyImageData;
    },
    Pink : function(imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var j = 0; j < d.length-4; j += 4) {
            d[j] =  d[j] + 30;
            d[j+1] = d[j+1];
            d[j+2] = d[j+2]+30;
            d[j+3] = d[j+3] +10
        }
        return copyImageData;
    },
    Negative : function(imageData){
        var copyImageData = this.copyImageData(imageData);
        var d = copyImageData.data;
        for (var index = 0; index < d.length-4; index += 4) {
            d[index] =  255 - d[index];
            d[index+1] = 255 - d[index+1];
            d[index+2] = 255 - d[index+2];
        }
        return copyImageData;
    },
    Blur : function(imageData){
//        var matrix = [
//            1/9, 1/9,1/9,
//            1/9, 1/9,1/9,
//            1/9, 1/9,1/9
//        ];
        var matrix = [
            1/16, 2/16, 1/16,
            2/16, 4/16, 2/16,
            1/16, 2/16, 1/16

        ];
        return this.Convolve(imageData, matrix);
    },
    Sharpen : function(imageData){
        var matrix = [
            0, -1,  0,
            -1, 5, -1,
            0, -1,  0
        ];
        return this.Convolve(imageData, matrix);
    },
    Emboss : function(imageData){
        var matrix = [
            1, 1, 1,
            1, 0.8, -1,
            -1, -1, -1
        ];
        return this.Convolve(imageData, matrix);
    },
    Laplacian : function(imageData){
        var matix =[
            1, 1, 1,
            1,-8, 1,
            1, 1, 1
        ];
        return this.Convolve(imageData, matix);
    }
};

/**
 * 효과 탭의 필터 적용 화면 미리보기
 * @names nts.PhotoEditor
 * @namespace
 * @author heyonmi.kim@nts.com
 * @version 0.0.1
 * @since 13. 9. 19.
 * @copyright heyonmi.kim
 */
var PhotoEditor = PhotoEditor || {};
PhotoEditor.Effect = function(){
    this.init();
};
PhotoEditor.Effect.prototype = {
    WIDTH : 60,
    HEIGHT : 60,
    init : function(){
        this._setElement();
    },
    _setElement : function(){
		this._loadtimer=null;
        this._originCanvas = document.getElementById("_origin");
        this._originContext = this._originCanvas.getContext("2d");
        this._grayCanvas = document.getElementById("_grayscale");
        this._grayContext = this._grayCanvas.getContext("2d");
        this._brightnessCanvas = document.getElementById("_brightness");
        this._brightnessContext = this._brightnessCanvas.getContext("2d");
        this._brownCanvas = document.getElementById("_brown");
        this._brownContext = this._brownCanvas.getContext("2d");
        this._sepiaCanvas = document.getElementById("_sepia");
        this._sepiaContext = this._sepiaCanvas.getContext("2d");
        this._dawnCanvas = document.getElementById("_dawn");
        this._dawnContext = this._dawnCanvas.getContext("2d");
        this._negativeCanvas = document.getElementById("_negative");
        this._negativeContext = this._negativeCanvas.getContext("2d");
        this._blurCanvas = document.getElementById("_blur");
        this._blurContext = this._blurCanvas.getContext("2d");
        this._embossCanvas = document.getElementById("_emboss");
        this._embossContext = this._embossCanvas.getContext("2d");
        this._sharpenCanvas = document.getElementById("_sharpen");
        this._sharpenContext = this._sharpenCanvas.getContext("2d");
        this._laplacianCanvas = document.getElementById("_laplacian");
        this._laplacianContext= this._laplacianCanvas.getContext("2d");
        this.pinkCanvas = document.getElementById("_pink");
        this.pinkContext = this.pinkCanvas.getContext("2d");

    },
	onLoadFilter: function (canvasImage) {
		var self=this;
		self.onLoadFilter2(canvasImage);
		if(issafari){
			clearTimeout(this._loadtimer);
			this._loadtimer=setTimeout(function(){						
				self.onLoadFilter2(canvasImage);
			},1000);
		}
	},
    onLoadFilter2: function (canvasImage) {
		this._originContext.fillStyle = "silver";    
		this._originContext.fillRect(0, 0, this.WIDTH, this.HEIGHT);
        this._originContext.drawImage(canvasImage.getImage(),
            0, 0, canvasImage.getWidth(), canvasImage.getHeight(),
            0, 0, this.WIDTH, this.HEIGHT);
        var originImageData = this._originContext.getImageData(0, 0, this.WIDTH, this.HEIGHT);

        var grayImageData = PhotoEditor.Filters.GrayScale(originImageData);
        this._putImageData(this._grayContext, grayImageData);

        var brightnessImageData = PhotoEditor.Filters.Brightness(originImageData);
        this._putImageData(this._brightnessContext, brightnessImageData);

        var brownImageData = PhotoEditor.Filters.Brown(originImageData);
        this._putImageData(this._brownContext, brownImageData);

        var sepiaImageData = PhotoEditor.Filters.Sepia(originImageData);
        this._putImageData(this._sepiaContext, sepiaImageData);

        var negativeImageData = PhotoEditor.Filters.Negative(originImageData);
        this._putImageData(this._negativeContext, negativeImageData);

        var blurImageData = PhotoEditor.Filters.Blur(originImageData);
        this._putImageData(this._blurContext, blurImageData);

        var embossImageData = PhotoEditor.Filters.Emboss(originImageData);
        this._putImageData(this._embossContext, embossImageData);

        var sharpenImageData = PhotoEditor.Filters.Sharpen(originImageData);
        this._putImageData(this._sharpenContext, sharpenImageData);

        var labplacianImageData = PhotoEditor.Filters.Laplacian(originImageData);
        this._putImageData(this._laplacianContext, labplacianImageData);

        var dawnImageData = PhotoEditor.Filters.Dawn(originImageData);
        this._putImageData(this._dawnContext, dawnImageData);

        var unShartpImageData = PhotoEditor.Filters.Pink(originImageData);
        this._putImageData(this.pinkContext, unShartpImageData);

    },
    _putImageData : function(contextTarget, drawImagedata){
		contextTarget.fillStyle = "silver";    
		contextTarget.fillRect(0, 0, this.WIDTH, this.HEIGHT);
		//contextTarget.clearRect ( 0 , 0 , this.WIDTH, this.HEIGHT);
		contextTarget.putImageData(drawImagedata, 0,0,0,0, this.WIDTH, this.HEIGHT);
    }
};


/*say-cheese.js*/
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


function datetimetostring(t,opt){
function fillnumber(s){
	s=String(s);
	if ( s.length==1 ) { 
		return '0'+s;  
	}
	return s;
}	
	var today=new Date();
	
	var ty=today.getFullYear();
	var tm=today.getMonth()+1;
	var td=today.getDate();

	var y=t.getFullYear();
	var m=t.getMonth()+1;
	var d=t.getDate();
	
	var s;
	var dl=':';
	if(opt){
		s=y+'-'+fillnumber(m)+'-'+fillnumber(d);
		dl='-';
	}else{
		if (ty==y && tm==m && td==d) s='Today';
		else if (ty==y && tm==m && (td-1)==d) s='Yesterday';
		else s=y+'-'+fillnumber(m)+'-'+fillnumber(d);
	}
		
	var h=t.getHours();
	if (h>12) h='PM'+' '+(h-12);
	else if (h==12) h='PM'+' '+h;
	else if (h==0) h='AM'+' '+12;
	else h='AM'+' '+h;
		
	return s+' '+h+dl+fillnumber(t.getMinutes())+dl+fillnumber(t.getSeconds());
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



function proc_openflash(){
	var s;
	if(gd_state2) s='/?m=Pixlr_Photo_Editor&state='+encodeURIComponent(gd_state2);
	else s='/';
	window.open(s);
}
var g_camstarted,g_sayCheese,g_timer;
function proc_openwebcam(){
	var a=_getid("div_webcamopen");
	if(a.style.display=='') return;
	a.style.display="";

	var controls=document.getElementsByClassName("controls")[0];	
	var c=getOffset(controls);
	a.style.left=(c.left-15)+'px';
	a.style.top=(getScrollTop()+15)+'px';
	
	_getid("imgsnap").src='';
	if(isopera){
		_getid("snap_width").disabled=true;
		_getid("snap_height").disabled=true;
		_getid("btn_default").disabled=true;
		_getid("c_lockaspect").disabled=true;
	}else{
		var w=getCookie("snap_width");
		if(w) _getid("snap_width").value=w;
		var h=getCookie("snap_height");
		if(h) _getid("snap_height").value=h;
		var s=getCookie("c_lockaspect");
		if(!s) _getid("c_lockaspect").checked=true;
		else _getid("c_lockaspect").checked=false;
	}
	
	if(g_sayCheese){
		var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
		if(a.length==0) g_sayCheese.start();
		return;
	}
	g_sayCheese = new SayCheese('#say-cheese-container', { audio: false });

	g_sayCheese.on('start', function() {
		clearInterval(g_timer);
		g_timer=setInterval(function(){
			var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
			if(a.length>0){
				if(!_getid("snap_width").value || !_getid("snap_height").value){
					if(!proc_deafultwebcam()) return;
				}else{
					size_onchange();
				}
				clearInterval(g_timer);
			}
		},300);
		if(g_camstarted) return;
		g_camstarted=true;
		$('#take-snapshot').on('click', function(evt) {
			if(!_getid("snap_width").value || !_getid("snap_height").value) proc_deafultwebcam();
			var w=_getid("snap_width").value;
			var h=_getid("snap_height").value;
			if(w<100) w=100; if(w>1000) w=1000;
			if(h<100) h=100; if(h>1000) h=1000;
			if(isopera){
				g_sayCheese.takeSnapshot();
			}else{
				g_sayCheese.takeSnapshot(w,h);
			}
		});
	});

	g_sayCheese.on('error', function(error) {
		var s='';
		if (error === 'NOT_SUPPORTED') {
            s="Your browser doesn't support video yet!";
		} else if (error === 'AUDIO_NOT_SUPPORTED') {
            s="Your browser doesn't support audio yet!";
		} else {
            s="You have to click 'allow' to try me out!";
		}
         show_message("Error: "+s);
	});

	g_sayCheese.on('snapshot', function(snapshot) {
          var img = _getid("imgsnap");
          $(img).on('load', function(){
			  _getid("say-cheese-snapshots").style.display='';
          });
          img.src = snapshot.toDataURL('image/png');
	});	
	g_sayCheese.start();
}
function proc_deafultwebcam(){
	var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
	if(a.length>0 && g_sayCheese && g_sayCheese.video){
		var w=g_sayCheese.video.videoWidth;
		var h=g_sayCheese.video.videoHeight;
		if(w && h){
			_getid("snap_width").value=w;
			_getid("snap_height").value=h;
			size_onchange();
			return true;
		}
	}
}
function proc_stopwebcam(){
	if(g_sayCheese && g_camstarted) g_sayCheese.stop();
	var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
	for (var i = a.length-1; i >= 0; i--){
		a[i].parentNode.removeChild(a[i]);
	}	
	_getid("say-cheese-snapshots").style.display='none';
}
function proc_closewebcam(){
	proc_stopwebcam();
	_getid("div_webcamopen").style.display="none";
}
function proc_okwebcam(){
	if(!g_Thumbnail){
		alert("Error!! Can not add to list.");
		return;
	}		
	var a=canvasController;
	if(a && a._Thumbnail.isNotAddThumbnail()){
		alert("You can not add a Photo Image anymore.");
		return;
	}
	var s=_getid("imgsnap").src;
	if(!s || s.length<100){
		show_message("Not selected!!");
		return;
	}
	if(g_Thumbnail){
		var name='Webcam Snapshot '+datetimetostring(new Date(),true);
		g_Thumbnail._onloadImage2(null, name, s);
	}
	proc_closewebcam();
}
function size_onchange(f){
	var w=_getid("snap_width").value;
	var h=_getid("snap_height").value;
	
	if(f && _getid("c_lockaspect").checked){
		var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
		if(a.length>0 && g_sayCheese && g_sayCheese.video){
			var ow=g_sayCheese.video.videoWidth;
			var oh=g_sayCheese.video.videoHeight;
			if(!ow || !oh) return;
			if(f==_getid("snap_width")){
				if(w<100) w=100; if(w>1000) w=1000;
				h=Math.floor(w*oh/ow);
				_getid("snap_height").value=h;
			}else{
				if(h<100) h=100; if(h>1000) h=1000;
				w=Math.floor(h*ow/oh);
				_getid("snap_width").value=w;
			}
			a[0].style.width=w+'px';
			a[0].style.height=h+'px';
			setCookie("snap_width",w);
			setCookie("snap_height",h);
		}
	}else{
		if(!w || !h) return;
		if(w<100) w=100; if(w>1000) w=1000;
		if(h<100) h=100; if(h>1000) h=1000;
		var a=_getid("say-cheese-container").getElementsByTagName('VIDEO');
		if(a.length>0){
			a[0].style.width=w+'px';
			a[0].style.height=h+'px';
			setCookie("snap_width",w);
			setCookie("snap_height",h);
		}
	}
}
function c_lockaspect_onclick(){
	if(_getid("c_lockaspect").checked){
		setCookie("c_lockaspect","");
		size_onchange(_getid("snap_width"));
	}else{
		setCookie("c_lockaspect","1");
	}
}
