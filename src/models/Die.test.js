import { Die } from "./Die";

const dieFaces = [0, 1, 2, 3, 4, 5];

describe("Testing Die model", () => {
  test("Die should start out with a current face equal to faces[0]", () => {
    var die = new Die(dieFaces);
    expect(die.faces[0]).toEqual(die.current_face);
  });

  test("Die's current face should update", () => {
    var die = new Die(dieFaces);
    die.setCurrentFace(2);
    expect(die.faces[2]).toEqual(die.current_face);
  });

  test("Die should not allow current_face to be set to undefined", () => {
    var die = new Die(dieFaces);
    expect(() => {
      die.setCurrentFace(99);
    }).toThrow();
  });

  test("Die.current_face should equal Die.getCurrentFace", () => {
    var die = new Die(dieFaces);
    expect(die.getCurrentFace()).toEqual(`${die.current_face}`);
  });

  test("Die should start out not being held", () => {
    var die = new Die(dieFaces);
    expect(die.held).toBeFalsy();
  });

  test("Die.toggleHold should toggle the held status", () => {
    var die = new Die(dieFaces);
    expect(die.held).toBeFalsy();
    die.toggleHold();
    expect(die.held).toBeTruthy();
  });

  test("Die.resetHold should reset the held status to false", () => {
    var die = new Die(dieFaces);
    die.toggleHold();
    die.resetHold();
    expect(die.held).toBeFalsy();
  });
});
