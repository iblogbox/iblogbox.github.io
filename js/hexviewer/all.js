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



if (!''.repeat) {
    // ECMAScript 6
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
    String.prototype.repeat = function (count) {
        // cast to int
        count = Math.floor(count);

        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        } else if (count > Infinity) {
            throw new RangeError('repeat count must be less than infinity');
        }
        return new Array(count + 1).join(this);
    };
}


var Annotations = function (annots) {
    'use strict';
    /**
     * Annotations JSON format:
     * {
     *  "offset":   int,    // offset in bits
     *  "length:    int,    // length in bits
     *  "name":     string, // short name (4 bytes, not ness. uniq.)
     *  "desc":     string  // description / comment
     * }
     */

    // turn of validation if it is too expensive
    var validate = true;
    if (validate) {
        var offset = 0;
        annots.forEach(function (annot) {
            if (typeof annot != 'object' ||
                typeof annot.offset != 'number' ||
                typeof annot.length != 'number' ||
                typeof annot.name != 'string' ||
                typeof annot.desc != 'string') {
                throw 'Invalid types';
            }
            if (annot.offset < offset || !isFinite(annot.offset)) {
                throw 'Invalid offset: ' + annot.offset;
            }
            if (annot.length < 0 || !isFinite(annot.length)) {
                throw 'Length must be positive: ' + annot.length;
            }
            offset += annot.length;
        });
    }

    // must not be expensive!
    function getAnnotations() {
        // XXX: make immutable?
        return annots;
    }

    // exports
    this.getAnnotations = getAnnotations;
};

/**
 * Returns an Annotations instance from a string created using the 'fieldsize'
 * program.
 */
Annotations.loadFieldsizeFormat = function (string) {
    var annots = [];
    // offset in bits
    var offset = 0;
    // [ name, size, desc ]
    var infoPatt = /^\s*([\w ]{4}), *(\d+)(?:, *(?:\/\/ byte 0x[\da-f]+ +bit \d+ +(.+))?)? *$/i;
    var offsetPatt = /^\s*Offset *\((0x[\da-f]+)\),/i;

    string.split('\n').forEach(function (line) {
        // skip empty lines
        if (!line)
            return;

        var info = infoPatt.exec(line);
        if (!info) {
            var offsetInfo = offsetPatt.exec(line);
            if (!offsetInfo)
                throw 'Unrecognized line: ' + line;
            offset = 8 * parseInt(offsetInfo[1], 16);
            return;
        }
        annots.push({
            offset: offset,
            length: 1 * info[2],
            name: info[1],
            desc: info[3] || ''
        });
        offset += 1 * info[2];
    });

    return new Annotations(annots);
};

/**
 * Returns an array with the first and last (exclusive) byte that gets occupied
 * by this annotation.
 */
Annotations.bits_to_byterange = function (bit_begin, bit_end) {
    var begin = Math.floor(bit_begin / 8);
    var end = Math.ceil(bit_end / 8);
    return [begin, end];
};
Annotations.annot_to_byterange = function (annot) {
    var len = annot.offset + annot.length;
    return Annotations.bits_to_byterange(annot.offset, len);
};
/* vim: set sw=4 et ts=4: */


