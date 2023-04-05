/*
Programming TypeScript Companion Object Pattern
Boris Cherny
https://www.oreilly.com/library/view/programming-typescript/9781492037644/
https://borischerny.com/

https://github.com/bcherny/programming-typescript-answers
github="https://github.com/bcherny/programming-typescript-answers"


file:///media/tcma/SeagateBackupPlusDrive/TypeScript/programming-typescript/programming-typescript/Programming-Typescript-master/README.md



cd /media/tcma/SeagateBackupPlusDrive
cd TypeScript/programming-typescript/programming-typescript/Programming-Typescript-master


grep -r times *
Chapter4/dist/ContextualTyping.js



TypeScript comes with built-in types for each HTML element. These include:

HTMLAnchorElement for <a> elements
HTMLCanvasElement for <canvas> elements
HTMLTableElement for <table> elements
Overloaded call signatures are a natural way to model how createElement works:

grep -r CreateElement  *
README.md

grep -r Currency  *

mkdir -p TypeScript/$appdir && cd "$_"



assignable to : compatible with


Type literal:
a type that represents a single value and nothing else

For the cases where you have a value whose type you don't know, 
don't use any, 
use unknown.

Don't tell TS that your value is boolean
Don't explicitly type something as a number

number type can only represent whole numbers up to 2**53,
bigint can represent integers bigger than that.
Let TS infer your type when you can



The 
[key: T]: U
syntax is called an 
index signature - the given object might contain more keys.
For this object, all keys of type T must have values of type U.
Index signatures safely add more keys to an object, in addition to any keys that you explicitly declared.
The index signature key's type (T) must be assignable to either
number
or
string.
You can use any word for the index signature keys's name.

optional ?
readonly
*/
let airplaneSeating: {
    [seatNumber: string]: string
} = {
    '34D': 'TC MA',
    '34E': 'Bill Gates',
}

/*
Object literal notation (like {a: string}), also called a shape



| Union =  A or B or both. Sum
& intersection = both A and B. What they have in common.



Tuples are subtypes of array.
They have fixed lengths, where the values at each index have specific, known types.
Tuples have to be explicitly typed when you declare them.



void is the return type of a function that doesn't explicitly return anything (e.g. console.log).
never is the type of a function that never returns at all 
(like a function that throws an exception, or one that runs forever)



Immutable collections for JavaScript
Array, List, Stack, Map, OrderedMap, Set, OrderedSet and Record
https://www.npmjs.com/package/immutable



apply binds a value to this within your function, and spreads its second argument over your function's parameters.
call does the same, but applies its arguments in order instead of spreading.
bind() is similar, in that it binds a this-argument and a list of arguments to your function.
bind does not invoke your function; instead, it returns a new function that you can then invoke with (), .call, or .apply, passing more arguments in to be bound to the so far unbound parameters if you want.



Generator produce a stream of values.
Iterator consume a stream of values.


Iterable 
Any object that contains a 
property called 
Symbol.iterator, 
whose value is a function that returns an iterator



Iterator
Any object that defines a 
method called 
next, 
which returns an object with the 
properties
value
 and 
done



Create a 
generator
get a value back that's
both an
iterable and an
iterator -
an
iterable iterator -
because it defines both a
Symbol.iterator 
property and a
next
method



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators



Define an iterator that returns the numbers 1 through 10:
*/
let numbers = {
  *[Symbol.iterator] () {
    for (let n = 1; n <= 10; n++) {
        yield n
  }
}



type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement
}

let createElement: CreateElement = (tag: string): HTMLElement => {
  //...
}


/*
Every complex type is 
covariant in its members - objects, classes, arrays, and function return types - 
with one exception: 
function parameter types, which are contravariant



covariant : for an object A to be assignable to an object B, each of its properties must be <: its corresponding property in B
A <: B means "A is a subtype of or the same as the type B"





A <: B means "A is a subtype of or the same as the type B.”
A >: B means "A is a supertype of or the same as the type B.”

Covariance
You want a <:T.

Contravariance
You want a >:T.

TypeScript shapes (objects and classes) are covariant in their property types. 
That is, for an object A to be assignable to an object B, each of its properties must be <: its corresponding property in B.

Functions are contravariant in their parameter and this types. 
That is, for a function to be a subtype of another function, each of its parameters and its this type must be >: its corresponding parameter in the other function.




A function A is a subtype of function B if A has the same or lower arity (number of parameters) than B and:
A’s this type either isn’t specified, or is >: B’s this type.
Each of A’s parameters is >: its corresponding parameter in B.
A’s return type is <: B’s return type.
The direction flip.



tuple
Avoid type assertion
Infer types for rest parameters
*/



