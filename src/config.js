// Phaser Configuration
const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_CONSTANTS.WIDTH,
  height: GAME_CONSTANTS.HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: GAME_CONSTANTS.GRAVITY },
      debug: false,
    },
  },
  scene: [MenuScene, LevelScene],
  render: {
    pixelArt: true,
    antialias: false,
  },
};

// Initialize Game
const game = new Phaser.Game(config);
