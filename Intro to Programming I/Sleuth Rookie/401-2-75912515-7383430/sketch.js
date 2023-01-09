/*

Officer: 7383430
CaseNum: 401-2-75912515-7383430

Case 401 - The Case of Norbert's Weiner Stand
Stage 3 - Bilious bagel

As I suspected Norbert has struck again. Ever inventive he’s set up a bagel stand and has laced the cream cheese with an ingenious but vicious toxin. This one is quite deadly so get yourself down to the lab right away.

You must develop the antidote by using conditional statements in the draw loop to do the following.

	- When sarin goes above 0.64 or mercury goes above 0.67, decrement SodiumBicarbonate by 0.02
	- If either chlorine dips below 0.32, formaldehyde dips below 0.67, or perhaps strychnine goes above 0.56, try increasing SodiumBicarbonate by 0.01
	- When sarin goes above 0.66 or mercury goes above 0.63, whilst at the same time, chlorine goes above 0.51, decrement paracetamol by 0.02
	- When strychnine dips below 0.26 and arsenic dips below 0.61, try increasing paracetamol by 0.04
	- If sarin dips below 0.64, or on the other hand, arsenic goes above 0.32 and formaldehyde goes above 0.25, decrease protamine by 0.02
	- If chlorine goes above 0.39 and strychnine dips below 0.38, increment protamine by 0.01
	- When strychnine dips below 0.38 and arsenic goes above 0.46, decrease methylene by 0.02
	- When mercury goes above 0.32, or on the other hand, chlorine goes above 0.71 and formaldehyde goes above 0.35, increment methylene by 0.04


Your conditional statements should consider the following poisons:

	- arsenic
	- mercury
	- strychnine
	- sarin
	- chlorine
	- formaldehyde


Your conditional statements should modify the following antidotes:

	- SodiumBicarbonate
	- paracetamol
	- protamine
	- methylene


- There are many ways to complete this task but you should only use the following commands:

	if(){}
	>
	<
	&&
	||
	+=
	-=

*/

//Declare the poison variables
var arsenic;
var mercury;
var strychnine;
var sarin;
var chlorine;
var formaldehyde;

//Declare the antidote variables
var SodiumBicarbonate;
var paracetamol;
var protamine;
var methylene;

//This variable is used for drawing the graph
var graphs;

function setup() {
  createCanvas(800, 600);
  strokeWeight(2);

  //initialise the poisons and antidotes
  arsenic = 0.5;
  mercury = 0.5;
  strychnine = 0.5;
  sarin = 0.5;
  chlorine = 0.5;
  formaldehyde = 0.5;
  SodiumBicarbonate = 0.5;
  paracetamol = 0.5;
  protamine = 0.5;
  methylene = 0.5;

  //fills the graph with empty values
  graphs = [];

  for (var i = 0; i < 6; i++) {
    graphs.push([]);
    for (var j = 0; j < 512; j++) {
      graphs[i].push(0.5);
    }
  }
}

function draw() {
  //Develop the antidote below
  //Write conditional statements to change the amount of each substance ...
  // - When sarin goes above 0.64 or mercury goes above 0.67, decrement SodiumBicarbonate by 0.02
  // - If either chlorine dips below 0.32, formaldehyde dips below 0.67, or perhaps strychnine goes above 0.56, try increasing SodiumBicarbonate by 0.01
  // - When sarin goes above 0.66 or mercury goes above 0.63, whilst at the same time, chlorine goes above 0.51, decrement paracetamol by 0.02
  // - When strychnine dips below 0.26 and arsenic dips below 0.61, try increasing paracetamol by 0.04
  // - If sarin dips below 0.64, or on the other hand, arsenic goes above 0.32 and formaldehyde goes above 0.25, decrease protamine by 0.02
  // - If chlorine goes above 0.39 and strychnine dips below 0.38, increment protamine by 0.01
  // - When strychnine dips below 0.38 and arsenic goes above 0.46, decrease methylene by 0.02
  // - When mercury goes above 0.32, or on the other hand, chlorine goes above 0.71 and formaldehyde goes above 0.35, increment methylene by 0.04

  if (sarin > 0.64 || mercury > 0.67) {
    SodiumBicarbonate -= 0.02;
  }
  if (chlorine < 0.32 || formaldehyde < 0.67 || strychnine > 0.56) {
    SodiumBicarbonate += 0.01;
  }
  if ((sarin > 0.66 || mercury > 0.63) && chlorine > 0.51) {
    paracetamol -= 0.02;
  }
  if (strychnine < 0.26 && arsenic < 0.61) {
    paracetamol += 0.04;
  }
  if (sarin < 0.64 || (arsenic > 0.32 && formaldehyde > 0.25)) {
    protamine -= 0.02;
  }
  if (chlorine > 0.39 && strychnine < 0.38) {
    protamine += 0.01;
  }
  if (strychnine < 0.38 && arsenic > 0.46) {
    methylene -= 0.02;
  }
  if (mercury > 0.32 || (chlorine > 0.71 && formaldehyde > 0.35)) {
    methylene += 0.04;
  }
  //////////////////////////////////////////////////////

  //the code below generates new values using random numbers

  /*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

  arsenic = nextValue(graphs[0], arsenic);
  mercury = nextValue(graphs[1], mercury);
  strychnine = nextValue(graphs[2], strychnine);
  sarin = nextValue(graphs[3], sarin);
  chlorine = nextValue(graphs[4], chlorine);
  formaldehyde = nextValue(graphs[5], formaldehyde);

  SodiumBicarbonate = constrain(SodiumBicarbonate, 0, 1);
  paracetamol = constrain(paracetamol, 0, 1);
  protamine = constrain(protamine, 0, 1);
  methylene = constrain(methylene, 0, 1);

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
  text("arsenic: " + nf(arsenic, 1, 2), 20, 20);
  fill(colors[1]);
  text("mercury: " + nf(mercury, 1, 2), 20, 40);
  fill(colors[2]);
  text("strychnine: " + nf(strychnine, 1, 2), 20, 60);
  fill(colors[3]);
  text("sarin: " + nf(sarin, 1, 2), 20, 80);
  fill(colors[4]);
  text("chlorine: " + nf(chlorine, 1, 2), 20, 100);
  fill(colors[5]);
  text("formaldehyde: " + nf(formaldehyde, 1, 2), 20, 120);

  //draw the antidotes bar chart
  drawBar(SodiumBicarbonate, 50, "SodiumBicarbonate");
  drawBar(paracetamol, 200, "paracetamol");
  drawBar(protamine, 350, "protamine");
  drawBar(methylene, 500, "methylene");
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
