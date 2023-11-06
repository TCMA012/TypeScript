/*
https://www.oreilly.com/library/view/typescript-cookbook/9781098136642/ch04.html
4.1 Generalizing Function Signatures
*/
type Languages = {
  de: URL;
  en: URL;
  pt: URL;
  es: URL;
  fr: URL;
  ja: URL;
};

function isLanguageAvailable(
  collection: Languages,
  lang: string
): lang is keyof Languages {
  return lang in collection;
}

function loadLanguage(collection: Languages, lang: string) {
  if (isLanguageAvailable(collection, lang)) {
    // lang is keyof Languages
    collection[lang]; // access ok!
  }
}

type AllowedElements = {
  video: HTMLVideoElement;
  audio: HTMLAudioElement;
  canvas: HTMLCanvasElement;
};

function isElementAllowed(
  collection: AllowedElements,
  elem: string
): elem is keyof AllowedElements {
  return elem in collection;
}

function selectElement(collection: AllowedElements, elem: string) {
  if (isElementAllowed(collection, elem)) {
    // elem is keyof AllowedElements
    collection[elem]; // access ok
  }
}

function isAvailable<Obj extends object>(
  obj: Obj,
  key: string | number | symbol
): key is keyof Obj {
  return key in obj;
}

namespace n {
function loadLanguage(collection: Languages, lang: string) {
  if (isAvailable(collection, lang)) {
    // lang is keyof Languages
    collection[lang]; // access ok!
  }
}

function selectElement(collection: AllowedElements, elem: string) {
  if (isAvailable(collection, elem)) {
    // elem is keyof AllowedElements
    collection[elem]; // access ok
  }
}
}



//4.2 Creating Related Function Arguments
const languages: Languages = {
    de: new URL("../de", "http://www.example.com/dogs"),
    en: new URL("../en", "http://www.example.com/dogs"),
    pt: new URL("../pt", "http://www.example.com/dogs"),
    es: new URL("../es", "http://www.example.com/dogs"),
    fr: new URL("../fr", "http://www.example.com/dogs"),
    ja: new URL("../ja", "http://www.example.com/dogs")
};

type URLList = {
  [x: string]: URL;
};

function fetchFile(urls: URLList, key: string) {
  return fetch(urls[key]).then((res) => res.json());
}

const de = fetchFile(languages, "de");
const it = fetchFile(languages, "it");



namespace m {
function fetchFile<List extends URLList>(urls: List, key: keyof List) {
  return fetch(urls[key]).then((res) => res.json());
}

const de = fetchFile(languages, "de");
const it = fetchFile(languages, "it");
//                               ^
// Argument of type '"it"' is not assignable to
// parameter of type 'keyof Languages'.(2345)
}

function fetchFiles<List extends URLList>(urls: List, keys: (keyof List)[]) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => [el, data])
  );
  return els;
}

const de_and_fr = fetchFiles(languages, ["de", "fr"]); // Promise<any[]≥[]
const de_and_it = fetchFiles(languages, ["de", "it"]);
//                                             ^
//  Type '"it"' is not assignable to type 'keyof Languages'.(2322)

namespace m2 {
function fetchFiles<List extends URLList>(urls: List, keys: (keyof List)[]) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => {
        const entry: [keyof List, any] = [el, data];
        return entry;
      })
  );
  return els;
}

const de_and_fr = fetchFiles(languages, ["de", "fr"]);
}

namespace m3 {
function fetchFiles<List extends URLList, Keys extends keyof List>(
  urls: List,
  keys: Keys[]
) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => {
        const entry: [Keys, any] = [el, data];
        return entry;
      })
  );
  return els;
}

const de_and_fr = fetchFiles(languages, ["de", "fr"]);

const de_and_ja = fetchFiles<Languages, "ja" | "de">(languages, ["de"]);
}

for (const entry of de_and_fr) {
  const result = await entry;
  if (result[0] === "en") {
    //  This condition will always return 'false' since the types
    //. '"de" | "fr"' and '"en"' have no overlap.(2367)
  }
}
export { }; // fix compile error for await



//4.3 Getting Rid of any and unknown
namespace GettingRidofanyandunknown {
/*
function identity(value: any): any {
  return value;
}

let a = identity("Hello!");
let b = identity(false);
let c = identity(2);
*/

function identity(value: unknown): unknown {
  return value;
}

let a = identity("Hello!");
let b = identity(false);
let c = identity(2);
}

