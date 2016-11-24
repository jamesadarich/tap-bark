import { Test, Expect, SpyOn } from "alsatian";
import { TapBark } from "../../src/tap-bark";

export default class IndexTests {
    public tapBarkPipedToStdIn() {
        SpyOn(process.stdin, "pipe");

        Expect(process.stdin.pipe).toHaveBeenCalledWith(TapBark.create().getPipeable());
    }
}