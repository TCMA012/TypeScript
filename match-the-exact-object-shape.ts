/*
https://fettblog.eu/typescript-match-the-exact-object-shape/
an exact match - Exclude<T, U> returns never

check if Exclude extends never, meaning we don’t have any extra keys. 
If this condition is true, we return the type we want to validate. 
In all other conditions, we return never:
*/
type Person = {
  first: string, last: string
}

type ValidateStructure<T, Struct> = 
  T extends Struct ? 
  Exclude<keyof T, keyof Struct> extends never ? T : never : never;

declare function savePerson<T>(person: ValidateStructure<T, Person>): void;

const tooFew = { first: 'Stefan' };
const exact = { first: 'Stefan', last: 'Baumgartner' }
const tooMany = { first: 'Stefan', last: 'Baumgartner', age: 37 }

savePerson(tooFew); // 💥 doesn't work
savePerson(exact); // ✅ satisfies the contract
savePerson(tooMany); // 💥 doesn't work
