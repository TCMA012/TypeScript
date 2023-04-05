/*
8. Asynchronous Programming, Concurrency, and Parallelism
*/
/*
Pull out event names and arguments into a shape and 
map over that shape to generate listeners and emitters
*/
type Events = {
    ready: void
    error: Error
    reconnecting: {attempt: number, delay: number}
}

type RedisClient = {
    on<E extends keyof Events>(
        event: E,
        f: (arg: Events[E]) => void
    ): void
    emit<E extends keyof Events>(
        event: E,
        arg: Events[E]
    ): void
}



/*
Using mapped types to build typesafe event emitters is a popular pattern.
It's how DOM events are typed in TypeScript's standard library
*/
//lib.dom.d.ts
interface WindowEventMap extends GlobalEventHandlersEventMap, WindowEventHandlersEventMap {
    //...
    "DOMContentLoaded": Event;
    "devicemotion": DeviceMotionEvent;
    "deviceorientation": DeviceOrientationEvent;
    "gamepadconnected": GamepadEvent;
    "gamepaddisconnected": GamepadEvent;
    "orientationchange": Event;
}

//interface Window extends GlobalEventHandlers
/** A window containing a DOM document; the document property points to the DOM document loaded in that window. */
interface Window extends EventTarget, AnimationFrameProvider, GlobalEventHandlers, WindowEventHandlers, WindowLocalStorage, WindowOrWorkerGlobalScope, WindowSessionStorage {
    //...
    addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
}