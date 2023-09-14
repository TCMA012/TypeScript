/*
Conditional Types in TypeScript
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html

https://mariusschulz.com/blog/conditional-types-in-typescript
predefined in TypeScript
NonNullable<T>
Pick<T, K>
ReturnType<T>

// Obtain the parameters of a function type in a tuple
type Parameters<T> =
  T extends (...args: infer P) => any ? P : never

// Obtain the parameters of a constructor function type in a tuple
type ConstructorParameters<T> =
  T extends new (...args: infer P) => any ? P : never

// Obtain the return type of a function type
type ReturnType<T> =
  T extends (...args: any[]) => infer R ? R : any

// Obtain the return type of a constructor function type
type InstanceType<T> =
  T extends new (...args: any[]) => infer R ? R : any
  


Distributive Conditional Type
*/
type NonNullablePropertyKeys<T> = {
  [P in keyof T]: null extends T[P] ? never : P;
}[keyof T];



//
/*
https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] }8
type ExcludeTypeKey<K> = K extends "type" ? never : K

type Test = ExcludeTypeKey<"emailAddress" | "type" | "foo">
// => "emailAddress" | "foo"

// here's the mapped type
type ExcludeTypeField<A> = { [K in ExcludeTypeKey<keyof A>]: A[K] }
*/
type ExcludeTypeField<A> = { [K in Exclude<keyof A, "type">]: A[K] } //use Exclude

type Test2 = ExcludeTypeField<{ type: "LOG_IN"; emailAddress: string }>
// => { emailAddress: string }

/*
type ExtractActionParameters<A, T> = A extends { type: T }
  ? ExcludeTypeField<A>
  : never
*/
type ExtractActionParameters<A, T> = ExcludeTypeField<Extract<A, { type: T }>>  //use Extract

type Action =
  | {
      type: "INIT"
    }
  | {
      type: "SYNC"
    }
  | {
      type: "LOG_IN"
      emailAddress: string
    }
  | {
      type: "LOG_IN_SUCCESS"
      accessToken: string
    }

type ActionType = Action["type"]

type Test3 = ExtractActionParameters<Action, "LOG_IN">



type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
  : never

/*
type ExtractSimpleAction<A> = ExcludeTypeField<A> extends {} ? A : never
doesn’t work. 
ExcludeTypeField<A> extends {} is always going to be true, because {} is like a top type for interfaces. 
Pretty much everything is more specific than {}.
*/

/*
if you want a conditional type to distribute over a union, the union 
a) needs to have been bound to a type variable, and 
b) that variable needs to appear alone to the left of the extends keyword.

type ExtractSimpleAction<A> = {} extends ExcludeTypeField<A> ? A : never

wrap the meat of our logic in a flimsy tortilla of inevitability, since the outer condition
A extends any
will always be true.
*/
declare function dispatch(type: SimpleActionType): void

declare function dispatch<T extends ActionType>(
  type: T,
  args: ExtractActionParameters<Action, T>
): void

type SimpleActionType = ExtractSimpleAction<Action>['type']

dispatch("INIT")
