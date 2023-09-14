//typescript Array.isArray
const arr: string[] = ['bobby', 'hadz', 'com'];

const isArray = Array.isArray(arr); // 👉️ true
console.log('isArray', isArray);

if (Array.isArray(arr)) {
  const isStringArray =
    arr.length > 0 &&
    arr.every((value) => {
      return typeof value === 'string';
    });

  console.log(isStringArray); // 👉️ true
}



console.log(Array.isArray([])); // 👉️ true
console.log(Array.isArray({})); // 👉️ false
console.log(Array.isArray('bobbyhadz.com')); // 👉️ false



export interface Person {
    firstName: string;
    age: number;
}

export function validatePerson(person: any): person is Person {
    return typeof person.firstName === "string" && typeof person.age === "number"
}

export const person: Person = {firstName: "Foo", age: 100};
export const someone: unknown = person;
export const someone2: Person | string = person;

function createUnion(): number | string | number[] {
    const r = Math.random();
    return r > 0.66 ? 42 : (r > 0.33 ? "hello" : [1, 2, 3]) ;
}
export const union = createUnion();

export function innerScopeTS() {
    someone.firstName; // ? other bug
    if (validatePerson(someone)) {
        someone.firstName;
    }

    someone2.firstName;
    if (validatePerson(someone2)) {
        someone2.firstName;
    }

    if (typeof union === "number") {
        union.toFixed();
        union.join(`, `);
        union.toUpperCase();
    }
    else if (Array.isArray(union)) {
        union.toFixed();
        union.join(`, `);
        union.toUpperCase();
    }
    else {
        union.toFixed();
        union.join(`, `);
        union.toUpperCase();
    }
}



function isArrayOfNumbers(value: any): value is number[] {
    return Array.isArray(value) && value.every(item => typeof item === 'number');
}

const arr1: any = [1, 2, 3];
const arr2: any = [1, 'two', 3];

if (isArrayOfNumbers(arr1)) {
    console.log('arr1 is an array of numbers');
} else {
    console.log('arr1 is not an array of numbers');
}

if (isArrayOfNumbers(arr2)) {
    console.log('arr2 is an array of numbers');
} else {
    console.log('arr2 is not an array of numbers');
}


//generic
function isArrayOf<T>(value: any, typeCheck: (item: any) => item is T): value is T[] {
    return Array.isArray(value) && value.every(typeCheck);
}

function isNumber(value: any): value is number {
    return typeof value === 'number';
}

if (isArrayOf(arr1, isNumber)) {
    console.log('arr1 is an array of numbers');
} else {
    console.log('arr1 is not an array of numbers');
}

if (isArrayOf(arr2, isNumber)) {
    console.log('arr2 is an array of numbers');
} else {
    console.log('arr2 is not an array of numbers');
}



function isArrayTest(object: unknown): object is unknown[] {
    return Array.isArray(object)
}