
const RATIO = ( Math.sqrt( 5 ) + 1 ) / 2;
let gThreasholdDivision = 80;
let gThreasholdProbability = 0.5;

const WIDTH = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {
  colorRect( 0, 0, WIDTH, WIDTH );
  divSquare( 0, 0, WIDTH, RATIO, gThreasholdDivision, gThreasholdProbability );
}

function mouseClicked() {

  background( 0, 0, 100 );

  gThreasholdDivision = getRandomInteger( 10, 300 );
  gThreasholdProbability = random( 0, 1 );
  console.log( 'Threashold Division: ' + gThreasholdDivision + ',\n' +
                  'Threashold Probability: ' + gThreasholdProbability );

  colorRect( 0, 0, WIDTH, WIDTH );
  divSquare( 0, 0, WIDTH, RATIO, gThreasholdDivision, gThreasholdProbability );

}
