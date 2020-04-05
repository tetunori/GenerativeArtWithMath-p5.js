
const drawPentagon = ( vectorArray, colorArray, gap ) => {

  const smallSqVectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ],
                                      vectorArray[ index ] );
      vector.mult( gap );
      vector.add( vectorArray[ index ] );
      smallSqVectorArray.push( vector );

  }

  const pentagonVectorArray = [];
  const theta = atan( gap );
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ],
                                      smallSqVectorArray[ index ] );
      vector.mult( 0.5 / Math.pow( Math.cos( theta ), 2 ) );
      vector.add( smallSqVectorArray[ index ] );
      pentagonVectorArray.push( vector );

  }

  for( let index = 0; index < 4; index++ ){

    fill( colorArray[ index + 1 ] );
    beginShape();

      let vector = vectorArray[ index ];
      vertex( vector.x, vector.y );

      vector = pentagonVectorArray[ ( index + 3 ) % 4 ];
      vertex( vector.x, vector.y );
      vertex( 0, 0 );

      vector = pentagonVectorArray[ index ];
      vertex( vector.x, vector.y );

    endShape();

  }

}
