/*
TypeScript homomorphic mapped type
https://github.com/Microsoft/TypeScript/wiki/FAQ
Mapped types declared as 
{ [ K in keyof T ]: U } 
where T is a type parameter are known as 
homomorphic mapped types, which means that the mapped type is a structure preserving function of T. When type parameter T is instantiated with a primitive type the mapped type evaluates to the same primitive.



https://nighttrax.dev/typescript-thursday-s01e02-mapped-types
Whenever a mapped type uses 
keyof
 to get the list of keys, or a generic type parameter with an extends keyof constraint, it becomes a homomorphic mapped type.

Notice how the length property was kept as number, and 
not mapped to Promise<number> by our mapped type. 
Even though keyof on arrays and tuples return the numeric keys and methods and properties such as length, 
homomorphic types will not apply any transformations to them.
*/
type Coordinate = [number, number];

type HomomorphicPromisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

type PromiseCoordinate = HomomorphicPromisify<Coordinate>;
//     ^? [Promise<number>, Promise<number>]

type Length = PromiseCoordinate['length'];
//     ^? 2



/*
https://stackoverflow.com/questions/59790508/what-does-homomorphic-mapped-type-mean
a homomorphic mapped type is specifically a type in which the compiler recognizes that you are 
mapping the properties of an existing object type. In such cases, 
the output object type will have the 
same readonly and/or optional (?) property modifiers on its properties as the ones on the input type do.
*/