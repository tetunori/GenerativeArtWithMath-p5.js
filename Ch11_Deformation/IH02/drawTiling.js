
const drawTiling = () => {

  randomMatrix = getNewMatrix( 3, 2 );
  for( let index = 0; index < 3; index++ ){

    randomMatrix[ index ][ 0 ] = random( -1, 1 );
    randomMatrix[ index ][ 1 ] = random( -1, 1 );

  }

  for( let idRow = 0; idRow < gLatticePoints.length; idRow++ ){

    for( let idColumn = 0; idColumn < gLatticePoints[ 0 ].length; idColumn++ ){

      push();
        
        const vector = gLatticePoints[ idRow ][ idColumn ];
        translate( vector.x, vector.y );
        scale( Math.pow( -1, idColumn ), 1 );
        fill( getRandomColor() );
        deformHex();

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

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}
