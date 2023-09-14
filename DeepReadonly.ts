/*
TypeScript DeepReadonly

Conditional types
https://github.com/Microsoft/TypeScript/pull/21316

Combining all of the above to create a 
DeepReadonly<T> type that recursively makes all properties of an object read-only and 
removes all function properties (i.e. methods):
*/
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>;
};



interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
}

function f10(part: DeepReadonly<Part>) {
    let name: string = part.name;
    let id: number = part.subparts[0].id;
    part.id = part.id;  // Error
    part.subparts[0] = part.subparts[0];  // Error
    part.subparts[0].id = part.subparts[0].id;  // Error
    part.updatePart("hello");  // Error
}
/*
Similar to union and intersection types, 
conditional types are not permitted to reference themselves recursively 
(however, indirect references through interface types or object literal types are allowed, as illustrated by the 
DeepReadonly<T> example above).



https://github.com/microsoft/TypeScript/issues/13923



https://github.com/sindresorhus/type-fest/blob/main/source/readonly-deep.d.ts
https://github.com/sindresorhus/type-fest/ReadonlyDeep
*/