/*
https://effectivetypescript.com/
https://github.com/danvk/effective-typescript
https://github.com/danvk/literate-ts

Effective TypeScript

Dan Vanderkam


assignable:
member of (for a relationship between a value and a type)
subset of (for a relationship between two types)

extends (a constraint in a generic type):
subset of (for a relationship between two types)

subtype 

| union
& intersection
*/
keyof(A | B) = (keyof A) & (keyof B)
keyof(A & B) = (keyof A) | (keyof B)


/*
value space:
| bitwise OR
& bitwise AND




TypeScript types are erasable : part of compilation to JavaScript is removing all the interfaces, types, and type annotations from your code.

Some constructs introduce both a type (which is not available at runtime) and a value (which is). 
The class keyword is one of these.


No TypeScript type for all the integers.
TypeScript's type system models the runtime behavior of JavaScript.
So long as your TypeScript is valid JavaScript (and often even if it isn't), the TypeScript compiler will produce output. it's better to say that your code has errors, or that it "doesn't type check."

Declaration merging is useful for the different standards of JS because as methods get added to proper interfaces like Array, TypeScript can merge the interface declarations into one, which ensures the interface has both older and newer methods.
If you publishing type declarations for your API, then it might be helpful for your users to be able to merge in new fields via an interface when the API changes. So use interface. But for a type that's used internally in your project, declaration merging is likely to be a mistake. So prefer type.

Structural typing: values assignable to your interface might have properties beyond those explicitly listed in your type declarations. Type is not "sealed".

Mapped types are the type system equivalent of looping over the fields in an array.



https://github.com/vendingcompute/effective-typescript

https://github.com/jsjoeio/effective-typescript-notes
*/

namespace independent02 {
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  //Check for the presence of a property at runtime
  if ('height' in shape) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
}

/*
The Rectangle in
type Shape = Square | Rectangle;
refers to the type

The Rectangle in
shape instanceof Rectangle
refers to the value
*/

/*
Lists of numbers which are not pairs of numbers:
empty list and the list [1] are examples

number[] is not assignable to [number, number] since it's not a subset of it (The reverse assignment does work)

Tuple
A tuple is a data structure that stores a specific number of elements. These elements may include integers, strings, or other data types.
A tuple is a finite ordered list of elements. An n-tuple is a sequence of n elements, where n is a non-negative integer.
A generalization of ordered pairs, such as (-3, 4), and ordered triples, such as (0, -3, 5).
*/
namespace typesassets17 {
  const list = [1, 2];  // Type is number[]
  const tuple: [number, number] = list;
   // ~~~~~ Type 'number[]' is missing the following
   //       properties from type '[number, number]': 0, 1
}


/*
Item 8: Know How to Tell Whether a Symbol Is in the Type Space or Value Space

The symbols after a type declaration (:) or an assertion (as) are in type space
Everything after an = is in value space.

The class and enum constructs introduce both a type and a value.

In a type context, typeof takes a value and returns its TypeScript type.
In a value context, typeof is JavaScript's runtime typeof operator:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
*/



/*
Item 11 Excess Property Checking
Strict object literal Checking
it check whether the object has the exact properties
*/
interface Options {
  allowed?: string;
}

type Exactly<T, U> = T & Record<Exclude<keyof U, keyof T>, never>;
function test<T extends Exactly<Options, T>>(options: T) {
  return options;
}

const okay = { allowed: "okay" };
test(okay); // no error

const excess = {
  allowed: 'allowed',
  notAllowed: 'notAllowed',
};
test(excess); // error 



interface Person { name: string }

const people = ['alice', 'bob', 'jan'].map(
    (name): Person => ({ name })
); // Type is Person[]

//or written the final desired type
const peopleSame: Person[] = ['alice', 'bob', 'jan'].map(
    (name): Person => ({ name })
); // Type is Person[]



