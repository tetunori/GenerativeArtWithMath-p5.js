
// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
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

// Toggle 0/1 with specified matrix[ row ][ column ]
const toggleElement = ( matrix, row, column ) => {
  matrix[ row ][ column ] = ( matrix[ row ][ column ] + 1 ) % 2;
} 
