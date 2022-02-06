// A JAVASCRIPT VERSION OF A CURSED FILTER
// inspired by Jonty : https://twitter.com/jonty/status/1352727559235117058
// using ml5 version of face-api : https://learn.ml5js.org/#/reference/face-api?id=face-api
// and p5.js

let faceapi;
let detections = [];

let video;

function setup() {
	createCanvas(1920, 1080);

	video = createCapture(VIDEO);
	video.size(1920, 1080);
	video.hide();
	
	const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
	faceapi = ml5.faceApi(video, faceOptions, faceReady);
	
	noFill();
	stroke(255);
	strokeWeight(10);
}

function faceReady() {
	faceapi.detectSingle(gotFaces);
}

function gotFaces(error, result) {
	if (error) {
		// TODO: add better handling, it stops when it no longer detects
		console.log(error);
		return;
	}
	detections = result;
	faceapi.detectSingle(gotFaces);
}

function draw() {
	// Green background for chroma key incrustation in OBS
	background(0, 255, 0);

	// Original video
	// image(video, 0, 0, width, width * video.height / video.width);
	let value = video.height / video.width;

	if (detections.landmarks) {
		// ------------------------------- RIGHT EYE
		let rightEye = detections.parts.rightEye;
		// rect(rightEye[0]._x - 20, rightEye[0]._y - 40, 120, 90);
		image(video, 600, 50, 240, 160, (rightEye[0]._x + 165) * value, (rightEye[0]._y + 30) * value, 120 * value, 80 * value);

		// // ---------------------------- LEFT EYE
		let leftEye = detections.parts.leftEye;
		// rect(leftEye[0]._x - 40, leftEye[0]._y - 40, 120, 90);
		image(video, 100, 90, 240, 160, (leftEye[0]._x + 120) * value, (leftEye[0]._y + 30) * value, 120 * value, 80 * value);

		// ------------------------------- MOUTH
		let mouth = detections.parts.mouth;
		// rect(mouth[0]._x - 20, mouth[0]._y - 40, 120, 90);
		image(video, 300, 300, 320, 200, (mouth[0]._x + 140) * value, (mouth[0]._y + 70) * value, 160 * value, 100 * value);

		// ------------------------------ DEBUG POINTS
		// let points = detections.parts.mouth; //detections.landmarks.positions;
		// for (let i = 0; i < 10; i++) {
		//   point(points[i]._x, points[i]._y);
		// }
	}
}