import { IStream, Stream } from "./_stream";

export class TapBark {

    private _stream: IStream;
    private _parser: NodeJS.EventEmitter;

    constructor (stream: IStream, parser: NodeJS.EventEmitter) {
        this._stream = stream;
        this._parser = parser;
    }

}
