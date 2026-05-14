// Projectile — fires in a straight line, no gravity.
// IMPORTANT: uses group.create() (not physics.add.sprite + group.add) so Phaser's
// arcade-physics group stepping pipeline integrates the body every frame.
function createProjectile(scene, x, y, velocityX, velocityY, group, isPlayerProjectile) {
  const key = isPlayerProjectile ? "projectile_player" : "projectile_enemy";
  const sprite = group.create(x, y, key);
  if (!sprite) return;
  sprite.setVelocity(velocityX, velocityY);
  sprite.setRotation(Math.atan2(velocityY, velocityX));
  sprite.setCollideWorldBounds(false);
  scene.time.delayedCall(GAME_CONSTANTS.PROJECTILE_LIFETIME, () => {
    if (sprite && sprite.active) sprite.destroy();
  });
}
