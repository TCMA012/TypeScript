/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
6.3. Writing a Formatter Function

Define format strings by defining placeholders with curly braces.
A second parameter takes an object with substitutions, 
so for each placeholder defined in the format string,
there is one property key with the respective value:
*/
format("Hello {world}. My name is {you}.", {
    world: "World",
    you: "TC",
});

/*
function format(fmtString: string, params: Record<string, any>): string {
    throw "unimplemented";
}
*/
namespace x {
//T is a subtype of string
function format<T extends string>(fmtString: T, params: Record<string, any>): string {
    throw "unimplemented";
}
}
/*
Check if the format string
- Starts with a string; this can also be an empty string
- Contains a {, followed by any string, followed by a }
- Is followed again by any string

i.e. Check if there is exactly one placeholder in the format string.
If so, return the entire format string, 
and if not, return never
*/
{
type FormatKeys<T extends string> = 
    T extends `${string}{${string}}${string}`
    ? T
    : never;

type A = FormatKeys<"Hello {world}">; //"Hello {world}"
type B = FormatKeys<"Hello">; //never
}

{
/*
If the format string matches this pattern : the piece between the curly braces,
the infer keyword grab whatever literal type you find between curly braces and put it in a type variable:
*/
type FormatKeys<T extends string> = 
    T extends `${string}{${infer Key}}${string}`
    ? Key
    : never;

//extract substring - the first placeholder name
type A = FormatKeys<"Hello {world}">; //"world"
type B = FormatKeys<"Hello">; //never
}

/*
Since there might be placeholders following,
we take everything after the first placeholder and store it in a type variable called Rest.
This condition will be always true,
because either Rest is the empty string or
it contains an actual string that we can analyze again.
We take the Rest and
in the true branch
call FormatKeys<Rest>
in a union type of Key.

This is a recursive conditional type.
The result will be a union of placeholders,
which we can use as keys for the formatting object.
*/
type FormatKeys<T extends string> = 
    T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | FormatKeys<Rest>
    : never;

type A = FormatKeys<"Hello {world}">; //"world"
type A2 = FormatKeys<"Hello {world}. I'm {you}.">; //"world" | "you"
type B = FormatKeys<"Hello">; //never

/*
Annotating ret to string allow modifying ret.
Assert that the object key k is a key of params.
*/
function format<T extends string>(
    fmtString: T, 
    params: Record<FormatKeys<T>, any>): string {
    let ret: string = fmtString;
    for (let k in params) {
        /*
        Property 'replaceAll' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2021' or later.ts(2550)
        */
        ret = ret.replaceAll(`{${k}}`,params[k as keyof typeof params]);
    }
    return ret;
}