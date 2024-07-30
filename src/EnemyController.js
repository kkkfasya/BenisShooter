import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";
import ValidateConfig from "./ValidateConfig.js";

const config = ValidateConfig(
  await fetch("../config.json").then((response) => response.json()),
);

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enemyMapGenerator(row, col) {
  let temp_arr = [];
  let enemy_arr = [];
  for (let i = 0; i <= row; i++) {
    for (let j = 0; j < col; j++) {
      temp_arr.push(getRandInt(1, 3));
    }
    enemy_arr.push(temp_arr);
    temp_arr = [];
  }

  return enemy_arr;
}

export default class EnemyController {
  enemyMap = enemyMapGenerator(config.EnemyRow, config.EnemyCol);
  enemyRows = [];

  currentDirection = MovingDirection.right;
  xVelocityDefault = 1;
  yVelocityDefault = 1;
  moveDownTimerDefault = 25;

  xVelocity = 0;
  yVelocity = 0;
  moveDownTimer = this.moveDownTimerDefault;
  fireBulletTimerDefault = 100;
  fireBulletTimer = this.fireBulletTimerDefault;

  constructor(canvas, enemyBulletController, playerBulletController) {
    this.canvas = canvas;
    this.enemyBulletController = enemyBulletController;
    this.playerBulletController = playerBulletController;

    this.enemyDeathSound = new Audio("../sfx/enemy-death.wav");
    this.enemyDeathSound.volume = 0.1;

    this.createEnemies();
  }

  draw(context) {
    this.decrementMoveDownTimer();
    this.updateVelocityAndDirection();
    this.collisionDetection();
    this.drawEnemies(context);
    this.resetMoveDownTimer();
    this.fireBullet();
  }

  collisionDetection() {
    this.enemyRows.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          this.enemyDeathSound.currentTime = 0;
          this.enemyDeathSound.play();
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });

    this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
  }

  fireBullet() {
    this.fireBulletTimer--;
    if (this.fireBulletTimer <= 0) {
      this.fireBulletTimer = this.fireBulletTimerDefault;
      const allEnemies = this.enemyRows.flat();
      const enemyIndex = Math.floor(Math.random() * allEnemies.length);
      const enemy = allEnemies[enemyIndex];
      this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.currentDirection === MovingDirection.downLeft ||
      this.currentDirection === MovingDirection.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateVelocityAndDirection() {
    for (const enemyRow of this.enemyRows) {
      if (this.currentDirection == MovingDirection.right) {
        this.xVelocity = this.xVelocityDefault;
        this.yVelocity = 0;
        const rightMostEnemy = enemyRow[enemyRow.length - 1];
        if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
          this.currentDirection = MovingDirection.downLeft;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downLeft) {
        if (this.moveDown(MovingDirection.left)) {
          break;
        }
      } else if (this.currentDirection === MovingDirection.left) {
        this.xVelocity = -this.xVelocityDefault;
        this.yVelocity = 0;
        const leftMostEnemy = enemyRow[0];
        if (leftMostEnemy.x <= 0) {
          this.currentDirection = MovingDirection.downRight;
          break;
        }
      } else if (this.currentDirection === MovingDirection.downRight) {
        if (this.moveDown(MovingDirection.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xVelocity = 0;
    this.yVelocity = this.yVelocityDefault;
    if (this.moveDownTimer <= 0) {
      this.currentDirection = newDirection;
      return true;
    }
    return false;
  }

  drawEnemies(context) {
    this.enemyRows.flat().forEach((enemy) => {
      enemy.move(this.xVelocity, this.yVelocity);
      enemy.draw(context);
    });
  }

  createEnemies() {
    this.enemyMap.forEach((row, rowIndex) => {
      this.enemyRows[rowIndex] = [];
      row.forEach((enemyNubmer, enemyIndex) => {
        if (enemyNubmer > 0) {
          this.enemyRows[rowIndex].push(
            new Enemy(enemyIndex * 50, rowIndex * 35, enemyNubmer),
          );
        }
      });
    });
  }

  collideWith(sprite) {
    return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