function identity<T>(t: T): T {
  return t;
}

let a = identity("Hello!"); // a is string
let b = identity(2000);     // b is number
let c = identity({ a: 2 }); // c is { a: number }

const aconst = identity("Hello!"); // a is "Hello!"
const bconst = identity(2000);     // b is 2000
const cconst = identity({ a: 2 }); // c is { a: number }

const aconsti = identity<string>("Hello!"); // a is string
const bconsti = identity<number>(2000);     // b is number
const cconsti = identity<{ a: 2 }>({ a: 2 }); // c is { a: 2 }

namespace GettingRidofanyandunknown {
function pairs(a: unknown, b: unknown): [unknown, unknown] {
  return [a, b];
}

const a = pairs(1, "1"); // [unknown, unknown]
}

//With generic type parameters, we get a nice tuple type:
function pairs<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

const b2 = pairs(1, "1"); // [number, string]

function pairsSameType<T>(a: T, b: T): [T, T] {
  return [a, b];
}

const c2 = pairsSameType(1, "1");
//                  ^
// Argument of type 'string' is not assignable to parameter of type 'number'



//4.4 Understanding Generic Instantiation
type FilterRule = {
  field: string;
  operator: string;
  value: any;
};

type CombinatorialFilter = {
  combinator: "and" | "or";
  rules: FilterRule[];
};

type ChainedFilter = {
  rules: (CombinatorialFilter | FilterRule)[];
};

type Filter = CombinatorialFilter | ChainedFilter;

function reset(filter: Filter): Filter {
  if ("combinator" in filter) {
    // filter is CombinatorialFilter
    return { combinator: "and", rules: [] };
  }
  // filter is ChainedFilter
  return { rules: [] };
}

const filter: CombinatorialFilter = { rules: [], combinator: "or" };
const resetFilter = reset(filter); // resetFilter is Filter

function reseterrors<F extends Filter>(filter: F): F {
  if ("combinator" in filter) {
    return { combinator: "and", rules: [] };
//  ^ '{ combinator: "and"; rules: never[]; }' is assignable to
//     the constraint of type 'F', but 'F' could be instantiated
//     with a different subtype of constraint 'Filter'.
  }
  return { rules: [] };
//^ '{ rules: never[]; }' is assignable to the constraint of type 'F',
//   but 'F' could be instantiated with a different subtype of
//   constraint 'Filter'.
}

const resetFiltererrors = reseterrors(filter); // resetFilter is CombinatorialFilter

const onDemandFilter = reseterrors({
  combinator: "and",
  rules: [],
  evaluated: true,
  result: false,
});
/* filter is {
    combinator: "and";
    rules: never[];
    evaluated: boolean;
    result: boolean;
}; */

function resetSubtypefriendly<F extends Filter>(filter: F): F {
  const result = { ...filter }; // result is F
  result.rules = [];
  if ("combinator" in result) {
    result.combinator = "and";
  }
  return result;
}

const resetFilterSubtypefriendly = resetSubtypefriendly(filter); // resetFilter is CombinatorialFilter



type TreeItem = {
  id: string;
  children: TreeItem[];
  collapsed?: boolean;
};

function createRootItemGeneric<T extends TreeItem>(): T {
  return {
    id: "root",
    children: [],
  };
// '{ id: string; children: never[]; }' is assignable to the constraint
//   of type 'T', but 'T' could be instantiated with a different subtype
//   of constraint 'TreeItem'.(2322)
}

const rootGeneric = createRootItemGeneric(); // root is TreeItem

function createRootItem(): TreeItem {
  return {
    id: "root",
    children: [],
  };
}

function attachToRoot(children: TreeItem[]): TreeItem {
  return {
    id: "root",
    children,
  };
}

const root = attachToRoot([]); // TreeItem

function attachToRootGeneric<T extends TreeItem>(children: T[]): TreeItem {
  return {
    id: "root",
    children,
  };
}

const rootGeneric2 = attachToRootGeneric([
  {
    id: "child",
    children: [],
    collapsed: false,
    marked: true,
  },
]); // root is TreeItem

type BaseTreeItem = {
  id: string;
  children: BaseTreeItem[];
};

