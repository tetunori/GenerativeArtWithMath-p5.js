
const drawTiling = () => {

  background( 'white' );

  const gap = random( 0.01, 0.5 );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawHexTriangle( gap );

      pop();

    }

  }

  clipCanvas();
  drawNumber();

}

const clipCanvas = () => {

  push();
    noStroke();
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}
