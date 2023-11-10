/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
6.4. Extracting Format Parameter Types
Define types for placeholder


FormatObj<T> works the same way as Record<FormatKeys<T>, any>
*/
{
type FormatObj<T extends string> = 
    T extends `${string}{${infer Key}}${infer Rest}`
    ? {[K in Key]: any} | FormatObj<Rest>
    : {};
}
/*
Change the parsing condition in FormatObj<T> to also look out for
colon delimiters.
If we find a : character,
we infer the subsequent string type in Type
and use it as the type for the mapped-out key
*/
{
type FormatObj<T extends string> = 
    T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
    ? {[K in Key]: Type} | FormatObj<Rest>
    : {};
}
/*
There's one caveat.
We infer a _string_ literal type.
e.g.
Parsing {age: number},
the type of age would be the literal string "number".
We need to convert this string to an actual type.
We could do another conditional type or use a map type as a lookup
*/
type MapFormatType = {
    string: string;
    number: number;
    boolean: boolean;
    [x: string]: any;
};

type A64 = MapFormatType["string"]; //string
type B64 = MapFormatType["number"]; //number
type C64 = MapFormatType["notavailable"]; //any
{
/*
The problem is that we expect every placeholder to also define a type.
We want to make types optional.
But our parsing condition explicitly asks for : delimiters,
so every placeholder that doesn't define a type doesn't produce a property, either.
*/
{
type FormatObj<T extends string> = 
    T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
    ? {[K in Key]: MapFormatType[Type]} & FormatObj<Rest>
    : {};
}
{
/*
The solution is to do the check for types _after_ we check for placeholder.
1. Check if there is a placeholder available.
2. If a placeholder is available, check if there is a type annotation.
If so, map the key to a format type; otherwise, map the original key to any.
3. In all other cases, return the empty object.
*/
type FormatObj<T extends string> = 
    T extends `${string}{${infer Key}}${infer Rest}`
    ? Key extends `${infer KeyPart}:${infer TypePart}`
    ? {[K in KeyPart]: MapFormatType[TypePart]} & FormatObj<Rest>
    : {[K in Key]: any} & FormatObj<Rest>
    : {};
}
/*
There is one fail-safe guard that we can add.
Instead of allowing any type for placeholders without a type definition,
we can at least expect that the type implements toString().
This ensures we always get a string representation.
*/
type FormatObj<T extends string> = 
    T extends `${string}{${infer Key}}${infer Rest}`
    ? Key extends `${infer KeyPart}:${infer TypePart}`
    ? {[K in KeyPart]: MapFormatType[TypePart]} & FormatObj<Rest>
    : {[K in Key]: {toString(): string}} & FormatObj<Rest>
    : {};

/*
A regular expression to replace names with potential type annotations.
There is no need to check types within the function.
*/
function format<T extends string, K extends FormatObj<T>>(
    fmtString: T, 
    params: K): string {
    let ret: string = fmtString;
    for (let k in params) {
        let val = `${params[k]}`;
        let searchPattern = new RegExp(`{${k}:?.*?}`, "g");
        ret = ret.replaceAll(searchPattern, val);
    }
    return ret;
}

}