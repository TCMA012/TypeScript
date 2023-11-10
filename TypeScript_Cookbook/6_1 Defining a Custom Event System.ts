/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
6.1. Defining a Custom Event System
*/
type Levels = 1 | 2 | 3 | 4 | 5 | 6;
type Headings = `H${Levels}`;



//starts with "on", followed by any string, includes the empty string.
type EventName = `on${string}`;
type EventObject<T> = {
    val: T;
};
type Callback<T = any> = (ev: EventObject<T>) => void;

/*
use EventName as index access as it is a valid subtype of string.
Each index points to an array of Callbacks.
*/
type Events = {
    [x: EventName]: Callback[] | undefined;
};


{
class EventSystem {
    events: Events;
    constructor() {
        this.events = {};
    }

    defineEventHandler(ev: EventName, cb: Callback): void {
        this.events[ev] = this.events[ev] ?? [];
        this.events[ev]?.push(cb);
    }

    trigger(ev: EventName, value: any) {
        let callbacks = this.events[ev];
        if (callbacks) {
            callbacks.forEach((cb) => {
                cb({val: value});
            });
        }
    }
}

const system = new EventSystem();
system.defineEventHandler("click", () => {});
//Argument of type '"click"' is not assignable to parameter of type '`on${string}`'.ts(2345)
system.defineEventHandler("onClick", () => {});
system.defineEventHandler("onchange", () => {});
}