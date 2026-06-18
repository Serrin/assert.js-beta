"use strict";
const VERSION = "assert.js v1.2.1";
const config = { "alwaysStrict": false };
(function (global) {
    if (!global.globalThis) {
        if (Object.defineProperty) {
            Object.defineProperty(global, "globalThis", {
                configurable: true, enumerable: false, value: global, writable: true
            });
        }
        else {
            global.globalThis = global;
        }
    }
})(typeof this === "object" ? this : Function("return this")());
if (!("isError" in Error)) {
    Error.isError = function isError(value) {
        let className = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
        return (className === "error" || className === "domexception");
    };
}
const _oIs = Object.is;
const _typeOf = (x) => x === null ? "null" : typeof x;
const _isSameType = (x, y, type) => typeof type === "string"
    ? _typeOf(x) === type && _typeOf(x) === _typeOf(y)
    : _typeOf(x) === _typeOf(y);
function _classOf(v) {
    let vType = _typeOf(v);
    if (vType !== "object" && vType !== "function") {
        return vType;
    }
    let ctor;
    try {
        ctor = Object.getPrototypeOf(v)?.constructor?.name ?? "Object";
    }
    catch (_error) {
        ctor = Object.prototype.toString.call(v).slice(8, -1);
    }
    return ctor === "Object" || ctor === "Function" ? ctor.toLowerCase() : ctor;
}
const _isTypedArray = (v) => ArrayBuffer.isView(v) && !(v instanceof DataView);
function _isDeepEqual(x, y) {
    const _isSameInstance = (x, y, Class) => x instanceof Class && y instanceof Class;
    if (_oIs(x, y)) {
        return true;
    }
    if (_typeOf(x) === "object" && _isPrimitive(y) && _classOf(x) === typeof y) {
        return _oIs(x.valueOf(), y);
    }
    if (_isPrimitive(x) && _typeOf(y) === "object" && typeof x === _classOf(y)) {
        return _oIs(x, y.valueOf());
    }
    if (!_isSameType(x, y)) {
        return false;
    }
    if (_isSameType(x, y, "object")) {
        if (_oIs(x, y)) {
            return true;
        }
        if (Object.getPrototypeOf(x).constructor !==
            Object.getPrototypeOf(y).constructor) {
            return false;
        }
        if (_isSameInstance(x, y, WeakMap) || _isSameInstance(x, y, WeakSet)) {
            return _oIs(x, y);
        }
        if (_isSameInstance(x, y, Number)
            || _isSameInstance(x, y, Boolean)
            || _isSameInstance(x, y, String)
            || _isSameInstance(x, y, Symbol)
            || _isSameInstance(x, y, BigInt)) {
            return _oIs(x.valueOf(), y.valueOf());
        }
        if (Array.isArray(x) && Array.isArray(y)) {
            if (x.length !== y.length) {
                return false;
            }
            if (x.length === 0) {
                return true;
            }
            return x.every((v, i) => _isDeepEqual(v, y[i]));
        }
        if (_isTypedArray(x) && _isTypedArray(y) && _classOf(x) === _classOf(y)) {
            if (x.length !== y.length) {
                return false;
            }
            if (x.length === 0) {
                return true;
            }
            return x.every((v, i) => _oIs(v, y[i]));
        }
        if (_isSameInstance(x, y, ArrayBuffer)) {
            if (x.byteLength !== y.byteLength) {
                return false;
            }
            if (x.byteLength === 0) {
                return true;
            }
            let xTA = new Int8Array(x);
            let yTA = new Int8Array(y);
            return xTA.every((v, i) => _oIs(v, yTA[i]));
        }
        if (_isSameInstance(x, y, DataView)) {
            if (x.byteLength !== y.byteLength) {
                return false;
            }
            if (x.byteLength === 0) {
                return true;
            }
            for (let i = 0; i < x.byteLength; i++) {
                if (!_oIs(x.getUint8(i), y.getUint8(i))) {
                    return false;
                }
            }
            return true;
        }
        if (_isSameInstance(x, y, Map)) {
            if (x.size !== y.size) {
                return false;
            }
            if (x.size === 0) {
                return true;
            }
            return [...x.keys()].every((v) => _isDeepEqual(x.get(v), y.get(v)));
        }
        if (_isSameInstance(x, y, Set)) {
            if (x.size !== y.size) {
                return false;
            }
            if (x.size === 0) {
                return true;
            }
            return [...x.keys()].every((v) => y.has(v));
        }
        if (_isSameInstance(x, y, RegExp)) {
            return _oIs(x.lastIndex, y.lastIndex)
                && _oIs(x.flags, y.flags)
                && _oIs(x.source, y.source);
        }
        if (_isSameInstance(x, y, Error)) {
            return _isDeepEqual(Object.getOwnPropertyNames(x).reduce((acc, key) => { acc[key] = x[key]; return acc; }, {}), Object.getOwnPropertyNames(y).reduce((acc, key) => { acc[key] = y[key]; return acc; }, {}));
        }
        if (_isSameInstance(x, y, Date)) {
            return _oIs(+x, +y);
        }
        let xKeys = Reflect.ownKeys(x);
        let yKeys = Reflect.ownKeys(y);
        if (xKeys.length !== yKeys.length) {
            return false;
        }
        if (xKeys.length === 0) {
            return true;
        }
        return xKeys.every((key) => _isDeepEqual(x[key], y[key]));
    }
    return false;
}
function _is(v, eT, caller = "is") {
    let eTT = _typeOf(eT);
    if (eTT === "string") {
        return _typeOf(v) === eT;
    }
    if (eTT === "function") {
        return v instanceof eT;
    }
    if (Array.isArray(eT)) {
        return eT.some(function (item) {
            if (typeof item === "string") {
                return _typeOf(v) === item;
            }
            if (typeof item === "function") {
                return v instanceof item;
            }
            throw new TypeError(`[${caller}] TypeError: expectedType array elements have to be string or function. Got ${_typeOf(item)}`);
        });
    }
    throw new TypeError(`[${_str(caller)}] TypeError: expectedType must be a string, function or array. Got ${_str(eTT)}`);
}
function _str(v) {
    let seen = new WeakSet();
    function replacer(_key, v) {
        let vT = _typeOf(v);
        if (vT === "function") {
            return `[Function: ${v.name || "anonymous"}]`;
        }
        if (vT === "symbol") {
            return v.toString();
        }
        if (v instanceof Date) {
            return `Date(${v.toISOString()})`;
        }
        if (v instanceof Error) {
            return `${v.name}: ${v.message}, ${v.stack ?? ""}`;
        }
        if (vT === "object") {
            if (seen.has(v)) {
                return "[Circular]";
            }
            seen.add(v);
        }
        return v;
    }
    if (["undefined", "null", "string", "number", "boolean", "bigint"]
        .includes(_typeOf(v))) {
        return String(v);
    }
    if (Array.isArray(v)) {
        return `[${v.map(v => _str(v)).join(", ")}]`;
    }
    if (v instanceof Map) {
        return `Map(${v.size}){${Array.from(v.entries()).map(([k, v]) => `${_str(k)} => ${_str(v)}`).join(", ")}}`;
    }
    if (v instanceof Set) {
        return `Set(${v.size}){${Array.from(v.values()).map(v => _str(v)).join(", ")}}`;
    }
    try {
        return JSON.stringify(v, replacer) ?? String(v);
    }
    catch (_error) {
        return String(v);
    }
}
const _msg = (msg) => msg ? ` - ${_str(msg)}` : "";
const _lt = (x, y) => _isSameType(x, y) && x < y;
const _lte = (x, y) => _isSameType(x, y) && (x < y || _oIs(x, y));
const _inRange = (v, min, max) => _isSameType(v, min)
    && _isSameType(min, max)
    && ((min < v && v < max) || _oIs(v, min) || _oIs(v, max));
