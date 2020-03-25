
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
