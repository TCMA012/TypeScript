/*
Get an object's class name at runtime
beware that the name will likely be different when using minified code
*/
class MyClass {}
const instance = new MyClass();
console.log(instance.constructor.name);




export class Person {
    id: number;
    name: string;
    typeName: string;
    
    constructor() {
        this.typeName = "Person";
    }
}