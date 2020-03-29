
const drawTiling = () => {

  for( let idRow = 0; idRow < gNum; idRow ++ ){

    for( let idColumn = 0; idColumn < gNum; idColumn++ ){

      push();
        
        translate( gLatticePoints[ idRow ][ idColumn ].x,
                   gLatticePoints[ idRow ][ idColumn ].y );
        setTileColor( idRow, idColumn );
        drawHex();

      pop();

    }

  }

  clipCanvas();
  drawNumber();

}

// Set tile color
const setTileColor = ( idRow, idColumn ) => {

  fill( color( gStateMatrix[idRow][idColumn] * 100.0 / gModulo, 
               gStateMatrix[idRow][idColumn] * 100.0 / gModulo, 
               100 ) );
  
}

const clipCanvas = () => {

  push();
    noStroke();
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}
