/*
indexed access types
lookup types
*/
interface I1 {
    x: any;
}

interface I2 {
    y: {
        a: I1,
        b: I1,
        c: I1
    }
    z: any
}

let myVar: I2['y'];  // indexed access type
// the type of I2.y



interface A {
    prop: {
        name: string;
        age: number;
    }
}
type A_Prop = A['prop']
const myThing: A_Prop = { name: 'June', age: 29 };



type Config = {
    key: "start_time",
    value: number,
} | {
    key: "currency",
    value: string,
}
export type ConfigKey = Config["key"];
// "start_time"|"currency"



interface Colors {
    white: "#fff"
    black: "#000"
}
type ColorValues = Colors[keyof Colors]
  // ColorValues = "#fff" | "#000"



/*
typeof behaves differently when called on javascript objects, to when it is called on typescript types.

TypeScript uses javascript's typeof when called on javascript values at runtime and 
returns one of "undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function"
TypeScript's typeof is called on type values, but can 
also be called on javascript values when in a type expression. It can also 
infer the type of javascript objects, returning a more detailed object type.
*/
type Language = 'EN' | 'ES'; 
const userLanguage: Language = 'EN';
const preferences = { language: userLanguage, theme: 'light' };

console.log(typeof preferences); // "object"
type Preferences = typeof preferences; // type '{language: 'EN''; theme: string; }'
/*
Because the second typeof preferences is in a type expression it is actually TypeScript's own typeof that get called, and 
not javascript's.

keyof typeof
Because keyof is a TypeScript concept we will be calling TypeScript's verion of typeof.

keyof typeof will infer the type of a javascript object and
return a type that is the union of its keys. 
Because it can infer the exact value of the keys it can return a union of their literal types instead of just returning "string".
*/
type PreferenceKeys = keyof typeof preferences; // type '"language" | "theme"'



/*
some things are types and values at the same time.

This is true for:

classes,
enums,
namespaces.
When can you use keyof?

The keyof keyword only works on the type level. You cannot apply it to a JavaScript value.

When do you need keyof typeof?

When you're dealing with something that is a type and a value at the same time (like a class or an enum), 
but you're interested specifically in what the type of that value is.
*/
const foo = { bar: 42 }; // foo is a value
type Footype = typeof foo; // Foo is the type of foo

type KeyOfFoo = keyof Footype; // "keyof Foo" is the same as "keyof typeof foo", which is "bar"
//In general, when you see this:
type A0 = keyof typeof B;
type Akeyoftypeof = keyof typeof foo;
/*
the typeof B part tells TypeScript to look at the type of B. You can think of it as casting B to its type. 
Sort of like casting a two-dimensional object to a one-dimensional space.

Since typeof B is a type, not a value, we can now use keyof on it.

Example

Classes are types and values. You can call them, but you can also use keyof on them.
*/
declare class Foo {
    static staticProperty: string;

    dynamicProperty: string;
}

type Constructor = typeof Foo;
type Instance = Foo;

type A2 = keyof Constructor; // "prototype" | "staticProperty"
type B = keyof Instance; // "dynamicProperty"
//By using typeof together with keyof, we can toggle between using keyof against the instance type and the constructor type.