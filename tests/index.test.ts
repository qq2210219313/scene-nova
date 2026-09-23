import { describe, expect, it } from "vitest";

import * as sceneNova from "../src";

describe("scene-nova", () => {
  it("可以正常导入库入口", () => {
    expect(sceneNova).toBeTypeOf("object");
  });
});
