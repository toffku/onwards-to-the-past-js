// Level Scene - Main gameplay scene
class LevelScene extends Phaser.Scene {
  constructor() {
    super("LevelScene");
  }

  init(data) {
    this.levelIndex = data.levelIndex || 0;
    this.levelConfig = GAME_CONSTANTS.LEVELS[this.levelIndex];
  }

  preload() {
    // Load level-specific assets here
    // Currently placeholder - assets need to be exported from GameMaker
  }

  create() {
    // Set background color based on era
    this.setBackgroundByEra();

    // Create physics groups
    this.platforms = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.playerProjectiles = this.physics.add.group();

    // Create player
    this.player = new Player(this, 100, 300);

    // Create basic level layout
    this.createBasicLevel();

    // Setup collisions
    this.setupCollisions();

    // Setup input
    this.setupInput();

    // Create HUD
    this.hud = new HUD(this);

    // Set camera to follow player
    this.cameras.main.setBounds(0, 0, 2000, this.sys.game.config.height);
    this.cameras.main.startFollow(this.player.sprite);

    this.physics.world.setBounds(0, 0, 2000, this.sys.game.config.height);
  }

  setBackgroundByEra() {
    const eraColors = {
      asylum: "#4a4a4a",
      egypt: "#c9a876",
      jurassic: "#2d5016",
      medieval: "#3d3d5c",
      wildwest: "#b8860b",
      wwii: "#505050",
    };

    const color = eraColors[this.levelConfig.era] || "#1a1a1a";
    this.cameras.main.setBackgroundColor(color);
  }

  createBasicLevel() {
    // Create temporary placeholder level
    // In production, this would load from level data

    // Ground
    this.platforms
      .create(500, GAME_CONSTANTS.HEIGHT - 50, null)
      .setScale(10, 1)
      .refreshBody();

    // Add some platforms
    this.platforms.create(300, GAME_CONSTANTS.HEIGHT - 200, null);
    this.platforms.create(700, GAME_CONSTANTS.HEIGHT - 300, null);

    // Create a simple enemy
    new Enemy(this, 800, 400, GAME_CONSTANTS.ENEMY_TYPES.MELEE);
  }

  setupCollisions() {
    // Player vs platforms
    this.physics.add.collider(this.player.sprite, this.platforms);

    // Player projectiles vs enemies
    this.physics.add.overlap(
      this.playerProjectiles,
      this.enemies,
      (projectile, enemy) => {
        projectile.destroy();
        enemy.takeDamage(GAME_CONSTANTS.PROJECTILE_DAMAGE);
      },
      null,
      this,
    );

    // Enemy projectiles vs player
    this.physics.add.overlap(
      this.projectiles,
      this.player.sprite,
      () => {
        this.player.takeDamage(GAME_CONSTANTS.ENEMY_DAMAGE);
      },
      null,
      this,
    );

    // Enemies vs platforms
    this.physics.add.collider(this.enemies, this.platforms);
  }

  setupInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    };
  }

  update() {
    // Update player input
    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    }

    if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    }

    // Jump
    if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
      this.player.jump();
    }

    // Shoot
    if (Phaser.Input.Keyboard.JustDown(this.keys.z)) {
      this.player.shoot(this.playerProjectiles);
    }

    // Update HUD
    this.hud.updateHealth(this.player.health);

    // Check if player died
    if (this.player.health <= 0) {
      this.gameOver();
    }

    // Update enemies
    this.enemies.children.entries.forEach((enemy) => {
      if (enemy.active) {
        enemy.update();
      }
    });
  }

  gameOver() {
    this.scene.stop();
    this.scene.start("MenuScene");
  }
}
