/*
22. Understand Type Narrowing
*/
const jackson5_11 = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members_11 = ['Janet', 'Michael'].map(
  who => jackson5_11.find(n => n === who)
).filter(who => who !== undefined);
console.log(members_11);
/*
Array [ "Michael" ]
filter out the undefined value
TypeScript isn't able to follow along: type is still 
const members_11: (string | undefined)[]
 */