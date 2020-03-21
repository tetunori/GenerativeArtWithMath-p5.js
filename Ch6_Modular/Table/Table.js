
let gModulo = 5;
let gIsAddition = true;

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
    let namePNG = 'Modulo_' + gModulo;
    if( gIsAddition ){
      namePNG += '_Add'; 
    }else{
      namePNG += '_Mult'; 
    }
    namePNG += '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();
  
}

// Draw table
const drawTable = ( modulo, width ) => {

  const scalar = width / modulo;
  for( let idRow = 0; idRow < modulo; idRow++ ){

    for( let idColumn = 0; idColumn < modulo; idColumn++ ){

      let num; 
      if( gIsAddition ){
        // Add mode
        num = ( idRow + idColumn ) % modulo;
      }else{
        // Mult mode
        num = ( idRow * idColumn ) % modulo;
      }
      const vector = createVector( idColumn, idRow );
      vector.mult( scalar );

      // Draw frame
      fill( 'white' );
      rect( vector.x, vector.y, scalar, scalar );

      // Draw number text
      fill( 'black' );
      textSize( scalar );
      text( num, vector.x, vector.y + scalar );

    }

  }

}
