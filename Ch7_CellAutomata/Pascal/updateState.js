
// Update array
const updateState = () => {

  const BOUNDARY_VALUE = 0;
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 1 );

  array.splice( 0, 0, BOUNDARY_VALUE );
  array.splice( array.length, 0, BOUNDARY_VALUE );

  for( let index = 0; index < array.length - 1; index++ ){
    nextStateArray[ index ] = transition( index, array );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}
