// Projectile textures for both sides.
// Player bolt: cyan laser. Enemy bolt: red plasma.

class ProjectileSprites {
  static generate(scene) {
    SpriteUtils.draw(scene, "projectile_player", 20, 8, (g) => {
      g.fillStyle(0x00ccff, 0.25);
      g.fillRect(0, 1, 20, 6);
      g.fillStyle(0x00eeff);
      g.fillRect(1, 2, 18, 4);
      g.fillStyle(0xaaffff);
      g.fillRect(3, 3, 14, 2);
      g.fillStyle(0xffffff);
      g.fillRect(6, 3, 8, 2);
    });

    SpriteUtils.draw(scene, "projectile_enemy", 16, 6, (g) => {
      g.fillStyle(0xdd0000, 0.25);
      g.fillRect(0, 0, 16, 6);
      g.fillStyle(0xff3300);
      g.fillRect(1, 1, 14, 4);
      g.fillStyle(0xff8844);
      g.fillRect(3, 2, 10, 2);
    });
  }
}
