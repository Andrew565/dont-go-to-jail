# Make a Dice Game in a Day with React.js

I'm obsessed with wanting to create a game. So far, I've started on [a card game](https://andrewscripts.wordpress.com/2017/03/16/how-to-make-a-card-game-in-javascript-part-1/) based on someone else's work. This time, I'm going to create a dice game (also based on an existing game).

[Don't Go To Jail](https://boardgamegeek.com/boardgame/1420/monopoly-express) is one of my family's favorite games to play, especially with the kiddos. It combines the simplicity of Yahtzee with the flair (and frustration) of Monopoly to make something like Farkle with easier-to-remember rules and scoring. Because it's a much more straight-forward game than Dungeon Solitaire (the card game mentioned earlier), I'm hopeful to actually complete this one in 24 hours or less.

## The Setup

You can follow the link above to Board Game Geek's run-down of how the game is played. Here's the short version: roll dice, don't go to jail, keep some and reroll the rest until you're happy with your score. The newer version (called Monopoly Express) adds in houses and hotels, but I've never played that version so I'm skipping them for now.

I'll be using [Create React App](https://github.com/facebookincubator/create-react-app) for this project, as I've heard a lot of good things about it and I hate scaffolding up apps from scratch.

### Dice

![The Dice](https://andrewscripts.files.wordpress.com/2017/06/dice.jpg)

The dice are one of the most important aspects of the game (it is a dice game after all), so the first thing I did was create a Die class (and yes, we triple-checked that Die is the singular of Dice).

```javascript
class Die {
  constructor(faces) {
    this.faces = faces
    this.current_face = null
  }

  setCurrentFace(index) {
    this.current_face = faces[index]
  }
}
```

I designed this so that I can have a singular class with which I could create all seven of the property dice. It's designed to work in tandem with a pre-defined dice array:

```javascript
diceArrays = [
  [200, 150, 400, "Wild", 250, 300],
  [500, "RR", "Wild", "RR", 50, 50],
  [100, "Lightbulb", 100, "Lightbulb", 150, 150],
  ["RR", 100, "RR", 500, 50, 50],
  [150, "Water", 150, "Water", 100, 100],
  [250, 200, 300, 400, "RR", "RR"],
  ["RR", 400, 200, 200, 250, 300]
]
```

I'll add in logic for handling score lookups later.

### Player

Next, a basic class for each Player. You can play DGTJ solo, but it's not nearly as enjoyable as competing against other people. For this first version, I'm designing the game to be pass-and-play; i.e. one person takes their turn and then hands the computer or their phone over to the next person. Multi-device multiplayer will come in a later version (if I get back to it).

```javascript
class Player {
  constructor(id) {
    this.id = id
    this.score = 0
  }

  incrementScore(points) {
    this.score += points
  }
}
```

### Game

Next we need a class to store the Game.

```javascript
class Game {
  diceArrays = [
    [200, 150, 400, "Wild", 250, 300],
    [500, "RR", "Wild", "RR", 50, 50],
    [100, "Lightbulb", 100, "Lightbulb", 150, 150],
    ["RR", 100, "RR", 500, 50, 50],
    [150, "Water", 150, "Water", 100, 100],
    [250, 200, 300, 400, "RR", "RR"],
    ["RR", 400, 200, 200, 250, 300]
  ]

  constructor(config) {
    this.targetScore = config.totalScore
    this.maxTurns = config.maxTurns
    this.players = []

    for (var i = config.numberOfPlayers; i > 0; i--) {
      let player = new Player(i)
      this.players.push(player)
    }

    this.turn = 1
    this.currentPlayer = this.players[0]
  }
}
```

I started off with the thinking of "oh, only the Game needs to know about the dice, so it sorta makes sense to instantiate the dice inside of the Game object. Not long after that, I realized that the dice will be a constant set of things, so there's no need to re-instantiate them every time a game is played. I'm presenting these decisions stream-of-thought style so you can follow my progression. All of this code I wrote very quickly on my phone while at my parent's house.

### The HTML

For the 'quick and dirty' version I tried to code on my phone, I created a rough page structure using HAML, and then I converted that to HTML. If you haven't heard of or tried HAML, I highly recommend it if you still hand-code your HTML (Emmet's completions or Pug's templating are also recommended).

I won't bore you with the full HTML, instead I'll give you what I ended up with in JSX.

Here's the board I'm going to emulate digitally:

![The Board](https://andrewscripts.files.wordpress.com/2017/06/image-3.jpeg)

Here's how I broke it down, using Component placeholder names:

```html
<div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Don't Go To Jail!</h2>
  </div>
  <p className="introduction">
    Roll the dice, pick some to keep, reroll the rest. Roll "Go To Jail" and your turn is up!
  </p>
  <main>
    <header id="diceArea">
      <WordDice />
      <PropDice />
    </header>
    <section>
      <PropertyArea id="prop50" quantity={2} />
      <PropertyArea id="prop100" />
      <PropertyArea id="prop200" />
      <PropertyArea id="propRR" quantity={4} />
      <PropertyArea id="prop400" />
    </section>
    <section>
      <PropertyArea id="propUtils" quantity={2} />
      <PropertyArea id="prop150" />
      <PropertyArea id="prop250" />
      <PropertyArea id="prop300" />
      <PropertyArea id="prop500" quantity={2} />
    </section>
  </main>
  <aside>
    <CurrentPlayerStats />
  </aside>
</div>
```

Here you can start to see how I'm imagining the app to work. At the top will be the logo and the title, just like the board. Then there is a small section of introduction to the game, which will convert eventually into 'rules' and 'setup' components where you can learn the rules of the game and set how many players there will be, max score target, that sort of stuff.

The `main` part of the app will be the actual board. At the top of this will be where I display the dice. Then come two sections: one with the various property areas arranged on it, and another (the `aside`) which will display the current player's information and statistics.

Each `PropertyArea` component has at most two attributes: the `id` which I'll use for scripting purposes as well as styling, and the `quantity`. This is for layout purposes to declare how many spaces each property area has for dice. The default is 3, but a few only have 2 spaces while the railroads area can accept 4.

### The First Refactor

As I mentioned earlier, I had had a funny idea about how I wanted to instantiate the Dice. I also hadn't added anything in for creating the 'Word Dice'. So I pulled the diceArrays out of the Game class, and here's where I ended up:

```javascript
const diceArrays = [
  [200, 150, 400, "Wild", 250, 300],
  [500, "RR", "Wild", "RR", 50, 50],
  [100, "Lightbulb", 100, "Lightbulb", 150, 150],
  ["RR", 100, "RR", 500, 50, 50],
  [150, "Water", 150, "Water", 100, 100],
  [250, 200, 300, 400, "RR", "RR"],
  ["RR", 400, 200, 200, 250, 300]
]

export const pointDice = diceArrays.map(dieFaces => {
  return new Die(dieFaces)
})

const wordArrays = [
  [null, null, "Go", "Go", null, null],
  [null, null, "To", "To", null, null],
  [null, null, "Jail", "Jail", null, null]
]

export const wordDice = wordArrays.map(dieFaces => {
  return new Die(dieFaces)
})
```

I also changed the `Die` class's `constructor()` to run `setCurrentFace(0)` as part of its instantiation. This will allow me to display all of the dice immediately at the top of the board. The original thought of just displaying a `null` `current_face` would require weird, unnecessary logic.

For the word dice, I decided that I wanted the 'original' `current_face` when first displayed to be a blank face, but I didn't want to have to do a comparison of the `wordDie.current_face !== ''`, I'd rather do `if (wordDie.current_face)`. Feels more natural, so I made the 'blank' value `null`.

## Getting Into The Game

### Asking For It

The first thing I'll need to do is create a `Setup` component, because it's essentially impossible to have a `Game` without having a set of `config` options to instantiate it with. Here's the JSX:

```html
<!--./src/Setup.jsx-->


```