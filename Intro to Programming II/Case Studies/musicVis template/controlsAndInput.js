//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//???
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		if (!this.playbackButton.hitCheck()) {
			// If not clicked, toggle fullscreen mode
			let fs = fullscreen(); // Get the current fullscreen state
			fullscreen(!fs); // Set to the opposite state
		}
		// If the button was clicked, the hitCheck method will handle the pla
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){

			text("Select a visualisation:", 100, 30);
			this.menu();
		}	
		pop();

	};

	this.menu = function(){
		// Start the y position offset for the first menu item
		let yPos = 78;
		// Loop over the visuals array in the vis object
		for (var i = 0; i < vis.visuals.length; i++) {
			// Write each visualisation name to the screen with a number prefix
			text((i + 1) + ": " + vis.visuals[i].name, 100, yPos);
			// Increment the y position for the next item
			yPos += 50;
		}
	};	
}


