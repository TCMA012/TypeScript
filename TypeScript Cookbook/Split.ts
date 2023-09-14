export type Split<T> = {
    [K in keyof T]: {
        [P in K]: T[P]
    };
}[keyof T];