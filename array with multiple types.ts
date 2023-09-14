/*
array with multiple types

Use a union type:
*/
const foo0: (string|number)[] = [ 1, "message" ];
/*
I have an array of the form: [ 1, "message" ].

If you are sure that there are always only two elements [number, string] then you can declare it as 
a tuple:
*/
const foo2: [number, string] = [ 1, "message" ];
//even provide meaningful names for the tuple members:
const foo3: [id: number, text: string] = [ 1, "message" ];