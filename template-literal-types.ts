//https://effectivetypescript.com/2020/11/05/template-literal-types/
type OnString = `on${string}`;
const onClick: OnString = 'onClick';
const handleClick: OnString = 'handleClick';
   // ~~~ Type '"handleClick"' is not assignable to type '`on${string}`'.



type IdNum = `id${number}`;
const id1: IdNum = 'id123';  // ok
const id2: IdNum = 'idABC';  // ~~~ Type 'idABC' is not assignable to IdNum



type Digit = '0' | '1' | '2' | '3' | '4' |
             '5' | '6' | '7' | '8' | '9';
type ThreeDigitNum = `${Digit}${Digit}${Digit}`;



interface Vector {
  x: number;
  y: number;
}
type Promisify<T extends object> = {
  [K in keyof T]: Promise<T[K]>  // <-- the mapping
};
type VectorPromise = Promisify<Vector>;
// type is { x: Promise<number>; y: Promise<number>; }



//add an as clause to the key in a mapped type to change things around
interface Student {
  name: string;
  age: number;
}
type Evented<T extends object> = {
  [K in keyof T as `${K & string}Changed`]: (val: T[K]) => void;
}
type StudentEvents = Evented<Student>;
// type is {
//   nameChanged: (val: string) => void;
//   ageChanged: (val: number) => void;
// }



/*
The conditional matches string literal types of the form "head_tail".
Use the infer keyword in a template literal type to do pattern matching.
The "_" acts as a delimiter to split the string. 
Because conditional types distribute over unions, this also works for union types.
We can't stop after the first "_", we need to keep going. 
We can do this by making the type recursive:
*/
type ToCamel<S extends string> =
    S extends `${infer Head}_${infer Tail}`
    ? `${Head}${Capitalize<ToCamel<Tail>>}`
    : S;

type T0 = ToCamel<'foo'>;  // type is "foo"
type T1 = ToCamel<'foo_bar'>;  // type is "fooBar"
type T2 = ToCamel<'foo_bar_baz'>;  // type is "fooBarBaz"
type T3 = ToCamel<'foo_bar_baz_cat'>;  // type is "fooBarBazCat"

type TU = ToCamel<'first_name' | 'last_name'>;
// type is "firstName" | "lastName"

function camelCase<T extends string>(term: T): ToCamel<T> {
  return term.replace(/_([a-z])/g, m => m[1].toUpperCase()) as ToCamel<T>;
}

type ObjectToCamel<T extends object> = {
  [K in keyof T as ToCamel<K & string>]: T[K]
};

function objectToCamel<T extends object>(obj: T): ObjectToCamel<T> {
  const out: any = {};
  for (const [k, v] of Object.entries(obj)) {
    out[camelCase(k)] = v;
  }
  return out;
}

const pascal = {foo_bar: 12}; // type is {foo_bar: number}
const camel = objectToCamel(pascal);
// type is { fooBar: number }
const val = camel.fooBar;  // type is number
const val2 = camel.foo_bar;
                // ~~~ Property 'foo_bar' does not exist on type
                //     '{ fooBar: number; }'. Did you mean 'fooBar'?


/*
https://github.com/ghoullier/awesome-template-literal-types/blob/main/README.md
*/
type ExtractRouteParams<T extends string> =
  string extends T
  ? Record<string, string>
  : T extends `${infer Start}:${infer Param}/${infer Rest}`
  ? {[k in Param | keyof ExtractRouteParams<Rest>]: string}
  : T extends `${infer Start}:${infer Param}`
  ? {[k in Param]: string}
  : {};

declare function handleGet<Route extends string>(
  route: Route,
  handler: (params: ExtractRouteParams<Route>) => void
): void;

handleGet('/posts/:postId', (params) => {
  const {postId} = params;  // type is string
  console.log(postId);
});

handleGet('/posts/:postId/:commentId', ({postId, commentId}) => {
  console.log(postId, commentId);
});


let route = "/user/:userId"

handleGet(route, ({ u}) => {

})

const test: ExtractRouteParams<"card/:cardId/transaction/:transactionId"> = {cardId: "some id", transactionId: "another id"}
const test2: ExtractRouteParams<"user/:userId/transaction/:transactionId"> = {userId: 123, transactionId: "another id"}



//https://colonel.shnyra.com/extract-route-params-type/
type ExtractRouteParams2<T extends string> = string extends T
  ? {}
  : // we have start/:oneId/restOfUrl
  T extends `${string}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : // we only have start/:oneId
  T extends `${string}:${infer Param}`
  ? { [k in Param]: string }
  : // nothing found
    {};

const testb: ExtractRouteParams2<"card/:cardId/transaction/:transactionId"> = {cardId: "some id", transactionId: "another id"}
const testb2: ExtractRouteParams2<"user/:userId/transaction/:transactionId"> = {userId: 123, transactionId: "another id"}
    
    

/*
https://dev.to/bytimo/useful-types-extract-route-params-with-typescript-5fhn
Split off one segment, try to extract a parameter from this segment and 
reuse the type with the rest of the path recursively.
Use a special type parameter NextPart to determine what it has to do after extracting
- try to extract parameters from the rest of the path or stop recursion.
*/

type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

type ExctractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExctractParams<Rest>>
  : ExtractParam<Path, {}>

const foo: ExctractParams<"card"> = {};
const bar: ExctractParams<"card/:cardId"> = {cardId: "some id"};
const baz: ExctractParams<"card/:cardId/transaction/:transactionId"> = {cardId: "some id", transactionId: "another id"}


//@ts-expect-error
const wrongBar: ExctractParams<"card/:cardId"> = {};
//@ts-expect-error
const wrongBaz: ExctractParams<"card/:cardId/transaction/:transactionId"> = {cardId: "some id"};
