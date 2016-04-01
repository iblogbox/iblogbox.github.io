var Module = {
	noInitialRun: true,
	print: function(text) {
		postMessage({ type: 'log', content: text });
	}
};
var getFileData = function(filename) {
	var data = FS.root.contents[filename].contents;
	return new Uint8Array(data).buffer;
};
self.onmessage = function(e) {
	var msg = e.data;
	switch (msg.type) {
		case 'file':
		    var path = FS.analyzePath('/file.mp3');
	        if (!path.parentExists || !path.exists) {
			}else{
				FS.deleteFile('/file.mp3');
			}
			FS.createDataFile('/', 'file.mp3', msg.content, true, true);
			break;
		case 'start':
			self.postMessage({
				type: 'started'
			});			
			var o_gtype=msg.o_gtype;
			var o_decibels=msg.o_decibels;
			try{
				if(o_gtype==0){
					Module['callMain'](['-t', '-r', '/file.mp3']);
				}else if(o_gtype==1){
					Module['callMain'](['-t', '-g', o_decibels, '/file.mp3']);
				}else if(o_gtype==2){
					Module['callMain'](['-t', '-g', o_decibels*(-1), '/file.mp3']);
				}
				self.postMessage({
					type: 'result',
					error: '',
					content: getFileData('file.mp3')
				});
			}catch(err){
				self.postMessage({
					type: 'result',
					error: ''+err
				});
			}
			break;
	}
};
// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
try {
  this['Module'] = Module;
  Module.test;
} catch(e) {
  this['Module'] = Module = {};
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function(filename) { return Module['read'](filename, true) };
  Module['load'] = function(f) {
    globalEval(read(f));
  };
  if (!Module['arguments']) {
    Module['arguments'] = process['argv'].slice(2);
  }
  module.exports = Module;
}
if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  Module['read'] = read;
  Module['readBinary'] = function(f) {
    return read(f, 'binary');
  };
  if (!Module['arguments']) {
    if (typeof scriptArgs != 'undefined') {
      Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
  this['Module'] = Module;
}
if (ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) {
  if (!Module['print']) {
    Module['print'] = function(x) {
      console.log(x);
    };
  }
  if (!Module['printErr']) {
    Module['printErr'] = function(x) {
      console.log(x);
    };
  }
  this['Module'] = Module;
}
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (!Module['arguments']) {
    if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WORKER) {
  // We can do very little here...
  var TRY_USE_DUMP = false;
  if (!Module['print']) {
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  Module['load'] = importScripts;
}
if (!ENVIRONMENT_IS_WORKER && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_SHELL) {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
if (!Module['preRun']) Module['preRun'] = [];
if (!Module['postRun']) Module['postRun'] = [];
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      var logg = log2(quantum);
      return '((((' +target + ')+' + (quantum-1) + ')>>' + logg + ')<<' + logg + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type, quantumSize) {
    if (Runtime.QUANTUM_SIZE == 1) return 1;
    var size = {
      '%i1': 1,
      '%i8': 1,
      '%i16': 2,
      '%i32': 4,
      '%i64': 8,
      "%float": 4,
      "%double": 8
    }['%'+type]; // add '%' since float and double confuse Closure compiler as keys, and also spidermonkey as a compiler will remove 's from '_i8' etc
    if (!size) {
      if (type.charAt(type.length-1) == '*') {
        size = Runtime.QUANTUM_SIZE; // A pointer
      } else if (type[0] == 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 == 0);
        size = bits/8;
      }
    }
    return size;
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (type == 'i64' || type == 'double' || vararg) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    type.flatIndexes = type.fields.map(function(field) {
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        size = Types.types[field].flatSize;
        alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else {
        throw 'Unclear type in struct: ' + field + ', in ' + type.name_ + ' :: ' + dump(Types.types[type.name_]);
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2 + 2*i;
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xff;
      if (needed) {
        buffer.push(code);
        needed--;
      }
      if (buffer.length == 0) {
        if (code < 128) return String.fromCharCode(code);
        buffer.push(code);
        if (code > 191 && code < 224) {
          needed = 1;
        } else {
          needed = 2;
        }
        return '';
      }
      if (needed > 0) return '';
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var ret;
      if (c1 > 191 && c1 < 224) {
        ret = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      } else {
        ret = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = ((((STACKTOP)+7)>>3)<<3); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = ((((STATICTOP)+7)>>3)<<3); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = ((((DYNAMICTOP)+7)>>3)<<3); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+(((low)>>>(0))))+((+(((high)>>>(0))))*(+(4294967296)))) : ((+(((low)>>>(0))))+((+(((high)|(0))))*(+(4294967296))))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function abort(text) {
  Module.print(text + ':\n' + (new Error).stack);
  ABORT = true;
  throw "Assertion: " + text;
}
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = globalScope['Module']['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length+1);
      writeStringToMemory(value, ret);
      return ret;
    } else if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,((Math.min((+(Math.floor((value)/(+(4294967296))))), (+(4294967295))))|0)>>>0],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return ((x+4095)>>12)<<12;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value, or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(!!Int32Array && !!Float64Array && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATINIT__ = []; // functions called during startup
var __ATMAIN__ = []; // functions called when main() is to be run
var __ATEXIT__ = []; // functions called during shutdown
var runtimeInitialized = false;
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math['imul']) Math['imul'] = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyTracking = {};
var calledInit = false, calledRun = false;
var runDependencyWatcher = null;
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    } 
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!calledRun && shouldRunNow) run();
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
function addPreRun(func) {
  if (!Module['preRun']) Module['preRun'] = [];
  else if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
  Module['preRun'].push(func);
}
function loadMemoryInitializer(filename) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  // always do this asynchronously, to keep shell and web as similar as possible
  addPreRun(function() {
    if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
      applyData(Module['readBinary'](filename));
    } else {
      Browser.asyncLoad(filename, function(data) {
        applyData(data);
      }, function(data) {
        throw 'could not load memory initializer ' + filename;
      });
    }
  });
}
// === Body ===
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 4189728;
/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } });
var _stdout;
var _stdin;
var _stderr;
var _stdout = _stdout=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stdin = _stdin=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stderr = _stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* memory initializer */ allocate([66,85,70,82,66,85,70,67,78,84,80,67,78,84,67,79,77,67,79,77,77,67,82,65,65,69,78,67,69,84,67,69,84,67,79,69,81,85,69,81,85,65,71,69,79,71,69,79,66,73,80,76,73,80,76,83,76,78,75,76,73,78,75,77,67,73,77,67,68,73,77,76,76,77,76,76,84,80,73,67,65,80,73,67,80,79,80,80,79,80,77,82,69,86,82,86,82,66,82,86,65,82,86,65,68,83,76,84,83,89,76,84,83,84,67,83,89,84,67,84,65,76,84,65,76,66,84,66,80,84,66,80,77,84,67,77,84,67,79,77,84,67,79,84,67,79,78,84,67,82,84,67,79,80,84,68,65,84,68,65,84,84,68,89,84,68,76,89,84,69,78,84,69,78,67,84,70,84,84,70,76,84,84,73,77,84,73,77,69,84,75,69,84,75,69,89,84,76,65,84,76,65,78,84,76,69,84,76,69,78,84,77,84,84,77,69,68,84,79,65,84,79,80,69,84,79,70,84,79,70,78,84,79,76,84,79,76,89,84,79,82,84,79,82,89,84,79,84,84,79,65,76,84,80,49,84,80,69,49,84,80,50,84,80,69,50,84,80,51,84,80,69,51,84,80,52,84,80,69,52,84,80,65,84,80,79,83,84,80,66,84,80,85,66,84,82,67,84,83,82,67,84,82,68,84,82,68,65,84,82,75,84,82,67,75,84,83,73,84,83,73,90,84,83,83,84,83,83,69,84,84,49,84,73,84,49,84,84,50,84,73,84,50,84,84,51,84,73,84,51,84,88,84,84,69,88,84,84,88,88,84,88,88,88,84,89,69,84,89,69,82,85,70,73,85,70,73,68,85,76,84,85,83,76,84,87,65,70,87,79,65,70,87,65,82,87,79,65,82,87,65,83,87,79,65,83,87,67,77,87,67,79,77,87,67,80,87,67,79,80,87,80,66,87,80,85,66,87,88,88,87,88,88,88,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,64,0,0,0,96,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,32,1,0,0,64,1,0,0,96,1,0,0,128,1,0,0,160,1,0,0,192,1,0,0,0,0,0,0,0,0,0,0,32,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,64,1,0,0,128,1,0,0,0,0,0,0,0,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,64,1,0,0,0,0,0,0,0,0,0,0,32,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,144,0,0,0,160,0,0,0,176,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,8,0,0,0,16,0,0,0,24,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,144,0,0,0,160,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,16,0,0,0,24,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,144,0,0,0,160,0,0,0,0,0,0,0,241,255,249,255,253,255,255,255,15,0,14,0,255,255,13,0,12,0,253,255,255,255,11,0,10,0,255,255,9,0,8,0,249,255,253,255,255,255,7,0,6,0,255,255,5,0,4,0,253,255,255,255,3,0,2,0,255,255,1,0,0,0,0,0,227,255,235,255,243,255,249,255,253,255,255,255,11,0,15,0,255,255,13,0,14,0,253,255,255,255,7,0,5,0,9,0,253,255,255,255,6,0,3,0,255,255,10,0,12,0,253,255,255,255,2,0,1,0,255,255,4,0,8,0,0,0,0,0,193,255,203,255,215,255,227,255,237,255,245,255,251,255,253,255,255,255,85,0,69,0,53,0,255,255,83,0,255,255,84,0,5,0,253,255,255,255,68,0,37,0,255,255,82,0,21,0,253,255,255,255,81,0,52,0,255,255,67,0,255,255,80,0,4,0,249,255,253,255,255,255,36,0,66,0,255,255,51,0,64,0,255,255,20,0,65,0,251,255,253,255,255,255,35,0,50,0,19,0,255,255,49,0,255,255,3,0,48,0,251,255,253,255,255,255,34,0,2,0,18,0,255,255,33,0,32,0,253,255,255,255,17,0,1,0,255,255,16,0,0,0,0,0,191,255,193,255,197,255,211,255,225,255,237,255,243,255,249,255,251,255,253,255,255,255,85,0,84,0,69,0,83,0,253,255,255,255,53,0,68,0,37,0,253,255,255,255,82,0,5,0,21,0,251,255,255,255,81,0,255,255,52,0,67,0,253,255,255,255,80,0,51,0,36,0,251,255,253,255,255,255,66,0,20,0,65,0,253,255,255,255,4,0,64,0,255,255,35,0,50,0,247,255,249,255,253,255,255,255,19,0,49,0,255,255,3,0,48,0,34,0,255,255,2,0,32,0,255,255,18,0,33,0,17,0,253,255,255,255,1,0,16,0,0,0,0,0,187,255,191,255,199,255,217,255,227,255,239,255,245,255,249,255,253,255,255,255,85,0,69,0,255,255,84,0,83,0,255,255,53,0,68,0,253,255,255,255,37,0,82,0,21,0,251,255,255,255,81,0,255,255,5,0,52,0,255,255,80,0,255,255,67,0,51,0,251,255,253,255,255,255,36,0,66,0,20,0,255,255,65,0,64,0,245,255,249,255,253,255,255,255,4,0,35,0,255,255,50,0,3,0,255,255,19,0,49,0,253,255,255,255,48,0,34,0,18,0,251,255,255,255,33,0,255,255,2,0,32,0,17,0,255,255,1,0,16,0,0,0,0,0,231,255,237,255,243,255,247,255,251,255,253,255,255,255,51,0,3,0,35,0,255,255,50,0,48,0,255,255,19,0,49,0,253,255,255,255,34,0,2,0,18,0,253,255,255,255,33,0,32,0,1,0,255,255,17,0,255,255,16,0,0,0,0,0,227,255,231,255,233,255,241,255,249,255,251,255,253,255,255,255,51,0,35,0,50,0,49,0,253,255,255,255,19,0,3,0,255,255,48,0,34,0,253,255,255,255,18,0,33,0,255,255,2,0,32,0,17,0,255,255,1,0,16,0,0,0,0,0,243,255,245,255,247,255,251,255,253,255,255,255,34,0,2,0,18,0,255,255,33,0,32,0,16,0,17,0,255,255,1,0,0,0,0,0,0,0,0,0,61,254,139,255,213,255,231,255,241,255,249,255,253,255,255,255,239,0,254,0,255,255,223,0,253,0,253,255,255,255,207,0,252,0,255,255,191,0,251,0,251,255,255,255,250,0,255,255,175,0,159,0,255,255,249,0,248,0,247,255,251,255,253,255,255,255,143,0,127,0,247,0,255,255,111,0,246,0,253,255,255,255,95,0,245,0,255,255,79,0,244,0,185,255,249,255,253,255,255,255,63,0,243,0,255,255,47,0,242,0,251,255,255,255,241,0,255,255,31,0,240,0,231,255,247,255,255,255,15,0,253,255,255,255,238,0,222,0,255,255,237,0,206,0,249,255,253,255,255,255,236,0,221,0,255,255,190,0,235,0,253,255,255,255,205,0,220,0,255,255,174,0,234,0,241,255,249,255,253,255,255,255,189,0,219,0,255,255,204,0,158,0,253,255,255,255,233,0,173,0,255,255,218,0,188,0,249,255,253,255,255,255,203,0,142,0,255,255,232,0,157,0,253,255,255,255,217,0,126,0,255,255,231,0,172,0,255,0,21,255,113,255,179,255,211,255,231,255,241,255,249,255,253,255,255,255,202,0,187,0,255,255,141,0,216,0,251,255,253,255,255,255,14,0,224,0,13,0,230,0,251,255,253,255,255,255,110,0,156,0,201,0,255,255,94,0,186,0,247,255,251,255,255,255,229,0,255,255,171,0,125,0,255,255,215,0,228,0,253,255,255,255,140,0,200,0,253,255,255,255,78,0,46,0,62,0,241,255,249,255,253,255,255,255,109,0,214,0,255,255,227,0,155,0,253,255,255,255,185,0,170,0,255,255,226,0,30,0,249,255,253,255,255,255,225,0,93,0,255,255,213,0,124,0,253,255,255,255,199,0,77,0,255,255,139,0,184,0,225,255,241,255,249,255,253,255,255,255,212,0,154,0,255,255,169,0,108,0,253,255,255,255,198,0,61,0,255,255,211,0,45,0,249,255,253,255,255,255,210,0,29,0,255,255,123,0,183,0,253,255,255,255,209,0,92,0,255,255,197,0,138,0,239,255,249,255,253,255,255,255,168,0,153,0,255,255,76,0,196,0,253,255,255,255,107,0,182,0,253,255,255,255,208,0,12,0,60,0,249,255,253,255,255,255,195,0,122,0,255,255,167,0,44,0,253,255,255,255,194,0,91,0,255,255,181,0,28,0,199,255,221,255,237,255,249,255,253,255,255,255,137,0,152,0,255,255,193,0,75,0,251,255,253,255,255,255,192,0,11,0,59,0,253,255,255,255,176,0,10,0,26,0,251,255,255,255,180,0,255,255,106,0,166,0,253,255,255,255,121,0,151,0,253,255,255,255,160,0,9,0,144,0,247,255,253,255,255,255,179,0,136,0,253,255,255,255,43,0,90,0,178,0,249,255,253,255,255,255,165,0,27,0,255,255,177,0,105,0,255,255,150,0,164,0,239,255,247,255,251,255,253,255,255,255,74,0,120,0,135,0,255,255,58,0,163,0,253,255,255,255,89,0,149,0,255,255,42,0,162,0,249,255,253,255,255,255,161,0,104,0,255,255,134,0,119,0,253,255,255,255,73,0,148,0,255,255,57,0,147,0,193,255,225,255,241,255,249,255,253,255,255,255,88,0,133,0,255,255,41,0,103,0,253,255,255,255,118,0,146,0,255,255,25,0,145,0,249,255,253,255,255,255,72,0,132,0,255,255,87,0,117,0,253,255,255,255,56,0,131,0,255,255,102,0,40,0,239,255,249,255,253,255,255,255,130,0,24,0,255,255,71,0,116,0,251,255,255,255,129,0,255,255,8,0,128,0,255,255,86,0,101,0,249,255,251,255,255,255,23,0,255,255,7,0,112,0,115,0,253,255,255,255,55,0,39,0,114,0,241,255,249,255,253,255,255,255,70,0,100,0,255,255,85,0,113,0,253,255,255,255,54,0,99,0,255,255,69,0,84,0,249,255,253,255,255,255,38,0,98,0,255,255,22,0,97,0,251,255,253,255,255,255,6,0,96,0,53,0,255,255,83,0,68,0,205,255,219,255,233,255,241,255,247,255,253,255,255,255,37,0,82,0,255,255,21,0,255,255,5,0,80,0,255,255,81,0,255,255,52,0,67,0,253,255,255,255,36,0,66,0,255,255,51,0,20,0,247,255,251,255,255,255,65,0,255,255,4,0,64,0,255,255,35,0,50,0,255,255,19,0,49,0,249,255,251,255,253,255,255,255,3,0,48,0,34,0,18,0,255,255,33,0,255,255,2,0,32,0,253,255,255,255,17,0,1,0,255,255,16,0,0,0,0,0,241,255,245,255,247,255,251,255,253,255,255,255,34,0,2,0,18,0,255,255,33,0,32,0,17,0,255,255,1,0,16,0,0,0,0,0,0,0,0,0,3,254,9,254,51,254,189,254,153,255,219,255,229,255,241,255,249,255,253,255,255,255,239,0,254,0,255,255,223,0,253,0,253,255,255,255,207,0,252,0,255,255,191,0,251,0,251,255,255,255,175,0,255,255,250,0,159,0,253,255,255,255,249,0,248,0,143,0,249,255,253,255,255,255,127,0,247,0,255,255,111,0,246,0,255,0,247,255,251,255,253,255,255,255,95,0,245,0,79,0,255,255,244,0,243,0,203,255,255,255,240,0,255,255,63,0,227,255,237,255,243,255,249,255,251,255,255,255,206,0,255,255,236,0,221,0,222,0,255,255,233,0,255,255,234,0,217,0,255,255,238,0,255,255,237,0,235,0,253,255,255,255,190,0,205,0,253,255,255,255,220,0,219,0,174,0,245,255,251,255,255,255,204,0,255,255,173,0,218,0,253,255,255,255,126,0,172,0,202,0,251,255,253,255,255,255,201,0,125,0,94,0,189,0,242,0,163,255,251,255,253,255,255,255,47,0,15,0,31,0,255,255,241,0,207,255,231,255,243,255,251,255,255,255,158,0,255,255,188,0,203,0,253,255,255,255,142,0,232,0,255,255,157,0,231,0,249,255,253,255,255,255,187,0,141,0,255,255,216,0,110,0,255,255,230,0,156,0,243,255,249,255,253,255,255,255,171,0,186,0,255,255,229,0,215,0,255,255,78,0,255,255,228,0,140,0,253,255,255,255,200,0,62,0,255,255,109,0,255,255,214,0,155,0,237,255,245,255,251,255,253,255,255,255,185,0,170,0,225,0,255,255,212,0,255,255,184,0,169,0,251,255,255,255,123,0,255,255,183,0,208,0,227,0,249,255,253,255,255,255,14,0,224,0,255,255,93,0,213,0,253,255,255,255,124,0,199,0,255,255,77,0,139,0,181,255,211,255,229,255,243,255,249,255,253,255,255,255,154,0,108,0,255,255,198,0,61,0,253,255,255,255,92,0,197,0,13,0,249,255,253,255,255,255,138,0,168,0,255,255,153,0,76,0,253,255,255,255,182,0,122,0,60,0,245,255,251,255,253,255,255,255,91,0,137,0,28,0,255,255,192,0,255,255,152,0,121,0,255,255,226,0,255,255,46,0,30,0,241,255,249,255,253,255,255,255,211,0,45,0,255,255,210,0,209,0,251,255,255,255,59,0,255,255,151,0,136,0,29,0,249,255,253,255,255,255,196,0,107,0,255,255,195,0,167,0,255,255,44,0,255,255,194,0,181,0,233,255,243,255,249,255,253,255,255,255,193,0,12,0,255,255,75,0,180,0,253,255,255,255,106,0,166,0,179,0,251,255,253,255,255,255,90,0,165,0,43,0,255,255,178,0,27,0,243,255,251,255,255,255,177,0,255,255,11,0,176,0,253,255,255,255,105,0,150,0,255,255,74,0,164,0,251,255,253,255,255,255,120,0,135,0,163,0,253,255,255,255,58,0,89,0,42,0,159,255,199,255,223,255,237,255,245,255,251,255,253,255,255,255,149,0,104,0,161,0,253,255,255,255,134,0,119,0,148,0,251,255,253,255,255,255,73,0,87,0,103,0,162,0,251,255,255,255,26,0,255,255,10,0,160,0,253,255,255,255,57,0,147,0,255,255,88,0,133,0,247,255,253,255,255,255,41,0,146,0,253,255,255,255,118,0,9,0,25,0,251,255,255,255,145,0,255,255,144,0,72,0,253,255,255,255,132,0,117,0,255,255,56,0,131,0,235,255,245,255,251,255,253,255,255,255,102,0,40,0,130,0,253,255,255,255,71,0,116,0,24,0,253,255,255,255,129,0,128,0,253,255,255,255,8,0,86,0,55,0,247,255,251,255,255,255,115,0,255,255,101,0,70,0,255,255,39,0,114,0,251,255,253,255,255,255,100,0,85,0,7,0,23,0,233,255,243,255,251,255,255,255,113,0,255,255,112,0,54,0,253,255,255,255,99,0,69,0,255,255,84,0,38,0,253,255,255,255,98,0,22,0,255,255,97,0,255,255,6,0,96,0,247,255,251,255,255,255,83,0,255,255,53,0,68,0,255,255,37,0,82,0,255,255,81,0,255,255,21,0,5,0,223,255,233,255,243,255,249,255,253,255,255,255,52,0,67,0,255,255,80,0,36,0,253,255,255,255,66,0,51,0,20,0,251,255,255,255,65,0,255,255,4,0,64,0,255,255,35,0,50,0,253,255,255,255,19,0,49,0,253,255,255,255,3,0,48,0,34,0,253,255,255,255,18,0,33,0,255,255,2,0,32,0,253,255,255,255,17,0,1,0,16,0,0,0,0,0,17,254,67,254,157,254,249,254,73,255,141,255,179,255,213,255,229,255,243,255,249,255,253,255,255,255,255,0,239,0,255,255,254,0,223,0,255,255,238,0,255,255,253,0,207,0,249,255,253,255,255,255,252,0,222,0,255,255,237,0,191,0,255,255,251,0,255,255,206,0,236,0,249,255,253,255,255,255,221,0,175,0,255,255,250,0,190,0,253,255,255,255,235,0,205,0,255,255,220,0,159,0,241,255,249,255,253,255,255,255,249,0,234,0,255,255,189,0,219,0,253,255,255,255,143,0,248,0,255,255,204,0,158,0,249,255,253,255,255,255,233,0,127,0,255,255,247,0,173,0,253,255,255,255,218,0,188,0,255,255,111,0,255,255,174,0,15,0,237,255,245,255,253,255,255,255,203,0,246,0,253,255,255,255,142,0,232,0,255,255,95,0,157,0,253,255,255,255,245,0,126,0,255,255,231,0,172,0,247,255,253,255,255,255,202,0,187,0,253,255,255,255,217,0,141,0,79,0,253,255,255,255,244,0,63,0,255,255,243,0,216,0,223,255,239,255,247,255,253,255,255,255,230,0,47,0,255,255,242,0,255,255,110,0,240,0,253,255,255,255,31,0,241,0,255,255,156,0,201,0,249,255,253,255,255,255,94,0,171,0,255,255,186,0,229,0,253,255,255,255,125,0,215,0,255,255,78,0,228,0,241,255,249,255,253,255,255,255,140,0,200,0,255,255,62,0,109,0,253,255,255,255,214,0,227,0,255,255,155,0,185,0,249,255,253,255,255,255,46,0,170,0,255,255,226,0,30,0,251,255,255,255,225,0,255,255,14,0,224,0,255,255,93,0,213,0,211,255,231,255,243,255,249,255,253,255,255,255,124,0,199,0,255,255,77,0,139,0,255,255,212,0,255,255,184,0,154,0,249,255,253,255,255,255,169,0,108,0,255,255,198,0,61,0,255,255,211,0,210,0,247,255,251,255,253,255,255,255,45,0,13,0,29,0,255,255,123,0,183,0,251,255,255,255,209,0,255,255,92,0,208,0,255,255,197,0,138,0,239,255,249,255,253,255,255,255,168,0,76,0,255,255,196,0,107,0,251,255,255,255,182,0,255,255,153,0,12,0,255,255,60,0,195,0,247,255,253,255,255,255,122,0,167,0,255,255,166,0,255,255,192,0,11,0,255,255,194,0,255,255,44,0,91,0,201,255,227,255,241,255,249,255,253,255,255,255,181,0,28,0,255,255,137,0,152,0,253,255,255,255,193,0,75,0,255,255,180,0,106,0,251,255,253,255,255,255,59,0,121,0,179,0,253,255,255,255,151,0,136,0,255,255,43,0,90,0,245,255,251,255,255,255,178,0,255,255,165,0,27,0,255,255,177,0,255,255,176,0,105,0,249,255,253,255,255,255,150,0,74,0,255,255,164,0,120,0,253,255,255,255,135,0,58,0,163,0,239,255,249,255,253,255,255,255,89,0,149,0,255,255,42,0,162,0,253,255,255,255,26,0,161,0,253,255,255,255,10,0,160,0,104,0,249,255,253,255,255,255,134,0,73,0,255,255,148,0,57,0,251,255,255,255,147,0,255,255,119,0,9,0,255,255,88,0,133,0,203,255,227,255,243,255,249,255,253,255,255,255,41,0,103,0,255,255,118,0,146,0,255,255,145,0,255,255,25,0,144,0,249,255,253,255,255,255,72,0,132,0,255,255,87,0,117,0,253,255,255,255,56,0,131,0,255,255,102,0,71,0,249,255,253,255,255,255,40,0,130,0,255,255,24,0,129,0,249,255,253,255,255,255,116,0,8,0,255,255,128,0,86,0,253,255,255,255,101,0,55,0,255,255,115,0,70,0,239,255,249,255,253,255,255,255,39,0,114,0,255,255,100,0,23,0,253,255,255,255,85,0,113,0,253,255,255,255,7,0,112,0,54,0,249,255,253,255,255,255,99,0,69,0,255,255,84,0,38,0,253,255,255,255,98,0,22,0,253,255,255,255,6,0,96,0,53,0,223,255,237,255,247,255,251,255,255,255,97,0,255,255,83,0,68,0,255,255,37,0,82,0,253,255,255,255,21,0,81,0,253,255,255,255,5,0,80,0,52,0,249,255,253,255,255,255,67,0,36,0,255,255,66,0,51,0,255,255,65,0,255,255,20,0,4,0,247,255,253,255,255,255,35,0,50,0,253,255,255,255,64,0,3,0,19,0,253,255,255,255,49,0,48,0,34,0,247,255,249,255,253,255,255,255,18,0,33,0,255,255,2,0,32,0,17,0,253,255,255,255,1,0,16,0,0,0,0,0,3,254,9,254,37,254,107,254,179,254,247,254,51,255,103,255,141,255,173,255,203,255,221,255,235,255,243,255,247,255,249,255,251,255,253,255,255,255,254,0,252,0,253,0,237,0,255,0,255,255,239,0,223,0,253,255,255,255,238,0,207,0,255,255,222,0,191,0,247,255,253,255,255,255,251,0,206,0,255,255,220,0,255,255,175,0,233,0,255,255,236,0,221,0,247,255,251,255,253,255,255,255,250,0,205,0,190,0,255,255,235,0,159,0,253,255,255,255,249,0,234,0,255,255,189,0,219,0,239,255,247,255,253,255,255,255,143,0,248,0,255,255,204,0,255,255,174,0,158,0,251,255,255,255,142,0,255,255,127,0,126,0,247,0,251,255,255,255,218,0,255,255,173,0,188,0,253,255,255,255,203,0,246,0,111,0,241,255,249,255,253,255,255,255,232,0,95,0,255,255,157,0,217,0,253,255,255,255,245,0,231,0,255,255,172,0,187,0,247,255,253,255,255,255,79,0,244,0,253,255,255,255,202,0,230,0,243,0,255,255,63,0,255,255,141,0,216,0,235,255,247,255,253,255,255,255,47,0,242,0,253,255,255,255,110,0,156,0,15,0,251,255,253,255,255,255,201,0,94,0,171,0,253,255,255,255,125,0,215,0,78,0,245,255,251,255,253,255,255,255,200,0,214,0,62,0,255,255,185,0,255,255,155,0,170,0,255,255,31,0,241,0,233,255,243,255,251,255,255,255,240,0,255,255,186,0,229,0,253,255,255,255,228,0,140,0,255,255,109,0,227,0,251,255,255,255,226,0,255,255,46,0,14,0,255,255,30,0,225,0,241,255,249,255,253,255,255,255,224,0,93,0,255,255,213,0,124,0,253,255,255,255,199,0,77,0,255,255,139,0,184,0,249,255,253,255,255,255,212,0,154,0,255,255,169,0,108,0,255,255,198,0,61,0,219,255,235,255,247,255,251,255,253,255,255,255,211,0,123,0,45,0,255,255,210,0,29,0,251,255,255,255,183,0,255,255,92,0,197,0,253,255,255,255,153,0,122,0,195,0,249,255,251,255,253,255,255,255,167,0,151,0,75,0,209,0,253,255,255,255,13,0,208,0,255,255,138,0,168,0,245,255,249,255,253,255,255,255,76,0,196,0,255,255,107,0,182,0,255,255,60,0,44,0,253,255,255,255,194,0,91,0,253,255,255,255,181,0,137,0,28,0,213,255,233,255,245,255,251,255,255,255,193,0,255,255,152,0,12,0,255,255,192,0,255,255,180,0,106,0,251,255,253,255,255,255,166,0,121,0,59,0,255,255,179,0,255,255,136,0,90,0,245,255,251,255,255,255,43,0,255,255,165,0,105,0,255,255,164,0,255,255,120,0,135,0,251,255,255,255,148,0,255,255,119,0,118,0,178,0,245,255,253,255,255,255,27,0,177,0,253,255,255,255,11,0,176,0,255,255,150,0,74,0,249,255,253,255,255,255,58,0,163,0,255,255,89,0,149,0,255,255,42,0,162,0,209,255,233,255,247,255,253,255,255,255,26,0,161,0,253,255,255,255,10,0,104,0,160,0,251,255,253,255,255,255,134,0,73,0,147,0,253,255,255,255,57,0,88,0,255,255,133,0,103,0,247,255,253,255,255,255,41,0,146,0,253,255,255,255,87,0,117,0,56,0,251,255,255,255,131,0,255,255,102,0,71,0,253,255,255,255,116,0,86,0,255,255,101,0,115,0,245,255,253,255,255,255,25,0,145,0,253,255,255,255,9,0,144,0,255,255,72,0,132,0,249,255,251,255,255,255,114,0,255,255,70,0,100,0,40,0,255,255,130,0,24,0,215,255,229,255,245,255,251,255,253,255,255,255,55,0,39,0,23,0,255,255,113,0,255,255,85,0,7,0,249,255,253,255,255,255,112,0,54,0,255,255,99,0,69,0,253,255,255,255,84,0,38,0,255,255,98,0,53,0,251,255,255,255,129,0,255,255,8,0,128,0,253,255,255,255,22,0,97,0,255,255,6,0,96,0,243,255,247,255,251,255,253,255,255,255,83,0,68,0,37,0,255,255,82,0,5,0,255,255,21,0,81,0,249,255,253,255,255,255,52,0,67,0,255,255,80,0,36,0,253,255,255,255,66,0,51,0,20,0,237,255,245,255,251,255,255,255,65,0,255,255,4,0,64,0,253,255,255,255,35,0,50,0,19,0,253,255,255,255,49,0,3,0,255,255,48,0,34,0,253,255,255,255,18,0,33,0,255,255,2,0,32,0,253,255,255,255,17,0,1,0,16,0,0,0,0,0,141,255,157,255,183,255,211,255,229,255,239,255,247,255,251,255,253,255,255,255,119,0,103,0,118,0,255,255,87,0,117,0,253,255,255,255,102,0,71,0,255,255,116,0,101,0,253,255,255,255,86,0,55,0,253,255,255,255,115,0,85,0,39,0,249,255,253,255,255,255,114,0,70,0,255,255,100,0,23,0,251,255,255,255,113,0,255,255,7,0,112,0,255,255,54,0,99,0,243,255,247,255,253,255,255,255,69,0,84,0,255,255,68,0,255,255,6,0,5,0,255,255,38,0,98,0,251,255,255,255,97,0,255,255,22,0,96,0,253,255,255,255,53,0,83,0,255,255,37,0,82,0,239,255,249,255,253,255,255,255,21,0,81,0,255,255,52,0,67,0,251,255,253,255,255,255,80,0,4,0,36,0,255,255,66,0,20,0,253,255,255,255,51,0,65,0,255,255,35,0,50,0,245,255,249,255,251,255,253,255,255,255,64,0,3,0,48,0,19,0,255,255,49,0,34,0,255,255,18,0,33,0,249,255,251,255,253,255,255,255,2,0,32,0,0,0,17,0,255,255,1,0,16,0,0,0,135,255,143,255,167,255,197,255,213,255,229,255,239,255,249,255,253,255,255,255,119,0,103,0,255,255,118,0,117,0,253,255,255,255,102,0,71,0,255,255,116,0,255,255,87,0,85,0,251,255,253,255,255,255,86,0,101,0,55,0,255,255,115,0,70,0,247,255,249,255,253,255,255,255,69,0,84,0,255,255,53,0,83,0,39,0,255,255,114,0,255,255,100,0,7,0,251,255,255,255,113,0,255,255,23,0,112,0,253,255,255,255,54,0,99,0,255,255,96,0,255,255,68,0,37,0,243,255,249,255,251,255,253,255,255,255,82,0,5,0,21,0,98,0,253,255,255,255,38,0,6,0,22,0,251,255,255,255,97,0,255,255,81,0,52,0,251,255,255,255,80,0,255,255,67,0,51,0,255,255,36,0,66,0,241,255,245,255,249,255,253,255,255,255,20,0,65,0,255,255,4,0,64,0,255,255,35,0,50,0,255,255,19,0,49,0,251,255,253,255,255,255,3,0,48,0,34,0,33,0,251,255,255,255,18,0,255,255,2,0,32,0,17,0,253,255,255,255,1,0,16,0,0,0,0,0,131,255,135,255,145,255,173,255,201,255,221,255,235,255,243,255,249,255,253,255,255,255,119,0,103,0,255,255,118,0,87,0,253,255,255,255,117,0,102,0,71,0,253,255,255,255,116,0,86,0,255,255,101,0,55,0,247,255,253,255,255,255,115,0,70,0,253,255,255,255,85,0,84,0,99,0,255,255,39,0,114,0,245,255,251,255,253,255,255,255,100,0,7,0,112,0,255,255,98,0,255,255,69,0,53,0,251,255,255,255,6,0,255,255,83,0,68,0,23,0,239,255,251,255,255,255,113,0,255,255,54,0,38,0,251,255,253,255,255,255,37,0,82,0,21,0,255,255,81,0,255,255,52,0,67,0,253,255,255,255,22,0,97,0,255,255,96,0,255,255,5,0,80,0,237,255,245,255,249,255,253,255,255,255,36,0,66,0,255,255,51,0,4,0,255,255,20,0,65,0,253,255,255,255,64,0,35,0,255,255,50,0,3,0,253,255,255,255,19,0,49,0,255,255,48,0,34,0,249,255,253,255,255,255,18,0,33,0,255,255,2,0,32,0,17,0,255,255,1,0,16,0,0,0,0,0,251,255,253,255,255,255,17,0,1,0,16,0,0,0,0,0,34,86,0,0,192,93,0,0,128,62,0,0,255,255,255,255,68,172,0,0,128,187,0,0,0,125,0,0,255,255,255,255,17,43,0,0,224,46,0,0,64,31,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,2,0,0,0,3,0,0,0,3,0,0,0,3,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,36,64,0,0,0,0,0,0,89,64,0,0,0,0,0,136,195,64,0,0,0,0,132,215,151,65,0,128,224,55,121,195,65,67,23,110,5,181,181,184,147,70,245,249,63,233,3,79,56,77,50,29,48,249,72,119,130,90,60,191,115,127,221,79,21,117,16,170,16,0,152,170,16,0,216,170,16,0,0,170,16,0,144,170,16,0,0,0,0,0,255,127,63,31,15,7,3,1,0,128,192,224,240,248,252,254,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,191,36,0,0,0,36,0,0,0,12,0,0,0,36,0,0,0,51,51,51,51,51,51,227,191,31,133,235,81,184,30,225,191,31,133,235,81,184,30,213,191,174,71,225,122,20,174,199,191,82,184,30,133,235,81,184,191,203,161,69,182,243,253,164,191,134,90,211,188,227,20,141,191,172,173,216,95,118,79,110,191,0,0,0,0,136,3,0,0,0,0,0,0,72,3,0,0,0,0,0,0,40,159,12,0,0,0,0,0,72,25,0,0,0,0,0,0,32,10,0,0,0,0,0,0,248,5,0,0,0,0,0,0,40,159,12,0,0,0,0,0,184,5,0,0,0,0,0,0,120,5,0,0,0,0,0,0,232,4,0,0,0,0,0,0,88,4,0,0,0,0,0,0,200,3,0,0,0,0,0,0,72,24,0,0,0,0,0,0,72,23,0,0,0,0,0,0,72,22,0,0,0,0,0,0,72,18,0,0,0,0,0,0,40,159,12,0,0,0,0,0,72,14,0,0,1,0,0,0,72,10,0,0,2,0,0,0,72,10,0,0,3,0,0,0,72,10,0,0,4,0,0,0,72,10,0,0,6,0,0,0,72,10,0,0,8,0,0,0,72,10,0,0,10,0,0,0,72,10,0,0,13,0,0,0,72,10,0,0,4,0,0,0,32,6,0,0,5,0,0,0,32,6,0,0,6,0,0,0,32,6,0,0,7,0,0,0,32,6,0,0,8,0,0,0,32,6,0,0,9,0,0,0,32,6,0,0,11,0,0,0,32,6,0,0,13,0,0,0,32,6,0,0,205,204,204,204,204,12,38,64,0,0,0,0,0,0,40,64,0,0,0,0,0,0,32,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,205,204,204,204,204,12,54,64,0,0,0,0,0,0,56,64,0,0,0,0,0,0,48,64,0,0,0,0,0,0,240,63,205,204,204,204,204,12,70,64,0,0,0,0,0,0,72,64,0,0,0,0,0,0,64,64,0,0,0,0,0,0,240,63,68,172,0,0,128,187,0,0,0,125,0,0,34,86,0,0,192,93,0,0,128,62,0,0,17,43,0,0,224,46,0,0,64,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,225,11,218,126,14,0,240,190,225,11,218,126,14,0,240,190,225,11,218,126,14,0,240,190,225,11,218,126,14,0,240,190,225,11,218,126,14,0,240,190,225,11,218,126,14,0,240,190,225,11,218,126,14,0,0,191,225,11,218,126,14,0,0,191,225,11,218,126,14,0,0,191,225,11,218,126,14,0,0,191,131,65,47,98,243,255,7,191,131,65,47,98,243,255,7,191,116,71,156,161,250,255,15,191,116,71,156,161,250,255,15,191,178,166,132,240,0,0,20,191,178,166,132,240,0,0,20,191,170,41,59,144,4,0,24,191,163,172,241,47,8,0,28,191,163,172,241,47,8,0,28,191,116,71,156,161,250,255,31,191,54,101,169,32,255,255,33,191,178,166,132,240,0,0,36,191,46,232,95,192,2,0,38,191,19,119,16,201,253,255,41,191,143,184,235,152,255,255,43,191,196,29,81,156,1,0,48,191,120,196,187,56,254,255,48,191,244,5,151,8,0,0,51,191,112,71,114,216,1,0,53,191,161,47,184,68,0,0,56,191,29,113,147,20,2,0,58,191,77,89,217,128,0,0,61,191,192,160,49,5,254,255,62,191,220,17,116,210,0,128,65,191,244,5,151,8,0,0,67,191,12,250,185,62,255,127,68,191,136,59,149,14,1,128,70,191,0,0,175,184,0,128,72,191,119,196,200,98,0,128,74,191,77,89,217,128,0,0,77,191,35,238,233,158,0,128,79,191,125,65,125,94,0,0,81,191,232,139,133,109,0,64,82,191,0,128,168,163,255,191,83,191,155,50,172,236,255,63,85,191,53,229,175,53,0,192,86,191,208,151,179,126,0,64,88,191,24,244,209,238,255,255,89,191,226,14,209,113,0,192,91,191,250,2,244,167,255,63,93,191,244,133,238,100,0,64,95,191,30,113,134,234,255,127,96,191,131,254,5,44,0,96,97,191,191,224,18,1,0,96,98,191,36,110,146,66,0,64,99,191,71,156,161,250,255,31,100,191,131,126,174,207,255,31,101,191,232,11,46,17,0,0,102,191,12,58,61,201,255,223,102,191,113,199,188,10,0,192,103,191,190,160,62,47,0,128,104,191,203,26,80,202,255,63,105,191,24,244,209,238,255,255,105,191,77,25,86,246,255,159,106,191,131,62,218,253,255,63,107,191,161,175,96,232,255,191,107,191,232,203,89,63,0,32,108,191,214,212,228,239,255,95,108,191,238,136,226,12,0,128,108,191,238,136,226,12,0,128,108,191,214,212,228,239,255,95,108,191,208,23,92,34,0,0,108,191,137,251,98,203,255,159,107,191,125,129,81,48,0,224,106,191,24,244,209,238,255,255,105,191,220,17,197,25,0,0,105,191,89,19,191,237,255,159,103,191,0,192,43,46,0,32,102,191,119,4,157,52,0,96,100,191,167,44,21,228,255,63,98,191,208,151,4,198,255,191,95,191,119,196,200,98,0,128,90,191,60,98,181,120,255,191,84,191,238,136,226,12,0,128,76,191,77,89,217,128,0,0,61,191,225,11,218,126,14,0,0,63,54,101,169,32,255,255,65,63,184,35,138,51,0,0,82,63,226,14,209,113,0,192,91,63,12,186,148,37,0,32,99,63,149,245,203,194,255,159,104,63,167,172,108,64,0,128,110,63,191,224,18,1,0,96,114,63,77,249,107,13,0,176,117,63,71,188,139,227,255,15,121,63,113,231,166,243,255,175,124,63,89,227,95,16,0,56,128,63,101,253,178,240,255,39,130,63,77,9,225,1,0,40,132,63,113,215,49,255,255,55,134,63,161,127,1,11,0,88,136,63,6,125,180,251,255,127,138,63,119,84,230,250,255,183,140,63,238,152,87,1,0,248,142,63,54,37,132,7,0,160,144,63,12,114,46,253,255,195,145,63,202,202,6,4,0,232,146,63,161,23,177,249,255,11,148,63,95,112,137,0,0,48,149,63,155,18,194,3,0,80,150,63,208,71,187,255,255,103,151,63,131,198,20,248,255,123,152,63,24,228,92,250,255,135,153,63,12,234,243,2,0,136,154,63,119,204,171,0,0,124,155,63,65,151,178,4,0,100,156,63,101,221,200,7,0,56,157,63,125,73,96,252,255,251,157,63,83,134,149,253,255,167,158,63,6,245,121,1,0,68,159,63,137,187,142,249,255,191,159,63,101,169,32,255,255,17,160,63,48,252,97,253,255,53,160,63,214,128,82,254,255,73,160,63,89,55,242,1,0,78,160,63,131,62,218,253,255,63,160,63,250,198,104,1,0,30,160,63,48,64,127,250,255,211,159,63,131,62,218,253,255,63,159,63,6,125,180,251,255,127,158,63,161,7,60,5,0,148,157,63,232,27,163,5,0,120,156,63,220,185,233,252,255,43,155,63,101,237,61,252,255,175,153,63,125,73,96,252,255,251,151,63,42,59,144,4,0,24,150,63,0,0,0,0,0,0,148,63,226,54,158,248,255,171,145,63,179,6,148,242,255,79,142,63,137,155,164,16,0,208,136,63,226,190,216,242,255,231,130,63,83,150,10,242,255,31,121,63,60,162,56,3,0,32,103,63,136,59,149,14,1,128,70,191,24,244,209,238,255,255,113,191,18,103,168,254,255,7,129,191,238,168,204,245,255,111,137,191,185,235,152,255,255,27,145,191,101,237,61,252,255,175,149,191,226,174,99,254,255,111,154,191,173,121,106,2,0,88,159,191,226,38,41,4,0,52,162,191,95,180,166,253,255,205,164,191,244,21,12,253,255,119,167,191,30,149,185,254,255,45,170,191,42,7,232,251,255,241,172,191,60,230,85,0,0,190,175,191,48,22,182,1,0,73,177,191,232,163,221,255,255,179,178,191,226,12,213,255,255,32,180,191,60,136,228,254,255,140,181,191,77,171,111,0,0,247,182,191,220,23,91,254,255,92,184,191,155,248,109,255,255,188,185,191,143,202,92,255,255,22,187,191,48,90,211,254,255,102,188,191,119,42,29,2,0,173,189,191,143,108,235,253,255,229,190,191,226,93,28,255,127,8,192,191,155,167,38,0,128,149,192,191,36,219,122,255,127,25,193,191,6,151,8,0,0,147,193,191,244,34,54,255,127,1,194,191,71,20,103,0,0,100,194,191,65,206,165,255,127,184,194,191,48,9,140,255,127,255,194,191,77,171,111,0,0,55,195,191,125,5,67,255,255,93,195,191,24,173,105,255,127,115,195,191,77,171,111,0,0,119,195,191,0,81,71,255,127,103,195,191,54,254,5,1,128,67,195,191,119,110,58,255,255,10,195,191,119,204,171,0,0,188,194,191,60,149,14,1,128,86,194,191,36,219,122,255,127,217,193,191,137,51,84,255,255,67,193,191,107,158,154,0,0,150,192,191,185,235,152,255,255,155,191,191,179,246,30,254,255,215,189,191,125,5,67,255,255,221,187,191,30,149,185,254,255,173,185,191,238,58,230,255,255,70,183,191,77,9,225,1,0,168,180,191,65,125,94,0,0,209,177,191,6,125,180,251,255,127,173,191,155,86,223,0,0,238,166,191,48,64,127,250,255,211,159,191,202,202,6,4,0,232,144,191,89,83,147,191,255,127,81,191,119,100,91,239,255,47,143,63,173,1,165,252,255,147,160,63,143,40,206,0,0,200,169,63,137,145,197,0,0,181,177,63,179,178,1,1,0,186,182,63,36,138,51,0,0,242,187,63,155,86,223,0,0,174,192,63,167,213,55,0,128,123,195,63,238,233,158,0,128,95,198,63,244,209,238,255,255,89,201,63,149,97,101,255,255,105,204,63,12,127,88,255,127,141,207,63,27,255,130,0,192,97,209,63,60,55,157,255,127,5,211,63,235,151,133,255,63,177,212,63,241,46,142,255,63,100,214,63,107,239,225,255,127,29,216,63,137,226,12,0,128,220,217,63,104,251,57,0,64,160,219,63,208,71,187,255,255,103,221,63,158,155,206,255,191,50,223,63,76,2,227,255,223,127,224,63,238,58,230,255,255,102,225,63,144,115,233,255,31,78,226,63,42,33,60,0,0,53,227,63,214,222,195,255,255,26,228,63,152,4,198,255,191,255,228,63,73,14,59,0,160,226,229,63,186,148,37,0,32,195,230,63,217,129,36,0,192,160,231,63,138,220,224,255,31,123,232,63,7,145,220,255,159,81,233,63,223,24,45,0,192,35,234,63,74,8,15,0,64,241,234,63,27,80,202,255,63,185,235,63,252,98,203,255,159,123,236,63,199,188,10,0,192,55,237,63,174,102,20,0,32,237,237,63,167,213,55,0,128,155,238,63,225,18,1,0,96,66,239,63,74,8,15,0,64,225,239,63,100,94,5,0,224,59,240,63,167,210,33,0,208,130,240,63,51,172,236,255,63,197,240,63,44,24,250,255,239,2,241,63,100,94,5,0,224,59,241,63,199,188,10,0,192,111,241,63,87,51,10,0,144,158,241,63,95,196,230,255,47,200,241,63,175,99,254,255,111,236,241,63,63,218,253,255,63,11,242,63,99,97,27,0,144,36,242,63,237,64,18,0,96,56,242,63,125,180,251,255,127,70,242,63,238,58,230,255,255,78,242,63,112,140,22,0,224,81,242,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].concat([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,16,0,0,0,24,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,144,0,0,0,160,0,0,0,255,255,255,255,0,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,160,0,0,0,192,0,0,0,224,0,0,0,0,1,0,0,64,1,0,0,255,255,255,255,0,0,0,0,8,0,0,0,16,0,0,0,24,0,0,0,32,0,0,0,40,0,0,0,48,0,0,0,56,0,0,0,64,0,0,0,80,0,0,0,96,0,0,0,112,0,0,0,128,0,0,0,144,0,0,0,160,0,0,0,255,255,255,255,0,0,0,0,0,0,240,63,0,0,0,0,0,0,32,64,0,0,0,0,0,0,48,64,0,0,0,0,0,0,56,64,0,0,0,0,0,0,64,64,0,0,0,0,0,0,68,64,0,0,0,0,0,0,72,64,0,0,0,0,0,0,76,64,0,0,0,0,0,0,80,64,0,0,0,0,0,0,84,64,0,0,0,0,0,0,88,64,0,0,0,0,0,0,92,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,98,64,0,0,0,0,0,0,100,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,32,64,0,0,0,0,0,0,48,64,0,0,0,0,0,0,56,64,0,0,0,0,0,0,64,64,0,0,0,0,0,0,68,64,0,0,0,0,0,0,72,64,0,0,0,0,0,0,76,64,0,0,0,0,0,0,80,64,0,0,0,0,0,0,84,64,0,0,0,0,0,0,88,64,0,0,0,0,0,0,92,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,98,64,0,0,0,0,0,0,100,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,64,64,0,0,0,0,0,0,68,64,0,0,0,0,0,0,72,64,0,0,0,0,0,0,76,64,0,0,0,0,0,0,80,64,0,0,0,0,0,0,84,64,0,0,0,0,0,0,88,64,0,0,0,0,0,0,92,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,100,64,0,0,0,0,0,0,104,64,0,0,0,0,0,0,108,64,0,0,0,0,0,0,112,64,0,0,0,0,0,0,116,64,0,0,0,0,0,0,240,63,0,0,4,0,8,0,12,0,16,0,20,0,24,0,30,0,36,0,44,0,52,0,62,0,74,0,90,0,110,0,134,0,162,0,196,0,238,0,32,1,86,1,162,1,64,2,4,0,4,0,4,0,4,0,4,0,4,0,6,0,6,0,8,0,8,0,10,0,12,0,16,0,20,0,24,0,28,0,34,0,42,0,50,0,54,0,76,0,158,0,0,0,12,0,24,0,36,0,48,0,66,0,90,0,120,0,156,0,198,0,252,0,62,1,152,1,64,2,4,0,4,0,4,0,4,0,6,0,8,0,10,0,12,0,14,0,18,0,22,0,30,0,56,0,0,0,4,0,8,0,12,0,16,0,20,0,24,0,30,0,36,0,42,0,50,0,60,0,72,0,88,0,106,0,128,0,156,0,190,0,230,0,20,1,74,1,128,1,64,2,4,0,4,0,4,0,4,0,4,0,4,0,6,0,6,0,6,0,8,0,10,0,12,0,16,0,18,0,22,0,28,0,34,0,40,0,46,0,54,0,54,0,192,0,0,0,12,0,24,0,36,0,48,0,66,0,84,0,114,0,150,0,192,0,240,0,44,1,122,1,64,2,4,0,4,0,4,0,4,0,6,0,6,0,10,0,12,0,14,0,16,0,20,0,26,0,66,0,0,0,4,0,8,0,12,0,16,0,20,0,24,0,30,0,36,0,44,0,54,0,66,0,82,0,102,0,126,0,156,0,194,0,240,0,40,1,108,1,192,1,38,2,64,2,4,0,4,0,4,0,4,0,4,0,4,0,6,0,6,0,8,0,10,0,12,0,16,0,20,0,24,0,30,0,38,0,46,0,56,0,68,0,84,0,102,0,26,0,0,0,12,0,24,0,36,0,48,0,66,0,90,0,126,0,174,0,234,0,56,1,158,1,28,2,64,2,4,0,4,0,4,0,4,0,6,0,8,0,12,0,16,0,20,0,26,0,34,0,42,0,12,0,0,0,6,0,12,0,18,0,24,0,30,0,36,0,44,0,54,0,66,0,80,0,96,0,116,0,140,0,168,0,200,0,238,0,28,1,80,1,140,1,208,1,10,2,64,2,6,0,6,0,6,0,6,0,6,0,6,0,8,0,10,0,12,0,14,0,16,0,20,0,24,0,28,0,32,0,38,0,46,0,52,0,60,0,68,0,58,0,54,0,0,0,12,0,24,0,36,0,54,0,72,0,96,0,126,0,168,0,222,0,44,1,140,1,10,2,64,2,4,0,4,0,4,0,6,0,6,0,8,0,10,0,14,0,18,0,26,0,32,0,42,0,18,0,0,0,6,0,12,0,18,0,24,0,30,0,36,0,44,0,54,0,66,0,80,0,96,0,114,0,136,0,162,0,194,0,232,0,22,1,76,1,138,1,208,1,28,2,64,2,6,0,6,0,6,0,6,0,6,0,6,0,8,0,10,0,12,0,14,0,16,0,18,0,22,0,26,0,32,0,38,0,46,0,54,0,62,0,70,0,76,0,36,0,0,0,12,0,24,0,36,0,54,0,78,0,108,0,144,0,186,0,240,0,56,1,152,1,28,2,64,2,4,0,4,0,4,0,6,0,8,0,10,0,12,0,14,0,18,0,24,0,32,0,44,0,12,0,0,0,6,0,12,0,18,0,24,0,30,0,36,0,44,0,54,0,66,0,80,0,96,0,116,0,140,0,168,0,200,0,238,0,28,1,80,1,140,1,208,1,10,2,64,2,6,0,6,0,6,0,6,0,6,0,6,0,8,0,10,0,12,0,14,0,16,0,20,0,24,0,28,0,32,0,38,0,46,0,52,0,60,0,68,0,58,0,54,0,0,0,12,0,24,0,36,0,54,0,78,0,108,0,144,0,186,0,240,0,56,1,146,1,10,2,64,2,4,0,4,0,4,0,6,0,8,0,10,0,12,0,14,0,18,0,24,0,30,0,40,0,18,0,0,0,6,0,12,0,18,0,24,0,30,0,36,0,44,0,54,0,66,0,80,0,96,0,116,0,140,0,168,0,200,0,238,0,28,1,80,1,140,1,208,1,10,2,64,2,6,0,6,0,6,0,6,0,6,0,6,0,8,0,10,0,12,0,14,0,16,0,20,0,24,0,28,0,32,0,38,0,46,0,52,0,60,0,68,0,58,0,54,0,0,0,12,0,24,0,36,0,54,0,78,0,108,0,144,0,186,0,240,0,56,1,146,1,10,2,64,2,4,0,4,0,4,0,6,0,8,0,10,0,12,0,14,0,18,0,24,0,30,0,40,0,18,0,0,0,6,0,12,0,18,0,24,0,30,0,36,0,44,0,54,0,66,0,80,0,96,0,116,0,140,0,168,0,200,0,238,0,28,1,80,1,140,1,208,1,10,2,64,2,6,0,6,0,6,0,6,0,6,0,6,0,8,0,10,0,12,0,14,0,16,0,20,0,24,0,28,0,32,0,38,0,46,0,52,0,60,0,68,0,58,0,54,0,0,0,12,0,24,0,36,0,54,0,78,0,108,0,144,0,186,0,240,0,56,1,146,1,10,2,64,2,4,0,4,0,4,0,6,0,8,0,10,0,12,0,14,0,18,0,24,0,30,0,40,0,18,0,0,0,12,0,24,0,36,0,48,0,60,0,72,0,88,0,108,0,132,0,160,0,192,0,232,0,24,1,80,1,144,1,220,1,54,2,56,2,58,2,60,2,62,2,64,2,12,0,12,0,12,0,12,0,12,0,12,0,16,0,20,0,24,0,28,0,32,0,40,0,48,0,56,0,64,0,76,0,90,0,2,0,2,0,2,0,2,0,2,0,0,0,24,0,48,0,72,0,108,0,156,0,216,0,32,1,116,1,224,1,230,1,236,1,242,1,64,2,8,0,8,0,8,0,12,0,16,0,20,0,24,0,28,0,36,0,2,0,2,0,2,0,26,0,9,37,99,115,32,100,32,45,32,100,101,108,101,116,101,32,115,116,111,114,101,100,32,116,97,103,32,105,110,102,111,32,40,110,111,32,111,116,104,101,114,32,112,114,111,99,101,115,115,105,110,103,41,10,0,0,9,37,99,115,32,99,32,45,32,111,110,108,121,32,99,104,101,99,107,32,115,116,111,114,101,100,32,116,97,103,32,105,110,102,111,32,40,110,111,32,111,116,104,101,114,32,112,114,111,99,101,115,115,105,110,103,41,10,0,0,0,0,0,0,9,37,99,63,32,111,114,32,37,99,104,32,45,32,115,104,111,119,32,116,104,105,115,32,109,101,115,115,97,103,101,10,0,0,0,0,0,0,0,0,9,32,32,32,32,32,40,105,46,101,46,32,100,111,110,39,116,32,99,104,101,99,107,32,102,111,114,32,109,105,115,45,110,97,109,101,100,32,76,97,121,101,114,32,73,32,111,114,32,76,97,121,101,114,32,73,73,32,102,105,108,101,115,41,10,0,0,0,0,0,0,0,9,37,99,102,32,45,32,65,115,115,117,109,101,32,105,110,112,117,116,32,102,105,108,101,32,105,115,32,97,110,32,77,80,69,71,32,50,32,76,97,121,101,114,32,73,73,73,32,102,105,108,101,10,0,0,0,9,37,99,120,32,45,32,79,110,108,121,32,102,105,110,100,32,109,97,120,46,32,97,109,112,108,105,116,117,100,101,32,111,102,32,102,105,108,101,10,0,0,0,0,0,0,0,0,9,37,99,112,32,45,32,80,114,101,115,101,114,118,101,32,111,114,105,103,105,110,97,108,32,102,105,108,101,32,116,105,109,101,115,116,97,109,112,10,0,0,0,0,0,0,0,0,9,37,99,113,32,45,32,81,117,105,101,116,32,109,111,100,101,58,32,110,111,32,115,116,97,116,117,115,32,109,101,115,115,97,103,101,115,10,0,0,77,80,51,71,65,73,78,95,65,76,66,85,77,95,77,73,78,77,65,88,0,0,0,0,67,111,117,108,100,32,110,111,116,32,116,114,117,110,99,97,116,101,32,0,0,0,0,0,9,32,32,32,32,32,105,110,115,116,101,97,100,32,111,102,32,109,111,100,105,102,121,105,110,103,32,98,121,116,101,115,32,105,110,32,111,114,105,103,105,110,97,108,32,102,105,108,101,10,0,0,0,0,0,0,9,37,99,116,32,45,32,119,114,105,116,101,115,32,109,111,100,105,102,105,101,100,32,100,97,116,97,32,116,111,32,116,101,109,112,32,102,105,108,101,44,32,116,104,101,110,32,100,101,108,101,116,101,115,32,111,114,105,103,105,110,97,108,10,0,0,0,0,0,0,0,0,73,32,100,111,110,39,116,32,114,101,99,111,103,110,105,122,101,32,111,112,116,105,111,110,32,37,115,10,0,0,0,0,9,37,99,111,32,45,32,111,117,116,112,117,116,32,105,115,32,97,32,100,97,116,97,98,97,115,101,45,102,114,105,101,110,100,108,121,32,116,97,98,45,100,101,108,105,109,105,116,101,100,32,108,105,115,116,10,0,0,0,0,0,0,0,0,9,37,99,99,32,45,32,105,103,110,111,114,101,32,99,108,105,112,112,105,110,103,32,119,97,114,110,105,110,103,32,119,104,101,110,32,97,112,112,108,121,105,110,103,32,103,97,105,110,10,0,0,0,0,0,0,9,37,99,100,32,60,110,62,32,45,32,109,111,100,105,102,121,32,115,117,103,103,101,115,116,101,100,32,100,66,32,103,97,105,110,32,98,121,32,102,108,111,97,116,105,110,103,45,112,111,105,110,116,32,110,10,0,0,0,0,0,0,0,0,9,37,99,109,32,60,105,62,32,45,32,109,111,100,105,102,121,32,115,117,103,103,101,115,116,101,100,32,77,80,51,32,103,97,105,110,32,98,121,32,105,110,116,101,103,101,114,32,105,10,0,0,0,0,0,0,9,32,32,32,32,32,32,32,32,32,32,32,32,32,32,98,117,116,32,116,104,101,32,97,118,101,114,97,103,101,32,97,108,98,117,109,32,108,111,117,100,110,101,115,115,32,105,115,32,110,111,114,109,97,108,105,122,101,100,41,10,0,0,0,9,32,32,32,32,32,32,32,32,32,32,32,32,32,32,116,104,101,105,114,32,108,111,117,100,110,101,115,115,32,114,101,108,97,116,105,118,101,32,116,111,32,101,97,99,104,32,111,116,104,101,114,32,114,101,109,97,105,110,115,32,117,110,99,104,97,110,103,101,100,44,10,0,0,0,0,0,0,0,0,9,32,32,32,32,32,32,32,32,32,32,32,32,32,32,97,108,98,117,109,58,32,97,32,115,105,110,103,108,101,32,103,97,105,110,32,99,104,97,110,103,101,32,105,115,32,97,112,112,108,105,101,100,32,116,111,32,97,108,108,32,102,105,108,101,115,44,32,115,111,10,0,9,37,99,97,32,45,32,97,112,112,108,121,32,65,108,98,117,109,32,103,97,105,110,32,97,117,116,111,109,97,116,105,99,97,108,108,121,32,40,102,105,108,101,115,32,97,114,101,32,97,108,108,32,102,114,111,109,32,116,104,101,32,115,97,109,101,10,0,0,0,0,0,77,80,51,71,65,73,78,95,77,73,78,77,65,88,0,0,77,80,51,71,65,73,78,95,65,76,66,85,77,95,77,73,78,77,65,88,0,0,0,0,9,37,99,107,32,45,32,97,117,116,111,109,97,116,105,99,97,108,108,121,32,108,111,119,101,114,32,84,114,97,99,107,47,65,108,98,117,109,32,103,97,105,110,32,116,111,32,110,111,116,32,99,108,105,112,32,97,117,100,105,111,10,0,0,9,37,99,114,32,45,32,97,112,112,108,121,32,84,114,97,99,107,32,103,97,105,110,32,97,117,116,111,109,97,116,105,99,97,108,108,121,32,40,97,108,108,32,102,105,108,101,115,32,115,101,116,32,116,111,32,101,113,117,97,108,32,108,111,117,100,110,101,115,115,41,10,0,0,0,0,0,0,0,0,9,37,99,101,32,45,32,115,107,105,112,32,65,108,98,117,109,32,97,110,97,108,121,115,105,115,44,32,101,118,101,110,32,105,102,32,109,117,108,116,105,112,108,101,32,102,105,108,101,115,32,108,105,115,116,101,100,10,0,0,0,0,0,0,9,37,99,108,32,49,32,60,105,62,32,45,32,97,112,112,108,121,32,103,97,105,110,32,105,32,116,111,32,99,104,97,110,110,101,108,32,49,32,40,114,105,103,104,116,32,99,104,97,110,110,101,108,41,10,0,9,32,32,32,32,32,32,32,32,32,32,110,111,116,32,74,111,105,110,116,32,83,116,101,114,101,111,41,10,0,0,0,9,32,32,32,32,32,32,32,32,32,32,119,105,116,104,111,117,116,32,100,111,105,110,103,32,97,110,121,32,97,110,97,108,121,115,105,115,32,40,79,78,76,89,32,119,111,114,107,115,32,102,111,114,32,83,84,69,82,69,79,32,102,105,108,101,115,44,10,0,0,0,0,9,37,99,108,32,48,32,60,105,62,32,45,32,97,112,112,108,121,32,103,97,105,110,32,105,32,116,111,32,99,104,97,110,110,101,108,32,48,32,40,108,101,102,116,32,99,104,97,110,110,101,108,41,10,0,0,9,37,99,103,32,60,105,62,32,32,45,32,97,112,112,108,121,32,103,97,105,110,32,105,32,119,105,116,104,111,117,116,32,100,111,105,110,103,32,97,110,121,32,97,110,97,108,121,115,105,115,10,0,0,0,0,9,37,99,118,32,45,32,115,104,111,119,32,118,101,114,115,105,111,110,32,110,117,109,98,101,114,10,0,0,0,0,0,111,112,116,105,111,110,115,58,10,0,0,0,0,0,0,0,98,115,98,115,0,0,0,0,77,80,51,71,65,73,78,95,77,73,78,77,65,88,0,0,85,115,97,103,101,58,32,37,115,32,91,111,112,116,105,111,110,115,93,32,60,105,110,102,105,108,101,62,32,91,60,105,110,102,105,108,101,32,50,62,32,46,46,46,93,10,0,0,117,115,101,115,32,109,112,103,108,105,98,44,32,119,104,105,99,104,32,99,97,110,32,98,101,32,102,111,117,110,100,32,97,116,32,104,116,116,112,58,47,47,119,119,119,46,109,112,103,49,50,51,46,100,101,10,0,0,0,0,0,0,0,0,99,111,112,121,114,105,103,104,116,40,99,41,32,50,48,48,49,45,50,48,48,57,32,98,121,32,71,108,101,110,32,83,97,119,121,101,114,10,0,0,49,46,53,46,50,0,0,0,37,115,32,118,101,114,115,105,111,110,32,37,115,10,0,0,32,105,115,32,97,110,32,77,80,69,71,32,76,97,121,101,114,32,73,73,32,102,105,108,101,44,32,110,111,116,32,97,32,108,97,121,101,114,32,73,73,73,32,102,105,108,101,10,0,0,0,0,0,0,0,0,32,105,115,32,97,110,32,77,80,69,71,32,76,97,121,101,114,32,73,32,102,105,108,101,44,32,110,111,116,32,97,32,108,97,121,101,114,32,73,73,73,32,102,105,108,101,10,0,77,97,107,101,32,99,104,97,110,103,101,63,32,91,121,47,110,93,58,0,0,0,0,0,10,87,65,82,78,73,78,71,58,32,37,115,32,109,97,121,32,99,108,105,112,32,119,105,116,104,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,32,37,100,10,0,0,10,78,111,32,99,104,97,110,103,101,115,32,116,111,32,37,115,32,97,114,101,32,110,101,99,101,115,115,97,114,121,10,0,0,0,0,0,0,0,0,84,88,88,88,0,0,0,0,77,80,51,71,65,73,78,95,85,78,68,79,0,0,0,0,65,112,112,108,121,105,110,103,32,97,117,116,111,45,99,108,105,112,112,101,100,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,32,111,102,32,37,100,32,116,111,32,97,108,98,117,109,10,40,79,114,105,103,105,110,97,108,32,115,117,103,103,101,115,116,101,100,32,103,97,105,110,32,119,97,115,32,37,100,41,10,0,0,87,65,82,78,73,78,71,58,32,119,105,116,104,32,116,104,105,115,32,103,108,111,98,97,108,32,103,97,105,110,32,99,104,97,110,103,101,44,32,115,111,109,101,32,99,108,105,112,112,105,110,103,32,109,97,121,32,111,99,99,117,114,32,105,110,32,102,105,108,101,32,37,115,10,0,0,0,0,0,0,82,101,99,111,109,109,101,110,100,101,100,32,34,65,108,98,117,109,34,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,32,102,111,114,32,97,108,108,32,102,105,108,101,115,58,32,37,100,10,0,0,10,82,101,99,111,109,109,101,110,100,101,100,32,34,65,108,98,117,109,34,32,100,66,32,99,104,97,110,103,101,32,102,111,114,32,97,108,108,32,102,105,108,101,115,58,32,37,102,10,0,0,0,0,0,0,0,34,65,108,98,117,109,34,9,37,100,9,37,102,9,37,102,9,37,100,9,37,100,10,0,78,111,116,32,101,110,111,117,103,104,32,115,97,109,112,108,101,115,32,105,110,32,109,112,51,32,102,105,108,101,115,32,116,111,32,100,111,32,97,110,97,108,121,115,105,115,10,0,87,114,105,116,105,110,103,32,116,97,103,32,105,110,102,111,114,109,97,116,105,111,110,32,102,111,114,32,37,115,10,0,65,112,112,108,121,105,110,103,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,32,111,102,32,37,100,32,116,111,32,37,115,46,46,46,10,0,0,0,0,0,0,0,0,105,109,97,103,101,47,106,112,101,103,0,0,0,0,0,0,65,112,112,108,121,105,110,103,32,97,117,116,111,45,99,108,105,112,112,101,100,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,32,111,102,32,37,100,32,116,111,32,37,115,10,40,79,114,105,103,105,110,97,108,32,115,117,103,103,101,115,116,101,100,32,103,97,105,110,32,119,97,115,32,37,100,41,10,0,0,0,0,0,74,80,71,0,0,0,0,0,46,46,46,98,117,116,32,116,97,103,32,110,101,101,100,115,32,117,112,100,97,116,101,58,32,87,114,105,116,105,110,103,32,116,97,103,32,105,110,102,111,114,109,97,116,105,111,110,32,102,111,114,32,37,115,10,0,0,0,0,0,0,0,0,37,48,51,100,44,37,48,51,100,0,0,0,0,0,0,0,82,69,80,76,65,89,71,65,73,78,95,65,76,66,85,77,95,80,69,65,75,0,0,0,105,109,97,103,101,47,112,110,103,0,0,0,0,0,0,0,78,111,32,99,104,97,110,103,101,115,32,116,111,32,37,115,32,97,114,101,32,110,101,99,101,115,115,97,114,121,10,0,80,78,71,0,0,0,0,0,37,115,9,37,100,9,37,102,9,37,102,9,37,100,9,37,100,10,0,0,0,0,0,0,84,89,69,82,0,0,0,0,78,111,116,32,101,110,111,117,103,104,32,115,97,109,112,108,101,115,32,105,110,32,37,115,32,116,111,32,100,111,32,97,110,97,108,121,115,105,115,10,0,0,0,0,0,0,0,0,65,80,73,67,0,0,0,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,13,0,0,0,0,0,0,88,82,86,65,0,0,0,0,69,114,114,111,114,32,97,110,97,108,121,122,105,110,103,32,102,117,114,116,104,101,114,32,115,97,109,112,108,101,115,32,40,109,97,120,32,116,105,109,101,32,114,101,97,99,104,101,100,41,32,32,32,32,32,32,32,32,32,32,10,0,0,0,82,71,65,68,0,0,0,0,37,115,32,105,115,32,102,114,101,101,32,102,111,114,109,97,116,32,40,110,111,116,32,99,117,114,114,101,110,116,108,121,32,115,117,112,112,111,114,116,101,100,41,10,0,0,0,0,82,86,65,68,0,0,0,0,67,97,110,39,116,32,102,105,110,100,32,97,110,121,32,118,97,108,105,100,32,77,80,51,32,102,114,97,109,101,115,32,105,110,32,102,105,108,101,32,37,115,10,0,0,0,0,0,73,68,51,0,0,0,0,0,67,97,110,39,116,32,111,112,101,110,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,10,0,0,0,0,0,0,84,82,67,75,0,0,0,0,114,98,0,0,0,0,0,0,37,117,0,0,0,0,0,0,37,115,9,78,65,9,78,65,9,78,65,9,78,65,9,78,65,10,0,0,0,0,0,0,85,110,115,117,112,112,111,114,116,101,100,32,73,68,51,118,50,32,116,97,103,32,105,110,32,0,0,0,0,0,0,0,82,69,80,76,65,89,71,65,73,78,95,65,76,66,85,77,95,71,65,73,78,0,0,0,68,101,108,101,116,105,110,103,32,116,97,103,32,105,110,102,111,32,111,102,32,37,115,46,46,46,10,0,0,0,0,0,88,88,88,0,0,0,0,0,65,112,112,108,121,105,110,103,32,103,97,105,110,32,99,104,97,110,103,101,32,111,102,32,37,100,32,116,111,32,37,115,46,46,46,10,0,0,0,0,98,115,115,98,115,0,0,0,10,100,111,110,101,10,0,0,67,79,77,77,0,0,0,0,65,112,112,108,121,105,110,103,32,103,97,105,110,32,99,104,97,110,103,101,32,111,102,32,37,100,32,116,111,32,67,72,65,78,78,69,76,32,37,100,32,111,102,32,37,115,46,46,46,10,0,0,0,0,0,0,84,68,82,67,0,0,0,0,78,111,32,117,110,100,111,32,105,110,102,111,114,109,97,116,105,111,110,32,105,110,32,37,115,10,0,0,0,0,0,0,84,65,76,66,0,0,0,0,78,111,32,99,104,97,110,103,101,115,32,116,111,32,117,110,100,111,32,105,110,32,37,115,10,0,0,0,0,0,0,0,84,80,69,49,0,0,0,0,37,115,9,48,9,48,10,0,98,115,0,0,0,0,0,0,37,115,9,37,100,9,37,100,10,0,0,0,0,0,0,0,84,73,84,50,0,0,0,0,85,110,100,111,105,110,103,32,109,112,51,103,97,105,110,32,99,104,97,110,103,101,115,32,40,37,100,44,37,100,41,32,116,111,32,37,115,46,46,46,10,0,0,0,0,0,0,0,79,117,116,32,111,102,32,109,101,109,111,114,121,33,10,0,65,80,69,84,65,71,69,88,0,0,0,0,0,0,0,0,78,65,9,78,65,10,0,0,69,114,114,111,114,32,114,101,97,100,105,110,103,32,0,0,82,69,80,76,65,89,71,65,73,78,95,84,82,65,67,75,95,80,69,65,75,0,0,0,76,89,82,73,67,83,50,48,48,0,0,0,0,0,0,0,37,100,10,0,0,0,0,0,84,65,71,0,0,0,0,0,78,65,9,0,0,0,0,0,51,68,73,0,0,0,0,0,78,65,9,78,65,9,0,0,105,110,118,97,108,105,100,32,108,97,121,101,114,32,37,100,10,0,0,0,0,0,0,0,65,76,66,85,77,0,0,0,37,102,9,0,0,0,0,0,97,108,98,117,109,0,0,0,37,100,9,0,0,0,0,0,84,82,65,67,75,0,0,0,37,115,9,0,0,0,0,0,83,116,114,101,97,109,32,101,114,114,111,114,10,0,0,0,116,114,97,99,107,0,0,0,37,115,0,0,0,0,0,0,10,0,0,0,0,0,0,0,37,100,44,37,100,0,0,0,77,105,110,32,65,108,98,117,109,32,109,112,51,32,103,108,111,98,97,108,32,103,97,105,110,32,102,105,101,108,100,58,32,37,100,10,0,0,0,0,37,100,44,37,100,44,37,99,0,0,0,0,0,0,0,0,77,97,120,32,65,108,98,117,109,32,109,112,51,32,103,108,111,98,97,108,32,103,97,105,110,32,102,105,101,108,100,58,32,37,100,10,0,0,0,0,70,97,116,97,108,32,101,114,114,111,114,33,32,116,114,105,101,100,32,116,111,32,114,101,97,100,32,112,97,115,116,32,109,112,32,98,117,102,102,101,114,10,0,0,0,0,0,0,115,98,98,104,98,0,0,0,77,97,120,32,65,108,98,117,109,32,80,67,77,32,115,97,109,112,108,101,32,97,116,32,99,117,114,114,101,110,116,32,103,97,105,110,58,32,37,102,10,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,82,69,80,76,65,89,71,65,73,78,95,84,82,65,67,75,95,71,65,73,78,0,0,0,115,98,98,104,98,104,0,0,76,89,82,73,67,83,66,69,71,73,78,0,0,0,0,0,82,101,99,111,109,109,101,110,100,101,100,32,34,65,108,98,117,109,34,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,58,32,37,100,10,0,0,0,0,0,0,0,0,82,86,65,50,0,0,0,0,76,89,82,73,67,83,50,48,48,0,0,0,0,0,0,0,82,101,99,111,109,109,101,110,100,101,100,32,34,65,108,98,117,109,34,32,100,66,32,99,104,97,110,103,101,58,32,37,102,10,0,0,0,0,0,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,13,37,115,32,37,50,108,117,37,37,32,111,102,32,37,108,117,32,98,121,116,101,115,32,97,110,97,108,121,122,101,100,13,0,0,0,0,116,114,97,99,107,0,0,0,32,102,111,114,32,109,111,100,105,102,121,105,110,103,10,0,77,105,110,32,109,112,51,32,103,108,111,98,97,108,32,103,97,105,110,32,102,105,101,108,100,58,32,37,100,10,0,0,97,108,98,117,109,0,0,0,10,67,97,110,39,116,32,111,112,101,110,32,0,0,0,0,114,98,0,0,0,0,0,0,77,97,120,32,109,112,51,32,103,108,111,98,97,108,32,103,97,105,110,32,102,105,101,108,100,58,32,37,100,10,0,0,32,116,111,32,0,0,0,0,114,43,98,0,0,0,0,0,77,97,120,32,80,67,77,32,115,97,109,112,108,101,32,97,116,32,99,117,114,114,101,110,116,32,103,97,105,110,58,32,37,102,10,0,0,0,0,0,67,97,110,32,110,111,116,32,114,101,110,97,109,101,32,0,37,45,56,46,54,102,0,0,87,65,82,78,73,78,71,58,32,115,111,109,101,32,99,108,105,112,112,105,110,103,32,109,97,121,32,111,99,99,117,114,32,119,105,116,104,32,116,104,105,115,32,103,97,105,110,32,99,104,97,110,103,101,33,10,0,0,0,0,0,0,0,0,84,65,71,0,0,0,0,0,32,121,111,117,114,115,101,108,102,46,10,0,0,0,0,0,69,114,114,111,114,32,119,114,105,116,105,110,103,32,0,0,32,100,66,0,0,0,0,0,10,84,104,101,32,109,112,51,32,119,97,115,32,99,111,114,114,101,99,116,108,121,32,109,111,100,105,102,105,101,100,44,32,98,117,116,32,121,111,117,32,119,105,108,108,32,110,101,101,100,32,116,111,32,114,101,45,110,97,109,101,32,0,0,32,116,111,32,0,0,0,0,82,101,99,111,109,109,101,110,100,101,100,32,34,84,114,97,99,107,34,32,109,112,51,32,103,97,105,110,32,99,104,97,110,103,101,58,32,37,100,10,0,0,0,0,0,0,0,0,80,114,111,98,108,101,109,32,114,101,45,110,97,109,105,110,103,32,0,0,0,0,0,0,67,97,110,39,116,32,111,112,101,110,32,0,0,0,0,0,10,69,105,116,104,101,114,32,102,114,101,101,32,115,111,109,101,32,115,112,97,99,101,44,32,111,114,32,100,111,32,110,111,116,32,117,115,101,32,34,116,101,109,112,32,102,105,108,101,34,32,111,112,116,105,111,110,10,0,0,0,0,0,0,78,111,116,32,101,110,111,117,103,104,32,116,101,109,112,32,115,112,97,99,101,32,111,110,32,100,105,115,107,32,116,111,32,109,111,100,105,102,121,32,0,0,0,0,0,0,0,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,13,0,0,0,0,58,32,67,97,110,39,116,32,97,100,106,117,115,116,32,115,105,110,103,108,101,32,99,104,97,110,110,101,108,32,102,111,114,32,109,111,110,111,32,111,114,32,106,111,105,110,116,32,115,116,101,114,101,111,10,0,32,105,115,32,102,114,101,101,32,102,111,114,109,97,116,32,40,110,111,116,32,99,117,114,114,101,110,116,108,121,32,115,117,112,112,111,114,116,101,100,41,10,0,0,0,0,0,0,67,97,110,39,116,32,102,105,110,100,32,97,110,121,32,118,97,108,105,100,32,77,80,51,32,102,114,97,109,101,115,32,105,110,32,102,105,108,101,32,0,0,0,0,0,0,0,0,67,97,110,32,110,111,116,32,99,114,101,97,116,101,32,116,101,109,112,111,114,97,114,121,32,102,105,108,101,32,0,0,37,45,43,57,46,54,102,0,32,102,111,114,32,109,111,100,105,102,121,105,110,103,10,0,32,102,111,114,32,116,101,109,112,32,119,114,105,116,105,110,103,10,0,0,0,0,0,0,82,101,99,111,109,109,101,110,100,101,100,32,34,84,114,97,99,107,34,32,100,66,32,99,104,97,110,103,101,58,32,37,102,10,0,0,0,0,0,0,10,67,97,110,39,116,32,111,112,101,110,32,0,0,0,0,119,98,0,0,0,0,0,0,114,43,98,0,0,0,0,0,46,84,77,80,0,0,0,0,32,32,45,45,117,115,101,32,37,99,63,32,111,114,32,37,99,104,32,102,111,114,32,97,32,102,117,108,108,32,108,105,115,116,32,111,102,32,111,112,116,105,111,110,115,10,0,0,84,111,32,117,115,101,32,116,104,101,32,111,114,105,103,105,110,97,108,32,34,119,114,97,112,112,105,110,103,34,32,98,101,104,97,118,105,111,114,44,32,117,115,101,32,116,104,101,32,34,37,99,119,34,32,115,119,105,116,99,104,46,10,0,32,32,32,116,104,101,32,103,97,105,110,32,99,104,97,110,103,101,32,105,115,32,97,32,112,111,115,105,116,105,118,101,32,110,117,109,98,101,114,10,0,0,0,0,0,0,0,0,51,41,32,73,102,32,97,32,102,114,97,109,101,39,115,32,103,108,111,98,97,108,32,103,97,105,110,32,102,105,101,108,100,32,105,115,32,97,108,114,101,97,100,121,32,48,44,32,105,116,32,105,115,32,110,111,116,32,99,104,97,110,103,101,100,44,32,101,118,101,110,32,105,102,10,0,0,0,0,0,119,98,0,0,0,0,0,0,37,43,48,52,100,0,0,0,32,32,32,116,104,101,110,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,105,115,32,115,101,116,32,116,111,32,50,53,53,46,10,0,50,41,32,73,102,32,116,104,101,32,103,97,105,110,32,99,104,97,110,103,101,32,119,111,117,108,100,32,109,97,107,101,32,97,32,102,114,97,109,101,39,115,32,103,108,111,98,97,108,32,103,97,105,110,32,103,114,111,119,32,97,98,111,118,101,32,50,53,53,44,10,0,37,115,10,0,0,0,0,0,32,32,32,116,104,101,110,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,105,115,32,115,101,116,32,116,111,32,48,46,10,0,0,0,102,97,116,97,108,32,101,114,114,111,114,46,32,32,77,65,88,70,82,65,77,69,83,73,90,69,32,110,111,116,32,108,97,114,103,101,32,101,110,111,117,103,104,46,10,0,0,0,49,41,32,73,102,32,116,104,101,32,103,97,105,110,32,99,104,97,110,103,101,32,119,111,117,108,100,32,109,97,107,101,32,97,32,102,114,97,109,101,39,115,32,103,108,111,98,97,108,32,103,97,105,110,32,100,114,111,112,32,98,101,108,111,119,32,48,44,10,0,0,0,73,110,32,111,116,104,101,114,32,119,111,114,100,115,44,10,0,0,0,0,0,0,0,0,83,111,32,110,111,119,32,116,104,101,32,100,101,102,97,117,108,116,32,98,101,104,97,118,105,111,114,32,111,102,32,109,112,51,103,97,105,110,32,105,115,32,116,111,32,95,110,111,116,95,32,119,114,97,112,32,103,97,105,110,32,99,104,97,110,103,101,115,46,10,0,0,83,111,114,114,121,44,32,108,97,121,101,114,32,37,100,32,110,111,116,32,115,117,112,112,111,114,116,101,100,10,0,0,73,102,32,121,111,117,32,112,108,97,121,32,116,104,105,115,32,109,111,100,105,102,105,101,100,32,102,105,108,101,44,32,116,104,101,114,101,32,109,105,103,104,116,32,98,101,32,97,32,98,114,105,101,102,44,32,118,101,114,121,32,108,111,117,100,32,98,108,105,112,46,10,0,0,0,0,0,0,0,0,66,117,116,32,105,102,32,121,111,117,32,108,111,119,101,114,32,116,104,101,32,103,97,105,110,32,111,110,32,115,117,99,104,32,97,32,102,105,108,101,44,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,105,115,32,115,117,100,100,101,110,108,121,32,95,104,117,103,101,95,46,10,0,0,65,115,32,108,111,110,103,32,97,115,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,105,115,32,48,44,32,121,111,117,39,108,108,32,110,101,118,101,114,32,104,101,97,114,32,116,104,101,32,100,97,116,97,46,10,0,0,0,119,105,116,104,32,111,116,104,101,114,32,97,117,100,105,111,32,100,97,116,97,32,105,110,32,116,104,101,32,102,114,97,109,101,46,10,0,0,0,0,46,84,77,80,0,0,0,0,37,48,51,100,0,0,0,0,84,104,101,114,101,32,97,114,101,32,97,32,102,101,119,32,101,110,99,111,100,101,114,115,32,111,117,116,32,116,104,101,114,101,44,32,117,110,102,111,114,116,117,110,97,116,101,108,121,44,32,116,104,97,116,32,99,114,101,97,116,101,32,48,45,103,97,105,110,32,102,114,97,109,101,115,10,0,0,0,115,97,109,101,32,97,109,111,117,110,116,44,32,116,104,101,32,109,112,51,32,119,111,117,108,100,32,97,108,119,97,121,115,32,98,101,32,95,101,120,97,99,116,108,121,95,32,116,104,101,32,115,97,109,101,46,10,0,0,0,0,0,0,0,70,105,108,101,9,77,80,51,32,103,97,105,110,9,100,66,32,103,97,105,110,9,77,97,120,32,65,109,112,108,105,116,117,100,101,9,77,97,120,32,103,108,111,98,97,108,95,103,97,105,110,9,77,105,110,32,103,108,111,98,97,108,95,103,97,105,110,10,0,0,0,0,84,104,97,116,32,119,97,121,44,32,105,102,32,121,111,117,32,108,111,119,101,114,101,100,32,116,104,101,32,103,97,105,110,32,98,121,32,97,110,121,32,97,109,111,117,110,116,32,97,110,100,32,116,104,101,110,32,114,97,105,115,101,100,32,105,116,32,98,121,32,116,104,101,10,0,0,0,0,0,0,67,111,117,108,100,32,110,111,116,32,111,112,101,110,32,0,87,101,108,108,44,32,105,110,32,116,104,101,32,112,97,115,116,44,32,109,112,51,103,97,105,110,32,97,108,119,97,121,115,32,115,105,109,112,108,121,32,119,114,97,112,112,101,100,32,116,104,101,32,114,101,115,117,108,116,32,117,112,32,116,111,32,50,53,53,46,10,0,87,104,97,116,32,104,97,112,112,101,110,115,32,119,104,101,110,32,121,111,117,32,95,108,111,119,101,114,95,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,98,121,32,49,63,10,0,0,0,0,48,32,97,115,32,116,104,101,32,103,108,111,98,97,108,32,103,97,105,110,32,102,111,114,32,115,105,108,101,110,116,32,102,114,97,109,101,115,46,10,0,0,0,0,0,0,0,0,65,80,69,84,65,71,69,88,0,0,0,0,0,0,0,0,84,104,101,32,112,114,111,98,108,101,109,32,105,115,32,97,116,32,116,104,101,32,98,111,116,116,111,109,32,111,102,32,116,104,101,32,114,97,110,103,101,46,32,83,111,109,101,32,101,110,99,111,100,101,114,115,32,99,114,101,97,116,101,32,102,114,97,109,101,115,32,119,105,116,104,10,0,0,0,0,98,121,32,51,55,100,66,32,40,109,117,108,116,105,112,108,121,105,110,103,32,116,104,101,32,97,109,112,108,105,116,117,100,101,32,98,121,32,55,54,41,32,119,105,116,104,111,117,116,32,97,32,112,114,111,98,108,101,109,46,10,0,0,0,111,118,101,114,32,50,51,48,46,32,83,111,32,116,104,101,114,101,39,115,32,112,108,101,110,116,121,32,111,102,32,104,101,97,100,114,111,111,109,32,111,110,32,116,111,112,45,45,32,121,111,117,32,99,97,110,32,105,110,99,114,101,97,115,101,32,116,104,101,32,103,97,105,110,10,0,0,0,0,0,77,79,83,84,32,109,112,51,32,102,105,108,101,115,32,40,105,110,32,102,97,99,116,44,32,65,76,76,32,116,104,101,32,109,112,51,32,102,105,108,101,115,32,73,39,118,101,32,101,120,97,109,105,110,101,100,32,115,111,32,102,97,114,41,32,100,111,110,39,116,32,103,111,10,0,0,0,0,0,0,77,80,51,71,65,73,78,95,85,78,68,79,0,0,0,0,114,98,0,0,0,0,0,0])
.concat([116,104,101,32,112,111,115,115,105,98,108,101,32,118,97,108,117,101,115,32,97,114,101,32,48,32,116,111,32,50,53,53,46,10,0,0,0,0,0,0,84,104,101,32,34,103,108,111,98,97,108,32,103,97,105,110,34,32,102,105,101,108,100,32,116,104,97,116,32,109,112,51,103,97,105,110,32,97,100,106,117,115,116,115,32,105,115,32,97,110,32,56,45,98,105,116,32,117,110,115,105,103,110,101,100,32,105,110,116,101,103,101,114,44,32,115,111,10,0,0,70,105,108,101,9,108,101,102,116,32,103,108,111,98,97,108,95,103,97,105,110,32,99,104,97,110,103,101,9,114,105,103,104,116,32,103,108,111,98,97,108,95,103,97,105,110,32,99,104,97,110,103,101,10,0,0,72,101,114,101,39,115,32,116,104,101,32,112,114,111,98,108,101,109,58,10,0,0,0,0,73,102,32,121,111,117,32,100,111,32,110,111,116,32,115,112,101,99,105,102,121,32,37,99,99,44,32,116,104,101,32,112,114,111,103,114,97,109,32,119,105,108,108,32,115,116,111,112,32,97,110,100,32,97,115,107,32,98,101,102,111,114,101,10,32,32,32,32,32,97,112,112,108,121,105,110,103,32,103,97,105,110,32,99,104,97,110,103,101,32,116,111,32,97,32,102,105,108,101,32,116,104,97,116,32,109,105,103,104,116,32,99,108,105,112,10,0,0,0,0,73,102,32,121,111,117,32,115,112,101,99,105,102,121,32,37,99,114,32,97,110,100,32,37,99,97,44,32,111,110,108,121,32,116,104,101,32,115,101,99,111,110,100,32,111,110,101,32,119,105,108,108,32,119,111,114,107,10,0,0,0,0,0,0,9,32,32,32,32,32,32,40,117,115,101,32,34,37,99,63,32,119,114,97,112,34,32,115,119,105,116,99,104,32,102,111,114,32,97,32,99,111,109,112,108,101,116,101,32,101,120,112,108,97,110,97,116,105,111,110,41,10,0,0,0,0,0,0,9,37,99,119,32,45,32,34,119,114,97,112,34,32,103,97,105,110,32,99,104,97,110,103,101,32,105,102,32,103,97,105,110,43,99,104,97,110,103,101,32,62,32,50,53,53,32,111,114,32,103,97,105,110,43,99,104,97,110,103,101,32,60,32,48,10,0,0,0,0,0,0,9,37,99,117,32,45,32,117,110,100,111,32,99,104,97,110,103,101,115,32,109,97,100,101,32,40,98,97,115,101,100,32,111,110,32,115,116,111,114,101,100,32,116,97,103,32,105,110,102,111,41,10,0,0,0,0,9,37,99,115,32,97,32,45,32,117,115,101,32,65,80,69,32,116,97,103,32,102,111,114,32,77,80,51,32,103,97,105,110,32,105,110,102,111,32,40,100,101,102,97,117,108,116,41,10,0,0,0,0,0,0,0,9,37,99,115,32,105,32,45,32,117,115,101,32,73,68,51,118,50,32,116,97,103,32,102,111,114,32,77,80,51,32,103,97,105,110,32,105,110,102,111,10,0,0,0,0,0,0,0,37,43,48,52,100,44,37,43,48,52,100,44,37,99,0,0,10,0,0,0,0,0,0,0,9,37,99,115,32,114,32,45,32,102,111,114,99,101,32,114,101,45,99,97,108,99,117,108,97,116,105,111,110,32,40,100,111,32,110,111,116,32,114,101,97,100,32,116,97,103,32,105,110,102,111,41,10,0,0,0,9,37,99,115,32,115,32,45,32,115,107,105,112,32,40,105,103,110,111,114,101,41,32,115,116,111,114,101,100,32,116,97,103,32,105,110,102,111,32,40,100,111,32,110,111,116,32,114,101,97,100,32,111,114,32,119,114,105,116,101,32,116,97,103,115,41,10,0,0,0,0,0,70,105,108,101,9,77,80,51,32,103,97,105,110,9,100,66,32,103,97,105,110,9,77,97,120,32,65,109,112,108,105,116,117,100,101,9,77,97,120,32,103,108,111,98,97,108,95,103,97,105,110,9,77,105,110,32,103,108,111,98,97,108,95,103,97,105,110,9,65,108,98,117,109,32,103,97,105,110,9,65,108,98,117,109,32,100,66,32,103,97,105,110,9,65,108,98,117,109,32,77,97,120,32,65,109,112,108,105,116,117,100,101,9,65,108,98,117,109,32,77,97,120,32,103,108,111,98,97,108,95,103,97,105,110,9,65,108,98,117,109,32,77,105,110,32,103,108,111,98,97,108,95,103,97,105,110,10,0,0,0,91,37,100,47,37,100,93,0,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,13,32,37,50,108,117,37,37,32,111,102,32,37,108,117,32,98,121,116,101,115,32,119,114,105,116,116,101,110,13,0,0,88,105,110,103,0,0,0,0,6,5,5,5,6,5,7,3,11,10,0,0,7,7,7,0,6,6,6,3,8,8,5,0,9,9,9,9,9,9,12,6,18,18,0,0,12,12,12,0,12,9,9,6,15,12,9,0,6,9,9,9,6,9,12,6,15,18,0,0,6,15,12,0,6,12,9,6,6,18,9,0,0,0,0,0,3,1,1,1,2,2,2,3,3,3,4,4,0,1,2,3,0,1,2,3,1,2,3,1,2,3,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,125,172,75,178,178,129,122,63,89,206,50,4,86,226,28,192,6,189,17,179,3,75,154,191,219,10,27,65,19,180,56,64,194,175,191,93,39,128,169,63,231,32,65,228,94,87,74,192,16,97,15,41,83,208,173,191,123,58,170,124,226,94,83,64,234,178,47,121,19,203,164,63,254,243,221,121,122,128,84,192,78,57,132,204,12,89,134,191,164,193,119,201,11,148,79,64,224,138,129,45,43,119,130,191,114,53,21,108,221,113,65,192,56,106,29,58,205,126,137,63,9,177,161,21,229,108,42,64,241,43,67,112,193,132,125,191,41,174,253,68,114,193,8,192,152,214,74,64,219,192,97,63,177,150,105,79,53,200,213,63,222,158,97,59,153,40,49,191,88,184,43,232,29,146,143,63,8,219,211,121,147,194,28,192,180,133,210,250,155,176,179,191,117,3,108,113,51,105,56,64,108,240,49,196,185,44,201,63,129,75,150,185,184,208,73,192,170,202,80,92,205,175,213,191,35,97,36,86,118,217,82,64,156,233,98,106,171,134,219,63,221,138,236,51,167,218,83,192,239,132,88,207,156,143,218,191,126,88,92,106,200,132,78,64,12,212,234,148,45,132,211,63,5,132,135,145,80,223,64,192,200,43,47,212,197,69,197,191,97,56,180,250,61,162,41,64,45,10,244,174,193,45,176,63,76,97,157,142,72,27,8,192,211,68,108,238,103,186,142,191,233,221,94,161,147,159,204,63,231,150,175,44,0,164,92,63,128,152,49,237,145,76,150,63,252,23,106,180,39,254,22,192,197,4,18,127,223,239,175,191,209,137,82,37,27,63,48,64,79,143,216,7,69,148,187,63,196,213,48,84,28,248,61,192,24,176,52,204,201,83,195,191,75,112,70,81,136,3,68,64,82,41,100,237,135,205,197,63,90,161,196,228,19,41,68,192,68,213,124,193,217,56,196,191,244,246,232,91,173,218,62,64,83,177,199,193,201,35,191,63,192,69,27,34,181,152,49,192,30,141,34,186,211,247,178,191,239,136,62,193,119,109,28,64,22,73,226,84,78,4,160,63,127,177,83,63,233,37,253,191,121,196,125,112,42,241,126,191,233,221,94,161,147,159,204,63,136,126,75,236,38,82,83,63,50,23,78,148,59,192,163,63,105,9,132,109,238,197,14,192,137,21,35,224,69,31,150,191,39,38,121,177,147,66,31,64,30,25,58,32,147,55,84,191,79,178,147,196,243,174,38,192,100,127,76,30,138,91,24,191,77,9,136,125,46,28,42,64,57,67,88,105,42,243,144,191,99,181,117,43,64,147,40,192,71,48,13,28,80,34,150,63,108,219,102,168,67,247,34,64,183,143,205,46,252,60,149,191,70,223,201,63,133,125,23,192,145,39,155,184,170,87,120,63,246,69,57,117,138,9,6,64,78,249,55,236,66,26,105,63,224,81,234,151,194,213,235,191,191,132,219,151,14,134,31,63,22,209,63,188,20,209,193,63,93,40,82,156,133,161,103,63,160,218,19,97,87,190,171,63,6,126,21,145,226,211,11,192,11,103,131,69,8,207,157,191,124,102,244,223,228,115,25,64,11,230,107,114,174,97,129,191,116,244,13,236,83,24,33,192,200,135,220,48,143,110,129,191,233,177,50,247,48,244,34,64,157,37,85,210,193,25,129,191,239,9,159,243,69,161,33,192,134,135,184,203,230,253,150,63,178,24,246,3,131,106,27,64,39,181,23,72,37,150,154,191,11,23,20,217,46,148,17,192,246,69,14,107,124,163,144,63,203,6,226,181,165,145,1,64,56,93,161,143,153,187,99,191,156,177,133,97,139,8,232,191,70,250,109,80,214,161,123,63,118,42,253,188,196,212,192,63,51,47,54,53,98,195,94,191,241,119,23,71,12,201,195,63,145,69,61,11,43,8,3,192,136,170,87,65,50,227,183,191,158,18,71,136,25,202,6,64,246,216,149,178,56,253,175,191,5,109,176,90,138,42,5,192,212,141,60,98,152,39,150,63,226,192,107,249,83,229,1,64,15,64,199,163,209,156,172,191,85,26,176,107,99,190,250,191,171,78,232,86,45,123,168,63,59,4,2,10,105,24,240,63,214,62,198,171,59,54,98,63,30,237,181,186,3,105,221,191,47,107,20,185,88,64,160,63,248,74,46,12,204,246,196,63,238,33,35,135,177,122,140,191,47,41,133,24,165,195,169,191,80,155,72,10,164,174,122,63,144,190,25,71,223,10,152,63,207,141,107,9,225,12,130,191,45,33,68,101,216,99,211,63,189,230,61,180,191,205,249,191,13,242,27,221,38,242,204,191,207,180,185,17,194,70,241,63,31,155,214,217,201,251,181,191,154,139,250,113,133,107,208,191,48,106,136,146,0,207,160,63,177,214,138,41,142,213,196,191,42,241,39,172,235,192,130,191,8,250,225,13,80,250,204,191,74,23,235,77,116,53,152,191,33,145,242,79,141,9,217,63,58,82,97,60,119,240,119,191,231,77,7,178,57,86,204,191,44,162,59,19,27,17,176,63,124,115,66,108,140,10,167,63,5,119,162,194,193,93,225,190,218,187,97,92,56,138,148,63,93,236,29,149,60,221,96,63,191,156,19,136,155,198,104,63,254,79,225,18,154,53,158,191,92,65,204,137,244,135,213,63,48,118,159,74,57,250,247,191,249,69,133,139,193,93,208,191,239,27,204,246,187,243,235,63,138,220,181,196,248,71,190,191,207,9,154,244,174,62,191,63,82,82,232,220,164,132,190,63,236,2,32,94,21,217,233,191,200,31,137,62,105,14,180,191,216,69,1,144,135,160,222,63,79,101,137,91,19,64,115,191,198,185,85,146,127,225,191,191,20,188,151,157,91,37,120,191,110,73,114,241,93,211,164,191,151,43,39,61,220,78,173,63,62,39,251,31,156,85,181,63,188,121,230,134,78,10,129,63,254,211,216,15,250,177,165,191,121,1,134,222,13,191,144,191,92,75,230,2,146,124,158,63,140,202,208,127,50,6,146,191,129,213,143,103,234,190,220,63,43,99,103,223,67,26,228,191,192,115,192,172,200,94,194,191,183,80,102,97,201,251,210,63,0,184,172,136,253,41,205,191,227,81,99,138,21,216,215,191,15,236,159,153,97,16,141,191,183,212,176,113,9,131,97,63,178,156,195,234,117,225,164,63,130,37,186,109,42,230,218,191,67,252,140,166,66,189,191,191,175,240,202,169,97,106,204,63,86,74,4,181,194,250,164,63,112,186,245,115,56,32,121,63,193,175,189,46,49,211,186,63,222,3,62,232,30,70,177,63,30,94,167,239,17,22,147,191,76,198,139,158,71,158,173,63,236,38,37,198,176,89,160,191,87,85,220,210,32,128,160,63,76,164,77,137,80,50,118,63,214,175,6,93,68,30,226,63,197,102,124,41,159,196,240,191,107,180,52,94,12,38,232,191,213,161,248,91,248,168,210,63,72,155,25,68,57,202,196,63,81,61,138,44,229,39,209,191,102,6,2,243,192,110,197,63,35,114,239,228,40,203,128,63,232,114,101,123,173,49,200,191,202,138,18,136,196,213,220,63,236,21,72,1,221,203,211,63,22,215,218,105,7,36,213,191,190,128,199,106,234,163,209,191,179,50,221,97,182,64,177,63,74,124,66,94,139,131,122,63,108,42,253,84,209,126,168,191,19,84,73,99,58,35,182,63,216,212,254,132,235,202,144,63,124,52,246,62,76,102,163,191,58,215,119,170,229,129,146,63,222,155,204,206,226,23,120,191,13,214,43,177,151,151,226,63,9,162,4,98,208,84,224,191,30,204,55,171,22,4,225,191,159,53,10,182,134,100,212,191,151,183,151,57,123,74,194,191,233,26,64,31,159,237,201,191,42,112,91,63,47,109,198,63,113,221,175,29,31,218,194,63,235,71,167,5,164,89,152,63,71,180,1,35,0,238,216,63,174,158,17,79,49,234,195,63,143,150,116,253,74,215,205,191,33,128,18,139,125,56,208,191,160,159,226,226,15,220,170,191,102,94,30,159,234,172,144,63,139,80,254,113,58,169,153,191,13,56,49,211,101,183,177,63,167,98,233,63,126,2,153,63,248,239,170,144,253,13,163,191,227,96,172,195,224,159,146,63,99,105,238,162,82,180,126,191,119,157,38,168,232,42,225,63,28,220,12,200,43,8,208,191,221,69,23,214,253,251,218,191,148,99,7,64,229,164,219,191,189,171,77,172,42,155,102,191,237,37,103,67,204,136,161,191,213,51,35,55,242,217,165,63,44,170,144,166,250,243,167,191,42,16,217,211,105,38,186,191,141,223,67,100,188,230,208,63,220,17,8,177,26,173,194,63,99,214,230,70,69,88,195,63,205,75,240,92,99,48,153,191,24,234,52,104,233,120,198,191,167,104,9,158,140,173,188,191,105,39,247,117,236,23,200,191,223,19,236,99,145,201,164,191,250,169,244,249,193,11,172,63,186,21,107,134,153,132,168,63,59,51,38,243,41,22,168,63,251,195,4,49,48,182,150,191,45,90,234,249,83,199,239,63,5,250,233,202,33,199,255,191,45,90,234,249,83,199,255,191,176,116,213,81,12,143,239,63,45,90,234,249,83,199,239,63,58,22,77,203,85,194,239,63,0,208,220,96,26,194,255,191,31,22,77,203,85,194,255,191,142,148,141,85,40,87,239,63,58,22,77,203,85,194,239,63,207,83,154,164,35,171,239,63,59,221,109,30,179,170,255,191,198,83,154,164,35,171,255,191,142,148,141,85,40,87,239,63,207,83,154,164,35,171,239,63,82,90,102,79,12,143,239,63,142,99,111,244,68,142,255,191,82,90,102,79,12,143,255,191,136,162,186,84,167,31,239,63,82,90,102,79,12,143,239,63,212,16,18,104,34,133,239,63,58,43,218,132,54,132,255,191,212,16,18,104,34,133,255,191,222,236,147,150,28,12,239,63,212,16,18,104,34,133,239,63,149,236,96,73,40,87,239,63,224,62,238,205,106,85,255,191,149,236,96,73,40,87,255,191,238,52,167,137,203,177,238,63,149,236,96,73,40,87,239,63,20,206,26,0,207,53,239,63,251,142,188,33,80,51,255,191,65,206,26,0,207,53,255,191,178,26,242,188,155,112,238,63,20,206,26,0,207,53,239,63,152,52,59,107,43,36,239,63,125,31,207,50,56,33,255,191,197,52,59,107,43,36,255,191,192,147,78,71,61,78,238,63,152,52,59,107,43,36,239,63,162,74,80,205,141,221,238,63,147,20,125,71,103,216,254,191,162,74,80,205,141,221,254,191,96,1,71,166,104,197,237,63,162,74,80,205,141,221,238,63,247,168,92,169,17,185,238,63,255,251,115,239,138,178,254,191,247,168,92,169,17,185,254,191,54,172,138,198,48,127,237,63,247,168,92,169,17,185,238,63,252,4,93,62,153,172,238,63,169,23,62,147,144,165,254,191,41,5,93,62,153,172,254,191,247,228,247,210,67,103,237,63,252,4,93,62,153,172,238,63,157,193,105,65,113,69,238,63,117,252,16,192,122,57,254,191,157,193,105,65,113,69,254,191,137,13,133,133,207,162,236,63,157,193,105,65,113,69,238,63])
, "i8", ALLOC_NONE, Runtime.GLOBAL_BASE)
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
  var _llvm_va_start=undefined;
  Module["_strlen"] = _strlen;
  function _llvm_va_end() {}
  Module["_strcat"] = _strcat;
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:35,EIDRM:36,ECHRNG:37,EL2NSYNC:38,EL3HLT:39,EL3RST:40,ELNRNG:41,EUNATCH:42,ENOCSI:43,EL2HLT:44,EDEADLK:45,ENOLCK:46,EBADE:50,EBADR:51,EXFULL:52,ENOANO:53,EBADRQC:54,EBADSLT:55,EDEADLOCK:56,EBFONT:57,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:74,ELBIN:75,EDOTDOT:76,EBADMSG:77,EFTYPE:79,ENOTUNIQ:80,EBADFD:81,EREMCHG:82,ELIBACC:83,ELIBBAD:84,ELIBSCN:85,ELIBMAX:86,ELIBEXEC:87,ENOSYS:88,ENMFILE:89,ENOTEMPTY:90,ENAMETOOLONG:91,ELOOP:92,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:106,EPROTOTYPE:107,ENOTSOCK:108,ENOPROTOOPT:109,ESHUTDOWN:110,ECONNREFUSED:111,EADDRINUSE:112,ECONNABORTED:113,ENETUNREACH:114,ENETDOWN:115,ETIMEDOUT:116,EHOSTDOWN:117,EHOSTUNREACH:118,EINPROGRESS:119,EALREADY:120,EDESTADDRREQ:121,EMSGSIZE:122,EPROTONOSUPPORT:123,ESOCKTNOSUPPORT:124,EADDRNOTAVAIL:125,ENETRESET:126,EISCONN:127,ENOTCONN:128,ETOOMANYREFS:129,EPROCLIM:130,EUSERS:131,EDQUOT:132,ESTALE:133,ENOTSUP:134,ENOMEDIUM:135,ENOSHARE:136,ECASECLASH:137,EILSEQ:138,EOVERFLOW:139,ECANCELED:140,ENOTRECOVERABLE:141,EOWNERDEAD:142,ESTRPIPE:143};
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value
      return value;
    }
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  var __impure_ptr=allocate(1, "i32*", ALLOC_STATIC);var FS={currentPath:"/",nextInode:2,streams:[null],ignorePermissions:true,createFileHandle:function (stream, fd) {
        if (typeof stream === 'undefined') {
          stream = null;
        }
        if (!fd) {
          if (stream && stream.socket) {
            for (var i = 1; i < 64; i++) {
              if (!FS.streams[i]) {
                fd = i;
                break;
              }
            }
            assert(fd, 'ran out of low fds for sockets');
          } else {
            fd = Math.max(FS.streams.length, 64);
            for (var i = FS.streams.length; i < fd; i++) {
              FS.streams[i] = null; // Keep dense
            }
          }
        }
        // Close WebSocket first if we are about to replace the fd (i.e. dup2)
        if (FS.streams[fd] && FS.streams[fd].socket && FS.streams[fd].socket.close) {
          FS.streams[fd].socket.close();
        }
        FS.streams[fd] = stream;
        return fd;
      },removeFileHandle:function (fd) {
        FS.streams[fd] = null;
      },joinPath:function (parts, forceRelative) {
        var ret = parts[0];
        for (var i = 1; i < parts.length; i++) {
          if (ret[ret.length-1] != '/') ret += '/';
          ret += parts[i];
        }
        if (forceRelative && ret[0] == '/') ret = ret.substr(1);
        return ret;
      },absolutePath:function (relative, base) {
        if (typeof relative !== 'string') return null;
        if (base === undefined) base = FS.currentPath;
        if (relative && relative[0] == '/') base = '';
        var full = base + '/' + relative;
        var parts = full.split('/').reverse();
        var absolute = [''];
        while (parts.length) {
          var part = parts.pop();
          if (part == '' || part == '.') {
            // Nothing.
          } else if (part == '..') {
            if (absolute.length > 1) absolute.pop();
          } else {
            absolute.push(part);
          }
        }
        return absolute.length == 1 ? '/' : absolute.join('/');
      },analyzePath:function (path, dontResolveLastLink, linksVisited) {
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
        path = FS.absolutePath(path);
        if (path == '/') {
          ret.isRoot = true;
          ret.exists = ret.parentExists = true;
          ret.name = '/';
          ret.path = ret.parentPath = '/';
          ret.object = ret.parentObject = FS.root;
        } else if (path !== null) {
          linksVisited = linksVisited || 0;
          path = path.slice(1).split('/');
          var current = FS.root;
          var traversed = [''];
          while (path.length) {
            if (path.length == 1 && current.isFolder) {
              ret.parentExists = true;
              ret.parentPath = traversed.length == 1 ? '/' : traversed.join('/');
              ret.parentObject = current;
              ret.name = path[0];
            }
            var target = path.shift();
            if (!current.isFolder) {
              ret.error = ERRNO_CODES.ENOTDIR;
              break;
            } else if (!current.read) {
              ret.error = ERRNO_CODES.EACCES;
              break;
            } else if (!current.contents.hasOwnProperty(target)) {
              ret.error = ERRNO_CODES.ENOENT;
              break;
            }
            current = current.contents[target];
            if (current.link && !(dontResolveLastLink && path.length == 0)) {
              if (linksVisited > 40) { // Usual Linux SYMLOOP_MAX.
                ret.error = ERRNO_CODES.ELOOP;
                break;
              }
              var link = FS.absolutePath(current.link, traversed.join('/'));
              ret = FS.analyzePath([link].concat(path).join('/'),
                                   dontResolveLastLink, linksVisited + 1);
              return ret;
            }
            traversed.push(target);
            if (path.length == 0) {
              ret.exists = true;
              ret.path = traversed.join('/');
              ret.object = current;
            }
          }
        }
        return ret;
      },findObject:function (path, dontResolveLastLink) {
        FS.ensureRoot();
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },createObject:function (parent, name, properties, canRead, canWrite) {
        if (!parent) parent = '/';
        if (typeof parent === 'string') parent = FS.findObject(parent);
        if (!parent) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent path must exist.');
        }
        if (!parent.isFolder) {
          ___setErrNo(ERRNO_CODES.ENOTDIR);
          throw new Error('Parent must be a folder.');
        }
        if (!parent.write && !FS.ignorePermissions) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent folder must be writeable.');
        }
        if (!name || name == '.' || name == '..') {
          ___setErrNo(ERRNO_CODES.ENOENT);
          throw new Error('Name must not be empty.');
        }
        if (parent.contents.hasOwnProperty(name)) {
          ___setErrNo(ERRNO_CODES.EEXIST);
          throw new Error("Can't overwrite object.");
        }
        parent.contents[name] = {
          read: canRead === undefined ? true : canRead,
          write: canWrite === undefined ? false : canWrite,
          timestamp: Date.now(),
          inodeNumber: FS.nextInode++
        };
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            parent.contents[name][key] = properties[key];
          }
        }
        return parent.contents[name];
      },createFolder:function (parent, name, canRead, canWrite) {
        var properties = {isFolder: true, isDevice: false, contents: {}};
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createPath:function (parent, path, canRead, canWrite) {
        var current = FS.findObject(parent);
        if (current === null) throw new Error('Invalid parent.');
        path = path.split('/').reverse();
        while (path.length) {
          var part = path.pop();
          if (!part) continue;
          if (!current.contents.hasOwnProperty(part)) {
            FS.createFolder(current, part, canRead, canWrite);
          }
          current = current.contents[part];
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        properties.isFolder = false;
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createDataFile:function (parent, name, data, canRead, canWrite) {
        if (typeof data === 'string') {
          var dataArray = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i) dataArray[i] = data.charCodeAt(i);
          data = dataArray;
        }
        var properties = {
          isDevice: false,
          contents: data.subarray ? data.subarray(0) : data // as an optimization, create a new array wrapper (not buffer) here, to help JS engines understand this object
        };
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          var LazyUint8Array = function() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
              if (!hasByteServing) chunkSize = datalength;
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile) {
        Browser.init();
        var fullname = FS.joinPath([parent, name], true);
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },createLink:function (parent, name, target, canRead, canWrite) {
        var properties = {isDevice: false, link: target};
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createDevice:function (parent, name, input, output) {
        if (!(input || output)) {
          throw new Error('A device must have at least one callback defined.');
        }
        var ops = {isDevice: true, input: input, output: output};
        return FS.createFile(parent, name, ops, Boolean(input), Boolean(output));
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },ensureRoot:function () {
        if (FS.root) return;
        // The main file system tree. All the contents are inside this.
        FS.root = {
          read: true,
          write: true,
          isFolder: true,
          isDevice: false,
          timestamp: Date.now(),
          inodeNumber: 1,
          contents: {}
        };
      },init:function (input, output, error) {
        // Make sure we initialize only once.
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureRoot();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input = input || Module['stdin'];
        output = output || Module['stdout'];
        error = error || Module['stderr'];
        // Default handlers.
        var stdinOverridden = true, stdoutOverridden = true, stderrOverridden = true;
        if (!input) {
          stdinOverridden = false;
          input = function() {
            if (!input.cache || !input.cache.length) {
              var result;
              if (typeof window != 'undefined' &&
                  typeof window.prompt == 'function') {
                // Browser.
                result = window.prompt('Input: ');
                if (result === null) result = String.fromCharCode(0); // cancel ==> EOF
              } else if (typeof readline == 'function') {
                // Command line.
                result = readline();
              }
              if (!result) result = '';
              input.cache = intArrayFromString(result + '\n', true);
            }
            return input.cache.shift();
          };
        }
        var utf8 = new Runtime.UTF8Processor();
        function simpleOutput(val) {
          if (val === null || val === 10) {
            output.printer(output.buffer.join(''));
            output.buffer = [];
          } else {
            output.buffer.push(utf8.processCChar(val));
          }
        }
        if (!output) {
          stdoutOverridden = false;
          output = simpleOutput;
        }
        if (!output.printer) output.printer = Module['print'];
        if (!output.buffer) output.buffer = [];
        if (!error) {
          stderrOverridden = false;
          error = simpleOutput;
        }
        if (!error.printer) error.printer = Module['print'];
        if (!error.buffer) error.buffer = [];
        // Create the temporary folder, if not already created
        try {
          FS.createFolder('/', 'tmp', true, true);
        } catch(e) {}
        // Create the I/O devices.
        var devFolder = FS.createFolder('/', 'dev', true, true);
        var stdin = FS.createDevice(devFolder, 'stdin', input);
        stdin.isTerminal = !stdinOverridden;
        var stdout = FS.createDevice(devFolder, 'stdout', null, output);
        stdout.isTerminal = !stdoutOverridden;
        var stderr = FS.createDevice(devFolder, 'stderr', null, error);
        stderr.isTerminal = !stderrOverridden;
        FS.createDevice(devFolder, 'tty', input, output);
        FS.createDevice(devFolder, 'null', function(){}, function(){});
        // Create default streams.
        FS.streams[1] = {
          path: '/dev/stdin',
          object: stdin,
          position: 0,
          isRead: true,
          isWrite: false,
          isAppend: false,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[2] = {
          path: '/dev/stdout',
          object: stdout,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[3] = {
          path: '/dev/stderr',
          object: stderr,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          error: false,
          eof: false,
          ungotten: []
        };
        // TODO: put these low in memory like we used to assert on: assert(Math.max(_stdin, _stdout, _stderr) < 15000); // make sure these are low, we flatten arrays with these
        HEAP32[((_stdin)>>2)]=1;
        HEAP32[((_stdout)>>2)]=2;
        HEAP32[((_stderr)>>2)]=3;
        // Other system paths
        FS.createPath('/', 'dev/shm/tmp', true, true); // temp files
        // Newlib initialization
        for (var i = FS.streams.length; i < Math.max(_stdin, _stdout, _stderr) + 4; i++) {
          FS.streams[i] = null; // Make sure to keep FS.streams dense
        }
        FS.streams[_stdin] = FS.streams[1];
        FS.streams[_stdout] = FS.streams[2];
        FS.streams[_stderr] = FS.streams[3];
        allocate([ allocate(
          [0, 0, 0, 0, _stdin, 0, 0, 0, _stdout, 0, 0, 0, _stderr, 0, 0, 0],
          'void*', ALLOC_NORMAL) ], 'void*', ALLOC_NONE, __impure_ptr);
      },quit:function () {
        if (!FS.init.initialized) return;
        // Flush any partially-printed lines in stdout and stderr. Careful, they may have been closed
        if (FS.streams[2] && FS.streams[2].object.output.buffer.length > 0) FS.streams[2].object.output(10);
        if (FS.streams[3] && FS.streams[3].object.output.buffer.length > 0) FS.streams[3].object.output(10);
      },standardizePath:function (path) {
        if (path.substr(0, 2) == './') path = path.substr(2);
        return path;
      },deleteFile:function (path) {
        path = FS.analyzePath(path);
        if (!path.parentExists || !path.exists) {
          throw 'Invalid path ' + path;
        }
        delete path.parentObject.contents[path.name];
      }};function _unlink(path) {
      // int unlink(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/unlink.html
      path = FS.analyzePath(Pointer_stringify(path));
      if (!path.parentExists || !path.exists) {
        ___setErrNo(path.error);
        return -1;
      } else if (path.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (!path.object.write) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else {
        delete path.parentObject.contents[path.name];
        return 0;
      }
    }
  function _rmdir(path) {
      // int rmdir(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/rmdir.html
      path = FS.analyzePath(Pointer_stringify(path));
      if (!path.parentExists || !path.exists) {
        ___setErrNo(path.error);
        return -1;
      } else if (!path.object.write || path.isRoot) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (!path.object.isFolder) {
        ___setErrNo(ERRNO_CODES.ENOTDIR);
        return -1;
      } else {
        for (var i in path.object.contents) {
          ___setErrNo(ERRNO_CODES.ENOTEMPTY);
          return -1;
        }
        if (path.path == FS.currentPath) {
          ___setErrNo(ERRNO_CODES.EBUSY);
          return -1;
        } else {
          delete path.parentObject.contents[path.name];
          return 0;
        }
      }
    }function _remove(path) {
      // int remove(const char *path);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/remove.html
      var ret = _unlink(path);
      if (ret == -1) ret = _rmdir(path);
      return ret;
    }
  function _rename(old, new_) {
      // int rename(const char *old, const char *new);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/rename.html
      var oldObj = FS.analyzePath(Pointer_stringify(old));
      var newObj = FS.analyzePath(Pointer_stringify(new_));
      if (newObj.path == oldObj.path) {
        return 0;
      } else if (!oldObj.exists) {
        ___setErrNo(oldObj.error);
        return -1;
      } else if (oldObj.isRoot || oldObj.path == FS.currentPath) {
        ___setErrNo(ERRNO_CODES.EBUSY);
        return -1;
      } else if (newObj.parentPath &&
                 newObj.parentPath.indexOf(oldObj.path) == 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else if (newObj.exists && newObj.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else {
        delete oldObj.parentObject.contents[oldObj.name];
        newObj.parentObject.contents[newObj.name] = oldObj.object;
        return 0;
      }
    }
  var ___stat_struct_layout={__size__:68,st_dev:0,st_ino:4,st_mode:8,st_nlink:12,st_uid:16,st_gid:20,st_rdev:24,st_size:28,st_atime:32,st_spare1:36,st_mtime:40,st_spare2:44,st_ctime:48,st_spare3:52,st_blksize:56,st_blocks:60,st_spare4:64};function _stat(path, buf, dontResolveLastLink) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/stat.html
      // int stat(const char *path, struct stat *buf);
      // NOTE: dontResolveLastLink is a shortcut for lstat(). It should never be
      //       used in client code.
      var obj = FS.findObject(Pointer_stringify(path), dontResolveLastLink);
      if (obj === null || !FS.forceLoadFile(obj)) return -1;
      var offsets = ___stat_struct_layout;
      // Constants.
      HEAP32[(((buf)+(offsets.st_nlink))>>2)]=1
      HEAP32[(((buf)+(offsets.st_uid))>>2)]=0
      HEAP32[(((buf)+(offsets.st_gid))>>2)]=0
      HEAP32[(((buf)+(offsets.st_blksize))>>2)]=4096
      // Variables.
      HEAP32[(((buf)+(offsets.st_ino))>>2)]=obj.inodeNumber
      var time = Math.floor(obj.timestamp / 1000);
      if (offsets.st_atime === undefined) {
        offsets.st_atime = offsets.st_atim.tv_sec;
        offsets.st_mtime = offsets.st_mtim.tv_sec;
        offsets.st_ctime = offsets.st_ctim.tv_sec;
        var nanosec = (obj.timestamp % 1000) * 1000;
        HEAP32[(((buf)+(offsets.st_atim.tv_nsec))>>2)]=nanosec
        HEAP32[(((buf)+(offsets.st_mtim.tv_nsec))>>2)]=nanosec
        HEAP32[(((buf)+(offsets.st_ctim.tv_nsec))>>2)]=nanosec
      }
      HEAP32[(((buf)+(offsets.st_atime))>>2)]=time
      HEAP32[(((buf)+(offsets.st_mtime))>>2)]=time
      HEAP32[(((buf)+(offsets.st_ctime))>>2)]=time
      var mode = 0;
      var size = 0;
      var blocks = 0;
      var dev = 0;
      var rdev = 0;
      if (obj.isDevice) {
        //  Device numbers reuse inode numbers.
        dev = rdev = obj.inodeNumber;
        size = blocks = 0;
        mode = 0x2000;  // S_IFCHR.
      } else {
        dev = 1;
        rdev = 0;
        // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
        //       but this is not required by the standard.
        if (obj.isFolder) {
          size = 4096;
          blocks = 1;
          mode = 0x4000;  // S_IFDIR.
        } else {
          var data = obj.contents || obj.link;
          size = data.length;
          blocks = Math.ceil(data.length / 4096);
          mode = obj.link === undefined ? 0x8000 : 0xA000;  // S_IFREG, S_IFLNK.
        }
      }
      HEAP32[(((buf)+(offsets.st_dev))>>2)]=dev;
      HEAP32[(((buf)+(offsets.st_rdev))>>2)]=rdev;
      HEAP32[(((buf)+(offsets.st_size))>>2)]=size
      HEAP32[(((buf)+(offsets.st_blocks))>>2)]=blocks
      if (obj.read) mode |= 0x16D;  // S_IRUSR | S_IXUSR | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH.
      if (obj.write) mode |= 0x92;  // S_IWUSR | S_IWGRP | S_IWOTH.
      HEAP32[(((buf)+(offsets.st_mode))>>2)]=mode
      return 0;
    }
  var ___utimbuf_struct_layout={__size__:8,actime:0,modtime:4};function _utime(path, times) {
      // int utime(const char *path, const struct utimbuf *times);
      // http://pubs.opengroup.org/onlinepubs/009695399/basedefs/utime.h.html
      var time;
      if (times) {
        // NOTE: We don't keep track of access timestamps.
        var offset = ___utimbuf_struct_layout.modtime;
        time = HEAP32[(((times)+(offset))>>2)]
        time *= 1000;
      } else {
        time = Date.now();
      }
      var file = FS.findObject(Pointer_stringify(path));
      if (file === null) return -1;
      file.timestamp = time;
      return 0;
    }
  function _send(fd, buf, len, flags) {
      var info = FS.streams[fd];
      if (!info) return -1;
      info.sender(HEAPU8.subarray(buf, buf+len));
      return len;
    }
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (!stream || stream.object.isDevice) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (stream.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (nbyte < 0 || offset < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var contents = stream.object.contents;
		//console.log(contents);
		//console.log(offset);
		//edit
		if(contents.push){
			while (contents.length < offset) contents.push(0);
		}
        for (var i = 0; i < nbyte; i++) {
          contents[offset + i] = HEAPU8[(((buf)+(i))|0)];
        }
        stream.object.timestamp = Date.now();
        return i;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (stream && ('socket' in stream)) {
          return _send(fildes, buf, nbyte, 0);
      } else if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (nbyte < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        if (stream.object.isDevice) {
          if (stream.object.output) {
            for (var i = 0; i < nbyte; i++) {
              try {
                stream.object.output(HEAP8[(((buf)+(i))|0)]);
              } catch (e) {
                ___setErrNo(ERRNO_CODES.EIO);
                return -1;
              }
            }
            stream.object.timestamp = Date.now();
            return i;
          } else {
            ___setErrNo(ERRNO_CODES.ENXIO);
            return -1;
          }
        } else {
          var bytesWritten = _pwrite(fildes, buf, nbyte, stream.position);
          if (bytesWritten != -1) stream.position += bytesWritten;
          return bytesWritten;
        }
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        if (FS.streams[stream]) FS.streams[stream].error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (flagAlwaysSigned) {
                if (currArg < 0) {
                  prefix = '-' + prefix;
                } else {
                  prefix = '+' + prefix;
                }
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (flagAlwaysSigned && currArg >= 0) {
                  argText = '+' + argText;
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      var flush = function(filedes) {
        // Right now we write all data directly, except for output devices.
        if (FS.streams[filedes] && FS.streams[filedes].object.output) {
          if (!FS.streams[filedes].object.isTerminal) { // don't flush terminals, it would cause a \n to also appear
            FS.streams[filedes].object.output(null);
          }
        }
      };
      try {
        if (stream === 0) {
          for (var i = 0; i < FS.streams.length; i++) if (FS.streams[i]) flush(i);
        } else {
          flush(stream);
        }
        return 0;
      } catch (e) {
        ___setErrNo(ERRNO_CODES.EIO);
        return -1;
      }
    }
  function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }
  var _llvm_pow_f64=Math.pow;
  function _isspace(chr) {
      return chr in { 32: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
    }function __parseInt(str, endptr, base, min, max, bits, unsign) {
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
      // Check for a plus/minus sign.
      var multiplier = 1;
      if (HEAP8[(str)] == 45) {
        multiplier = -1;
        str++;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
      // Find base.
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            str++;
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
      // Get digits.
      var chr;
      var ret = 0;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          ret = ret * finalBase + digit;
          str++;
        }
      }
      // Apply sign.
      ret *= multiplier;
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str
      }
      // Unsign if needed.
      if (unsign) {
        if (Math.abs(ret) > max) {
          ret = max;
          ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          ret = unSign(ret, bits);
        }
      }
      // Validate range.
      if (ret > max || ret < min) {
        ret = ret > max ? max : min;
        ___setErrNo(ERRNO_CODES.ERANGE);
      }
      if (bits == 64) {
        return ((asm["setTempRet0"](((Math.min((+(Math.floor((ret)/(+(4294967296))))), (+(4294967295))))|0)>>>0),ret>>>0)|0);
      }
      return ret;
    }function _strtol(str, endptr, base) {
      return __parseInt(str, endptr, base, -2147483648, 2147483647, 32);  // LONG_MIN, LONG_MAX.
    }function _atoi(ptr) {
      return _strtol(ptr, null, 10);
    }
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      if (FS.streams[fildes]) {
        if (FS.streams[fildes].currentEntry) {
          _free(FS.streams[fildes].currentEntry);
        }
        FS.streams[fildes] = null;
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      if (FS.streams[fildes]) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      _fsync(stream);
      return _close(stream);
    }
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      function ExitStatus() {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
        Module.print('Exit Status: ' + status);
      };
      ExitStatus.prototype = new Error();
      ExitStatus.prototype.constructor = ExitStatus;
      exitRuntime();
      ABORT = true;
      throw new ExitStatus();
    }function _exit(status) {
      __exit(status);
    }
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;
  function _log10(x) {
      return Math.log(x) / Math.LN10;
    }
  var _fabs=Math.abs;
  var ___dirent_struct_layout={__size__:1040,d_ino:0,d_name:4,d_off:1028,d_reclen:1032,d_type:1036};function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      // NOTE: This implementation tries to mimic glibc rather than strictly
      // following the POSIX standard.
      var mode = HEAP32[((varargs)>>2)];
      // Simplify flags.
      var accessMode = oflag & 3;
      var isWrite = accessMode != 0;
      var isRead = accessMode != 1;
      var isCreate = Boolean(oflag & 512);
      var isExistCheck = Boolean(oflag & 2048);
      var isTruncate = Boolean(oflag & 1024);
      var isAppend = Boolean(oflag & 8);
      // Verify path.
      var origPath = path;
      path = FS.analyzePath(Pointer_stringify(path));
      if (!path.parentExists) {
        ___setErrNo(path.error);
        return -1;
      }
      var target = path.object || null;
      var finalPath;
      // Verify the file exists, create if needed and allowed.
      if (target) {
        if (isCreate && isExistCheck) {
          ___setErrNo(ERRNO_CODES.EEXIST);
          return -1;
        }
        if ((isWrite || isTruncate) && target.isFolder) {
          ___setErrNo(ERRNO_CODES.EISDIR);
          return -1;
        }
        if (isRead && !target.read || isWrite && !target.write) {
          ___setErrNo(ERRNO_CODES.EACCES);
          return -1;
        }
        if (isTruncate && !target.isDevice) {
          target.contents = [];
        } else {
          if (!FS.forceLoadFile(target)) {
            ___setErrNo(ERRNO_CODES.EIO);
            return -1;
          }
        }
        finalPath = path.path;
      } else {
        if (!isCreate) {
          ___setErrNo(ERRNO_CODES.ENOENT);
          return -1;
        }
        if (!path.parentObject.write) {
          ___setErrNo(ERRNO_CODES.EACCES);
          return -1;
        }
        target = FS.createDataFile(path.parentObject, path.name, [],
                                   mode & 0x100, mode & 0x80);  // S_IRUSR, S_IWUSR.
        finalPath = path.parentPath + '/' + path.name;
      }
      // Actually create an open stream.
      var id;
      if (target.isFolder) {
        var entryBuffer = 0;
        if (___dirent_struct_layout) {
          entryBuffer = _malloc(___dirent_struct_layout.__size__);
        }
        var contents = [];
        for (var key in target.contents) contents.push(key);
        id = FS.createFileHandle({
          path: finalPath,
          object: target,
          // An index into contents. Special values: -2 is ".", -1 is "..".
          position: -2,
          isRead: true,
          isWrite: false,
          isAppend: false,
          error: false,
          eof: false,
          ungotten: [],
          // Folder-specific properties:
          // Remember the contents at the time of opening in an array, so we can
          // seek between them relying on a single order.
          contents: contents,
          // Each stream has its own area for readdir() returns.
          currentEntry: entryBuffer
        });
      } else {
        id = FS.createFileHandle({
          path: finalPath,
          object: target,
          position: 0,
          isRead: isRead,
          isWrite: isWrite,
          isAppend: isAppend,
          error: false,
          eof: false,
          ungotten: []
        });
      }
      return id;
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 512;
        flags |= 1024;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 512;
        flags |= 8;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var ret = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return (ret == -1) ? 0 : ret;
    }
  var _floor=Math.floor;
  function _recv(fd, buf, len, flags) {
      var info = FS.streams[fd];
      if (!info) return -1;
      if (!info.hasData()) {
        ___setErrNo(ERRNO_CODES.EAGAIN); // no data, and all sockets are nonblocking, so this is the right behavior
        return -1;
      }
      var buffer = info.inQueue.shift();
      if (len < buffer.length) {
        if (info.stream) {
          // This is tcp (reliable), so if not all was read, keep it
          info.inQueue.unshift(buffer.subarray(len));
        }
        buffer = buffer.subarray(0, len);
      }
      HEAPU8.set(buffer, buf);
      return buffer.length;
    }
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.streams[fildes];
      if (!stream || stream.object.isDevice) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isRead) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (stream.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (nbyte < 0 || offset < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var bytesRead = 0;
        while (stream.ungotten.length && nbyte > 0) {
          HEAP8[((buf++)|0)]=stream.ungotten.pop()
          nbyte--;
          bytesRead++;
        }
        var contents = stream.object.contents;
        var size = Math.min(contents.length - offset, nbyte);
        if (contents.subarray) { // typed array
          HEAPU8.set(contents.subarray(offset, offset+size), buf);
        } else
        if (contents.slice) { // normal array
          for (var i = 0; i < size; i++) {
            HEAP8[(((buf)+(i))|0)]=contents[offset + i]
          }
        } else {
          for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
            HEAP8[(((buf)+(i))|0)]=contents.get(offset + i)
          }
        }
        bytesRead += size;
        return bytesRead;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.streams[fildes];
      if (stream && ('socket' in stream)) {
        return _recv(fildes, buf, nbyte, 0);
      } else if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isRead) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (nbyte < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var bytesRead;
        if (stream.object.isDevice) {
          if (stream.object.input) {
            bytesRead = 0;
            while (stream.ungotten.length && nbyte > 0) {
              HEAP8[((buf++)|0)]=stream.ungotten.pop()
              nbyte--;
              bytesRead++;
            }
            for (var i = 0; i < nbyte; i++) {
              try {
                var result = stream.object.input();
              } catch (e) {
                ___setErrNo(ERRNO_CODES.EIO);
                return -1;
              }
              if (result === undefined && bytesRead === 0) {
                ___setErrNo(ERRNO_CODES.EAGAIN);
                return -1;
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              HEAP8[(((buf)+(i))|0)]=result
            }
            return bytesRead;
          } else {
            ___setErrNo(ERRNO_CODES.ENXIO);
            return -1;
          }
        } else {
          var ungotSize = stream.ungotten.length;
          bytesRead = _pread(fildes, buf, nbyte, stream.position);
          if (bytesRead != -1) {
            stream.position += (stream.ungotten.length - ungotSize) + bytesRead;
          }
          return bytesRead;
        }
      }
    }function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      if (!FS.streams[stream]) return -1;
      var streamObj = FS.streams[stream];
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _read(stream, _fgetc.ret, 1);
      if (ret == 0) {
        streamObj.eof = true;
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }var _getc=_fgetc;
  function _toupper(chr) {
      if (chr >= 97 && chr <= 122) {
        return chr - 97 + 65;
      } else {
        return chr;
      }
    }
  Module["_memcpy"] = _memcpy; 
  Module["_memmove"] = _memmove;var _llvm_memmove_p0i8_p0i8_i32=_memmove;
  function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) return 0;
      var bytesRead = _read(stream, ptr, bytesToRead);
      var streamObj = FS.streams[stream];
      if (bytesRead == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        if (bytesRead < bytesToRead) streamObj.eof = true;
        return Math.floor(bytesRead / size);
      }
    }
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      if (FS.streams[fildes] && !FS.streams[fildes].object.isDevice) {
        var stream = FS.streams[fildes];
        var position = offset;
        if (whence === 1) {  // SEEK_CUR.
          position += stream.position;
        } else if (whence === 2) {  // SEEK_END.
          position += stream.object.contents.length;
        }
        if (position < 0) {
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
        } else {
          stream.ungotten = [];
          stream.position = position;
          return position;
        }
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var ret = _lseek(stream, offset, whence);
      if (ret == -1) {
        return -1;
      } else {
        FS.streams[stream].eof = false;
        return 0;
      }
    }
  function _ftell(stream) {
      // long ftell(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftell.html
      if (FS.streams[stream]) {
        stream = FS.streams[stream];
        if (stream.object.isDevice) {
          ___setErrNo(ERRNO_CODES.ESPIPE);
          return -1;
        } else {
          return stream.position;
        }
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }
  Module["_strcpy"] = _strcpy;
  Module["_memcmp"] = _memcmp;
  var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  Module["_tolower"] = _tolower; 
  Module["_strncasecmp"] = _strncasecmp; 
  Module["_strcasecmp"] = _strcasecmp;
  function _truncate(path, length) {
      // int truncate(const char *path, off_t length);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/truncate.html
      // NOTE: The path argument may be a string, to simplify ftruncate().
      if (length < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        if (typeof path !== 'string') path = Pointer_stringify(path);
        var target = FS.findObject(path);
        if (target === null) return -1;
        if (target.isFolder) {
          ___setErrNo(ERRNO_CODES.EISDIR);
          return -1;
        } else if (target.isDevice) {
          ___setErrNo(ERRNO_CODES.EINVAL);
          return -1;
        } else if (!target.write) {
          ___setErrNo(ERRNO_CODES.EACCES);
          return -1;
        } else {
          var contents = target.contents;
          if (length < contents.length) contents.length = length;
          else while (length > contents.length) contents.push(0);
          target.timestamp = Date.now();
          return 0;
        }
      }
    }function _ftruncate(fildes, length) {
      // int ftruncate(int fildes, off_t length);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftruncate.html
      if (FS.streams[fildes] && FS.streams[fildes].isWrite) {
        return _truncate(FS.streams[fildes].path, length);
      } else if (FS.streams[fildes]) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }
  function _feof(stream) {
      // int feof(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/feof.html
      return Number(FS.streams[stream] && FS.streams[stream].eof);
    }
  Module["_strncpy"] = _strncpy;
  function __isFloat(text) {
      return !!(/^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?$/.exec(text));
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
        __scanString.whiteSpace[' '] = 1;
        __scanString.whiteSpace['\t'] = 1;
        __scanString.whiteSpace['\n'] = 1;
        __scanString.whiteSpace['\v'] = 1;
        __scanString.whiteSpace['\f'] = 1;
        __scanString.whiteSpace['\r'] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        // TODO: Support strings like "%5c" etc.
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'c') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          fields++;
          next = get();
          HEAP8[(argPtr)]=next
          formatIndex += 2;
          continue;
        }
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            var last = 0;
            next = get();
            while (next > 0) {
              buffer.push(String.fromCharCode(next));
              if (__isFloat(buffer.join(''))) {
                last = buffer.length;
              }
              next = get();
            }
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,((Math.min((+(Math.floor((parseInt(text, 10))/(+(4294967296))))), (+(4294967295))))|0)>>>0],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16)
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text)
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text)
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j]
              }
              break;
          }
          fields++;
        } else if (format[formatIndex] in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      var get = function() { return HEAP8[(((s)+(index++))|0)]; };
      var unget = function() { index--; };
      return __scanString(format, get, unget, varargs);
    }
  var _ceil=Math.ceil;
  var _sqrt=Math.sqrt;
  var _sin=Math.sin;
  var _cos=Math.cos;
  var _tan=Math.tan;
  function _abort() {
      ABORT = true;
      throw 'abort() at ' + (new Error().stack);
    }
  function ___errno_location() {
      return ___errno_state;
    }var ___errno=___errno_location;
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 8: return PAGE_SIZE;
        case 54:
        case 56:
        case 21:
        case 61:
        case 63:
        case 22:
        case 67:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 69:
        case 28:
        case 101:
        case 70:
        case 71:
        case 29:
        case 30:
        case 199:
        case 75:
        case 76:
        case 32:
        case 43:
        case 44:
        case 80:
        case 46:
        case 47:
        case 45:
        case 48:
        case 49:
        case 42:
        case 82:
        case 33:
        case 7:
        case 108:
        case 109:
        case 107:
        case 112:
        case 119:
        case 121:
          return 200809;
        case 13:
        case 104:
        case 94:
        case 95:
        case 34:
        case 35:
        case 77:
        case 81:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 94:
        case 95:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 120:
        case 40:
        case 16:
        case 79:
        case 19:
          return -1;
        case 92:
        case 93:
        case 5:
        case 72:
        case 6:
        case 74:
        case 92:
        case 93:
        case 96:
        case 97:
        case 98:
        case 99:
        case 102:
        case 103:
        case 105:
          return 1;
        case 38:
        case 66:
        case 50:
        case 51:
        case 4:
          return 1024;
        case 15:
        case 64:
        case 41:
          return 32;
        case 55:
        case 37:
        case 17:
          return 2147483647;
        case 18:
        case 1:
          return 47839;
        case 59:
        case 57:
          return 99;
        case 68:
        case 58:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 14: return 32768;
        case 73: return 32767;
        case 39: return 16384;
        case 60: return 1000;
        case 106: return 700;
        case 52: return 256;
        case 62: return 255;
        case 2: return 100;
        case 65: return 64;
        case 36: return 20;
        case 100: return 16;
        case 20: return 6;
        case 53: return 4;
        case 10: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : console.log("warning: cannot create object URLs");
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        function getMimetype(name) {
          return {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'bmp': 'image/bmp',
            'ogg': 'audio/ogg',
            'wav': 'audio/wav',
            'mp3': 'audio/mpeg'
          }[name.substr(name.lastIndexOf('.')+1)];
        }
        var imagePlugin = {};
        imagePlugin['canHandle'] = function(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule) {
        var ctx;
        try {
          if (useWebGL) {
            ctx = canvas.getContext('experimental-webgl', {
              alpha: false
            });
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas - ' + e);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function (func) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                         window['mozRequestAnimationFrame'] ||
                                         window['webkitRequestAnimationFrame'] ||
                                         window['msRequestAnimationFrame'] ||
                                         window['oRequestAnimationFrame'] ||
                                         window['setTimeout'];
        }
        window.requestAnimationFrame(func);
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x = event.pageX - (window.scrollX + rect.left);
          var y = event.pageY - (window.scrollY + rect.top);
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};
__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true; // seal the static portion of memory
STACK_MAX = STACK_BASE + 5242880;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
var Math_min = Math.min;
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env._stdin|0;var n=env._stderr|0;var o=env._stdout|0;var p=+env.NaN;var q=+env.Infinity;var r=0;var s=0;var t=0;var u=0;var v=0,w=0,x=0,y=0,z=0.0,A=0,B=0,C=0,D=0.0;var E=0;var F=0;var G=0;var H=0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=global.Math.floor;var P=global.Math.abs;var Q=global.Math.sqrt;var R=global.Math.pow;var S=global.Math.cos;var T=global.Math.sin;var U=global.Math.tan;var V=global.Math.acos;var W=global.Math.asin;var X=global.Math.atan;var Y=global.Math.atan2;var Z=global.Math.exp;var _=global.Math.log;var $=global.Math.ceil;var aa=global.Math.imul;var ab=env.abort;var ac=env.assert;var ad=env.asmPrintInt;var ae=env.asmPrintFloat;var af=env.min;var ag=env.invoke_ii;var ah=env.invoke_v;var ai=env.invoke_iii;var aj=env.invoke_vi;var ak=env._llvm_va_end;var al=env._rename;var am=env._sscanf;var an=env._feof;var ao=env._snprintf;var ap=env._lseek;var aq=env._fgetc;var ar=env._fclose;var as=env._abort;var at=env._fprintf;var au=env._sqrt;var av=env._toupper;var aw=env._pread;var ax=env.__isFloat;var ay=env._close;var az=env._fflush;var aA=env._fopen;var aB=env.__reallyNegative;var aC=env._tan;var aD=env._strtol;var aE=env._sysconf;var aF=env._fabs;var aG=env._floor;var aH=env.___setErrNo;var aI=env._fwrite;var aJ=env._fseek;var aK=env._send;var aL=env._write;var aM=env.__scanString;var aN=env._ftell;var aO=env._exit;var aP=env._sprintf;var aQ=env._log10;var aR=env._isspace;var aS=env._rmdir;var aT=env._stat;var aU=env._fread;var aV=env._truncate;var aW=env._read;var aX=env.__formatString;var aY=env._ceil;var aZ=env._atoi;var a_=env._unlink;var a$=env._recv;var a0=env._utime;var a1=env._cos;var a2=env._pwrite;var a3=env._llvm_pow_f64;var a4=env._fsync;var a5=env.___errno_location;var a6=env._remove;var a7=env._sin;var a8=env._open;var a9=env._sbrk;var ba=env.__parseInt;var bb=env._time;var bc=env._ftruncate;var bd=env.__exit;
// EMSCRIPTEN_START_FUNCS
function bi(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7>>3<<3;return b|0}function bj(){return i|0}function bk(a){a=a|0;i=a}function bl(a,b){a=a|0;b=b|0;if((r|0)==0){r=a;s=b}}function bm(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0]}function bn(b){b=b|0;a[k]=a[b];a[k+1|0]=a[b+1|0];a[k+2|0]=a[b+2|0];a[k+3|0]=a[b+3|0];a[k+4|0]=a[b+4|0];a[k+5|0]=a[b+5|0];a[k+6|0]=a[b+6|0];a[k+7|0]=a[b+7|0]}function bo(a){a=a|0;E=a}function bp(a){a=a|0;F=a}function bq(a){a=a|0;G=a}function br(a){a=a|0;H=a}function bs(a){a=a|0;I=a}function bt(a){a=a|0;J=a}function bu(a){a=a|0;K=a}function bv(a){a=a|0;L=a}function bw(a){a=a|0;M=a}function bx(a){a=a|0;N=a}function by(){}function bz(a){a=a|0;c[1023090]=(c[1023090]|0)+a;c[206050]=(c[206050]|0)+((c[1023090]|0)>>>3);c[1023090]=c[1023090]&7;return}function bA(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0;f=i;i=i+16|0;g=f|0;h=b;b=d;d=0;j=g|0;c[j>>2]=e;c[j+4>>2]=0;j=0;while(1){if((j|0)>=(b|0)){break}k=g|0;d=d+(dg((v=c[k+4>>2]|0,c[k+4>>2]=v+8,c[(c[k>>2]|0)+v>>2]|0)|0)|0)|0;j=j+1|0}k=da(d+3|0)|0;a[k|0]=0;d=g|0;c[d>>2]=e;c[d+4>>2]=0;j=0;while(1){if((j|0)>=(b|0)){break}d=g|0;dh(k|0,(v=c[d+4>>2]|0,c[d+4>>2]=v+8,c[(c[d>>2]|0)+v>>2]|0)|0)|0;j=j+1|0}cE(k,h);db(k);k=0;i=f;return}function bB(a){a=a|0;return a6(a|0)|0}function bC(a,b){a=a|0;b=b|0;return al(a|0,b|0)|0}function bD(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;i=i+8|0;e=d|0;f=a;if((b|0)==0){c[267302]=(aT(f|0,1069216)|0)==0;i=d;return}if((c[267302]|0)!=0){c[e>>2]=c[267312];c[e+4>>2]=c[267314];c[267302]=0;b=f;a0(b|0,e|0)|0}i=d;return}function bE(a,b){a=a|0;b=b|0;var d=0;d=i;at(c[n>>2]|0,21488,(v=i,i=i+16|0,c[v>>2]=a,c[v+8>>2]=b,v)|0)|0;az(c[n>>2]|0)|0;i=d;return 1}function bF(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+24|0;f=e|0;a[f|0]=0;if(((c[206640]|0)-1|0)!=0){g=f|0;h=c[226608]|0;j=c[206640]|0;aP(g|0,21480,(v=i,i=i+16|0,c[v>>2]=h,c[v+8>>2]=j,v)|0)|0}at(c[n>>2]|0,17680,(v=i,i=i+24|0,c[v>>2]=f,c[v+8>>2]=b,c[v+16>>2]=d,v)|0)|0;az(c[n>>2]|0)|0;i=e;return 1}function bG(){var b=0,e=0,f=0,g=0,h=0;b=(d[(c[273020]|0)+1|0]|0)>>3&3;e=(d[(c[273020]|0)+3|0]|0)>>6&3;f=(e|0)==3?1:2;if((a[(c[273020]|0)+1|0]&1|0)!=0){c[206050]=(c[273020]|0)+4}else{c[206050]=(c[273020]|0)+6}c[1023090]=0;if((b|0)!=3){c[206050]=(c[206050]|0)+1;if((e|0)==3){bz(1)}else{bz(2)}g=0;while(1){if((g|0)>=(f|0)){break}bz(21);h=(bV()|0)&255;if((d[c[227128]|0]|0|0)>(h|0)){a[c[227128]|0]=h&255}if((d[c[227132]|0]|0|0)<(h|0)){a[c[227132]|0]=h&255}bz(42);g=g+1|0}return}c[206050]=(c[206050]|0)+1;c[1023090]=1;if((e|0)==3){bz(5)}else{bz(3)}bz(f<<2);e=0;while(1){if((e|0)>=2){break}g=0;while(1){if((g|0)>=(f|0)){break}bz(21);h=(bV()|0)&255;if((d[c[227128]|0]|0|0)>(h|0)){a[c[227128]|0]=h&255}if((d[c[227132]|0]|0|0)<(h|0)){a[c[227132]|0]=h&255}bz(38);g=g+1|0}e=e+1|0}return}function bH(e,f,g,i,j){e=e|0;f=f|0;g=g|0;i=i|0;j=j|0;var k=0,l=0.0,m=0.0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=e;e=f;f=g;g=i;i=j;do{if((e|0)==0){if((f|0)!=0){break}return}}while(0);if((bI(k,e,f)|0)==0){if((c[g+16>>2]|0)==0){c[g+64>>2]=0;c[g+68>>2]=0}c[g+80>>2]=1;j=g+68|0;c[j>>2]=(c[j>>2]|0)-f;j=g+64|0;c[j>>2]=(c[j>>2]|0)-e;c[g+72>>2]=c[206052];c[g+16>>2]=1;if((e|0)==(f|0)){l=+(e|0)*1.505;if((c[g>>2]|0)!=0){f=g+32|0;h[f>>3]=+h[f>>3]-l}if((c[g+4>>2]|0)!=0){m=+R(2.0,+(+(e|0)/4.0));f=g+40|0;h[f>>3]=+h[f>>3]*m}if((c[g+8>>2]|0)!=0){f=g+48|0;h[f>>3]=+h[f>>3]-l}if((c[g+12>>2]|0)!=0){l=+R(2.0,+(+(e|0)/4.0));f=g+56|0;h[f>>3]=+h[f>>3]*l}if((c[g+20>>2]|0)!=0){n=d[g+76|0]|0;o=d[g+77|0]|0;n=n+e|0;o=o+e|0;if((c[206052]|0)!=0){do{if((n|0)<0){p=80}else{if((n|0)>255){p=80;break}if((o|0)<0){p=80;break}if((o|0)>255){p=80}}}while(0);if((p|0)==80){c[g+20>>2]=0}}else{if((d[g+76|0]|0)==0){q=0}else{if((n|0)<0){r=0}else{if((n|0)>255){s=255}else{s=n}r=s}q=r}a[g+76|0]=q&255;if((o|0)<0){t=0}else{if((o|0)>255){u=255}else{u=o}t=u}a[g+77|0]=t&255}}if((c[g+24>>2]|0)!=0){n=d[g+78|0]|0;o=d[g+79|0]|0;n=n+e|0;o=o+e|0;if((c[206052]|0)!=0){do{if((n|0)<0){p=105}else{if((n|0)>255){p=105;break}if((o|0)<0){p=105;break}if((o|0)>255){p=105}}}while(0);if((p|0)==105){c[g+24>>2]=0}}else{if((d[g+78|0]|0)==0){v=0}else{if((n|0)<0){w=0}else{if((n|0)>255){x=255}else{x=n}w=x}v=w}a[g+78|0]=v&255;if((o|0)<0){y=0}else{if((o|0)>255){z=255}else{z=o}y=z}a[g+79|0]=y&255}}}bJ(k,g,i,b[414060]|0)}return}function bI(e,f,g){e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0;h=i;i=i+8|0;j=h|0;k=e;e=f;f=g;g=0;l=0;m=0;c[1023432]=0;c[1023268]=c[1023262];c[1023266]=1;do{if((e|0)==0){if((f|0)!=0){break}p=0;q=p;i=h;return q|0}}while(0);c[j>>2]=e;c[j+4>>2]=f;r=((e|0)==(f|0)^1)&1;if((b[414060]|0)!=0){bD(k,0)}g=bM(k)|0;if((c[1023260]|0)!=0){f=c[n>>2]|0;az(f|0)|0;f=c[o>>2]|0;az(f|0)|0;s=dg(k|0)|0;l=da(s+5|0)|0;f=l;e=k;dl(f|0,e|0)|0;if((a[k+(s-3)|0]|0)==84){t=138}else{if((a[k+(s-3)|0]|0)==116){t=138}else{t=143}}do{if((t|0)==138){if((a[k+(s-2)|0]|0)!=77){if((a[k+(s-2)|0]|0)!=109){t=143;break}}if((a[k+(s-1)|0]|0)!=80){if((a[k+(s-1)|0]|0)!=112){t=143;break}}e=l;dh(e|0,18704)|0}}while(0);if((t|0)==143){a[l+(s-3)|0]=84;a[l+(s-2)|0]=77;a[l+(s-1)|0]=80}c[266274]=aA(k|0,18696)|0;do{if((c[266274]|0)!=0){c[226606]=aA(l|0,18688)|0;if((c[226606]|0)!=0){break}e=c[266274]|0;ar(e|0)|0;c[266274]=0;bA(1,3,(v=i,i=i+24|0,c[v>>2]=18672,c[v+8>>2]=l,c[v+16>>2]=18608,v)|0);p=-2;q=p;i=h;return q|0}}while(0)}else{c[266274]=aA(k|0,18696)|0}if((c[266274]|0)==0){do{if((c[1023260]|0)!=0){if((c[226606]|0)==0){break}e=c[226606]|0;ar(e|0)|0}}while(0);bA(1,3,(v=i,i=i+24|0,c[v>>2]=18672,c[v+8>>2]=k,c[v+16>>2]=18592,v)|0);p=-1;q=p;i=h;return q|0}c[6048]=0;c[266276]=0;c[267300]=0;c[1023090]=0;e=bN(0)|0;do{if((e|0)!=0){c[206050]=1092352;e=bQ()|0;e=bO(1)|0;if((e|0)!=0){c[1023268]=1;u=d[(c[273020]|0)+3|0]>>6&3;if((a[(c[273020]|0)+1|0]&8|0)==8){w=(u|0)==3?21:36}else{w=(u|0)==3?13:21}if((a[(c[273020]|0)+1|0]&1|0)==0){w=w+2|0}f=(c[273020]|0)+w|0;do{if((d[f|0]|0)==88){if((d[f+1|0]|0)!=105){t=169;break}if((d[f+2|0]|0)!=110){t=169;break}if((d[f+3|0]|0)==103){t=173}else{t=169}}else{t=169}}while(0);do{if((t|0)==169){if((d[f|0]|0)!=73){break}if((d[f+1|0]|0)!=110){break}if((d[f+2|0]|0)!=102){break}if((d[f+3|0]|0)==111){t=173}}}while(0);if((t|0)==173){x=d[(c[273020]|0)+2|0]>>4&15;if((x|0)==0){bA(32,2,(v=i,i=i+16|0,c[v>>2]=k,c[v+8>>2]=18456,v)|0);e=0}else{y=d[(c[273020]|0)+1|0]>>3&3;z=d[(c[273020]|0)+2|0]>>2&3;A=(c[4092368+(x<<2)>>2]|0)+(d[(c[273020]|0)+2|0]>>1&1)|0;c[206050]=(c[273020]|0)+A;e=bO(0)|0}}m=1}else{if((c[1023432]|0)==0){bA(1,3,(v=i,i=i+24|0,c[v>>2]=18504,c[v+8>>2]=k,c[v+16>>2]=17296,v)|0)}}while(1){if((e|0)==0){t=255;break}x=d[(c[273020]|0)+2|0]>>4&15;if((r|0)!=0){if((d[(c[273020]|0)+3|0]>>6&1|0)!=0){bA(32,2,(v=i,i=i+16|0,c[v>>2]=k,c[v+8>>2]=18400,v)|0);e=0}}if((x|0)==0){bA(32,2,(v=i,i=i+16|0,c[v>>2]=k,c[v+8>>2]=18456,v)|0);e=0}if((e|0)!=0){y=d[(c[273020]|0)+1|0]>>3&3;f=a[(c[273020]|0)+1|0]&1;z=d[(c[273020]|0)+2|0]>>2&3;A=(c[4092368+(x<<2)>>2]|0)+(d[(c[273020]|0)+2|0]>>1&1)|0;u=d[(c[273020]|0)+3|0]>>6&3;B=(u|0)==3?1:2;if((f|0)!=0){c[206050]=(c[273020]|0)+4}else{c[206050]=(c[273020]|0)+6}c[1023090]=0;if((y|0)==3){c[206050]=(c[206050]|0)+1;c[1023090]=1;if((u|0)==3){bz(5)}else{bz(3)}bz(B<<2);C=0;while(1){if((C|0)>=2){break}D=0;while(1){if((D|0)>=(B|0)){break}bz(21);E=bV()|0;if((c[206052]|0)!=0){E=(E&255)+(c[j+(D<<2)>>2]&255)&255}else{if((E&255|0)!=0){if(((E&255)+(c[j+(D<<2)>>2]|0)|0)>255){E=-1}else{if(((E&255)+(c[j+(D<<2)>>2]|0)|0)<0){E=0}else{E=(E&255)+(c[j+(D<<2)>>2]&255)&255}}}}bX(E&255);bz(38);D=D+1|0}C=C+1|0}if((f|0)==0){if((B|0)==1){bY(23,c[273020]|0)}else{bY(38,c[273020]|0)}if((c[1023260]|0)==0){bZ((c[267300]|0)-((c[266276]|0)-((c[273020]|0)+4-1092352))|0,(c[273020]|0)+4|0)}}}else{c[206050]=(c[206050]|0)+1;if((u|0)==3){bz(1)}else{bz(2)}D=0;while(1){if((D|0)>=(B|0)){break}bz(21);E=bV()|0;if((c[206052]|0)!=0){E=(E&255)+(c[j+(D<<2)>>2]&255)&255}else{if((E&255|0)!=0){if(((E&255)+(c[j+(D<<2)>>2]|0)|0)>255){E=-1}else{if(((E&255)+(c[j+(D<<2)>>2]|0)|0)<0){E=0}else{E=(E&255)+(c[j+(D<<2)>>2]&255)&255}}}}bX(E&255);bz(42);D=D+1|0}if((f|0)==0){if((B|0)==1){bY(15,c[273020]|0)}else{bY(23,c[273020]|0)}if((c[1023260]|0)==0){bZ((c[267300]|0)-((c[266276]|0)-((c[273020]|0)+4-1092352))|0,(c[273020]|0)+4|0)}}}if((c[1023264]|0)==0){m=m+1|0;if(((m>>>0)%200|0|0)==0){e=bE(~~(+(((c[267300]|0)-((c[266276]|0)-((c[273020]|0)+A-1092352))|0)>>>0>>>0)*100.0/+(g|0)),g)|0;if((e|0)==0){break}}}c[206050]=(c[273020]|0)+A;e=bO(0)|0}}if((t|0)==255){break}p=e;q=p;i=h;return q|0}}while(0);if((c[1023264]|0)==0){e=c[n>>2]|0;at(e|0,18344,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}az(c[n>>2]|0)|0;az(c[o>>2]|0)|0;if((c[1023260]|0)!=0){do{}while((bN(0)|0)!=0);az(c[226606]|0)|0;aJ(c[226606]|0,0,2)|0;aJ(c[266274]|0,0,2)|0;s=aN(c[226606]|0)|0;e=aN(c[266274]|0)|0;ar(c[226606]|0)|0;ar(c[266274]|0)|0;c[266274]=0;if((s|0)!=(e|0)){e=l;bB(e)|0;bA(1,3,(v=i,i=i+24|0,c[v>>2]=18296,c[v+8>>2]=k,c[v+16>>2]=18232,v)|0);p=-3;q=p;i=h;return q|0}if((bB(k)|0)!=0){e=l;bB(e)|0;bA(1,3,(v=i,i=i+24|0,c[v>>2]=18216,c[v+8>>2]=k,c[v+16>>2]=18592,v)|0);p=-1;q=p;i=h;return q|0}if((bC(l,k)|0)!=0){bA(1,9,(v=i,i=i+72|0,c[v>>2]=18192,c[v+8>>2]=l,c[v+16>>2]=18136,c[v+24>>2]=k,c[v+32>>2]=18072,c[v+40>>2]=l,c[v+48>>2]=18136,c[v+56>>2]=k,c[v+64>>2]=18032,v)|0);p=-4;q=p;i=h;return q|0}if((b[414060]|0)!=0){bD(k,1)}db(l)}else{b_();ar(c[266274]|0)|0;c[266274]=0;if((b[414060]|0)!=0){bD(k,1)}}c[1023266]=0;p=0;q=p;i=h;return q|0}function bJ(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=a;a=b;b=e;if((c[206634]|0)==0){e=f;g=a;h=d;d=b;b6(e,g,h,d)|0;return}if((cf(f,a,b)|0)>=0){a=f;f=b;b9(a,f)|0}return}function bK(e,f){e=e|0;f=f|0;var g=0,j=0,k=0,l=0,m=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0.0,J=0,K=0.0,L=0.0,M=0,N=0,Q=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0.0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0.0,ak=0,al=0.0,am=0;g=i;i=i+50368|0;j=g|0;k=g+31904|0;l=g+31912|0;m=g+31920|0;p=g+41136|0;q=g+50352|0;r=g+50360|0;s=0;t=e;e=f;f=0;u=0;w=1;x=0;y=0;z=0;A=0;B=0;C=0;D=0;E=0;F=0;G=0;H=0;I=0.0;J=0;K=0.0;L=0.0;M=0;N=0;c[267290]=1;if((t|0)<2){bR(c[e>>2]|0)}a[908536]=0;b[414060]=0;Q=1;c[226608]=0;S=1;L394:while(1){if((S|0)>=(t|0)){break}if((a[c[e+(S<<2)>>2]|0]|0)==47){T=300}else{if((a[c[e+(S<<2)>>2]|0]|0)==45){T=300}}do{if((T|0)==300){T=0;if((dg(c[e+(S<<2)>>2]|0)|0)!=2){break}Q=Q+1|0;U=a[(c[e+(S<<2)>>2]|0)+1|0]|0;if((U|0)==109|(U|0)==77){if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)!=0){H=aZ((c[e+(S<<2)>>2]|0)+2|0)|0}else{if((S+1|0)<(t|0)){H=aZ(c[e+(S+1<<2)>>2]|0)|0;S=S+1|0;Q=Q+1|0}else{bR(c[e>>2]|0)}}}else if((U|0)==111|(U|0)==79){D=1}else if((U|0)==112|(U|0)==80){b[414060]=1}else if((U|0)==113|(U|0)==81){c[1023264]=1}else if((U|0)==114|(U|0)==82){z=1;A=0}else if((U|0)==115|(U|0)==83){V=0;if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)==0){if((S+1|0)<(t|0)){S=S+1|0;Q=Q+1|0;V=a[c[e+(S<<2)>>2]|0]|0}else{bR(c[e>>2]|0)}}else{V=a[(c[e+(S<<2)>>2]|0)+2|0]|0}W=V<<24>>24;if((W|0)==99|(W|0)==67){c[273086]=1}else if((W|0)==100|(W|0)==68){c[271930]=1}else if((W|0)==115|(W|0)==83){c[206796]=1}else if((W|0)==114|(W|0)==82){c[267298]=1}else if((W|0)==105|(W|0)==73){c[206634]=1}else if((W|0)==97|(W|0)==65){c[206634]=0}else{bR(c[e>>2]|0)}}else if((U|0)==116|(U|0)==84){c[1023260]=1}else if((U|0)==117|(U|0)==85){c[206636]=1}else if((U|0)==118|(U|0)==86){T=369;break L394}else if((U|0)==119|(U|0)==87){c[206052]=1}else if((U|0)==120|(U|0)==88){a[908536]=1}else if((U|0)==102|(U|0)==70){c[1023262]=1}else if((U|0)==103|(U|0)==71){E=1;F=0;if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)!=0){G=aZ((c[e+(S<<2)>>2]|0)+2|0)|0}else{if((S+1|0)<(t|0)){G=aZ(c[e+(S+1<<2)>>2]|0)|0;S=S+1|0;Q=Q+1|0}else{bR(c[e>>2]|0)}}}else if((U|0)==107|(U|0)==75){y=1}else if((U|0)==108|(U|0)==76){F=1;E=0;if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)!=0){c[206632]=aZ((c[e+(S<<2)>>2]|0)+2|0)|0;if((S+1|0)<(t|0)){G=aZ(c[e+(S+1<<2)>>2]|0)|0;S=S+1|0;Q=Q+1|0}else{bR(c[e>>2]|0)}}else{if((S+2|0)<(t|0)){c[206632]=aZ(c[e+(S+1<<2)>>2]|0)|0;S=S+1|0;Q=Q+1|0;G=aZ(c[e+(S+1<<2)>>2]|0)|0;S=S+1|0;Q=Q+1|0}else{bR(c[e>>2]|0)}}}else if((U|0)==101|(U|0)==69){B=1}else if((U|0)==104|(U|0)==72|(U|0)==63){do{if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)==119){T=321}else{if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)==87){T=321;break}if((S+1|0)<(t|0)){if((a[c[e+(S+1<<2)>>2]|0]|0)==119){T=325}else{if((a[c[e+(S+1<<2)>>2]|0]|0)==87){T=325}}if((T|0)==325){T=0;bT()}}else{bS(c[e>>2]|0)}}}while(0);if((T|0)==321){T=0;bT()}bS(c[e>>2]|0)}else if((U|0)==97|(U|0)==65){z=0;A=1}else if((U|0)==99|(U|0)==67){x=1}else if((U|0)==100|(U|0)==68){if((a[(c[e+(S<<2)>>2]|0)+2|0]|0)!=0){I=+de((c[e+(S<<2)>>2]|0)+2|0)}else{if((S+1|0)<(t|0)){I=+de(c[e+(S+1<<2)>>2]|0);S=S+1|0;Q=Q+1|0}else{bR(c[e>>2]|0)}}}else{at(c[n>>2]|0,13976,(v=i,i=i+8|0,c[v>>2]=c[e+(S<<2)>>2],v)|0)|0}}}while(0);S=S+1|0}if((T|0)==369){bL(c[e>>2]|0);S=c[o>>2]|0;ar(S|0)|0;S=c[n>>2]|0;ar(S|0)|0;aO(0);return 0}S=da(t<<2)|0;W=dc(t,88)|0;V=da(t*20|0)|0;if((D|0)!=0){if((c[273086]|0)!=0){X=c[o>>2]|0;at(X|0,21320,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}else{if((c[206636]|0)!=0){X=c[o>>2]|0;at(X|0,20608,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}else{X=c[o>>2]|0;at(X|0,19800,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}X=c[o>>2]|0;az(X|0)|0}c[206640]=t-Q;X=Q;while(1){if((X|0)>=(t|0)){break}c[S+(X<<2)>>2]=0;c[273022]=c[e+(X<<2)>>2];c[V+(X*20|0)+4>>2]=0;c[V+(X*20|0)+8>>2]=0;c[V+(X*20|0)+16>>2]=0;c[W+(X*88|0)+80>>2]=0;c[W+(X*88|0)+8>>2]=0;c[W+(X*88|0)+12>>2]=0;c[W+(X*88|0)>>2]=0;c[W+(X*88|0)+4>>2]=0;c[W+(X*88|0)+16>>2]=0;c[W+(X*88|0)+20>>2]=0;c[W+(X*88|0)+24>>2]=0;c[W+(X*88|0)+84>>2]=0;do{if((c[206796]|0)==0){if((c[271930]|0)!=0){break}Y=c[273022]|0;Z=W+(X*88|0)|0;_=V+(X*20|0)|0;b4(Y,Z,_)|0;if((c[206634]|0)!=0){do{if((c[W+(X*88|0)>>2]|0)!=0){T=395}else{if((c[W+(X*88|0)+8>>2]|0)!=0){T=395;break}if((c[W+(X*88|0)+20>>2]|0)!=0){T=395;break}if((c[W+(X*88|0)+24>>2]|0)!=0){T=395;break}if((c[W+(X*88|0)+16>>2]|0)!=0){T=395}}}while(0);if((T|0)==395){T=0;c[W+(X*88|0)+80>>2]=1}U=c[273022]|0;_=W+(X*88|0)|0;ca(U,_)|0}if((c[267298]|0)!=0){if((c[W+(X*88|0)+8>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)+8>>2]=0}if((c[W+(X*88|0)+12>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)+12>>2]=0}if((c[W+(X*88|0)>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)>>2]=0}if((c[W+(X*88|0)+4>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)+4>>2]=0}if((c[W+(X*88|0)+20>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)+20>>2]=0}if((c[W+(X*88|0)+24>>2]|0)!=0){c[W+(X*88|0)+80>>2]=1;c[W+(X*88|0)+24>>2]=0}}}}while(0);X=X+1|0}if((c[267298]|0)!=0){$=1}else{$=(c[206796]|0)!=0}_=$?1:0;do{if((c[206796]|0)==0){if((c[271930]|0)!=0){break}if((c[267298]|0)!=0){break}if((t-Q|0)>1){K=+h[W+(Q*88|0)+48>>3];L=+h[W+(Q*88|0)+56>>3];M=a[W+(Q*88|0)+78|0]|0;N=a[W+(Q*88|0)+79|0]|0}X=Q;while(1){if((X|0)>=(t|0)){break}if((a[908536]|0)==0){do{if((t-Q|0)>1){if((z|0)!=0){break}if((B|0)!=0){break}if((c[W+(X*88|0)+8>>2]|0)!=0){if(+h[W+(X*88|0)+48>>3]!=K){_=_|1}}else{_=_|1}}}while(0);if((c[W+(X*88|0)>>2]|0)==0){$=W+(X*88|0)+84|0;c[$>>2]=c[$>>2]|1}}do{if((t-Q|0)>1){if((z|0)!=0){break}if((B|0)!=0){break}if((c[W+(X*88|0)+12>>2]|0)!=0){if(+h[W+(X*88|0)+56>>3]!=L){_=_|2}}else{_=_|2}if((c[W+(X*88|0)+24>>2]|0)!=0){if((d[W+(X*88|0)+79|0]|0)!=(N&255|0)){_=_|4}else{if((d[W+(X*88|0)+78|0]|0)!=(M&255|0)){_=_|4}}}else{_=_|4}}}while(0);if((c[W+(X*88|0)+4>>2]|0)==0){$=W+(X*88|0)+84|0;c[$>>2]=c[$>>2]|2}if((c[W+(X*88|0)+20>>2]|0)==0){$=W+(X*88|0)+84|0;c[$>>2]=c[$>>2]|4}X=X+1|0}}}while(0);X=Q;while(1){if((X|0)>=(t|0)){break}di(j|0,0,31904);M=W+(X*88|0)+84|0;c[M>>2]=c[M>>2]|_;c[273022]=c[e+(X<<2)>>2];if((c[273086]|0)!=0){aa=W+(X*88|0)|0;if((c[aa>>2]|0)!=0){L=+h[aa+32>>3];ab=L/(+aQ(2.0)*5.0);L=+P(+ab);if(L- +(~~+P(+ab)|0)<.5){f=~~ab}else{f=~~ab+(ab<0.0?-1:1)|0}}if((c[aa+8>>2]|0)!=0){L=+h[aa+48>>3];ab=L/(+aQ(2.0)*5.0);L=+P(+ab);if(L- +(~~+P(+ab)|0)<.5){u=~~ab}else{u=~~ab+(ab<0.0?-1:1)|0}}if((D|0)!=0){M=c[o>>2]|0;N=c[e+(X<<2)>>2]|0;at(M|0,17256,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;if((c[aa>>2]|0)!=0){N=c[o>>2]|0;M=f;at(N|0,17240,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;M=c[o>>2]|0;L=+h[aa+32>>3];at(M|0,17224,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}else{M=c[o>>2]|0;at(M|0,17184,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[aa+4>>2]|0)!=0){M=c[o>>2]|0;L=+h[aa+40>>3]*32768.0;at(M|0,17224,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}else{M=c[o>>2]|0;at(M|0,17168,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[aa+20>>2]|0)!=0){M=c[o>>2]|0;N=d[aa+77|0]|0;at(M|0,17240,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;N=c[o>>2]|0;M=d[aa+76|0]|0;at(N|0,17240,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0}else{M=c[o>>2]|0;at(M|0,17184,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[aa+8>>2]|0)!=0){M=c[o>>2]|0;N=u;at(M|0,17240,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;N=c[o>>2]|0;L=+h[aa+48>>3];at(N|0,17224,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}else{N=c[o>>2]|0;at(N|0,17184,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[aa+12>>2]|0)!=0){N=c[o>>2]|0;L=+h[aa+56>>3]*32768.0;at(N|0,17224,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}else{N=c[o>>2]|0;at(N|0,17168,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[aa+24>>2]|0)!=0){N=c[o>>2]|0;M=d[aa+79|0]|0;at(N|0,17240,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;M=c[o>>2]|0;N=d[aa+78|0]|0;at(M|0,17152,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0}else{N=c[o>>2]|0;at(N|0,17088,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}N=c[o>>2]|0;az(N|0)|0}else{N=c[o>>2]|0;M=c[e+(X<<2)>>2]|0;at(N|0,19080,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;if((c[aa>>2]|0)!=0){M=c[o>>2]|0;L=+h[aa+32>>3];at(M|0,18632,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0;M=c[o>>2]|0;N=f;at(M|0,18144,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;if((c[aa+4>>2]|0)!=0){L=+h[aa+40>>3];if(L*+R(2.0,+(+(f|0)/4.0))>1.0){N=c[o>>2]|0;at(N|0,17960,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}}if((c[aa+4>>2]|0)!=0){N=c[o>>2]|0;L=+h[aa+40>>3]*32768.0;at(N|0,17896,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}if((c[aa+20>>2]|0)!=0){N=c[o>>2]|0;M=d[aa+77|0]|0;at(N|0,17848,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;M=c[o>>2]|0;N=d[aa+76|0]|0;at(M|0,17784,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0}if((c[aa+8>>2]|0)!=0){N=c[o>>2]|0;L=+h[aa+48>>3];at(N|0,17640,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0;N=c[o>>2]|0;M=u;at(N|0,17568,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;if((c[aa+4>>2]|0)!=0){L=+h[aa+40>>3];if(L*+R(2.0,+(+(u|0)/4.0))>1.0){M=c[o>>2]|0;at(M|0,17960,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}}if((c[aa+12>>2]|0)!=0){M=c[o>>2]|0;L=+h[aa+56>>3]*32768.0;at(M|0,17464,(v=i,i=i+8|0,h[v>>3]=L,v)|0)|0}if((c[aa+24>>2]|0)!=0){M=c[o>>2]|0;N=d[aa+79|0]|0;at(M|0,17368,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;N=c[o>>2]|0;M=d[aa+78|0]|0;at(N|0,17312,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0}M=c[o>>2]|0;at(M|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}else{if((c[206636]|0)!=0){E=1;do{if((c[W+(X*88|0)+16>>2]|0)!=0){if((c[W+(X*88|0)+64>>2]|0)==0){if((c[W+(X*88|0)+68>>2]|0)==0){T=525;break}}do{if((c[1023264]|0)==0){if((D|0)!=0){break}M=c[n>>2]|0;N=c[W+(X*88|0)+64>>2]|0;$=c[W+(X*88|0)+68>>2]|0;U=c[e+(X<<2)>>2]|0;at(M|0,17008,(v=i,i=i+24|0,c[v>>2]=N,c[v+8>>2]=$,c[v+16>>2]=U,v)|0)|0}}while(0);if((D|0)!=0){U=c[o>>2]|0;$=c[e+(X<<2)>>2]|0;N=c[W+(X*88|0)+64>>2]|0;M=c[W+(X*88|0)+68>>2]|0;at(U|0,16984,(v=i,i=i+24|0,c[v>>2]=$,c[v+8>>2]=N,c[v+16>>2]=M,v)|0)|0}bH(c[e+(X<<2)>>2]|0,c[W+(X*88|0)+64>>2]|0,c[W+(X*88|0)+68>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0)}else{T=525}}while(0);if((T|0)==525){T=0;if((D|0)!=0){M=c[o>>2]|0;N=c[e+(X<<2)>>2]|0;at(M|0,16968,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0}else{if((c[1023264]|0)==0){if((c[W+(X*88|0)+16>>2]|0)!=0){N=c[n>>2]|0;M=c[e+(X<<2)>>2]|0;at(N|0,16928,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0}else{M=c[n>>2]|0;N=c[e+(X<<2)>>2]|0;at(M|0,16888,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0}}}}}else{if((F|0)!=0){if((c[1023264]|0)==0){N=c[n>>2]|0;M=G;$=c[206632]|0;U=c[e+(X<<2)>>2]|0;at(N|0,16824,(v=i,i=i+24|0,c[v>>2]=M,c[v+8>>2]=$,c[v+16>>2]=U,v)|0)|0}if((c[206632]|0)!=0){if((c[206796]|0)!=0){U=c[e+(X<<2)>>2]|0;$=G;bI(U,0,$)|0}else{bH(c[e+(X<<2)>>2]|0,0,G,W+(X*88|0)|0,V+(X*20|0)|0)}}else{if((c[206796]|0)!=0){$=c[e+(X<<2)>>2]|0;U=G;bI($,U,0)|0}else{bH(c[e+(X<<2)>>2]|0,G,0,W+(X*88|0)|0,V+(X*20|0)|0)}}do{if((c[1023264]|0)==0){if((c[267290]|0)!=1){break}U=c[n>>2]|0;at(U|0,16808,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}while(0)}else{if((E|0)!=0){if((c[1023264]|0)==0){U=c[n>>2]|0;$=G;M=c[e+(X<<2)>>2]|0;at(U|0,16760,(v=i,i=i+16|0,c[v>>2]=$,c[v+8>>2]=M,v)|0)|0}if((c[206796]|0)!=0){M=c[e+(X<<2)>>2]|0;$=G;U=G;bI(M,$,U)|0}else{bH(c[e+(X<<2)>>2]|0,G,G,W+(X*88|0)|0,V+(X*20|0)|0)}do{if((c[1023264]|0)==0){if((c[267290]|0)!=1){break}U=c[n>>2]|0;at(U|0,16808,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}while(0)}else{if((c[271930]|0)!=0){U=c[e+(X<<2)>>2]|0;$=b[414060]|0;b9(U,$)|0;if((c[206634]|0)!=0){$=c[e+(X<<2)>>2]|0;U=b[414060]|0;cm($,U)|0}do{if((c[1023264]|0)==0){if((D|0)!=0){break}U=c[n>>2]|0;$=c[e+(X<<2)>>2]|0;at(U|0,16720,(v=i,i=i+8|0,c[v>>2]=$,v)|0)|0}}while(0);if((D|0)!=0){$=c[o>>2]|0;U=c[e+(X<<2)>>2]|0;at($|0,16640,(v=i,i=i+8|0,c[v>>2]=U,v)|0)|0}}else{if((D|0)==0){U=c[o>>2]|0;$=c[e+(X<<2)>>2]|0;at(U|0,19080,(v=i,i=i+8|0,c[v>>2]=$,v)|0)|0}if((c[W+(X*88|0)+84>>2]|0)>0){J=bM(c[e+(X<<2)>>2]|0)|0;c[266274]=aA(c[e+(X<<2)>>2]|0,16624)|0}do{if((c[266274]|0)==0){if((c[W+(X*88|0)+84>>2]|0)<=0){T=577;break}$=c[o>>2]|0;U=c[e+(X<<2)>>2]|0;at($|0,16584,(v=i,i=i+8|0,c[v>>2]=U,v)|0)|0;U=c[o>>2]|0;az(U|0)|0}else{T=577}}while(0);if((T|0)==577){T=0;cM(j)|0;if((c[W+(X*88|0)+84>>2]|0)==0){h[l>>3]=+h[W+(X*88|0)+40>>3]*32768.0;a[q]=a[W+(X*88|0)+77|0]|0;a[r]=a[W+(X*88|0)+76|0]|0;ac=1}else{do{if((c[W+(X*88|0)+84>>2]&1|0)!=0){T=582}else{if((c[W+(X*88|0)+84>>2]&2|0)!=0){T=582;break}h[l>>3]=+h[W+(X*88|0)+40>>3]*32768.0}}while(0);if((T|0)==582){T=0;h[l>>3]=0.0}c[1023432]=0;c[1023268]=c[1023262];a[q]=0;a[r]=-1;c[266276]=0;c[267300]=0;c[1023090]=0;ac=bN(0)|0}if((ac|0)!=0){if((c[W+(X*88|0)+84>>2]|0)>0){c[206050]=1092352;ac=bQ()|0;ac=bO(1)|0}if((ac|0)!=0){c[1023268]=1;c[S+(X<<2)>>2]=1;c[226608]=(c[226608]|0)+1;if((c[W+(X*88|0)+84>>2]|0)>0){U=d[(c[273020]|0)+3|0]>>6&3;if((a[(c[273020]|0)+1|0]&8|0)==8){ad=(a[(c[273020]|0)+3|0]&192|0)==192?21:36}else{ad=(a[(c[273020]|0)+3|0]&192|0)==192?13:21}if((a[(c[273020]|0)+1|0]&1|0)==0){ad=ad+2|0}$=(c[273020]|0)+ad|0;do{if((d[$|0]|0)==88){if((d[$+1|0]|0)!=105){T=601;break}if((d[$+2|0]|0)!=110){T=601;break}if((d[$+3|0]|0)==103){T=605}else{T=601}}else{T=601}}while(0);do{if((T|0)==601){T=0;if((d[$|0]|0)!=73){break}if((d[$+1|0]|0)!=110){break}if((d[$+2|0]|0)!=102){break}if((d[$+3|0]|0)==111){T=605}}}while(0);if((T|0)==605){T=0;ae=d[(c[273020]|0)+2|0]>>4&15;if((ae|0)==0){$=c[o>>2]|0;M=c[273022]|0;at($|0,16472,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;M=c[o>>2]|0;az(M|0)|0;ac=0}else{af=d[(c[273020]|0)+1|0]>>3&3;ag=d[(c[273020]|0)+2|0]>>2&3;ah=(c[4092368+(ae<<2)>>2]|0)+(d[(c[273020]|0)+2|0]>>1&1)|0;c[206050]=(c[273020]|0)+ah;ac=bO(0)|0}}M=1;if((a[908536]|0)!=0){C=0}else{if((ac|0)!=0){af=d[(c[273020]|0)+1|0]>>3&3;ag=d[(c[273020]|0)+2|0]>>2&3;if((w|0)!=0){h[844]=+h[7112+(af<<5)+(ag<<3)>>3];$=~~(+h[844]*1.0e3);ct($)|0;C=0;w=0}else{if(+h[7112+(af<<5)+(ag<<3)>>3]!=+h[844]){h[844]=+h[7112+(af<<5)+(ag<<3)>>3];$=~~(+h[844]*1.0e3);cs($)|0}}}}while(1){if((ac|0)==0){break}ae=d[(c[273020]|0)+2|0]>>4&15;if((ae|0)==0){$=c[o>>2]|0;N=c[273022]|0;at($|0,16472,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;N=c[o>>2]|0;az(N|0)|0;ac=0}else{af=d[(c[273020]|0)+1|0]>>3&3;ag=d[(c[273020]|0)+2|0]>>2&3;ah=(c[4092368+(ae<<2)>>2]|0)+(d[(c[273020]|0)+2|0]>>1&1)|0;U=d[(c[273020]|0)+3|0]>>6&3;N=(U|0)==3?1:2;if((c[266276]|0)>=(ah|0)){c[249858]=m;c[226324]=p;c[227130]=l;c[227132]=q;c[227128]=r;c[226326]=0;do{if((c[W+(X*88|0)+84>>2]&2|0)!=0){T=626}else{if((c[W+(X*88|0)+84>>2]&1|0)!=0){T=626;break}ai=1;bG()}}while(0);if((T|0)==626){T=0;ai=cT(j,c[273020]|0,ah,k)|0}if((ai|0)==0){do{if((a[908536]|0)==0){if((c[W+(X*88|0)+84>>2]&1|0)==0){break}if((cx(m|0,p|0,(c[226326]|0)/(N|0)|0,N)|0)==0){$=c[n>>2]|0;at($|0,16400,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;C=1;ac=0}}}while(0)}}if(C<<24>>24==0){c[206050]=(c[273020]|0)+ah;ac=bO(0)|0}if((c[1023264]|0)==0){N=M+1|0;M=N;if(((N>>>0)%200|0|0)==0){N=~~(+(((c[267300]|0)-((c[266276]|0)-((c[273020]|0)+ah-1092352))|0)>>>0>>>0)*100.0/+(J|0));$=J;bF(N,$)|0}}}}}if((c[1023264]|0)==0){M=c[n>>2]|0;at(M|0,16336,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}if((c[W+(X*88|0)+84>>2]&1|0)!=0){if((a[908536]|0)!=0){aj=0.0}else{aj=+cy()}}else{aj=+h[W+(X*88|0)+32>>3]}if(aj==-24601.0){M=c[o>>2]|0;U=c[e+(X<<2)>>2]|0;at(M|0,16280,(v=i,i=i+8|0,c[v>>2]=U,v)|0)|0;U=c[o>>2]|0;az(U|0)|0;c[226608]=(c[226608]|0)-1}else{aa=W+(X*88|0)|0;if((a[908536]|0)==0){do{if((c[aa>>2]|0)!=0){if((c[aa>>2]|0)==0){break}if(+P(+(aj- +h[aa+32>>3]))>=.01){T=659}}else{T=659}}while(0);if((T|0)==659){T=0;c[aa+80>>2]=1;c[aa>>2]=1;h[aa+32>>3]=aj}}do{if((c[aa+20>>2]|0)!=0){if((c[aa+20>>2]|0)==0){break}if((d[aa+76|0]|0)!=(d[r]|0)){T=665;break}if((d[aa+77|0]|0)!=(d[q]|0)){T=665}}else{T=665}}while(0);if((T|0)==665){T=0;c[aa+80>>2]=1;c[aa+20>>2]=1;a[aa+76|0]=a[r]|0;a[aa+77|0]=a[q]|0}do{if((c[aa+4>>2]|0)!=0){if((c[aa+4>>2]|0)==0){break}if(+P(+(+h[l>>3]- +h[aa+40>>3]*32768.0))>=3.3){T=669}}else{T=669}}while(0);if((T|0)==669){T=0;c[aa+80>>2]=1;c[aa+4>>2]=1;h[aa+40>>3]=+h[l>>3]/32768.0}aj=aj+I;ab=aj/(+aQ(2.0)*5.0);L=+P(+ab);if(L- +(~~+P(+ab)|0)<.5){f=~~ab}else{f=~~ab+(ab<0.0?-1:1)|0}f=f+H|0;if((D|0)!=0){U=c[o>>2]|0;M=c[e+(X<<2)>>2]|0;$=f;L=aj;K=+h[l>>3];N=d[q]|0;Z=d[r]|0;at(U|0,16248,(v=i,i=i+48|0,c[v>>2]=M,c[v+8>>2]=$,h[v+16>>3]=L,h[v+24>>3]=K,c[v+32>>2]=N,c[v+40>>2]=Z,v)|0)|0;Z=c[o>>2]|0;az(Z|0)|0}do{if((z|0)!=0){T=682}else{if((A|0)!=0){T=682;break}if((D|0)==0){Z=c[o>>2]|0;K=aj;at(Z|0,18632,(v=i,i=i+8|0,h[v>>3]=K,v)|0)|0;Z=c[o>>2]|0;N=f;at(Z|0,18144,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;K=+h[l>>3];if(K*+R(2.0,+(+(f|0)/4.0))>32767.0){N=c[o>>2]|0;at(N|0,17960,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}N=c[o>>2]|0;K=+h[l>>3];at(N|0,17896,(v=i,i=i+8|0,h[v>>3]=K,v)|0)|0;N=c[o>>2]|0;Z=d[q]|0;at(N|0,17848,(v=i,i=i+8|0,c[v>>2]=Z,v)|0)|0;Z=c[o>>2]|0;N=d[r]|0;at(Z|0,17784,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;N=c[o>>2]|0;at(N|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}}while(0);if((T|0)==682){T=0;if((z|0)!=0){w=1;if((c[266274]|0)!=0){N=c[266274]|0;ar(N|0)|0}c[266274]=0;ak=1;if((f|0)==0){N=c[o>>2]|0;Z=c[e+(X<<2)>>2]|0;at(N|0,16208,(v=i,i=i+8|0,c[v>>2]=Z,v)|0)|0;do{if((c[206796]|0)==0){if((c[W+(X*88|0)+80>>2]|0)==0){break}Z=c[o>>2]|0;N=c[e+(X<<2)>>2]|0;at(Z|0,16088,(v=i,i=i+8|0,c[v>>2]=N,v)|0)|0;bJ(c[e+(X<<2)>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0,b[414060]|0)}}while(0)}else{if((y|0)!=0){K=+aQ(+(32767.0/+h[l>>3]))*4.0;N=~~+O(+(K/+aQ(2.0)));if((f|0)>(N|0)){Z=c[o>>2]|0;$=N;M=c[e+(X<<2)>>2]|0;U=f;at(Z|0,15992,(v=i,i=i+24|0,c[v>>2]=$,c[v+8>>2]=M,c[v+16>>2]=U,v)|0)|0;f=N}}else{if((x|0)==0){K=+h[l>>3];if(K*+R(2.0,+(+(f|0)/4.0))>32767.0){if((bP(c[e+(X<<2)>>2]|0,f)|0)!=0){N=c[o>>2]|0;U=f;M=c[e+(X<<2)>>2]|0;at(N|0,15928,(v=i,i=i+16|0,c[v>>2]=U,c[v+8>>2]=M,v)|0)|0}else{ak=0}}}}if((ak|0)!=0){M=c[o>>2]|0;U=f;N=c[e+(X<<2)>>2]|0;at(M|0,15928,(v=i,i=i+16|0,c[v>>2]=U,c[v+8>>2]=N,v)|0)|0;if((c[206796]|0)!=0){N=c[e+(X<<2)>>2]|0;U=f;M=f;bI(N,U,M)|0}else{bH(c[e+(X<<2)>>2]|0,f,f,W+(X*88|0)|0,V+(X*20|0)|0)}}else{do{if((c[206796]|0)==0){if((c[W+(X*88|0)+80>>2]|0)==0){break}M=c[o>>2]|0;U=c[e+(X<<2)>>2]|0;at(M|0,15896,(v=i,i=i+8|0,c[v>>2]=U,v)|0)|0;bJ(c[e+(X<<2)>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0,b[414060]|0)}}while(0)}}}}}}else{if((c[1023432]|0)==0){U=c[o>>2]|0;M=c[e+(X<<2)>>2]|0;at(U|0,16528,(v=i,i=i+8|0,c[v>>2]=M,v)|0)|0;M=c[o>>2]|0;az(M|0)|0}}}cN(j);M=c[n>>2]|0;az(M|0)|0;M=c[o>>2]|0;az(M|0)|0;if((c[266274]|0)!=0){M=c[266274]|0;ar(M|0)|0}c[266274]=0}}}}}}X=X+1|0}do{if((c[226608]|0)>0){if((z|0)!=0){break}if((B|0)!=0){break}if((_&1|0)!=0){if((a[908536]|0)!=0){aj=0.0}else{aj=+cD()}}else{if((c[W+(Q*88|0)+8>>2]|0)!=0){aj=+h[W+(Q*88|0)+48>>3]}else{aj=+h[W+(Q*88|0)+32>>3]}}if(aj==-24601.0){j=c[o>>2]|0;at(j|0,15848,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;j=c[o>>2]|0;az(j|0)|0}else{K=0.0;j=0;l=-1;X=Q;while(1){if((X|0)>=(t|0)){break}if((c[S+(X<<2)>>2]|0)!=0){if(+h[W+(X*88|0)+40>>3]>K){K=+h[W+(X*88|0)+40>>3]}if((d[W+(X*88|0)+77|0]|0)>(j&255|0)){j=a[W+(X*88|0)+77|0]|0}if((d[W+(X*88|0)+76|0]|0)<(l&255|0)){l=a[W+(X*88|0)+76|0]|0}}X=X+1|0}do{if((c[206796]|0)==0){if((c[226608]|0)<=1){if((A|0)==0){break}}X=Q;while(1){if((X|0)>=(t|0)){break}aa=W+(X*88|0)|0;if((a[908536]|0)==0){do{if((c[aa+8>>2]|0)!=0){if((c[aa+8>>2]|0)==0){break}if(+P(+(aj- +h[aa+48>>3]))>=.01){T=762}}else{T=762}}while(0);if((T|0)==762){T=0;c[aa+80>>2]=1;c[aa+8>>2]=1;h[aa+48>>3]=aj}}do{if((c[aa+24>>2]|0)!=0){if((c[aa+24>>2]|0)==0){break}if((d[aa+78|0]|0)!=(l&255|0)){T=768;break}if((d[aa+79|0]|0)!=(j&255|0)){T=768}}else{T=768}}while(0);if((T|0)==768){T=0;c[aa+80>>2]=1;c[aa+24>>2]=1;a[aa+78|0]=l;a[aa+79|0]=j}do{if((c[aa+12>>2]|0)!=0){if((c[aa+12>>2]|0)==0){break}if(+P(+(K- +h[aa+56>>3]))>=1.0e-4){T=772}}else{T=772}}while(0);if((T|0)==772){T=0;c[aa+80>>2]=1;c[aa+12>>2]=1;h[aa+56>>3]=K}X=X+1|0}}}while(0);aj=aj+I;ab=aj/(+aQ(2.0)*5.0);L=+P(+ab);if(L- +(~~+P(+ab)|0)<.5){f=~~ab}else{f=~~ab+(ab<0.0?-1:1)|0}f=f+H|0;if((D|0)!=0){w=c[o>>2]|0;r=f;L=aj;al=K*32768.0;q=j&255;J=l&255;at(w|0,15824,(v=i,i=i+40|0,c[v>>2]=r,h[v+8>>3]=L,h[v+16>>3]=al,c[v+24>>2]=q,c[v+32>>2]=J,v)|0)|0;J=c[o>>2]|0;az(J|0)|0}if((A|0)!=0){if((y|0)!=0){al=+aQ(+K)*-4.0;J=~~+O(+(al/+aQ(2.0)));if((f|0)>(J|0)){q=c[o>>2]|0;r=J;w=f;at(q|0,15544,(v=i,i=i+16|0,c[v>>2]=r,c[v+8>>2]=w,v)|0)|0;f=J}}X=Q;while(1){if((X|0)>=(t|0)){break}if((c[S+(X<<2)>>2]|0)!=0){ak=1;if((f|0)==0){J=c[o>>2]|0;w=c[e+(X<<2)>>2]|0;at(J|0,15480,(v=i,i=i+8|0,c[v>>2]=w,v)|0)|0;do{if((c[206796]|0)==0){if((c[W+(X*88|0)+80>>2]|0)==0){break}w=c[o>>2]|0;J=c[e+(X<<2)>>2]|0;at(w|0,16088,(v=i,i=i+8|0,c[v>>2]=J,v)|0)|0;bJ(c[e+(X<<2)>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0,b[414060]|0)}}while(0)}else{if((x|0)==0){al=+h[W+(X*88|0)+40>>3];if(al*+R(2.0,+(+(f|0)/4.0))>1.0){ak=bP(c[e+(X<<2)>>2]|0,f)|0}}if((ak|0)!=0){J=c[o>>2]|0;w=f;r=c[e+(X<<2)>>2]|0;at(J|0,15928,(v=i,i=i+16|0,c[v>>2]=w,c[v+8>>2]=r,v)|0)|0;if((c[206796]|0)!=0){r=c[e+(X<<2)>>2]|0;w=f;J=f;bI(r,w,J)|0}else{bH(c[e+(X<<2)>>2]|0,f,f,W+(X*88|0)|0,V+(X*20|0)|0)}}else{do{if((c[206796]|0)==0){if((c[W+(X*88|0)+80>>2]|0)==0){break}J=c[o>>2]|0;w=c[e+(X<<2)>>2]|0;at(J|0,15896,(v=i,i=i+8|0,c[v>>2]=w,v)|0)|0;bJ(c[e+(X<<2)>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0,b[414060]|0)}}while(0)}}}X=X+1|0}}else{if((D|0)==0){l=c[o>>2]|0;K=aj;at(l|0,15768,(v=i,i=i+8|0,h[v>>3]=K,v)|0)|0;l=c[o>>2]|0;j=f;at(l|0,15712,(v=i,i=i+8|0,c[v>>2]=j,v)|0)|0;X=Q;while(1){if((X|0)>=(t|0)){break}if((c[S+(X<<2)>>2]|0)!=0){K=+h[W+(X*88|0)+40>>3];if(K*+R(2.0,+(+(f|0)/4.0))>1.0){j=c[o>>2]|0;l=c[e+(X<<2)>>2]|0;at(j|0,15632,(v=i,i=i+8|0,c[v>>2]=l,v)|0)|0}}X=X+1|0}}}}}}while(0);do{if((z|0)==0){if((A|0)!=0){break}if((E|0)!=0){break}if((F|0)!=0){break}if((c[271930]|0)!=0){break}if((c[206796]|0)!=0){break}if((c[273086]|0)!=0){break}X=Q;while(1){if((X|0)>=(t|0)){break}if((c[S+(X<<2)>>2]|0)!=0){if((c[W+(X*88|0)+80>>2]|0)!=0){bJ(c[e+(X<<2)>>2]|0,W+(X*88|0)|0,V+(X*20|0)|0,b[414060]|0)}}X=X+1|0}}}while(0);db(W);db(S);X=Q;while(1){if((X|0)>=(t|0)){break}if((c[V+(X*20|0)+4>>2]|0)!=0){if((c[(c[V+(X*20|0)+4>>2]|0)+72>>2]|0)!=0){db(c[(c[V+(X*20|0)+4>>2]|0)+72>>2]|0)}db(c[V+(X*20|0)+4>>2]|0)}if((c[V+(X*20|0)+8>>2]|0)!=0){db(c[V+(X*20|0)+8>>2]|0)}if((c[V+(X*20|0)+16>>2]|0)!=0){db(c[V+(X*20|0)+16>>2]|0)}X=X+1|0}db(V);ar(c[o>>2]|0)|0;ar(c[n>>2]|0)|0;if((c[267290]|0)!=0){s=0;am=s;i=g;return am|0}else{s=1;am=s;i=g;return am|0}return 0}function bL(a){a=a|0;var b=0;b=i;at(c[n>>2]|0,15288,(v=i,i=i+16|0,c[v>>2]=a,c[v+8>>2]=15280,v)|0)|0;i=b;return}function bM(a){a=a|0;var b=0,c=0,d=0;b=0;c=aA(a|0,16624|0)|0;if((c|0)==0){d=b;return d|0}aJ(c|0,0,2)|0;b=aN(c|0)|0;ar(c|0)|0;d=b;return d|0}function bN(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;b=a;a=0;if((b|0)<0){a=-b|0;b=0}do{if((c[1023260]|0)!=0){if((c[1023266]|0)==0){break}d=aI(1092352,1,(c[266276]|0)-b|0,c[226606]|0)|0;if((d|0)==((c[266276]|0)-b|0)){break}e=0;f=e;return f|0}}while(0);if((b|0)!=0){dk(1092352,(c[266276]|0)+1092352+(-b|0)|0,b|0)}L1187:while(1){if(a>>>0<=0){g=887;break}if(a>>>0>3e6){h=3e6}else{h=a}d=h;i=aU(1092352,1,d|0,c[266274]|0)|0;if((i|0)!=(d|0)){g=880;break}do{if((c[1023260]|0)!=0){if((c[1023266]|0)==0){break}if((aI(1092352,1,d|0,c[226606]|0)|0)!=(d|0)){g=884;break L1187}}}while(0);c[267300]=(c[267300]|0)+i;a=a-d|0}if((g|0)==880){e=0;f=e;return f|0}else if((g|0)==884){e=0;f=e;return f|0}else if((g|0)==887){i=aU(1092352+b|0,1,3e6-b|0,c[266274]|0)|0;c[267300]=(c[267300]|0)+i;c[266276]=i+b;e=i;f=e;return f|0}return 0}function bO(b){b=b|0;var e=0,f=0,g=0,j=0,k=0,l=0.0,m=0,n=0,o=0;e=i;f=b;b=0;g=1;if(((c[206050]|0)+4-1092352|0)>(c[266276]|0)){g=bN((c[266276]|0)-((c[206050]|0)-1092352)|0)|0;c[206050]=1092352;if((g|0)==0){b=1}}while(1){if(!((b|0)!=0^1)){j=950;break}b=1;if((a[c[206050]|0]&255|0)!=255){b=0}else{if((a[(c[206050]|0)+1|0]&224|0)!=224){b=0}else{if((a[(c[206050]|0)+1|0]&24|0)==8){b=0}else{if((a[(c[206050]|0)+2|0]&240|0)==240){b=0}else{if((a[(c[206050]|0)+2|0]&240|0)==0){b=0}else{if((a[(c[206050]|0)+2|0]&12|0)==12){b=0}else{if((a[(c[206050]|0)+1|0]&6|0)!=2){if((c[1023268]|0)==0){k=a[(c[206050]|0)+1|0]&6;if((k|0)==6){j=914;break}else if((k|0)==4){j=915;break}}b=0}else{if((f|0)!=0){c[267294]=a[(c[206050]|0)+1|0]&24;c[267296]=a[(c[206050]|0)+2|0]&12;k=c[267294]>>3;if((k|0)==3){l=1152.0}else{l=576.0}m=0;while(1){if((m|0)>=16){break}c[4092368+(m<<2)>>2]=~~+O(+(+O(+(l*+h[11568+(k<<7)+(m<<3)>>3]/+h[7112+(k<<5)+(c[267296]>>2<<3)>>3]))/8.0));m=m+1|0}}else{if((a[(c[206050]|0)+1|0]&24|0)!=(c[267294]|0)){b=0}else{if((a[(c[206050]|0)+2|0]&12|0)!=(c[267296]|0)){b=0}else{if((a[(c[206050]|0)+2|0]&240|0)==0){b=0}}}}}}}}}}}if((b|0)==0){c[206050]=(c[206050]|0)+1}if(((c[206050]|0)+4-1092352|0)>(c[266276]|0)){g=bN((c[266276]|0)-((c[206050]|0)-1092352)|0)|0;c[206050]=1092352;if((g|0)==0){b=1}}}if((j|0)==950){if((g|0)!=0){if(((c[266276]|0)-((c[206050]|0)-1092352)|0)<((c[4092368+(((d[(c[206050]|0)+2|0]|0)>>4&15)<<2)>>2]|0)+((d[(c[206050]|0)+2|0]|0)>>1&1)|0)){g=bN((c[266276]|0)-((c[206050]|0)-1092352)|0)|0;c[206050]=1092352}c[1023090]=0;c[273020]=c[206050]}n=g;o=n;i=e;return o|0}else if((j|0)==914){c[1023432]=1;bA(32,2,(v=i,i=i+16|0,c[v>>2]=c[273022],c[v+8>>2]=15360,v)|0);n=0;o=n;i=e;return o|0}else if((j|0)==915){c[1023432]=1;bA(32,2,(v=i,i=i+16|0,c[v>>2]=c[273022],c[v+8>>2]=15304,v)|0);n=0;o=n;i=e;return o|0}return 0}function bP(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;at(c[n>>2]|0,15432,(v=i,i=i+16|0,c[v>>2]=a,c[v+8>>2]=b,v)|0)|0;b=0;az(c[o>>2]|0)|0;az(c[n>>2]|0)|0;while(1){if((b<<24>>24|0)!=89){e=(b<<24>>24|0)!=78}else{e=0}if(!e){break}at(c[n>>2]|0,15408,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;az(c[n>>2]|0)|0;b=(aq(c[m>>2]|0)|0)&255;b=(av(b<<24>>24|0)|0)&255}if((b<<24>>24|0)==78){f=0;g=f;i=d;return g|0}else{f=1;g=f;i=d;return g|0}return 0}function bQ(){var a=0,b=0,e=0;a=1;if((d[c[206050]|0]|0|0)!=73){b=a;return b|0}if((d[(c[206050]|0)+1|0]|0|0)!=68){b=a;return b|0}if((d[(c[206050]|0)+2|0]|0|0)!=51){b=a;return b|0}if((d[(c[206050]|0)+3|0]|0|0)>=255){b=a;return b|0}if((d[(c[206050]|0)+4|0]|0|0)>=255){b=a;return b|0}e=d[(c[206050]|0)+9|0]|0|(d[(c[206050]|0)+8|0]|0)<<7|(d[(c[206050]|0)+7|0]|0)<<14|(d[(c[206050]|0)+6|0]|0)<<21;e=e+10|0;c[206050]=(c[206050]|0)+e;if(((c[206050]|0)+4-1092352|0)>(c[266276]|0)){a=bN((c[266276]|0)-((c[206050]|0)-1092352)|0)|0;c[206050]=1092352}b=a;return b|0}function bR(a){a=a|0;var b=0,d=0;b=i;d=a;bL(d);at(c[n>>2]|0,15240,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,15176,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,15128,(v=i,i=i+8|0,c[v>>2]=d,v)|0)|0;at(c[n>>2]|0,18712,(v=i,i=i+16|0,c[v>>2]=45,c[v+8>>2]=45,v)|0)|0;ar(c[o>>2]|0)|0;ar(c[n>>2]|0)|0;aO(1);i=b;return}function bS(a){a=a|0;var b=0,d=0;b=i;d=a;bL(d);at(c[n>>2]|0,15240,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,15176,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,15128,(v=i,i=i+8|0,c[v>>2]=d,v)|0)|0;at(c[n>>2]|0,15088,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,15056,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,15e3,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14944,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14872,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,14840,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,14784,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14720,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14640,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14576,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14464,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14392,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,14312,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,14248,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,14192,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14128,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14072,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,14008,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13904,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13848,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,13760,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13712,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13664,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13608,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13536,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,13496,(v=i,i=i+16|0,c[v>>2]=45,c[v+8>>2]=45,v)|0)|0;at(c[n>>2]|0,13432,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,13376,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,21248,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,21192,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,21120,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,21064,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,21008,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,20936,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,20872,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;at(c[n>>2]|0,20808,(v=i,i=i+16|0,c[v>>2]=45,c[v+8>>2]=45,v)|0)|0;at(c[n>>2]|0,20688,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;ar(c[o>>2]|0)|0;ar(c[n>>2]|0)|0;aO(0);i=b;return}function bT(){var a=0;a=i;at(c[n>>2]|0,20664,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20528,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20488,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20384,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20304,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20240,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20160,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20096,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,20040,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19968,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19872,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19736,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19656,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19600,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19536,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19456,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19376,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19272,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19248,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19176,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19088,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,19008,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,18968,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,18872,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,18824,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,17296,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;at(c[n>>2]|0,18760,(v=i,i=i+8|0,c[v>>2]=45,v)|0)|0;aO(0);i=a;return}function bU(a,b){a=a|0;b=b|0;var c=0;c=a;a=b;c=c<<8;b=0;while(1){if((b|0)>=8){break}c=c<<1;a=a<<1;if(((a^c)&65536|0)!=0){a=a^32773}b=b+1|0}return a|0}function bV(){var a=0;a=d[c[206050]|0]|0;a=(a&65535)<<8&65535;a=(a&65535|(d[(c[206050]|0)+1|0]|0))&65535;a=(a&65535)>>8-(c[1023090]|0)&65535;return a&65535&255|0}function bW(b,c){b=b|0;c=c|0;var d=0,e=0;d=b;b=c;c=0;while(1){if((a[d+c|0]|0)!=0){e=c>>>0<b>>>0}else{e=0}if(!e){break}c=c+1|0}return c|0}function bX(b){b=b|0;var e=0;e=b;e=(e&65535)<<8-(c[1023090]|0)&65535;b=c[206050]|0;a[b]=(d[b]|0)&(d[6736+(c[1023090]|0)|0]|0)&255;b=c[206050]|0;a[b]=(d[b]|0|(e&65535)>>8)&255;b=(c[206050]|0)+1|0;a[b]=(d[b]|0)&(d[6728+(c[1023090]|0)|0]|0)&255;b=(c[206050]|0)+1|0;a[b]=(d[b]|0|e&255)&255;if((c[1023260]|0)!=0){return}bZ((c[267300]|0)-((c[266276]|0)-((c[206050]|0)-1092352))|0,c[206050]|0);return}function bY(b,c){b=b|0;c=c|0;var e=0,f=0;e=b;b=c;c=65535;c=bU(d[b+2|0]|0,c)|0;c=bU(d[b+3|0]|0,c)|0;f=6;while(1){if((f|0)>=(e|0)){break}c=bU(d[b+f|0]|0,c)|0;f=f+1|0}a[b+4|0]=c>>8&255;a[b+5|0]=c&255;return}function bZ(b,d){b=b|0;d=d|0;var e=0,f=0;e=d;if((c[6048]|0)>>>0>=1e5){b_();d=c[266274]|0;f=c[267300]|0;aJ(d|0,f|0,0)|0}c[24200+(c[6048]<<3)>>2]=b;a[24204+(c[6048]<<3)|0]=a[e]|0;a[24205+(c[6048]<<3)|0]=a[e+1|0]|0;c[6048]=(c[6048]|0)+1;return}function b_(){var a=0;a=0;while(1){if(a>>>0>=(c[6048]|0)>>>0){break}aJ(c[266274]|0,c[24200+(a<<3)>>2]|0,0)|0;aI(24204+(a<<3)|0,1,2,c[266274]|0)|0;a=a+1|0}c[6048]=0;return}function b$(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+128|0;f=e|0;g=a;a=b;b=d;if((c[b>>2]|0)<128){h=0;j=h;i=e;return j|0}if((aJ(g|0,(c[b>>2]|0)-128|0,0)|0)!=0){h=0;j=h;i=e;return j|0}if((aU(f|0,1,128,g|0)|0)!=128){h=0;j=h;i=e;return j|0}if((dm(f|0,18024,3)|0)!=0){h=0;j=h;i=e;return j|0}if((c[a>>2]|0)!=0){db(c[a>>2]|0)}c[a>>2]=da(128)|0;g=c[a>>2]|0;a=f;dj(g|0,a|0,128)|0;a=b;c[a>>2]=(c[a>>2]|0)-128;h=1;j=h;i=e;return j|0}function b0(b,c){b=b|0;c=c|0;var d=0;d=b;b=c;a[d|0]=b>>>0&255;a[d+1|0]=b>>>8&255;a[d+2|0]=b>>>16&255;a[d+3|0]=b>>>24&255;return}function b1(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0;g=i;i=i+48|0;j=g|0;k=g+32|0;l=b;b=d;d=e;e=f;if((c[e>>2]|0)<32){m=0;n=m;i=g;return n|0}if((aJ(l|0,(c[e>>2]|0)-32|0,0)|0)!=0){m=0;n=m;i=g;return n|0}if((aU(j|0,1,32,l|0)|0)!=32){m=0;n=m;i=g;return n|0}if((dm(j|0,20144,8)|0)!=0){m=0;n=m;i=g;return n|0}f=b2(j+8|0)|0;do{if((f|0)!=1e3){if((f|0)==2e3){break}m=0;n=m;i=g;return n|0}}while(0);f=b2(j+12|0)|0;o=f;if(f>>>0<32){m=0;n=m;i=g;return n|0}if((aJ(l|0,(c[e>>2]|0)-o|0,0)|0)!=0){m=0;n=m;i=g;return n|0}f=da(o)|0;if((aU(f|0,1,o-32|0,l|0)|0)!=(o-32|0)){db(f);m=0;n=m;i=g;return n|0}if((c[d>>2]|0)!=0){if((c[(c[d>>2]|0)+72>>2]|0)!=0){db(c[(c[d>>2]|0)+72>>2]|0)}db(c[d>>2]|0)}c[d>>2]=da(80)|0;c[(c[d>>2]|0)+4>>2]=0;p=da(o-32|0)|0;c[(c[d>>2]|0)+72>>2]=p;c[(c[d>>2]|0)+76>>2]=0;p=(c[d>>2]|0)+40|0;q=j;dj(p|0,q|0,32)|0;q=b2(j+16|0)|0;p=q;r=q;q=0;s=f+o-32|0;t=f;while(1){if(t>>>0<s>>>0){u=p;p=u-1|0;v=(u|0)!=0}else{v=0}if(!v){break}if((s-t|0)<8){w=1064;break}u=b2(t)|0;t=t+4|0;b2(t)|0;t=t+4|0;x=s-t|0;y=bW(t,x)|0;if(y>>>0>=x>>>0){w=1068;break}if(u>>>0>1048576){w=1068;break}if((y+1+u|0)>>>0>x>>>0){w=1068;break}x=da(y+1|0)|0;z=x;A=t;B=y;dj(z|0,A|0,B)|0;a[x+y|0]=0;B=da(u+1|0)|0;A=B;z=t+y+1|0;C=u;dj(A|0,z|0,C)|0;a[B+u|0]=0;C=0;if((dq(x|0,17520)|0)!=0){if((dq(x|0,17112)|0)!=0){if((dq(x|0,16696)|0)!=0){if((dq(x|0,16168)|0)!=0){if((dq(x|0,15528)|0)!=0){if((dq(x|0,15112)|0)!=0){if((dq(x|0,14552)|0)!=0){C=(c[(c[d>>2]|0)+72>>2]|0)+(c[(c[d>>2]|0)+76>>2]|0)|0;z=t-8|0;A=y+9+u|0;dj(C|0,z|0,A)|0;A=(c[d>>2]|0)+76|0;c[A>>2]=(c[A>>2]|0)+(y+9+u);q=q+1|0}else{c[b+24>>2]=1;D=B;A=k;z=D;a[A]=a[z]|0;a[A+1|0]=a[z+1|0]|0;a[A+2|0]=a[z+2|0]|0;a[k+3|0]=0;a[b+78|0]=(aZ(k|0)|0)&255;D=D+4|0;z=k;A=D;a[z]=a[A]|0;a[z+1|0]=a[A+1|0]|0;a[z+2|0]=a[A+2|0]|0;a[k+3|0]=0;a[b+79|0]=(aZ(k|0)|0)&255}}else{c[b+20>>2]=1;D=B;A=k;z=D;a[A]=a[z]|0;a[A+1|0]=a[z+1|0]|0;a[A+2|0]=a[z+2|0]|0;a[k+3|0]=0;a[b+76|0]=(aZ(k|0)|0)&255;D=D+4|0;z=k;A=D;a[z]=a[A]|0;a[z+1|0]=a[A+1|0]|0;a[z+2|0]=a[A+2|0]|0;a[k+3|0]=0;a[b+77|0]=(aZ(k|0)|0)&255}}else{c[b+16>>2]=1;D=B;A=k;z=D;a[A]=a[z]|0;a[A+1|0]=a[z+1|0]|0;a[A+2|0]=a[z+2|0]|0;a[A+3|0]=a[z+3|0]|0;a[k+4|0]=0;c[b+64>>2]=aZ(k|0)|0;D=D+5|0;z=k;A=D;a[z]=a[A]|0;a[z+1|0]=a[A+1|0]|0;a[z+2|0]=a[A+2|0]|0;a[z+3|0]=a[A+3|0]|0;a[k+4|0]=0;c[b+68>>2]=aZ(k|0)|0;D=D+5|0;do{if((a[D]|0)==119){w=1080}else{if((a[D]|0)==87){w=1080;break}c[b+72>>2]=0}}while(0);if((w|0)==1080){w=0;c[b+72>>2]=1}}}else{c[b+12>>2]=1;h[b+56>>3]=+de(B)}}else{c[b+8>>2]=1;h[b+48>>3]=+de(B)}}else{c[b+4>>2]=1;h[b+40>>3]=+de(B)}}else{c[b>>2]=1;h[b+32>>3]=+de(B)}do{if(y>>>0>0){if(u>>>0<=0){break}}}while(0);db(B);db(x);t=t+(y+1+u)|0}db(f);f=e;c[f>>2]=(c[f>>2]|0)-o;c[c[d>>2]>>2]=o;if(((b2(j+20|0)|0)&-2147483648|0)!=0){j=e;c[j>>2]=(c[j>>2]|0)-32;j=l;o=c[e>>2]|0;aJ(j|0,o|0,0)|0;o=(c[d>>2]|0)+8|0;j=l;aU(o|0,1,32,j|0)|0;c[(c[d>>2]|0)+4>>2]=1;j=c[d>>2]|0;c[j>>2]=(c[j>>2]|0)+32}if((q|0)!=(r|0)){b0((c[d>>2]|0)+52|0,(c[(c[d>>2]|0)+76>>2]|0)+32|0);b0((c[d>>2]|0)+56|0,q);if((c[(c[d>>2]|0)+4>>2]|0)!=0){b0((c[d>>2]|0)+20|0,(c[(c[d>>2]|0)+76>>2]|0)+32|0);b0((c[d>>2]|0)+24|0,q)}}m=1;n=m;i=g;return n|0}function b2(a){a=a|0;return b8(a)|0}function b3(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;e=a;a=a8(e|0,2,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;if((a|0)<0){f=0;g=f;i=d;return g|0}if((bc(a|0,b|0)|0)!=0){b=a;ay(b|0)|0;bA(1,3,(v=i,i=i+24|0,c[v>>2]=13824,c[v+8>>2]=e,c[v+16>>2]=21184,v)|0);f=0;g=f;i=d;return g|0}else{e=a;ay(e|0)|0;f=1;g=f;i=d;return g|0}return 0}function b4(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+8|0;f=e|0;g=b;b=d;d=aA(a|0,20480)|0;if((d|0)==0){h=0;j=h;i=e;return j|0}aJ(d|0,0,2)|0;c[f>>2]=aN(d|0)|0;c[b+12>>2]=0;do{a=c[f>>2]|0;b1(d,g,b+4|0,f)|0;b5(d,b+8|0,b+12|0,b+16|0,f)|0;b$(d,b+16|0,f)|0;}while((a|0)!=(c[f>>2]|0));c[b>>2]=c[f>>2];ar(d|0)|0;h=1;j=h;i=e;return j|0}function b5(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+160|0;h=g|0;j=g+16|0;k=g+144|0;l=a;a=b;b=d;d=e;e=f;if((c[e>>2]|0)<128){m=0;n=m;i=g;return n|0}if((aJ(l|0,(c[e>>2]|0)-128|0,0)|0)!=0){m=0;n=m;i=g;return n|0}if((aU(j|0,1,128,l|0)|0)!=128){m=0;n=m;i=g;return n|0}if((dm(j|0,18024,3)|0)!=0){m=0;n=m;i=g;return n|0}if((c[d>>2]|0)!=0){db(c[d>>2]|0)}c[d>>2]=da(128)|0;f=c[d>>2]|0;d=j;dj(f|0,d|0,128)|0;if((aJ(l|0,(c[e>>2]|0)-128-15|0,0)|0)!=0){m=0;n=m;i=g;return n|0}if((aU(h|0,1,15,l|0)|0)!=15){m=0;n=m;i=g;return n|0}if((dm(h+6|0,17624,9)|0)!=0){m=0;n=m;i=g;return n|0}d=b7(h|0)|0;if((aJ(l|0,(c[e>>2]|0)-128-15-d|0,0)|0)!=0){m=0;n=m;i=g;return n|0}if((aU(k|0,1,11,l|0)|0)!=11){m=0;n=m;i=g;return n|0}if((dm(k|0,17552,11)|0)!=0){m=0;n=m;i=g;return n|0}k=(b7(h|0)|0)+143|0;h=e;c[h>>2]=(c[h>>2]|0)-k;if((c[a>>2]|0)!=0){db(c[a>>2]|0)}c[a>>2]=da(k)|0;aJ(l|0,c[e>>2]|0,0)|0;aU(c[a>>2]|0,1,k|0,l|0)|0;c[b>>2]=k;m=1;n=m;i=g;return n|0}function b6(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,w=0,x=0.0;j=i;i=i+168|0;k=j|0;l=j+104|0;m=j+136|0;n=b;b=e;e=f;f=g;if((f|0)!=0){bD(n,0)}g=64;o=0;p=0;if((c[e+4>>2]|0)!=0){g=g+(c[(c[e+4>>2]|0)+76>>2]|0)|0;o=o+(b2((c[e+4>>2]|0)+56|0)|0)|0}if((c[b+8>>2]|0)!=0){p=p+42|0;o=o+1|0}if((c[b+12>>2]|0)!=0){p=p+38|0;o=o+1|0}if((c[b>>2]|0)!=0){p=p+42|0;o=o+1|0}if((c[b+4>>2]|0)!=0){p=p+38|0;o=o+1|0}if((c[b+20>>2]|0)!=0){p=p+30|0;o=o+1|0}if((c[b+24>>2]|0)!=0){p=p+36|0;o=o+1|0}if((c[b+16>>2]|0)!=0){p=p+32|0;o=o+1|0}g=g+p|0;p=da(g-64|0)|0;q=p;if((c[e+4>>2]|0)!=0){do{if((c[c[e+4>>2]>>2]|0)>>>0>g>>>0){if((b3(n,c[e>>2]|0)|0)!=0){break}r=0;s=r;i=j;return s|0}}while(0);t=l;u=(c[e+4>>2]|0)+40|0;dj(t|0,u|0,32)|0;b0(l+12|0,g-32|0);b0(l+16|0,o);if((c[(c[e+4>>2]|0)+4>>2]|0)!=0){u=m;t=(c[e+4>>2]|0)+8|0;dj(u|0,t|0,32)|0;b0(m+12|0,g-32|0);b0(m+16|0,o)}else{t=m|0;dj(t|0,20144,8)|0;b0(m+8|0,2e3);b0(m+12|0,g-32|0);b0(m+16|0,o);b0(m+20|0,-1610612736);di(m+24|0,0,8);b0(l+20|0,b2(l+20|0)|0|-2147483648)}if((c[(c[e+4>>2]|0)+76>>2]|0)!=0){t=p;u=c[(c[e+4>>2]|0)+72>>2]|0;w=c[(c[e+4>>2]|0)+76>>2]|0;dj(t|0,u|0,w)|0;q=q+(c[(c[e+4>>2]|0)+76>>2]|0)|0}}else{w=m|0;dj(w|0,20144,8)|0;b0(m+8|0,2e3);b0(m+12|0,g-32|0);b0(m+16|0,o);b0(m+20|0,-1610612736);di(m+24|0,0,8);w=l|0;dj(w|0,20144,8)|0;b0(l+8|0,2e3);b0(l+12|0,g-32|0);b0(l+16|0,o);b0(l+20|0,-2147483648);di(l+24|0,0,8)}if((c[b+20>>2]|0)!=0){b0(q,7);q=q+4|0;b0(q,0);q=q+4|0;w=q;dl(w|0,15112)|0;q=q+15|0;w=q;u=d[b+76|0]|0;aP(w|0,19648,(v=i,i=i+8|0,c[v>>2]=u,v)|0)|0;a[q+3|0]=44;q=q+4|0;u=k|0;w=d[b+77|0]|0;aP(u|0,19648,(v=i,i=i+8|0,c[v>>2]=w,v)|0)|0;w=q;u=k;a[w]=a[u]|0;a[w+1|0]=a[u+1|0]|0;a[w+2|0]=a[u+2|0]|0;q=q+3|0}if((c[b+24>>2]|0)!=0){b0(q,7);q=q+4|0;b0(q,0);q=q+4|0;u=q;dl(u|0,14552)|0;q=q+21|0;u=q;w=d[b+78|0]|0;aP(u|0,19648,(v=i,i=i+8|0,c[v>>2]=w,v)|0)|0;a[q+3|0]=44;q=q+4|0;w=k|0;u=d[b+79|0]|0;aP(w|0,19648,(v=i,i=i+8|0,c[v>>2]=u,v)|0)|0;u=q;w=k;a[u]=a[w]|0;a[u+1|0]=a[w+1|0]|0;a[u+2|0]=a[w+2|0]|0;q=q+3|0}if((c[b+16>>2]|0)!=0){b0(q,11);q=q+4|0;b0(q,0);q=q+4|0;w=q;dl(w|0,15528)|0;q=q+13|0;w=q;u=c[b+64>>2]|0;aP(w|0,18960,(v=i,i=i+8|0,c[v>>2]=u,v)|0)|0;a[q+4|0]=44;q=q+5|0;u=q;w=c[b+68>>2]|0;aP(u|0,18960,(v=i,i=i+8|0,c[v>>2]=w,v)|0)|0;a[q+4|0]=44;q=q+5|0;if((c[b+72>>2]|0)!=0){a[q]=87}else{a[q]=78}q=q+1|0}if((c[b>>2]|0)!=0){b0(q,12);q=q+4|0;b0(q,0);q=q+4|0;w=q;dl(w|0,17520)|0;q=q+22|0;w=k|0;x=+h[b+32>>3];aP(w|0,18584,(v=i,i=i+8|0,h[v>>3]=x,v)|0)|0;w=q;u=k;dj(w|0,u|0,9)|0;q=q+9|0;u=q;a[u]=a[18064]|0;a[u+1|0]=a[18065|0]|0;a[u+2|0]=a[18066|0]|0;q=q+3|0}if((c[b+4>>2]|0)!=0){b0(q,8);q=q+4|0;b0(q,0);q=q+4|0;u=q;dl(u|0,17112)|0;q=q+22|0;u=k|0;x=+h[b+40>>3];aP(u|0,17952,(v=i,i=i+8|0,h[v>>3]=x,v)|0)|0;u=q;w=k;dj(u|0,w|0,8)|0;q=q+8|0}if((c[b+8>>2]|0)!=0){b0(q,12);q=q+4|0;b0(q,0);q=q+4|0;w=q;dl(w|0,16696)|0;q=q+22|0;w=k|0;x=+h[b+48>>3];aP(w|0,18584,(v=i,i=i+8|0,h[v>>3]=x,v)|0)|0;w=q;u=k;dj(w|0,u|0,9)|0;q=q+9|0;u=q;a[u]=a[18064]|0;a[u+1|0]=a[18065|0]|0;a[u+2|0]=a[18066|0]|0;q=q+3|0}if((c[b+12>>2]|0)!=0){b0(q,8);q=q+4|0;b0(q,0);q=q+4|0;u=q;dl(u|0,16168)|0;q=q+22|0;u=k|0;x=+h[b+56>>3];aP(u|0,17952,(v=i,i=i+8|0,h[v>>3]=x,v)|0)|0;u=q;b=k;dj(u|0,b|0,8)|0;q=q+8|0}q=aA(n|0,17888)|0;if((q|0)==0){bA(1,3,(v=i,i=i+24|0,c[v>>2]=17824,c[v+8>>2]=n,c[v+16>>2]=17768,v)|0);r=0;s=r;i=j;return s|0}aJ(q|0,c[e>>2]|0,0)|0;if(o>>>0>0){o=m;m=q;aI(o|0,1,32,m|0)|0;m=p;o=g-64|0;g=q;aI(m|0,1,o|0,g|0)|0;g=l;l=q;aI(g|0,1,32,l|0)|0}if((c[e+12>>2]|0)>>>0>0){l=c[e+8>>2]|0;g=c[e+12>>2]|0;o=q;aI(l|0,1,g|0,o|0)|0}else{if((c[e+16>>2]|0)!=0){o=c[e+16>>2]|0;e=q;aI(o|0,1,128,e|0)|0}}ar(q|0)|0;if((f|0)!=0){bD(n,1)}db(p);r=1;s=r;i=j;return s|0}function b7(a){a=a|0;var b=0;b=a;return(((d[b|0]|0)-48|0)*1e5|0)+(((d[b+1|0]|0)-48|0)*1e4|0)+(((d[b+2|0]|0)-48|0)*1e3|0)+(((d[b+3|0]|0)-48|0)*100|0)+(((d[b+4|0]|0)-48|0)*10|0)+((d[b+5|0]|0)-48)|0}function b8(a){a=a|0;var b=0;b=a;return(d[b|0]|0)<<0|(d[b+1|0]|0)<<8|(d[b+2|0]|0)<<16|(d[b+3|0]|0)<<24|0}function b9(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+112|0;e=d|0;f=d+88|0;g=a;a=b;c[e+80>>2]=0;c[e+8>>2]=0;c[e+12>>2]=0;c[e>>2]=0;c[e+4>>2]=0;c[e+20>>2]=0;c[e+24>>2]=0;c[e+16>>2]=0;c[f+4>>2]=0;c[f+16>>2]=0;c[f+8>>2]=0;c[f+12>>2]=0;b4(g,e,f)|0;do{if((c[e+8>>2]|0)!=0){h=1246}else{if((c[e+12>>2]|0)!=0){h=1246;break}if((c[e>>2]|0)!=0){h=1246;break}if((c[e+4>>2]|0)!=0){h=1246;break}if((c[e+20>>2]|0)!=0){h=1246;break}if((c[e+24>>2]|0)!=0){h=1246;break}if((c[e+16>>2]|0)!=0){h=1246}}}while(0);if((h|0)==1246){c[e+80>>2]=1}c[e+8>>2]=0;c[e+12>>2]=0;c[e>>2]=0;c[e+4>>2]=0;c[e+20>>2]=0;c[e+24>>2]=0;c[e+16>>2]=0;if((c[e+80>>2]|0)==0){i=d;return 1}b6(g,e,f,a)|0;i=d;return 1}function ca(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0;d=i;i=i+24|0;e=d|0;f=a;a=b;b=aA(f|0,17840)|0;if((b|0)==0){bA(1,3,(v=i,i=i+24|0,c[v>>2]=19952,c[v+8>>2]=f,c[v+16>>2]=17512,v)|0);g=-5;h=g;i=d;return h|0}j=cb(b,e)|0;ar(b|0)|0;if((j|0)==-6){bA(1,3,(v=i,i=i+24|0,c[v>>2]=17096,c[v+8>>2]=f,c[v+16>>2]=17512,v)|0)}if((j|0)==1){f=c[e+16>>2]|0;while(1){if((f|0)==0){break}cc(f,a)|0;cd(f,a)|0;f=c[f>>2]|0}ce(c[e+16>>2]|0)}g=j;h=g;i=d;return h|0}function cb(b,c){b=b|0;c=c|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;e=i;i=i+32|0;f=e|0;g=b;b=c;c=0;aJ(g|0,0,0)|0;h=cn(g,b)|0;if((h|0)==0){j=g;aJ(j|0,0,2)|0;j=aN(g|0)|0;L1692:while(1){if(j>>>0<=128){break}aJ(g|0,j-10|0,0)|0;if((aU(f|0,1,10,g|0)|0)!=10){k=1269;break}do{if((dm(f|0,17176,3)|0)==0){if((d[f+3|0]|0|0)!=4){break}if(((d[f+6|0]|0|(d[f+7|0]|0)|(d[f+8|0]|0)|(d[f+9|0]|0))&128|0)!=0){break}l=co(f+6|0)|0;if((l+20|0)>>>0<j>>>0){k=1274;break L1692}}}while(0);aJ(g|0,j-128|0,0)|0;if((aU(f|0,1,3,g|0)|0)!=3){k=1277;break}if((dm(f|0,17160,3)|0)!=0){m=g;n=j-32|0;aJ(m|0,n|0,0)|0;if((aU(f|0,1,32,g|0)|0)!=32){k=1297;break}if((dm(f|0,17072,8)|0)!=0){k=1305;break}l=d[f+12|0]|0|(d[f+13|0]|0)<<8|(d[f+14|0]|0)<<16|(d[f+15|0]|0)<<24;if((a[f+23|0]&128|0)!=0){l=l+32|0}if(l>>>0<32){k=1304;break}if(l>>>0>=j>>>0){k=1304;break}j=j-l|0;continue}j=j-128|0;c=j;if(j>>>0>26){n=g;m=j-15|0;aJ(n|0,m|0,0)|0;if((aU(f|0,1,15,g|0)|0)!=15){k=1281;break}if((dm(f+6|0,17136,9)|0)==0){l=0;m=0;while(1){if((m|0)>=6){break}if((d[f+m|0]|0|0)<48){k=1287;break}if((d[f+m|0]|0|0)>57){k=1287;break}l=(l*10|0)+((d[f+m|0]|0)-48)|0;m=m+1|0}if((k|0)==1287){k=0;l=0}do{if(l>>>0>=11){if((l+15|0)>>>0>=j>>>0){break}j=j-(l+15)|0}}while(0)}}}if((k|0)==1304){k=1305}else if((k|0)==1277){o=-6;p=o;i=e;return p|0}else if((k|0)==1269){o=-6;p=o;i=e;return p|0}else if((k|0)==1281){o=-6;p=o;i=e;return p|0}else if((k|0)==1274){j=j-(l+20)|0;aJ(g|0,j|0,0)|0;h=cn(g,b)|0}else if((k|0)==1297){o=-6;p=o;i=e;return p|0}}do{if((h|0)==0){if((c|0)==0){break}k=g;j=c;aJ(k|0,j|0,0)|0;h=cr(g,b)|0}}while(0);o=h;p=o;i=e;return p|0}function cc(b,e){b=b|0;e=e|0;var f=0,g=0,i=0,j=0,k=0,l=0,m=0.0,n=0,o=0.0;f=b;b=e;if((dm(f+4|0,17616,4)|0)!=0){g=0;i=g;return i|0}e=c[f+16>>2]|0;do{if((e+6|0)>>>0<=(c[f+12>>2]|0)>>>0){if((dm((c[f+20>>2]|0)+e|0,17280,6)|0)!=0){if((dm((c[f+20>>2]|0)+e|0,17248,6)|0)!=0){j=1323;break}}k=0;e=e+6|0}else{j=1323}}while(0);L1763:do{if((j|0)==1323){do{if((e+6|0)>>>0<=(c[f+12>>2]|0)>>>0){if((dm((c[f+20>>2]|0)+e|0,17232,6)|0)!=0){if((dm((c[f+20>>2]|0)+e|0,17216,6)|0)!=0){break}}k=1;e=e+6|0;break L1763}}while(0);g=0;i=g;return i|0}}while(0);while(1){if((e+4|0)>>>0>(c[f+12>>2]|0)>>>0){break}l=d[(c[f+20>>2]|0)+e|0]|0;m=+(a[(c[f+20>>2]|0)+(e+1)|0]<<8|d[(c[f+20>>2]|0)+(e+2)|0]|0)/512.0;n=d[(c[f+20>>2]|0)+(e+3)|0]|0;if((e+4+((n+7|0)/8|0)|0)>>>0>(c[f+12>>2]|0)>>>0){j=1332;break}o=0.0;if((n|0)>0){o=o+ +((d[(c[f+20>>2]|0)+(e+4)|0]|0)>>>0)}if((n|0)>8){o=o+ +((d[(c[f+20>>2]|0)+(e+5)|0]|0)>>>0)/256.0}if((n|0)>16){o=o+ +((d[(c[f+20>>2]|0)+(e+6)|0]|0)>>>0)/65536.0}if((n|0)>0){o=o/+(1<<(n-1&7)|0)}e=e+(((n+7|0)/8|0)+4)|0;if((l|0)==1){if((b|0)!=0){if((k|0)!=0){c[b+8>>2]=1;h[b+48>>3]=m;c[b+12>>2]=(n|0)>0;h[b+56>>3]=o}else{c[b>>2]=1;h[b+32>>3]=m;c[b+4>>2]=(n|0)>0;h[b+40>>3]=o}}}}g=1;i=g;return i|0}function cd(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;f=i;i=i+88|0;g=f|0;h=f+64|0;j=f+72|0;k=f+80|0;l=b;b=e;if((dm(l+4|0,15520,4)|0)!=0){m=0;n=m;i=f;return n|0}e=c[l+16>>2]|0;do{if(e>>>0<(c[l+12>>2]|0)>>>0){if((d[(c[l+20>>2]|0)+e|0]|0)!=0){if((d[(c[l+20>>2]|0)+e|0]|0)!=3){break}}e=e+1|0;if(((c[l+12>>2]|0)-e+1|0)>>>0<64){o=(c[l+12>>2]|0)-e|0}else{o=62}p=o;q=g;r=(c[l+20>>2]|0)+e|0;s=p;dj(q|0,r|0,s)|0;a[g+p|0]=0;a[g+(p+1)|0]=0;if((dq(g|0,20464)|0)==0){do{if((am(g+(dg(g|0)|0)+1|0,17352,(v=i,i=i+24|0,c[v>>2]=h,c[v+8>>2]=j,c[v+16>>2]=k,v)|0)|0)==3){if((b|0)==0){break}c[b+16>>2]=1;c[b+64>>2]=c[h>>2];c[b+68>>2]=c[j>>2];if((a[k]|0)==119){t=1}else{t=(a[k]|0)==87}c[b+72>>2]=t&1}}while(0);m=1;n=m;i=f;return n|0}if((dq(g|0,14536)|0)==0){do{if((am(g+(dg(g|0)|0)+1|0,17304,(v=i,i=i+16|0,c[v>>2]=h,c[v+8>>2]=j,v)|0)|0)==2){if((b|0)==0){break}c[b+20>>2]=1;a[b+76|0]=c[h>>2]&255;a[b+77|0]=c[j>>2]&255}}while(0);m=1;n=m;i=f;return n|0}if((dq(g|0,13800)|0)!=0){m=0;n=m;i=f;return n|0}do{if((am(g+(dg(g|0)|0)+1|0,17304,(v=i,i=i+16|0,c[v>>2]=h,c[v+8>>2]=j,v)|0)|0)==2){if((b|0)==0){break}c[b+24>>2]=1;a[b+78|0]=c[h>>2]&255;a[b+79|0]=c[j>>2]&255}}while(0);m=1;n=m;i=f;return n|0}}while(0);m=0;n=m;i=f;return n|0}function ce(a){a=a|0;var b=0;b=a;while(1){if((b|0)==0){break}a=b;b=c[b>>2]|0;db(c[a+20>>2]|0);db(a)}return}function cf(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;i=i+56|0;g=f|0;j=f+32|0;k=a;a=b;b=e;if((b|0)!=0){bD(k,0)}e=aA(k|0,17840)|0;if((e|0)==0){bA(1,3,(v=i,i=i+24|0,c[v>>2]=19952,c[v+8>>2]=k,c[v+16>>2]=17512,v)|0);l=-5;m=l;i=f;return m|0}n=cb(e,j)|0;o=n;if((o|0)==(-6|0)){bA(1,3,(v=i,i=i+24|0,c[v>>2]=17096,c[v+8>>2]=k,c[v+16>>2]=17512,v)|0)}else if((o|0)==(-8|0)){bA(1,3,(v=i,i=i+24|0,c[v>>2]=16664,c[v+8>>2]=k,c[v+16>>2]=17512,v)|0)}if((n|0)<0){o=e;ar(o|0)|0;l=n;m=l;i=f;return m|0}if((n|0)==0){c[j>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;c[j+12>>2]=0;c[j+16>>2]=0}o=0;p=j+16|0;while(1){q=c[p>>2]|0;r=q;if((q|0)==0){break}do{if((cc(r,0)|0)==1){s=1409}else{if((cd(r,0)|0)==1){s=1409;break}p=c[p>>2]|0}}while(0);if((s|0)==1409){s=0;o=1;c[p>>2]=c[r>>2];db(c[r+20>>2]|0);db(r)}}if((c[a>>2]|0)!=0){o=1;r=cg(0,+h[a+32>>3],c[a+4>>2]|0,+h[a+40>>3])|0;c[p>>2]=r;p=r|0}if((c[a+8>>2]|0)!=0){o=1;r=cg(1,+h[a+48>>3],c[a+12>>2]|0,+h[a+56>>3])|0;c[p>>2]=r;p=r|0}if((c[a+20>>2]|0)!=0){o=1;s=g|0;q=d[a+76|0]|0;t=d[a+77|0]|0;aP(s|0,16152,(v=i,i=i+16|0,c[v>>2]=q,c[v+8>>2]=t,v)|0)|0;r=cj(15520,15104,(v=i,i=i+32|0,c[v>>2]=0,c[v+8>>2]=14536,c[v+16>>2]=0,c[v+24>>2]=g,v)|0)|0;c[p>>2]=r;p=r|0}if((c[a+24>>2]|0)!=0){o=1;t=g|0;q=d[a+78|0]|0;s=d[a+79|0]|0;aP(t|0,16152,(v=i,i=i+16|0,c[v>>2]=q,c[v+8>>2]=s,v)|0)|0;r=cj(15520,15104,(v=i,i=i+32|0,c[v>>2]=0,c[v+8>>2]=13800,c[v+16>>2]=0,c[v+24>>2]=g,v)|0)|0;c[p>>2]=r;p=r|0}if((c[a+16>>2]|0)!=0){o=1;s=g|0;q=c[a+64>>2]|0;t=c[a+68>>2]|0;u=(c[a+72>>2]|0)!=0?87:78;aP(s|0,21168,(v=i,i=i+24|0,c[v>>2]=q,c[v+8>>2]=t,c[v+16>>2]=u,v)|0)|0;r=cj(15520,15104,(v=i,i=i+32|0,c[v>>2]=0,c[v+8>>2]=20464,c[v+16>>2]=0,c[v+24>>2]=g,v)|0)|0;c[p>>2]=r;p=r|0}if((o|0)==0){o=e;ar(o|0)|0;ce(c[j+16>>2]|0);l=0;m=l;i=f;return m|0}o=da((dg(k|0)|0)+5|0)|0;dl(o|0,k|0)|0;dh(o|0,19640)|0;r=aA(o|0,18952)|0;if((r|0)==0){bA(1,3,(v=i,i=i+24|0,c[v>>2]=18552,c[v+8>>2]=o,c[v+16>>2]=17512,v)|0);p=e;ar(p|0)|0;db(o);ce(c[j+16>>2]|0);l=-2;m=l;i=f;return m|0}n=ck(r,j)|0;if((n|0)>=0){if((c[j+8>>2]|0)==0){n=cl(e,r,0,-1)|0}else{n=cl(e,r,0,c[j>>2]|0)|0;if((n|0)>=0){n=cl(e,r,(c[j>>2]|0)+(c[j+4>>2]|0)|0,-1)|0}}}ar(r|0)|0;ar(e|0)|0;ce(c[j+16>>2]|0);j=n;if((j|0)==(-7|0)){bA(1,3,(v=i,i=i+24|0,c[v>>2]=18048,c[v+8>>2]=o,c[v+16>>2]=17512,v)|0)}else if((j|0)==(-6|0)){bA(1,3,(v=i,i=i+24|0,c[v>>2]=17096,c[v+8>>2]=k,c[v+16>>2]=17512,v)|0)}if((n|0)<0){j=o;a6(j|0)|0;db(o);l=n;m=l;i=f;return m|0}n=1;if((al(o|0,k|0)|0)!=0){j=o;a6(j|0)|0;bA(1,5,(v=i,i=i+40|0,c[v>>2]=17936,c[v+8>>2]=o,c[v+16>>2]=17880,c[v+24>>2]=k,c[v+32>>2]=17512,v)|0);n=-4}else{if((b|0)!=0){bD(k,1)}}db(o);l=n;m=l;i=f;return m|0}function cg(a,b,d,e){a=a|0;b=+b;d=d|0;e=+e;var f=0,g=0.0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;g=b;h=d;b=e;d=(a|0)!=0?17816:17760;if(g<=-64.0){j=-32768}else{if(g>=64.0){k=32767}else{k=~~(g*512.0)}j=k}k=j;if((k|0)<-32768){k=-32768}if((k|0)>32767){k=32767}if((h|0)==0){l=cj(17616,17456,(v=i,i=i+40|0,c[v>>2]=d,c[v+8>>2]=0,c[v+16>>2]=1,c[v+24>>2]=k,c[v+32>>2]=0,v)|0)|0;m=l;i=f;return m|0}if(b<=0.0){n=0}else{if(b>=2.0){o=65535}else{o=~~(b*32768.0)}n=o}o=n;if(o>>>0>65535){o=65535}l=cj(17616,17544,(v=i,i=i+48|0,c[v>>2]=d,c[v+8>>2]=0,c[v+16>>2]=1,c[v+24>>2]=k,c[v+32>>2]=16,c[v+40>>2]=o,v)|0)|0;m=l;i=f;return m|0}function ch(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;f=b;b=c;c=e;e=0;g=0;while(1){if(g>>>0>=c>>>0){break}if((f|0)!=0){a[f+e|0]=a[b+g|0]|0}e=e+1|0;L1971:do{if((d[b+g|0]|0|0)==255){do{if((g+1|0)!=(c|0)){if((d[b+(g+1)|0]|0|0)==0){break}if((a[b+(g+1)|0]&224|0)!=224){break L1971}}}while(0);if((f|0)!=0){a[f+e|0]=0}e=e+1|0}}while(0);g=g+1|0}return e|0}function ci(b,c){b=b|0;c=c|0;var d=0;d=b;b=c;a[d|0]=b>>>21&127;a[d+1|0]=b>>>14&127;a[d+2|0]=b>>>7&127;a[d+3|0]=b&127;return}function cj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+16|0;g=f|0;h=b;b=d;d=g|0;c[d>>2]=e;c[d+4>>2]=0;d=0;j=b;while(1){if((a[j]|0)==0){break}k=a[j]|0;if((k|0)==115){l=g|0;m=(v=c[l+4>>2]|0,c[l+4>>2]=v+8,c[(c[l>>2]|0)+v>>2]|0);d=d+(dg(m|0)|0)|0}else if((k|0)==98){l=g|0;n=(v=c[l+4>>2]|0,c[l+4>>2]=v+8,c[(c[l>>2]|0)+v>>2]|0);d=d+1|0}else if((k|0)==104){k=g|0;n=(v=c[k+4>>2]|0,c[k+4>>2]=v+8,c[(c[k>>2]|0)+v>>2]|0);d=d+2|0}else{o=1496;break}j=j+1|0}if((o|0)==1496){p=0;q=p;i=f;return q|0}k=da(24)|0;c[k>>2]=0;dr(k+4|0,h|0,4)|0;c[k+8>>2]=0;c[k+12>>2]=d;c[k+16>>2]=0;c[k+20>>2]=da(d)|0;h=g|0;c[h>>2]=e;c[h+4>>2]=0;d=0;j=b;while(1){if((a[j]|0)==0){o=1508;break}b=a[j]|0;if((b|0)==98){h=g|0;n=(v=c[h+4>>2]|0,c[h+4>>2]=v+8,c[(c[h>>2]|0)+v>>2]|0);a[(c[k+20>>2]|0)+d|0]=n&255;d=d+1|0}else if((b|0)==115){h=g|0;m=(v=c[h+4>>2]|0,c[h+4>>2]=v+8,c[(c[h>>2]|0)+v>>2]|0);h=dg(m|0)|0;e=(c[k+20>>2]|0)+d|0;l=m;r=h;dj(e|0,l|0,r)|0;d=d+h|0}else if((b|0)==104){b=g|0;n=(v=c[b+4>>2]|0,c[b+4>>2]=v+8,c[(c[b>>2]|0)+v>>2]|0);a[(c[k+20>>2]|0)+d|0]=n>>>8&255;a[(c[k+20>>2]|0)+(d+1)|0]=n&255;d=d+2|0}else{o=1505;break}j=j+1|0}if((o|0)==1505){p=0;q=p;i=f;return q|0}else if((o|0)==1508){p=k;q=p;i=f;return q|0}return 0}function ck(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=b;b=d;if((c[b+16>>2]|0)==0){f=0;g=f;return g|0}d=10;h=c[b+16>>2]|0;while(1){if((h|0)==0){break}d=d+10|0;d=d+(ch(0,c[h+20>>2]|0,c[h+12>>2]|0)|0)|0;h=c[h>>2]|0}d=d+2047&-2048;i=dc(d,1)|0;a[i|0]=73;a[i+1|0]=68;a[i+2|0]=51;a[i+3|0]=4;a[i+4|0]=0;a[i+5|0]=(128|c[b+12>>2]&32)&255;ci(i+6|0,d-10|0);j=10;h=c[b+16>>2]|0;while(1){if((h|0)==0){break}b=c[h+8>>2]&-3;k=i+j|0;l=h+4|0;a[k]=a[l]|0;a[k+1|0]=a[l+1|0]|0;a[k+2|0]=a[l+2|0]|0;a[k+3|0]=a[l+3|0]|0;l=ch(i+j+10|0,c[h+20>>2]|0,c[h+12>>2]|0)|0;ci(i+j+4|0,l);if((l|0)!=(c[h+12>>2]|0)){b=b|2}a[i+(j+8)|0]=b>>>8&255;a[i+(j+9)|0]=b&255;j=j+(l+10)|0;h=c[h>>2]|0}if((aI(i|0,1,d|0,e|0)|0)!=(d|0)){db(i);f=-7;g=f;return g|0}else{db(i);f=1;g=f;return g|0}return 0}function cl(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=a;a=b;b=d;d=1;f=da(65536)|0;if((aJ(e|0,c|0,0)|0)!=0){d=-6}while(1){if((d|0)==1){g=(b|0)!=0}else{g=0}if(!g){h=1555;break}do{if((b|0)>0){if((b|0)>=65536){h=1541;break}i=b}else{h=1541}}while(0);if((h|0)==1541){h=0;i=65536}c=i;c=aU(f|0,1,c|0,e|0)|0;if((c|0)==0){h=1543;break}if((aI(f|0,1,c|0,a|0)|0)!=(c|0)){h=1548;break}if((b|0)>0){b=b-c|0}}if((h|0)==1548){d=-7;j=f;db(j);k=d;return k|0}else if((h|0)==1543){if((an(e|0)|0)!=0){if((b|0)>0){h=1545}}else{h=1545}if((h|0)==1545){d=-6}j=f;db(j);k=d;return k|0}else if((h|0)==1555){j=f;db(j);k=d;return k|0}return 0}function cm(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;d=i;i=i+88|0;e=d|0;c[e+8>>2]=0;c[e+12>>2]=0;c[e>>2]=0;c[e+4>>2]=0;c[e+20>>2]=0;c[e+24>>2]=0;c[e+16>>2]=0;f=cf(a,e,b)|0;i=d;return f|0}function cn(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;f=i;i=i+24|0;g=f|0;h=f+16|0;j=b;b=e;c[b>>2]=aN(j|0)|0;if((aU(g|0,1,10,j|0)|0)!=10){k=0;l=k;i=f;return l|0}if((dm(g|0,16576,3)|0)!=0){k=0;l=k;i=f;return l|0}e=d[g+3|0]|0;do{if((e|0)==2){if((d[g+5|0]&-129|0)==0){break}k=-8;l=k;i=f;return l|0}else if((e|0)==4){if((d[g+5|0]&-241|0)==0){break}k=-8;l=k;i=f;return l|0}else if((e|0)==3){if((d[g+5|0]&-225|0)==0){break}k=-8;l=k;i=f;return l|0}else{k=-8;l=k;i=f;return l|0}}while(0);e=co(g+6|0)|0;if((e|0)==-1){k=-8;l=k;i=f;return l|0}c[b+12>>2]=d[g+5|0]|0;c[b+8>>2]=d[g+3|0]<<8|d[g+4|0];c[b+4>>2]=e+10+((c[b+12>>2]&16|0)!=0?10:0);c[b+16>>2]=0;g=da(e)|0;L2100:do{if((aU(g|0,1,e|0,j|0)|0)==(e|0)){do{if(((c[b+8>>2]|0)>>>8|0)!=4){if((c[b+12>>2]&128|0)==0){break}e=cp(g,g,e)|0}}while(0);m=0;if((c[b+12>>2]&64|0)!=0){if((m+6|0)>>>0>e>>>0){break}L2112:do{if(((c[b+8>>2]|0)>>>8|0)==4){n=co(g+m|0)|0;do{if((n|0)!=-1){if(n>>>0>e>>>0){break}m=m+n|0;break L2112}}while(0);break L2100}else{do{if(((c[b+8>>2]|0)>>>8|0)==3){n=cq(g+m|0)|0;if(n>>>0>e>>>0){break L2100}else{m=m+(n+4)|0;break}}}while(0)}}while(0)}o=b+16|0;L2127:while(1){if(m>>>0<e>>>0){p=(d[g+m|0]|0)!=0}else{p=0}if(!p){q=1672;break}r=(c[b+8>>2]|0)>>>8;if((r|0)==2){if((m+5|0)>>>0>e>>>0){q=1599;break}di(h|0,0,4);n=0;while(1){if((a[11+(n*7|0)|0]|0)==0){break}if((dm(g+m|0,8+(n*7|0)|0,3)|0)==0){q=1603;break}n=n+1|0}if((q|0)==1603){q=0;s=h;t=11+(n*7|0)|0;a[s]=a[t]|0;a[s+1|0]=a[t+1|0]|0;a[s+2|0]=a[t+2|0]|0;a[s+3|0]=a[t+3|0]|0}u=d[g+(m+3)|0]<<16|d[g+(m+4)|0]<<8|d[g+(m+5)|0];v=0;if(u>>>0>e>>>0){q=1607;break}m=m+6|0}else if((r|0)==4){if((m+10|0)>>>0>e>>>0){q=1623;break}t=h;s=g+m|0;a[t]=a[s]|0;a[t+1|0]=a[s+1|0]|0;a[t+2|0]=a[s+2|0]|0;a[t+3|0]=a[s+3|0]|0;u=co(g+m+4|0)|0;v=d[g+(m+8)|0]<<8|d[g+(m+9)|0];if((u|0)==-1){q=1626;break}if(u>>>0>e>>>0){q=1626;break}m=m+10|0}else if((r|0)==3){if((m+10|0)>>>0>e>>>0){q=1610;break}s=h;t=g+m|0;a[s]=a[t]|0;a[s+1|0]=a[t+1|0]|0;a[s+2|0]=a[t+2|0]|0;a[s+3|0]=a[t+3|0]|0;u=cq(g+m+4|0)|0;v=d[g+(m+8)|0]<<7&65280;if((a[g+(m+9)|0]&128|0)!=0){v=v|9}if((a[g+(m+9)|0]&64|0)!=0){v=v|4}if((a[g+(m+9)|0]&32|0)!=0){v=v|64}if((a[g+(m+9)|0]&31|0)!=0){v=v|240}if(u>>>0>e>>>0){q=1620;break}m=m+10|0}else{q=1628;break}if((m+u|0)>>>0>e>>>0){q=1630;break}do{if((d[h|0]|0)!=0){if((dm(h|0,16520,4)|0)==0){break}if((dm(h|0,16464,4)|0)==0){break}if((dm(h|0,16392,4)|0)==0){break}do{if(((c[b+8>>2]|0)>>>8|0)==3){if((v&244|0)==0){break}m=m+u|0;continue L2127}}while(0);t=((v&64|0)!=0?1:0)+((v&4|0)!=0?1:0)+((v&1|0)!=0?4:0)|0;if(t>>>0>u>>>0){m=m+u|0;continue L2127}do{if(((c[b+8>>2]|0)>>>8|0)==2){if((dm(h|0,16328,4)|0)!=0){break}if(u>>>0>=6){break}m=m+u|0;continue L2127}}while(0);if((dm(h|0,16272,4)|0)==0){s=h;a[s]=a[16880]|0;a[s+1|0]=a[16881|0]|0;a[s+2|0]=a[16882|0]|0;a[s+3|0]=a[16883|0]|0}if((v&16384|0)!=0){m=m+u|0;continue L2127}s=da(24)|0;c[s>>2]=0;w=s+4|0;x=h;a[w]=a[x]|0;a[w+1|0]=a[x+1|0]|0;a[w+2|0]=a[x+2|0]|0;a[w+3|0]=a[x+3|0]|0;c[s+8>>2]=v;c[s+16>>2]=t;c[o>>2]=s;o=s|0;do{if(((c[b+8>>2]|0)>>>8|0)==4){if((v&2|0)==0){q=1652;break}c[s+20>>2]=da(u)|0;n=cp(c[s+20>>2]|0,g+m|0,u)|0;c[s+12>>2]=n;m=m+u|0}else{q=1652}}while(0);if((q|0)==1652){q=0;do{if(((c[b+8>>2]|0)>>>8|0)==2){if((dm(h|0,16328,4)|0)!=0){q=1663;break}c[s+20>>2]=da(u+12|0)|0;a[c[s+20>>2]|0]=a[g+m|0]|0;n=1;if((dm(g+m+1|0,16240,3)|0)==0){t=(c[s+20>>2]|0)+n|0;dj(t|0,16192,10)|0;n=n+10|0}else{if((dm(g+m+1|0,16080,3)|0)==0){t=(c[s+20>>2]|0)+n|0;dj(t|0,15976,11)|0;n=n+11|0}else{if((d[g+(m+1)|0]|0)==0){t=(c[s+20>>2]|0)+n|0;x=g+m+1|0;a[t]=a[x]|0;a[t+1|0]=a[x+1|0]|0;a[t+2|0]=a[x+2|0]|0;a[(c[s+20>>2]|0)+(n+3)|0]=0;n=n+4|0}}}x=(c[s+20>>2]|0)+n|0;t=g+m+4|0;w=u-4|0;dj(x|0,t|0,w)|0;c[s+12>>2]=n+u-4;m=m+u|0}else{q=1663}}while(0);if((q|0)==1663){q=0;c[s+20>>2]=da(u)|0;w=c[s+20>>2]|0;t=g+m|0;x=u;dj(w|0,t|0,x)|0;c[s+12>>2]=u;m=m+u|0}}do{if(((c[b+8>>2]|0)>>>8|0)==3){if((v&1|0)==0){break}n=cq(c[s+20>>2]|0)|0;if((v&64|0)!=0){a[c[s+20>>2]|0]=a[(c[s+20>>2]|0)+4|0]|0;ci((c[s+20>>2]|0)+1|0,n)}else{ci(c[s+20>>2]|0,n)}}}while(0);continue L2127}}while(0);m=m+u|0}if((q|0)==1599){break}else if((q|0)==1620){break}else if((q|0)==1672){if(m>>>0>e>>>0){break}db(g);k=1;l=k;i=f;return l|0}else if((q|0)==1626){break}else if((q|0)==1628){break}else if((q|0)==1630){break}else if((q|0)==1607){break}else if((q|0)==1610){break}else if((q|0)==1623){break}}}while(0);db(g);ce(c[b+16>>2]|0);k=-8;l=k;i=f;return l|0}function co(a){a=a|0;var b=0,c=0,e=0;b=a;if(((d[b|0]|0|(d[b+1|0]|0)|(d[b+2|0]|0)|(d[b+3|0]|0))&128|0)!=0){c=-1;e=c;return e|0}else{c=(d[b|0]|0)<<21|(d[b+1|0]|0)<<14|(d[b+2|0]|0)<<7|(d[b+3|0]|0);e=c;return e|0}return 0}function cp(b,c,e){b=b|0;c=c|0;e=e|0;var f=0,g=0;f=b;b=c;c=e;e=0;g=0;while(1){if(g>>>0>=c>>>0){break}if((f|0)!=0){a[f+e|0]=a[b+g|0]|0}e=e+1|0;do{if((d[b+g|0]|0|0)==255){if((g+1|0)>>>0>=c>>>0){break}if((d[b+(g+1)|0]|0|0)!=0){break}g=g+1|0}}while(0);g=g+1|0}return e|0}function cq(a){a=a|0;var b=0;b=a;return(d[b|0]|0)<<24|(d[b+1|0]|0)<<16|(d[b+2|0]|0)<<8|(d[b+3|0]|0)|0}function cr(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0;f=i;i=i+160|0;g=f|0;h=f+128|0;j=b;b=e;c[b>>2]=aN(j|0)|0;if((aU(g|0,1,128,j|0)|0)!=128){k=0;l=k;i=f;return l|0}if((dm(g|0,17160,3)|0)!=0){k=0;l=k;i=f;return l|0}c[b+4>>2]=128;c[b+8>>2]=0;c[b+12>>2]=0;c[b+16>>2]=0;j=b+16|0;if((d[g+3|0]|0|0)!=0){b=h;e=g+3|0;dj(b|0,e|0,30)|0;a[h+30|0]=0;c[j>>2]=cj(17e3,16976,(v=i,i=i+16|0,c[v>>2]=0,c[v+8>>2]=h,v)|0)|0;j=c[j>>2]|0}if((d[g+33|0]|0|0)!=0){e=h;b=g+33|0;dj(e|0,b|0,30)|0;a[h+30|0]=0;c[j>>2]=cj(16960,16976,(v=i,i=i+16|0,c[v>>2]=0,c[v+8>>2]=h,v)|0)|0;j=c[j>>2]|0}if((d[g+63|0]|0|0)!=0){b=h;e=g+63|0;dj(b|0,e|0,30)|0;a[h+30|0]=0;c[j>>2]=cj(16920,16976,(v=i,i=i+16|0,c[v>>2]=0,c[v+8>>2]=h,v)|0)|0;j=c[j>>2]|0}do{if((d[g+93|0]|0|0)>=48){if((d[g+93|0]|0|0)>57){break}if((d[g+94|0]|0|0)<48){break}if((d[g+94|0]|0|0)>57){break}if((d[g+95|0]|0|0)<48){break}if((d[g+95|0]|0|0)>57){break}if((d[g+96|0]|0|0)<48){break}if((d[g+96|0]|0|0)>57){break}e=h;b=g+93|0;a[e]=a[b]|0;a[e+1|0]=a[b+1|0]|0;a[e+2|0]=a[b+2|0]|0;a[e+3|0]=a[b+3|0]|0;a[h+4|0]=0;c[j>>2]=cj(16880,16976,(v=i,i=i+16|0,c[v>>2]=0,c[v+8>>2]=h,v)|0)|0;j=c[j>>2]|0}}while(0);if((d[g+97|0]|0|0)!=0){b=h;e=g+97|0;dj(b|0,e|0,30)|0;a[h+30|0]=0;c[j>>2]=cj(16816,16800,(v=i,i=i+40|0,c[v>>2]=0,c[v+8>>2]=16752,c[v+16>>2]=4092560,c[v+24>>2]=0,c[v+32>>2]=h,v)|0)|0;j=c[j>>2]|0}do{if((d[g+125|0]|0|0)==0){if((d[g+126|0]|0|0)==0){break}e=h|0;b=d[g+126|0]|0;aP(e|0,16632,(v=i,i=i+8|0,c[v>>2]=b,v)|0)|0;c[j>>2]=cj(16616,16976,(v=i,i=i+16|0,c[v>>2]=0,c[v+8>>2]=h,v)|0)|0;j=c[j>>2]|0}}while(0);k=1;l=k;i=f;return l|0}function cs(a){a=a|0;var b=0,d=0,e=0;b=a;a=0;while(1){if((a|0)>=10){break}h[866632+(a<<3)>>3]=0.0;h[828136+(a<<3)>>3]=0.0;h[905128+(a<<3)>>3]=0.0;h[959936+(a<<3)>>3]=0.0;h[921440+(a<<3)>>3]=0.0;h[999264+(a<<3)>>3]=0.0;a=a+1|0}a=b;if((a|0)==96e3){c[267292]=0}else if((a|0)==88200){c[267292]=1}else if((a|0)==64e3){c[267292]=2}else if((a|0)==48e3){c[267292]=3}else if((a|0)==44100){c[267292]=4}else if((a|0)==32e3){c[267292]=5}else if((a|0)==24e3){c[267292]=6}else if((a|0)==22050){c[267292]=7}else if((a|0)==16e3){c[267292]=8}else if((a|0)==12e3){c[267292]=9}else if((a|0)==11025){c[267292]=10}else if((a|0)==8e3){c[267292]=11}else{d=0;e=d;return e|0}c[207032]=~~+$(+(+(b|0)*.05));h[843]=0.0;h[817]=0.0;c[206638]=0;di(4141736,0,48e3);d=1;e=d;return e|0}function ct(a){a=a|0;var b=0,d=0;if((cs(a)|0)!=1){b=0;d=b;return d|0}else{c[249856]=999344;c[226322]=905208;c[239982]=921520;c[216656]=828216;c[249606]=960016;c[226280]=866712;di(4093736,0,48e3);b=1;d=b;return d|0}return 0}function cu(a){a=+a;var b=0.0;b=a;return+(b*b)}function cv(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a;a=b;b=c;c=d;while(1){d=b;b=d-1|0;if((d|0)==0){break}h[a>>3]=+h[e>>3]*+h[c>>3]+1.0e-10- +h[a-8>>3]*+h[c+8>>3]+ +h[e-8>>3]*+h[c+16>>3]- +h[a-16>>3]*+h[c+24>>3]+ +h[e-16>>3]*+h[c+32>>3]- +h[a-24>>3]*+h[c+40>>3]+ +h[e-24>>3]*+h[c+48>>3]- +h[a-32>>3]*+h[c+56>>3]+ +h[e-32>>3]*+h[c+64>>3]- +h[a-40>>3]*+h[c+72>>3]+ +h[e-40>>3]*+h[c+80>>3]- +h[a-48>>3]*+h[c+88>>3]+ +h[e-48>>3]*+h[c+96>>3]- +h[a-56>>3]*+h[c+104>>3]+ +h[e-56>>3]*+h[c+112>>3]- +h[a-64>>3]*+h[c+120>>3]+ +h[e-64>>3]*+h[c+128>>3]- +h[a-72>>3]*+h[c+136>>3]+ +h[e-72>>3]*+h[c+144>>3]- +h[a-80>>3]*+h[c+152>>3]+ +h[e-80>>3]*+h[c+160>>3];a=a+8|0;e=e+8|0}return}function cw(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a;a=b;b=c;c=d;while(1){d=b;b=d-1|0;if((d|0)==0){break}h[a>>3]=+h[e>>3]*+h[c>>3]- +h[a-8>>3]*+h[c+8>>3]+ +h[e-8>>3]*+h[c+16>>3]- +h[a-16>>3]*+h[c+24>>3]+ +h[e-16>>3]*+h[c+32>>3];a=a+8|0;e=e+8|0}return}function cx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0.0,q=0.0,r=0;f=a;a=b;b=d;if((b|0)==0){g=1;i=g;return i|0}d=0;j=b;k=e;if((k|0)==1){a=f}else if((k|0)!=2){g=0;i=g;return i|0}if(b>>>0<10){k=f;e=b<<3;dj(999344,k|0,e)|0;e=a;k=b<<3;dj(905208,e|0,k)|0}else{k=f;dj(999344,k|0,80)|0;k=a;dj(905208,k|0,80)|0}while(1){if((j|0)<=0){break}if((j|0)>((c[207032]|0)-(c[206638]|0)|0)){l=(c[207032]|0)-(c[206638]|0)|0}else{l=j}k=l;if((d|0)<10){m=(c[249856]|0)+(d<<3)|0;n=(c[226322]|0)+(d<<3)|0;if((k|0)>(10-d|0)){k=10-d|0}}else{m=f+(d<<3)|0;n=a+(d<<3)|0}cv(m,(c[239982]|0)+(c[206638]<<3)|0,k,21696+((c[267292]|0)*168|0)|0);cv(n,(c[216656]|0)+(c[206638]<<3)|0,k,21696+((c[267292]|0)*168|0)|0);cw((c[239982]|0)+(c[206638]<<3)|0,(c[249606]|0)+(c[206638]<<3)|0,k,23712+((c[267292]|0)*40|0)|0);cw((c[216656]|0)+(c[206638]<<3)|0,(c[226280]|0)+(c[206638]<<3)|0,k,23712+((c[267292]|0)*40|0)|0);m=(c[249606]|0)+(c[206638]<<3)|0;n=(c[226280]|0)+(c[206638]<<3)|0;e=(k|0)%16|0;while(1){o=e;e=o-1|0;if((o|0)==0){break}o=m;m=o+8|0;p=+cu(+h[o>>3]);h[843]=+h[843]+p;o=n;n=o+8|0;p=+cu(+h[o>>3]);h[817]=+h[817]+p}e=(k|0)/16|0;while(1){o=e;e=o-1|0;if((o|0)==0){break}p=+cu(+h[m>>3]);q=p+ +cu(+h[m+8>>3]);p=q+ +cu(+h[m+16>>3]);q=p+ +cu(+h[m+24>>3]);p=q+ +cu(+h[m+32>>3]);q=p+ +cu(+h[m+40>>3]);p=q+ +cu(+h[m+48>>3]);q=p+ +cu(+h[m+56>>3]);p=q+ +cu(+h[m+64>>3]);q=p+ +cu(+h[m+72>>3]);p=q+ +cu(+h[m+80>>3]);q=p+ +cu(+h[m+88>>3]);p=q+ +cu(+h[m+96>>3]);q=p+ +cu(+h[m+104>>3]);p=q+ +cu(+h[m+112>>3]);q=p+ +cu(+h[m+120>>3]);h[843]=+h[843]+q;m=m+128|0;q=+cu(+h[n>>3]);p=q+ +cu(+h[n+8>>3]);q=p+ +cu(+h[n+16>>3]);p=q+ +cu(+h[n+24>>3]);q=p+ +cu(+h[n+32>>3]);p=q+ +cu(+h[n+40>>3]);q=p+ +cu(+h[n+48>>3]);p=q+ +cu(+h[n+56>>3]);q=p+ +cu(+h[n+64>>3]);p=q+ +cu(+h[n+72>>3]);q=p+ +cu(+h[n+80>>3]);p=q+ +cu(+h[n+88>>3]);q=p+ +cu(+h[n+96>>3]);p=q+ +cu(+h[n+104>>3]);q=p+ +cu(+h[n+112>>3]);p=q+ +cu(+h[n+120>>3]);h[817]=+h[817]+p;n=n+128|0}j=j-k|0;d=d+k|0;c[206638]=(c[206638]|0)+k;if((c[206638]|0)==(c[207032]|0)){e=~~(+aQ(+((+h[843]+ +h[817])/+(c[206638]|0)*.5+1.0e-37))*1.0e3);if((e|0)<0){e=0}if((e|0)>=12e3){e=11999}o=4141736+(e<<2)|0;c[o>>2]=(c[o>>2]|0)+1;h[817]=0.0;h[843]=0.0;dk(959936,959936+(c[206638]<<3)|0,80);dk(866632,866632+(c[206638]<<3)|0,80);dk(921440,921440+(c[206638]<<3)|0,80);dk(828136,828136+(c[206638]<<3)|0,80);c[206638]=0}if((c[206638]|0)>(c[207032]|0)){r=1802;break}}if((r|0)==1802){g=0;i=g;return i|0}if(b>>>0<10){dk(999264,999264+(b<<3)|0,10-b<<3|0);dk(905128,905128+(b<<3)|0,10-b<<3|0);r=999344+(-b<<3)|0;d=f;j=b<<3;dj(r|0,d|0,j)|0;j=905208+(-b<<3)|0;d=a;r=b<<3;dj(j|0,d|0,r)|0}else{r=f+(b<<3)-80|0;dj(999264,r|0,80)|0;r=a+(b<<3)-80|0;dj(905128,r|0,80)|0}g=1;i=g;return i|0}function cy(){var a=0.0,b=0,d=0;a=+cC(4141736,12e3);b=0;while(1){if((b|0)>=12e3){break}d=4093736+(b<<2)|0;c[d>>2]=(c[d>>2]|0)+(c[4141736+(b<<2)>>2]|0);c[4141736+(b<<2)>>2]=0;b=b+1|0}b=0;while(1){if((b|0)>=10){break}h[866632+(b<<3)>>3]=0.0;h[828136+(b<<3)>>3]=0.0;h[905128+(b<<3)>>3]=0.0;h[959936+(b<<3)>>3]=0.0;h[921440+(b<<3)>>3]=0.0;h[999264+(b<<3)>>3]=0.0;b=b+1|0}c[206638]=0;h[817]=0.0;h[843]=0.0;return+a}function cz(a,b){a=a|0;b=b|0;var c=0,d=0;c=a;a=b;b=4-(c>>>17&3)|0;L2402:do{if((c&-2097152|0)!=-2097152){d=0}else{if(3!=(b|0)){d=0;break}do{if((a|0)>0){if((b|0)!=(a|0)){d=0;break L2402}else{break}}}while(0);if((c>>>12&15|0)==15){d=0;break}if((c>>>10&3|0)==3){d=0;break}else{d=1;break}}}while(0);return d|0}function cA(a){a=a|0;var b=0,e=0,f=0;b=a;if((b|0)!=0){a=d[c[206054]|0]|0;a=a<<8;a=a|(d[(c[206054]|0)+1|0]|0);a=a<<8;a=a|(d[(c[206054]|0)+2|0]|0);a=a<<c[1023088];a=a&16777215;c[1023088]=(c[1023088]|0)+b;a=a>>>((24-b|0)>>>0);c[206054]=(c[206054]|0)+(c[1023088]>>3);c[1023088]=c[1023088]&7;e=a;f=e;return f|0}else{e=0;f=e;return f|0}return 0}function cB(a){a=a|0;var b=0;b=a;a=d[c[206054]|0]|0;a=a<<8;a=a|(d[(c[206054]|0)+1|0]|0);a=a<<c[1023088];a=a&65535;c[1023088]=(c[1023088]|0)+b;a=a>>>((16-b|0)>>>0);c[206054]=(c[206054]|0)+(c[1023088]>>3);c[1023088]=c[1023088]&7;return a|0}function cC(a,b){a=a|0;b=b|0;var d=0,e=0,f=0.0,g=0.0,h=0;d=a;a=b;b=0;e=0;while(1){if(e>>>0>=a>>>0){break}b=b+(c[d+(e<<2)>>2]|0)|0;e=e+1|0}if((b|0)==0){f=-24601.0;g=f;return+g}h=~~+$(+(+(b>>>0>>>0)*.050000000000000044));e=a;while(1){a=e;e=a-1|0;if(a>>>0<=0){break}a=h-(c[d+(e<<2)>>2]|0)|0;h=a;if((a|0)<=0){a=1852;break}}f=64.82- +(e>>>0>>>0)/100.0;g=f;return+g}function cD(){return+(+cC(4093736,12e3))}function cE(a,b){a=a|0;b=b|0;b=i;c[267290]=0;at(c[o>>2]|0,17288,(v=i,i=i+8|0,c[v>>2]=a,v)|0)|0;i=b;return}function cF(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0;d=a;a=b;do{if((c[d+52>>2]|0)<0){if((a|0)<=0){break}e=-1;f=e;return f|0}}while(0);b=d+132+((1-(c[d+23188>>2]|0)|0)*2304|0)+512|0;c[206054]=(c[206054]|0)+(-a|0);if((a|0)!=0){g=c[206054]|0;h=b+(c[d+52>>2]|0)+(-a|0)|0;d=a;dj(g|0,h|0,d)|0}c[1023088]=0;e=0;f=e;return f|0}function cG(a,b,c){a=a|0;b=b|0;c=c|0;var d=0,e=0;d=i;i=i+512|0;e=d|0;cI(a,b,e|0,e+256|0,c);i=d;return}function cH(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;d=i;e=a;a=b;if((a&1048576|0)!=0){c[e+12>>2]=(a&524288|0)!=0?0:1;c[e+16>>2]=0}else{c[e+12>>2]=1;c[e+16>>2]=1}c[e+24>>2]=4-(a>>>17&3);if((a>>>10&3|0)==3){b=c[n>>2]|0;at(b|0,17264,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;b=c[o>>2]|0;ar(b|0)|0;b=c[n>>2]|0;ar(b|0)|0;aO(1);return 0}if((c[e+16>>2]|0)!=0){c[e+36>>2]=(a>>>10&3)+6}else{c[e+36>>2]=(a>>>10&3)+((c[e+12>>2]|0)*3|0)}c[e+28>>2]=a>>>16&1^1;if((c[e+16>>2]|0)!=0){c[e+32>>2]=a>>>12&15}c[e+32>>2]=a>>>12&15;c[e+40>>2]=a>>>9&1;c[e+44>>2]=a>>>8&1;c[e+48>>2]=a>>>6&3;c[e+52>>2]=a>>>4&3;c[e+56>>2]=a>>>3&1;c[e+60>>2]=a>>>2&1;c[e+64>>2]=a&3;c[e>>2]=(c[e+48>>2]|0)==3?1:2;if((c[e+24>>2]|0)!=3){a=c[n>>2]|0;b=c[e+24>>2]|0;at(a|0,19344,(v=i,i=i+8|0,c[v>>2]=b,v)|0)|0;f=0;g=f;i=d;return g|0}if((c[e+32>>2]|0)==0){c[e+68>>2]=0}else{c[e+68>>2]=(c[584+((c[e+12>>2]|0)*192|0)+(c[e+32>>2]<<2)>>2]|0)*144e3|0;b=e+68|0;c[b>>2]=(c[b>>2]|0)/(c[7240+(c[e+36>>2]<<2)>>2]<<c[e+12>>2]|0)|0;c[e+68>>2]=(c[e+68>>2]|0)+(c[e+40>>2]|0)-4}f=1;g=f;i=d;return g|0}function cI(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,i=0.0,j=0.0;g=a;a=b;b=d;d=e;e=f;f=c[1676]|0;h[b>>3]=+h[e>>3]+ +h[e+248>>3];h[b+248>>3]=(+h[e>>3]- +h[e+248>>3])*+h[f>>3];h[b+8>>3]=+h[e+8>>3]+ +h[e+240>>3];h[b+240>>3]=(+h[e+8>>3]- +h[e+240>>3])*+h[f+8>>3];h[b+16>>3]=+h[e+16>>3]+ +h[e+232>>3];h[b+232>>3]=(+h[e+16>>3]- +h[e+232>>3])*+h[f+16>>3];h[b+24>>3]=+h[e+24>>3]+ +h[e+224>>3];h[b+224>>3]=(+h[e+24>>3]- +h[e+224>>3])*+h[f+24>>3];h[b+32>>3]=+h[e+32>>3]+ +h[e+216>>3];h[b+216>>3]=(+h[e+32>>3]- +h[e+216>>3])*+h[f+32>>3];h[b+40>>3]=+h[e+40>>3]+ +h[e+208>>3];h[b+208>>3]=(+h[e+40>>3]- +h[e+208>>3])*+h[f+40>>3];h[b+48>>3]=+h[e+48>>3]+ +h[e+200>>3];h[b+200>>3]=(+h[e+48>>3]- +h[e+200>>3])*+h[f+48>>3];h[b+56>>3]=+h[e+56>>3]+ +h[e+192>>3];h[b+192>>3]=(+h[e+56>>3]- +h[e+192>>3])*+h[f+56>>3];h[b+64>>3]=+h[e+64>>3]+ +h[e+184>>3];h[b+184>>3]=(+h[e+64>>3]- +h[e+184>>3])*+h[f+64>>3];h[b+72>>3]=+h[e+72>>3]+ +h[e+176>>3];h[b+176>>3]=(+h[e+72>>3]- +h[e+176>>3])*+h[f+72>>3];h[b+80>>3]=+h[e+80>>3]+ +h[e+168>>3];h[b+168>>3]=(+h[e+80>>3]- +h[e+168>>3])*+h[f+80>>3];h[b+88>>3]=+h[e+88>>3]+ +h[e+160>>3];h[b+160>>3]=(+h[e+88>>3]- +h[e+160>>3])*+h[f+88>>3];h[b+96>>3]=+h[e+96>>3]+ +h[e+152>>3];h[b+152>>3]=(+h[e+96>>3]- +h[e+152>>3])*+h[f+96>>3];h[b+104>>3]=+h[e+104>>3]+ +h[e+144>>3];h[b+144>>3]=(+h[e+104>>3]- +h[e+144>>3])*+h[f+104>>3];h[b+112>>3]=+h[e+112>>3]+ +h[e+136>>3];h[b+136>>3]=(+h[e+112>>3]- +h[e+136>>3])*+h[f+112>>3];h[b+120>>3]=+h[e+120>>3]+ +h[e+128>>3];h[b+128>>3]=(+h[e+120>>3]- +h[e+128>>3])*+h[f+120>>3];f=c[1677]|0;h[d>>3]=+h[b>>3]+ +h[b+120>>3];h[d+120>>3]=(+h[b>>3]- +h[b+120>>3])*+h[f>>3];h[d+8>>3]=+h[b+8>>3]+ +h[b+112>>3];h[d+112>>3]=(+h[b+8>>3]- +h[b+112>>3])*+h[f+8>>3];h[d+16>>3]=+h[b+16>>3]+ +h[b+104>>3];h[d+104>>3]=(+h[b+16>>3]- +h[b+104>>3])*+h[f+16>>3];h[d+24>>3]=+h[b+24>>3]+ +h[b+96>>3];h[d+96>>3]=(+h[b+24>>3]- +h[b+96>>3])*+h[f+24>>3];h[d+32>>3]=+h[b+32>>3]+ +h[b+88>>3];h[d+88>>3]=(+h[b+32>>3]- +h[b+88>>3])*+h[f+32>>3];h[d+40>>3]=+h[b+40>>3]+ +h[b+80>>3];h[d+80>>3]=(+h[b+40>>3]- +h[b+80>>3])*+h[f+40>>3];h[d+48>>3]=+h[b+48>>3]+ +h[b+72>>3];h[d+72>>3]=(+h[b+48>>3]- +h[b+72>>3])*+h[f+48>>3];h[d+56>>3]=+h[b+56>>3]+ +h[b+64>>3];h[d+64>>3]=(+h[b+56>>3]- +h[b+64>>3])*+h[f+56>>3];h[d+128>>3]=+h[b+128>>3]+ +h[b+248>>3];h[d+248>>3]=(+h[b+248>>3]- +h[b+128>>3])*+h[f>>3];h[d+136>>3]=+h[b+136>>3]+ +h[b+240>>3];h[d+240>>3]=(+h[b+240>>3]- +h[b+136>>3])*+h[f+8>>3];h[d+144>>3]=+h[b+144>>3]+ +h[b+232>>3];h[d+232>>3]=(+h[b+232>>3]- +h[b+144>>3])*+h[f+16>>3];h[d+152>>3]=+h[b+152>>3]+ +h[b+224>>3];h[d+224>>3]=(+h[b+224>>3]- +h[b+152>>3])*+h[f+24>>3];h[d+160>>3]=+h[b+160>>3]+ +h[b+216>>3];h[d+216>>3]=(+h[b+216>>3]- +h[b+160>>3])*+h[f+32>>3];h[d+168>>3]=+h[b+168>>3]+ +h[b+208>>3];h[d+208>>3]=(+h[b+208>>3]- +h[b+168>>3])*+h[f+40>>3];h[d+176>>3]=+h[b+176>>3]+ +h[b+200>>3];h[d+200>>3]=(+h[b+200>>3]- +h[b+176>>3])*+h[f+48>>3];h[d+184>>3]=+h[b+184>>3]+ +h[b+192>>3];h[d+192>>3]=(+h[b+192>>3]- +h[b+184>>3])*+h[f+56>>3];f=c[1678]|0;h[b>>3]=+h[d>>3]+ +h[d+56>>3];h[b+56>>3]=(+h[d>>3]- +h[d+56>>3])*+h[f>>3];h[b+8>>3]=+h[d+8>>3]+ +h[d+48>>3];h[b+48>>3]=(+h[d+8>>3]- +h[d+48>>3])*+h[f+8>>3];h[b+16>>3]=+h[d+16>>3]+ +h[d+40>>3];h[b+40>>3]=(+h[d+16>>3]- +h[d+40>>3])*+h[f+16>>3];h[b+24>>3]=+h[d+24>>3]+ +h[d+32>>3];h[b+32>>3]=(+h[d+24>>3]- +h[d+32>>3])*+h[f+24>>3];h[b+64>>3]=+h[d+64>>3]+ +h[d+120>>3];h[b+120>>3]=(+h[d+120>>3]- +h[d+64>>3])*+h[f>>3];h[b+72>>3]=+h[d+72>>3]+ +h[d+112>>3];h[b+112>>3]=(+h[d+112>>3]- +h[d+72>>3])*+h[f+8>>3];h[b+80>>3]=+h[d+80>>3]+ +h[d+104>>3];h[b+104>>3]=(+h[d+104>>3]- +h[d+80>>3])*+h[f+16>>3];h[b+88>>3]=+h[d+88>>3]+ +h[d+96>>3];h[b+96>>3]=(+h[d+96>>3]- +h[d+88>>3])*+h[f+24>>3];h[b+128>>3]=+h[d+128>>3]+ +h[d+184>>3];h[b+184>>3]=(+h[d+128>>3]- +h[d+184>>3])*+h[f>>3];h[b+136>>3]=+h[d+136>>3]+ +h[d+176>>3];h[b+176>>3]=(+h[d+136>>3]- +h[d+176>>3])*+h[f+8>>3];h[b+144>>3]=+h[d+144>>3]+ +h[d+168>>3];h[b+168>>3]=(+h[d+144>>3]- +h[d+168>>3])*+h[f+16>>3];h[b+152>>3]=+h[d+152>>3]+ +h[d+160>>3];h[b+160>>3]=(+h[d+152>>3]- +h[d+160>>3])*+h[f+24>>3];h[b+192>>3]=+h[d+192>>3]+ +h[d+248>>3];h[b+248>>3]=(+h[d+248>>3]- +h[d+192>>3])*+h[f>>3];h[b+200>>3]=+h[d+200>>3]+ +h[d+240>>3];h[b+240>>3]=(+h[d+240>>3]- +h[d+200>>3])*+h[f+8>>3];h[b+208>>3]=+h[d+208>>3]+ +h[d+232>>3];h[b+232>>3]=(+h[d+232>>3]- +h[d+208>>3])*+h[f+16>>3];h[b+216>>3]=+h[d+216>>3]+ +h[d+224>>3];h[b+224>>3]=(+h[d+224>>3]- +h[d+216>>3])*+h[f+24>>3];i=+h[c[1679]>>3];j=+h[(c[1679]|0)+8>>3];h[d>>3]=+h[b>>3]+ +h[b+24>>3];h[d+24>>3]=(+h[b>>3]- +h[b+24>>3])*i;h[d+8>>3]=+h[b+8>>3]+ +h[b+16>>3];h[d+16>>3]=(+h[b+8>>3]- +h[b+16>>3])*j;h[d+32>>3]=+h[b+32>>3]+ +h[b+56>>3];h[d+56>>3]=(+h[b+56>>3]- +h[b+32>>3])*i;h[d+40>>3]=+h[b+40>>3]+ +h[b+48>>3];h[d+48>>3]=(+h[b+48>>3]- +h[b+40>>3])*j;h[d+64>>3]=+h[b+64>>3]+ +h[b+88>>3];h[d+88>>3]=(+h[b+64>>3]- +h[b+88>>3])*i;h[d+72>>3]=+h[b+72>>3]+ +h[b+80>>3];h[d+80>>3]=(+h[b+72>>3]- +h[b+80>>3])*j;h[d+96>>3]=+h[b+96>>3]+ +h[b+120>>3];h[d+120>>3]=(+h[b+120>>3]- +h[b+96>>3])*i;h[d+104>>3]=+h[b+104>>3]+ +h[b+112>>3];h[d+112>>3]=(+h[b+112>>3]- +h[b+104>>3])*j;h[d+128>>3]=+h[b+128>>3]+ +h[b+152>>3];h[d+152>>3]=(+h[b+128>>3]- +h[b+152>>3])*i;h[d+136>>3]=+h[b+136>>3]+ +h[b+144>>3];h[d+144>>3]=(+h[b+136>>3]- +h[b+144>>3])*j;h[d+160>>3]=+h[b+160>>3]+ +h[b+184>>3];h[d+184>>3]=(+h[b+184>>3]- +h[b+160>>3])*i;h[d+168>>3]=+h[b+168>>3]+ +h[b+176>>3];h[d+176>>3]=(+h[b+176>>3]- +h[b+168>>3])*j;h[d+192>>3]=+h[b+192>>3]+ +h[b+216>>3];h[d+216>>3]=(+h[b+192>>3]- +h[b+216>>3])*i;h[d+200>>3]=+h[b+200>>3]+ +h[b+208>>3];h[d+208>>3]=(+h[b+200>>3]- +h[b+208>>3])*j;h[d+224>>3]=+h[b+224>>3]+ +h[b+248>>3];h[d+248>>3]=(+h[b+248>>3]- +h[b+224>>3])*i;h[d+232>>3]=+h[b+232>>3]+ +h[b+240>>3];h[d+240>>3]=(+h[b+240>>3]- +h[b+232>>3])*j;j=+h[c[1680]>>3];h[b>>3]=+h[d>>3]+ +h[d+8>>3];h[b+8>>3]=(+h[d>>3]- +h[d+8>>3])*j;h[b+16>>3]=+h[d+16>>3]+ +h[d+24>>3];h[b+24>>3]=(+h[d+24>>3]- +h[d+16>>3])*j;f=b+16|0;h[f>>3]=+h[f>>3]+ +h[b+24>>3];h[b+32>>3]=+h[d+32>>3]+ +h[d+40>>3];h[b+40>>3]=(+h[d+32>>3]- +h[d+40>>3])*j;h[b+48>>3]=+h[d+48>>3]+ +h[d+56>>3];h[b+56>>3]=(+h[d+56>>3]- +h[d+48>>3])*j;f=b+48|0;h[f>>3]=+h[f>>3]+ +h[b+56>>3];f=b+32|0;h[f>>3]=+h[f>>3]+ +h[b+48>>3];f=b+48|0;h[f>>3]=+h[f>>3]+ +h[b+40>>3];f=b+40|0;h[f>>3]=+h[f>>3]+ +h[b+56>>3];h[b+64>>3]=+h[d+64>>3]+ +h[d+72>>3];h[b+72>>3]=(+h[d+64>>3]- +h[d+72>>3])*j;h[b+80>>3]=+h[d+80>>3]+ +h[d+88>>3];h[b+88>>3]=(+h[d+88>>3]- +h[d+80>>3])*j;f=b+80|0;h[f>>3]=+h[f>>3]+ +h[b+88>>3];h[b+96>>3]=+h[d+96>>3]+ +h[d+104>>3];h[b+104>>3]=(+h[d+96>>3]- +h[d+104>>3])*j;h[b+112>>3]=+h[d+112>>3]+ +h[d+120>>3];h[b+120>>3]=(+h[d+120>>3]- +h[d+112>>3])*j;f=b+112|0;h[f>>3]=+h[f>>3]+ +h[b+120>>3];f=b+96|0;h[f>>3]=+h[f>>3]+ +h[b+112>>3];f=b+112|0;h[f>>3]=+h[f>>3]+ +h[b+104>>3];f=b+104|0;h[f>>3]=+h[f>>3]+ +h[b+120>>3];h[b+128>>3]=+h[d+128>>3]+ +h[d+136>>3];h[b+136>>3]=(+h[d+128>>3]- +h[d+136>>3])*j;h[b+144>>3]=+h[d+144>>3]+ +h[d+152>>3];h[b+152>>3]=(+h[d+152>>3]- +h[d+144>>3])*j;f=b+144|0;h[f>>3]=+h[f>>3]+ +h[b+152>>3];h[b+160>>3]=+h[d+160>>3]+ +h[d+168>>3];h[b+168>>3]=(+h[d+160>>3]- +h[d+168>>3])*j;h[b+176>>3]=+h[d+176>>3]+ +h[d+184>>3];h[b+184>>3]=(+h[d+184>>3]- +h[d+176>>3])*j;f=b+176|0;h[f>>3]=+h[f>>3]+ +h[b+184>>3];f=b+160|0;h[f>>3]=+h[f>>3]+ +h[b+176>>3];f=b+176|0;h[f>>3]=+h[f>>3]+ +h[b+168>>3];f=b+168|0;h[f>>3]=+h[f>>3]+ +h[b+184>>3];h[b+192>>3]=+h[d+192>>3]+ +h[d+200>>3];h[b+200>>3]=(+h[d+192>>3]- +h[d+200>>3])*j;h[b+208>>3]=+h[d+208>>3]+ +h[d+216>>3];h[b+216>>3]=(+h[d+216>>3]- +h[d+208>>3])*j;f=b+208|0;h[f>>3]=+h[f>>3]+ +h[b+216>>3];h[b+224>>3]=+h[d+224>>3]+ +h[d+232>>3];h[b+232>>3]=(+h[d+224>>3]- +h[d+232>>3])*j;h[b+240>>3]=+h[d+240>>3]+ +h[d+248>>3];h[b+248>>3]=(+h[d+248>>3]- +h[d+240>>3])*j;d=b+240|0;h[d>>3]=+h[d>>3]+ +h[b+248>>3];d=b+224|0;h[d>>3]=+h[d>>3]+ +h[b+240>>3];d=b+240|0;h[d>>3]=+h[d>>3]+ +h[b+232>>3];d=b+232|0;h[d>>3]=+h[d>>3]+ +h[b+248>>3];h[g+2048>>3]=+h[b>>3];h[g+1536>>3]=+h[b+32>>3];h[g+1024>>3]=+h[b+16>>3];h[g+512>>3]=+h[b+48>>3];h[g>>3]=+h[b+8>>3];h[a>>3]=+h[b+8>>3];h[a+512>>3]=+h[b+40>>3];h[a+1024>>3]=+h[b+24>>3];h[a+1536>>3]=+h[b+56>>3];d=b+64|0;h[d>>3]=+h[d>>3]+ +h[b+96>>3];h[g+1792>>3]=+h[b+64>>3];d=b+96|0;h[d>>3]=+h[d>>3]+ +h[b+80>>3];h[g+1280>>3]=+h[b+96>>3];d=b+80|0;h[d>>3]=+h[d>>3]+ +h[b+112>>3];h[g+768>>3]=+h[b+80>>3];d=b+112|0;h[d>>3]=+h[d>>3]+ +h[b+72>>3];h[g+256>>3]=+h[b+112>>3];d=b+72|0;h[d>>3]=+h[d>>3]+ +h[b+104>>3];h[a+256>>3]=+h[b+72>>3];d=b+104|0;h[d>>3]=+h[d>>3]+ +h[b+88>>3];h[a+768>>3]=+h[b+104>>3];d=b+88|0;h[d>>3]=+h[d>>3]+ +h[b+120>>3];h[a+1280>>3]=+h[b+88>>3];h[a+1792>>3]=+h[b+120>>3];d=b+192|0;h[d>>3]=+h[d>>3]+ +h[b+224>>3];h[g+1920>>3]=+h[b+128>>3]+ +h[b+192>>3];h[g+1664>>3]=+h[b+192>>3]+ +h[b+160>>3];d=b+224|0;h[d>>3]=+h[d>>3]+ +h[b+208>>3];h[g+1408>>3]=+h[b+160>>3]+ +h[b+224>>3];h[g+1152>>3]=+h[b+224>>3]+ +h[b+144>>3];d=b+208|0;h[d>>3]=+h[d>>3]+ +h[b+240>>3];h[g+896>>3]=+h[b+144>>3]+ +h[b+208>>3];h[g+640>>3]=+h[b+208>>3]+ +h[b+176>>3];d=b+240|0;h[d>>3]=+h[d>>3]+ +h[b+200>>3];h[g+384>>3]=+h[b+176>>3]+ +h[b+240>>3];h[g+128>>3]=+h[b+240>>3]+ +h[b+136>>3];g=b+200|0;h[g>>3]=+h[g>>3]+ +h[b+232>>3];h[a+128>>3]=+h[b+136>>3]+ +h[b+200>>3];h[a+384>>3]=+h[b+200>>3]+ +h[b+168>>3];g=b+232|0;h[g>>3]=+h[g>>3]+ +h[b+216>>3];h[a+640>>3]=+h[b+168>>3]+ +h[b+232>>3];h[a+896>>3]=+h[b+232>>3]+ +h[b+152>>3];g=b+216|0;h[g>>3]=+h[g>>3]+ +h[b+248>>3];h[a+1152>>3]=+h[b+152>>3]+ +h[b+216>>3];h[a+1408>>3]=+h[b+216>>3]+ +h[b+184>>3];h[a+1664>>3]=+h[b+184>>3]+ +h[b+248>>3];h[a+1920>>3]=+h[b+248>>3];return}function cJ(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;c[f>>2]=0;g=cK(a,b,0,f)|0;f=d;c[f>>2]=(c[f>>2]|0)+64;i=e;return g|0}function cK(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,i=0.0,j=0,k=0,l=0,m=0,n=0,o=0.0,p=0;g=b;b=d;d=e;e=f;i=0.0;f=0;j=c[g+31896>>2]|0;if((d|0)!=0){k=c[226324]|0;l=g+27544|0}else{k=c[249858]|0;j=j-1|0;j=j&15;l=g+23192|0}if((j&1|0)!=0){m=l|0;n=j;cG(l+2176+((j+1&15)<<3)|0,l+(j<<3)|0,b)}else{m=l+2176|0;n=j+1|0;cG(l+(j<<3)|0,l+2176+(j<<3)+8|0,b)}c[g+31896>>2]=j;if((a[908536]|0)!=0){j=1087856+(-n<<3)|0;g=16;while(1){if((g|0)==0){break}o=+h[j>>3]*+h[m>>3];o=o- +h[j+8>>3]*+h[m+8>>3];o=o+ +h[j+16>>3]*+h[m+16>>3];o=o- +h[j+24>>3]*+h[m+24>>3];o=o+ +h[j+32>>3]*+h[m+32>>3];o=o- +h[j+40>>3]*+h[m+40>>3];o=o+ +h[j+48>>3]*+h[m+48>>3];o=o- +h[j+56>>3]*+h[m+56>>3];o=o+ +h[j+64>>3]*+h[m+64>>3];o=o- +h[j+72>>3]*+h[m+72>>3];o=o+ +h[j+80>>3]*+h[m+80>>3];o=o- +h[j+88>>3]*+h[m+88>>3];o=o+ +h[j+96>>3]*+h[m+96>>3];o=o- +h[j+104>>3]*+h[m+104>>3];o=o+ +h[j+112>>3]*+h[m+112>>3];o=o- +h[j+120>>3]*+h[m+120>>3];if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}g=g-1|0;m=m+128|0;j=j+256|0}o=+h[j>>3]*+h[m>>3];o=o+ +h[j+16>>3]*+h[m+16>>3];o=o+ +h[j+32>>3]*+h[m+32>>3];o=o+ +h[j+48>>3]*+h[m+48>>3];o=o+ +h[j+64>>3]*+h[m+64>>3];o=o+ +h[j+80>>3]*+h[m+80>>3];o=o+ +h[j+96>>3]*+h[m+96>>3];o=o+ +h[j+112>>3]*+h[m+112>>3];if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}m=m-128|0;j=j-256|0;j=j+(n<<1<<3)|0;g=15;while(1){if((g|0)==0){break}o=(-0.0- +h[j-8>>3])*+h[m>>3];o=o- +h[j-16>>3]*+h[m+8>>3];o=o- +h[j-24>>3]*+h[m+16>>3];o=o- +h[j-32>>3]*+h[m+24>>3];o=o- +h[j-40>>3]*+h[m+32>>3];o=o- +h[j-48>>3]*+h[m+40>>3];o=o- +h[j-56>>3]*+h[m+48>>3];o=o- +h[j-64>>3]*+h[m+56>>3];o=o- +h[j-72>>3]*+h[m+64>>3];o=o- +h[j-80>>3]*+h[m+72>>3];o=o- +h[j-88>>3]*+h[m+80>>3];o=o- +h[j-96>>3]*+h[m+88>>3];o=o- +h[j-104>>3]*+h[m+96>>3];o=o- +h[j-112>>3]*+h[m+104>>3];o=o- +h[j-120>>3]*+h[m+112>>3];o=o- +h[j>>3]*+h[m+120>>3];if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}g=g-1|0;m=m-128|0;j=j-256|0}}else{j=1087856+(-n<<3)|0;g=16;while(1){if((g|0)==0){break}o=+h[j>>3]*+h[m>>3];o=o- +h[j+8>>3]*+h[m+8>>3];o=o+ +h[j+16>>3]*+h[m+16>>3];o=o- +h[j+24>>3]*+h[m+24>>3];o=o+ +h[j+32>>3]*+h[m+32>>3];o=o- +h[j+40>>3]*+h[m+40>>3];o=o+ +h[j+48>>3]*+h[m+48>>3];o=o- +h[j+56>>3]*+h[m+56>>3];o=o+ +h[j+64>>3]*+h[m+64>>3];o=o- +h[j+72>>3]*+h[m+72>>3];o=o+ +h[j+80>>3]*+h[m+80>>3];o=o- +h[j+88>>3]*+h[m+88>>3];o=o+ +h[j+96>>3]*+h[m+96>>3];o=o- +h[j+104>>3]*+h[m+104>>3];o=o+ +h[j+112>>3]*+h[m+112>>3];o=o- +h[j+120>>3]*+h[m+120>>3];b=k;k=b+8|0;h[b>>3]=o;c[226326]=(c[226326]|0)+1;if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}g=g-1|0;m=m+128|0;j=j+256|0}o=+h[j>>3]*+h[m>>3];o=o+ +h[j+16>>3]*+h[m+16>>3];o=o+ +h[j+32>>3]*+h[m+32>>3];o=o+ +h[j+48>>3]*+h[m+48>>3];o=o+ +h[j+64>>3]*+h[m+64>>3];o=o+ +h[j+80>>3]*+h[m+80>>3];o=o+ +h[j+96>>3]*+h[m+96>>3];o=o+ +h[j+112>>3]*+h[m+112>>3];b=k;k=b+8|0;h[b>>3]=o;c[226326]=(c[226326]|0)+1;if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}m=m-128|0;j=j-256|0;j=j+(n<<1<<3)|0;g=15;while(1){if((g|0)==0){break}o=(-0.0- +h[j-8>>3])*+h[m>>3];o=o- +h[j-16>>3]*+h[m+8>>3];o=o- +h[j-24>>3]*+h[m+16>>3];o=o- +h[j-32>>3]*+h[m+24>>3];o=o- +h[j-40>>3]*+h[m+32>>3];o=o- +h[j-48>>3]*+h[m+40>>3];o=o- +h[j-56>>3]*+h[m+48>>3];o=o- +h[j-64>>3]*+h[m+56>>3];o=o- +h[j-72>>3]*+h[m+64>>3];o=o- +h[j-80>>3]*+h[m+72>>3];o=o- +h[j-88>>3]*+h[m+80>>3];o=o- +h[j-96>>3]*+h[m+88>>3];o=o- +h[j-104>>3]*+h[m+96>>3];o=o- +h[j-112>>3]*+h[m+104>>3];o=o- +h[j-120>>3]*+h[m+112>>3];o=o- +h[j>>3]*+h[m+120>>3];n=k;k=n+8|0;h[n>>3]=o;c[226326]=(c[226326]|0)+1;if(o>i){i=o}else{if(-0.0-o>i){i=-0.0-o}}g=g-1|0;m=m-128|0;j=j-256|0}}j=e;c[j>>2]=(c[j>>2]|0)+128;if(i>+h[c[227130]>>3]){h[c[227130]>>3]=i}if((d|0)!=0){c[226324]=k;p=f;return p|0}else{c[249858]=k;p=f;return p|0}return 0}function cL(a){a=a|0;var b=0;b=a;a=d[b|0]|0;a=a<<8;a=a|(d[b+1|0]|0);a=a<<8;a=a|(d[b+2|0]|0);a=a<<8;a=a|(d[b+3|0]|0);return a|0}function cM(a){a=a|0;var b=0;b=a;di(b|0,0,31904);c[b+40>>2]=0;c[b+12>>2]=0;c[b+8>>2]=0;c[b+16>>2]=0;c[b+20>>2]=0;c[b+24>>2]=0;c[b+28>>2]=0;c[b+32>>2]=0;c[b+44>>2]=0;c[b+48>>2]=0;c[b+52>>2]=-1;c[b+36>>2]=0;c[b+4>>2]=0;c[b>>2]=0;c[b+68>>2]=-1;c[b+23188>>2]=0;c[206054]=b+132+((c[b+23188>>2]|0)*2304|0)+512;c[b+31896>>2]=1;c[b+31900>>2]=1;c9(32767);cX(32);return 1}function cN(a){a=a|0;var b=0;b=c[a+4>>2]|0;while(1){if((b|0)==0){break}db(c[b>>2]|0);a=c[b+12>>2]|0;db(b);b=a}return}function cO(a){a=a|0;var b=0;b=a;a=c[b+4>>2]|0;c[b+4>>2]=c[a+12>>2];if((c[b+4>>2]|0)!=0){c[(c[b+4>>2]|0)+16>>2]=0}else{c[b>>2]=0;c[b+4>>2]=0}db(c[a>>2]|0);db(a);return}function cP(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=a;a=b;b=d;d=0;while(1){if((d|0)>=(a|0)){break}f=(c[(c[e+4>>2]|0)+4>>2]|0)-(c[(c[e+4>>2]|0)+8>>2]|0)|0;if((a-d|0)<=(f|0)){g=a-d|0}else{g=f}f=b+d|0;h=(c[c[e+4>>2]>>2]|0)+(c[(c[e+4>>2]|0)+8>>2]|0)|0;i=g;dj(f|0,h|0,i)|0;d=d+g|0;i=(c[e+4>>2]|0)+8|0;c[i>>2]=(c[i>>2]|0)+g;i=e+36|0;c[i>>2]=(c[i>>2]|0)-g;if((c[(c[e+4>>2]|0)+8>>2]|0)==(c[(c[e+4>>2]|0)+4>>2]|0)){cO(e)}}return}function cQ(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;b=e;c[f+8>>2]=0;e=d[b+1|0]>>3&1;g=d[b+2|0]>>2&3;h=d[b+3|0]>>6&3;i=d[b+2|0]>>4&15;i=c[11376+(e<<6)+(i<<2)>>2]|0;if((e|0)!=0){if((h|0)!=3){b=b+36|0}else{b=b+21|0}}else{if((h|0)!=3){b=b+21|0}else{b=b+13|0}}if((d[b|0]|0)!=(a[21568]|0)){j=0;k=j;return k|0}if((d[b+1|0]|0)!=(a[21569]|0)){j=0;k=j;return k|0}if((d[b+2|0]|0)!=(a[21570]|0)){j=0;k=j;return k|0}if((d[b+3|0]|0)!=(a[21571]|0)){j=0;k=j;return k|0}b=b+4|0;c[f>>2]=e;c[f+4>>2]=c[6488+(e<<4)+(g<<2)>>2];if((e|0)==0){g=f+4|0;c[g>>2]=c[g>>2]>>1}g=cL(b)|0;c[f+8>>2]=g;h=g;b=b+4|0;if((h&1|0)!=0){c[f+12>>2]=cL(b)|0;b=b+4|0}if((h&2|0)!=0){c[f+16>>2]=cL(b)|0;b=b+4|0}if((h&4|0)!=0){if((f+24|0)!=0){g=0;while(1){if((g|0)>=100){break}a[f+24+g|0]=a[b+g|0]|0;g=g+1|0}}b=b+100|0}c[f+20>>2]=-1;if((h&8|0)!=0){c[f+20>>2]=cL(b)|0;b=b+4|0}b=aa((e+1|0)*72e3|0,i)|0;c[f+124>>2]=(b|0)/(c[f+4>>2]|0)|0;j=1;k=j;return k|0}function cR(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+176|0;f=e|0;g=e+48|0;h=b;b=d;d=c[h+4>>2]|0;j=c[d+8>>2]|0;k=0;L2647:while(1){if((k|0)>=(b|0)){break}while(1){if((j|0)<(c[d+4>>2]|0)){break}d=c[d+12>>2]|0;j=c[d+8>>2]|0;if((d|0)==0){l=2019;break L2647}}j=j+1|0;k=k+1|0}if((l|0)==2019){m=-1;n=m;i=e;return n|0}k=0;L2660:while(1){if((k|0)>=48){break}while(1){if((j|0)<(c[d+4>>2]|0)){break}d=c[d+12>>2]|0;j=c[d+8>>2]|0;if((d|0)==0){l=2028;break L2660}}a[f+k|0]=a[(c[d>>2]|0)+j|0]|0;j=j+1|0;k=k+1|0}if((l|0)==2028){m=-1;n=m;i=e;return n|0}c[h+8>>2]=cQ(g,f|0)|0;if((c[h+8>>2]|0)!=0){c[h+12>>2]=c[g+12>>2];m=c[g+124>>2]|0;n=m;i=e;return n|0}else{m=0;n=m;i=e;return n|0}return 0}function cS(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;e=i;i=i+16|0;f=e|0;g=a;a=b;di(f|0,0,16);b=c[g+4>>2]|0;h=c[b+8>>2]|0;j=0;L2679:while(1){if((j|0)>=(c[g+36>>2]|0)){k=2066;break}c[f>>2]=c[f+4>>2];c[f+4>>2]=c[f+8>>2];c[f+8>>2]=c[f+12>>2];while(1){if((h|0)<(c[b+4>>2]|0)){break}b=c[b+12>>2]|0;h=c[b+8>>2]|0;if((b|0)==0){k=2045;break L2679}}c[f+12>>2]=d[(c[b>>2]|0)+h|0]|0;h=h+1|0;if((j|0)>=3){l=g+60|0;m=c[f>>2]|0;m=m<<8;m=m|c[f+4>>2];m=m<<8;m=m|c[f+8>>2];m=m<<8;m=m|c[f+12>>2];n=cz(m,c[l+24>>2]|0)|0;do{if((n|0)!=0){if((a|0)==0){break}if((m&1048576|0)!=0){o=(m&524288|0)!=0?0:1;p=0}else{o=1;p=1}if((p|0)!=0){q=(m>>>10&3)+6|0}else{q=(m>>>10&3)+(o*3|0)|0}do{if((((m>>>6&3|0)==3?1:2)|0)==(c[l>>2]|0)){if((o|0)!=(c[l+12>>2]|0)){r=0;break}if((p|0)!=(c[l+16>>2]|0)){r=0;break}r=(q|0)==(c[l+36>>2]|0)}else{r=0}}while(0);n=r&1}}while(0);if((n|0)!=0){k=2062;break}}j=j+1|0}if((k|0)==2045){s=-1;t=s;i=e;return t|0}else if((k|0)==2062){s=j-3|0;t=s;i=e;return t|0}else if((k|0)==2066){s=-1;t=s;i=e;return t|0}return 0}function cT(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;g=a;a=b;b=e;do{if((a|0)!=0){if((cU(g,a,d)|0)!=0){break}h=-1;j=h;i=f;return j|0}}while(0);do{if((c[g+16>>2]|0)==0){do{if((c[g+52>>2]|0)==-1){k=2078}else{if((c[g+31900>>2]|0)!=0){k=2078;break}l=cS(g,1)|0}}while(0);do{if((k|0)==2078){c[g+31900>>2]=0;l=cS(g,0)|0;if((c[g+36>>2]|0)<(l+48|0)){h=1;j=h;i=f;return j|0}d=cR(g,l)|0;if((c[g+8>>2]|0)==0){break}if((l+d|0)>(c[g+36>>2]|0)){h=1;j=h;i=f;return j|0}m=0;while(1){if((m|0)>=(d+l|0)){break}cW(g)|0;m=m+1|0}h=1;j=h;i=f;return j|0}}while(0);if((l|0)<0){h=1;j=h;i=f;return j|0}if((l|0)>0){c[g+32>>2]=0;c[g+31900>>2]=1;d=(c[206054]|0)-(g+132+((c[g+23188>>2]|0)*2304|0)+512)|0;if((d|0)>1792){d=0;c[206054]=g+132+((c[g+23188>>2]|0)*2304|0)+512}m=d+l-1792|0;while(1){if((m|0)<=0){break}l=l-1|0;cW(g)|0;m=m-1|0}cP(g,l,c[206054]|0);d=g+52|0;c[d>>2]=(c[d>>2]|0)+l}cV(g);d=g+60|0;a=c[g+23184>>2]|0;cH(d,a)|0;c[g+16>>2]=1;c[g+40>>2]=c[g+128>>2];c[g+28>>2]=(c[g+40>>2]|0)==0;if((c[g+72>>2]|0)!=0){c[g+44>>2]=(c[g+60>>2]|0)==1?9:17}else{c[g+44>>2]=(c[g+60>>2]|0)==1?17:32}if((c[g+88>>2]|0)!=0){a=g+44|0;c[a>>2]=(c[a>>2]|0)+2}c[g+23188>>2]=1-(c[g+23188>>2]|0);c[206054]=g+132+((c[g+23188>>2]|0)*2304|0)+512;c[1023088]=0;if((c[g+52>>2]|0)!=-1){break}h=1;j=h;i=f;return j|0}}while(0);if((c[g+20>>2]|0)==0){do{if((c[g+84>>2]|0)==3){if((c[g+36>>2]|0)<(c[g+44>>2]|0)){h=1;j=h;i=f;return j|0}cP(g,c[g+44>>2]|0,c[206054]|0);if((c[g+88>>2]|0)!=0){cA(16)|0}m=cY(g+60|0)|0;if((m|0)==-32767){cN(g);k=g;cM(k)|0;h=-1;j=h;i=f;return j|0}if((m|0)<0){m=0}c[g+48>>2]=(m+7|0)/8|0}else{if((c[g+128>>2]|0)<=(c[g+36>>2]|0)){c[g+48>>2]=c[g+128>>2];c[g+44>>2]=0;break}h=1;j=h;i=f;return j|0}}while(0);c[g+20>>2]=1}m=1;if((c[g+24>>2]|0)==0){if((c[g+48>>2]|0)>(c[g+36>>2]|0)){h=1;j=h;i=f;return j|0}cP(g,c[g+48>>2]|0,c[206054]|0);c[b>>2]=0;m=0;if((c[g+84>>2]|0)==3){if((c$(g,b)|0)!=0){m=-1}}else{b=c[n>>2]|0;k=c[g+84>>2]|0;at(b|0,17192,(v=i,i=i+8|0,c[v>>2]=k,v)|0)|0}c[206054]=g+132+((c[g+23188>>2]|0)*2304|0)+512+(c[g+44>>2]|0)+(c[g+48>>2]|0);c[g+24>>2]=1}if((c[g+28>>2]|0)!=0){do{if((c[g+32>>2]|0)!=0){c[g+40>>2]=(c[g+56>>2]|0)+(c[g+100>>2]|0)}else{l=cS(g,1)|0;if((l|0)>=0){c[g+40>>2]=l+(c[g+44>>2]|0)+(c[g+48>>2]|0);c[g+56>>2]=(c[g+40>>2]|0)-(c[g+100>>2]|0);break}h=m;j=h;i=f;return j|0}}while(0)}l=(c[g+40>>2]|0)-((c[g+44>>2]|0)+(c[g+48>>2]|0))|0;if((l|0)>(c[g+36>>2]|0)){h=m;j=h;i=f;return j|0}if((l|0)>0){cP(g,l,c[206054]|0);c[206054]=(c[206054]|0)+l;if(((c[206054]|0)-(g+132+((c[g+23188>>2]|0)*2304|0)+512)|0)>1792){l=c[n>>2]|0;at(l|0,19128,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0}}c[g+52>>2]=c[g+40>>2];c[g+32>>2]=c[g+28>>2];c[g+40>>2]=0;c[g+16>>2]=0;c[g+20>>2]=0;c[g+24>>2]=0;h=m;j=h;i=f;return j|0}function cU(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0;e=i;f=a;a=d;d=da(20)|0;if((d|0)==0){g=c[n>>2]|0;at(g|0,17056,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;h=0;j=h;i=e;return j|0}c[d>>2]=da(a)|0;if((c[d>>2]|0)==0){db(d);h=0;j=h;i=e;return j|0}c[d+4>>2]=a;g=c[d>>2]|0;k=b;b=a;dj(g|0,k|0,b)|0;c[d+12>>2]=0;c[d+16>>2]=c[f>>2];c[d+8>>2]=0;if((c[f+4>>2]|0)!=0){c[(c[f>>2]|0)+12>>2]=d}else{c[f+4>>2]=d}c[f>>2]=d;b=f+36|0;c[b>>2]=(c[b>>2]|0)+a;h=d;j=h;i=e;return j|0}function cV(a){a=a|0;var b=0;b=a;a=cW(b)|0;a=a<<8;a=a|(cW(b)|0);a=a<<8;a=a|(cW(b)|0);a=a<<8;a=a|(cW(b)|0);c[b+23184>>2]=a;return}function cW(a){a=a|0;var b=0,e=0,f=0,g=0;b=i;e=a;a=c[(c[e+4>>2]|0)+8>>2]|0;while(1){if((a|0)<(c[(c[e+4>>2]|0)+4>>2]|0)){f=2179;break}cO(e);if((c[e+4>>2]|0)==0){f=2177;break}a=c[(c[e+4>>2]|0)+8>>2]|0}if((f|0)==2177){g=c[n>>2]|0;at(g|0,17408,(v=i,i=i+1|0,i=i+7>>3<<3,c[v>>2]=0,v)|0)|0;g=c[o>>2]|0;ar(g|0)|0;g=c[n>>2]|0;ar(g|0)|0;aO(1);return 0}else if((f|0)==2179){f=d[(c[c[e+4>>2]>>2]|0)+a|0]|0;a=e+36|0;c[a>>2]=(c[a>>2]|0)-1;a=(c[e+4>>2]|0)+8|0;c[a>>2]=(c[a>>2]|0)+1;i=b;return f|0}return 0}function cX(a){a=a|0;var d=0,e=0.0,f=0.0,g=0,i=0.0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=a;a=-256;while(1){if((a|0)>=122){break}h[1066136+(a+256<<3)>>3]=+R(2.0,+(+(a+210|0)*-.25));a=a+1|0}a=0;while(1){if((a|0)>=8207){break}h[999440+(a<<3)>>3]=+R(+(+(a|0)),1.3333333333333333);a=a+1|0}a=0;while(1){if((a|0)>=8){break}e=+Q(+(+h[6776+(a<<3)>>3]*+h[6776+(a<<3)>>3]+1.0));h[4092432+(a<<3)>>3]=1.0/e;h[4092496+(a<<3)>>3]=+h[6776+(a<<3)>>3]/e;a=a+1|0}a=0;while(1){if((a|0)>=18){break}e=+T(+(+((a<<1)+1|0)*.04363323129985824))*.5;f=e/+S(+(+((a<<1)+19|0)*3.141592653589793/72.0));h[825664+(a<<3)>>3]=f;h[825376+(a<<3)>>3]=f;f=+T(+(+((a+18<<1)+1|0)*.04363323129985824))*.5;e=f/+S(+(+((a+18<<1)+19|0)*3.141592653589793/72.0));h[826240+(a+18<<3)>>3]=e;h[825376+(a+18<<3)>>3]=e;a=a+1|0}a=0;while(1){if((a|0)>=6){break}h[825664+(a+18<<3)>>3]=.5/+S(+(+((a+18<<1)+19|0)*3.141592653589793/72.0));h[826240+(a+12<<3)>>3]=.5/+S(+(+((a+12<<1)+19|0)*3.141592653589793/72.0));e=+T(+(+((a<<1)+13|0)*.1308996938995747))*.5;h[825664+(a+24<<3)>>3]=e/+S(+(+((a+24<<1)+19|0)*3.141592653589793/72.0));h[826240+(a<<3)>>3]=0.0;h[825664+(a+30<<3)>>3]=0.0;e=+T(+(+((a<<1)+1|0)*.1308996938995747))*.5;h[826240+(a+6<<3)>>3]=e/+S(+(+((a+6<<1)+19|0)*3.141592653589793/72.0));a=a+1|0}a=0;while(1){if((a|0)>=9){break}h[4093080+(a<<3)>>3]=+S(+(+(a|0)*.17453292519943295));a=a+1|0}a=0;while(1){if((a|0)>=9){break}h[826568+(a<<3)>>3]=.5/+S(+(+((a<<1)+1|0)*3.141592653589793/36.0));a=a+1|0}a=0;while(1){if((a|0)>=3){break}h[826640+(a<<3)>>3]=.5/+S(+(+((a<<1)+1|0)*3.141592653589793/12.0));a=a+1|0}h[2711]=+S(.5235987755982988);h[2710]=+S(1.0471975511965976);a=0;while(1){if((a|0)>=12){break}e=+T(+(+((a<<1)+1|0)*.1308996938995747))*.5;h[825952+(a<<3)>>3]=e/+S(+(+((a<<1)+7|0)*3.141592653589793/24.0));g=0;while(1){if((g|0)>=6){break}h[4093152+(a*48|0)+(g<<3)>>3]=+S(+(+(aa((a<<1)+7|0,(g<<1)+1|0)|0)*.1308996938995747));g=g+1|0}a=a+1|0}g=0;while(1){if((g|0)>=4){break}a=0;while(1){if((a|0)>=(c[6760+(g<<2)>>2]|0)){break}h[824224+(g*288|0)+(a<<3)>>3]=+h[825376+(g*288|0)+(a<<3)>>3];a=a+2|0}a=1;while(1){if((a|0)>=(c[6760+(g<<2)>>2]|0)){break}h[824224+(g*288|0)+(a<<3)>>3]=-0.0- +h[825376+(g*288|0)+(a<<3)>>3];a=a+2|0}g=g+1|0}a=0;while(1){if((a|0)>=16){break}e=+U(+(+(a|0)*3.141592653589793/12.0));h[827048+(a<<3)>>3]=e/(1.0+e);h[826792+(a<<3)>>3]=1.0/(1.0+e);h[826920+(a<<3)>>3]=e*1.4142135623730951/(1.0+e);h[826664+(a<<3)>>3]=1.4142135623730951/(1.0+e);g=0;while(1){if((g|0)>=2){break}e=+R(2.0,+((+(g|0)+1.0)*-.25));f=1.0;i=1.0;if((a|0)>0){if((a&1|0)!=0){f=+R(+e,+((+(a|0)+1.0)*.5))}else{i=+R(+e,+(+(a|0)*.5))}}h[906168+(g<<7)+(a<<3)>>3]=f;h[905656+(g<<7)+(a<<3)>>3]=i;h[905912+(g<<7)+(a<<3)>>3]=f*1.4142135623730951;h[905400+(g<<7)+(a<<3)>>3]=i*1.4142135623730951;g=g+1|0}a=a+1|0}g=0;while(1){if((g|0)>=9){break}j=12080+(g*144|0)|0;k=915856+(g*608|0)|0;c[921328+(g*12|0)>>2]=k;l=k;k=j+46|0;a=0;m=0;while(1){if((m|0)>=8){break}n=l;l=n+4|0;c[n>>2]=b[k>>1]>>1;n=l;l=n+4|0;c[n>>2]=a;n=l;l=n+4|0;c[n>>2]=3;n=l;l=n+4|0;c[n>>2]=m;m=m+1|0;n=k;k=n+2|0;a=a+(b[n>>1]|0)|0}k=j+124|0;m=3;while(1){if((m|0)>=13){break}n=k;k=n+2|0;o=b[n>>1]>>1;p=0;while(1){if((p|0)>=3){break}n=l;l=n+4|0;c[n>>2]=o;n=l;l=n+4|0;c[n>>2]=a+p;n=l;l=n+4|0;c[n>>2]=p;n=l;l=n+4|0;c[n>>2]=m;p=p+1|0}a=a+(o*6|0)|0;m=m+1|0}c[908544+(g*12|0)>>2]=l;n=910240+(g*624|0)|0;c[921332+(g*12|0)>>2]=n;l=n;k=j+118|0;a=0;m=0;while(1){if((m|0)>=13){break}n=k;k=n+2|0;q=b[n>>1]>>1;p=0;while(1){if((p|0)>=3){break}n=l;l=n+4|0;c[n>>2]=q;n=l;l=n+4|0;c[n>>2]=a+p;n=l;l=n+4|0;c[n>>2]=p;n=l;l=n+4|0;c[n>>2]=m;p=p+1|0}a=a+(q*6|0)|0;m=m+1|0}c[908548+(g*12|0)>>2]=l;o=908656+(g*176|0)|0;c[921336+(g*12|0)>>2]=o;l=o;k=j+46|0;m=0;while(1){if((m|0)>=22){break}o=k;k=o+2|0;n=l;l=n+4|0;c[n>>2]=b[o>>1]>>1;o=l;l=o+4|0;c[o>>2]=m;m=m+1|0}c[908552+(g*12|0)>>2]=l;g=g+1|0}g=0;while(1){if((g|0)>=9){break}a=0;while(1){if((a|0)>=23){break}c[998432+(g*92|0)+(a<<2)>>2]=(((b[12080+(g*144|0)+(a<<1)>>1]|0)-1+8|0)/18|0)+1;if((c[998432+(g*92|0)+(a<<2)>>2]|0)>(d|0)){c[998432+(g*92|0)+(a<<2)>>2]=d}a=a+1|0}a=0;while(1){if((a|0)>=14){break}c[827616+(g*56|0)+(a<<2)>>2]=(((b[12170+(g*144|0)+(a<<1)>>1]|0)-1|0)/18|0)+1;if((c[827616+(g*56|0)+(a<<2)>>2]|0)>(d|0)){c[827616+(g*56|0)+(a<<2)>>2]=d}a=a+1|0}g=g+1|0}a=0;while(1){if((a|0)>=5){break}g=0;while(1){if((g|0)>=6){break}r=0;while(1){if((r|0)>=6){break}c[1065112+(r+(g*6|0)+(a*36|0)<<2)>>2]=a|g<<3|r<<6|12288;r=r+1|0}g=g+1|0}a=a+1|0}a=0;while(1){if((a|0)>=4){break}g=0;while(1){if((g|0)>=4){break}r=0;while(1){if((r|0)>=4){break}c[1065112+(r+(g<<2)+(a<<4)+180<<2)>>2]=a|g<<3|r<<6|16384;r=r+1|0}g=g+1|0}a=a+1|0}a=0;while(1){if((a|0)>=4){break}g=0;while(1){if((g|0)>=3){break}q=g+(a*3|0)|0;c[1065112+(q+244<<2)>>2]=a|g<<3|20480;c[906440+(q+500<<2)>>2]=a|g<<3|8192|32768;g=g+1|0}a=a+1|0}a=0;while(1){if((a|0)>=5){break}g=0;while(1){if((g|0)>=5){break}r=0;while(1){if((r|0)>=4){break}q=0;while(1){if((q|0)>=4){break}c[906440+(q+(r<<2)+(g<<4)+(a*80|0)<<2)>>2]=a|g<<3|r<<6|q<<9;q=q+1|0}r=r+1|0}g=g+1|0}a=a+1|0}a=0;while(1){if((a|0)>=5){break}g=0;while(1){if((g|0)>=5){break}r=0;while(1){if((r|0)>=4){break}c[906440+(r+(g<<2)+(a*20|0)+400<<2)>>2]=a|g<<3|r<<6|4096;r=r+1|0}g=g+1|0}a=a+1|0}return}function cY(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0;b=a;a=c[b>>2]|0;d=c[b+8>>2]|0;e=c[b+36>>2]|0;if((a|0)==1){d=0}if((c[b+48>>2]|0)==1){f=c[b+52>>2]&2}else{f=0}do{if((c[b+12>>2]|0)!=0){g=1;if((cZ(827192,a,f,e,d)|0)!=0){break}h=-32767;i=h;return i|0}else{g=2;if((c_(827192,a,f,e,d)|0)!=0){break}h=-32767;i=h;return i|0}}while(0);d=0;e=0;while(1){if((e|0)>=(g|0)){break}f=0;while(1){if((f|0)>=(a|0)){break}d=d+(c[827200+(f*208|0)+(e*104|0)+4>>2]|0)|0;f=f+1|0}e=e+1|0}h=d-(c[206798]<<3)|0;i=h;return i|0}function cZ(e,f,g,h,i){e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0;j=e;e=f;f=g;g=h;h=(i|0)==3?4:0;c[j>>2]=cA(8)|0;if((e|0)==1){c[j+4>>2]=c8()|0}else{c[j+4>>2]=cB(2)|0}i=0;while(1){if((i|0)>=(e|0)){k=2409;break}l=j+8+(i*208|0)|0;c[l+4>>2]=cA(12)|0;c[l+8>>2]=cB(9)|0;if((c[l+8>>2]|0)>>>0>288){k=2381;break}m=cB(8)|0;if((m&255|0)>(d[c[227132]|0]|0)){a[c[227132]|0]=m&255}if((m&255|0)<(d[c[227128]|0]|0)){a[c[227128]|0]=m&255}c[l+100>>2]=1068184+(-m<<3)+(h<<3);if((f|0)!=0){m=l+100|0;c[m>>2]=(c[m>>2]|0)+16}c[l+12>>2]=cA(9)|0;if((c8()|0)!=0){c[l+16>>2]=cB(2)|0;c[l+20>>2]=c8()|0;c[l+24>>2]=cB(5)|0;c[l+28>>2]=cB(5)|0;c[l+32>>2]=0;m=0;while(1){if((m|0)>=3){break}n=(cB(3)|0)<<3;c[l+88+(m<<2)>>2]=(c[l+100>>2]|0)+(n<<3);m=m+1|0}if((c[l+16>>2]|0)==0){k=2394;break}if((c[l+16>>2]|0)==2){c[l+68>>2]=18}else{if((g|0)==8){c[l+68>>2]=54}else{c[l+68>>2]=27}}c[l+72>>2]=288}else{m=0;while(1){if((m|0)>=3){break}c[l+24+(m<<2)>>2]=cB(5)|0;m=m+1|0}m=cB(4)|0;n=cB(3)|0;c[l+68>>2]=b[12080+(g*144|0)+(m+1<<1)>>1]>>1;c[l+72>>2]=b[12080+(g*144|0)+(m+1+n+1<<1)>>1]>>1;c[l+16>>2]=0;c[l+20>>2]=0}c[l+80>>2]=c8()|0;c[l+84>>2]=c8()|0;i=i+1|0}if((k|0)==2381){o=0;p=o;return p|0}else if((k|0)==2394){o=0;p=o;return p|0}else if((k|0)==2409){o=1;p=o;return p|0}return 0}function c_(e,f,g,h,i){e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=e;e=f;f=g;g=h;h=(i|0)==3?4:0;c[j>>2]=cA(9)|0;if((e|0)==1){c[j+4>>2]=cB(5)|0}else{c[j+4>>2]=cB(3)|0}i=0;while(1){if((i|0)>=(e|0)){break}c[j+8+(i*208|0)>>2]=-1;c[j+8+(i*208|0)+104>>2]=cB(4)|0;i=i+1|0}k=0;L3165:while(1){if((k|0)>=2){l=2450;break}i=0;while(1){if((i|0)>=(e|0)){break}m=j+8+(i*208|0)+(k*104|0)|0;c[m+4>>2]=cA(12)|0;c[m+8>>2]=cB(9)|0;if((c[m+8>>2]|0)>>>0>288){l=2426;break L3165}n=cB(8)|0;if((n&255|0)>(d[c[227132]|0]|0)){a[c[227132]|0]=n&255}if((n&255|0)<(d[c[227128]|0]|0)){a[c[227128]|0]=n&255}c[m+100>>2]=1068184+(-n<<3)+(h<<3);if((f|0)!=0){n=m+100|0;c[n>>2]=(c[n>>2]|0)+16}c[m+12>>2]=cB(4)|0;if((c8()|0)!=0){c[m+16>>2]=cB(2)|0;c[m+20>>2]=c8()|0;c[m+24>>2]=cB(5)|0;c[m+28>>2]=cB(5)|0;c[m+32>>2]=0;n=0;while(1){if((n|0)>=3){break}o=(cB(3)|0)<<3;c[m+88+(n<<2)>>2]=(c[m+100>>2]|0)+(o<<3);n=n+1|0}if((c[m+16>>2]|0)==0){l=2439;break L3165}c[m+68>>2]=18;c[m+72>>2]=288}else{n=0;while(1){if((n|0)>=3){break}c[m+24+(n<<2)>>2]=cB(5)|0;n=n+1|0}n=cB(4)|0;o=cB(3)|0;c[m+68>>2]=b[12080+(g*144|0)+(n+1<<1)>>1]>>1;c[m+72>>2]=b[12080+(g*144|0)+(n+1+o+1<<1)>>1]>>1;c[m+16>>2]=0;c[m+20>>2]=0}c[m+76>>2]=c8()|0;c[m+80>>2]=c8()|0;c[m+84>>2]=c8()|0;i=i+1|0}k=k+1|0}if((l|0)==2426){p=0;q=p;return q|0}else if((l|0)==2439){p=0;q=p;return q|0}else if((l|0)==2450){p=1;q=p;return q|0}return 0}function c$(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0.0,A=0.0,B=0,C=0,D=0,E=0,F=0;d=i;i=i+320|0;e=d|0;f=d+312|0;g=a;a=b;b=0;j=g+60|0;k=c[j>>2]|0;l=c[j+8>>2]|0;m=c[j+36>>2]|0;if((cF(g,c[206798]|0)|0)==-1){n=-32767;o=n;i=d;return o|0}if((k|0)==1){p=1;l=0}else{if((l|0)>=0){p=1}else{p=2}}if((c[j+48>>2]|0)==1){q=c[j+52>>2]&2;r=c[j+52>>2]&1}else{r=0;q=0}if((c[j+12>>2]|0)!=0){s=1}else{s=2}t=0;while(1){if((t|0)>=(s|0)){u=2522;break}v=827200+(t*104|0)|0;if((c[j+12>>2]|0)!=0){w=c0(e|0,v,0)|0}else{w=c1(e|0,v)|0}if((c2(1078504,e|0,v,m,w)|0)!=0){u=2475;break}if((k|0)==2){v=827408+(t*104|0)|0;if((c[j+12>>2]|0)!=0){x=c0(e+156|0,v,r)|0}else{x=c1(e+156|0,v)|0}if((c2(1083112,e+156|0,v,m,x)|0)!=0){u=2481;break}if((q|0)!=0){y=0;while(1){if((y|0)>=576){break}z=+h[1078504+(y<<3)>>3];A=+h[1083112+(y<<3)>>3];h[1083112+(y<<3)>>3]=z-A;h[1078504+(y<<3)>>3]=z+A;y=y+1|0}}if((r|0)!=0){c3(1078504,e+156|0,v,m,q,c[j+12>>2]|0)}do{if((q|0)!=0){u=2493}else{if((r|0)!=0){u=2493;break}if((l|0)==3){u=2493}}}while(0);if((u|0)==2493){u=0;if((c[v+64>>2]|0)>>>0>(c[827264+(t*104|0)>>2]|0)>>>0){c[827264+(t*104|0)>>2]=c[v+64>>2]}else{c[v+64>>2]=c[827264+(t*104|0)>>2]}}y=l;if((y|0)==3){B=1078504;C=1083112;D=0;while(1){if((D|0)>=((c[v+64>>2]|0)*18|0|0)){break}E=C;C=E+8|0;h[B>>3]=+h[B>>3]+ +h[E>>3];D=D+1|0;B=B+8|0}}else if((y|0)==1){B=1078504;D=1083112;C=0;while(1){if((C|0)>=((c[v+64>>2]|0)*18|0|0)){break}E=D;D=E+8|0;F=B;B=F+8|0;h[F>>3]=+h[E>>3];C=C+1|0}}}C=0;while(1){if((C|0)>=(p|0)){break}B=827200+(C*208|0)+(t*104|0)|0;c4(1078504+(C*4608|0)|0,B);c5(g,1078504+(C*4608|0)|0,1069288+(C*4608|0)|0,C,B);C=C+1|0}C=0;while(1){if((C|0)>=18){break}if((l|0)>=0){b=b+(cJ(g,1069288+(C<<8)|0,a)|0)|0}else{c[f>>2]=c[a>>2];b=b+(cK(g,1069288+(C<<8)|0,0,f)|0)|0;b=b+(cK(g,1073896+(C<<8)|0,1,a)|0)|0}C=C+1|0}t=t+1|0}if((u|0)==2475){n=0;o=n;i=d;return o|0}else if((u|0)==2481){n=0;o=n;i=d;return o|0}else if((u|0)==2522){n=0;o=n;i=d;return o|0}return 0}function c0(a,b,e){a=a|0;b=b|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=a;a=b;b=0;g=0;if((e|0)!=0){h=c[1065112+((c[a+12>>2]|0)>>>1<<2)>>2]|0}else{h=c[906440+(c[a+12>>2]<<2)>>2]|0}c[a+76>>2]=h>>>15&1;b=0;if((c[a+16>>2]|0)==2){b=b+1|0;if((c[a+20>>2]|0)!=0){b=b+1|0}}a=21576+(b*24|0)+((h>>>12&7)<<2)|0;e=0;while(1){if((e|0)>=4){break}i=h&7;h=h>>>3;if((i|0)!=0){j=0;while(1){if((j|0)>=(d[a+e|0]|0|0)){break}k=f;f=k+4|0;c[k>>2]=cB(i)|0;j=j+1|0}g=g+(aa(d[a+e|0]|0,i)|0)|0}else{j=0;while(1){if((j|0)>=(d[a+e|0]|0|0)){break}k=f;f=k+4|0;c[k>>2]=0;j=j+1|0}}e=e+1|0}b=(b<<1)+1|0;e=0;while(1){if((e|0)>=(b|0)){break}j=f;f=j+4|0;c[j>>2]=0;e=e+1|0}return g|0}function c1(a,b){a=a|0;b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0;e=a;a=b;b=d[(c[a+12>>2]|0)+21648|0]|0;f=d[(c[a+12>>2]|0)+21664|0]|0;if((c[a+16>>2]|0)==2){g=18;h=(b+f|0)*18|0;if((c[a+20>>2]|0)!=0){g=8;while(1){if((g|0)==0){break}i=e;e=i+4|0;c[i>>2]=cB(b)|0;g=g-1|0}g=9;h=h-b|0}while(1){if((g|0)==0){break}i=e;e=i+4|0;c[i>>2]=cB(b)|0;g=g-1|0}g=18;while(1){if((g|0)==0){break}i=e;e=i+4|0;c[i>>2]=cB(f)|0;g=g-1|0}g=e;e=g+4|0;c[g>>2]=0;g=e;e=g+4|0;c[g>>2]=0;g=e;e=g+4|0;c[g>>2]=0;j=h;return j|0}g=c[a>>2]|0;if((g|0)<0){k=11;while(1){if((k|0)==0){break}a=e;e=a+4|0;c[a>>2]=cB(b)|0;k=k-1|0}k=10;while(1){if((k|0)==0){break}a=e;e=a+4|0;c[a>>2]=cB(f)|0;k=k-1|0}h=((b+f|0)*10|0)+b|0}else{h=0;if((g&8|0)!=0){e=e+24|0}else{k=6;while(1){if((k|0)==0){break}a=e;e=a+4|0;c[a>>2]=cB(b)|0;k=k-1|0}h=h+(b*6|0)|0}if((g&4|0)!=0){e=e+20|0}else{k=5;while(1){if((k|0)==0){break}a=e;e=a+4|0;c[a>>2]=cB(b)|0;k=k-1|0}h=h+(b*5|0)|0}if((g&2|0)!=0){e=e+20|0}else{k=5;while(1){if((k|0)==0){break}b=e;e=b+4|0;c[b>>2]=cB(f)|0;k=k-1|0}h=h+(f*5|0)|0}if((g&1|0)!=0){e=e+20|0}else{k=5;while(1){if((k|0)==0){break}g=e;e=g+4|0;c[g>>2]=cB(f)|0;k=k-1|0}h=h+(f*5|0)|0}}f=e;e=f+4|0;c[f>>2]=0;j=h;return j|0}function c2(a,d,e,f,g){a=a|0;d=d|0;e=e|0;f=f|0;g=g|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0.0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;j=i;i=i+32|0;k=j|0;l=j+16|0;m=a;a=d;d=e;e=f;f=(c[d+80>>2]|0)+1|0;n=m;o=(c[d+4>>2]|0)-g|0;g=((m+4608-n|0)/8|0)>>1;while(1){if((g|0)<=0){break}p=n;n=p+8|0;h[p>>3]=0.0;p=n;n=p+8|0;h[p>>3]=0.0;g=g-1|0}n=m;g=c[d+8>>2]|0;p=c[d+68>>2]|0;q=c[d+72>>2]|0;r=288-g>>1;if((g|0)<=(p|0)){c[k>>2]=g;c[k+4>>2]=0;c[k+8>>2]=0}else{c[k>>2]=p;if((g|0)<=(q|0)){c[k+4>>2]=g-(c[k>>2]|0);c[k+8>>2]=0}else{c[k+4>>2]=q-(c[k>>2]|0);c[k+8>>2]=g-q}}if((c[d+16>>2]|0)==2){q=0;g=0;p=0;s=0.0;if((c[d+20>>2]|0)!=0){c[l+12>>2]=-1;c[l+8>>2]=2;c[l+4>>2]=2;c[l>>2]=2;t=c[921328+(e*12|0)>>2]|0;u=c[908544+(e*12|0)>>2]|0}else{c[l+12>>2]=-1;c[l+8>>2]=-1;c[l+4>>2]=-1;c[l>>2]=-1;t=c[921332+(e*12|0)>>2]|0;u=c[908548+(e*12|0)>>2]|0}v=0;w=0;while(1){if((w|0)>=2){break}x=c[k+(w<<2)>>2]|0;y=6856+(c[d+24+(w<<2)>>2]<<3)|0;while(1){if((x|0)==0){break}if((v|0)==0){z=t;t=z+4|0;v=c[z>>2]|0;z=t;t=z+4|0;n=m+(c[z>>2]<<3)|0;z=t;t=z+4|0;g=c[z>>2]|0;z=t;t=z+4|0;p=c[z>>2]|0;if((g|0)==3){z=a;a=z+4|0;s=+h[(c[d+100>>2]|0)+(c[z>>2]<<f<<3)>>3];q=1}else{z=a;a=z+4|0;s=+h[(c[d+88+(g<<2)>>2]|0)+(c[z>>2]<<f<<3)>>3];q=3}}z=c[y+4>>2]|0;while(1){A=z;z=A+2|0;B=b[A>>1]|0;C=B;if((B|0)>=0){break}if((c8()|0)!=0){z=z+(-C<<1)|0}o=o-1|0}z=C>>4;C=C&15;if((z|0)==15){c[l+(g<<2)>>2]=p;o=o-((c[y>>2]|0)+1)|0;z=z+(cA(c[y>>2]|0)|0)|0;if((c8()|0)!=0){h[n>>3]=(-0.0- +h[999440+(z<<3)>>3])*s}else{h[n>>3]=+h[999440+(z<<3)>>3]*s}}else{if((z|0)!=0){c[l+(g<<2)>>2]=p;if((c8()|0)!=0){h[n>>3]=(-0.0- +h[999440+(z<<3)>>3])*s}else{h[n>>3]=+h[999440+(z<<3)>>3]*s}o=o-1|0}else{h[n>>3]=0.0}}n=n+(q<<3)|0;if((C|0)==15){c[l+(g<<2)>>2]=p;o=o-((c[y>>2]|0)+1)|0;C=C+(cA(c[y>>2]|0)|0)|0;if((c8()|0)!=0){h[n>>3]=(-0.0- +h[999440+(C<<3)>>3])*s}else{h[n>>3]=+h[999440+(C<<3)>>3]*s}}else{if((C|0)!=0){c[l+(g<<2)>>2]=p;if((c8()|0)!=0){h[n>>3]=(-0.0- +h[999440+(C<<3)>>3])*s}else{h[n>>3]=+h[999440+(C<<3)>>3]*s}o=o-1|0}else{h[n>>3]=0.0}}n=n+(q<<3)|0;x=x-1|0;v=v-1|0}w=w+1|0}while(1){if((r|0)!=0){D=(o|0)>0}else{D=0}if(!D){break}C=c[6844+(c[d+84>>2]<<3)>>2]|0;while(1){x=C;C=x+2|0;y=b[x>>1]|0;E=y;if((y<<16>>16|0)>=0){break}o=o-1|0;if((o|0)<0){F=2677;break}if((c8()|0)!=0){C=C+(-(E<<16>>16)<<1)|0}}if((F|0)==2677){F=0;o=o+1|0;E=0}w=0;while(1){if((w|0)>=4){break}if((w&1|0)==0){if((v|0)==0){C=t;t=C+4|0;v=c[C>>2]|0;C=t;t=C+4|0;n=m+(c[C>>2]<<3)|0;C=t;t=C+4|0;g=c[C>>2]|0;C=t;t=C+4|0;p=c[C>>2]|0;if((g|0)==3){C=a;a=C+4|0;s=+h[(c[d+100>>2]|0)+(c[C>>2]<<f<<3)>>3];q=1}else{C=a;a=C+4|0;s=+h[(c[d+88+(g<<2)>>2]|0)+(c[C>>2]<<f<<3)>>3];q=3}}v=v-1|0}if((E<<16>>16&8>>w|0)!=0){c[l+(g<<2)>>2]=p;o=o-1|0;if((o|0)<0){F=2692;break}if((c8()|0)!=0){h[n>>3]=-0.0-s}else{h[n>>3]=s}}else{h[n>>3]=0.0}n=n+(q<<3)|0;w=w+1|0}if((F|0)==2692){F=0;o=o+1|0}r=r-1|0}while(1){if(t>>>0>=u>>>0){break}if((v|0)==0){w=t;t=w+4|0;v=c[w>>2]|0;w=t;t=w+4|0;n=m+(c[w>>2]<<3)|0;w=t;t=w+4|0;if((c[w>>2]|0)==3){q=1}else{q=3}t=t+4|0}v=v-1|0;h[n>>3]=0.0;n=n+(q<<3)|0;h[n>>3]=0.0;n=n+(q<<3)|0}c[d+48>>2]=(c[l>>2]|0)+1;c[d+52>>2]=(c[l+4>>2]|0)+1;c[d+56>>2]=(c[l+8>>2]|0)+1;c[d+60>>2]=(c[l+12>>2]|0)+1;if((c[l>>2]|0)>(c[l+4>>2]|0)){G=c[l>>2]|0}else{G=c[l+4>>2]|0}q=G;if((q|0)>(c[l+8>>2]|0)){H=q}else{H=c[l+8>>2]|0}q=H+1|0;if((q|0)!=0){I=c[827616+(e*56|0)+(q<<2)>>2]|0}else{I=c[998432+(e*92|0)+((c[l+12>>2]|0)+1<<2)>>2]|0}c[d+64>>2]=I}else{I=(c[d+76>>2]|0)!=0?6544:905312;l=-1;q=0;H=c[921336+(e*12|0)>>2]|0;s=0.0;G=0;v=0;while(1){if((v|0)>=3){break}t=c[k+(v<<2)>>2]|0;u=6856+(c[d+24+(v<<2)>>2]<<3)|0;while(1){if((t|0)==0){break}if((G|0)==0){w=H;H=w+4|0;G=c[w>>2]|0;w=a;a=w+4|0;p=I;I=p+4|0;s=+h[(c[d+100>>2]|0)+((c[w>>2]|0)+(c[p>>2]|0)<<f<<3)>>3];p=H;H=p+4|0;q=c[p>>2]|0}p=c[u+4>>2]|0;while(1){w=p;p=w+2|0;g=b[w>>1]|0;J=g;if((g|0)>=0){break}if((c8()|0)!=0){p=p+(-J<<1)|0}o=o-1|0}p=J>>4;J=J&15;if((p|0)==15){l=q;o=o-((c[u>>2]|0)+1)|0;p=p+(cA(c[u>>2]|0)|0)|0;if((c8()|0)!=0){g=n;n=g+8|0;h[g>>3]=(-0.0- +h[999440+(p<<3)>>3])*s}else{g=n;n=g+8|0;h[g>>3]=+h[999440+(p<<3)>>3]*s}}else{if((p|0)!=0){l=q;if((c8()|0)!=0){g=n;n=g+8|0;h[g>>3]=(-0.0- +h[999440+(p<<3)>>3])*s}else{g=n;n=g+8|0;h[g>>3]=+h[999440+(p<<3)>>3]*s}o=o-1|0}else{p=n;n=p+8|0;h[p>>3]=0.0}}if((J|0)==15){l=q;o=o-((c[u>>2]|0)+1)|0;J=J+(cA(c[u>>2]|0)|0)|0;if((c8()|0)!=0){p=n;n=p+8|0;h[p>>3]=(-0.0- +h[999440+(J<<3)>>3])*s}else{p=n;n=p+8|0;h[p>>3]=+h[999440+(J<<3)>>3]*s}}else{if((J|0)!=0){l=q;if((c8()|0)!=0){p=n;n=p+8|0;h[p>>3]=(-0.0- +h[999440+(J<<3)>>3])*s}else{p=n;n=p+8|0;h[p>>3]=+h[999440+(J<<3)>>3]*s}o=o-1|0}else{p=n;n=p+8|0;h[p>>3]=0.0}}t=t-1|0;G=G-1|0}v=v+1|0}while(1){if((r|0)!=0){K=(o|0)>0}else{K=0}if(!K){break}J=c[6844+(c[d+84>>2]<<3)>>2]|0;while(1){k=J;J=k+2|0;t=b[k>>1]|0;L=t;if((t<<16>>16|0)>=0){break}o=o-1|0;if((o|0)<0){F=2766;break}if((c8()|0)!=0){J=J+(-(L<<16>>16)<<1)|0}}if((F|0)==2766){F=0;o=o+1|0;L=0}v=0;while(1){if((v|0)>=4){break}if((v&1|0)==0){if((G|0)==0){J=H;H=J+4|0;G=c[J>>2]|0;J=H;H=J+4|0;q=c[J>>2]|0;J=a;a=J+4|0;t=I;I=t+4|0;s=+h[(c[d+100>>2]|0)+((c[J>>2]|0)+(c[t>>2]|0)<<f<<3)>>3]}G=G-1|0}if((L<<16>>16&8>>v|0)!=0){l=q;o=o-1|0;if((o|0)<0){F=2778;break}if((c8()|0)!=0){t=n;n=t+8|0;h[t>>3]=-0.0-s}else{t=n;n=t+8|0;h[t>>3]=s}}else{t=n;n=t+8|0;h[t>>3]=0.0}v=v+1|0}if((F|0)==2778){F=0;o=o+1|0}r=r-1|0}v=((m+4608-n|0)/8|0)>>1;while(1){if((v|0)==0){break}m=n;n=m+8|0;h[m>>3]=0.0;m=n;n=m+8|0;h[m>>3]=0.0;v=v-1|0}c[d+60>>2]=l+1;c[d+64>>2]=c[998432+(e*92|0)+(c[d+60>>2]<<2)>>2]}while(1){if((o|0)<=16){break}cA(16)|0;o=o-16|0}do{if((o|0)>0){d=o;cA(d)|0}else{if((o|0)>=0){break}M=-1;N=M;i=j;return N|0}}while(0);M=0;N=M;i=j;return N|0}function c3(a,d,e,f,g,i){a=a|0;d=d|0;e=e|0;f=f|0;g=g|0;i=i|0;var j=0,k=0,l=0,m=0,n=0.0,o=0.0,p=0.0,q=0,r=0,s=0;j=d;d=e;e=g;g=a;a=12080+(f*144|0)|0;if((i|0)!=0){i=c[d+12>>2]&1;if((e|0)!=0){k=905912+(i<<7)|0;l=905400+(i<<7)|0}else{k=906168+(i<<7)|0;l=905656+(i<<7)|0}}else{if((e|0)!=0){k=826920;l=826664}else{k=827048;l=826792}}if((c[d+16>>2]|0)!=2){e=c[d+60>>2]|0;i=b[a+(e<<1)>>1]|0;while(1){if((e|0)>=21){break}f=b[a+46+(e<<1)>>1]|0;m=c[j+(e<<2)>>2]|0;if((m|0)!=7){n=+h[k+(m<<3)>>3];o=+h[l+(m<<3)>>3];while(1){if((f|0)<=0){break}p=+h[g+(i<<3)>>3];h[g+(i<<3)>>3]=p*n;h[g+4608+(i<<3)>>3]=p*o;f=f-1|0;i=i+1|0}}else{i=i+f|0}e=e+1|0}m=c[j+80>>2]|0;if((m|0)!=7){o=+h[k+(m<<3)>>3];n=+h[l+(m<<3)>>3];m=b[a+88>>1]|0;while(1){if((m|0)<=0){break}p=+h[g+(i<<3)>>3];h[g+(i<<3)>>3]=p*o;h[g+4608+(i<<3)>>3]=p*n;m=m-1|0;i=i+1|0}}return}i=0;if((c[d+20>>2]|0)!=0){i=1}m=0;while(1){if((m|0)>=3){break}e=c[d+48+(m<<2)>>2]|0;if((e|0)>3){i=0}while(1){if((e|0)>=12){break}q=c[j+((e*3|0)+m-(c[d+20>>2]|0)<<2)>>2]|0;if((q|0)!=7){r=b[a+118+(e<<1)>>1]|0;s=(b[a+90+(e<<1)>>1]|0)+m|0;n=+h[k+(q<<3)>>3];o=+h[l+(q<<3)>>3];while(1){if((r|0)<=0){break}p=+h[g+(s<<3)>>3];h[g+(s<<3)>>3]=p*n;h[g+4608+(s<<3)>>3]=p*o;r=r-1|0;s=s+3|0}}e=e+1|0}q=c[j+(m+33-(c[d+20>>2]|0)<<2)>>2]|0;r=b[a+142>>1]|0;s=(b[a+114>>1]|0)+m|0;if((q|0)!=7){o=+h[k+(q<<3)>>3];n=+h[l+(q<<3)>>3];while(1){if((r|0)<=0){break}p=+h[g+(s<<3)>>3];h[g+(s<<3)>>3]=p*o;h[g+4608+(s<<3)>>3]=p*n;r=r-1|0;s=s+3|0}}m=m+1|0}if((i|0)!=0){i=c[d+60>>2]|0;d=b[a+(i<<1)>>1]|0;while(1){if((i|0)>=8){break}m=b[a+46+(i<<1)>>1]|0;s=c[j+(i<<2)>>2]|0;if((s|0)!=7){n=+h[k+(s<<3)>>3];o=+h[l+(s<<3)>>3];while(1){if((m|0)<=0){break}p=+h[g+(d<<3)>>3];h[g+(d<<3)>>3]=p*n;h[g+4608+(d<<3)>>3]=p*o;m=m-1|0;d=d+1|0}}else{d=d+m|0}i=i+1|0}}return}function c4(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0.0,k=0.0,l=0,m=0;d=a;a=b;do{if((c[a+16>>2]|0)==2){if((c[a+20>>2]|0)!=0){e=1;break}return}else{e=(c[a+64>>2]|0)-1|0}}while(0);a=d+144|0;d=e;while(1){if((d|0)==0){break}e=4092432;b=4092496;f=a;g=7;while(1){if((g|0)<0){break}i=f-8|0;f=i;j=+h[i>>3];k=+h[a>>3];h[f>>3]=j*+h[e>>3]-k*+h[b>>3];i=e;e=i+8|0;l=b;b=l+8|0;m=a;a=m+8|0;h[m>>3]=k*+h[i>>3]+j*+h[l>>3];g=g-1|0}d=d-1|0;a=a+80|0}return}function c5(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,i=0,j=0,k=0,l=0;g=a;a=b;b=e;e=f;f=d;d=g+4744|0;i=g+23176|0;g=0;j=c[i+(b<<2)>>2]|0;k=d+(j*9216|0)+(b*4608|0)|0;j=(-j|0)+1|0;l=d+(j*9216|0)+(b*4608|0)|0;c[i+(b<<2)>>2]=j;if((c[e+20>>2]|0)!=0){g=2;c6(a|0,k,l,825376,f);c6(a+144|0,k+144|0,l+144|0,824224,f+8|0);k=k+288|0;l=l+288|0;f=f+16|0}j=c[e+16>>2]|0;if((j|0)==2){while(1){if((g|0)>=(c[e+64>>2]|0)){break}c7(a+(g*144|0)|0,k,l,825952,f);c7(a+((g+1|0)*144|0)|0,k+144|0,l+144|0,824800,f+8|0);g=g+2|0;f=f+16|0;k=k+288|0;l=l+288|0}}else{while(1){if((g|0)>=(c[e+64>>2]|0)){break}c6(a+(g*144|0)|0,k,l,825376+(j*288|0)|0,f);c6(a+((g+1|0)*144|0)|0,k+144|0,l+144|0,824224+(j*288|0)|0,f+8|0);g=g+2|0;f=f+16|0;k=k+288|0;l=l+288|0}}while(1){if((g|0)>=32){break}j=0;while(1){if((j|0)>=18){break}a=k;k=a+8|0;h[f+(j<<5<<3)>>3]=+h[a>>3];a=l;l=a+8|0;h[a>>3]=0.0;j=j+1|0}g=g+1|0;f=f+8|0}return}function c6(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0,q=0.0,r=0.0,s=0.0;f=a;a=f+136|0;h[a>>3]=+h[a>>3]+ +h[f+128>>3];a=f+128|0;h[a>>3]=+h[a>>3]+ +h[f+120>>3];a=f+120|0;h[a>>3]=+h[a>>3]+ +h[f+112>>3];a=f+112|0;h[a>>3]=+h[a>>3]+ +h[f+104>>3];a=f+104|0;h[a>>3]=+h[a>>3]+ +h[f+96>>3];a=f+96|0;h[a>>3]=+h[a>>3]+ +h[f+88>>3];a=f+88|0;h[a>>3]=+h[a>>3]+ +h[f+80>>3];a=f+80|0;h[a>>3]=+h[a>>3]+ +h[f+72>>3];a=f+72|0;h[a>>3]=+h[a>>3]+ +h[f+64>>3];a=f+64|0;h[a>>3]=+h[a>>3]+ +h[f+56>>3];a=f+56|0;h[a>>3]=+h[a>>3]+ +h[f+48>>3];a=f+48|0;h[a>>3]=+h[a>>3]+ +h[f+40>>3];a=f+40|0;h[a>>3]=+h[a>>3]+ +h[f+32>>3];a=f+32|0;h[a>>3]=+h[a>>3]+ +h[f+24>>3];a=f+24|0;h[a>>3]=+h[a>>3]+ +h[f+16>>3];a=f+16|0;h[a>>3]=+h[a>>3]+ +h[f+8>>3];a=f+8|0;h[a>>3]=+h[a>>3]+ +h[f>>3];a=f+136|0;h[a>>3]=+h[a>>3]+ +h[f+120>>3];a=f+120|0;h[a>>3]=+h[a>>3]+ +h[f+104>>3];a=f+104|0;h[a>>3]=+h[a>>3]+ +h[f+88>>3];a=f+88|0;h[a>>3]=+h[a>>3]+ +h[f+72>>3];a=f+72|0;h[a>>3]=+h[a>>3]+ +h[f+56>>3];a=f+56|0;h[a>>3]=+h[a>>3]+ +h[f+40>>3];a=f+40|0;h[a>>3]=+h[a>>3]+ +h[f+24>>3];a=f+24|0;h[a>>3]=+h[a>>3]+ +h[f+8>>3];a=4093080;g=c;c=d;d=b;b=e;i=+h[f+48>>3]*+h[a+24>>3];j=+h[f+96>>3]*+h[a+48>>3];k=+h[f+56>>3]*+h[a+24>>3];l=+h[f+104>>3]*+h[a+48>>3];m=+h[f+16>>3]*+h[a+8>>3]+i+ +h[f+80>>3]*+h[a+40>>3]+ +h[f+112>>3]*+h[a+56>>3];n=+h[f+24>>3]*+h[a+8>>3]+k+ +h[f+88>>3]*+h[a+40>>3]+ +h[f+120>>3]*+h[a+56>>3];o=+h[f>>3]+ +h[f+32>>3]*+h[a+16>>3]+ +h[f+64>>3]*+h[a+32>>3]+j+ +h[f+128>>3]*+h[a+64>>3];p=+h[f+8>>3]+ +h[f+40>>3]*+h[a+16>>3]+ +h[f+72>>3]*+h[a+32>>3]+l+ +h[f+136>>3]*+h[a+64>>3];q=m+o;r=(n+p)*+h[103321];s=q+r;h[g+72>>3]=s*+h[c+216>>3];h[g+64>>3]=s*+h[c+208>>3];q=q-r;h[b+2048>>3]=+h[d+64>>3]+q*+h[c+64>>3];h[b+2304>>3]=+h[d+72>>3]+q*+h[c+72>>3];q=o-m;m=(p-n)*+h[103329];n=q+m;h[g+136>>3]=n*+h[c+280>>3];h[g>>3]=n*+h[c+144>>3];q=q-m;h[b>>3]=+h[d>>3]+q*+h[c>>3];h[b+4352>>3]=+h[d+136>>3]+q*+h[c+136>>3];q=(+h[f+16>>3]- +h[f+80>>3]- +h[f+112>>3])*+h[a+24>>3];m=(+h[f+24>>3]- +h[f+88>>3]- +h[f+120>>3])*+h[a+24>>3];n=(+h[f+32>>3]- +h[f+64>>3]- +h[f+128>>3])*+h[a+48>>3]- +h[f+96>>3]+ +h[f>>3];p=(+h[f+40>>3]- +h[f+72>>3]- +h[f+136>>3])*+h[a+48>>3]- +h[f+104>>3]+ +h[f+8>>3];o=q+n;r=(m+p)*+h[103322];s=o+r;h[g+80>>3]=s*+h[c+224>>3];h[g+56>>3]=s*+h[c+200>>3];o=o-r;h[b+1792>>3]=+h[d+56>>3]+o*+h[c+56>>3];h[b+2560>>3]=+h[d+80>>3]+o*+h[c+80>>3];o=n-q;q=(p-m)*+h[103328];m=o+q;h[g+128>>3]=m*+h[c+272>>3];h[g+8>>3]=m*+h[c+152>>3];o=o-q;h[b+256>>3]=+h[d+8>>3]+o*+h[c+8>>3];h[b+4096>>3]=+h[d+128>>3]+o*+h[c+128>>3];o=+h[f+16>>3]*+h[a+40>>3]-i- +h[f+80>>3]*+h[a+56>>3]+ +h[f+112>>3]*+h[a+8>>3];q=+h[f+24>>3]*+h[a+40>>3]-k- +h[f+88>>3]*+h[a+56>>3]+ +h[f+120>>3]*+h[a+8>>3];m=+h[f>>3]- +h[f+32>>3]*+h[a+64>>3]- +h[f+64>>3]*+h[a+16>>3]+j+ +h[f+128>>3]*+h[a+32>>3];p=+h[f+8>>3]- +h[f+40>>3]*+h[a+64>>3]- +h[f+72>>3]*+h[a+16>>3]+l+ +h[f+136>>3]*+h[a+32>>3];n=o+m;r=(q+p)*+h[103323];s=n+r;h[g+88>>3]=s*+h[c+232>>3];h[g+48>>3]=s*+h[c+192>>3];n=n-r;h[b+1536>>3]=+h[d+48>>3]+n*+h[c+48>>3];h[b+2816>>3]=+h[d+88>>3]+n*+h[c+88>>3];n=m-o;o=(p-q)*+h[103327];q=n+o;h[g+120>>3]=q*+h[c+264>>3];h[g+16>>3]=q*+h[c+160>>3];n=n-o;h[b+512>>3]=+h[d+16>>3]+n*+h[c+16>>3];h[b+3840>>3]=+h[d+120>>3]+n*+h[c+120>>3];n=+h[f+16>>3]*+h[a+56>>3]-i+ +h[f+80>>3]*+h[a+8>>3]- +h[f+112>>3]*+h[a+40>>3];i=+h[f+24>>3]*+h[a+56>>3]-k+ +h[f+88>>3]*+h[a+8>>3]- +h[f+120>>3]*+h[a+40>>3];k=+h[f>>3]- +h[f+32>>3]*+h[a+32>>3]+ +h[f+64>>3]*+h[a+64>>3]+j- +h[f+128>>3]*+h[a+16>>3];j=+h[f+8>>3]- +h[f+40>>3]*+h[a+32>>3]+ +h[f+72>>3]*+h[a+64>>3]+l- +h[f+136>>3]*+h[a+16>>3];l=n+k;o=(i+j)*+h[103324];q=l+o;h[g+96>>3]=q*+h[c+240>>3];h[g+40>>3]=q*+h[c+184>>3];l=l-o;h[b+1280>>3]=+h[d+40>>3]+l*+h[c+40>>3];h[b+3072>>3]=+h[d+96>>3]+l*+h[c+96>>3];l=k-n;n=(j-i)*+h[103326];i=l+n;h[g+112>>3]=i*+h[c+256>>3];h[g+24>>3]=i*+h[c+168>>3];l=l-n;h[b+768>>3]=+h[d+24>>3]+l*+h[c+24>>3];h[b+3584>>3]=+h[d+112>>3]+l*+h[c+112>>3];l=+h[f>>3]- +h[f+32>>3]+ +h[f+64>>3]- +h[f+96>>3]+ +h[f+128>>3];n=(+h[f+8>>3]- +h[f+40>>3]+ +h[f+72>>3]- +h[f+104>>3]+ +h[f+136>>3])*+h[103325];i=l+n;h[g+104>>3]=i*+h[c+248>>3];h[g+32>>3]=i*+h[c+176>>3];l=l-n;h[b+1024>>3]=+h[d+32>>3]+l*+h[c+32>>3];h[b+3328>>3]=+h[d+104>>3]+l*+h[c+104>>3];return}function c7(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0.0,i=0.0,j=0.0,k=0.0,l=0.0,m=0.0,n=0.0,o=0.0,p=0.0;f=a;a=c;c=d;d=e;e=b;h[d>>3]=+h[e>>3];h[d+256>>3]=+h[e+8>>3];h[d+512>>3]=+h[e+16>>3];h[d+768>>3]=+h[e+24>>3];h[d+1024>>3]=+h[e+32>>3];h[d+1280>>3]=+h[e+40>>3];g=+h[f+120>>3];i=+h[f+96>>3];j=i;g=g+i;i=+h[f+72>>3];k=i;j=j+i;i=+h[f+48>>3];l=i;k=k+i;i=+h[f+24>>3];m=i;l=l+i;i=+h[f>>3];n=i;m=m+i;g=g+k;k=k+m;l=l*+h[2711];k=k*+h[2711];i=n-j;o=(m-g)*+h[103331];p=i+o;i=i-o;h[d+4096>>3]=+h[e+128>>3]+p*+h[c+80>>3];h[d+3328>>3]=+h[e+104>>3]+p*+h[c+56>>3];h[d+1792>>3]=+h[e+56>>3]+i*+h[c+8>>3];h[d+2560>>3]=+h[e+80>>3]+i*+h[c+32>>3];n=n+j*+h[2710];j=n+l;n=n-l;m=m+g*+h[2710];g=(m+k)*+h[103330];m=(m-k)*+h[103332];k=j+g;j=j-g;l=n+m;n=n-m;h[d+4352>>3]=+h[e+136>>3]+l*+h[c+88>>3];h[d+3072>>3]=+h[e+96>>3]+l*+h[c+48>>3];h[d+3584>>3]=+h[e+112>>3]+k*+h[c+64>>3];h[d+3840>>3]=+h[e+120>>3]+k*+h[c+72>>3];h[d+1536>>3]=+h[e+48>>3]+n*+h[c>>3];h[d+2816>>3]=+h[e+88>>3]+n*+h[c+40>>3];h[d+2048>>3]=+h[e+64>>3]+j*+h[c+16>>3];h[d+2304>>3]=+h[e+72>>3]+j*+h[c+24>>3];f=f+8|0;e=a;j=+h[f+120>>3];n=+h[f+96>>3];k=n;j=j+n;n=+h[f+72>>3];l=n;k=k+n;n=+h[f+48>>3];m=n;l=l+n;n=+h[f+24>>3];g=n;m=m+n;n=+h[f>>3];i=n;g=g+n;j=j+l;l=l+g;m=m*+h[2711];l=l*+h[2711];n=i-k;p=(g-j)*+h[103331];o=n+p;n=n-p;h[e+32>>3]=o*+h[c+80>>3];h[e+8>>3]=o*+h[c+56>>3];b=d+3328|0;h[b>>3]=+h[b>>3]+n*+h[c+8>>3];b=d+4096|0;h[b>>3]=+h[b>>3]+n*+h[c+32>>3];i=i+k*+h[2710];k=i+m;i=i-m;g=g+j*+h[2710];j=(g+l)*+h[103330];g=(g-l)*+h[103332];l=k+j;k=k-j;m=i+g;i=i-g;h[e+40>>3]=m*+h[c+88>>3];h[e>>3]=m*+h[c+48>>3];h[e+16>>3]=l*+h[c+64>>3];h[e+24>>3]=l*+h[c+72>>3];e=d+3072|0;h[e>>3]=+h[e>>3]+i*+h[c>>3];e=d+4352|0;h[e>>3]=+h[e>>3]+i*+h[c+40>>3];e=d+3584|0;h[e>>3]=+h[e>>3]+k*+h[c+16>>3];e=d+3840|0;h[e>>3]=+h[e>>3]+k*+h[c+24>>3];f=f+8|0;e=a;h[e+136>>3]=0.0;h[e+128>>3]=0.0;h[e+120>>3]=0.0;h[e+112>>3]=0.0;h[e+104>>3]=0.0;h[e+96>>3]=0.0;k=+h[f+120>>3];i=+h[f+96>>3];l=i;k=k+i;i=+h[f+72>>3];m=i;l=l+i;i=+h[f+48>>3];g=i;m=m+i;i=+h[f+24>>3];j=i;g=g+i;i=+h[f>>3];n=i;j=j+i;k=k+m;m=m+j;g=g*+h[2711];m=m*+h[2711];i=n-l;o=(j-k)*+h[103331];p=i+o;i=i-o;h[e+80>>3]=p*+h[c+80>>3];h[e+56>>3]=p*+h[c+56>>3];f=e+8|0;h[f>>3]=+h[f>>3]+i*+h[c+8>>3];f=e+32|0;h[f>>3]=+h[f>>3]+i*+h[c+32>>3];n=n+l*+h[2710];l=n+g;n=n-g;j=j+k*+h[2710];k=(j+m)*+h[103330];j=(j-m)*+h[103332];m=l+k;l=l-k;g=n+j;n=n-j;h[e+88>>3]=g*+h[c+88>>3];h[e+48>>3]=g*+h[c+48>>3];h[e+64>>3]=m*+h[c+64>>3];h[e+72>>3]=m*+h[c+72>>3];f=e|0;h[f>>3]=+h[f>>3]+n*+h[c>>3];f=e+40|0;h[f>>3]=+h[f>>3]+n*+h[c+40>>3];f=e+16|0;h[f>>3]=+h[f>>3]+l*+h[c+16>>3];f=e+24|0;h[f>>3]=+h[f>>3]+l*+h[c+24>>3];return}function c8(){var a=0;a=(d[c[206054]|0]|0)<<c[1023088]&255;c[1023088]=(c[1023088]|0)+1;c[206054]=(c[206054]|0)+(c[1023088]>>3);c[1023088]=c[1023088]&7;return(a&255)>>7|0}function c9(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,i=0.0;b=a;a=0;while(1){if((a|0)>=5){break}d=16>>a;e=64>>a;f=c[6704+(a<<2)>>2]|0;g=0;while(1){if((g|0)>=(d|0)){break}h[f+(g<<3)>>3]=1.0/(+S(+((+(g|0)*2.0+1.0)*3.141592653589793/+(e|0)))*2.0);g=g+1|0}a=a+1|0}g=1087728;b=-b|0;a=0;e=0;while(1){if((a|0)>=256){break}if(g>>>0<1091952>>>0){i=+h[7280+(e<<3)>>3]*+(b|0);h[g>>3]=i;h[g+128>>3]=i}if(((a|0)%32|0|0)==31){g=g-8184|0}if(((a|0)%64|0|0)==63){b=-b|0}a=a+1|0;e=e+1|0;g=g+256|0}while(1){if((a|0)>=512){break}if(g>>>0<1091952>>>0){i=+h[7280+(e<<3)>>3]*+(b|0);h[g>>3]=i;h[g+128>>3]=i}if(((a|0)%32|0|0)==31){g=g-8184|0}if(((a|0)%64|0|0)==63){b=-b|0}a=a+1|0;e=e-1|0;g=g+256|0}return}function da(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aF=0,aG=0,aH=0,aI=0;do{if(a>>>0<245){if(a>>>0<11){b=16}else{b=a+11&-8}d=b>>>3;e=c[1023142]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=4092608+(h<<2)|0;j=4092608+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[1023142]=e&~(1<<g)}else{if(l>>>0<(c[1023146]|0)>>>0){as();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{as();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[1023144]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=4092608+(p<<2)|0;m=4092608+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[1023142]=e&~(1<<r)}else{if(l>>>0<(c[1023146]|0)>>>0){as();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{as();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[1023144]|0;if((l|0)!=0){q=c[1023147]|0;d=l>>>3;l=d<<1;f=4092608+(l<<2)|0;k=c[1023142]|0;h=1<<d;do{if((k&h|0)==0){c[1023142]=k|h;s=f;t=4092608+(l+2<<2)|0}else{d=4092608+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[1023146]|0)>>>0){s=g;t=d;break}as();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[1023144]=m;c[1023147]=e;n=i;return n|0}l=c[1023143]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[4092872+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[1023146]|0;if(r>>>0<i>>>0){as();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){as();return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break}else{w=l;x=k}}else{w=g;x=q}while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){as();return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){as();return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){as();return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{as();return 0}}}while(0);L3920:do{if((e|0)!=0){f=d+28|0;i=4092872+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[1023143]=c[1023143]&~(1<<c[f>>2]);break L3920}else{if(e>>>0<(c[1023146]|0)>>>0){as();return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L3920}}}while(0);if(v>>>0<(c[1023146]|0)>>>0){as();return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b)>>2]=p;f=c[1023144]|0;if((f|0)!=0){e=c[1023147]|0;i=f>>>3;f=i<<1;q=4092608+(f<<2)|0;k=c[1023142]|0;g=1<<i;do{if((k&g|0)==0){c[1023142]=k|g;y=q;z=4092608+(f+2<<2)|0}else{i=4092608+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[1023146]|0)>>>0){y=l;z=i;break}as();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[1023144]=p;c[1023147]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231){o=-1;break}f=a+11|0;g=f&-8;k=c[1023143]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=14-(h|f|l)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[4092872+(A<<2)>>2]|0;L3968:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break L3968}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[4092872+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break}else{p=r;m=i;q=e}}}if((K|0)==0){o=g;break}if(J>>>0>=((c[1023144]|0)-g|0)>>>0){o=g;break}q=K;m=c[1023146]|0;if(q>>>0<m>>>0){as();return 0}p=q+g|0;k=p;if(q>>>0>=p>>>0){as();return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break}else{M=B;N=j}}else{M=d;N=r}while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<m>>>0){as();return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<m>>>0){as();return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){as();return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{as();return 0}}}while(0);L4018:do{if((e|0)!=0){i=K+28|0;m=4092872+(c[i>>2]<<2)|0;do{if((K|0)==(c[m>>2]|0)){c[m>>2]=L;if((L|0)!=0){break}c[1023143]=c[1023143]&~(1<<c[i>>2]);break L4018}else{if(e>>>0<(c[1023146]|0)>>>0){as();return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L4018}}}while(0);if(L>>>0<(c[1023146]|0)>>>0){as();return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16){e=J+g|0;c[K+4>>2]=e|3;i=q+(e+4)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[q+(g|4)>>2]=J|1;c[q+(J+g)>>2]=J;i=J>>>3;if(J>>>0<256){e=i<<1;m=4092608+(e<<2)|0;r=c[1023142]|0;j=1<<i;do{if((r&j|0)==0){c[1023142]=r|j;O=m;P=4092608+(e+2<<2)|0}else{i=4092608+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[1023146]|0)>>>0){O=d;P=i;break}as();return 0}}while(0);c[P>>2]=k;c[O+12>>2]=k;c[q+(g+8)>>2]=O;c[q+(g+12)>>2]=m;break}e=p;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=14-(d|r|i)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=4092872+(Q<<2)|0;c[q+(g+28)>>2]=Q;c[q+(g+20)>>2]=0;c[q+(g+16)>>2]=0;m=c[1023143]|0;l=1<<Q;if((m&l|0)==0){c[1023143]=m|l;c[j>>2]=e;c[q+(g+24)>>2]=j;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;m=c[j>>2]|0;while(1){if((c[m+4>>2]&-8|0)==(J|0)){break}S=m+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=3094;break}else{l=l<<1;m=j}}if((T|0)==3094){if(S>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[S>>2]=e;c[q+(g+24)>>2]=m;c[q+(g+12)>>2]=e;c[q+(g+8)>>2]=e;break}}l=m+8|0;j=c[l>>2]|0;i=c[1023146]|0;if(m>>>0<i>>>0){as();return 0}if(j>>>0<i>>>0){as();return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[q+(g+8)>>2]=j;c[q+(g+12)>>2]=m;c[q+(g+24)>>2]=0;break}}}while(0);q=K+8|0;if((q|0)==0){o=g;break}else{n=q}return n|0}}while(0);K=c[1023144]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[1023147]|0;if(S>>>0>15){R=J;c[1023147]=R+o;c[1023144]=S;c[R+(o+4)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[1023144]=0;c[1023147]=0;c[J+4>>2]=K|3;S=J+(K+4)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[1023145]|0;if(o>>>0<J>>>0){S=J-o|0;c[1023145]=S;J=c[1023148]|0;K=J;c[1023148]=K+o;c[K+(o+4)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[227122]|0)==0){J=aE(8)|0;if((J-1&J|0)==0){c[227124]=J;c[227123]=J;c[227125]=-1;c[227126]=2097152;c[227127]=0;c[1023253]=0;c[227122]=(bb(0)|0)&-16^1431655768;break}else{as();return 0}}}while(0);J=o+48|0;S=c[227124]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[1023252]|0;do{if((O|0)!=0){P=c[1023250]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L4110:do{if((c[1023253]&4|0)==0){O=c[1023148]|0;L4112:do{if((O|0)==0){T=3124}else{L=O;P=4093016;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=3124;break L4112}else{P=M}}if((P|0)==0){T=3124;break}L=R-(c[1023145]|0)&Q;if(L>>>0>=2147483647){W=0;break}m=a9(L|0)|0;e=(m|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?m:-1;Y=e?L:0;Z=m;_=L;T=3133}}while(0);do{if((T|0)==3124){O=a9(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[227123]|0;m=L-1|0;if((m&g|0)==0){$=S}else{$=S-g+(m+g&-L)|0}L=c[1023250]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647)){W=0;break}m=c[1023252]|0;if((m|0)!=0){if(g>>>0<=L>>>0|g>>>0>m>>>0){W=0;break}}m=a9($|0)|0;g=(m|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=m;_=$;T=3133}}while(0);L4132:do{if((T|0)==3133){m=-_|0;if((X|0)!=-1){aa=Y;ab=X;T=3144;break L4110}do{if((Z|0)!=-1&_>>>0<2147483647&_>>>0<J>>>0){g=c[227124]|0;O=K-_+g&-g;if(O>>>0>=2147483647){ac=_;break}if((a9(O|0)|0)==-1){a9(m|0)|0;W=Y;break L4132}else{ac=O+_|0;break}}else{ac=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ac;ab=Z;T=3144;break L4110}}}while(0);c[1023253]=c[1023253]|4;ad=W;T=3141}else{ad=0;T=3141}}while(0);do{if((T|0)==3141){if(S>>>0>=2147483647){break}W=a9(S|0)|0;Z=a9(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ac=Z-W|0;Z=ac>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)!=-1){aa=Z?ac:ad;ab=Y;T=3144}}}while(0);do{if((T|0)==3144){ad=(c[1023250]|0)+aa|0;c[1023250]=ad;if(ad>>>0>(c[1023251]|0)>>>0){c[1023251]=ad}ad=c[1023148]|0;L4152:do{if((ad|0)==0){S=c[1023146]|0;if((S|0)==0|ab>>>0<S>>>0){c[1023146]=ab}c[1023254]=ab;c[1023255]=aa;c[1023257]=0;c[1023151]=c[227122];c[1023150]=-1;S=0;do{Y=S<<1;ac=4092608+(Y<<2)|0;c[4092608+(Y+3<<2)>>2]=ac;c[4092608+(Y+2<<2)>>2]=ac;S=S+1|0;}while(S>>>0<32);S=ab+8|0;if((S&7|0)==0){ae=0}else{ae=-S&7}S=aa-40-ae|0;c[1023148]=ab+ae;c[1023145]=S;c[ab+(ae+4)>>2]=S|1;c[ab+(aa-36)>>2]=40;c[1023149]=c[227126]}else{S=4093016;while(1){af=c[S>>2]|0;ag=S+4|0;ah=c[ag>>2]|0;if((ab|0)==(af+ah|0)){T=3156;break}ac=c[S+8>>2]|0;if((ac|0)==0){break}else{S=ac}}do{if((T|0)==3156){if((c[S+12>>2]&8|0)!=0){break}ac=ad;if(!(ac>>>0>=af>>>0&ac>>>0<ab>>>0)){break}c[ag>>2]=ah+aa;ac=c[1023148]|0;Y=(c[1023145]|0)+aa|0;Z=ac;W=ac+8|0;if((W&7|0)==0){ai=0}else{ai=-W&7}W=Y-ai|0;c[1023148]=Z+ai;c[1023145]=W;c[Z+(ai+4)>>2]=W|1;c[Z+(Y+4)>>2]=40;c[1023149]=c[227126];break L4152}}while(0);if(ab>>>0<(c[1023146]|0)>>>0){c[1023146]=ab}S=ab+aa|0;Y=4093016;while(1){aj=Y|0;if((c[aj>>2]|0)==(S|0)){T=3166;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==3166){if((c[Y+12>>2]&8|0)!=0){break}c[aj>>2]=ab;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa;S=ab+8|0;if((S&7|0)==0){ak=0}else{ak=-S&7}S=ab+(aa+8)|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ab+(al+aa)|0;Z=S;W=ak+o|0;ac=ab+W|0;_=ac;K=S-(ab+ak)-o|0;c[ab+(ak+4)>>2]=o|3;do{if((Z|0)==(c[1023148]|0)){J=(c[1023145]|0)+K|0;c[1023145]=J;c[1023148]=_;c[ab+(W+4)>>2]=J|1}else{if((Z|0)==(c[1023147]|0)){J=(c[1023144]|0)+K|0;c[1023144]=J;c[1023147]=_;c[ab+(W+4)>>2]=J|1;c[ab+(J+W)>>2]=J;break}J=aa+4|0;X=c[ab+(J+al)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;L4197:do{if(X>>>0<256){U=c[ab+((al|8)+aa)>>2]|0;Q=c[ab+(aa+12+al)>>2]|0;R=4092608+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[1023146]|0)>>>0){as();return 0}if((c[U+12>>2]|0)==(Z|0)){break}as();return 0}}while(0);if((Q|0)==(U|0)){c[1023142]=c[1023142]&~(1<<V);break}do{if((Q|0)==(R|0)){am=Q+8|0}else{if(Q>>>0<(c[1023146]|0)>>>0){as();return 0}m=Q+8|0;if((c[m>>2]|0)==(Z|0)){am=m;break}as();return 0}}while(0);c[U+12>>2]=Q;c[am>>2]=U}else{R=S;m=c[ab+((al|24)+aa)>>2]|0;P=c[ab+(aa+12+al)>>2]|0;do{if((P|0)==(R|0)){O=al|16;g=ab+(J+O)|0;L=c[g>>2]|0;if((L|0)==0){e=ab+(O+aa)|0;O=c[e>>2]|0;if((O|0)==0){an=0;break}else{ao=O;ap=e}}else{ao=L;ap=g}while(1){g=ao+20|0;L=c[g>>2]|0;if((L|0)!=0){ao=L;ap=g;continue}g=ao+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{ao=L;ap=g}}if(ap>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[ap>>2]=0;an=ao;break}}else{g=c[ab+((al|8)+aa)>>2]|0;if(g>>>0<(c[1023146]|0)>>>0){as();return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){as();return 0}e=P+8|0;if((c[e>>2]|0)==(R|0)){c[L>>2]=P;c[e>>2]=g;an=P;break}else{as();return 0}}}while(0);if((m|0)==0){break}P=ab+(aa+28+al)|0;U=4092872+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=an;if((an|0)!=0){break}c[1023143]=c[1023143]&~(1<<c[P>>2]);break L4197}else{if(m>>>0<(c[1023146]|0)>>>0){as();return 0}Q=m+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=an}else{c[m+20>>2]=an}if((an|0)==0){break L4197}}}while(0);if(an>>>0<(c[1023146]|0)>>>0){as();return 0}c[an+24>>2]=m;R=al|16;P=c[ab+(R+aa)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[an+16>>2]=P;c[P+24>>2]=an;break}}}while(0);P=c[ab+(J+R)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[an+20>>2]=P;c[P+24>>2]=an;break}}}while(0);aq=ab+(($|al)+aa)|0;ar=$+K|0}else{aq=Z;ar=K}J=aq+4|0;c[J>>2]=c[J>>2]&-2;c[ab+(W+4)>>2]=ar|1;c[ab+(ar+W)>>2]=ar;J=ar>>>3;if(ar>>>0<256){V=J<<1;X=4092608+(V<<2)|0;P=c[1023142]|0;m=1<<J;do{if((P&m|0)==0){c[1023142]=P|m;at=X;au=4092608+(V+2<<2)|0}else{J=4092608+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[1023146]|0)>>>0){at=U;au=J;break}as();return 0}}while(0);c[au>>2]=_;c[at+12>>2]=_;c[ab+(W+8)>>2]=at;c[ab+(W+12)>>2]=X;break}V=ac;m=ar>>>8;do{if((m|0)==0){av=0}else{if(ar>>>0>16777215){av=31;break}P=(m+1048320|0)>>>16&8;$=m<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=14-(J|P|$)+(U<<$>>>15)|0;av=ar>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=4092872+(av<<2)|0;c[ab+(W+28)>>2]=av;c[ab+(W+20)>>2]=0;c[ab+(W+16)>>2]=0;X=c[1023143]|0;Q=1<<av;if((X&Q|0)==0){c[1023143]=X|Q;c[m>>2]=V;c[ab+(W+24)>>2]=m;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}if((av|0)==31){aw=0}else{aw=25-(av>>>1)|0}Q=ar<<aw;X=c[m>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ar|0)){break}ax=X+16+(Q>>>31<<2)|0;m=c[ax>>2]|0;if((m|0)==0){T=3239;break}else{Q=Q<<1;X=m}}if((T|0)==3239){if(ax>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[ax>>2]=V;c[ab+(W+24)>>2]=X;c[ab+(W+12)>>2]=V;c[ab+(W+8)>>2]=V;break}}Q=X+8|0;m=c[Q>>2]|0;$=c[1023146]|0;if(X>>>0<$>>>0){as();return 0}if(m>>>0<$>>>0){as();return 0}else{c[m+12>>2]=V;c[Q>>2]=V;c[ab+(W+8)>>2]=m;c[ab+(W+12)>>2]=X;c[ab+(W+24)>>2]=0;break}}}while(0);n=ab+(ak|8)|0;return n|0}}while(0);Y=ad;W=4093016;while(1){ay=c[W>>2]|0;if(ay>>>0<=Y>>>0){az=c[W+4>>2]|0;aA=ay+az|0;if(aA>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=ay+(az-39)|0;if((W&7|0)==0){aB=0}else{aB=-W&7}W=ay+(az-47+aB)|0;ac=W>>>0<(ad+16|0)>>>0?Y:W;W=ac+8|0;_=ab+8|0;if((_&7|0)==0){aC=0}else{aC=-_&7}_=aa-40-aC|0;c[1023148]=ab+aC;c[1023145]=_;c[ab+(aC+4)>>2]=_|1;c[ab+(aa-36)>>2]=40;c[1023149]=c[227126];c[ac+4>>2]=27;c[W>>2]=c[1023254];c[W+4>>2]=c[4093020>>2];c[W+8>>2]=c[4093024>>2];c[W+12>>2]=c[4093028>>2];c[1023254]=ab;c[1023255]=aa;c[1023257]=0;c[1023256]=W;W=ac+28|0;c[W>>2]=7;if((ac+32|0)>>>0<aA>>>0){_=W;while(1){W=_+4|0;c[W>>2]=7;if((_+8|0)>>>0<aA>>>0){_=W}else{break}}}if((ac|0)==(Y|0)){break}_=ac-ad|0;W=Y+(_+4)|0;c[W>>2]=c[W>>2]&-2;c[ad+4>>2]=_|1;c[Y+_>>2]=_;W=_>>>3;if(_>>>0<256){K=W<<1;Z=4092608+(K<<2)|0;S=c[1023142]|0;m=1<<W;do{if((S&m|0)==0){c[1023142]=S|m;aD=Z;aF=4092608+(K+2<<2)|0}else{W=4092608+(K+2<<2)|0;Q=c[W>>2]|0;if(Q>>>0>=(c[1023146]|0)>>>0){aD=Q;aF=W;break}as();return 0}}while(0);c[aF>>2]=ad;c[aD+12>>2]=ad;c[ad+8>>2]=aD;c[ad+12>>2]=Z;break}K=ad;m=_>>>8;do{if((m|0)==0){aG=0}else{if(_>>>0>16777215){aG=31;break}S=(m+1048320|0)>>>16&8;Y=m<<S;ac=(Y+520192|0)>>>16&4;W=Y<<ac;Y=(W+245760|0)>>>16&2;Q=14-(ac|S|Y)+(W<<Y>>>15)|0;aG=_>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);m=4092872+(aG<<2)|0;c[ad+28>>2]=aG;c[ad+20>>2]=0;c[ad+16>>2]=0;Z=c[1023143]|0;Q=1<<aG;if((Z&Q|0)==0){c[1023143]=Z|Q;c[m>>2]=K;c[ad+24>>2]=m;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}if((aG|0)==31){aH=0}else{aH=25-(aG>>>1)|0}Q=_<<aH;Z=c[m>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(_|0)){break}aI=Z+16+(Q>>>31<<2)|0;m=c[aI>>2]|0;if((m|0)==0){T=3274;break}else{Q=Q<<1;Z=m}}if((T|0)==3274){if(aI>>>0<(c[1023146]|0)>>>0){as();return 0}else{c[aI>>2]=K;c[ad+24>>2]=Z;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}}Q=Z+8|0;_=c[Q>>2]|0;m=c[1023146]|0;if(Z>>>0<m>>>0){as();return 0}if(_>>>0<m>>>0){as();return 0}else{c[_+12>>2]=K;c[Q>>2]=K;c[ad+8>>2]=_;c[ad+12>>2]=Z;c[ad+24>>2]=0;break}}}while(0);ad=c[1023145]|0;if(ad>>>0<=o>>>0){break}_=ad-o|0;c[1023145]=_;ad=c[1023148]|0;Q=ad;c[1023148]=Q+o;c[Q+(o+4)>>2]=_|1;c[ad+4>>2]=o|3;n=ad+8|0;return n|0}}while(0);c[(a5()|0)>>2]=12;n=0;return n|0}function db(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[1023146]|0;if(b>>>0<e>>>0){as()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){as()}h=f&-8;i=a+(h-8)|0;j=i;L4369:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){as()}if((n|0)==(c[1023147]|0)){p=a+(h-4)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[1023144]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256){k=c[a+(l+8)>>2]|0;s=c[a+(l+12)>>2]|0;t=4092608+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){as()}if((c[k+12>>2]|0)==(n|0)){break}as()}}while(0);if((s|0)==(k|0)){c[1023142]=c[1023142]&~(1<<p);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){as()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}as()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24)>>2]|0;v=c[a+(l+12)>>2]|0;do{if((v|0)==(t|0)){w=a+(l+20)|0;x=c[w>>2]|0;if((x|0)==0){y=a+(l+16)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break}else{B=z;C=y}}else{B=x;C=w}while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){as()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8)>>2]|0;if(w>>>0<e>>>0){as()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){as()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{as()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28)|0;m=4092872+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[1023143]=c[1023143]&~(1<<c[v>>2]);q=n;r=o;break L4369}else{if(p>>>0<(c[1023146]|0)>>>0){as()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L4369}}}while(0);if(A>>>0<(c[1023146]|0)>>>0){as()}c[A+24>>2]=p;t=c[a+(l+16)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[1023146]|0)>>>0){as()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[1023146]|0)>>>0){as()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){as()}A=a+(h-4)|0;e=c[A>>2]|0;if((e&1|0)==0){as()}do{if((e&2|0)==0){if((j|0)==(c[1023148]|0)){B=(c[1023145]|0)+r|0;c[1023145]=B;c[1023148]=q;c[q+4>>2]=B|1;if((q|0)==(c[1023147]|0)){c[1023147]=0;c[1023144]=0}if(B>>>0<=(c[1023149]|0)>>>0){return}df(0)|0;return}if((j|0)==(c[1023147]|0)){B=(c[1023144]|0)+r|0;c[1023144]=B;c[1023147]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;L4474:do{if(e>>>0<256){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=4092608+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[1023146]|0)>>>0){as()}if((c[u+12>>2]|0)==(j|0)){break}as()}}while(0);if((g|0)==(u|0)){c[1023142]=c[1023142]&~(1<<C);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[1023146]|0)>>>0){as()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}as()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16)>>2]|0;t=c[a+(h|4)>>2]|0;do{if((t|0)==(b|0)){p=a+(h+12)|0;v=c[p>>2]|0;if((v|0)==0){m=a+(h+8)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break}else{F=k;G=m}}else{F=v;G=p}while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[1023146]|0)>>>0){as()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[1023146]|0)>>>0){as()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){as()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{as()}}}while(0);if((f|0)==0){break}t=a+(h+20)|0;u=4092872+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[1023143]=c[1023143]&~(1<<c[t>>2]);break L4474}else{if(f>>>0<(c[1023146]|0)>>>0){as()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L4474}}}while(0);if(E>>>0<(c[1023146]|0)>>>0){as()}c[E+24>>2]=f;b=c[a+(h+8)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[1023146]|0)>>>0){as()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[1023146]|0)>>>0){as()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[1023147]|0)){H=B;break}c[1023144]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256){d=r<<1;e=4092608+(d<<2)|0;A=c[1023142]|0;E=1<<r;do{if((A&E|0)==0){c[1023142]=A|E;I=e;J=4092608+(d+2<<2)|0}else{r=4092608+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[1023146]|0)>>>0){I=h;J=r;break}as()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=14-(E|J|d)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=4092872+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[1023143]|0;d=1<<K;do{if((r&d|0)==0){c[1023143]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=3453;break}else{A=A<<1;J=E}}if((N|0)==3453){if(M>>>0<(c[1023146]|0)>>>0){as()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[1023146]|0;if(J>>>0<E>>>0){as()}if(B>>>0<E>>>0){as()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[1023150]|0)-1|0;c[1023150]=q;if((q|0)==0){O=4093024}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[1023150]=-1;return}function dc(a,b){a=a|0;b=b|0;var d=0,e=0;do{if((a|0)==0){d=0}else{e=aa(b,a)|0;if((b|a)>>>0<=65535){d=e;break}d=((e>>>0)/(a>>>0)|0|0)==(b|0)?e:-1}}while(0);b=da(d)|0;if((b|0)==0){return b|0}if((c[b-4>>2]&3|0)==0){return b|0}di(b|0,0,d|0);return b|0}function dd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0.0,A=0.0,B=0,C=0,D=0,E=0.0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0,P=0,Q=0.0,R=0.0,S=0.0;e=b;while(1){f=e+1|0;if((aR(a[e]|0)|0)==0){break}else{e=f}}g=a[e]|0;if((g<<24>>24|0)==45){i=f;j=1}else if((g<<24>>24|0)==43){i=f;j=0}else{i=e;j=0}e=-1;f=0;g=i;while(1){k=a[g]|0;if(((k<<24>>24)-48|0)>>>0<10){l=e}else{if(k<<24>>24!=46|(e|0)>-1){break}else{l=f}}e=l;f=f+1|0;g=g+1|0}l=g+(-f|0)|0;i=(e|0)<0;m=((i^1)<<31>>31)+f|0;n=(m|0)>18;o=(n?-18:-m|0)+(i?f:e)|0;e=n?18:m;do{if((e|0)==0){p=b;q=0.0}else{if((e|0)>9){m=l;n=e;f=0;while(1){i=a[m]|0;r=m+1|0;if(i<<24>>24==46){s=a[r]|0;t=m+2|0}else{s=i;t=r}u=(f*10|0)-48+(s<<24>>24)|0;r=n-1|0;if((r|0)>9){m=t;n=r;f=u}else{break}}v=+(u|0)*1.0e9;w=9;x=t;y=3519}else{if((e|0)>0){v=0.0;w=e;x=l;y=3519}else{z=0.0;A=0.0}}if((y|0)==3519){f=x;n=w;m=0;while(1){r=a[f]|0;i=f+1|0;if(r<<24>>24==46){B=a[i]|0;C=f+2|0}else{B=r;C=i}D=(m*10|0)-48+(B<<24>>24)|0;i=n-1|0;if((i|0)>0){f=C;n=i;m=D}else{break}}z=+(D|0);A=v}E=A+z;do{if((k<<24>>24|0)==69|(k<<24>>24|0)==101){m=g+1|0;n=a[m]|0;if((n<<24>>24|0)==45){F=g+2|0;G=1}else if((n<<24>>24|0)==43){F=g+2|0;G=0}else{F=m;G=0}m=a[F]|0;if(((m<<24>>24)-48|0)>>>0<10){H=F;I=0;J=m}else{K=0;L=F;M=G;break}while(1){m=(I*10|0)-48+(J<<24>>24)|0;n=H+1|0;f=a[n]|0;if(((f<<24>>24)-48|0)>>>0<10){H=n;I=m;J=f}else{K=m;L=n;M=G;break}}}else{K=0;L=g;M=0}}while(0);n=o+((M|0)==0?K:-K|0)|0;m=(n|0)<0?-n|0:n;if((m|0)>511){c[(a5()|0)>>2]=34;N=1.0;O=6632;P=511;y=3536}else{if((m|0)==0){Q=1.0}else{N=1.0;O=6632;P=m;y=3536}}if((y|0)==3536){while(1){y=0;if((P&1|0)==0){R=N}else{R=N*+h[O>>3]}m=P>>1;if((m|0)==0){Q=R;break}else{N=R;O=O+8|0;P=m;y=3536}}}if((n|0)>-1){p=L;q=E*Q;break}else{p=L;q=E/Q;break}}}while(0);if((d|0)!=0){c[d>>2]=p}if((j|0)==0){S=q;return+S}S=-0.0-q;return+S}function de(a){a=a|0;return+(+dd(a,0))}function df(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;do{if((c[227122]|0)==0){b=aE(8)|0;if((b-1&b|0)==0){c[227124]=b;c[227123]=b;c[227125]=-1;c[227126]=2097152;c[227127]=0;c[1023253]=0;c[227122]=(bb(0)|0)&-16^1431655768;break}else{as();return 0}}}while(0);if(a>>>0>=4294967232){d=0;return d|0}b=c[1023148]|0;if((b|0)==0){d=0;return d|0}e=c[1023145]|0;do{if(e>>>0>(a+40|0)>>>0){f=c[227124]|0;g=aa((((-40-a-1+e+f|0)>>>0)/(f>>>0)|0)-1|0,f)|0;h=b;i=4093016;while(1){j=c[i>>2]|0;if(j>>>0<=h>>>0){if((j+(c[i+4>>2]|0)|0)>>>0>h>>>0){k=i;break}}j=c[i+8>>2]|0;if((j|0)==0){k=0;break}else{i=j}}if((c[k+12>>2]&8|0)!=0){break}i=a9(0)|0;h=k+4|0;if((i|0)!=((c[k>>2]|0)+(c[h>>2]|0)|0)){break}j=a9(-(g>>>0>2147483646?-2147483648-f|0:g)|0)|0;l=a9(0)|0;if(!((j|0)!=-1&l>>>0<i>>>0)){break}j=i-l|0;if((i|0)==(l|0)){break}c[h>>2]=(c[h>>2]|0)-j;c[1023250]=(c[1023250]|0)-j;h=c[1023148]|0;m=(c[1023145]|0)-j|0;j=h;n=h+8|0;if((n&7|0)==0){o=0}else{o=-n&7}n=m-o|0;c[1023148]=j+o;c[1023145]=n;c[j+(o+4)>>2]=n|1;c[j+(m+4)>>2]=40;c[1023149]=c[227126];d=(i|0)!=(l|0)|0;return d|0}}while(0);if((c[1023145]|0)>>>0<=(c[1023149]|0)>>>0){d=0;return d|0}c[1023149]=-1;d=0;return d|0}function dg(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function dh(b,c){b=b|0;c=c|0;var d=0,e=0;d=b+(dg(b)|0)|0;do{a[d+e|0]=a[c+e|0];e=e+1|0}while(a[c+(e-1)|0]|0);return b|0}function di(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function dj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function dk(b,c,d){b=b|0;c=c|0;d=d|0;if((c|0)<(b|0)&(b|0)<(c+d|0)){c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b]=a[c]|0}}else{dj(b,c,d)|0}}function dl(b,c){b=b|0;c=c|0;var d=0;do{a[b+d|0]=a[c+d|0];d=d+1|0}while(a[c+(d-1)|0]|0);return b|0}function dm(a,b,c){a=a|0;b=b|0;c=c|0;var e=0,f=0,g=0;while((e|0)<(c|0)){f=d[a+e|0]|0;g=d[b+e|0]|0;if((f|0)!=(g|0))return((f|0)>(g|0)?1:-1)|0;e=e+1|0}return 0}function dn(a){a=a|0;if((a|0)<65)return a|0;if((a|0)>90)return a|0;return a-65+97|0}function dp(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0;while(e>>>0<d>>>0){f=dn(a[b+e|0]|0)|0;g=dn(a[c+e|0]|0)|0;if((f|0)==(g|0)&(f|0)==0)return 0;if((f|0)==0)return-1;if((g|0)==0)return 1;if((f|0)==(g|0)){e=e+1|0;continue}else{return(f>>>0>g>>>0?1:-1)|0}}return 0}function dq(a,b){a=a|0;b=b|0;return dp(a,b,-1)|0}function dr(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0;while((e|0)<(d|0)){a[b+e|0]=f?0:a[c+e|0]|0;f=f?1:(a[c+e|0]|0)==0;e=e+1|0}return b|0}function ds(a,b){a=a|0;b=b|0;return be[a&1](b|0)|0}function dt(a){a=a|0;bf[a&1]()}function du(a,b,c){a=a|0;b=b|0;c=c|0;return bg[a&1](b|0,c|0)|0}function dv(a,b){a=a|0;b=b|0;bh[a&1](b|0)}function dw(a){a=a|0;ab(0);return 0}function dx(){ab(1)}function dy(a,b){a=a|0;b=b|0;ab(2);return 0}function dz(a){a=a|0;ab(3)}
// EMSCRIPTEN_END_FUNCS
var be=[dw,dw];var bf=[dx,dx];var bg=[dy,dy];var bh=[dz,dz];return{_memcmp:dm,_strlen:dg,_strcat:dh,_free:db,_main:bK,_strncpy:dr,_memmove:dk,_tolower:dn,_memset:di,_malloc:da,_memcpy:dj,_strcasecmp:dq,_strncasecmp:dp,_strcpy:dl,_calloc:dc,runPostSets:by,stackAlloc:bi,stackSave:bj,stackRestore:bk,setThrew:bl,setTempRet0:bo,setTempRet1:bp,setTempRet2:bq,setTempRet3:br,setTempRet4:bs,setTempRet5:bt,setTempRet6:bu,setTempRet7:bv,setTempRet8:bw,setTempRet9:bx,dynCall_ii:ds,dynCall_v:dt,dynCall_iii:du,dynCall_vi:dv}})
// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_ii": invoke_ii, "invoke_v": invoke_v, "invoke_iii": invoke_iii, "invoke_vi": invoke_vi, "_llvm_va_end": _llvm_va_end, "_rename": _rename, "_sscanf": _sscanf, "_feof": _feof, "_snprintf": _snprintf, "_lseek": _lseek, "_fgetc": _fgetc, "_fclose": _fclose, "_abort": _abort, "_fprintf": _fprintf, "_sqrt": _sqrt, "_toupper": _toupper, "_pread": _pread, "__isFloat": __isFloat, "_close": _close, "_fflush": _fflush, "_fopen": _fopen, "__reallyNegative": __reallyNegative, "_tan": _tan, "_strtol": _strtol, "_sysconf": _sysconf, "_fabs": _fabs, "_floor": _floor, "___setErrNo": ___setErrNo, "_fwrite": _fwrite, "_fseek": _fseek, "_send": _send, "_write": _write, "__scanString": __scanString, "_ftell": _ftell, "_exit": _exit, "_sprintf": _sprintf, "_log10": _log10, "_isspace": _isspace, "_rmdir": _rmdir, "_stat": _stat, "_fread": _fread, "_truncate": _truncate, "_read": _read, "__formatString": __formatString, "_ceil": _ceil, "_atoi": _atoi, "_unlink": _unlink, "_recv": _recv, "_utime": _utime, "_cos": _cos, "_pwrite": _pwrite, "_llvm_pow_f64": _llvm_pow_f64, "_fsync": _fsync, "___errno_location": ___errno_location, "_remove": _remove, "_sin": _sin, "_open": _open, "_sbrk": _sbrk, "__parseInt": __parseInt, "_time": _time, "_ftruncate": _ftruncate, "__exit": __exit, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "NaN": NaN, "Infinity": Infinity, "_stdin": _stdin, "_stderr": _stderr, "_stdout": _stdout }, buffer);
var _memcmp = Module["_memcmp"] = asm["_memcmp"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _strcat = Module["_strcat"] = asm["_strcat"];
var _free = Module["_free"] = asm["_free"];
var _main = Module["_main"] = asm["_main"];
var _strncpy = Module["_strncpy"] = asm["_strncpy"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var _tolower = Module["_tolower"] = asm["_tolower"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _strcasecmp = Module["_strcasecmp"] = asm["_strcasecmp"];
var _strncasecmp = Module["_strncasecmp"] = asm["_strncasecmp"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _calloc = Module["_calloc"] = asm["_calloc"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };
// Warning: printing of i64 values may be slightly rounded! No deep i64 math used, so precise i64 code not included
var i64Math = null;
// === Auto-generated postamble setup entry stuff ===
Module['callMain'] = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(!Module['preRun'] || Module['preRun'].length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);
  var ret;
  var initialStackTop = STACKTOP;
  try {
    ret = Module['_main'](argc, argv, 0);
  }
  catch(e) {
    if (e.name == 'ExitStatus') {
      return e.status;
    } else if (e == 'SimulateInfiniteLoop') {
      Module['noExitRuntime'] = true;
    } else {
      throw e;
    }
  } finally {
    STACKTOP = initialStackTop;
  }
  return ret;
}
function run(args) {
  args = args || Module['arguments'];
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return 0;
  }
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    var toRun = Module['preRun'];
    Module['preRun'] = [];
    for (var i = toRun.length-1; i >= 0; i--) {
      toRun[i]();
    }
    if (runDependencies > 0) {
      // a preRun added a dependency, run will be called later
      return 0;
    }
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    var ret = 0;
    calledRun = true;
    if (Module['_main'] && shouldRunNow) {
      ret = Module['callMain'](args);
      if (!Module['noExitRuntime']) {
        exitRuntime();
      }
    }
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
      while (Module['postRun'].length > 0) {
        Module['postRun'].pop()();
      }
    }
    return ret;
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
    return 0;
  } else {
    return doRun();
  }
}
Module['run'] = Module.run = run;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
  // {{MODULE_ADDITIONS}}
self.postMessage({
	type: 'ready'
});
