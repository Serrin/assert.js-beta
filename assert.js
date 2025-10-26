"use strict";
const VERSION = "assert.js v1.0.3";
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
const _typeOf = (value) => value === null ? "null" : typeof value;
function _classOf(value) {
    const valueType = _typeOf(value);
    if (valueType !== "object" && valueType !== "function") {
        return valueType;
    }
    let ctor;
    try {
        ctor = Object.getPrototypeOf(value)?.constructor?.name ?? "Object";
    }
    catch (_e) {
        ctor = Object.prototype.toString.call(value).slice(8, -1);
    }
    return ctor === "Object" || ctor === "Function" ? ctor.toLowerCase() : ctor;
}
function _isDeepStrictEqual(value1, value2) {
    const _isObject = (value) => _typeOf(value) === "object";
    const _isSameInstance = (value1, value2, Class) => value1 instanceof Class && value2 instanceof Class;
    const _classof = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    const _ownKeys = (value) => [...Object.getOwnPropertyNames(value), ...Object.getOwnPropertySymbols(value)];
    const _isEqual = (value1, value2) => Object.is(value1, value2);
    if (_isEqual(value1, value2)) {
        return true;
    }
    if (_isObject(value1) && _isPrimitive(value2) && _classof(value1) === typeof value2) {
        return _isEqual(value1.valueOf(), value2);
    }
    if (_isPrimitive(value1) && _isObject(value2) && typeof value1 === _classof(value2)) {
        return _isEqual(value1, value2.valueOf());
    }
    if (_typeOf(value1) !== _typeOf(value2)) {
        return false;
    }
    if (_isObject(value1) && _isObject(value2)) {
        if (_isEqual(value1, value2)) {
            return true;
        }
        if (Object.getPrototypeOf(value1).constructor !==
            Object.getPrototypeOf(value2).constructor) {
            return false;
        }
        if (_isSameInstance(value1, value2, WeakMap)
            || _isSameInstance(value1, value2, WeakSet)) {
            return _isEqual(value1, value2);
        }
        if (_isSameInstance(value1, value2, Number)
            || _isSameInstance(value1, value2, Boolean)
            || _isSameInstance(value1, value2, String)
            || _isSameInstance(value1, value2, BigInt)) {
            return _isEqual(value1.valueOf(), value2.valueOf());
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
            if (value1.length !== value2.length) {
                return false;
            }
            if (value1.length === 0) {
                return true;
            }
            return value1.every((value, index) => _isDeepStrictEqual(value, value2[index]));
        }
        if (_isSameInstance(value1, value2, Int8Array)
            || _isSameInstance(value1, value2, Uint8Array)
            || _isSameInstance(value1, value2, Uint8ClampedArray)
            || _isSameInstance(value1, value2, Int16Array)
            || _isSameInstance(value1, value2, Uint16Array)
            || _isSameInstance(value1, value2, Int32Array)
            || _isSameInstance(value1, value2, Uint32Array)
            || ("Float16Array" in globalThis
                ? _isSameInstance(value1, value2, Float16Array)
                : false)
            || _isSameInstance(value1, value2, Float32Array)
            || _isSameInstance(value1, value2, Float64Array)
            || _isSameInstance(value1, value2, BigInt64Array)
            || _isSameInstance(value1, value2, BigUint64Array)) {
            if (value1.length !== value2.length) {
                return false;
            }
            if (value1.length === 0) {
                return true;
            }
            return value1.every((value, index) => _isEqual(value, value2[index]));
        }
        if (_isSameInstance(value1, value2, ArrayBuffer)) {
            if (value1.byteLength !== value2.byteLength) {
                return false;
            }
            if (value1.byteLength === 0) {
                return true;
            }
            let xTA = new Int8Array(value1), yTA = new Int8Array(value2);
            return xTA.every((value, index) => _isEqual(value, yTA[index]));
        }
        if (_isSameInstance(value1, value2, DataView)) {
            if (value1.byteLength !== value2.byteLength) {
                return false;
            }
            if (value1.byteLength === 0) {
                return true;
            }
            for (let index = 0; index < value1.byteLength; index++) {
                if (!_isEqual(value1.getUint8(index), value2.getUint8(index))) {
                    return false;
                }
            }
            return true;
        }
        if (_isSameInstance(value1, value2, Map)) {
            if (value1.size !== value2.size) {
                return false;
            }
            if (value1.size === 0) {
                return true;
            }
            return [...value1.keys()].every((value) => _isDeepStrictEqual(value1.get(value), value2.get(value)));
        }
        if (_isSameInstance(value1, value2, Set)) {
            if (value1.size !== value2.size) {
                return false;
            }
            if (value1.size === 0) {
                return true;
            }
            return [...value1.keys()].every((value) => value2.has(value));
        }
        if (_isSameInstance(value1, value2, RegExp)) {
            return _isEqual(value1.lastIndex, value2.lastIndex)
                && _isEqual(value1.flags, value2.flags)
                && _isEqual(value1.source, value2.source);
        }
        if (_isSameInstance(value1, value2, Error)) {
            return _isDeepStrictEqual(Object.getOwnPropertyNames(value1)
                .reduce((acc, k) => {
                acc[k] = value1[k];
                return acc;
            }, {}), Object.getOwnPropertyNames(value2)
                .reduce((acc, k) => {
                acc[k] = value2[k];
                return acc;
            }, {}));
        }
        if (_isSameInstance(value1, value2, Date)) {
            return _isEqual(+value1, +value2);
        }
        let value1Keys = _ownKeys(value1);
        let value2Keys = _ownKeys(value2);
        if (value1Keys.length !== value2Keys.length) {
            return false;
        }
        if (value1Keys.length === 0) {
            return true;
        }
        return value1Keys.every((key) => _isDeepStrictEqual(value1[key], value2[key]));
    }
    return false;
}
function _isType(value, expectedType, Throw = false) {
    if (!(["string", "function", "undefined"].includes(typeof expectedType))
        && !Array.isArray(expectedType)) {
        throw new TypeError(`[isType] TypeError: expectedType must be string, function, array or undefined. Got ${typeof expectedType}`);
    }
    if (typeof Throw !== "boolean") {
        throw new TypeError(`[isType] TypeError: Throw has to be a boolean. Got ${typeof Throw}`);
    }
    const vType = _typeOf(value);
    if (expectedType == null) {
        return vType === "object"
            ? Object.getPrototypeOf(value)?.constructor ?? "object"
            : vType;
    }
    let expectedArray = Array.isArray(expectedType) ? expectedType : [expectedType];
    let matched = expectedArray.some(function (item) {
        if (_isString(item)) {
            return vType === item;
        }
        if (_isFunction(item)) {
            return value != null && value instanceof item;
        }
        throw new TypeError(`[isType] TypeError: expectedType array elements have to be a string or function. Got ${typeof item}`);
    });
    if (Throw && !matched) {
        let vName = value.toString ? value.toString() : Object.prototype.toString.call(value);
        let eNames = expectedArray.map((item) => (_isString(item) ? item.toString() : item.name ?? "anonymous")).join(", ");
        throw new TypeError(`[isType] TypeError: ${vName} is not a ${eNames}`);
    }
    return matched;
}
const _isNullish = (value) => typeof value === "undefined" || value === null;
const _isNull = (value) => value === null;
const _isUndefined = (value) => typeof value === "undefined";
const _isString = (value) => typeof value === "string";
const _isNumber = (value) => typeof value === "number";
const _isBigInt = (value) => typeof value === "bigint";
const _isBoolean = (value) => typeof value === "boolean";
const _isSymbol = (value) => typeof value === "symbol";
const _isFunction = (value) => typeof value === "function";
const _isObject = (value) => value != null && typeof value === "object";
const _isError = (value) => Error.isError ? Error.isError(value) : value instanceof Error;
function _toSafeString(value) {
    const seen = new WeakSet();
    const replacer = (_key, value) => {
        if (_isFunction(value)) {
            return `[Function: ${value.name || "anonymous"}]`;
        }
        if (_isSymbol(value)) {
            return value.toString();
        }
        if (value instanceof Date) {
            return `Date(${value.toISOString()})`;
        }
        if (_isError(value)) {
            return `${value.name}: ${value.message}, ${value.stack ?? ""}`;
        }
        if (value && _isObject(value)) {
            if (seen.has(value)) {
                return "[Circular]";
            }
            ;
            seen.add(value);
        }
        return value;
    };
    if (["undefined", "null", "string", "number", "boolean", "bigint"]
        .includes(_typeOf(value))) {
        return String(value);
    }
    if (Array.isArray(value)) {
        return `[${value.map(v => _toSafeString(v)).join(", ")}]`;
    }
    if (value instanceof Map) {
        return `Map(${value.size}){${Array.from(value.entries()).map(([k, v]) => `${_toSafeString(k)} => ${_toSafeString(v)}`).join(", ")}}`;
    }
    if (value instanceof Set) {
        return `Set(${value.size}){${Array.from(value.values()).map(v => _toSafeString(v)).join(", ")}}`;
    }
    try {
        return JSON.stringify(value, replacer) ?? String(value);
    }
    catch (_e) {
        return String(value);
    }
}
const _isLessThan = (value1, value2) => _typeOf(value1) === _typeOf(value2) && value1 < value2;
const _inRange = (value, min, max) => _typeOf(value) === _typeOf(min)
    && _typeOf(min) === _typeOf(max)
    && ((min < value && value < max)
        || Object.is(value, min)
        || Object.is(value, max));
