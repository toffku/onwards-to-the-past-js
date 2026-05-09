// Projectile — 2D velocity, no gravity. Auto-destroys after lifetime or on wall hit.
class Projectile {
  constructor(scene, x, y, velocityX, velocityY, group, isPlayerProjectile) {
    this.scene = scene;
    this.isPlayerProjectile = isPlayerProjectile;

    const key = isPlayerProjectile ? "projectile_player" : "projectile_enemy";
    this.sprite = scene.physics.add.sprite(x, y, key);
    this.sprite.setVelocity(velocityX, velocityY);

    // Rotate sprite to face travel direction
    this.sprite.setRotation(Math.atan2(velocityY, velocityX));

    // No world-bounds bounce; just let it travel until destroyed
    this.sprite.setCollideWorldBounds(false);

    group.add(this.sprite);

    // Auto-cleanup
    scene.time.delayedCall(GAME_CONSTANTS.PROJECTILE_LIFETIME, () => {
      if (this.sprite && this.sprite.active) this.sprite.destroy();
    });
  }
}
