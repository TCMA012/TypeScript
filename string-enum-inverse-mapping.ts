/*
Use Reverse Mapping To Get Enum Keys From Values
typescript "string enum" reverse mapping
https://stackoverflow.com/questions/54297376/getting-the-enum-key-with-the-value-string-reverse-mapping-in-typescript
*/
enum ApiMessages {
  logged_ok = 'Logged OK',
  register_ok = 'Register OK'
}

let exampleValue = ApiMessages.logged_ok;
let exampleKey = getEnumKeyByEnumValue(ApiMessages, exampleValue);

alert(`The value '${exampleValue}' has the key '${exampleKey}'`)

/*
type this more strictly as follows
we can interpret our enum as an indexable type with key and value both being strings here
*/
function getEnumKeyByEnumValue<T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  console.log('keys', keys, 'keys.length', keys.length);
  return keys.length > 0 ? keys[0] : null;
}

function responseOK(message: ApiMessages, result ?: any) {
  return {
      "status": "ok",
      "code": 200,
      "messageId": getEnumKeyByEnumValue(ApiMessages, message),
      "message": message,
      "result": result
  };
}




//get the traits and their keys of enums within types
// "logged_ok" | "register_ok"
type ApiMessageTraits = keyof typeof ApiMessages;

// "Logged OK" | "Register OK"
type MessageContents = `${ApiMessages}`;
/*
Sadly, this relies on casting the keys of the enumerables into a string, 
so you can't have any other type of keys except for a string.
Simplified second method greatly by using template literals
get the values of enums with numerical values via the new string number parsing in extends clauses:
*/
enum ApiMessageNumber {
  logged_ok = 1,
  register_ok = 2,
} 

// "logged_ok" | "register_ok"
type ApiMessageTraitsNumber = keyof typeof ApiMessageNumber;

//? 1 | 2
type MessageContentsNumber = `${ApiMessageNumber}` extends `${infer N extends number}` ? N : never;



//?create a map that allows you to get the key from the value without creating a special function for it.
//type ApiMessageKey = keyof typeof ApiMessages;

const API_MESSAGE_KEYS = new Map<ApiMessages, ApiMessageTraits>(
    Object.entries(ApiMessages).map(([key, value]:[ApiMessageTraits, ApiMessages]) => [value, key])
)

API_MESSAGE_KEYS.get(ApiMessages.logged_ok);



//https://marketsplash.com/tutorials/typescript/how-to-get-string-value-of-enum-typescript/
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

function getColorKey(colorValue: string): string | undefined {
  return Object.keys(Color).find(key => Color[key] === colorValue);
}

const selectedColorValue: string = "green";
const selectedColorKey: string | undefined = getColorKey(selectedColorValue);

console.log(selectedColorKey); // Output: "Green"



/*
https://stackoverflow.com/questions/48827943/typescript-string-enum-reverse-mapping-equivalent
TypeScript supports a Union Type which is often a better fit for this type of thing than a string enum. Example:
*/
type Animal = 'cat' | 'dog' | 'fish';

let myAnimal1: Animal = 'cat'; // ok
let myAnimal2: Animal = 'buttercup'; // compile-time error "'buttercup' is not assignable to type Animal"
/*
This type of approach has the benefit of letting you know at compile-time whether a value is valid for the Animals type.

determining if a value is in an enum at run-time, we have the in operator which we can use to refactor your inEnum function as follows:
*/
let inEnum = (val: string, enumObj: typeof Animals) => val in enumObj;

enum Animals{
  cat="c",
  dog="d",
  fish="f"
}
inEnum("d", Animals) //evaluates to true
inEnum("z", Animals) //evaluates to false
//or even drop the function call altogether and just use the in operator directly:
"d" in Animals //evaluates to true
"z" in Animals //evaluates to false



enum MyEnum {
  Colors = 'AreColors',
  Cars = 'AreCars',
}

const menuTitle = ((obj: typeof MyEnum) => {
  const newObj: { [key in MyEnum]?: keyof typeof MyEnum } = {};
  (Object.keys(obj) as Array<keyof typeof MyEnum>).forEach((x) => {
    newObj[obj[x]] = x;
  });
  return newObj;
});

console.log(menuTitle(MyEnum));
/*
{
  "AreColors": "Colors",
  "AreCars": "Cars"
} 
*/