import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing the handleSubmit", () => {
  test("Should be defined",  () => {
    expect(handleSubmit).toBeDefined();
    });
    test("handleSubmit should be a function",  () => {
      expect(typeof handleSubmit).toBe("function");
    });
});
