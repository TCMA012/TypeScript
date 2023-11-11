/*
TypeScript Cookbook
by Stefan Baumgartner
https://typescript-cookbook.com/examples/
6.2. Creating Event Callbacks with String Manipulation Types and Key Remapping
*/
/*
1. Define a mapped type by iterating over all keys from T.
Since we care only about string property keys, we use the intersection
string & keyof T
to get rid of potential symbols or numbers.

2. Remap this key to a new string,
defined by a string template literal type.
It starts with on, then takes the key K from our mapping process,
and appends Changed.

3. The property key points to a function that accepts a callback.
The callback itself has an event object as an argument, and 
by correctly substituting its generics,
we make sure this event object contains the original type of our watched object.
This means when we call onAgeChanged,
the event object will actually contain a number.
*/
//use the built-in string manipulation types to capitalize string types
type WatchedObject<T> = {
    [K in string & keyof T as `on${Capitalize<K>}Changed`]: (
        ev: Callback<T[K]>
    ) => void;
};
//Capitalize, Lowercase, Uppercase, Uncapitalize



type WatchedPerson = {
    onNameChanged: (ev: Callback<string>) => void;
    onAgeChanged: (ev: Callback<number>) => void;
}



//helper to mimic TypeScript's behavior of remapping and manipulating strings
//changes the first letter of a string to its uppercase equivalent
function capitalize(inp: string) {
    return inp.charAt(0).toUpperCase() + inp.slice(1);
}

//adds a prefix and suffix
//need type assertion to signal that the type has changed
function handlerName(name: string): EventName {
    return `on${capitalize(name)}Changed` as EventName;
}

/*
The get calls we want to intercept are whenever we access the properties of WatchedObject<T>:
- They start with on and end with Changed
- If that's the case, we return a function that accepts callbacks.
The function itself adds callbacks to the event storage via defineEventHandler.
- In all other cases we do regular property access.
need type assertion
*/
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
                cb({ val: value });
            });
        }
    }

    watch<T extends object>(obj: T): T & WatchedObject<T> {
        const self = this;
        return new Proxy(obj, {
            get(target, property) {
                // (1)
                if (
                    typeof property === "string" &&
                    property.startsWith("on") &&
                    property.endsWith("Changed")
                ) {
                    // (2)
                    return (cb: Callback) => {
                        self.defineEventHandler(property as EventName, cb);
                    };
                }
                // (3)
                return target[property as keyof T];
            },

            set(target, property, value) {
                if (property in target && typeof property === "string") {
                    // (1)
                    target[property as keyof T] = value;
                    // (2)
                    self.trigger(handlerName(property), value);
                    return true;
                }
                return false;
            },
        }) as T & WatchedObject<T>;
    }
}


/*
1. Set the value. We need to update the object anyway.
2. Call the trigger function to execute all registered callbacks.
need type assertion
*/
let person = {
    name: "TC",
    age: 58,
};

const system = new EventSystem();
const watchedPerson = system.watch(person);

watchedPerson.onAgeChanged((ev) => {
    console.log(ev.val, "changed!!");
});
watchedPerson.age = 48; //triggers callbacks