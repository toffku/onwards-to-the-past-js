// Shared drawing primitive used by every sprite generator.
// Loaded before all sprite files; do not add game logic here.

class SpriteUtils {
  static draw(scene, key, w, h, fn) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    fn(g);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
