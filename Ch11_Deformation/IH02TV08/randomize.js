
// Randomize function
const randomize = () => {

  randomMatrix = getNewMatrix( 3, 2 );
  for( let index = 0; index < 3; index++ ){

    randomMatrix[ index ][ 0 ] = random( -1, 1 );
    randomMatrix[ index ][ 1 ] = random( -1, 1 );

  }
  setTileColor();

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}
