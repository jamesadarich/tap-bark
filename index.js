"use strict";

const chalk = require("chalk");
let stream = process.stdout;

let clearCurrentLine = () => {
    stream.clearLine();
    stream.cursorTo(0);
};

let writeTestFixture = (name) => {
    stream.write(`# [${name}]`);
};

let writeTestCase = (name) => {
    stream.write(name);
};

let replaceTestFixture = (name) => {
    stream.moveCursor(0, -2);
    clearCurrentLine();
    writeTestFixture(name);
    stream.moveCursor(0, 2);
    stream.cursorTo(0);
};

let replaceTestCase = (name) => {
    stream.moveCursor(0, -1);
    clearCurrentLine();
    writeTestCase(name);
    stream.moveCursor(0, 1);
    stream.cursorTo(0);
};

writeTestFixture("SomeTestFixture");
stream.write("\n");
writeTestCase("testCaseOne");
stream.write("\n");

setTimeout(() => {
    replaceTestCase("testCaseTwo");

    setTimeout(() => {
        replaceTestFixture("AnotherTestFixture");
        replaceTestCase("firstTestCaseHere");

        setTimeout(() => {
            replaceTestCase("ThisIsTheLast");

            setTimeout(() => {
                stream.moveCursor(0, -1);
                clearCurrentLine();
                stream.moveCursor(0, -1);
                clearCurrentLine();

                stream.write(chalk.green("Pass:") + "     " + chalk.bold("4/4\n"));
                stream.write(chalk.red("Fail:") + "     " + chalk.bold("0/4\n"));
                stream.write(chalk.yellow("Ignore:") + "   " + chalk.bold("0/4\n"));
            }, 500);
        }, 600);
    }, 1200);
}, 500);
