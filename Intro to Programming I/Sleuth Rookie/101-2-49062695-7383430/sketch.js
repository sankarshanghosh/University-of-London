/*

Officer: 7383430
CaseNum: 101-2-49062695-7383430

Case 101 - The Case of Anna Lovelace
Stage 3 - The Docks

You’ve followed Anna down to the docks. She sure frequents some classy places.
Okay let’s see who she’s meeting down there.

Identify Anna by drawing a Medium Turquoise filled rectangle around her.
She’s the woman in the red dress of course.

Identify the heavy-set man in the fishing overalls by drawing a Blue Violet filled
rectangle around him.

Identify the man in the striped top by drawing a Pale Violet Red filled rectangle around
him.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	noStroke();
}

function draw()
{
	image(img,0,0);
    fill(72, 209, 204, 100);
	rect(800, 235, 208, 432);
    
    fill(138, 43, 226, 100);
	rect(1698, 235, 170, 182);
    
    fill(219, 112, 147, 100);
	rect(1330, 230, 125, 342);

}
