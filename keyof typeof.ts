/*
To understand the keyof typeof usage in TypeScript, 
first you need to understand what are literal types and union of literal types. 
So, I'll explain these concepts first and then explain keyof and typeof individually in detail. 
After that, I'll come back to enum to answer what is asked in the question. 
It's a long answer but examples are easy to understand.

Literal types
Literal types in TypeScript are more specific types of string, number or boolean. 
For example, 
"Hello World" is a string, but 
a string is not "Hello World". 
"Hello World" is a more specific type of type string, so it is a literal type.

A literal type can be declared as following:
*/
type Greeting0 = "Hello"
/*
This means that the object of type Greeting can have only a string value "Hello" and 
no other string value or any other value of any other type as shown in the following code:
*/
let greeting: Greeting0
greeting = "Hello" // OK
greeting = "Hi"    // Error: Type '"Hi"' is not assignable to type '"Hello"'
/*
Literal types are not useful on their own, however when combined with union types, 
type aliases and type guards they become powerful.

Following is an example of union of literal types:
*/
{
type Greeting = "Hello" | "Hi" | "Welcome"
//Now the object of type Greeting can have the value either "Hello", "Hi" or "Welcome".
let greeting: Greeting
greeting = "Hello"       // OK
greeting = "Hi"          // OK
greeting = "Welcome"     // OK
greeting = "GoodEvening" // Error: Type '"GoodEvening"' is not assignable to type 'Greeting'
}
/*
keyof only
keyof of some type T gives you a new type that is a union of literal types and these 
literal types are the names of the properties of T. 
The resulting type is a subtype of string.
*/
interface Person {
    name: string
    age: number
    location: string
}
//Using the keyof operator on the type Person will give you a new type as shown in the following code:
type SomeNewType = keyof Person
/*
This SomeNewType is a union of literal types ("name" | "age" | "location") that is made from the properties of type Person.

Now you can create objects of type SomeNewType:
*/
let newTypeObject: SomeNewType
newTypeObject = "name"           // OK
newTypeObject = "age"            // OK
newTypeObject = "location"       // OK
newTypeObject = "anyOtherValue"  // Error...
/*
keyof typeof together on an object
As you might already know, the typeof operator gives you the type of an object. 
In the above example of Person interface, we already knew the type, so we just had to 
use the keyof operator on type Person.

But what to do when we don't know the type of an object or we just have a value and not a type of that value like the following?
*/
const bmw = { name: "BMW", power: "1000hp" }
/*
This is where we use keyof typeof together.

The typeof bmw gives you the type: { name: string, power: string }

And then keyof operator gives you the literal type union as shown in the following code:
*/
type CarLiteralType = keyof typeof bmw

let carPropertyLiteral: CarLiteralType
carPropertyLiteral = "name"       // OK
carPropertyLiteral = "power"      // OK
carPropertyLiteral = "anyOther"   // Error...
/*
keyof typeof on an enum
enums are used as types at compile-time to achieve type-safety for the constants but 
they are treated as objects at runtime. 
This is because, they are converted to plain objects once the TypeScript code is compiled to JavaScript. 
So, the explanation of the objects above is applicable here too. The example given by OP in the question is:
*/
enum ColorsEnum {
    white = '#ffffff',
    black = '#000000',
}
/*
Here ColorsEnum exists as an object at runtime, not as a type. 
So, we need to invoke keyof typeof operators together as shown in the following code:
*/
type Colors = keyof typeof ColorsEnum

let colorLiteral: Colors
colorLiteral = "white"  // OK
colorLiteral = "black"  // OK
colorLiteral = "red"    // Error..



const lookup = { a: 1, b: 2, c: 3, d: 4 };
const res = ['a', 'b', 'c', 'd'].map((value) => lookup[value as keyof typeof lookup]);
console.log(res);
/*
This assertion is necessary because the 
type of ['a', 'b', 'c', 'd'] is being inferred as string[] which is too wide to be used as the keys of lookup.

Another way of fixing this would be with a const assertion:
*/

const keys = ['a', 'b', 'c', 'd'] as const;
type keys3 = keyof typeof lookup;

const res2 = keys.map((value) => lookup[value]);
console.log(res2);
/*
const res3 = keys3.map((value) => lookup[value]);
console.log(res3);
*/



const a = { value: 100, text: "Test_a" } // type { value: number, text: string }

const b: typeof a = { value: 200, text: "Test_b" }
const c: typeof a = { value: 300, text: 300 } // Type 'number' is not assignable to type 'string'

//The keyof operator takes an object type and produces a string or numeric literal union of its key.
type t = keyof { value: 100, text: "Test_a" } // t = "value" | "text"

const aa: t = "value"
const bb: t = 10 // Type '10' is not assignable to type '"value" | "text"'

{
//If you want to make a type of an object, you need to use both keyof and typeof.
// keyof cannot be used with variables
const a = { value: 100, text: "Test_a" }
type t0 = keyof a // 'a' refers to a value, but is being used as a type here.

type t = keyof typeof a // type t = "text" | "value"
}



