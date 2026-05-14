// HUD — health bar, enemy count, level name, and temporary messages.
function createHUD(scene) {
  const maxHealth = GAME_CONSTANTS.PLAYER_START_HEALTH;
  const style = { fontFamily: "monospace", fontSize: "16px", fill: "#ffffff" };

  const healthLabel = scene.add
    .text(16, 16, "HP", { fontFamily: "monospace", fontSize: "13px", fill: "#aaaaaa" })
    .setScrollFactor(0)
    .setDepth(10);

  const barBg = scene.add
    .rectangle(16 + 24, 20, 180, 14, 0x330000)
    .setOrigin(0, 0.5)
    .setScrollFactor(0)
    .setDepth(10);

  const barFill = scene.add
    .rectangle(16 + 24, 20, 180, 14, 0x00cc44)
    .setOrigin(0, 0.5)
    .setScrollFactor(0)
    .setDepth(10);

  const healthText = scene.add
    .text(16 + 24 + 185, 16, "900 / 900", style)
    .setScrollFactor(0)
    .setDepth(10);

  const enemyText = scene.add
    .text(16, 42, "Enemies: --", { fontFamily: "monospace", fontSize: "15px", fill: "#ffaa44" })
    .setScrollFactor(0)
    .setDepth(10);

  const levelName = GAME_CONSTANTS.LEVELS[scene.levelIndex]?.name || "Level";
  scene.add
    .text(scene.sys.game.config.width - 16, 16, levelName, {
      fontFamily: "monospace",
      fontSize: "18px",
      fill: "#88ccff",
      fontStyle: "bold",
    })
    .setOrigin(1, 0)
    .setScrollFactor(0)
    .setDepth(10);

  const messageText = scene.add
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

  function update(health, enemyCount) {
    const clamped = Math.max(0, health);
    const pct = clamped / maxHealth;

    barFill.setDisplaySize(Math.round(180 * pct), 14);

    if (pct > 0.5)       barFill.setFillStyle(0x00cc44);
    else if (pct > 0.25) barFill.setFillStyle(0xff8800);
    else                  barFill.setFillStyle(0xdd1111);

    healthText.setText(`${clamped} / ${maxHealth}`);
    enemyText.setText(`Enemies: ${enemyCount}`);
  }

  function showMessage(text, color) {
    messageText.setText(text).setFill(color).setAlpha(1);
    scene.tweens.add({
      targets: messageText,
      scaleX: 1.08,
      scaleY: 1.08,
      duration: 300,
      yoyo: true,
      repeat: 2,
    });
  }

  return { update, showMessage };
}
