
let gNum = 10;
const gLatticePoints = [];
const gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let scalar;

function setup() {

  const myCanvas = createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  setupController( gNum );

  initialize();

}

const initialize = () => {

  scalar = HEIGHT * 1.0 / gNum;

  makeSqVector();
  makeSqLattice();
  drawTiling();

}

function draw() {}

function mouseClicked() {

  if( ( mouseX < WIDTH ) && ( mouseY < HEIGHT ) ){
    drawTiling();
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
