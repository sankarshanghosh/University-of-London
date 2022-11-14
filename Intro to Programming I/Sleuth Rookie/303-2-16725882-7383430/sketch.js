/*

Officer: 7383430
CaseNum: 303-2-16725882-7383430

Case 303 - The Case of the Crooked Attorney
Stage 3 - The Gates Bank

I’ve made an appointment for you at the Gates Bank to retrieve your safe deposit box from the vault.
Actually you will break into Torvalds’ one.

Crack the safe by doing the following:

	Whilst the mouse is moving:
	- Make CrypticStorageCombination0 equal to the value of mouseX
	- Use the 'min' function to prevent CrypticStorageCombination0 from going above 19

	Whilst the mouse is moving:
	- Decrement CrypticStorageCombination1 by 1
	- Use the 'max' function to prevent CrypticStorageCombination1 from falling below 1

	When the mouse button is pressed:
	- Make CrypticStorageCombination2 equal to the value of mouseX
	- Use the 'constrain' function to prevent CrypticStorageCombination2 from falling below 2 and going above 10

	When any key is pressed:
	- Decrement CrypticStorageCombination3 by 1
	- Use the 'max' function to prevent CrypticStorageCombination3 from falling below 3

	Whilst the mouse is being dragged:
	- Make CrypticStorageCombination4 equal to the value of mouseX
	- Use the 'constrain' function to prevent CrypticStorageCombination4 from falling below 10 and going above 75



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- Incrementing +=
	- Decrementing -=
	- min, max
	- constrain

*/

//declare the variables

var CrypticStorageCombination0;
var CrypticStorageCombination1;
var CrypticStorageCombination2;
var CrypticStorageCombination3;
var CrypticStorageCombination4;

function preload() {
  //IMAGES WILL BE LOADED HERE
}

function setup() {
  createCanvas(512, 512);

  //initialise the variables
  CrypticStorageCombination0 = 0;
  CrypticStorageCombination1 = 0;
  CrypticStorageCombination2 = 0;
  CrypticStorageCombination3 = 0;
  CrypticStorageCombination4 = 0;
}

///////////////////EVENT HANDLERS///////////////////
/*Whilst the mouse is moving:
	- Make CrypticStorageCombination0 equal to the value of mouseX
	- Use the 'min' function to prevent CrypticStorageCombination0 from going above 19

	Whilst the mouse is moving:
	- Decrement CrypticStorageCombination1 by 1
	- Use the 'max' function to prevent CrypticStorageCombination1 from falling below 1

	When the mouse button is pressed:
	- Make CrypticStorageCombination2 equal to the value of mouseX
	- Use the 'constrain' function to prevent CrypticStorageCombination2 from falling below 2 and going above 10

	When any key is pressed:
	- Decrement CrypticStorageCombination3 by 1
	- Use the 'max' function to prevent CrypticStorageCombination3 from falling below 3

	Whilst the mouse is being dragged:
	- Make CrypticStorageCombination4 equal to the value of mouseX
	- Use the 'constrain' function to prevent CrypticStorageCombination4 from falling below 10 and going above 75

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- Incrementing +=
	- Decrementing -=
	- min, max
	- constrain
*/
//Create event handlers here to open the safe ...
function mouseMoved() {
  CrypticStorageCombination0 = min(mouseX, 19);
  CrypticStorageCombination1 = max(CrypticStorageCombination1 - 1, 1);
}

function mousePressed() {
  CrypticStorageCombination2 = constrain(mouseX, 2, 10);
}

function keyPressed() {
  CrypticStorageCombination3 = max(CrypticStorageCombination3 - 1, 3);
}

function mouseDragged() {
  CrypticStorageCombination4 = constrain(mouseX, 10, 75);
}

///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw() {
  //Draw the safe door
  background(70);
  noStroke();
  fill(29, 110, 6);
  rect(26, 26, width - 52, width - 52);

  //Draw the combination dials
  push();
  translate(120, 170);
  drawDial(140, CrypticStorageCombination0, 25);
  pop();

  push();
  translate(120, 380);
  drawDial(140, CrypticStorageCombination1, 17);
  pop();

  push();
  translate(280, 170);
  drawDial(140, CrypticStorageCombination2, 14);
  pop();

  push();
  translate(280, 380);
  drawDial(140, CrypticStorageCombination3, 24);
  pop();

  //Draw the lever
  push();
  translate(width - 125, 256);
  drawLever(CrypticStorageCombination4);
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
