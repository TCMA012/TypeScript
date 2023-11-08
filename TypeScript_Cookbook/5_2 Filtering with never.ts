/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
5_2 Filtering with never

This data structure has been designed to have a fluent interface.
i.e. if you call methods like 
addClass or removeClass,
you get the same object back so you can chain your method calls.
*/
type ElementList = {
    addClass: (className: string) => ElementList;
    removeClass: (className: string) => ElementList;
    on: (event: string, callback: (ev: Event) => void) => ElementList;
    length: number;
    [x: number]: HTMLElement;
};

type ElementListKeys = keyof ElementList;

/*
remove everything that isn't a string
distributive conditional type
T is on its own in the condition - not wrapped in an object or array -
TypeScript will treat a conditional type of a union as a union of conditional types.
TypeScript does the same conditional check for every member of the union T.
*/
type JustStrings<T> = T extends string ? T : never;
type JustElementListStrings = JustStrings<ElementListKeys>;
type SafeAccess = Pick<ElementList, JustStrings<keyof ElementList>>;



declare const myCollection: ElementList;

const safeAccessCollection: Pick<ElementList, JustStrings<keyof ElementList>> = new Proxy(myCollection, {
    get(target, property) {
        if (typeof property === "string" &&
            property in target &&
            "" + parseInt(property) !== property) {
            return target[property as keyof typeof target];
        }
        return undefined;
    },
});

safeAccessCollection[1].classList.toggle("toggle-on");
