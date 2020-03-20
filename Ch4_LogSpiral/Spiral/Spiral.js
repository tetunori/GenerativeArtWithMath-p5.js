
let gTheta = 0;
const STEP = 2 * Math.PI * 0.01;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  setupController();
  
}

function draw() {

  translate( WIDTH / 2, HEIGHT / 2 );

  const lineX1 = rad( gTheta ) * Math.cos( gTheta );
  const lineY1 = rad( gTheta ) * Math.sin( gTheta );
  const lineX2 = rad( gTheta + STEP ) * Math.cos( gTheta + STEP );
  const lineY2 = rad( gTheta + STEP ) * Math.sin( gTheta + STEP );
  line( lineX1, lineY1, lineX2, lineY2 );

  gTheta += STEP;
  
  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = gMode + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

const MODE_ARCHIMEDES = 'ARCHIMEDES';
const MODE_FERMAT = 'FERMAT';
const MODE_LOGARITHMIC = 'LOGARITHMIC';
let gMode = MODE_ARCHIMEDES;

// Calcurate radian
const rad = ( angle ) => {

  let retValue = undefined;
  
  if( gMode === MODE_ARCHIMEDES ){
    retValue = 5 * angle;
  }else if( gMode === MODE_FERMAT ){
    retValue = 20 * Math.sqrt( angle );
  }else{
    retValue = Math.pow( 1.1, angle );
  }
  return retValue;

}

const setSpiralMode = ( mode ) => {

  gMode = mode;
  gTheta = 0;
  background( 'white' );
  translate( -WIDTH / 2, -HEIGHT / 2 );

}

const setArchimedes = () => { setSpiralMode( MODE_ARCHIMEDES ); }
const setFermat = () => { setSpiralMode( MODE_FERMAT ); }
const setLogarithmic = () => { setSpiralMode( MODE_LOGARITHMIC ); }
