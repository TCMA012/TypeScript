const jackson5b = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'];
const membersb = ['Jackie', 'Tito', 'Jermaine', 'Marlon', 'Michael'].map(
  who => jackson5b.find(n => n === who)
); 
console.log(membersb); //Array(5) [ "Jackie", "Tito", "Jermaine", "Marlon", "Michael" ]