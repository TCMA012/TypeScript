/*
TypeScript Quickly
Fain, Yakov

https://github.com/yfain/getts
https://www.manning.com/books/typescript-quickly
https://livebook.manning.com/book/typescript-quickly/chapter-4/92
*/
//Listing 4.2. The enum with auto-increment values
enum Weekdays {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

//Reversing numeric enums
console.log(Weekdays[3]); //2



//Listing 4.4. Converting temperature with enums
enum Direction {
    FtoC,
    CtoF
}

function convertTemperature(temp: number, fromTo: Direction): number {

    return (Direction.FtoC === fromTo) ?
            (temp - 32) * 5.0/9.0:
            temp * 9.0 / 5.0 + 32;
}

console.log(`70F is ${convertTemperature(70, Direction.FtoC)}C`);
console.log(`21C is ${convertTemperature(21, Direction.CtoF)}F`);



//Listing 4.5. Declaring a string enum
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

function move(direction: 'Up' | 'Down' | 'Left' | 'Right') {  }
move('North'); // compilation error



{
//defining a custom type:
type Direction = 'Up' | 'Down' | 'Left' | 'Right';
function moveCustomType(direction: Direction) {}
moveCustomType('North'); // compilation error
}



//Listing 4.6. Declaring a string enum for monitoring actions
enum ProductsActionTypes {
    Search = 'Products Search',
    Load = 'Products Load All',
    LoadFailure = 'Products Load All Failure',
    LoadSuccess = 'Products Load All Success'
}

// If the function that loads products fails...
console.log(ProductsActionTypes.LoadFailure);



{
//Listing 4.7. Using a generic type
class Person {
    name: string;
}
 
class Employee extends Person {
    department: number;
}
 
class Animal {
    breed: string;
}
 
const workers: Array<Person> = [];
 
workers[0] = new Person();
workers[1] = new Employee();
workers[2] = new Animal(); // compile-time error




//generic arrays
const values1: string[] = ["Mary", "Joe"];
const values2: Array<string> = ["Mary", "Joe"];
const values3: Array<string | number> = ["Mary", 123, true]; // error
const values4: Array<string | number> = ["Joe", 123, 567]; // no errors



workers.push(new Person());
}


//Listing 4.11. a generic interface
interface Comparator<T> {
    compareTo(value: T): number;
}
 
class Rectangle implements Comparator<Rectangle> {
 
    constructor(private width: number, private height: number){};
 
    compareTo(value: Rectangle): number {
        return this.width * this.height - value.width * value.height;
    }
}
 
const rect1:Rectangle = new Rectangle(2,5);
const rect2: Rectangle = new Rectangle(2,3);
 
rect1.compareTo(rect2) > 0 ? console.log("rect1 is bigger"):
   rect1.compareTo(rect2) == 0 ? console.log("rectangles are equal") : 
 console.log("rect1 is smaller");
 
class Programmer implements Comparator<Programmer> {
 
    constructor(public name: string, private salary: number){};
 
    compareTo(value: Programmer): number{
        return this.salary - value.salary;
    }
}
 
const prog1:Programmer = new Programmer("John",20000);
const prog2: Programmer = new Programmer("Alex",30000);
 
prog1.compareTo(prog2) > 0 ? console.log(`${prog1.name} is richer`):
      prog1.compareTo(prog2) == 0?
           console.log(`${prog1.name} and ${prog1.name} earn the 
 same amounts`) :
           console.log(`${prog1.name} is poorer`);
/*
rect1 is bigger
John is poorer
*/


//Listing 4.14. Using generic types in fat arrow functions
const printMe = <T> (content: T): T => {
    console.log(content);
    return content;
}
 
const a = printMe("Hello");
 
class Person{
  constructor(public name: string) { }
}
 
const b = printMe(new Person("Joe"));



//Listing 4.17. Using compare() and Pair
class Pair<K, V> {
    constructor(public key: K, public value: V) {}
}

function compare <K,V> (pair1: Pair<K,V>, pair2: Pair<K,V>): boolean {
    return pair1.key === pair2.key &&
            pair1.value === pair2.value;
}

let p1: Pair<number, string> = new Pair(1, "Apple");

let p2 = new Pair(1, "Orange");

// Comparing apples to oranges
console.log(compare<number, string>(p1, p2));

let p3 = new Pair("first", "Apple");

let p4 = new Pair("first", "Apple");

// Comparing apples to apples
console.log(compare(p3, p4));



//Listing 4.18. Mapping string enums
interface User {
    name: string;
    role: UserRole;
}
 
enum UserRole {
    Administrator = 'admin',
    Manager = 'manager'
}
 
function loadUser<T>(): T {
    return JSON.parse('{ "name": "john", "role": "admin" }');
}
 
const user = loadUser<User>();
 
switch (user.role) {
    case UserRole.Administrator: console.log('Show control panel'); break;
    case UserRole.Manager: console.log('Hide control panel'); break;
}



/*
4.2.4 Enforcing the return type of higher-order functions

Listing 4.19. Using a higher-order function
innerFunc is a closure that knows that someValue = 10
*/
const outerFunc = (someValue: number) =>
    (multiplier: number) => someValue * multiplier;
 
const innerFunc = outerFunc(10);
 
let result = innerFunc(5); //invokes the returned function
 
console.log(result); //50



{
//Listing 4.20. Using the generic numFunc<T> function
type numFunc<T> = (arg: T) => (c: number) => number;

const noArgFunc: numFunc<void> = () =>
        (c: number) => c + 5;
const numArgFunc: numFunc<number> = (someValue: number) =>
                         (multiplier: number) => someValue * multiplier;
const stringArgFunc: numFunc<string> = (someText: string) =>
                        (padding: number) => someText.length + padding;
 
const createSumString: numFunc<number> = () => (x: number) => 'Hello';
}