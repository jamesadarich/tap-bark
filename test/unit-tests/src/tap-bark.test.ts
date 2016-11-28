import { Test, Expect, SpyOn, Any } from "alsatian";
import { TapBark } from "../../../src/tap-bark";
import { OutputBuilder } from "../../_builders/output-builder";
const parser = require("tap-parser");

export default class TapBarkTests {

    @Test("setup called on output")
    public setupFunctionCalledOnOutput() {

        const mockOutput = new OutputBuilder().build();

        SpyOn(mockOutput, "setup");

        const mockParser = parser();

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockOutput.setup).toHaveBeenCalled();
    }

    @Test("plan event handled")
    public parserPlanEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("plan", Any(Function));
    }

    @Test("comment event handled")
    public parserCommentEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("comment", Any(Function));
    }

    @Test("assert event handled")
    public parserAssertEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("assert", Any(Function));
    }

    @Test("complete event handled")
    public parserCompleteEventHandled() {

        const mockOutput = new OutputBuilder().build();

        const mockParser = parser();

        SpyOn(mockParser, "on");

        const tapBark = new TapBark(mockOutput, mockParser);

        Expect(mockParser.on).toHaveBeenCalledWith("complete", Any(Function));
    }
    

    // create()

    // returns a valid TapBark instance
    // returns a different instance each time


    // getPipeable()
    
    // returns a duplex of parser and output stream
    // returns a different instance each time


    // setupListeners()

    // on "plan"
    // * updates this._planEnd

    // on "comment"
    // * calls setFixtureName if starts with #Fixture and a space
    // * otherwise it doesn'this

    // on "assert"
    // test name set correctly
    // progress set correctly

    // on "exit"
    // * calls output.outputResults with
    //   - correct pass (results.pass or 0)
    //   - correct fail (results.fail or results.failures length or 0)
    //   - correct ignore (results.skip or 0 + results.todo or 0)
    //   - correct failures (results.failures)
    // * calls process.exit with 0 if results.ok === true
    // * calls process.exit with 1 if results.ok === false

}