function _includes(container, keyOrValue, value) {
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
        return value === undefined || Object.is(container.get(keyOrValue), value);
    }
    if (container instanceof WeakSet) {
        return container.has(keyOrValue);
    }
    if (typeof (container).next === "function") {
        let it = container;
        let res = it.next();
        while (!res.done) {
            if (Object.is(res.value, keyOrValue)) {
                return true;
            }
            res = it.next();
        }
        return false;
    }
    if (Array.isArray(container)
        || ArrayBuffer.isView(container)
        || container instanceof Set
        || typeof (container)[Symbol.iterator] === "function") {
        for (const item of container) {
            if (Object.is(item, keyOrValue)) {
                return true;
            }
        }
        return false;
    }
    if (!Object.hasOwn(container, keyOrValue)) {
        return false;
    }
    return value === undefined || Object.is(container[keyOrValue], value);
}
function _isEmpty(value) {
    function _isTypedArray(value) {
        const constructors = [
            Int8Array, Uint8Array, Uint8ClampedArray,
            Int16Array, Uint16Array,
            Int32Array, Uint32Array,
            Float32Array, Float64Array,
            BigInt64Array, BigUint64Array
        ];
        if ("Float16Array" in globalThis) {
            constructors.push(globalThis.Float16Array);
        }
        return constructors.some((item) => value instanceof item);
    }
    if (value == null || Number.isNaN(value)) {
        return true;
    }
    if (Array.isArray(value)
        || _isTypedArray(value)
        || _isString(value)
        || value instanceof String) {
        return value.length === 0;
    }
    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }
    if (value instanceof ArrayBuffer || value instanceof DataView) {
        return value.byteLength === 0;
    }
    if (typeof value[Symbol.iterator] === "function") {
        const it = value[Symbol.iterator]();
        return it.next().done;
    }
    if ("Iterator" in globalThis ? (value instanceof Iterator)
        : (_typeOf(value) === "object" && typeof value.next === "function")) {
        try {
            for (const _ of value) {
                return false;
            }
            return true;
        }
        catch { }
    }
    if (_isObject(value)) {
        const keys = [
            ...Object.getOwnPropertyNames(value),
            ...Object.getOwnPropertySymbols(value)
        ];
        if (keys.length === 0)
            return true;
        if (keys.length === 1
            && keys[0] === "length"
            && value.length === 0) {
            return true;
        }
    }
    return false;
}
const _isPrimitive = (value) => _typeOf(value) !== "object" && _typeOf(value) !== "function";
function _errorCheck(value) {
    if (_isError(value)) {
        throw value;
    }
}
class AssertionError extends Error {
    actual;
    expected;
    operator;
    code;
    constructor(message, options) {
        super(message);
        this.code = "ERR_ASSERTION";
        this.name = "AssertionError";
        this.message = message ?? undefined;
        this.cause = message ?? undefined;
        if (options != null && typeof options === "object") {
            this.actual = options?.actual;
            this.expected = options?.expected;
            this.operator = options?.operator;
        }
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, AssertionError);
        }
    }
}
function assert(condition, message) {
    if (!condition) {
        _errorCheck(message);
        let errorMessage = `[assert] Assertion failed: ${_toSafeString(condition)} should be truly${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: condition,
            expected: true,
            operator: "=="
        });
    }
}
function ok(condition, message) {
    assert(condition, message);
}
function equal(actual, expected, message) {
    if (actual != expected) {
        _errorCheck(message);
        let errorMessage = `[equal] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should be equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: actual,
            expected: expected,
            operator: "!="
        });
    }
}
function notEqual(actual, expected, message) {
    if (actual == expected) {
        _errorCheck(message);
        let errorMessage = `[notEqual] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should be equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: actual,
            expected: expected,
            operator: "=="
        });
    }
}
function strictEqual(actual, expected, message) {
    if (!Object.is(actual, expected)) {
        _errorCheck(message);
        let errorMessage = `[strictEqual] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should be strictly equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: actual,
            expected: expected,
            operator: "strictEqual"
        });
    }
}
function notStrictEqual(actual, expected, message) {
    if (Object.is(actual, expected)) {
        _errorCheck(message);
        let errorMessage = `[notStrictEqual] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should not be strictly equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: actual,
            expected: expected,
            operator: "notStrictEqual"
        });
    }
}
function deepEqual(actual, expected, message) {
    if (!_isDeepStrictEqual(actual, expected)) {
        _errorCheck(message);
        let errorMessage = `[deepEqual] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should be deep equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: actual,
            expected: expected,
            operator: "deepEqual"
        });
    }
}
function notDeepEqual(actual, expected, message) {
    if (_isDeepStrictEqual(actual, expected)) {
        _errorCheck(message);
        let errorMessage = `[notDeepEqual] Assertion failed: ${_toSafeString(actual)} and ${_toSafeString(expected)} should not be deep equal${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
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
        let errorMessage = `[throws] Assertion failed: function did not throw${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            operator: "throws"
        });
    }
    if (Error_opt) {
        const errorMatches = (_isFunction(Error_opt) && thrownError instanceof Error_opt) ||
            (typeof Error_opt === "string" && thrownError?.message?.includes(Error_opt)) ||
            (Error_opt instanceof RegExp && Error_opt.test(thrownError?.message));
        if (!errorMatches) {
            let errorMessage = `[throws] Assertion failed: function threw unexpected error: ${_toSafeString(thrownError)}${message ? " - " + _toSafeString(message) : ""}`;
            throw new assert.AssertionError(errorMessage, {
                message: errorMessage,
                cause: thrownError,
                actual: thrownError,
                expected: Error_opt,
                operator: "throws"
            });
        }
    }
    return thrownError;
}
async function rejects(block, Error_opt, message) {
    let rejectedError;
    try {
        const result = typeof block === "function" ? await block() : await block;
        let errorMessage = `[rejects] Assertion failed: function/promise did not reject${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: result,
            expected: Error_opt,
            operator: "rejects"
        });
    }
    catch (catchedError) {
        rejectedError = catchedError;
    }
    if (Error_opt) {
        const errorMatches = (_isFunction(Error_opt) && rejectedError instanceof Error_opt) ||
            (_isString(Error_opt) && _isString(rejectedError?.message)
                && rejectedError.message.includes(Error_opt)) ||
            (Error_opt instanceof RegExp && typeof rejectedError?.message === "string" && Error_opt.test(rejectedError.message));
        if (!errorMatches) {
            let errorMessage = `[rejects] Assertion failed: rejected with unexpected error: ${_toSafeString(rejectedError)}${message ? " - " + _toSafeString(message) : ""}`;
            throw new assert.AssertionError(errorMessage, {
                message: errorMessage,
                cause: rejectedError,
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
        const result = _isFunction(block) ? await block() : await block;
        return result;
    }
    catch (catchedError) {
        if (Error_opt) {
            const errorMatches = (_isFunction(Error_opt) && catchedError instanceof Error_opt) ||
                (_isString(Error_opt) && catchedError.message?.includes(Error_opt)) ||
                (Error_opt instanceof RegExp && Error_opt.test(catchedError.message));
            if (errorMatches) {
                if (_isError(message))
                    throw message;
                let errorMessage = `[doesNotReject] Assertion failed: function/promise rejected with disallowed error: ${_toSafeString(catchedError)}${message ? " - " + _toSafeString(message) : ""}`;
                throw new assert.AssertionError(errorMessage, {
                    message: errorMessage,
                    cause: catchedError,
                    actual: catchedError,
                    expected: undefined,
                    operator: "doesNotReject"
                });
            }
        }
        _errorCheck(message);
        let errorMessage = `[doesNotReject] Assertion failed: function/promise rejected unexpectedly${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: catchedError,
            actual: catchedError,
            expected: undefined,
            operator: "doesNotReject"
        });
    }
}
function fail(message) {
    _errorCheck(message);
    let errorMessage = `[fail] Assertion failed${message ? ": " + _toSafeString(message) : ""}`;
    throw new assert.AssertionError(errorMessage, { message: errorMessage, cause: errorMessage });
}
function notOk(condition, message) {
    if (condition) {
        _errorCheck(message);
        let errorMessage = `[notOk] Assertion failed: ${_toSafeString(condition)} should be falsy${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: condition,
            expected: false,
            operator: "=="
        });
    }
}
function isTrue(condition, message) {
    if (condition !== true) {
        _errorCheck(message);
        let errorMessage = `[isTrue] Assertion failed: ${_toSafeString(condition)} should be true${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: condition,
            expected: true,
            operator: "!=="
        });
    }
}
function isFalse(condition, message) {
    if (condition !== false) {
        _errorCheck(message);
        let errorMessage = `[isFalse] Assertion failed: ${_toSafeString(condition)} should be false${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: condition,
            expected: false,
            operator: "!=="
        });
    }
}
function is(value, expectedType, message) {
    if (!_isType(value, expectedType, false)) {
        _errorCheck(message);
        let errorMessage = `[is] Assertion failed: ${_toSafeString(value)} should be an expected type${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: expectedType,
            operator: "is"
        });
    }
}
function isNot(value, expectedType, message) {
    if (_isType(value, expectedType, false)) {
        _errorCheck(message);
        let errorMessage = `[isNot] Assertion failed: ${_toSafeString(value)} should not be an expected type${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: expectedType,
            operator: "is not"
        });
    }
}
function isNullish(value, message) {
    if (!_isNullish(value)) {
        _errorCheck(message);
        let errorMessage = `[isNullish] Assertion failed: ${_toSafeString(value)} should be null or undefined${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: null,
            operator: "!="
        });
    }
}
function isNotNullish(value, message) {
    if (_isNullish(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotNullish] Assertion failed: ${_toSafeString(value)} should be not null or undefined${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: null,
            operator: "=="
        });
    }
}
function isNull(value, message) {
    if (!_isNull(value)) {
        _errorCheck(message);
        let errorMessage = `[isNull] Assertion failed: ${_toSafeString(value)} should be null ${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: null,
            operator: "!=="
        });
    }
}
function isNotNull(value, message) {
    if (_isNull(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotNull] Assertion failed: ${_toSafeString(value)} should be not null ${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: null,
            operator: "==="
        });
    }
}
function isUndefined(value, message) {
    if (!_isUndefined(value)) {
        _errorCheck(message);
        let errorMessage = `[isUndefined] Assertion failed: ${_toSafeString(value)} should be undefined${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: undefined,
            operator: "!=="
        });
    }
}
function isNotUndefined(value, message) {
    if (_isUndefined(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotUndefined] Assertion failed: ${_toSafeString(value)} should be not undefined${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: undefined,
            operator: "==="
        });
    }
}
function isString(value, message) {
    if (!_isString(value)) {
        _errorCheck(message);
        let errorMessage = `[isString] Assertion failed: ${_toSafeString(value)} should be string${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "string",
            operator: "typeof !=="
        });
    }
}
function isNotString(value, message) {
    if (_isString(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotString] Assertion failed: ${_toSafeString(value)} should be not string${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "string",
            operator: "typeof ==="
        });
    }
}
function isNumber(value, message) {
    if (!_isNumber(value)) {
        _errorCheck(message);
        let errorMessage = `[isNumber] Assertion failed: ${_toSafeString(value)} should be number${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "number",
            operator: "typeof !=="
        });
    }
}
function isNotNumber(value, message) {
    if (_isNumber(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotNumber] Assertion failed: ${_toSafeString(value)} should be not number${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "number",
            operator: "typeof ==="
        });
    }
}
function isBigInt(value, message) {
    if (!_isBigInt(value)) {
        _errorCheck(message);
        let errorMessage = `[isBigInt] Assertion failed: ${_toSafeString(value)} should be bigint${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "bigint",
            operator: "typeof !=="
        });
    }
}
function isNotBigInt(value, message) {
    if (_isBigInt(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotBigInt] Assertion failed: ${_toSafeString(value)} should be not bigint${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "bigint",
            operator: "typeof ==="
        });
    }
}
function isBoolean(value, message) {
    if (!_isBoolean(value)) {
        _errorCheck(message);
        let errorMessage = `[isBoolean] Assertion failed: ${_toSafeString(value)} should be boolean${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "boolean",
            operator: "typeof !=="
        });
    }
}
function isNotBoolean(value, message) {
    if (_isBoolean(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotBoolean] Assertion failed: ${_toSafeString(value)} should be not boolean${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "boolean",
            operator: "typeof ==="
        });
    }
}
function isSymbol(value, message) {
    if (!_isSymbol(value)) {
        _errorCheck(message);
        let errorMessage = `[isSymbol] Assertion failed: ${_toSafeString(value)} should be symbol${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "symbol",
            operator: "typeof !=="
        });
    }
}
function isNotSymbol(value, message) {
    if (_isSymbol(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotSymbol] Assertion failed: ${_toSafeString(value)} should be not symbol${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "symbol",
            operator: "typeof ==="
        });
    }
}
function isFunction(value, message) {
    if (!_isFunction(value)) {
        _errorCheck(message);
        let errorMessage = `[isFunction] Assertion failed: ${_toSafeString(value)} should be function${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "function",
            operator: "typeof !=="
        });
    }
}
function isNotFunction(value, message) {
    if (_isFunction(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotFunction] Assertion failed: ${_toSafeString(value)} should be not function${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "function",
            operator: "typeof ==="
        });
    }
}
function isObject(value, message) {
    if (!_isObject(value)) {
        _errorCheck(message);
        let errorMessage = `[isObject] Assertion failed: ${_toSafeString(value)} should be object${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "object",
            operator: "typeof !=="
        });
    }
}
function isNotObject(value, message) {
    if (_isObject(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotObject] Assertion failed: ${_toSafeString(value)} should be not object${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "object",
            operator: "typeof ==="
        });
    }
}
function isPrimitive(value, message) {
    if (!_isPrimitive(value)) {
        _errorCheck(message);
        let errorMessage = `[isPrimitive] Assertion failed: ${_toSafeString(value)} should be not object or function${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isPrimitive"
        });
    }
}
function isNotPrimitive(value, message) {
    if (_isPrimitive(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotPrimitive] Assertion failed: ${_toSafeString(value)} should be object or function${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isNotPrimitive"
        });
    }
}
function isNaN(value, message) {
    if (typeof value !== "number" || !Number.isNaN(value)) {
        _errorCheck(message);
        let errorMessage = `[isNaN] Assertion failed: ${_toSafeString(value)} should be NaN${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isNaN"
        });
    }
}
function isNotNaN(value, message) {
    if (typeof value === "number" && Number.isNaN(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotNaN] Assertion failed: ${_toSafeString(value)} should be NaN${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isNaN"
        });
    }
}
function isEmpty(value, message) {
    if (!_isEmpty(value)) {
        _errorCheck(message);
        let errorMessage = `[isEmpty] Assertion failed: ${_toSafeString(value)} should be empty${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isEmpty"
        });
    }
}
function isNotEmpty(value, message) {
    if (_isEmpty(value)) {
        _errorCheck(message);
        let errorMessage = `[isNotEmpty] Assertion failed: ${_toSafeString(value)} should be not empty${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: "",
            operator: "isNotEmpty"
        });
    }
}
function match(string, regexp, message) {
    if (typeof string !== "string") {
        _errorCheck(message);
        throw new TypeError("[match] TypeError: " + string + " is not a string"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (!(regexp instanceof RegExp)) {
        _errorCheck(message);
        throw new TypeError("[match] TypeError: " + regexp + " is not a RegExp"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (!(regexp.test(String(string)))) {
        _errorCheck(message);
        let errorMessage = `[match] Assertion failed: ${_toSafeString(string)} is not matched with ${_toSafeString(regexp)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: string,
            expected: regexp,
            operator: "match"
        });
    }
}
function doesNotMatch(string, regexp, message) {
    if (typeof string !== "string") {
        _errorCheck(message);
        throw new TypeError("[doesNotMatch] TypeError: " + string + " is not a string"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (!(regexp instanceof RegExp)) {
        _errorCheck(message);
        throw new TypeError("[doesNotMatch] TypeError: " + regexp + " is not a RegExp"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (regexp.test(String(string))) {
        _errorCheck(message);
        let errorMessage = `[doesNotMatch] Assertion failed: ${_toSafeString(string)} is matched with ${_toSafeString(regexp)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: string,
            expected: regexp,
            operator: "doesNotMatch"
        });
    }
}
function lt(value1, value2, message) {
    if (!_isLessThan(value1, value2)) {
        _errorCheck(message);
        let errorMessage = `[lt] Assertion failed: ${_toSafeString(value1)} should be less than ${_toSafeString(value2)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value1,
            expected: value2,
            operator: "<"
        });
    }
}
function lte(value1, value2, message) {
    if (!_isLessThan(value1, value2) && !Object.is(value1, value2)) {
        _errorCheck(message);
        let errorMessage = `[lte] Assertion failed: ${_toSafeString(value1)} should be less than or equal ${_toSafeString(value2)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value1,
            expected: value2,
            operator: "< || Object.is();"
        });
    }
}
function gt(value1, value2, message) {
    if (!_isLessThan(value2, value1)) {
        _errorCheck(message);
        let errorMessage = `[gt] Assertion failed: ${_toSafeString(value1)} should be greater than ${_toSafeString(value2)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value1,
            expected: value2,
            operator: ">"
        });
    }
}
function gte(value1, value2, message) {
    if (!_isLessThan(value2, value1) && !Object.is(value1, value2)) {
        _errorCheck(message);
        let errorMessage = `[gte] Assertion failed: ${_toSafeString(value1)} should be greater than or equal ${value2}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value1,
            expected: value2,
            operator: "> || Object.is();"
        });
    }
}
function inRange(value, min, max, message) {
    if (!_inRange(value, min, max)) {
        _errorCheck(message);
        let errorMessage = `[inRange] Assertion failed: ${_toSafeString(value)} should be in range ${_toSafeString(min)} and ${max} or the type of the values are not the same${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: `${_toSafeString(min)} and ${_toSafeString(max)}`,
            operator: "inRange"
        });
    }
}
function notInRange(value, min, max, message) {
    if (_inRange(value, min, max)) {
        _errorCheck(message);
        let errorMessage = `[notInRange] Assertion failed: ${_toSafeString(value)} should be not in range ${_toSafeString(min)} and ${max}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: value,
            expected: `${_toSafeString(min)} and ${_toSafeString(max)}`,
            operator: "notInRange"
        });
    }
}
function stringContains(actual, substring, message) {
    if (typeof actual !== "string") {
        _errorCheck(message);
        throw new TypeError(`[stringContains] TypeError: ${_toSafeString(actual)} is not a string${message ? " - " + _toSafeString(message) : ""}`);
    }
    if (typeof substring !== "string") {
        _errorCheck(message);
        throw new TypeError(`[stringContains] TypeError: ${_toSafeString(substring)} is not a string${message ? " - " + _toSafeString(message) : ""}`);
    }
    if (!actual.includes(String(substring))) {
        _errorCheck(message);
        let errorMessage = `[stringContains] Assertion failed: ${_toSafeString(actual)} does not contain substring ${_toSafeString(substring)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual,
            expected: substring,
            operator: "stringContains"
        });
    }
}
function stringNotContains(actual, substring, message) {
    if (typeof actual !== "string") {
        _errorCheck(message);
        throw new TypeError(`[stringNotContains] TypeError: ${_toSafeString(actual)} is not a string${message ? " - " + _toSafeString(message) : ""}`);
    }
    if (typeof substring !== "string") {
        _errorCheck(message);
        throw new TypeError(`[stringNotContains] TypeError: ${_toSafeString(substring)} is not a string${message ? " - " + _toSafeString(message) : ""}`);
    }
    if (actual.includes(String(substring))) {
        _errorCheck(message);
        let errorMessage = `[stringNotContains] Assertion failed: ${_toSafeString(actual)} should not contain substring ${_toSafeString(substring)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual,
            expected: substring,
            operator: "stringNotContains"
        });
    }
}
function includes(container, options, message) {
    if (typeof options !== "object") {
        _errorCheck(message);
        throw new TypeError("[includes] TypeError: " + _toSafeString(options) + " is not an object"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (!_includes(container, options.keyOrValue, options?.value ?? undefined)) {
        _errorCheck(message);
        let errorMessage = `[includes] Assertion failed: ${_toSafeString(container)} does not include ${_toSafeString(options)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: container,
            expected: options,
            operator: "includes"
        });
    }
}
function doesNotInclude(container, options, message) {
    if (typeof options !== "object") {
        _errorCheck(message);
        throw new TypeError("[doesNotInclude] TypeError: " + _toSafeString(options) + " is not an object"
            + (message ? " - " + _toSafeString(message) : ""));
    }
    if (_includes(container, options.keyOrValue, options?.value ?? undefined)) {
        _errorCheck(message);
        let errorMessage = `[doesNotInclude] Assertion failed: ${_toSafeString(container)} does not include ${_toSafeString(options)}${message ? " - " + _toSafeString(message) : ""}`;
        throw new assert.AssertionError(errorMessage, {
            message: errorMessage,
            cause: errorMessage,
            actual: container,
            expected: options,
            operator: "doesNotInclude"
        });
    }
}
function testSync(block) {
    try {
        return { ok: true, value: block() };
    }
    catch (error) {
        return {
            ok: false,
            error: _isError(error) ? error : new Error(String(error)),
        };
    }
}
async function testAsync(block) {
    try {
        return { ok: true, value: await block() };
    }
    catch (error) {
        return {
            ok: false,
            error: _isError(error) ? error : new Error(String(error)),
        };
    }
}
function testCheck(result) {
    return result.ok;
}
assert["VERSION"] = VERSION;
assert["AssertionError"] = AssertionError;
assert["ok"] = ok;
assert["equal"] = equal;
assert["notEqual"] = notEqual;
assert["strictEqual"] = strictEqual;
assert["notStrictEqual"] = notStrictEqual;
assert["deepEqual"] = deepEqual;
assert["notDeepEqual"] = notDeepEqual;
assert["throws"] = throws;
assert["rejects"] = rejects;
assert["doesNotReject"] = doesNotReject;
assert["fail"] = fail;
assert["notOk"] = notOk;
assert["isTrue"] = isTrue;
assert["isFalse"] = isFalse;
assert["is"] = is;
assert["isNot"] = isNot;
assert["isNullish"] = isNullish;
assert["isNotNullish"] = isNotNullish;
assert["isNull"] = isNull;
assert["isNotNull"] = isNotNull;
assert["isUndefined"] = isUndefined;
assert["isNotUndefined"] = isNotUndefined;
assert["isString"] = isString;
assert["isNotString"] = isNotString;
assert["isNumber"] = isNumber;
assert["isNotNumber"] = isNotNumber;
assert["isBigInt"] = isBigInt;
assert["isNotBigInt"] = isNotBigInt;
assert["isBoolean"] = isBoolean;
assert["isNotBoolean"] = isNotBoolean;
assert["isSymbol"] = isSymbol;
assert["isNotSymbol"] = isNotSymbol;
assert["isFunction"] = isFunction;
assert["isNotFunction"] = isNotFunction;
assert["isObject"] = isObject;
assert["isNotObject"] = isNotObject;
assert["isPrimitive"] = isPrimitive;
assert["isNotPrimitive"] = isNotPrimitive;
assert["isNaN"] = isNaN;
assert["isNotNaN"] = isNotNaN;
assert["isEmpty"] = isEmpty;
assert["isNotEmpty"] = isNotEmpty;
assert["match"] = match;
assert["doesNotMatch"] = doesNotMatch;
assert["lt"] = lt;
assert["lte"] = lte;
assert["gt"] = gt;
assert["gte"] = gte;
assert["inRange"] = inRange;
assert["notInRange"] = notInRange;
assert["stringContains"] = stringContains;
assert["stringNotContains"] = stringNotContains;
assert["includes"] = includes;
assert["doesNotInclude"] = doesNotInclude;
assert["testSync"] = testSync;
assert["testAsync"] = testAsync;
assert["testCheck"] = testCheck;
export { assert };
export default assert;
