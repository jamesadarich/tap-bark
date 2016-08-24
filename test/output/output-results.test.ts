import { Test, TestCase, Expect, SpyOn } from "alsatian";
import { OutputBuilder } from "../_builders/output-builder";
import { StreamBuilder } from "../_builders/stream-builder";
import { IResults } from "../../src/results.i";

export class OutputResultsTests {

    @TestCase(5)
    @TestCase(10)
    public shouldEmitCorrectPassCount(passes: number) {
        let results: IResults = {
            pass: passes,
            fail: 0,
            ignore: 0
        };

        let stream = new StreamBuilder().build();
        SpyOn(stream, "writeLine");

        let output = new OutputBuilder()
            .withStream(stream)
            .build();

        output.outputResults(results);

        Expect(stream.writeLine).toHaveBeenCalledWith(`Pass:            ${passes}/${passes}`);
    }

    @TestCase(5)
    @TestCase(10)
    public shouldEmitCorrectFailCount(fails: number) {
        let results: IResults = {
            pass: 0,
            fail: fails,
            ignore: 0
        };

        let stream = new StreamBuilder().build();
        SpyOn(stream, "writeLine");

        let output = new OutputBuilder()
            .withStream(stream)
            .build();

        output.outputResults(results);

        Expect(stream.writeLine).toHaveBeenCalledWith(`Fail:            ${fails}/${fails}`);
    }

    @TestCase(5)
    @TestCase(10)
    public shouldEmitCorrectIgnoreCount(ignores: number) {
        let results: IResults = {
            pass: 0,
            fail: 0,
            ignore: ignores
        };

        let stream = new StreamBuilder().build();
        SpyOn(stream, "writeLine");

        let output = new OutputBuilder()
            .withStream(stream)
            .build();

        output.outputResults(results);

        Expect(stream.writeLine).toHaveBeenCalledWith(`Ignore:            ${ignores}/${ignores}`);
    }

    @Test()
    public shouldEmitCorrectFractions() {
        let results: IResults = {
            pass: 2,
            fail: 3,
            ignore: 4
        };

        let stream = new StreamBuilder().build();
        SpyOn(stream, "writeLine");

        let output = new OutputBuilder()
            .withStream(stream)
            .build();

        output.outputResults(results);

        Expect(stream.writeLine).toHaveBeenCalledWith(`Pass:            2/9`);
        Expect(stream.writeLine).toHaveBeenCalledWith(`Fail:            3/9`);
        Expect(stream.writeLine).toHaveBeenCalledWith(`Ignore:            4/9`);
    }

}