// As a suffix, ! is interpreted as an assertion that the value is non-null
const elNull = document.getElementById('foo');  // Type is HTMLElement | null
const el = document.getElementById('foo')!; // Type is HTMLElement



/*
Jon Postel, called Postel's Law:
TCP implementation should follow a general principle of robustness: be conservative in what you do, be liberal in what you accept from others. (Vanderkam 122)
function contracts: Be broad in terms of input you accept, but be specific in what they produce.
*/



/*
Item 12: Apply Types to Entire Function Expressions
A check that the return type of all the function expressions is number
*/
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;



/*
We used a function expression and applied a type (typeof fetch) to the entire function.
This allows TypeScript to infer the types of the input and init parameters.
The type annotation also guarantees that the return type of checkedFetch will be the same as that of fetch.

In addition to being more concise, typing this entire function expression instead of its parameters has given you better safety.
*/
const checkedFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error('Request failed: ' + response.status);
    }
    return response;
}



//There are union types but no union interfaces



//Item 14: Use Type Operations and Generics to Avoid Repeating Yourself
// HIDE
interface Options { }
// END
type HTTPFunction = (url: string, options: Options) => Promise<Response>;
const get: HTTPFunction = (url, options) => { /* COMPRESS */ return Promise.resolve(new Response()); /* END */ };
const post: HTTPFunction = (url, options) => { /* COMPRESS */ return Promise.resolve(new Response()); /* END */ };



interface Person {
    firstName: string;
    lastName: string;
}

interface PersonWithBirthDate extends Person {
    birth: Date;
}



{
//Mapped types
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
}



{
interface SaveAction {
    type: 'save';
    // ...
}
interface LoadAction {
    type: 'load';
    // ...
}
type Action = SaveAction | LoadAction;
type ActionType = Action['type'];  // Type is "save" | "load" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

type ActionRec = Pick<Action, 'type'>;  // {type: "save" | "load"}



interface Options {
    width: number;
    height: number;
    color: string;
    label: string;
}
class UIWidget {
    constructor(init: Options) { /* ... */ }
    update(options: Partial<Options>) { /* ... */ }
}



function getUserInfo(userId: string) {
    // COMPRESS
    const name = 'Bob';
    const age = 12;
    const height = 48;
    const weight = 70;
    const favoriteColor = 'blue';
    // END
    return {
      userId,
      name,
      age,
      height,
      weight,
      favoriteColor,
    };
}
// Return type inferred as { userId: string; name: string; age: number, ... }
  
type UserInfo = ReturnType<typeof getUserInfo>;
}

/*
15. Use Index Signatures for Dynamic Data
e.g. CSV file, where you have a header row and want to represent data rows as objects mapping column names to values
*/

/*
Numbers cannot be used as keys.
The Javascript runtime will convert a number to a string for a property name.
number as an index signature is a TypeScript construct designed to catch bugs.
*/


/*
TypeScript builtin 
src/lib/es5.d.ts

[n: number] is an index signature. An object can be indexed using a string or a number in typescript (ie o[0] or o['prop']).
This is telling the compiler that we can use a number to index into an object of type ArrayLike<T> and that the indexer will return a T. The name of the index parameter (n in this case) does not have much relevance except for documentation purposes. 
*/
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}



readonly string[][] // readonly array of mutable arrays
(readonly string[])[] // mutable array of readonly string[]



/*
Item 17: Use readonly to Avoid Errors Associated with Mutation


number[] is strictly more capable than readonly number[], it follows that number[] is a subtype of readonly number[].
Can assign a mutable array to a readonly array.
Cannot assign a readonly array to a mutable array.



readonly is shallow



Use a library rather than rolling your own.
DeepReadonly ts-essentials package
TypeScript types
https://github.com/ts-essentials/ts-essentials
*/


/*
Item 18: Use Mapped Types to Keep Values in Sync

The [k in keyof ScatterProps] tells the type checker that 
REQUIRES_UPDATE
should have all the same properties as
ScatterProps.
Adding a new property to
ScatterProps
will produce an error in the definition of
REQUIRES_UPDATE

An object with boolean values work. An array does not work.
*/
interface ScatterProps {
    // The data
    xs: number[];
    ys: number[];
  
