/*
https://fettblog.eu/typescript-array-includes/
*/
const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;

/* poor
interface ReadonlyArray<T> {
  includes(searchElement: any, fromIndex?: number): searchElement is T;
}*/

function execute(action: number) {
  if(includes(actions, action)) {
    // Do Something
  }
}

function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}

