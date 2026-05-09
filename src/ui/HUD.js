// HUD — health bar, enemy count, level name, and temporary messages.
class HUD {
  constructor(scene) {
    this.scene = scene;
    this.maxHealth = GAME_CONSTANTS.PLAYER_START_HEALTH;

    const style = { fontFamily: "monospace", fontSize: "16px", fill: "#ffffff" };

    // Health label
    this._healthLabel = scene.add
      .text(16, 16, "HP", { fontFamily: "monospace", fontSize: "13px", fill: "#aaaaaa" })
      .setScrollFactor(0)
      .setDepth(10);

    // Health bar background
    this._barBg = scene.add
      .rectangle(16 + 24, 20, 180, 14, 0x330000)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(10);

    // Health bar fill
    this._barFill = scene.add
      .rectangle(16 + 24, 20, 180, 14, 0x00cc44)
      .setOrigin(0, 0.5)
      .setScrollFactor(0)
      .setDepth(10);

    // Health text value
    this._healthText = scene.add
      .text(16 + 24 + 185, 16, "900 / 900", style)
      .setScrollFactor(0)
      .setDepth(10);

    // Enemy count
    this._enemyText = scene.add
      .text(16, 42, "Enemies: --", { fontFamily: "monospace", fontSize: "15px", fill: "#ffaa44" })
      .setScrollFactor(0)
      .setDepth(10);

    // Level name (top-right)
    const levelName = GAME_CONSTANTS.LEVELS[scene.levelIndex]?.name || "Level";
    this._levelText = scene.add
      .text(scene.sys.game.config.width - 16, 16, levelName, {
        fontFamily: "monospace",
        fontSize: "18px",
        fill: "#88ccff",
        fontStyle: "bold",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(10);

    // Centre-screen message (level complete / game over)
    this._messageText = scene.add
      .text(scene.sys.game.config.width / 2, scene.sys.game.config.height / 2, "", {
        fontFamily: "monospace",
        fontSize: "42px",
        fontStyle: "bold",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 6,
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(20)
      .setAlpha(0);
  }

  update(health, enemyCount) {
    const clamped = Math.max(0, health);
    const pct = clamped / this.maxHealth;

    // Bar width
    this._barFill.setDisplaySize(Math.round(180 * pct), 14);

    // Bar colour: green → orange → red
    if (pct > 0.5)       this._barFill.setFillStyle(0x00cc44);
    else if (pct > 0.25) this._barFill.setFillStyle(0xff8800);
    else                  this._barFill.setFillStyle(0xdd1111);

    this._healthText.setText(`${clamped} / ${this.maxHealth}`);
    this._enemyText.setText(`Enemies: ${enemyCount}`);
  }

  showMessage(text, color) {
    this._messageText.setText(text).setFill(color).setAlpha(1);
    this.scene.tweens.add({
      targets: this._messageText,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 300,
      yoyo: true,
      repeat: 2,
    });
  }
}
