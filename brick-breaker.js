let playerScore = 0
let paddle
let ball
let bricks
let gameState

function setup() {
  createCanvas(800, 600)

  let colors = createColors()
  let points = createPoints()
  gameState = 'playing'
  paddle = new Paddle()
  ball = new Ball(paddle)

  bricks = createBricks(colors, points)
}

function createPoints() {
  const points = []
  for (var i = 0; i < 10; i++) {
    points.push(int(random(1,7)));
  }
  return points
}

function createColors() {
  const colors = []
  colors.push(color(0, 0, 255))
  colors.push(color(255, 0, 0))
  colors.push(color(0, 255, 0))
  colors.push(color(255, 255, 0))
  colors.push(color(0, 255, 255))
  colors.push(color(255, 0, 255))
  colors.push(color(255, 126, 0))
  colors.push(color(102, 0, 204))
  return colors
}


function createBricks(colors, points) {
  let star = false
  const bricks = []
  const rows = 10
  const bricksPerRow = 10
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      star = random(0,1) <= 0.15 ? true : false
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))], points[floor(random(0, points.length))], star)
      bricks.push(brick)
    }
  }
  return bricks
}

function draw() {
  if(gameState === 'playing') {
    background(0)

    ball.bounceEdge()
    ball.bouncePaddle()

    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left')
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }

    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]
      if (brick.isColliding(ball)) {
        ball.reverse('y')
        brick.points == 1 || brick.star ? bricks.splice(i, 1) : brick.points--
        if(brick.star){
          playerScore += 10
        }
        else{
          playerScore += 1
        }
        ball.speed = 5 + playerScore/50
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()

    textSize(32)
    fill(169,169,169)
    text(`Score:${playerScore}`, width/2-width/15, height/2 + height/3)
    textSize(32)
    fill(169,169,169)
    text(`Ball Speed:${ball.speed.toFixed(2)}`, width/2-width/14, height - height/4)

    if (ball.belowBottom()) {
      gameState = 'Lose'
    }

    if (bricks.length === 0) {
      gameState = 'Win'
    }
  } else {
    textSize(100)
    gameState === 'Lose' ? fill(255) : fill(0, 0, 255)
    text(`You ${gameState}!!!`, width / 2 - 220, height / 2 + height/7)
  }
}
