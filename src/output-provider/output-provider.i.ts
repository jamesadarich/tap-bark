import { ResultType } from "../result-type";

export interface IOutputProvider {
    getResultMessage(type: ResultType, typeCount: number, totalCount: number): string;
    getTestFixtureMessage(name: string): string;
    getTestMessage(name: string): string;
}