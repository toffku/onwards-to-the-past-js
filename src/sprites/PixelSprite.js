// 1×1 white pixel — used as the body for invisible wall/sensor objects.

class PixelSprite {
  static generate(scene) {
    SpriteUtils.draw(scene, "pixel", 1, 1, (g) => {
      g.fillStyle(0xffffff);
      g.fillRect(0, 0, 1, 1);
    });
  }
}
