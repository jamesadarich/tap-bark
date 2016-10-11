import { IOutputProvider } from "./output-provider.i";
import { ResultType } from "../result-type";
import { Assertion } from "../external/tap-parser";
const chalk = require("chalk");
const indent = require("indenthero");

export class OutputProvider implements IOutputProvider {
    public getResultMessage(type: ResultType, typeCount: number, totalCount: number): string {
        switch (type) {
            case ResultType.PASS:
                return chalk.green(`Pass: ${typeCount}/${totalCount}`);

            case ResultType.FAIL:
                return chalk.red(`Fail: ${typeCount}/${totalCount}`);

            case ResultType.IGNORE:
                return chalk.yellow(`Ignore: ${typeCount}/${totalCount}`);
        }

        return undefined;
    }

    public getTestFixtureMessage(name: string): string {
        return `# [${name}]`;
    }

    public getTestMessage(name: string): string {
        return ` --- ${name}`;
    }

    public getFailureMessage(assertion: Assertion): string {
        // tab the diagnostic info
        //let diag = indent(assertion.diag.message);

        return chalk.red("FAIL: ") + chalk.bold(assertion.name) + "\n" + chalk.gray("diag");
    }
}
