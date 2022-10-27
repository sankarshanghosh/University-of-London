/*

Officer: 7383430
CaseNum: 202-2-82947514-7383430

Case 202 - The case of Bob and Daisy - stage 3

Wow these two like to ham it up. Here’s the next letter. This time it’s from Bob (aka. Jobs).
I need you to decode it to uncover more details about their plan.

Discover the hidden code by commenting out all text commands except
those which produce Red filled text in Melissa font.
Only comment out text commands - leave fill & stroke commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var Ballpointprint;
var Melissa;
var Diggity;
var RonsFont;


function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(697,694);
	textSize(35);
}

function draw()
{
	background(255);

	fill(178,34,34);
	textFont(Diggity);
	//text("l", 344,105);
	fill(0,0,205);
	textFont(RonsFont);
	//text("our", 571,229);
	fill(152,251,152);
	//text("have", 124,146);
	fill(0,0,139);
	textFont(Diggity);
	//text("lovely", 72,35);
	fill(138,43,226);
	textFont(Melissa);
	//text("of", 542,229);
	fill(100,149,237);
	textFont(Diggity);
	//text("car", 476,396);
	fill(255,0,255);
	textFont(RonsFont);
	//text("in", 390,396);
	fill(165,42,42);
	textFont(Ballpointprint);
	//text("dre", 449,229);
	fill(210,105,30);
	textFont(RonsFont);
	//text("x", 74,576);
	fill(238,232,170);
	//text("Bob", 8,576);
	fill(186,85,211);
	textFont(Diggity);
	//text("away", 132,187);
	fill(72,209,204);
	textFont(Ballpointprint);
	//text("days", 490,146);
	fill(184,134,11);
	textFont(Melissa);
	//text("to", 95,229);
	fill(135,206,250);
	textFont(RonsFont);
	//text("will", 261,313);
	fill(25,25,112);
	textFont(Melissa);
	//text("to", 215,436);
	fill(240,128,128);
	textFont(Diggity);
	//text("not", 608,271);
	fill(65,105,225);
	textFont(RonsFont);
	//text("Love", 12,506);
	fill(135,206,235);
	textFont(Diggity);
	//text("walks", 15,271);
	fill(205,133,63);
	textFont(RonsFont);
	//text("so", 97,396);
	fill(255,0,0);
	textFont(Melissa);
	text("gun", 212,146);
	fill(0,206,209);
	textFont(Ballpointprint);
	//text("I", 21,146);
	fill(144,238,144);
	textFont(Diggity);
	//text("and", 89,506);
	//text("onger", 346,105);
	fill(255,69,0);
	textFont(Ballpointprint);
	//text("am", 493,229);
	fill(72,209,204);
	textFont(RonsFont);
	//text("down", 349,146);
	fill(199,21,133);
	textFont(Ballpointprint);
	//text("opportun", 291,229);
	//text("old", 433,271);
	fill(205,133,63);
	//text("back", 141,436);
	fill(100,149,237);
	//text("playing", 208,353);
	fill(255,99,71);
	textFont(Diggity);
	//text("in", 91,271);
	fill(144,238,144);
	textFont(RonsFont);
	//text("until", 565,146);
	fill(255,140,0);
	textFont(Ballpointprint);
	//text("my", 425,396);
	fill(148,0,211);
	textFont(Diggity);
	//text("shall", 244,105);
	fill(106,90,205);
	textFont(Ballpointprint);
	//text("can", 26,187);
	fill(173,255,47);
	textFont(Melissa);
	//text("right", 529,396);
	//text("kisses,", 143,506);
	textFont(RonsFont);
	//text("all", 459,187);
	fill(222,184,135);
	textFont(Ballpointprint);
	//text("despair", 26,313);
	fill(139,0,139);
	textFont(RonsFont);
	//text("our", 491,105);
	fill(75,0,130);
	//text("toasts", 426,313);
	fill(255,99,71);
	textFont(Diggity);
	//text("Upon", 12,105);
	fill(255,105,180);
	textFont(RonsFont);
	//text("ery", 233,229);
	//text("love", 560,105);
	fill(0,0,128);
	textFont(Melissa);
	//text("broadcast", 501,187);
	fill(139,0,139);
	textFont(Ballpointprint);
	//text("We", 372,187);
	fill(238,130,238);
	textFont(RonsFont);
	//text("run", 70,436);
	fill(0,255,0);
	textFont(Diggity);
	//text("and", 16,436);
	fill(147,112,219);
	textFont(Melissa);
	//text("the", 394,271);
	fill(238,232,170);
	textFont(Diggity);
	//text("isi", 373,313);
	fill(210,105,30);
	//text("ng", 390,313);
	fill(127,255,212);
	textFont(RonsFont);
	//text("too", 63,146);
	fill(0,100,0);
	textFont(Ballpointprint);
	//text("my", 76,105);
	fill(205,133,63);
	textFont(Melissa);
	//text("return", 127,105);
	fill(0,0,128);
	textFont(Diggity);
	//text("and", 245,271);
	fill(240,230,140);
	textFont(Melissa);
	//text("devotion", 9,229);
	fill(0,0,128);
	textFont(Ballpointprint);
	//text("ity.", 374,229);
	fill(218,165,32);
	textFont(Melissa);
	//text("harbour.", 484,271);
	fill(144,238,144);
	textFont(RonsFont);
	//text("the", 435,146);
	fill(220,20,60);
	textFont(Melissa);
	//text("woods", 173,271);
	fill(0,0,255);
	textFont(RonsFont);
	//text("you.", 244,436);
	fill(255,0,0);
	textFont(Melissa);
	text("the", 549,353);
	fill(64,224,208);
	textFont(Diggity);
	//text("Do", 565,271);
	fill(178,34,34);
	textFont(RonsFont);
	//text("ev", 207,229);
	fill(128,128,0);
	textFont(Melissa);
	//text("!", 132,313);
	fill(100,149,237);
	textFont(Ballpointprint);
	//text("we", 191,105);
	fill(218,165,32);
	textFont(RonsFont);
	//text("keep", 419,105);
	fill(255,127,80);
	textFont(Ballpointprint);
	//text("bar", 81,353);
	//text("from", 208,187);
	fill(0,128,0);
	//text("all", 281,187);
	textFont(Diggity);
	//text("shooters", 307,353);
	//text("to", 257,396);
	fill(255,215,0);
	textFont(RonsFont);
	//text("sh", 433,187);
	fill(255,127,80);
	textFont(Ballpointprint);
	//text("am", 48,396);
	fill(244,164,96);
	textFont(RonsFont);
	//text("no", 300,105);
	fill(240,230,140);
	//text("all", 124,229);
	fill(0,191,255);
	textFont(Ballpointprint);
	//text("Oh", 19,35);
	textFont(Melissa);
	//text("this.", 323,187);
	fill(173,216,230);
	textFont(RonsFont);
	//text("I", 643,146);
	//text("down", 418,353);
	fill(135,206,235);
	//text("and", 139,353);
	fill(147,112,219);
	//text("we", 210,313);
	fill(160,82,45);
	textFont(Melissa);
	//text("be", 319,313);
	fill(128,0,0);
	textFont(Diggity);
	//text("ra", 347,313);
	fill(0,139,139);
	//text("the", 120,271);
	fill(255,0,0);
	textFont(Melissa);
	text("hidden", 623,105);
	text("down", 299,271);
	text("at", 532,313);
	fill(127,255,212);
	textFont(Diggity);
	//text("Soon", 145,313);
	fill(218,165,32);
	textFont(Ballpointprint);
	//text("our", 605,187);
	fill(135,206,235);
	textFont(RonsFont);
	//text("Daisy,", 141,35);
	textFont(Ballpointprint);
	//text("at", 166,229);
	fill(255,255,0);
	textFont(RonsFont);
	//text("now", 582,396);
	fill(0,255,127);
	textFont(Diggity);
	//text("wine", 18,353);
	fill(127,255,212);
	textFont(Melissa);
	//text("Jerrys", 561,313);
	fill(50,205,50);
	textFont(RonsFont);
	//text("I", 18,396);
	fill(25,25,112);
	textFont(Ballpointprint);
	//text("tempted", 139,396);
	textFont(RonsFont);
	//text("at", 504,353);
	fill(255,0,0);
	textFont(Melissa);
	text("arcade", 588,353);
	fill(50,205,50);
	//text("I", 431,229);
	fill(199,21,133);
	textFont(RonsFont);
	//text("jump", 297,396);
	fill(147,112,219);
	textFont(Diggity);
	//text("get", 81,187);
	fill(238,130,238);
	//text("counting", 249,146);
	fill(255,215,0);
	textFont(RonsFont);
	//text("by", 354,271);
	fill(0,0,255);
	textFont(Melissa);
	//text("be", 192,146);



}
