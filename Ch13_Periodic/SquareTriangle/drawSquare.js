
const drawSquare = () => {

  beginShape();

    for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
      vector.mult( scalar / Math.sqrt( 2 ) );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}
