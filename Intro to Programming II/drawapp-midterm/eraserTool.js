function eraserTool() {
  this.name = "eraserTool";
  this.icon = "assets/eraser.jpg"; // Ensure you have an eraser icon in your assets directory

  var eraserSize = 10; // Default eraser size

  this.draw = function () {
    // No fill is needed as we are erasing
    noFill();

    // If the mouse is pressed and within the canvas
    if (mouseIsPressed && mousePressOnCanvas()) {
      // Loop over a square of pixels centered at the mouse position
      loadPixels();
      for (let x = mouseX - eraserSize; x < mouseX + eraserSize; x++) {
        for (let y = mouseY - eraserSize; y < mouseY + eraserSize; y++) {
          // Calculate the index for the pixels array from x and y
          let index = (x + y * width) * 4;
          // Set the alpha value of this pixel to fully transparent
          pixels[index + 3] = 0;
        }
      }
      updatePixels();
    }
  };

  // Function to populate the options for the eraser tool
  this.populateOptions = function () {
    // HTML for eraser size slider
    var sliderHTML =
      "<label for='eraserSizeSlider'>Eraser Size:</label>" +
      "<input type='range' id='eraserSizeSlider' min='5' max='50' value='" +
      eraserSize +
      "' class='slider'>";
    select(".options").html(sliderHTML);

    // Event handler for eraser size slider
    select("#eraserSizeSlider").input(function () {
      eraserSize = this.value();
    });
  };

  // Function to handle the deselection of the eraser tool
  this.unselectTool = function () {
    select(".options").html(""); // Clear options
  };
}

// Helper function to check if the mouse is within the canvas
function mousePressOnCanvas() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
}
