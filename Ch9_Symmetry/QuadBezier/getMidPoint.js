
// get Midpoint of 
const getMidPoint = ( vectors, scalar ) => {
  
  const newMidPoint = [];
  for( let index = 0; index < vectors.length - 1; index++ ){

    let newVector = p5.Vector.sub( vectors[ index + 1 ], vectors[ index ] );
    newVector.mult( scalar );
    newVector.add( vectors[ index ] );
    newMidPoint.push( newVector );

  }

  return newMidPoint;

}
