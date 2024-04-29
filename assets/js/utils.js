import { Particle } from "./particle.js";
import { mainContext, canvasWidth, particles, circles } from "./app.js";
export let displayText = "";

// function to trigger explosion animation for a circle
export function explode(circle) {
  // check if the circle has exploded
  if (!circle.exploded) {
    // create particles for explosion effect
    for (let i = 0; i <= 1300; i++) {
      let dx = (Math.random() - 0.5) * (Math.random() * 10);
      let dy = (Math.random() - 0.5) * (Math.random() * 10);
      let radius = Math.random() * 3;
      let particle = new Particle(
        circle.initialX,
        circle.initialY,
        radius,
        dx,
        dy
      );
      particles.push(particle);
    }
    // set circle as exploded and hide its image
    circle.exploded = true;
    circle.showImage = false;
    displayText = "ohhh nooo!!";
    setTimeout(() => {
      displayText = "click click click!!!!!!";
    }, 1000);
  }
}

// function to draw text on canvas
export function drawText() {
  // draw text only if displayText is not empty
  if (displayText !== "") {
    mainContext.save();
    mainContext.font = "48px Arial";
    mainContext.fillStyle = "white";
    mainContext.textAlign = "right";
    mainContext.translate(canvasWidth - 100, 150);
    mainContext.rotate(0.1 * Math.PI);
    mainContext.fillText(displayText, 0, 0);
    mainContext.restore();
  }
}

// function to handle canvas click event
export function handleCanvasClick() {
  // check if the displayed text is the trigger message
  if (displayText === "click click click!!!!!!") {
    // move particles back to their initial positions
    particles.forEach((particle) => {
      particle.moveToInitial();
    });

    // check if all particles have returned to their initial positions
    if (
      particles.every(
        (particle) =>
          Math.sqrt(
            (particle.x - particle.initialX) ** 2 +
              (particle.y - particle.initialY) ** 2
          ) < 5
      )
    ) {
      // show circle images again
      circles.forEach((circle) => {
        circle.showImage = true;
      });
      displayText = "";
    }
    setTimeout(() => {
      displayText = "";
    }, 5000);
  }
}
