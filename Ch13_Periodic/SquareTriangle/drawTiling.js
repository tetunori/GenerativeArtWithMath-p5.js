
const drawTiling = ( colorArray, gap ) => {

  background( colorArray[ 1 ] );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawSqTriangle( colorArray, gap );

      pop();

    }

  }

}
