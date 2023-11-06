//TypeScript Cookbook Stefan Baumgartner Ch 8.5. Allowing at Least One Property
import type {Split} from './Split';

type VideoFormatURLs = {
    format360p: URL;
    format480p: URL;
    format720p: URL;
    format1080p: URL;
}

type AvailableVideoFormats = {
    [K in keyof VideoFormatURLs]: {
        [P in K]: VideoFormatURLs[P]
    };
}[keyof VideoFormatURLs];

function loadVideo(formats: Split<VideoFormatURLs>) {
    //
}

loadVideo({});
loadVideo({
    format480p: new URL("..."),
});