import { IOutput } from "./output/output.i";
import { IResults } from "./results.i";
import { IStream } from "./stream/stream.i";
import { IOutputProvider } from "./output-provider/output-provider.i";
import { Stream } from "./stream/stream";
import { Output } from "./output/output";
import { OutputProvider } from "./output-provider/output-provider";

import { Assertion as TAPAssertion, Results as TAPResults } from "./external/tap-parser";

const parser = require("tap-parser");
const duplexer = require("duplexer");
var pass = 0;
var fail = 0;
var skip = 0;
var total = 0;
var current = 0;
var failures = [];

export class TapBark {

    private output: IOutput;
    private parser: NodeJS.EventEmitter;

    constructor (output: IOutput, parser: NodeJS.EventEmitter) {
        this.output = output;
        this.parser = parser;

        this.setupListeners();

        this.output.setup();
    }

    public static create(): TapBark {
        let stream = new Stream();
        let input = parser();

        let outputProvider = new OutputProvider();
        let output = new Output(stream, outputProvider);

        return new TapBark(output, input);
    }

    public getPipeable(): any {
        return duplexer(this.parser, this.output.getStream().getUnderlyingStream());
    }

    private _handleMessage(info: any) {

      var _this = this;
      var fixtureParse = _this.FIXTURE_REGEXP.exec(info);
      if (fixtureParse !== null) {
          //console.log("fixture");

          _this.output.setFixtureName(fixtureParse[1]);
      }
      else if (/^[0-9]*\.\.[0-9]*$/.test(info)) {
         total = parseInt(info.substr(info.indexOf("..") + 2));
      }
      else if (!info.startsWith("#")) {
          //console.log("non comment");
          var recordingErrorDetails = false;

          if (info.startsWith("ok")) {
             current++;
             if (info.indexOf("# skip") > -1) {
                skip++;
             }
             else {
              pass++;
           }
              var testName = info.substr((<string>info).indexOf(" ", 3) + 1);
              _this.output.setTestName(testName);
              this.output.setProgress(current, total);
          }
          else if (info.startsWith("not ok")) {
             current++;

              var messageSplit = info.replace("not ok ", "").split("\n");

              var testName = info.substr((<string>info).indexOf(" ", 7) + 1);
              this.output.setTestName(testName);
              this.output.setProgress(current, total);

              failures.push({
                  name: messageSplit[0],
                  diag: {
                      message: testName
                  }
              });
              fail++;
          }
          else if (failures[failures.length - 1]) {
              failures[failures.length - 1].diag.message += info;
          }
      }
      else {
         //console.log("NOT LOGGED", info);
      }
   }

    pipe (p) {
        //pipable.pipe(this.parser);
        //this.output.getStream().stream = p;

        p.on("data", (data) => {
            //console.log("piped", data.toString());

            var info = data.toString();

            const messages = info.split("\n");

            messages.forEach(message => this._handleMessage(message));
        });


        //p.on("close", () => { console.log("\n\n\n\n\nENDENDENEDNEDNEDE\n\n\n\n\n") });

        p.on("close", (code) => {
            setTimeout(() => {
               var _results = {
                   pass: pass,
                   fail: fail,
                   ignore: skip,
                   failures: failures
               };
               this.output.outputResults(_results);
               process.exit(code);
            }, 1);
            /*if (_results.fail === 0) {
                process.exit(0);
            }
            else {
                process.exit(1);
            }*/
        });
    }

    private FIXTURE_REGEXP: RegExp = /# FIXTURE (.*)/g;

    // these three functions are needed because tap-parser doesn't always emit a value
    // see tap-parser#40 on github
    private getPassCount = (results: TAPResults) => (results.pass || 0);
    private getFailCount = (results: TAPResults) => (results.fail || (results.failures || []).length);
    private getIgnoreCount = (results: TAPResults) => (results.skip || 0) + (results.todo || 0);

    private setupListeners(): void {
        this.parser.on("comment", (comment: string) => {
            let fixtureParse = this.FIXTURE_REGEXP.exec(comment);

            if (fixtureParse !== null) {
                this.output.setFixtureName(fixtureParse[1]);
            }
        });

        this.parser.on("assert", (assertion: TAPAssertion) => {
            this.output.setTestName(assertion.name);
        });

        this.parser.on("complete", (results: TAPResults) => {
            let _results: IResults = {
                pass: this.getPassCount(results),
                fail: this.getFailCount(results),
                ignore: this.getIgnoreCount(results),
                failures: results.failures
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
