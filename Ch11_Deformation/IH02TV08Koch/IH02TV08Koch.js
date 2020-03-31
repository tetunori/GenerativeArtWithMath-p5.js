
let gHorizontalParam = 0.0;
let gVerticalParam = 0.0;

const GON = 6;
let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

const ROW = 10;
let gColumnNum;
let gTileColorMatrix;

const SCALAR = HEIGHT * 1.0 / ROW;
let gUpperLimit = 0;

function setup() {

  createCanvas( WIDTH, HEIGHT, P2D );
  colorMode( HSB, 100 );
  setupController( gHorizontalParam, gVerticalParam );
  gUpperLimit = 0;

  makeHexVector();
  gColumnNum = Math.ceil( ROW / ( gBaseVectors[ 1 ].x - 1.0 / Math.sqrt( 3 ) ) );
  setTileColor();

}

function draw() {

  background( 'white' );
  gHorizontalParam = getSliderHorValue();
  gVerticalParam = getSliderVerValue();

  deformLattice();
  drawTiling();

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Hor' + gHorizontalParam + '_' + 
                    'Ver' + gVerticalParam + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}
