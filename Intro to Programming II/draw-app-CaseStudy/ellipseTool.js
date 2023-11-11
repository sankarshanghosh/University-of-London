function EllipseTool() {
    this.icon = "assets/ellipse.jpg"; // Icon for the ellipse tool
    this.name = "Ellipse"; // Name of the tool
  
    var startX = -1; // X-coordinate of the starting point of the ellipse
    var startY = -1; // Y-coordinate of the starting point of the ellipse
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
          ellipseMode(CORNER); // Ellipse drawn from the upper-left corner
          ellipse(startX, startY, mouseX - startX, mouseY - startY); // Draw the ellipse
        }
      } else if (drawing) {
        drawing = false;
        startX = -1;
        startY = -1;
      }
    };
  }
  