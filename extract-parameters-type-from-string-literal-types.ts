//https://lihautan.com/extract-parameters-type-from-string-literal-types-with-typescript/
type A = 'a';
type B = 'b';
// build a new string literal type with template literals
type C = `${A} ${B}`;



type Collection<X> = X extends 'arr' ? number[] : Set<number>;
type AA = Collection<'arr'>; //type AA = number[]
type BB = Collection<'foo'>; //type BB = Set<number>



// Here you are testing whether X extends `() => ???`
// and let TypeScript to infer the `???` part
// TypeScript will define a new type called
// `Value` for the inferred type
type GetReturnValue<X> = X extends () => infer Value ? Value : never;
type D = GetReturnValue<() => string>; //string
type E = GetReturnValue<() => number>; //number


{
//To split a string literal type, we can use a conditional type to check the value of the string literal:
type Parts<Path> = Path extends `a/b` ? 'a' | 'b' : never;
type AB = Parts<'a/b'>; //type AB = "a" | "b"

//we will have to infer the value in the conditional tests, and use the inferred value type:
}

type Parts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? PartA | PartB
  : never;
type AB = Parts<'a/b'>; //"a" | "b"
type CD = Parts<'c/d'>; //"c" | "d"
type EFGH = Parts<'ef/gh'>; //"ef" | "gh"

/*
a conditional type that returns 
the string literal itself if it starts with [ and ends with ], and 
never if otherwise:
*/
{
type IsParameter<Part> = Part extends `[${infer Anything}]` ? Part : never;

type Purchase = IsParameter<'purchase'>;
type ShopId = IsParameter<'[shopid]'>;
type ItemId = IsParameter<'[itemid]'>;
type Args = IsParameter<'args'>;
type Args2 = IsParameter<'[...args]'>;
}



/*
Any type unions with never yields the type itself.
To remove the bracket, we can modify the conditional type in the last step, and 
instead of returning the Part, we return the inferred type between the []
*/
type IsParameter<Part> = Part extends `[${infer ParamName}]` ? ParamName : never;
type FilteredParts<Path> = Path extends `${infer PartA}/${infer PartB}`
  ? IsParameter<PartA> | FilteredParts<PartB>
  : IsParameter<Path>;

type ParamsWithoutBracket = FilteredParts<'/purchase/[shopid]/[itemid]/args/[...args]'>;

//Map the parts into an Object Type
type ParamValue<Key> = Key extends `...${infer Anything}` ? string[] : number;

type ShopIdValue = ParamValue<'shopid'>; //number
type ArgValue = ParamValue<'...args'>; //string[]


{
type Params<Path> = {
  [Key in FilteredParts<Path>]: ParamValue<Key>;
};
}


//Remap keys to remove '...'
type RemovePrefixDots<Key> = Key extends `...${infer Name}` ? Name : Key;

//Key Remapping via as
type Params<Path> = {
  [Key in FilteredParts<Path> as RemovePrefixDots<Key>]: ParamValue<Key>;
};

type CallbackFn<Path> = (req: { params: Params<Path> }) => void;

function get<Path extends string>(path: Path, callback: CallbackFn<Path>) {
	// TODO: implement
}

type ParamObject = Params<'/purchase/[shopid]/[itemid]/args/[...args]'>;
