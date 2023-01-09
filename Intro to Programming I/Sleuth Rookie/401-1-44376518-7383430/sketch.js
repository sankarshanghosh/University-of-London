/*

Officer: 7383430
CaseNum: 401-1-44376518-7383430

Case 401 - The Case of Norbert's Weiner Stand
Stage 2 - Toxic Burrito

Norbert is at it again. This time he’s set up a burrito stall and is lacing burritos with his foul toxin. The chaos is spreading. People are dropping like flies and burrito sales have fallen through the floor. To make matters worse it seems Norbert has cottoned on to our methods and has upped the complexity of his poison. You’ll find the antidote harder to develop this time. So kid, head down to the lab and get working.

You must develop the antidote by using conditional statements in the draw loop to do the following:

	- When warfarin dips below 0.37 or chlorine dips below 0.44, decrement plasma by 0.03
	- If AmanitaMushrooms dips below 0.33 and formaldehyde dips below 0.73, increment plasma by 0.01
	- When AmanitaMushrooms goes above 0.7 or chlorine goes above 0.56, decrease calcium_gluconate by 0.02
	- When formaldehyde goes above 0.31 and warfarin dips below 0.36, increment calcium_gluconate by 0.05
	- If formaldehyde dips below 0.67 or warfarin goes above 0.57, try decreasing antitoxin by 0.03
	- When AmanitaMushrooms dips below 0.43 and chlorine goes above 0.63, increase antitoxin by 0.03
	- If formaldehyde dips below 0.4, decrement glucagon by 0.05
	- If warfarin goes above 0.25 and AmanitaMushrooms goes above 0.28, increment glucagon by 0.02


Your conditional statements should consider the following poisons:

	- AmanitaMushrooms
	- chlorine
	- formaldehyde
	- warfarin


Your conditional statements should modify the following antidotes:

	- plasma
	- calcium_gluconate
	- antitoxin
	- glucagon


- There are many ways to complete this task but you should only use the following commands and operators:

	if(){}
	>
	<
	&&
	||
	+=
	-=

*/

//Declare the poison variables
var AmanitaMushrooms;
var chlorine;
var formaldehyde;
var warfarin;

//Declare the antidote variables
var plasma;
var calcium_gluconate;
var antitoxin;
var glucagon;

//This variable is used for drawing the graph
var graphs;

function setup() {
  createCanvas(800, 600);
  strokeWeight(2);

  //initialise the poisons and antidotes
  AmanitaMushrooms = 0.5;
  chlorine = 0.5;
  formaldehyde = 0.5;
  warfarin = 0.5;
  plasma = 0.5;
  calcium_gluconate = 0.5;
  antitoxin = 0.5;
  glucagon = 0.5;

  //fills the graph with empty values
  graphs = [];

  for (var i = 0; i < 4; i++) {
    graphs.push([]);
    for (var j = 0; j < 512; j++) {
      graphs[i].push(0.5);
    }
  }
}

function draw() {
  //Develop the antidote below
  //Write conditional statements to change the amount of each substance ...

  if (warfarin < 0.37 || chlorine < 0.44) {
    plasma -= 0.03;
  }
  if (AmanitaMushrooms < 0.33 && formaldehyde < 0.73) {
    plasma += 0.01;
  }
  if (AmanitaMushrooms > 0.7 || chlorine > 0.56) {
    calcium_gluconate -= 0.02;
  }
  if (formaldehyde > 0.31 && warfarin < 0.36) {
    calcium_gluconate += 0.05;
  }
  if (formaldehyde < 0.67 || warfarin > 0.57) {
    antitoxin -= 0.03;
  }
  if (AmanitaMushrooms < 0.43 && chlorine > 0.63) {
    antitoxin += 0.03;
  }
  if (formaldehyde < 0.4) {
    glucagon -= 0.05;
  }
  if (warfarin > 0.25 && AmanitaMushrooms > 0.28) {
    glucagon += 0.02;
  }

  //////////////////////////////////////////////////////

  //the code below generates new values using random numbers

  /*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

  AmanitaMushrooms = nextValue(graphs[0], AmanitaMushrooms);
  chlorine = nextValue(graphs[1], chlorine);
  formaldehyde = nextValue(graphs[2], formaldehyde);
  warfarin = nextValue(graphs[3], warfarin);

  plasma = constrain(plasma, 0, 1);
  calcium_gluconate = constrain(calcium_gluconate, 0, 1);
  antitoxin = constrain(antitoxin, 0, 1);
  glucagon = constrain(glucagon, 0, 1);

  ///////// DO NOT CHANGE THE CODE BELOW ///////////

  //drawing code

  // set background
  background(0);
  noFill();

  //draw the graphs for the vitals
  var colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255),
    color(255, 0, 255),
    color(255, 255, 0),
    color(0, 255, 255),
  ];

  for (var i = 0; i < graphs.length; i++) {
    stroke(colors[i]);
    drawGraph(graphs[i]);
  }

  //draw the poisons as text
  noStroke();
  fill(colors[0]);
  text("AmanitaMushrooms: " + nf(AmanitaMushrooms, 1, 2), 20, 20);
  fill(colors[1]);
  text("chlorine: " + nf(chlorine, 1, 2), 20, 40);
  fill(colors[2]);
  text("formaldehyde: " + nf(formaldehyde, 1, 2), 20, 60);
  fill(colors[3]);
  text("warfarin: " + nf(warfarin, 1, 2), 20, 80);

  //draw the antidotes bar chart
  drawBar(plasma, 50, "plasma");
  drawBar(calcium_gluconate, 200, "calcium_gluconate");
  drawBar(antitoxin, 350, "antitoxin");
  drawBar(glucagon, 500, "glucagon");
}

function nextValue(graph, val) {
  //gets the next value for a vital and puts it in an array for drawing
  var delta = random(-0.03, 0.03);

  val += delta;
  if (val > 1 || val < 0) {
    delta *= -1;
    val += delta * 2;
  }

  graph.push(val);
  graph.shift();
  return val;
}

function drawGraph(graph) {
  //draws an array as a graph
  beginShape();
  for (var i = 0; i < graph.length; i++) {
    vertex((width * i) / 512, height * 0.5 - (graph[i] * height) / 3);
  }
  endShape();
}

function drawBar(val, x, name) {
  //draws the bars for bar chart
  noStroke();
  fill(0, 100, 100);
  var mh = height * 0.4 - 50;
  rect(x, height - 50 - val * mh, 100, val * mh);
  fill(255);
  text(name + ": " + val, x, height - 20);
}
