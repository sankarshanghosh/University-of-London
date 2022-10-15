function setup() {
  //create a large square canvas
  createCanvas(800, 800);
}

function draw() {
  //set the fill colour to red
  fill(255, 0, 0);

  //set a thick stroke weight for the black lines
  strokeWeight(12);

  //draw the red rectangle
  rect(100, 50, 600, 600);
  fill(0, 0, 255);
  rect(0, 50, 100, 300);
  fill(220, 220, 220);
  rect(0, 350, 100, 300);
}
