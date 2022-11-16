/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = 432; //NB. we are now using a variable for the floor position

  //NB. We are now using the built in variables height and width
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  treePos_x = 800;
  treePos_y = floorPos_y - 52;

  canyon = { x_pos: 170, width: 100 };

  collectable = { x_pos: 150, y_pos: 400, size: 50 };

  cloud = { x_pos: 250 };
  mountain = { x_pos: 500 };
}

function draw() {
  //fill the sky blue
  background(100, 155, 255);

  //draw some green ground
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height);

  //draw canyon
  fill(100, 155, 255);
  rect(canyon.x_pos, floorPos_y, canyon.width, 100);
  fill(10, 100, 242);
  rect(canyon.x_pos, floorPos_y + 70, canyon.width, 30);

  //draw collectible
  stroke(10);
  fill(255, 215, 0);
  ellipse(
    collectable.x_pos,
    collectable.y_pos,
    collectable.size - 15,
    collectable.size - 15
  );
  stroke(1);
  fill(255, 255, 102);
  ellipse(
    collectable.x_pos,
    collectable.y_pos,
    collectable.size - 22,
    collectable.size - 22
  );

  //2. a mountain in the distance
  noStroke();
  fill(169, 169, 169);
  triangle(
    mountain.x_pos + 20,
    270,
    mountain.x_pos - 150,
    floorPos_y,
    mountain.x_pos + 190,
    floorPos_y
  );
  fill(105, 105, 105);
  triangle(
    mountain.x_pos + 20,
    270,
    mountain.x_pos - 150,
    floorPos_y,
    mountain.x_pos - 100,
    floorPos_y
  );

  //snow on mountain
  fill(255, 255, 255);
  triangle(
    mountain.x_pos + 1,
    288,
    mountain.x_pos + 39,
    288,
    mountain.x_pos + 20,
    269
  );
  fill(226, 223, 210);
  triangle(
    mountain.x_pos + 1,
    288,
    mountain.x_pos + 7,
    288,
    mountain.x_pos + 20,
    269
  );

  //draw tree
  fill(78, 53, 36);
  rect(treePos_x, treePos_y, 10, 52);
  fill(34, 139, 34);
  stroke(10);
  triangle(
    treePos_x + 5,
    treePos_y - 27,
    treePos_x - 30,
    treePos_y + 10,
    treePos_x + 40,
    treePos_y + 10
  );
  triangle(
    treePos_x + 5,
    treePos_y - 40,
    treePos_x - 23,
    treePos_y - 10,
    treePos_x + 33,
    treePos_y - 10
  );

  //draw the clouds in the sky
  noStroke();
  fill(255, 255, 255);

  fill(255, 255, 255);
  ellipse(cloud.x_pos + 10, 60, 80, 77);
  ellipse(cloud.x_pos - 30, 65, 60, 57);
  ellipse(cloud.x_pos + 50, 65, 60, 57);
  ellipse(cloud.x_pos - 60, 69, 40, 37);
  ellipse(cloud.x_pos + 80, 69, 40, 37);

  //draw the game character
  stroke(1);

  //legs
  fill(55, 55, 55);
  rect(gameChar_x - 20, gameChar_y - 15, 10, 18, 2);
  rect(gameChar_x + 10, gameChar_y - 15, 10, 18, 2);

  //body
  fill(255, 165, 0);
  rect(gameChar_x - 12, gameChar_y - 30, 24, 24, 5);
  fill(0);
  textSize(6);
  text("WALL-E", gameChar_x - 11, gameChar_y - 15);

  //neck
  fill(255, 165, 0);
  rect(gameChar_x - 1.5, gameChar_y - 40, 3, 10, 1);

  //eyes
  fill(120, 120, 120);
  rect(gameChar_x + 1, gameChar_y - 49, 10, 10, 3);
  rect(gameChar_x - 11, gameChar_y - 49, 10, 10, 3);

  //eyeballs
  fill(0, 183, 239);
  ellipse(gameChar_x - 6, gameChar_y - 44, 5, 5);
  ellipse(gameChar_x + 6, gameChar_y - 44, 5, 5);

  //hands
  fill(120, 120, 120);
  rect(gameChar_x + 12, gameChar_y - 28, 8, 10, 3);
  rect(gameChar_x - 20, gameChar_y - 28, 8, 10, 3);
}

function mousePressed() {
  gameChar_x = mouseX;
  gameChar_y = mouseY;
}
