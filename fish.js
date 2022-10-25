class Fish {
  constructor(x, y, length, height) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.height = height;
    this.angle = 0;
  }
  
  update() {
  this.angle = atan2(mouseY - this.y, mouseX - this.x);
  let mouseLocation = createVector(mouseX, mouseY);
  let distance = mouseLocation.dist(fishLocation);
  let mappedDistance = map(distance, 100, 0, 1.5, 0);

  mouseLocation.sub(fishLocation);
  mouseLocation.normalize();
  mouseLocation.mult(mappedDistance);

  if (distance > 35) {
    fishLocation.add(mouseLocation)
  }

  this.x = fish1.x
  this.y = fishLocation.y
}
  
  draw() {
  noStroke();
  fill('tomato');
  this.y = constrain(this.y, 30, height - 30);
  this.x = constrain(this.x, 30, width - 30);

  push();
  translate(this.x, this.y);
  rotate(this.angle);

  // body
  ellipse(0, 0, this.length, this.height);

  // tail
  let tailWidth = this.length / 4;
  let tailHeight = this.height / 2;
  triangle(0 - this.length / 2, 0, 0 - this.length / 2 - tailWidth, 0 - tailHeight, 0 - this.length / 2 - tailWidth, 0 + tailHeight);

  // eye
  noStroke();
  fill(33, 33, 33);
  ellipse(0 + this.length / 4, 0, this.height / 5, this.height / 5);

  pop();
}

  
}
