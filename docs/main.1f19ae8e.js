// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],"node_modules/regenerator-runtime/runtime-module.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":"node_modules/regenerator-runtime/runtime.js"}],"node_modules/@babel/runtime/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"node_modules/regenerator-runtime/runtime-module.js"}],"node_modules/@babel/runtime/helpers/asyncToGenerator.js":[function(require,module,exports) {
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],"article-parser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArticle = parseArticle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//definire funzioni da esportare. creo un modulo con certe funzioni. un modulo è un contenitore di cose (funzioni e/o variabili
//questo modulo farà -fetch documento: prendere il doc e -parsing che significa prendere html e trasformarlo in dom
function parseArticle(_x) {
  return _parseArticle.apply(this, arguments);
}

function _parseArticle() {
  _parseArticle = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(article) {
    var articleResponse, articleHtml, parser, articleDocument, body, articleURL, pageURL, articlePath;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(article);

          case 2:
            articleResponse = _context.sent;
            _context.next = 5;
            return articleResponse.text();

          case 5:
            articleHtml = _context.sent;
            //trasformato il text in dom
            parser = new DOMParser();
            articleDocument = parser.parseFromString(articleHtml, "text/html"); //preso solo body

            body = articleDocument.querySelector("body"); //create url from current article

            articleURL = new URL(article, window.location.href);
            pageURL = new URL(window.location.href); //get article path (without file name)

            articlePath = articleURL.pathname.substring(0, articleURL.pathname.lastIndexOf("/"));
            body.querySelectorAll("img").forEach(function (image) {
              //Edit image src by appending the current article path
              var url = new URL(image.src);
              var imageSplitUrl = url.pathname.split("/");
              var imageName = imageSplitUrl[imageSplitUrl.length - 1];
              image.src = url.origin + articlePath + "/" + imageName;
            });
            return _context.abrupt("return", {
              body: body,
              title: articleDocument.querySelector("title").text
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseArticle.apply(this, arguments);
} //this module will call this function and put in the general dom the one that we just generated with the previous module
},{"@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js"}],"addArticle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSpecialArticle = addSpecialArticle;
exports.addArticle = addArticle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _articleParser = require("./article-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addSpecialArticle(_x, _x2) {
  return _addSpecialArticle.apply(this, arguments);
} //add articles to dom


function _addSpecialArticle() {
  _addSpecialArticle = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(leftArticleUrl, rightArticleUrl) {
    var leftArticle, rightArticle, elementsToDelete, gridContainer, locationGridContainer, rightReader, leftReader, location, leftContainer, leftNodes, rightContainer, rightNodes, styleClass;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _articleParser.parseArticle)(leftArticleUrl);

          case 2:
            leftArticle = _context.sent;
            _context.next = 5;
            return (0, _articleParser.parseArticle)(rightArticleUrl);

          case 5:
            rightArticle = _context.sent;
            //before adding the article, clear the page from jumbotron etc (they get hidden) to show only the reader
<<<<<<< HEAD
            elementsToDelete = document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection");
=======
            elementsToDelete = document.querySelectorAll(".jumbo, .tutorialPageSection, .aboutPageSection, .documentationPageSection, .disclaimerPageSection");
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452
            elementsToDelete.forEach(function (node) {
              node.classList.add("hidden");
            });
            document.querySelector(".reader").className = document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g, ''); //clear the reader from previous text, add another text in the middle page, remove link btn in footer

            document.querySelector(".reader").innerHTML = "";
<<<<<<< HEAD
            document.querySelector(".changeTheme").classList.add("hidden"); // change class to reader to avoid problems since we will create other readers
=======
            document.querySelector(".changeTheme").classList.add("hidden"); // create a container for the articles
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452

            gridContainer = document.createElement("section");
            gridContainer.className = "grid-container";
            locationGridContainer = document.querySelector(".reader");
            locationGridContainer.insertAdjacentElement("afterbegin", gridContainer); //create 2 containers for the documents

            rightReader = document.createElement("section");
            leftReader = document.createElement("section");
            rightReader.className = "reader right";
            leftReader.className = "reader left";
            location = document.querySelector("section.grid-container");
            location.insertAdjacentElement("afterbegin", rightReader);
            location.insertAdjacentElement("afterbegin", leftReader);
            leftContainer = document.querySelector("section.reader.left");
            leftNodes = Array.from(leftArticle.body.childNodes);
            leftNodes.forEach(function (node) {
              leftContainer.appendChild(node);
            });
            rightContainer = document.querySelector("section.reader.right");
            rightNodes = Array.from(rightArticle.body.childNodes);
            rightNodes.forEach(function (node) {
              rightContainer.appendChild(node);
            }); // get style class from previously executed function

            styleClass = document.querySelector(".grid-container").classList[0];
            console.log(styleClass);
            document.querySelector("reader left").classList.add(styleClass);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addSpecialArticle.apply(this, arguments);
}

