/*
The Option type
Instead of returning a value, 
return a container that may or may not have a value in it.
The container has a few methods defined on it, which lets you chain operations even though there may not actually be a value inside.
It doesn't tell why the error happened; it just signals that something went wrong.
Good for multiple operations in a row, each of which might fail.

- Option is an interface that's implemented by two classes:
Some<T> and None.
Some<T> is an Option that contains a value of type T, which represents a success
None    is an Option without a value, which represents a failure

- Option is both a type and a function.
Its type is an interface that's the supertype of Some and None.
Its function is the way to create a new value of type Option.

flatMap : chain operations on a possibly empty Option
getOrElse : retrieve a value from an Option
*/
interface Option<T> {
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Option<U>): Option<U>
    getOrElse(value: T): T
}
class Some<T> implements Option<T> {
    constructor(private value: T) {}
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Some<U>): Some<U>
    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value)
    }
    getOrElse(): T {
        return this.value
    }
}
class None implements Option<never> {
    flatMap(): None {
        return this
    }
    getOrElse<U>(value: U): U {
        return value
    }
}

/*
A function with the same name as a way to create a new Option,
similar to what we did in "Companion Object Pattern".
Overload the signature.
We calculate an upper bound for the two overloaded signatures.
The upper bound of 
null | undefined    and   T
is
T | null | undefined
which is 
T

The upper bound of
None    and   Some<T>
is
None | Some<T>Option
which is 
Option<T>Option

TypeScript has two separate namespaces for types and for values.
*/
namespace op { // added to fix error !!!!!!!!!!!!!!!????????????
function Option<T>(value: null | undefined): None
function Option<T>(value: T): Some<T>
function Option<T>(value: T): Option<T> {
    if (value == null) {
        return new None
    }
    return new Some(value)
}

//usage
let result = Option(6)              // Some<number>
    .flatMap(n => Option(n * 3))    // Some<number>
    .flatMap(n => new None)         // None
    .getOrElse(7)                   // 7

console.log(result)



ask()
Option<string>
    .flatMap(parse)                                 // Option<Date>
    .flatMap(date => new Some(date.toISOString()))
Option<string>
    .flatMap(date => new Some('Date is ' + date))
Option<string>
    .getOrElse('Error parsing date for some reason') // string
}