/*
the strongly typed Object.keys are fine at compile time. But objects often have extra properties at runtime. 
If this is the case, Object.keys will return extra keys, 
those extra keys will violate the assumption that keyof is an exhaustive list of the key of the object. 
This may cause the app to crash.
To workaround this restriction, the simplest solution is to use type assertion with the keyof operator:
only want to use these methods when you are sure that there won’t be additional properties added to your object at runtime
*/
const user = {
    name: 'John',
    age: 32
};
type userKeyType = keyof typeof user; //  "name" | "age"
Object.keys(user).forEach((key) => {
    console.log(user[key as userKeyType])
})

//A more elegant solution is to extend the ObjectConstructor interface by declaration merge:
interface ObjectConstructor {
    keys<T>(o: T): (keyof T)[];
}

Object.keys(user).forEach((key) => {
    console.log(user[key]);
});



//The following function can retrieve the type of an object property using generics, an indexed access type, and the keyof operator:
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
/*
keyof T returns a union of string literal types. 
The extends keyword is used to apply constraints to K, so that K is one of the string literal types only
extends means “is assignable” instead of “inherits”; 
K extends keyof T means that any value of type K can be assigned to the string literal union types
The indexed access operator obj[key] returns the same type that the property has
We can see how the getProperty type is used below:

https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
*/
type Staff = {
    name: string;
    salary: number;
} 

const developer: Staff = {
  name: 'Tobias',
  salary: 100, 
};

const nameType = getProperty(developer, 'name'); // string 
// Compiler error 
const salaryType = getProperty(developer, ‘pay’); //Cannot find name 'pay'.(2304)
/*
The compiler will validate the key to match one of the property names of type T 
because we apply the type constraint for the second parameter. 
In the above example, the compiler shows the error when an invalid key '``pay``' is passed.
*/
/*
If we don’t use the keyof operator, we can declare a union type manually:
type staffKeys = 'name' | 'salary';
function getProperty<T, K extends staffKeys>(obj: T, key: K): T[K] {
return obj[key];
}
The same type of constraint is applied, but the manual approach is less maintainable. 
Unlike the keyof operator approach, the type definition is duplicated and 
the change of the original Staff type won’t be automatically propagated.
*/



/*
[Property in keyof T] denotes the iteration of all property names of type T, and 
the square bracket is the index signature syntax. 
*/
type OptionsFlags<T> = {
    [Property in keyof T]: boolean;
};

type FeatureFlags = { 
  darkMode: () => void;
  newUserProfile: () => void; 
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
/*
type FeatureOptions = {
  darkMode: boolean; 
  newUserProfile: boolean; 
} 
*/

type FeatureOptionsRecord = Record<keyof FeatureFlags, boolean>; 
/* type FeatureOptionsRecord = { 
  darkMode: boolean; 
  newUserProfile: boolean; 
} 
*/



//only map the non-function properties to Boolean types:
type OptionsFlags2<T> = {
    [Property in keyof T]: T[Property] extends Function ? T[Property] : boolean };

type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
    userManagement: string;
    resetPassword: string
};

type FeatureOptions2 = OptionsFlags2<Features>;
/*
type FeatureOptions2 = {
   darkMode: () => void;
   newUserProfile: () => void;
   userManagement: boolean;
   resetPassword: boolean;
} 
*/



type FeatureDarkModeOption = Pick<FeatureOptions, 'darkMode'>;
/*
type FeatureDarkModeOption = {
    darkMode: boolean;
} 
*/



type HorizontalPosition = { left: number; right: number };
type VerticalPosition = { up: number; down: number };
type TransportMode = {walk: boolean, run: boolean};

type MovePosition = `${keyof TransportMode}: ${keyof VerticalPosition}-${keyof HorizontalPosition}`;
/*
type MovePosition = "walk: up-left" | "walk: up-right" | "walk: down-left" | "walk: down-right" | "run: up-left" | "run: up-right" | "run: down-left" | "run: down-right"
*/



/*
the Capitalize type requires the type parameter to be 
string | number | bigint | boolean | null | undefined
But P is a union type of string | number | symbol. The symbol type in P isn’t compatible with Capitalize.

Thus, we apply & (intersection) between our string type and P type, 
<string & P>
which returns only the string type.
*/

interface Person {
    name: string;
    age: number;
    location: string;
}

type CapitalizeKeys<T> = {
    [P in keyof T as `${Capitalize<string & P>}`]: T[P];
}

type PersonWithCapitalizedKeys = CapitalizeKeys<Person>;
/*
type PersonWithCapitalizedKeys = {
    Name: string;
    Age: number;
    Location: string;
}
*/



type Getter<T> = {
    [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
};

type PersonWithGetter = Getter<Person>;
/*
type PersonWithGetters = {
    getName: () => string;
    getAge: () => number;
    getLocation: () => string;
}
*/



type AsyncGetter<T> = {
    [P in keyof T as `get${Capitalize<string & P>}Async`]: () => Promise<T[P]>;
}

type PersonWithAsyncGetters = AsyncGetter<Person>;
/*
type PersonWithAsyncGetters = {
    getNameAsync: () => Promise<string>;
    getAgeAsync: () => Promise<number>;
    getLocationAsync: () => Promise<string>;
}
*/