type TreeItemGeneric<Children extends TreeItemGeneric = BaseTreeItem> = {
  id: string;
  children: Children[];
  collapsed?: boolean;
};

function attachToRootTreeItemGeneric<T extends TreeItemGeneric>(children: T[]): TreeItemGeneric<T> {
  return {
    id: "root",
    children,
  };
}

const rootTreeItemGeneric = attachToRootTreeItemGeneric([
  {
    id: "child",
    children: [],
    collapsed: false,
    marked: true,
  },
]);
/*
root is TreeItem<{
    id: string;
    children: never[];
    collapsed: false;
    marked: boolean;
}>
*/



//4.5 Generating New Object Types
type ToyBase = {
  name: string;
  description: string;
  minimumAge: number;
};

type BoardGame = ToyBase & {
  kind: "boardgame";
  players: number;
};

type Puzzle = ToyBase & {
  kind: "puzzle";
  pieces: number;
};

type Doll = ToyBase & {
  kind: "doll";
  material: "plush" | "plastic";
};

namespace t {
type Toy = Doll | Puzzle | BoardGame;

type GroupedToys = {
  boardgame: Toy[];
  puzzle: Toy[];
  doll: Toy[];
};

function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {
    boardgame: [],
    puzzle: [],
    doll: [],
  };
  for (let toy of toys) {
    groups[toy.kind].push(toy);
  }
  return groups;
}
}

type Bricks = ToyBase & {
  kind: "bricks",
  pieces: number;
  brand: string;
}


type Toy = Doll | Puzzle | BoardGame | Bricks;

namespace t2 {
function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {
    boardgame: [],
    puzzle: [],
    doll: [],
  };
  for (let toy of toys) {
    groups[toy.kind].push(toy);
//  ^- Element implicitly has an 'any' type because expression
//     of type '"boardgame" | "puzzle" | "doll" | "bricks"' can't
//     be used to index type 'GroupedToys'.
//     Property 'bricks' does not exist on type 'GroupedToys'.(7053)
  }
  return groups;
}
}

namespace t3 {
type GroupedToys = {
  boardgame: Toy[];
  puzzle: Toy[];
  doll: Toy[];
  bricks: Toy[];
};

function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {
    boardgame: [],
    puzzle: [],
    doll: [],
    bricks: [],
  };
  for (let toy of toys) {
    groups[toy.kind].push(toy);
  }
  return groups;
}
}

namespace t4 {
type GroupedToys = {
  boardgame?: Toy[];
  puzzle?: Toy[];
  doll?: Toy[];
  bricks?: Toy[];
};

function groupToys(toys: Toy[]): GroupedToys {
  const groups: GroupedToys = {};
  for (let toy of toys) {
    // Initialize when not available
    groups[toy.kind] = groups[toy.kind] ?? [];
    groups[toy.kind]?.push(toy);
  }
  return groups;
}
}

type GroupedToys = {
  [k in Toy["kind"]]?: Toy[];
};

type GroupedToysError = GroupError<Toy, "kind">;

type GroupError<Collection, Selector extends keyof Collection> = {
  [x in Collection[Selector]]?: Collection[];
//     ^ Type 'Collection[Selector]' is not assignable
//       to type 'string | number | symbol'.
//       Type 'Collection[keyof Collection]' is not
//       assignable to type 'string | number | symbol'.
//       Type 'Collection[string] | Collection[number]
//        | Collection[symbol]' is not assignable to
//       type 'string | number | symbol'.
//       Type 'Collection[string]' is not assignable to
//       type 'string | number | symbol'.(2322)
};

/*
option 1
// This type is built-in!
type Record<K extends string | number | symbol, T> = { [P in K]: T; };

This elevates Collection to a wildcard object, effectively disabling the type-check from Groups. 
This is OK because if something would be an unusable type for a property key, 
TypeScript will throw it away anyway. So the final Group has two constrained type parameters:
*/
type Group<
  Collection extends Record<string, any>,
  Selector extends keyof Collection
> = {
  [x in Collection[Selector]]: Collection[];
};

/*
option 2
do a check for each key to see if it is a valid string key. 
We can use a conditional type to see if Collection[Selector] is in fact a valid type for a key. 
Otherwise, we would remove this type by choosing never. 
Conditional types are their own beast, and we tackle this in Recipe 5.4 extensively:
*/
type Group2<Collection, Selector extends keyof Collection> = {
  [k in Collection[Selector] extends string
    ? Collection[Selector]
    : never]?: Collection[];
};

