/*
https://www.technicalfeeder.com/2021/07/mastering-enum-in-typescript/
Typescript enum get value by key and key by value
mastering-enum-eye-catchJavaScript/TypeScript

Enum is useful when we want to use predefined values. 
Sometimes we want to get a certain key linked to a value and the other way around. 
Javascript/Typescript doesn’t offer a simple way at the moment. Therefore, we need a simple trick for it. 

We can define enum with and without value. Consecutive numbers are assigned when it’s defined without value.
*/
enum WithoutValues {
    First,
    Second,
    Third,
}
console.log(WithoutValues.First);
console.log(WithoutValues.Second);
console.log(WithoutValues.Third);
// 0
// 1
// 2

// defining one value
enum WithValues1 {
    First = 5,
    Second,
    Third,
}
console.log(WithValues1.First);
console.log(WithValues1.Second);
console.log(WithValues1.Third);
// 5
// 6
// 7

// assign a value placed in the middle. A consecutive number is assigned again after the value defined property.
enum WithValues2 {
    First,
    Second = 5,
    Third,
}
console.log(WithValues2.First);
console.log(WithValues2.Second);
console.log(WithValues2.Third);
// 0
// 5
// 6

//assign values to all properties and assign string as well.
enum LogLevel {
    Trace = -20,
    Debug = -10,
    Info = 0,
    Warn = 10,
    Error = 20,
    Off = 99,
}

enum LogLevelString {
    Trace = "Trace-Level",
    Debug = "Debug-Level",
    Info = "Info-Level",
    Warn = "Warn-Level",
    Error = "Error-Level",
    Off = "Off-Level",
}
console.log(LogLevel.Error);
console.log(LogLevelString.Error);
// 20
// Error-Level

/*
How to get key list
You might think it’s easy to get key list by using Object.keys() function.
*/
console.log(Object.keys(LogLevel));
// [
//   '0',     '10',    '20',
//   '99',    'Trace', '-20',
//   'Debug', '-10',   'Info',
//   'Warn',  'Error', 'Off'
// ]
console.log(Object.keys(LogLevelString));
// [ 'Trace', 'Debug', 'Info', 'Warn', 'Error', 'Off' ]
/*
Oops! Its result doesn’t look like what we expected when number is assigned whereas string enum looks what we expected. 
We need to somehow filter it to get only keys. If the enum contains only number following code works to get keys.
*/
enum LogLevel {
    Trace = -20,
    Debug = -10,
    Info = 0,
    Warn = 10,
    Error = 20,
    Off = 99,
}
const keys = Object.keys(LogLevel).filter((x) => Number.isNaN(Number(x)));
console.log(keys);  // keys
// [ 'Trace', 'Debug', 'Info', 'Warn', 'Error', 'Off' ]

/*
How to get value list
When we want to get value list we can write like this below since Key is always string.
*/
enum LogLevel {
    Trace = -20,
    Debug = -10,
    Info = 0,
    Warn = 10,
    Error = 20,
    Off = 99,
}
const values = Object.keys(LogLevel).filter((x) => !Number.isNaN(Number(x)));
console.log(values);
// [ '0', '10', '20', '99', '-20', '-10' ]
//If the enum contains only string it’s easy.
enum LogLevelString {
    Trace = "Trace-Level",
    Debug = "Debug-Level",
    Info = "Info-Level",
    Warn = "Warn-Level",
    Error = "Error-Level",
    Off = "Off-Level",
}
console.log(Object.values(LogLevelString));
// [
//   'Trace-Level',
//   'Debug-Level',
//   'Info-Level',
//   'Warn-Level',
//   'Error-Level',
//   'Off-Level'
// ]
/*
How to check if the value is in the enum
Sometimes we need to check if the value is in the enum. It’s easy to do it if the value is number.
*/
enum LogLevel {
    Info = 0,
    Warn = 10,
    Error = 20,
}
console.log(10 in LogLevel);
// true
console.log(11 in LogLevel);
// false
//Specify your target variable at left side and use in keyword but it doesn’t work for string enum.
enum LogLevelString {
    Trace = "Trace-Level",
    Debug = "Debug-Level",
}

enum MixEnum {
    Trace = -20,
    Debug = "Debug-Level",
}
console.log("Debug-Level" in LogLevelString);
// false
console.log(-20 in MixEnum);
// true
console.log("Debug-Level" in MixEnum);
// false

