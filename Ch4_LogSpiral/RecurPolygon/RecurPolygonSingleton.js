
let gArrayVector = [];
let gGap = 0.1;
let gGon = 8;

const WIDTH = 500;
const HEIGHT = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );

  showValues();
  setInitVectors();

}

function draw() {

  translate( WIDTH / 2, HEIGHT / 2 );
  drawPolygon( gArrayVector, gGon );
  gArrayVector = getShiftedVectorArray( gArrayVector, gGap, gGon );

}

function mouseClicked() {
  
  background( 'white' );

  gGap = random( 1 ) / 2;
  gGon = getRandomInteger( 4, 16 );
  showValues();
  setInitVectors();

}

const setInitVectors = () => {

  gArrayVector = new Array( gGon );

  for( let index = 0; index < gGon; index++ ){

    gArrayVector[ index ] = p5.Vector.fromAngle( 2 * index * Math.PI / gGon );
    gArrayVector[ index ].mult( WIDTH / 2 );

  }

}

const showValues = () => { 
  console.log( 'gap: ' + gGap + ', gon: ' + gGon ); 
}

// Get random integer between min and max
const getRandomInteger = ( min, max ) => {
  return Math.floor( random( min, max ) );
}

const drawPolygon = ( vectors, gon ) => {

  for( let index = 0; index < gon; index++ ){
  
    line( vectors[ index ].x, 
          vectors[ index ].y, 
          vectors[ ( index + 1 ) % gon ].x, 
          vectors[ ( index + 1 ) % gon ].y );

  }

}

const getShiftedVectorArray = ( vectors, gap, gon ) => {

  const nextVectorArray = new Array( gon );

  for( let index = 0; index < gon; index++ ){
    
    // Get direction vector 
    const directionVector = p5.Vector.sub( vectors[ ( index + 1 ) % gon ], vectors[ index ] );

    // Shrink the vector
    directionVector.mult( gap );

    // Get a next vector by adding the two vectors
    nextVectorArray[ index ] = p5.Vector.add( vectors[ index ], directionVector ); 

  }

  return nextVectorArray;

}
