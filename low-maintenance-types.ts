/*
https://fettblog.eu/low-maintenance-types-typescript/
*/
//With the const context, typeof and index access operators, convert a tuple into a union:
//convert categories into a tuple type and index each element
const categories = [
  "beginner",
  "intermediate",
  "advanced",
] as const;

// "beginner" | "intermediate" | "advanced"
type Category = (typeof categories)[number];



//
const defaultOptions = {
  from: "./src",
  to: "./dest",
  overwrite: true,
};

function copy(options: Partial<typeof defaultOptions>) {
  // Let's merge default options and options
  const allOptions = { ...defaultOptions, ...options};

  // todo: Implementation of the rest
}



//
type ToyBase = {
  name: string;
  price: number;
  quantity: number;
  minimumAge: number;
};

type BoardGame = ToyBase & {
  kind: "boardgame";
  players: number;
}

type Puzzle = ToyBase & {
  kind: "puzzle";
  pieces: number;
}

type Doll = ToyBase & {
  kind: "doll";
  material: "plastic" | "plush";
}

type Toy = BoardGame | Puzzle | Doll;

type ToyKind = Toy["kind"]


type GroupedToys = {
  [K in ToyKind as `${K}s`]: GetKind<Toy, K>[]
};

type GetKind<Group, Kind> = Extract<Group, { kind: Kind }>

type DebugOne = GetKind<Toy, "doll"> // Doll
type DebugTwo = GetKind<Toy, "puzzle"> // Puzzle