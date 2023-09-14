/*
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html
const assertions
a new construct for literal values called const assertions. 
Its syntax is a type assertion with const in place of the type name (e.g. 123 as const). 
When we construct new literal expressions with const assertions, 
we can signal to the language that

no literal types in that expression should be widened (e.g. no going from "hello" to string)
object literals get readonly properties
array literals become readonly tuples

needed no type annotations.




A const assertion tells the compiler to infer the narrowest* or most specific type it can for an expression. 
If you leave it off, the compiler will use its default type inference behavior, 
which will possibly result in a wider or more general type.
Note that it is called an "assertion" and not a "cast". 
The term "cast" is generally to be avoided in TypeScript; 
when people say "cast" they often imply some sort of effect that can be observed at runtime, but TypeScript's type system, 
including type assertions and const assertions, is completely erased from the emitted JavaScript. 
So there is absolutely no difference at runtime between a program that uses 
as const 
and one that does not.



This isn't strictly true for array and tuple types; 
a readonly array or tuple is technically wider than a mutable version. 
A mutable array is considered a subtype of a readonly array; 
the former is not known to have mutation methods like push() while the latter does.
*/
// Type '"hello"'
let x = "hello" as const;
// Type 'readonly [10, 20]'
let y = [10, 20] as const;
// Type '{ readonly text: "hello" }'
let z = { text: "hello" } as const;
//Outside of .tsx files, the angle bracket assertion syntax can also be used.
//Type '"Orange"'
let fruit = <const> 'Orange';



//enable enum-like patterns
export const Colors = {
  red: "RED",
  blue: "BLUE",
  green: "GREEN",
} as const;

// or use an 'export default'
export default {
  red: "RED",
  blue: "BLUE",
  green: "GREEN",
} as const;