// Player — top-down shooter. No gravity, no jumping.
// Moves in 8 directions (arrow keys); sprite rotates to face movement direction.
// Shoots in the direction last faced (Z key).
function createPlayer(scene, x, y) {
  let health = GAME_CONSTANTS.PLAYER_START_HEALTH;
  const speed = GAME_CONSTANTS.PLAYER_SPEED;
  let facingAngle = 0; // radians; 0 = right, matches Phaser rotation convention
  let canFire = true;
  let damageCooldown = false;

  const sprite = scene.physics.add.sprite(x, y, "player");
  sprite.setCollideWorldBounds(true);
  sprite.setDamping(true);
  sprite.setDrag(0.85);
  sprite.setMaxVelocity(speed);

  // dx, dy are normalised direction components (-1, 0, or 1 each)
  function move(dx, dy) {
    sprite.setVelocity(dx * speed, dy * speed);
    facingAngle = Math.atan2(dy, dx);
    sprite.setRotation(facingAngle);
  }

  function stop() {
    sprite.setVelocity(0, 0);
  }

  function shoot(projectileGroup) {
    if (!canFire) return;
    const ox = Math.cos(facingAngle) * 22;
    const oy = Math.sin(facingAngle) * 22;
    const vx = Math.cos(facingAngle) * GAME_CONSTANTS.PROJECTILE_SPEED;
    const vy = Math.sin(facingAngle) * GAME_CONSTANTS.PROJECTILE_SPEED;
    createProjectile(scene, sprite.x + ox, sprite.y + oy, vx, vy, projectileGroup, true);
    canFire = false;
    scene.time.delayedCall(220, () => { canFire = true; });
  }

  function takeDamage(amount) {
    if (damageCooldown) return;
    health -= amount;
    damageCooldown = true;
    scene.tweens.add({
      targets: sprite,
      alpha: 0.2,
      duration: 80,
      yoyo: true,
      repeat: 3,
      onComplete: () => { if (sprite && sprite.active) sprite.setAlpha(1); },
    });
    scene.time.delayedCall(GAME_CONSTANTS.PLAYER_DAMAGE_COOLDOWN, () => {
      damageCooldown = false;
    });
  }

  const player = { sprite, move, stop, shoot, takeDamage };
  // health is read externally (HUD, death check, enemy aggro guard)
  Object.defineProperty(player, "health", { get: () => health, enumerable: true });
  sprite.playerRef = player;
  return player;
}
