import { IResults } from "../results.i";

export interface IOutput {
    setup(): void;
    setFixtureName(name: string): void;
    setTestName(name: string): void;
    outputResults(results: IResults): void;
}
