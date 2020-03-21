
let gIteration =  0;

const MODE1_ARRAY = [ 1.0 / 3, 1.0 / 61, 20.0 / 61 ];
const MODE2_ARRAY = [ 4.0 / 17, 17.0 / 72, 72.0 / 305 ];
const MODE3_ARRAY = [ 33.0 / 109, 109.0 / 360 ];  
let gRotationAngleArray = MODE1_ARRAY;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  setupController();
  background( 'white' );

}

function draw() {
  
  translate( WIDTH / 2, HEIGHT / 2 );
  noStroke();

  fill( 255, 0, 0, 127 ); // Red
  drawFermatSpiral( gIteration, gRotationAngleArray[0] );
  fill( 0, 0, 255, 127  ); // Blue
  drawFermatSpiral( gIteration, gRotationAngleArray[1] );

  if( gRotationAngleArray.length > 2 ){
    fill( 0, 255, 0, 127 ); // Green
    drawFermatSpiral( gIteration, gRotationAngleArray[2] );
  }

  gIteration++;

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = gMode + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
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
