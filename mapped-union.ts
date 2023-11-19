/*
https://nartc.me/blog/typescript-mapped-union/
Chau Tran
https://twitter.com/trashh_dev
https://twitter.com/tomlienard
The Solution
Out of frustration, I asked for help in trashh_dev Discord and Tom Lienard provided the solution with a super neat trick. I’ll attempt to go through the thought process to understand the solution

What we’re stuck on is we’re so hung up on the idea of FieldOption needs to be an object type {field: keyof TItem, mapFn} but in reality, what we actually need is as follow
*/
// let's assume we're working with {foo: string, bar: number} for now instead of a generic to simplify the explanation

// what we think we need
{
type FieldOption = {
    field: "foo" | "bar";
    mapFn: (value: string | number) => string;
};
}
{
// what we actually need
type FieldOption =
    | {
          field: "foo";
          mapFn: (value: string) => string;
      }
    | {
          field: "bar";
          mapFn: (value: number) => string;
      };
}
{
/*
Yes, we need a Mapped Union from our TItem instead of a single object with union properties. 
The question is how we get to the Mapped Union. Well, it is a 2-step process

We need to convert TItem into a Mapped Type
*/

type FieldOption<TItem extends Record<string, unknown>> = {
    [TField in keyof TItem]: {
        field: TField;
        mapFn: (value: TItem[TField]) => string;
    };
};

type Test = FieldOption<{ foo: string; bar: number }>;
//   ^? {
//          foo: { field: 'foo'; mapFn: (value: string) => string };
//          bar: { field: 'bar'; mapFn: (value: number) => string };
//      }
}
{
//We need to map over the Mapped Type with keys of TItem to get the Mapped Union
type FieldOption<TItem extends Record<string, unknown>> = {
    [TField in keyof TItem]: {
        field: TField;
        mapFn: (value: TItem[TField]) => string;
    };
}[keyof TItem];

type Test = FieldOption<{ foo: string; bar: number }>;
//   ^? | { field: 'foo'; mapFn: (value: string) => string }
//      | { field: 'bar'; mapFn: (value: number) => string }
//Now, let’s try using table() with our Mapped Union type to see if it works
}
type FieldOption<TItem extends Record<string, unknown>> =
    | keyof TItem
    | {
          [TField in keyof TItem]: {
              field: TField;
              mapFn: (value: TItem[TField]) => string;
          };
      }[keyof TItem];

declare function table<TItem extends Record<string, unknown>>(
    items: TItem[],
    fields: FieldOption<TItem>[],
): void;

const items = [
    { foo: "string", bar: 123 },
    { foo: "string2", bar: 1234 },
];

table(items, [
    {
        field: "foo",
        mapFn: (value) => {
            //  ^? value: string
            return "";
        },
    },
    {
        field: "bar",
        mapFn: (value) => {
            //  ^? value: number
            return "";
        },
    },
]);
/*
And that is our solution. So simple, yet so powerful trick. Here’s the TypeScript Playground that you can play with.
https://tsplay.dev/NV305m
*/