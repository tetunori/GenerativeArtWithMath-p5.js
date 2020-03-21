
// Update array
const updateState = () => {

  const arrayBoundaryValue = [ 0, 0 ];
  const array = gStateArray;
  const nextStateArray = new Array( array.length + 2 );

  for( let element of arrayBoundaryValue ){
    array.splice( 0, 0, element );
  }

  for( let element of arrayBoundaryValue ){
    array.splice( array.length, 0, element );
  }
  
  for( let index = 1; index < array.length - 1; index++ ){
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    nextStateArray[ prevIndex ] = 
      transition( array[ prevIndex ], array[ index ], array[ nextIndex ], gArrayRule );
  }

  gStateArray = nextStateArray;
  gGeneration++;

}

