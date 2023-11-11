function RectangleTool() {
    this.icon = "assets/rectangle.jpg"; // Icon for the rectangle tool
    this.name = "Rectangle"; // Name of the tool
  
    var startX = -1; // X-coordinate of the starting point of the rectangle
    var startY = -1; // Y-coordinate of the starting point of the rectangle
    var drawing = false; // Flag to indicate whether the user is currently drawing
  
    this.draw = function() {
      if (mouseIsPressed) {
        if (startX == -1) {
          startX = mouseX;
          startY = mouseY;
          drawing = true;
          loadPixels();
        } else {
          updatePixels();
          noFill();
          stroke(0); // Outline color (black in this case, you can change it)
          rect(startX, startY, mouseX - startX, mouseY - startY); // Draw the rectangle
        }
      } else if (drawing) {
        drawing = false;
        startX = -1;
        startY = -1;
      }
    };
  }
  