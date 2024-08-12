const canvas = document.getElementById("canvas1");
// Returns object with all functions and properties for drawing on canvas, called "drawing context" (`ctx` = context)
const ctx = canvas.getContext("2d");

// Creates hidden <img> element
const image1 = new Image();
/* Bypassing tainted Canvas error (caused by CORS security) when analyzing pixel data with built-in `getImageData()` method in 3 ways: 
    (1) Link image URL (but depends on server you're linking from): `image1.setAttribute('crossOrigin', ");`
    (2) Link image file directly (but only works through server, not locally; Node.js or "Live Server" extension works!): `image1.src = 'folder/image.png';`
    (3) Link image as base64 string */

// image1.src = 

// Gives slider functionality 
const inputSlider = document.getElementById('resolution');
const inputLabel = document.getElementById('resolutionLabel');
inputSlider.addEventListener('change', handleSlider);

class Cell {
  constructor(x, y, symbol, colour) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.colour = colour;
  }
  // Specifies which canvas to draw on
  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillText(this.symbol, this.x + 0.125, this.y + 0.125)
    ctx.fillStyle = this.colour;
    ctx.fillText(this.symbol, this.x, this.y)
  }
}

class AsciiEffect {
  // Class fields are public by default, so `#` enforces privacy encapsulation of class features (Vanilla JS)
  // Holds grid cells of image (e.g., https://zhanghanduo.github.io/img/yolo/yolo_dog_grid.jpg)
  #imageCellArray = [];
  // Holds pixel data returned from getImageData()
  #pixels = [];
  // Reference to Canvas API
  #ctx;
  #width;
  #height;
  // Object-oriented programming: https://mzl.la/3Zj9g4A
  // Converts parameters to private class variables (instantiation)
  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
    // ***IMPORTANT METHOD for animated pixel effects and image processing
    // Returns ImageData object that copies pixel data for specified rectangles of image
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  // TO-DO (?): Randomize symbols with decrementing for loop
  // Arbitrarily-defined breakpoints (`acv` = `averageColourValue`) 
  #convertToSymbol(acv) {
    if (acv > 140) return "*";
    else if (acv < 80) return "+";
    else if (acv > 260) return "(";
    else if (acv < 40) return "_";
    else if (acv < 120) return "~";
    else if (acv < 20) return "/";
    else if (acv > 180) return "@";
    else if (acv < 60) return "%";
    else if (acv < 140) return "#";
    else if (acv < 20) return "$";
    else if (acv > 100) return "!";
    else if (acv < 80) return "@";
    else if (acv < 60) return "^";
    else if (acv < 40) return "&";
    else if (acv > 20) return ")";
  }

  // 1) Cycle over ImageData object data -> 2) Calculate (x, y) coords per pixel -> 3) Convert to ASCII symbols based on original colour
  #scanImage(cellSize) {
    this.#imageCellArray = [];
    // Iterates through rectangular image vertically (y-axis, rows)
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      // Iterates through rectangular image horizontally (x-axis, cols)
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        // Every 4 positions in `#pixels` array represent rgba per pixel
        const posX = x * 4;
        const posY = y * 4;
        // Single value for current (x, y) coords represented with SINGLE index (between 0-9849600); const pos = rows iterated over (thus far) + x-coord of current row
        const pos = posY * this.#pixels.width + posX;

        // Checks for pixel's opacity (pos + 3 = alpha value); alpha values > 128 arbitrarily defined as opaque (range is 0-255, unlike CSS's 0-1)
        // Transparent and translucent pixels are discarded to save processing power (with certain images)
        if (this.#pixels.data[pos + 3] > 128) {
          // Mapping rgb values in `#pixels` array to temp variables
          const red = this.#pixels.data[pos];
          const green = this.#pixels.data[pos + 1];
          const blue = this.#pixels.data[pos + 2];
          // Create ASCII symbol based on pixel's "average colour value" per cell in image grid
          const averageColourValue = (red + green + blue) / 3;
          // Create ASCII symbol retaining original colours from image
          const colour = "rgb(" + red + "," + green + "," + blue + ")";
          // Assign each cell in image grid an ASCII symbol based on `averageColourValue` of original image
          const symbol = this.#convertToSymbol(averageColourValue);
          // Holds (x, y) coords, colour, and symbol values per cell (for final effect)
          // if() prevents arbitrarily-defined dark, dim colours from becoming ASCII symbols (i.e., black background)
          if (averageColourValue > 50) this.#imageCellArray.push(new Cell(x, y, symbol, colour));
        }
      }
    }
    console.log(this.#imageCellArray);
  }
  #drawAscii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    // Draw elements pushed into `#imageCellArray` array (from line 103)
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#imageCellArray[i].draw(this.#ctx);
    }
  }
  // Only PUBLIC method in 'AsciiEffect' class 
  draw(cellSize) {
    // Passing `cellSize` to correctly travel around image and create grid
    this.#scanImage(cellSize);
    this.#drawAscii();
  }
}

let effect;

function handleSlider() {
  if (inputSlider.value == 1) {
    inputLabel.innerHTML = 'Original Image';
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  }
  else {
    inputLabel.innerHTML = 'Resolution: ' + inputSlider.value + ' px';
    ctx.font = parseInt(inputSlider.value) * 1.2 + 'px Verdana';
    effect.draw(parseInt(inputSlider.value));
  }
}

// Function called once image loaded
image1.onload = function initialize() {
  canvas.width = image1.width;
  canvas.height = image1.height;
  effect = new AsciiEffect(ctx, image1.width, image1.height);
  // Control image's resolution with `cellSize`! 
  handleSlider();
};