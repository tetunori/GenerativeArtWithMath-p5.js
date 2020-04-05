
const drawTriangle = ( vectorArray, colorArray, gap ) => {

  const smallSqVectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ],
                                      vectorArray[ index ] );
      vector.mult( gap );
      vector.add( vectorArray[ index ] );
      smallSqVectorArray.push( vector );

  }

  fill( colorArray[ 0 ] );
  for( let index = 0; index < 4; index++ ){

    beginShape();

      let vector = vectorArray[ index ];
      vertex( vector.x, vector.y );

      vector = smallSqVectorArray[ index ];
      vertex( vector.x, vector.y );

      vector = smallSqVectorArray[ ( index + 3 ) % 4 ];
      vertex( vector.x, vector.y );

    endShape();

  }

}
