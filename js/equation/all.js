var g_expires=1000*60*60*24*365*5; 	
var ischrome=false;
var isgecko=false;
var isopera=false;
var ismsie=false;
var issafari=false;

if (navigator.appName=="Netscape"){
	if (navigator.userAgent.indexOf("Chrome")>=0) ischrome=true;
	if (navigator.userAgent.indexOf("Gecko")>=0) isgecko=true;
	if (navigator.userAgent.indexOf("Safari")>=0) issafari=true;
} else {
	if (navigator.userAgent.indexOf("Opera")>=0) isopera=true;
	if (navigator.userAgent.indexOf("MSIE")>=0) ismsie=true;	
}

function setCookie(name, value) { 
  var expires=g_expires;
  path="/";
  domain=".atomurl.net";
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

function getCookie(name, defaultValue) {
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
  return defaultValue;
}	
	
function _getid(id){
	return document.getElementById(id);
}	

function _getinnertext(f){
	var s=f.innerText;
	if (!s){
		s=f.innerHTML;
		s=s.replace(/(<br>)/ig,' '); 
		s=s.replace(/(<[^>]+>)/g,''); 
	}
	return s;
}

function html_entity_encode(str){
  str = str.replace(/&/gi, "&amp;");
  str = str.replace(/>/gi, "&gt;");
  str = str.replace(/</gi, "&lt;");
  str = str.replace(/\"/gi, "&quot;");
  str = str.replace(/\'/gi, "&#039;");
  return str;
}

function toBool(str){
  return ("false" === str) ? false : true;
}


function sprintf() {
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments, i = 0, format = a[i++];
 
    // pad()
    var pad = function (str, len, chr, leftJustify) {
        if (!chr) {chr = ' ';}
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };
 
    // justify()
    var justify = function (value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, customPadChar, leftJustify);
            } else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };
 
    // formatBaseX()
    var formatBaseX = function (value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };
 
    // formatString()
    var formatString = function (value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };
 
    // doFormat()
    var doFormat = function (substring, valueIndex, flags, minWidth, _, precision, type) {
        var number;
        var prefix;
        var method;
        var textTransform;
        var value;
 
        if (substring == '%%') {return '%';}
 
        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false, customPadChar = ' ';
        var flagsl = flags.length;
        for (var j = 0; flags && j < flagsl; j++) {
            switch (flags.charAt(j)) {
                case ' ': positivePrefix = ' '; break;
                case '+': positivePrefix = '+'; break;
                case '-': leftJustify = true; break;
                case "'": customPadChar = flags.charAt(j+1); break;
                case '0': zeroPad = true; break;
                case '#': prefixBaseX = true; break;
            }
        }
 
        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }
 
        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }
 
        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }
 
        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : undefined;
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }
 
        // grab value using valueIndex if required?
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
 
        switch (type) {
            case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
            case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
            case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
            case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'i':
            case 'd':
                number = parseInt(+value, 10);
                prefix = number < 0 ? '-' : positivePrefix;
                value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                return justify(value, prefix, leftJustify, minWidth, zeroPad);
            case 'e':
            case 'E':
            case 'f':
            case 'F':
            case 'g':
            case 'G':
                number = +value;
                prefix = number < 0 ? '-' : positivePrefix;
                method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                value = prefix + Math.abs(number)[method](precision);
                return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
            default: return substring;
        }
    };
 
    return format.replace(regex, doFormat);
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
	
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";

	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";

	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return radioObj[i].value;
		}
	}
	return "";
}

function setCheckedValue(radioObj, newValue) {
	if(!radioObj)
		return;
	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		radioObj.checked = (radioObj.value == newValue.toString());
		return;
	}
	for(var i = 0; i < radioLength; i++) {
		radioObj[i].checked = false;
		if(radioObj[i].value == newValue.toString()) {
			radioObj[i].checked = true;
		}
	}
}

