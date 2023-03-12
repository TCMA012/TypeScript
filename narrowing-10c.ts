const jackson5c = ['Michael'];
const membersc = ['Michael'].map(
  who => jackson5c.find(n => n === who)
); 
console.log(membersc); //Array [ "Michael" ]