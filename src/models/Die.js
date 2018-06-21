function getDieRoll() {
  return Math.floor(Math.random() * 6);
}

export class Die {
  constructor(faces, wordDie = false) {
    this.faces = faces;

    this.current_face = null;
    this.setCurrentFace(0, false);

    this.held = false;

    this.wordDie = wordDie;
  }

  setCurrentFace(index, update = true) {
    if (this.faces[index] === undefined) throw new Error("Face not found");

    this.current_face = this.faces[index];

    // Check for holding if word die
    if (this.wordDie && this.current_face !== null) {
      this.held = true;
    }

    if (update) this.triggerUpdate();
  }

  getCurrentFace() {
    return "" + this.current_face;
  }

  getFancyFace() {
    switch (this.current_face) {
      case null:
        return "---";
      case "Lightbulb":
        return "💡";
      case "Water":
        return "🚰";
      case "RR":
        return "🚂";
      default:
        return "" + this.current_face;
    }
  }

  triggerUpdate() {
    // trigger the 'diceUpdated' event so that die components will refresh
    const diceEvent = new Event("diceUpdated");
    document.dispatchEvent(diceEvent);
  }

  toggleHold() {
    if (!this.wordDie) {
      this.held = !this.held;
      this.triggerUpdate();
    }

    return this;
  }

  resetHold() {
    this.held = false;
  }

  rollDie() {
    if (!this.held) {
      this.setCurrentFace(getDieRoll());
    }

    return this;
  }
}

const diceArrays = [
  [200, 150, 400, "Wild", 250, 300],
  [500, "RR", "Wild", "RR", 50, 50],
  [100, "Lightbulb", 100, "Lightbulb", 150, 150],
  ["RR", 100, "RR", 500, 50, 50],
  [150, "Water", 150, "Water", 100, 100],
  [250, 200, 300, 400, "RR", "RR"],
  ["RR", 400, 200, 200, 250, 300]
];

export const propDice = diceArrays.map(dieFaces => {
  return new Die(dieFaces);
});

const wordArrays = [
  [null, "Go", "Go", null, null, null],
  [null, "To", "To", null, null, null],
  [null, "Jail", "Jail", null, null, null]
];

export const wordDice = wordArrays.map(dieFaces => {
  return new Die(dieFaces, true);
});
