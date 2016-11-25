import { Test, TestCase, Expect } from "alsatian";
import { StreamBuilder } from "../../../_builders/stream-builder";
import { OutputProviderBuilder } from "../../../_builders/output-provider-builder";
import { Output } from "../../src/output/output";

export default class SetProgressTests {

    @Test()
    public streamCursorStartsByMovingToZeroNegativeOne() {
        const stream = new StreamBuilder.build();
        const outputProvider = new OutputProviderBuilder.build();

        const output = new Output(stream, outputProvider);

        SpyOn(stream, "moveCursor");

        output.setProgress(100, 100);

        Expect(stream.moveCursor).toHaveBeenCalledWith(0, -1);
    }

    // stream to clear line

    // progress bar set (stream.write)

    // stream move cursor to 0, 1

    // stream cursor to 0, undefined
}