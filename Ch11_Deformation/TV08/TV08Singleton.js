
let gHorizontalParam = 0.0;
let gVerticalParam = 0.0;

let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

const ROW = 10;
let gColumnNum;
let gTileColorMatrix;

const SCALAR = HEIGHT * 1.0 / ROW;;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gHorizontalParam, gVerticalParam );

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

// Deform Hex
const deformHex = () => {

  const vectorArray = [];
  const GON = 6;

  for( let index = 0; index < GON; index++ ){

    let vector = p5.Vector.fromAngle( 2 * Math.PI * index / GON );
    vector.mult( SCALAR / Math.sqrt( 3 ) );
    vectorArray.push( vector );
    parameterizeTV08( vectorArray, index );
    
  }

  beginShape();

    for( let index = 0; index < GON; index++ ){
      vertex( vectorArray[ index ].x, vectorArray[ index ].y );
    }

  endShape( CLOSE );

}

// Deform lattice
const deformLattice = () => {

  gLatticePoints = [];

  for( let idRow = 0; idRow < ROW + 1; idRow ++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < gColumnNum + 1; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * SCALAR );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * SCALAR ) );
      vector.add( gHorizontalParam * SCALAR * idColumn / Math.sqrt( 3 ), 0 );
      vectorArray.push( createVector( vector.x, vector.y % Math.floor( HEIGHT + SCALAR ) ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

}

const parameterizeTV08 = ( vector, index ) => {

  if( ( index % 3 ) === 0 ){
    vector[ index ].mult( 1 + gHorizontalParam );
  }

  if( ( index > 1 ) && ( index < 5 ) ){
    vector[ index ].add( 0, -0.5 * gVerticalParam * SCALAR / Math.sqrt( 3 ) );
  }else{
    vector[ index ].add( 0, 0.5 * gVerticalParam * SCALAR / Math.sqrt( 3 ) );
  }

  return vector[ index ];

}

// Draw tiling
const drawTiling = () => {

  for( let idRow = 0; idRow < gLatticePoints.length; idRow++ ){

    for( let idColumn = 0; idColumn < gLatticePoints[ 0 ].length; idColumn++ ){

      push();
        
        translate( gLatticePoints[ idRow ][ idColumn ].x,
                   gLatticePoints[ idRow ][ idColumn ].y );
        scale( Math.pow( -1, idColumn ), 1 );
        fill( gTileColorMatrix[ idRow ][ idColumn ] );
        deformHex();

      pop();

    }

  }

}

// Set tile color
const setTileColor = () => {

  gTileColorMatrix = getNewMatrix( ROW + 1, gColumnNum + 1 );

  for( let idRow = 0; idRow < ROW + 1; idRow++ ){
    for( let idColumn = 0; idColumn < gColumnNum + 1; idColumn++ ){
      gTileColorMatrix[ idRow ][ idColumn ] = getRandomColor();
    }
  }
  
}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}

const makeHexVector = () => {

  gBaseVectors[ 0 ] = p5.Vector.fromAngle( Math.PI / 2 );
  gBaseVectors[ 1 ] = p5.Vector.fromAngle( Math.PI / 6 );

}

let gSliderHorizontal;
let gSliderVertical;

// Set up all controllers 
const setupController = ( initHorizontal, initVertical ) => {

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

  // Slider Settings
  const minHorizontalSlider = -1;
  const maxHorizontalSlider = ( Math.sqrt( 3 ) - 1 ) / 2;
  gSliderHorizontal = createSlider( minHorizontalSlider, maxHorizontalSlider, initHorizontal, 0.01 );
  gSliderHorizontal.position( controllerOffset, btCaptureImage.y + controllerMargin );

  const minVerticalSlider = 0;
  const maxVerticalSlider = 1;
  gSliderVertical = createSlider( minVerticalSlider, maxVerticalSlider, initVertical, 0.01 );
  gSliderVertical.position( controllerOffset, gSliderHorizontal.y + controllerMargin );

}

// Getter
const getSliderHorValue = () => { return gSliderHorizontal.value(); }
const getSliderVerValue = () => { return gSliderVertical.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 285;
  const height = 130;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Horizontal: ' + getSliderHorValue(), gSliderHorizontal.x * 1.5 + gSliderHorizontal.width, 77 );
  text( 'Vertical: ' + getSliderVerValue(), gSliderVertical.x * 1.5 + gSliderVertical.width, 117 );
  
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
