let video; // Variable to store the video capture
let snapshot; // Variable to store the snapshot image
let processedSnapshot; // Variable to store the processed snapshot image
let button; // Button to take a snapshot
let resetButton; // Button to reset to live feed
let thresholdSlider; // Slider to adjust the threshold value
const cols = 3; // Number of columns in the grid
const rows = 5; // Number of rows in the grid
const boxWidth = 160; // Width of each box in the grid
const boxHeight = 120; // Height of each box in the grid
let snapshotTaken = false; // Flag to check if a snapshot has been taken
let thresholdValue = 128; // Initial threshold value
let classifier; // Variable to store the face detection classifier
let detector; // Variable to store the face detection detector
let detectedFace; // Variable to store the detected face
let effectType = "none"; // Default effect

// Load the face detection classifier
classifier = objectdetect.frontalface;

function setup() {
  createCanvas(cols * boxWidth, rows * boxHeight); // Create the canvas
  video = createCapture(VIDEO); // Capture video from the webcam
  video.size(boxWidth, boxHeight); // Set the video size
  video.hide(); // Hide the video element

  detector = new objectdetect.detector(
    video.width,
    video.height,
    1.1,
    objectdetect.frontalface
  ); // Create a face detector

  snapshot = createGraphics(boxWidth, boxHeight); // Create a graphics buffer for the snapshot
  processedSnapshot = createGraphics(boxWidth, boxHeight); // Create a graphics buffer for the processed snapshot
  snapshot.pixelDensity(1); // Set pixel density for the snapshot
  processedSnapshot.pixelDensity(1); // Set pixel density for the processed snapshot

  button = createButton("Take Snapshot"); // Create the "Take Snapshot" button
  button.position(boxWidth * 2 + 10, 10); // Position the button
  button.mousePressed(takeSnapshot); // Set the button's mousePressed event

  resetButton = createButton("Reset to Live Feed"); // Create the "Reset to Live Feed" button
  resetButton.position(boxWidth * 2 + 10, 40); // Position the button
  resetButton.mousePressed(resetLiveFeed); // Set the button's mousePressed event

  thresholdSlider = createSlider(0, 255, 128); // Create the threshold slider
  thresholdSlider.position(boxWidth * 2 + 10, 70); // Position the slider
  thresholdSlider.input(() => (thresholdValue = thresholdSlider.value())); // Update threshold value on slider input
}

