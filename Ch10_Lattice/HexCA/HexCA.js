
let gNum = 200;
let gModulo = 10;

let gLatticePoints = [];
let gBaseVectors = [];

const WIDTH = 500;
const HEIGHT = 500;

// For controller
const WIDTH_EXT = 200;

let gScalar;
let gStateMatrix;

function setup() {

  createCanvas( WIDTH + WIDTH_EXT, HEIGHT );
  colorMode( HSB, 100 );
  setupController( gNum, gModulo );

  initialize();

}

function draw() {

  nextState = getNewMatrix( gNum, gNum );

  for( let idRow = 0; idRow < gNum; idRow ++ ){
    for( let idColumn = 0; idColumn < gNum; idColumn++ ){
      nextState[ idRow ][ idColumn ] = transition( idRow, idColumn );
    }
  }

  gStateMatrix = nextState;
  drawTiling();

}

// Set number from controller
const setNumber = () => {

  gNum = getSliderNumValue();
  gModulo = getSliderModuloValue();
  initialize();
  
}
