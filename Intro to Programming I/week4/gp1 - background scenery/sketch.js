/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.

WARNING: Do not get too carried away. If you're shape takes more than 15 lines of code to draw then you've probably over done it.


*/

function setup() {
  createCanvas(1024, 576);
}

function draw() {
  background(100, 155, 255); //fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, 432, 1024, 144); //draw some green ground

  //1. a cloud in the sky
  fill(255, 255, 255);
  ellipse(200, 100, 80, 77);
  ellipse(160, 105, 60, 57);
  ellipse(240, 105, 60, 57);
  ellipse(130, 109, 40, 37);
  ellipse(270, 109, 40, 37);

  fill(255, 255, 255);
  ellipse(410, 60, 80, 77);
  ellipse(370, 65, 60, 57);
  ellipse(450, 65, 60, 57);
  ellipse(340, 69, 40, 37);
  ellipse(480, 69, 40, 37);

  //2. a mountain in the distance
  fill(169, 169, 169);
  triangle(520, 270, 350, 432, 690, 432);
  fill(105, 105, 105);
  triangle(520, 270, 350, 432, 400, 432);
  triangle(400, 432, 580, 290, 750, 432);
  fill(169, 169, 169);
  triangle(490, 432, 580, 290, 750, 432);

  //snow on mountain
  fill(255, 255, 255);
  triangle(501, 288, 539, 288, 520, 269);
  fill(226, 223, 210);
  triangle(501, 288, 507, 288, 520, 269);

  fill(255, 255, 255);
  triangle(579, 289, 536.5, 324, 621, 324);
  fill(226, 223, 210);
  triangle(579, 289, 536.5, 324, 558.5, 324);

  //3. a tree

  fill(78, 53, 36);
  rect(800, 380, 10, 52);
  fill(34, 139, 34);
  stroke(10);
  triangle(805, 353, 770, 390, 840, 390);
  triangle(805, 340, 777, 370, 833, 370);

  //4. a canyon
  noStroke();
  fill(100, 155, 255);
  rect(100, 432, 80, 30);
  fill(152, 225, 152);
  beginShape();
  vertex(100, 432);
  vertex(0, 576);
  vertex(55, 576);
  vertex(100, 462);
  endShape();

  beginShape();
  vertex(180, 432);
  vertex(280, 576);
  vertex(225, 576);
  vertex(180, 462);
  endShape();

  fill(80, 200, 120);
  beginShape();
  vertex(100, 462);
  vertex(55, 576);
  vertex(100, 576);
  vertex(125, 462);
  endShape();

  beginShape();
  vertex(180, 462);
  vertex(225, 576);
  vertex(180, 576);
  vertex(155, 462);
  endShape();

  fill(10, 100, 242);
  beginShape();
  vertex(125, 462);
  vertex(100, 576);
  vertex(180, 576);
  vertex(155, 462);
  endShape();

  //5. a collectable token - eg. a jewel, fruit, coins
  stroke(10);
  fill(255, 215, 0);
  ellipse(440, 405, 35, 35);
  stroke(1);
  fill(255, 255, 102);
  ellipse(440, 405, 28, 28);
}