function draw() {
  background(220); // Set the background color
  drawGrid(); // Draw the grid

  if (snapshotTaken) {
    image(snapshot, 0, 0, boxWidth, boxHeight); // Display the snapshot if taken
  } else {
    image(video, 0, 0, boxWidth, boxHeight); // Display the live video feed
  }

  image(video, 0, 4 * boxHeight, boxWidth, boxHeight); // Display the live video feed for face detection
  detectFaces(); // Detect faces in the live video feed
  if (effectType === "none") {
    drawFaces();
  } else {
    applyFaceEffect(); // This should be called when effectType is updated
  }

  if (snapshotTaken) {
    processGrayscaleAndBrightness(); // Process the snapshot to grayscale and adjust brightness
    image(processedSnapshot, boxWidth, 0, boxWidth, boxHeight); // Display the processed snapshot

    processColorChannel("red"); // Process the red color channel
    image(processedSnapshot, 0, boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processColorChannel("green"); // Process the green color channel
    image(processedSnapshot, boxWidth, boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processColorChannel("blue"); // Process the blue color channel
    image(processedSnapshot, 2 * boxWidth, boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processThresholding("red"); // Apply thresholding to the red channel
    image(processedSnapshot, 0, 2 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processThresholding("green"); // Apply thresholding to the green channel
    image(processedSnapshot, boxWidth, 2 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processThresholding("blue"); // Apply thresholding to the blue channel
    image(processedSnapshot, 2 * boxWidth, 2 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    image(snapshot, 0, 3 * boxHeight, boxWidth, boxHeight); // Display the original snapshot
    processYCbCr(snapshot, processedSnapshot); // Process the snapshot to YCbCr color space
    image(processedSnapshot, boxWidth, 3 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot
    processHSV(snapshot, processedSnapshot); // Process the snapshot to HSV color space
    image(processedSnapshot, 2 * boxWidth, 3 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot

    processThresholdingYCbCr(); // Apply thresholding to the YCbCr color space
    image(processedSnapshot, boxWidth, 4 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot
    processThresholdingHSV(); // Apply thresholding to the HSV color space
    image(processedSnapshot, 2 * boxWidth, 4 * boxHeight, boxWidth, boxHeight); // Display the processed snapshot
  }
}

function takeSnapshot() {
  snapshot.image(video, 0, 0, boxWidth, boxHeight); // Capture the current video frame as a snapshot
  snapshot.loadPixels(); // Load the pixels of the snapshot
  snapshotTaken = true; // Set the snapshotTaken flag to true
}

function resetLiveFeed() {
  snapshotTaken = false; // Reset the snapshotTaken flag to false
}

function processGrayscaleAndBrightness() {
  processedSnapshot.clear(); // Clear the processed snapshot
  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot
  snapshot.loadPixels(); // Load the pixels of the snapshot

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = snapshot.pixels[index];
      let g = snapshot.pixels[index + 1];
      let b = snapshot.pixels[index + 2];

      let gray = (r + g + b) / 3; // Convert to grayscale
      gray = min(gray * 1.2, 255); // Adjust brightness

      processedSnapshot.pixels[index] = gray;
      processedSnapshot.pixels[index + 1] = gray;
      processedSnapshot.pixels[index + 2] = gray;
      processedSnapshot.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }

  processedSnapshot.updatePixels(); // Update the pixels of the processed snapshot
}

function processColorChannel(channel) {
  processedSnapshot.clear(); // Clear the processed snapshot
  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot
  snapshot.loadPixels(); // Load the pixels of the snapshot

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

      processedSnapshot.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }

  processedSnapshot.updatePixels(); // Update the pixels of the processed snapshot
}

function processThresholding(channel) {
  processedSnapshot.clear(); // Clear the processed snapshot
  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot
  snapshot.loadPixels(); // Load the pixels of the snapshot

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

      processedSnapshot.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }

  processedSnapshot.updatePixels(); // Update the pixels of the processed snapshot
}

function processYCbCr(inputImage, outputImage) {
  outputImage.loadPixels(); // Load the pixels of the output image
  inputImage.loadPixels(); // Load the pixels of the input image

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = inputImage.pixels[index];
      let g = inputImage.pixels[index + 1];
      let b = inputImage.pixels[index + 2];

      // Convert RGB to YCbCr
      let yValue = 0.299 * r + 0.587 * g + 0.114 * b;
      let cb = 128 + (-0.168736 * r - 0.331264 * g + 0.5 * b);
      let cr = 128 + (0.5 * r - 0.418688 * g - 0.081312 * b);

      outputImage.pixels[index] = yValue;
      outputImage.pixels[index + 1] = cb;
      outputImage.pixels[index + 2] = cr;
      outputImage.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }

  outputImage.updatePixels(); // Update the pixels of the output image
}

function processHSV(inputImage, outputImage) {
  outputImage.clear(); // Clear the output image
  outputImage.loadPixels(); // Load the pixels of the output image
  inputImage.loadPixels(); // Load the pixels of the input image

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;
      let r = inputImage.pixels[index] / 255;
      let g = inputImage.pixels[index + 1] / 255;
      let b = inputImage.pixels[index + 2] / 255;

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

      outputImage.pixels[index] = (h / 360) * 255;
      outputImage.pixels[index + 1] = s * 255;
      outputImage.pixels[index + 2] = v * 255;
      outputImage.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }

  outputImage.updatePixels(); // Update the pixels of the output image
}

function processThresholdingYCbCr() {
  processedSnapshot.clear(); // Clear the processed snapshot

  // First, process the YCbCr conversion using the existing function
  processYCbCr(snapshot, processedSnapshot);

  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;

      let r = processedSnapshot.pixels[index];
      let g = processedSnapshot.pixels[index + 1];
      let b = processedSnapshot.pixels[index + 2];

      // Convert RGB to YCbCr
      let yValue = 0.299 * r + 0.587 * g + 0.114 * b;
      let cb = 128 + (-0.168736 * r - 0.331264 * g + 0.5 * b);
      let cr = 128 + (0.5 * r - 0.418688 * g - 0.081312 * b);

      if (yValue < thresholdValue) {
        yValue = 0; // Apply thresholding to the Y channel
      }

      // Convert YCbCr back to RGB
      let newR = yValue + 1.402 * (cr - 128);
      let newG = yValue - 0.344136 * (cb - 128) - 0.714136 * (cr - 128);
      let newB = yValue + 1.772 * (cb - 128);

      processedSnapshot.pixels[index] = constrain(newR, 0, 255);
      processedSnapshot.pixels[index + 1] = constrain(newG, 0, 255);
      processedSnapshot.pixels[index + 2] = constrain(newB, 0, 255);
      processedSnapshot.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }
  processedSnapshot.updatePixels(); // Update the pixels of the processed snapshot
}

function processThresholdingHSV() {
  processedSnapshot.clear(); // Clear the processed snapshot
  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot

  // First, process the HSV conversion
  processHSV(snapshot, processedSnapshot);

  processedSnapshot.loadPixels(); // Load the pixels of the processed snapshot

  for (let y = 0; y < boxHeight; y++) {
    for (let x = 0; x < boxWidth; x++) {
      let index = (x + y * boxWidth) * 4;

      // Read HSV values from the processed snapshot
      let h = processedSnapshot.pixels[index];
      let s = processedSnapshot.pixels[index + 1];
      let v = processedSnapshot.pixels[index + 2];

      // Apply thresholding to the Value (V) channel
      v = v >= thresholdValue ? v : 0;

      // Keep original HSV colors but with thresholded V
      processedSnapshot.pixels[index] = h;
      processedSnapshot.pixels[index + 1] = s;
      processedSnapshot.pixels[index + 2] = v;
      processedSnapshot.pixels[index + 3] = 255; // Set alpha to fully opaque
    }
  }
  processedSnapshot.updatePixels(); // Update the pixels of the processed snapshot
}

function detectFaces() {
  let faces = detector.detect(video.elt); // Detect faces in live video

  if (faces.length > 0) {
    detectedFace = faces[0]; // Store only the first detected face
  } else {
    detectedFace = null; // Reset if no face is detected
  }
}

function drawFaces() {
  if (detectedFace) {
    let [x, y, w, h] = detectedFace;

    // Increase size by 50%
    let scaleFactor = 1.5;
    let newW = w * scaleFactor;
    let newH = h * scaleFactor;
    let newX = x - (newW - w) / 2; // Center the new box
    let newY = y - (newH - h) / 2;

    noFill();
    stroke(255, 0, 0);
    strokeWeight(3);
    rect(newX, newY + 4 * boxHeight, newW, newH); // Adjust position for Box 13
  }
}

function applyFaceEffect() {
  if (detectedFace && effectType !== "none") {
    console.log("Applying Effect:", effectType);

    let [x, y, w, h] = detectedFace;
    let faceImg = video.get(x, y, w, h); // Extract face region
    faceImg.loadPixels(); // Load pixels for processing

    if (effectType === "grayscale") {
      console.log("Inside Grayscale Effect");

      for (let i = 0; i < faceImg.pixels.length; i += 4) {
        let r = faceImg.pixels[i];
        let g = faceImg.pixels[i + 1];
        let b = faceImg.pixels[i + 2];

        let gray = (r + g + b) / 3; // Convert RGB to grayscale
        faceImg.pixels[i] = gray;
        faceImg.pixels[i + 1] = gray;
        faceImg.pixels[i + 2] = gray;
      }
    } else if (effectType === "blur") {
      console.log("Inside Blur Effect");

      let kernel = [
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9],
      ]; // 3x3 Blur Kernel

      let blurredPixels = [...faceImg.pixels]; // Copy original pixels

      for (let i = 1; i < w - 1; i++) {
        for (let j = 1; j < h - 1; j++) {
          let index = (i + j * w) * 4;
          let [newR, newG, newB] = convolution(i, j, kernel, 3, faceImg);

          faceImg.pixels[index] = newR;
          faceImg.pixels[index + 1] = newG;
          faceImg.pixels[index + 2] = newB;
        }
      }
    } else if (effectType === "invert") {
      console.log("Inside YCbCr Effect");

      let ycbcrFace = createImage(w, h); // Create a new image buffer
      ycbcrFace.copy(faceImg, 0, 0, w, h, 0, 0, w, h); // Copy face image
      processYCbCr(ycbcrFace, ycbcrFace); // Apply YCbCr conversion using existing function
      faceImg = ycbcrFace; // Replace faceImg with converted image
    } else if (effectType === "pixelate") {
      console.log("Inside Pixelation Effect");

      let blockSize = 5; // Size of pixel blocks
      let outImage = createImage(w, h); // Create a new image buffer for output
      outImage.loadPixels(); // Load pixels for processing

      // Loop through face in blockSize x blockSize blocks
      for (let i = 0; i < w; i += blockSize) {
        for (let j = 0; j < h; j += blockSize) {
          // Compute average pixel intensity in the block
          let sum = 0;
          let count = 0;

          for (let bx = 0; bx < blockSize; bx++) {
            for (let by = 0; by < blockSize; by++) {
              let px = i + bx;
              let py = j + by;

              if (px < w && py < h) {
                let index = (px + py * w) * 4;
                let r = faceImg.pixels[index];
                let g = faceImg.pixels[index + 1];
                let b = faceImg.pixels[index + 2];
                let gray = (r + g + b) / 3; // Convert to grayscale

                sum += gray;
                count++;
              }
            }
          }

          let avgGray = sum / count; // Average grayscale intensity

          // Apply the averaged intensity to the entire block
          for (let bx = 0; bx < blockSize; bx++) {
            for (let by = 0; by < blockSize; by++) {
              let px = i + bx;
              let py = j + by;

              if (px < w && py < h) {
                let index = (px + py * w) * 4;
                outImage.pixels[index] = avgGray;
                outImage.pixels[index + 1] = avgGray;
                outImage.pixels[index + 2] = avgGray;
                outImage.pixels[index + 3] = 255; // Full alpha
              }
            }
          }
        }
      }

      outImage.updatePixels();
      faceImg = outImage;
    } else if (effectType === "ascii") {
      if (effectType === "ascii") {
        console.log("Inside ASCII Effect");
        drawASCII(faceImg, x, y + 4 * boxHeight, w, h);
        return; // Don't draw the normal image
      }
    }

    faceImg.updatePixels(); // Apply changes
    image(faceImg, x, y + 4 * boxHeight, w, h); // Draw modified face
  }
}

// Convolution Function (Based on Course Module Demonstration)
function convolution(x, y, matrix, matrixSize, img) {
  let totalRed = 0,
    totalGreen = 0,
    totalBlue = 0;
  let offset = floor(matrixSize / 2);

  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      let xloc = x + i - offset;
      let yloc = y + j - offset;
      let index = (img.width * yloc + xloc) * 4;

      index = constrain(index, 0, img.pixels.length - 1); // Avoid out of bounds

      totalRed += img.pixels[index] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }

  return [totalRed, totalGreen, totalBlue];
}

function drawASCII(img, x, y, w, h) {
  // Brightness 255 (white) → "."
  // Brightness 180–255 (light gray) → "-"
  // Brightness 100–180 (dark gray) → "+"
  // Brightness 50–100 (darker areas) → "*"
  // Brightness 0–50 (black) → "#"

  let asciiChars = ["@", "#", "*", "+", "-", "."];
  img.loadPixels();

  textSize(8); // Adjust size for readability
  fill(255);
  noStroke();

  for (let i = 0; i < h; i += 8) {
    for (let j = 0; j < w; j += 8) {
      let index = (j + i * w) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let brightness = (r + g + b) / 3;

      let charIndex = floor(map(brightness, 0, 255, 0, asciiChars.length - 1));
      let charToDraw = asciiChars[charIndex];

      text(charToDraw, x + j, y + i);
    }
  }
}

function keyPressed() {
  if (key === "a")
    effectType = "grayscale"; // Convert detected face to grayscale
  else if (key === "b") effectType = "blur"; // Placeholder (will blur face)
  else if (key === "c")
    effectType = "invert"; // Will invert face colors to YCbCr space
  else if (key === "d") effectType = "pixelate"; // pixelate face
  else if (key === "e") effectType = "ascii"; // Reset to no effect
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
