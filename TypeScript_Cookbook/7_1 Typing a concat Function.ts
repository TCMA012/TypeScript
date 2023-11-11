/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/

Tuple types are arrays with a fixed length and where every type of each element is defined (does not have to be the same).
A variadic tuple type is a tuple type - defined length and the type of each element is known - but where the exact sahpe is yet to be defined.

Tuple types can be used to describe function signatures, as tuples can be spread out to function calls as arguments.

7.1. Typing a concat Function
*/
{
type PersonProps = [string, number];
const [name, age]: PersonProps = ['TC', 27];
}

type Foo<T extends unknown[]> = [string, ...T, number];
type T1 = Foo<[boolean]>; //[string, boolean, number]
type T2 = Foo<[number, number]>; //[string, number, number, number]
type T3 = Foo<[]>; //[string, number]



type Bar<
    T extends unknown[],
    U extends unknown[]
> = [...T, string, ...U];

type T4 = Bar<[boolean], [number]>; //[boolean, string, number]
type T5 = Bar<[number, number], [boolean]>; //[number, number, string, boolean]
type T6 = Bar<[], []>; //[string]



function concat<T extends unknown[], U extends unknown[]>(
    arr1: [...T],
    arr2: [...U]
): [...T, ...U] {
    return [...arr1, ...arr2];
}

const test = concat([1, 2, 3], [6, 7, "a"]);
//[number, number, number, number, number, string]

namespace x {
declare const a: string[]
declare const b: number[]

const test = concat(a, b);
//(string | number)[]
}
