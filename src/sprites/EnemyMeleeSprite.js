// Melee enemy — 32×32, aggressive angular silhouette, facing right.
// Claw/slash weapon visible on the right side.

const EnemyMeleeSprite = {
  generate(scene, era) {
    const c = ERA_COLORS[era].melee;
    SpriteUtils.draw(scene, `enemy_melee_${era}`, 32, 32, (g) => {
      // Shadow
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(17, 17, 12);

      // Body
      g.fillStyle(c.body);
      g.fillCircle(16, 16, 11);

      // Inner detail
      g.fillStyle(c.detail);
      g.fillCircle(16, 16, 6);

      // Head (upper-right = facing right)
      g.fillStyle(c.head);
      g.fillCircle(22, 10, 5);

      // Forward claw
      g.fillStyle(c.accent);
      g.fillTriangle(25, 13, 31, 16, 25, 19);
      g.fillTriangle(27, 12, 31, 14, 29, 10);
    });
  },
};
