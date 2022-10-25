let video;
let poseNet;
let poses = [];
let positionsLeft = [];
let positionsRight = [];
let skeleton;
let birds = [];
let snow = [];
let gravity;
let sprite;

let snowImg, snowflake, snowbg, snowMountain, snowLand;
let water;
let city;
let rainSound;
let waterSound;
let windSound;
let menuSound;

let rain = [];
const numOfDrops = 1000; // total number of raindrops
let windowImage;

let bubbles = [];
let fish1, fish2, fish3;
let fishImg1, fishImg2, fishImg3;

let joints;
let limbs = [];

function preload() {
  snowImg = loadImage("assets/snowflake.png");
  snowbg = loadImage("assets/snowbackground.png");
  snowMountain = loadImage("assets/snowmountain.png");
  snowLand = loadImage("assets/snowlandscape2.png");
  water = loadImage("assets/underwater.png");
  city = loadImage("assets/urbancity.png");
  fishImg1= loadImage("assets/OrangeFish.png");
  fishImg2= loadImage("assets/YellowFish.png");
  fishImg3= loadImage("assets/FishBlue.png");
  menuImg = loadImage("assets/Scenes.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  // Hide the video element, and just show the canvas
  video.hide();
  video.size(width, height);
  soundFormats("mp3");
  rainSound = loadSound("assets/thunder.mp3");
  waterSound = loadSound("assets/watersound.mp3");
  menuSound = loadSound("assets/menu.mp3");
  //windSound = loadSound("assets/Wind.mp3");

  mgr = new SceneManager();

  mgr.addScene(Scene1);
  mgr.addScene(Scene2);
  mgr.addScene(Scene3);

  mgr.showNextScene();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  // initialize the world
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      
      // Only draw an ellipse if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(239, 217, 108);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }

      if (poses.length > 0) {
        let leftWrist = poses[0].pose.keypoints[10].position;
        let rightWrist = poses[0].pose.keypoints[9].position;
        fill(20);
        ellipseMode(CENTER);

        noStroke();
        for (let j = 0; j < positionsLeft.length; j++) {
          positionsLeft[j][1]++;
        }
        positionsLeft.push([leftWrist.x, leftWrist.y]);

        for (let i = 0; i < positionsRight.length; i++) {
          positionsRight[i][1]++;
        }
        positionsRight.push([rightWrist.x, rightWrist.y]);

        noFill();
      }
    }
  }
}
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  //skeletonSprite = new Sprite(0, 0)
  //skeletonSprite.velocity = 0
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      //       if (poses.length > 50) {
      //         poses.splice(0, 1);
      //       }
      //       stroke(98, 30, 25);
      //       line(
      //         partA.position.x,
      //         partA.position.y,
      //         partB.position.x,
      //         partB.position.y
      //       );

      //get midpoint between joint points and extend of both sides
      LimbWidth = abs(partA.position.x - partB.position.x);
      midpointX = (partA.position.x + partB.position.x) / 2;
      midpointY = (partA.position.y + partB.position.y) / 2;
      addVecX = partA.position.x - partB.position.x;
      addVecY = partA.position.y - partB.position.y;
      //atan2 to get the angle of vector representing the line between two points
      VecAngle = Math.atan2(addVecY, addVecX) * (180 / Math.PI);
      if (limbs[j] == null) {
        limbs[j] = new Sprite(midpointX, midpointY, "static");
        strokeWeight(2);
        limbs[j].color = 'yellow';
        limbs[j].height = 4;
        limbs[j].width = LimbWidth;
        limbs[j].rotation = VecAngle;
      } else {
        limbs[j].x = midpointX;
        limbs[j].y = midpointY;
        limbs[j].width = LimbWidth;
        limbs[j].rotation = VecAngle;
      }
    }
  }
}

function clearFish() {
  for(let i=allSprites.length; i--;) {
    allSprites[i].remove();
  }
}

// clears all the snow
function clearSnow() {
  for (let i = 0; i < snow.length; i++) {
    snow[i].snowflake.remove();
  }
  snow = []
}

function draw() {
  mgr.draw();
}

function mousePressed() {
  mgr.handleEvent("mousePressed");
}

function keyPressed() {
  // You can optionaly handle the key press at global level...
  switch (key) {
    case "1":
      mgr.showScene(Scene1);
    case "2":
      mgr.showScene(Scene2);
      break;
    case "3":
      mgr.showScene(Scene3);
      break;
    case "4":
      mgr.showScene(Scene4);
      break;
  }
  // ... then dispatch via the SceneManager.
  mgr.handleEvent("keyPressed");
}

function Scene1() {
  this.enter = function() {
  menuSound.play();
  windSound.stop();
  waterSound.stop();
  rainSound.stop();
  }
  
  this.setup = function() {
    background(220);
    image(menuImg, 0,0, windowWidth, windowHeight);
    noStroke();
    rectMode(CENTER);
    rect(windowWidth/2, windowHeight/2, 500,300, 40, 40);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(56);
    text("Hello There!", windowWidth/2, windowHeight /2.2 );
    textStyle(ITALIC);
    textSize(19);
    text("Stand far back for a better experience", windowWidth/2, windowHeight /2 );
    textStyle(ITALIC);
    textSize(15);
    text("Press 2, 3 or 4 to explore!", windowWidth/2, windowHeight /1.8);
  }
  
  this.draw = function() {
  }
}