/*jscolor.js*/
var jscolor = {
    dir: "/math/js/jscolor/",
    bindClass: "color",
    binding: true,
    preloading: true,
    install: function() {
        jscolor.addEvent(window, "load", jscolor.init)
    },
    init: function() {
        if (jscolor.binding) {
            jscolor.bind()
        }
        if (jscolor.preloading) {
            jscolor.preload()
        }
    },
    getDir: function() {
        if (!jscolor.dir) {
            var a = jscolor.detectDir();
            jscolor.dir = a !== false ? a : "jscolor/"
        }
        return jscolor.dir
    },
    detectDir: function() {
        var c = location.href;
        var d = document.getElementsByTagName("base");
        for (var a = 0; a < d.length; a += 1) {
            if (d[a].href) {
                c = d[a].href
            }
        }
        var d = document.getElementsByTagName("script");
        for (var a = 0; a < d.length; a += 1) {
            if (d[a].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(d[a].src)) {
                var f = new jscolor.URI(d[a].src);
                var b = f.toAbsolute(c);
                b.path = b.path.replace(/[^\/]+$/, "");
                b.query = null;
                b.fragment = null;
                return b.toString()
            }
        }
        return false
    },
    bind: function() {
        var matchClass = new RegExp("(^|\\s)(" + jscolor.bindClass + ")\\s*(\\{[^}]*\\})?", "i");
        var e = document.getElementsByTagName("input");
        for (var i = 0; i < e.length; i += 1) {
            var m;
            if (!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
                var prop = {};
                if (m[3]) {
                    try {
                        eval("prop=" + m[3])
                    } catch (eInvalidProp) {}
                }
                e[i].color = new jscolor.color(e[i], prop)
            }
        }
    },
    preload: function() {
        for (var a in jscolor.imgRequire) {
            if (jscolor.imgRequire.hasOwnProperty(a)) {
                jscolor.loadImage(a)
            }
        }
    },
    images: {
        pad: [181, 101],
        sld: [16, 101],
        cross: [15, 15],
        arrow: [7, 11]
    },
    imgRequire: {},
    imgLoaded: {},
    requireImage: function(a) {
        jscolor.imgRequire[a] = true
    },
    loadImage: function(a) {
        if (!jscolor.imgLoaded[a]) {
            jscolor.imgLoaded[a] = new Image();
            jscolor.imgLoaded[a].src = jscolor.getDir() + a
        }
    },
    fetchElement: function(a) {
        return typeof a === "string" ? document.getElementById(a) : a
    },
    addEvent: function(a, c, b) {
        if (a.addEventListener) {
            a.addEventListener(c, b, false)
        } else {
            if (a.attachEvent) {
                a.attachEvent("on" + c, b)
            }
        }
    },
    fireEvent: function(a, c) {
        if (!a) {
            return
        }
        if (document.createEvent) {
            var b = document.createEvent("HTMLEvents");
            b.initEvent(c, true, true);
            a.dispatchEvent(b)
        } else {
            if (document.createEventObject) {
                var b = document.createEventObject();
                a.fireEvent("on" + c, b)
            } else {
                if (a["on" + c]) {
                    a["on" + c]()
                }
            }
        }
    },
    getElementPos: function(c) {
        var d = c,
            b = c;
        var a = 0,
            f = 0;
        if (d.offsetParent) {
            do {
                a += d.offsetLeft;
                f += d.offsetTop
            } while (d = d.offsetParent)
        }
        while ((b = b.parentNode) && b.nodeName.toUpperCase() !== "BODY") {
            a -= b.scrollLeft;
            f -= b.scrollTop
        }
        return [a, f]
    },
    getElementSize: function(a) {
        return [a.offsetWidth, a.offsetHeight]
    },
    getRelMousePos: function(b) {
        var a = 0,
            c = 0;
        if (!b) {
            b = window.event
        }
        if (typeof b.offsetX === "number") {
            a = b.offsetX;
            c = b.offsetY
        } else {
            if (typeof b.layerX === "number") {
                a = b.layerX;
                c = b.layerY
            }
        }
        return {
            x: a,
            y: c
        }
    },
    getViewPos: function() {
        if (typeof window.pageYOffset === "number") {
            return [window.pageXOffset, window.pageYOffset]
        } else {
            if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                return [document.body.scrollLeft, document.body.scrollTop]
            } else {
                if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                    return [document.documentElement.scrollLeft, document.documentElement.scrollTop]
                } else {
                    return [0, 0]
                }
            }
        }
    },
    getViewSize: function() {
        if (typeof window.innerWidth === "number") {
            return [window.innerWidth, window.innerHeight]
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                return [document.body.clientWidth, document.body.clientHeight]
            } else {
                if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                    return [document.documentElement.clientWidth, document.documentElement.clientHeight]
                } else {
                    return [0, 0]
                }
            }
        }
    },
    URI: function(a) {
        this.scheme = null;
        this.authority = null;
        this.path = "";
        this.query = null;
        this.fragment = null;
        this.parse = function(d) {
            var c = d.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
            this.scheme = c[3] ? c[2] : null;
            this.authority = c[5] ? c[6] : null;
            this.path = c[7];
            this.query = c[9] ? c[10] : null;
            this.fragment = c[12] ? c[13] : null;
            return this
        };
        this.toString = function() {
            var c = "";
            if (this.scheme !== null) {
                c = c + this.scheme + ":"
            }
            if (this.authority !== null) {
                c = c + "//" + this.authority
            }
            if (this.path !== null) {
                c = c + this.path
            }
            if (this.query !== null) {
                c = c + "?" + this.query
            }
            if (this.fragment !== null) {
                c = c + "#" + this.fragment
            }
            return c
        };
        this.toAbsolute = function(e) {
            var e = new jscolor.URI(e);
            var d = this;
            var c = new jscolor.URI;
            if (e.scheme === null) {
                return false
            }
            if (d.scheme !== null && d.scheme.toLowerCase() === e.scheme.toLowerCase()) {
                d.scheme = null
            }
            if (d.scheme !== null) {
                c.scheme = d.scheme;
                c.authority = d.authority;
                c.path = b(d.path);
                c.query = d.query
            } else {
                if (d.authority !== null) {
                    c.authority = d.authority;
                    c.path = b(d.path);
                    c.query = d.query
                } else {
                    if (d.path === "") {
                        c.path = e.path;
                        if (d.query !== null) {
                            c.query = d.query
                        } else {
                            c.query = e.query
                        }
                    } else {
                        if (d.path.substr(0, 1) === "/") {
                            c.path = b(d.path)
                        } else {
                            if (e.authority !== null && e.path === "") {
                                c.path = "/" + d.path
                            } else {
                                c.path = e.path.replace(/[^\/]+$/, "") + d.path
                            }
                            c.path = b(c.path)
                        }
                        c.query = d.query
                    }
                    c.authority = e.authority
                }
                c.scheme = e.scheme
            }
            c.fragment = d.fragment;
            return c
        };

        function b(e) {
            var c = "";
            while (e) {
                if (e.substr(0, 3) === "../" || e.substr(0, 2) === "./") {
                    e = e.replace(/^\.+/, "").substr(1)
                } else {
                    if (e.substr(0, 3) === "/./" || e === "/.") {
                        e = "/" + e.substr(3)
                    } else {
                        if (e.substr(0, 4) === "/../" || e === "/..") {
                            e = "/" + e.substr(4);
                            c = c.replace(/\/?[^\/]*$/, "")
                        } else {
                            if (e === "." || e === "..") {
                                e = ""
                            } else {
                                var d = e.match(/^\/?[^\/]*/)[0];
                                e = e.substr(d.length);
                                c = c + d
                            }
                        }
                    }
                }
            }
            return c
        }
        if (a) {
            this.parse(a)
        }
    },
    color: function(z, d) {
        this.required = true;
        this.adjust = true;
        this.hash = false;
        this.caps = true;
        this.slider = true;
        this.valueElement = z;
        this.styleElement = z;
        this.hsv = [0, 0, 1];
        this.rgb = [1, 1, 1];
        this.pickerOnfocus = true;
        this.pickerMode = "HSV";
        this.pickerPosition = "bottom";
        this.pickerButtonHeight = 20;
        this.pickerClosable = false;
        this.pickerCloseText = "Close";
        this.pickerButtonColor = "ButtonText";
        this.pickerFace = 10;
        this.pickerFaceColor = "ThreeDFace";
        this.pickerBorder = 1;
        this.pickerBorderColor = "ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight";
        this.pickerInset = 1;
        this.pickerInsetColor = "ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow";
        this.pickerZIndex = 10000;
        for (var q in d) {
            if (d.hasOwnProperty(q)) {
                this[q] = d[q]
            }
        }
        this.hidePicker = function() {
            if (s()) {
                f()
            }
        };
        this.showPicker = function() {
            if (!s()) {
                var I = jscolor.getElementPos(z);
                var F = jscolor.getElementSize(z);
                var C = jscolor.getViewPos();
                var K = jscolor.getViewSize();
                var p = r(this);
                var J, H, G;
                switch (this.pickerPosition.toLowerCase()) {
                    case "left":
                        J = 1;
                        H = 0;
                        G = -1;
                        break;
                    case "right":
                        J = 1;
                        H = 0;
                        G = 1;
                        break;
                    case "top":
                        J = 0;
                        H = 1;
                        G = -1;
                        break;
                    default:
                        J = 0;
                        H = 1;
                        G = 1;
                        break
                }
                var E = (F[H] + p[H]) / 2;
                var D = [-C[J] + I[J] + p[J] > K[J] ? (-C[J] + I[J] + F[J] / 2 > K[J] / 2 && I[J] + F[J] - p[J] >= 0 ? I[J] + F[J] - p[J] : I[J]) : I[J], -C[H] + I[H] + F[H] + p[H] - E + E * G > K[H] ? (-C[H] + I[H] + F[H] / 2 > K[H] / 2 && I[H] + F[H] - E - E * G >= 0 ? I[H] + F[H] - E - E * G : I[H] + F[H] - E + E * G) : (I[H] + F[H] - E + E * G >= 0 ? I[H] + F[H] - E + E * G : I[H] + F[H] - E - E * G)];
                i(D[J], D[H])
            }
        };
        this.importColor = function() {
            if (!a) {
                this.exportColor()
            } else {
                if (!this.adjust) {
                    if (!this.fromString(a.value, v)) {
                        B.style.backgroundColor = B.jscStyle.backgroundColor;
                        B.style.color = B.jscStyle.color;
                        this.exportColor(v | A)
                    }
                } else {
                    if (!this.required && /^\s*$/.test(a.value)) {
                        a.value = "";
                        B.style.backgroundColor = B.jscStyle.backgroundColor;
                        B.style.color = B.jscStyle.color;
                        this.exportColor(v | A)
                    } else {
                        if (this.fromString(a.value)) {} else {
                            this.exportColor()
                        }
                    }
                }
            }
        };
        this.exportColor = function(p) {
            if (!(p & v) && a) {
                var C = this.toString();
                if (this.caps) {
                    C = C.toUpperCase()
                }
                if (this.hash) {
                    C = "#" + C
                }
                a.value = C
            }
            if (!(p & A) && B) {
                B.style.backgroundColor = "#" + this.toString();
                B.style.color = 0.213 * this.rgb[0] + 0.715 * this.rgb[1] + 0.072 * this.rgb[2] < 0.5 ? "#FFF" : "#000"
            }
            if (!(p & t) && s()) {
                o()
            }
            if (!(p & e) && s()) {
                y()
            }
        };
        this.fromHSV = function(E, D, C, p) {
            E < 0 && (E = 0) || E > 6 && (E = 6);
            D < 0 && (D = 0) || D > 1 && (D = 1);
            C < 0 && (C = 0) || C > 1 && (C = 1);
            this.rgb = g(E === null ? this.hsv[0] : (this.hsv[0] = E), D === null ? this.hsv[1] : (this.hsv[1] = D), C === null ? this.hsv[2] : (this.hsv[2] = C));
            this.exportColor(p)
        };
        this.fromRGB = function(F, E, p, C) {
            F < 0 && (F = 0) || F > 1 && (F = 1);
            E < 0 && (E = 0) || E > 1 && (E = 1);
            p < 0 && (p = 0) || p > 1 && (p = 1);
            var D = w(F === null ? this.rgb[0] : (this.rgb[0] = F), E === null ? this.rgb[1] : (this.rgb[1] = E), p === null ? this.rgb[2] : (this.rgb[2] = p));
            if (D[0] !== null) {
                this.hsv[0] = D[0]
            }
            if (D[2] !== 0) {
                this.hsv[1] = D[1]
            }
            this.hsv[2] = D[2];
            this.exportColor(C)
        };
        this.fromString = function(D, C) {
            var p = D.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
            if (!p) {
                return false
            } else {
                if (p[1].length === 6) {
                    this.fromRGB(parseInt(p[1].substr(0, 2), 16) / 255, parseInt(p[1].substr(2, 2), 16) / 255, parseInt(p[1].substr(4, 2), 16) / 255, C)
                } else {
                    this.fromRGB(parseInt(p[1].charAt(0) + p[1].charAt(0), 16) / 255, parseInt(p[1].charAt(1) + p[1].charAt(1), 16) / 255, parseInt(p[1].charAt(2) + p[1].charAt(2), 16) / 255, C)
                }
                return true
            }
        };
        this.toString = function() {
            return ((256 | Math.round(255 * this.rgb[0])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[1])).toString(16).substr(1) + (256 | Math.round(255 * this.rgb[2])).toString(16).substr(1))
        };

        function w(G, F, C) {
            var H = Math.min(Math.min(G, F), C);
            var D = Math.max(Math.max(G, F), C);
            var p = D - H;
            if (p === 0) {
                return [null, 0, D]
            }
            var E = G === H ? 3 + (C - F) / p : (F === H ? 5 + (G - C) / p : 1 + (F - G) / p);
            return [E === 6 ? 0 : E, p / D, D]
        }

        function g(F, E, C) {
            if (F === null) {
                return [C, C, C]
            }
            var D = Math.floor(F);
            var G = D % 2 ? F - D : 1 - (F - D);
            var p = C * (1 - E);
            var H = C * (1 - E * G);
            switch (D) {
                case 6:
                case 0:
                    return [C, H, p];
                case 1:
                    return [H, C, p];
                case 2:
                    return [p, C, H];
                case 3:
                    return [p, H, C];
                case 4:
                    return [H, p, C];
                case 5:
                    return [C, p, H]
            }
        }

        function f() {
            delete jscolor.picker.owner;
            document.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)
        }

        function i(J, I) {
            if (!jscolor.picker) {
                jscolor.picker = {
                    box: document.createElement("div"),
                    boxB: document.createElement("div"),
                    pad: document.createElement("div"),
                    padB: document.createElement("div"),
                    padM: document.createElement("div"),
                    sld: document.createElement("div"),
                    sldB: document.createElement("div"),
                    sldM: document.createElement("div"),
                    btn: document.createElement("div"),
                    btnS: document.createElement("span"),
                    btnT: document.createTextNode(j.pickerCloseText)
                };
                for (var G = 0, H = 4; G < jscolor.images.sld[1]; G += H) {
                    var F = document.createElement("div");
                    F.style.height = H + "px";
                    F.style.fontSize = "1px";
                    F.style.lineHeight = "0";
                    jscolor.picker.sld.appendChild(F)
                }
                jscolor.picker.sldB.appendChild(jscolor.picker.sld);
                jscolor.picker.box.appendChild(jscolor.picker.sldB);
                jscolor.picker.box.appendChild(jscolor.picker.sldM);
                jscolor.picker.padB.appendChild(jscolor.picker.pad);
                jscolor.picker.box.appendChild(jscolor.picker.padB);
                jscolor.picker.box.appendChild(jscolor.picker.padM);
                jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
                jscolor.picker.btn.appendChild(jscolor.picker.btnS);
                jscolor.picker.box.appendChild(jscolor.picker.btn);
                jscolor.picker.boxB.appendChild(jscolor.picker.box)
            }
            var C = jscolor.picker;
            C.box.onmouseup = C.box.onmouseout = function() {
                z.focus()
            };
            C.box.onmousedown = function() {
                l = true
            };
            C.box.onmousemove = function(p) {
                if (c || m) {
                    c && u(p);
                    m && h(p);
                    if (document.selection) {
                        document.selection.empty()
                    } else {
                        if (window.getSelection) {
                            window.getSelection().removeAllRanges()
                        }
                    }
                }
            };
            C.padM.onmouseup = C.padM.onmouseout = function() {
                if (c) {
                    c = false;
                    jscolor.fireEvent(a, "change")
                }
            };
            C.padM.onmousedown = function(p) {
                c = true;
                u(p)
            };
            C.sldM.onmouseup = C.sldM.onmouseout = function() {
                if (m) {
                    m = false;
                    jscolor.fireEvent(a, "change")
                }
            };
            C.sldM.onmousedown = function(p) {
                m = true;
                h(p)
            };
            var L = r(j);
            C.box.style.width = L[0] + "px";
            C.box.style.height = L[1] + "px";
            C.boxB.style.position = "absolute";
            C.boxB.style.clear = "both";
            C.boxB.style.left = J + "px";
            C.boxB.style.top = I + "px";
            C.boxB.style.zIndex = j.pickerZIndex;
            C.boxB.style.border = j.pickerBorder + "px solid";
            C.boxB.style.borderColor = j.pickerBorderColor;
            C.boxB.style.background = j.pickerFaceColor;
            C.pad.style.width = jscolor.images.pad[0] + "px";
            C.pad.style.height = jscolor.images.pad[1] + "px";
            C.padB.style.position = "absolute";
            C.padB.style.left = j.pickerFace + "px";
            C.padB.style.top = j.pickerFace + "px";
            C.padB.style.border = j.pickerInset + "px solid";
            C.padB.style.borderColor = j.pickerInsetColor;
            C.padM.style.position = "absolute";
            C.padM.style.left = "0";
            C.padM.style.top = "0";
            C.padM.style.width = j.pickerFace + 2 * j.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + "px";
            C.padM.style.height = C.box.style.height;
            C.padM.style.cursor = "crosshair";
            C.sld.style.overflow = "hidden";
            C.sld.style.width = jscolor.images.sld[0] + "px";
            C.sld.style.height = jscolor.images.sld[1] + "px";
            C.sldB.style.display = j.slider ? "block" : "none";
            C.sldB.style.position = "absolute";
            C.sldB.style.right = j.pickerFace + "px";
            C.sldB.style.top = j.pickerFace + "px";
            C.sldB.style.border = j.pickerInset + "px solid";
            C.sldB.style.borderColor = j.pickerInsetColor;
            C.sldM.style.display = j.slider ? "block" : "none";
            C.sldM.style.position = "absolute";
            C.sldM.style.right = "0";
            C.sldM.style.top = "0";
            C.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + j.pickerFace + 2 * j.pickerInset + "px";
            C.sldM.style.height = C.box.style.height;
            try {
                C.sldM.style.cursor = "pointer"
            } catch (E) {
                C.sldM.style.cursor = "hand"
            }

            function K() {
                var p = j.pickerInsetColor.split(/\s+/);
                var M = p.length < 2 ? p[0] : p[1] + " " + p[0] + " " + p[0] + " " + p[1];
                C.btn.style.borderColor = M
            }
            C.btn.style.display = j.pickerClosable ? "block" : "none";
            C.btn.style.position = "absolute";
            C.btn.style.left = j.pickerFace + "px";
            C.btn.style.bottom = j.pickerFace + "px";
            C.btn.style.padding = "0 15px";
            C.btn.style.height = "18px";
            C.btn.style.border = j.pickerInset + "px solid";
            K();
            C.btn.style.color = j.pickerButtonColor;
            C.btn.style.font = "12px sans-serif";
            C.btn.style.textAlign = "center";
            try {
                C.btn.style.cursor = "pointer"
            } catch (E) {
                C.btn.style.cursor = "hand"
            }
            C.btn.onmousedown = function() {
                j.hidePicker()
            };
            C.btnS.style.lineHeight = C.btn.style.height;
            switch (b) {
                case 0:
                    var D = "hs.png";
                    break;
                case 1:
                    var D = "hv.png";
                    break
            }
            C.padM.style.backgroundImage = "url('" + jscolor.getDir() + "cross.gif')";
            C.padM.style.backgroundRepeat = "no-repeat";
            C.sldM.style.backgroundImage = "url('" + jscolor.getDir() + "arrow.gif')";
            C.sldM.style.backgroundRepeat = "no-repeat";
            C.pad.style.backgroundImage = "url('" + jscolor.getDir() + D + "')";
            C.pad.style.backgroundRepeat = "no-repeat";
            C.pad.style.backgroundPosition = "0 0";
            o();
            y();
            jscolor.picker.owner = j;
            document.getElementsByTagName("body")[0].appendChild(C.boxB)
        }

        function r(C) {
            var p = [2 * C.pickerInset + 2 * C.pickerFace + jscolor.images.pad[0] + (C.slider ? 2 * C.pickerInset + 2 * jscolor.images.arrow[0] + jscolor.images.sld[0] : 0), C.pickerClosable ? 4 * C.pickerInset + 3 * C.pickerFace + jscolor.images.pad[1] + C.pickerButtonHeight : 2 * C.pickerInset + 2 * C.pickerFace + jscolor.images.pad[1]];
            return p
        }

        function o() {
            switch (b) {
                case 0:
                    var E = 1;
                    break;
                case 1:
                    var E = 2;
                    break
            }
            var I = Math.round((j.hsv[0] / 6) * (jscolor.images.pad[0] - 1));
            var H = Math.round((1 - j.hsv[E]) * (jscolor.images.pad[1] - 1));
            jscolor.picker.padM.style.backgroundPosition = (j.pickerFace + j.pickerInset + I - Math.floor(jscolor.images.cross[0] / 2)) + "px " + (j.pickerFace + j.pickerInset + H - Math.floor(jscolor.images.cross[1] / 2)) + "px";
            var p = jscolor.picker.sld.childNodes;
            switch (b) {
                case 0:
                    var G = g(j.hsv[0], j.hsv[1], 1);
                    for (var C = 0; C < p.length; C += 1) {
                        p[C].style.backgroundColor = "rgb(" + (G[0] * (1 - C / p.length) * 100) + "%," + (G[1] * (1 - C / p.length) * 100) + "%," + (G[2] * (1 - C / p.length) * 100) + "%)"
                    }
                    break;
                case 1:
                    var G, J, F = [j.hsv[2], 0, 0];
                    var C = Math.floor(j.hsv[0]);
                    var D = C % 2 ? j.hsv[0] - C : 1 - (j.hsv[0] - C);
                    switch (C) {
                        case 6:
                        case 0:
                            G = [0, 1, 2];
                            break;
                        case 1:
                            G = [1, 0, 2];
                            break;
                        case 2:
                            G = [2, 0, 1];
                            break;
                        case 3:
                            G = [2, 1, 0];
                            break;
                        case 4:
                            G = [1, 2, 0];
                            break;
                        case 5:
                            G = [0, 2, 1];
                            break
                    }
                    for (var C = 0; C < p.length; C += 1) {
                        J = 1 - 1 / (p.length - 1) * C;
                        F[1] = F[0] * (1 - J * D);
                        F[2] = F[0] * (1 - J);
                        p[C].style.backgroundColor = "rgb(" + (F[G[0]] * 100) + "%," + (F[G[1]] * 100) + "%," + (F[G[2]] * 100) + "%)"
                    }
                    break
            }
        }

        function y() {
            switch (b) {
                case 0:
                    var p = 2;
                    break;
                case 1:
                    var p = 1;
                    break
            }
            var C = Math.round((1 - j.hsv[p]) * (jscolor.images.sld[1] - 1));
            jscolor.picker.sldM.style.backgroundPosition = "0 " + (j.pickerFace + j.pickerInset + C - Math.floor(jscolor.images.arrow[1] / 2)) + "px"
        }

        function s() {
            return jscolor.picker && jscolor.picker.owner === j
        }

        function n() {
            if (a === z) {
                j.importColor()
            }
            if (j.pickerOnfocus) {
                j.hidePicker()
            }
        }

        function k() {
            if (a !== z) {
                j.importColor()
            }
        }

        function u(D) {
            var C = jscolor.getRelMousePos(D);
            var p = C.x - j.pickerFace - j.pickerInset;
            var E = C.y - j.pickerFace - j.pickerInset;
            switch (b) {
                case 0:
                    j.fromHSV(p * (6 / (jscolor.images.pad[0] - 1)), 1 - E / (jscolor.images.pad[1] - 1), null, e);
                    break;
                case 1:
                    j.fromHSV(p * (6 / (jscolor.images.pad[0] - 1)), null, 1 - E / (jscolor.images.pad[1] - 1), e);
                    break
            }
        }

        function h(C) {
            var p = jscolor.getRelMousePos(C);
            var D = p.y - j.pickerFace - j.pickerInset;
            switch (b) {
                case 0:
                    j.fromHSV(null, null, 1 - D / (jscolor.images.sld[1] - 1), t);
                    break;
                case 1:
                    j.fromHSV(null, 1 - D / (jscolor.images.sld[1] - 1), null, t);
                    break
            }
        }
        var j = this;
        var b = this.pickerMode.toLowerCase() === "hvs" ? 1 : 0;
        var l = false;
        var a = jscolor.fetchElement(this.valueElement),
            B = jscolor.fetchElement(this.styleElement);
        var c = false,
            m = false;
        var v = 1 << 0,
            A = 1 << 1,
            t = 1 << 2,
            e = 1 << 3;
        jscolor.addEvent(z, "focus", function() {
            if (j.pickerOnfocus) {
                j.showPicker()
            }
        });
        jscolor.addEvent(z, "blur", function() {
            if (!l) {
                window.setTimeout(function() {
                    l || n();
                    l = false
                }, 0)
            } else {
                l = false
            }
        });
        if (a) {
            var x = function() {
                j.fromString(a.value, v)
            };
            jscolor.addEvent(a, "keyup", x);
            jscolor.addEvent(a, "input", x);
            jscolor.addEvent(a, "blur", k);
            a.setAttribute("autocomplete", "off")
        }
        if (B) {
            B.jscStyle = {
                backgroundColor: B.style.backgroundColor,
                color: B.style.color
            }
        }
        switch (b) {
            case 0:
                jscolor.requireImage("hs.png");
                break;
            case 1:
                jscolor.requireImage("hv.png");
                break
        }
        jscolor.requireImage("cross.gif");
        jscolor.requireImage("arrow.gif");
        this.importColor()
    }
};
jscolor.install();

