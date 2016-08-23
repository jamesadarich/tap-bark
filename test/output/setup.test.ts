import { Test, Expect, SpyOn } from "alsatian";
import { Output } from "../../src/output/output";
import { StreamBuilder } from "../_builders/stream-builder";

export class OutputSetupTests {

    @Test()
    public shouldPrintTwoNewLines() {
        let stream = new StreamBuilder().build();
        let spy = SpyOn(stream, "writeLine");

        let output = new Output(stream);
        output.setup();

        Expect(spy.calls.length).toBe(2);
        Expect(spy.calls[0].args).toEqual([ "" ]);
        Expect(spy.calls[1].args).toEqual([ "" ]);
    }

}
