
const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  showLatestFibonacciValue();
  noLoop();
}

function draw() {
  
  // Traslate effect will never be reset in this code
  translate( WIDTH / 2, HEIGHT / 2 );

  // Initial drawing
  drawRect( WIDTH ); 
  
}

function mouseClicked() {
  
  // Generate next Fibonacci number
  getNextFibonacci( true );

  // Then draw spiral square
  drawRect( WIDTH );

  // Show some values on console
  showLatestFibonacciValue();

}
