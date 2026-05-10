# Onwards To The Past - JavaScript Web Conversion

A top-down shooter adaptation of the award-winning GameMaker game, built as a modern JavaScript web application using Phaser 3.

## Project Status

✅ **Core gameplay loop:** Player movement, shooting, 3 enemy types (melee/ranged/brute), collision, HUD  
✅ **Enemy AI:** Patrol, detection radius, chase, ranged firing with cooldown  
✅ **Procedural visuals:** All sprites generated at runtime via `SpriteGenerator` — no external assets required to run  
🔄 **Level content:** 2 fully populated levels (Asylum, Egypt 1); 9 remaining levels are placeholders  
⏳ **Asset integration:** Original sprites/audio pending extraction from the GameMaker project  
⏳ **Polish and optimization**

## Getting Started

### Prerequisites

- Node.js and npm (for running a development server)
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Navigate to the project directory
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open http://localhost:8000 in your browser

## Project Structure

```
src/
├── scenes/           # Game scenes (menu, levels, game over)
├── physics/          # Game objects (Player, Enemy, Projectile)
├── ui/               # HUD and user interface
└── utils/            # Constants and utilities

assets/
├── sprites/          # All sprite graphics
├── audio/            # Background music and sound effects
└── tilemaps/         # Level data and tilemaps
```

## Key Features

- **6 Different Eras:** Asylum, Egypt, Jurassic, Medieval, Wild West, WWII
- **11 Levels:** 2 fully implemented; 9 are content placeholders
- **3 Enemy Types:** Brutes (slow/heavy), melee fighters (fast charge), ranged attackers (keep distance, shoot)
- **Physics-Based Combat:** Projectile system with full collision detection
- **Procedural Visuals:** All sprites drawn programmatically — playable without original game assets
- **Responsive Controls:** 8-directional keyboard movement

## Controls

| Key            | Action                   |
| -------------- | ------------------------ |
| ← → ↑ ↓        | Move (8-directional)     |
| Z              | Shoot                    |
| Space / Click  | Start game (menu only)   |

## Conversion Notes

### From GameMaker to JavaScript

The conversion process translates:

- **GML Events** → JavaScript class methods
- **Audio Functions** → Phaser audio manager
- **Physics** → Phaser Arcade physics
- **Sprites/Animation** → Phaser sprite system
- **Collision Detection** → Phaser physics overlap/collider

### Asset Extraction

Sprites, audio, and level data must be exported from the GameMaker project.  
See [ASSET_EXTRACTION.md](ASSET_EXTRACTION.md) for detailed instructions.

## Development

### Adding New Levels

1. Add a full entry to `LEVEL_DATA` in `src/utils/LevelManager.js` (platforms, obstacles, enemies, spawns)
2. Add a matching entry to `GAME_CONSTANTS.LEVELS` in `src/utils/Constants.js` (name and era)
3. The level is automatically loaded by `LevelScene` via `LevelManager.getLevelData()`

### Extending Enemy AI

Edit `src/physics/Enemy.js` to add new behaviors:

- Patrol patterns
- Shooting mechanics
- Boss encounters

### Customizing Physics

Adjust physics constants in `src/utils/Constants.js`:

- Player movement speed and damage cooldown
- Enemy speed, detection radius, and health per type
- Projectile speed, damage, and lifetime

## Building for Production

When ready to deploy:

1. Optimize assets (compress sprites and audio)
2. Minify JavaScript:

   ```bash
   npm run build
   ```

3. Deploy to web hosting (GitHub Pages, Netlify, etc.)

## Technology Stack

- **Game Engine:** Phaser 3
- **Language:** JavaScript (ES6+)
- **Graphics:** WebGL/Canvas
- **Audio:** Web Audio API (via Phaser)

## Known Limitations

- Some advanced GameMaker features may need reimplementation
- Level complexity depends on asset export quality
- Performance optimized for modern browsers

## Future Enhancements

- [ ] Gamepad/controller support
- [ ] Mobile touch controls
- [ ] Save/load game state
- [ ] Leaderboard system
- [ ] Additional visual effects and particles
- [ ] Difficulty settings

## Contributing

For bug reports or feature requests, please document issues with:

- Browser and OS information
- Steps to reproduce
- Expected vs actual behavior

## License

This project is a conversion of "Onwards To The Past" - an award-winning game.

---

**Last Updated:** 2026-05-10  
**Framework Version:** Phaser 3.55+  
**Node Version:** 14.0+
