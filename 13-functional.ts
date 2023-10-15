//https://web.mit.edu/6.031/www/sp23/classes/13-functional/
[e1, e2, e3].reduce( (x: boolean, y: string) => x && y === 'true',
                     true );
/*
the type of the elements e1,e2,e3 : string
A reduction operates on a sequence of elements of type E and produces an F result. You can tell what E and F should be by examining the accumulator function, which is the first lambda expression. It has type F × E → F, so in this case, E must be string.

returns true iff e1,e2,e3 are all the string "true"
The first argument to the accumulator function in a reduce is the accumulated value so far, and the second is the new value to incorporate.
*/

let e1='true';
let e2='true';
let e3='true';
console.log([e1, e2, e3].reduce( (x: boolean, y: string) => x && y === 'true', true ));



let e4='false';
console.log([e4, e2, e3].reduce( (x: boolean, y: string) => x && y === 'true', true ));



["oscar", "papa", "tango"]
    .reduce((a,b) => a.length > b.length ? a : b)
console.log(["oscar", "papa", "tango"].reduce((a,b) => a.length > b.length ? a : b));



const array: Array<number> = [...];
//here are three possible ways to compute the minimum value of the array:

const result = array.reduce((x, y) => Math.min(x, y));



let result;
try {
    result = array.reduce((x, y) => Math.min(x, y));
} catch (e) {
    result = 0;
}



const result = array.reduce((x, y) => Math.min(x, y), Number.POSITIVE_INFINITY);



/*
result is the right answer when the array is [1, 2, 3]
result is the right answer when the array is [-1, -2, -3]
result is 0 when the array is empty
result is infinite when the array is empty
an exception is thrown (and not caught) when the array is empty
*/
let array = [1, 2, 3]
let array = [-1, -2, -3]
let array = []



console.log(result);



const x: number = 5;
const y: number = 8;

function isOdd(x:number): boolean {
  return x % 2 === 1;
}

const xIsOdd: boolean = x % 2 === 1;

function alwaysOdd(x:number): number {
  return isOdd(x) ? x : 1;
}

function identityFunction(x:number): number {
    return x;
}

function sum(x:number, y:number): number {
  return x + y;
}

const identity = (x:number) => x;

function product(x:number, y:number): number {
  return x * y;
}

function alwaysTrue(x:number): boolean {
  return true;
}



function productOfOdds(array: Array<number>): number {
return array
.map(identityFunction)
.filter(isOdd)
.reduce(product, 1)

/*
return array
.map(identity)
.filter(alwaysTrue)
.reduce(product, 1)

return array
.map(x)
.filter(alwaysOdd)
.reduce(product, 1)

return array
.map(alwaysOdd)
.filter(alwaysTrue)
.reduce(product, 1)

return array
.map(identityFunction)
.filter(xIsOdd)
.reduce(x*y, 1)
*/
}

console.log(productOfOdds([x, y]))



const input = new Map([ ['apple','red'], ['banana','yellow'] ]);
console.log(new Map([ ...input ].map(entry => entry.reverse())));

console.log(new Map([ ...input.entries() ].map(entry => entry.reverse())));
let r = new Map([...m].reverse());
// => a Map { 'red' => 'apple', 'yellow' => 'banana' }