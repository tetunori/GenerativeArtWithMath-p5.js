
const parameterizeIH01 = ( vectorArray, index, randomMatrix ) => {
  
  const controlPointVectors = [];

  for( let indexCP = 0; indexCP < 2; indexCP++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % GON ], vectorArray[ index ] );
    vector.mult( Math.pow( -1, indexCP ) );
    controlPointVectors.push( vector );

    const cpv = controlPointVectors[ indexCP ];
    if( index < 3 ){
      cpv.rotate( randomMatrix[ index % 3 ][ indexCP % 2 ] * Math.PI / 3 );
    }else{
      cpv.rotate( randomMatrix[ index % 3 ][ ( indexCP + 1 ) % 2 ] * Math.PI / 3 );
    }
    cpv.add( vectorArray[ ( index + indexCP ) % GON ] );

  }

  return controlPointVectors;

}

