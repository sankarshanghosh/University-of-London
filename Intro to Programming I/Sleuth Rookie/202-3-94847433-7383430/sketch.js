/*

Officer: 7383430
CaseNum: 202-3-94847433-7383430

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Yellow filled text with a Sea Green outline in RonsFont font.
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(576,515);
	textSize(30);
}

function draw()
{
	background(255);

	fill(255,69,0);
	stroke(128,0,0);
	textFont(Ballpointprint);
	//text("continual", 351,90);
	fill(127,255,212);
	stroke(127,255,0);
	textFont(RonsFont);
	//text("send", 281,252);
	fill(238,232,170);
	stroke(0,191,255);
	textFont(Melissa);
	//text("can", 246,252);
	fill(0,0,128);
	stroke(139,0,139);
	//text("secrets,", 210,156);
	fill(219,112,147);
	stroke(0,0,139);
	textFont(Ballpointprint);
	//text("avo", 22,186);
	fill(0,0,128);
	stroke(50,205,50);
	//text("?", 136,156);
	push();
	fill(218,165,32);
	stroke(0,255,127);
	//text("not", 295,126);
	pop();
	fill(100,149,237);
	textFont(Diggity);
	//text("sometimes.", 76,288);
	fill(147,112,219);
	stroke(0,206,209);
	textFont(Ballpointprint);
	//text("this", 281,222);
	push();
	fill(144,238,144);
	stroke(128,128,0);
	textFont(Melissa);
	//text("more", 465,126);
	pop();
	stroke(255,255,0);
	textFont(Diggity);
	//text("darling", 50,30);
	push();
	fill(255,0,0);
	stroke(34,139,34);
	textFont(RonsFont);
	//text("?", 168,186);
	pop();
	stroke(34,139,34);
	textFont(Ballpointprint);
	//text("Perhaps", 190,186);
	fill(255,127,80);
	stroke(160,82,45);
	//text("can", 38,90);
	push();
	fill(255,0,255);
	stroke(75,0,130);
	textFont(Melissa);
	//text("My", 17,30);
	pop();
	stroke(220,20,60);
	//text("can", 22,156);
	fill(255,105,180);
	stroke(0,128,0);
	textFont(Diggity);
	//text("sile", 334,156);
	fill(50,205,50);
	stroke(218,165,32);
	textFont(Melissa);
	//text("go", 424,186);
	fill(165,42,42);
	stroke(255,140,0);
	//text("guarded", 7,288);
	fill(107,142,35);
	stroke(0,0,205);
	textFont(Ballpointprint);
	//text("se", 309,90);
	fill(218,165,32);
	stroke(0,139,139);
	textFont(Diggity);
	//text("sort", 228,222);
	fill(139,0,139);
	stroke(25,25,112);
	//text("c", 350,252);
	fill(152,251,152);
	stroke(75,0,130);
	textFont(RonsFont);
	//text("we", 290,186);
	push();
	fill(0,128,0);
	stroke(220,20,60);
	//text("no", 85,90);
	pop();
	fill(0,0,139);
	stroke(50,205,50);
	textFont(Diggity);
	//text("ash.", 360,252);
	fill(128,0,128);
	stroke(127,255,0);
	textFont(RonsFont);
	//text("away", 451,186);
	fill(127,255,0);
	stroke(0,0,205);
	//text("for", 13,222);
	fill(0,0,205);
	stroke(199,21,133);
	textFont(Melissa);
	//text("so,", 177,252);
	fill(0,206,209);
	textFont(RonsFont);
	//text("me", 123,186);
	fill(205,133,63);
	stroke(0,255,0);
	//text("Bob,", 121,30);
	fill(128,128,0);
	//text("you", 443,156);
	fill(255,165,0);
	stroke(199,21,133);
	textFont(Ballpointprint);
	//text("x", 64,408);
	fill(124,252,0);
	stroke(255,140,0);
	textFont(RonsFont);
	//text("should", 335,186);
	fill(154,205,50);
	stroke(0,128,0);
	textFont(Melissa);
	//text("of", 11,252);
	fill(30,144,255);
	stroke(139,69,19);
	textFont(Diggity);
	//text("Are", 394,222);
	fill(255,105,180);
	stroke(0,0,139);
	textFont(Ballpointprint);
	//text("relationship", 42,126);
	fill(100,149,237);
	stroke(218,165,32);
	//text("iding", 53,186);
	fill(184,134,11);
	stroke(0,255,255);
	textFont(Melissa);
	//text("Forev", 13,348);
	fill(0,191,255);
	textFont(Diggity);
	//text("you", 443,222);
	push();
	fill(72,209,204);
	textFont(Melissa);
	//text("sure", 339,126);
	pop();
	fill(240,230,140);
	stroke(255,0,255);
	textFont(Melissa);
	//text("I", 513,126);
	push();
	fill(186,85,211);
	stroke(160,82,45);
	textFont(RonsFont);
	//text("delays.", 446,90);
	pop();
	fill(32,178,170);
	stroke(0,255,0);
	textFont(Diggity);
	//text("If", 151,252);
	fill(255,255,0);
	stroke(255,255,0);
	textFont(RonsFont);
	//text("yours,", 82,348);
	fill(255,0,0);
	stroke(0,0,128);
	textFont(Diggity);
	//text("?", 233,126);
	fill(222,184,135);
	stroke(210,105,30);
	textFont(Ballpointprint);
	//text("I", 209,252);
	fill(218,112,214);
	stroke(25,25,112);
	textFont(Melissa);
	//text("much", 419,126);
	fill(255,255,0);
	stroke(210,105,30);
	textFont(RonsFont);
	//text("I", 11,90);
	fill(0,255,127);
	stroke(0,0,205);
	textFont(Diggity);
	//text("You", 407,252);
	fill(255,255,0);
	stroke(46,139,87);
	textFont(RonsFont);
	text("ignore", 188,90);
	text("safe", 172,126);
	fill(250,128,114);
	stroke(0,191,255);
	textFont(Ballpointprint);
	//text("the", 272,90);
	fill(165,42,42);
	stroke(32,178,170);
	//text("break", 91,222);
	fill(238,232,170);
	stroke(165,42,42);
	textFont(Melissa);
	//text("our", 10,126);
	push();
	fill(240,128,128);
	stroke(139,0,0);
	textFont(Ballpointprint);
	//text("?", 117,252);
	pop();
	stroke(34,139,34);
	textFont(Diggity);
	//text("longer", 123,90);
	fill(199,21,133);
	stroke(0,128,128);
	//text("Is", 531,90);
	fill(75,0,130);
	stroke(46,139,87);
	//text("I'm", 256,126);
	fill(255,255,0);
	textFont(RonsFont);
	text("money", 37,252);
	text("the", 286,156);
	text("take", 69,156);
	fill(0,128,0);
	stroke(0,139,139);
	textFont(Melissa);
	//text("Daisy", 11,408);
	fill(210,105,30);
	stroke(154,205,50);
	//text("The", 170,156);
	push();
	fill(147,112,219);
	stroke(0,255,127);
	textFont(Diggity);
	//text("a", 66,222);
	pop();
	fill(147,112,219);
	stroke(139,0,139);
	//text("er", 58,348);
	fill(255,0,0);
	stroke(0,0,139);
	textFont(RonsFont);
	//text("and", 169,222);
	fill(222,184,135);
	stroke(255,215,0);
	//text("are", 454,252);
	fill(219,112,147);
	stroke(220,20,60);
	textFont(Melissa);
	//text("Are", 406,156);
	fill(199,21,133);
	stroke(184,134,11);
	textFont(RonsFont);
	//text("short", 487,222);
	fill(128,0,0);
	stroke(0,0,139);
	textFont(Diggity);
	//text("nce.", 359,156);
	fill(218,165,32);
	stroke(128,128,0);
	textFont(Melissa);
	//text("how", 380,126);
	push();
	fill(123,104,238);
	stroke(0,255,127);
	//text("out.", 358,222);
	pop();
	fill(0,255,0);
	stroke(165,42,42);
	//text("all", 335,222);
	fill(135,206,235);
	stroke(210,105,30);
	textFont(Ballpointprint);
	//text("so", 508,252);



}
