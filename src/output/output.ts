import { IStream } from "../stream/stream.i";
import { IResults } from "../results.i";

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

    public setFixtureName(name: string): void {
        // move up two rows
        this._stream.moveCursor(0, -2);

        // clear the line
        this._stream.clearLine();

        // write the new name
        this._stream.write(name);

        // move down two rows
        this._stream.moveCursor(0, 2);

        // set the cursor to 0 x (all the way left), we don't want to move it up or down
        this._stream.cursorTo(0, undefined);
    }

    public setTestName(name: string): void {
        // move up one rows
        this._stream.moveCursor(0, -1);

        // clear the line
        this._stream.clearLine();

        // write the new name
        this._stream.write(name);

        // move down one rows
        this._stream.moveCursor(0, 1);

        // set the cursor to 0 x (all the way left), we don't want to move it up or down
        this._stream.cursorTo(0, undefined);
    }

    public outputResults(results: IResults): void {
        let total = results.pass + results.fail + results.ignore;

        this._stream.writeLine("");
        this._stream.writeLine(`Pass:            ${results.pass}/${total}`);
        this._stream.writeLine(`Fail:            ${results.fail}/${total}`);
        this._stream.writeLine(`Ignore:            ${results.ignore}/${total}`);
    }

}