function Scene2() {
  this.enter = function () {
    print("ENTER");
    windSound.play();
    waterSound.stop();
    rainSound.stop();
    menuSound.stop();
    clearFish();
  }

  this.setup = function () {
    gravity = createVector(0.01, 0.1);
  }

  this.draw = function () {
    image(video, 0, 0, width, height);
    image(snowbg, 0, 0);
    image(snowMountain, 0, 0);
    image(snowLand, 0, 0);
    snowLand.resize(windowWidth, windowHeight);
    snowMountain.resize(windowWidth, windowHeight);
    snowbg.resize(windowWidth, windowHeight);

    drawKeypoints();
    drawSkeleton();

    //adds snowflake
    snow.push(new Snowflake(limbs));

    for (flake of snow) {
      flake.applyForce(gravity);
      flake.update();
      flake.edges();
    }

    //birds
    for (let i = 0; i < birds.length; i++) {
      birds[i].fly();
      birds[i].display();
    }

    //removes snowflake through a backwards array (to ease render)
    for (let i = snow.length - 1; i >= 0; i--) {
      if (snow[i].offScreen()) {
        snow.splice(i, 1);
      }
    }
  }

  let b = new Bird(random(-10, 0), random(0, height));
  birds.push(b);

  this.keyPressed = function () {
    if (keyCode === RIGHT_ARROW) {
      let b = new Bird(random(-10, 0), random(0, height));
      birds.push(b);
      //print("num of birds = "+birds.length);
    }
  }
}

function Scene3() {
  this.enter = function () {
    waterSound.play();
    rainSound.stop();
    windSound.stop();
    menuSound.stop();
    clearSnow();
    
    fish1 = createSprite(fishImg1);
    fish2 = createSprite(fishImg2);
    fish3 = createSprite(fishImg3);
    
    //how fast they move with the hand
    fish1.maxSpeed = 10;
    fish2.maxSpeed = 25;
    fish3.maxSpeed = 5;
  }

  this.setup = function () {

    // //how fast they move with the hand
    // fish1.maxSpeed = 10;
    // fish2.maxSpeed = 25;
    // fish3.maxSpeed = 5;

    //create bubbles
    for (i = 0; i < 6; i++) {
      bubbles[i] = new Bubble(
        random(0, 400),
        random(450, 900),
        random(25, 100),
        random(1, 3)
      )
    }
  }

  this.draw = function () {
    image(video, 0, 0, width, height);
    image(water, 0, 0);
    water.resize(windowWidth, windowHeight);

    //get position of right and left hand
    if (poses.length > 0) {
      let leftWrist = poses[0].pose.keypoints[10].position;
      let rightWrist = poses[0].pose.keypoints[9].position;
      //fill(255, 64);
      //ellipseMode(CENTER);

      //noStroke();
      for (let j = 0; j < positionsLeft.length; j++) {
        positionsLeft[j][1]++;
      }
      positionsLeft.push([leftWrist.x, leftWrist.y]);

      for (let i = 0; i < positionsRight.length; i++) {
        positionsRight[i][1]++;
      }
      positionsRight.push([rightWrist.x, rightWrist.y]);

      //mouse trailer, the speed is inversely proportional to the mouse distance
      fish1.velocity.x = (rightWrist.x - fish1.position.x) / 10;
      fish1.velocity.y = (rightWrist.y - fish1.position.y) / 10;
      
      fish2.velocity.x = (rightWrist.x - fish2.position.x - 30) / 10;
      fish2.velocity.y = (rightWrist.y - fish2.position.y - 30) / 10;
      
      fish3.velocity.x = (rightWrist.x - fish3.position.x + 5) / 10;
      fish3.velocity.y = (rightWrist.y - fish3.position.y + 15) / 10;
      
      for (i = 0; i < bubbles.length; i++) {
        bubbles[i].render();
        if (bubbles[i].y < -50) {
          bubbles[i].y = random(windowWidth, windowHeight);
          bubbles[i].x = random(0, windowWidth);
          bubbles[i].diameter = random(25, 100);
          bubbles[i].speed = random(1, 3);
        } else {
          bubbles[i].y -= bubbles[i].speed / 2;
        }
        drawKeypoints();
        drawSkeleton();
      }
    }
  }
}

function Scene4() {
  this.enter = function () {
    waterSound.stop();
    rainSound.play();
    windSound.stop();
    menuSound.stop();
    clearSnow();
    clearFish();
    
    for (let i = 0; i < numOfDrops; i++) {
      rain[i] = new Raindrop();
    }
    
  }

  this.setup = function () {
  }

  this.draw = function () {
    image(video, 0, 0, width, height);
    image(city, 0, 0);
    city.resize(windowWidth, windowHeight);

    for (let drop of rain) {
      drop.fall();
      drop.draw();
      //drop.splash();
      if (drop.hasFallen()) {
        drop.reset();
        if (rain.length > drawSkeleton) {
          rain.length = rain.splice(i, 1);
  }
      }
    }
    drawKeypoints();
    drawSkeleton();
  }

  this.keyPressed = function () {
    print("KEYPRESSED");
  }

  this.mousePressed = function () {
    print("MOUSEPRESSED");
  }
}