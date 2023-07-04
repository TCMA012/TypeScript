//https://www.totaltypescript.com/immediately-indexed-mapped-type
type SomeObject = {
  a: string;
  b: number;
};
/**
 * | {
 *   key: 'a';
 * }
 * | {
 *   key: 'b';
 * }
 */
export type Example = {
  [K in keyof SomeObject]: {
    key: K;
  };
}[keyof SomeObject];



type Fruit = "apple" | "banana" | "orange";
/**
 * | {
 *   thisFruit: 'apple';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'banana';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'orange';
 *   allFruit: 'apple' | 'banana' | 'orange';
 * }
 */
export type FruitInfo = {
  [F in Fruit]: {
    thisFruit: F;
    allFruit: Fruit;
  };
}[Fruit];



/**
 * | {
 *   thisFruit: 'apple';
 *   allFruit: 'banana' | 'orange';
 * }
 * | {
 *   thisFruit: 'banana';
 *   allFruit: 'apple' | 'orange';
 * }
 * | {
 *   thisFruit: 'orange';
 *   allFruit: 'apple' | 'banana';
 * }
 */
export type FruitInfo2 = {
  [F in Fruit]: {
    thisFruit: F;
    allFruit: Exclude<Fruit, F>;
  };
}[Fruit];



type MyEvent =
  | {
      type: "click";
      x: number;
      y: number;
    }
  | {
      type: "hover";
      element: HTMLElement;
    };

type Example2 = {
  // Type 'MyEvent' is not assignable to
  // type 'string | number | symbol'.
  [E in MyEvent]: {};
};



/**
 * PrefixType takes an object with a 'type' property
 * and prefixes the type with 'PREFIX_'.
 */
type PrefixType<E extends { type: string }> = {
  type: `PREFIX_${E["type"]}`;
} & Omit<E, "type">;
/**
 * | {
 *   type: 'PREFIX_click';
 *   x: number;
 *   y: number;
 * }
 * | {
 *   type: 'PREFIX_hover';
 *   element: HTMLElement;
 * }
 */
type Example3 = {
  [E in MyEvent as E["type"]]: PrefixType<E>;
}[MyEvent["type"]];



type CSSUnits = "px" | "em" | "rem" | "vw" | "vh";
/**
 * | {
 *   length: number;
 *   unit: 'px';
 * }
 * | {
 *   length: number;
 *   unit: 'em';
 * }
 * | {
 *   length: number;
 *   unit: 'rem';
 * }
 * | {
 *   length: number;
 *   unit: 'vw';
 * }
 * | {
 *   length: number;
 *   unit: 'vh';
 * }
 */
export type CSSLength = {
  [U in CSSUnits]: {
    length: number;
    unit: U;
  };
}[CSSUnits];



type SuccessResponseCode = 200;
type ErrorResponseCode = 400 | 500;
type ResponseCode =
  | SuccessResponseCode
  | ErrorResponseCode;
/**
 * | {
 *   code: 200;
 *   body: {
 *     success: true;
 *   };
 * }
 * | {
 *   code: 400;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 * | {
 *   code: 500;
 *   body: {
 *     success: false;
 *     error: string;
 *   };
 * }
 */
type ResponseShape = {
  [C in ResponseCode]: {
    code: C;
    body: C extends SuccessResponseCode
      ? { success: true }
      : { success: false; error: string };
  };
}[ResponseCode];
