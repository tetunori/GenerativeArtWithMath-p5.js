
const WIDTH = 500;
const HEIGHT = 500;

const gRowA = 20;
const gColumnA = 4;
const SCALAR = HEIGHT / ( gRowA + gColumnA );

let gMatrixA;
let gMatrixB;
let gMatrixC;
let gMatrixP;

function setup() {

  createCanvas( WIDTH, HEIGHT );

  gMatrixA = getNewMatrix( gRowA,    gColumnA );
  gMatrixB = getNewMatrix( gColumnA, gColumnA );
  gMatrixC = getNewMatrix( gColumnA, gRowA    );

}

function draw() {

  const colorVertical = color( 'yellow' );
  const colorHorizontal = color( 'red' );
  const BLACK = color( 'black' );
  const WHITE = color( 'white' );

  // Calcurate P = A(tB)C
  gMatrixP = multiplyMatrix( 
              multiplyMatrix( gMatrixA, transposeMatrix( gMatrixB ) ), 
                gMatrixC );

  // Draw grid
  strokeWeight( 1 );
  drawTable( gMatrixA,        0, gColumnA, BLACK, WHITE, SCALAR );
  drawTable( gMatrixB,        0,        0, BLACK, WHITE, SCALAR );
  drawTable( gMatrixC, gColumnA,        0, BLACK, WHITE, SCALAR );
  drawTable( gMatrixP, gColumnA, gColumnA, 
                         colorHorizontal, colorVertical, SCALAR );

  // For separator
  strokeWeight( 3 );
  const lenB = SCALAR * gColumnA;

  // Horizontal separator
  line( 0, lenB, WIDTH, lenB );
  
  // Vertical separator
  line( lenB, 0, lenB, HEIGHT );

}

function mouseClicked() {

  const x = floor( mouseX / SCALAR );
  const y = floor( mouseY / SCALAR );

  if( y < gColumnA ){
    if( x < gColumnA ){
      toggleElement( gMatrixB, y, x );
    }else{
      toggleElement( gMatrixC, y, x - gColumnA );
    }
  }else if( x < gColumnA ){
    toggleElement( gMatrixA, y - gColumnA, x );
  }

}

// Toggle 0/1 with specified matrix[ row ][ column ]
const toggleElement = ( matrix, row, column ) => {
  matrix[ row ][ column ] = ( matrix[ row ][ column ] + 1 ) % 2;
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

