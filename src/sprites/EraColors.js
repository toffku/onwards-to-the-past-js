// Visual colour palettes for each era's enemy archetypes.
// Keyed by era name (matches GAME_CONSTANTS.ERAS), then by enemy type.

const ERA_COLORS = {
  asylum: {
    brute:  { body: 0x8b0000, detail: 0xaa2222, head: 0xddbbbb, accent: 0xcc0000 },
    melee:  { body: 0xdddddd, detail: 0xffffff, head: 0xffcccc, accent: 0x999999 },
    ranged: { body: 0x445566, detail: 0x5a7080, head: 0xddccbb, accent: 0x778899 },
  },
  egypt: {
    brute:  { body: 0x7a5c3a, detail: 0x9a7a50, head: 0xe8c97a, accent: 0xd4a843 },
    melee:  { body: 0xc4a060, detail: 0xe0bc80, head: 0xf5deb3, accent: 0xb8960b },
    ranged: { body: 0x2a4a3a, detail: 0x3a6a50, head: 0xd2b48c, accent: 0x8b6914 },
  },
  jurassic: {
    brute:  { body: 0x3a6a1a, detail: 0x5a9a30, head: 0x7bc233, accent: 0x8b4513 },
    melee:  { body: 0x7b3a13, detail: 0x9a5225, head: 0xcd853f, accent: 0x4a1a05 },
    ranged: { body: 0x4a6b2f, detail: 0x6a8c40, head: 0x9fcc55, accent: 0x8b6914 },
  },
  medieval: {
    brute:  { body: 0x505a60, detail: 0x7a9098, head: 0xc0a870, accent: 0x8b0000 },
    melee:  { body: 0xa01a1a, detail: 0xcc2222, head: 0xddccaa, accent: 0xffd700 },
    ranged: { body: 0x2a5a8a, detail: 0x4a7ab0, head: 0xddccaa, accent: 0xc0c0c0 },
  },
  wildwest: {
    brute:  { body: 0x6b3510, detail: 0x8b5530, head: 0xdeb887, accent: 0xb8860b },
    melee:  { body: 0xa07030, detail: 0xc09050, head: 0xdeb887, accent: 0x8b4513 },
    ranged: { body: 0x404040, detail: 0x606060, head: 0xdeb887, accent: 0xb8860b },
  },
  wwii: {
    brute:  { body: 0x3b4320, detail: 0x535d30, head: 0xc4a882, accent: 0x8b0000 },
    melee:  { body: 0x4a5a2f, detail: 0x607040, head: 0xc4a882, accent: 0x303030 },
    ranged: { body: 0x263040, detail: 0x364050, head: 0xc4a882, accent: 0x607080 },
  },
};
