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
    FILE_MAX_SIZE_MB : 20,
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
	var holder = document;
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
     * @param filterName
     * @private
     */
    _onClickFilters: function (filterName) {
        this._putFilterImage(filterName);
    },
    /**
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
				var blob=b64toBlob(strData.substr(strData.indexOf(",")+1,strData.length), strMime);
				if(navigator.msSaveBlob){			
					navigator.msSaveBlob(blob, filename+'.'+ext);
				}else{
					if(glastbloburl) window.URL.revokeObjectURL(glastbloburl);
					glastbloburl=window.URL.createObjectURL(blob);
					window.open(glastbloburl); //edit
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
     * @param {number} changeWidth
     * @param {number} changeHeight
     */
    _saveCanvasImage: function () {
		var filetype='';
		if(this._CanvasImage){
			filetype=this._CanvasImage.filetype;
		}
		var mt='image/jpeg';
		if(filetype=='png' || filetype=='gif' || filetype=='svg' || filetype=='ico') mt='image/png';

		var imageData = this._Canvas.getCanvas().toDataURL(mt);
		if(this._CanvasImage){
	        this._CanvasImage.setCallback(null);
		    this._CanvasImage.setImageSrc(imageData);
		}
    },
    /**
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
        this._image.src = this.fileSrc || "";

		this.filetype='';
		//data:image/gif;base64,
		var s1=this._image.src.substr(0, this._image.src.indexOf(",")+1);
		if(s1.length<400){
			//console.log(s1);
			s1=s1.toLowerCase();
			if(s1.indexOf("/jpg")>=0 || s1.indexOf("/jpeg")>=0){
				this.filetype='jpg';
			}else if(s1.indexOf("/png")>=0){
				this.filetype='png';
			}else if(s1.indexOf("/gif")>=0){
				this.filetype='gif';
			}else if(s1.indexOf("svg")>=0){
				this.filetype='svg';
			}else if(s1.indexOf("ico")>=0){
				this.filetype='ico';
			}
		}

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
		clearTimeout(self._loadtimer);
		self._loadtimer=setTimeout(function(){						
			self.onLoadFilter2(canvasImage);
			if(issafari){
				clearTimeout(self._loadtimer);
				self._loadtimer=setTimeout(function(){						
					self.onLoadFilter2(canvasImage);
				},900);
			}
		},100);
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