/*
Note that we did remove the optional type modifier. 
We do this because making keys optional is not the task of grouping. 
We have another type for that: Partial<T>, another mapped type that makes every property in an object type optional:

// This type is built-in!
type Partial<T> = { [P in keyof T]?: T[P] };
*/
/*
No matter which Group helper you create, you can now create a GroupedToys object by telling TypeScript that you 
want a Partial (changing everything to optional properties) of a Group of Toys by "kind":
*/
type GroupedToys1 = Partial<Group<Toy, "kind">>;
type GroupedToys2 = Partial<Group2<Toy, "kind">>;



//4.6 Modifying Objects with Assertion Signatures
//JavaScript
function checkJavaScript(person: any) {
  person.checked = true;
}

const personJavaScript = {
  name: "Stefan",
  age: 27,
};

checkJavaScript(personJavaScript); // person now has the checked property

(personJavaScript as typeof personJavaScript & { checked: boolean }).checked = true;



namespace TypePredicate {
//Another way to assert that certain properties are available is to create type predicates, like those shown in Recipe 3.5:
function check<T>(obj: T): obj is T & { checked: true } {
  (obj as T & { checked: boolean }).checked = true;
  return true;
}

const person = {
  name: "Stefan",
  age: 27,
};

if (check(person)) {
  person.checked; // checked is true!
}

person.checked; // this is true! ?????
}



function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

function yell(str: any) {
  assert(typeof str === "string");
  // str is string
  return str.toUpperCase();
}

function assertNumber(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw Error("value is not a number");
  }
}

function add(x: unknown, y: unknown): number {
  assertNumber(x); // x is number
  assertNumber(y); // y is number
  return x + y;
}

function check<T>(obj: T): asserts obj is T & { checked: true } {
  (obj as T & { checked: boolean }).checked = true;
}

const person = {
  name: "Stefan",
  age: 27,
};

check(person);
person.checked; // this is true!



//4.7 Mapping Types with Type Maps
namespace TypeMap {
// a is HTMLAnchorElement
const a = createElement("a", { href: "https://fettblog.eu" });
// b is HTMLVideoElement
const b = createElement("video", { src: "/movie.mp4", autoplay: true });
// c is HTMLElement
const c = createElement("my-element");

//to provide a mapping between element tag names and prototype objects is to use a type map. 
type AllElements = {
  a: HTMLAnchorElement;
  div: HTMLDivElement;
  video: HTMLVideoElement;
  //... and ~140 more!
};

// HTMLAnchorElement
type A = AllElements["a"];

// HTMLAnchorElement | HTMLDivELement
type AandDiv = AllElements["a" | "div"];

function createElement<T extends keyof AllElements>(tag: T): AllElements[T] {
  return document.createElement(tag as string) as AllElements[T];
}

// a2 is HTMLAnchorElement
const a2 = createElement("a");



namespace TypeMap2 {
//type Partial<T> = { [P in keyof T]?: T[P] };
function createElement<T extends keyof AllElements>(
  tag: T,
  props?: Partial<AllElements[T]>
): AllElements[T] {
  const elem = document.createElement(tag as string) as AllElements[T];
  return Object.assign(elem, props);
}

const a3 = createElement("a", { href: "https://fettblog.eu" });
const x = createElement("a", { src: "https://fettblog.eu" });
//                           ^--
// Argument of type '{ src: string; }' is not assignable to parameter
// of type 'Partial<HTMLAnchorElement>'.
// Object literal may only specify known properties, and 'src' does not
// exist in type 'Partial<HTMLAnchorElement>'.(2345)
}
}

namespace TypeMap3 {
function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props?: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
  const elem = document.createElement(tag);
  return Object.assign(elem, props);
}
}

namespace TypeMap4 {
interface HTMLElementTagNameMap {
  [x: string]: HTMLUnknownElement;
};

function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props?: Partial<HTMLElementTagNameMap[T]>
): HTMLElementTagNameMap[T] {
  const elem = document.createElement(tag);
  return Object.assign(elem, props);
}

// a is HTMLAnchorElement
const a4 = createElement("a", { href: "https://fettblog.eu" });
// b is HTMLUnknownElement
const b4 = createElement("my-element");
}


