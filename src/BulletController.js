import Bullet from "./Bullet.js";
import validateConfig from "./ValidateConfig.js";

const config = validateConfig(
  await fetch("../config.json").then((response) => response.json()),
);

export default class BulletController {
  bullets = [];
  shootDelay = 0;

  constructor(canvas, maxBulletsAtATime, bulletColor) {
    this.canvas = canvas;
    this.maxBulletsAtATime = maxBulletsAtATime;
    this.bulletColor = bulletColor;
    this.sfxOn = config.EnableSfx;

    this.shootSound = new Audio("../sfx/shoot.wav");
    this.shootSound.volume = 0.1;
  }

  draw(context) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height,
    );

    this.bullets.forEach((bullet) => bullet.draw(context));
    if (this.shootDelay > 0) {
      this.shootDelay--;
    }
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite),
    );

    if (bulletThatHitSpriteIndex >= 0) {
      this.bullets.splice(bulletThatHitSpriteIndex, 1);
      return true;
    }

    return false;
  }

  shoot(x, y, velocity, shootDelay = 0) {
    if (this.shootDelay <= 0 && this.bullets.length < this.maxBulletsAtATime) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      if (this.sfxOn) {
        this.shootSound.currentTime = 0;
        this.shootSound.play();
      }
      this.shootDelay = shootDelay;
    }
  }
}
