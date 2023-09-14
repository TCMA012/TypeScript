//https://levelup.gitconnected.com/using-typescript-infer-like-a-pro-f30ab8ab41c7
type T0 = string[];
type T1 = () => string;

type UnpackedArray<T> = T extends (infer U)[] ? U : T
type U0 = UnpackedArray<T0> // string



type ArrayType<T> = T extends (infer Item)[] ? Item : T

type item1 = ArrayType<number[]>; // number
type item2 = ArrayType<{ name: string }>; //{ name: string }
type ta = ArrayType<[string, number]> // string | number
type ta2 = ArrayType<[string, number, boolean]> // string | number | boolean



type SpaceChar = ' ' | '\n' | '\t';
type TrimLeft<S extends string> = S extends `${SpaceChar}${infer Rest}` ? TrimLeft<Rest> : S;
type Str = TrimLeft<'    hello'>; // 'hello'




type First<T extends Array<any>> = T extends [infer F, ...infer Rest] ? F : never;
type Str2 = First<['hello', 1, false]>; // 'hello'



type GetReturnType<T> = T extends (...args: unknown[]) => infer R
  ? R
  : never;
type Num = GetReturnType<() => number>; // number



type Pear = 'Pear'
type Apple = number

type Flip<T> = T extends [infer A, infer B] ? [B, A] : never
type Stairs = Flip<[Pear, Apple]>
// => [Apple, Pear]

type Union<T> = T extends [infer A, infer A] ? A : never
type Stairsu = Union<[Apple, Pear]>
// => Apple | Pear


//https://alexharri.com/blog/build-schema-language-with-infer
type Split<T> = T extends `${infer A};${infer B}`
  ? [A, ...Split<B>]
  : [T];

type s4 = Split<`1;2;3;4`>; // [`1`, ...Split<`2;3;4`>]
type s3 = Split<`2;3;4`>;   // [`2`, ...Split<`3;4`>]
type s2 = Split<`3;4`>;     // [`3`, ...Split<`4`>]
type s1 = Split<`4`>;       // [`4`]



type Merge<T> = T extends [infer R, ...infer Rest]
  ? R & Merge<Rest>
  : {};

type m3 = Merge<[{ a: 1 }, { b: 2 }, { c: 3 }]> // { a: 1 } & Merge<[{ b: 2 }, { c: 3 }]>
type m2 = Merge<[{ b: 2 }, { c: 3 }]>           // { b: 2 } & Merge<[{ c: 3 }]>
type m1 = Merge<[{ c: 3 }]>                     // { c: 3 } & Merge<[]>
type m0 = Merge<[]>         


type GetFirstArgumentOfAnyFunction<T> = T extends (
    first: infer FirstArgument,
    ...args: any[]
) => any
    ? FirstArgument
    : never
  
type t = GetFirstArgumentOfAnyFunction<(name: string, age: number) => void> // string



