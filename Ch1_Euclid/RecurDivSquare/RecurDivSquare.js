
let gThreashold = 160;
let gNumA = 10;
let gNumB =  6;
let gRatio = gNumB / gNumA;

const WIDTH = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {

  divSquare( 0, 0, WIDTH, gRatio, gThreashold );
  
}

function mouseClicked() {
  
  gNumA = getRandomInteger( 1, 20 );
  gNumB = getRandomInteger( 1, 20 );
  while ( gNumA === gNumB ){
    gNumB = getRandomInteger( 1, 20 );
  }

  gThreashold = getRandomInteger( 10, 300 );
  console.log( 'NumA = ' + gNumA + ', NumB = ' + gNumB + ', Threashold = ' + gThreashold ); 

  gRatio = gNumB / gNumA;

  background( 0, 0, 100 );
  divSquare( 0, 0, WIDTH, gRatio, gThreashold );

}
