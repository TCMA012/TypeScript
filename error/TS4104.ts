/*
The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.ts(4104)

https://typescript.tv/errors/#TS4104
error TS4104: The type ‘readonly [1, 2, 3]‘ is ‘readonly’ and cannot be assigned to the mutable type ‘[1, 2, 3]‘.

Broken Code ❌
*/
const array: [1, 2, 3] = [1, 2, 3] as const;

/*
Fixed Code ✔️

Using a const assertion makes your array immutable, so you have to use the readonly modifier for its type:
*/
const array: readonly [1, 2, 3] = [1, 2, 3] as const;

//Alternative:

const array: Readonly<[1, 2, 3]> = [1, 2, 3] as const;

//Alternative #2:

const array: ReadonlyArray<number> = [1, 2, 3] as const;

