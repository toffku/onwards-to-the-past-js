// HUD (Heads-Up Display) class
class HUD {
  constructor(scene) {
    this.scene = scene;

    // Create health display
    this.healthText = scene.add.text(16, 16, "Health: 900", {
      fontSize: "20px",
      fill: "#ff0000",
      fontStyle: "bold",
    });
    this.healthText.setScrollFactor(0); // Don't scroll with camera

    // Create level display
    const levelName = GAME_CONSTANTS.LEVELS[scene.levelIndex]?.name || "Level";
    this.levelText = scene.add.text(
      scene.sys.game.config.width - 200,
      16,
      `Level: ${levelName}`,
      { fontSize: "20px", fill: "#00ff00", fontStyle: "bold" },
    );
    this.levelText.setScrollFactor(0);
    this.levelText.setOrigin(1, 0);
  }

  updateHealth(health) {
    this.healthText.setText(`Health: ${Math.max(0, health)}`);

    // Change color based on health
    if (health < 200) {
      this.healthText.setFill("#ff0000");
    } else if (health < 500) {
      this.healthText.setFill("#ffaa00");
    } else {
      this.healthText.setFill("#00ff00");
    }
  }
}
