import { IStream } from "./stream.i";
import * as readline from "readline";

export class Stream implements IStream {

    private _stream: NodeJS.WritableStream = process.stdout;

    public writeLine(message: string): void {
        this._stream.write(message + "\n");
    }

    public write(message: string): void {
        this._stream.write(message);
    }

    public moveCursor(x: number, y: number): void {
        readline.moveCursor(this._stream, x, y);
    }

    public cursorTo(x: number, y: number): void {
        readline.cursorTo(this._stream, x, y);
    }

    public clearLine(): void {
        readline.clearLine(this._stream, 0);
    }

    public getUnderlyingStream(): NodeJS.WritableStream {
        return this._stream;
    }

}
