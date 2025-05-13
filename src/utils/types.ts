export const types = (value: any): string => 
    Object.prototype.toString.call(value).slice(8, -1);

export const isObject = (value: any): value is Record<string, any> => 
    types(value) === 'Object';

export const isArray = (value: any): value is Array<any> => 
    types(value) === 'Array';

export const isString = (value: any): value is string => 
    types(value) === 'String';

export const isNumber = (value: any): value is number => 
    types(value) === 'Number';

export const isBoolean = (value: any): value is boolean => 
    types(value) === 'Boolean';

export const isFunction = (value: any): value is Function => 
    types(value) === 'Function';

export const isDate = (value: any): value is Date => 
    types(value) === 'Date';

export const isRegExp = (value: any): value is RegExp => 
    types(value) === 'RegExp';

export const isError = (value: any): value is Error => 
    types(value) === 'Error';

export const isNull = (value: any): value is null => 
    types(value) === 'Null';

export const isUndefined = (value: any): value is undefined => 
    types(value) === 'Undefined';

export const isSymbol = (value: any): value is symbol => 
    types(value) === 'Symbol';

export const isClass = (value: any): value is Function => 
    types(value) === 'Function' && /^class\s/.test(value.toString());

export const isMap = (value: any): value is Map<any, any> => 
    types(value) === 'Map';

export const isSet = (value: any): value is Set<any> => 
    types(value) === 'Set';

export default {
    get: types,
    types,
    isObject,
    isArray,
    isString,
    isNumber,
    isBoolean,
    isFunction,
    isDate,
    isRegExp,
    isError,
    isNull,
    isUndefined,
    isSymbol,
    isClass,
    isMap,
    isSet
}