let video;
let snapshot;
let processedSnapshot;
let button;
let resetButton;
let thresholdSlider;
const cols = 3;
const rows = 5;
const boxWidth = 160;
const boxHeight = 120;
let snapshotTaken = false; // Flag to track if snapshot is taken
let thresholdValue = 128; // Default threshold value

function setup() {
  createCanvas(cols * boxWidth, rows * boxHeight);
  video = createCapture(VIDEO);
  video.size(boxWidth, boxHeight);
  video.hide();

  snapshot = createGraphics(boxWidth, boxHeight); // Create buffer for a single frame snapshot
  processedSnapshot = createGraphics(boxWidth, boxHeight); // Buffer for processing
  snapshot.pixelDensity(1); // Fix pixel density issue
  processedSnapshot.pixelDensity(1);

  button = createButton("Take Snapshot");
  button.position(boxWidth * 2 + 10, 10);
  button.mousePressed(takeSnapshot);

  resetButton = createButton("Reset to Live Feed");
  resetButton.position(boxWidth * 2 + 10, 40);
  resetButton.mousePressed(resetLiveFeed);

  thresholdSlider = createSlider(0, 255, 128);
  thresholdSlider.position(boxWidth * 2 + 10, 70);
  thresholdSlider.input(() => (thresholdValue = thresholdSlider.value()));
}

function draw() {
  background(220);
  drawGrid();

  if (snapshotTaken) {
    image(snapshot, 0, 0, boxWidth, boxHeight);
  } else {
    image(video, 0, 0, boxWidth, boxHeight);
  }

  image(video, 0, 4 * boxHeight, boxWidth, boxHeight);
  image(video, boxWidth, 4 * boxHeight, boxWidth, boxHeight);
  image(video, 2 * boxWidth, 4 * boxHeight, boxWidth, boxHeight);

  if (snapshotTaken) {
    processGrayscaleAndBrightness();
    image(processedSnapshot, boxWidth, 0, boxWidth, boxHeight);

    processColorChannel("red");
    image(processedSnapshot, 0, boxHeight, boxWidth, boxHeight);

    processColorChannel("green");
    image(processedSnapshot, boxWidth, boxHeight, boxWidth, boxHeight);

    processColorChannel("blue");
    image(processedSnapshot, 2 * boxWidth, boxHeight, boxWidth, boxHeight);

    processThresholding("red");
    image(processedSnapshot, 0, 2 * boxHeight, boxWidth, boxHeight);

    processThresholding("green");
    image(processedSnapshot, boxWidth, 2 * boxHeight, boxWidth, boxHeight);

    processThresholding("blue");
    image(processedSnapshot, 2 * boxWidth, 2 * boxHeight, boxWidth, boxHeight);

    image(snapshot, 0, 3 * boxHeight, boxWidth, boxHeight);
    image(snapshot, boxWidth, 3 * boxHeight, boxWidth, boxHeight);
    image(snapshot, 2 * boxWidth, 3 * boxHeight, boxWidth, boxHeight);
  }
}

function takeSnapshot() {
  snapshot.image(video, 0, 0, boxWidth, boxHeight);
  snapshot.loadPixels();
  snapshotTaken = true;
}

function resetLiveFeed() {
  snapshotTaken = false;
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

      if (channel === "red") {
        processedSnapshot.pixels[index] = r;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === "green") {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = g;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === "blue") {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = b;
      }

      processedSnapshot.pixels[index + 3] = 255;
    }
  }

  processedSnapshot.updatePixels();
}

function processThresholding(channel) {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  snapshot.loadPixels();

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index];
      let g = snapshot.pixels[index + 1];
      let b = snapshot.pixels[index + 2];

      if (channel === "red") {
        processedSnapshot.pixels[index] = r >= thresholdValue ? 255 : 0;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === "green") {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = g >= thresholdValue ? 255 : 0;
        processedSnapshot.pixels[index + 2] = 0;
      } else if (channel === "blue") {
        processedSnapshot.pixels[index] = 0;
        processedSnapshot.pixels[index + 1] = 0;
        processedSnapshot.pixels[index + 2] = b >= thresholdValue ? 255 : 0;
      }

      processedSnapshot.pixels[index + 3] = 255;
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