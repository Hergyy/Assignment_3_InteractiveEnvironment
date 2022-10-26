class Raindrop {
  constructor() {
    this.reset(); 
    this.z = random(0, 10);
  }

  reset() {
    // starts raindrops above canvas
    this.x = random(0, width);
    this.y = random(-height, 0);
    this.size = random(1.5, 8); 
    if (this.size > 3) {
      this.size = random(1.5, 8);
    }
    // speed of raindrop
    this.speed = this.size / 0.5; 
    this.dropThickness = floor(this.size / 3.8);
    if (this.dropThickness < 1) {
      this.dropThickness = 1;
    }
  }

  // raindrops fall according to size
  fall() {
    this.y += this.speed;
      this.yspeed = map(this.z, 0, 20, 4, 10);
    
  }

  // draws the raindrop
  draw() {
    strokeWeight(this.dropThickness);
    stroke(200);
    line(this.x, this.y, this.x, this.y - this.size * 2);
  }
  

  //if raindrop has left the screen
  hasFallen() {
    let answer = false;
    if (this.y - this.size > height) {
      answer = true;
    }
    return answer;
  }
}

