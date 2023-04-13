import { multiply } from "../multiply";

test("ts file import, multiply 1 * 2 to equal 2", () => {
  expect(multiply(1, 2)).toBe(2);
});
