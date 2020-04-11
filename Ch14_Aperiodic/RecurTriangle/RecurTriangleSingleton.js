
const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let gColorArray = [];
let gListT = [];
let gListF = [];

const DIV_MODE_TSFL = 0;
const DIV_MODE_TLFS = 1;
const DIV_MODE_TSFS = 2;
const DIV_MODE_TLFL = 3;
let gModeDivision = DIV_MODE_TSFL;

const INIT_MODE_TRIANGLE = 0;
const INIT_MODE_DECAGON = 1;
let gModeInit = INIT_MODE_TRIANGLE;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  
  setupController();
  initialize();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    triangularDivision();
  }

}

const toggleDivision = () => {

  gModeDivision = ( gModeDivision + 1 ) % 4;
  initialize();

}

const toggleInit = () => {

  gModeInit = ( gModeInit + 1 ) % 2;
  initialize();

}

const initialize = () => {

  background( 'white' );

  gColorArray = [];
  gColorArray.push( getRandomColor() );
  gColorArray.push( getRandomColor() );

  gListT = [];
  gListF = [];

  if( gModeInit === INIT_MODE_TRIANGLE ){
    initializeTriangle( 1200 );
  }else{
    initializeDecagon( 250 );
  }

  triangularDivision();

}

const initializeTriangle = ( scalar ) => {

  const vectorArray = [];
  let vector = p5.Vector.fromAngle( 3 * Math.PI / 2 );
  vector.mult( scalar );
  vectorArray.push( vector );

  vector = p5.Vector.fromAngle( 7 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );  

  vector = p5.Vector.fromAngle( 3 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );

  gListT.push( new Tri( vectorArray ) );

}

const initializeDecagon = ( scalar ) => {

  for( let index = 0; index < 10; index++ ){

    const vector0 = createVector( 0, 0 );

    const vector1 = p5.Vector.fromAngle( index * Math.PI / 5 );
    vector1.mult( scalar );

    const vector2 = p5.Vector.fromAngle( ( index + 1 ) * Math.PI / 5 );
    vector2.mult( scalar );

    if( ( index % 2 ) === 0 ){
      gListT.push( new Tri( [ vector0, vector1, vector2 ] ) );
    }else{
      gListT.push( new Tri( [ vector0, vector2, vector1 ] ) );
    }

  }

}

// Get random color
const getRandomColor = () => {
  // return color( random( 100 ), 100, 100 );
  return color( random( 100 ), 80, 100 );
}

const triangularDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    fill( gColorArray[ 0 ] );
    for( triInstance of gListT ){

      triInstance.drawTriangle();
      if( ( gModeDivision === DIV_MODE_TSFL ) || 
            ( gModeDivision === DIV_MODE_TSFS ) ){
        triInstance.divThinS( nextT, nextF );
      }else{
        triInstance.divThinL( nextT, nextF );
      }

    }

    fill( gColorArray[ 1 ] );
    for( triInstance of gListF ){

      triInstance.drawTriangle();
      if( ( gModeDivision === DIV_MODE_TSFL ) || 
            ( gModeDivision === DIV_MODE_TLFL ) ){
        triInstance.divFatL( nextT, nextF );
      }else{
        triInstance.divFatS( nextT, nextF );
      }

    }

    gListT = nextT;
    gListF = nextF;

  pop();

  clipCanvas();

}

const clipCanvas = () => {

  push();
    noStroke();
    rect( WIDTH, 0, WIDTH + WIDTH_EXT, HEIGHT );
  pop();

}

class Tri {

  constructor( vectorArray ) {
    
    this.PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
    this.v_ = vectorArray;
    
  }

  log() {
    console.log('test');
  }

  updateThinS() {
    
    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );
    v_[ 0 ] = v_[ 1 ];
    v_[ 1 ] = v_[ 2 ];
    v_[ 2 ] = vector3;

  }

  divThinS( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );
    nextThin.push( new Tri( [ v_[ 1 ], v_[ 2 ], vector3 ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] ) );

  }

  divThinL( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );

    const vector4 = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector4.mult( 1.0 / ( this.PHI + 1 ) );
    vector4.add( v_[ 0 ] );

    nextThin.push( new Tri( [ v_[ 1 ], vector4, vector3 ] ) );
    nextThin.push( new Tri( [ v_[ 1 ], v_[ 2 ], vector3 ] ) );
    nextFat.push( new Tri( [ vector4, vector3, v_[ 0 ] ] ) );

  }

  divFatL( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector3.mult( 1.0 / ( this.PHI + 1 ) );
    vector3.add( v_[ 1 ] );

    const vector4 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector4.mult( 1.0 / this.PHI );
    vector4.add( v_[ 2 ] );

    nextThin.push( new Tri( [ vector3, v_[ 0 ], vector4 ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] ) );
    nextFat.push( new Tri( [ vector4,  v_[ 2 ], vector3 ] ) );

  }

  divFatS( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector3.mult( 1 / ( this.PHI + 1 ) );
    vector3.add( v_[ 1 ] );
    nextThin.push( new Tri( [ v_[ 2 ], vector3, v_[ 0 ] ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] )  );

  }

  drawTriangle() {

    const v_ = this.v_;
    triangle( v_[ 0 ].x, v_[ 0 ].y, 
              v_[ 1 ].x, v_[ 1 ].y, 
              v_[ 2 ].x, v_[ 2 ].y );
    
  }

  drawArc( radianEnd ) {

    const v_ = this.v_;
    const diameter = 2 * p5.Vector.dist( v_[ 0 ], v_[ 2 ] );
    const radianStart = radianEnd - 3 * Math.PI / 5;
    noFill();
    
    arc( v_[ 2 ].x, v_[ 2 ].y, 
            diameter, diameter, radianStart, radianEnd );

    return radianStart;

  }

}

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

  const btToggleDivision = createButton( 'TOGGLE DIVISION' );
  btToggleDivision.position( controllerOffset + WIDTH, btCaptureImage.y + controllerMargin );
  btToggleDivision.size( buttonWidth, buttonHeight );
  btToggleDivision.mousePressed( toggleDivision );

  const btToggleInit = createButton( 'TOGGLE INIT' );
  btToggleInit.position( controllerOffset + WIDTH, btToggleDivision.y + controllerMargin );
  btToggleInit.size( buttonWidth, buttonHeight );
  btToggleInit.mousePressed( toggleInit );

}

// Capture Image
const captureImage = () => {

  const namePNG = getYYYYMMDD_hhmmss( true ) + '.png';
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

