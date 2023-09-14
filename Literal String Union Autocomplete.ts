/*
Literal String Union Autocomplete
https://github.com/microsoft/TypeScript/issues/29729#issuecomment-567871939
both "hello" and "world" inherit string, 
they do not inherit string & {}, which means 
"hello" | "world" and string & {} are treated as distinguishable types.
*/
type HexColor = string & { hexish?: any};
interface Options {
	bordorColor: 'black' |  'blue' | 'red' | HexColor
};
const opt : Options = {
    bordorColor: 'black'
}



//https://github.com/sindresorhus/type-fest/blob/main/source/literal-union.d.ts
type LiteralUnion<
    LiteralType,
    BaseType extends Primitive,
> = LiteralType | (BaseType & Record<never, never>);

// Before
type Pet = 'dog' | 'cat' | string;

const pet0: Pet = '';

// Start typing in your TypeScript-enabled IDE.
// You **will not** get auto-completion for `dog` and `cat` literals.

// After
type Pet2 = LiteralUnion<'dog' | 'cat', string>;

const pet: Pet2 = '';
const pet2: Pet2 = ''
// You **will** get auto-completion for `dog` and `cat` literals.
    



//auto-completion 
type LiteralUnionHintFix<Sub,Super> = Sub | Omit<Super,Sub>;
type Test = LiteralUnionHintFix<"a" | "b" | "c", string>;
const testResult :Test = "a"; //Try editing this one!
const testResult2 :Test = 'b'
const testResult3 :Test = 'str'
const testResult4 :Test = 2



{
type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never }) //intellisense

//type LiteralUnion<T extends U, U = string> = T | (U & {}); // No intellisense

let x: LiteralUnion<"hello" | "world">;
x = "hey";

type Color = LiteralUnion<'red' | 'black'>

var c: Color = 'red'                 // Has intellisense
var d: Color = 'any-string'          // Any string is OK
var e: Color = { zz_IGNORE_ME: '' }  // { zz_IGNORE_ME } placeholder is at the bottom of intellisense list and errors because of never 
let c2: Color = 'black'              // Has intellisense
var c3: Color = ''

type Num = LiteralUnion<1 | 2, number> // Works with numbers too
let n: Num = 2
let n2: Num = 3
let n3: Num = 's'
let n4: Num = 1


type stringAndEmpty = string & {}
let s : stringAndEmpty = "hello"
let s2 : stringAndEmpty = {}
let s3 : stringAndEmpty = 10

type helloworldstr = "hello" | "world" | (string & {})
let hwstr : helloworldstr = "hello" | "world"
}



{
//https://artsy.github.io/blog/2023/03/01/typescript-magic/
type ColorDSValue = "black100" | "black80" | "blue100" | "red150" // | etc
type ColorOtherString = string & {}

type Color = ColorDSValue | ColorOtherString

const wow: ("hello" | "world") | (string & {}) // `wow` is of type `"hello"` or `"world"` or `string`.
}
/*
This weird-looking intersection of string & {} makes it so that the specific strings "hello" and "world" are distinguished from string as a whole type.

The way this works is this:

the intersection of string and {} (which is string & {}), is essentially the same as string, 
but it is a new type, different from string.
the union of "hello" and "world" is "hello" | "world", which is a new type, different from "hello" and "world". It contains both.
the union of "hello" | "world" and string expands the type to string, since that is the common type. 
"hello", "world", and "hello" | "world", all inherit from string.

the union of "hello" | "world" and string & {} is "hello" | "world" | (string & {}), 
which is a new type, different from just string. This is because 
"hello" and "world" DO NOT inherit from string & {}, so they are distinguished from string & {} as a whole type.
With this type trick, essentially we can tell the type system that we want specific string, but also any other string.
*/


/*
type UnpackedLiteralUnion<T> = T extends LiteralUnion<any, infer U> ? U : never

function something(arg: LiteralUnion<'a' | 'b'>): 'a' {
    let unpackedArg = arg as UnpackedLiteralUnion<typeof arg>;

    if (unpackedArg === "a") {
        return unpackedArg;
    }
    else {
        return "a";
    }
}
*/