var HexViewer = (function (id) {
    'use strict';
    /* note: change in CSS too */
    var COLUMNS = 16;

    /* prefs */
    var autoCenter = true;

    // .hex-viewer
    // + .bits-n-bytes
    //   + .hexasc
    //     + .hex
    //     + .asc
    //   + .bits
    // + .annotations
    var container = document.getElementById(id);
    var bnbPanel = document.createElement('div');
    var hexascPanel = document.createElement('div');
    var hexPanel = document.createElement('div');
    var bitPanel = document.createElement('div');
    var ascPanel = document.createElement('div');
    var annoPanel = document.createElement('div');
    container.className = 'hex-viewer';
    bnbPanel.className = 'bits-n-bytes';
    hexascPanel.className = 'hexasc';
	hexascPanel.id='hexasc';
    hexPanel.className = 'hex';
	hexPanel.id='hex';
    ascPanel.className = 'asc';
	ascPanel.id='asc';
    bitPanel.className = 'bits';
    annoPanel.className = 'annotations';
	annoPanel.style.display='none';

    [hexPanel, ascPanel].forEach(function (panel) {
        hexascPanel.appendChild(panel);
    });
    [hexascPanel, bitPanel].forEach(function (panel) {
        bnbPanel.appendChild(panel);
    });
    [bnbPanel, annoPanel].forEach(function (panel) {
        container.appendChild(panel);
    });

    // ByteView of the data buffer
    var byteView;
    // contains HTMLElements for the hex and ascii boxes
    var hexBoxes = [];
    var ascBoxes = [];

    // contains HTMLElements for annotations
    var annoLines = [];
    // annotations object
    var annotations;

    function annosIntoView() {
        var elms = annoPanel.querySelectorAll('.hover-before, .hover, .hover-after');
        if (elms.length) {
            centerElement(elms[0], elms[elms.length - 1]);
        }
    }
    function bytesIntoView(begin, end) {
        begin = Math.min(ascBoxes.length - 1, begin);
        end = Math.min(ascBoxes.length - 1, end);
        centerElement(ascBoxes[begin], ascBoxes[end]);
    }

    function hiliteAnnotBits(annots, begin_i, end_i) {
        var annot_i = begin_i;
        var beginByte = Math.floor(annots[begin_i].offset / 8);
        var endByte = Math.ceil((annots[end_i].offset + annots[end_i].length) / 8);
        endByte = Math.min(endByte, byteView.byteLength);

        bitPanel.innerHTML = '';
        var bitFragment = document.createDocumentFragment();
        var in_slice = false, slice = -1;
        for (var b = beginByte; b < endByte; ++b) {
            var byteData = byteView[b];
            for (var bi = 7; bi >= 0; --bi) {
                if (8 * b + (7 - bi) == annots[annot_i].offset) {
                    in_slice = true;
                    ++slice;
                }

                var bitBox = document.createElement('span');
                if (in_slice) {
                    bitBox.className = slice % 2 ? 'odd' : 'even';
                }
                bitBox.textContent = byteData & (1 << bi) ? 1 : 0;
                bitFragment.appendChild(bitBox);

                // check following bit
                var endBit = annots[annot_i].offset + annots[annot_i].length;
                if (in_slice && 8 * b + (8 - bi) == endBit) {
                    in_slice = false;
                    if (annot_i < end_i) {
                        ++annot_i;
                    }
                }
            }
        }

        bitPanel.appendChild(bitFragment);
    }

    // highlight the bytes that share a bit with the slice (if the annotation
    // falls outside the slice, extend the slice)
    function hiliteBits(offset_bit, bits, baseCls) {
        var byteRange;

        if (!baseCls)
            baseCls = 'hover';

        var annots;
        // indexes of annotation elements just before or after selection
        var prev_anno_i = -1, next_anno_i = end + 1;
        if (annotations) {
            annots = annotations.getAnnotations();
            // annotation indexes
            var i, begin = Infinity, end = annots.length - 1;
            // find begin of annotations
            for (i = 0; i < annots.length; ++i) {
                // if the annotation starts in this slice
                if (annots[i].offset >= offset_bit) {
                    prev_anno_i = i - 1;
                    next_anno_i = prev_anno_i + 1;
                    // check if annotation is actually in the slice (i.e. if the
                    // annotation starts before the end of the slice)
                    if (annots[i].offset < offset_bit + bits) {
                        begin = i;
                    }
                    break;
                }
            }
            // if there are annotations in range, find the end
            if (begin <= end) {
                for (; i < annots.length; ++i) {
                    // if the annotation ends past the end
                    if (annots[i].offset + annots[i].length > offset_bit + bits) {
                        // end is last annotation that is contained in slice
                        end = i - 1;
                        next_anno_i = i;
                        break;
                    }
                }
                offset_bit = annots[begin].offset;
                bits = annots[end].offset - offset_bit + annots[end].length;

                // TODO: consider marking on hover too
                if (baseCls === 'selected') {
                    hiliteAnnotBits(annots, begin, end);
                }
            }

            // mark previous, "selected" and next annotations
            if (prev_anno_i >= 0) {
                annoLines[prev_anno_i].classList.add(baseCls + '-before');
            }
            for (i = begin; i <= end; ++i) {
                annoLines[i].classList.add(baseCls);
            }
            if (next_anno_i < annots.length) {
                annoLines[next_anno_i].classList.add(baseCls + '-after');
            }
        }

        // selected bits range
        hiliteBytesBits(offset_bit, bits, baseCls);

        // mark bytes before and after selection
        if (annotations) {
            var annot;
            if (prev_anno_i >= 0) {
                annot = annots[prev_anno_i];
                hiliteBytesBits(annot.offset, annot.length, baseCls + '-before');
            }
            if (next_anno_i < annots.length) {
                annot = annots[next_anno_i];
                hiliteBytesBits(annot.offset, annot.length, baseCls + '-after');
            }
        }
    }

    function hiliteBytesBits(offset_bit, bits, className) {
        var begin = offset_bit / 8;
        // annotations may be longer than the bytes
        var end_bit = Math.min(8 * ascBoxes.length, offset_bit + bits);

        if (offset_bit >= end_bit) {
            return;
        }

        if (offset_bit % 8) {
            begin = Math.floor(begin);
            ascBoxes[begin].classList.add('partial');
            hexBoxes[begin].classList.add('partial');
        }

        for (var byte_no = begin; byte_no < end_bit / 8; ++byte_no) {
            ascBoxes[byte_no].classList.add(className);
            hexBoxes[byte_no].classList.add(className);
        }

        if (end_bit % 8) {
            var end = Math.floor(end_bit / 8);
            ascBoxes[end].classList.add('partial');
            hexBoxes[end].classList.add('partial');
        }
    }

    // returns begin byte and length (in bytes) of the element (byte in boxes or
    // annotations). null if the elm element is invalid.
    function findElmBytes(src_boxes, elm) {
        if (src_boxes) {
            var byte_no = src_boxes.indexOf(elm);
            if (byte_no == -1) {
                return null;
            }
            // find first annotation that contains (part of) this byte
            if (annotations) {
                var annots = annotations.getAnnotations();
                for (var i = 0; i < annots.length; ++i) {
                    var annot = annots[i];
                    var abegin = annot.offset;
                    var aend = abegin + annot.length;
                    if (8 * byte_no < aend && abegin < 8 * (byte_no + 1)) {
                        var range = Annotations.annot_to_byterange(annot);
                        return [range[0], range[1] - range[0]];
                    }
                }
            }

            // fallback to the whole byte
            return [byte_no, 1];
        } else {
            if (!elm.classList.contains('line')) {
                return null;
            }
			if(elm.dataset !== undefined){
		        var begin = Math.floor(elm.dataset.offset / 8);
	            var len = elm.dataset.byteEnd - elm.dataset.byteStart;
			}else{
		        var begin = Math.floor(elm.getAttribute("data-offset") / 8);
	            var len = elm.getAttribute("data-byte-end") - elm.getAttribute("data-byte-start");
			}
            return [begin, len];
        }
    }

    // generated listener callback to highlight boxes and annotations
    function addSelecter(src_boxes) {
        return function (ev) {
            var byteInfo = findElmBytes(src_boxes, ev.target);
            if (!byteInfo) {
                return;
            }
            hiliteBits(8 * byteInfo[0], 8 * byteInfo[1]);
            if (autoCenter) {
                if (src_boxes) { // bytes
                    annosIntoView();
                } else { // annotations
                    bytesIntoView(byteInfo[0], byteInfo[0] + byteInfo[1]);
                }
            }
        };
    }

    function clearSelecter() {
        removeSelectionClasses('hover');
    }

    function removeSelectionClasses(base) {
        [base, base + '-before', base + '-after'].forEach(function (className) {
            var affected = container.getElementsByClassName(className);
            for (var i = affected.length - 1; i >= 0; --i) {
                var classList = affected[i].classList;
                // HACK: drop 'partial' if (1) the class to be removed is the
                // selection or (2) the class to be removed is not the selection
                // and the box is not part of a selection
                if (base === 'selected' || !classList.contains('selected')) {
                    classList.remove('partial');
                }
                classList.remove(className);
            }
        });
    }

    function togglePermSelect(boxes) {
        return function (ev) {
            var byteInfo = findElmBytes(boxes, ev.target);
            if (!byteInfo) {
                return;
            }
            var isSelected = ev.target.classList.contains('selected');
            removeSelectionClasses('selected');
            if (!isSelected) {
                hiliteBits(8 * byteInfo[0], 8 * byteInfo[1], 'selected');
                if (boxes) { // bytes
                    annosIntoView();
                } else { // annotations
                    bytesIntoView(byteInfo[0], byteInfo[0] + byteInfo[1]);
                }
                autoCenter = false;
            } else {
                // TODO: if 'partial' is kept, then the refresh is not needed
                hiliteBits(8 * byteInfo[0], 8 * byteInfo[1], 'hover');
                // no selection, no bits to highlight
                bitPanel.innerHTML = '';
                // no selection - feel free to center!
                autoCenter = true;
            }
        };
    }

    hexPanel.addEventListener('mouseover', addSelecter(hexBoxes));
    ascPanel.addEventListener('mouseover', addSelecter(ascBoxes));
    annoPanel.addEventListener('mouseover', addSelecter(null));
    hexPanel.addEventListener('mouseout', clearSelecter);
    ascPanel.addEventListener('mouseout', clearSelecter);
    annoPanel.addEventListener('mouseout', clearSelecter);
    hexPanel.addEventListener('click', togglePermSelect(hexBoxes));
    ascPanel.addEventListener('click', togglePermSelect(ascBoxes));
    annoPanel.addEventListener('click', togglePermSelect(null));

    function to_ascii(b) {
        if (b >= 0x20 && b < 0x7F) {
            return String.fromCharCode(b);
        }
        // not a printable ASCII character, ignore.
        return '.';
    }

    // center elements on screen if not already visible. elm and bottomElm must
    // have the same parent, elm must be located before bottomElm.
    function centerElement(elm, bottomElm) {
        var par = elm.parentNode;
        if (!bottomElm) bottomElm = elm;
        var parRect = par.getBoundingClientRect();
        var topRect = elm.getBoundingClientRect();
        var botRect = bottomElm.getBoundingClientRect();

        var topDiff = topRect.top - parRect.top;
        var botDiff = botRect.bottom - parRect.bottom;
        // topDiff is negative if element is clipped at top by its parent
        if (topDiff < 0) {
            // so scroll up a little bit (remove the diff)
            par.scrollTop += topDiff;
        } else if (botDiff > 0) {
            // botDiff is positive if the element bottom gets past its parent
            // bottom, so scroll down
            par.scrollTop += botDiff;
        }
    }

    // Loads an ArrayBuffer into the page (hex, ascii)
    function loadData(buffer, byteView, start) {
        // bytes per line
        if(!byteView) byteView = new Uint8Array(buffer);

        hexPanel.innerHTML = '';
        ascPanel.innerHTML = '';
        // cannot simply overwrite array as addSelector encapsulated it
        hexBoxes.splice(0, hexBoxes.length);
        ascBoxes.splice(0, ascBoxes.length);

        // appending directly slows down
        var hexFragment = document.createDocumentFragment();
        var ascFragment = document.createDocumentFragment();

        // length of biggest line number (in hex)
        //var lineno_length = byteView.byteLength.toString(16).length;
        var lineno_length = 7; // hard-coded 8 (including colon) in CSS
        var lineno_pad = '0'.repeat(lineno_length);

		var st = (new Date()).getTime();
		
		/*var s,s2;
		var arr=[];
		var arr2=[];
        for (var i = 0; i < byteView.byteLength; i += COLUMNS) {
			s=(lineno_pad + i.toString(16)).substr(-lineno_length)+' &nbsp;';
			s2='';
            var cols = Math.min(COLUMNS, byteView.byteLength - i);
            for (var j = 0; j < cols; ++j) {
				var b = byteView[i + j];
				s+=('0' + b.toString(16)).substr(-2)+' &nbsp;'
				s2+=to_ascii(b)+' &nbsp;'				
            }

			arr.push(s);
			arr2.push(s2);
        }
		s=arr.join('<br>');
		hexPanel.innerHTML=s;
		s2=arr2.join('<br>');
		ascPanel.innerHTML=s2;*/
		
		var s;
        for (var i = 0; i < byteView.byteLength; i += COLUMNS) {
            var hexLine = document.createElement('div');
            var ascLine = document.createElement('div');
            hexLine.className = 'line';
            ascLine.className = 'line';

			if(start) s=(lineno_pad + (i+start).toString(16)).substr(-lineno_length);
			else s=(lineno_pad + i.toString(16)).substr(-lineno_length);
			if(hexLine.dataset !== undefined){
				hexLine.dataset.lineNo=s;
			}else{
				hexLine.setAttribute("data-line-no",s);
			}

            var cols = Math.min(COLUMNS, byteView.byteLength - i);
            for (var j = 0; j < cols; ++j) {
                var hexBox = document.createElement('span');
                var ascBox = document.createElement('span');

                var b = byteView[i + j];
                hexBox.textContent = ('0' + b.toString(16)).substr(-2);
                ascBox.textContent = to_ascii(b);

                hexBoxes.push(hexBox);
                ascBoxes.push(ascBox);

                hexLine.appendChild(hexBox);
                ascLine.appendChild(ascBox);
            }
            hexFragment.appendChild(hexLine);
            ascFragment.appendChild(ascLine);
        }
        hexPanel.appendChild(hexFragment);
        ascPanel.appendChild(ascFragment);

		var et = (new Date()).getTime();
		//alert(et-st);
    }

    /* annotations related stuff */

    // annots is an Annotations instance
    function setAnnotations(annots) {
        annotations = annots;

        annoPanel.innerHTML = '';
        annoLines = [];

        var annFragment = document.createDocumentFragment();
        annots.getAnnotations().forEach(function (annot) {
            var line = document.createElement('div');
            line.className = 'line';

			if(elm.dataset !== undefined){
		        line.dataset.offset = annot.offset;
	            line.dataset.length = annot.length;
			}else{
				line.setAttribute("data-offset",annot.offset);
				line.setAttribute("data-length",annot.length);
			}

            var byteRange = Annotations.annot_to_byterange(annot);
			if(elm.dataset !== undefined){
		        line.dataset.byteStart = byteRange[0];
	            line.dataset.byteEnd = byteRange[1];
			}else{
				line.setAttribute("data-byte-start",byteRange[0]);
				line.setAttribute("data-byte-end",byteRange[1]);
			}

            line.textContent = annot.name + ': ' + annot.desc;

            annoLines.push(line);
            annFragment.appendChild(line);
        });

        annoPanel.appendChild(annFragment);
    }

    // exports
    this.loadData = loadData;
    //this.handleFilePicker = handleFilePicker;
    this.setAnnotations = setAnnotations;
});
/* vim: set sw=4 et ts=4: */
