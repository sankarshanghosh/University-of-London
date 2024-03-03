function textTool() {
  this.name = "textTool";
  this.icon = "assets/text.jpg";

  var currentText = ""; // Stores the current text input by the user
  var fontSize = 16; // Default font size
  var fontColor = "#000000"; // Default font color
  var fontRotation = 0; // Default text rotation angle
  var currentFont = "Arial"; // Default font

  // Draw the text onto the canvas at the mouse position
  this.draw = function () {
    if (mouseIsPressed && mousePressOnCanvas()) {
      push(); // Start a new drawing state
      translate(mouseX, mouseY); // Move the origin to the mouse position
      rotate(radians(fontRotation)); // Rotate by the fontRotation angle
      textFont(currentFont); // Set the font
      fill(fontColor);
      textSize(fontSize);
      text(currentText, 0, 0); // Draw the text at the origin
      pop(); // Restore original state
    }
  };

  // Populate the options for the text tool
  this.populateOptions = function () {
    var htmlContent = "<input type='text' id='textInput' placeholder='Type your text'>";
    htmlContent += "<input type='number' id='fontSizeInput' value='" + fontSize + "' min='10' max='100' style='margin-left: 5px;'>";

    htmlContent += "<select id='fontSelector'>";
    htmlContent += "<option value='Arial'>Arial</option>";
    htmlContent += "<option value='Times New Roman'>Times New Roman</option>";
    htmlContent += "<option value='Verdana'>Verdana</option>";
    htmlContent += "<option value='Georgia'>Georgia</option>";
    htmlContent += "<option value='Courier New'>Courier New</option>";
    htmlContent += "</select>";

    htmlContent += "<br><label for='fontColorPicker'>Text Color:</label>";
    htmlContent += "<input type='color' id='fontColorPicker' value='" + fontColor + "' style='margin-left: 5px;'>";

    htmlContent += "<br><label for='rotationSlider'>Rotate Text:</label>";
    htmlContent += "<input type='range' id='rotationSlider' min='0' max='360' value='" + fontRotation + "' style='margin-left: 5px;'>";

    select(".options").html(htmlContent);


    // Update currentText when the text input changes
    select("#textInput").input(function () {
      currentText = this.value();
    });

    // Update fontSize when the font size input changes
    select("#fontSizeInput").input(function () {
      fontSize = this.value();
    });

    // Update fontColor when the color picker changes
    select("#fontColorPicker").input(function () {
      fontColor = this.value();
    });

    // Update currentFont when the font selector changes
    select("#fontSelector").changed(function () {
      currentFont = this.value();
    });

    // Update fontRotation when the rotation slider changes
    select("#rotationSlider").input(function () {
      fontRotation = this.value();
    });
  };

  // Clear options when the tool is deselected
  this.unselectTool = function () {
    select(".options").html("");
    currentText = ""; // Reset current text
  };
}
