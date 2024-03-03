function eraserTool() {
  this.name = "eraserTool";
  this.icon = "assets/eraser.jpg";

  var eraserSize = 10; // Default eraser size

  // Method to handle drawing with the eraser tool
  this.draw = function () {
    if (mouseIsPressed && mousePressOnCanvas()) {
      stroke(255); // Set stroke color to white for the eraser
      strokeWeight(eraserSize); // Set the thickness of the eraser line
      line(mouseX, mouseY, pmouseX, pmouseY); // Draw a line from the previous mouse position to the current position
    }
  };

  // Function to populate the options for the eraser tool
  this.populateOptions = function () {
    // Create a slider for the eraser size
    var sliderHTML =
      "<label for='eraserSizeSlider'>Eraser Size:</label>" +
      "<input type='range' id='eraserSizeSlider' min='5' max='100' value='" +
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
