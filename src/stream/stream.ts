export class Stream {

    private _stream: NodeJS.WritableStream = process.stdout;

    public writeLine(message: string): void {
        this._stream.write(message + "\n");
    }

}
