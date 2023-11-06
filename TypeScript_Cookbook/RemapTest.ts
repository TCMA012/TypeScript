//TypeScript Cookbook Stefan Baumgartner Ch 8.2
import type {Remap, DeepRemap} from './DeepRemap';

type OnlyRequired<T, F extends keyof T> = Required<Pick<T, F>> & Partial<Omit<T, F>>;

type Person = {
	name: string;
    age: number;
    profession: string;
}

type NameRequired = OnlyRequired<Person, "name">;
type NameRequiredRemap = Remap<OnlyRequired<Person, "name">>;



type Subtitles = {
	active: boolean;
    color: string;
};

type Settings = {
    mode: "light" | "dark";
    playbackSpeed: number;
    subtitles: Subtitles;
};

type SettingsRemap = Remap<Settings>;
type SettingsDeepRemap = DeepRemap<Settings>;
