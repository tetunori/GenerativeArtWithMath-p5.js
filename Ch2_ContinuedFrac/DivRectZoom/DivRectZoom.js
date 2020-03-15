
const RATIO = Math.sqrt( 2 );
// const RATIO = Math.sqrt( 3 );
// const RATIO = ( 1 + Math.sqrt( 5 ) ) / 2;
const WIDTH  = 500;
const HEIGTH = WIDTH / RATIO;

function setup() {

  createCanvas( WIDTH, HEIGTH );
  colorMode( HSB, 1 );

}

function draw() { 

  background( 0, 0, 1 );
  const scalar = Math.pow( 50, mouseX * 1.0 / WIDTH ) * WIDTH;
  divRect( WIDTH - scalar, HEIGTH - ( scalar / RATIO ), scalar, RATIO );
  
}
