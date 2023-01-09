/*

Officer: 7383430
CaseNum: 401-3-96703055-7383430

Case 401 - The Case of Norbert's Weiner Stand
Stage 4 - Mortal Cupcake

It seems that Norbert is getting desperate now. In what appears to be his final stand he has set up his own cupcake shop. The laced cupcakes look delicious but they are extremely dangerous. Just a brief whiff of one can induce a series of
deadly symptoms. This is Norbert’s most complex poison to date, so you’ll have to work hard to produce a viable antidote.

You must develop the antidote by using conditional statements in the draw loop to do the following.

	- If polonium goes above 0.65 or botulinium goes above 0.49, whilst at the same time, formaldehyde dips below 0.35 and Deadly_Nightshade goes above 0.64, reduce plasma by 0.04
	- When either chlorine dips below 0.53, amanitaMushrooms goes above 0.38, or perhaps cyanide dips below 0.45, raise plasma by 0.01
	- When polonium goes above 0.55 or amanitaMushrooms goes above 0.69, whilst at the same time, chlorine dips below 0.42 and botulinium goes above 0.75, reduce sulphates by 0.04
	- If alcohol dips below 0.35, cyanide goes above 0.38, and also formaldehyde goes above 0.33, raise sulphates by 0.03
	- When amanitaMushrooms goes above 0.34 and botulinium goes above 0.54, or on the other hand, Deadly_Nightshade dips below 0.29 or chlorine dips below 0.69, try decreasing paracetamol by 0.05
	- When either alcohol goes above 0.25, polonium dips below 0.37, cyanide goes above 0.68, or perhaps formaldehyde dips below 0.59, raise paracetamol by 0.01
	- If polonium dips below 0.31, whilst at the same time, cyanide goes above 0.4 or alcohol dips below 0.75, reduce methylene by 0.01
	- When formaldehyde dips below 0.44, whilst at the same time, chlorine goes above 0.32 or Deadly_Nightshade dips below 0.34, increment methylene by 0.02
	- When cyanide dips below 0.43 and formaldehyde goes above 0.74, whilst at the same time, chlorine goes above 0.61 or Deadly_Nightshade dips below 0.42, reduce antivenom by 0.02
	- If amanitaMushrooms dips below 0.6 or alcohol goes above 0.75, whilst at the same time, polonium goes above 0.33 and botulinium goes above 0.64, raise antivenom by 0.05


Your conditional statements should consider the following poisons:

	- chlorine
	- alcohol
	- botulinium
	- cyanide
	- formaldehyde
	- polonium
	- Deadly_Nightshade
	- amanitaMushrooms


Your conditional statements should modify the following antidotes:

	- plasma
	- sulphates
	- paracetamol
	- methylene
	- antivenom


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
var chlorine;
var alcohol;
var botulinium;
var cyanide;
var formaldehyde;
var polonium;
var Deadly_Nightshade;
var amanitaMushrooms;

//Declare the antidote variables
var plasma;
var sulphates;
var paracetamol;
var methylene;
var antivenom;

//This variable is used for drawing the graph
var graphs;

function setup() {
	createCanvas(800, 600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	chlorine = 0.5;
	alcohol = 0.5;
	botulinium = 0.5;
	cyanide = 0.5;
	formaldehyde = 0.5;
	polonium = 0.5;
	Deadly_Nightshade = 0.5;
	amanitaMushrooms = 0.5;
	plasma = 0.5;
	sulphates = 0.5;
	paracetamol = 0.5;
	methylene = 0.5;
	antivenom = 0.5;

	//fills the graph with empty values
	graphs = [];

	for (var i = 0; i < 8; i++) {
		graphs.push([]);
		for (var j = 0; j < 512; j++) {
			graphs[i].push(0.5);
		}
	}
}

function draw() {
	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...
	// - If polonium goes above 0.65 or botulinium goes above 0.49, whilst at the same time, formaldehyde dips below 0.35 and Deadly_Nightshade goes above 0.64, reduce plasma by 0.04
	// - When either chlorine dips below 0.53, amanitaMushrooms goes above 0.38, or perhaps cyanide dips below 0.45, raise plasma by 0.01
	// - When polonium goes above 0.55 or amanitaMushrooms goes above 0.69, whilst at the same time, chlorine dips below 0.42 and botulinium goes above 0.75, reduce sulphates by 0.04
	// - If alcohol dips below 0.35, cyanide goes above 0.38, and also formaldehyde goes above 0.33, raise sulphates by 0.03
	// - When amanitaMushrooms goes above 0.34 and botulinium goes above 0.54, or on the other hand, Deadly_Nightshade dips below 0.29 or chlorine dips below 0.69, try decreasing paracetamol by 0.05
	// - When either alcohol goes above 0.25, polonium dips below 0.37, cyanide goes above 0.68, or perhaps formaldehyde dips below 0.59, raise paracetamol by 0.01
	// - If polonium dips below 0.31, whilst at the same time, cyanide goes above 0.4 or alcohol dips below 0.75, reduce methylene by 0.01
	// - When formaldehyde dips below 0.44, whilst at the same time, chlorine goes above 0.32 or Deadly_Nightshade dips below 0.34, increment methylene by 0.02
	// - When cyanide dips below 0.43 and formaldehyde goes above 0.74, whilst at the same time, chlorine goes above 0.61 or Deadly_Nightshade dips below 0.42, reduce antivenom by 0.02
	// - If amanitaMushrooms dips below 0.6 or alcohol goes above 0.75, whilst at the same time, polonium goes above 0.33 and botulinium goes above 0.64, raise antivenom by 0.05

	if ((polonium > 0.65 || botulinium > 0.49) && (formaldehyde < 0.35 && Deadly_Nightshade > 0.64)) {
		plasma -= 0.04;
	}
	if (chlorine < 0.53 || amanitaMushrooms > 0.38 || cyanide < 0.45) {
		plasma += 0.01;
	}
	if ((polonium > 0.55 || amanitaMushrooms > 0.69) && (chlorine < 0.42 && botulinium > 0.75)) {
		sulphates -= 0.04;
	}
	if (alcohol < 0.35 && cyanide > 0.38 && formaldehyde > 0.33) {
		sulphates += 0.03;
	}
	if ((amanitaMushrooms > 0.34 && botulinium > 0.54) || (Deadly_Nightshade < 0.29 || chlorine < 0.69)) {
		paracetamol -= 0.05;
	}
	if (alcohol > 0.25 || polonium < 0.37 || cyanide > 0.68 || formaldehyde < 0.59) {
		paracetamol += 0.01
	}
	if (polonium < 0.31 && (cyanide > 0.4 || alcohol < 0.75)) {
		methylene -= 0.01
	}
	if (formaldehyde < 0.44 && (chlorine > 0.32 || Deadly_Nightshade < 0.34)) {
		methylene += 0.02
	}
	if ((cyanide < 0.43 && formaldehyde > 0.74) && (chlorine > 0.61 || Deadly_Nightshade < 0.42)) {
		antivenom -= 0.02
	}
	if ((amanitaMushrooms < 0.6 || alcohol > 0.75) && (polonium > 0.33 && botulinium > 0.64)) {
		antivenom += 0.05
	}

	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		  For testing, you might want to temporarily comment out
		  these lines and set the same variables to constant values
		  instead.
	  */

	chlorine = nextValue(graphs[0], chlorine);
	alcohol = nextValue(graphs[1], alcohol);
	botulinium = nextValue(graphs[2], botulinium);
	cyanide = nextValue(graphs[3], cyanide);
	formaldehyde = nextValue(graphs[4], formaldehyde);
	polonium = nextValue(graphs[5], polonium);
	Deadly_Nightshade = nextValue(graphs[6], Deadly_Nightshade);
	amanitaMushrooms = nextValue(graphs[7], amanitaMushrooms);

	plasma = constrain(plasma, 0, 1);
	sulphates = constrain(sulphates, 0, 1);
	paracetamol = constrain(paracetamol, 0, 1);
	methylene = constrain(methylene, 0, 1);
	antivenom = constrain(antivenom, 0, 1);

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
		color(255, 100, 100),
		color(255, 100, 0),
	];

	for (var i = 0; i < graphs.length; i++) {
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text("chlorine: " + nf(chlorine, 1, 2), 20, 20);
	fill(colors[1]);
	text("alcohol: " + nf(alcohol, 1, 2), 20, 40);
	fill(colors[2]);
	text("botulinium: " + nf(botulinium, 1, 2), 20, 60);
	fill(colors[3]);
	text("cyanide: " + nf(cyanide, 1, 2), 20, 80);
	fill(colors[4]);
	text("formaldehyde: " + nf(formaldehyde, 1, 2), 20, 100);
	fill(colors[5]);
	text("polonium: " + nf(polonium, 1, 2), 20, 120);
	fill(colors[6]);
	text("Deadly_Nightshade: " + nf(Deadly_Nightshade, 1, 2), 20, 140);
	fill(colors[7]);
	text("amanitaMushrooms: " + nf(amanitaMushrooms, 1, 2), 20, 160);

	//draw the antidotes bar chart
	drawBar(plasma, 50, "plasma");
	drawBar(sulphates, 200, "sulphates");
	drawBar(paracetamol, 350, "paracetamol");
	drawBar(methylene, 500, "methylene");
	drawBar(antivenom, 650, "antivenom");
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
