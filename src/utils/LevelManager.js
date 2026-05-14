// Advanced Level Configuration System

const LevelManager = {
  getLevelData(levelIndex) {
    return LEVEL_DATA[levelIndex];
  },

  getLevelByName(name) {
    return LEVEL_DATA.find(
      (level) => level.name.toLowerCase() === name.toLowerCase(),
    );
  },

  getTotalLevels() {
    return LEVEL_DATA.length;
  },

  isLastLevel(levelIndex) {
    return levelIndex >= LEVEL_DATA.length - 1;
  },

  getNextLevel(levelIndex) {
    return levelIndex < LEVEL_DATA.length - 1 ? levelIndex + 1 : null;
  },
};

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
      // ── Asylum Ward A — beds pressed against the north wall ────────────────
      // Three hospital beds in a row; small medical carts at the foot of each.
      // South partition closes off the ward from the open corridor below.
      { x: 110, y: 28, width: 90, height: 42, name: "hospital_bed" },
      { x: 245, y: 28, width: 90, height: 42, name: "hospital_bed" },
      { x: 380, y: 28, width: 90, height: 42, name: "hospital_bed" },
      { x: 202, y: 28, width: 26, height: 26, name: "medical_cart" },
      { x: 337, y: 28, width: 26, height: 26, name: "medical_cart" },
      { x: 90,  y: 148, width: 425, height: 12, name: "ward_partition" },

      // ── Examination Room — partial U-shaped enclosure (upper-center) ───────
      // North and west walls enclose the room; east wall is partial (gap below
      // y:144) so the player can enter from the south side.
      { x: 640, y: 24, width: 282, height: 12, name: "exam_room_north" },
      { x: 640, y: 24, width: 12,  height: 248, name: "exam_room_west" },
      { x: 910, y: 24, width: 12,  height: 120, name: "exam_room_east" },
      { x: 700, y: 84, width: 155, height: 60,  name: "examination_table" },
      { x: 834, y: 172, width: 42, height: 55,  name: "equipment_trolley" },

      // ── Isolation Block — three cells, each with a bed (upper-right-center) ─
      // Cells are 106 px wide (interior). No south walls — accessible from below.
      { x: 1080, y: 24, width: 358, height: 12,  name: "isolation_top_wall" },
      { x: 1080, y: 24, width: 12,  height: 210, name: "isolation_outer_left" },
      { x: 1198, y: 24, width: 12,  height: 210, name: "isolation_divider" },
      { x: 1316, y: 24, width: 12,  height: 210, name: "isolation_divider" },
      { x: 1426, y: 24, width: 12,  height: 210, name: "isolation_outer_right" },
      { x: 1098, y: 40, width: 82,  height: 34,  name: "isolation_bed" },
      { x: 1216, y: 40, width: 82,  height: 34,  name: "isolation_bed" },
      { x: 1334, y: 40, width: 82,  height: 34,  name: "isolation_bed" },

      // ── Scattered debris — cover in the open middle ground ─────────────────
      { x: 490,  y: 368, width: 90, height: 36, name: "overturned_gurney" },
      { x: 1000, y: 330, width: 90, height: 36, name: "abandoned_gurney" },
      { x: 1640, y: 352, width: 60, height: 60, name: "supply_cabinet" },
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
