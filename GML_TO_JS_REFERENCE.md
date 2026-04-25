# GameMaker GML to JavaScript Conversion Reference

This document provides a mapping of common GameMaker GML code patterns to JavaScript equivalents used in the web version.

## Variable Declaration

### GML:

```gml
var player_health = 900;
portalCollision = 0;
facingDirection = -180;
```

### JavaScript:

```javascript
let playerHealth = 900;
this.portalCollision = 0;
this.facingDirection = -180;
```

## Conditional Statements

### GML:

```gml
if (takeDamage = 1)
{
    player_health += -10;
}
```

### JavaScript:

```javascript
if (this.takeDamage) {
  this.playerHealth -= 10;
}
```

## Collision Detection

### GML (Collision Event):

```gml
if (takeDamage = 1) {
    player_health += -10;
    alarm_set(1, 45);
    takeDamage = 0;
}
```

### JavaScript (Phaser):

```javascript
this.physics.add.overlap(
  this.projectiles,
  this.player.sprite,
  () => {
    this.player.takeDamage(GAME_CONSTANTS.ENEMY_DAMAGE);
  },
  null,
  this,
);
```

## Object Creation

### GML:

```gml
instance_create_layer(x, y, "Instances", obj_enemy);
```

### JavaScript:

```javascript
new Enemy(scene, x, y, GAME_CONSTANTS.ENEMY_TYPES.MELEE);
```

## Audio Management

### GML:

```gml
audio_play_sound(asylum_music, 0, 1);  // Loop = true
audio_stop_sound(musicname);
```

### JavaScript (Phaser):

```javascript
this.sound.play("asylum_music", { loop: true });
this.sound.stop("asylum_music");
```

## Alarms/Timers

### GML:

```gml
alarm_set(1, 45);  // Set alarm 1 for 45 frames

// In Alarm Event:
if (alarm_index == 1) {
    takeDamage = 1;
}
```

### JavaScript:

```javascript
this.scene.time.delayedCall(45 * (1000 / 60), () => {
  this.takeDamage = true;
});
```

## Movement and Physics

### GML:

```gml
x += velocity_x;
y += velocity_y;
```

### JavaScript (Phaser):

```javascript
this.sprite.setVelocityX(velocityX);
this.sprite.setVelocityY(velocityY);
```

## Sprite Drawing

### GML:

```gml
draw_self();
draw_sprite(sprite_index, image_index, x, y);
```

### JavaScript (Phaser):

```javascript
// Phaser handles this automatically with sprites
this.sprite = this.physics.add.sprite(x, y, "texture-key");
```

## Animation

### GML:

```gml
image_index += 0.1;
if (image_index >= image_number) {
    image_index = 0;
}
```

### JavaScript (Phaser):

```javascript
this.scene.anims.create({
  key: "walk",
  frames: this.scene.anims.generateFrameNumbers("player", { start: 0, end: 7 }),
  frameRate: 10,
  repeat: -1,
});
this.sprite.play("walk");
```

## Keyboard Input

### GML:

```gml
if (keyboard_check(vk_right)) {
    x += speed;
}
if (keyboard_check_pressed(vk_space)) {
    jump();
}
```

### JavaScript (Phaser):

```javascript
const cursors = this.input.keyboard.createCursorKeys();
if (cursors.right.isDown) {
  this.player.moveRight();
}
if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
  this.player.jump();
}
```

## Debugging

### GML:

```gml
show_debug_message(string(player_health));
```

### JavaScript:

```javascript
console.log("Player Health:", this.playerHealth);
console.debug("Debug Info:", data);
```

## Distance/Collision Checking

### GML:

```gml
if (distance_to_object(obj_enemy) < 100) {
    collision_happened = true;
}
```

### JavaScript (Phaser):

```javascript
const distance = Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y);
if (distance < 100) {
  collisionHappened = true;
}
```

## Random Numbers

### GML:

```gml
random_direction = irandom(360);
random_health = random_range(50, 200);
```

### JavaScript:

```javascript
const randomDirection = Phaser.Math.Between(0, 359);
const randomHealth = Phaser.Math.Between(50, 200);
```

## Arrays

### GML:

```gml
enemies[0] = enemy1;
enemies[1] = enemy2;
for (var i = 0; i < array_length(enemies); i++) {
    enemies[i].update();
}
```

### JavaScript:

```javascript
this.enemies = [enemy1, enemy2];
this.enemies.forEach((enemy) => {
  enemy.update();
});
```

## Data Structures

### GML (DS Map):

```gml
data = ds_map_create();
data[? "health"] = 100;
data[? "speed"] = 150;
```

### JavaScript:

```javascript
const data = {
  health: 100,
  speed: 150,
};
```

## Common Function Equivalents

| GML Function | JavaScript Equivalent |
| ------------ | --------------------- |
| `abs(x)`     | `Math.abs(x)`         |
| `sqrt(x)`    | `Math.sqrt(x)`        |
| `sin(x)`     | `Math.sin(x)`         |
| `cos(x)`     | `Math.cos(x)`         |
| `sign(x)`    | `Math.sign(x)`        |
| `floor(x)`   | `Math.floor(x)`       |
| `ceil(x)`    | `Math.ceil(x)`        |
| `round(x)`   | `Math.round(x)`       |
| `max(a,b)`   | `Math.max(a, b)`      |
| `min(a,b)`   | `Math.min(a, b)`      |

## Best Practices for Conversion

1. **Use Constants:** Replace magic numbers with named constants
2. **Class-Based:** Use ES6 classes for game objects (Player, Enemy, etc.)
3. **Separation of Concerns:** Keep logic separate from rendering
4. **Naming Conventions:** Use camelCase for JavaScript (vs snake_case in GML)
5. **Error Handling:** Add try-catch blocks for critical game logic
6. **Performance:** Use object pooling for frequently created objects (projectiles)

---

For more information on Phaser 3, visit: https://phaser.io/