/*ajax.js*/
function sack(file) {
	this.xmlhttp = null;

	this.resetData = function() {
		this.method = "POST";
  		this.queryStringSeparator = "?";
		this.argumentSeparator = "&";
		this.URLString = "";
		this.encodeURIString = true;
  		this.execute = false;
  		this.element = null;
		this.elementObj = null;
		this.requestFile = file;
		this.vars = new Object();
		this.responseStatus = new Array(2);
  	};

	this.resetFunctions = function() {
  		this.onLoading = function() { };
  		this.onLoaded = function() { };
  		this.onInteractive = function() { };
  		this.onCompletion = function() { };
  		this.onError = function() { };
		this.onFail = function() { };
	};

	this.reset = function() {
		this.resetFunctions();
		this.resetData();
	};

	this.createAJAX = function() {
		try {
			this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) {
			try {
				this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				this.xmlhttp = null;
			}
		}

		if (! this.xmlhttp) {
			if (typeof XMLHttpRequest != "undefined") {
				this.xmlhttp = new XMLHttpRequest();
			} else {
				this.failed = true;
			}
		}
	};

	this.setVar = function(name, value){
		this.vars[name] = Array(value, false);
	};

	this.encVar = function(name, value, returnvars) {
		if (true == returnvars) {
			return Array(encodeURIComponent(name), encodeURIComponent(value));
		} else {
			this.vars[encodeURIComponent(name)] = Array(encodeURIComponent(value), true);
		}
	}

	this.processURLString = function(string, encode) {
		encoded = encodeURIComponent(this.argumentSeparator);
		regexp = new RegExp(this.argumentSeparator + "|" + encoded);
		varArray = string.split(regexp);
		for (i = 0; i < varArray.length; i++){
			urlVars = varArray[i].split("=");
			if (true == encode){
				this.encVar(urlVars[0], urlVars[1]);
			} else {
				this.setVar(urlVars[0], urlVars[1]);
			}
		}
	}

	this.createURLString = function(urlstring) {
		if (this.encodeURIString && this.URLString.length) {
			this.processURLString(this.URLString, true);
		}

		if (urlstring) {
			if (this.URLString.length) {
				this.URLString += this.argumentSeparator + urlstring;
			} else {
				this.URLString = urlstring;
			}
		}

		// prevents caching of URLString
		this.setVar("rndval", new Date().getTime());

		urlstringtemp = new Array();
		for (key in this.vars) {
			if (false == this.vars[key][1] && true == this.encodeURIString) {
				encoded = this.encVar(key, this.vars[key][0], true);
				delete this.vars[key];
				this.vars[encoded[0]] = Array(encoded[1], true);
				key = encoded[0];
			}

			urlstringtemp[urlstringtemp.length] = key + "=" + this.vars[key][0];
		}
		if (urlstring){
			this.URLString += this.argumentSeparator + urlstringtemp.join(this.argumentSeparator);
		} else {
			this.URLString += urlstringtemp.join(this.argumentSeparator);
		}
	}

	this.runResponse = function() {
		eval(this.response);
	}

	this.runAJAX = function(urlstring) {
		if (this.failed) {
			this.onFail();
		} else {
			this.createURLString(urlstring);
			if (this.element) {
				this.elementObj = document.getElementById(this.element);
			}
			if (this.xmlhttp) {
				var self = this;
				if (this.method == "GET") {
					totalurlstring = this.requestFile + this.queryStringSeparator + this.URLString;
					this.xmlhttp.open(this.method, totalurlstring, true);
				} else {
					this.xmlhttp.open(this.method, this.requestFile, true);
					try {
						this.xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
					} catch (e) { }
				}

				this.xmlhttp.onreadystatechange = function() {
					switch (self.xmlhttp.readyState) {
						case 1:
							self.onLoading();
							break;
						case 2:
							self.onLoaded();
							break;
						case 3:
							self.onInteractive();
							break;
						case 4:
							self.response = self.xmlhttp.responseText;
							self.responseXML = self.xmlhttp.responseXML;
							self.responseStatus[0] = self.xmlhttp.status;
							self.responseStatus[1] = self.xmlhttp.statusText;

							if (self.execute) {
								self.runResponse();
							}

							if (self.elementObj) {
								elemNodeName = self.elementObj.nodeName;
								elemNodeName.toLowerCase();
								if (elemNodeName == "input"
								|| elemNodeName == "select"
								|| elemNodeName == "option"
								|| elemNodeName == "textarea") {
									self.elementObj.value = self.response;
								} else {
									self.elementObj.innerHTML = self.response;
								}
							}
							if (self.responseStatus[0] == "200") {
								self.onCompletion();
							} else {
								self.onError();
							}

							self.URLString = "";
							break;
					}
				};

				this.xmlhttp.send(this.URLString);
			}
		}
	};

	this.reset();
	this.createAJAX();
}

