/*
5.4. Removing Specific Object Properties
*/
{
type Person = {
    name: string;
    age: number;
    profession?: string;
}

type PersonName = Pick<Person, "name">;
type PersonStrings = Pick<Person, "name" | "profession">;

type PersonWithoutAge = Omit<Person, "age">;

{
//Not there yet
type PersonStrings = {
    [K in keyof Person]: Person[K] extends string ? Person[K] : never;
}
}
{
type PersonStrings = {
    [K in keyof Person as Person[K] extends string ? K : never]: Person[K];
}
}
{
type PersonStrings = {
    [K in keyof Person as Person[K] extends string | undefined 
    ? K 
    : never]: Person[K];
}
}

//generic
type Select<O, T> = {
    [K in keyof O as O[K] extends T | undefined 
    ? K : never]: O[K];
}

{
type PersonStrings = Select<Person, string>;
type PersonNumbers = Select<Person, number>;
}

//which functions in the string prototype return a number
type StringFnsReturningNumber = Select<String, (...args: any[]) => number>;

//remove property keys of a certain type
//switch the condition and return never in the true branch
type Remove<O, T> = {
    [K in keyof O as O[K] extends T | undefined 
    ? never : K]: O[K];
}

type PersonWithoutStrings = Remove<Person, string>;

type User = {
    name: string;
    age: number;
    profession?: string;
    posts(): string[];
    greeting(): string;   
}

type SerializeableUser = Remove<User, Function>;
}