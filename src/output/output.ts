import { IStream } from "../stream/stream.i";

export class Output {

    private _stream: IStream;

    constructor(stream: IStream) {
        this._stream = stream;
    }

    public setup(): void {
        // set up the two empty lines to hold fixture info and test case info
        this._stream.writeLine("");
        this._stream.writeLine("");
    }

}
