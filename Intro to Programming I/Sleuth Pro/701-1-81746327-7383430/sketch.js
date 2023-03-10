/*

Officer: 7383430
CaseNum: 701-1-81746327-7383430

Case 701 - Credible cat thief - stage 2

Kid they need you down at the precinct again.
This time it's a sneaky cat thief who has been absconding with the neighbourhoods felines for some time.
Luckily old Mrs Olivetti caught a glimpse of them as they disappeared over her back fence.
We’ve a bunch of likely characters lined-up but we need your brains to solve the mystery.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspect(suspectObj){}
 - if()

Witness statement:

I remember walking down the street and then I saw them. I remember they had a dark black tattoo. It's hard to say. I'll never forget their black eyes. I think they were more than 168 cm tall. They had white hair. They were quite big, they probably weigh more than 64 Kg. It was very dark and I could barely see, The person I saw was female. I hope I never have to go through that again. 

*/

var usualSuspects = [
	{ 
		"name": "LINETTE OORIN",
		"eyes": "brown",
		"gender": "male",
		"tattoo": "neck",
		"height": 171,
		"weight": 68
	},
	{ 
		"name": "JESSIA CASIMERE",
		"eyes": "grey",
		"gender": "male",
		"tattoo": "facial",
		"height": 192,
		"weight": 80
	},
	{ 
		"name": "JESUS WARMAN",
		"eyes": "black",
		"gender": "female",
		"tattoo": "dark black",
		"height": 172,
		"weight": 69
	},
	{ 
		"name": "JACQUELINE JACQUELIN",
		"eyes": "green",
		"gender": "female",
		"tattoo": "sword",
		"height": 178,
		"weight": 78
	},
	{ 
		"name": "LAKESHA TINTLE",
		"eyes": "black",
		"gender": "female",
		"tattoo": "bull",
		"height": 185,
		"weight": 92
	}
];

var myFont;
var backgroundImg;

function preload() {
  myFont = loadFont('SpecialElite.ttf');
  backgroundImg = loadImage("Background.png");
}

function setup()
{
	createCanvas(640,480);
	textFont(myFont);
}

// Declare your function here
function checkSuspect(suspectObj){
	if (suspectObj.tattoo == "dark black" && suspectObj.eyes == "black" && suspectObj.height > 168 && suspectObj.weight > 64 && suspectObj.gender == "female") {
		return true;
	}
	
	return false;
}


function draw()
{
  //You don't need to alter this code
  image(backgroundImg, 0, 0);

  for(let i = 0 ; i < usualSuspects.length; i++){
    if(checkSuspect(usualSuspects[i]) == true){
      fill(255,0,0);
      text(usualSuspects[i].name + " is guilty!", 60, 60 + i * 20);
    }else{
      fill(0,155,0);
      text(usualSuspects[i].name + " is not guilty", 60, 60 + i * 20 );
    }
  }
}
