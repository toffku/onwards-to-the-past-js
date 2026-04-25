# Game Mechanics Analysis - GameMaker to JavaScript

This document outlines all discovered game mechanics from the original GameMaker project that need to be implemented in the JavaScript version.

## Player Mechanics

### Health System

- **Starting Health:** 900 HP
- **Damage Types:**
  - Regular enemies: -10 HP per hit
  - Brute enemies: -30 HP per hit
  - Projectiles: -10 HP per hit
- **Damage Cooldown:** 45 frames (0.75 seconds at 60 FPS) between hits
- **Death Condition:** Health <= 0

### Movement

- **Speed:** Normal movement speed (exact value extracted from game)
- **Directions:** Left, Right, Up, Down
- **Jump:** Available when on ground
- **Facing Direction:** -180 (left) or 0 (right)

### Combat

- **Weapon:** Projectiles (laser)
- **Projectile Types:** Forward and Side
- **Fire Rate:** Cooldown between shots
- **Damage per Projectile:** 25 HP (estimated)

## Enemy Mechanics

### Enemy Types (Per Era)

- **Brute:** High health (unknown exact value), slow, high damage
- **Melee:** 3 health, close range damage (30 HP)
- **Ranged:** Unknown health, ranged attacks

### Enemy AI

- **Detection Radius:** 150 units (detect player within this range)
- **Patrol Behavior:** Wander when player not detected
- **Attack Behavior:** Approach and attack when player detected
- **Obstacle Detection:** Stop if hitting impassable objects
- **Death Mechanic:** Play sound, destroy instance

### Enemy Health

- **Melee Enemies:** 3 HP
- **Brute Enemies:** ~10-15 HP (based on -1 damage per hit code)
- **Ranged Enemies:** Unknown (needs analysis)

### Damage Dealt

- **Melee Touch:** 30 HP
- **Ranged Projectile:** Unknown (likely similar to melee)

## Physics System

### World

- **Gravity:** Standard 2D platformer gravity (~500 units/sec²)
- **World Bounds:** Varies per level, estimated 2000+ pixels wide

### Collision Types

- **Solid Platforms:** Player and enemies collide with platforms
- **One-Way Platforms:** (if applicable - needs verification)
- **Hazards:** (if applicable - needs verification)
- **Impassable Objects:** Block enemy pathfinding

### Collision Resolution

- **Bounce:** Minimal (0.2 estimated)
- **Friction:** High (0.99 drag)

## Level Design

### Eras/Themes (6 total)

1. **Asylum** - Industrial, gray
   - Level: Asylum
2. **Egypt** - Desert, sandy
   - Levels: Egypt 1, Egypt 2
3. **Jurassic** - Jungle, prehistoric
   - Levels: Jurassic 1, Jurassic 2
4. **Medieval** - Castle, stone
   - Levels: Medieval 1, Medieval 2
5. **Wild West** - Western frontier
   - Levels: Wild West 1, Wild West 2
6. **WWII** - Military, industrial
   - Levels: WWII 1, WWII 2

### Level Features

- **Platforms:** Varying heights
- **Half-Height Obstacles:** Can be jumped over or crawled under
- **Full Impassable Blocks:** Complete barriers
- **Portals:** Transport between areas
- **Doors:** Level transitions

## Audio System

### Music (Background)

- **asylum_music** - Loops during Asylum level
- **egypt_music** - Loops during Egypt levels
- **jurassic_music** - Loops during Jurassic levels
- **medieval_music** - Loops during Medieval levels
- **wildwest_music** - Loops during Wild West levels
- **WWII_music** - Loops during WWII levels

### Sound Effects

- **player_death** - Plays when player dies
- **enemy_death** - Plays when enemy is killed
- **laser** - Plays when projectile fires (if needed)
- **portal_sound** - Plays when using portal

## UI Elements

### HUD Display

- **Health Bar/Text:** Current HP / Max HP (900)
- **Level Name:** Current level identifier
- **Score/Progress:** (if applicable)

### Menu Screens

- **Start Menu:** Title, play button, instructions
- **Level Select:** (if applicable)
- **Game Over:** Death screen with restart option
- **Level Complete:** Victory screen with next level button

## Special Mechanics (Identified)

### Portal System

- **Mechanic:** `portalCollision` variable tracks if player near portal
- **Effect:** Transport player to new location/room

### Direction Control

- **Facing Direction:** -180 (left) or 0 (right)
- **Used For:** Projectile direction, sprite orientation

## Conversion Priorities

### Priority 1 (Core Mechanics)

- [ ] Player movement and jumping
- [ ] Basic enemy AI and patrol
- [ ] Projectile system
- [ ] Collision detection
- [ ] Health/damage system
- [ ] Camera follow

### Priority 2 (Game Systems)

- [ ] Audio management
- [ ] Level loading/management
- [ ] Room transitions
- [ ] Menu system
- [ ] HUD display

### Priority 3 (Polish)

- [ ] Animations
- [ ] Particle effects
- [ ] Visual feedback on damage
- [ ] Level-specific themes
- [ ] Enemy variety per era

## Data Values Summary

| Parameter             | Value  | Notes                 |
| --------------------- | ------ | --------------------- |
| Player Max Health     | 900    | Starting health       |
| Player Speed          | TBD    | From game analysis    |
| Enemy Detection Range | 150    | Units                 |
| Melee Damage          | 10-30  | Depends on enemy type |
| Damage Cooldown       | 45     | Frames                |
| Gravity               | ~500   | Units/sec²            |
| Melee Enemy Health    | 3      | Hits to kill          |
| Brute Enemy Health    | ~10-15 | Estimated             |
| Ranged Enemy Health   | TBD    | Needs analysis        |

---

**Next Steps:**

1. Extract exact physics values from game
2. Test damage calculations
3. Analyze all room/level layouts
4. Document any missed mechanics
5. Create level data files
