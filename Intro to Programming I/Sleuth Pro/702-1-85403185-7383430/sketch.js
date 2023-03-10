/*

Officer: 7383430
CaseNum: 702-1-85403185-7383430

Case 702 - The case of Vanishing Vannevar
Stage 2 - Downtown traffic

“All units: Vannevar is heading into the downtown area. Heavy traffic ahead. Drive safely.”
Complete the helper functions below to drive the car and avoid other vehicles. Keep on it kid.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of DetectiveVehicle and the cars in
carObject_list to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Drive_Vehicle()
{
	/*
	This function should do the following: 
	 - increment DetectiveVehicle's KmsAmt property by its SpeedAmount property 
	 - add a random amount between -0.1 and 0.1 to DetectiveVehicle's EngineVibrateAmount property
	 - use the constrain function to constrain DetectiveVehicle's EngineVibrateAmount property to values between 0.09 and 1.22
	 - call the Drive_Car_motor function passing DetectiveVehicle as an argument
	*/
	DetectiveVehicle.KmsAmt += DetectiveVehicle.SpeedAmount;
	DetectiveVehicle.EngineVibrateAmount += random(-0.1, 0.1);
	DetectiveVehicle.EngineVibrateAmount = constrain(DetectiveVehicle.EngineVibrateAmount, 0.09, 1.22);
	Drive_Car_motor(DetectiveVehicle);
}


function Change_Lanes(car)
{
	/*
	This function should do the following: 
	 - move car from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use lane_position_a and lane_position_b to effect the change.
	 - finally you should return car at the end of the function.
	 hint: You will need to modify the XCoordinate property of car.
	*/
}


function CheckVehicle_Ahead( car )
{
	/*
	This function should do the following: 
	 - determine if car is in the same lane and less than 200px behind any of the cars in carObject_list.
	 - do this by traversing carObject_list and comparing each car's KmsAmt property to that of car.
	 - if you find a car that matches these requirements then return the index representing the car's position in carObject_list. Otherwise return false.
	*/
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var DetectiveVehicle;

var roadWidth;
var roadLeftEdge;
var lane_position_a;
var lane_position_b;
var carImages = {};

var carObject_list = [
{ XCoordinate: 300, YCoordinate: 0, KmsAmt: -200, VehicleType: 'redCar', NumberPlate: 'F0Y98N', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 200, VehicleType: 'blueCar', NumberPlate: 'IFDSNW', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 600, VehicleType: 'greenCar', NumberPlate: 'SE2HVU', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 1000, VehicleType: 'greenCar', NumberPlate: 'CMC004', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 1400, VehicleType: 'blueCar', NumberPlate: 'WT7DHI', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 1800, VehicleType: 'blueCar', NumberPlate: '4SFJJV', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 2200, VehicleType: 'whiteCar', NumberPlate: 'KTHK5J', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 2600, VehicleType: 'redCar', NumberPlate: '7KN3D2', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 3000, VehicleType: 'whiteCar', NumberPlate: 'P18K0M', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 3400, VehicleType: 'blueCar', NumberPlate: '00TO8V', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 3800, VehicleType: 'redCar', NumberPlate: '4VLWK6', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 4200, VehicleType: 'blueCar', NumberPlate: 'HOQ1E5', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 4600, VehicleType: 'greenCar', NumberPlate: 'QHM19F', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 5000, VehicleType: 'greenCar', NumberPlate: '7IMGGH', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 5400, VehicleType: 'greenCar', NumberPlate: '574OAJ', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 5800, VehicleType: 'redCar', NumberPlate: '5P425V', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 6200, VehicleType: 'greenCar', NumberPlate: 'OWOOQY', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 300, YCoordinate: 0, KmsAmt: 6600, VehicleType: 'whiteCar', NumberPlate: 'H0XI8H', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 7000, VehicleType: 'redCar', NumberPlate: '2WFKJC', SpeedAmount: 2, exhaust: [  ]} , { XCoordinate: 500, YCoordinate: 0, KmsAmt: 7400, VehicleType: 'greenCar', NumberPlate: 'ESSZ21', SpeedAmount: 2, exhaust: [  ]} 
];



function preload()
{
	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for(var i = 0; i < carTypes.length; i++)
	{
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup()
{
	createCanvas(800,800);

	roadWidth = 400;
	roadLeftEdge = 200;
	lane_position_a = 300;
	lane_position_b = 500;

	DetectiveVehicle = 
	{
		XCoordinate: roadLeftEdge + roadWidth/4,
		YCoordinate: 550,
		KmsAmt: 0,
		SpeedAmount: 3,
		EngineVibrateAmount: 0,
		VehicleType: 'detective',
		NumberPlate: '5L3UTH',
		exhaust: []
	}


}



function draw()
{
	background(0);



	drawRoad();
	drawCars();

	////////////////////// HANDLE DETECTIVE /////////////////////////


	Drive_Vehicle();
	var b2b = CheckVehicle_Ahead( DetectiveVehicle );
	if(b2b)Change_Lanes(DetectiveVehicle);


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for(var i = 0; i < carObject_list.length; i++)
	{
		carObject_list[i].KmsAmt += carObject_list[i].SpeedAmount;
		carObject_list[i].YCoordinate = DetectiveVehicle.YCoordinate - carObject_list[i].KmsAmt + DetectiveVehicle.KmsAmt;
	}

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
		roadLeftEdge + roadWidth/2 , i * 100 + (DetectiveVehicle.KmsAmt%100),
		roadLeftEdge + roadWidth/2 , i * 100 + 70 + (DetectiveVehicle.KmsAmt%100)
		);
	}
}

function drawCars()
{
	//draw the detective car

	image
	drawExhaust(DetectiveVehicle);
	image
	(
		carImages["detective"],
		DetectiveVehicle.XCoordinate - carImages["detective"].width/2 + random(-DetectiveVehicle.EngineVibrateAmount, DetectiveVehicle.EngineVibrateAmount),
		DetectiveVehicle.YCoordinate + random(-DetectiveVehicle.EngineVibrateAmount, DetectiveVehicle.EngineVibrateAmount)
	);

	//draw all other cars

	for(var i = 0; i < carObject_list.length; i ++)
	{
		if(carObject_list[i].YCoordinate < height && carObject_list[i].YCoordinate > -height/2)
		{
			image(
			carImages[carObject_list[i].VehicleType],
			carObject_list[i].XCoordinate - carImages[carObject_list[i].VehicleType].width/2,
			carObject_list[i].YCoordinate
			);
			Drive_Car_motor(carObject_list[i]);

			drawExhaust(carObject_list[i]);
		}
	}

}

function Drive_Car_motor(car)
{

	car.exhaust.push({size: 2, x: car.XCoordinate, y: car.YCoordinate + carImages[car.VehicleType].height});

	for(var i = car.exhaust.length -1; i >= 0 ; i--)
	{

		car.exhaust[i].y  += max(0.75, car.SpeedAmount/3);
		if(car.VehicleType != "detective")car.exhaust[i].y += (DetectiveVehicle.SpeedAmount - car.SpeedAmount);
		car.exhaust[i].x += random(-1,1);
		car.exhaust[i].size += 0.5;

		if(car.exhaust[i].y  > height || car.exhaust[i].y < 0)
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