function addArticle(_x3) {
  return _addArticle.apply(this, arguments);
}

function _addArticle() {
  _addArticle = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(articleUrl) {
    var article, elementsToDelete, gridReader, gridNodes, container, nodes;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _articleParser.parseArticle)(articleUrl);

          case 2:
            article = _context2.sent;
            //before adding the article, clear the page from jumbotron etc (they get hidden) to show only the reader
<<<<<<< HEAD
            elementsToDelete = document.querySelectorAll(".jumbo, .tutorial, .aboutPageSection, .documentationPageSection, .disclaimerPageSection");
=======
            elementsToDelete = document.querySelectorAll(".jumbo, .tutorialPageSection, .aboutPageSection, .documentationPageSection, .disclaimerPageSection");
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452
            elementsToDelete.forEach(function (node) {
              node.classList.add("hidden");
            });
            document.querySelector(".reader").className = document.querySelector(".reader").className.replace(/(?:^|\s)hidden(?!\S)/g, '');
            gridReader = document.querySelector("section.grid-container");

            if (document.body.contains(gridReader)) {
              gridReader.classList.add("reader");
              gridReader.classList.remove("grid-container");
              gridNodes = Array.from(gridReader.childNodes);
              gridNodes.forEach(function (node) {
                gridReader.removeChild(node);
              });
            }

            document.querySelector(".reader").innerHTML = "";
            document.querySelector(".changeTheme").classList.add("hidden"); //actually insert the new document

            container = document.querySelector(".reader");
            nodes = Array.from(article.body.childNodes);
            nodes.forEach(function (node) {
              container.appendChild(node);
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _addArticle.apply(this, arguments);
}
},{"@babel/runtime/regenerator":"node_modules/@babel/runtime/regenerator/index.js","@babel/runtime/helpers/asyncToGenerator":"node_modules/@babel/runtime/helpers/asyncToGenerator.js","./article-parser":"article-parser.js"}],"articlesSelectionButtons.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.articlesSidebarSelection = articlesSidebarSelection;
exports.specialArticleSidebarSelection = specialArticleSidebarSelection;

var _articleParser = require("./article-parser");

var _addArticle = require("./addArticle.js");

//article dictionary with title=key and url=value
<<<<<<< HEAD
var articlesDict = {
  "Japan's Prisons Are a Haven for Elderly Women": "./articles/Bloomberg/ShihoFukada.html",
  "As Goes the South, so Goes the Nation": "./articles/Harpers/ImaniPerry.html",
  "Jerry And Marge Go Large": "./articles/HuffingtonPost/JasonFagone.html",
  "How Anna Delvey Tricked New York’s Party People": "./articles/TheCut/JessicaPresler.html",
  "God is in the machine": "./articles/Times Literary Supplement/CarlMiller.html"
}; //dynamically creates buttons for selecting articles in the sidebar
=======
var articles = [{
  title: "Japan's Prisons Are a Haven for Elderly Women",
  url: "./articles/Bloomberg/ShihoFukada.html"
}, {
  title: "As Goes the South, so Goes the Nation",
  url: "./articles/Harpers/ImaniPerry.html"
}, {
  title: "Jerry And Marge Go Large",
  url: "./articles/HuffingtonPost/JasonFagone.html"
}, {
  title: "How Anna Delvey Tricked New York’s Party People",
  url: "./articles/TheCut/JessicaPresler.html"
}, {
  title: "God is in the machine",
  url: "./articles/Times Literary Supplement/CarlMiller.html"
}]; //dynamically creates buttons for selecting articles in the sidebar
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452

function articlesSidebarSelection() {
  articles.forEach(function (article) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.className = "close-menu-doc";
    a.appendChild(document.createTextNode(article.title));
    li.appendChild(a);
    a.addEventListener("click", function () {
      return (0, _addArticle.addArticle)(article.url);
    });
    var location = document.querySelector(".placeholder");
    location.insertAdjacentElement("afterbegin", li);
  });
} //same but for the european translated article


