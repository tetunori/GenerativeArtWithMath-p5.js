
const getShiftedVectorArray = ( vectors, gap ) => {

  const nextVectorArray = [];

  for( let index = 0; index < vectors.length; index++ ){
    
    // Get direction vector 
    const directionVector = p5.Vector.sub( vectors[ ( index + 1 ) % 4 ], vectors[ index ] );

    // Shrink the vector
    directionVector.mult( gap );

    // Get a next vector by adding the two vectors
    nextVectorArray.push( p5.Vector.add( vectors[ index ], directionVector ) ); 

  }

  return nextVectorArray;

}
