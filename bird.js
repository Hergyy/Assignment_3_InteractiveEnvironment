class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = random(height * 0.25, height * 0.75);
    //print("new bird at x = "+this.x+" y = "+this.y);
  }

  fly() {
    this.x = this.x + 1.5;
    this.y = this.y + -0.2;
  }

  display() {
    fill(0);
    noStroke();
    triangle(this.x, this.y, this.x + 2, this.y + 8, this.x + 5, this.y - 10);
    ellipse(this.x, this.y, 12, 3);
  }
}