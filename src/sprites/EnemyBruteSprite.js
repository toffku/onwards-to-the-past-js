// Brute enemy — 44×44, massive intimidating frame, two visible fists, facing right.

class EnemyBruteSprite {
  static generate(scene, era) {
    const c = ERA_COLORS[era].brute;
    SpriteUtils.draw(scene, `enemy_brute_${era}`, 44, 44, (g) => {
      // Shadow (larger alpha = heavier presence)
      g.fillStyle(0x000000, 0.3);
      g.fillCircle(23, 24, 18);

      // Large body
      g.fillStyle(c.body);
      g.fillCircle(22, 22, 17);

      // Bulk detail
      g.fillStyle(c.detail);
      g.fillEllipse(22, 24, 22, 26);

      // Head
      g.fillStyle(c.head);
      g.fillCircle(28, 13, 8);

      // Angry brow
      g.fillStyle(0x000000, 0.4);
      g.fillRect(23, 10, 10, 3);

      // Leading fist (right, toward facing direction)
      g.fillStyle(c.accent);
      g.fillCircle(37, 22, 6);

      // Trailing fist (left)
      g.fillStyle(c.accent);
      g.fillCircle(10, 22, 5);
    });
  }
}
