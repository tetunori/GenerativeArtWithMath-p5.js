
const drawHex = () => {

  beginShape();

    noStroke();
    for( let index = 0; index < 6; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * index / 6 );
      vector.mult( gScalar / Math.sqrt( 3 ) );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}
