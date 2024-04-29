import { mainContext } from "./app.js";

export class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x; // x-coordinate
    this.y = y; // y-coordinate
    this.radius = radius; // radius of the particle
    this.dx = dx; // velocity in the x-direction
    this.dy = dy; // velocity in the y-direction
    this.alpha = 1; // transparency
    this.color = this.getRandomColor(); // color of the particle
    this.initialX = x; // initial x-coordinate
    this.initialY = y; // initial y-coordinate
  }

  // function to generate a random color for the particle
  getRandomColor() {
    const colors = ["red", "yellow", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // function to draw the particle on the canvas
  draw() {
    mainContext.save();
    mainContext.globalAlpha = this.alpha;
    mainContext.fillStyle = this.color;
    mainContext.beginPath();
    mainContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    mainContext.fill();
    mainContext.restore();
  }

  // function to update the position and appearance of the particle
  update() {
    this.draw();
    this.alpha -= 0.003;
    this.x += this.dx;
    this.y += this.dy;
  }

  // function to move the particle back to its initial position
  moveToInitial() {
    let vectorX = this.initialX - this.x;
    let vectorY = this.initialY - this.y;
    let length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
    this.dx = (vectorX / length) * 0.5;
    this.dy = (vectorY / length) * 0.5;
  }
}
