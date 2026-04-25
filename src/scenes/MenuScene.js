// Menu Scene
class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    // Create a simple menu background
    this.cameras.main.setBackgroundColor("#1a1a1a");

    // Title
    this.add
      .text(this.sys.game.config.width / 2, 150, "ONWARDS TO THE PAST", {
        fontSize: "48px",
        fill: "#fff",
        fontStyle: "bold",
        align: "center",
      })
      .setOrigin(0.5);

    // Subtitle
    this.add
      .text(this.sys.game.config.width / 2, 220, "A Time-Travel Adventure", {
        fontSize: "24px",
        fill: "#aaa",
        align: "center",
      })
      .setOrigin(0.5);

    // Start Game Button
    const startButton = this.add
      .text(this.sys.game.config.width / 2, 400, "PRESS SPACE TO START", {
        fontSize: "32px",
        fill: "#00ff00",
        align: "center",
      })
      .setOrigin(0.5);

    // Add button interactivity
    startButton.setInteractive({ useHandCursor: true });
    startButton.on("pointerover", () => startButton.setFill("#00aa00"));
    startButton.on("pointerout", () => startButton.setFill("#00ff00"));
    startButton.on("pointerdown", () => this.startGame());

    // Keyboard input
    this.input.keyboard.on("keydown-SPACE", () => this.startGame());

    // Instructions
    this.add
      .text(
        this.sys.game.config.width / 2,
        550,
        "Arrow Keys to Move • Z to Shoot • Space to Jump",
        { fontSize: "16px", fill: "#888", align: "center" },
      )
      .setOrigin(0.5);
  }

  startGame() {
    this.scene.start("LevelScene", { levelIndex: 0 });
  }
}
