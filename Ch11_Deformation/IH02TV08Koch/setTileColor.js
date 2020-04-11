
// Set tile color
const setTileColor = () => {

  gTileColorMatrix = getNewMatrix( ROW + 1, gColumnNum + 1 );

  for( let idRow = 0; idRow < ROW + 1; idRow++ ){
    for( let idColumn = 0; idColumn < gColumnNum + 1; idColumn++ ){
      gTileColorMatrix[ idRow ][ idColumn ] = getRandomColor();
    }
  }
  
}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}
