// Player character — 40×40, top-down, facing right (angle = 0).
// Phaser rotates the sprite to match the player's facing direction at runtime.

class PlayerSprite {
  static generate(scene) {
    SpriteUtils.draw(scene, "player", 40, 40, (g) => {
      // Drop shadow
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(17, 22, 12);

      // Body — dark navy tactical suit
      g.fillStyle(0x142d6e);
      g.fillCircle(16, 20, 12);

      // Chest plate / vest detail
      g.fillStyle(0x1e429a);
      g.fillCircle(16, 20, 8);

      // Vest straps
      g.fillStyle(0x2a5090);
      g.fillRect(13, 13, 2, 13);
      g.fillRect(17, 13, 2, 13);

      // Head (offset toward facing direction = right)
      g.fillStyle(0xf0c898);
      g.fillCircle(22, 13, 6);

      // Tactical helmet
      g.fillStyle(0x441177);
      g.fillRect(17, 8, 11, 6);
      g.fillRect(16, 9, 13, 4);

      // Eye
      g.fillStyle(0x111111);
      g.fillCircle(25, 13, 1.5);

      // Gun grip
      g.fillStyle(0x2a2a2a);
      g.fillRect(20, 19, 5, 5);

      // Gun barrel pointing right
      g.fillStyle(0x4a4a4a);
      g.fillRect(24, 18, 14, 4);

      // Barrel highlight
      g.fillStyle(0x777777);
      g.fillRect(24, 18, 14, 1);

      // Muzzle
      g.fillStyle(0x888866);
      g.fillRect(37, 17, 3, 6);
    });
  }
}
