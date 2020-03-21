
let gModulo = 7;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gModulo );

}

function draw() {

  background( 'white' );

  gModulo = getSliderModuloValue();
  drawTable( gModulo, WIDTH );

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Modulo_' + gModulo + 
                      '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();
  
}

// Draw table
const drawTable = ( modulo, width ) => {

  const scalar = width / ( modulo - 1 );
  let num;

  for( let idRow = 1; idRow < modulo; idRow++ ){

    num = idRow;  
    for( let idColumn = 1; idColumn < modulo; idColumn++ ){

      const vector = createVector( idColumn - 1, idRow - 1 );
      vector.mult( scalar );

      // Draw frame
      fill( 'white' );
      rect( vector.x, vector.y, scalar, scalar );

      // Draw number text
      fill( 'black' );
      textSize( scalar );
      text( num, vector.x, vector.y + scalar );
      num = ( num * idRow ) % modulo;

    }

  }

}
