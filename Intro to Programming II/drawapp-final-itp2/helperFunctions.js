var undoStack = []; //global variable to store the undo stack
var redoStack = []; //global variable to store the redo stack

function HelperFunctions() {
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

// Function to save the current canvas state
function saveCanvasState() {
  // Ensure we don't exceed memory by limiting the stack size
  if (undoStack.length >= 20) {
    undoStack.shift(); // Remove the oldest state
  }

  // Save the current canvas state
  undoStack.push(get()); // 'get()' captures the current canvas
}

// Undo function
function undo() {
  // Logic to undo the last action
  // Save the current state to the redo stack before undoing
  redoStack.push(get()); // Adding the current canvas state to the redo stack before undoing
  background(255, 255, 255);
  loadPixels();
  if (undoStack.length > 0) {
    // Pop the last state from the undo stack
    undoStack.pop();
    let lastState = undoStack.pop(); // Popping twice to get the previous state

    // Load the last state onto the canvas
    image(lastState, 0, 0);
  }
}

// Redo function
function redo() {
  // Logic to redo the previously undone action
  if (redoStack.length > 0) {
    // Pop the last state from the redo stack
    let redoState = redoStack.pop();

    // Save the current state to the undo stack before redoing
    undoStack.push(get());

    // Load the redo state onto the canvas
    image(redoState, 0, 0);
  }
}

// Function to check if the mouse is within the canvas bounds
function mousePressOnCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

function mouseReleased() {
  saveCanvasState();
}

// End of added code
