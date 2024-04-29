import { explode } from "./utils.js";
import { image } from "./app.js";

// get the canvas and its 2D rendering context
let mainCanvas = document.getElementById("canvas");
let mainContext = mainCanvas.getContext("2d");

export class Circle {
  // initialize circle properties
  constructor(angle, radius, initialX, initialY) {
    this.angle = angle;
    this.radius = radius;
    this.initialX = initialX;
    this.initialY = initialY;
    this.rotationRadius = 0;
    this.incrementer = 0.01;
    this.maxSpeed = 0.6;
    this.exploded = false;
    this.showImage = true;
  }

  // update circle status
  update() {
    // delay the animation to start after 2 seconds
    setTimeout(() => {
      // check if the circle has not exploded yet
      if (!this.exploded) {
        // upgrade the angle and incrementer
        this.angle += this.incrementer;
        this.incrementer += 0.001;
        // check if the incrementer exceeds the maximum speed
        if (this.incrementer > this.maxSpeed) {
          // trigger explosion if maximum speed is reached
          explode(this);
        }
      }
    }, 2000);

    // draw the circle image if showImage is true
    if (this.showImage) {
      // calculate current position based on angle and rotation radius
      let currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
      let currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);

      // save, translate, rotate and draw the current transformation matrix
      mainContext.save();
      mainContext.translate(currentX, currentY);
      mainContext.rotate(this.angle);
      mainContext.drawImage(
        image,
        -this.radius,
        -this.radius,
        this.radius * 2,
        this.radius * 2
      );
      // restore the transformation matrix to its previous state
      mainContext.restore();
    }
  }
}
