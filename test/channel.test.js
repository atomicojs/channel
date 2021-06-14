import { expect } from "@esm-bundle/chai";
import { Channel } from "../src/channel.js";
/**
 * @todo add test for channel disconnection
 * @todo add test for channel recycling
 */
describe("Channel", () => {
    it("simple channel nesting", async () => {
        const values = [];

        const childA = document.body.appendChild(document.createElement("div"));
        const childB = childA.appendChild(document.createElement("div"));

        const parent = new Channel(document.body, "c");
        const child1 = new Channel(childA, "c");
        const child2 = new Channel(childB, "c");

        parent.connect();

        child1.connect((a) => {
            values.push({ a });
        });

        parent.cast(10);
        parent.cast(11);
        parent.cast(12);

        await Promise.resolve().then(() => {
            child2.connect((b) => {
                values.push({ b });
            });
        });

        expect(values).to.deep.equal([
            { a: 10 },
            { a: 11 },
            { a: 12 },
            { b: 12 },
        ]);
    });
});
