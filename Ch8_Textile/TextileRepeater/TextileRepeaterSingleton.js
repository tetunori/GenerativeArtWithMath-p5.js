
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

// Draw table
const drawTable = ( matrix, x, y, color1, color2, scalar ) => {

  let posY = y * scalar;
  for( [ idRow, elementRow ] of matrix.entries() ){

    let posX = x * scalar;
    for( [ idColumn, elementColumn ] of matrix[0].entries() ){

      if( matrix[ idRow ][ idColumn ] === 0 ){
        fill( color2 );
      }else{
        fill( color1 );
      }

      rect( posX, posY, scalar, scalar );
      posX += scalar;

    }

  posY += scalar;

  }

}

// Multiply Matrix
const multiplyMatrix = ( matrix1, matrix2 ) => {

  const rowNum = matrix1.length;
  const columnNum = matrix2[ 0 ].length;
  const newMatrix = getNewMatrix( rowNum, columnNum );

  for( const [ idRow, row ] of matrix1.entries() ){

    for( const [ idColumn, column ] of matrix2[0].entries() ){

      let sum = 0;
      for( const [ index, element ] of matrix2.entries() ){
        sum += matrix1[ idRow ][ index ] * matrix2[ index ][ idColumn ];
      }
      newMatrix[ idRow ][ idColumn ] = sum;
        
    }

  }

  return newMatrix;

}

// Transpose Matrix
const transposeMatrix = ( matrix ) => {

  const rowNum = matrix[ 0 ].length;
  const columnNum = matrix.length;
  const newMatrix = getNewMatrix( rowNum, columnNum );

  for( const [ idRow, row ] of matrix.entries() ){
    for( const [ idColumn, column ] of matrix[ 0 ].entries() ){
      newMatrix[ idColumn ][ idRow ] = matrix[ idRow ][ idColumn ];
    }
  }

  return newMatrix;

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

// Repeat matrix
const repeat = ( matrix ) => {

  for( [ idRow, elementRow ] of matrix.entries() ){

    let iZigzag = 0;
    const columnLength = matrix[0].length;
    
    if( Math.floor( idRow / columnLength ) % 2 === 0 ){
      iZigzag = idRow % columnLength;
    }else{
      iZigzag = columnLength - ( idRow % columnLength ) - 1;
    }
    matrix[ idRow ][ iZigzag ] = 1;

  }

}

