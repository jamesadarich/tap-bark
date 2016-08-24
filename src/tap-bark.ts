import { IOutput } from "./output/output.i";
import { IResults } from "./results.i";

export class TapBark {

    private _output: IOutput;
    private _parser: NodeJS.EventEmitter;

    constructor (output: IOutput, parser: NodeJS.EventEmitter) {
        this._output = output;
        this._parser = parser;

        this._output.setup();
        this._output.setFixtureName("James's Test Fixture");
        this._output.setTestName("The First Test Case");

        setTimeout(() => {
            this._output.setTestName("The Second Test Case");

            setTimeout(() => {
                this._output.setTestName("The Third Test Case");

                setTimeout(() => {
                    this._output.setFixtureName("A Different Fixture Entirely");
                    this._output.setTestName("An Interesting Test Case");

                    setTimeout(() => {
                        this._output.setTestName("The Last Test Case");

                        setTimeout(() => {
                            let results: IResults = {
                                pass: 4,
                                fail: 0,
                                ignore: 1
                            };

                            this._output.outputResults(results);
                        }, 300);
                    }, 600);
                }, 600);
            }, 600);
        }, 600);
    }

}

import { Stream } from "./stream/stream";
import { Output } from "./output/output";

let stream = new Stream();
let output = new Output(stream);

let tap = new TapBark(output, undefined);
