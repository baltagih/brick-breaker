class Ball {
  constructor(paddle) {
    this.speed = 5
    this.radius = 15
    this.size = this.radius * 2
    this.location = createVector(paddle.location.x + (paddle.width / 2), (paddle.location.y - this.radius - 5))
    this.color = color(230, 255, 247)
    this.velocity = createVector(this.speed, -this.speed)
    this.paddle = paddle
    constrain(this.location.x, this.radius, width-this.radius)
    constrain(this.location.y, this.radius, height+this.radius)
  }

  bouncePaddle() {
    let hit = collideRectCircle(this.paddle.location.x,this.paddle.location.y,this.paddle.width,this.paddle.height/2,this.location.x,this.location.y,30);
    if(hit){
      this.reverse('y');
      this.location.y = this.paddle.location.y - this.radius - 1;
    }
  }

  bounceEdge() {
    if (this.location.x + this.radius >= width) { // Check right edge
      this.reverse('x')
    } else if(this.location.x - this.radius <= 0) { // Check left edge
      this.reverse('x')
    } else if(this.location.y - this.radius <= 0) { // Check the top
      this.reverse('y')
    }
  }

  display() {
    fill(this.color)
    ellipse(this.location.x, this.location.y, this.size, this.size)
  }

  update() {
    this.location.add(this.velocity)
    if(this.velocity.x < 0){
      this.velocity.x = -this.speed
    }else{
      this.velocity.x = this.speed
    }
    if(this.velocity.y < 0){
      this.velocity.y = -this.speed
    }else{
      this.velocity.y = this.speed
    }
  }

  reverse(coord) {
    this.velocity[coord] *= -1
  }

  belowBottom() {
    return this.location.y - this.radius > height
  }
}
