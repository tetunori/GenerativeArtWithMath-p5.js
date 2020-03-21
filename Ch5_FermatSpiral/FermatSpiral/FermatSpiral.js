
let gIteration =  0;
let gRotationAngle = 17.0 / 55;
let gNum = 10;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum );
  background( 'white' );

}

function draw() {
  
  translate( WIDTH / 2, HEIGHT / 2 );
  fill( 0 );
  drawFermatSpiral( gIteration, gRotationAngle );
  gIteration++;

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    let namePNG;
    if( gMode === MODE_3 ){
      namePNG = '1_' + gNum;
    }else{
      namePNG = gMode;
    }
    namePNG += '_' + getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

}

const drawFermatSpiral = ( iteration, angleRotation ) => {

  const scalar = 5;

  const theta = 2 * Math.PI * angleRotation * iteration;
  const vectorV = p5.Vector.fromAngle( theta );
  vectorV.mult( scalar * Math.sqrt( iteration ) );
  ellipse( vectorV.x, vectorV.y, scalar, scalar );

}
