class Brick {
  constructor(location, width, height, color, points, star) {
    this.location = location
    this.width = width
    this.height = height
    this.color = color
    this.points = points
    this.star = star
  }

  display() {
    fill(this.color)
    rect(this.location.x, this.location.y, this.width, this.height)
    fill(0,0,0)
    textSize(13)
    this.star ? text("☆", this.location.x+(this.width/2), this.location.y+15) : text(this.points, this.location.x+(this.width/2), this.location.y+15)
  }

  isColliding(ball) {
    // collide with brick
    return collideRectCircle(this.location.x,this.location.y,this.width,this.height,ball.location.x,ball.location.y,35);

}
}
