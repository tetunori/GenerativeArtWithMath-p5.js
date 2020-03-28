
let gStep = 10;
let gIterator = 0;

const controlPoints = [];

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );

  // Initialize control points
  controlPoints[ 0 ] = createVector( 0, 0 );
  controlPoints[ 1 ] = createVector( WIDTH, 0 );
  controlPoints[ 2 ] = createVector( WIDTH, HEIGHT );

  noFill();

}

function draw() {
  drawBezier( gStep, WIDTH, HEIGHT );
}

// Draw Bezier curve
const drawBezier = ( step, width, height ) => {

  // Draw Bezier curve by ourselves 
  let midPoint = controlPoints;
  while( midPoint.length > 1 ){

    midPoint = getMidPoint( midPoint, gIterator * 1.0 / step );

    stroke( midPoint.length * 100 / controlPoints.length, 100, 100 );
    drawLine( midPoint );

  }
  gIterator++;

  // Draw Bezier curve from p5.js API 
  if( gIterator > step ){

    stroke( 'black' );
    strokeWeight( 1 );
    beginShape();
      vertex( 0, 0 );
      quadraticVertex( width, 0, width, height );
    endShape();
    noLoop();

  }
 
}

// Draw line
const drawLine = ( vectors ) => {

  if( vectors.length > 1 ){

    for( let index = 0; index < vectors.length - 1; index++ ){

      strokeWeight( 1 );
      const currentElement = vectors[ index ];
      const nextElement    = vectors[ index + 1 ];
      line( currentElement.x, currentElement.y, nextElement.x, nextElement.y );
      
    }

  }else{
    stroke( 'black' );
    strokeWeight( 8 );
    point( vectors[ 0 ].x, vectors[ 0 ].y );
  }

}

// get Midpoint of 
const getMidPoint = ( vectors, scalar ) => {
  
  const newMidPoint = [];
  for( let index = 0; index < vectors.length - 1; index++ ){

    let newVector = p5.Vector.sub( vectors[ index + 1 ], vectors[ index ] );
    newVector.mult( scalar );
    newVector.add( vectors[ index ] );
    newMidPoint.push( newVector );

  }

  return newMidPoint;

}
