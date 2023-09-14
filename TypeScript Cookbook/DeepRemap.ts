//TypeScript Cookbook Stefan Baumgartner Ch 8.2
export type Remap<T> = {
    [K in keyof T]: T[K];
};

export type DeepRemap<T> = T extends object
	? {
	[K in keyof T]: DeepRemap<T[K]>;
}
: T;