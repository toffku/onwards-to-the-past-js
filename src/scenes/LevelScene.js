// LevelScene — top-down shooter gameplay.
// Reads level layout from LevelManager.LEVEL_DATA; draws floor + walls with Graphics;
// uses an invisible static-body group for wall collision.
class LevelScene extends Phaser.Scene {
  constructor() {
    super("LevelScene");
  }

  init(data) {
    this.levelIndex = data.levelIndex || 0;
    this.levelConfig = GAME_CONSTANTS.LEVELS[this.levelIndex] || GAME_CONSTANTS.LEVELS[0];
  }

  preload() {
    GAME_CONSTANTS.ERAS.forEach(era => {
      this.load.image(`bg_${era}`, `assets/backgrounds/bg_${era}.png`);
    });
  }

  create() {
    // Generate all textures first — must happen before any sprites are created
    SpriteGenerator.generate(this);

    const levelData = LevelManager.getLevelData(this.levelIndex) || {};
    const worldW = levelData.width || 2000;
    const worldH = levelData.height || 768;

    // World & physics bounds
    this.physics.world.setBounds(0, 0, worldW, worldH);

    // ── Visual layers ────────────────────────────────────────────────────────
    this._drawFloor(worldW, worldH);

    // ── Wall physics group (invisible static bodies) ─────────────────────────
    this.walls = this.physics.add.staticGroup();
    this._buildWalls(levelData, worldW, worldH);

    // ── Projectile groups ─────────────────────────────────────────────────────
    this.enemies = this.physics.add.group();
    this.projectiles = this.physics.add.group();       // enemy shots
    this.playerProjectiles = this.physics.add.group(); // player shots

    // ── Enemies ───────────────────────────────────────────────────────────────
    this._spawnEnemies(levelData);

    // ── Player ────────────────────────────────────────────────────────────────
    const spawn = levelData.spawns && levelData.spawns.player
      ? levelData.spawns.player
      : { x: 80, y: 350 };
    this.player = createPlayer(this, spawn.x, spawn.y);

    // ── Collisions ────────────────────────────────────────────────────────────
    this._setupCollisions();

    // ── Input ─────────────────────────────────────────────────────────────────
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
    };

    // ── HUD ───────────────────────────────────────────────────────────────────
    this.hud = createHUD(this);

    // ── Camera ────────────────────────────────────────────────────────────────
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
    this.cameras.main.setBackgroundColor(this._eraFloorColor());

