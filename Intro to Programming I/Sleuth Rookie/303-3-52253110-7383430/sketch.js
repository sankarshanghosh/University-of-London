/*

Officer: 7383430
CaseNum: 303-3-52253110-7383430

Case 303 - The Case of the Crooked Attorney
Stage 4 - The Courthouse

Torvalds has his final safe in his courthouse chambers. Luckily there is a court case proceeding.
You can sneak into his chambers whilst he makes his closing statement.

Crack the safe by doing the following:

	When the mouse button is released:
	- Use the 'random' function to produce random values ranging from 2 to 14.
	- Assign the output to Secure_Box_Value_0

	Whilst the mouse is being dragged:
	- Use the 'random' function to produce random values ranging from 1 to 12.
	- Assign the output to Secure_Box_Value_1

	When any key is released:
	- Make Secure_Box_Value_2 equal to the value of 'keyCode'

	When the mouse button is pressed:
	- Use the 'map' function to scale mouseX to values ranging from 21 to 69.
	- Assign the output to Secure_Box_Value_3

	When the mouse button is pressed:
	- Use the 'map' function to scale mouseY to values ranging from 17 to 78.
	- Assign the output to Secure_Box_Value_4

	Whilst the mouse is being dragged:
	- Use the 'map' function to scale mouseY to values ranging from 17 to 76.
	- Assign the output to Secure_Box_Value_5



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- key, keyCode
	- random
	- map

*/

//declare the variables

var Secure_Box_Value_0;
var Secure_Box_Value_1;
var Secure_Box_Value_2;
var Secure_Box_Value_3;
var Secure_Box_Value_4;
var Secure_Box_Value_5;

function preload() {
  //IMAGES WILL BE LOADED HERE
}

function setup() {
  createCanvas(512, 512);

  //initialise the variables
  Secure_Box_Value_0 = 0;
  Secure_Box_Value_1 = "";
  Secure_Box_Value_2 = "";
  Secure_Box_Value_3 = 0;
  Secure_Box_Value_4 = 0;
  Secure_Box_Value_5 = 0;
}

///////////////////EVENT HANDLERS///////////////////
/*When the mouse button is released:
	- Use the 'random' function to produce random values ranging from 2 to 14.
	- Assign the output to Secure_Box_Value_0

	Whilst the mouse is being dragged:
	- Use the 'random' function to produce random values ranging from 1 to 12.
	- Assign the output to Secure_Box_Value_1

	When any key is released:
	- Make Secure_Box_Value_2 equal to the value of 'keyCode'

	When the mouse button is pressed:
	- Use the 'map' function to scale mouseX to values ranging from 21 to 69.
	- Assign the output to Secure_Box_Value_3

	When the mouse button is pressed:
	- Use the 'map' function to scale mouseY to values ranging from 17 to 78.
	- Assign the output to Secure_Box_Value_4

	Whilst the mouse is being dragged:
	- Use the 'map' function to scale mouseY to values ranging from 17 to 76.
	- Assign the output to Secure_Box_Value_5

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- key, keyCode
	- random
	- map*/
//Create event handlers here to open the safe ...

function mouseReleased() {
  Secure_Box_Value_0 = random(2, 14);
}

function mouseDragged() {
  Secure_Box_Value_1 = random(1, 12);
  Secure_Box_Value_5 = map(mouseY, 0, 512, 17, 76);
}

function keyReleased() {
  Secure_Box_Value_2 = keyCode;
}

function mousePressed() {
  Secure_Box_Value_3 = map(mouseX, 0, 512, 21, 69);
  Secure_Box_Value_4 = map(mouseY, 0, 512, 17, 78);
}

///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw() {
  //Draw the safe door
  background(70);
  noStroke();
  fill(29, 110, 6);
  rect(26, 26, width - 52, width - 52);

  //Draw the combination dial
  push();
  translate(256, 180);
  drawDial(170, Secure_Box_Value_0, 20);
  pop();

  //Draw the spinners
  push();
  translate(206, 280);
  drawSpinner(3, Secure_Box_Value_1);
  pop();

  push();
  translate(306, 280);
  drawSpinner(3, Secure_Box_Value_2);
  pop();

  //Draw the levers
  push();
  translate(125, 356);
  drawLever(Secure_Box_Value_3);
  pop();

  push();
  translate(250, 356);
  drawLever(Secure_Box_Value_4);
  pop();

  push();
  translate(375, 356);
  drawLever(Secure_Box_Value_5);
  pop();
}

function drawDial(diameter, num, maxNum) {
  //the combination lock

  var r = diameter * 0.5;
  var p = r * 0.6;

  stroke(0);
  fill(255, 255, 200);
  ellipse(0, 0, diameter, diameter);
  fill(100);
  noStroke();
  ellipse(0, 0, diameter * 0.66, diameter * 0.66);
  fill(150, 0, 0);
  triangle(-p * 0.4, -r - p, p * 0.4, -r - p, 0, -r - p / 5);

  noStroke();

  push();
  var inc = 360 / maxNum;

  rotate(radians(-num * inc));
  for (var i = 0; i < maxNum; i++) {
    push();
    rotate(radians(i * inc));
    stroke(0);
    line(0, -r * 0.66, 0, -(r - 10));
    noStroke();
    fill(0);
    text(i, 0, -(r - 10));
    pop();
  }

  pop();
}

function drawLever(rot) {
  push();
  rotate(radians(-rot));
  stroke(0);
  fill(100);
  rect(-10, 0, 20, 100);
  ellipse(0, 0, 50, 50);
  ellipse(0, 100, 35, 35);
  pop();
}

function drawSpinner(numSpinners, val) {
  var sw = 20;
  var ow = (sw + 5) * numSpinners + 5;
  stroke(0);
  fill(100);
  rect(-ow / 2, 0, ow, 35);
  if (typeof val == "number") {
    val = floor(val).toString(); //convert to string
  }
  var d = numSpinners - val.length;

  for (var d = numSpinners - val.length; d > 0; d--) {
    val = "-" + val;
  }

  for (var i = 0; i < numSpinners; i++) {
    stroke(0);
    fill(255, 255, 200);
    rect(-ow / 2 + i * (sw + 5) + 5, 5, 20, 25);
    fill(0);
    noStroke();
    text(val[i], -ow / 2 + sw / 2 + i * (sw + 5), 25);
  }
}
