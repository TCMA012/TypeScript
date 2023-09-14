//https://brightinventions.pl/blog/branding-flavoring/
type Brand<T, BrandT> = T & { __brand: BrandT }

type Candy = Brand<{ pricePerUnit: number, weight: number }, "Candy">
//Changing primitive value to branded value requires manual casting:
type CandyID = Brand<string, "CandyID">

const candyId = "some-long-id" as CandyID // Brand<string, "CandyID">

//use these helpers to change our type to be nominal or reversed:
const toCandyID = (id: string) => id as CandyID
const fromCandyID = (id: CandyID) => id as string

const candyIdTo = toCandyID('some-long-id-1') // Brand<string, "CandyID">
const candyIdFrom = fromCandyID(candyIdTo)    // string

/*
branding has got two cons:
Compiler allow us to read __brand property
*/
const brandProperty = candyDrops.__brand // OK 
//A raw object passed to the function as an argument stopped working
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // Error

{
/*
Flavoring concept is a technique in which we add a unique optional field which will make our type differ from another types.
This difference between branding and flavoring allow us to pass a raw object as an argument to the function. 
Unfortunately we still can access __flavor property.
*/
type Candy = {
  __flavor?: "Candy"
  pricePerUnit: number
  weight: number
}

type Veggie = {
  __flavor?: "Veggie"
  pricePerUnit: number
  weight: number
}

const calculateCandyPrice = (candy: Candy) => candy.pricePerUnit * candy.weight

declare const candyDrops: Candy
declare const broccolis: Veggie

calculateCandyPrice(candyDrops)                          // OK 
calculateCandyPrice({ pricePerUnit: 1000, weight: 20 })  // OK
calculateCandyPrice(broccolis)                           // Error
//We can also create generic type for our flavoring:
type Flavor<T, FlavorT> = T & { __flavor?: FlavorT }

// Similar type as before
type Veggie2 = Flavor<{ pricePerUnit: number, weight: number }, "Veggie">
//We do not need to cast primitive values manually using this technique.

//we use branding for primitive types while flavoring for objects.
type Nominal<T, NameT> = T extends object ? Flavor<T, NameT> : Brand<T, NameT>

//Alternatively use more sophisticated techniques to achieve nominal typing or libraries such as: newtype-ts or io-ts.
}



{
/*
https://michalzalecki.com/nominal-typing-in-typescript/
Approach #4: Intersection types and brands
*/
type Brand<K, T> = K & { __brand: T }

type USD = Brand<number, "USD">
type EUR = Brand<number, "EUR">

const usd = 10 as USD;
const eur = 10 as EUR;

function gross(net: USD, tax: USD): USD {
  return (net + tax) as USD;
}

gross(usd, usd); // ok
gross(eur, usd); // Type '"EUR"' is not assignable to type '"USD"'.



type CustomerID = Brand<string, "CustomerID">
type OrderID = Brand<string, "OrderID">

const customerID = "customerID" as CustomerID;
const orderID = "orderID" as OrderID;

function cat(id: CustomerID, tax: CustomerID): CustomerID {
  return (id + tax) as CustomerID;
}

cat(customerID, customerID); // ok
cat(orderID, customerID); // Type '"OrderID"' is not assignable to type '"CustomerID"'.

//error
usd2 : USD = 10;
const eur2 : EUR = 10;
}



/*
https://github.com/Microsoft/TypeScript/issues/202#issuecomment-329914167

https://basarat.gitbook.io/typescript/main-1/nominaltyping

https://github.com/colinhacks/zod#brand
*/