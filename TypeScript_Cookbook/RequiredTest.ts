//TypeScript Cookbook Stefan Baumgartner Ch 8.4. Getting All Required Keys

type Name = {
    name: string;
}

type Test = Name extends Required<Name> ? true : false;

type Person = {
	name: string;
    age?: number;
}

type Test2 = Person extends Required<Person> ? true : false;
type Test2b = Required<Person> extends Person ? true : false;



type RequiredPerson = {
    [K in keyof Person]: Person[K] extends Required<Person[K]> ? true : false;
};

