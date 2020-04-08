
let gListPent = [];

const WIDTH = 500;
const HEIGHT = 500;

let gColor;

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked );
  colorMode( HSB, 100 );

  initialize( 250 );
  slitDivision();

}

function draw() {}

function mouseClicked() {
  slitDivision();
}
