const fs = require("fs"),
  Canvas = require("canvas"),
  helpers = require(__dirname + "/../helpers/general.js");

module.exports = function(options, cb) {
  /* 
    Based on https://generativeartistry.com/tutorials/piet-mondrian/
  */
  console.log("generating squares...");

  let width = options.width || 584,
    height = options.height || 506,
    size = width,
    colors = options.colors || ["#D40920", "#F7D842", "#1356A2"],
    canvas = Canvas.createCanvas(width, height),
    ctx = canvas.getContext("2d");

  ctx.lineWidth = helpers.getRandomInt(1, 24);
  ctx.fillStyle = `#${colors[0]}`;
  ctx.strokeStyle = `#${colors[1]}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let squares = [
    {
      x: 0,
      y: 0,
      width: width,
      height: height
    }
  ];

  canvas.width = width;
  canvas.height = height;
  ctx.lineWidth = 2;

  var step = size / 7;
  var white = "#F2F5F1";
  
//var size = 320;
//var dpr = window.devicePixelRatio;
//canvas.width = size * dpr;
//canvas.height = size * dpr;
//ctx.scale(dpr, dpr);
//context.lineWidth = 2;

var finalSize = 3;
var startSteps;
var offset = 2;
var tileStep = (size - offset * 2) / 7;
var startSize = tileStep;
var directions = [-1, 0, 1];

function draw(x, y, width, height, xMovement, yMovement, steps) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
    
  if(steps >= 0) {
    var newSize = (startSize) * (steps / startSteps) + finalSize;
    var newX = x + (width - newSize) / 2
    var newY = y + (height - newSize) / 2
    newX = newX - ((x - newX) / (steps + 2)) * xMovement
    newY = newY - ((y - newY) / (steps + 2)) * yMovement
    draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
  }
}

for( var x = offset; x < size - offset; x += tileStep) {
  for( var y = offset; y < size - offset; y += tileStep) {
    startSteps = 2 + Math.ceil(Math.random() * 3)
    var xDirection = directions[Math.floor(Math.random() * directions.length)]
    var yDirection = directions[Math.floor(Math.random() * directions.length)]
    draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
  }
}  
  
/*
  function splitSquaresWith(coordinates) {
    const { x, y } = coordinates;

    for (let i = squares.length - 1; i >= 0; i--) {
      const square = squares[i];

      if (x && x > square.x && x < square.x + square.width) {
        if (Math.random() > 0.5) {
          squares.splice(i, 1);
          splitOnX(square, x);
        }
      }

      if (y && y > square.y && y < square.y + square.height) {
        if (Math.random() > 0.5) {
          squares.splice(i, 1);
          splitOnY(square, y);
        }
      }
    }
  }

  function splitOnX(square, splitAt) {
    let squareA = {
      x: square.x,
      y: square.y,
      width: square.width - (square.width - splitAt + square.x),
      height: square.height
    };

    let squareB = {
      x: splitAt,
      y: square.y,
      width: square.width - splitAt + square.x,
      height: square.height
    };

    squares.push(squareA);
    squares.push(squareB);
  }

  function splitOnY(square, splitAt) {
    let squareA = {
      x: square.x,
      y: square.y,
      width: square.width,
      height: square.height - (square.height - splitAt + square.y)
    };

    let squareB = {
      x: square.x,
      y: splitAt,
      width: square.width,
      height: square.height - splitAt + square.y
    };

    squares.push(squareA);
    squares.push(squareB);
  }

  for (let i = 0; i < size; i += step) {
    splitSquaresWith({ y: i });
    splitSquaresWith({ x: i });
  }

  for (let i = 0; i < colors.length; i++) {
    squares[Math.floor(Math.random() * squares.length)].color = colors[i];
  }
  for (let i = 0; i < squares.length; i++) {
    ctx.beginPath();
    ctx.rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
    if (squares[i].color) {
      ctx.fillStyle = squares[i].color;
    } else {
      ctx.fillStyle = white;
    }
    ctx.fill();
    ctx.stroke();
  }
*/
  if (cb) {
    cb(null, {
      data: canvas.toBuffer().toString("base64")
    });
  }
};