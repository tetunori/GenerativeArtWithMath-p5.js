
const drawTiling = ( colorArray ) => {

  background( colorArray[ 0 ] );

  for( const [ idVectorArray, vectorArray ] of gLatticePoints.entries() ){

    for( const [ idVector, vector ] of vectorArray.entries()  ){

      push();
        
        translate( vector.x, vector.y );
        if( ( gMode === MODE_RANDOM_ROTATION ) || ( gMode === MODE_MIDPOINT_ROTATION ) ){
          rotate( gRotationArray[ idVectorArray ][ idVector ] );
        }
        drawHexRhomb( colorArray );

      pop();

    }

  }

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}
