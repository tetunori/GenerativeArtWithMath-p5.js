
const drawTiling = () => {

  background( 'white' );
  fill( getRandomColor() );

  const randomArray = [];
  for( let index = 0; index < 4; index++ ){
    randomArray[ index ] = random( -1, 1 );
  }

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPatternP3( randomArray );

      pop();

    }

  }

  clipCanvas();
  drawNumber();

}

const clipCanvas = () => {

  push();
    noStroke();
    fill( 'white' );
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