    // ── State ─────────────────────────────────────────────────────────────────
    this.levelCompleting = false;
  }

  // ── Floor background — tiled era-specific PNG ─────────────────────────────

  _drawFloor(w, h) {
    this.add.tileSprite(0, 0, w, h, `bg_${this.levelConfig.era}`)
      .setOrigin(0, 0)
      .setDepth(-1);
  }

  // ── Build all walls (visual + physics) ────────────────────────────────────

  _buildWalls(levelData, w, h) {
    const wallColor = this._eraWallColorHex();
    const bw = 24; // border thickness

    // Draw all wall visuals in one graphics pass
    const g = this.add.graphics();
    const drawWallRect = (x, y, rw, rh) => {
      g.fillStyle(wallColor);
      g.fillRect(x, y, rw, rh);
      // Bevel highlights
      g.fillStyle(0xffffff, 0.09);
      g.fillRect(x, y, rw, 3);
      g.fillRect(x, y, 3, rh);
      g.fillStyle(0x000000, 0.18);
      g.fillRect(x, y + rh - 3, rw, 3);
      g.fillRect(x + rw - 3, y, 3, rh);
      // Physics body (invisible, centered)
      this._addWallBody(x + rw / 2, y + rh / 2, rw, rh);
    };

    // Perimeter
    drawWallRect(0, 0, w, bw);         // top
    drawWallRect(0, h - bw, w, bw);   // bottom
    drawWallRect(0, 0, bw, h);         // left
    drawWallRect(w - bw, 0, bw, h);   // right

    // Internal walls from level data (treat all platforms as top-down barriers)
    if (levelData.platforms) {
      levelData.platforms.forEach((p) => {
        if (p.type === "ground") return; // bottom perimeter already covers this
        drawWallRect(p.x, p.y, p.width, p.height);
      });
    }

    if (levelData.obstacles) {
      levelData.obstacles.forEach((o) => {
        drawWallRect(o.x, o.y, o.width, o.height);
      });
    }
  }

  _addWallBody(cx, cy, w, h) {
    const body = this.walls.create(cx, cy, "pixel");
    body.setDisplaySize(w, h);
    body.setVisible(false);
    body.refreshBody();
  }

  // ── Enemy spawning ─────────────────────────────────────────────────────────

  _spawnEnemies(levelData) {
    const era = this.levelConfig.era;

    if (levelData.enemies && levelData.enemies.length > 0) {
      levelData.enemies.forEach((e) => {
        createEnemy(this, e.x, e.y, e.type, e.era || era);
      });
    } else {
      // Fallback for placeholder levels
      createEnemy(this, 400, 200, GAME_CONSTANTS.ENEMY_TYPES.MELEE, era);
      createEnemy(this, 700, 350, GAME_CONSTANTS.ENEMY_TYPES.RANGED, era);
      createEnemy(this, 1000, 200, GAME_CONSTANTS.ENEMY_TYPES.BRUTE, era);
    }
  }

  // ── Collision setup ────────────────────────────────────────────────────────

  _setupCollisions() {
    // Player / walls
    this.physics.add.collider(this.player.sprite, this.walls);

    // Enemies / walls
    this.physics.add.collider(this.enemies, this.walls);

    // Enemies / enemies (so they don't stack)
    this.physics.add.collider(this.enemies, this.enemies);

    // Player projectiles hit enemies
    this.physics.add.overlap(
      this.playerProjectiles,
      this.enemies,
      (a, b) => {
        // Use group.contains() to identify args — Phaser 3.55 can swap them
        // when one side is a single sprite rather than a group.
        const projSprite = this.playerProjectiles.contains(a) ? a : b;
        const enemySprite = projSprite === a ? b : a;
        if (!projSprite.active) return;
        projSprite.disableBody(true, true);
        this.time.delayedCall(0, () => { if (projSprite) projSprite.destroy(); });
        if (enemySprite.enemyRef) {
          enemySprite.enemyRef.takeDamage(GAME_CONSTANTS.PROJECTILE_DAMAGE);
        }
      },
    );

    // Enemy projectiles hit player.
    // Use group.contains() to identify the projectile — Phaser 3.55 can swap
    // callback args when the second overlap target is a single sprite.
    this.physics.add.overlap(
      this.projectiles,
      this.player.sprite,
      (a, b) => {
        const proj = this.projectiles.contains(a) ? a : b;
        if (!proj.active) return;
        proj.disableBody(true, true);
        this.time.delayedCall(0, () => { if (proj) proj.destroy(); });
        this.player.takeDamage(GAME_CONSTANTS.ENEMY_PROJECTILE_DAMAGE);
      },
    );

    // Melee/brute enemies damage on touch
    this.physics.add.overlap(
      this.player.sprite,
      this.enemies,
      (playerSprite, enemySprite) => {
        if (!enemySprite.enemyRef) return;
        const type = enemySprite.enemyRef.type;
        if (type !== GAME_CONSTANTS.ENEMY_TYPES.RANGED) {
          const dmg = type === GAME_CONSTANTS.ENEMY_TYPES.BRUTE
            ? GAME_CONSTANTS.ENEMY_DAMAGE_BRUTE
            : GAME_CONSTANTS.ENEMY_DAMAGE;
          this.player.takeDamage(dmg);
        }
      },
    );

    // Player projectiles / walls — overlap, not collider: collider separates bodies and
    // can zero velocity before the callback runs, making projectiles stop on first wall touch.
    this.physics.add.overlap(this.playerProjectiles, this.walls, (a, b) => {
      const projSprite = this.playerProjectiles.contains(a) ? a : b;
      if (!projSprite.active) return;
      projSprite.disableBody(true, true);
      this.time.delayedCall(0, () => { if (projSprite) projSprite.destroy(); });
    });

    // Enemy projectiles / walls
    this.physics.add.overlap(this.projectiles, this.walls, (a, b) => {
      const projSprite = this.projectiles.contains(a) ? a : b;
      if (!projSprite.active) return;
      projSprite.disableBody(true, true);
      this.time.delayedCall(0, () => { if (projSprite) projSprite.destroy(); });
    });
  }

  // ── Main loop ──────────────────────────────────────────────────────────────

  update() {
    if (this.levelCompleting) return;

    // 8-directional movement
    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const up = this.cursors.up.isDown;
    const down = this.cursors.down.isDown;

    let dx = 0, dy = 0;
    if (left)  dx -= 1;
    if (right) dx += 1;
    if (up)    dy -= 1;
    if (down)  dy += 1;

    if (dx !== 0 || dy !== 0) {
      // Normalise diagonal so diagonal speed equals cardinal speed
      const len = Math.sqrt(dx * dx + dy * dy);
      this.player.move(dx / len, dy / len);
    } else {
      this.player.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keys.z)) {
      this.player.shoot(this.playerProjectiles);
    }

    // Enemy AI
    this.enemies.children.entries.forEach((sprite) => {
      if (sprite.active && sprite.enemyRef) sprite.enemyRef.update();
    });

    // HUD
    this.hud.update(this.player.health, this.enemies.countActive(true));

    // Death check
    if (this.player.health <= 0) {
      this._gameOver();
    }
  }

  // ── Level complete / game over ─────────────────────────────────────────────

  checkLevelComplete() {
    if (this.levelCompleting) return;
    if (this.enemies.countActive(true) > 0) return;

    this.levelCompleting = true;
    this.hud.showMessage("LEVEL COMPLETE!", "#00ff88");

    this.time.delayedCall(1800, () => {
      const next = this.levelIndex + 1;
      if (next < GAME_CONSTANTS.LEVELS.length) {
        this.scene.start("LevelScene", { levelIndex: next });
      } else {
        this.hud.showMessage("YOU WIN!", "#ffdd00");
        this.time.delayedCall(2500, () => this.scene.start("MenuScene"));
      }
    });
  }

  _gameOver() {
    if (this.levelCompleting) return;
    this.levelCompleting = true;
    this.hud.showMessage("GAME OVER", "#ff3333");
    this.time.delayedCall(2000, () => this.scene.start("MenuScene"));
  }

  // ── Era colour helpers ─────────────────────────────────────────────────────

  _eraFloorColor() {
    const map = {
      asylum: "#1e1e28", egypt: "#3a2e18", jurassic: "#0f2210",
      medieval: "#161628", wildwest: "#2e2010", wwii: "#1a1a1a",
    };
    return map[this.levelConfig.era] || "#1a1a22";
  }

  _eraWallColorHex() {
    const map = {
      asylum: 0x3a4a5a, egypt: 0x7a6040, jurassic: 0x2a4a1a,
      medieval: 0x404055, wildwest: 0x6a4a20, wwii: 0x354535,
    };
    return map[this.levelConfig.era] || 0x3a4a5a;
  }
}
