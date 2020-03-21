
// Update array
const updateState = () => {

  const num = gMaxGenerationNum;

  const nextStateArray = getNew2DimensionArray( num );

  for( let idRow = 0; idRow < num; idRow++ ){

    for( let idColumn = 0; idColumn < num; idColumn++ ){

      nextStateArray[ idRow ][ idColumn ] = 
        transition( idRow, idColumn, num, gStateArray, gModulo );
      
    }

  }

  gStateArray = nextStateArray;

}