function specialArticleSidebarSelection(articleTitle, leftArticleUrl, rightArticleUrl) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.className = "close-menu-doc";
  a.appendChild(document.createTextNode(articleTitle));
  li.appendChild(a);
  a.addEventListener("click", function () {
    return (0, _addArticle.addSpecialArticle)(leftArticleUrl, rightArticleUrl);
  });
  var location = document.querySelector(".placeholder"); //location.insertAdjacentElement("afterbegin", a);

  location.insertAdjacentElement("afterbegin", li);
}
},{"./article-parser":"article-parser.js","./addArticle.js":"addArticle.js"}],"images/bauhaus.svg":[function(require,module,exports) {
module.exports = "/bauhaus.00287030.svg";
},{}],"images/aldus_leaf.svg":[function(require,module,exports) {
module.exports = "/aldus_leaf.72009c54.svg";
},{}],"images/sakura.svg":[function(require,module,exports) {
module.exports = "/sakura.3275ced2.svg";
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _articleParser = require("./article-parser");

var _addArticle = require("./addArticle.js");

var _articlesSelectionButtons = require("./articlesSelectionButtons");

<<<<<<< HEAD
// polyfill needed for using for loop on a dictionary

/*
* Object.prototype.forEach() polyfill
* https://gomakethings.com/looping-through-objects-with-es6/
* @author Chris Ferdinandi
* @license MIT
*/
=======
var _bauhaus = _interopRequireDefault(require("./images/bauhaus.svg"));

var _aldus_leaf = _interopRequireDefault(require("./images/aldus_leaf.svg"));

var _sakura = _interopRequireDefault(require("./images/sakura.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// polyfill needed for using for loop on a dictionary

/*
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452
if (!Object.prototype.forEach) {
  Object.defineProperty(Object.prototype, "forEach", {
    value: function value(callback, thisArg) {
      if (this == null) {
        throw new TypeError("Not an object");
      }

      thisArg = thisArg || window;

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this);
        }
      }
    }
  });
<<<<<<< HEAD
} //creation of article, buttons and links


(0, _articlesSelectionButtons.articlesSidebarSelection)();
(0, _articlesSelectionButtons.specialArticleSidebarSelection)("EUR-Lex", "./articles/EUDirective/L125-75.html", "./articles/EUDirective/EUDirectiveItalian.html"); //clean reader from previous text and show "select article" text

var styleButton = document.querySelectorAll(".doc-sel");
styleButton.forEach(function (node) {
  node.onclick = function () {
    console.log(node); //clear the reader from previous text

    document.querySelector(".reader").innerHTML = "";
    document.querySelector(".changeTheme").classList.remove("hidden");
    document.querySelector(".jumbo").classList.add("hidden"); // change class to reader to avoid problems since we will create other readers

    var reader = document.querySelector(".reader");
    reader.classList.add("grid-container");
    reader.classList.remove("reader");
    var gridReader = document.querySelector("section.grid-container");

    if (document.body.contains(gridReader)) {
      gridReader.classList.add("reader");
      gridReader.classList.remove("grid-container");
      var gridNodes = Array.from(gridReader.childNodes);
      gridNodes.forEach(function (node) {
        gridReader.removeChild(node);
      });
    }
  };
}); //selezione stili
//funzione stile 1

document.querySelector('.style-selector-first').onclick = function () {
  document.querySelector(".reader").classList.remove("rimpa");
  document.querySelector(".reader").classList.remove("third");
  document.querySelector(".reader").classList.remove("fourth");
  document.querySelector(".reader").classList.remove("fifth");
  document.querySelector(".reader").classList.remove("sixth");
  document.querySelector(".reader").classList.add("manuzio");
}; //stile 2


document.querySelector('.style-selector-second').onclick = function () {
  document.querySelector(".reader").classList.remove("manuzio");
  document.querySelector(".reader").classList.remove("third");
  document.querySelector(".reader").classList.remove("fourth");
  document.querySelector(".reader").classList.remove("fifth");
  document.querySelector(".reader").classList.remove("sixth");
  document.querySelector(".reader").classList.add("rimpa");
}; //stile 3


document.querySelector('.style-selector-third').onclick = function () {
  document.querySelector(".reader").classList.remove("manuzio");
  document.querySelector(".reader").classList.remove("second");
  document.querySelector(".reader").classList.remove("fourth");
  document.querySelector(".reader").classList.remove("fifth");
  document.querySelector(".reader").classList.remove("sixth");
  document.querySelector(".reader").classList.add("third");
};

document.querySelector('.style-selector-fourth').onclick = function () {
  document.querySelector(".reader").classList.remove("manuzio");
  document.querySelector(".reader").classList.remove("second");
  document.querySelector(".reader").classList.remove("third");
  document.querySelector(".reader").classList.remove("fifth");
  document.querySelector(".reader").classList.remove("sixth");
  document.querySelector(".reader").classList.add("fourth");
};

document.querySelector('.style-selector-fifth').onclick = function () {
  document.querySelector(".reader").classList.remove("manuzio");
  document.querySelector(".reader").classList.remove("second");
  document.querySelector(".reader").classList.remove("third");
  document.querySelector(".reader").classList.remove("fourth");
  document.querySelector(".reader").classList.remove("sixth");
  document.querySelector(".reader").classList.add("fifth");
};

document.querySelector('.style-selector-sixth').onclick = function () {
  document.querySelector(".reader").classList.remove("manuzio");
  document.querySelector(".reader").classList.remove("second");
  document.querySelector(".reader").classList.remove("third");
  document.querySelector(".reader").classList.remove("fourth");
  document.querySelector(".reader").classList.remove("fifth");
  document.querySelector(".reader").classList.add("sixth");
}; // Script lista documenti
=======
} //selezione stili
//styles dictionary with style name=key and icon=value


var styles = [{
  name: "manuzio",
  icon: _aldus_leaf.default
}, {
  name: "rimpa",
  icon: _sakura.default
}, {
  name: "third",
  icon: _bauhaus.default
}, {
  name: "fourth",
  icon: ""
}, {
  name: "fourth",
  icon: ""
}, {
  name: "fifth",
  icon: ""
}, {
  name: "sixth",
  icon: ""
}]; //dynamically creates buttons for styles in the sidebar

function stylesSidebarSelection() {
  styles.forEach(function (style) {
    //aggiungo pulsante stile
    var div = document.createElement("div");
    div.className = "opened-doc-list doc-sel";
    div.href = "#"; //agg icona stile

    var embed = document.createElement("embed");
    embed.className = "icn";
    embed.src = style.icon;
    div.appendChild(embed); // add to dom

    var location = document.querySelector("nav");
    location.insertAdjacentElement("afterbegin", div);
    div.addEventListener("click", function () {
      console.log("hello");
      styles.forEach(function (style) {
        document.querySelector(".reader").classList.remove(style.name);
      });
      document.querySelector(".reader").classList.add(style.name); //PULITURA READER

      document.querySelector(".reader").innerHTML = "";
      document.querySelector(".changeTheme").classList.remove("hidden");
      document.querySelector(".jumbo").classList.add("hidden");
    });
  });
}

stylesSidebarSelection(); //creation of article, buttons and links

(0, _articlesSelectionButtons.articlesSidebarSelection)();
(0, _articlesSelectionButtons.specialArticleSidebarSelection)("EUR-Lex", "./articles/EUDirective/L125-75.html", "./articles/EUDirective/EUDirectiveItalian.html"); // Script lista documenti
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452

/* docs selection script: quando clicchi l'elemento con classe .doc-sel ti rivela togliendo 'hidden' la nav-list, 
dove è contenuta la lista documenti. */

function docsList() {
  document.querySelector(".nav-list").className = document.querySelector(".nav-list").className.replace(/(?:^|\s)hidden(?!\S)/g, "");
}

var docsSelection = document.querySelectorAll(".doc-sel");
docsSelection.forEach(function (node) {
  node.addEventListener("click", docsList);
}); // Script chiusura lista documenti

/*stessa cosa di sopra ma nasconde i documenti quando si richiude la sidebar*/

function closeDocs() {
  var v = document.querySelector(".nav-list");
  v.classList.add("hidden");
}

var docsHidden = document.querySelector(".doc-close");
docsHidden.addEventListener("click", closeDocs);
/*stessa cosa di sopra ma si attiva quando clicchi un documento */

var docsHiddenFromMenu = document.querySelectorAll(".close-menu-doc");
docsHiddenFromMenu.forEach(function (node) {
  node.addEventListener("click", closeDocs);
});
/* sidebar drawer script */

var mainElement = document.querySelector(".container");
var openMenu = document.querySelectorAll(".opened-doc-list");
var closeMenu = document.querySelector(".close-menu");
var closeDocMenu = document.querySelectorAll(".close-menu-doc");

var toggleNavBar = function toggleNavBar() {
  mainElement.classList.toggle("opened-nav");
};

openMenu.forEach(function (node) {
  node.addEventListener("click", toggleNavBar, false);
});
closeMenu.addEventListener("click", toggleNavBar, false);
closeDocMenu.forEach(function (node) {
  node.addEventListener("click", toggleNavBar, false);
}); //add about page

document.querySelector(".aboutPageButton").onclick = function () {
  document.querySelector(".aboutPageSection").classList.remove("hidden");
  var elementsToDelete = document.querySelectorAll(".jumbo, .tutorialPageSection, .disclaimerPageSection, .reader, .documentationPageSection, .changeTheme");
  elementsToDelete.forEach(function (node) {
    node.classList.add("hidden");
  });
}; //add disclaimer page


document.querySelector(".disclaimerPageButton").onclick = function () {
  document.querySelector(".disclaimerPageSection").classList.remove("hidden");
  var elementsToDelete = document.querySelectorAll(".jumbo, .tutorialPageSection, .aboutPageSection, .reader, .documentationPageSection, .changeTheme");
  elementsToDelete.forEach(function (node) {
    node.classList.add("hidden");
  });
}; //add documentation page


document.querySelector(".documentationPageButton").onclick = function () {
  document.querySelector(".documentationPageSection").classList.remove("hidden");
  var elementsToDelete = document.querySelectorAll(".jumbo, .tutorialPageSection, .aboutPageSection, .reader, .disclaimerPageSection, .changeTheme");
  elementsToDelete.forEach(function (node) {
    node.classList.add("hidden");
  });
}; //add tutorial page


document.querySelector(".tutorialPageButton").onclick = function () {
  document.querySelector(".tutorialPageSection").classList.remove("hidden");
  var elementsToDelete = document.querySelectorAll(".jumbo, .aboutPageSection, .reader, .disclaimerPageSection, .changeTheme");
  elementsToDelete.forEach(function (node) {
    node.classList.add("hidden");
  });
}; //documentation page animation
//theme 1
//document.querySelector(".card-theme1").onclick = function () {


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} //function to add the link button with ref to the original articles urls


var articlesLinkDict = {
  "EUR-Lex": "https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1552167424995&uri=CELEX:32009L0041",
  "Japan's Prisons Are a Haven for Elderly Women": "https://www.bloomberg.com/news/features/2018-03-16/japan-s-prisons-are-a-haven-for-elderly-women",
  "As Goes the South, so Goes the Nation": "https://harpers.org/archive/2018/07/as-goes-the-south-so-goes-the-nation/",
  "Jerry And Marge Go Large": "https://highline.huffingtonpost.com/articles/en/lotto-winners/",
  "How Anna Delvey Tricked New York’s Party People": "https://www.thecut.com/2018/05/how-anna-delvey-tricked-new-york.html",
  "God is in the machine": "https://www.the-tls.co.uk/articles/public/ridiculously-complicated-algorithms/"
};

function addArticleGlobalUrl() {
  articlesLinkDict.forEach(function (item, key) {
    var articleTitle = key;
    var articleLinkUrl = item;
    var articlesNavbar = document.querySelectorAll("a.close-menu-doc");
    articlesNavbar.forEach(function (node) {
      if (node.textContent == articleTitle) {
        node.addEventListener("click", function () {
          document.querySelector("a.footerArticleLink").href = articleLinkUrl;
          document.querySelector("div.footerRights").classList.add("hidden");
          document.querySelector("a.footerArticleLink").classList.remove("hidden");
        });
      }
    });
  });
}

addArticleGlobalUrl(); //OVERLAY MENU

/* Open */

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

var openOverlay = document.querySelector(".navMenu");
openOverlay.addEventListener("click", openNav);
/* Close */

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

var closeOverlay = document.querySelector(".closebtn");
closeOverlay.addEventListener("click", closeNav);
var closeOverlayAbout = document.querySelector(".aboutPageButton");
closeOverlayAbout.addEventListener("click", closeNav);
var closeOverlayDoc = document.querySelector(".documentationPageButton");
closeOverlayDoc.addEventListener("click", closeNav);
var closeOverlayDisc = document.querySelector(".disclaimerPageButton");
closeOverlayDisc.addEventListener("click", closeNav); //
},{"./article-parser":"article-parser.js","./addArticle.js":"addArticle.js","./articlesSelectionButtons":"articlesSelectionButtons.js","./images/bauhaus.svg":"images/bauhaus.svg","./images/aldus_leaf.svg":"images/aldus_leaf.svg","./images/sakura.svg":"images/sakura.svg"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
<<<<<<< HEAD
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51434" + '/');
=======
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1329" + '/');
>>>>>>> 31d0fa3fcc74a1a392c6988ef7315b97d8f9e452

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map