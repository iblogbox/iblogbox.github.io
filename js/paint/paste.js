
var cp_imgbloburl,cp_lastprogress,cp_xhr;
(function() {
  var $, Paste, createHiddenEditable, dataURLtoBlob;

  $ = window.jQuery;

	function _resize(){
	  	if(document.getElementById('cp_imgprogress') && window.hide_message) hide_message();
	}
	if (window.addEventListener){
		window.addEventListener("resize", _resize, false);
	}else if (window.attachEvent){
		window.attachEvent("onresize", _resize);
	}
var cp_message = function(s,x,y,padding,timeout,fkind) {
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
	if(fkind) kind=fkind;
	
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
};


  $.paste = function(pasteContainer) {
    var pm;
    if (typeof console !== "undefined" && console !== null) {
      console.log("DEPRECATED: This method is deprecated. Please use $.fn.pastableNonInputable() instead.");
    }
    pm = Paste.mountNonInputable(pasteContainer);
    return pm._container;
  };

  $.fn.pastableNonInputable = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      Paste.mountNonInputable(el);
    }
    return this;
  };

  $.fn.pastableTextarea = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      Paste.mountTextarea(el);
    }
    return this;
  };

  $.fn.pastableContenteditable = function() {
    var el, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      Paste.mountContenteditable(el);
    }
    return this;
  };

  dataURLtoBlob = function(dataURL, sliceSize) {
    var b64Data, byteArray, byteArrays, byteCharacters, byteNumbers, contentType, i, m, offset, slice, _ref;
    if (sliceSize == null) {
      sliceSize = 512;
    }
    if (!(m = dataURL.match(/^data\:([^\;]+)\;base64\,(.+)$/))) {
      return null;
    }
    _ref = m, m = _ref[0], contentType = _ref[1], b64Data = _ref[2];
    byteCharacters = atob(b64Data);
    byteArrays = [];
    offset = 0;
    while (offset < byteCharacters.length) {
      slice = byteCharacters.slice(offset, offset + sliceSize);
      byteNumbers = new Array(slice.length);
      i = 0;
      while (i < slice.length) {
        byteNumbers[i] = slice.charCodeAt(i);
        i++;
      }
      byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
      offset += sliceSize;
    }
    return new Blob(byteArrays, {
      type: contentType
    });
  };

  createHiddenEditable = function() {
    return $(document.createElement('div')).attr('contenteditable', true).css({
      width: 1,
      height: 1,
      position: 'fixed',
      left: -100,
      overflow: 'hidden'
    });
  };

  Paste = (function() {
    Paste.prototype._target = null;

    Paste.prototype._container = null;

    Paste.mountNonInputable = function(nonInputable) {
      var paste;
      paste = new Paste(createHiddenEditable().appendTo(nonInputable), nonInputable);
      $(nonInputable).on('click', (function(_this) {
        return function() {
          return paste._container.focus();
        };
      })(this));
      paste._container.on('focus', (function(_this) {
        return function() {
          return $(nonInputable).addClass('pastable-focus');
        };
      })(this));
      return paste._container.on('blur', (function(_this) {
        return function() {
          return $(nonInputable).removeClass('pastable-focus');
        };
      })(this));
    };

    Paste.mountTextarea = function(textarea) {
      var ctlDown, paste;
      if (-1 !== navigator.userAgent.toLowerCase().indexOf('chrome')) {
        return this.mountContenteditable(textarea);
      }
      paste = new Paste(createHiddenEditable().insertBefore(textarea), textarea);
      ctlDown = false;
      $(textarea).on('keyup', function(ev) {
        var _ref;
        if ((_ref = ev.keyCode) === 17 || _ref === 224) {
          return ctlDown = false;
        }
      });
      $(textarea).on('keydown', function(ev) {
        var _ref;
        if ((_ref = ev.keyCode) === 17 || _ref === 224) {
          ctlDown = true;
        }
        if (ctlDown && ev.keyCode === 86) {
          return paste._container.focus();
        }
      });
      $(paste._target).on('pasteImage', (function(_this) {
        return function() {
          return $(textarea).focus();
        };
      })(this));
      $(paste._target).on('pasteText', (function(_this) {
        return function() {
          return $(textarea).focus();
        };
      })(this));
      $(textarea).on('focus', (function(_this) {
        return function() {
          return $(textarea).addClass('pastable-focus');
        };
      })(this));
      return $(textarea).on('blur', (function(_this) {
        return function() {
          return $(textarea).removeClass('pastable-focus');
        };
      })(this));
    };

    Paste.mountContenteditable = function(contenteditable) {
      var paste;
      paste = new Paste(contenteditable, contenteditable);
      $(contenteditable).on('focus', (function(_this) {
        return function() {
          return $(contenteditable).addClass('pastable-focus');
        };
      })(this));
      return $(contenteditable).on('blur', (function(_this) {
        return function() {
          return $(contenteditable).removeClass('pastable-focus');
        };
      })(this));
    };

    function Paste(_at__container, _at__target) {
      this._container = _at__container;
      this._target = _at__target;
      this._container = $(this._container);
      this._target = $(this._target).addClass('pastable');
      this._container.on('paste', (function(_this) {
        return function(ev) {
			
			var imgfound;
			function isimageurl(s){
				if(s.indexOf("http://")==0 || s.indexOf("https://")==0 || s.indexOf("data:image/")==0) return true;
			}

          var clipboardData, file, item, reader, text, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _results;
          if (((_ref = ev.originalEvent) != null ? _ref.clipboardData : void 0) != null) {
            clipboardData = ev.originalEvent.clipboardData;
			//console.log(clipboardData);

            if (clipboardData.items) {
              _ref1 = clipboardData.items;
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                item = _ref1[_i];
                if (item.type.match(/^image\//)) {
                  reader = new FileReader();
                  reader.onload = function(event) {
                    if(!imgfound){
						imgfound=true;
						_this._handleImage(event.target.result);					
					}
                  };
                  reader.readAsDataURL(item.getAsFile());				  
                }
				if (item.type === 'text/plain') {
                  item.getAsString(function(string) {
						if(isimageurl(string)){
						    if(!imgfound){
								imgfound=true;	
								_this._handleImage(string);					
							}
						}
						_this._target.trigger('pasteText', {
							text: string
						});
                  });
                }
              }
            } else {
              if (-1 !== Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                text = clipboardData.getData('Text');
				  if(isimageurl(text)){
				    if(!imgfound){
						imgfound=true;
						_this._handleImage(text);					
					}
				  }
                _this._target.trigger('pasteText', {
                  text: text
                });
              }
              _this._checkImagesInContainer(function(src) {
				    if(!imgfound){
						imgfound=true;
						_this._handleImage(src);					
					}
              });
            }
          }

          if (clipboardData = window.clipboardData) {
            if ((_ref2 = (text = clipboardData.getData('Text'))) != null ? _ref2.length : void 0) {
				  if(isimageurl(text)){
				    if(!imgfound){
						imgfound=true;
						_this._handleImage(text);					
					}
				  }
	              return _this._target.trigger('pasteText', {
		            text: text
			      });
            } else {
              _ref3 = clipboardData.files;
			  if(!_ref3)return;
              _results = [];
              for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                file = _ref3[_j];
			    if(!imgfound){
					imgfound=true;
					_this._handleImage(URL.createObjectURL(file));
				}                
                _results.push(_this._checkImagesInContainer(function() {}));
              }
              return _results;
            }
          }
        };
      })(this));
    }

    Paste.prototype._handleImage = function(src) {
		var self=this;

	function go(src){
		if(src.indexOf("data:image/png;")==0){
			self._target.trigger('pasteImage', {
              dataURL: src
            });
			return;
		}
      var loader;
      loader = new Image();
	  loader.onerror=function(){
		  alert('Image Error!!');
	  }
      loader.onload = (function(_this) {
        return function() {
		  //alert(loader.width);		  
          var blob, canvas, ctx, dataURL;
          canvas = document.createElement('canvas');
          canvas.width = loader.width;
          canvas.height = loader.height;
          ctx = canvas.getContext('2d');
          ctx.drawImage(loader, 0, 0, canvas.width, canvas.height);
          dataURL = null;
          try {
            dataURL = canvas.toDataURL('image/png');
            //blob = dataURLtoBlob(dataURL);
          } catch (_error) {}
          if (dataURL) {
            return _this._target.trigger('pasteImage', {
              blob: blob,
              dataURL: dataURL,
              width: loader.width,
              height: loader.height
            });
          }
        };
      })(self);
	  loader.src = src;
	}

		if(src.indexOf("http")==0){
			function end(){
				if(window.hide_message) hide_message();
			}
				try{
					if(window.show_message) show_message('<div id="cp_imgprogress">Downloading...</div>','','','',1000*60,2);
					var url='https://proxyrss.herokuapp.com/geturl.php?url='+encodeURIComponent(src)+"&ref=1";					
					if(!cp_xhr){
						cp_xhr=new XMLHttpRequest();
					}else{
						cp_xhr.abort();
					}
				    var xhr = cp_xhr;
					xhr.open('GET', url);
					xhr.responseType = 'arraybuffer';
					xhr.onprogress=function(event){
						if(cp_lastprogress){
							var elaspetime = new Date();
							var dt=(elaspetime.getTime()-cp_lastprogress)/1000;
							if(dt<1)return;
							cp_lastprogress=elaspetime.getTime();
						}
						var a=event;
						var total=a.totalSize || a.total || 0;
						if(total>=18446744073709552000) total=0;
						var current=a.position || a.loaded  || 0;
						//var c=_getid('layer_message');
						//if(c) c.innerHTML='<label>Downloading... ('+number_format(current)+'/'+number_format(total)+')</label>';
						if(window.show_message) show_message('<div id="cp_imgprogress">Downloading... ('+number_format(current)+'/'+number_format(total)+')</div>','','','',1000*60,2);
					};
				    xhr.onload = function(){
						end();
						if(this.status == 200){
							var blob = new Blob([this.response]);
							if(cp_imgbloburl){
								(window.URL || window.webkitURL).revokeObjectURL(cp_imgbloburl);
								cp_imgbloburl='';
							}
							cp_imgbloburl=(window.URL || window.webkitURL).createObjectURL(blob);
							go(cp_imgbloburl);
						}else{
							alert("Error (status) " + this.status + "("+this.statusText+") occurred while receiving the file.");
						}
					};
					xhr.onerror = function(e){      
						end();
						alert("Error " + e.target.status + " occurred while receiving the file.");
					};
					xhr.send();
				}catch(err){
					end();
					alert("Error occurred while receiving the file. Retry again or this browser does not support.");
				}
		}else{
			go(src);
		}
    };

    Paste.prototype._checkImagesInContainer = function(cb) {
      var img, timespan, _i, _len, _ref;
      timespan = Math.floor(1000 * Math.random());
      _ref = this._container.find('img');
	  //console.log(_ref);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        img = _ref[_i];
        img["_paste_marked_" + timespan] = true;
      }
      return setTimeout((function(_this) {
        return function() {
          var _j, _len1, _ref1, _results;
          _ref1 = _this._container.find('img');
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            img = _ref1[_j];
            if (!img["_paste_marked_" + timespan]) {
              cb(img.src);
            }
            _results.push($(img).remove());
          }
          return _results;
        };
      })(this), 1);
    };

    return Paste;

  })();

}).call(this);