type AllElements = HTMLElementTagNameMap &
  {
    [x in `${string}-${string}`]: HTMLElement;
  };

function createElement<T extends keyof AllElements>(
  tag: T,
  props?: Partial<AllElements[T]>
): AllElements[T] {
  const elem = document.createElement(tag as string) as AllElements[T];
  return Object.assign(elem, props);
}

const a5 = createElement("a", { href: "https://fettblog.eu" }); // OK
const b5 = createElement("my-element"); // OK


const c5 = createElement("thisWillError");
//                      ^
// Argument of type '"thisWillError"' is not
// assignable to parameter of type '`${string}-${string}`
// | keyof HTMLElementTagNameMap'.(2345)

namespace TypeMap6 {
function createElement<T extends keyof AllElements>(
  tag: T,
  props?: Partial<AllElements[T]>
): AllElements[T];
function createElement(tag: string, props?: Partial<HTMLElement>): HTMLElement {
  const elem = document.createElement(tag);
  return Object.assign(elem, props);
}
const a6 = createElement("a", { href: "https://fettblog.eu" }); // OK
const b6 = createElement("my-element"); // OK
const c6 = createElement("thisWillError");
//                      ^
// Argument of type '"thisWillError"' is not
// assignable to parameter of type '`${string}-${string}`
// | keyof HTMLElementTagNameMap'.(2345)
}



//4.8 Using ThisType to Define this in Objects
const instance = create({
  data() {
    return {
      firstName: "Stefan",
      lastName: "Baumgartner",
    };
  },
  computed: {
    fullName() {
      // has access to the return object of data
      return this.firstName + " " + this.lastName;
    },
  },
  methods: {
    hi() {
      // use computed properties just like normal properties
      alert(this.fullName.toLowerCase());
    },
  },
});


{
type Options<Data> = {
  data(this: {})?: Data;
};
}

{
type Options<Data, Computed> = {
  data(this: {})?: Data;
  computed?: Computed & ThisType<Data>;
};
}


// An object of functions ...
type FnObj = Record<string, () => any>;

// ... to an object of return types
type MapFnToProp<FunctionObj extends FnObj> = {
  [K in keyof FunctionObj]: ReturnType<FunctionObj[K]>;
};

type Options<Data, Computed extends FnObj, Methods> = {
  data(this: {})?: Data;
  computed?: Computed & ThisType<Data>;
  methods?: Methods & ThisType<Data & MapFnToProp<Computed> & Methods>;
};

declare function create<Data, Computed extends FnObj, Methods>(
  options: Options<Data, Computed, Methods>
): any;



//4.9 Adding Const Context to Generic Type Parameters
interface ComponentConstructor {
  new(): Component;
}

interface Component {
  render(): HTMLElement;
}

type Route = {
  path: string;
  component: ComponentConstructor;
};

{
function router(routes: Route[]) {
  return {
    navigate(path: string) {
      // ...
    },
  };
}



const rtr = router([
  {
    path: "/",
    component: Main,
  },
  {
    path: "/about",
    component: About,
  },
])

rtr.navigate("/faq");
}

{
function router<T extends Route>(routes: T[]) {
  return {
    navigate(path: T["path"]) {
      // ...
    },
  };
}
}

function getPath<T extends string>(route: T): T {
  return route;
}

const path = getPath("/"); // "/"

{
  type Routes = {
    paths: string[];
  };
  
  function getPaths<T extends Routes>(routes: T): T["paths"] {
    return routes.paths;
  }
  
  const paths = getPaths({ paths: ["/", "/about"] }); // string[]
}

{
  function router<T extends Route>(routes: readonly T[]) {
    return {
      navigate(path: T["path"]) {
        history.pushState({}, "", path);
      },
    };
  }
  
  const rtr = router([
    {
      path: "/",
      component: Main,
    },
    {
      path: "/about",
      component: About,
    },
  ] as const);
  
  rtr.navigate("/about");  
}



function router<const T extends Route>(routes: T[]) {
  return {
    navigate(path: T["path"]) {
      // tbd
    },
  };
}

const rtr = router([
  {
    path: "/",
    component: Main,
  },
  {
    path: "/about",
    component: About,
  },
])

rtr.navigate("/about");

rtr.navigate("/faq");
//             ^
// Argument of type '"/faq"' is not assignable to
// parameter of type '"/" | "/about"'.(2345)