
const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  showLatestFibonacciValue();
  noLoop();
  
}

function draw() { drawSquare(); }

function mouseClicked() {
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  // Then draw square
  drawSquare();

  // Show some values on console
  showLatestFibonacciValue();

}
