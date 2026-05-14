// Enemy — top-down AI. Patrols in a circle until the player enters detection radius,
// then chases/attacks. Rotates to face movement direction.
function createEnemy(scene, x, y, type, era) {
  const _type = type || GAME_CONSTANTS.ENEMY_TYPES.MELEE;
  const _era = era || "asylum";
  let canFire = true;
  let aggroed = false;
  let state = "patrol"; // 'patrol' | 'chase'

  const levelIdx  = scene.levelIndex || 0;
  const healthMult = 1 + levelIdx * GAME_CONSTANTS.DIFFICULTY_HEALTH_SCALE;
  const speedMult  = 1 + levelIdx * GAME_CONSTANTS.DIFFICULTY_SPEED_SCALE;

  function initialHealth() {
    const base =
      _type === GAME_CONSTANTS.ENEMY_TYPES.BRUTE  ? GAME_CONSTANTS.ENEMY_HEALTH_BRUTE  :
      _type === GAME_CONSTANTS.ENEMY_TYPES.RANGED ? GAME_CONSTANTS.ENEMY_HEALTH_RANGED :
                                                    GAME_CONSTANTS.ENEMY_HEALTH_MELEE;
    return Math.round(base * healthMult);
  }

  let health = initialHealth();

  // Circular patrol around spawn point
  const patrolCenter = { x, y };
  let patrolAngle = Math.random() * Math.PI * 2;
  const patrolRadius = 60 + Math.random() * 60;

  const sprite = scene.physics.add.sprite(x, y, `enemy_${_type}_${_era}`);
  sprite.setCollideWorldBounds(true);
  sprite.setDamping(true);
  sprite.setDrag(0.8);

  scene.enemies.add(sprite);

  function patrol() {
    patrolAngle += 0.018;
    const tx = patrolCenter.x + Math.cos(patrolAngle) * patrolRadius;
    const ty = patrolCenter.y + Math.sin(patrolAngle) * patrolRadius;
    const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, tx, ty);
    const spd = GAME_CONSTANTS.ENEMY_SPEED * 0.55 * speedMult;
    sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    sprite.setRotation(angle);
  }

  function tryShoot(angle) {
    if (!canFire) return;
    const ox = Math.cos(angle) * 20;
    const oy = Math.sin(angle) * 20;
    const spd = GAME_CONSTANTS.PROJECTILE_SPEED * 0.65;
    createProjectile(
      scene,
      sprite.x + ox,
      sprite.y + oy,
      Math.cos(angle) * spd,
      Math.sin(angle) * spd,
      scene.projectiles,
      false,
    );
    canFire = false;
    scene.time.delayedCall(1400, () => { canFire = true; });
  }

  function chase(player, dist) {
    const angle = Phaser.Math.Angle.Between(sprite.x, sprite.y, player.sprite.x, player.sprite.y);
    sprite.setRotation(angle);

    if (_type === GAME_CONSTANTS.ENEMY_TYPES.RANGED) {
      const preferred = 160;
      if (dist > preferred + 20) {
        const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * speedMult;
        sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
      } else if (dist < preferred - 20) {
        const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * 0.7 * speedMult;
        sprite.setVelocity(-Math.cos(angle) * spd, -Math.sin(angle) * spd);
      } else {
        sprite.setVelocity(0, 0);
      }
      tryShoot(angle);
    } else if (_type === GAME_CONSTANTS.ENEMY_TYPES.BRUTE) {
      const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * 0.72 * speedMult;
      sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    } else {
      const spd = GAME_CONSTANTS.ENEMY_CHASE_SPEED * speedMult;
      sprite.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
    }
  }

  function die() {
    const ex = sprite.x;
    const ey = sprite.y;
    sprite.destroy();
    const flash = scene.add.circle(ex, ey, 18, 0xffffff, 0.9);
    scene.tweens.add({
      targets: flash,
      alpha: 0,
      scaleX: 2.5,
      scaleY: 2.5,
      duration: 280,
      onComplete: () => flash.destroy(),
    });
    scene.checkLevelComplete();
  }

  function update() {
    if (!sprite || !sprite.active) return;
    const player = scene.player;
    if (!player || player.health <= 0) return;

    const dist = Phaser.Math.Distance.Between(
      sprite.x, sprite.y, player.sprite.x, player.sprite.y,
    );

    // State transitions: aggro locks chase permanently once triggered by damage;
    // distance detection still works for un-aggroed enemies.
    if (dist < GAME_CONSTANTS.ENEMY_DETECTION_RADIUS) {
      state = "chase";
    } else if (!aggroed && dist > GAME_CONSTANTS.ENEMY_DETECTION_RADIUS * 1.8) {
      state = "patrol";
    }

    if (state === "chase") {
      chase(player, dist);
    } else {
      patrol();
    }
  }

  function takeDamage(amount) {
    health -= amount;
    aggroed = true;
    state = "chase";
    sprite.setTintFill(0xffffff);
    scene.time.delayedCall(80, () => {
      if (sprite && sprite.active) sprite.clearTint();
    });
    if (health <= 0) die();
  }

  const enemy = { sprite, type: _type, update, takeDamage };
  sprite.enemyRef = enemy;
  return enemy;
}
