function stampTool() {
  this.name = "stampTool";
  this.icon = "assets/stamp.jpg";

  var uploadedImage; // This will hold the uploaded image
  var imageIsLoaded = false; // This flag checks if the image is loaded

  // Method to handle showing options for the stamp tool
  this.populateOptions = function () {
    // HTML for the file input and divs for sliders
    var imgHtml =
      "<input type='file' id='imageInput' accept='image/*'><br/>" +
      "<div id='imgSizeSlider' style='font-size: 13px;font-family: Arial'>Size of Image:</div>" +
      "<div id='nImgSlider' style='font-size: 13px;font-family: Arial'>Number of Images:</div>";

    // Set the HTML content for the options
    select(".options").html(imgHtml);

    // Create the sliders and append them to the corresponding divs
    imgSizeSlider = createSlider(5, 50, 20).parent("#imgSizeSlider");
    nImgSlider = createSlider(1, 20, 5).parent("#nImgSlider");

    // Create an input element to accept an image file
    //event parameter is an object that contains information about the event that triggered the callback function
    //event targer is the element that triggered the event
    //Learnt about event interface and URL interface from:
    //https://developer.mozilla.org/en-US/docs/Web/API/Event
    //https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    //https://youtu.be/xXrs4j-p3yE?si=Kla08uFJObSLjQ9s
    //https://p5js.org/reference/#/p5/loadImage
    select("#imageInput").input(function (event) {
      var fileInput = event.target;
      if (fileInput.files && fileInput.files[0]) {
        // Only proceed if there's a file selected
        var file = fileInput.files[0];
        //The line of code uses URL.createObjectURL() to create a temporary URL for a File or Blob object, then loads that image using p5.js's loadImage() function. Arrow function is also used as a success callback.
        uploadedImage = loadImage(
          URL.createObjectURL(file),
          () => (imageIsLoaded = true)
        );
      }
    });
  };

  // Method to clear options when another tool is selected
  this.unselectTool = function () {
    select(".options").html(""); // Clear options
    imageIsLoaded = false; // Reset flag
  };

  // Update the draw function to stamp the uploaded image
  this.draw = function () {
    if (mousePressOnCanvas() && mouseIsPressed && imageIsLoaded) {
      var numImages = nImgSlider.value();
      var imageSize = imgSizeSlider.value();

      for (var i = 0; i < numImages; i++) {
        // If only one image, stamp it at the mouse position
        if (numImages === 1) {
          image(
            uploadedImage,
            mouseX - imageSize / 2,
            mouseY - imageSize / 2,
            imageSize,
            imageSize
          );
        } else {
          // Randomize position for multiple images
          var imgX = random(
            mouseX - imageSize / 2 - 10,
            mouseX + imageSize / 2 + 10
          );
          var imgY = random(
            mouseY - imageSize / 2 - 10,
            mouseY + imageSize / 2 + 10
          );
          image(uploadedImage, imgX, imgY, imageSize, imageSize);
        }
      }
    }
  };
}
