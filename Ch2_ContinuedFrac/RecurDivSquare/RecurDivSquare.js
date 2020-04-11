
const THREASHOLD = 40;
const gRatioArray = 
  [ ( Math.sqrt( 5 ) + 1 ) / 2,
    Math.sqrt( 2 ), 
    Math.sqrt( 3 ), 
    Math.sqrt( 5 )
  ];
const gRatioArrayDescription = 
  [ 'ratio = ( Math.sqrt( 5 ) + 1 ) / 2',
    'ratio = Math.sqrt( 2 )', 
    'ratio = Math.sqrt( 3 )', 
    'ratio = Math.sqrt( 5 )'
  ];
let gRatioArrayIndex = 0;
let gRatio = gRatioArray[ gRatioArrayIndex ];

const WIDTH = 500;

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 
  colorMode( HSB, 100 );
  noLoop();
  
}

function draw() {
  divSquare( 0, 0, WIDTH, gRatio, THREASHOLD );
}

function mouseClicked() {

  background( 0, 0, 100 );

  gRatioArrayIndex++;
  if( gRatioArrayIndex > gRatioArray.length - 1 ){ gRatioArrayIndex = 0; }
  gRatio = gRatioArray[ gRatioArrayIndex ];
  console.log( gRatioArrayDescription[ gRatioArrayIndex ] + ', Threashold = 40.' );
  divSquare( 0, 0, WIDTH, gRatio, THREASHOLD );

}
