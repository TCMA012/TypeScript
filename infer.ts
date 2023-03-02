/*
https://javascript.plainenglish.io/typescript-infer-keyword-explained-76f4a7208cb0
*/
//If T is a sub-type of (infer R)[] , return R. Otherwise, return T”
type UnpackArrayType<T> = T extends (infer R)[] ? R: T;

//the condition in UnpackArrayType is true because number[] matches with (infer R)[]
type t1 = UnpackArrayType<number[]>; // t1 is number

//the condition in UnpackArrayType is false as the string type does not match with(infer R)[]
type t2 = UnpackArrayType<string>; //t2 is string



type unboxFromPromise<T> = T extends Promise<infer R>? R : T;
type t3 = Promise<string[]>;
let promiseType : unboxFromPromise<t3>; // string[]



//return the function return type as R type variable if the type passed in matches a function signature.
type functionReturn<T> = T extends (...args: string[]) => infer R ? R: T;
type f1 = (a:string) => number;
type returnType = functionReturn<f1>; // number



/*
multiple candidates for the same type variable in co-variant positions causes a union type to be inferred.
When a type is inferred for several values, the result is a union type
*/
type unboxFromObject<T> = T extends {a: infer R; b: infer R} ? R: never;
type r1 = unboxFromObject<{a: string; b: number}>; // string | number



//multiple candidates for the same type variable in contra-variant positions causes an intersection type to be inferred.
type unboxFromObjectFunctions<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }? U: never;
type r2= unboxFromObjectFunctions<{ a: (x: string) => void; b: (x: number) => void }>; // string & number ???



//use infer with a recursive conditional type to flatten a nested array
type Flatten<T extends readonly unknown[]> = T extends unknown[] ? _Flatten<T>[] : readonly _Flatten<T>[];
type _Flatten<T> = T extends readonly (infer U)[] ? _Flatten<U> : T;
declare function flatRecurisve<T extends readonly unknown[]>(xs: T): Flatten<T>;
const t4 = flatRecurisve(['apple', ['orange', 'pear', 100],[[4, [true]]]] as const);
// readonly (true | ‘apple’| ‘orange’| ‘pear’| 100 | 4)[]
