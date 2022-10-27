/*
The case of the Python Syndicate
Stage 2


Officer: 7383430
CaseNum: 301-1-47366131-7383430

- Word on the street is that there is a new gang in town - The Python Syndicate.
It seems my bones were correct on this one. I need you to organise the gang
around the suspected leader Bones karpinski

- The variables for Bones karpinski have been declared and
initialised.
- Modify the x and y parameters of each image command using these two variables
so the images maintain their correct positions their correct positions on the board.
- To do this you will need to combine add and subtract operators with variables
Bones karpinski for for each parameter.
- Do not create any new variables
- Do not add any additional commands


*/

var photoBoard;
var lina_lovelace_img;
var countess_hamilton_img;
var cecil_karpinski_img;
var rocky_kray_img;
var bones_karpinski_img;
var robbie_kray_img;


var bones_karpinski_x_location = 408;
var bones_karpinski_y_location = 309;

function preload()
{
	photoBoard = loadImage('photoBoard.png');
	lina_lovelace_img = loadImage("lina.png");
	countess_hamilton_img = loadImage("countessHamilton.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	rocky_kray_img = loadImage("krayBrothers1.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");
	robbie_kray_img = loadImage("krayBrothers2.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(bones_karpinski_img, bones_karpinski_x_location, bones_karpinski_y_location);

	image(lina_lovelace_img, bones_karpinski_x_location - 293, bones_karpinski_y_location - 269);
	image(countess_hamilton_img, bones_karpinski_x_location - 0, bones_karpinski_y_location - 269);
	image(cecil_karpinski_img, bones_karpinski_x_location + 293, bones_karpinski_y_location - 269);
	image(rocky_kray_img, bones_karpinski_x_location - 293, bones_karpinski_y_location - 0);
	image(robbie_kray_img, bones_karpinski_x_location + 293, bones_karpinski_y_location - 0);

}