    // Display
    xRange: [number, number];
    yRange: [number, number];
    color: string;
  
    // Events
    onClick: (x: number, y: number, index: number) => void;
  }
  const REQUIRES_UPDATE: {[k in keyof ScatterProps]: boolean} = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false,
  };
  
  function shouldUpdate(
    oldProps: ScatterProps,
    newProps: ScatterProps
  ) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
      if (oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
        return true;
      }
    }
    return false;
  }
  
/*
21. Understand Type Widening

needs to decide on a set of possible values from the single value that you specified

declare a variable with const gets a narrower type

when you write 
as const
 after a value, TS will infer the narrowest possible type for it
*/



/*
22. Understand Type Narrowing

instanceof
in
isArray
*/
function contains(text: string, search: string|RegExp) {
  if (search instanceof RegExp) {
    search  // Type is RegExp
    return !!search.exec(text);
  }
  search  // Type is string
  return text.includes(search);
}



interface A { a: number }
interface B { b: number }
function pickAB(ab: A | B) {
  if ('a' in ab) {
    ab // Type is A
  } else {
    ab // Type is B
  }
  ab // Type is A | B
}




/*
User-defined type guard
*/
function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}



/*
Item 23: Create Objects All at Once
use the object spread operator

To conditionally add a property in a type-safe way, 
use spread with null or {}, which add no properties
*/
{
interface Point { x: number; y: number; }
const pt = {x: 3, y: 4};
const id = {name: 'Pythagoras'};
const namedPoint = {...pt, ...id};
namedPoint.name;  // OK, type is string

declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
const president = {...firstLast, ...(hasMiddle ? {middle: 'S'} : {})};
}

{
declare let hasMiddle: boolean;
const firstLast = {first: 'Harry', last: 'Truman'};
function addOptional<T extends object, U extends object>(
  a: T, b: U | null
): T & Partial<U> {
  return {...a, ...b};
}

const president = addOptional(firstLast, hasMiddle ? {middle: 'S'} : null);
president.middle  // OK, type is string | undefined
}

/*
lodash zipObject
Array.prototype.flat
*/

/*
28 Prefer Types That Always Represent Valid States
tagged union
discriminated union
valid-states-06.ts
*/
{
interface RequestPending {
  state: 'pending';
}
interface RequestError {
  state: 'error';
  error: string;
}
interface RequestSuccess {
  state: 'ok';
  pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: {[page: string]: RequestState};
}
}



/*
Item 29: Be Liberal in What You Accept and Strict in What You Produce

Postel's Law - Jon Postel
Be liberal in what you accept, and conservative in what you send.
Strict in what it produces.



Distinguish a canonical format for coordinates.
Following JavaScript's convention of distinguishing "Array" and 
"ArrayLike" (item 16),
draw a distinction between 
LngLat and 
LngLatLike. (https://github.com/mapbox/ Mapbox . GeoJSON )

Distinguish between a fully defined
Camera
type and the 
partial version accepted by 
setCamera.

The loose
CameraOptions
type adapts the stricter
Camera
type (item 14).

Using
Partial<Camera>
as the parameter type in
setCamera
would not work since you do want to allow
LngLatLike
objects for the
center
property.

You can't write
"CameraOptions extends Partial<Camera>"
since
LngLatLike
is a superset of
LngLat,
not a subset (item 7).

Input types are broader than output types.
Optional properties and
union types
are more common in parameter types than return types.

To reuse types between parameters and return types,
introduce a canonical form (for return types) and
a looser form (for parameters).

loose-accept-strict-produce-08.ts
*/
namespace code4 {
type Feature = any;
declare function calculateBoundingBox(f: Feature): [number, number, number, number];
interface LngLat { lng: number; lat: number; };
type LngLatLike = LngLat | { lon: number; lat: number; } | [number, number];

interface Camera {
  center: LngLat;
  zoom: number;
  bearing: number;
  pitch: number;
}
interface CameraOptions extends Omit<Partial<Camera>, 'center'> {
  center?: LngLatLike;
}
type LngLatBounds =
  {northeast: LngLatLike, southwest: LngLatLike} |
  [LngLatLike, LngLatLike] |
  [number, number, number, number];

declare function setCamera(camera: CameraOptions): void;
declare function viewportForBounds(bounds: LngLatBounds): Camera;
function focusOnFeature(f: Feature) {
  const bounds = calculateBoundingBox(f);
  const camera = viewportForBounds(bounds);
  setCamera(camera);
  const {center: {lat, lng}, zoom} = camera;  // OK
  zoom;  // Type is number
  window.location.search = `?v=@${lat},${lng}z${zoom}`;
}
}


