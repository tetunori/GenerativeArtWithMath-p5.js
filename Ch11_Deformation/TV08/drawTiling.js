
// Draw tiling
const drawTiling = () => {

  for( let idRow = 0; idRow < gLatticePoints.length; idRow++ ){

    for( let idColumn = 0; idColumn < gLatticePoints[ 0 ].length; idColumn++ ){

      push();
        
        translate( gLatticePoints[ idRow ][ idColumn ].x,
                   gLatticePoints[ idRow ][ idColumn ].y );
        scale( Math.pow( -1, idColumn ), 1 );
        fill( gTileColorMatrix[ idRow ][ idColumn ] );
        deformHex();

      pop();

    }

  }

}
