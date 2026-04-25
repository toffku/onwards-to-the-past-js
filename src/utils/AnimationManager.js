// Animation Manager - Handles sprite animations for all game objects

class AnimationManager {
  static createAnimations(scene) {
    // Player animations
    this.createPlayerAnimations(scene);

    // Enemy animations
    this.createEnemyAnimations(scene);

    // Projectile animations
    this.createProjectileAnimations(scene);
  }

  static createPlayerAnimations(scene) {
    // Walking animation (placeholder - will use real sprites)
    scene.anims.create({
      key: "player_walk",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // Idle animation
    scene.anims.create({
      key: "player_idle",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 1,
    });

    // Jump animation
    scene.anims.create({
      key: "player_jump",
      frames: [{ key: "player", frame: 8 }],
      frameRate: 1,
    });

    // Attack animation
    scene.anims.create({
      key: "player_attack",
      frames: scene.anims.generateFrameNumbers("player", { start: 9, end: 10 }),
      frameRate: 15,
      repeat: 0,
    });
  }

  static createEnemyAnimations(scene) {
    // Brute walk animation
    scene.anims.create({
      key: "brute_walk",
      frames: scene.anims.generateFrameNumbers("brute", { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });

    // Melee walk animation
    scene.anims.create({
      key: "melee_walk",
      frames: scene.anims.generateFrameNumbers("melee", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // Ranged walk animation
    scene.anims.create({
      key: "ranged_walk",
      frames: scene.anims.generateFrameNumbers("ranged", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    // Enemy attack animation
    scene.anims.create({
      key: "enemy_attack",
      frames: scene.anims.generateFrameNumbers("enemy", { start: 8, end: 10 }),
      frameRate: 15,
      repeat: 0,
    });

    // Enemy death animation
    scene.anims.create({
      key: "enemy_death",
      frames: scene.anims.generateFrameNumbers("enemy", { start: 11, end: 14 }),
      frameRate: 15,
      repeat: 0,
    });
  }

  static createProjectileAnimations(scene) {
    // Laser projectile animation
    scene.anims.create({
      key: "laser_fly",
      frames: scene.anims.generateFrameNumbers("laser", { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1,
    });

    // Projectile impact animation
    scene.anims.create({
      key: "projectile_impact",
      frames: scene.anims.generateFrameNumbers("impact", { start: 0, end: 3 }),
      frameRate: 20,
      repeat: 0,
    });
  }

  // Helper method to flip sprite based on direction
  static flipSpriteIfNeeded(sprite, facingDirection) {
    if (facingDirection === -180) {
      sprite.setFlipX(true);
    } else {
      sprite.setFlipX(false);
    }
  }
}
