
let gArrayVector = [];
let gGap = 0.2;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );

  showGapValue();
  setInitVectors();

  drawLogSpiral( WIDTH, HEIGHT, gGap );

}

function draw() {

  stroke( 0 );
  strokeWeight( 1 )
  drawSquare( gArrayVector );
  gArrayVector = getShiftedVectorArray( gArrayVector, gGap );

}

function mouseClicked() {
  
  background( 'white' );

  gGap = random( 1 ) / 2;
  showGapValue();
  setInitVectors();

  drawLogSpiral( WIDTH, HEIGHT, gGap );

}

const setInitVectors = () => {

  gArrayVector = [];
  gArrayVector.push( createVector( 0, 0 ) );
  gArrayVector.push( createVector( WIDTH, 0 ) );
  gArrayVector.push( createVector( WIDTH, HEIGHT ) );
  gArrayVector.push( createVector( 0, HEIGHT ) );

}

const showGapValue = () => { console.log( 'gap: ' + gGap ); }

const drawSquare = ( vectors ) => {

  for( let index = 0; index < vectors.length; index++ ){
    
    line( vectors[ index ].x, 
          vectors[ index ].y, 
          vectors[ ( index + 1 ) % 4 ].x, 
          vectors[ ( index + 1 ) % 4 ].y );

  }

}

const getShiftedVectorArray = ( vectors, gap ) => {

  const nextVectorArray = [];

  for( let index = 0; index < vectors.length; index++ ){
    
    // Get direction vector 
    const directionVector = p5.Vector.sub( vectors[ ( index + 1 ) % 4 ], vectors[ index ] );

    // Shrink the vector
    directionVector.mult( gap );

    // Get a next vector by adding the two vectors
    nextVectorArray.push( p5.Vector.add( vectors[ index ], directionVector ) ); 

  }

  return nextVectorArray;

}

const drawLogSpiral = ( width, height, gap ) => {

  const STEP = 2 * Math.PI * 0.001;
  const b = Math.sqrt( 2 * gap * gap - 2 * gap + 1 );
  const c = Math.atan( gap / ( 1 - gap ) );

  const vectorO = createVector( width / 2, height / 2 );
  let vectorV = createVector( 0, 0 );
  vectorV.sub( vectorO );

  translate( vectorO.x, vectorO.y );
  stroke( 'red' );
  strokeWeight( 3 );

  while( vectorV.mag() > 1 ){

    const nextVectorV = vectorV.copy();
    nextVectorV.rotate( STEP );
    nextVectorV.mult( pow( b, STEP / c ) );
    line( vectorV.x, vectorV.y, nextVectorV.x, nextVectorV.y );
    vectorV = nextVectorV;

  }

}