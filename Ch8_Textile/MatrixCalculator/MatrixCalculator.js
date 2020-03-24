
const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );

  const matrixA = [ 
    [ 2, 1 ], 
    [ 0, 1 ]
  ];

  const matrixB = [ 
    [ 3 ],
    [ 1 ]
  ];

  let resultText = '';

  resultText += printMatrix( 'Matrix A: ', matrixA );
  resultText += printMatrix( 'Matrix B: ', matrixB );
  

  // Multiply 
  const multipliedMatrix = multiplyMatrix( matrixA, matrixB );
  resultText += printMatrix( 'Multiply A*B: ', multipliedMatrix );

  // Transpose
  const transposedMatrix = transposeMatrix( matrixA );
  resultText += printMatrix( 'Transpose of A: ', transposedMatrix );

  showText( resultText );

}

// Show text same as the result of console.log
const showText = ( _text ) => {

  const offset = 40;
  // console.log( _text );
  const xPos = offset;
  const yPos = offset;
  textSize( 15 );
  text( _text, xPos, yPos );

}
