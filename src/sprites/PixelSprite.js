// 1×1 white pixel — used as the body for invisible wall/sensor objects.

const PixelSprite = {
  generate(scene) {
    SpriteUtils.draw(scene, "pixel", 1, 1, (g) => {
      g.fillStyle(0xffffff);
      g.fillRect(0, 0, 1, 1);
    });
  },
};
