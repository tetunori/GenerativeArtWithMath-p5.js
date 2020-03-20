
const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  
}

function draw() {

  background( 'white' );
  drawLogSpiral( WIDTH, HEIGHT );
  
}
