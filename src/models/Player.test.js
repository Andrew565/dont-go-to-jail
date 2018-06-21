import Player from "./Player";

describe("Player Model", () => {
  test("Player should start off with a score of 0", () => {
    var player1 = new Player(1);
    expect(player1.score).toEqual(0);
  });

  test("Player should start off with a roll value of 0", () => {
    var player1 = new Player(1);
    expect(player1.roll).toEqual(0);
  });

  test("Calling Player.incrementScore(10) should increase the score by 10", () => {
    var player1 = new Player(1);
    player1.incrementScore(10);
    expect(player1.score).toEqual(10);
  });

  test("Calling Player.incrementRoll should increment the roll", () => {
    var player1 = new Player(1);
    player1.incrementRoll();
    expect(player1.roll).toEqual(1);
  });

  test("Calling Player.incrementRoll should increment the roll", () => {
    var player1 = new Player(1);
    player1.incrementRoll();
    expect(player1.roll).toEqual(1);
  });

  test("Incrementing the roll and then calling resetRoll should set roll to 0", () => {
    var player1 = new Player(1);
    player1.incrementRoll();
    player1.incrementRoll();
    player1.resetRoll();
    expect(player1.roll).toEqual(0);
  });
});
