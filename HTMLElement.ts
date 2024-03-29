/*
HTMLElement
https://www.typescriptlang.org/docs/handbook/dom-manipulation.html#an-exploration-into-the-htmlelement-type
https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.generated.d.ts
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
*/


getElementById(elementId: string): HTMLElement | null;



createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];

createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;



interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    // ...
}



//HTMLElement interface extends the Element interface which extends the Node interface.



/**
 * Returns the first element that is a descendant of node that matches selectors.
 */
querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
querySelector<E extends Element = Element>(selectors: string): E | null;



/**
 * Returns all element descendants of node that match selectors.
 */
querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;

	
/*	
The querySelectorAll definition is similar to getElementsByTagName, except it returns a new type: 
NodeListOf. 
This return type is essentially a custom implementation of the standard JavaScript list element. 
*/


/**
 * NodeList objects are collections of nodes, usually returned by properties such as Node.childNodes and methods such as document.querySelectorAll().
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/NodeList)
 */
interface NodeList {
    /**
     * Returns the number of nodes in the collection.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/NodeList/length)
     */
    readonly length: number;
    /**
     * Returns the node with index index from the collection. The nodes are sorted in tree order.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/NodeList/item)
     */
    item(index: number): Node | null;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: Node, key: number, parent: NodeList) => void, thisArg?: any): void;
    [index: number]: Node;
}

declare var NodeList: {
    prototype: NodeList;
    new(): NodeList;
};

interface NodeListOf<TNode extends Node> extends NodeList {
    item(index: number): TNode;
    /**
     * Performs the specified action for each node in an list.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: TNode, key: number, parent: NodeListOf<TNode>) => void, thisArg?: any): void;
    [index: number]: TNode;
}