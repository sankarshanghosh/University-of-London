/*
The case of the Python Syndicate
Stage 3


Officer: 7383430
CaseNum: 301-2-58981573-7383430

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Cecil karpinski has been declared and initialised
- Modify the x and y parameters of each image command using the x and y
properties from the Cecil karpinski object so the images remain at their correct
positions on the board.
- To do this you will need to combine add and subtract operators with the
relevant property for each parameter



*/

var photoBoard;
var bonesKarpinskiImg;
var cecilKarpinskiImg;
var annaKarpinskiImg;
var robbieKrayImg;
var rockyKrayImg;
var countessHamiltonImg;

var cecilKarpinskiObject;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	bonesKarpinskiImg = loadImage("karpinskiDog.png");
	cecilKarpinskiImg = loadImage("karpinskiBros1.png");
	annaKarpinskiImg = loadImage("karpinskiWoman.png");
	robbieKrayImg = loadImage("krayBrothers2.png");
	rockyKrayImg = loadImage("krayBrothers1.png");
	countessHamiltonImg = loadImage("countessHamilton.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	cecilKarpinskiObject = {
		x: 408,
		y: 40,
		image: cecilKarpinskiImg
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(cecilKarpinskiObject.image, cecilKarpinskiObject.x, cecilKarpinskiObject.y);

	image(bonesKarpinskiImg, cecilKarpinskiObject.x - 293, cecilKarpinskiObject.y - 0);
	image(annaKarpinskiImg, cecilKarpinskiObject.x + 293, cecilKarpinskiObject.y - 0);
	image(robbieKrayImg, cecilKarpinskiObject.x - 293, cecilKarpinskiObject.y + 269);
	image(rockyKrayImg, cecilKarpinskiObject.x - 0, cecilKarpinskiObject.y + 269);
	image(countessHamiltonImg, cecilKarpinskiObject.x + 293, cecilKarpinskiObject.y + 269);

}