// Player — top-down shooter. No gravity, no jumping.
// Moves in 8 directions (arrow keys); sprite rotates to face movement direction.
// Shoots in the direction last faced (Z key).
class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.health = GAME_CONSTANTS.PLAYER_START_HEALTH;
    this.speed = GAME_CONSTANTS.PLAYER_SPEED;
    this.facingAngle = 0; // radians; 0 = right, matches Phaser rotation convention
    this.canFire = true;
    this.damageCooldown = false;

    this.sprite = scene.physics.add.sprite(x, y, "player");
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDamping(true);
    this.sprite.setDrag(0.85);
    this.sprite.setMaxVelocity(this.speed);
    this.sprite.playerRef = this;
  }

  // dx, dy are normalised direction components (-1, 0, or 1 each)
  move(dx, dy) {
    this.sprite.setVelocity(dx * this.speed, dy * this.speed);
    this.facingAngle = Math.atan2(dy, dx);
    this.sprite.setRotation(this.facingAngle);
  }

  stop() {
    this.sprite.setVelocity(0, 0);
  }

  shoot(projectileGroup) {
    if (!this.canFire) return;

    const ox = Math.cos(this.facingAngle) * 22;
    const oy = Math.sin(this.facingAngle) * 22;
    const vx = Math.cos(this.facingAngle) * GAME_CONSTANTS.PROJECTILE_SPEED;
    const vy = Math.sin(this.facingAngle) * GAME_CONSTANTS.PROJECTILE_SPEED;

    new Projectile(
      this.scene,
      this.sprite.x + ox,
      this.sprite.y + oy,
      vx,
      vy,
      projectileGroup,
      true,
    );

    this.canFire = false;
    this.scene.time.delayedCall(220, () => {
      this.canFire = true;
    });
  }

  takeDamage(amount) {
    if (this.damageCooldown) return;

    this.health -= amount;
    this.damageCooldown = true;

    // Flash red on hit
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.2,
      duration: 80,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        if (this.sprite && this.sprite.active) this.sprite.setAlpha(1);
      },
    });

    this.scene.time.delayedCall(GAME_CONSTANTS.PLAYER_DAMAGE_COOLDOWN, () => {
      this.damageCooldown = false;
    });
  }
}
