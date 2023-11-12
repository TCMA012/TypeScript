/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
7.2. Typing a promisify Function
*/
//Every function head can be described as a tuple type
declare function hello(name: string, msg: string): void;
//is the same as:
declare function hello(...args: [string, string]): void;



declare function h(a: string, b: string, c: string): void;
//is the same as:
declare function h(a: string, b: string, ...r: [string]): void;
//is the same as:
declare function h(a: string, ...r: [string, string]): void;
//is the same as:
declare function h(...r: [string, string, string]): void;

/*
rest element - the last element, sucks all excess arguments in
rest element always have to be last.
Variadic Tuple Types in TypeScript can define somewhere in between.
*/



//takes an argument list of any type and creates a tuple
function tuple<T extends any[]>(...args: T): T {
    return args;
}

const numbers: number[] = getArrayOfNumbers();
const t1 = tuple("foo", 1, true);
const t2 = tuple("bar", ...numbers);
const t3 = tuple("bar", ...numbers, "x");

function getArrayOfNumbers(): number[] {
    throw new Error("Function not implemented.");
}



function loadFile(...args: [string, string, (result: File) => void]) {}
function request2(...args: [URL, (result: JSON) => void]) {}



type Fn<Args extends unknown[], Res> = (
    ...args: [...Args, (result: Res) => void]) => void;

type LoadFileFn = Fn<[string, string], File>;
type RequestFn = Fn<[URL], JSON>;



//start by inlining the newly created function directly
/*
function promisify<Args extends unknown[], Res>(
    fn: (...args: [...Args, (result: Res) => void]) => void
): (...args: Args) => Promise<Res> {

}
*/

/*
Return a function that accepts all parameters except for the callback.
This function returns a newly created Promise.
Since we don't have a callback yet, we need to construct it.
It calls the resolve function from the Promise, producing a result.
What has been split needs to be brought back together!
We add the callback to the arguments and call the original function.
*/
function promisify<Args extends unknown[], Res>(
    fn: (...args: [...Args, (result: Res) => void]) => void
): (...args: Args) => Promise<Res> {
    return function (...args: Args) {
        return new Promise((resolve) => {
            function callback(res: Res) {
                resolve(res);
            }
            fn.call(null, ...[...args, callback]);
        });
    };
}