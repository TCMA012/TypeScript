/*
22. Understand Type Narrowing
*/
const jackson5a = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const members2a = ['Michael'].map(
  who => jackson5a.find(n => n === who)
); 
console.log(members2a); //undefined