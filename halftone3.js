let camera;
let sampleSize = 4;
let camWidth = 545;
let camHeight = 300;
let proportion = camWidth / camHeight;
let threshold;
let multiplier;
let thresholdSlider;

let images = []; // Array to store multiple images
let numImages = 18; // Number of images
let imageAssignments = []; // Array to store image assignments for each point on the grid

function preload() {
	for (let i = 1; i <= numImages; i++) {
		images.push(loadImage('assets/shoe' + i + '.png')); // Load images and add to the array;
	}
}

let useCustomDraw = true; // Boolean variable to toggle custom draw function

function setup() {
	camera = createCapture(VIDEO);
	camera.size(camWidth, camHeight);
	camera.hide();

	//halfway point for colors
	threshold = round((255 * 3) / 2);
	if (windowHeight < windowWidth) {
		createCanvas(round(windowHeight * proportion), windowHeight);
	} else {
		createCanvas(windowWidth, round(windowHeight * (1 / proportion)));
	}
	multiplier = width / camWidth;
	noStroke();
	thresholdSlider = createSlider(0, 765, threshold);
	thresholdSlider.position((width / 2) - (thresholdSlider.width / 2), height - 40);
	//use a monospace font
	textFont('arial');
	textSize(sampleSize * multiplier);

	// Generate random image assignments for each point on the grid
	for (let y = 0; y < ceil(camHeight / sampleSize); y++) {
		for (let x = 0; x < ceil(camWidth / sampleSize); x++) {
			let randomIndex = floor(random(images.length));
			imageAssignments.push(images[randomIndex]);
		}
	}

	// Add a button to toggle draw function
	let toggleButton = createButton('Toggle');
	toggleButton.position(width - 100, height - 50);
	toggleButton.mousePressed(toggleDrawFunction);
}

let i, r, g, b, rSize, gSize, bSize;
let contrastFactor = 1;  //Contrast factor

function toggleDrawFunction() {
	useCustomDraw = !useCustomDraw; // Toggle the boolean variable
}

function draw() {
	background(200);
	camera.loadPixels();
	//create a grid of nested circles
	if (useCustomDraw) {
		for (let y = 0; y < camera.height; y += sampleSize) {
			for (let x = 0; x < camera.width; x += sampleSize) {
				i = ((y * camera.width) + x) * 4;
				let r = camera.pixels[i] * contrastFactor;
				let g = camera.pixels[i + 1] * contrastFactor;
				let b = camera.pixels[i + 2] * contrastFactor;

				// Ensure values are within the valid range (0 to 255)
				r = constrain(r, 0, 255);
				g = constrain(g, 0, 255);
				b = constrain(b, 0, 255);

				if (r + g + b < thresholdSlider.value()) {
					let diameter = r + g + b;
					let diameterMapped = map(diameter, 0, 765, 0, 20);
					let diameterActual = 20 - diameterMapped;

					// Retrieve the pre-assigned image for this point
					let index = floor(x / sampleSize) + floor(y / sampleSize) * ceil(camWidth / sampleSize);
					let assignedImage = imageAssignments[index];

					let aspectRatio = assignedImage.width / assignedImage.height;
					let imgWidth = diameterActual;
					let imgHeight = diameterActual / aspectRatio;

					// Display the resized image
					image(assignedImage, x * multiplier, y * multiplier, imgWidth, imgHeight);
				}
			}
		}
	} else {// Display raw camera capture
		image(camera, 0, 0, width, height);
	}
}