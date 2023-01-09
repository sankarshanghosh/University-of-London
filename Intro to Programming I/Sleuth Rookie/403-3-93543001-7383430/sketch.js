/*

Officer: 7383430
CaseNum: 403-3-93543001-7383430

Case 403 - Captured - stage 4

A coordinated action is under way to arrest Shiffman. Police are currently in pursuit on Adele Street.
In order to catch him we must be able to alert all forces of his whereabouts according to the following rules:

- if Shiffman is within 98 meters from Turing's Column then alert local police by drawing a DarkBlue circle around it with a radius of 98 pixels.
- if Shiffman is in Aaron Swartz Memorial Park then the neighbourhood watch must be notified by drawing a Blue rectangle around it.
- if Shiffman is in neither position, a global alert must be issued by drawing a SpringGreen rectangle covering the area between Ada Avenue, Berners-Lee Street, Adele Street and Mullenweg Street.

Shiffman's position is signified by the mouse.

Note: all road coordinates are measured from their center.

Use X11 colours. You can find a reference table at https://www.w3.org/TR/css3-iccprof#numerical.

There are many possible ways of investigating this case, but you should use ONLY the following commands, operators and variables:

  if(){}
  >
  <
  &&
  else
  fill()  - Use r,g,b values between 0 and 255.
  dist()
  ellipse()
  rect()
  mouseX
  mouseY

*/

var img;

function preload() {
  img = loadImage('map.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  // draw the image
  image(img, 0, 0);

  // - if Shiffman is within 98 meters from Turing's Column then alert local police by drawing a DarkBlue circle around it with a radius of 98 pixels.
  // - if Shiffman is in Aaron Swartz Memorial Park then the neighbourhood watch must be notified by drawing a Blue rectangle around it.
  // - if Shiffman is in neither position, a global alert must be issued by drawing a SpringGreen rectangle covering the area between Ada Avenue`, Berners-Lee Street, Adele Street and Mullenweg Street.

  //Write your code below here ...
  if (dist(mouseX, mouseY, 1590, 733) < 99) {
    fill(0, 0, 139);
    ellipse(1590, 733, 196, 196);
  }
  else if ((mouseX > 1394) && (mouseX < 1633) && (mouseY > 512) && (mouseY < 633)) {
    fill(0, 0, 255);
    rect(1392, 512, 240, 122);
  }
  else {
    fill(0, 255, 127);
    rect(376, 136, 994, 165);
  }


  // finally, draw Shiffman's position
  strokeWeight(2);
  stroke(255);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 10, 10);


  // a helpful mouse coordinate pointer
  fill(255);
  noStroke();
  text(`${mouseX},${mouseY}`, mouseX, mouseY);
}
