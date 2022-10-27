/*

Officer: 7383430
CaseNum: 101-3-11838068-7383430

Case 101 - The Case of Anna Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Anna’s style. Now’s our chance to find out the root of all
of this. Lets see who is Anna meeting.

Identify Anna by drawing a Dark Turquoise filled rectangle with a Olive Drab outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Teal filled
rectangle with a Purple outline around him.

Identify the man reading the newspaper by drawing a Magenta filled rectangle
with a Orange Red outline around him.

Identify the woman with the dog by drawing a Dark Goldenrod filled rectangle with a
Medium Violet Red outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
	stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	strokeWeight(2);
}

function draw()
{
	image(img,0,0);
    
    stroke(107, 142, 35);
    fill(0, 206, 209, 100);
    rect(1061, 145, 289, 599);
    
    stroke(199, 21, 133);
    fill(184, 134, 11, 100);
    rect(726, 121, 232, 505);
    
    stroke(128, 0, 128);
    fill(0, 128, 128, 100);
    rect(401, 300, 156, 211);
    
    stroke(255, 69, 0);
    fill(255, 0, 255, 100);
    rect(96, 190, 96, 189);
}
