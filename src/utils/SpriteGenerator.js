// SpriteGenerator — creates all game textures programmatically via Phaser Graphics.
// Call SpriteGenerator.generate(scene) at the top of LevelScene.create() before any sprites.

class SpriteGenerator {
  static generate(scene) {
    SpriteGenerator._generatePixel(scene);
    SpriteGenerator._generatePlayer(scene);
    SpriteGenerator._generateProjectiles(scene);
    GAME_CONSTANTS.ERAS.forEach((era) => SpriteGenerator._generateEnemies(scene, era));
  }

  // ─── Internal draw helper ────────────────────────────────────────────────────

  static _draw(scene, key, w, h, fn) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    fn(g);
    g.generateTexture(key, w, h);
    g.destroy();
  }

  // ─── Shared 1×1 pixel (used for invisible wall bodies) ──────────────────────

  static _generatePixel(scene) {
    SpriteGenerator._draw(scene, "pixel", 1, 1, (g) => {
      g.fillStyle(0xffffff);
      g.fillRect(0, 0, 1, 1);
    });
  }

  // ─── Player (40×40, top-down, facing right) ──────────────────────────────────
  // Time-traveller in a dark tactical suit. Gun barrel points right (angle=0).
  // Phaser rotates the sprite to match the facing angle.

  static _generatePlayer(scene) {
    SpriteGenerator._draw(scene, "player", 40, 40, (g) => {
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

      // Head (upper-right, offset toward facing direction = right)
      g.fillStyle(0xf0c898);
      g.fillCircle(22, 13, 6);

      // Hair / tactical helmet top half
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

      // Muzzle flash indicator
      g.fillStyle(0x888866);
      g.fillRect(37, 17, 3, 6);
    });
  }

  // ─── Projectiles ─────────────────────────────────────────────────────────────

  static _generateProjectiles(scene) {
    // Player laser bolt — cyan
    SpriteGenerator._draw(scene, "projectile_player", 20, 8, (g) => {
      g.fillStyle(0x00ccff, 0.25);
      g.fillRect(0, 1, 20, 6);
      g.fillStyle(0x00eeff);
      g.fillRect(1, 2, 18, 4);
      g.fillStyle(0xaaffff);
      g.fillRect(3, 3, 14, 2);
      g.fillStyle(0xffffff);
      g.fillRect(6, 3, 8, 2);
    });

    // Enemy projectile — red bolt
    SpriteGenerator._draw(scene, "projectile_enemy", 16, 6, (g) => {
      g.fillStyle(0xdd0000, 0.25);
      g.fillRect(0, 0, 16, 6);
      g.fillStyle(0xff3300);
      g.fillRect(1, 1, 14, 4);
      g.fillStyle(0xff8844);
      g.fillRect(3, 2, 10, 2);
    });
  }

  // ─── Enemy sprites — per era ─────────────────────────────────────────────────

  static _generateEnemies(scene, era) {
    const c = SpriteGenerator.ERA_COLORS[era];

    // Melee (32×32) — aggressive, angular, facing right
    SpriteGenerator._draw(scene, `enemy_melee_${era}`, 32, 32, (g) => {
      // Shadow
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(17, 17, 12);
      // Body
      g.fillStyle(c.melee.body);
      g.fillCircle(16, 16, 11);
      // Inner detail
      g.fillStyle(c.melee.detail);
      g.fillCircle(16, 16, 6);
      // Head (upper-right = facing right)
      g.fillStyle(c.melee.head);
      g.fillCircle(22, 10, 5);
      // Weapon — forward claw/slash
      g.fillStyle(c.melee.accent);
      g.fillTriangle(25, 13, 31, 16, 25, 19);
      g.fillTriangle(27, 12, 31, 14, 29, 10);
    });

    // Ranged (36×36) — lean, gun visible, facing right
    SpriteGenerator._draw(scene, `enemy_ranged_${era}`, 36, 36, (g) => {
      g.fillStyle(0x000000, 0.2);
      g.fillCircle(19, 20, 14);
      g.fillStyle(c.ranged.body);
      g.fillCircle(18, 18, 13);
      g.fillStyle(c.ranged.detail);
      g.fillCircle(18, 18, 8);
      // Head
      g.fillStyle(c.ranged.head);
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

    // Brute (44×44) — massive, intimidating, facing right
    SpriteGenerator._draw(scene, `enemy_brute_${era}`, 44, 44, (g) => {
      g.fillStyle(0x000000, 0.3);
      g.fillCircle(23, 24, 18);
      // Large body
      g.fillStyle(c.brute.body);
      g.fillCircle(22, 22, 17);
      // Bulk detail
      g.fillStyle(c.brute.detail);
      g.fillEllipse(22, 24, 22, 26);
      // Head
      g.fillStyle(c.brute.head);
      g.fillCircle(28, 13, 8);
      // Angry brow
      g.fillStyle(0x000000, 0.4);
      g.fillRect(23, 10, 10, 3);
      // Right fist (leading, facing right)
      g.fillStyle(c.brute.accent);
      g.fillCircle(37, 22, 6);
      // Left fist (trailing)
      g.fillStyle(c.brute.accent);
      g.fillCircle(10, 22, 5);
    });
  }
}

// ─── Era colour palettes ──────────────────────────────────────────────────────

SpriteGenerator.ERA_COLORS = {
  asylum: {
    brute:  { body: 0x8b0000, detail: 0xaa2222, head: 0xddbbbb, accent: 0xcc0000 },
    melee:  { body: 0xdddddd, detail: 0xffffff, head: 0xffcccc, accent: 0x999999 },
    ranged: { body: 0x445566, detail: 0x5a7080, head: 0xddccbb, accent: 0x778899 },
  },
  egypt: {
    brute:  { body: 0x7a5c3a, detail: 0x9a7a50, head: 0xe8c97a, accent: 0xd4a843 },
    melee:  { body: 0xc4a060, detail: 0xe0bc80, head: 0xf5deb3, accent: 0xb8960b },
    ranged: { body: 0x2a4a3a, detail: 0x3a6a50, head: 0xd2b48c, accent: 0x8b6914 },
  },
  jurassic: {
    brute:  { body: 0x3a6a1a, detail: 0x5a9a30, head: 0x7bc233, accent: 0x8b4513 },
    melee:  { body: 0x7b3a13, detail: 0x9a5225, head: 0xcd853f, accent: 0x4a1a05 },
    ranged: { body: 0x4a6b2f, detail: 0x6a8c40, head: 0x9fcc55, accent: 0x8b6914 },
  },
  medieval: {
    brute:  { body: 0x505a60, detail: 0x7a9098, head: 0xc0a870, accent: 0x8b0000 },
    melee:  { body: 0xa01a1a, detail: 0xcc2222, head: 0xddccaa, accent: 0xffd700 },
    ranged: { body: 0x2a5a8a, detail: 0x4a7ab0, head: 0xddccaa, accent: 0xc0c0c0 },
  },
  wildwest: {
    brute:  { body: 0x6b3510, detail: 0x8b5530, head: 0xdeb887, accent: 0xb8860b },
    melee:  { body: 0xa07030, detail: 0xc09050, head: 0xdeb887, accent: 0x8b4513 },
    ranged: { body: 0x404040, detail: 0x606060, head: 0xdeb887, accent: 0xb8860b },
  },
  wwii: {
    brute:  { body: 0x3b4320, detail: 0x535d30, head: 0xc4a882, accent: 0x8b0000 },
    melee:  { body: 0x4a5a2f, detail: 0x607040, head: 0xc4a882, accent: 0x303030 },
    ranged: { body: 0x263040, detail: 0x364050, head: 0xc4a882, accent: 0x607080 },
  },
};
