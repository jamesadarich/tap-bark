import { Test, TestCase, Expect, SpyOn } from "alsatian";
import { OutputProviderBuilder } from "../_builders/output-provider-builder";
import { ResultType } from "../../src/result-type";
const chalk = require("chalk");

export class GetResultMessageTests {

    @TestCase(5, 10)
    @TestCase(20, 50)
    @TestCase(100, 200)
    public shouldReturnCorrectMessageForPass(passes: number, total: number) {
        let provider = new OutputProviderBuilder().build();
        let expected = chalk.green(`Pass: ${passes}/${total}`);

        Expect(() => {
            provider.getResultMessage(ResultType.PASS, passes, total);
        }).toBe(expected);
    }

    @TestCase(5, 10)
    @TestCase(20, 50)
    @TestCase(100, 200)
    public shouldReturnCorrectMessageForFail(failures: number, total: number) {
        let provider = new OutputProviderBuilder().build();
        let expected = chalk.red(`Fail: ${failures}/${total}`);

        Expect(() => {
            provider.getResultMessage(ResultType.FAIL, failures, total);
        }).toBe(expected);
    }

    @TestCase(5, 10)
    @TestCase(20, 50)
    @TestCase(100, 200)
    public shouldReturnCorrectMessageForIgnored(ignores: number, total: number) {
        let provider = new OutputProviderBuilder().build();
        let expected = chalk.red(`Ignore: ${ignores}/${total}`);

        Expect(() => {
            provider.getResultMessage(ResultType.IGNORE, ignores, total);
        }).toBe(expected);
    }

}
