//https://konstantinlebedev.com/typescript-advanced-esoteric/

type ApiResponse = {
    data: Array<{
      firstName: string
      lastName: string
      age: number
    }>
    meta: {
      page: number
      count: number
    }
}

type UserList = ApiResponse["data"]
//Array<{ firstName: string, lastName: string, age: number }>

//use array accessor syntax and create a type for an individual user:
//use property accessor
type User = UserList[number]
//{ firstName: string, lastName: string, age: number }

/*
When we restrict the type argument of a generic to a particular type set, 
we can use property accessor syntax to access properties of the types that belong to that set. 
e.g. restrict a type argument to any[] (which includes all array types) and 
get access to properties that are available on any array. 
access the length property which creates a numeric literal type equal to the number of elements in the X array:
*/
type Length<X extends any[]> = X["length"]

type Result1 = Length<[]>         // 0
type Result2 = Length<[1, 2, 3]>  // 3

// a JavaScript function
const lengthJS = (array: any[]) => array.length



type IsOne<X> = X extends 1 ? true : false

type Resultb1 = IsOne<1>      // true
type Resultb2 = IsOne<2>      // false
type Resultb3 = IsOne<"1">    // false



type ItemType0<A> = A extends Array<number>
  ? number
  : A extends Array<string>
  ? string
  : A extends Array<boolean>
  ? boolean
  : unknown

type Resulta1 = ItemType0<Array<number>>  // number
type Resulta2 = ItemType0<Array<string>>  // string
type Resulta3 = ItemType0<Array<{}>>      // unknown

type ItemType<A> = A extends Array<infer I> ? I : unknown; // better

type Resultc1 = ItemType<number[]>;      // number
type Resultc2 = ItemType<string[]>;      // string



/*
TS utility type 
Awaited 
which “unwraps” a promise and returns the type of value the promise would resolve to
*/
type Unwrap<T> = T extends Promise<infer I> ? I : never

type Result = Unwrap<Promise<{ status: number }>>  // { status: number }



/*
TS utility type 
ReturnType
takes a function type expression as an argument, and creates a type from the return type of that function:

Use the extends keyword twice. 
The one on the left makes sure that only function types can be passed in, and the one on the right defines the condition. 
This condition matches the T argument against a function signature, discarding the types of its arguments and 
only preserving the return type R.
*/
type ReturnTypeMy<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

type Result3 = ReturnTypeMy<(s: string) => number>  // number



/*
N-dimensional arrays (arrays of arrays):
Referencing ItemTypeNDArr within its definition. 
This allows us to check if the array item type is an array itself by “peeling off” layers of arrays and 
passing the result back to ItemTypeNDArr. 
Only when we get to the inner item type that the condition becomes false and we exit the loop.
*/
type ItemTypeNDArr<A> = A extends Array<infer I>
  ? ItemTypeNDArr<I>
  : A

type ResultNDArr1 = ItemTypeNDArr<number[]>      // number
type ResultNDArr2 = ItemTypeNDArr<number[][][]>  // number



/*
Add and Sub types, which will take 2 numeric arguments each and either add or subtract them. 

With a spread operator, we can make quite a few transformations - we can 
concatenate arrays, 
get the first and last elements of the array, as well as append, prepend, and remove individual elements. 
Use arrays to get around the limitation with the numeric literals.

To implement our Add type:
convert numeric literals into tuples of the equivalent sizes
concatenate the resulting arrays into a new one
get the length of this array which will be equal to the sum of numeric literals
*/

/*
Let’s start by converting numeric literals into tuples. 
Given the limitations of TS and lack of proper loops, we have to 
use recursion to achieve the desired result. 
let’s look at a 
JavaScript code mimicking the logic we’ll implement:
Here we start with an empty array and keep appending new items into it and calling the function recursively 
until we get the expected number of items in the array. 
The value 0 is used arbitrarily here as we don’t care about the values of array items, but only about their total count.
*/
const toTuple = (n: number, arr: any[] = []) => {
  if (arr.length === n) {
    return arr
  } else {
    const newTuple = [...arr, 0]
    return toTuple(n, newTuple)
  }
}

const res = toTuple(3)    // [0, 0, 0]

// use the Length type
type ToTuple<N extends number, T extends any[] = []> =
  Length<T> extends N
    ? T
    : ToTuple<N, [...T, 0]>

//concatenating two tuples can be achieved by spreading both tuples into a new one:
type Concat<A extends any[], B extends any[]> = [...A, ...B]

//to get the sum, we need to get the length of the resulting tuple
type Add<A extends number, B extends number> = Length<
    Concat<ToTuple<A>, ToTuple<B>>
>

type ResultAdd = Add<3, 2>   // 5
type ResultAdd2 = Add<2, 5>    // 7



/*
To subtract array B from array A:

check if array A includes array B
if it is, infer the remaining part
get the length of the remainder

the first two cases work as intended, but we get a problem if array B is larger than array A. 
Following the basic property of subtraction (2 - 5 = -(5 - 2)), 
the solution to this problem is for A and B to switch places, and to change the sign of the result to a negative:

type Sub<A extends number, B extends number> = ToTuple<A> extends [
  ...ToTuple<B>,
  ...infer U
]
  ? Length<U>
  : Negative<Sub<B, A>>

append a minus sign using string interpolation:
*/
type Negative0<N extends number> = `-${N}`

type ResultNeg0 = Negative0<5> // "-5"

/*
we get a string literal type, and to convert it into a number, 
use extends constraint to infer type variables in conditional types:
check if our type T looks like a string the content of which looks like a number, and even infer and return that number.
*/
type ToNumber<T> = T extends `${infer N extends number}` ? N : never

type Negative<N extends number> = ToNumber<`-${N}`>

type ResultNeg = Negative<5>  // -5

type Sub<A extends number, B extends number> = ToTuple<A> extends [
  ...ToTuple<B>,
  ...infer U
]
  ? Length<U>
  : Negative<Sub<B, A>>

type ResultSub1 = Sub<5, 2>  // 3
type ResultSub2 = Sub<3, 3>  // 0
type ResultSub3 = Sub<2, 5>  // -3



/*
TypeScript compiler has the max call stack depth of 1000 for recursive types, so any number above that wouldn’t work. 
Neither of our types would work with negative numbers, as we simply wouldn’t be able to create tuples of a negative length.
*/