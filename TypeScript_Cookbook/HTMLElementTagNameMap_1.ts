/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
4.7 Mapping Types with Type Maps
*/
type AllElements = HTMLElementTagNameMap &
{
    [x in `${string}-${string}`]: HTMLElement;
}


/*
function overload, defining two declarations:
one for our users, and
one for us to implement the function
*/
function createElement<T extends keyof AllElements>(
    tag: T, 
    props?: Partial<AllElements[T]>
): AllElements[T];
function createElement(
    tag: string, 
    props?: Partial<HTMLElement>): HTMLElement {
    const elem = document.createElement(tag);
    return Object.assign(elem, props);
}

const a = createElement("a", {href: "http://fettblog.eu/"}); //ok
const b = createElement("my-element"); //ok
const c = createElement("thisWillError");
/*
Argument of type '"thisWillError"' is not assignable to parameter of type '`${string}-${string}` | keyof HTMLElementTagNameMap'.ts(2345)
*/
