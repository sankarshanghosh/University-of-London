/*

Officer: 7383430
CaseNum: 702-0-33520078-7383430

Case 702 - The case of Vanishing Vannevar
Stage 1 - Mobilise

“Calling all units: the notorious criminal and speedster known as Vanishing Vannevar is on the run.
All cars to mobilise.” Word has it that you’re pretty nifty behind the wheel. I want you in on
this action kid. Get your car on the road by completing the </DRIVE_NAME/> function below.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- increment variables
	- random
	- constrain
	- calling functions

HINT: make sure you take a look at the initialisation of Investigator_Car to understand it's properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function drive_car()
{
	/*
	This function should do the following: 
	 - increment Investigator_Car's Distance_Driven property by its Speed_Amount property 
	 - add a random amount between -0.03 and 0.03 to Investigator_Car's Rumble_Amount property
	 - use the constrain function to constrain Investigator_Car's Rumble_Amount property to values between 0.09 and 1
	 - call the turnover_car_engine function passing Investigator_Car as an argument
	*/
	Investigator_Car.Distance_Driven += Investigator_Car.Speed_Amount;
	Investigator_Car.Rumble_Amount += random(-0.03, 0.03);
	Investigator_Car.Rumble_Amount = constrain(Investigator_Car.Rumble_Amount, 0.09, 1);
	turnover_car_engine(Investigator_Car);
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Investigator_Car;

var roadWidth = 400;
var roadLeftEdge = 200;
var carImages = {};


function preload()
{
	carImages.detective = loadImage("cars/detective.png");
}

function setup()
{
	createCanvas(800,800);

	Investigator_Car = 
	{
		X_Pos: roadLeftEdge + roadWidth/4,
		Y_Pos: 300,
		Distance_Driven: 0,
		Speed_Amount: 3,
		Rumble_Amount: 0,
		Car_Variety: 'detective',
		Licence_Plate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);


	drive_car();


	drawRoad();
	drawCars();
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad()
{
	stroke(100);
	fill(50);
	rect(roadLeftEdge,0,roadWidth,800);
	stroke(255);

	for(var i = -1; i < 20; i++)
	{
		line(
		roadLeftEdge + roadWidth/2 , i * 100 + (Investigator_Car.Distance_Driven%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (Investigator_Car.Distance_Driven%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(Investigator_Car);
	image
	(
		carImages["detective"],
		Investigator_Car.X_Pos - carImages["detective"].width/2 + random(-Investigator_Car.Rumble_Amount, Investigator_Car.Rumble_Amount),
		Investigator_Car.Y_Pos + random(-Investigator_Car.Rumble_Amount, Investigator_Car.Rumble_Amount)
	);

}

function turnover_car_engine(car)
{

	car.exhaust.push({size: 2, x: car.X_Pos, y: car.Y_Pos + carImages[car.Car_Variety].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.Speed_Amount/3);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height)
		{
			car.exhaust.splice(i,1);
		}
	}
}


function drawExhaust(car)
{
		noStroke();
		for(var i = 0; i < car.exhaust.length; i++)
		{
				var alpha = map(car.exhaust[i].size, 0, 40, 50,0);
				fill(125,alpha);
				ellipse(car.exhaust[i].x + 20, car.exhaust[i].y , car.exhaust[i].size);

		}
}
