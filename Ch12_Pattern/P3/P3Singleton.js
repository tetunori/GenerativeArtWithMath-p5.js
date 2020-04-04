
let gNum = 10;
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

const drawTiling = () => {

  background( 'white' );
  fill( getRandomColor() );

  const randomArray = [];
  for( let index = 0; index < 4; index++ ){
    randomArray[ index ] = random( -1, 1 );
  }

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPatternP3( randomArray );

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

  for( let idRow = 0; idRow < gNum + 1; idRow ++ ){

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

const drawPatternP3 = ( randomArray) => {

    for( let index = 0; index < 3; index++ ){

      push();
        rotate( 2 * Math.PI * index / 3 );
        drawRhomboid( randomArray );
      pop();
      
    }

}

const drawRhomboid = ( randomArray ) => {

  const vectorArray = [];
  for( let index = 0; index < 2; index++ ){

    const vector = p5.Vector.fromAngle( 2 * Math.PI * index / 3 );
    vector.mult( scalar / Math.sqrt( 3 ) );
    vectorArray.push( vector );

  }

  const ctrVectorArray = [];
  for( let index = 0; index < 4; index++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 2 ], 
                                    vectorArray[ index % 2 ] );
    vector.rotate( randomArray[ index ] * Math.PI / 3 );
    vector.add( vectorArray[ index % 2 ] );
    ctrVectorArray.push( vector );

  }

  beginShape();

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );
    bezierVertex( ctrVectorArray[ 0 ].x, ctrVectorArray[ 0 ].y,
                  ctrVectorArray[ 1 ].x, ctrVectorArray[ 1 ].y,
                  vectorArray[ 1 ].x, vectorArray[ 1 ].y, );
    bezierVertex( ctrVectorArray[ 3 ].x, ctrVectorArray[ 3 ].y,
                  ctrVectorArray[ 2 ].x, ctrVectorArray[ 2 ].y,
                  vectorArray[ 0 ].x, vectorArray[ 0 ].y, );

  endShape();


}

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
  return color( random( 100 ), 100, 100 );
}

