
let gNum = 10;
let gLatticePoints = [];
const gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;
let gUpperLimit = 0;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT, P2D );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

  initialize();

}

const initialize = () => {

  background( 'white' );
  scalar = HEIGHT * 1.0 / gNum;
  gUpperLimit = 0;

  makeSqVector();
  makeSqLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){

    background( 'white' );
    gUpperLimit++;
    drawTiling();
    
  }
  
}

const drawTiling = () => {

  randomMatrix = getNewMatrix( 2, 2 );
  for( let index = 0; index < 2; index++ ){

    randomMatrix[ index ][ 0 ] = random( -1, 1 );
    randomMatrix[ index ][ 1 ] = random( -1, 1 );

  }
  
  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        fill( getRandomColor() );
        deformSquare();

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

const makeSqLattice = () => {

  gLatticePoints = [];
  for( let idRow = 0; idRow  < gNum + 1; idRow ++ ){

    const vectorArray = [];
    for( let idColumn = 0; idColumn < gNum + 1; idColumn++ ){

      const vector = p5.Vector.mult( gBaseVectors[ 0 ], idRow  * scalar );
      vector.add( p5.Vector.mult( gBaseVectors[ 1 ], idColumn * scalar ) );
      vectorArray.push( createVector( vector.x, vector.y ) );
    
    }
    gLatticePoints.push( vectorArray );
  
  }

  // console.log( gLatticePoints );

}

const deformSquare = () => {

  const GON = 4;
  const vectorArray = [];

  for( let index = 0; index < GON; index++ ){
    
    const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
    vector.mult( scalar / Math.sqrt( 2 ) );
    vectorArray.push( vector );

  }

  beginShape();

    for( let index = 0; index < GON; index++ ){

      if( index < 2 ){
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % 4 ], 0, true );
      }else{
        drawKoch( vectorArray[ index ], vectorArray[ ( index + 1 ) % 4 ], 0, false );
      }

    }

  endShape( CLOSE );

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

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

const makeSqVector = () => {

  gBaseVectors[ 0 ] = createVector( 0, 1 );
  gBaseVectors[ 1 ] = createVector( 1, 0 );

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

  // Slider Settings
  const minNumSlider = 3;
  const maxNumSlider = 20;
  gSliderNum = createSlider( minNumSlider, maxNumSlider, initNum );
  gSliderNum.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
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

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 40, 100 );
}

