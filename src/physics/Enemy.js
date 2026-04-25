// Enemy class
class Enemy {
  constructor(scene, x, y, type) {
    this.scene = scene;
    this.type = type;
    this.health = GAME_CONSTANTS.ENEMY_HEALTH;
    this.speed = GAME_CONSTANTS.ENEMY_SPEED;
    this.damage = GAME_CONSTANTS.ENEMY_DAMAGE;
    this.facingDirection = 0; // 0 = right, 180 = left
    this.canFire = true;

    // Create sprite (placeholder)
    this.sprite = scene.physics.add.sprite(x, y, null);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.2);
    this.sprite.setDrag(0.99);

    // Store reference for callbacks
    this.sprite.enemyRef = this;

    // Patrol behavior
    this.patrolDistance = 200;
    this.patrolStart = x;
    this.direction = 1;

    // Add to scene's enemies group
    scene.enemies.add(this.sprite);
  }

  update() {
    if (!this.sprite.active) return;

    // Simple patrol behavior
    this.sprite.x += this.direction * this.speed * 0.016; // Approximate delta time

    // Reverse direction at patrol limits
    if (Math.abs(this.sprite.x - this.patrolStart) > this.patrolDistance) {
      this.direction *= -1;
      this.facingDirection = this.direction > 0 ? 0 : 180;
    }

    // Random shooting
    if (this.type === GAME_CONSTANTS.ENEMY_TYPES.RANGED && this.canFire) {
      if (Math.random() < 0.02) {
        this.shoot();
      }
    }
  }

  shoot() {
    const startX = this.sprite.x + (this.facingDirection === 0 ? 20 : -20);
    const startY = this.sprite.y;
    const velocity =
      this.facingDirection === 0
        ? GAME_CONSTANTS.PROJECTILE_SPEED
        : -GAME_CONSTANTS.PROJECTILE_SPEED;

    new Projectile(
      this.scene,
      startX,
      startY,
      velocity,
      this.scene.projectiles,
      false, // isPlayerProjectile
    );

    this.canFire = false;
    this.scene.time.delayedCall(1000, () => {
      this.canFire = true;
    });
  }

  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    this.sprite.destroy();
  }
}
