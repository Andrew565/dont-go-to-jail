import { Die } from "./Die";

describe("Testing Die model", () => {
  test("Die should start out with a current face equal to faces[0]", () => {
    var die = new Die([0, 1, 2, 3, 4, 5], false);
    expect(die.faces[0]).toEqual(die.current_face);
  });
});
