
const WIDTH = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  showLatestFibonacciValue();
  noLoop();
  
}

function draw() { drawSquare( WIDTH ); }

function mouseClicked() {
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  // Then draw square
  drawSquare( WIDTH );

  // Show some values on console
  showLatestFibonacciValue();

}

