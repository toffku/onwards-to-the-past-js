// Player class
class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.health = GAME_CONSTANTS.PLAYER_START_HEALTH;
    this.speed = GAME_CONSTANTS.PLAYER_SPEED;
    this.jumpVelocity = GAME_CONSTANTS.PLAYER_JUMP_VELOCITY;
    this.facingDirection = -180; // -180 = left, 0 = right
    this.canFire = true;
    this.takeDamage = true;
    this.damageTimer = 0;

    // Create sprite (placeholder - will use actual sprites when assets are ready)
    this.sprite = scene.physics.add.sprite(x, y, null);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.2);
    this.sprite.setDrag(0.99);

    // Store reference for callbacks
    this.sprite.playerRef = this;
  }

  moveLeft() {
    this.sprite.setVelocityX(-this.speed);
    this.facingDirection = -180;
  }

  moveRight() {
    this.sprite.setVelocityX(this.speed);
    this.facingDirection = 0;
  }

  moveUp() {
    // Game may support vertical movement in some areas
    if (Math.abs(this.sprite.body.velocity.y) < 100) {
      this.sprite.setVelocityY(-this.speed * 0.5);
    }
  }

  moveDown() {
    // Crouch or descend
    if (Math.abs(this.sprite.body.velocity.y) < 100) {
      this.sprite.setVelocityY(this.speed * 0.5);
    }
  }

  jump() {
    // Only jump if on ground (touching platforms)
    if (this.sprite.body.touching.down) {
      this.sprite.setVelocityY(this.jumpVelocity);
    }
  }

  shoot(projectileGroup) {
    if (!this.canFire) return;

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
      projectileGroup,
      true, // isPlayerProjectile
    );

    this.canFire = false;
    this.scene.time.delayedCall(200, () => {
      this.canFire = true;
    });
  }

  takeDamage(amount) {
    if (!this.takeDamage) return;

    this.health -= amount;
    this.takeDamage = false;

    // Knockback effect
    this.sprite.setVelocityX(this.sprite.body.velocity.x > 0 ? -150 : 150);

    this.damageTimer = GAME_CONSTANTS.PLAYER_DAMAGE_COOLDOWN;
  }

  update() {
    if (this.damageTimer > 0) {
      this.damageTimer--;
      if (this.damageTimer <= 0) {
        this.takeDamage = true;
      }
    }
  }
}
