# Onwards To The Past - JavaScript Web Conversion

## Project Index & Navigation Guide

---

## 📁 Project Location

```
c:\Users\krist\Documents\Important\Ubisoft\Onwards To The Past - AWARD WINNING\Full Game\
└── onwards_to_the_past_web/          ← NEW WEB VERSION HERE
    └── All web game files
```

---

## 🚀 Quick Start (5 minutes)

```bash
# 1. Open terminal in project directory
cd "c:\Users\krist\Documents\Important\Ubisoft\Onwards To The Past - AWARD WINNING\Full Game\onwards_to_the_past_web"

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser
# Navigate to: http://localhost:8000

# 5. Click "PRESS SPACE TO START"
```

**What you'll see:** A playable web game prototype with placeholder graphics.

---

## 📚 Documentation (START HERE)

Read these in order:

1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ⭐ START HERE
   - Overview of what's been created
   - File structure explanation
   - Feature checklist
   - What's ready vs what needs assets

2. **[QUICKSTART.md](QUICKSTART.md)**
   - 5-minute setup guide
   - Basic commands
   - What works now
   - Next immediate steps

3. **[README.md](README.md)**
   - Project description
   - Features overview
   - Technology stack
   - Development timeline

4. **[CONVERSION_PLAN.md](CONVERSION_PLAN.md)**
   - High-level strategy
   - Framework choice (Phaser 3)
   - Key systems to convert
   - Migration timeline

5. **[GAME_MECHANICS.md](GAME_MECHANICS.md)**
   - Analyzed game mechanics
   - Player/Enemy systems
   - Physics values
   - Audio requirements

6. **[ASSET_EXTRACTION.md](ASSET_EXTRACTION.md)**
   - How to export sprites from GameMaker
   - How to export audio
   - Folder structure for assets
   - File naming conventions

7. **[GML_TO_JS_REFERENCE.md](GML_TO_JS_REFERENCE.md)**
   - GameMaker GML → JavaScript mapping
   - Common function equivalents
   - Code conversion examples
   - Best practices

8. **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)**
   - Step-by-step implementation
   - 7-phase development plan
   - Key implementation details
   - Testing checklist

---

## 📂 File Structure

### Documentation Files

```
├── PROJECT_SUMMARY.md           ⭐ Overview & status
├── QUICKSTART.md                ⭐ 5-minute setup
├── README.md                    Project info
├── CONVERSION_PLAN.md           Strategy
├── ASSET_EXTRACTION.md          Asset export guide
├── GAME_MECHANICS.md            Game analysis
├── GML_TO_JS_REFERENCE.md      Code conversion
├── IMPLEMENTATION_GUIDE.md      Implementation steps
└── INDEX.md                     This file
```

### Source Code (`src/`)

```
src/
├── main.js                      Entry point
├── config.js                    Phaser config
├── scenes/
│   ├── MenuScene.js            Main menu
│   └── LevelScene.js           Gameplay
├── physics/
│   ├── Player.js               Player class
│   ├── Enemy.js                Enemy class
│   └── Projectile.js           Projectile class
├── ui/
│   └── HUD.js                  Health/UI display
└── utils/
    ├── Constants.js             Game constants
    ├── LevelManager.js          Level data
    └── AnimationManager.js      Animation setup
```

### Configuration

```
├── index.html                   Web page entry
├── package.json                 Dependencies
└── .gitignore                   Git ignore rules
```

### Assets (To Be Populated)

```
assets/
├── sprites/                     Sprite graphics
│   ├── player/
│   ├── enemies/
│   ├── backgrounds/
│   └── ui/
├── audio/                       Sound files
│   ├── music/
│   └── sfx/
└── tilemaps/                    Level data
```

---

## 🎮 Game Status

### ✅ What Works Now

- Phaser 3 framework fully integrated
- Menu scene with start button
- Level scene with gameplay loop
- Player movement (arrow keys)
- Jumping (space bar)
- Shooting projectiles (Z key)
- Placeholder enemy on screen
- Health system (900 HP)
- Damage system with cooldown
- HUD display
- Collision detection
- Physics with gravity
- Camera follow system

### ⏳ What Needs Assets

- Sprite graphics (11 placeholder graphics needed)
- Audio files (music + 4 sound effects)
- Level layouts (platforms, enemies, spawn points)
- Enemy variations per era
- UI graphics

### 📋 Implementation Phases

**Phase 1: Assets** (2-4 hours - MANUAL)

- Extract sprites from GameMaker → `assets/sprites/`
- Extract audio from GameMaker → `assets/audio/`
- Screenshot room layouts for reference

**Phase 2: Integration** (2-3 hours)

- Update `LevelScene.preload()` with asset paths
- Update Constants.js with actual values
- Populate LEVEL_DATA with level layouts

**Phase 3: Polish** (2-4 hours)

- Animations
- Sound effects
- Visual polish
- Testing

**Total Estimated Time: 9-16 hours with all assets**

---

## 🔧 Key Files to Modify

| File                        | Purpose          | When                   |
| --------------------------- | ---------------- | ---------------------- |
| `src/utils/Constants.js`    | Game parameters  | Anytime                |
| `src/utils/LevelManager.js` | Level data       | After analyzing rooms  |
| `src/scenes/LevelScene.js`  | Main game logic  | After assets loaded    |
| `src/physics/Player.js`     | Player mechanics | Fine-tuning            |
| `src/physics/Enemy.js`      | Enemy AI         | After mechanics work   |
| `index.html`                | Asset loading    | After assets extracted |

