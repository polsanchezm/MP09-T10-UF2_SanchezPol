import { Circle } from "./circle.js";
import { drawText, handleCanvasClick } from "./utils.js";

// getting the canvas element and its context
let mainCanvas = document.getElementById("canvas");
let mainContext = mainCanvas.getContext("2d");

// setting up canvas width, height, and arrays for circles and particles
let canvasWidth = mainCanvas.width;
let canvasHeight = mainCanvas.height;
let circles = [];
let particles = [];

// creating an image element and setting its source
let image = new Image();
image.src = "./assets/img/world_map.png";

// function to continuously draw the animation
function draw() {
  // clearing the canvas
  mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
  // updating, drawing and filtering circles based on transparency
  circles.forEach((circle) => circle.update());
  particles = particles.filter((particle) => particle.alpha > 0);
  // updating and drawing particles
  particles.forEach((particle) => particle.update());
  drawText();
  // requesting animation frame for the next frame
  requestAnimationFrame(draw);
}

// function to resize the canvas when the window size changes
function resizeCanvas() {
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;
  canvasWidth = mainCanvas.width;
  canvasHeight = mainCanvas.height;

  // adjusting circle positions if circles array is not empty
  if (circles.length > 0) {
    circles.forEach((circle) => {
      circle.initialX = canvasWidth / 2;
      circle.initialY = canvasHeight / 2;
    });
  }
}

image.onload = function () {
  let radius = 200;
  let initialX = canvasWidth / 2;
  let initialY = canvasHeight / 2;

  let earth = new Circle(0, radius, initialX, initialY);
  circles.push(earth);
};

document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("resetButton");
  // function to reset the animation by clicking the button
  resetButton.addEventListener("click", function () {
    circles = [];
    particles = [];
    let earth = new Circle(0, 200, canvasWidth / 2, canvasHeight / 2);
    circles.push(earth);
  });

  window.addEventListener("load", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  mainCanvas.addEventListener("click", handleCanvasClick);
  requestAnimationFrame(draw);
});

export {
  mainCanvas,
  mainContext,
  image,
  canvasHeight,
  canvasWidth,
  circles,
  particles,
};