/*
Item 32
Prefer Unions of Interfaces to Interfaces of Unions
union-of-interfaces-05.ts
*/
namespace code5 {
type FillPaint = unknown;
type LinePaint = unknown;
type PointPaint = unknown;
type FillLayout = unknown;
type LineLayout = unknown;
type PointLayout = unknown;
interface FillLayer {
  type: 'fill';
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  type: 'line';
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  type: 'paint';
  layout: PointLayout;
  paint: PointPaint;
}
type Layer = FillLayer | LineLayer | PointLayer;



//union-of-interfaces-08.ts
interface Person {
  name: string;
  birth?: {
    place: string;
    date: Date;
  }
}
}



/* 33
Prefer More Precise Alternatives to String Types

Prefer
keyof T
to
string
for function parameters that are expected to be properties of an object

avoid-strings-15.ts
*/
namespace code6 {
function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
  return record.map(r => r[key]);
}
type RecordingType = 'studio' | 'live';

interface Album {
  artist: string;
  title: string;
  releaseDate: Date;
  recordingType: RecordingType;
}
declare let albums: Album[];
pluck(albums, 'releaseDate'); // Type is Date[]
pluck(albums, 'artist');  // Type is string[]
pluck(albums, 'recordingType');  // Type is RecordingType[]
pluck(albums, 'recordingDate');
           // ~~~~~~~~~~~~~~~ Argument of type '"recordingDate"' is not
           //                 assignable to parameter of type ...
}



/* 34
Prefer Incomplete Types to Inaccurate Types

Avoid the uncanny valley of type safety:
Incorrect types are often worse than no types.

If you cannot model a type accurately,
do not model it inaccurately!
Acknowledge the gaps using
any
or
unknown.

Pay attention to 
error messages and 
autocomplete 
as you typings increasingly precise.
It's not just about correctness:
developer experience matters, too.



incomplete-over-innacurate-07.ts
To make sure that each function gets the correct number of arguments, the call needs to be recursive to reach down into all the function calls. We need to convince the type checker that our recursion isn't infinite.
Express "an array of even length" using an interface CaseCall.
CaseCall, RGBCall, ... are not defined in https://github.com/mapbox/ - not real production codes
*/

/* 35
Generate Types from APIs and Specs, Not Data

https://geojson.org/
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/geojson
npm install --save @types/geojson



https://docs.github.com/en/graphql
The 
GitHub GraphQL API
 offers more precise and flexible queries than the 
GitHub REST API.

query repository owner



https://github.com/apollographql
apollo GraphQL



browser DOM API are generated from the official interfaces (item 55).



consider-codegen-08.ts
*/
/* 37
Consider “Brands” for Nominal Typing

TypeScript uses structural typing.

Nominal Typing may be created by attaching “brands”.
Each brand is distinct.

brands-04.ts
*/
namespace code7 {
type AbsolutePath = string & {_brand: 'abs'};
function listAbsolutePath(path: AbsolutePath) {
  // ...
}
function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith('/');
}