---

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Stop server
Ctrl+C

# Reinstall dependencies
npm install

# Update packages
npm update
```

---

## 🎯 Next Immediate Tasks

### Task 1: Extract Assets (2-4 hours)

1. Open original GameMaker project
2. Export sprites as PNG to `assets/sprites/`
3. Export audio as MP3 to `assets/audio/`
4. See: ASSET_EXTRACTION.md

### Task 2: Analyze Rooms (1-2 hours)

1. Go through each GameMaker room
2. Note platform positions
3. Note enemy placements
4. Take screenshots as reference
5. See: GAME_MECHANICS.md

### Task 3: Update Constants (30 mins)

1. Edit `src/utils/Constants.js`
2. Update PLAYER_SPEED
3. Update ENEMY_SPEED
4. Verify GRAVITY
5. See: GML_TO_JS_REFERENCE.md

### Task 4: Populate Levels (1-2 hours)

1. Open `src/utils/LevelManager.js`
2. Fill LEVEL_DATA array with actual layout
3. Add platform coordinates
4. Add enemy spawn points
5. See: IMPLEMENTATION_GUIDE.md

### Task 5: Test & Debug (1-2 hours)

1. Run npm start
2. Test each level
3. Verify enemy AI
4. Balance difficulty
5. Fix any issues

---

## 🌐 Browser Testing

```
✅ Chrome/Edge (Recommended)
✅ Firefox
✅ Safari
✅ Mobile browsers

⚠️ May not work: IE 11 or older
```

**To test:** Open http://localhost:8000

**To debug:** Press F12 in browser

---

## 📖 Learning Resources

- **Phaser 3:** https://phaser.io/docs
- **JavaScript:** https://mdn.io/javascript
- **Game Dev:** https://developer.mozilla.org/en-US/docs/Games

---

## ⚡ Performance Notes

- **Current:** Works smoothly with placeholder graphics
- **Expected:** 60 FPS on desktop, 30+ FPS on mobile
- **Optimization:** Ready to optimize once assets added

---

## 🤝 Getting Help

| Issue               | Solution                                 |
| ------------------- | ---------------------------------------- |
| Assets not showing  | Check paths in LevelScene.preload()      |
| Physics not working | Verify collisions in LevelScene.create() |
| Performance issues  | Check browser console for errors         |
| Code questions      | See GML_TO_JS_REFERENCE.md               |
| Mechanics questions | See GAME_MECHANICS.md                    |
| How to add levels   | See IMPLEMENTATION_GUIDE.md              |

---

## 📊 Project Progress

```
Framework Setup       ✅ COMPLETE
Core Game Systems    ✅ COMPLETE
Code Architecture    ✅ COMPLETE
Documentation        ✅ COMPLETE
────────────────────────────────
Asset Extraction     ⏳ PENDING
Asset Integration    ⏳ PENDING
Level Implementation ⏳ PENDING
Testing & Polish     ⏳ PENDING
```

---

## 🎓 Architecture Overview

```
index.html (Entry)
    ↓
Phaser 3 Framework
    ├── MenuScene (Start screen)
    ├── LevelScene (Main game)
    │   ├── Player (Controller)
    │   ├── Enemies (AI system)
    │   ├── Projectiles (Combat)
    │   ├── HUD (Display)
    │   └── Physics (Collision)
    └── GameOver (End screen)
```

---

## 💾 Configuration Guide

### Adjust Game Speed

Edit `src/utils/Constants.js`:

```javascript
PLAYER_SPEED: 200,        // Increase for faster movement
PLAYER_JUMP_VELOCITY: -300,  // Increase for higher jump
```

### Change Game Difficulty

Edit `src/utils/Constants.js`:

```javascript
PLAYER_START_HEALTH: 900,  // More health = easier
ENEMY_DAMAGE: 10,          // More damage = harder
```

### Add/Remove Enemies

Edit `src/utils/LevelManager.js` → LEVEL_DATA:

```javascript
enemies: [
  { x: 300, y: 500, type: "melee", era: "asylum" },
  // Add more enemies here
];
```

---

## 🚢 Deployment (When Ready)

1. Ensure all assets are optimized
2. Test in all target browsers
3. Deploy to web hosting (GitHub Pages, Netlify, etc.)
4. Share URL with players

---

## 📝 Version History

**v1.0** (Initial Release - 2026-04-25)

- Framework complete
- All core systems implemented
- Ready for asset integration

---

## ✨ Key Strengths

✅ Modern Phaser 3 framework  
✅ Scalable architecture  
✅ Well-documented code  
✅ Easy to extend  
✅ Cross-browser compatible  
✅ Mobile-responsive ready  
✅ Professional structure  
✅ Complete game mechanics

---

## 🎯 Success Criteria

- [x] Framework set up
- [x] Core mechanics implemented
- [ ] Assets extracted
- [ ] Levels populated
- [ ] All 11 levels playable
- [ ] Audio working
- [ ] 60 FPS performance
- [ ] Deployed online

---

## 📞 Support

For questions, refer to:

1. This INDEX.md file
2. Specific documentation (PROJECT_SUMMARY.md, etc.)
3. Code comments in source files
4. Phaser 3 official documentation

---

**Ready to start? Begin with PROJECT_SUMMARY.md or QUICKSTART.md**

**Last Updated:** 2026-04-25  
**Framework:** Phaser 3.55+  
**Status:** ✅ Framework Ready, ⏳ Awaiting Assets
