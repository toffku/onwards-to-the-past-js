// Projectile class
class Projectile {
  constructor(scene, x, y, velocityX, group, isPlayerProjectile) {
    this.scene = scene;
    this.isPlayerProjectile = isPlayerProjectile;

    // Create sprite (placeholder)
    this.sprite = scene.physics.add.sprite(x, y, null);
    this.sprite.setVelocityX(velocityX);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounceX(0);
    this.sprite.setGravityY(-500); // Projectiles affected by gravity

    // Add to appropriate group
    group.add(this.sprite);
  }

  destroy() {
    this.sprite.destroy();
  }
}
