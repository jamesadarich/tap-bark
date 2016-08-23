import { IStream } from "../../src/stream/stream.i";

export class StreamBuilder {

    public build(): IStream {
        return <IStream> {
            writeLine: (message: string) => { }
        };
    }

}
