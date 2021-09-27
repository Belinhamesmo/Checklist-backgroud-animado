let kMax; // maximo de k na bolha
let step = 0.01; 
let n = 100; // maximo de bolhas
let radius = 0; // curvatura da base da bolha
let inter = 0.05; // tempo entre uma bolha e outra
let maxNoise = 500; // ruído das bolhas 

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();

	kMax = random(0.6, 1.0);
	noStroke();
}

function draw() {
    background(0);
  let t = frameCount/100;
  for (let i = n; i > 0; i--) {
		let alpha = 1 - (i / n);
		fill((alpha/5 + 0.75)%1, 1, 1, alpha);
		let size = radius + i * inter;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * (i / n);
    blob(size, width/2, height/2, k, t - i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 10;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		r1 = cos(theta)+1;
		r2 = sin(theta)+1; 
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}