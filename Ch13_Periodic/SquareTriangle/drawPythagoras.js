
const drawPythagoras = () => {

  const vectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
      vector.mult( scalar / Math.sqrt( 2 ) );
      vectorArray.push( vector );

  }

  const theta = Math.atan( gGap );
  const slope = p5.Vector.sub( vectorArray[ 1 ], vectorArray[ 0 ] );
  slope.rotate( theta );

  let tempVector;

  tempVector = slope.copy();
  tempVector.mult( Math.sin( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = slope.copy();
  tempVector.mult( Math.cos( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = slope.copy();
  tempVector.mult( 1.0 / Math.cos( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = p5.Vector.sub( vectorArray[ 5 ], vectorArray[ 1 ] );
  tempVector.add( vectorArray[ 4 ] );
  vectorArray.push( tempVector );

  tempVector = p5.Vector.sub( vectorArray[ 6 ], vectorArray[ 1 ] );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  drawDoubleSquare( vectorArray );
  drawEdge( vectorArray );

}
