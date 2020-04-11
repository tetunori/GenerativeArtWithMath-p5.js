
const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  noLoop();

}

function draw() {
  
  // Initial drawing
  drawSpirals();

}

function mouseClicked() {
  
  background( 'white' );
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  drawSpirals();

}

const drawSpirals = () => {

  push();
  translate( WIDTH / 2, HEIGHT / 2 );

  stroke( 'black' );
  drawFibonacciSpiral( WIDTH );

  stroke( 'red' );
  drawGoldSpiral( WIDTH );
  
  pop();

  // Show some values on console
  showLatestFibonacciValue();

}