/*main*/
var m_math=["\\widetilde{ab}","\\overline{ab}","\\overbrace{ab}","\\sqrt{ab}","f'","x^{k}","\\lim_{a \\rightarrow b}","\\begin{bmatrix}a & b \\\\c & d \\end{bmatrix}","\\big(a\\big)","\\int_a^b x","\\sum_a^b x","\\prod_a^b x","\\bigcap_a^b x","\\bigvee_a^b x","\\bigotimes","\\widehat{ab}","\\underline{ab}","\\underbrace{ab}","\\sqrt[n]{ab}","\\frac{a}{b}","x_{k}","\\frac{\\partial^nf}{\\partial x^n}","x =\\begin{cases}a & x = 0\\\\b & x > 0\\end{cases}","\\big\\{a\\big\\}","\\oint_a^b x","\\bigsqcup_a^b x","\\coprod_a^b x","\\bigcup_a^b x","\\bigwedge_a^b x","\\bigoplus"];
var m_greek=["\\alpha","\\beta","\\gamma","\\delta","\\epsilon","\\varepsilon","\\zeta","\\eta","\\theta","\\vartheta","\\gamma","\\kappa","\\lambda","\\mu","\\nu","\\xi","o","\\pi","\\varpi","\\rho","\\varrho","\\sigma","\\varsigma","\\tau","\\upsilon","\\phi","\\varphi","\\chi","\\psi","\\omega","\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega","\\$"];
var m_rel=["\\leq","\\prec","\\preceq","\\ll","\\subset","\\subseteq","\\sqsubset","\\sqsubseteq","\\in","\\vdash",">","\\smile","\\sim","\\asymp","\\equiv","\\mid","\\neq","\\perp",":","\\geq","\\succ","\\succeq","\\gg","\\supset","\\supseteq","\\sqsupset","\\sqsupseteq","\\ni","\\dashv","<","\\frown","\\simeq","\\approx","\\parallel","\\propto"];
var m_logic=["\\hat{a}","\\acute{a}","\\bar{a}","\\dot{a}","\\breve{a}","\\check{a}","\\grave{a}","\\vec{a}","\\ddot{a}","\\tilde{a}","+","\\times","\\cap","\\cup","\\vee","\\setminus","\\bigtriangleup","\\triangleright","\\oplus","\\otimes","\\odot","\\uplus","\\ast","\\circ","-","\\div","\\sqcup","\\sqcap","\\wedge","\\wr","\\bigtriangledown","\\triangleleft","\\ominus","\\oslash","\\bigcirc","\\amalg","\\star","\\bullet"];
var m_symbol=["\\ldots","\\vdots","\\mp","\\times","/","|","\\imath","\\nabla","\\top","\\forall","\\neg","\\partial","\\Re","\\aleph","\\ell","\\wp","\\prime","\\surd","\\natural","\\clubsuit","\\cdots","\\ddots","\\pm","\\div","\\backslash","\\|","\\jmath","\\triangle","\\bot","\\exists","\\flat","\\infty","\\Im","\\hbar","\\emptyset",".","\\angle","\\sharp","\\Diamond","\\spadesuit"];
var m_arrow=["\\leftarrow","\\Leftarrow","\\leftrightarrow","\\mapsto","\\leftharpoonup","\\rightharpoonup","\\longleftarrow","\\Longleftarrow","\\longleftrightarrow","\\uparrow","\\downarrow","\\updownarrow","\\rightleftharpoons","\\nearrow","\\searrow","\\rightarrow","\\Rightarrow","\\Leftrightarrow","\\leftharpoondown","\\rightharpoondown","\\longrightarrow","\\Longrightarrow","\\Longleftrightarrow","\\Uparrow","\\Downarrow","\\Updownarrow","\\nwarrow","\\swarrow"];

