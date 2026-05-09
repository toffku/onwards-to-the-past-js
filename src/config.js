// Phaser Configuration
const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_CONSTANTS.WIDTH,
  height: GAME_CONSTANTS.HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [MenuScene, LevelScene],
  render: {
    pixelArt: true,
    antialias: false,
  },
};

// Initialize Game with error handling
let game;
try {
  console.log("Creating Phaser game with config:", config);
  game = new Phaser.Game(config);
  console.log("Phaser game created successfully");
} catch (error) {
  console.error("Error creating Phaser game:", error);
  document.body.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace;"><h2>Game Initialization Error</h2><pre>${error.message}\n${error.stack}</pre></div>`;
}
