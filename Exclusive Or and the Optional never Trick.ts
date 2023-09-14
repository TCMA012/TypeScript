/*
https://effectivetypescript.com/2021/11/11/optional-never/
Exclusive Or and the Optional never Trick

"or" is a union: A | B means either A, B, or both. 
Remember that "both" is a possibility, and you should either prevent it or handle it in your code.
*/

interface OnlyThingOne {
  shirtColor: string;
  hairColor?: never;
}
interface OnlyThingTwo {
  hairColor: string;
  shirtColor?: never;
}
type ExclusiveThing = OnlyThingOne | OnlyThingTwo;



//"Tags" are another common way to make an or exclusive:

interface ThingOne {
  type: 'one';
  shirtColor: string;
}
interface ThingTwo {
  type: 'two';
  hairColor: string;
}
type Thing = ThingOne | ThingTwo;

/*
A string can't be both "one" and "two", so there's no overlap between these types. 
This means there's no distinction between inclusive and exclusive or. 
This is one of many great reasons to use tagged unions when you can.
*/



type XOR<T1, T2> =
    (T1 & {[k in Exclude<keyof T2, keyof T1>]?: never}) |
    (T2 & {[k in Exclude<keyof T1, keyof T2>]?: never});
