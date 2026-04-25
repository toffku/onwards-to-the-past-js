# Onwards To The Past - JavaScript Web Conversion

A complete conversion of the award-winning GameMaker platformer to a modern JavaScript web application using Phaser 3.

## Project Status

✅ **Phase 1 Complete:** Project structure and core framework established  
🔄 **Phase 2:** Asset extraction and conversion (IN PROGRESS)  
⏳ **Phase 3:** Enemy AI implementation  
⏳ **Phase 4:** Level design and implementation  
⏳ **Phase 5:** Polish and optimization

## Getting Started

### Prerequisites

- Node.js and npm (for running a development server)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- The original GameMaker project files

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
- **11 Playable Levels:** Multiple levels per era
- **Dynamic Enemy Types:** Brutes, melee fighters, ranged attackers
- **Physics-Based Combat:** Projectile system with collision detection
- **Audio System:** Dynamic music and sound effects
- **Responsive Controls:** Keyboard input with smooth movement

## Controls

| Key   | Action          |
| ----- | --------------- |
| ← →   | Move Left/Right |
| ↑ ↓   | Move Up/Down    |
| Space | Jump            |
| Z     | Shoot           |

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

1. Create level configuration in `Constants.js`
2. Export level data from GameMaker as JSON
3. Create level-specific scene or load from data

### Extending Enemy AI

Edit `src/physics/Enemy.js` to add new behaviors:

- Patrol patterns
- Shooting mechanics
- Boss encounters

### Customizing Physics

Adjust physics constants in `src/utils/Constants.js`:

- Gravity
- Player movement speed
- Enemy behavior parameters

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

**Last Updated:** 2026-04-25  
**Framework Version:** Phaser 3.55+  
**Node Version:** 14.0+
