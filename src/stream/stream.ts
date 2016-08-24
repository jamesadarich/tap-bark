import { IStream } from "./stream.i";

export class Stream implements IStream {

    private _stream: NodeJS.WritableStream = process.stdout;

    public writeLine(message: string): void {
        this._stream.write(message + "\n");
    }

    public write(message: string): void {

    }

    public moveCursor(x: number, y: number): void {

    }

    public cursorTo(x: number, y: number): void {

    }

    public clearLine(): void {

    }

}
