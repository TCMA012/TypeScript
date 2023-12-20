/*
https://www.typescript-training.com/course/intermediate-v2/09-mapped-types/

filter by value
to be included or excluded from our mapped type based on Document[K]

filter our keys first and then use those keys to build a mapped type
*/
// Get keys of type T whose values are assignable to type U
type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T] &
  keyof T

type RelevantDocumentKeys = FilteredKeys<Document, (...args: any[]) =>(Element | Element[]) >
/*
"adoptNode" | "createElement" | "createElementNS" | "importNode" | "appendChild" | "insertBefore" 
| "removeChild" | "replaceChild" | "elementsFromPoint" | "querySelector"
*/

type ValueFilteredDoc = Pick<Document, RelevantDocumentKeys>
/*
adoptNode: <T extends Node>(node: T) => T;
createElement: {
    <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions | undefined): HTMLElementTagNameMap[K];
    <K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions | undefined): HTMLElementDeprecatedTagNameMap[K];
    (tagName: string, options?: ElementCreationOptions | undefined): HTMLElement;
};
... 7 more ...;
querySelector: {
    ...;
};
*/

function load(doc: ValueFilteredDoc) {
  doc.querySelector("input")
  //    ^?
}



type FilteredKeys2<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}

type RelevantDocumentKeys2 = FilteredKeys2<Document, (...args: any[]) =>(Element | Element[]) >
/*
    readonly URL: never;
    alinkColor: never;
    readonly all: never;
    readonly anchors: never;
    readonly applets: never;
    bgColor: never;
    body: never;
    readonly characterSet: never;
    readonly charset: never;
    ... 249 more ...;
    evaluate: never;
*/



type FilteredKeys3<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never
}[keyof T];

type RelevantDocumentKeys3 = FilteredKeys3<Document, (...args: any[]) =>(Element | Element[]) >;
/*
"adoptNode" | "createElement" | "createElementNS" | "importNode" | "appendChild" | "insertBefore" 
| "removeChild" | "replaceChild" | "elementsFromPoint" | "querySelector" | undefined
*/
/*
adoptNode<T extends Node>(node: T): T;



createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];


createElementNS(namespaceURI: "http://www.w3.org/1999/xhtml", qualifiedName: string): HTMLElement;
//...
createElementNS(namespaceURI: string | null, qualifiedName: string, options?: ElementCreationOptions): Element;
createElementNS(namespace: string | null, qualifiedName: string, options?: string | ElementCreationOptions): Element;



appendChild<T extends Node>(node: T): T;



insertBefore<T extends Node>(node: T, child: Node | null): T;




querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;



elementFromPoint(x: number, y: number): Element | null;
elementsFromPoint(x: number, y: number): Element[];
*/



//no Element[] 
type RelevantDocumentKeys3b = FilteredKeys3<Document, (...args: any[]) =>(Element) >;
/*
"adoptNode" | "createElement" | "createElementNS" | "importNode" | "appendChild" | "insertBefore" 
| "removeChild" | "replaceChild" | "querySelector" | undefined
*/


//Element[] only
type RelevantDocumentKeys3c = FilteredKeys3<Document, (...args: any[]) =>(Element[]) >;
/*
"adoptNode" | "createElement" | "createElementNS" | "importNode" | "appendChild" | "insertBefore" 
| "removeChild" | "replaceChild" | "elementsFromPoint" | "querySelector" | undefined
*/