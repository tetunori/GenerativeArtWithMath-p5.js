
let gNum = 5;
let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT, P2D );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

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

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  initialize();
  
}

const drawTiling = () => {

  const randomArray = [];
  for( let index = 0; index < 4; index++ ){
    randomArray[ index ] = random( -1, 1 );
  }

  fill( getRandomColor() );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPatternP6M( randomArray );

      pop();

    }

  }

  clipCanvas();
  drawNumber();

}

const clipCanvas = () => {

  push();
    noStroke();
    fill( 'white' );
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}

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

const drawPatternP6M = ( randomArray ) => {

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idRotation = 0; idRotation < 6; idRotation++ ){

      push();
        scale( 1, Math.pow( -1, idReflection ) );
        rotate( 2 * Math.PI * idRotation / 6 );
        drawTriangle( randomArray );
      pop();

    }

  }

}

const drawTriangle = ( randomArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( index * Math.PI / 6 );
    vector.mult( scalar );
    vectorArray.push( vector );

  }

  const ctrVectorArray = [];
  for( let index = 0; index < 4; index++ ){

    const vector = p5.Vector.mult( vectorArray[ Math.floor( index / 2 ) ], 
                                    randomArray[ index ] );
    ctrVectorArray.push( vector );

  }

  beginShape();

    vertex( 0, 0 );
    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    bezierVertex( ctrVectorArray[ 1 ].x, ctrVectorArray[ 1 ].y,
                  ctrVectorArray[ 2 ].x, ctrVectorArray[ 2 ].y,
                  ctrVectorArray[ 3 ].x, ctrVectorArray[ 3 ].y, );

  endShape( CLOSE );

}

const makeHexVector = () => {

  gBaseVectors[ 0 ] = p5.Vector.fromAngle( Math.PI / 2 );
  gBaseVectors[ 1 ] = p5.Vector.fromAngle( Math.PI / 6 );

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

