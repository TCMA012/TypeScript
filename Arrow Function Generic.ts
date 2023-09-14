/*
Typescript arrow functions with generics
Make An Arrow Function Generic
https://timmousk.com/blog/typescript-arrow-function-generic/
https://askjavascript.com/what-is-the-syntax-for-typescript-arrow-functions-with-generics/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

const arrowFunction = <GenericType>(arg: GenericType): ReturnType => {
   // Function body
};
*/
interface IAnimal {
    type: string;
    eat: () => void;
}

class Dog implements IAnimal {
    type = 'dog';

    eat(): void {
        console.log('eating')
    }
}

const output = <T extends IAnimal>(value: T): void => {
    console.log(value);
};


// Outputs: Dog { type: 'dog' }
output(new Dog());



const identity = <T>(value: T): T => {
    return value;
};

const numberValue = identity<number>(42);
const stringValue = identity<string>("Hello, TypeScript!");

console.log(numberValue)
console.log(stringValue)



const getX = <T>(x: T) => x;
console.log(getX('a'));

//To make a generic TypeScript function work in .tsx files, you can add a comma after the last generic parameter.
const getXtsx = <T,>(x: T) => x;
console.log(getXtsx('a'));




const returnInArray = <T,>(value: T): T[] => {
    return [value];
};

const strArray = returnInArray<string>('bobbyhadz.com');
const numArray = returnInArray<number>(100);
console.log('strArray', strArray);
console.log('numArray', numArray);



