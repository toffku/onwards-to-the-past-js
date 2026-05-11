// Ranged enemy — 36×36, lean profile, gun visible, facing right.

class EnemyRangedSprite {
  static generate(scene, era) {
    const c = ERA_COLORS[era].ranged;
    SpriteUtils.draw(scene, `enemy_ranged_${era}`, 36, 36, (g) => {
      // Shadow
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(19, 20, 14);

      // Body
      g.fillStyle(c.body);
      g.fillCircle(18, 18, 13);

      // Inner detail
      g.fillStyle(c.detail);
      g.fillCircle(18, 18, 8);

      // Head
      g.fillStyle(c.head);
      g.fillCircle(24, 11, 6);

      // Gun grip
      g.fillStyle(0x333333);
      g.fillRect(21, 16, 5, 4);

      // Barrel
      g.fillStyle(0x555555);
      g.fillRect(25, 15, 11, 4);

      // Barrel highlight
      g.fillStyle(0x777777);
      g.fillRect(25, 15, 11, 1);
    });
  }
}
