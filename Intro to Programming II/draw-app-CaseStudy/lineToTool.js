// Constructor function for LineToTool object
function LineToTool() {
  // Properties of the LineToTool object
  this.icon = "assets/lineTo.jpg"; // Icon for the tool (file path to the image)
  this.name = "LineTo"; // Name of the tool

  // Variables to store initial mouse coordinates and drawing state
  var startMouseX = -1; // X-coordinate of the starting point of the line
  var startMouseY = -1; // Y-coordinate of the starting point of the line
  var drawing = false; // Flag to indicate whether the user is currently drawing

  // Method to draw the line tool
  this.draw = function () {
    // Check if the mouse button is pressed
    if (mouseIsPressed) {
      // If this is the initial click, set start coordinates and start drawing
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true; // Set drawing flag to true
        loadPixels(); // Load the current pixels of the canvas for manipulation
      } else {
        updatePixels(); // Update the canvas with the loaded pixels (restoring the original state)
        line(startMouseX, startMouseY, mouseX, mouseY); // Draw a line from start point to current mouse position
      }
    }
    // If the mouse button is released and drawing was in progress
    else if (drawing) {
      drawing = false; // Reset drawing flag to false
      startMouseX = -1; // Reset start X-coordinate
      startMouseY = -1; // Reset start Y-coordinate
    }
  };
}
