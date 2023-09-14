/*
Companion Object Pattern
In the same scope, you can have the same name (e.g. Currency) bound to both a type and a value. 
It lets you group type and value information that's semantically part of a single name together.
The object provides methods that operate on the type.
It also lets consumers import both at once:

This allows you to use Currency as both, a type and a utility, with one single import.
*/

type Currency = {
  unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
  value: number
}

const Currency = {
  from(value: number, unit: Currency['unit'] = 'USD'): Currency {
    return { unit, value }
  }
}



import { Currency } from './Currency'

const amountDue: Currency = {
  unit: 'JPY',
  value: 83733.10
}


const otherAmountDue = Currency.from(330, 'EUR')



{
type CurrencyCompanionObject = {
  DEFAULT: Currency['unit'];
  from(value: Currency['value'], unit: Currency['unit']): Currency;
}

export const Currency: CurrencyCompanionObject = {
  DEFAULT: 'USD',
  from(value: number, unit = Currency.DEFAULT): Currency {
      return { value, unit };
  },
};
}


