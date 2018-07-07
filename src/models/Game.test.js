import Game from "./Game";

var game;

describe("Game Model Tests", () => {
  beforeEach(() => {
    game = new Game({ totalScore: 1500, maxTurns: 30, numberOfPlayers: 1 });
  });

  test("Game created with 1 player should have 1 player", () => {
    expect(game.players.length).toBe(1);
  });

  test("Game created with 2 players should have 2 players", () => {
    game = new Game({ totalScore: 1500, maxTurns: 30, numberOfPlayers: 2 });
    expect(game.players.length).toBe(2);
  });
});
