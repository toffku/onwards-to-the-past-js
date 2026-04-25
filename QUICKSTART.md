# Quick Start Guide

## For Running the Project Now

```bash
# 1. Navigate to project directory
cd "c:\Users\krist\Documents\Important\Ubisoft\Onwards To The Past - AWARD WINNING\Full Game\onwards_to_the_past_web"

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser to http://localhost:8000
```

## What Works Currently

✅ **Menu Screen** - Click "PRESS SPACE TO START" to begin  
✅ **Basic Gameplay Loop** - Player can move, jump, and shoot  
✅ **Placeholder Enemy** - One enemy on screen for testing  
✅ **HUD Display** - Health and level name shown  
✅ **Controls Working** - Arrow keys + Z (shoot) + Space (jump)

## What Needs Assets

The game will run with placeholder graphics, but to see the actual game:

1. **Extract sprites from GameMaker** → `assets/sprites/`
2. **Extract audio files** → `assets/audio/`
3. **Update LevelScene.preload()** with real texture keys
4. **Populate LEVEL_DATA** with actual level layouts

## File Locations

| Purpose                 | File                        | Notes                   |
| ----------------------- | --------------------------- | ----------------------- |
| Modify game constants   | `src/utils/Constants.js`    | Physics, speeds, damage |
| Add levels              | `src/utils/LevelManager.js` | LEVEL_DATA array        |
| Create new enemies      | `src/physics/Enemy.js`      | Extend this class       |
| Change player mechanics | `src/physics/Player.js`     | Movement, shooting      |
| Modify level logic      | `src/scenes/LevelScene.js`  | Main game loop          |
| Update UI               | `src/ui/HUD.js`             | Health, score display   |

## To Add a New Level

1. Open `src/utils/LevelManager.js`
2. Add entry to LEVEL_DATA array:

```javascript
{
    id: 11,
    name: 'New Level',
    era: 'yourera',
    difficulty: 3,
    platforms: [
        // Add platform positions
    ],
    enemies: [
        // Add enemy positions
    ],
    spawns: {
        player: { x: 100, y: 300 },
        goal: { x: 1900, y: 300 }
    }
}
```

## Browser Console Debugging

Press F12 to open developer tools and check:

- Console tab for JavaScript errors
- Network tab to verify assets load
- Performance tab to check FPS

## Common Commands

```bash
# Stop the server
# Press Ctrl+C in the terminal

# Run again
npm start

# Check for node modules
npm ls

# Update dependencies
npm update
```

## Keyboard Shortcuts in Game

- **Arrow Keys** - Move left/right/up/down
- **Space** - Jump
- **Z Key** - Shoot projectile
- **F12** - Open Developer Tools (debug)

## Next Immediate Steps

1. **Extract assets** from GameMaker (2-4 hours)
   - See ASSET_EXTRACTION.md

2. **Update Constants.js** with real values
   - Exact movement speeds
   - Correct health values
   - Proper physics

3. **Fill in LEVEL_DATA** with actual levels
   - Platform positions
   - Enemy placements
   - Spawn points

4. **Load assets in LevelScene**
   - Add spritesheet loading
   - Add audio loading

5. **Test each level**
   - Verify enemy difficulty
   - Check platform placement
   - Balance health/damage

---

**Questions?** Check the relevant documentation:

- Asset issues → `ASSET_EXTRACTION.md`
- Code questions → `GML_TO_JS_REFERENCE.md`
- Game mechanics → `GAME_MECHANICS.md`
- Full implementation guide → `IMPLEMENTATION_GUIDE.md`
