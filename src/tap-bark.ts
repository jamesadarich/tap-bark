import { IStream } from "./stream/stream.i";
import { Stream } from "./stream/stream";

export class TapBark {

    private _stream: IStream;
    private _parser: NodeJS.EventEmitter;

    constructor (stream: IStream, parser: NodeJS.EventEmitter) {
        this._stream = stream;
        this._parser = parser;
    }

}
