/*
 * TODO: format
 */

import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
import validateConfig from "./ValidateConfig.js";

const config = validateConfig(
  await fetch("../config.json").then((response) => response.json()),
);

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = config.ArenaWidth;
canvas.height = config.ArenaHeight;

const background = new Image();
background.src = "../img/space.png";

const playerBulletColor = config.PlayerBulletColor;
const enemyBulletColor = config.EnemyBulletColor;
const maxPlayerAmmo = config.MaxPlayerAmmo;
const maxEnemyAmmo = config.MaxEnemyAmmo;

let isGameOver = false;
let win = false;

const playerBulletController = new BulletController(
  canvas,
  maxPlayerAmmo,
  playerBulletColor,
);
const enemyBulletController = new BulletController(
  canvas,
  maxEnemyAmmo,
  enemyBulletColor,
);

const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController,
);
const player = new Player(canvas, playerBulletController);

if (config.CostumMusic) {
  const music = document.querySelector("audio");
  music.play();
}

function game() {
  checkGameOver();
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(context);
    player.draw(context);
    playerBulletController.draw(context);
    enemyBulletController.draw(context);
  }
}

function displayGameOver() {
  if (!isGameOver) {
    return false;
  }

  let text = win ? "YOU WIN" : "YOU LOSE!!!! HAHAHHA";
  const restartPage = `
        <h1 class="gameover-text">${text}</h1>
        <h3 class="gameover-text">Press R to restart the game</h3>
        `;
  document.getElementById("content").innerHTML = restartPage;
}

function checkGameOver() {
  if (isGameOver) {
    displayGameOver();
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    win = true;
    isGameOver = true;
  }
  if (enemyController.enemyMap) {
  }
}

setInterval(game, 1000 / 60); // set fps to 60
