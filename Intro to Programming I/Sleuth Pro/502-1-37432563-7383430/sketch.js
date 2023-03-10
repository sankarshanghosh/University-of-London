/*

Officer: 7383430
CaseNum: 502-1-37432563-7383430

Case 502 - A delicate matter - stage 2

We’re hot on the trail kid, and another document has come my way. This message is a little more tricky to decipher, but I know you can do it.

- Run the sketch and you'll see the redacted text on the left and the missing words on the right
- Your task is to replace the redacted sections in redactedText with the missing words. 
- You must do this by finding each word in the data structures  below and then concatenating redactedText with references to the word in the respective data structure.

*/

var redactedText;

// data structures to be referenced in redactedText
var ARecord = [
	{bit0: "fence", bit1: "clip", bit2: "bake"}, 
	{bit0: "succeed", bit1: "a donation", bit2: "play"}, 
	{bit0: "smile", bit1: "rejoice", bit2: "she has"}, 
	{bit0: "capital", bit1: "delicate", bit2: "protect"}, 
	{bit0: "radiate", bit1: "consider", bit2: "radiate"}, 
	{bit0: "meddle", bit1: "hurry", bit2: "consider"}, 
	{bit0: "rejoice", bit1: "sail", bit2: "charge"}, 
	{bit0: "Edsger", bit1: "stuff", bit2: "COBOL"}, 
	{bit0: "radiate", bit1: "clip", bit2: "charge"}, 
	{bit0: "play", bit1: "start", bit2: "bake"}
];

var BRecord = [
	{bit0: "Governor Zuckerberg", bit1: "hurry", bit2: "clip"}, 
	{bit0: "charge", bit1: "play", bit2: "radiate"}, 
	{bit0: "hurry", bit1: "romantic", bit2: "charge"}, 
	{bit0: "protect", bit1: "meddle", bit2: "syndicate"}, 
	{bit0: "mend", bit1: "Hopper’s", bit2: "clip"}, 
	{bit0: "succeed", bit1: "clip", bit2: "mend"}, 
	{bit0: "bake", bit1: "consider", bit2: "charge"}, 
	{bit0: "play", bit1: "radiate", bit2: "stuff"}, 
	{bit0: "charge", bit1: "sail", bit2: "smile"}, 
	{bit0: "tug", bit1: "clip", bit2: "consider"}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
  createCanvas(1280,800);

  // replace all redacted words with the correct values from the data structures above
  redactedText = "My dearest " + ARecord[7].bit0 + ", Please don’t doubt my sincerity when I say that I hadn’t the faintest idea about " + BRecord[4].bit1 + " intervention. I suspect that " + ARecord[2].bit2 + " a " + BRecord[2].bit1 + " interest at the " + ARecord[7].bit2 + ". I and the " + BRecord[3].bit2 + " appreciate your many contributions over the years. However, this is a most " + ARecord[3].bit1 + " matter which would require significant " + ARecord[3].bit0 + " for me to deal with it satisfactorily. I would not be so crude as to suggest a sum but perhaps " + ARecord[1].bit1 + " to my forthcoming campaign would help. Yours sincerely, " + BRecord[0].bit0;

}

function draw()
{
  // you don't need to change this
  image(backgroundImg, 0, 0);
  stroke(0);
  strokeWeight(3);
  line(width/2, 10, width/2, height - 10);
  noStroke();
  textFont(myFont);
  textSize(14);
  text(redactedText, 30, 100, 580, 600);
  text("Edsger, Hopper’s, she has, romantic, COBOL, syndicate, delicate, capital, a donation, Governor Zuckerberg", 670, 100, 580, 600);
}
