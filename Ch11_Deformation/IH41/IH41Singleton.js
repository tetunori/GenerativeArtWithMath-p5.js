
let gNum = 10;
let gLatticePoints = [];
const gBaseVectors = [];

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
  scalar = HEIGHT * 1.0 / gNum;

  makeSqVector();
  makeSqLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){

    background( 'white' );
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

    vertex( vectorArray[ 0 ].x, vectorArray[ 0 ].y );

    for( let index = 0; index < GON; index++ ){

      const controlPointVectors = parameterizeIH41( vectorArray, index, randomMatrix );
      const cpv0 = controlPointVectors[ 0 ];
      const cpv1 = controlPointVectors[ 1 ];
      const vector = vectorArray[ ( index + 1 ) % 4 ];
      bezierVertex( cpv0.x, cpv0.y, 
                    cpv1.x, cpv1.y,
                    vector.x, vector.y );

    }

  endShape( CLOSE );

}

// Get new matrix with 0-filling 
const getNewMatrix = ( rowNum, columnNum ) => {
  return Array.from( new Array( rowNum ), () => new Array( columnNum ).fill( 0 ) );
}

const parameterizeIH41 = ( vectorArray, index, randomMatrix ) => {
  
  const controlPointVectors = [];

  for( let indexCP = 0; indexCP < 2; indexCP++ ){

    const vector = p5.Vector.sub( vectorArray[ ( index + 1 ) % 4 ], vectorArray[ index ] );
    vector.mult( Math.pow( -1, indexCP ) );
    controlPointVectors.push( vector );

    const cpv = controlPointVectors[ indexCP ];
    if( index < 2 ){
      cpv.rotate( randomMatrix[ index % 2 ][ indexCP % 2 ] * Math.PI / 4 );
    }else{
      cpv.rotate( randomMatrix[ index % 2 ][ ( indexCP + 1 ) % 2 ] * Math.PI / 4 );
    }
    cpv.add( vectorArray[ ( index + indexCP ) % 4 ] );

  }

  return controlPointVectors;

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

