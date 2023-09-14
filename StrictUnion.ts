/*
TypeScript StrictUnion

https://dev.to/tylim88/typescript-wth-moment-12-beware-of-typescript-object-unions-5a4m

The purpose of T extends T is to distribute unions
Non-distributive (default) operations are applied to properties that exist on every member of the union.
Distributive operations are applied to all members of the union separately.
*/
{
type ABC = { A: number, B: number } | { C: number }
const abc: ABC = { A: 1, B: 2, C: 3 } // no error!
}

type GetAllKeys<T> = T extends T ? keyof T : never

type CreateOptionalExcessProperty<T, Y> = T extends T ? T & Partial<Record<Exclude<GetAllKeys<Y>, keyof T>, never>> : never

type StrictUnion<T> = CreateOptionalExcessProperty<T, T>

type ABC = StrictUnion<{ A: number, B: number } | { C: number }>;

const abc: ABC = { A: 1, B: 2, C: 3 } // error!

const ab: ABC = { A: 1, B: 2 } // ok!

const c: ABC = { C: 3 } // ok!

const bc: ABC = { B: 2, C: 3 } // error!



{
/*
https://stackoverflow.com/questions/65805600/type-union-not-checking-for-excess-properties#answer-65805753
Titian Cernicova-Dragomir
*/
type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, never>> : never;
type StrictUnion<T> = StrictUnionHelper<T, T>

type T =  StrictUnion<{A: number, B: number} | {C: number }>;

const valid: T = {A: 1, B: 2};
const alsoValid: T = {C: 3};

// Error
const invalid: T  = {A: 1, B: 2, C: 3};
//Error
const alsoInvalid: T = {A:1, C: 3};
}