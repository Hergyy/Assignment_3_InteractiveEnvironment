//gets random snow size BUT more small snowflakes than large
function getRandomSize() {
  while(true) {
  let random1 = random(0.01);
  let random2 = random(0.01);
  if (random2 > random1) {
    return random1 * 20;
    }
  }
}

class Snowflake {
  
  // world is ref to world
  constructor(limbs) {
    let x = random(width);
    let y = random(-100, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0 , 1);
    this.acc = createVector();
    this.snowflake = new Sprite(snowImg, x, y);
    this.snowflake.scale = getRandomSize();
    this.snowflake.vel.x = this.vel.x;
    this.snowflake.vel.y = this.vel.y;
    this.limbs = limbs
  }
  
  edges() {
    if (this.pos.x < this.r || this.pos.x > width - this. radius) {
      this.vel.x += -1
    }
    if (this.pos.y < this.r || this.pos.y > width - this. radius) {
      this.vel.y += -1
    }
  }
  
  applyForce(force) {
    //Parallax Effect hack
    let f = force.copy();
    f.mult(this.snowflake.scale);
    this.acc.add(f);
  }
  
  update() {    
    //snow falling faster as it gets closer to the ground
    for (const limb of this.limbs) {
      if (this.snowflake.collide(limb)) {
        this.vel.set(0)
        return
      }
    }
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.3);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.snowflake.x = this.pos.x;
    this.snowflake.y = this.pos.y;
}
  
  //if off screen based on size = true or false and deletes
  offScreen() {
    return (this.pos.y > height + this.r);
  }
  
}