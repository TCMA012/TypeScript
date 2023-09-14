/*
https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-4.html#strict-contravariance-for-callback-parameters
check whether each parameter is a callback type, and if so, it will ensure that those parameters are checked in a 
contravariant manner with respect to the current relation.
*/
interface Mappable<T> {
  map<U>(f: (x: T) => U): Mappable<U>;
}
declare let aa: Mappable<number>;
declare let bb: Mappable<string | number>;
aa = bb;
bb = aa;