
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
