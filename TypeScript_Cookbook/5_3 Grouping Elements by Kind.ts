/*
5.3. Grouping Elements by Kind
*/
type ToyBase = {
    name: string;
    description: string;
    minimumAge: number;
};

type BoardGame = ToyBase & {
    kind: "boardgame";
    players: number;
};

type Puzzle = ToyBase & {
    kind: "puzzle";
    pieces: number;
};

type Doll = ToyBase & {
    kind: "doll";
    material: "plush" | "plastic";
};

type Toy = Doll | Puzzle | BoardGame;

type Group<
    Collection extends Record<string, any>,
    Selector extends keyof Collection
> = {
    [K in Collection[Selector]]: Extract<Collection, { [P in Selector]: K}>[];
}
type GroupedToys = Partial<Group<Toy, "kind">>;

namespace x {
function groupToys(toys: Toy[]): GroupedToys {
    const groups: GroupedToys = {};
    for (let toy of toys) {
        switch (toy.kind) {
            case "boardgame":
                groups[toy.kind] = groups[toy.kind] ?? [];
                groups[toy.kind]?.push(toy);
                break;
            case "doll":
                groups[toy.kind] = groups[toy.kind] ?? [];
                groups[toy.kind]?.push(toy);
                break;
            case "puzzle":
                groups[toy.kind] = groups[toy.kind] ?? [];
                groups[toy.kind]?.push(toy);
                break;
        }
    }
    return groups;
}
}

function groupToys(toys: Toy[]): GroupedToys {
    const groups: GroupedToys = {};
    for (let toy of toys) {
        assign(groups, toy.kind, toy);
    }
    return groups;
}

function assign<T extends Record<string, K[]>, K>(
    groups: T,
    key: keyof T,
    value: K
) {
    //Initialize when not available
    groups[key] = groups[key] ?? [];
    groups[key]?.push(value);
}
