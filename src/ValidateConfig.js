function isColor(c) {
  let s = new Option().style;
  s.color = c;
  return s.color.length > 0;
}

function isValidLink(link) {
  return false;
}

export default function validateConfig(config) {
  if (!isColor(config.PlayerBulletColor))
    throw new Error("invalid color in config.PlayerBulletColor");
  if (!isColor(config.EnemyBulletColor))
    throw new Error("invalid color in config.EnemyBulletColor");

  // Just validating type
  /* if (typeof config.BenisMode != "boolean")
    throw new TypeError("in config.BenisMode"); */
  if (typeof config.EnableSfx != "boolean")
    throw new TypeError("in config.EnableSfx");
  if (typeof config.CostumMusic != "boolean")
    throw new TypeError("in config.CostumMusic");
  if (typeof config.PlayerBulletColor != "string")
    throw new TypeError("in config.PlayerBulletColor");
  if (typeof config.MusicLink != "string")
    throw new TypeError("in config.MusicLink");
  if (typeof config.EnemyMovSpeed != "number")
    throw new TypeError("in config.EnemyMovSpeed");
  if (typeof config.PlayerMovSpeed != "number")
    throw new TypeError("in config.PlayerMovSpeed");
  if (typeof config.ArenaHeight != "number")
    throw new TypeError("in config.ArenaHeight");
  if (typeof config.ArenaWidth != "number")
    throw new TypeError("in config.ArenaWidth");
  return config;
}
