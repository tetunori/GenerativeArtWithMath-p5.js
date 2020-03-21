
const gMaxGenerationNum = 8;
let gGeneration = 0;
let gStateArray = [ 1 ];

const WIDTH = 500;

function setup() {

  createCanvas( WIDTH, WIDTH );
  colorMode( HSB, 100 );
  
}

function draw() {

  if( gGeneration < gMaxGenerationNum ){

    drawNumber( gGeneration, gMaxGenerationNum, gStateArray, WIDTH );
    updateState();
    
  }

}
