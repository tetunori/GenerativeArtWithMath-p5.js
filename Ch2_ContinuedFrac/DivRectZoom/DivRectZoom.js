
const RATIO = Math.sqrt( 2 );
// const RATIO = Math.sqrt( 3 );
// const RATIO = ( 1 + Math.sqrt( 5 ) ) / 2;
const WIDTH  = 500;
const HEIGHT = WIDTH / RATIO;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( getPointerX ); 
  colorMode( HSB, 1 );

}

function draw() { 

  background( 0, 0, 1 );
  const scalar = Math.pow( 50, getPointerX() * 1.0 / WIDTH ) * WIDTH;
  divRect( WIDTH - scalar, HEIGHT - ( scalar / RATIO ), scalar, RATIO );
  
}

const getPointerX = () => {

  if( touches[0] ){
    return touches[0].x;
  }else{
    return mouseX;
  }

}
