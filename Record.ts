/*
https://betterprogramming.pub/typescripts-record-type-explained-691372b1a449
Sunny Sun

accessing an object property with square brackets an index signature. It is used for object types with unknown string keys and a specific value type.
*/
type studentScore= { [name: string]: number };
//the name key expresses the intent more clearly

type studentScore2 = Record<string, number>;

/*
Record type is useful when we want to limit the properties of an object. 
e.g. use a union of string literals to specify the allowable keys for the Record type
*/



//the keys can be enums



//The strongly typed object makes it possible to catch error at compile time.
type seniorRole = 'manager';
type technicalRole = 'developer';
const benefits:  Partial<Record<seniorRole, 'Free Parking'> & Record<technicalRole, 'Free Coffee'>> = {};
benefits.manager = 'Free Parking';
benefits.developer = 'Free Parking'; //ERROR: no free parking for dev
