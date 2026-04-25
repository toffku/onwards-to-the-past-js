# Asset Extraction Guide

This document explains how to extract assets from the GameMaker project for use in the web version.

## Sprite Extraction

### Steps:

1. Open the original GameMaker project in GameMaker Studio 2
2. Navigate to Sprites in the Asset Browser
3. For each sprite you need:
   - Right-click → Export
   - Choose PNG format (supports transparency)
   - Save to `assets/sprites/`

### Required Sprites by Category:

**Player Sprites:**

- player_up.png / player_down.png / player_left.png / player_right.png
- Player_Laser.png / Player_Laser_Side.png

**Enemy Sprites (per era):**

- Brutes: Egpyt_Brute, Jurassic_Brute, Medieval_Brute, WildWest_Brute, WWII_Brute
- Melee: Egpyt_Melee, Jurassic_Melee, Medieval_melee, WildWest_Melee, WWII_melee
- Range: Egpyt_Range, Jurassic_Range, Medieval_Range, WildWest_Range, WWII_Range

**UI Sprites:**

- Shield.png
- GameOver_sprite.png

**Background Sprites:**

- background_asylum.png
- backgorund_egypt.png
- background_jurassic.png
- background_medieval.png
- background_WildWest.png
- background_WWII.png

**Tileset Sprites:**

- Block.png
- Half_Block.png
- Tiles.png
- Door.png

## Audio Extraction

### Steps:

1. Navigate to Sounds in the Asset Browser
2. For each sound:
   - Right-click → Export
   - Choose MP3 or WAV format
   - Save to `assets/audio/`

### Required Audio Files:

**Music (Background):**

- asylum_music.mp3
- egypt_music.mp3
- jurassic_music.mp3
- medieval_music.mp3
- wildwest_music.mp3
- WWII_music.mp3

**SFX (Sound Effects):**

- player_death.mp3
- enemy_death.mp3
- laser.mp3
- portal_sound.mp3

## Room/Level Data Export

GameMaker rooms are more complex. To recreate levels:

1. Open each room in GameMaker
2. Screenshot or note the layout
3. Export all instances to create a level data file (JSON format):

```json
{
  "name": "Asylum",
  "width": 2000,
  "height": 768,
  "backgroundMusic": "asylum_music",
  "instances": [
    {
      "type": "player",
      "x": 100,
      "y": 300
    },
    {
      "type": "platform",
      "x": 500,
      "y": 600,
      "width": 400,
      "height": 50
    },
    {
      "type": "enemy_melee",
      "x": 800,
      "y": 400,
      "era": "asylum"
    }
  ]
}
```

## Tilemap Conversion

If the original levels use tilemaps:

1. Export tileset images (already noted above)
2. Create tilemap data in JSON Tiled format or Phaser format
3. Save to `assets/tilemaps/`

## Folder Structure After Export:

```
assets/
├── sprites/
│   ├── player/
│   │   ├── player_up.png
│   │   ├── player_down.png
│   │   └── ...
│   ├── enemies/
│   │   ├── asylum/
│   │   │   ├── brute.png
│   │   │   ├── melee.png
│   │   │   └── range.png
│   │   └── ...
│   ├── backgrounds/
│   │   ├── background_asylum.png
│   │   └── ...
│   └── ui/
│       └── ...
├── audio/
│   ├── music/
│   │   ├── asylum_music.mp3
│   │   └── ...
│   └── sfx/
│       ├── player_death.mp3
│       └── ...
└── tilemaps/
    └── ...
```

## Notes

- Ensure all sprites have transparency preserved (PNG with alpha channel)
- Audio files should be in MP3 or WAV for web compatibility
- Keep sprite sheet animations as individual frames (Phaser will handle animation)
- For best performance, compress PNG files using tools like PNGCrush or TinyPNG
