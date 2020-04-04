
let gNum = 10;
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

  for( let index = 0; index < 2; index++ ){
    gColorArray.push( getRandomColorLowSaturation() );
  }

  makeSqVector();
  makeSqLattice();

}

function draw() { 

  gGap = getSliderGapValue();
  
  drawTiling(); 

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
  for( let index = 0; index < 2; index++ ){
    gColorArray.push( getRandomColorLowSaturation() );
  }

}

const drawTiling = () => {

  fill( getRandomColor() );

  for( const vectorArray of gLatticePoints ){

    for( const vector of vectorArray ){

      push();
        
        translate( vector.x, vector.y );
        drawPythagoras();

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

const drawPythagoras = () => {

  const vectorArray = [];
  for( let index = 0; index < 4; index++ ){

      const vector = p5.Vector.fromAngle( 2 * Math.PI * ( index + 0.5 ) / 4 );
      vector.mult( scalar / Math.sqrt( 2 ) );
      vectorArray.push( vector );

  }

  // gGap = ( Math.sqrt( 5 ) - 1 ) / 2;

  const theta = Math.atan( gGap );
  const slope = p5.Vector.sub( vectorArray[ 1 ], vectorArray[ 0 ] );
  slope.rotate( theta );

  let tempVector;

  tempVector = slope.copy();
  tempVector.mult( Math.sin( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = slope.copy();
  tempVector.mult( Math.cos( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = slope.copy();
  tempVector.mult( 1.0 / Math.cos( theta ) );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  tempVector = p5.Vector.sub( vectorArray[ 5 ], vectorArray[ 1 ] );
  tempVector.add( vectorArray[ 4 ] );
  vectorArray.push( tempVector );

  tempVector = p5.Vector.sub( vectorArray[ 6 ], vectorArray[ 1 ] );
  tempVector.add( vectorArray[ 0 ] );
  vectorArray.push( tempVector );

  drawDoubleSquare( vectorArray );
  drawEdge( vectorArray );

}

const drawDoubleSquare = ( vectorArray ) => {

  const indDomain = [
    [ [ 0, 1, 5 ], [ 4, 6, 2, 3 ], [ 3, 7, 8 ] ],
    [ [ 1, 5, 6 ], [ 0, 4, 7, 8 ] ]
  ];

  for( let index = 0; index < 2; index++ ){

    for( const indArray of indDomain[ index ] ){

      push();

        fill( gColorArray[ index ] );
        beginShape();

          noStroke();
          for( const element of indArray ){

            const vector = vectorArray[ element ];
            vertex( vector.x, vector.y );

          }

        endShape( CLOSE );
        
      pop();

    }

  }

}

const drawEdge = ( vectorArray ) => {

  const indLine = [
    [ 0, 6 ], [ 1, 5 ], [ 3, 4 ], [ 7, 8 ] 
  ];

  for( const indArray of indLine ){

    beginShape();

      for( const element of indArray ){

        const vector = vectorArray[ element ];
        vertex( vector.x, vector.y );

      }

    endShape( CLOSE );

  }
  
}

const makeSqVector = () => {

  gBaseVectors[ 0 ] = createVector( 0, 1 );
  gBaseVectors[ 1 ] = createVector( 1, 0 );

}

const setFibonacci = () => {
    gSliderGap.value( ( Math.sqrt( 5 ) - 1 ) / 2 );
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
  const height = 162;
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

