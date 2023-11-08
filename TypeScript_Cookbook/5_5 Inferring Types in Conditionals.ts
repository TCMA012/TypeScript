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
        title: "sW Developer",
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
    "title": "sW Developer",
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
        title: "sW Developer",
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

type Serialize<T> = T extends {serialize(): infer R}
    ? R
    : NestSerialization<Remove<T, Function>>;

/*

*/
}