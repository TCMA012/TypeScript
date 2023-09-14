/*
TypeScript satisfies operator
TypeScript 4.9
satisfies operator

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html
https://github.com/microsoft/TypeScript/issues/47920
https://github.com/microsoft/TypeScript/pull/46827

https://blog.logrocket.com/getting-started-typescript-satisfies-operator/
https://www.learningtypescript.com/articles/the-satisfies-operator
https://www.totaltypescript.com/clarifying-the-satisfies-operator
https://dev.to/ayc0/typescript-49-satisfies-operator-1e4i
https://www.builder.io/blog/satisfies-operator
https://patrickdesjardins.com/blog/how-to-use-typeScript-satisfies-operator-keyword


https://tomdohnal.com/posts/typescript-satisfies-keyword
https://www.typescriptlang.org/play?ts=4.9.0-dev.20221020#code/PTAEE8HsFdQCwIYDcCmoGgC7gA5oAYDCAltvlopqAMYIB2oARigFAigqlwoBOoRpcADkEAWxTlIfAdkKQpAE2J0EmFAGd8LbHlAlsoALx7BI8aAA+J2fJ5KVa9QG4WbMDOFiJoYuvSh1TB5lAHNQHhQcCPUUOkxQt1BIOjRIADMKDTRqUmINbVw0fU9zYwAiIRQAd1AATSkAazLLUDKAWWhRRgRiZqsygBkEEMh1MpdEjzlFZVUNcl90BkhGACsUaioqrkmAD3J6BX5wcijIPB54jVAFWMh4uhDEzG4aW3s5v3SIGD4AG0gtAeBV0xWmdlmjiMoAA3ixQKBdgAuUB0TrMHguBHgFForq8FwAXwmiQAdOTDpl+ABVGI8cg6NCIdSTRjES5wAaA1TEZIHOhHfDUaA8CJxLlA3l0fAAGkSjHucCSGSqcGI1CVCAiP1gjP4Ep5fJBaFpvGhcIRbI5xRRxSxNBFYswNus4CJE2oyUCoGgdJRpr4xgtTHZLxd7XRPTKcoRwtFsWdghRMMRKIAbDKICiAMygQly4muT10b1WsOCak4C60GLQ328UlluDFUmYSCVi6EBAxAAUAEoScXvfWeAAmc3wkPWpOtDpdKMxh3xuIulPI0AZrOgXP5liEgI89RpPJ+ANFr1UJvFDu8GsocfGEejxuh5uCVvtqu8Lu9gcsIA

https://chrisvaillancourt.io/posts/combining-typescript-satisfies-and-const-assertion/

https://netbasal.com/why-you-should-avoid-using-type-assertion-in-typescript-e44e8217cae5

?
https://tusharf5.com/posts/typescript-satisfies-operator/
?

The new satisfies operator lets us validate that the type of an expression matches some type, without changing the resulting type of that expression.
*/

// colon annotation
let id: string | number = "123";
if (typeof numericId !== "undefined") {
  id = numericId;
}
// satisfies
let id = "123" satisfies string | number;
if (typeof numericId !== "undefined") {
  // Type 'number' is not assignable to type 'string'.
  id = numericId;
}
/*
The rule of thumb is that you should only use satisfies in two specific situations:

You want the EXACT type of the variable, not the WIDER type.
The type is complex enough that you want to make sure you didn’t mess it up
*/

/*
Safe Upcast
to "undo" the specificity of an initializer
*/
type Animal = { kind: "cat", meows: true } | { kind: "dog", barks: true };
let p = { kind: "cat", meows: true } satisfies Animal;

/*
Property Name Constraining
make a lookup table where the property keys must come from some predefined subset, but not lose type information about what each property's value was
*/
type Keys = 'a' | 'b' | 'c' | 'd';
const p = {
    a: 0,
    b: "hello",
    x: 8 // Should error, 'x' isn't in 'Keys'
} satisfies Partial<Record<Keys, unknown>>;
// using 'Partial' to indicate it's OK 'd' is missing

/*
Property Name Fulfillment
Same as Property Name Constraining, except we might want to ensure that we get all of the keys:
*/
type Keys = 'a' | 'b' | 'c' | 'd';

const p = {
    a: 0,
    b: "hello",
    c: true
    // will error because 'd' is missing
} satisfies Record<Keys, unknown>;

/*
Property Value Conformance
This is the flipside of Property Name Constraining - we might want to make sure that all property values in an object conform to some type, but still keep record of which keys are present:
*/
export type Color = { r: number, g: number, b: number };

const Palette = {
    white: { r: 255, g: 255, b: 255},
    black: { r: 0, g: 0, d: 0}, // <- error is now detected
    blue: { r: 0, g: 0, b: 255 },
} satisfies Record<string, Color>;

/*
Ensure Interface Implementation
leverage type inference, but still check that something conforms to an interface and use that interface to provide contextual typing:
*/
type Movable = {
    move(distance: number): void;
};

const car = {
    start() { },
    move(d) {
        // d: number
    },
    stop() { }
} satisfies Moveable;

/*
Optional Member Conformance
initialize a value conforming to some weakly-typed interface:
*/


/*
Optional Member Addition
Conversely, we might want to safely initialize a variable according to some type but retain information about the members which aren't present:
*/


/*
Contextual Typing
TypeScript has a process called contextual typing in which expressions which would otherwise not have an inferrable type can get an inferred type from context:
*/

/*
@kasperpeulen good questions, and ones I should have put in the OP. Arrays contextually typed by a tuple type retain their tupleness, and numeric literals contextually typed by a union containing a matching numeric literal type retain their literal types, so these would behave exactly as hoped (assuming contextual typing is retained).
*/