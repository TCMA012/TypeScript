https://fettblog.eu/typescript-iterating-over-objects/
function printPerson<T extends Person>(p: T) {
  for (let k in p) {
    console.log(k, p[k]) // This works
  }
}