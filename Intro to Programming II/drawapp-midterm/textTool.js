function textTool() {
    this.name = "textTool";
    this.icon = "assets/text.jpg"; // Make sure you have a text icon in your assets

    var textInput;
    var fontSize = 16; // Default font size
    var fontColor = '#000000'; // Default font color

    this.draw = function() {
        // The text tool's draw function doesn't do anything because the text is handled by DOM elements
    };

    // Function to populate the options for the text tool
    this.populateOptions = function() {
        // Create a text input field
        var htmlContent = "<input type='text' id='textInput' placeholder='Type your text'>";
        // Add font size input field
        htmlContent += "<input type='number' id='fontSizeInput' value='" + fontSize + "' min='10' max='100'>";
        // Add font color picker
        htmlContent += "<input type='color' id='fontColorPicker' value='" + fontColor + "'>";

        select('.options').html(htmlContent);

        // Event handler for text input
        textInput = select('#textInput');
        textInput.input(function() {
            // When user types, update the canvas with the text
            this.drawText();
        });

        // Event handler for font size
        var fontSizeInput = select('#fontSizeInput');
        fontSizeInput.input(function() {
            // Update the font size
            fontSize = this.value();
            this.drawText();
        });

        // Event handler for font color
        var fontColorPicker = select('#fontColorPicker');
        fontColorPicker.input(function() {
            // Update the font color
            fontColor = this.value();
            this.drawText();
        });
    };

    // Function to handle drawing the text
    this.drawText = function() {
        fill(fontColor);
        textSize(fontSize);
        text(textInput.value(), mouseX, mouseY);
    };

    // Function to handle the deselection of the text tool
    this.unselectTool = function() {
        select(".options").html(""); // Clear options
        textInput = null; // Clear the text input
    };
}
