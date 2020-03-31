
const drawCurve = () => {

  background( 'white' );

  beginShape();
    drawKoch( gVector1, gVector2, 0 );
  endShape();

}

const drawKoch = ( startPointVector, endPointVector, iteration ) => {
  
  if( ( iteration === gUpperLimit ) || ( iteration > 5 ) ){

    vertex( startPointVector.x, startPointVector.y );
    vertex( endPointVector.x, endPointVector.y );
    return;

  }

  const vectorArray = [];
  const direction = p5.Vector.sub( endPointVector, startPointVector );
  direction.mult( 1.0 / 3 );
  slope = direction.copy();
  slope.rotate( Math.PI / 3 );
  
  vectorArray.push( startPointVector );
  vectorArray.push( p5.Vector.add( startPointVector, direction ) );
  vectorArray.push( p5.Vector.add( vectorArray[ 1 ], slope ) );
  vectorArray.push( p5.Vector.sub( endPointVector, direction ) );
  vectorArray.push( endPointVector );
  
  for( let index = 0; index < 4; index++ ){
    drawKoch( vectorArray[ index ], vectorArray[ index + 1 ], iteration + 1 );
  }

}
