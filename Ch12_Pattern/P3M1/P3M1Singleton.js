
let gNum = 2;

const MODE_HELLO_WORLD = 0;
const MODE_RECUR_TRIANGLE = 1;
let gMode = MODE_HELLO_WORLD;

let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;
let gImage;

function preload() {

  // Load initial image
  gImage = loadImage( 'HelloWorld.svg' );

}

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum, gMode );

  initialize();

}

const initialize = () => {

  background( 'white' );
  gLatticePoints = [];
  gBaseVectors = [];
  scalar = HEIGHT * 1.0 / gNum;

  makeHexVector();
  makeLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    drawTiling();
  }
  
}

const toggleMode = () => { 

  gMode = ( gMode + 1 ) % 2; 
  drawTiling();

}

const drawTiling = () => {

  background( 'white' );

  const gap = random( 0.01, 0.5 );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawHexTriangle( gap );

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

// Make lattices points
const makeLattice = () => {

  const m = Math.ceil( gNum / gBaseVectors[ 1 ].x );

  for( let idRow = 0; idRow < gNum + 1; idRow++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < m + 1; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * scalar );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * scalar ) );
      vectorArray.push( createVector( vector.x, vector.y % Math.floor( HEIGHT + scalar ) ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

  // console.log( gLatticePoints );

}

// Draw 6 triangles generated from a hexagon
const drawHexTriangle = ( gap ) => {

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idRotation = 0; idRotation < 3; idRotation++ ){

      push();

        scale( 1, Math.pow( -1, idReflection ) );
        rotate( 2 * Math.PI * idRotation / 3 );

        if( gMode === MODE_HELLO_WORLD ){
          drawTriangle();
        }else{
          drawRecurTriangle( gap );
        }

      pop();

    }

  }

}

// Draw single Hello world triangle
const drawTriangle = () => {

  imageMode( CENTER );
  image( gImage, 0, 0 );

}

// Draw trialge recursively
const drawRecurTriangle = ( gap ) => {

  let vectorArray = [];

  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( index * Math.PI / 3 );
    vector.mult( scalar / Math.sqrt( 3 ) );
    vectorArray.push( vector );

  }
  vectorArray.push( createVector( 0, 0 ) );

  beginShape( TRIANGLES );

    while( vectorArray[ 0 ].dist( vectorArray[ 1 ] ) > 1 ){

      for( let index = 0; index < 3; index++ ){
        const vector = vectorArray[ index ];
        vertex( vector.x, vector.y );
      }
      vectorArray = getVector( vectorArray, gap );

    }

  endShape();

}

// Get next vector
const getVector = ( vectorArray, gap ) => {

  const nextVector = [];

  for( let index = 0; index < 3; index++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 3 ], vectorArray[ index ] );
    vector.mult( gap );
    nextVector.push( p5.Vector.add( vectorArray[ index ], vector ) );

  }

  return nextVector;

}

// Make base vectors
const makeHexVector = () => {

  gBaseVectors[ 0 ] = p5.Vector.fromAngle( Math.PI / 2 );
  gBaseVectors[ 1 ] = p5.Vector.fromAngle( Math.PI / 6 );

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initialize();
  
}

let gSliderNum;

// Set up all controllers 
const setupController = ( initNum ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( captureImage );

  const btToggleMode = createButton( 'TOGGLE MODE' );
  btToggleMode.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  btToggleMode.size( buttonWidth, buttonHeight );
  btToggleMode.mousePressed( toggleMode );

  // Slider Settings
  const minNumSlider = 2;
  const maxNumSlider = 9;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btToggleMode.y + controllerMargin );
  gSliderNum.mouseReleased( setNumber );
  gSliderNum.touchEnded( setNumber );

}

// Draw Number 
const drawNumber = () => {

  const controllerOffset = 20;
  const controllerMargin = 40;
  
  // Text
  push();
    noStroke();
    fill( color( 'black' ) );
    textSize( 14 );

    const description = 'num: ' + gNum;
    text( description, 
            controllerOffset + WIDTH, 
            gSliderNum.y + controllerMargin );
  pop();
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'num' + gNum + '_' + getYYYYMMDD_hhmmss( true ) + '.png';
  saveCanvas( namePNG, 'png' );

}

// get Timestamp string
const getYYYYMMDD_hhmmss = ( isNeedUS ) => {

  const now = new Date();
  let retVal = '';

  // YYMMDD
  retVal += now.getFullYear();
  retVal += padZero2Digit( now.getMonth() + 1 );
  retVal += padZero2Digit( now.getDate() );

  if( isNeedUS ){ retVal += '_'; }

  // hhmmss
  retVal += padZero2Digit( now.getHours() );
  retVal += padZero2Digit( now.getMinutes() );
  retVal += padZero2Digit( now.getSeconds() );

  return retVal;

}

// padding function
const padZero2Digit = ( num ) => {
  return ( num < 10 ? "0" : "" ) + num;
}
