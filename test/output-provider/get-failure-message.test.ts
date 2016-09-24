import { Test, TestCase, Expect, SpyOn } from "alsatian";
import { OutputProviderBuilder } from "../_builders/output-provider-builder";
import { ResultType } from "../../src/result-type";
import { Assertion } from "../../src/external/tap-parser";
const chalk = require("chalk");

export class GetFailureMessageTests {

    @TestCase("Some failing test", "---\nbla bla\n---", "    ---\n    bla bla\n    ---")
    @TestCase("Another failing test", "---\nboring diagnostics\n---", "    ---\n    boring diagnostics\n    ---")
    @TestCase("Number test", "---\nexpected 1 to be\n3\n---", "    ---\n    expected 1 to be\n    3\n    ---")
    public shouldReturnCorrectMessage(name: string, diag: string, tabbedDiag: string) {
        let provider = new OutputProviderBuilder().build();

        let assertion: Assertion = {
            id: 0,
            ok: false,
            name: name,
            diag: {
                message: diag
            }
        };

        let expected = chalk.red("FAIL: ") + chalk.bold(name) + "\n" + chalk.gray(tabbedDiag);
        let actual = provider.getFailureMessage(assertion);

        Expect(actual).toBe(expected);
    }

}
