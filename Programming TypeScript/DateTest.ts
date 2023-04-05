//Chapter 7 Handling Errors
function isValid(date: Date) {
    return Object.prototype.toString.call(date) === '[object Date]'
        && !Number.isNaN(date.getTime())
}

/*
https://stackoverflow.com/questions/18885015/object-prototype-tostring-calldate-object-date

Object.prototype.toString; the native toString method of all Objects.
Function.prototype.call; a method to invoke a function with a chosen this

Object.prototype.toString.call(date) is invoking the native toString of all Objects on date. This might be different to date.toString() if there is another toString defined on or inherited by date.

Object.prototype.toString returns a String of the form [object X] where X is the type of this, so comparing against [object Date] with === is asking "Is date a Date?"

Why is doing this check more useful than typeof? Because typeof will often just return "object", which is not often helpful.

What about instanceof? This will be true if the thing you're checking inherits from what you're testing against as well, so for example, x instanceof Object is usually true, which is not always helpful either.

An alternate method you could think of as similar would be to test the constructor of an Object. x.constructor === Date. This has a different set of problems, such as throwing errors if x is undefined or null so needs more checks etc. but it can be more helpful if you're working with non-native constructors, for which toString would simply give [object Object].

All this said, you need to consider whether this test will ever be true given the environment you're working with. Currently there is no standard JSON representation of a Date.
*/
// https://tc39.es/proposal-temporal/docs/cookbook.html