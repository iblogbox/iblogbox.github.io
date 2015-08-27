//     Underscore.js 1.1.4
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
    _._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.1.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects implementing `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    var value;
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isNumber(obj.length)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial && index === 0) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator = iterator || _.identity;
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator = iterator || _.identity;
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result = iterator.call(context, value, index, list)) return breaker;
    });
    return result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    any(obj, function(value) {
      if (found = value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method ? value[method] : value).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator = iterator || _.identity;
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return iterable;
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return n && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, _.isUndefined(index) || guard ? 1 : index);
  };

  // Get the last element of an array.
  _.last = function(array) {
    return array[array.length - 1];
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(_.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    var values = slice.call(arguments, 1);
    return _.filter(array, function(value){ return !_.include(values, value); });
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted) {
    return _.reduce(array, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
      return memo;
    }, []);
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    if (isSorted) {
      var i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (var i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };


  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    var args  = slice.call(arguments),
        solo  = args.length <= 1,
        start = solo ? 0 : args[0],
        stop  = solo ? args[0] : args[1],
        step  = args[2] || 1,
        len   = Math.max(Math.ceil((stop - start) / step), 0),
        idx   = 0,
        range = new Array(len);
    while (idx < len) {
      range[idx++] = start;
      start += step;
    }
    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  _.bind = function(func, obj) {
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj || {}, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher = hasher || _.identity;
    return function() {
      var key = hasher.apply(this, arguments);
      return key in memo ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Internal function used to implement `_.throttle` and `_.debounce`.
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    return limit(func, wait, false);
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    return limit(func, wait, true);
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i=funcs.length-1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (_.isArray(obj)) return _.range(0, obj.length);
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    return _.filter(_.keys(obj), function(key){ return _.isFunction(obj[key]); }).sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) obj[prop] = source[prop];
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    // Check object identity.
    if (a === b) return true;
    // Different types?
    var atype = typeof(a), btype = typeof(b);
    if (atype != btype) return false;
    // Basic equality test (watch out for coercions).
    if (a == b) return true;
    // One is falsy and the other truthy.
    if ((!a && b) || (a && !b)) return false;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // One of them implements an isEqual()?
    if (a.isEqual) return a.isEqual(b);
    // Check dates' integer values.
    if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
    // Both are NaN?
    if (_.isNaN(a) && _.isNaN(b)) return false;
    // Compare regular expressions.
    if (_.isRegExp(a) && _.isRegExp(b))
      return a.source     === b.source &&
             a.global     === b.global &&
             a.ignoreCase === b.ignoreCase &&
             a.multiline  === b.multiline;
    // If a is not an object by this point, we can't handle it.
    if (atype !== 'object') return false;
    // Check for different array lengths before comparing contents.
    if (a.length && (a.length !== b.length)) return false;
    // Nothing else worked, deep compare the contents.
    var aKeys = _.keys(a), bKeys = _.keys(b);
    // Different object sizes?
    if (aKeys.length != bKeys.length) return false;
    // Recursive comparison of contents.
    for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
    return true;
  };

  // Is a given array or object empty?
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  // Is a given value a function?
  _.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
  // that does not equal itself.
  _.isNaN = function(obj) {
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();


/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */

/**!!
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license <http://www.opensource.org/licenses/mit-license.php>
 * @author Miller Medeiros <http://millermedeiros.com/>
 * @version 0.5.1
 * @build 126 (01/30/2011 01:55 AM)
 */
var signals = (function(){
	/**
	 * Object that represents a binding between a Signal and a listener function.
	 * <br />- <strong>This is an internall constructor and shouldn't be called by regular user.</strong>
	 * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
	 * @author Miller Medeiros
	 * @constructor
	 * @name signals.SignalBinding
	 * @param {signals.Signal} signal	Reference to Signal object that listener is currently bound to.
	 * @param {Function} listener	Handler function bound to the signal.
	 * @param {boolean} isOnce	If binding should be executed just once.
	 * @param {Object} [listenerContext]	Context on which listener will be executed (object that should represent the `this` variable inside listener function).
	 */
	 function SignalBinding(signal, listener, isOnce, listenerContext){
		
		/**
		 * Handler function bound to the signal.
		 * @type Function
		 * @private
		 */
		this._listener = listener;
		
		/**
		 * If binding should be executed just once.
		 * @type boolean
		 * @private
		 */
		this._isOnce = isOnce;
		
		/**
		 * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		 * @memberOf signals.SignalBinding.prototype
		 * @name context
		 * @type {Object|undefined}
		 */
		this.context = listenerContext;
		
		/**
		 * Reference to Signal object that listener is currently bound to.
		 * @type signals.Signal
		 * @private
		 */
		this._signal = signal;
	}
	
	SignalBinding.prototype = /** @lends signals.SignalBinding.prototype */ {
		
		/**
		 * @type boolean
		 * @private
		 */
		_isEnabled : true,
		
		/**
		 * Call listener passing arbitrary parameters.
		 * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p> 
		 * @param {Array} [paramsArr]	Array of parameters that should be passed to the listener
		 * @return {*} Value returned by the listener.
		 */
		execute : function(paramsArr){
			var r;
			if(this._isEnabled){
				r = this._listener.apply(this.context, paramsArr);
				if(this._isOnce){
					this.detach();
				}
			}
			return r; //avoid warnings on some editors
		},
		
		/**
		 * Detach binding from signal.
		 * - alias to: mySignal.remove(myBinding.getListener());
		 * @return {Function} Handler function bound to the signal.
		 */
		detach : function(){
			return this._signal.remove(this._listener);
		},
		
		/**
		 * @return {Function} Handler function bound to the signal.
		 */
		getListener : function(){
			return this._listener;
		},
		
		/**
		 * Remove binding from signal and destroy any reference to external Objects (destroy SignalBinding object).
		 * <p><strong>IMPORTANT:</strong> calling methods on the binding instance after calling dispose will throw errors.</p>
		 */
		dispose : function(){
			this.detach();
			this._destroy();
		},
		
		/**
		 * Delete all instance properties
		 * @private
		 */
		_destroy : function(){
			delete this._signal;
			delete this._isOnce;
			delete this._listener;
			delete this.context;
		},
		
		/**
		 * Disable SignalBinding, block listener execution. Listener will only be executed after calling `enable()`.  
		 * @see signals.SignalBinding.enable()
		 */
		disable : function(){
			this._isEnabled = false;
		},
		
		/**
		 * Enable SignalBinding. Enable listener execution.
		 * @see signals.SignalBinding.disable()
		 */
		enable : function(){
			this._isEnabled = true;
		},
		
		/**
		 * @return {boolean} If SignalBinding is currently paused and won't execute listener during dispatch.
		 */
		isEnabled : function(){
			return this._isEnabled;
		},
		
		/**
		 * @return {boolean} If SignalBinding will only be executed once.
		 */
		isOnce : function(){
			return this._isOnce;
		},
		
		/**
		 * @return {string} String representation of the object.
		 */
		toString : function(){
			return '[SignalBinding isOnce: '+ this._isOnce +', isEnabled: '+ this._isEnabled +']';
		}
		
	};

	/**
	 * Custom event broadcaster
	 * <br />- inspired by Robert Penner's AS3 Signals.
	 * @author Miller Medeiros
	 * @constructor
	 */
	function Signal(){
		/**
		 * @type Array.<SignalBinding>
		 * @private
		 */
		this._bindings = [];
	};
	
	
	Signal.prototype = {
		
		/**
		 * @type boolean
		 * @private
		 */
		_shouldPropagate : true,
		
		/**
		 * @type boolean
		 * @private
		 */
		_isEnabled : true,
		
		/**
		 * @param {Function} listener
		 * @param {boolean} isOnce
		 * @param {Object} [scope]
		 * @return {SignalBinding}
		 * @private
		 */
		_registerListener : function(listener, isOnce, scope){
			
			if(typeof listener !== 'function'){
				throw new Error('listener is a required param of add() and addOnce().');
			}
			
			var prevIndex = this._indexOfListener(listener),
				binding;
			
			if(prevIndex !== -1){ //avoid creating a new Binding for same listener if already added to list
				binding = this._bindings[prevIndex];
				if(binding.isOnce() !== isOnce){
					throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
				}
			} else {
				binding = new SignalBinding(this, listener, isOnce, scope);
				this._addBinding(binding);
			}
			
			return binding;
		},
		
		/**
		 * @param {SignalBinding} binding
		 * @private
		 */
		_addBinding : function(binding){
			this._bindings.push(binding);
		},
		
		/**
		 * @param {Function} listener
		 * @return {number}
		 * @private
		 */
		_indexOfListener : function(listener){
			var n = this._bindings.length;
			while(n--){
				if(this._bindings[n]._listener === listener){
					return n;
				}
			}
			return -1;
		},
		
		/**
		 * Add a listener to the signal.
		 * @param {Function} listener	Signal handler function.
		 * @param {Object} [scope]	Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		 * @return {SignalBinding} An Object representing the binding between the Signal and listener.
		 */
		add : function(listener, scope){
			return this._registerListener(listener, false, scope);
		},
		
		/**
		 * Add listener to the signal that should be removed after first execution (will be executed only once).
		 * @param {Function} listener	Signal handler function.
		 * @param {Object} [scope]	Context on which listener will be executed (object that should represent the `this` variable inside listener function).
		 * @return {SignalBinding} An Object representing the binding between the Signal and listener.
		 */
		addOnce : function(listener, scope){
			return this._registerListener(listener, true, scope);
		},
		
		/**
		 * @private
		 */
		_removeByIndex : function(i){
			this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
			this._bindings.splice(i, 1);
		},
		
		/**
		 * Remove a single listener from the dispatch queue.
		 * @param {Function} listener	Handler function that should be removed.
		 * @return {Function} Listener handler function.
		 */
		remove : function(listener){
			if(typeof listener !== 'function'){
				throw new Error('listener is a required param of remove().');
			}
			
			var i = this._indexOfListener(listener);
			if(i !== -1){
				this._removeByIndex(i);
			}
			return listener;
		},
		
		/**
		 * Remove all listeners from the Signal.
		 */
		removeAll : function(){
			var n = this._bindings.length;
			while(n--){
				this._removeByIndex(n);
			}
		},
		
		/**
		 * @return {number} Number of listeners attached to the Signal.
		 */
		getNumListeners : function(){
			return this._bindings.length;
		},
		
		/**
		 * Disable Signal. Block dispatch to listeners until `enable()` is called.
		 * <p><strong>IMPORTANT:</strong> If this method is called during a dispatch it will only have effect on the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
		 * @see signals.Signal.prototype.enable
		 * @see signals.Signal.prototype.halt
		 */
		disable : function(){
			this._isEnabled = false;
		},
		
		/**
		 * Enable broadcast to listeners.
		 * @see signals.Signal.prototype.disable
		 */
		enable : function(){
			this._isEnabled = true;
		}, 
		
		/**
		 * @return {boolean} If Signal is currently enabled and will broadcast message to listeners.
		 */
		isEnabled : function(){
			return this._isEnabled;
		},
		
		/**
		 * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
		 * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
		 * @see signals.Signal.prototype.disable 
		 */
		halt : function(){
			this._shouldPropagate = false;
		},
		
		/**
		 * Dispatch/Broadcast Signal to all listeners added to the queue. 
		 * @param {...*} [params]	Parameters that should be passed to each handler.
		 */
		dispatch : function(params){
			if(! this._isEnabled){
				return;
			}
			
			var paramsArr = Array.prototype.slice.call(arguments),
				bindings = this._bindings.slice(), //clone array in case add/remove items during dispatch
				i,
				n = this._bindings.length;
			
			this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.
						
			for(i=0; i<n; i++){
				//execute all callbacks until end of the list or until a callback returns `false` or stops propagation
				if(bindings[i].execute(paramsArr) === false || !this._shouldPropagate){
					break;
				}
			}
		},
		
		/**
		 * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
		 * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
		 */
		dispose : function(){
			this.removeAll();
			delete this._bindings;
		},
		
		/**
		 * @return {string} String representation of the object.
		 */
		toString : function(){
			return '[Signal isEnabled: '+ this._isEnabled +' numListeners: '+ this.getNumListeners() +']';
		}
		
	};
	
	return {
		Signal: Signal,
		/**
		 * Signals Version Number
		 * @type {String}
		 * @const
		 */
		VERSION: '0.5.1' 
	};
}());


/**
 * Signal manager that broadcasts messages between modules
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "lib/js-signals.js"
 */
var xv_signals = {
	searchItemSelected: new signals.Signal,
	/**
	 * Original node is (or should be) focused
	 * @param {Element} node Focused node
	 * @param {String} source Signal source 
	 */
	nodeFocused: new signals.Signal,
	
	/**
	 * New XML is feeded to XV component
	 * @param {Element} render_tree Rendered tree
	 * @param {Document} original_tree Original tree feeded to XV component
	 */
	documentProcessed: new signals.Signal,
	
	/**
	 * Enter drag’n’drop mode
	 * @param {Element} elem Element to be dragged
	 * @param {Event} evt Event that triggered dnd mode
	 */
	dndModeEntered: new signals.Signal,
	
	/**
	 * Exit drag’n’drop mode
	 * @param {Event} evt Event that triggered dnd mode exit
	 */
	dndModeQuit: new signals.Signal,
	
	/**
	 * Changed drag’n’drop data transfer message
	 * @param {String} message
	 */
	dndMessageChanged: new signals.Signal
};

/**
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */
var xv_utils = (function(){
	var re_not_xpath = /^[\w\-\:]+$/;
	
	// regexp from http://www.regexguru.com/2008/11/detecting-urls-in-a-block-of-text/
	var reURL = /\b(?:(?:https?|ftp|file|feed):\/\/|www\.|ftp\.)[\-A-Z0-9\+&@#\/%=~_\|\$\?\!:,\.\(\)]*[A-Z0-9+&@#\/%=~_|$]/ig;
	
	return {
		/**
		 * Trim whitespace from the beginning and the end of string
		 * @param {String} text
		 * @return {String}
		 */
		trim: function(text) {
			return (text || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
		},
		
		/**
		 * Creates XPath for specified <code>node</code> element.
		 * If <code>context</code> passed, the XPath will be built up till this
		 * element.
		 * 
		 * @param {Element} node 
		 * @param {Element} [context] 
		 * @return {String}
		 */
		createXPath: function(node, context) {
			var parts = [];
			
			function walk(node){
				var _node = node;
				var name = node.nodeName;
				var count = 1;
				while (node = node.previousSibling) {
					if (node.nodeType == 1 && node.nodeName == name) {
						count++;
					}
				}
				
				parts.unshift(name + '[' + count + ']');
				if (_node.parentNode && _node.parentNode != context && _node.ownerDocument != _node.parentNode)
					walk(_node.parentNode);
			}
			
			walk(node);
			
			return (!context ? '/' : '') + parts.join('/');
		},
		
		/**
		 * Check is passed string looks like XPath
		 * @param {String} str
		 * @return {Boolean}
		 */
		isXPath: function(str) {
			return !re_not_xpath.test(str);
		},
		
		unescapeHTML: function(text) {
			var chars = {
				'&lt;': '<',
				'&gt;': '>',
				'&amp;': '&',
				'&quot;': '"',
				'&apos;': '\''
			};
			
			text = this.trim(text);
			
			return text.replace(/&(lt|gt|amp|apos|quot);/g, function(str) {
				return chars[str];
			});
		},
		
		/**
		 * Escapes unsafe HTML characters
		 * @param {String} str
		 * @return {String}
		 */
		escapeHTML: function(str) {
			var charmap = {
				'<': '&lt;',
				'>': '&gt;',
				'&': '&amp;'
			};
			
			return str.replace(/[<>&]/g, function(s) {
				return charmap[s] || s;
			});
		},
		
		toXml: function(text) {
			var result = (new DOMParser()).parseFromString(text, 'text/xml');
			
			if (!result || !result.documentElement
					|| result.documentElement.nodeName == 'parsererror'
					|| result.getElementsByTagName('parsererror').length) {
						
						
				var error = result.getElementsByTagName('parsererror')[0];
				console.log(error);
				throw "<h2>Can’t parse XML document</h2> \n" + (error ? error.textContent : '');
			}
			
			return result;
		},
		
		/**
		 * Returns list of valid attributes for node (i.e. without internal ones)
		 * @param {Element} elem
		 * @return {Array}
		 */
		filterValidAttributes: function(elem) {
			return _.filter(elem.attributes, function(n) {
				return n.name.indexOf('data-xv-') != 0;
			});
		},
		
		/**
		 * Splits text into array with URLs in odd positions
		 * @param {String} text
		 * @returns {Array}
		 */
		findURLs: function(text) {
			var reDelim = new RegExp('(' + reURL.source + ')', 'ig');
			return text.split(reDelim);
		},

		/**
		 * Formats URL as link with sanitized URL and text
		 * @param {String} text
		 * @returns {String}
		 */
		formatURL: function(url) {
			// has protocol?
			var href = url;
			if (!/^[a-z]+:\/\//i.test(href)) {
				href = 'http://' + href;
			}

			return '<a href="' + href + '" class="xv-url" target="_blank">' + this.escapeHTML(url) + '</a>';
		}
	};
})();

/**
 * DOM utils
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */
var xv_dom = {
	xhtml_ns: 'http://www.w3.org/1999/xhtml',
	
	/**
	 * Context document used to produce nodes of 
	 * <code>HTMLElement</code> class. If renderer is used in a XML document
	 * (like in Google Chrome extension), the default elements produced by
	 * <code>document.createElement</code> method will be objects of 
	 * <code>Element</code> class with limited styling support. 
	 * @type {Document}
	 * @private
	 */
	_html_context: null,
	
	/**
	 * Set HTML context document
	 * @param {Document} ctx
	 */
	setHTMLContext: function(ctx) {
		this._html_context = ctx;
	},
	
	/**
	 * Trims whitespace from string
	 * @param {String} text
	 * @return {String}
	 */
	trim: function(text) {
		return (text || '').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '');
	},
	
	/**
	 * Returns 'class' attribute value of the element
	 * @param {Element} elem
	 * @return {String}
	 */
	getClassName: function(elem) {
		if ('className' in elem)
			return elem.className;
		else if (elem.getAttribute)
			return elem.getAttribute('class') || '';
		
		return '';
	},
	
	/**
	 * Updates 'class' attribute of the element
	 * @param {Element} elem
	 * @param {String} value
	 */
	setClassName: function(elem, value) {
		if ('className' in elem)
			elem.className = value;
		else
			elem.setAttribute('class', value);
	},
	
	/**
	 * Check if element contains specified class name
	 *
	 * @param {Element} elem
	 * @param {String} class_name
	 * @return {Boolean}
	 */
	hasClass: function(elem, class_name) {
		class_name = ' ' + class_name + ' ';
		var _cl = this.getClassName(elem);
		return _cl && (' ' + _cl + ' ').indexOf(class_name) >= 0;
	},
	
	/**
	 * Toggle class name on element
	 * @param {Element} elem
	 * @param {String} class_name
	 * @param {Boolean} [cond] True-false condition on class switching
	 */
	toggleClass: function(elem, class_name, cond) {
		if (typeof cond == 'undefined')
			cond = this.hasClass(elem, class_name);
			
		if (cond)
			this.removeClass(elem, class_name);
		else
			this.addClass(elem, class_name);
	},
	
	/**
	 * Add class to element
	 *
	 * @param {Element} elem
	 * @param {String} class_name
	 */
	addClass: function(elem, class_name) {
		var classes = [];
		var _c = class_name.split(/\s+/g);
		for (var i = 0, il = _c.length; i < il; i++) {
			if (_c[i] && !this.hasClass(elem, _c[i]))
				classes.push(_c[i]);
		}
		
		var value = this.getClassName(elem);
		if (classes.length)
			value += (value ? ' ' : '') + classes.join(' ');
		this.setClassName(elem, this.trim(value));
	},
	
	/**
	 * Removes class from element
	 *
	 * @param {Element} elem
	 * @param {String} class_name
	 */
	removeClass: function(elem, class_name) {
		var elem_class = this.getClassName(elem) || '';
		var _c = class_name.split(/\s+/g);
		for (var i = 0, il = _c.length; i < il; i++) {
			elem_class = elem_class.replace(new RegExp('\\b' + _c[i] + '\\b'), '');
		}
		
		this.setClassName(elem, this.trim(elem_class));
	},
	
	/**
	 * Returns list with specified class name
	 * @param {String} class_name Class name
	 * @param {Element|Document} [context] Context element
	 * @return {NodeList}
	 */
	getByClass: function(class_name, context) {
		return (context || document).getElementsByClassName(class_name);
	},
	
	/**
	 * Returns single element with specified class name
	 * @param {String} class_name Class name
	 * @param {Element|Document} [context] Context element
	 * @return {Element}
	 */
	getOneByClass: function(class_name, context) {
		var list = this.getByClass(class_name, context);
		return list ? list[0] : null;
	},
	
	/**
	 * Returns node list by CSS selector
	 * @param {String} selector CSS selector
	 * @param {Element} [context] Context node (<code>document</code> by default)
	 * @return {NodeList}
	 */
	getBySelector: function(selector, context) {
		return (context || document).querySelectorAll(selector);
	},
	
	/**
	 * Removes element from tree
	 * @param {Element} elem
	 */
	removeElement: function(elem) {
		if (elem && elem.parentNode)
			elem.parentNode.removeChild(elem);
	},
	
	/**
	 * Add event listener to element
	 * @param {Element} elem
	 * @param {String} type
	 * @param {Function} fn
	 */
	addEvent: function(elem, type, fn) {
		var items = type.split(/\s+/);
		for (var i = 0; i < items.length; i++) {
			elem.addEventListener(items[i], fn, false);
		}
	},
	
	/**
	 * Removes event listener from element
	 * @param {Element} elem
	 * @param {String} type
	 * @param {Function} fn
	 */
	removeEvent: function(elem, type, fn) {
		var items = type.split(/\s+/);
		for (var i = 0; i < items.length; i++) {
			elem.removeEventListener(items[i], fn, false);
		}
	},
	
	/**
	 * Transforms string to camelCase
	 * @private
	 * @param {String} name
	 * @return {String}
	 */
	toCamelCase: function(name) {
		return name.replace(/\-(\w)/g, function(str, p1) {
			return p1.toUpperCase();
		});
	},
	
	/**
	 * Set CSS rules defined in <code>params</code> object for specified element
	 *
	 * @param {Element} elem
	 * @param {Object} params CSS properties
	 */
	setCSS: function(elem, params) {
		if (!elem)
			return;
		
		var props = [],
			num_props = {'line-height': 1, 'z-index': 1, 'opacity': 1};
	
		for (var p in params) if (params.hasOwnProperty(p)) {
			var name = p.replace(/([A-Z])/g, '-$1').toLowerCase(),
				value = params[p];
			props.push(name + ':' + ((typeof(value) == 'number' && !(name in num_props)) ? value + 'px' : value));
		}
		
		if (elem.style) {
			elem.style.cssText += ';' + props.join(';');
		} else {
			var style = elem.getAttribute('style') || '';
			style += (style ? ';' : '') + props.join(';');
			elem.setAttribute(style);
		}
	},
	
	/**
	 * Returns value of <b>name</b> CSS property (or properties) of <b>elem</b> element
	 * @author John Resig (http://ejohn.org)
	 * @param {Element} elem 
	 * @param {String|Array} name CSS property name
	 * @return {String|Object}
	 */
	getCSS: function(elem, name) {
		var cs, result = {}, n, name_camel, is_array = name instanceof Array;
		
		var _name = is_array ? name : [name];
		for (var i = 0, il = _name.length; i < il; i++) {
			n = _name[i];
			name_camel = this.toCamelCase(n);
	
			// If the property exists in style[], then it's been set
			// recently (and is current)
			if (elem.style[name_camel]) {
				result[n] = result[name_camel] = elem.style[name_camel];
			}
			// Or the W3C's method, if it exists
			else {
				if (!cs)
					cs = window.getComputedStyle(elem, "");
				result[n] = result[name_camel] = cs && cs.getPropertyValue(n);
			}
		}
	
		return is_array ? result : result[this.toCamelCase(name)];
	},
	
	/**
	 * Creates node set from HTML fragment
	 * @param {String} html
	 * @return {Element|DocumentFragment}
	 */
	fromHTML: function(html) {
		var context = this._html_context || document,
			div = context.createElement('div'),
			f = document.createDocumentFragment();
		
		if ('innerHTML' in div) {
			// working inside HTML document
			div.innerHTML = html;
			while (div.firstChild) {
				if (div.firstChild.ownerDocument == document)
					f.appendChild(div.firstChild);
				else
					f.appendChild(document.adoptNode(div.firstChild));
			}
		} else {
			// working inside XML document
			var doc = xv_utils.toXml('<d>' + html + '</d>'),
				doc_elem = doc.documentElement;
			
			while (doc_elem.firstChild) {
				f.appendChild(document.adoptNode(doc_elem.firstChild));
			}
		}
		
		if (!f.hasChildNodes())
			return null;
		
		return f.childNodes.length == 1 ? f.firstChild : f;
	},
		
	/**
	 * Empty node: removes all child elements
	 * @param {Element} elem
	 * @return {Element} Passed element
	 */
	empty: function(elem) {
		while (elem && elem.firstChild)
			elem.removeChild(elem.firstChild);
			
		return elem;
	},
	
	/**
	 * Adds <code>DOMContentLoaded</code> event listener
	 * @param {Function} fn
	 */
	onDomReady: function(fn) {
		this.addEvent(document, 'DOMContentLoaded', fn);
	},
	
	/**
	 * Simple bubbling search that tests if specified class name exists on element
	 * or its parents
	 * @param {Element} elem
	 * @param {String} class_name
	 * @return {Element} First element that contains class name
	 */
	bubbleSearch: function(elem, class_name) {
		var classes = class_name.split(',');
		
		do {
			if (elem) {
				for (var i = 0, il = classes.length; i < il; i++) {
					if (this.hasClass(elem, classes[i]))
						return elem;
				}
			}
		} while(elem && (elem = elem.parentNode));
		
		return null;
	},
	
	/**
	 * Set text content for element
	 * @param {Element} elem
	 * @param {String} text
	 */
	setText: function(elem, text) {
		this.empty(elem);
		elem.appendChild(document.createTextNode(text));
	}
};

/**
 * Module for working with user preferences. Possible values:
 * <p>
 * <b>init_depth</b> : Number — Initial tree render depth<br>  
 * <b>search.max_visible</b> : Number — Maximum visible results in search popup<br>  
 * <b>dnd.xpath_quote</b> : String — Quote character used in Quick XPath expressions<br>
 *   
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */
var xv_settings = (function(){
	var settings = {},
		has_ls = hasLocalStorage();
		
	function hasLocalStorage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
	
	return {
		/**
		 * Returns preference value
		 * @param {String} name
		 * @return {Object}
		 */
		getValue: function(name, default_value) {
			var value;
			
			if (has_ls)
				value = localStorage.getItem(name);
			else
				value = settings[name];
				
			if (_.isNull(value) || _.isUndefined(value))
				value = default_value;
				
			switch (typeof default_value) {
				case 'number':
					return parseFloat(value);
				case 'boolean':
					if (typeof value == 'string' && value.toLowerCase() == 'false')
						value = false;
					return !!value;
				default:
					return value;
			}
		},
		
		/**
		 * Set new preference value
		 * @param {String} name
		 * @param {Object} value
		 */
		setValue: function(name, value) {
			if (has_ls)
				localStorage.setItem(name, value);
			else
				settings[name] = value;
		},
		
		/**
		 * Removes all stored data
		 */
		reset: function() {
			if (has_ls)
				localStorage.clear();
			else
				settings = {};
		},
		
		/**
		 * Returns dump of all user settings as object
		 * @return {Object}
		 */
		dump: function() {
			return _.clone(has_ls ? localStorage : settings);
		}
	};
})();

/**
 * Renders XML document
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "utils.js"
 */
var xv_renderer = (function() {
	
	var _id = 0,
		orig_elems = {},
		oneline_text_len = 100;
	
		
	/**
	 * Returns node internal id, if exists
	 * @param {Element} node
	 * @return {String}
	 */
	function getId(node) {
		if ('__xv_id' in node)
			return node.__xv_id;
		if ('getAttribute' in node)
			return node.getAttribute('data-xv-id');
		
		return null;
	}
	
	/**
	 * Generates or retrieves internal ID from node
	 * @param {Element} node
	 * @returns {String}
	 */
	function generateId(node) {
		var id = getId(node);
		if (id === null || typeof id == 'undefined') {
			id = _id++;
			node.__xv_id = id;
			orig_elems[id] = node;
		}
			
		return id;
	}
	
	/**
	 * Stylize DOM node
	 * @param {HTMLElement} node Node to render
	 * @param {Number} depth Depth level of child elements should be rendered
	 * @return {String}
	 */
	function stylize(node, depth) {
		if (node) {
			switch (node.nodeType) {
				case 1: // element
					return stylizeElement(node, depth);
				case 3: // text node
					return stylizeTextNode(node, depth);
				case 4: // text node
					return stylizeCDATA(node, depth);
				case 7: // processing instruction
					return stylizeProcessingInstruction(node, depth);
				case 8: // comment
					return stylizeComment(node, depth);
				case 9: // document
					var result = [];
					for (var i = 0, il = node.childNodes.length; i < il; i++) {
						result.push(stylize(node.childNodes[i], depth));
					}
					return result.join('');
				default:
					if (window.console)
						console.log('processing unknown type:', node.nodeType);
			}
		}
		
		return '';
	}
	
	/**
	 * Test if node can be collapsed
	 * @param {Element} node
	 * @return {Boolean}
	 */
	function canBeCollapsed(node) {
		var child = node.childNodes;
		return node.childNodes.length && (child.length > 1 || node.firstChild.nodeType != 3);
	}
	
	/**
	 * Stylize element node as tokenized HTML fragment
	 * @param {HTMLElement} node Node to render
	 * @param {Object} counter Counter data
	 * @param {Number} depth Element depth
	 * @return {String} 
	 */
	function stylizeElement(node, depth) {
		var attrs = _.map(xv_utils.filterValidAttributes(node), function(n) {
			return '<span class="xv-attr"><span class="xv-attr-name">' + n.name + '</span>' +
				'="' +
				'<span class="xv-attr-value">' + processText(n.value) + '</span>' +
				'"</span>';
		});
		
		
		// test if current node should be displayed on one line
		var is_one_liner = node.childNodes.length == 1 
			&& node.firstChild.nodeType == 3 
			&& node.firstChild.nodeValue.length < oneline_text_len;
		
		var result = [],
			add_class = '',
			skip_children = false;
			
		if (is_one_liner || !node.childNodes.length)
			add_class += ' xv-one-line';
			
		if (!depth && canBeCollapsed(node)) {
			skip_children = true;
			add_class += ' xv-collapsed xv-has-unprocessed';
		}
			
		result.push('<span class="xv-node xv-tag' + add_class + '" data-xv-id="' + generateId(node) + '">');
		result.push('<span class="xv-tag-switcher"></span>');
		result.push('<span class="xv-tag-open">&lt;');
		result.push('<span class="xv-tag-name">' + node.nodeName +'</span>');
		if (attrs.length)
			result.push(' ' + attrs.join(' '));
			
		if (!node.childNodes.length) {
			result.push(' /&gt;</span></span>');
		} else {
			result.push('&gt;</span>');
			
			result.push('<span class="xv-tag-children">');
			
			if (!skip_children || is_one_liner) {
				_.each(node.childNodes, function(n) {
					result.push(stylize(n, depth - 1));
				});
			}
			
			result.push('</span>');
			
			result.push('<span class="xv-tag-close">&lt;/' +
				'<span class="xv-tag-name">' + node.nodeName +'</span>' +
				'&gt;</span></span>');
		}
		
		return result.join('');
	}
	
	function processText(text) {
		var urls = xv_utils.findURLs(xv_utils.trim(text));

		var result = _.map(urls, function (text, i) {
			// odd elements are urls
			if (i % 2 === 1) {
				return xv_utils.formatURL(text);
			} else {
				return xv_utils.escapeHTML(text);
			}
		});

		return result.join('');
	}
	
	/**
	 * Stylize element node as tokenized HTML fragment
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeTextNode(node) {
		var v = xv_utils.trim(node.nodeValue);
		return v ? '<span class="xv-text" data-xv-id="' + generateId(node) + '">' + processText(node.nodeValue) + '</span>' : '';
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeProcessingInstruction(node) {
		return '<span class="xv-node xv-pi" data-xv-id="' + generateId(node) + '">&lt;?<span class="xv-pi-name">' + node.nodeName + '</span> ' +
				'<span class="xv-pi-value">' + processText(node.nodeValue) + '</span>?&gt;</span>';
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeComment(node) {
		var v = xv_utils.trim(node.nodeValue),
			class_name = 'xv-node xv-comment';
			
		if (v.length < oneline_text_len) {
			class_name += ' xv-one-line';
		}
		
		return '<span class="' + class_name + '" data-xv-id="' + generateId(node) + '">' +
				'<span class="xv-tag-switcher"></span>' +
				'<span class="xv-comment-start">&lt;!-- </span>' +
				'<span class="xv-comment-value">' + processText(v) + '</span>' +
				'<span class="xv-comment-end"> --&gt;</span>' +
				'</span>';
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeCDATA(node) {
		var v = xv_utils.trim(node.nodeValue),
			class_name = 'xv-node xv-cdata';
			
		if (v.length < oneline_text_len) {
			class_name += ' xv-one-line';
		}
		
		return '<span class="' + class_name + '" data-xv-id="' + generateId(node) + '">' +
				'<span class="xv-tag-switcher"></span>' +
				'<span class="xv-cdata-start">&lt;![CDATA[</span>' +
				'<span class="xv-cdata-value">' + processText(v) + '</span>' +
				'<span class="xv-cdata-end"> ]]&gt;</span>' +
				'</span>';
	}
	
	return {
		/**
		 * Render XML fragment as styled HTML tree
		 * @param {HTMLElement} elem
		 * @param {Number} depth Depth level of child elements should be rendered
		 * (pass <code>-1</code> to render full tree)
		 * @return {DocumentFragment}
		 */
		render: function(elem, depth) {
			if (typeof depth == 'undefined')
				depth = -1;
				
			if (!elem) return document.createDocumentFragment();
			return xv_dom.fromHTML(stylize(elem, depth));
		},
		
		/**
		 * Check if node already rendered
		 * @param {Element} node
		 * @return {Boolean}
		 */
		isRendered: function(node) {
			return !!getId(node);
		},
		
		/**
		 * Returns original node from which passed rendered node was created
		 * @param {Element|String} id
		 * @return {Element}
		 */
		getOriginalNode: function(id) {
			if (typeof id != 'string' && 'nodeType' in id)
				id = id.getAttribute('data-xv-id');
				
			return orig_elems[id];
		},
		
		getId: generateId
	};
})();


/**
 * Search module
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "utils.js"
 * @include "dom.js"
 * @include "signals.js"
 */
var xv_search = (function(){
	var search_index = [],
		/** @type {Document} */
		doc,
		
		/** @type {Array} List of last matched elements */
		last_search,
		
		/** Max results to be matched */
		max_results = 200,
		namespaces = {};
		
		
	function collectNamespaces(doc) {
		namespaces = {};
		_.each(doc.getElementsByTagName('*'), function(node) {
			_.each(node.attributes, function(attr) {
				if (startsWith(attr.nodeName, 'xmlns'))
					namespaces[attr.nodeName.substring(attr.nodeName.indexOf(':') + 1)] = attr.nodeValue;
			});
		});
	}
	
	function nsResolver(prefix) {
		return namespaces[prefix] || null;
	}
	
	function startsWith(str, val) {
		return str.substr(0, val.length) == val;
	}
	
	/**
	 * Creates search index item
	 * @param {Element} node
	 */
	function searchIndexItem(node) {
		var search_str = node.nodeName,
			attrs = xv_utils.filterValidAttributes(node);
		
		if (attrs.length)
			search_str += ' ' + attrs.join(' ');
			
		return {
			str: search_str.toLowerCase(),
			node: node
		};
	}
	
	/**
	 * Recursively build search index on node, preserving node order 
	 * @param {Element} node
	 */
	function buildIndex(node) {
		if (node.nodeType != 1)
			return;
			
		search_index.push(searchIndexItem(node));
		_.each(node.childNodes, buildIndex);
	}
	
	/**
	 * Simple textual search on document tree
	 * @param {String} query Search query
	 * @return {Array} Array of matched nodes, null otherwise 
	 */
	function searchText(query) {
		var result = [];
		if (query) {
			_.each(search_index, function(/* searchIndexItem */ n) {
				var ix = n.str.indexOf(query);
				if (ix != -1) {
					result.push({
						ix: ix,
						node: n.node
					});
					
					if (result.length >= max_results)
						return false;
				}
			});
		}
		
		return result.length ? result : null;
	}
	
	function searchXPath(query) {
		var result = [], i = 0;
		try {
			var xpath_rs = doc.evaluate(query, doc, nsResolver, XPathResult.ANY_TYPE, null);
			
			switch(xpath_rs.resultType) {
				case XPathResult.NUMBER_TYPE:
					result.push({
						xpath_type: xpath_rs.resultType,
						value: xpath_rs.numberValue
					});
					break;
				case XPathResult.STRING_TYPE:
					result.push({
						xpath_type: xpath_rs.resultType,
						value: xpath_rs.stringValue
					});
					break;
				case XPathResult.BOOLEAN_TYPE:
					result.push({
						xpath_type: xpath_rs.resultType,
						value: xpath_rs.booleanValue
					});
					break;
				case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
					var n = xpath_rs.iterateNext();
					while (n && i < max_results) {
						result.push({node: n});
						n = xpath_rs.iterateNext();
						i++;
					}	
					break;
				}
		} catch(e) {}
		
		return result.length ? result : null;
	}
	
	/**
	 * Post-process search result item: add label and found query range
	 * @param {Object} item Search result item
	 * @param {String} query Search query
	 * @return {Object} Augumented item
	 */
	function postProcessResult(item, query) {
		/** @type {Element} */
		var node = item.node,
			name = node.nodeName,
			ql = query.length,
			xpath = node.getAttribute('data-xv-xpath');
			
		if (!xpath) {
			xpath = xv_utils.createXPath(node);
			node.setAttribute('data-xv-xpath', xpath);
		}
		
		item.label = name;
		item.query_start = -1;
		item.query_end = -1;
		item.xpath = xpath;
			
		if ('ix' in item) { // simple text search result
			if (item.ix < name.length) {  // mark search result in node name
				item.query_start = item.ix;
				item.query_end = item.ix + ql;
			} else { // match found somethere in attribute, add it
				_.detect(node.attributes, function(n) {
					var _ix = n.name.indexOf(query);
					if (_ix != -1) {
						item.label += '[@' + n.name + ']';
						item.query_start = name.length + _ix + 2;
						item.query_end = item.query_start + ql;
						return true;
					}
				});
			}
		}
		
		return item;
	}
	
	
	xv_signals.documentProcessed.add(function(render_tree, original_tree) {
		search_index.length = 0;
		collectNamespaces(original_tree);
		if (original_tree.nodeType == 9) {
			buildIndex(original_tree.documentElement);
			doc = original_tree;
		} else {
			buildIndex(original_tree);
			doc = original_tree.ownerDocument;
		}
	});
	
	return {
		/**
		 * Search for XML node (simple or XPath search)
		 * @param {String} query
		 * @return {Object} JSON object with search results
		 */
		search: function(query) {
			query = xv_utils.trim(query).toLowerCase();
			
			try {
				last_search = xv_utils.isXPath(query) ? searchXPath(query) : searchText(query);
				
				if (last_search && !(last_search.length == 1 && 'xpath_type' in last_search[0]))
					last_search = _.map(last_search, function(n) {
						return postProcessResult(n, query);
					});
				
			} catch(e) {
				last_search = null;
			}
			
			return {
				query: query,
				results: last_search
			};
		},
		
		/**
		 * Apply search result to document (i.e. select matched node)
		 * @param {Number} ix Last search result index
		 */
		applyProposal: function(ix) {
			xv_signals.nodeFocused.dispatch(last_search[ix].node, 'search');
		}
	};
})();

/**
 * UI for search module
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "utils.js"
 * @include "dom.js"
 * @include "signals.js"
 * @include "search.js"
 */
(function(){
	var search_index = [],
		/** @type {Document} */
		doc,
		
		/** @type {Array} List of last matched elements */
		last_search,
		
		last_query,
		/** @type {Element} Popup container */
		popup,
		
		selected_item = -1,
		
		is_visible = false,
		
		/** @type {Element} Search field */
		search_field,
		/** @type {Element} Inline xpath result container */
		inline_xpath, 
		
		hover_lock_timeout,
		is_hover_locked = false;
	
	/**
	 * Returns list of search result items
	 * @return {NodeList}
	 */
	function getSearchResultItems() {
		return xv_dom.getByClass('xv-search-result-item', popup);
	}
	
	/**
	 * Returns maximum visible results in search popup
	 * @return {Number}
	 */
	function getMaxVisibleResults() {
		return xv_settings.getValue('search.max_visible', 20);
	}
	
	/**
	 * Select search result item
	 * @param {Number} ix Index of item
	 * @param {Boolean} no_scroll Do not scroll popup content to make sure that
	 * selected item is always visible
	 */
	function selectItem(ix, no_scroll) {
		var result_items = getSearchResultItems(),
			/** @type {Element} */
			cur_item;
			
		ix = Math.min(result_items.length - 1, Math.max(0, ix));
			
		_.each(result_items, function(n, i) {
			xv_dom.removeClass(n, 'xv-search-result-item-selected');
			if (i == ix) {
				cur_item = n;
				xv_dom.addClass(n, 'xv-search-result-item-selected');
			}
		});
		
		if (!no_scroll && cur_item) {
			var content = cur_item.parentNode;
			// make sure that selected proposal is visible
			var proposal_top = cur_item.offsetTop,
				proposal_height = cur_item.offsetHeight,
				popup_scroll = content.scrollTop,
				popup_height = content.offsetHeight;
				
			if (proposal_top < popup_scroll) {
				content.scrollTop = proposal_top;
			} else if (proposal_top + proposal_height > popup_scroll + popup_height) {
				content.scrollTop = proposal_top + proposal_height - popup_height;
			}
		}
		
		selected_item = ix;
		xv_signals.searchItemSelected.dispatch(cur_item, selected_item);
	}
	
	/**
	 * Temporary lock popup hover events.
	 * Hover lock is used to prevent accident mouseover event callback when
	 * mouse cursor is over popup window and user traverses between proposals
	 * with arrow keys
	 */
	function lockHover() {
		if (hover_lock_timeout)
			clearTimeout(hover_lock_timeout);
		
		is_hover_locked = true;
		setTimeout(function() {
			is_hover_locked = false;
		}, 100);
	}
	
	/**
	 * Creates label that will be displayed as a search result
	 * @param {Object} item Search result item
	 * @param {String} query Search query
	 */
	function createSearchResultLabel(item) {
		var label = item.label;
		if (item.query_start != -1) {
			label = item.label.substring(0, item.query_start) + 
				'<em>' + item.label.substring(item.query_start, item.query_end) + '</em>' +
				item.label.substring(item.query_end);
		}
		
		return label + ' <span class="xv-search-result-xpath">' + item.xpath + '</span>';
	}
	
	/**
	 * Creates HTML list of found nodes
	 * @param {Array} found List of matched nodes
	 * @param {String} query Search query
	 * @return {jQuery}
	 */
	function buildSearchResult(found, query) {
		// reset selected item
		selected_item = -1;
		
		if (found.results.length == 1 && 'xpath_type' in found.results[0]) {
			// single xpath result
			inline_xpath.innerHTML = found.results[0].value;
			showInlineXpath();
			hidePopup();
		} else {
			var items = _.map(found.results, function(n, i) {
				return '<li class="xv-search-result-item" data-xv-search-ix="' + i + '">' + createSearchResultLabel(n) + '</li>';
			});
			
			var content = xv_dom.getOneByClass('xv-search-result-content');
			xv_dom.empty(content);
			content.appendChild(xv_dom.fromHTML(items.join('')));
			
			showPopup();
			hideInlineXpath();
			
			if (found.results.length > getMaxVisibleResults()) {
				xv_dom.addClass(popup, 'xv-search-result-overflow');
				xv_dom.setCSS(content, {'height': getSearchResultItems()[0].offsetHeight * getMaxVisibleResults()});
			} else {
				xv_dom.removeClass(popup, 'xv-search-result-overflow');
				xv_dom.setCSS(content, {'height': 'auto'});
			}
		}
	}
	
	function hidePopup() {
		xv_dom.addClass(popup, 'xv-search-result-hidden');
		is_visible = false;
	}
	
	function showPopup() {
		xv_dom.removeClass(popup, 'xv-search-result-hidden');
		is_visible = true;
	}
	
	function hideInlineXpath() {
		xv_dom.addClass(inline_xpath, 'xv-search-result-hidden');
	}
	
	function showInlineXpath() {
		xv_dom.removeClass(inline_xpath, 'xv-search-result-hidden');
	}
	
	function performSearch() {
		var query = xv_utils.trim(search_field.value).toLowerCase();
		
		if (!query) {
			hideInlineXpath();
			hidePopup();
			return;
		}
		
		if (query == last_query && is_visible)
			return;
		
		last_query = query;
		last_search = xv_search.search(query);
		
//		console.log(query, last_search);
		
		if (last_search.results) {
			buildSearchResult(last_search);
		} else {
			hideInlineXpath();
			hidePopup();
		}
	}
	
	function applyProposal(ix) {
		xv_search.applyProposal(ix);
		hidePopup();
	}
	
	var _doSearch = _.debounce(performSearch, 400);
	
	/**
	 * Handle keyboard event performed on search field
	 * @param {Event} evt
	 */
	function handleKeyEvent(evt) {
		if (is_visible) {
			switch (evt.keyCode) {
				case 38: //up
					selectItem(selected_item - 1);
					lockHover();
					evt.preventDefault();
					return;
				case 40: //down
					selectItem(selected_item + 1);
					lockHover();
					evt.preventDefault();
					return;
				case 13: //enter
					applyProposal(selected_item);
					evt.preventDefault();
					return;
				case 27: // escape
					hidePopup();
					evt.preventDefault();
					return;
			}
		}
		
		_doSearch();
	}
	
	function runOnDelegated(cur_elem, fn) {
		var elem = xv_dom.bubbleSearch(cur_elem, 'xv-search-result-item');
		if (elem) {
			var ix = _.indexOf(getSearchResultItems(), elem);
			if (ix != -1)
				fn(ix);
		}
	}
	
	xv_signals.documentProcessed.addOnce(function() {
		popup = xv_dom.fromHTML('<div class="xv-search-result"><ul class="xv-search-result-content"></ul></div>');
		hidePopup();
		
		var panel = xv_dom.getOneByClass('xv-search-panel');
		panel.appendChild(popup);
		
		search_field = xv_dom.getOneByClass('xv-search-field', panel);
		inline_xpath = xv_dom.getOneByClass('xv-search-xpath-result', panel);
		hideInlineXpath();
		
		// bind events to search field
		xv_dom.addEvent(search_field, 'keydown', handleKeyEvent);
		
		// delegate hover event: hilight proposal
		xv_dom.addEvent(popup, 'mouseover', function(/* Event */ evt) {
			if (is_hover_locked) return;
			runOnDelegated(evt.target, function(ix) { selectItem(ix, true); });
		});
		
		// delegate click event: apply proposal
		xv_dom.addEvent(popup, 'click', function(/* Event */ evt) {
			runOnDelegated(evt.target, function(ix) {
				applyProposal(ix);
				hideInlineXpath();
				hidePopup();
			});
		});
		
		var dont_hide = false;
		
		xv_dom.addEvent(search_field, 'blur', function() {
			// use delayed execution in to handle popup click event correctly
			setTimeout(function() {
				if (!dont_hide) hidePopup();
				dont_hide = false;
			}, 200);
		});
		
		xv_dom.addEvent(search_field, 'focus', performSearch);
		xv_dom.addEvent(search_field, 'search', performSearch);
		
		xv_dom.addEvent(popup, 'mousedown', function(/* Event */ evt) {
			evt.preventDefault();
			evt.stopPropagation();
			dont_hide = true;
			return false;
		});
		
		xv_dom.addEvent(document, 'mousedown', hidePopup);
	});
})();


/**
 * Drag'n'drop support for XML nodes.<br><br>
 *  
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "controller.js"
 * @include "dom.js"
 * @include "dnd_feedback.js"
 */
(function(){
	/** @type {Element} */
	var drag_elem,
		is_dragging = false,
		is_drag_mode = false,
		data_transfer,
		dnd_image = null,
		
		is_mac = /mac\s+os/i.test(navigator.userAgent),
		
		os_key = 0,
		os_modifier = 0,
		
		xpath_mode = 0,
		use_cycle_mode = true,
		
		/** @type {Element} */
		source_node,
		/** @type {Element} */
		dnd_tooltip;
		
	var META_KEY = 1, 
		ALT_KEY = 2,
		SHIFT_KEY = 4,
		CTRL_KEY = 8;
		
	if (is_mac) {
		os_modifier = META_KEY;
		os_key = 91;
	} else {
		os_modifier = CTRL_KEY;
		os_key = 17;
	}
		
	
	/**
	 * Creates modifier keys mask from passed event
	 * @param {Event} evt;
	 * @return {Number}
	 */
	function getKeyMask(evt) {
		var mask = 0;
		mask |= evt.metaKey && META_KEY;
		mask |= evt.altKey && ALT_KEY;
		mask |= evt.shiftKey && SHIFT_KEY;
		mask |= evt.ctrlKey && CTRL_KEY;
		
		return mask;
	}
	
	/**
	 * Test if modifier key was the trigger of the keyboard event (keydown/keyup/etc)
	 * @param {Event} evt
	 * @return {Boolean}
	 */
	function isModifierKeyTrigger(evt) {
		// 16 - shift
		// 17 - ctrl
		// 18 - alt
		// 91 - command
		var c = evt.keyCode;
		return c == 16 || c == 17 || c == 18 || c == 91;
	}
	
	/**
	 * Return attribute quote for XPath
	 * TODO get from settings
	 * @return {String}
	 */
	function getAttrQuote() {
		return xv_settings.getValue('dnd.xpath_quote', "'");
	}
	
	/**
	 * Escape specified <code>quote</code> in <code>text</code>
	 * @param {String} text
	 * @param {String} quote
	 * @return {String}
	 */
	function escapeQuote(text, quote) {
		var quote_map = {
			'"': '&quot;',
			"'": '&apos;'
		};
		return text.replace(new RegExp(quote, 'g'), quote_map[quote]);
	}
	
	function updateTransferImage() {
		if (data_transfer && dnd_image && dnd_image.src)
			data_transfer.setDragImage(dnd_image, 6, dnd_image.height);
	}
	
	function setTransferImage(data_url) {
		if (!dnd_image) {
			dnd_image = new Image();
			dnd_image.onload = updateTransferImage;
		}
		dnd_image.src = data_url;
		updateTransferImage();
	}
	
	function getXPathModeForEvent(evt) {
		switch (getKeyMask(evt)) {
			case os_modifier | ALT_KEY:
				return 1;
			case os_modifier | SHIFT_KEY:
				return 2;
			case os_modifier | SHIFT_KEY | ALT_KEY:
				return 3;
		}
		
		return 0;
	}
	
	/**
	 * Returns transfer data for node name (<code>drag_elem</code>)
	 * @param {Event} evt
	 * @return {String}
	 */
	function getTransferForNodeName(evt) {
		var q = getAttrQuote();
		
		if (!use_cycle_mode)
			xpath_mode = getXPathModeForEvent(evt);
			
		xpath_mode %= 3;
		
		switch (xpath_mode) {
			case 0: // name only
				return source_node.nodeName;
			case 1: // name and attr names
				var attrs = _.map(xv_utils.filterValidAttributes(source_node), function(n) {
					return '@' + n.name;
				});
				
				return source_node.nodeName + (attrs.length ? '[' + attrs.join(' and ') + ']' : '');
			case 2: // name and attr names and values
			case 3:
				var attrs = _.map(xv_utils.filterValidAttributes(source_node), function(n) {
					return '@' + n.name + ' = ' + q + escapeQuote(n.value, q) + q;
				});
				
				return source_node.nodeName + (attrs.length ? '[' + attrs.join(' and ') + ']' : '');
		}
		
		return null;
	}
	
	/**
	 * Returns transfer data for node name (<code>drag_elem</code>)<br>
	 * @param {Event} evt
	 * @return {String}
	 */
	function getTransferForAttrName(evt) {
		var name = drag_elem.textContent,
			q = getAttrQuote(),
			value = '';
			
		if (!use_cycle_mode)
			xpath_mode = getXPathModeForEvent(evt);
			
		xpath_mode %= 4;
			
		var getValue = function() {
			var value = _.detect(xv_utils.filterValidAttributes(source_node), function(n) {
				return n.name == name;
			});
			
			return value ? value.value : null;
		};
			
		switch (xpath_mode) {
			case 0: // name only
				return '@' + name;
			case 1: // name with value
				return '@' + name + ' = ' + q + getValue() + q;
			case 2: // node name with attribute name.
				return source_node.nodeName + '[@' + name + ']';
			case 3: // node name with attribute name.
				return source_node.nodeName + '[@' + name + ' = ' + q + escapeQuote(getValue(), q) + q + ']';
		}
		
		return null;
	}
	
	function updateTransferState(evt) {
		var state = null,
			elem = drag_elem || evt.target;
			
		if (xv_dom.hasClass(elem, 'xv-tag-name'))
			state = getTransferForNodeName(evt);
		else if (xv_dom.hasClass(elem, 'xv-attr-name'))
			state = getTransferForAttrName(evt);
			
		xv_signals.dndMessageChanged.dispatch(state);
			
		if (state !== null) {
			
			xv_dnd_feedback.draw(state, setTransferImage);
//			drawFeedback(state);
			
			if (is_dragging) {
				data_transfer.setData('text/plain', state);
				updateTransferImage();
			} else {
				xv_dom.removeClass(dnd_tooltip, 'xv-dnd-tooltip-hidden');
				xv_dom.setText(dnd_tooltip, state);
			}
		} else {
			xv_dom.addClass(dnd_tooltip, 'xv-dnd-tooltip-hidden');
		}
	}
	
	function attachTooltip(evt) {
		updateTransferState(evt);
		drag_elem.parentNode.insertBefore(dnd_tooltip, drag_elem);
	}
	
	function detachTooltip() {
		xv_dom.removeElement(dnd_tooltip);
	}
	
	function isHoverElement(elem) {
		return xv_dom.hasClass(elem, 'xv-tag-name') || xv_dom.hasClass(elem, 'xv-attr-name');
	}
	
	/**
	 * Make element draggable
	 * @param {Element} elem
	 */
	function makeDraggable(elem) {
		elem.draggable = true;
		elem.setAttribute('draggable', 'true');
	}
	
	/**
	 * Make element normal (undraggable)
	 * @param {Element} elem
	 */
	function makeNormal(elem) {
		elem.draggable = false;
		elem.setAttribute('draggable', 'false');
	}
	
	function enterDndMode(evt) {
		if (drag_elem)
			makeDraggable(drag_elem);
		
		if (!is_drag_mode) {
			is_drag_mode = true;
			xv_signals.dndModeEntered.dispatch(drag_elem, evt);
		}
		
		xpath_mode = 0;
	}
	
	function exitDndMode() {
		if (drag_elem)
			makeNormal(drag_elem);
			
		is_dragging = false;
		
		if (is_drag_mode) {
			is_drag_mode = false;
			xv_signals.dndModeQuit.dispatch();
		}
		xpath_mode = 0;
	}
	
	xv_signals.dndModeEntered.add(function(elem, evt) {
		attachTooltip(evt);
	});
	
	xv_signals.dndModeQuit.add(function(evt) {
		detachTooltip();
	});
	
	// init module
	xv_signals.documentProcessed.addOnce(function() {
		dnd_tooltip = xv_dom.fromHTML('<span class="xv-dnd-tooltip"></span>');
		
		use_cycle_mode = xv_settings.getValue('dnd.cycle_mode', true);
		
		var delegate_items = 'xv-tag-name,xv-attr-name';
		xv_dom.addEvent(document, 'mouseover', function(/* Event */ evt) {
			if (isHoverElement(evt.target)) {
				drag_elem = evt.target;
				source_node = xv_renderer.getOriginalNode(xv_dom.bubbleSearch(drag_elem, 'xv-node'));
				if (is_mac ? evt.metaKey : evt.ctrlKey) {
					enterDndMode(evt);
				}
			}
		});
		
		xv_dom.addEvent(document, 'mouseout', function(/* Event */ evt) {
			if (isHoverElement(evt.target)) {
				exitDndMode();
				drag_elem = null;
			}
		});
		
		xv_dom.addEvent(document, 'dragstart', function(/* Event */ evt) {
			is_dragging = true;
			
			data_transfer = evt.dataTransfer;
			data_transfer.effectAllowed = 'copy';
			updateTransferState(evt);
			detachTooltip();
		});
		
		xv_dom.addEvent(document, 'dragend', function(/* Event */ evt) {
			exitDndMode();
		});
		
		
		xv_dom.addEvent(document, 'keydown', function(/* Event */ evt) {
			if (evt.keyCode == os_key && drag_elem) {
				enterDndMode(evt);
			}
			
			if (drag_elem) {
				if (!use_cycle_mode && isModifierKeyTrigger(evt)) {
					updateTransferState(evt);
				} else if (use_cycle_mode && evt.keyCode == 16) {
					xpath_mode++;
					updateTransferState(evt);
				}
			}
		});
		
		xv_dom.addEvent(document, 'keyup', function(/* Event */ evt) {
			if (evt.keyCode == os_key && drag_elem) {
				exitDndMode();
			}
				
			if (!use_cycle_mode && isModifierKeyTrigger(evt) && drag_elem) {
				updateTransferState(evt);
			}
		});
	});
})();

/**
 * Generates outline (simplifed structure) of XML document or node
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "renderer.js"
 * @include "signals.js"
 */
var xv_outline = (function(){
	
	function processText(text) {
		return xv_utils.escapeHTML(xv_utils.trim(text));
	}
	
	/**
	 * Test if node can be collapsed
	 * @param {Element} node
	 * @return {Boolean}
	 */
	function canBeCollapsed(node) {
		var child = node.childNodes;
		return node.childNodes.length && (child.length > 1 || node.firstChild.nodeType != 3);
	}
	
	/**
	 * Stylize DOM node
	 * @param {HTMLElement} node Node to render
	 * @param {Number} depth Depth level of child elements should be rendered
	 * @return {String}
	 */
	function stylize(node, depth) {
		if (node) {
			switch (node.nodeType) {
				case 1: // element
					return stylizeElement(node, depth);
				case 4: // cdata
					return stylizeCDATA(node, depth);
				case 7: // processing instruction
					return stylizeProcessingInstruction(node, depth);
				case 8: // comment
					return stylizeComment(node, depth);
				case 9: // document
					return _.map(node.childNodes, function(n) {
						return stylize(n, depth);
					}).join('');
			}
		}
		
		return '';
	}
	
	/**
	 * Stylize element node as tokenized HTML fragment
	 * @param {HTMLElement} node Node to render
	 * @param {Object} counter Counter data
	 * @param {Number} depth Element depth
	 * @return {String} 
	 */
	function stylizeElement(node, depth) {
		var attrs = _.map(xv_utils.filterValidAttributes(node), function(n) {
			return n.name + ': ' + processText(n.value);
		});
		
		var result = [],
			add_class = '',
			skip_children = false;
			
		var has_children = !!_.detect(node.childNodes, function(n){
			var nt = n.nodeType;
			return nt == 1 || nt == 7 || nt == 8;
		});
			
		if (!has_children)
			add_class += ' xv-outline-node-empty';
			
		if (!depth && canBeCollapsed(node)) {
			skip_children = true;
			add_class += ' xv-collapsed xv-has-unprocessed';
		}
			
		result.push('<span class="xv-node xv-outline-node xv-outline-tag' + add_class + '" data-xv-id="' + xv_renderer.getId(node) + '">');
		result.push('<span class="xv-tag-switcher"></span>');
		result.push('<span class="xv-outline-node-inner">');
		result.push('<span class="xv-outline-item xv-outline-tag-name">' + node.nodeName +'</span>');
		if (attrs && attrs.length)
			result.push(' ' + attrs.join(', '));
			
		result.push('</span>');
			
		if (node.childNodes.length) {
			result.push('<span class="xv-outline-tag-children">');
			
			if (!skip_children) {
				_.each(node.childNodes, function(n) {
					result.push(stylize(n, depth - 1));
				});
			}
			
			result.push('</span>');
		}
		
		result.push('</span>');
		
		return result.join('');
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeProcessingInstruction(node) {
		return '<span class="xv-node xv-outline-node xv-outline-pi" data-xv-id="' + xv_renderer.getId(node) + '">' +
				'<span class="xv-outline-node-inner">' +
				'<span class="xv-outline-item xv-outline-pi-name">' + node.nodeName+ '</span>' +
				'</span>' +
				'</span>';
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeComment(node) {
		var v = _.detect(processText(node.nodeValue || '').split(/\r?\n/), function(n) {return !!n;}) || '';
		if (v.length > 50)
			v = v.substring(0, 50) + '...';
			
		return '<span class="xv-node xv-outline-node xv-outline-comment" ' +
				'data-xv-id="' + xv_renderer.getId(node) + '">' +
				'<span class="xv-outline-node-inner">' + v + '</span>' +
				'</span>';
	}
	
	/**
	 * @param {Element} node
	 * @return {String} 
	 */
	function stylizeCDATA(node) {
		var v = _.detect(processText(node.nodeValue || '').split(/\r?\n/), function(n) {return !!n;}) || '';
		if (v.length > 50)
			v = v.substring(0, 50) + '...';
			
		return '<span class="xv-node xv-outline-node xv-outline-cdata" ' +
				'data-xv-id="' + xv_renderer.getId(node) + '">' +
				'<span class="xv-outline-node-inner">' +
				'<span class="xv-outline-item xv-outline-cdata-name">CDATA</span> ' +
				v +
				'</span>' +
				'</span>';
	}
	
	return {
		/**
		 * Render XML fragment as styled HTML tree
		 * @param {HTMLElement} elem
		 * @param {Number} depth Depth level of child elements should be rendered
		 * (pass <code>-1</code> to render full tree)
		 * @return {DocumentFragment}
		 */
		render: function(elem, depth) {
			if (typeof depth == 'undefined')
				depth = -1;
				
			if (!elem) return document.createDocumentFragment();
			return xv_dom.fromHTML(stylize(elem, depth));
		}
	};
})();

/**
 * UI for global outline
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "utils.js"
 * @include "dom.js"
 * @include "outline.js"
 * @include "renderer.js"
 * @include "settings.js"
 */
(function(){
	/** @type {Element} Outline pane */
	var pane,
		/** @type {Element} XML source pane */
		source_pane,
		/** @type {Element} */
		pane_content,
		/** @type {Element} */
		resize_handler,
		
		/** Cache for rendered nodes */
		rendered_nodes = {},
		
		selected_elem,
		
		last_width = 0,
		
		ss,
		ss_inserted = false;
		
	function resizeOutline(width) {
		width = Math.round(Math.max(120, Math.min(window.innerWidth * 0.5, width)));
		last_width = width;
		xv_settings.setValue('outline.width', width);
		if (pane.style) {
			// normal browser – just update style
			xv_dom.setCSS(pane, {width: width});
			xv_dom.setCSS(source_pane, {right: width});
		} else {
			// Freakin' crazy way to update XML element style:
			// modify document’s stylesheet with new rules.
			// Don‘t do this on your web-sites!
			if (!ss) ss = locateStylesheet();
			if (ss) {
				if (ss_inserted) {
					// remove first two rules
					ss.removeRule(0);
					ss.removeRule(0);
				}
				
				// insert new rules
				ss.insertRule('div[class~=xv-source-pane]{right:' + width + 'px !important}');
				ss.insertRule('div[class~=xv-outline]{width:' + width + 'px !important}');
				ss_inserted = true;
			}
		}
	}
	
	/**
	 * Highlight element
	 * @param {jQuery} element
	 */
	function highlightElement(elem, no_signal) {
		if (selected_elem && selected_elem != elem)
			xv_dom.removeClass(selected_elem, 'xv-outline-node-selected');
			
		selected_elem = elem;
		xv_dom.toggleClass(selected_elem, 'xv-outline-node-selected');
		
		if (!no_signal)
			xv_signals.nodeFocused.dispatch(xv_renderer.getOriginalNode(selected_elem), 'outline');
	}
	
	/**
	 * @return {CSSStyleSheet}
	 */
	function locateStylesheet() {
		var stylesheet = _.detect(document.childNodes, function(n){
			return 'sheet' in n;
		});
		
		return stylesheet ? stylesheet.sheet : null;
	}
	
	function attachResizeEvents() {
		if (resize_handler) {
			var is_dragging = false,
				mouse_x,
				prev_width;
				
			xv_dom.addEvent(resize_handler, 'mousedown', function(evt) {
				is_dragging = true;
				mouse_x = evt.pageX;
				prev_width = pane.offsetWidth;
				evt.preventDefault();
			});
			
			xv_dom.addEvent(document, 'mouseup', function(evt) {
				is_dragging = false;
			});
			
			xv_dom.addEvent(document, 'mousemove', function(evt) {
				if (is_dragging) {
					var dx = evt.pageX - mouse_x;
					resizeOutline(prev_width - dx);
				}
			});
		}
	}
	
	/**
	 * Check if element contains unprocessed child nodes
	 * @param {Element} elem
	 * @return {Boolean}
	 */
	function hasUnprocessedChildren(elem) {
		return xv_dom.hasClass(elem, 'xv-has-unprocessed');
	}
	
	/**
	 * Expand node
	 * @param {Element|jQuery} elem Node to expand
	 * @param {Boolean} is_recursive Recursively expand all child nodes
	 */
	function expandNode(elem, is_recursive) {
		if (!xv_dom.hasClass(elem, 'xv-collapsed')) // additional check for recursive calls
			return;
		
		// check if current node has unprocessed children
		xv_dom.removeClass(elem, 'xv-collapsed');
		if (hasUnprocessedChildren(elem)) {
			// render all first-level child nodes
			var orig_elem = xv_renderer.getOriginalNode(elem),
				/** @type {Element} */
				cur_child = _.detect(elem.childNodes, function(n) {
					return n.nodeType == 1 && xv_dom.hasClass(n, 'xv-outline-tag-children');
				});
				
			var f = document.createDocumentFragment();
			_.each(orig_elem.childNodes, function(n) {
				var r = xv_outline.render(n, 0);
				if (r) f.appendChild(r);
			});
			
			xv_dom.empty(cur_child);
			cur_child.appendChild(f);
			xv_dom.removeClass(elem, 'xv-has-unprocessed');
		}
		
		if (is_recursive) {
			_.each(xv_dom.getByClass('xv-collapsed', elem), function(n) {
				expandNode(n, is_recursive);
			});
		}
	}
	
	/**
	 * Collapse expanded node
	 * @param {Element|jQuery} elem Node to collapse
	 * @param {Boolean} is_recursive Recursively collapse all child nodes
	 */
	function collapseNode(elem, is_recursive) {
		if (xv_dom.hasClass(elem, 'xv-collapsed')) // additional check for recursive calls
			return;
			
		xv_dom.addClass(elem, 'xv-collapsed');
		
		if (is_recursive) {
			_.each(xv_dom.getByClass('xv-node', elem), function(n) {
				if (!xv_dom.hasClass(n, 'xv-collapsed') && !xv_dom.hasClass(n, 'xv-one-line'))
					collapseNode(n);
			});
		}
	}
	
	/**
	 * Returns rendered node for original one
	 * @param {Element} orig_node
	 * @return {Element} Pointer to rendered node
	 */
	function getRenderedNode(orig_node) {
		var id = xv_renderer.getId(orig_node);
		
		if (!(id in rendered_nodes)) {
			_.detect(xv_dom.getByClass('xv-node', pane), function(n) {
				if (xv_renderer.getId(n) == id) {
					rendered_nodes[id] = n;
					return true;
				}
			});
		}
		
		return rendered_nodes[id];
	}
	
	function isCollapsed() {
		return xv_dom.hasClass(pane, 'xv-outline-collapsed');
	}
	
	function collapseOutline() {
		xv_dom.addClass(pane, 'xv-outline-collapsed');
		pane.style.width = '';
		xv_dom.setCSS(source_pane, {right: pane.offsetWidth});
		xv_settings.setValue('outline.collapsed', true);
	}
	
	function expandOutline() {
		xv_dom.removeClass(pane, 'xv-outline-collapsed');
		resizeOutline(last_width || pane.offsetWidth);
		xv_settings.setValue('outline.collapsed', false);
	}
	
	function toggleCollapse(evt) {
		if (evt)
			evt.stopPropagation();
			
		if (isCollapsed()) {
			expandOutline();
		} else {
			collapseOutline();
		}
	}
	
	xv_signals.nodeFocused.add(function(/* Element */ node, /* String */ source) {
		// handle focused node
		if (source != 'outline') {
			// create list of nodes to expand
			var node_list = [], n = node;
			do {
				if (n.nodeType == 1)
					node_list.push(n);
			} while (n = n.parentNode);
			
			// expand each node, from top to bottom
			node_list.reverse();
			_.each(node_list, function(n) {
				expandNode(getRenderedNode(n));
			});
			
			var cur_node = getRenderedNode(node);
			highlightElement(cur_node, true);
			if ('scrollIntoViewIfNeeded' in cur_node)
				cur_node.scrollIntoViewIfNeeded();
			else
				cur_node.scrollIntoView();
		}
	});
	
	// listen to signals
	xv_signals.documentProcessed.addOnce(function() {
		source_pane = xv_dom.getOneByClass('xv-source-pane');
		
		if (!pane) {
			pane = xv_dom.fromHTML('<div class="xv-outline">' +
				'<div class="xv-outline-wrap">' +
				'<h2 class="xv-outline-header">Outline</h2>' +
				'<span class="xv-outline-close">×</span>' +
				'<div class="xv-outline-inner"></div>' +
				'<div class="xv-outline-rs-handler"></div>' +
				'</div></div>');
					
			source_pane.parentNode.appendChild(pane);
			last_width = xv_settings.getValue('outline.width', 300);
			if (xv_settings.getValue('outline.collapsed', false)) {
				collapseOutline();
			} else {
				setTimeout(function() {
					resizeOutline(last_width);
				});
			}
		}
		
		pane_content = xv_dom.getOneByClass('xv-outline-inner', pane);
		resize_handler = xv_dom.getOneByClass('xv-outline-rs-handler', pane);
		
		xv_dom.addEvent(xv_dom.getOneByClass('xv-outline-close', pane), 'click', toggleCollapse);
		xv_dom.addEvent(pane, 'click', function(evt) {
			if (isCollapsed())
				toggleCollapse();
		});
		
		xv_dom.addEvent(pane, 'click', function(/* Event */ evt) {
			if (xv_dom.hasClass(evt.target, 'xv-tag-switcher')) {
				var elem = xv_dom.bubbleSearch(evt.target, 'xv-node');
				if (xv_dom.hasClass(elem, 'xv-collapsed')) {
					expandNode(elem, !!evt.altKey);
				} else {
					collapseNode(elem, !!evt.altKey);
				}
			} else {
				var elem = xv_dom.bubbleSearch(evt.target, 'xv-outline-node');
				if (elem) {
					highlightElement(elem);
				}
			}
			
//			if (xv_dom.hasClass(evt.target, 'xv-tag-switcher'))
//				return;
				
		});
	});
	
	xv_signals.documentProcessed.add(function(render_tree, original_tree) {
		if (pane) {
			xv_dom.empty(pane_content);
			pane_content.appendChild(xv_outline.render(original_tree, xv_settings.getValue('init_depth', 2)));
		}
		
		attachResizeEvents();
		
	});
	
})();

/**
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "renderer.js"
 * @include "dom.js"
 * @include "search.js"
 * @include "signals.js"
 * @include "settings.js"
 */
var xv_controller = (function(){
	/** @type {Element} Currently selected element */
	var selected_elem,
		/** Cache for rendered nodes */
		rendered_nodes = {},
		
		/** @type {Element} Pane for rendered nodes */
		pane;
	
	/**
	 * Highlight element
	 * @param {jQuery} element
	 */
	function highlightElement(elem, no_signal) {
		if (selected_elem && selected_elem != elem)
			xv_dom.removeClass(selected_elem, 'selected');
			
		selected_elem = elem;
		xv_dom.toggleClass(selected_elem, 'selected');
		if (!no_signal)
			xv_signals.nodeFocused.dispatch(xv_renderer.getOriginalNode(selected_elem), 'main');
	}
	
	/**
	 * Check if element contains unprocessed child nodes
	 * @param {Element} elem
	 * @return {Boolean}
	 */
	function hasUnprocessedChildren(elem) {
		return xv_dom.hasClass(elem, 'xv-has-unprocessed');
	}
	
	/**
	 * Expand node
	 * @param {Element|jQuery} elem Node to expand
	 * @param {Boolean} is_recursive Recursively expand all child nodes
	 */
	function expandNode(elem, is_recursive) {
		if (!xv_dom.hasClass(elem, 'xv-collapsed')) // additional check for recursive calls
			return;
		
		// check if current node has unprocessed children
		xv_dom.removeClass(elem, 'xv-collapsed');
		if (hasUnprocessedChildren(elem)) {
			// render all first-level child nodes
			var orig_elem = xv_renderer.getOriginalNode(elem),
				/** @type {Element} */
				cur_child = _.detect(elem.childNodes, function(n) {
					return n.nodeType == 1 && xv_dom.hasClass(n, 'xv-tag-children');
				});
				
			var f = document.createDocumentFragment();
			_.each(orig_elem.childNodes, function(n) {
				var r = xv_renderer.render(n, 0);
				if (r) f.appendChild(r);
			});
			
			xv_dom.empty(cur_child);
			cur_child.appendChild(f);
			xv_dom.removeClass(elem, 'xv-has-unprocessed');
		}
		
		if (is_recursive) {
			_.each(xv_dom.getByClass('xv-collapsed', elem), function(n) {
				expandNode(n, is_recursive);
			});
		}
	}
	
	/**
	 * Collapse expanded node
	 * @param {Element|jQuery} elem Node to collapse
	 * @param {Boolean} is_recursive Recursively collapse all child nodes
	 */
	function collapseNode(elem, is_recursive) {
		if (xv_dom.hasClass(elem, 'xv-collapsed')) // additional check for recursive calls
			return;
			
		xv_dom.addClass(elem, 'xv-collapsed');
		
		if (is_recursive) {
			_.each(xv_dom.getByClass('xv-node', elem), function(n) {
				if (!xv_dom.hasClass(n, 'xv-collapsed') && !xv_dom.hasClass(n, 'xv-one-line'))
					collapseNode(n);
			});
		}
	}
	
	/**
	 * Returns rendered node for original one
	 * @param {Element} orig_node
	 * @return {Element} Pointer to rendered node
	 */
	function getRenderedNode(orig_node) {
		var id = xv_renderer.getId(orig_node);
		
		if (!(id in rendered_nodes)) {
			_.detect(xv_dom.getByClass('xv-node', pane), function(n) {
				if (xv_renderer.getId( xv_renderer.getOriginalNode(n) ) == id) {
					rendered_nodes[id] = n;
					return true;
				}
			});
		}
		
		return rendered_nodes[id];
	}
	
	// listen to signals
	xv_signals.documentProcessed.addOnce(function() {
		xv_dom.addEvent(document, 'click', function(/* Event */ evt) {
			var elem = xv_dom.bubbleSearch(evt.target, 'xv-tag-open,xv-tag-close,xv-comment-start');
			if (elem) {
				elem = xv_dom.bubbleSearch(elem, 'xv-node');
				if (xv_dom.hasClass(elem, 'xv-collapsed')) {
					expandNode(elem, !!evt.altKey);
				} else {
					highlightElement(elem);
				}
			}
		});
		
		xv_dom.addEvent(pane, 'click', function(/* Event */ evt) {
			if (xv_dom.hasClass(evt.target, 'xv-tag-switcher')) {
				var elem = xv_dom.bubbleSearch(evt.target, 'xv-node');
				if (xv_dom.hasClass(elem, 'xv-collapsed')) {
					expandNode(elem, !!evt.altKey);
				} else {
					collapseNode(elem, !!evt.altKey);
				}
			}
		});
		
		xv_dom.addEvent(pane, 'dblclick', function(/* Event */ evt) {
			var target = xv_dom.bubbleSearch(evt.target, 'xv-tag-open,xv-tag-close,xv-comment-start,xv-comment-end');
			if (target && !xv_dom.hasClass(target.parentNode, 'xv-one-line')) {
				collapseNode(target.parentNode);
				evt.preventDefault();
			}
		});
	});
		
	xv_signals.nodeFocused.add(function(/* Element */ node, /* String */ source) {
		// handle focused node
		if (source != 'main' && node) {
			// create list of nodes to expand
			var node_list = [], n = node;
			do {
				if (n.nodeType == 1)
					node_list.push(n);
			} while (n = n.parentNode);
			
			// expand each node, from top to bottom
			node_list.reverse();
			_.each(node_list, function(n) {
				expandNode(getRenderedNode(n));
			});
			
			var cur_node = getRenderedNode(node);
//			highlightElement(cur_node, true);
			if ('scrollIntoViewIfNeeded' in cur_node)
				cur_node.scrollIntoViewIfNeeded();
			else
				cur_node.scrollIntoView();
		}
	});
	
	
	
	return {
		/**
		 * Process XML/JSON document
		 * @param {Document|Object} data 
		 */
		process: function(data) {
			var root_elem = document.body || document.documentElement; //edit
			if(root_elem){
				var a=document.getElementById('xv-error');
				if(a) a.parentNode.removeChild(a);
				xv_dom.removeClass(root_elem, 'xv-error-state');
			}

			if (typeof data == 'string') {
				try {
					data = xv_utils.toXml(data);
				} catch(e) {
					var error_msg = xv_dom.fromHTML('<div id="xv-error" class="xv-error">' + e.toString() + '</div>');
					var root_elem = document.body || document.documentElement;
					
					root_elem.appendChild(error_msg);
					xv_dom.addClass(root_elem, 'xv-error-state');
					data = null;
				}
			}
			
			if (data) {
				var tree = xv_renderer.render(data, xv_settings.getValue('init_depth', 2));
				
				if (!pane)
					pane = xv_dom.getOneByClass('xv-source-pane-inner');
					
				rendered_nodes = {};
				
				xv_dom.empty(pane);
				pane.appendChild(tree);
				
				xv_signals.documentProcessed.dispatch(tree, data);
				return tree;
			}
		},
		
		expandNode: expandNode,
		collapseNode: collapseNode,
		getRenderedNode: getRenderedNode
	};
})();

/**
 * Provide visual feedback on selected node in source pane
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "dom.js"
 * @include "signals.js"
 * @include "controller.js"
 */
(function(){
	/** @type {Element} Reference element for selection notifiers */
	var notifier;
	
	/**
	 * Create selection notifier of rendered element
	 * @param {Element} elem
	 */
	function createSelectionNotifier(elem) {
		if (!notifier)
			notifier = xv_dom.fromHTML('<span class="xv-selection-notifier"></span>');
			
		var _notifier = notifier.cloneNode(true);
		
		// find target element
		var target = elem;
		if (xv_dom.hasClass(elem, 'xv-tag')) {
			target = _.detect(elem.childNodes, function(n) {
				return n.nodeType == 1 && xv_dom.hasClass(n, 'xv-tag-open');
			});
		}
		
		if (target) {
			xv_dom.setCSS(_notifier, {
				left: target.offsetLeft,
				top: target.offsetTop,
				width: target.offsetWidth,
				height: target.offsetHeight
			});
			
			target.parentNode.insertBefore(_notifier, target);
			
			//fallback for browsers that doesn‘t support CSS animations
			setTimeout(function() {
				xv_dom.removeElement(_notifier);
			}, 1500);
		}
	}
	
	xv_signals.documentProcessed.addOnce(function() {
		xv_dom.addEvent(document, 'webkitAnimationEnd mozAnimationEnd', function(evt) {
			if (xv_dom.hasClass(evt.target, 'xv-selection-notifier'))
				xv_dom.removeElement(evt.target);
		});
	});
	
	xv_signals.nodeFocused.add(function(/* Element */ node, /* String */ source) {
		// handle focused node
		if (source != 'main' && node) {
			var cur_node = xv_controller.getRenderedNode(node);
			createSelectionNotifier(cur_node);
		}
	});
	
})();

/**
 * Module for copying Quick XPath values to clipboard on click where available
 * (in IDE mostly)
 */
(function(GLOBAL) {
	var is_dnd_mode = false,
		copy_text = '';
	
	xv_signals.dndModeEntered.add(function() {
		is_dnd_mode = true;
	});
	
	xv_signals.dndModeQuit.add(function() {
		is_dnd_mode = false;
	});
	
	xv_signals.dndMessageChanged.add(function(message) {
		copy_text = message;
	});
	
	xv_dom.addEvent(document, 'click', function(evt) {
		if (is_dnd_mode && copy_text && 'copyToClipboard' in GLOBAL) {
			GLOBAL.copyToClipboard(copy_text);
			evt.preventDefault();
			evt.stopPropagation();
		}
	});
})(this);

/**
 * Feedback module for drag’n’drop operations: returns a data:url-encoded image
 * of text that will be dragged
 * 
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 * 
 * @include "signals.js"
 * @include "dom.js"
 */
var xv_dnd_feedback = (function(){
	var canvas = document.createElement('canvas'),
		/** @type {CanvasRenderingContext2D} */
		ctx = canvas.getContext('2d'),
		font_size = 11,
		font = 'normal ' + font_size + 'px "Lucida Grande", sans-serif',
		padding_left = 6,
		padding_top = 4,
		bg_pattern;
		
	var bg = new Image;
	bg.onload = function() {
		bg_pattern = ctx.createPattern(bg, 'repeat');
	};
	bg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAbCAIAAAA70dJZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHdJREFUeNp0j1EOwCAIQ8Fw/3t6CGW4sg7N1kQ/6qNU7b3POd1dRFpIHqlquOZFYb3vQFqcDz4i9dbiMQnKOAwwebqGMv99mJQIy+M2LBtjgFrzW6TsMpRlRMMmrmg1/ORX3tHHKp957J//r18++2/9cj8V1iXAAFG7oYASmw8VAAAAAElFTkSuQmCC';
		
	function roundedRect(ctx, x, y, width, height, radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	}
	
	canvas.className = 'xv-drag-image';
	canvas.width = canvas.height = 1;
	(document.body || document.documentElement).appendChild(canvas);
	
	return {
		/**
		 * Draw feedback image with <code>text</code> in it
		 * @param {String} text
		 * @param {Function} fn Callback function to be called when image is 
		 * generated. Used because of async nature of some extensions
		 * @return {String} data:url of image
		 */
		draw: function(text, fn) {
			ctx.font = font;
		
			var tx = ctx.measureText(text),
				width = padding_left * 2 + tx.width,
				height = font_size + padding_top * 2;
			
			canvas.width = width + 2;
			canvas.height = height + 2;
			
			ctx.save();
			
			ctx.globalAlpha = 0.8;
			
			ctx.fillStyle = bg_pattern;
			roundedRect(ctx, 0, 0, width, height, 5);
			ctx.fill();
			
			// inner stroke
			roundedRect(ctx, 1, 1, width - 1, height - 1, 5);
			ctx.strokeStyle = '#f1f1f1';
			ctx.lineWidth = 2;
			ctx.stroke();
			
			// outer stroke
			roundedRect(ctx, 0.5, 0.5, width, height, 5);
			ctx.strokeStyle = '#bdbdbd';
			ctx.lineWidth = 1;
			ctx.stroke();
			
			
			ctx.fillStyle = '#000';
			ctx.textBaseline = 'middle';
			ctx.font = font;
			ctx.fillText(text, padding_left, Math.round(height / 2));
			
			ctx.restore();
			
			var url = canvas.toDataURL();
			if (fn)
				fn(url);
			
			return url;
		}
	};
})();

