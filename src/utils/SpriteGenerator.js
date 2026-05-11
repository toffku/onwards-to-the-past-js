// SpriteGenerator — orchestrates all programmatic texture generation.
// Call SpriteGenerator.generate(scene) at the top of LevelScene.create() before any sprites.
// Individual sprite classes live in src/sprites/ and must be loaded before this file.

class SpriteGenerator {
  static generate(scene) {
    PixelSprite.generate(scene);
    PlayerSprite.generate(scene);
    ProjectileSprites.generate(scene);
    GAME_CONSTANTS.ERAS.forEach((era) => {
      EnemyMeleeSprite.generate(scene, era);
      EnemyRangedSprite.generate(scene, era);
      EnemyBruteSprite.generate(scene, era);
    });
  }
}
