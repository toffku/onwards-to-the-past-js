// Game Constants and Configuration
const GAME_CONSTANTS = {
  // Game Dimensions
  WIDTH: 1024,
  HEIGHT: 768,

  // Player Stats
  PLAYER_START_HEALTH: 900,
  PLAYER_SPEED: 220,
  PLAYER_DAMAGE_COOLDOWN: 750, // ms (45 frames @ 60fps)

  // Enemy Stats
  ENEMY_SPEED: 90,
  ENEMY_CHASE_SPEED: 130,
  ENEMY_DAMAGE: 10,
  ENEMY_DAMAGE_BRUTE: 30,
  ENEMY_DETECTION_RADIUS: 200,
  ENEMY_HEALTH_MELEE: 3,
  ENEMY_HEALTH_RANGED: 10,
  ENEMY_HEALTH_BRUTE: 15,

  // Projectile Stats
  PROJECTILE_SPEED: 420,
  PROJECTILE_DAMAGE: 25,
  PROJECTILE_LIFETIME: 2500, // ms

  // Eras/Themes
  ERAS: ["asylum", "egypt", "jurassic", "medieval", "wildwest", "wwii"],

  // Enemy Types
  ENEMY_TYPES: {
    BRUTE: "brute",
    MELEE: "melee",
    RANGED: "ranged",
  },

  // Level Configuration
  LEVELS: [
    { name: "Asylum", era: "asylum" },
    { name: "Egypt 1", era: "egypt" },
    { name: "Egypt 2", era: "egypt" },
    { name: "Jurassic 1", era: "jurassic" },
    { name: "Jurassic 2", era: "jurassic" },
    { name: "Medieval 1", era: "medieval" },
    { name: "Medieval 2", era: "medieval" },
    { name: "Wild West 1", era: "wildwest" },
    { name: "Wild West 2", era: "wildwest" },
    { name: "WWII 1", era: "wwii" },
    { name: "WWII 2", era: "wwii" },
  ],
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = GAME_CONSTANTS;
}
