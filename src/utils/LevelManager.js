// Advanced Level Configuration System

class LevelManager {
  static getLevelData(levelIndex) {
    return LEVEL_DATA[levelIndex];
  }

  static getLevelByName(name) {
    return LEVEL_DATA.find(
      (level) => level.name.toLowerCase() === name.toLowerCase(),
    );
  }

  static getTotalLevels() {
    return LEVEL_DATA.length;
  }

  static isLastLevel(levelIndex) {
    return levelIndex >= LEVEL_DATA.length - 1;
  }

  static getNextLevel(levelIndex) {
    return levelIndex < LEVEL_DATA.length - 1 ? levelIndex + 1 : null;
  }
}

// Comprehensive Level Data
const LEVEL_DATA = [
  {
    id: 0,
    name: "Asylum",
    era: "asylum",
    description: "Escape the desolate asylum",
    backgroundMusic: "asylum_music",
    backgroundColor: "#4a4a4a",
    width: 2000,
    height: 768,
    platforms: [
      // Format: { x, y, width, height, type }
      { x: 0, y: 700, width: 2000, height: 68, type: "ground" },
      { x: 200, y: 600, width: 300, height: 50, type: "platform" },
      { x: 600, y: 500, width: 300, height: 50, type: "platform" },
      { x: 1000, y: 600, width: 300, height: 50, type: "platform" },
      { x: 1400, y: 500, width: 300, height: 50, type: "platform" },
      { x: 1800, y: 700, width: 200, height: 50, type: "platform" },
    ],
    obstacles: [
      // Format: { x, y, width, height, type: 'full' | 'half' }
      { x: 800, y: 400, width: 50, height: 100, type: "full" },
      { x: 1200, y: 450, width: 50, height: 50, type: "half" },
    ],
    enemies: [
      // Format: { x, y, type: 'brute' | 'melee' | 'ranged' }
      { x: 300, y: 500, type: "melee", era: "asylum" },
      { x: 700, y: 400, type: "brute", era: "asylum" },
      { x: 1100, y: 500, type: "ranged", era: "asylum" },
      { x: 1500, y: 400, type: "melee", era: "asylum" },
    ],
    spawns: {
      player: { x: 50, y: 600 },
      goal: { x: 1900, y: 600 },
    },
    portals: [
      // { x, y, destinationLevel, destinationSpawn }
    ],
    difficulty: 1,
  },
  {
    id: 1,
    name: "Egypt 1",
    era: "egypt",
    description: "Journey through ancient Egypt",
    backgroundMusic: "egypt_music",
    backgroundColor: "#c9a876",
    width: 2000,
    height: 768,
    platforms: [
      { x: 0, y: 700, width: 2000, height: 68, type: "ground" },
      { x: 150, y: 600, width: 250, height: 50, type: "platform" },
      { x: 500, y: 450, width: 250, height: 50, type: "platform" },
      { x: 900, y: 550, width: 250, height: 50, type: "platform" },
      { x: 1300, y: 450, width: 250, height: 50, type: "platform" },
      { x: 1700, y: 600, width: 250, height: 50, type: "platform" },
    ],
    obstacles: [
      { x: 700, y: 300, width: 100, height: 200, type: "full" },
      { x: 1100, y: 350, width: 100, height: 100, type: "half" },
    ],
    enemies: [
      { x: 250, y: 500, type: "melee", era: "egypt" },
      { x: 600, y: 350, type: "ranged", era: "egypt" },
      { x: 1000, y: 450, type: "brute", era: "egypt" },
      { x: 1400, y: 350, type: "melee", era: "egypt" },
      { x: 1800, y: 500, type: "ranged", era: "egypt" },
    ],
    spawns: {
      player: { x: 50, y: 600 },
      goal: { x: 1900, y: 600 },
    },
    difficulty: 2,
  },
  {
    id: 2,
    name: "Egypt 2",
    era: "egypt",
    description: "Deeper into the pyramids",
    backgroundMusic: "egypt_music",
    backgroundColor: "#c9a876",
    width: 2200,
    height: 768,
    platforms: [],
    obstacles: [],
    enemies: [],
    spawns: {
      player: { x: 50, y: 600 },
      goal: { x: 2100, y: 600 },
    },
    difficulty: 3,
  },
  // Placeholder entries for other levels
  { id: 3, name: "Jurassic 1", era: "jurassic", difficulty: 2 },
  { id: 4, name: "Jurassic 2", era: "jurassic", difficulty: 3 },
  { id: 5, name: "Medieval 1", era: "medieval", difficulty: 2 },
  { id: 6, name: "Medieval 2", era: "medieval", difficulty: 4 },
  { id: 7, name: "Wild West 1", era: "wildwest", difficulty: 2 },
  { id: 8, name: "Wild West 2", era: "wildwest", difficulty: 4 },
  { id: 9, name: "WWII 1", era: "wwii", difficulty: 3 },
  { id: 10, name: "WWII 2", era: "wwii", difficulty: 5 },
];

// Export for use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { LevelManager, LEVEL_DATA };
}
