/*
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
Predefined conditional types
*/
type T000 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "b" | "d"
type T010 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"
type T020 = Exclude<string | number | (() => void), Function>; // string | number
type T030 = Extract<string | number | (() => void), Function>; // () => void
type T040 = NonNullable<string | number | undefined>; // string | number
type T050 = NonNullable<(() => string) | string[] | null | undefined>; // (() => string) | string[]
function f1(s: string) {
  return { a: 1, b: s };
}
class C {
  x = 0;
  y = 0;
}
type T100 = ReturnType<() => string>; // string
type T110 = ReturnType<(s: string) => void>; // void
type T120 = ReturnType<<T>() => T>; // {} ????? unknown
type T130 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T140 = ReturnType<typeof f1>; // { a: number, b: string }
type T150 = ReturnType<any>; // any
type T160 = ReturnType<never>; // any ????? never
type T170 = ReturnType<string>; // Error
type T180 = ReturnType<Function>; // Error
type T200 = InstanceType<typeof C>; // C
type T210 = InstanceType<any>; // any
type T220 = InstanceType<never>; // any ????? never
type T230 = InstanceType<string>; // Error
type T240 = InstanceType<Function>; // Error



/*
keyof applied to an intersection type is transformed to a union of keyof applied to each intersection constituent. 
In other words, types of the form keyof (A & B) are transformed to be keyof A | keyof B.
*/
type A = { a: string };
type B = { b: string };
type T1 = keyof (A & B); // "a" | "b"
type T2<T> = keyof (T & B); // keyof T | "b"
type T3<U> = keyof (A & U); // "a" | keyof U
type T4<T, U> = keyof (T & U); // keyof T | keyof U
type T5 = T2<A>; // "a" | "b"
type T6 = T3<B>; // "a" | "b"
type T7 = T4<A, B>; // "a" | "b"