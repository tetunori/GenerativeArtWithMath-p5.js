
const drawTiling = () => {

  background( 'white' );

  const randomArray = [];
  for( let index = 0; index < 4; index++ ){
    randomArray[ index ] = random( -1, 1 );
  }

  const color1 = getRandomColor();
  const color2 = getRandomColor();

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPatternP31M( randomArray, color1, color2 );

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
