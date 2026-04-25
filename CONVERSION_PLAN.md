# Onwards To The Past - JavaScript Web Conversion Plan

## Project Overview

Converting a GameMaker project to a Phaser 3-based JavaScript web game.

**Game Type:** Time-travel action platformer
**Themes/Eras:** Asylum, Egypt, Jurassic, Medieval, Wild West, WWII
**Levels:** 11 playable levels + menu screens

## Conversion Strategy

### Framework Choice: Phaser 3

- Modern JavaScript game framework
- Built-in physics (Arcade physics)
- Sprite and animation support
- Audio management
- Input handling
- Cross-browser compatible

### Key Game Systems to Convert

#### 1. Core Mechanics

- [ ] Player movement (4 directions)
- [ ] Health/damage system (900 HP baseline)
- [ ] Projectile firing (forward and side)
- [ ] Collision detection and response
- [ ] Portal/transportation system

#### 2. Enemy Types (per era)

- [ ] Brute enemies (melee, high damage)
- [ ] Melee enemies
- [ ] Range enemies (projectile attacks)
- [ ] Boss encounters (if applicable)

#### 3. Environmental Elements

- [ ] Impassable obstacles (full blocks)
- [ ] Half-height obstacles
- [ ] Platforms and level design
- [ ] Portals between areas

#### 4. Game Systems

- [ ] Level/Room management (11 levels)
- [ ] Scene transitions
- [ ] Audio management (background music per level)
- [ ] Input handling (keyboard and potentially gamepad)
- [ ] Camera system
- [ ] Particle effects

#### 5. UI/HUD

- [ ] Health display
- [ ] Level progression
- [ ] Menu screens
- [ ] Game over screen
- [ ] Level complete screen

### Asset Conversion

- **Sprites:** PNG format (already supports transparency)
- **Audio:** MP3 or WAV (web-compatible formats)
- **Tilesets:** Convert to tilemap format
- **Animations:** Recreate using sprite sheets

### Project Structure

```
onwards_to_the_past_web/
├── index.html
├── src/
│   ├── main.js              # Game initialization
│   ├── config.js            # Phaser config
│   ├── scenes/
│   │   ├── MenuScene.js
│   │   ├── LevelScene.js    # Base level template
│   │   ├── levels/          # Individual level implementations
│   │   └── GameOverScene.js
│   ├── physics/
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   └── Projectile.js
│   ├── ui/
│   │   └── HUD.js
│   └── utils/
│       └── Constants.js
├── assets/
│   ├── sprites/
│   ├── audio/
│   └── tilesets/
├── lib/
│   └── phaser.js           # Phaser 3 library
└── package.json            # Dependencies
```

### Migration Timeline

1. **Phase 1:** Setup and core infrastructure
2. **Phase 2:** Player and physics systems
3. **Phase 3:** Enemy AI
4. **Phase 4:** Level implementation
5. **Phase 5:** Polish and optimization

### Known GameMaker-Specific Conversions

- `audio_play_sound()` → Phaser's audio manager
- `alarm_set()` → Phaser timers/events
- `instance_create()` → Phaser physics bodies/gameobjects
- DnD visual code → Plain JavaScript