var m_math_rect=["2,2,29,47","31,2,58,47","60,2,87,47","89,2,119,47","121,2,148,47","150,2,177,47","179,2,214,47","216,2,314,47","316,2,344,47","346,2,378,47","380,2,420,47","422,2,459,47","461,2,493,47","495,2,527,47","529,2,556,47","2,49,29,94","31,49,58,94","60,49,87,94","89,49,119,94","121,49,148,94","150,49,177,94","179,49,214,94","216,49,314,94","316,49,344,94","346,49,378,94","380,49,420,94","422,49,459,94","461,49,493,94","495,49,527,94","529,49,556,94"];
var m_greek_rect=["2,2,29,22","31,2,58,22","60,2,87,22","89,2,116,22","118,2,145,22","147,2,174,22","176,2,203,22","205,2,232,22","234,2,261,22","263,2,290,22","292,2,319,22","321,2,348,22","350,2,377,22","379,2,406,22","408,2,435,22","437,2,464,22","466,2,493,22","495,2,522,22","524,2,551,22","553,2,580,22","582,2,609,22","2,24,29,44","31,24,58,44","60,24,87,44","89,24,116,44","118,24,145,44","147,24,174,44","176,24,203,44","205,24,232,44","234,24,261,44","263,24,290,44","292,24,319,44","321,24,348,44","350,24,377,44","379,24,406,44","408,24,435,44","437,24,464,44","466,24,493,44","495,24,522,44","524,24,551,44","553,24,580,44","582,24,609,44"];
var m_rel_rect=["2,2,29,28","31,2,58,28","60,2,87,28","89,2,116,28","118,2,145,28","147,2,174,28","176,2,203,28","205,2,232,28","234,2,261,28","263,2,290,28","292,2,319,28","321,2,348,28","350,2,377,28","379,2,406,28","408,2,435,28","437,2,464,28","466,2,493,28","2,30,29,51","31,30,58,51","60,30,87,51","89,30,116,51","118,30,145,51","147,30,174,51","176,30,203,51","205,30,232,51","234,30,261,51","263,30,290,51","292,30,319,51","321,30,348,51","350,30,377,51","379,30,406,51","408,30,435,51","437,30,464,51","466,30,493,51","495,30,522,51"];
var m_logic_rect=["2,2,29,24","31,2,58,24","60,2,87,24","89,2,116,24","118,2,145,24","147,2,174,24","176,2,203,24","205,2,232,24","234,2,261,24","263,2,290,24","292,2,319,24","321,2,348,24","350,2,377,24","379,2,406,24","408,2,435,24","437,2,464,24","466,2,493,24","495,2,522,24","524,2,551,24","2,26,29,52","31,26,58,52","60,26,87,52","89,26,116,52","118,26,145,52","147,26,174,52","176,26,203,52","205,26,232,52","234,26,261,52","263,26,290,52","292,26,319,52","321,26,348,52","350,26,377,52","379,26,406,52","408,26,435,52","437,26,464,52","466,26,493,52","495,26,522,52","524,26,551,52"];
var m_symbol_rect=["2,2,29,26","31,2,58,26","60,2,87,26","89,2,116,26","118,2,145,26","147,2,174,26","176,2,203,26","205,2,232,26","234,2,261,26","263,2,290,26","292,2,319,26","321,2,348,26","350,2,377,26","379,2,406,26","408,2,435,26","437,2,464,26","466,2,493,26","495,2,522,26","524,2,551,26","553,2,580,26","2,28,29,54","31,28,58,54","60,28,87,54","89,28,116,54","118,28,145,54","147,28,174,54","176,28,203,54","205,28,232,54","234,28,261,54","263,28,290,54","292,28,319,54","321,28,348,54","350,28,377,54","379,28,406,54","408,28,435,54","437,28,464,54","466,28,493,54","495,28,522,54","524,28,551,54","553,28,580,54"];
var m_arrow_rect=["2,2,29,25","31,2,58,25","60,2,87,25","89,2,116,25","118,2,145,25","147,2,174,25","176,2,214,25","216,2,254,25","256,2,294,25","296,2,323,25","325,2,352,25","354,2,381,25","383,2,410,25","412,2,439,25","2,27,29,50","31,27,58,50","60,27,87,50","89,27,116,50","118,27,145,50","147,27,174,50","176,27,214,50","216,27,254,50","256,27,294,50","296,27,323,50","325,27,352,50","354,27,381,50","383,27,410,50","412,27,439,50"];

