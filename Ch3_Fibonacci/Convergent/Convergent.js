
let m = 1;
const num = 10;

const WIDTH = 500;
const HEIGHT = 200;

function setup() {

  createCanvas( WIDTH, WIDTH );
  setupController( m );
  
}

function draw() {
  
  background( color( 'white' ) );
  
  m = getSliderNumAValue();
  drawControllerCaptions();

  // Red line
  const alpha = ( m + Math.sqrt( m * m + 4 ) ) / 2;
  const yPosLimit = mapYPos( alpha );
  stroke( color( 'red' ) );
  line( 0, yPosLimit, WIDTH, yPosLimit );

  // Graph
  const step = WIDTH / num;
  stroke( color( 'black' ) );

  let x = m;
  for( let i = 0; i < num; i++ ){

    const nextX = m + 1.0 / x;
    const yPos = mapYPos( x );
    const nextYPos = mapYPos( nextX );
    line( i * step, yPos, ( i + 1 ) * step, nextYPos );
    x = nextX;

  }

}

const mapYPos = ( value ) => { return map( value, m, m + 1, 0, HEIGHT ); }
