/*
type Required<T> = {
  [P in keyof T]-?: T[P]
}
export type RemoveOptionalFields<T> = {
  [key in keyof T]-?: T[key] 
}
*/
type User = {
  id: string
  name?: string
  email?: string
}

//set one property as non-optional
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

type UserWithName = WithRequired<User, 'name'>
type UserWithNameRequired = Required<User>

// error: missing name
const user: UserWithName = {
  id: '12345',
}

//sets all properties as non-optional
const userRequired: UserWithNameRequired = {
  id: '12345',
}