var s_algebra=["\\left(x-1\\right)\\left(x+3\\right)","\\sqrt{a^2+b^2}","x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}","x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}","\\sqrt{\\frac{x^2}{k+1}}\\qquad\nx^{\\frac{2}{k+1}}\\qquad\n\\frac{\\partial^2f}{\\partial x^2}"];
var s_calculus=["\\frac{\\partial y}{\\partial x}","\\frac{d}{dx}c^n=nx^{n-1}","\\frac{d}{dx}e^{ax}=a\\,e^{ax}","\\frac{d}{dx}\\ln(x)=\\frac{1}{x}","\\frac{d}{dx}\\sin x=\\cos x","a_i^2 + b_j^2 = c_k^2"];
var s_stats=["{^n}C_r","\\frac{n!}{r!(n-r)!}","\\sum_{i=1}^{n}{X_i}","\\sum_{i=1}^{n}{X_i^2}","\\sum_{i=1}^{n}{(X_i - \\overline{X})^2}","X_1, \\cdots,X_n","\\frac{x-\\mu}{\\sigma}"];
var s_set=["\\bigcup_{i=1}^{n}{X_i}","\\bigcap_{i=1}^{n}{X_i}"];
var s_trig=["\\cos^{-1}\\theta","\\sin^{-1}\\theta","e^{i \\theta}","\\left(\\frac{\\pi}{2}-\\theta \\right )","\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}","\\int_{0}^{\\pi} \\sin x \\, dx = 2"];
var s_physics=["\\vec{F}=m\\vec{a}","e=m c^2","\\vec{F}=m \\frac{d \\vec{v}}{dt} + \\vec{v}\\frac{dm}{dt}","\\oint \\vec{F} \\cdot d\\vec{s}=0","\\vec{F}_g=-F\\frac{m_1 m_2}{r^2} \\vec{e}_r"];
var s_matrices=["\\begin{pmatrix}\n a_{11} & a_{12} \\\\\n a_{21} & a_{22}\n \\end{pmatrix}","\\begin{pmatrix}\n a_{11} & a_{12} & a_{13}\\\\\n a_{21} & a_{22} & a_{23}\\\\\n a_{31} & a_{32} & a_{33}\n \\end{pmatrix}","\\begin{pmatrix}\n a_{11} & \\cdots & a_{1n}\\\\\n \\vdots & \\ddots & \\vdots\\\\\n a_{m1} & \\cdots & a_{mn}\n \\end{pmatrix}","\\begin{pmatrix}\n 1 & 0 \\\\\n 0 & 1\n \\end{pmatrix}","\\mathbf{X} = \\left(\n\\begin{array}{ccc}\nx_1 & x_2 & \\ldots \\\\\nx_3 & x_4 & \\ldots \\\\\n\\vdots & \\vdots & \\ddots\n\\end{array} \\right)"];
var s_chemistry=["_{10}^{5}C^{16}","2H_2 + O_2 {\\overset{n,m}{\\longrightarrow}} 2H_2O","A\\underset{b}{\\overset{a}{\\longleftrightarrow}}B","A\\underset{0}{\\overset{a}{\\rightleftharpoons}}B","A\\underset{0^{\\circ}C }{\\overset{100^{\\circ}C}{\\rightleftharpoons}}B"];

var samples=["\\left(x-1\\right)\\left(x+3\\right)","\\sqrt{a^2+b^2}","a_i^2 + b_j^2 = c_k^2","\\sum_{i=1}^{n} x_{i}^{2}","x = a_0 + \\frac{1}{a_1 + \\frac{1}{a_2 + \\frac{1}{a_3 + a_4}}}"
,"x = a_0 + \\frac{1}{\\displaystyle a_1 + \\frac{1}{\\displaystyle a_2 + \\frac{1}{\\displaystyle a_3 + a_4}}}","\\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}"
,"\\int_{0}^{\\pi} \\sin x \\, dx = 2","\\frac{d}{d\\theta} \\sin(\\theta) = \\cos(\\theta)"
,"\\mathbf{X} = \\left(\n\\begin{array}{ccc}\nx_1 & x_2 & \\ldots \\\\\nx_3 & x_4 & \\ldots \\\\\n\\vdots & \\vdots & \\ddots\n\\end{array} \\right)"];

function insertAtCaret(element, text) {
    if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        sel.text = text;
        element.focus();
    } else if (element.selectionStart || element.selectionStart === 0) {
    	  if (element.value) text=' '+text+' ';
    	  else text=text+' ';
    	  
    	  var c=element.value.length;
    	  //if ((c+text.length) > 200) text=text.substr(0,200-c);    	  
    	  
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;
        element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);
        element.focus();
        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    } else {
    	  if (element.value) text=' '+text;
    	  
    	  var c=element.value.length;
    	  //if ((c+text.length) > 200) text=text.substr(0,200-c);    	  
    	  
        element.value +=text;
        element.focus();
    }
}


var make_image_timer;

