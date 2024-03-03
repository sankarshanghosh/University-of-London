function HelperFunctions() {
  //Jquery click events. Notice that there is no this. at the
  //start we don't need to do that here because the event will
  //be added to the button and doesn't 'belong' to the object

  //event handler for the clear button event. Clears the screen
  select("#clearButton").mouseClicked(function () {
    background(255, 255, 255);
    //call loadPixels to update the drawing state
    //this is needed for the mirror tool
    loadPixels();
  });

  //event handler for the save image button. saves the canvsa to the local file system.
  select("#saveImageButton").mouseClicked(function () {
    saveCanvas("myPicture", "jpg");
  });
  // I added this below
  // Event handler for the undo button
  select("#undoButton").mouseClicked(function () {
    // Call a function to handle the undo action
    undo();
  });

  // Event handler for the redo button
  select("#redoButton").mouseClicked(function () {
    // Call a function to handle the redo action
    redo();
  });
}

// Undo function
function undo() {
  // Logic to undo the last action
  // This will typically involve popping from the undo stack and redrawing the canvas
}

// Redo function
function redo() {
  // Logic to redo the previously undone action
  // This will typically involve popping from the redo stack and redrawing the canvas
}

// Function to check if the mouse is within the canvas bounds
function mousePressOnCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}
// End of added code
