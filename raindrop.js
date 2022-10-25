class Raindrop {
  constructor() {
    this.reset(); 
    this.z = random(0, 10);
  }

  reset() {
    // starts raindrops slightly above canvas
    this.x = random(0, width);
    this.y = random(-height, 0);
    this.size = random(1.5, 8); 
    if (this.size > 3) {
      this.size = random(1.5, 8);
    }
    this.speed = this.size / 0.5; // speed at which raindrop falls
    this.dropThickness = floor(this.size / 3.8);
    if (this.dropThickness < 1) {
      this.dropThickness = 1;
    }
  }

  // moves the raindrop down based on it's size & speed, which creates the illusion of debth
  fall() {
    this.y += this.speed;
    
    if (this.y > mouseY && this.x > mouseX - this.block && this.x < mouseX + this.block && this.y < mouseY + 20) { // block condition

      this.splash();
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 4, 10);

    }
    
  }

  // draws the raindrop
  draw() {
    strokeWeight(this.dropThickness);
    stroke(200);
    line(this.x, this.y, this.x, this.y - this.size * 2);
  }
  

  // returns true if full length of raindrop has exited the bottom of the screen
  hasFallen() {
    let answer = false;
    if (this.y - this.size > height) {
      answer = true;
    }
    return answer;
  }
  
  // splash() {
  //   stroke(255);
  //   var thick = map(this.z, 0, 20, 1, 3)
  //   strokeWeight(thick);
  //   ellipse(this.x + 3, this.y - 1, 0.5, 0.5);
  //   ellipse(this.x - 3, this.y - 1, 0.5, 0.5);
  //   ellipse(this.x + 8, this.y - 3, 0.5, 0.5);
  //   ellipse(this.x - 8, this.y - 3, 0.5, 0.5);


  //} 
}
