
const gNum = 10;
const gLatticePoints = [];
const gBaseVectors = [];
let gColorArray = [];
let gRotationArray = [];

const WIDTH = 500;
const HEIGHT = 500;

let scalar;

const MODE_STANDARD = 0;
const MODE_RANDOM_ROTATION = 1;
const MODE_CONNECT_MIDPOINT = 2;
const MODE_MIDPOINT_ROTATION = 3;
let gMode = MODE_STANDARD;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController();

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  initializeColor();
  
  makeHexVector();
  makeLattice();

  initializeRotationArray();

}

function draw() { 

  drawTiling( gColorArray ); 

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const initializeColor = () => {

  gColorArray = [];
  for( let index = 0; index < 3; index++ ){
    gColorArray.push( getRandomColor() );
  }

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}

const initializeRotationArray = () => {

  gRotationArray = [];
  for( const vectorArray of gLatticePoints ){

    const tempArray = [];

    for( const vector of vectorArray ){
      tempArray.push( getRandomInteger( 0, 6 ) * Math.PI / 3 );
    }

    gRotationArray.push( tempArray );

  }
  
}

const changeParam = () => {

  initializeColor();
  initializeRotationArray();

}

const toggleMode = () => {
  gMode = ( gMode + 1 ) % 4;
  draw();
}

const drawTiling = ( colorArray ) => {

  background( colorArray[ 0 ] );

  for( const [ idVectorArray, vectorArray ] of gLatticePoints.entries() ){

    for( const [ idVector, vector ] of vectorArray.entries()  ){

      push();
        
        translate( vector.x, vector.y );
        if( ( gMode === MODE_RANDOM_ROTATION ) || ( gMode === MODE_MIDPOINT_ROTATION ) ){
          rotate( gRotationArray[ idVectorArray ][ idVector ] );
        }
        drawHexRhomb( colorArray );

      pop();

    }

  }

}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
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

const drawHexRhomb = ( colorArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 6; index++ ){

      const vector = p5.Vector.fromAngle( Math.PI * index / 3 );
      vector.mult( scalar / Math.sqrt( 3 ) );
      vectorArray.push( vector );

  }

  drawRhomboid( vectorArray, colorArray );

}

const drawRhomboid = ( vectorArray, colorArray ) => {

  
  for( let i = 0; i < 6; i += 2 ){

    const vertexVectors = [];

    fill( colorArray[ Math.floor( i / 2 ) ] );

    beginShape();

      const zeroVector = createVector( 0, 0 );
      if( gMode < MODE_CONNECT_MIDPOINT ){
        vertex( zeroVector.x, zeroVector.y );
      }
      vertexVectors.push( zeroVector );

      for( let j = -1; j < 2; j++ ){

        const vector = vectorArray[ ( i + j + 6 ) % 6 ];
        if( gMode < MODE_CONNECT_MIDPOINT ){
          vertex( vector.x, vector.y );
        }
        vertexVectors.push( vector );

      }

    endShape( CLOSE );

    if( gMode >= MODE_CONNECT_MIDPOINT ){
      drawRect( vertexVectors, colorArray );
    }

  }

}

const drawRect = ( vertexVectors, colorArray ) => {

  fill( colorArray[ 1 ] );

  beginShape();

    for( let index = 0; index < 4; index++ ){

      const vector = vertexVectors[ index ].copy(); 
      vector.add( vertexVectors[ ( index + 1 ) % 4 ] );
      vector.mult( 0.5 );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

const makeHexVector = () => {

  gBaseVectors[ 0 ] = p5.Vector.fromAngle( Math.PI / 2 );
  gBaseVectors[ 1 ] = p5.Vector.fromAngle( Math.PI / 6 );

}

// Set up all controllers 
const setupController = ( ) => {

  // Set font size for captions
  textSize( 15 );

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset, controllerOffset );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( enableCaptureImage );

  const btChangeParam = createButton( 'CHANGE PARAM' );
  btChangeParam.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btChangeParam.size( buttonWidth, buttonHeight );
  btChangeParam.mousePressed( changeParam );

  const btToggleMode = createButton( 'TOGGLE MODE' );
  btToggleMode.position( controllerOffset, btChangeParam.y + controllerMargin );
  btToggleMode.size( buttonWidth, buttonHeight );
  btToggleMode.mousePressed( toggleMode );

}

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 170;
  const height = 122;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Revert stroke
  stroke( color( 'black' ) );

}


// Capture Image
const captureImage = ( namePNG ) => {
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

let gIsCaptureImage = false;

// Is capture image function is ready or not
const isEnableCaptureImage = () => {
  return ( gIsCaptureImage === true );
}

// Enable capture image function
const enableCaptureImage = () => {
  gIsCaptureImage = true;
}

// Disable capture image function
const disableCaptureImage = () => {
  gIsCaptureImage = false;
}
