
let gRadianEnd = 7 * Math.PI / 5;

const WIDTH = 500;
const HEIGHT = 500;

let gTriInstance;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked );
  background( 'silver' );

  initialize( 200 );
  goldenDivision();

}

function draw() {}

function mouseClicked() {
  goldenDivision();
}
