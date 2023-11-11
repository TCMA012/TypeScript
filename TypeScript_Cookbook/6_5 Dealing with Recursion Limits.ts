/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/

6.5. Dealing with Recursion Limits

Use the accumulation technique to enable tail-call optimization.

TypeScript's string template literal types in combination with conditional types allow you to create new string types on the fly, which can serve as property keys or check your program for valid strings.
They work using recursion, which means that just like a function,
you can call the same type over and over again, up to a certain limit.
*/
//removes whitespaces at the start and end of your string type
type Trim<T extends string> =
    T extends ` ${infer X}` ? Trim<X> :
    T extends `${infer X} ` ? Trim<X> :
    T;

type Trimmed = Trim<"   key  ">; // "key"


/*
recursively call conditional types to create a valid string identifier out of any string, by removing whitespace and invalid characters.
*/
/*
helper checks if there is a whitespace, 
infers the strings in front of the whitespace and after the whitespace (which can be empty strings), and 
calls the same type again with a newly formed string type.
It uncapitalizes the first inference and
capitalizes the second inference to 
create a camel-case-like string identifier.
*/
type RemoveWhitespace<T extends string> =
    T extends `${infer A} ${infer B}`
    ? RemoveWhitespace<`${Uncapitalize<A>}${Capitalize<B>}`>
    : T;
{
type Identifier = RemoveWhitespace<"Hello World!">; //helloWorld!
}
/*
We want to check if the remaining characters are valid.
We use recursion to take a string of valid characters,
split them into single string types with only one character, and
create a capitalized and uncapitalized version:
*/
type StringSplit<T extends string> =
    T extends `${infer Char}${infer Rest}`
    ? Capitalize<Char> | Uncapitalize<Char> | StringSplit<Rest>
    : never;

type Chars = StringSplit<"abcdefghijklmnopqrstuvwxyz">;


/*
We shave off the first character we find,
capitalize it,
uncapitalize it, and
do the same with the rest until no more strings are left.
Note that this recursion can't be tail-call optimized,
as we put the recursive call in a union type with the results
from each recursion step.

TypeScript is ok:
*/
type CreateIdentifier<T extends string> =
    RemoveWhitespace<T> extends `${infer A extends Chars}${infer Rest}`
    ? `${A}${CreateIdentifier<Rest>}`
    : RemoveWhitespace<T> extends `${infer A}${infer Rest}`
    ? CreateIdentifier<Rest>
    : T;

type Identifier = CreateIdentifier<"Hello Wor!ld!">; //"helloWorld"

/*
In case TypeScript is not ok.
Use the accumulation technique to enable tail-call optimization.
We pass a second type parameter called Acc,
which is of a type string
and is instantiated with the empty string.
We use this as an accumulator where we store the intermediate result,
passing it over and over again to the next call:
*/
{
type CreateIdentifier<T extends string, Acc extends string = ""> =
    RemoveWhitespace<T> extends `${infer A extends Chars}${infer Rest}`
    ? CreateIdentifier<Rest, `${Acc}${A}`>
    : RemoveWhitespace<T> extends `${infer A}${infer Rest}`
    ? CreateIdentifier<Rest, Acc>
    : Acc;

type Identifier = CreateIdentifier<"Hello Wor!ld!">; //"helloWorld"
}