//key in to your type:
type APIResponse = {
    user: {
        userId: string
        friendList: {
            count: number
            friends: {
                firstName: string
                lastName: string
            }[]
        }
    }
}

type FriendList = APIResponse['user']['friendList']

function renderFriendList(friendList: FriendList) {
    // ...
}
/*
You can key in to any shape (object, class constructor, or class instance), and any array. For example, 
to get the type of an individual friend:
*/
type Friend = FriendList['friends'][number]
/*
number is a way to key in to an array type; 
for tuples, use 0, 1, or another number literal type to represent the index you want to key in to.
*/

//Use keyof to get all of an object’s keys as a union of string literal types.
type ResponseKeys = keyof APIResponse // 'user'
type UserKeys = keyof APIResponse['user'] // 'userId' | 'friendList'
type FriendListKeys = keyof APIResponse['user']['friendList'] // 'count' | 'friends'




let alenient = [1, true] // (number | boolean)[]

/*
better to construct tuple type
T is an array of any kind of type
returns a value of the same tuple type that it inferred ts as
returns the same argument that we passed it
*/
function tuple<
  T extends unknown[]
>(
  ...ts: T
): T {
  return tstype ExpandedText = Expand<Text>;
}

let a = tuple(1, true) // [number, boolean]


/*



User-defined type guard



Companion Object Pattern
In the same scope, you can have the same name (e.g. Currency) bound to both a type and a value. 
It lets you group type and value information that's semantically part of a single name together.
The object provides methods that operate on the type.
It also lets consumers import both at once:

This allows you to use Currency as both, a type and a utility, with one single import.
*/

type Currency = {
  unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
  value: number
}

const Currency = {
  from(value: number, unit: Currency['unit'] = 'USD'): Currency {
    return { unit, value }
  }
}



import { Currency } from './Currency'

const amountDue: Currency = {
  unit: 'JPY',
  value: 83733.10
}


const otherAmountDue = Currency.from(330, 'EUR')



{
type CurrencyCompanionObject = {
  DEFAULT: Currency['unit'];
  from(value: Currency['value'], unit: Currency['unit']): Currency;
}

export const Currency: CurrencyCompanionObject = {
  DEFAULT: 'USD',
  from(value: number, unit = Currency.DEFAULT): Currency {
      return { value, unit };
  },
};
}



/*
Conditional Types
*/
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// Get the type of Array.slice
type F = typeof Array['prototype']['slice']
type A = SecondArg<F> // number | undefined


type ExpandedA = Expand<A>;

let a : A 
console.log(typeof a)



/*
Simulating Nominal Types



Chapter 7
Handling Errors
```TypeScript
function isValid(date: Date) {
    return Object.prototype.toString.call(date) === '[object Date]'
        && !Number.isNaN(date.getTime())
}




Option



Promise
https://262.ecma-international.org/6.0/#sec-promise-objects



TypeScript PropertyKey
EventEmitter2 is an implementation of the EventEmitter module found in Node.js. In addition to having a better benchmark performance than EventEmitter and being browser-compatible, it also extends the interface of EventEmitter with many additional non-breaking features.
wildcard listener
https://www.npmjs.com/package/eventemitter2






dynamic import
import some chunk of code on demand
lazy-loading



statically import the module, but use it only in a type position, so that 
TypeScript compiles away the static import



11. Interoperating with JavaScript
A type declaration is a file with the extension .d.ts



RxJs Subscriber
https://github.com/ReactiveX/rxjs

https://github.com/ReactiveX/rxjs/blob/d279670a7e43eb140710596beda67351fffd529f/src/internal/Observable.ts
*/
import { Operator } from './Operator';
import { SafeSubscriber, Subscriber } from './Subscriber';
import { isSubscription, Subscription } from './Subscription';
import { TeardownLogic, OperatorFunction, Subscribable, Observer } from './types';
//...
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 */
export class Observable<T> implements Subscribable<T> {
 /**  subscribe(observer?: Partial<Observer<T>>): Subscription;
  subscribe(next: (value: T) => void): Subscription;
  /** @deprecated Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments */
  subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
 function that is called when the Observable is
   * initially subscribed to. This function is given a Subscriber, to which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or
   * `complete` can be called to notify of a successful completion.
   */
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }


/*
Running this code through TSC with the declarations flag enabled 
tsc -d Observable.ts
yields this 
Observable.d.ts
type declaration:



Ambient variable declaration



A TypeScript Definition File Generator
https://www.npmjs.com/package/dts-gen
*/