let video;
let snapshot;
let processedSnapshot;
let button;
let resetButton;
const cols = 3;
const rows = 5;
const boxWidth = 160;
const boxHeight = 120;
let snapshotTaken = false; // Flag to track if snapshot is taken

function setup() {
  createCanvas(cols * boxWidth, rows * boxHeight);
  video = createCapture(VIDEO);
  video.size(boxWidth, boxHeight);
  video.hide();
  
  snapshot = createGraphics(boxWidth, boxHeight); // Create buffer for a single frame snapshot
  processedSnapshot = createGraphics(boxWidth, boxHeight); // Buffer for processing
  snapshot.pixelDensity(1); // Fix pixel density issue
  processedSnapshot.pixelDensity(1);
  
  button = createButton('Take Snapshot');
  button.position(boxWidth * 2 + 10, 10);
  button.mousePressed(takeSnapshot);
  
  resetButton = createButton('Reset to Live Feed');
  resetButton.position(boxWidth * 2 + 10, 40);
  resetButton.mousePressed(resetLiveFeed);
}

function draw() {
  background(220);
  
  // Draw the grid layout
  drawGrid();
  
  // Display snapshot in box 1 if taken, else show live webcam feed
  if (snapshotTaken) {
    image(snapshot, 0, 0, boxWidth, boxHeight); // Box 1 (updates after snapshot)
  } else {
    image(video, 0, 0, boxWidth, boxHeight); // Show live feed until snapshot is taken
  }
  
  // Display live webcam feed in box 13, 14, and 15 (these remain live)
  image(video, 0, 4 * boxHeight, boxWidth, boxHeight); // Box 13
  image(video, boxWidth, 4 * boxHeight, boxWidth, boxHeight); // Box 14
  image(video, 2 * boxWidth, 4 * boxHeight, boxWidth, boxHeight); // Box 15
  
  // If snapshot is taken, process and display images
  if (snapshotTaken) {
    processGrayscaleAndBrightness();
    image(processedSnapshot, boxWidth, 0, boxWidth, boxHeight); // Box 2 (Grayscale & Brightness)
    
    processColorChannel('red');
    image(processedSnapshot, 0, boxHeight, boxWidth, boxHeight); // Box 4 (Red Channel)
    
    processColorChannel('green');
    image(processedSnapshot, boxWidth, boxHeight, boxWidth, boxHeight); // Box 5 (Green Channel)
    
    processColorChannel('blue');
    image(processedSnapshot, 2 * boxWidth, boxHeight, boxWidth, boxHeight); // Box 6 (Blue Channel)
    
    image(snapshot, 0, 2 * boxHeight, boxWidth, boxHeight); // Box 7 (Threshold R)
    image(snapshot, boxWidth, 2 * boxHeight, boxWidth, boxHeight); // Box 8 (Threshold G)
    image(snapshot, 2 * boxWidth, 2 * boxHeight, boxWidth, boxHeight); // Box 9 (Threshold B)
    image(snapshot, 0, 3 * boxHeight, boxWidth, boxHeight); // Box 10 (Webcam Image Repeat)
    image(snapshot, boxWidth, 3 * boxHeight, boxWidth, boxHeight); // Box 11 (Color Space 1)
    image(snapshot, 2 * boxWidth, 3 * boxHeight, boxWidth, boxHeight); // Box 12 (Color Space 2)
  }
}

function takeSnapshot() {
  snapshot.image(video, 0, 0, boxWidth, boxHeight); // Store a snapshot of the webcam
  snapshot.loadPixels(); // Ensure pixels are updated before processing
  snapshotTaken = true;
}

function resetLiveFeed() {
  snapshotTaken = false; // Reset to live feed mode
}

function processGrayscaleAndBrightness() {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  snapshot.loadPixels();
  
  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index];
      let g = snapshot.pixels[index + 1];
      let b = snapshot.pixels[index + 2];
      
      let gray = (r + g + b) / 3;
      gray = min(gray * 1.2, 255);
      
      processedSnapshot.pixels[index] = gray;
      processedSnapshot.pixels[index + 1] = gray;
      processedSnapshot.pixels[index + 2] = gray;
      processedSnapshot.pixels[index + 3] = 255;
    }
  }
  
  processedSnapshot.updatePixels();
}

function processColorChannel(channel) {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  snapshot.loadPixels();
  
  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index];
      let g = snapshot.pixels[index + 1];
      let b = snapshot.pixels[index + 2];
      
      if (channel === 'red') {
        processedSnapshot.pixels[index] = r;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === 'green') {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = g;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === 'blue') {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = b;
      }
      
      processedSnapshot.pixels[index + 3] = 255; // Alpha (fully opaque)
    }
  }
  
  processedSnapshot.updatePixels();
}

function drawGrid() {
  stroke(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noFill();
      rect(i * boxWidth, j * boxHeight, boxWidth, boxHeight);
    }
  }
}
