/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
5.5. Inferring Types in Conditionals
*/
/*
5.4. Removing Specific Object Properties
remove property keys of a certain type
switch the condition and return never in the true branch
*/
type Remove<O, T> = {
    [K in keyof O as O[K] extends T | undefined 
    ? never : K]: O[K];
}

//recursive
type Serialize<T> = NestSerialization<Remove<T, Function>>;

type NestSerialization<T> = {
    [K in keyof T]: T[K] extends object ? Serialize<T[K]> : T[K];
}

class Serializer {
    constructor() {}
    serialize<T>(obj: T): Serialize<T> {
        const ret: Record<string, any> = {};
        for (let k in obj) {
            if (typeof obj[k] === "object") {
                ret[k] = this.serialize(obj[k]);
            } else if (typeof obj[k] !== "function") {
                ret[k] = obj[k];   
            }
        }
        return ret as Serialize<T>;
    }
}

type Person = {
    name: string;
    age: number;
    profession: {
        title: string;
        level: number;
        printProfession: () => void;
    };
    hello: () => string;
};

const person: Person = {
    name: "TC",
    age: 58,
    profession: {
        title: "SW Developer",
        level: 5,
        printProfession() {
            console.log(`${this.title}, Level ${this.level}`);
        }
    },
    hello() {
        return `Hello ${this.name}`;
    },
}

const serializer = new Serializer();
const serializedPerson = serializer.serialize(person);
console.log(serializedPerson);
/*
[LOG]: {
  "name": "TC",
  "age": 58,
  "profession": {
    "title": "SW Developer",
    "level": 5
  }
} 
*/

{
/*
Objects can implement a serialize method,
the serializer takes the output of this method instead of serializing the object on its own.
*/
type Person = {
    name: string;
    age: number;
    profession: {
        title: string;
        level: number;
        printProfession: () => void;
    };
    hello: () => string;
    serialize: () => string;
};

const person: Person = {
    name: "TC",
    age: 58,
    profession: {
        title: "SW Developer",
        level: 5,
        printProfession() {
            console.log(`${this.title}, Level ${this.level}`);
        }
    },
    hello() {
        return `Hello ${this.name}`;
    },
    serialize() {
        return `${this.name}: ${this.profession.title} L${this.profession.level}`;
    },
};

/*
Before running NestSerialization, check in a conditional type if the object implements a serialize method.
We do so by asking if T is a subtype of a type that contains a serialize method.
If so, get to the return type, because that's the result of serialization.

This is where the infer keyword comes into play.
It allows us to take a type from a condition and use it as a type parameter in the true branch.
If this condition is true, take the type that Typescript found there and make it available.
*/
type Serialize<T> = T extends {serialize(): infer R}
    ? R
    : NestSerialization<Remove<T, Function>>;

/*
Think of R as being any at first.
If we check Person against {serialize(): any}
we hop into the true branch,
as Person has a serialize function, making it a valid sub-type.
But any is broad, and we are interested in the specific type at the position of any.
The infer keyword can pick that exact type.
So Serialize<T> reads:
If T contains a serialize method, get its return type and return it.
Otherwise, start serialization by deeply removing all properties that are of type Function.

We mirror that type's behavior in our JavaScript implementation as well.
We do a couple of type-checks (checking if serialize is available and if it's a function) and ultimately call it.
Typescript requires us to be explicit with type guards, to be sure that this function exists:
*/
class Serializer {
    constructor() {}
    serialize<T>(obj: T): Serialize<T> {
        if (
            //is an object
            typeof obj === "object" &&
            //not null
            obj &&
            //serialize is available
            "serialize" in obj &&
            //and a function
            typeof obj.serialize === "function"
        ) {
            return obj.serialize();
        }

        const ret: Record<string, any> = {};
        for (let k in obj) {
            if (typeof obj[k] === "object") {
                ret[k] = this.serialize(obj[k]);
            } else if (typeof obj[k] !== "function") {
                ret[k] = obj[k];   
            }
        }
        return ret as Serialize<T>;
    }
}

const serializer = new Serializer();
const serializedPerson = serializer.serialize(person);
console.log(serializedPerson);

/*
With this change, the type of serializedPerson is string,
and the result is as expected:
[LOG]: "TC: SW Developer L5" 
*/
}