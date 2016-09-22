import { IOutput } from "./output/output.i";
import { IResults } from "./results.i";
import { IStream } from "./stream/stream.i";
import { IOutputProvider } from "./output-provider/output-provider.i";
import { Stream } from "./stream/stream";
import { Output } from "./output/output";
import { OutputProvider } from "./output-provider/output-provider";

interface Assertion {
    id: number;
    ok: boolean;
    name: string;
    todo?: boolean | string;
    skip?: boolean | string;
    diag?: any;
}

interface TapBarkArguments {
    output?: IOutput;
    outputProvider?: IOutputProvider;
}

export class TapBark {

    private output: IOutput;
    private parser: NodeJS.EventEmitter;

    constructor (output: IOutput, parser: NodeJS.EventEmitter) {
        this.output = output;
        this.parser = parser;

        this.setupListeners();

        this.output.setup();
    }

    public create(stream: IStream, input: NodeJS.EventEmitter): TapBark {
        let outputProvider = new OutputProvider();
        let output = new Output(stream, outputProvider);

        let tap = new TapBark(output, input);

        return tap;
    }

    private FIXTURE_REGEXP: RegExp = /# FIXTURE (.*)/g;

    private setupListeners(): void {
        this.parser.on("comment", (comment: string) => {
            let fixtureParse = this.FIXTURE_REGEXP.exec(comment);

            if (fixtureParse !== null) {
                this.output.setFixtureName(fixtureParse[1]);
            }
        });

        this.parser.on("assert", (assertion: Assertion) => {
            this.output.setTestName(assertion.name);
        });

        this.parser.on("complete", (results: any) => {
            let _results: IResults = {
                pass: results.pass || 0,
                fail: (results.failures || []).length, // length of failures, or 0
                ignore: (results.skip || 0) + (results.todo || 0)
            };

            this.output.outputResults(_results);

            if (results.ok) {
                process.exit(0);
            } else {
                process.exit(1);
            }
        });
    }
}

const parser = require("tap-parser");
const duplexer = require("duplexer");

let stream = new Stream();
let input = parser();
let duplexed = duplexer(input, stream.getStream());

process.stdin
    .pipe(duplexed)
    .pipe(process.stdout);
