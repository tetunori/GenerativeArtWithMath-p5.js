
// Get Vertex
const getVertex = ( vectors, scalar ) => {
  
  const newVertex = [];
  for( let index = 0; index < vectors.length - 1; index++ ){

    let newVector = p5.Vector.sub( vectors[ index + 1 ], vectors[ index ] );
    newVector.mult( scalar );
    newVector.add( vectors[ index ] );
    newVertex.push( newVector );

  }

  return newVertex;

}

