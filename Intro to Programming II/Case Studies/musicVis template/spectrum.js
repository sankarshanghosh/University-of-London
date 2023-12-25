function Spectrum(){
	this.name = "spectrum";

	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		for (var i = 0; i < spectrum.length; i++){
			// The x position of each bar is based on the index
			var x = map(i, 0, spectrum.length, 0, width);
	
			// Map the amplitude to the length of the bars horizontally
			var length = map(spectrum[i], 0, 255, 0, width);
	
			// Set the color based on the amplitude value
			var redValue = spectrum[i];
			var greenValue = map(spectrum[i], 0, 255, 255, 0); // Inverse amplitude for green value
	
			fill(redValue, greenValue, 0);
	
			// Draw the rectangle bars horizontally from the left side
			rect(0, x, length, height / spectrum.length);
		}
	
		pop();
	};
	
}
