/*
Index Signatures
https://dmitripavlutin.com/typescript-index-signatures/
https://basarat.gitbook.io/typescript/type-system/index-signatures
https://stackoverflow.com/questions/13315131/enforcing-the-type-of-the-indexed-members-of-a-typescript-object
{ [key: KeyType]: ValueType }
*/
interface StringByString {
  [key: string]: string;
}

const heroesInBooks: StringByString = {
  'Gunslinger': 'The Dark Tower',
  'Jack Torrance': 'The Shining'
};



interface AgeMap {
  [name: string]: number
}

const friendsAges: AgeMap = {
  "Sandy": 34,
  "Joe": 28,
  "Sarah": 30,
  "Michelle": "fifty", // ERROR! Type 'string' is not assignable to type 'number'.
};



interface Options {
  [key: string]: string | number | boolean;
  timeout: number;
}

const options: Options = {
  timeout: 1000,
  timeoutMessage: 'The request timed out!',
  isFileUpload: false
};



type DayOfTheWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

type ChoresMap = { [DAY in DayOfTheWeek]: string };

type DayOfTheWeekMap<T> = { [DAY in DayOfTheWeek]: T };

const chores: DayOfTheWeekMap<string> = {
  "sunday": "do the dishes",
  "monday": "walk the dog",
  "tuesday": "water the plants",
  "wednesday": "take out the trash",
  "thursday": "clean your room",
  "friday": "mow the lawn",
  "saturday": "relax",
};

const workDays: DayOfTheWeekMap<boolean> = {
  "sunday": false,
  "monday": true,
  "tuesday": true,
  "wednesday": true,
  "thursday": true,
  "friday": true,
  "saturday": false,
};

const choresERROR: ChoresMap = { // ERROR! Property 'saturday' is missing in type '...'
  "sunday": "do the dishes",
  "monday": "walk the dog",
  "tuesday": "water the plants",
  "wednesday": "take out the trash",
  "thursday": "clean your room",
  "friday": "mow the lawn",
};



interface OopsDictionary {
  // Type error: 
  // An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.  
  [key: boolean]: string;
}



const record: Record<string, string> = {};
record['a'] = 'b';
record[1] = 'c';
record['d'] = 1; //error



var stuff: Record<string, any> = {};
//limit/specify potential keys by unioning literal types:
var stuff2: Record<'a'|'b'|'c', string|boolean> = {};
//Here's a more generic example using the record type from the docs:

// For every properties K of type T, transform it to U
function mapObject<K extends string, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }

/*
The only disadvantage I see to using this over {[key: T]: K} is that you can 
encode useful info on what sort of key you are using in place of "key" 
e.g. if your object only had prime keys you could hint at that like so: {[prime: number]: yourType}.

Here's a regex I wrote to help with these conversions. 
This will only convert cases where the label is "key". To convert other labels simply change the first capturing group:

Find: \{\s*\[(key)\s*(+\s*:\s*(\w+)\s*\]\s*:\s*([^\}]+?)\s*;?\s*\}

Replace: Record<$2, $3>
*/