// Enemy — top-down AI. Patrols in a circle until the player enters detection radius,
// then chases/attacks. Rotates to face movement direction.
class Enemy {
  constructor(scene, x, y, type, era) {
    this.scene = scene;
    this.type = type || GAME_CONSTANTS.ENEMY_TYPES.MELEE;
    this.era = era || "asylum";
    this.canFire = true;
    this.aggroed = false;
    this.state = "patrol"; // 'patrol' | 'chase'

    const levelIdx      = scene.levelIndex || 0;
    this.healthMult     = 1 + levelIdx * GAME_CONSTANTS.DIFFICULTY_HEALTH_SCALE;
    this.speedMult      = 1 + levelIdx * GAME_CONSTANTS.DIFFICULTY_SPEED_SCALE;
    this.health         = this._initialHealth();

    // Circular patrol around spawn point
    this.patrolCenter = { x, y };
    this.patrolAngle = Math.random() * Math.PI * 2;
    this.patrolRadius = 60 + Math.random() * 60;

    const textureKey = `enemy_${this.type}_${this.era}`;
    this.sprite = scene.physics.add.sprite(x, y, textureKey);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDamping(true);
    this.sprite.setDrag(0.8);
    this.sprite.enemyRef = this;

    scene.enemies.add(this.sprite);
  }

  _initialHealth() {
    const base =
      this.type === GAME_CONSTANTS.ENEMY_TYPES.BRUTE  ? GAME_CONSTANTS.ENEMY_HEALTH_BRUTE  :
      this.type === GAME_CONSTANTS.ENEMY_TYPES.RANGED ? GAME_CONSTANTS.ENEMY_HEALTH_RANGED :
                                                        GAME_CONSTANTS.ENEMY_HEALTH_MELEE;
    return Math.round(base * this.healthMult);
  }

  update() {
    if (!this.sprite || !this.sprite.active) return;

    const player = this.scene.player;
    if (!player || player.health <= 0) return;

    const dist = Phaser.Math.Distance.Between(
      this.sprite.x,
      this.sprite.y,
      player.sprite.x,
      player.sprite.y,
    );

    // State transitions: aggro locks chase permanently once triggered by damage;
    // distance detection still works for un-aggroed enemies.
    if (dist < GAME_CONSTANTS.ENEMY_DETECTION_RADIUS) {
      this.state = "chase";
    } else if (!this.aggroed && dist > GAME_CONSTANTS.ENEMY_DETECTION_RADIUS * 1.8) {
      this.state = "patrol";
    }

    if (this.state === "chase") {
      this._chase(player, dist);
    } else {
      this._patrol();
    }
  }

  _patrol() {
    this.patrolAngle += 0.018;
    const tx = this.patrolCenter.x + Math.cos(this.patrolAngle) * this.patrolRadius;
    const ty = this.patrolCenter.y + Math.sin(this.patrolAngle) * this.patrolRadius;
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      tx,
      ty,
    );
    const spd = GAME_CONSTANTS.ENEMY_SPEED * 0.55 * this.speedMult;
    this.sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    this.sprite.setRotation(angle);
  }

  _chase(player, dist) {
    const angle = Phaser.Math.Angle.Between(
      this.sprite.x,
      this.sprite.y,
      player.sprite.x,
      player.sprite.y,
    );
    this.sprite.setRotation(angle);

    if (this.type === GAME_CONSTANTS.ENEMY_TYPES.RANGED) {
      // Keep preferred distance; shoot when in range
      const preferred = 160;
      if (dist > preferred + 20) {
        const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * this.speedMult;
        this.sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
      } else if (dist < preferred - 20) {
        const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * 0.7 * this.speedMult;
        this.sprite.setVelocity(-Math.cos(angle) * spd, -Math.sin(angle) * spd);
      } else {
        this.sprite.setVelocity(0, 0);
      }
      this._tryShoot(angle);
    } else if (this.type === GAME_CONSTANTS.ENEMY_TYPES.BRUTE) {
      // Slow but relentless charge
      const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * 0.72 * this.speedMult;
      this.sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    } else {
      // Melee — fast charge
      const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * this.speedMult;
      this.sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    }
  }

  _tryShoot(angle) {
    if (!this.canFire) return;

    const ox = Math.cos(angle) * 20;
    const oy = Math.sin(angle) * 20;
    const spd = GAME_CONSTANTS.PROJECTILE_SPEED * 0.65;

    new Projectile(
      this.scene,
      this.sprite.x + ox,
      this.sprite.y + oy,
      Math.cos(angle) * spd,
      Math.sin(angle) * spd,
      this.scene.projectiles,
      false,
    );

    this.canFire = false;
    this.scene.time.delayedCall(1400, () => {
      this.canFire = true;
    });
  }

  takeDamage(amount) {
    this.health -= amount;
    this.aggroed = true;
    this.state = "chase";

    // Brief white flash
    this.sprite.setTintFill(0xffffff);
    this.scene.time.delayedCall(80, () => {
      if (this.sprite && this.sprite.active) this.sprite.clearTint();
    });

    if (this.health <= 0) this._die();
  }

  _die() {
    // Small death particle burst using a tween on a temporary graphic
    const ex = this.sprite.x;
    const ey = this.sprite.y;
    this.sprite.destroy();

    const flash = this.scene.add.circle(ex, ey, 18, 0xffffff, 0.9);
    this.scene.tweens.add({
      targets: flash,
      alpha: 0,
      scaleX: 2.5,
      scaleY: 2.5,
      duration: 280,
      onComplete: () => flash.destroy(),
    });

    this.scene.checkLevelComplete();
  }
}
