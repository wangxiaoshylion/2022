// CJS 引入测试
const sum = require("../sum");

// ESM 引入测试
import sumEs from "../sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("es import, adds 1 + 2 to equal 3", () => {
  expect(sumEs(1, 2)).toBe(3);
});
