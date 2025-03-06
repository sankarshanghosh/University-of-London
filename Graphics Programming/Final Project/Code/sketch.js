let video;
let snapshot;
let processedSnapshot;
let ycbcrSnapshot;
let hsvSnapshot;
let button;
let resetButton;
let thresholdSlider;
const cols = 3;
const rows = 5;
const boxWidth = 160;
const boxHeight = 120;
let snapshotTaken = false;
let thresholdValue = 128;

function setup() {
  createCanvas(cols * boxWidth, rows * boxHeight);
  video = createCapture(VIDEO);
  video.size(boxWidth, boxHeight);
  video.hide();

  snapshot = createGraphics(boxWidth, boxHeight);
  processedSnapshot = createGraphics(boxWidth, boxHeight);
  ycbcrSnapshot = createGraphics(boxWidth, boxHeight);
  hsvSnapshot = createGraphics(boxWidth, boxHeight);
  snapshot.pixelDensity(1);
  processedSnapshot.pixelDensity(1);
  ycbcrSnapshot.pixelDensity(1);
  hsvSnapshot.pixelDensity(1);

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
    processYCbCr();
    image(processedSnapshot, boxWidth, 3 * boxHeight, boxWidth, boxHeight);
    processHSV();
    image(processedSnapshot, 2 * boxWidth, 3 * boxHeight, boxWidth, boxHeight);

    processThresholdingYCbCr();
    image(processedSnapshot, boxWidth, 4 * boxHeight, boxWidth, boxHeight);
    processThresholdingHSV();
    image(processedSnapshot, 2 * boxWidth, 4 * boxHeight, boxWidth, boxHeight);
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

function processYCbCr() {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  snapshot.loadPixels();
  ycbcrSnapshot.clear();
  ycbcrSnapshot.loadPixels();

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index];
      let g = snapshot.pixels[index + 1];
      let b = snapshot.pixels[index + 2];

      let yValue = 0.299 * r + 0.587 * g + 0.114 * b;
      let cb = 128 + (-0.168736 * r - 0.331264 * g + 0.5 * b);
      let cr = 128 + (0.5 * r - 0.418688 * g - 0.081312 * b);

      processedSnapshot.pixels[index] = yValue;
      processedSnapshot.pixels[index + 1] = cb;
      processedSnapshot.pixels[index + 2] = cr;
      processedSnapshot.pixels[index + 3] = 255;

      ycbcrSnapshot.pixels[index] = yValue;
      ycbcrSnapshot.pixels[index + 1] = cb;
      ycbcrSnapshot.pixels[index + 2] = cr;
      ycbcrSnapshot.pixels[index + 3] = 255;
    }
  }

  processedSnapshot.updatePixels();
  ycbcrSnapshot.updatePixels();
}

function processHSV() {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  snapshot.loadPixels();
  hsvSnapshot.clear();
  hsvSnapshot.loadPixels();

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index] / 255;
      let g = snapshot.pixels[index + 1] / 255;
      let b = snapshot.pixels[index + 2] / 255;

      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let delta = max - min;

      let h = 0;
      if (delta !== 0) {
        if (max === r) {
          h = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
          h = 60 * ((b - r) / delta + 2);
        } else {
          h = 60 * ((r - g) / delta + 4);
        }
      }
      if (h < 0) h += 360;
      let s = max === 0 ? 0 : delta / max;
      let v = max;

      processedSnapshot.pixels[index] = (h / 360) * 255;
      processedSnapshot.pixels[index + 1] = s * 255;
      processedSnapshot.pixels[index + 2] = v * 255;
      processedSnapshot.pixels[index + 3] = 255;

      hsvSnapshot.pixels[index] = (h / 360) * 255;
      hsvSnapshot.pixels[index + 1] = s * 255;
      hsvSnapshot.pixels[index + 2] = v * 255;
      hsvSnapshot.pixels[index + 3] = 255;
    }
  }

  processedSnapshot.updatePixels();
  hsvSnapshot.updatePixels();
}

function processThresholdingYCbCr() {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  ycbcrSnapshot.loadPixels();

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = ycbcrSnapshot.pixels[index];
      let g = ycbcrSnapshot.pixels[index + 1];
      let b = ycbcrSnapshot.pixels[index + 2];

      let yValue = 0.299 * r + 0.587 * g + 0.114 * b;
      let cb = 128 + (-0.168736 * r - 0.331264 * g + 0.5 * b);
      let cr = 128 + (0.5 * r - 0.418688 * g - 0.081312 * b);

      if (yValue < thresholdValue) {
        yValue = 0;
      }

      let newR = yValue + 1.402 * (cr - 128);
      let newG = yValue - 0.344136 * (cb - 128) - 0.714136 * (cr - 128);
      let newB = yValue + 1.772 * (cb - 128);

      processedSnapshot.pixels[index] = constrain(newR, 0, 255);
      processedSnapshot.pixels[index + 1] = constrain(newG, 0, 255);
      processedSnapshot.pixels[index + 2] = constrain(newB, 0, 255);
      processedSnapshot.pixels[index + 3] = 255;
    }
  }
  processedSnapshot.updatePixels();
}

function processThresholdingHSV() {
  processedSnapshot.clear();
  processedSnapshot.loadPixels();
  hsvSnapshot.loadPixels();

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;

      // Use the already computed HSV snapshot
      let h = hsvSnapshot.pixels[index];
      let s = hsvSnapshot.pixels[index + 1];
      let v = hsvSnapshot.pixels[index + 2];

      // Apply thresholding to the Value (V) channel
      v = v >= thresholdValue ? v : 0;

      // Keep original HSV colors but with thresholded V
      processedSnapshot.pixels[index] = h;
      processedSnapshot.pixels[index + 1] = s;
      processedSnapshot.pixels[index + 2] = v;
      processedSnapshot.pixels[index + 3] = 255; // Full alpha
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
