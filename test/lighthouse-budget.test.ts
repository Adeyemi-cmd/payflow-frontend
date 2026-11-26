import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const config = JSON.parse(
  readFileSync(new URL("../lighthouserc.json", import.meta.url), "utf8"),
) as {
  ci: {
    collect: { url: string[] };
    assert: {
      assertions: Record<
        string,
        [string, { maxNumericValue?: number; minScore?: number }]
      >;
    };
  };
};

describe("Lighthouse route performance budget", () => {
  it("collects every user-facing route and enforces a good LCP on each", () => {
    expect(config.ci.collect.url).toEqual([
      "/",
      "/account/",
      "/m/",
      "/mandates/",
      "/merchant/",
      "/plans/1/",
      "/receipt/",
      "/status/",
      "/subscribe/",
    ]);
    expect(config.ci.assert.assertions["largest-contentful-paint"]).toEqual([
      "error",
      { maxNumericValue: 2500 },
    ]);
  });
});