function _includes(container, keyOrValue, valueIfKey) {
    if (typeof container === "string" || container instanceof String) {
        return String(container).includes(keyOrValue);
    }
    if (container == null || typeof container !== "object") {
        return false;
    }
    if (container instanceof Map || container instanceof WeakMap) {
        if (!container.has(keyOrValue)) {
            return false;
        }
        return valueIfKey === undefined
            || _oIs(container.get(keyOrValue), valueIfKey);
    }
    if (container instanceof WeakSet) {
        return container.has(keyOrValue);
    }
    if (typeof (container).next === "function") {
        let iterator = container;
        let result = iterator.next();
        while (!result.done) {
            if (_oIs(result.value, keyOrValue)) {
                return true;
            }
            result = iterator.next();
        }
        return false;
    }
    if (Array.isArray(container)
        || _isTypedArray(container)
        || container instanceof Set
        || typeof container[Symbol.iterator] === "function") {
        let iterator = container[Symbol.iterator]();
        let result = iterator.next();
        while (!result.done) {
            if (_oIs(result.value, keyOrValue)) {
                return true;
            }
            result = iterator.next();
        }
        return false;
    }
    if (!Object.hasOwn(container, keyOrValue)) {
        return false;
    }
    return valueIfKey === undefined || _oIs(container[keyOrValue], valueIfKey);
}
function _isEmpty(v) {
    if (v == null || v !== v) {
        return true;
    }
    if (Array.isArray(v)
        || _isTypedArray(v)
        || typeof v === "string"
        || v instanceof String) {
        return v.length === 0;
    }
    if (v instanceof Map || v instanceof Set) {
        return v.size === 0;
    }
    if (v instanceof ArrayBuffer || v instanceof DataView) {
        return v.byteLength === 0;
    }
    if (typeof v[Symbol.iterator] === "function") {
        return v[Symbol.iterator]().next().done;
    }
    if ("Iterator" in globalThis
        ? (v instanceof Iterator)
        : (_typeOf(v) === "object" && typeof v.next === "function")) {
        try {
            for (let _item of v) {
                return false;
            }
            return true;
        }
        catch (_error) { }
    }
    if (_typeOf(v) === "object") {
        let keys = Reflect.ownKeys(v);
        if (keys.length === 0)
            return true;
        if (keys.length === 1
            && keys[0] === "length"
            && v.length === 0) {
            return true;
        }
    }
    return false;
}
const _isPrimitive = (v) => _typeOf(v) !== "object" && typeof v !== "function";
const _isFloat = (v) => typeof v === "number" && v === v && !Number.isInteger(v);
function _errorCheck(msg, caller) {
    if (Error.isError(msg)) {
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(caller, msg);
        }
        throw msg;
    }
}
class AssertionError extends Error {
    actual;
    expected;
    operator;
    code;
    generatedMessage;
    constructor(options) {
        super(options?.message ?? "AssertionError");
        this.code = "ERR_ASSERTION";
        this.name = "AssertionError";
        this.generatedMessage = true;
        this.message = options?.message ?? "AssertionError";
        this.cause = options?.message ?? "AssertionError";
        this.actual = options?.actual ?? undefined;
        this.expected = options?.expected ?? undefined;
        this.operator = options?.operator ?? undefined;
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, AssertionError);
        }
    }
}
function assert(value, message) {
    if (!value) {
        _errorCheck(message, assert);
        throw new AssertionError({
            message: `[assert] Assertion failed: ${_str(value)} should be truly${_msg(message)}`,
            actual: value,
            expected: true,
            operator: "==",
        });
    }
}
const ok = (value, message) => assert(value, message);
function equal(actual, expected, message) {
    if (assert.config.alwaysStrict === true) {
        return strictEqual(actual, expected, message);
    }
    if (actual != expected) {
        _errorCheck(message, equal);
        throw new AssertionError({
            message: `[equal] Assertion failed: ${_str(actual)} and ${_str(expected)} should be equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "!="
        });
    }
}
function notEqual(actual, expected, message) {
    if (assert.config.alwaysStrict === true) {
        return notStrictEqual(actual, expected, message);
    }
    if (actual == expected) {
        _errorCheck(message, notEqual);
        throw new AssertionError({
            message: `[notEqual] Assertion failed: ${_str(actual)} and ${_str(expected)} should be equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "=="
        });
    }
}
function strictEqual(actual, expected, message) {
    if (!_oIs(actual, expected)) {
        _errorCheck(message, strictEqual);
        throw new AssertionError({
            message: `[strictEqual] Assertion failed: ${_str(actual)} and ${_str(expected)} should be strictly equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "strictEqual"
        });
    }
}
function notStrictEqual(actual, expected, message) {
    if (_oIs(actual, expected)) {
        _errorCheck(message, notStrictEqual);
        throw new AssertionError({
            message: `[notStrictEqual] Assertion failed: ${_str(actual)} and ${_str(expected)} should not be strictly equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "notStrictEqual"
        });
    }
}
function deepEqual(actual, expected, message) {
    if (!_isDeepEqual(actual, expected)) {
        _errorCheck(message, deepEqual);
        throw new AssertionError({
            message: `[deepEqual] Assertion failed: ${_str(actual)} and ${_str(expected)} should be deep equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "deepEqual"
        });
    }
}
function notDeepEqual(actual, expected, message) {
    if (_isDeepEqual(actual, expected)) {
        _errorCheck(message, notDeepEqual);
        throw new AssertionError({
            message: `[notDeepEqual] Assertion failed: ${_str(actual)} and ${_str(expected)} should not be deep equal${_msg(message)}`,
            actual: actual,
            expected: expected,
            operator: "notDeepEqual"
        });
    }
}
function throws(block, Error_opt, message) {
    let thrownError = undefined;
    try {
        block();
    }
    catch (catchedError) {
        thrownError = catchedError;
    }
    if (!thrownError) {
        throw new AssertionError({
            message: `[throws] Assertion failed: function did not throw${_msg(message)}`,
            operator: "throws"
        });
    }
    if (Error_opt) {
        let errorMatches = (typeof Error_opt === "function" && thrownError instanceof Error_opt)
            || (typeof Error_opt === "string"
                && thrownError?.message?.includes(Error_opt))
            || (Error_opt instanceof RegExp
                && Error_opt.test(thrownError?.message));
        if (!errorMatches) {
            throw new AssertionError({
                message: `[throws] Assertion failed: function threw unexpected error: ${_str(thrownError)}${_msg(message)}`,
                actual: thrownError,
                expected: Error_opt,
                operator: "throws"
            });
        }
    }
    return thrownError;
}
async function rejects(block, Error_opt, message) {
    let rejectedError = undefined;
    try {
        let result = typeof block === "function" ? await block() : await block;
        throw new AssertionError({
            message: `[rejects] Assertion failed: function/promise did not reject - ${_str(result)}${_msg(message)}`,
            expected: Error_opt,
            operator: "rejects"
        });
    }
    catch (catchedError) {
        rejectedError = catchedError;
    }
    if (Error_opt) {
        let errorMatches = (typeof Error_opt === "function" && rejectedError instanceof Error_opt)
            || (typeof Error_opt === "string"
                && typeof rejectedError?.message === "string")
                && rejectedError.message.includes(Error_opt)
            || (Error_opt instanceof RegExp
                && typeof rejectedError?.message === "string"
                && Error_opt.test(rejectedError.message));
        if (!errorMatches) {
            throw new AssertionError({
                message: `[rejects] Assertion failed: rejected with unexpected error: ${_str(rejectedError)}${_msg(message)}`,
                actual: rejectedError,
                expected: Error_opt,
                operator: "rejects"
            });
        }
    }
    return rejectedError;
}
async function doesNotReject(block, Error_opt, message) {
    try {
        let result = typeof block === "function" ? await block() : block;
        return result;
    }
    catch (catchedError) {
        if (Error_opt) {
            let errorMatches = (typeof Error_opt === "function" && catchedError instanceof Error_opt)
                || (typeof Error_opt === "string"
                    && catchedError.message?.includes(Error_opt))
                || (Error_opt instanceof RegExp
                    && Error_opt.test(catchedError.message));
            if (errorMatches) {
                if (Error.isError(message))
                    throw message;
                throw new AssertionError({
                    message: `[doesNotReject] Assertion failed: function/promise rejected with disallowed error: ${_str(catchedError)}${_msg(message)}`,
                    actual: catchedError,
                    expected: undefined,
                    operator: "doesNotReject"
                });
            }
        }
        _errorCheck(message, doesNotReject);
        throw new AssertionError({
            message: `[doesNotReject] Assertion failed: function/promise rejected unexpectedly${_msg(message)}`,
            actual: catchedError,
            expected: undefined,
            operator: "doesNotReject"
        });
    }
}
function fail(...args) {
    let message = args.length === 1 ? args[0] :
        (args.length > 1 ? args[2] : undefined);
    _errorCheck(message, fail);
    throw new AssertionError({
        message: `[fail] Assertion failed${message ? `: ${_str(message)}` : ""}`,
        actual: args.length > 1 ? args[0] : undefined,
        expected: args.length > 1 ? args[1] : undefined,
        operator: args.length > 1 ? args[3] : undefined
    });
}
function notOk(value, message) {
    if (value) {
        _errorCheck(message, notOk);
        throw new AssertionError({
            message: `[notOk] Assertion failed: ${_str(value)} should be falsy${_msg(message)}`,
            actual: value,
            expected: false,
            operator: "=="
        });
    }
}
const isTrue = (value, message) => strictEqual(value, true, message);
const isNotTrue = (value, message) => notStrictEqual(value, true, message);
const isFalse = (value, message) => strictEqual(value, false, message);
const isNotFalse = (value, message) => notStrictEqual(value, false, message);
function is(value, expectedType, message) {
    if (!_is(value, expectedType, "is")) {
        _errorCheck(message, is);
        throw new AssertionError({
            message: `[is] Assertion failed: ${_str(value)} should be an expected type: ${_str(expectedType)}${_msg(message)}`,
            actual: value,
            expected: expectedType,
            operator: "is"
        });
    }
}
function isNot(value, expectedType, message) {
    if (_is(value, expectedType, "isNot")) {
        _errorCheck(message, isNot);
        throw new AssertionError({
            message: `[isNot] Assertion failed: ${_str(value)} should not be an expected type: ${_str(expectedType)}${_msg(message)}`,
            actual: value,
            expected: expectedType,
            operator: "isNot"
        });
    }
}
function typeOf(value, expectedType, message) {
    oneOf(expectedType, ["undefined", "null", "boolean", "number", "bigint", "string", "symbol",
        "function", "object"], message);
    is(value, expectedType, message);
}
function notTypeOf(value, expectedType, message) {
    oneOf(expectedType, ["undefined", "null", "boolean", "number", "bigint", "string", "symbol",
        "function", "object"], message);
    isNot(value, expectedType, message);
}
function instanceOf(value, expectedConstructor, message) {
    is(expectedConstructor, "function", message);
    is(value, expectedConstructor, message);
}
function notInstanceOf(value, expectedConstructor, message) {
    is(expectedConstructor, "function", message);
    isNot(value, expectedConstructor, message);
}
const isNullish = (value, message) => is(value, ["null", "undefined"], message);
const isNonNullable = (value, message) => isNot(value, ["null", "undefined"], message);
const isNull = (value, message) => is(value, "null", message);
const isNotNull = (value, message) => isNot(value, "null", message);
const isUndefined = (value, message) => is(value, "undefined", message);
const isDefined = (value, message) => isNot(value, "undefined", message);
const isString = (value, message) => is(value, "string", message);
const isNotString = (value, message) => isNot(value, "string", message);
const isNumber = (value, message) => is(value, "number", message);
const isNotNumber = (value, message) => isNot(value, "number", message);
const isBigInt = (value, message) => is(value, "bigint", message);
const isNotBigInt = (value, message) => isNot(value, "bigint", message);
const isBoolean = (value, message) => is(value, "boolean", message);
const isNotBoolean = (value, message) => isNot(value, "boolean", message);
const isSymbol = (value, message) => is(value, "symbol", message);
const isNotSymbol = (value, message) => isNot(value, "symbol", message);
const isFunction = (value, message) => is(value, "function", message);
const isNotFunction = (value, message) => isNot(value, "function", message);
const isObject = (value, message) => is(value, "object", message);
const isNotObject = (value, message) => isNot(value, "object", message);
const isPrimitive = (value, message) => isNot(value, ["object", "function"], message);
const isNotPrimitive = (value, message) => is(value, ["object", "function"], message);
const isNaN = (value, message) => strictEqual(value, NaN, message);
const isNotNaN = (value, message) => notStrictEqual(value, NaN, message);
function isInt(value, message) {
    if (!Number.isInteger(value)) {
        _errorCheck(message, isInt);
        throw new AssertionError({
            message: `[isInt] Assertion failed: ${_str(value)} should be an integer${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isInt"
        });
    }
}
function isNotInt(value, message) {
    if (Number.isInteger(value)) {
        _errorCheck(message, isNotInt);
        throw new AssertionError({
            message: `[isNotInt] Assertion failed: ${_str(value)} should not be an integer${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isNotInt"
        });
    }
}
function isFloat(value, message) {
    if (!_isFloat(value)) {
        _errorCheck(message, isFloat);
        throw new AssertionError({
            message: `[isFloat] Assertion failed: ${_str(value)} should be a float${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isFloat"
        });
    }
}
function isNotFloat(value, message) {
    if (_isFloat(value)) {
        _errorCheck(message, isNotFloat);
        throw new AssertionError({
            message: `[isNotFloat] Assertion failed: ${_str(value)} should not be a float${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isNotFloat"
        });
    }
}
function isEmpty(value, message) {
    if (!_isEmpty(value)) {
        _errorCheck(message, isEmpty);
        throw new AssertionError({
            message: `[isEmpty] Assertion failed: ${_str(value)} should be empty${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isEmpty"
        });
    }
}
function isNotEmpty(value, message) {
    if (_isEmpty(value)) {
        _errorCheck(message, isNotEmpty);
        throw new AssertionError({
            message: `[isNotEmpty] Assertion failed: ${_str(value)} should be not empty${_msg(message)}`,
            actual: value,
            expected: "",
            operator: "isNotEmpty"
        });
    }
}
function match(string, regexp, message) {
    is(string, ["string", String], message);
    is(regexp, RegExp, message);
    if (!(regexp.test(String(string)))) {
        _errorCheck(message, match);
        throw new AssertionError({
            message: `[match] Assertion failed: ${_str(string)} is not matched with ${_str(regexp)}${_msg(message)}`,
            actual: string,
            expected: regexp,
            operator: "match"
        });
    }
}
function doesNotMatch(string, regexp, message) {
    is(string, ["string", String], message);
    is(regexp, RegExp, message);
    if (regexp.test(String(string))) {
        _errorCheck(message, doesNotMatch);
        throw new AssertionError({
            message: `[doesNotMatch] Assertion failed: ${_str(string)} is matched with ${_str(regexp)}${_msg(message)}`,
            actual: string,
            expected: regexp,
            operator: "doesNotMatch"
        });
    }
}
function lt(value1, value2, message) {
    if (!_lt(value1, value2)) {
        _errorCheck(message, lt);
        throw new AssertionError({
            message: `[lt] Assertion failed: ${_str(value1)} should be less than ${_str(value2)}${_msg(message)}`,
            actual: value1,
            expected: value2,
            operator: "<"
        });
    }
}
function lte(value1, value2, message) {
    if (!_lte(value1, value2)) {
        _errorCheck(message, lte);
        throw new AssertionError({
            message: `[lte] Assertion failed: ${_str(value1)} should be less than or equal ${_str(value2)}${_msg(message)}`,
            actual: value1,
            expected: value2,
            operator: "< or Object.is();"
        });
    }
}
function gt(value1, value2, message) {
    if (!_lt(value2, value1)) {
        _errorCheck(message, gt);
        throw new AssertionError({
            message: `[gt] Assertion failed: ${_str(value1)} should be greater than ${_str(value2)}${_msg(message)}`,
            actual: value1,
            expected: value2,
            operator: ">"
        });
    }
}
function gte(value1, value2, message) {
    if (!_lte(value2, value1)) {
        _errorCheck(message, gte);
        throw new AssertionError({
            message: `[gte] Assertion failed: ${_str(value1)} should be greater than or equal ${_str(value2)}${_msg(message)}`,
            actual: value1,
            expected: value2,
            operator: "> or Object.is();"
        });
    }
}
function inRange(value, min, max, message) {
    if (!_inRange(value, min, max)) {
        _errorCheck(message, inRange);
        throw new AssertionError({
            message: `[inRange] Assertion failed: ${_str(value)} should be in range ${_str(min)} and ${_str(max)} or the type of the values are not the same${_msg(message)}`,
            actual: value,
            expected: `${_str(min)} and ${_str(max)}`,
            operator: "inRange"
        });
    }
}
function notInRange(value, min, max, message) {
    if (_inRange(value, min, max)) {
        _errorCheck(message, notInRange);
        throw new AssertionError({
            message: `[notInRange] Assertion failed: ${_str(value)} should be not in range ${_str(min)} and ${_str(max)}${_msg(message)}`,
            actual: value,
            expected: `${_str(min)} and ${_str(max)}`,
            operator: "notInRange"
        });
    }
}
function stringContains(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (!String(actual).includes(String(substring))) {
        _errorCheck(message, stringContains);
        throw new AssertionError({
            message: `[stringContains] Assertion failed: ${_str(actual)} does not contain substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "stringContains"
        });
    }
}
function stringNotContains(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (actual.includes(String(substring))) {
        _errorCheck(message, stringNotContains);
        throw new AssertionError({
            message: `[stringNotContains] Assertion failed: ${_str(actual)} should not contain substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "stringNotContains"
        });
    }
}
function stringStartsWith(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (!String(actual).startsWith(String(substring))) {
        _errorCheck(message, stringStartsWith);
        throw new AssertionError({
            message: `[stringStartsWith] Assertion failed: ${_str(actual)} does not start with substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "stringStartsWith"
        });
    }
}
function stringNotStartsWith(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (String(actual).startsWith(String(substring))) {
        _errorCheck(message, stringNotStartsWith);
        throw new AssertionError({
            message: `[stringNotStartsWith] Assertion failed: ${_str(actual)} starts with substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "doesNotStartWith"
        });
    }
}
function stringEndsWith(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (!String(actual).endsWith(String(substring))) {
        _errorCheck(message, stringEndsWith);
        throw new AssertionError({
            message: `[stringEndsWith] Assertion failed: ${_str(actual)} does not end with substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "stringEndsWith"
        });
    }
}
function stringNotEndsWith(actual, substring, message) {
    is(actual, ["string", String], message);
    is(substring, ["string", String], message);
    if (String(actual).endsWith(String(substring))) {
        _errorCheck(message, stringNotEndsWith);
        throw new AssertionError({
            message: `[stringNotEndsWith] Assertion failed: ${_str(actual)} ends with substring ${_str(substring)}${_msg(message)}`,
            actual,
            expected: substring,
            operator: "stringEndsWith"
        });
    }
}
function includes(container, options, message) {
    is(options, "object", message);
    if (!_includes(container, options.keyOrValue, options?.value ?? undefined)) {
        _errorCheck(message, includes);
        throw new AssertionError({
            message: `[includes] Assertion failed: ${_str(container)} does not include${_str(options)}${_msg(message)}`,
            actual: container,
            expected: options,
            operator: "includes"
        });
    }
}
function doesNotInclude(container, options, message) {
    is(options, "object", message);
    if (_includes(container, options.keyOrValue, options?.value ?? undefined)) {
        _errorCheck(message, doesNotInclude);
        throw new AssertionError({
            message: `[doesNotInclude] Assertion failed: ${_str(container)} does not include ${_str(options)}${_msg(message)}`,
            actual: container,
            expected: options,
            operator: "doesNotInclude"
        });
    }
}
const oneOf = (value, collection, message) => includes(collection, { keyOrValue: value }, message);
const notOneOf = (value, collection, message) => doesNotInclude(collection, { keyOrValue: value }, message);
function testSync(name = "assert.testSync", block) {
    try {
        return { ok: true, value: block(), block: block, name: _str(name) };
    }
    catch (error) {
        return {
            ok: false,
            error: Error.isError(error) ? error : new Error(_str(error)),
            block: block,
            name: _str(name)
        };
    }
}
async function testAsync(name = "assert.testAsync", block) {
    try {
        return {
            ok: true,
            value: await block(),
            block: block,
            name: _str(name)
        };
    }
    catch (error) {
        return {
            ok: false,
            error: Error.isError(error) ? error : new Error(_str(error)),
            block: block,
            name: _str(name)
        };
    }
}
function testCheck(result) {
    return result.ok;
}
class TestSuite {
    results = [];
    add(...args) {
        for (let item of args) {
            this.results.push(item);
        }
        return this;
    }
    clear() {
        this.results.length = 0;
        return this;
    }
    get size() { return this.results.length; }
    success() {
        return this.results.filter((testCase) => testCase.ok).values();
    }
    failed() {
        return this.results.filter((testCase) => !testCase.ok).values();
    }
    values() { return this.results.values(); }
    toArray() { return this.results.slice(); }
    [Symbol.iterator]() {
        return this.results[Symbol.iterator]();
    }
}
assert.VERSION = VERSION;
assert.config = config;
assert.AssertionError = AssertionError;
assert.ok = ok;
assert.equal = equal;
assert.notEqual = notEqual;
assert.strictEqual = strictEqual;
assert.notStrictEqual = notStrictEqual;
assert.deepEqual = deepEqual;
assert.notDeepEqual = notDeepEqual;
assert.deepStrictEqual = deepEqual;
assert.notDeepStrictEqual = notDeepEqual;
assert.throws = throws;
assert.rejects = rejects;
assert.doesNotReject = doesNotReject;
assert.fail = fail;
assert.notOk = notOk;
assert.isTrue = isTrue;
assert.isNotTrue = isNotTrue;
assert.isFalse = isFalse;
assert.isNotFalse = isNotFalse;
assert.is = is;
assert.typeOf = typeOf;
assert.notTypeOf = notTypeOf;
assert.instanceOf = instanceOf;
assert.notInstanceOf = notInstanceOf;
assert.isNot = isNot;
assert.isNullish = isNullish;
assert.ifError = isNullish;
assert.isNonNullable = isNonNullable;
assert.isNull = isNull;
assert.isNotNull = isNotNull;
assert.isUndefined = isUndefined;
assert.isDefined = isDefined;
assert.isString = isString;
assert.isNotString = isNotString;
assert.isNumber = isNumber;
assert.isNotNumber = isNotNumber;
assert.isBigInt = isBigInt;
assert.isNotBigInt = isNotBigInt;
assert.isBoolean = isBoolean;
assert.isNotBoolean = isNotBoolean;
assert.isSymbol = isSymbol;
assert.isNotSymbol = isNotSymbol;
assert.isFunction = isFunction;
assert.isNotFunction = isNotFunction;
assert.isObject = isObject;
assert.isNotObject = isNotObject;
assert.isPrimitive = isPrimitive;
assert.isNotPrimitive = isNotPrimitive;
assert.isNaN = isNaN;
assert.isNotNaN = isNotNaN;
assert.isInt = isInt;
assert.isNotInt = isNotInt;
assert.isFloat = isFloat;
assert.isNotFloat = isNotFloat;
assert.isEmpty = isEmpty;
assert.isNotEmpty = isNotEmpty;
assert.match = match;
assert.doesNotMatch = doesNotMatch;
assert.lt = lt;
assert.lte = lte;
assert.gt = gt;
assert.gte = gte;
assert.inRange = inRange;
assert.notInRange = notInRange;
assert.stringContains = stringContains;
assert.stringNotContains = stringNotContains;
assert.stringStartsWith = stringStartsWith;
assert.stringNotStartsWith = stringNotStartsWith;
assert.stringEndsWith = stringEndsWith;
assert.stringNotEndsWith = stringNotEndsWith;
assert.includes = includes;
assert.doesNotInclude = doesNotInclude;
assert.oneOf = oneOf;
assert.notOneOf = notOneOf;
assert.testSync = testSync;
assert.test = testSync;
assert.it = testSync;
assert.testAsync = testAsync;
assert.testCheck = testCheck;
assert.TestSuite = TestSuite;
export { assert };
export default assert;
