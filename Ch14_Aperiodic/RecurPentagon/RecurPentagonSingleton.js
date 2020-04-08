
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

const initialize = ( scalar ) => {

  gColor = getRandomColor();

  const vector0 = createVector( 0, 0 );
  const vector1 = createVector( scalar, 0 );
  gListPent.push( new Pent( vector0, vector1 ) );

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}

const slitDivision = () => {

  nextPent = [];
  background( 'white' );

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );
    fill( gColor );
    for( element of gListPent ){

      element.drawPent();
      element.divPent( nextPent );

    }

  pop();

  gListPent = nextPent;

}

class Pent {

  constructor( v0, v1 ) {
    
    this.PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
    this.v_ = [];
    const v_ = this.v_;
    v_.push( v0 );
    for( let index = 1; index < 6; index++ ){

      v_.push( p5.Vector.sub( v1, v0 ) );
      v_[ index ].rotate( 2 * index * Math.PI / 5 );
      v_[ index ].add( v0 );

    }
    
  }

  divPent( nextList ) {
    
    const v_ = this.v_;
    let vector = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector.mult( this.PHI / ( 2 * this.PHI + 1 ) );
    vector.rotate( Math.PI / 5 );
    vector.add( v_[ 0 ] );
    
    nextList.push( new Pent( v_[ 0 ], vector ) );

    for( let index = 1; index < 6; index++ ){

      vector = p5.Vector.sub( v_[ index ], v_[ 0 ] );
      vector.mult( ( this.PHI + 1 ) / ( 2 * this.PHI + 1 ) );
      vector.add( v_[ 0 ] );

      nextList.push( new Pent( vector, v_[ index ] ) );

    }

  }

  drawPent() {

    const v_ = this.v_;
    
    beginShape();

      for( let index = 1; index < 6; index++ ){
        
        const vector = v_[ index ];
        vertex( vector.x, vector.y );

      }

    endShape( CLOSE );
    
  }

}