/*
Brand 
number
type to attach units.
Awkward in practice since arithmetic operations make the numbers forget their brands.

brands-08.ts
*/
type Meters = number & {_brand: 'meters'};
type Seconds = number & {_brand: 'seconds'};

const meters = (m: number) => m as Meters;
const seconds = (s: number) => s as Seconds;

const oneKm = meters(1000);  // Type is Meters
const oneMin = seconds(60);  // Type is Seconds
const tenKm = oneKm * 10;  // Type is number
const v = oneKm / oneMin;  // Type is number
}

/* 40
Hide Unsafe Type Assertions in Well-Typed Functions

make a function cache its last call.
This is a common technique for eliminating expensive function calls with frameworks. It would be nice to write a general cacheLast wrapper that adds this behavior to any function. 
this will work great for any simple function you pass it. There are quite a few any types hidden in this implementation, but you’ve kept them out of the type signature, so the code that calls cacheLast will be none the wiser. (Is this actually safe? There are a few real problems with this implementation: it doesn’t check that the values of this for successive calls are the same. And if the original function had properties defined on it, then the wrapped function would not have these, so it wouldn’t have the same type. But if you know that these situations don’t come up in your code, this implementation is just fine. This function can be written in a type-safe way, but it is a more complex exercise that is left to the reader.)

ch05-any/item-40-hide-unsafe-casts/hide-unsafe-casts-04.ts
*/
function cacheLast<T extends Function>(fn: T): T {
  let lastArgs: any[]|null = null;
  let lastResult: any;
  return function(...args: any[]) {
    if (!lastArgs || !shallowEqual(lastArgs, args)) {
      lastResult = fn(...args);
      lastArgs = args;
    }
    return lastResult;
  } as unknown as T;
}


/* 45
Put TypeScript and @types in devDependencies

dependencies
devDependencies
peerDependencies

dependencies
These are packages that are required to run your JavaScript. If you import lodash at runtime, then it should go in dependencies. When you publish your code on npm and another user installs it, it will also install these dependencies. (These are known as transitive dependencies.)



devDependencies
These packages are used to develop and test your code but are not required at runtime. Your test framework would be an example of a devDependency. Unlike dependencies, these are not installed transitively with your packages.
linting with eslint which is only used in our IDE and is never imported in our code.



peerDependencies
These are packages that you require at runtime but don't want to be responsible for tracking.  The canonical example is a plug-in.
jQuery plug-in is compatible with a range of versions of jQuery itself.
Prefer that the user select one, rather than you choosing for them.
Code that will be used by others, such as plugins and packages.



npx tsc



    install a package as a direct dependency,
    install its types as a dev dependency.

npm install --save lodash
npm install --save-dev @types/lodash

npm install --save-dev @types/lodash@ts3.1



npm ls @types/lodash


Search for typed packages TypeScript
Search engine for TypeScript definitions 
https://www.npmjs.com/~types
https://github.com/DefinitelyTyped/DefinitelyTyped
https://github.com/typings/registry
http://www.definitelytyped.org/


Avoid installing TypeScript system-wide.
Make TypeScript a devDependency of your project.

Put @types dependencies in devDependencies.




46. Understand the Three Versions Involved in Type Declarations

The version of the package
The version of its type declarations (@types)
The version of TypeScript


@types/jquery



All of those @type/* packages are scoped packages, and provide TypeScript with type definitions to help it understand what things are in our code.



--save-dev
  is used to save the package for development purpose. Example: unit tests, minification..

--save
  default
  is used to save the package required for the application to run.


npm install moment --save

npm install jasmine-core --save-dev
npm install karma --save-dev



Prefer bundling types if your library is written in TypeScript and
DefinitelyTyped if it is not.
*/
/*
50 Prefer Conditional Types to Overloaded Declarations

Passing a string literal type, the return type is the same string literal type.
doubling 'x' results in 'xx', not 'x'.



Conditional Types distribute over unions
T is number | string
TypeScript resolves the conditional type as follows:
(number | string) extends string ? string : number
-> (number extends string ? string : number) |
   (string extends string ? string : number)
-> number | string

conditional-overload-07.ts
*/
namespace code8 {
function double<T extends number | string>(
  x: T
): T extends string ? string : number;
function double(x: any) { return x + x; }
const num = double(12);  // number
const str = double('x');  // string

// function f(x: string | number): string | number
function f(x: number|string) {
  return double(x);
}
}

