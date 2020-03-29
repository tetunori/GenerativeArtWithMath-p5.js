
const initialize = () => {

  background( 'white' );
  gLatticePoints = [];
  gBaseVectors = [];
  gScalar = HEIGHT * 1.0 / gNum;

  // Initialize state matrix with padding 0
  gStateMatrix = getNewMatrix( gNum, gNum );

  for( let idRow = 0; idRow < gNum; idRow ++ ){
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){
      if( ( idRow === Math.floor( gNum / 2 ) ) && 
          ( idColumn === Math.floor( gNum / 2 ) ) ){
        gStateMatrix[ idRow ][ idColumn ] = 1;
      }
    }
  }

  makeHexVector();
  makeLattice();
  drawTiling();

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}
