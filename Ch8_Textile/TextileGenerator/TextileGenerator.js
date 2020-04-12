
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

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchEnded( mouseClicked ); 

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

  const x = floor( getPointerX() / SCALAR );
  const y = floor( getPointerY() / SCALAR );

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

const getPointerX = () => {

  if( touches[0] ){
    return touches[0].x;
  }else{
    return mouseX;
  }

}

const getPointerY = () => {

  if( touches[0] ){
    return touches[0].y;
  }else{
    return mouseY;
  }

}
