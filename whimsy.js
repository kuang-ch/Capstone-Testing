let gWorld;
let gBlob;
let gRadius = 90;
let scaleFactor;
let gDamping = 0.6;
let gFrequency = 0.01;
let gBgColor = '#f4f1ea';
let gBlobColor = '#3567af';
let gTime;

function setup() {
	createCanvas(200, 200);
	background(0);
	gWorld = new c2.World(new c2.Rect(0, 0, width, height));

	let centerX = width / 2;
	let centerY = height / 2;
	let scaleFactor = random(0.7, 1);
	console.log(gRadius);
	console.log(scaleFactor);
	createBlob(centerX, centerY, scaleFactor);

	//addWorldForces();
	init();

	strokeWeight(5);
}


// function mouseClicked() {
// 	init();
// }

// function draw() {
// 	background(gBgColor);

// 	gWorld.update();

// 	gBlob.update();
// 	gBlob.draw();

// 	gTime += 1;
// }

// function init() {
// 	clearForces();
// 	let centerX = width / 2;
// 	let centerY = height / 2;

// 	let scaleFactor = random(0.7, 1);
// 	createBlob(centerX, centerY, scaleFactor);

// 	gTime = 0;
// }

// function createBlob(posX, posY, scaleFactor) {
// 	gBlob = new Blob(new c2.Vector(posX, posY), scaleFactor);
// }

// class Blob {
// 	constructor(pos, scaleFactor) {
// 		this.allPoints = [];
// 		this.springs = [];
// 		this.color = gBlobColor;
// 		this.radius = gRadius * scaleFactor;
// 		console.log(scaleFactor);
// 		this.frequency = gFrequency;
// 		this.createBody(pos);
// 	}

// 	update() {
// 		const amplitude = 0.2 * this.radius;
// 		const timeFactor = min(gTime * this.frequency, 1);
// 		const expansionFactor = timeFactor * amplitude;

// 		for (let i = 0; i < this.allPoints.length; i++) {
// 			const point = this.allPoints[i];
// 			point.radius = 1.5 * expansionFactor;
// 			for (let j = 0; j < this.springs.length; j++) {
// 				const spring = this.springs[j];
// 				spring.s.length = spring.l * expansionFactor * gDamping;
// 			}
// 		}
// 	}

// 	createBody(pos) {
// 		const count = floor(this.radius);
// 		const angInc = TWO_PI / count;

// 		for (let i = 0; i < count; i++) {
// 			const angle = i * angInc;
// 			const x = this.radius * cos(angle) + pos.x;
// 			const y = this.radius * sin(angle) + pos.y;
// 			this.allPoints.push(this.createParticle(x, y));
// 		}

// 		for (let i = 0; i < count; i++) {
// 			const currentPoint = this.allPoints[i];
// 			const nextIndex = (i + 1) % count;
// 			const nextPoint = this.allPoints[nextIndex];
// 			this.createSpring(currentPoint, nextPoint);
// 		}
// 	}

// 	createParticle(posX, posY) {
// 		let p = new c2.Particle(posX, posY);
// 		gWorld.addParticle(p);
// 		return p;
// 	}

// 	createSpring(p1, p2) {
// 		let spring = new c2.Spring(p1, p2);
// 		spring.length = dist(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
// 		spring.range(0.6 * spring.length, 50 * spring.length);
// 		gWorld.addSpring(spring);
// 		this.springs.push({ s: spring, l: spring.length });
// 	}

// 	draw() {
// 		beginShape();
// 		for (let point of this.allPoints) {
// 			curveVertex(point.position.x, point.position.y);
// 		}
// 		stroke(this.color);
// 		fill(this.color);
// 		endShape(CLOSE);
// 	}
// }