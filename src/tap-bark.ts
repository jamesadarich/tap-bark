import { IStream, Stream } from "./_stream";

export class TapBark {

    private _stream: IStream;

    constructor (stream: IStream) {
        this._stream = stream;
    }

}
