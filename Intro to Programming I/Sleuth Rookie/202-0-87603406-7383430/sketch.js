/*

Officer: 7383430
CaseNum: 202-0-87603406-7383430

Case 202 - The case of Bob and Daisy - stage 1

That pair of notorious criminals Woz and Jobs are up to no good again.
I’ve intercepted letters sent between them. It seems that they are
communicating through an ingenious code in which they masquerade as
besotted lovers, Daisy and Bob. I need you crack their code and determine
the details of their next heist so that we can catch them in the act.

Discover the hidden code by commenting out all text commands except
those which produce Sandy Brown text. Only comment out text commands.
Leave fill commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Ballpointprint.ttf');
}

function setup()
{
	createCanvas(657,522);
	//textFont(letterFont);
	//textSize(29);
}

function draw()
{
	background(255);

	fill(128,0,0);
	//text("alone", 549,87);
	fill(0,255,255);
	//text("that", 299,310);
	//text("darling,", 232,281);
	fill(255,0,255);
	//text("I", 474,87);
	fill(139,69,19);
	//text("are", 384,149);
	fill(135,206,235);
	//text("Love", 16,368);
	fill(255,215,0);
	//text("You", 334,149);
	//text("those", 252,215);
	fill(240,128,128);
	//text("that", 344,184);
	fill(255,99,71);
	//text("person", 160,310);
	fill(100,149,237);
	//text("From", 84,184);
	fill(30,144,255);
	//text("x", 73,426);
	//text("that", 470,215);
	fill(148,0,211);
	//text("date,", 445,249);
	fill(255,215,0);
	//text("from", 190,215);
	fill(255,255,0);
	//text("the", 224,149);
	fill(124,252,0);
	//text("am", 509,87);
	fill(255,0,255);
	//text("one", 59,249);
	//text("harp.", 274,149);
	fill(0,255,127);
	//text("of", 138,281);
	fill(255,0,255);
	//text("your", 479,184);
	fill(32,178,170);
	//text("last", 399,249);
	fill(176,224,230);
	//text("voice", 376,120);
	fill(218,165,32);
	//text("ssed", 57,149);
	fill(218,112,214);
	//text("and", 80,368);
	fill(128,0,128);
	//text("when", 408,87);
	fill(65,105,225);
	//text("true", 109,249);
	fill(0,0,128);
	//text("hear", 261,120);
	//text("Bob", 16,426);
	fill(123,104,238);
	//text("can", 546,249);
	fill(255,127,80);
	//text("your", 178,281);
	//text("my", 17,249);
	//text("our", 357,249);
	fill(0,128,128);
	//text("ble", 24,149);
	fill(244,164,96);
	text("It", 334,87);
	fill(255,105,180);
	//text("con", 184,87);
	//text("I", 396,184);
	//text("s.", 437,281);
	fill(173,216,230);
	//text("the", 22,310);
	//text("moment", 259,184);
	fill(219,112,147);
	//text("I", 467,281);
	fill(65,105,225);
	//text("a", 158,87);
	//text("only", 23,281);
	fill(128,128,0);
	//text("seco", 379,215);
	//text("chosen.", 480,310);
	fill(75,0,130);
	//text("since", 291,249);
	fill(184,134,11);
	//text("Ever", 224,249);
	//text("quiet", 106,120);
	//text("in", 593,149);
	fill(255,215,0);
	//text("May", 16,87);
	fill(138,43,226);
	//text("nds", 421,215);
	//text("the", 497,120);
	fill(135,206,250);
	//text("saw", 431,184);
	fill(64,224,208);
	//text("sunny", 475,149);
	//text("love", 533,184);
	//text("green", 318,281);
	fill(123,104,238);
	//text("is", 376,87);
	fill(50,205,50);
	//text("were", 568,215);
	//text("I", 511,249);
	fill(250,128,114);
	//text("Daisy,", 131,29);
	//text("face,", 20,215);
	fill(0,0,139);
	//text("eye", 395,281);
	fill(50,205,50);
	//text("you", 522,215);
	fill(165,42,42);
	//text("in", 23,120);
	fill(72,209,204);
	//text("of", 184,149);
	//text("that", 174,120);
	fill(107,142,35);
	//text("love.", 164,249);
	fill(0,255,255);
	//text("your", 322,120);
	fill(176,224,230);
	//text("alive", 236,310);
	fill(205,133,63);
	//text("kisses,", 130,368);
	fill(107,142,35);
	//text("am", 386,310);
	fill(240,230,140);
	//text("like", 443,120);
	fill(139,0,0);
	//text("the", 147,184);
	fill(0,139,139);
	//text("few", 320,215);
	fill(128,0,128);
	//text("be", 557,281);
	fill(144,238,144);
	//text("Oh", 16,29);
	fill(176,224,230);
	//text("luckiest", 72,310);
	fill(178,34,34);
	//text("I", 89,215);
	fill(244,164,96);
	text("April", 24,184);
	fill(238,232,170);
	//text("I", 72,87);
	//text("my", 433,149);
	fill(178,34,34);
	//text("lovely", 60,29);
	fill(100,149,237);
	//text("must", 502,281);
	fill(160,82,45);
	//text("the", 56,120);
	//text("your", 426,310);
	fill(173,255,47);
	//text("?", 302,87);
	fill(240,230,140);
	//text("fession", 212,87);
	fill(152,251,152);
	//text("knew", 124,215);
	fill(165,42,42);
	//text("I", 226,120);
	fill(255,69,0);
	//text("think", 74,281);
	fill(0,0,255);
	//text("I", 351,310);
	fill(178,34,34);
	//text("music", 120,149);
	fill(184,134,11);
	//text("ly", 572,184);
	fill(244,164,96);
	text("first", 197,184);
	text("make", 107,87);
	fill(0,0,205);
	//text("day", 541,149);



}
