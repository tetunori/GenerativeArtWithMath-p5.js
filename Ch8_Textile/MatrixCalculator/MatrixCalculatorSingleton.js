
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

// Print Matrix with prefix
const printMatrix = ( prefix, matrix ) => {

  console.log( prefix );
  let logText = '';

  for( const [ index, row ] of matrix.entries() ){

    const tempLog = '  row_' + index + ': ' + row;
    console.log( tempLog );
    logText += tempLog + '\n';

  }

  return prefix + '\n' + logText + '\n';

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

// Show text same as the result of console.log
const showText = ( _text ) => {

  const offset = 40;
  // console.log( _text );
  const xPos = offset;
  const yPos = offset; 
  textSize( 15 );
  text( _text, xPos, yPos );

}
