/*
https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional
use the Partial<T> type which TypeScript provides by default.
*/
interface Asset {
    id: string;
    internal_id: string;
    usage: number;
}

interface PostDraft {
    asset: Partial<Asset>;
}

//Now all the properties on asset are optional, which will allow you to do the following:
const postDraft: PostDraft = {
    asset: {
        id: "some-id"
    }
};

/*
Partial<T> is defined as a mapped type that makes every property in the provided type optional (using the ? token).
type Partial<T> = {
    [P in keyof T]?: T[P];
};
*/

//If you want a partial implementation that works recursively on objects:
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};