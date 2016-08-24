import { IOutput } from "../../src/output/output.i";
import { Output } from "../../src/output/output";
import { IStream } from "../../src/stream/stream.i";
import { StreamBuilder } from "./stream-builder";

export class OutputBuilder {

    private _stream: IStream = new StreamBuilder().build();

    public build(): IOutput {
        return new Output(this._stream);
    }

    public withStream(stream: IStream): OutputBuilder {
        this._stream = stream;
        return this;
    }

}
