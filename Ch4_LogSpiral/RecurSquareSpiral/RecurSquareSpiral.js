
let gArrayVector = [];
let gGap = 0.2;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );

  showGapValue();
  setInitVectors();

  drawLogSpiral( WIDTH, HEIGHT, gGap );

}

function draw() {

  stroke( 0 );
  strokeWeight( 1 )
  drawSquare( gArrayVector );
  gArrayVector = getShiftedVectorArray( gArrayVector, gGap );

}

function mouseClicked() {
  
  background( 'white' );

  gGap = random( 1 ) / 2;
  showGapValue();
  setInitVectors();

  drawLogSpiral( WIDTH, HEIGHT, gGap );

}

const setInitVectors = () => {

  gArrayVector = [];
  gArrayVector.push( createVector( 0, 0 ) );
  gArrayVector.push( createVector( WIDTH, 0 ) );
  gArrayVector.push( createVector( WIDTH, HEIGHT ) );
  gArrayVector.push( createVector( 0, HEIGHT ) );

}

const showGapValue = () => { console.log( 'gap: ' + gGap ); }
