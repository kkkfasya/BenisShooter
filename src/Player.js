export default class Player {
  rightPressed = false;
  leftPressed = false;
  shootPressed = false;

  constructor(canvas, bulletController) {
    this.canvas = canvas;
    this.velocity = 3;
    this.bulletController = bulletController;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "../img/player.png";

    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.rightPressed = true;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.leftPressed = true;
      }
      if (e.code === "Space") {
        this.shootPressed = true;
      }
      if (e.code === "KeyR") {
        window.location.reload(true);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        this.rightPressed = false;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        this.leftPressed = false;
      }
      if (e.code === "Space") {
        this.shootPressed = false;
      }
    });
  }

  draw(context) {
    if (this.shootPressed) {
      this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWithWalls();
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWithWalls() {
    //left
    if (this.x < 0) {
      this.x = 0;
    }

    //right
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.rightPressed) {
      this.x += this.velocity;
    } else if (this.leftPressed) {
      this.x += -this.velocity;
    }
  }
}