/* 52
Be Aware of the Pitfalls of Testing Types

A function in TypeScript is assignable to a function type, which takes fewer parameters.
Because it's fine to call a JavaScript function with more parameters than it's declared to take.

e.g.
lodash map
_.map(collection, [iteratee=_.identity])

Creates an array of values by running each element in collection thru iteratee. The iteratee is invoked with three arguments:
(value, index|key, collection).


The callback in the lodash map function takes up to 3 parameters:
map(array, (name, index, array)) => {/* ... */});
*/
/*
While all three are available, it's very common to use only one or sometimes two.

test-your-types-13.ts
*/
namespace code9 {
declare function map<U, V>(
  array: U[],
  fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];
}
/*
dtslint
@definitelytyped/dtslint
for stricter, less error-prone checking.
It inspects the type of each symbol and does a textual comparison.
This approach has some drawbacks:
number | string
and 
string | number
are textually different but the same type.

When testing types, be aware of the difference between equality and assignability, particularly for function types.

For functions that use callbacks, test the inferred types of the callback parameters.
Test the type of
this
if it's part of API.

Be wary of
any
in tests involving types.
*/
/* 53
Prefer ECMAScript Features to TypeScript Features



TypeScript parameter property
A shortcut notation to declare properties with the same name and value as the constructor parameter.
A shorthand for declaring a class constructor parameter and class property in one location.
For this, you can prefix a constructor parameter with either "private" or "public."

avoid-non-ecma-06.ts
*/
/*
Item 54: Know How to Iterate Over Objects

iterate-objects-03.ts

keyof typeof will infer the type of a javascript object and return a type that is the union of its keys (literal types).

JavaScript already has a typeof operator you can use in an expression context.

TypeScript adds a typeof operator you can use in a type context to refer to the type of a variable or property.

TypeScript uses javascript's typeof when called on javascript values at runtime and returns one of "undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function".

TypeScript's typeof is called on type values.

Something that is a type and a value at the same time (like a class or an enum), but you're interested specifically in what the type of that value is.
*/
namespace code9 {
  const obj = {
    one: 'uno',
    two: 'dos',
    three: 'tres',
  };
  for (const k in obj) {
    const v = obj[k];
           // ~~~~~~ Element implicitly has an 'any' type
           //        because type ... has no index signature
  }
  let k: keyof typeof obj;  // Type is "one" | "two" | "three"
  for (k in obj) {
    const v = obj[k];  // OK
  }
}
/* 54
Know How to Iterate Over Objects

Use
let k: keyof T
and a 
for in
loop to iterate objects when you know exactly what the keys will be.
Be aware that any objects your function receives as parameters might have additional keys.

Use
Object.entries
to iterate over the keys and values of any object.
*/
/* 55
Understand the DOM hierarchy
*/
Node
Element
HTMLElement
EventTarget
Event
MouseEvent
/* 57
Use Source Maps to Debug TypeScript
*/
/* 58
Write Modern JavaScript

https://github.com/tc39/proposals
https://github.com/tc39/proposal-decorators

https://github.com/tc39/proposal-pipeline-operator

Specify default values when destructuring.
*/
namespace code10 {
declare let obj: {props: {a: string; b: number; }; };
const {a = 'default'} = obj.props;
}
/* 61
Convert Module by Module Up Your Dependency Graph

JavaScript
https://www.npmjs.com/package/madge
Madge is a developer tool for generating a visual graph of your module dependencies, finding circular dependencies, and give you other useful info. 
*/