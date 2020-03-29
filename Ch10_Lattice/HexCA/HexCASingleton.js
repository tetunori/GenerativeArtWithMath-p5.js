
let gNum = 200;
let gModulo = 10;

let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let gScalar;
let gStateMatrix;

function setup() {

  createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum, gModulo );

  initialize();

}

function draw() {

  nextState = getNewMatrix( gNum, gNum );

  for( let idRow = 0; idRow < gNum; idRow ++ ){
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){
      nextState[ idRow ][ idColumn ] = transition( idRow, idColumn );
    }
  }

  gStateMatrix = nextState;
  drawTiling();

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  gModulo = getSliderModuloValue();
  initialize();
  
}

const initialize = () => {

  background( 'white' );
  gLatticePoints = [];
  gBaseVectors = [];
  gScalar = HEIGHT * 1.0 / gNum;

  // Initialize state matrix with padding 0
  gStateMatrix = getNewMatrix( gNum, gNum );

  for( let idRow = 0; idRow < gNum; idRow ++ ){
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){
      if( ( idRow === Math.floor( gNum / 2 ) ) && 
          ( idColumn === Math.floor( gNum / 2 ) ) ){
        gStateMatrix[ idRow ][ idColumn ] = 1;
      }
    }
  }

  makeHexVector();
  makeLattice();
  drawTiling();

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

const drawTiling = () => {

  for( let idRow = 0; idRow < gNum; idRow ++ ){

    for( let idColumn = 0; idColumn < gNum; idColumn++ ){

      push();
        
        translate( gLatticePoints[ idRow ][ idColumn ].x,
                   gLatticePoints[ idRow ][ idColumn ].y );
        setTileColor( idRow, idColumn );
        drawHex();

      pop();

    }

  }

  clipCanvas();
  drawNumber();

}

// Set tile color
const setTileColor = ( idRow, idColumn ) => {

  fill( color( gStateMatrix[idRow][idColumn] * 100.0 / gModulo, 
               gStateMatrix[idRow][idColumn] * 100.0 / gModulo, 
               100 ) );
  
}

const clipCanvas = () => {

  push();
    noStroke();
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}

const makeLattice = () => {

  for( let idRow = 0; idRow < gNum; idRow ++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * gScalar );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * gScalar ) );
      vectorArray.push( createVector( vector.x, vector.y % HEIGHT ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

  // console.log( gLatticePoints );

}

const drawHex = () => {

  beginShape();

    noStroke();
    for( let index = 0; index < 6; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * index / 6 );
      vector.mult( gScalar / Math.sqrt( 3 ) );
      vertex( vector.x, vector.y );

    }

  endShape( CLOSE );

}

const makeHexVector = () => {

  gBaseVectors[ 0 ] = p5.Vector.fromAngle( Math.PI / 2 );
  gBaseVectors[ 1 ] = p5.Vector.fromAngle( Math.PI / 6 );

}

let gSliderNum;
let gSliderModulo;

// Set up all controllers 
const setupController = ( initNum, initModulo ) => {

  const controllerOffset = 20;
  const controllerMargin = 40;

  // Button Settings
  const buttonWidth = 150;
  const buttonHeight = 20;
  const btCaptureImage = createButton( 'CAPTURE IMAGE' );
  btCaptureImage.position( controllerOffset + WIDTH, controllerOffset + 20 );
  btCaptureImage.size( buttonWidth, buttonHeight );
  btCaptureImage.mousePressed( captureImage );

  // Slider Settings
  const minNumSlider = 50;
  const maxNumSlider = 200;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  gSliderNum.mouseReleased( setNumber );
  gSliderNum.touchEnded( setNumber );

  const minModuloSlider = 2;
  const maxModuloSlider = 30;
  gSliderModulo = createSlider( minModuloSlider, maxModuloSlider, initModulo );
  gSliderModulo.position( controllerOffset + WIDTH, gSliderNum.y + controllerMargin * 2 );
  gSliderModulo.mouseReleased( setNumber );
  gSliderModulo.touchEnded( setNumber );

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

    const numDescription = 'num: ' + gNum;
    text( numDescription, 
            controllerOffset + WIDTH, 
            gSliderNum.y + controllerMargin );

    const moduloDescription = 'mod: ' + gModulo;
    text( moduloDescription, 
            controllerOffset + WIDTH, 
            gSliderModulo.y + controllerMargin );
  pop();
  
}

// Getter
const getSliderNumValue = () => { return gSliderNum.value(); }
const getSliderModuloValue = () => { return gSliderModulo.value(); }

// Capture Image
const captureImage = () => {

  const namePNG = 'num' + gNum + '_' + 'mod' + gModulo + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
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

// get next value
const transition = ( idRow, idColumn ) => {

  let nextValue;

  nextValue = 
      gStateMatrix[ idRow ][ idColumn ]                        // Center cell
    + gStateMatrix[ ( idRow - 1 + gNum ) % gNum ][ idColumn ]  // Upper cell
    + gStateMatrix[ ( idRow - 1 + gNum ) % gNum ][ ( idColumn + 1 ) % gNum ]  // Upper-right cell
    + gStateMatrix[ idRow ][ ( idColumn + 1) % gNum ]          // Lower-right cell
    + gStateMatrix[ ( idRow + 1 ) % gNum ][ idColumn ]         // Lower cell
    + gStateMatrix[ ( idRow + 1 ) % gNum ][ ( idColumn - 1 + gNum ) % gNum ] // Lower-left cell
    + gStateMatrix[ idRow ][ ( idColumn - 1 + gNum ) % gNum ]; // Upper-right cell

  nextValue %= gModulo;
  return nextValue;

}
