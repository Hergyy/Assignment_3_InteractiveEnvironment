class Bubble {
  
  constructor(x, y, diameter, speed) {
  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.speed = speed;
}
  
  render() {
   strokeWeight(2);
  stroke('white');
  noFill();
  circle(this.x, this.y, this.diameter);
  arc(this.x, this.y, this.diameter - (0.2 * this.diameter), this.diameter - (0.2 * this.diameter), 12, 56)
}
}