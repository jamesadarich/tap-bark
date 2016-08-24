export interface IOutput {
    setup(): void;
    setFixtureName(name: string): void;
    setTestName(name: string): void;
}
