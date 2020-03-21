
const gMaxGenerationNum = 250;
let gGeneration = 0;
let gStateArray = [ 1 ];
const gModulo = 2;

const WIDTH = 1000;
const HEIGHT = 500;

function setup() {

  createCanvas( WIDTH, HEIGHT );
  colorMode( HSB, 100 );
  console.log( 'modulo: ' + gModulo );
  console.log( 'Rule: 30' );
  background( 'white' );
  
}

function draw() {

  if( gGeneration < gMaxGenerationNum ){

    drawCell( gGeneration, gMaxGenerationNum, gStateArray, gModulo, WIDTH );
    updateState();
    
  }

}

function mouseClicked() {
  
  gGeneration = 0;
  gStateArray = [ 1 ];
  reloadRule();
  background( 'white' );

}
