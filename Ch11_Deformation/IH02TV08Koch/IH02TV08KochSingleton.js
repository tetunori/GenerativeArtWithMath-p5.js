
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

// Subdivide function
const subdivide = () => {

  gUpperLimit++;
  setTileColor();

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

// Draw tiling
const drawTiling = () => {


  for( let idRow = 0; idRow < gLatticePoints.length; idRow++ ){

    for( let idColumn = 0; idColumn < gLatticePoints[ 0 ].length; idColumn++ ){

      push();
        
        const vector = gLatticePoints[ idRow ][ idColumn ];
        translate( vector.x, vector.y );
        scale( Math.pow( -1, idColumn ), 1 );
        fill( gTileColorMatrix[ idRow ][ idColumn ] );
        deformHex();

      pop();

    }

  }

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}

// deform Hex
const deformHex = () => {

  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * index / GON );
    vector.mult( SCALAR / Math.sqrt( 3 ) );
    vectorArray.push( vector );
    parameterizeTV08( vectorArray, index );

  }

  beginShape();

    for( let index = 0; index < GON; index++ ){

      if( index < 3 ){
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % GON ], 0, true );
      }else{
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % GON ], 0, false );
      }

    }

  endShape( CLOSE );

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

// Draw Koch
const drawKoch = ( startPointVector, endPointVector, iteration, isConvexClockwise ) => {
  
  if( ( iteration === gUpperLimit ) || ( iteration > 5 ) ){

    vertex( startPointVector.x, startPointVector.y );
    vertex( endPointVector.x, endPointVector.y );
    return;

  }

  const vectorArray = [];
  const direction = p5.Vector.sub( endPointVector, startPointVector );
  direction.mult( 1.0 / 3 );
  slope = direction.copy();
  if( isConvexClockwise ){
    slope.rotate( Math.PI / 3 );
  }else{
    slope.rotate( -Math.PI / 3 );
  }
  
  vectorArray.push( startPointVector );
  vectorArray.push( p5.Vector.add( startPointVector, direction ) );
  vectorArray.push( p5.Vector.add( vectorArray[ 1 ], slope ) );
  vectorArray.push( p5.Vector.sub( endPointVector, direction ) );
  vectorArray.push( endPointVector );
  
  for( let index = 0; index < 4; index++ ){
    drawKoch( vectorArray[ index ], vectorArray[ index + 1 ], iteration + 1, isConvexClockwise );
  }

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

  const btSubDivide = createButton( 'SUBDIVIDE' );
  btSubDivide.position( controllerOffset, gSliderVertical.y + controllerMargin );
  btSubDivide.size( buttonWidth, buttonHeight );
  btSubDivide.mousePressed( subdivide );

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
  const height = 160;
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
