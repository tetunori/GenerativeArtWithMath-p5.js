
const gNum = 5;
const gLatticePoints = [];
const gBaseVectors = [];
let gColorArray = [];

const WIDTH = 500;
const HEIGHT = 500;

let scalar;
let gGap = 0.5;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gGap );

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  gColorArray = [];
  gColorArray.push( getRandomColor() );
  gColorArray.push( getRandomColorLowSaturation() );
  
  makeSqVector();
  makeSqLattice();

}

function draw() { 

  gGap = getSliderGapValue();
  
  drawTiling( gColorArray, gGap ); 

  if( isEnableCaptureImage() ){

    disableCaptureImage();
    const namePNG = 'Gap' + gGap + '_' + 
                    getYYYYMMDD_hhmmss( true ) + '.png';
    captureImage( namePNG );

  }

  drawControllerCaptions();

}

const changeColor = () => {

  gColorArray = [];
  gColorArray.push( getRandomColor() );
  gColorArray.push( getRandomColorLowSaturation() );

}

const randomize = () => {

  randomizeGap();
  changeColor();

}

const drawTiling = ( colorArray, gap ) => {

  background( colorArray[ 0 ] );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawSqTriangle( colorArray[ 1 ], gap );

      pop();

    }

  }

}

const makeSqLattice = () => {

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

const drawSqTriangle = ( color, gap ) => {

  const vectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.fromAngle( Math.PI * ( index + 0.5 ) / 2 );
      vector.mult( 0.5 * scalar / Math.sqrt( 2 ) );
      vectorArray.push( vector );

  }

  for( let idReflection = 0; idReflection < 2; idReflection++ ){

    for( let idReflection2 = 0; idReflection2 < 2; idReflection2++ ){

        push();
          scale( Math.pow( -1, idReflection ), Math.pow( -1, idReflection2 ) );
          translate( scalar / 4, scalar / 4 );
          drawTriangle( vectorArray, color, gap );
        pop();

    }

  }

}

const drawTriangle = ( vectorArray, color, gap ) => {

  const smallSqVectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ],
                                      vectorArray[ index ] );
      vector.mult( gap );
      vector.add( vectorArray[ index ] );
      smallSqVectorArray.push( vector );

  }

  fill( color );
  for( let index = 0; index < 4; index++ ){

    beginShape();

      let vector = vectorArray[ index ];
      vertex( vector.x, vector.y );

      vector = smallSqVectorArray[ index ];
      vertex( vector.x, vector.y );

      vector = smallSqVectorArray[ ( index + 3 ) % 4 ];
      vertex( vector.x, vector.y );

    endShape();

  }

}

const makeSqVector = () => {

  gBaseVectors[ 0 ] = createVector( 0, 1 );
  gBaseVectors[ 1 ] = createVector( 1, 0 );

}

const setFibonacci = () => {
  gSliderGap.value( ( Math.sqrt( 5 ) - 1 ) / 2 );
}

const randomizeGap = () => {
  gSliderGap.value( random( 0, 1 ) );
}

let gSliderGap;

// Set up all controllers 
const setupController = ( initGap ) => {

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

  const btSetFibonacci = createButton( 'SET FIBONACCI' );
  btSetFibonacci.position( controllerOffset, btCaptureImage.y + controllerMargin );
  btSetFibonacci.size( buttonWidth, buttonHeight );
  btSetFibonacci.mousePressed( setFibonacci );

  // Slider Settings
  const minGapSlider = 0;
  const maxGapSlider = 1;
  gSliderGap = createSlider( minGapSlider, maxGapSlider, initGap, 0.01 );
  gSliderGap.position( controllerOffset, btSetFibonacci.y + controllerMargin );

  const btChangeColor = createButton( 'CHANGE COLOR' );
  btChangeColor.position( controllerOffset, gSliderGap.y + controllerMargin );
  btChangeColor.size( buttonWidth, buttonHeight );
  btChangeColor.mousePressed( changeColor );

  const btRandomize = createButton( 'RANDOMIZE ALL' );
  btRandomize.position( controllerOffset, btChangeColor.y + controllerMargin );
  btRandomize.size( buttonWidth, buttonHeight );
  btRandomize.mousePressed( randomize );

}

// Getter
const getSliderGapValue = () => { return gSliderGap.value(); }

// Draw controller captions  
const drawControllerCaptions = () => {

  // Tentatively, disable stroke.
  noStroke();
  
  // Draw background
  fill( color( 'rgba( 0, 0, 0, 0.4 )' ) );
  const offset = 10;
  const width = 235;
  const height = 202;
  const cornerRound = 5;
  rect( offset, offset, width, height, cornerRound );

  // Draw captions
  fill( color( 'white' ) );
  text( 'Gap: ' + getSliderGapValue(), gSliderGap.x * 1.5 + gSliderGap.width, 117 );
  
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

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}

// Get random color Low Saturation
const getRandomColorLowSaturation = () => {
  return color( random( 100 ), 40, 100 );
}

