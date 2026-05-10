// Projectile — fires in a straight line, no gravity.
// IMPORTANT: uses group.create() (not physics.add.sprite + group.add) so Phaser's
// arcade-physics group stepping pipeline integrates the body every frame.
class Projectile {
  constructor(scene, x, y, velocityX, velocityY, group, isPlayerProjectile) {
    const key = isPlayerProjectile ? "projectile_player" : "projectile_enemy";

    this.sprite = group.create(x, y, key);
    if (!this.sprite) return;
    this.sprite.setVelocity(velocityX, velocityY);
    this.sprite.setRotation(Math.atan2(velocityY, velocityX));
    this.sprite.setCollideWorldBounds(false);

    scene.time.delayedCall(GAME_CONSTANTS.PROJECTILE_LIFETIME, () => {
      if (this.sprite && this.sprite.active) this.sprite.destroy();
    });
  }
}
