
let gModulo = 7;
let gIsAddition = true;

const VISUAL_MODE_COLORED = 1;
const VISUAL_MODE_SCALE   = 2;
const VISUAL_MODE_COLORED_SCALE = 3;
let gModeVisual = VISUAL_MODE_COLORED;

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

    if( gModeVisual === VISUAL_MODE_COLORED ){
      namePNG += '_Colored'; 
    }else if( gModeVisual === VISUAL_MODE_SCALE ){
      namePNG += '_Scale'; 
    }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){
      namePNG += '_Both'; 
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
      const vector = createVector( idColumn + 0.5, idRow + 0.5 );
      vector.mult( scalar );

      if( gModeVisual === VISUAL_MODE_COLORED ){

        // Draw color dot
        fill( num * 100 / modulo, 100, 90 );
        noStroke();
        ellipse( vector.x, vector.y, scalar / 2, scalar / 2 );

      }else if( gModeVisual === VISUAL_MODE_SCALE ){

        // Draw black dot
        fill( 'black' );
        const size = scalar * num / modulo;
        ellipse( vector.x, vector.y, size, size );

      }else if( gModeVisual === VISUAL_MODE_COLORED_SCALE ){

        // Draw black dot
        fill( num * 100 / modulo, 100, 90 );
        noStroke();
        const size = scalar * num / modulo;
        ellipse( vector.x, vector.y, size, size );

      }
      
    }

  }

}
