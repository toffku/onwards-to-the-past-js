# JavaScript Web Conversion - Implementation Guide

## Project Status Summary

✅ **Completed:**

- [x] Project structure and directories created
- [x] Phaser 3 framework integrated
- [x] Core game classes created (Player, Enemy, Projectile)
- [x] Basic scene framework (MenuScene, LevelScene)
- [x] Physics and collision system scaffolding
- [x] HUD/UI system template
- [x] Level manager with data structure
- [x] Animation manager template
- [x] Comprehensive documentation

## Current Project Structure

```
onwards_to_the_past_web/
├── index.html                    # Entry point
├── package.json                  # Dependencies
├── README.md                     # Project overview
├── CONVERSION_PLAN.md            # High-level plan
├── ASSET_EXTRACTION.md           # How to extract GameMaker assets
├── GML_TO_JS_REFERENCE.md        # GML to JavaScript mapping
├── GAME_MECHANICS.md             # Analyzed game mechanics
├── IMPLEMENTATION_GUIDE.md       # This file
│
├── src/
│   ├── main.js                   # Game initialization
│   ├── config.js                 # Phaser configuration
│   ├── scenes/
│   │   ├── MenuScene.js          # Main menu
│   │   └── LevelScene.js         # Main gameplay (template)
│   ├── physics/
│   │   ├── Player.js             # Player controller
│   │   ├── Enemy.js              # Enemy AI
│   │   └── Projectile.js         # Projectile system
│   ├── ui/
│   │   └── HUD.js                # Head-up display
│   └── utils/
│       ├── Constants.js          # Game constants
│       ├── LevelManager.js       # Level data and management
│       └── AnimationManager.js   # Animation definitions
│
└── assets/
    ├── sprites/                  # To be populated
    ├── audio/                    # To be populated
    └── tilemaps/                 # To be populated
```

## Next Steps - Implementation Order

### Phase 1: Asset Extraction (Manual - 2-4 hours)

1. **Extract Sprites:**
   - Open the GameMaker project
   - Export all sprites as PNG files to `assets/sprites/`
   - Reference: [ASSET_EXTRACTION.md](ASSET_EXTRACTION.md)

2. **Extract Audio:**
   - Export all sounds as MP3/WAV files to `assets/audio/`

3. **Document Level Layouts:**
   - Take screenshots of each room
   - Note enemy placements
   - Identify platform positions

### Phase 2: Update Asset Loading (1-2 hours)

1. Update `LevelScene.preload()` to load exported assets
2. Create texture keys for all sprites
3. Load audio files and music

### Phase 3: Enhance Player Controller (2-3 hours)

1. Implement sprite animation switching
2. Add proper direction/facing logic
3. Implement frame-by-frame animation
4. Add dash/special move mechanics (if any)
5. Polish movement feel

### Phase 4: Enhance Enemy System (3-4 hours)

1. Create enemy subclasses for each type:
   - BruteEnemy.js
   - MeleeEnemy.js
   - RangedEnemy.js
2. Implement AI behavior per enemy type
3. Add pathfinding (if needed)
4. Implement attack patterns

### Phase 5: Level Implementation (4-6 hours)

1. Convert room data to LEVEL_DATA format
2. Create platform geometry in each level
3. Place enemies according to original levels
4. Add portals and transitions
5. Test level flow

### Phase 6: Audio Integration (1-2 hours)

1. Connect background music to levels
2. Add sound effects for:
   - Player damage
   - Enemy death
   - Projectile fire
   - Portal use
3. Implement audio manager

### Phase 7: Polish & Optimization (2-4 hours)

1. Add particle effects
2. Implement screen shake on damage
3. Add game over/level complete screens
4. Performance optimization
5. Bug fixes and testing

## Key Implementation Details

### Asset Loading Pattern

```javascript
preload() {
    // In LevelScene.preload()
    this.load.spritesheet('player', 'assets/sprites/player.png',
        { frameWidth: 64, frameHeight: 64 });
    this.load.audio('asylum_music', 'assets/audio/asylum_music.mp3');
}
```

### Creating Physics Objects

```javascript
// Platforms
this.platforms
  .create(x, y, null)
  .setScale(width / 16, height / 16)
  .refreshBody();

// With textures (once assets loaded)
this.platforms.create(x, y, "platform-texture").setScale(2).refreshBody();
```

### Updating Constants

Edit `src/utils/Constants.js` with actual game values:

- Exact movement speeds
- Exact damage amounts
- Correct gravity value
- Proper spawn positions

### Level Data Format

Each level in LEVEL_DATA should include:

```javascript
{
    id: 0,
    name: 'Level Name',
    era: 'era_name',
    platforms: [
        { x, y, width, height, type }
    ],
    enemies: [
        { x, y, type, era }
    ],
    spawns: {
        player: { x, y },
        goal: { x, y }
    }
}
```

## Testing Checklist

- [ ] Player can move left/right
- [ ] Player can jump
- [ ] Gravity works correctly
- [ ] Enemies spawn and patrol
- [ ] Player can shoot projectiles
- [ ] Collision detection works
- [ ] Damage system functions
- [ ] Health display updates
- [ ] Enemies die when defeated
- [ ] Music plays at level start
- [ ] Sound effects trigger correctly
- [ ] Camera follows player
- [ ] Level transitions work
- [ ] Menu navigation works
- [ ] Game over screen appears

## Common Issues & Solutions

### Sprites Not Showing

- Verify texture keys match in preload
- Check asset file paths
- Use browser console to check 404 errors

### Physics Not Working

- Ensure sprite.body exists (not null)
- Check if physics groups are created
- Verify collision setup in scene create

### Audio Not Playing

- Check audio file format (MP3/WAV)
- Verify file paths are correct
- Check browser console for errors

### Performance Issues

- Reduce number of active physics bodies
- Use object pooling for projectiles
- Disable physics debug rendering
- Optimize sprite sizes

## File Editing Quick Reference

### Add New Enemy Type

1. Create `src/physics/BruteEnemy.js` extending Enemy
2. Override `update()` method
3. Add AI logic
4. Update LevelScene to instantiate

### Add New Level

1. Add entry to LEVEL_DATA
2. Populate with platform/enemy data
3. Add background music
4. Test in LevelScene

### Add UI Elements

1. Create new class in `src/ui/`
2. Instantiate in LevelScene.create()
3. Update in update() loop

## Performance Targets

- 60 FPS on modern desktop browsers
- 30+ FPS on mobile devices
- Load time < 3 seconds
- Asset size < 50MB total

## Deployment Checklist

- [ ] All assets extracted and optimized
- [ ] No console errors
- [ ] All levels tested
- [ ] Audio works across browsers
- [ ] Mobile responsive
- [ ] Save/load functionality (if needed)
- [ ] Cross-browser testing complete

## Resources

- **Phaser 3 Docs:** https://phaser.io/docs/2.15.0
- **JavaScript ES6:** https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
- **Game Physics:** https://phaser.io/docs/2.15.0/Phaser.Physics.Arcade.html
- **Browser DevTools:** F12 in most browsers

## Support

Refer to specific documentation:

- Asset extraction issues → ASSET_EXTRACTION.md
- Code conversion → GML_TO_JS_REFERENCE.md
- Game mechanics → GAME_MECHANICS.md
- Phaser questions → Official Phaser 3 documentation

---

**Estimated Total Time:** 15-25 hours (depending on complexity of extracted assets and level layouts)

**Suggestion:** Start with Phase 1 (asset extraction) while reviewing game mechanics, then move through remaining phases sequentially.
