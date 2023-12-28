// I adapted and added this code
function shapeTool() {
  this.name = "shapeTool";
  this.icon = "assets/shape.jpg";

  var editMode = false;
  var currentShape = [];

  noFill();
  loadPixels();

  // Method to create options for the shape tool
  this.populateOptions = function() {
    // Create the "Edit Shape" button
    var buttonHTML = "<button id='editShapeButton'>Edit Shape</button>";
    // Create the "Finish Shape" button
    buttonHTML += "<button id='finishShapeButton' style='margin-left: 5px;'>Finish Shape</button>";
    select('.options').html(buttonHTML);

    // Event handler for "Edit Shape" button
    select("#editShapeButton").mousePressed(() => {
      editMode = !editMode;
      var btnText = editMode ? "Add Vertices" : "Edit Shape";
      select("#editShapeButton").html(btnText);
    });

    // Event handler for "Finish Shape" button
    select("#finishShapeButton").mousePressed(() => {
      editMode = false;
      // Finalize the shape
      this.draw();
      loadPixels();
      currentShape = []; // Reset the current shape
      select('.options').html(""); // Clear options
    });
  };

  // Method to handle the deselection of the shape tool
  this.unselectTool = function() {
    // Clear the options area when another tool is selected
    select('.options').html("");
    updatePixels();
    currentShape = []; // Reset the current shape
    editMode = false; // Reset edit mode
  };

  // The draw method for the shape tool
  this.draw = function() {
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
        fill('red');
        ellipse(currentShape[i].x, currentShape[i].y, 10);
        noFill();
      }
    }
    endShape();
  };
}
// End of addition