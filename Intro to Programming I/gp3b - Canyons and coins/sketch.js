/*

The Game Project

Week 3

Game interaction

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;

var canyon;
var collectable;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  canyon = { x_pos: 170, width: 100 };
  collectable = { x_pos: 150, y_pos: 400, size: 50, isFound: false };
}

function draw() {
  ///////////DRAWING CODE//////////

  background(100, 155, 255); //fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

  //draw the canyon
  fill(100, 155, 255);
  rect(canyon.x_pos, floorPos_y, canyon.width, 145);
  fill(10, 100, 242);
  rect(canyon.x_pos, floorPos_y + 115, canyon.width, 30);

  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    stroke(1);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 40, 24, 24, 5);

    //legs
    fill(55, 55, 55);
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x - 12,
      gameChar_y + 2,
      gameChar_x + 12,
      gameChar_y + 2
    );
    fill(120, 120, 120);
    ellipse(gameChar_x - 4, gameChar_y - 1, 4, 4);
    ellipse(gameChar_x - 1, gameChar_y - 7, 3, 3);
    ellipse(gameChar_x + 3, gameChar_y - 2, 6, 6);

    //neck
    fill(255, 165, 0);
    rect(gameChar_x - 1.5, gameChar_y - 50, 3, 10, 1);

    //eyeballs
    fill(0, 183, 239);
    ellipse(gameChar_x - 5, gameChar_y - 54, 14, 8);

    //eyes
    fill(120, 120, 120);
    rect(gameChar_x - 10, gameChar_y - 59, 15, 10, 3);
    fill(55, 55, 55);
    rect(gameChar_x - 2, gameChar_y - 56, 5, 5, 2);

    //hands
    fill(120, 120, 120);
    rect(gameChar_x - 18, gameChar_y - 35, 25, 6, 2);
    fill(55, 55, 55);
    rect(gameChar_x + 2, gameChar_y - 35, 5, 6, 2);
  } else if (isRight && isFalling) {
    // add your jumping-right code
    stroke(1);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 40, 24, 24, 5);

    //legs
    fill(55, 55, 55);
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x - 12,
      gameChar_y + 2,
      gameChar_x + 12,
      gameChar_y + 2
    );
    fill(120, 120, 120);
    ellipse(gameChar_x + 4, gameChar_y - 1, 4, 4);
    ellipse(gameChar_x + 1, gameChar_y - 7, 3, 3);
    ellipse(gameChar_x - 3, gameChar_y - 2, 6, 6);

    //neck
    fill(255, 165, 0);
    rect(gameChar_x - 1.5, gameChar_y - 50, 3, 10, 1);

    //eyeballs
    fill(0, 183, 239);
    ellipse(gameChar_x + 5, gameChar_y - 54, 14, 8);

    //eyes
    fill(120, 120, 120);
    rect(gameChar_x - 5, gameChar_y - 59, 15, 10, 3);
    fill(55, 55, 55);
    rect(gameChar_x - 3, gameChar_y - 56, 5, 5, 2);

    //hands
    fill(120, 120, 120);
    rect(gameChar_x - 7, gameChar_y - 35, 25, 6, 2);
    fill(55, 55, 55);
    rect(gameChar_x - 7, gameChar_y - 35, 5, 6, 2);
  } else if (isLeft) {
    // add your walking left code
    stroke(1);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 30, 24, 24, 5);

    //legs
    fill(55, 55, 55);
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x - 12,
      gameChar_y + 2,
      gameChar_x + 12,
      gameChar_y + 2
    );
    fill(120, 120, 120);
    ellipse(gameChar_x - 4, gameChar_y - 1, 4, 4);
    ellipse(gameChar_x - 1, gameChar_y - 7, 3, 3);
    ellipse(gameChar_x + 3, gameChar_y - 2, 6, 6);

    //neck
    fill(255, 165, 0);
    rect(gameChar_x - 1.5, gameChar_y - 40, 3, 10, 1);

    //eyeballs
    fill(0, 183, 239);
    ellipse(gameChar_x - 5, gameChar_y - 44, 14, 8);

    //eyes
    fill(120, 120, 120);
    rect(gameChar_x - 10, gameChar_y - 49, 15, 10, 3);
    fill(55, 55, 55);
    rect(gameChar_x - 2, gameChar_y - 46, 5, 5, 2);

    //hands
    fill(120, 120, 120);
    rect(gameChar_x - 18, gameChar_y - 25, 25, 6, 2);
    fill(55, 55, 55);
    rect(gameChar_x + 2, gameChar_y - 25, 5, 6, 2);
  } else if (isRight) {
    // add your walking right code
    stroke(1);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 30, 24, 24, 5);

    //legs
    fill(55, 55, 55);
    triangle(
      gameChar_x,
      gameChar_y - 12,
      gameChar_x - 12,
      gameChar_y + 2,
      gameChar_x + 12,
      gameChar_y + 2
    );
    fill(120, 120, 120);
    ellipse(gameChar_x + 4, gameChar_y - 1, 4, 4);
    ellipse(gameChar_x + 1, gameChar_y - 7, 3, 3);
    ellipse(gameChar_x - 3, gameChar_y - 2, 6, 6);

    //neck
    fill(255, 165, 0);
    rect(gameChar_x - 1.5, gameChar_y - 40, 3, 10, 1);

    //eyeballs
    fill(0, 183, 239);
    ellipse(gameChar_x + 5, gameChar_y - 44, 14, 8);

    //eyes
    fill(120, 120, 120);
    rect(gameChar_x - 5, gameChar_y - 49, 15, 10, 3);
    fill(55, 55, 55);
    rect(gameChar_x - 3, gameChar_y - 46, 5, 5, 2);

    //hands
    fill(120, 120, 120);
    rect(gameChar_x - 7, gameChar_y - 25, 25, 6, 2);
    fill(55, 55, 55);
    rect(gameChar_x - 7, gameChar_y - 25, 5, 6, 2);
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    stroke(1);

    //legs
    fill(55, 55, 55);
    rect(gameChar_x - 20, gameChar_y - 15, 10, 18, 2);
    rect(gameChar_x + 10, gameChar_y - 15, 10, 18, 2);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 40, 24, 24, 5);

    //neck
    fill(255, 165, 0);
    rect(gameChar_x - 1.5, gameChar_y - 50, 3, 10, 1);

    //eyes
    fill(120, 120, 120);
    rect(gameChar_x + 1, gameChar_y - 59, 10, 10, 3);
    rect(gameChar_x - 11, gameChar_y - 59, 10, 10, 3);

    //eyeballs
    fill(0, 183, 239);
    ellipse(gameChar_x - 6, gameChar_y - 54, 5, 5);
    ellipse(gameChar_x + 6, gameChar_y - 54, 5, 5);

    //hands
    fill(120, 120, 120);
    rect(gameChar_x + 12, gameChar_y - 48, 8, 10, 3);
    rect(gameChar_x - 20, gameChar_y - 48, 8, 10, 3);
  } else {
    // add your standing front facing code
    stroke(1);

    //legs
    fill(55, 55, 55);
    rect(gameChar_x - 20, gameChar_y - 15, 10, 18, 2);
    rect(gameChar_x + 10, gameChar_y - 15, 10, 18, 2);

    //body
    fill(255, 165, 0);
    rect(gameChar_x - 12, gameChar_y - 30, 24, 24, 5);

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

  //detect if game character is above canyon and above the ground level
  if (
    gameChar_x < canyon.x_pos + canyon.width &&
    gameChar_x > canyon.x_pos &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
  }
  if (isPlummeting == true) {
    gameChar_y += 5;
  }

  //draw collectible
  if (collectable.isFound == false) {
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
  }
  if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 50) {
    collectable.isFound = true;
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here
  if (isLeft) {
    gameChar_x -= 4;
  } else if (isRight) {
    gameChar_x += 4;
  }
  //conditional statement to check if the game character is jumping above the ground
  if (gameChar_y < floorPos_y) {
    isFalling = true;
    gameChar_y += 3;
  } else {
    isFalling = false;
  }
}

function keyPressed() {
  if (keyCode == 65 && isPlummeting == false) {
    isLeft = true;
  } else if (keyCode == 68 && isPlummeting == false) {
    isRight = true;
  } else if (keyCode == 87 && isFalling == false && isPlummeting == false) {
    gameChar_y -= 100;
  }
}

function keyReleased() {
  if (keyCode == 65) {
    isLeft = false;
  } else if (keyCode == 68) {
    isRight = false;
  }
}
