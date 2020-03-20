
const getShiftedVectorArray = ( vectors, gap, gon ) => {

  const nextVectorArray = new Array( gon );

  for( let index = 0; index < gon; index++ ){
    
    // Get direction vector 
    const directionVector = p5.Vector.sub( vectors[ ( index + 1 ) % gon ], vectors[ index ] );

    // Shrink the vector
    directionVector.mult( gap );

    // Get a next vector by adding the two vectors
    nextVectorArray[ index ] = p5.Vector.add( vectors[ index ], directionVector ); 

  }

  return nextVectorArray;

}
