/*
22. Understand Type Narrowing

use a type guard
*/
const jackson5_12 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];

function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

const members_12 = ['Janet', 'Michael'].map(
  who => jackson5_12.find(n => n === who)
).filter(isDefined);  // Type is string[]
console.log(members_12); //["Michael"]
