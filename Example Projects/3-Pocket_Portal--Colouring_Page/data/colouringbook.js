var svgID = "colour"; // 🔄 Replace 'colour' with the HTML ID of the illustration's SVG (if you want everything to be colour-able), or the ID of the layer or group to colour in

//// ✨ COLOUR PICKER CUSTOM COLOR ✨ ////

// Function to handle color picker selection
function handleColorPickerSelection(event) {
  // Check if a color picker input element already exists
  if (!document.getElementById("colorPickerInput")) {
    // Create a color picker input element
    var input = document.createElement("input");
    input.type = "color";
    input.id = "colorPickerInput"; // Assign an id to the input element

    // Add event listener for color change
    input.addEventListener("change", function () {
      // Set the current fill to the selected color
      var selectedColor = input.value;
      _currentFill = "fill:" + selectedColor;

      // Remove the input element from the body
      document.body.removeChild(input);
    });

    // Append the input element to the body
    document.body.appendChild(input);

    // Trigger click event on color picker input
    input.click();
  }
}

// Add event listener to the custom swatch for color picker
document
  .getElementById("colorPickerSwatch")
  .addEventListener("click", handleColorPickerSelection);

//// ✨ CHANGING THE FILL COLOUR DYNAMICALLY ✨ ////

// default selected colour when page is loaded
var _currentFill = "fill:#fff";

// change the fill colour when clicking inside of your ilustration
$("#" + svgID).click(function (event) {
  $(event.target).attr("style", _currentFill);
});
var $swatches = $("#swatches");
$swatches.click(function (event) {
  $swatch = $(event.target);
  loc = [parseInt($swatch.attr("x"), 10), parseInt($swatch.attr("y"), 10)];
  $("#selection", $swatches).attr("x", loc[0]);
  $("#selection", $swatches).attr("y", loc[1]);
  _currentFill = $swatch.attr("style");
});
