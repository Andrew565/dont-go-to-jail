import { Die } from "./Die";

const dieFaces = [0, 1, 2, 3, 4, 5];
var die;

describe("Testing Die model", () => {
  beforeEach(() => {
    die = new Die(dieFaces);
  });

  test("Die should start out with a current face equal to faces[0]", () => {
    expect(die.faces[0]).toEqual(die.current_face);
  });

  test("Die's current face should update", () => {
    die.setCurrentFace(2);
    expect(die.faces[2]).toEqual(die.current_face);
  });

  test("Die should not allow current_face to be set to undefined", () => {
    expect(() => {
      die.setCurrentFace(99);
    }).toThrow();
  });

  test("Die.current_face should equal Die.getCurrentFace", () => {
    expect(die.getCurrentFace()).toEqual(`${die.current_face}`);
  });

  test("Die should start out not being held", () => {
    expect(die.held).toBeFalsy();
  });

  test("Die.toggleHold should toggle the held status", () => {
    expect(die.held).toBeFalsy();
    die.toggleHold();
    expect(die.held).toBeTruthy();
  });

  test("Die.resetHold should reset the held status to false", () => {
    die.toggleHold();
    die.resetHold();
    expect(die.held).toBeFalsy();
  });
});
