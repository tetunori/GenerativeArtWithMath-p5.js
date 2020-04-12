
const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( getPointerX ); 
  colorMode( HSB, 100 );
  
}

function draw() {

  background( 'white' );
  drawLogSpiral( WIDTH, HEIGHT );
  
}
