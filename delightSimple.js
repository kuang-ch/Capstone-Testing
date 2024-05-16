let shapeCount, currentX, currentY, xMapped, yMapped, radius, increment, maxRadius, minRadius;
let frameCountLimit = 200; // Set the number of frames to save
let currentFrame = 0;

minRadius = 100;
maxRadius = 250;

function setup() {
	createCanvas(600, 600);
	frameRate(0.5); // Set the frame rate to 10 frames per second
	strokeWeight(1);
	stroke(`#ffffff`)
	noFill();
	shapeCount = 3;
	maxNoise = 10;
	increment = 0;
	xMapped = 0;
	yMapped = 0;
	frameRate(1);

	colors = ['#8CD86780', '#4A50FF80', '#ECA72C80', '#EE562280', `#36353780`];
}

function draw() {
	background(255);
	translate(width / 2, height / 2);

	for (let i = 0; i < shapeCount; i++) {
		let randomColor = random(colors);
		fill(randomColor); // Use the randomly selected color as fill

		beginShape();
		for (let angle = 0; angle < TWO_PI; angle += 0.01) {
			xMapped = map(cos(angle), -1, 1, 0, maxNoise);
			yMapped = map(sin(angle), -1, 1, 0, maxNoise);
			radius = map(noise(xMapped, yMapped + increment), 0, 1, minRadius, maxRadius);
			currentX = cos(angle) * radius;
			currentY = sin(angle) * radius;
			vertex(currentX, currentY);
		}
		endShape(CLOSE);
		minRadius -= 50;
		maxRadius -= 50;
		increment += 100;
	}
	if (frameCount % shapeCount === 0) {
		minRadius = 100;
		maxRadius = 250;
	}
	  // Save each frame
	//   if (currentFrame < frameCountLimit) {
	// 	saveCanvas('/Users/chriskuang/Desktop/NEU/2024 spring/artg4550/01-p5/01-delight/_export/frame_' + nf(currentFrame, 4), 'png'); // Save with a filename like "frame_0001.png"
	// 	currentFrame++;
	//   }
	
	//   if (currentFrame >= frameCountLimit) {
	// 	noLoop(); // Stop looping after saving all frames
	//   }
}