function get_mathimage(){
	var s;
	var a=_getid('latex_src');
	if(!a.value) {
		clear_mathimage();
		return;
	}
	var s1=a.value;
	_getid('latex_length').innerHTML=s1.length+' characters';	

	var h=parseInt(_getid('latex_height').value);
	if(!h || isNaN(h)) h=0;
	if(h>0 && h<20) h=20;
	if(h>120) h=120;	
	var dimension='';
	if (h > 0){
		dimension='&chs='+h;
	}else{
		h=0;
	}

_getid('latex_msg').innerHTML='';
if(s1.length<200){	
	var color='';
	if (_getid('latex_enablecolor').checked){
		var o=_getid('latex_transparent').value;
		var s='bg,s,'+_getid('latex_bgcolor').value;
		if (o==1) s='bg,s,'+_getid('latex_bgcolor').value+'80';
		else if (o==2) s='a,s,'+_getid('latex_bgcolor').value+'80';
		color='&chf='+encodeURIComponent(s)+'&chco='+_getid('latex_textcolor').value;		
	}		
	
	/*if (s1.length>200) {
		_getid('latex_msg').innerHTML='&nbsp;Exceeds the maximum formula length of 200 characters.';
	} else {
		_getid('latex_msg').innerHTML='';
	}*/
	s='http://chart.apis.google.com/chart?cht=tx&chl='+encodeURIComponent(s1)+color+dimension;
	//s='http://www.sciweavers.org/tex2img.php?eq='+encodeURIComponent(a.value)+'&bc=Transparent&fc=Black&im=png&fs=14&ff=modern&edit=0';
}else{
	var color='\\bg_white ';
	if (_getid('latex_enablecolor').checked){
		_getid('latex_msg').innerHTML='&nbsp;More than 200 characters in formula length does not support color.';
		var o=_getid('latex_transparent').value;
		if(o==1 || o==2) color='';
	}
	var s2='\\dpi{'+Math.floor(h*2)+'} '+color+s1;
	s='http://latex.codecogs.com/png.latex?'+encodeURIComponent(s2);
	//\dpi{120} \bg_red \fn_jvn \LARGE
}
	
	var b=_getid('latex_img');
	b.src=s;	
		
	_getid('latex_imglink').value=s;
	_getid('latex_link').value='<img src="'+s+'">';
	_getid('latex_img').style.display='';	
	_getid('latex_error').style.display='none';
	_getid('latex_download').href='download.php?url='+encodeURIComponent(s);
	//_getid('latex_download').style.display='';	
	_getid('btn_short_link').disabled=false;
}	

function make_mathimage(){
	if (!_getid('latex_src').value){
		alert("Input data!");
		_getid('latex_src').focus();
		return;
	}
	get_mathimage();
}

function clear_mathimage(){
	_getid('latex_src').value='';
	_getid('latex_img').style.display='none';	
	_getid('latex_error').style.display='none';
	_getid('latex_imglink').value='';
	_getid('latex_link').value='';	
	_getid('latex_download').style.display='none';	
	_getid('btn_short_link').disabled=true;
	_getid('latex_msg').innerHTML='';
}

function proc_imgerror(f){
	f.src="img/blank.png";
	_getid('latex_img').style.display='none';	
	_getid('latex_error').style.display='';
	//_getid('latex_imglink').value='';
	//_getid('latex_link').value='';
}	

function proc_show(id){
	setCookie('math_selecttab',id);			
	
	if ((id=='div_useradd') && !math_useradd_added) {
		math_useradd_added=true;
		for (var i = 0 ; i < math_useradd.length; i++) {
			if (i >= 15) break;
			var b=math_useradd[i];
			add_useradd(b);
		}
	}
		
	_getid('div_sample').style.display='none';
	_getid('div_useradd').style.display='none';
	_getid('div_usernote').style.display='none';
	_getid('div_userdata').style.display='none';
	
	var a=document.getElementById(id);
	if (a){
		a.style.display='';
		var b=a.getElementsByTagName('*');
		for (var i = 0 ; i < b.length ; i++) {
			if ((b[i].type=='text') || (b[i].type=='textarea')){
				b[i].focus();
				break;
			}
		}		
	}
	
	var a=document.getElementById('tab_select');
	if (a){
		var b=a.getElementsByTagName('a');
		for (var i = 0 ; i < b.length ; i++) {
			b[i].innerHTML=_getinnertext(b[i]);
		}
	}
		
	var f=document.getElementById('tab_'+id);
	if (f) f.innerHTML='<b>'+_getinnertext(f)+'<b>';
}

function option_onchange(){
	option_setcontrol();
	if (_getid('latex_src').value) get_mathimage();
}

function option_setcontrol(){
	var a=_getid('latex_enablecolor').checked;
	if (a) a=false; else a=true;
	var b=_getid('latex_bgcolor');
	var c=_getid('latex_textcolor');
	b.disabled=a;
	c.disabled=a;
	_getid('latex_transparent').disabled=a;	
	
	if (b.value==c.value){
		var newcolor='FFFFFF';
		if (b.value==newcolor) newcolor='000000';
		c.value=newcolor;
		c.style.backgroundColor="#"+c.value;
	}
	
	setCookie('math_latex_enablecolor',_getid('latex_enablecolor').checked);
	setCookie('math_latex_bgcolor',_getid('latex_bgcolor').value);
	setCookie('math_latex_textcolor',_getid('latex_textcolor').value);
	setCookie('math_latex_transparent',_getid('latex_transparent').value);
	setCookie('math_latex_height',_getid('latex_height').value);
}

var math_useradd=[];
var math_useradd_id=0;
var math_useradd_added=false;

function add_mathimage(){
	if (!window.localStorage || !window.JSON) {
		alert("This browser is not supported.");
		return;	
	}
	if (math_useradd.length >= 15){
		alert(sprintf("You can not add anymore. The maximum possible number is %s.",15));
		return;
	}	
	var s=_getid('latex_src').value;
	if (!s){
		alert("No data entered.");
		return;
	}
	
	var b={};
	var time = new Date();   	  	
	b.time=time.getTime();
	b.data=s;
	b.enablecolor=_getid('latex_enablecolor').checked;
	b.bgcolor=_getid('latex_bgcolor').value;
	b.textcolor=_getid('latex_textcolor').value;
	b.transparent=_getid('latex_transparent').value;
	b.height=_getid('latex_height').value;
	
	math_useradd_id++;
	b.id=math_useradd_id;
	math_useradd[math_useradd.length]=b;
	add_useradd(b);
	
	localStorage[g_storage_name2]=JSON.stringify(math_useradd);
	
	proc_show("div_useradd");

	var a=_getid('div_useradd');
	a.scrollTop=a.scrollHeight;
}
	
function select_useradd(id){
	for (var i = 0 ; i < math_useradd.length ; i++) {
		var b=math_useradd[i];
		if (b.id==id){
			_getid('latex_src').value=b.data;
			_getid('latex_enablecolor').checked=b.enablecolor;
			_getid('latex_transparent').value=b.transparent;
			_getid('latex_bgcolor').value=b.bgcolor;
			_getid('latex_bgcolor').style.backgroundColor="#"+b.bgcolor;
			_getid('latex_textcolor').value=b.textcolor;
			_getid('latex_textcolor').style.backgroundColor="#"+b.textcolor;
			_getid('latex_height').value=b.height;
			
			get_mathimage();
			break;
		}
	}		
}

function clear_useradd(){
	var answer=confirm("Are you sure?");				
	if (!answer) return;
	
	math_useradd=[];
	localStorage[g_storage_name2]=JSON.stringify(math_useradd);	
	
	var a=_getid('div_useradd').getElementsByTagName('div');
	for(var i=a.length-1; i >=0 ; i--){    
		_getid('div_useradd').removeChild(a[i]);
	}				
	_getid('btn_useradd').disabled=true;
}

function del_useradd(id){
	for (var i = 0 ; i < math_useradd.length ; i++) {
		if (math_useradd[i].id==id){
			math_useradd.splice(i,1);
			break;
		}
	}
	
	var a=_getid('div_useradd').getElementsByTagName('div');
	for(var i = 0; i < a.length; i++){    
		if (a[i].id==id){
			_getid('div_useradd').removeChild(a[i]);
			break;
		}
	}			
		
	localStorage[g_storage_name2]=JSON.stringify(math_useradd);	
	if (math_useradd.length==0) _getid('btn_useradd').disabled=true;
}

