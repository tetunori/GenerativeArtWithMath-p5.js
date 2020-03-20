
let gArrayVector = [];
let gGap = 0.01;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );

  showGapValue();
  setInitVectors();

}

function draw() {

 drawSquare( gArrayVector );
 gArrayVector = getShiftedVectorArray( gArrayVector, gGap );

}

function mouseClicked() {
  
  background( 'white' );

  gGap = random( 1 ) / 2;
  showGapValue();
  setInitVectors();

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
