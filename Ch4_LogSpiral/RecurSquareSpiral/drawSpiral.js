
const drawLogSpiral = ( width, height, gap ) => {

  const STEP = 2 * Math.PI * 0.001;
  const b = Math.sqrt( 2 * gap * gap - 2 * gap + 1 );
  const c = Math.atan( gap / ( 1 - gap ) );

  const vectorO = createVector( width / 2, height / 2 );
  let vectorV = createVector( 0, 0 );
  vectorV.sub( vectorO );

  translate( vectorO.x, vectorO.y );
  stroke( 'red' );
  strokeWeight( 3 );

  while( vectorV.mag() > 1 ){

    const nextVectorV = vectorV.copy();
    nextVectorV.rotate( STEP );
    nextVectorV.mult( pow( b, STEP / c ) );
    line( vectorV.x, vectorV.y, nextVectorV.x, nextVectorV.y );
    vectorV = nextVectorV;

  }

}
