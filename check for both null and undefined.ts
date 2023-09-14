/*
check for both `null` and `undefined`

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
https://github.com/tc39/proposal-optional-chaining/

Optional chaining and Nullish Coalescing to check null and undefined in the same time

Optional chaining lets us write code where TypeScript can immediately 
stop running some expressions if we run into a null or undefined. 
the new ?. operator for optional property accesses
this is a way of saying that when foo is defined, foo.bar.baz() will be computed; 
but when foo is null or undefined, stop what we’re doing and just return undefined.
Note that if bar is null or undefined, our code will still hit an error accessing baz. 
Likewise, if baz is null or undefined, we’ll hit an error at the call site. 

?. only checks for whether the value on the left of it is null or undefined - not any of the subsequent properties.
The opportunity of short-circuiting happens only at one time, just after having evaluated the LHS of the Optional Chaining operator. If the result of that check is negative, evaluation proceeds normally.
In other words, the ?. operator has an effect only at the very moment it is evaluated. 
It does not change the semantics of subsequent property accesses, method or function calls.
*/
obj?.prop       // optional static property access
obj?.[expr]     // optional dynamic property access
func?.(...args) // optional function or method call


let x = foo?.bar.baz();

let x2 = foo?.bar();

if (foo?.bar?.baz) { // ... }

var street = user.address?.street
var fooValue = myForm.querySelector('input[name=foo]')?.value

//The call variant of Optional Chaining is useful for dealing with interfaces that have optional methods:
iterator.return?.() // manually close an iterator

//or with methods not universally implemented:
if (myForm.checkValidity?.() === false) { // skip the test in older web browsers
    // form validation fails
    return;
}



//Nullish Coalescing
//When some other value than undefined is desired for the missing case
var y = possibleUndefinedOrNull ?? fallbackValueIfFirstValueIsUndefinedOrNull;
let x = foo ?? bar(); // return foo if it's not null or undefined otherwise calculate bar

// falls back to a default value when response.settings is missing or nullish
// (response.settings == null) or when response.settings.animationDuration is missing
// or nullish (response.settings.animationDuration == null)
const animationDuration = response.settings?.animationDuration ?? 300;



/*
Using a juggling-check, you can test both null and undefined in one hit:
type coercion

if (x == null) {
//If you use a strict-check, it will only be true for values set to null and won't evaluate as true for undefined variables:

if (x === null) {
//You can try this with various values using this example:
*/
var a: number;
var b: number = null;

function check(x, name) {
    if (x == null) {
        console.log(name + ' == null');
    }

    if (x === null) {
        console.log(name + ' === null');
    }

    if (typeof x === 'undefined') {
        console.log(name + ' is undefined');
    }
}

check(a, 'a');
check(b, 'b');