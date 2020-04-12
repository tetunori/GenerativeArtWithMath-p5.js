
const WIDTH = 500;
const HEIGHT = 500;

const REPEAT_COUNT = 10;
const gColumnA = 10;
const gRowA = REPEAT_COUNT * gColumnA;
const SCALAR = HEIGHT / ( gRowA + gColumnA );

let gMatrixA;
let gMatrixB;
let gMatrixC;
let gMatrixP;

let gIsSymmetry = true;

let gColorVertical;
let gColorHorizontal;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );

  gMatrixA = getNewMatrix( gRowA, gColumnA );
  repeat( gMatrixA );

  gMatrixB = getNewMatrix( gColumnA, gColumnA );
  randomize( gMatrixB );

  gMatrixC = transposeMatrix( gMatrixA );

}

function draw() {

  const BLACK = color( 'black' );
  const WHITE = color( 'white' );

  // Calcurate P = A(tB)C
  gMatrixP = multiplyMatrix( 
              multiplyMatrix( gMatrixA, transposeMatrix( gMatrixB ) ), 
                gMatrixC );

  // Draw pattern
  noStroke();
  drawTable( gMatrixA,        0, gColumnA, BLACK, WHITE, SCALAR );
  drawTable( gMatrixB,        0,        0, BLACK, WHITE, SCALAR );
  drawTable( gMatrixC, gColumnA,        0, BLACK, WHITE, SCALAR );
  drawTable( gMatrixP, gColumnA, gColumnA, 
                         gColorHorizontal, gColorVertical, SCALAR );

  // For separator
  stroke('grey');
  strokeWeight( 1 );
  const lenB = SCALAR * gColumnA;

  // Horizontal separator
  line( 0, lenB, WIDTH, lenB );
  
  // Vertical separator
  line( lenB, 0, lenB, HEIGHT );

}

function mouseClicked() {

  gIsSymmetry = true;
  randomize( gMatrixB );

}

function keyPressed() {

  gIsSymmetry = false;
  randomize( gMatrixB );

}

// Randomize matrix
const randomize = ( matrix ) => {

  // Fill with random 0/1s
  for( const [ idRow, row ] of matrix.entries() ){
    for( const [ idColumn, column ] of matrix[ 0 ].entries() ){
      matrix[ idRow ][ idColumn ] = getRandomInteger( 0, 2 );
    }
  }

  // Symmetrize 
  if( gIsSymmetry ){
    for( const [ idRow, row ] of matrix.entries() ){
      for( const [ idColumn, column ] of matrix[ 0 ].entries() ){
        if( idColumn >= idRow ){
          matrix[ idColumn ][ idRow ] = matrix[ idRow ][ idColumn ];
        }
      }
    }
  }

  // Also randomize colors 
  gColorVertical = color( random( 100 ), 100, 100 );
  gColorHorizontal = color( random( 100 ), 100, 100 );

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
