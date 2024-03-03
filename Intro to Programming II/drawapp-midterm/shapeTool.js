// I adapted and added this code
function shapeTool(colourPalette) {
  this.name = "shapeTool";
  this.icon = "assets/shape.jpg";

  var editMode = false;
  var currentShape = [];
  var fillColor; //Variable to store the selected fill color

  noFill();
  loadPixels();

  // Separate function to handle filling the shape
  function fillShape() {
    if (fillColor) {
      fill(fillColor);
    } else {
      noFill();
    }
    this.draw();
    beginShape();
    for (var i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
    }
    endShape(); // close the shape to fill it
    loadPixels();
  }

  // Method to create options for the shape tool
  this.populateOptions = function () {
    // HTML for the buttons and color picker in the options area
    var buttonHTML =
      "<div id='buttonContainer' style='margin-bottom: 8px;'>" +
      "<button id='editShapeButton'>Edit Shape</button>" +
      "<button id='finishShapeButton' style='margin-left: 5px;'>Finish Shape</button>" +
      "</div>";

    // HTML for the color picker
    var colorPickerHTML =
      "<div id='colorPickerContainer'>" +
      "<label for='fillColorPicker' style='display:block;'>Fill Color:</label>" +
      "<input type='color' id='fillColorPicker' value='#ff0000'>" +
      "</div>";

    // Combine the HTML for the buttons and color picker
    select(".options").html(buttonHTML + colorPickerHTML);

    // Event handler for "Edit Shape" button
    select("#editShapeButton").mousePressed(() => {
      editMode = !editMode;
      var btnText = editMode ? "Add Vertices" : "Edit Shape";
      select("#editShapeButton").html(btnText);
    });

    // Event handler to update fillColor when a new color is picked
    select("#fillColorPicker").input(function () {
      fillColor = this.elt.value;
    });

    // Event handler for "Finish Shape" button
    select("#finishShapeButton").mousePressed(() => {
      editMode = false;
      fillShape(); // Calling a separate function to handle filling the shape
      currentShape = []; // Reset the current shape
      select(".options").html(""); // Clear options
    });
  };

  // Method to handle the deselection of the shape tool
  this.unselectTool = function () {
    // Clear the options area when another tool is selected
    select(".options").html("");
    updatePixels();
    currentShape = []; // Reset the current shape
    editMode = false; // Reset edit mode
  };

  // The draw method for the shape tool
  this.draw = function () {
    updatePixels();
    if (mouseIsPressed && mousePressOnCanvas()) {
      if (!editMode) {
        // If not in edit mode, add a vertex where the mouse is clicked
        currentShape.push({ x: mouseX, y: mouseY });
      } else {
        // If in edit mode, check if a vertex is near the mouse and move it
        for (var i = 0; i < currentShape.length; i++) {
          if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
            currentShape[i].x = mouseX;
            currentShape[i].y = mouseY;
          }
        }
      }
    }

    // Draw the shape using the vertices in currentShape
    beginShape();
    for (var i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
      if (editMode) {
        // Highlight the vertex if in edit mode
        fill("red");
        ellipse(currentShape[i].x, currentShape[i].y, 10);
        noFill();
      }
    }
    endShape();
  };
}
// End of addition
