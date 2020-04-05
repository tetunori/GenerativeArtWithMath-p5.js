
const drawTiling = () => {

  fill( getRandomColor() );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPythagoras();

      pop();

    }

  }

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
