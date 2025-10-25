type StringLike = string | String;
type AssertionErrorOptions = {
    message?: unknown;
    cause?: unknown;
    actual?: unknown;
    expected?: unknown;
    operator?: string;
    stackStartFn?: Function;
    diff?: any;
};
type TestResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: Error;
};
type ExpectedType = string | Function | Array<string | Function>;
type IncludesOptions = {
    keyOrValue: any;
    value?: any;
};
type Nullish = null | undefined;
type NonNullablePrimitive = number | bigint | boolean | string | symbol;
type Primitive = Nullish | NonNullablePrimitive;
type NonPrimitive = object | Function;
type AllType = Primitive | NonPrimitive;
type NonUndefined = Exclude<AllType, undefined>;
type NonNull = Exclude<AllType, null>;
type NonNumber = Exclude<AllType, number>;
type NonBigInt = Exclude<AllType, bigint>;
type NonBoolean = Exclude<AllType, boolean>;
type NonString = Exclude<AllType, string>;
type NonSymbol = Exclude<AllType, symbol>;
type NonObject = (Exclude<AllType, object>) | Function;
type NonFunction = Exclude<AllType, Function>;
declare class AssertionError extends Error {
    actual?: unknown;
    expected?: unknown;
    operator?: string;
    code?: string;
    constructor(message: string, options?: AssertionErrorOptions);
}
declare function assert(condition: unknown, message?: unknown): asserts condition;
declare namespace assert {
    var VERSION: string;
    var AssertionError: {
        new (message: string, options?: AssertionErrorOptions): AssertionError;
        isError(error: unknown): error is Error;
    };
    var ok: (condition: unknown, message?: unknown) => asserts condition;
    var equal: (actual: unknown, expected: unknown, message?: unknown) => void;
    var notEqual: (actual: unknown, expected: unknown, message?: unknown) => void;
    var strictEqual: (actual: unknown, expected: unknown, message?: unknown) => void;
    var notStrictEqual: (actual: unknown, expected: unknown, message?: unknown) => void;
    var deepEqual: (actual: unknown, expected: unknown, message?: unknown) => void;
    var notDeepEqual: (actual: unknown, expected: unknown, message?: unknown) => void;
    var throws: (block: Function, Error_opt?: unknown, message?: unknown) => Error | undefined;
    var rejects: (block: Function | Promise<any>, Error_opt?: unknown, message?: unknown) => Promise<any>;
    var doesNotReject: (block: Function, Error_opt?: unknown, message?: unknown) => Promise<any>;
    var fail: (message?: unknown) => void;
    var notOk: (condition: unknown, message?: unknown) => void;
    var isTrue: (condition: unknown, message?: unknown) => asserts condition is true;
    var isFalse: (condition: unknown, message?: unknown) => asserts condition is false;
    var is: (value: unknown, expectedType: ExpectedType, message?: unknown) => void;
    var isNot: (value: unknown, expectedType: ExpectedType, message?: unknown) => void;
    var isNullish: (value: unknown, message?: unknown) => asserts value is Nullish;
    var isNotNullish: (value: unknown, message?: unknown) => asserts value is NonNullable<unknown>;
    var isNull: (value: unknown, message?: unknown) => asserts value is null;
    var isNotNull: (value: unknown, message?: unknown) => asserts value is NonNull;
    var isUndefined: (value: unknown, message?: unknown) => asserts value is undefined;
    var isNotUndefined: (value: unknown, message?: unknown) => asserts value is NonUndefined;
    var isString: (value: unknown, message?: unknown) => asserts value is string;
    var isNotString: (value: unknown, message?: unknown) => asserts value is NonString;
    var isNumber: (value: unknown, message?: unknown) => asserts value is number;
    var isNotNumber: (value: unknown, message?: unknown) => asserts value is NonNumber;
    var isBigInt: (value: unknown, message?: unknown) => asserts value is bigint;
    var isNotBigInt: (value: unknown, message?: unknown) => asserts value is NonBigInt;
    var isBoolean: (value: unknown, message?: unknown) => asserts value is boolean;
    var isNotBoolean: (value: unknown, message?: unknown) => asserts value is NonBoolean;
    var isSymbol: (value: unknown, message?: unknown) => asserts value is symbol;
    var isNotSymbol: (value: unknown, message?: unknown) => asserts value is NonSymbol;
    var isFunction: (value: unknown, message?: unknown) => asserts value is Function;
    var isNotFunction: (value: unknown, message?: unknown) => asserts value is NonFunction;
    var isObject: (value: unknown, message?: unknown) => asserts value is object;
    var isNotObject: (value: unknown, message?: unknown) => asserts value is NonObject;
    var isPrimitive: (value: unknown, message?: unknown) => asserts value is Primitive;
    var isNotPrimitive: (value: unknown, message?: unknown) => asserts value is NonPrimitive;
    var isNaN: (value: unknown, message?: unknown) => void;
    var isNotNaN: (value: unknown, message?: unknown) => void;
    var isEmpty: (value: unknown, message?: unknown) => void;
    var isNotEmpty: (value: unknown, message?: unknown) => void;
    var match: (string: StringLike, regexp: RegExp, message?: unknown) => void;
    var doesNotMatch: (string: StringLike, regexp: RegExp, message?: unknown) => void;
    var lt: (value1: any, value2: any, message?: unknown) => void;
    var lte: (value1: any, value2: any, message?: any) => void;
    var gt: (value1: any, value2: any, message?: any) => void;
    var gte: (value1: any, value2: any, message?: unknown) => void;
    var stringContains: (actual: StringLike, substring: StringLike, message?: unknown) => void;
    var stringNotContains: (actual: StringLike, substring: StringLike, message?: unknown) => void;
    var includes: (container: any, options: IncludesOptions, message?: unknown) => void;
    var doesNotInclude: (container: any, options: IncludesOptions, message?: unknown) => void;
    var testSync: <T>(block: () => T) => TestResult<T>;
    var testAsync: <T>(block: () => Promise<T>) => Promise<TestResult<T>>;
    var testCheck: <T>(result: TestResult<T>) => result is {
        ok: true;
        value: T;
    };
}
export { assert };
export default assert;
//# sourceMappingURL=assert.d.ts.map