
const gStep = 30;
let gIterator = 0;

let gNum = 5;
let controlPoints = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

  // Initialize control points
  initializeControlPoints();

  noFill();

}

function draw() {

  if( gIterator === 0 ){
    background( 'white' );
    drawNumber();
  }

  drawBezier( gStep );

}

// Draw Bezier curve
const drawBezier = ( step ) => {

  // Draw Bezier curve by ourselves 
  let midPoint = controlPoints;
  while( midPoint.length > 1 ){

    midPoint = getVertex( midPoint, gIterator * 1.0 / step );

    stroke( midPoint.length * 100 / controlPoints.length, 100, 100, 20 );
    drawLine( midPoint );

  }
  gIterator++;

  // Draw Bezier curve from p5.js API 
  if( gIterator > step ){
    noLoop();
  }
 
}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    initializeControlPoints();
  }
  
}

const initializeControlPoints = () => {

  gIterator = 0;
  controlPoints = [];

  for( let index = 0; index < gNum; index++ ){

    controlPoints[ index ] = p5.Vector.random2D();
    controlPoints[ index ].mult( WIDTH / 2 );
    controlPoints[ index ].add( WIDTH / 2, HEIGHT / 2 );

  }

  loop();

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initializeControlPoints();
  
}
