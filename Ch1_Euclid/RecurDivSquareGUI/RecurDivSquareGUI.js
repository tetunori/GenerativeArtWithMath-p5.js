
let gThreashold = 100;
let gNumA = 10;
let gNumB =  6;
let gRatio = gNumB / gNumA;

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  setupController( gNumA, gNumB, gThreashold );
  
}

function draw() {
  
  background( 100, 0, 100 );
  gNumA = getSliderNumAValue();
  gNumB = getSliderNumBValue();
  gThreashold = getSliderThreasholdValue();

  gRatio = gNumB / gNumA;
  initColorCount();

  if( gRatio != 1 ){
    divSquare( 0, 0, WIDTH, gRatio, gThreashold );
  }

  if( isEnableCaptureImage() ){
    disableCaptureImage();
    const namePNG = 'NumA' + gNumA + '_NumB' + gNumB + '_Thr' + gThreashold + '.png';
    captureImage( namePNG );
  }

  drawControllerCaptions();
}
