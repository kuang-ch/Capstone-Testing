let camera;
let sampleSize = 2;
let camWidth = 320;
let camHeight = 240;
let proportion = camWidth / camHeight;
let threshold;
let multiplier;
let thresholdSlider;


let words; // This will store the array of words
let wordsArray = [];

function preload() {
	// Load the CSV file during preload
	words = loadTable('assets/words.csv'
    , 'csv', 'header', () => {
      for (let row of words.rows) {
        let rowData = {
          verb: row.get('Word'),
        }
        wordsArray.push(rowData);
      }
    })
}

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
}

let i, r, g, b, rSize, gSize, bSize;

function draw() {
	messageIndex = 0;
	background(255);
	camera.loadPixels();
	//create a grid of nested circles
	for (let y = 0; y < camera.height; y += sampleSize) {
		for (let x = 0; x < camera.width; x += sampleSize) {
			i = ((y * camera.width) + x) * 4;
			r = camera.pixels[i];
			g = camera.pixels[i + 1];
			b = camera.pixels[i + 2];
			if (r + g + b < thresholdSlider.value()) {
				let diameter = r + g + b;
				let diameterMapped = map(diameter, 0, 765, 0, 12);
				let diameterActual = 12 - diameterMapped;
			
				push();
				fill(0, 8, 50);
		
				// Add a random word from wordsArray
				let randomNumber = floor(random(1, 80));
				//console.log(randomNumber);
				let randomWord = wordsArray[randomNumber].verb;
				console.log("this is the verb", randomWord);
				textAlign(CENTER, CENTER);
				textSize(5);
				text(randomWord, x * multiplier, y * multiplier);
				pop();
			}
		}
	}
}