function add_useradd(b){
	var obj=_getid('div_useradd');
	var c=document.createElement('div');

	var color='';
	if (b.enablecolor){
		var o=b.transparent;
		var s='bg,s,'+b.bgcolor;
		if (o==1) s='bg,s,'+b.bgcolor+'80';
		else if (o==2) s='a,s,'+b.bgcolor+'80';
		color='&chf='+encodeURIComponent(s)+'&chco='+b.textcolor;
	}		
	var dimension='';
	var h=parseInt(b.height);
	if(!h || isNaN(h)) h=0;
	if(h>0 && h<20) h=20;
	if(h>120) h=120;	
	if (h>0){
		dimension='&chs='+h;
	}else{
		h=0;
	}
	
	var s1=b.data;
	if (s1.length < 200) {
		var links='http://chart.apis.google.com/chart?cht=tx&chl='+encodeURIComponent(s1)+color+dimension;
	}else{
		var color='\\bg_white ';
		if (b.enablecolor){
			var o=b.transparent;
			if(o==1 || o==2) color='';
		}
		var s2='\\dpi{'+Math.floor(h*2)+'} '+color+s1;
		var links='http://latex.codecogs.com/png.latex?'+encodeURIComponent(s2);
	}	
	
	var s='<table><tr><td valign=top><button onclick="select_useradd('+b.id+')">Select</button><br><button onclick="del_useradd('+b.id+')">Del</button><td><img src="'+links+'"></table>';
	c.id=b.id;
	c.innerHTML=s;
	obj.appendChild(c);			
	
	_getid('btn_useradd').disabled=false;
}

var g_storage_name='math_config';
var g_storage_name2='math_useradd';

function savestorage(){
	if (!window.localStorage || !window.JSON) return;

	var a={};
	a.latex_src=_getid('latex_src').value+'';
	a.usernote=_getid('usernote').value+'';
	
	var s=JSON.stringify(a);
	localStorage[g_storage_name]=s;
}

function loadstorage(){
	if (!window.localStorage || !window.JSON) {
		return;	
	}
	try{
		var a=JSON.parse(localStorage[g_storage_name]);
	}catch(err){
		return;
	}
	if (!a) return;
	if (a.latex_src!=null) _getid('latex_src').value=a.latex_src;
	if (a.usernote!=null) _getid('usernote').value=a.usernote;
}

var last_longurl,last_shorturl;
function proc_shortlink(){
	var longurl=_getid('latex_img').src;
	if (!longurl || (_getid('latex_img').style.display!='')){
		alert("No image is created.");
		return;
	}
	
	if (last_longurl==longurl){
		_getid('latex_short_imglink').value=last_shorturl;
		_getid('latex_short_link').value='<img src="'+last_shorturl+'">';
		_getid('div_short_link').style.display='';
		return;			
	}
	
	var a=new sack();
	var surl='http://atomurl.net/qrcode/shorturl.php?url='+encodeURIComponent(longurl);
	a.requestFile=surl;	
	a.onCompletion = function(){ 
		_getid('img_short_link_wait').style.display='none';
		_getid('btn_short_link').disabled=false;		
		
		if (a.response==''){
			alert("There is an error.");
			return;
		}
		_getid('latex_short_imglink').value=a.response;
		_getid('latex_short_link').value='<img src="'+a.response+'">';
		_getid('div_short_link').style.display='';
		
		last_longurl=longurl;
		last_shorturl=a.response;
	};
	
	_getid('img_short_link_wait').style.display='';
	_getid('latex_short_imglink').value='';
	_getid('latex_short_link').value='';
	_getid('btn_short_link').disabled=true;
		
	a.runAJAX();
}

function proc_shortlink_close(){
	_getid('div_short_link').style.display='none';
}

function proc_export(){
	if (!window.localStorage || !window.JSON) {
		alert("This browser is not supported.");
		return;	
	}
	var a={};
	a.storage1=localStorage[g_storage_name];
	a.storage2=localStorage[g_storage_name2];
	
	var b=_getid('import');
	b.value=JSON.stringify(a);
	alert("Copy Exported data to clipboard.");
	b.focus();
	b.select();	
}	

function proc_import(){
	if (!window.localStorage || !window.JSON) {
		alert("This browser is not supported.");
		return;	
	}
	var s=_getid('import').value;
	if (!s){
		alert("Input data!");
		_getid('import').focus();
		return;
	}
		
	var answer=confirm("Existing user data will be overwritten. Do you want to continue?");				
	if (!answer) return;

	try{
		var a=JSON.parse(s);
	}catch(err){
		alert("There is an error.\n\n"+err);
		return;
	}
	if (!a) return;
	if (a.storage1) localStorage[g_storage_name]=a.storage1;
	if (a.storage2) localStorage[g_storage_name2]=a.storage2;
		
	alert("Import success. This page will be reloaded.");
	location.href=location.href;
}	

function proc_clearall(){
	if (!window.localStorage || !window.JSON) {
		alert("This browser is not supported.");
		return;	
	}

	var answer=confirm("All user data will be deleted.\n\nAre you sure?");
	if (!answer) return;

	localStorage[g_storage_name]='';
	localStorage[g_storage_name2]='';
	
	isinited=false;
	alert("This page will be reloaded.");
	location.href=location.href;
}

var isinited=false;
function init(){
	loadstorage();

	if (window.localStorage && window.JSON) {
		try{
			math_useradd=JSON.parse(localStorage[g_storage_name2]);
			for (var i = 0 ; i < math_useradd.length ; i++) {
				var b=math_useradd[i];
				b.id=i;
				math_useradd_id=i;
			}
		}catch(err){}
	}	
	
	if (!math_useradd) math_useradd=[];
	
	_getid('latex_enablecolor').checked=toBool(getCookie('math_latex_enablecolor','false'));
	_getid('latex_bgcolor').value=getCookie('math_latex_bgcolor','FFFFFF');	
	_getid('latex_textcolor').value=getCookie('math_latex_textcolor','000000');
	_getid('latex_transparent').value=getCookie('math_latex_transparent',0);
	_getid('latex_height').value=getCookie('math_latex_height',0);

	_getid('latex_bgcolor').style.backgroundColor="#"+_getid('latex_bgcolor').value;
	_getid('latex_textcolor').style.backgroundColor="#"+_getid('latex_textcolor').value;

	var a=_getid('divopt');
	a=a.getElementsByTagName('*');
	for(var i = 0; i < a.length; i++){    
		if(a[i].tagName=='INPUT' || a[i].tagName=='SELECT'){
			if(a[i].type=='checkbox'){
				a[i].onclick=option_onchange;
			}else{
				a[i].onchange=option_onchange;
			}
		}
	}	
	
	_getid('latex_src').onkeyup=function(e){
		if(!e) e=event;
		if(!e) return;
		var code=e.keyCode;		
		if ((code>=37) && (code<=40)) return;
		if ((code>=33) && (code<=36)) return;		
		
		_getid('latex_length').innerHTML=_getid('latex_src').value.length+' characters';
		clearTimeout(make_image_timer);
		make_image_timer=setTimeout(get_mathimage, 700);	
	};
	
	var a=getCookie('math_selecttab');			
	if (!a) a='div_sample';
	if (!_getid(a)) a='div_sample';
	proc_show(a);
	
	option_setcontrol();
	
	_getid('latex_imglink').onclick=function(){
		this.focus();this.select();
	};
	_getid('latex_link').onclick=function(){
		this.focus();this.select();
	};
	_getid('latex_short_imglink').onclick=function(){
		this.focus();this.select();
	};
	_getid('latex_short_link').onclick=function(){
		this.focus();this.select();
	};
	
	get_mathimage();
	isinited=true;
	
	if (isopera || issafari){
		setInterval(function(){
			if (window.savestorage){
				savestorage();
			}
		},2000);
	}
}

function deinit(){
	if (isinited) savestorage();
}