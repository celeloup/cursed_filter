// A JAVASCRIPT VERSION OF A CURSED FILTER
// inspired by Jonty : https://twitter.com/jonty/status/1352727559235117058
// using ml5 version of face-api : https://learn.ml5js.org/#/reference/face-api?id=face-api
// and p5.js

// TO USE ON OBS ADD  --use-fake-ui-for-media-stream to launch

let faceapi;
let detections = [];

let video;

let white = "#FFFFFF";
let green = "#00FF00";
let gray = "#2b2b2b";
let background_color = white;

function setup() {
  navigator.mediaDevices.enumerateDevices().then(gotDevices);
  pixelDensity(1);
  createCanvas(1024, 576);

  // video = createCapture(VIDEO);
  // video.hide();

  // const faceOptions = { withLandmarks: true, withExpressions: false, withDescriptors: false };
  // faceapi = ml5.faceApi(video, faceOptions, faceReady);

  noFill();
  stroke(255);
  // strokeWeight(10);
}

const devices = [];

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    if (deviceInfo.kind == "videoinput") {
      devices.push({
        label: deviceInfo.label,
        id: deviceInfo.deviceId,
      });
    }
  }
  console.log(devices);
  let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  console.log(supportedConstraints);
  var constraints = {
    video: {
      deviceId: {
        exact: devices[0].id,
      },
    },
  };
  video = createCapture(constraints);
  video.hide();

  const faceOptions = {
    withLandmarks: true,
    withExpressions: false,
    withDescriptors: false,
  };
  faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
  faceapi.detectSingle(gotFaces);
}

function gotFaces(error, result) {
  if (error) {
    // TODO: add better handling, it stops when it no longer detects
    detections = null;
    console.log(error);
    // return;
    faceReady();
    return;
  }
  detections = result;
  faceapi.detectSingle(gotFaces);
}

function draw() {
  // Green background for chroma key incrustation in OBS
  background(background_color);

  // Original video
  // image(video, 0, 0); //, width, width * video.height / video.width);

  let eye_size = [100, 60];
  let mouth_size = [130, 80];
  let r_eye_loc = [500, 50];
  let l_eye_loc = [150, 90];
  let mouth_loc = [300, 250];

  noStroke();
  if (detections && detections.landmarks) {
    // ------------------------------- RIGHT EYE
    let rightEye = detections.parts.rightEye;
    // rect(rightEye[0]._x - 20, rightEye[0]._y - 40, eye_size[0], eye_size[1]);
    image(
      video,
      r_eye_loc[0],
      r_eye_loc[1],
      eye_size[0] * 2,
      eye_size[1] * 2,
      rightEye[0]._x - 20,
      rightEye[0]._y - 30,
      eye_size[0],
      eye_size[1]
    );

    // // ---------------------------- LEFT EYE
    let leftEye = detections.parts.leftEye;
    // rect(leftEye[0]._x - 20, leftEye[0]._y - 40, eye_size[0], eye_size[1]);
    image(
      video,
      l_eye_loc[0],
      l_eye_loc[1],
      eye_size[0] * 2,
      eye_size[1] * 2,
      leftEye[0]._x - 20,
      leftEye[0]._y - 30,
      eye_size[0],
      eye_size[1]
    );

    // ------------------------------- MOUTH
    let mouth = detections.parts.mouth;
    // rect(mouth[0]._x - 20, mouth[0]._y - 40, mouth_size[0], mouth_size[1]);
    image(
      video,
      mouth_loc[0],
      mouth_loc[1],
      mouth_size[0] * 2,
      mouth_size[1] * 2,
      mouth[0]._x - 20,
      mouth[0]._y - 30,
      mouth_size[0],
      mouth_size[1]
    );

    // ------------------------------ DEBUG POINTS
    // let points = detections.parts.mouth; //detections.landmarks.positions;
    // for (let i = 0; i < 10; i++) {
    //   point(points[i]._x, points[i]._y);
    // }
  } else {
    fill(0);
    noStroke();
    rect(r_eye_loc[0], r_eye_loc[1], eye_size[0] * 2, eye_size[1] * 2);
    rect(l_eye_loc[0], l_eye_loc[1], eye_size[0] * 2, eye_size[1] * 2);
    rect(mouth_loc[0], mouth_loc[1], mouth_size[0] * 2, mouth_size[1] * 2);
  }
  window_border(
    r_eye_loc[0],
    r_eye_loc[1],
    eye_size[0] * 2,
    eye_size[1] * 2,
    "right_eye"
  );
  window_border(
    l_eye_loc[0],
    l_eye_loc[1],
    eye_size[0] * 2,
    eye_size[1] * 2,
    "left_eye"
  );
  window_border(
    mouth_loc[0],
    mouth_loc[1],
    mouth_size[0] * 2,
    mouth_size[1] * 2,
    "mouth_"
  );
}

function window_border(x, y, width, height, name) {
  noFill();
  stroke(background_color);
  strokeWeight(8);
  rect(x, y, width, height, 0, 0, 8, 8);
  fill(245);
  noStroke();
  rect(x + 4, y - 16, width - 8, 20, 5, 5, 0, 0);
  fill(220);
  circle(x + 15, y - 6, 11);
  circle(x + 32, y - 6, 11);
  circle(x + 49, y - 6, 11);
  fill(180);
  stroke(180);
  strokeWeight(0.2);
  textSize(14);
  text(name, x + width / 2 - 20, y - 2);
}