/*
If the specified value is number it works even though the enum contains both number and string. 
However, we need a different way for string. Let’s use Object.values() function shown above.
*/
enum LogLevelString {
    Trace = "Trace-Level",
    Debug = "Debug-Level",
}
const exists = (value: string) => Object.values(LogLevelString).includes(value as any);
console.log(exists("Debug-Level"));
// true
console.log(exists("Undefined-Level"));
// false
/*
How to get key name by value
It’s straightforward if it is number enum.
*/
enum LogLevel {
    Trace = -20,
    Debug = -10,
    Info = 0,
    Warn = 10,
    Error = 20,
    Off = 99,
}
function getKeyName(value: LogLevel) {
    return LogLevel[value];
}
console.log(getKeyName(-20));
// Trace
console.log(getKeyName(-22));
// undefined
//If it is string enum we need a trick because the compiler shows the following error.
enum LogLevelString {
    Trace = "Trace-Level",
    Debug = "Debug-Level",
    Info = "Info-Level",
    Warn = "Warn-Level",
    Error = "Error-Level",
    Off = "Off-Level",
}
function getKeyName(value: string) {
    return LogLevelString[value];
//   Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof LogLevelString'.
//   No index signature with a parameter of type 'string' was found on type 'typeof LogLevelString'.ts(7053)
}
//An alternative way
function getKeyName(value: string) {
    return Object.entries(LogLevelString).find(([key, val]) => val === value)?.[0];
}
console.log(getKeyName("Warn-Level"));
// Warn
console.log(getKeyName("Undefined-Level"));
// undefined

/*
How to get value by key name
We can get the target value directly if the specified string is one of the keys of the enum. 
However, the compiler shows an error message when defining a function for it because it doesn’t accept string value in [].
*/
enum LogLevel {
    Trace = -20,
    Debug = -10,
    Info = 0,
    Warn = 10,
    Error = 20,
    Off = 99,
}
console.log(LogLevel["Warn"]);
// 10

function getValueByKeyError(value: string) {
    return LogLevel[value];
    // Element implicitly has an 'any' type because index expression is not of type 'number'.ts(7015)
}
//Following code can solve the problem.
function getValueByKeyForNumberEnum(value: string) {
    return Object.entries(LogLevel).find(([key, val]) => key === value)?.[1];
}
function getValueByKeyForStringEnum(value: string) {
    return Object.entries(LogLevelString).find(([key, val]) => key === value)?.[1];
}
console.log(getValueByKeyForNumberEnum("Error"));
// 20
console.log(getValueByKeyForStringEnum("Warn"));
// Warn-Level
console.log(getValueByKeyForStringEnum("Error"));
// Error-Level

/*
How to handle when an enum contains both number and string
Both key and value are contained only when the value is number. 
It means that we can get desired keys and values when we exclude it.
*/
enum MixEnum {
    Trace = -20,
    Debug = "Debug-Level",
    Info = "Info",
}
console.log(Object.keys(MixEnum));
// [ 'Trace', '-20', 'Debug', 'Info' ]
console.log(Object.values(MixEnum));
// [ -20, 'Trace', 'Debug-Level', 'Info' ]

const keyList = Object.keys(MixEnum).filter((x) => Number.isNaN(Number(x)));
console.log(keyList);
// [ 'Trace', 'Debug', 'Info' ]

const valueList = Object.values(MixEnum).filter((val) => {
    const keys = Object.keys(MixEnum).filter((x) => Number.isNaN(Number(x)));
    return !keys.includes(val as any);
});
console.log(valueList);
// [ -20, 'Debug-Level' ]


//Use Enum as object key
type MixEnumKey = { [key in MixEnum]: unknown };
const obj1: MixEnumKey = {
    [MixEnum.Debug]: "aaaa",
    [MixEnum.Info]: 123,
    [MixEnum.Trace]: "cccc",
};
//It can be replaced with the following definition.
type MixEnumKey2 = Record<MixEnum, unknown>;
const obj3: MixEnumKey2 = {
    [MixEnum.Debug]: "aaaa",
    [MixEnum.Info]: 123,
    [MixEnum.Trace]: "cccc",
};

//If there is a property that is not included in the MixEnum, an error is shown.
const obj4: MixEnumKey = {
    [MixEnum.Debug]: "aaaa",
    [MixEnum.Info]: 123,
    [MixEnum.Trace]: "cccc",
    // Type '{ "Debug-Level": string; Info: number; [-20]: string; abc: string; }' is not assignable to type 'MixEnumKey'.
    // Object literal may only specify known properties, and '["abc"]' does not exist in type 'MixEnumKey'.ts(2322)
    ["abc"]: "cccc",
};

//Likewise, an error is shown if one of the properties is missing.
// 'obj' is declared but its value is never read.ts(6133)
// Property '[-20]' is missing in type '{ "Debug-Level": string; Info: number; }' but required in type 'MixEnumKey2'.ts(2741)  
const obj5: MixEnumKey2 = {
    [MixEnum.Debug]: "aaaa",
    [MixEnum.Info]: 123,
};
//If all properties are not necessary, add a question mark.
type NullableMixEnumKey = { [key in MixEnum]?: unknown };
const obj2: NullableMixEnumKey = {
    [MixEnum.Debug]: "aaaa",
    [MixEnum.Info]: 123,
};
/*
Is it possible to use generic function for enum?
I thought it was useful if I could create a function to check if the specified value is in the enum or 
to get key/value. 
However, it’s impossible to use generics for enum at the moment. What I wanted to do was something like this below.
*/
function getValueByKey<T extends enum>(value: string) {
    return Object.entries(T).find(([key, val]) => key === value)?.[1];
}
//However, it’s impossible because T is just a type. Object.entries() function requires an object instead.