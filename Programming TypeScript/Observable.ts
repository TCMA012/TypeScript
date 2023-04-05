/*
11. Interoperating with JavaScript
A type declaration is a file with the extension .d.ts



RxJs Subscriber

https://github.com/ReactiveX/rxjs

https://github.com/ReactiveX/rxjs/blob/d279670a7e43eb140710596beda67351fffd529f/src/internal/Observable.ts
*/
import { Operator } from './Operator';
import { SafeSubscriber, Subscriber } from './Subscriber';
import { isSubscription, Subscription } from './Subscription';
import { TeardownLogic, OperatorFunction, Subscribable, Observer } from './types';
//...
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 */
export class Observable<T> implements Subscribable<T> {
 /**11. Interoperating with JavaScript
A type declaration is a file with the extension .d.ts



RxJs Subscriber
https://github.com/ReactiveX/rxjs

https://github.com/ReactiveX/rxjs/blob/d279670a7e43eb140710596beda67351fffd529f/src/internal/Observable.ts

import { Operator } from './Operator';
import { SafeSubscriber, Subscriber } from './Subscriber';
import { isSubscription, Subscription } from './Subscription';
import { TeardownLogic, OperatorFunction, Subscribable, Observer } from './types';
//...
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 */
export class Observable<T> implements Subscribable<T> {
 /**
   * @constructor
   * @param {Function} subscribe the function that is called when the Observable is
   * initially subscribed to. This function is given a Subscriber, to which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or
   * `complete` can be called to notify of a successful completion.
   */
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  static create: (...args: any[]) => any = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
    return new Observable<T>(subscribe);
  };
}
subscribe(observer?: Partial<Observer<T>>): Subscription;
subscribe(next: (value: T) => void): Subscription;
/** @deprecated Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments */
subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
