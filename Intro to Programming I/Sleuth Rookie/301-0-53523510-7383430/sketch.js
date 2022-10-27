/*
The case of the Python Syndicate
Stage 1

Officer: 7383430
CaseNum: 301-0-53523510-7383430

I gotta give it to you kid, you’ve made an excellent start, but now it’s time
to take things up a level. For some time I’ve suspected that there’s something
big going down in Console City.

These cases that we’ve been working are all connected somehow. I need to use
that considerable brain of yours to work it all out. Let’s start by laying out
who we know.

Place each mugshot in its designated position by doing the following:

- Create a new variable for the X and Y coordinates of each mugshot.
    - One has already been done for you.
    - Make sure you use the same style and format for the variable name.
- Find coordinates for the mugshot and initialise your variable with these
values.
- Replace the hard-coded constants in the corresponding image command so that
the mugshot appears in its designated position.

*/

var photoBoard;
var annaKarpinskiImg;
var bonesKarpinskiImg;
var linaLovelaceImg;
var pawelKarpinskiImg;
var cecilKarpinskiImg;
var rockyKrayImg;



//declare your new variables below
var bonesKarpinskiXLocation = 408;
var bonesKarpinskiYLocation = 40;
var annaKarpinskiXLocation = 115;
var annaKarpinskiYLocation = 40;
var linaLovelaceXLocation = 701;
var linaLovelaceYLocation = 40;
var pawelKarpinskiXLocation = 115;
var pawelKarpinskiYLocation = 309;
var cecilKarpinskiXLocation = 408;
var cecilKarpinskiYLocation = 309;
var rockyKrayXLocation = 701;
var rockyKrayYLocation = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	annaKarpinskiImg = loadImage("karpinskiWoman.png");
	bonesKarpinskiImg = loadImage("karpinskiDog.png");
	linaLovelaceImg = loadImage("lina.png");
	pawelKarpinskiImg = loadImage("karpinskiBros2.png");
	cecilKarpinskiImg = loadImage("karpinskiBros1.png");
	rockyKrayImg = loadImage("krayBrothers1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);



	//And update these image commands with your x and y coordinates.
	image(bonesKarpinskiImg, bonesKarpinskiXLocation, bonesKarpinskiYLocation);
    image(annaKarpinskiImg, annaKarpinskiXLocation, annaKarpinskiYLocation);
    image(linaLovelaceImg, linaLovelaceXLocation, linaLovelaceYLocation);
    image(pawelKarpinskiImg, pawelKarpinskiXLocation, pawelKarpinskiYLocation);
    image(cecilKarpinskiImg, cecilKarpinskiXLocation, cecilKarpinskiYLocation);
    image(rockyKrayImg, rockyKrayXLocation, rockyKrayYLocation);

}