
let gHorizontalParam = 0.0;
let gVerticalParam = 0.0;

const GON = 6;
let gLatticePoints = [];
let gBaseVectors = [];

let randomMatrix = [];

const WIDTH = 500;
const HEIGHT = 500;

const ROW = 10;
let gColumnNum;
let gTileColorMatrix;

const SCALAR = HEIGHT * 1.0 / ROW;

function setup() {

  createCanvas( WIDTH, HEIGHT, P2D );
  colorMode( HSB, 100 );
  setupController( gHorizontalParam, gVerticalParam );

  makeHexVector();
  gColumnNum = Math.ceil( ROW / ( gBaseVectors[ 1 ].x - 1.0 / Math.sqrt( 3 ) ) );
  randomize();

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

// Randomize function
const randomize = () => {

  randomMatrix = getNewMatrix( 3, 2 );
  for( let index = 0; index < 3; index++ ){

    randomMatrix[ index ][ 0 ] = random( -1, 1 );
    randomMatrix[ index ][ 1 ] = random( -1, 1 );

  }
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
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
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

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );

    for( let index = 0; index < GON; index++ ){

      const controlPointVectors = parameterizeIH02( vectorArray, index, randomMatrix );
      const cpv0 = controlPointVectors[ 0 ];
      const cpv1 = controlPointVectors[ 1 ];
      const vector = vectorArray[ ( index + 1 ) % GON ];
      bezierVertex( cpv0.x, cpv0.y, 
                    cpv1.x, cpv1.y,
                    vector.x, vector.y );

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

const parameterizeIH02 = ( vectorArray, index, randomMatrix ) => {
  
  const controlPointVectors = [];

  for( let indexCP = 0; indexCP < 2; indexCP++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % GON ], vectorArray[ index ] );
    vector.mult( Math.pow( -1, indexCP ) );
    controlPointVectors.push( vector );

    const cpv = controlPointVectors[ indexCP ];
    if( index < 3 ){
      cpv.rotate( randomMatrix[ index ][ indexCP ] * Math.PI / 3 );
    }else if( index !== 4 ){
      cpv.rotate( -1.0 * randomMatrix[ 5 - index ][ indexCP ] * Math.PI / 3 );
    }else{
      cpv.rotate( randomMatrix[ 5 - index ][ ( indexCP + 1 ) % 2 ] * Math.PI / 3 );
    }
    cpv.add( vectorArray[ ( index + indexCP ) % GON ] );

  }

  return controlPointVectors;

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

  const btRandomize = createButton( 'RANDOMIZE' );
  btRandomize.position( controllerOffset, gSliderVertical.y + controllerMargin );
  btRandomize.size( buttonWidth, buttonHeight );
  btRandomize.mousePressed( randomize );

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
