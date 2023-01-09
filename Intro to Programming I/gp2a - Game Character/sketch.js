/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. Around 10-20 lines of code should work for each state of your game character.

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(255);

  //STANDING, FACING FORWARD

  stroke(100);
  noFill();
  rect(20, 60, 50, 80);
  noStroke();
  fill(0);
  text("1. standing front facing", 20, 160);

  gameChar_x = 45;
  gameChar_y = 137;
  //Add your code here ...
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

  //JUMPING FACING FORWARDS
  stroke(100);
  noFill();
  rect(220, 60, 50, 80);
  noStroke();
  fill(0);
  text("2. jumping facing forwards", 220, 160);

  gameChar_x = 245;
  gameChar_y = 137;
  //Add your code here ...
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

  //WALKING TURNED LEFT
  stroke(100);
  noFill();
  rect(20, 260, 50, 80);
  noStroke();
  fill(0);
  text("3. Walking left", 20, 360);

  gameChar_x = 45;
  gameChar_y = 337;
  //Add your code here ...
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

  //WALKING TURNED RIGHT
  stroke(100);
  noFill();
  rect(220, 260, 50, 80);
  noStroke();
  fill(0);
  text("4. Walking right", 220, 360);

  gameChar_x = 245;
  gameChar_y = 337;
  //Add your code here ...
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

  //JUMPING RIGHT
  stroke(100);
  noFill();
  rect(20, 460, 50, 80);
  noStroke();
  fill(0);
  text("5. Jumping to the right", 20, 560);

  gameChar_x = 45;
  gameChar_y = 537;
  //Add your code here ...
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

  //Jumping to the left
  stroke(100);
  noFill();
  rect(220, 460, 50, 80);
  noStroke();
  fill(0);
  text("6. Jumping to the left", 220, 560);

  gameChar_x = 245;
  gameChar_y = 537;
  //Add your code here ...
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
}
