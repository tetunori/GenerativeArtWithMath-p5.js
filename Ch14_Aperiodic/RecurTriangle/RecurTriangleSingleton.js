
const WIDTH = 500;
const HEIGHT = 500;

let gColorArray = [];
let gListT = [];
let gListF = [];

function setup() {

  const myCanvas = createCanvas( WIDTH, HEIGHT );
  myCanvas.touchStarted( mouseClicked );
  colorMode( HSB, 100 );

  initialize( 1200 );
  // initializeDecagon( 1200 );
  triangularDivision();

}

function draw() {}

function mouseClicked() {
  triangularDivision();
}

const initialize = ( scalar ) => {

  gColorArray = [];
  gColorArray.push( getRandomColor() );
  gColorArray.push( getRandomColor() );

  const vectorArray = [];
  let vector = p5.Vector.fromAngle( 3 * Math.PI / 2 );
  vector.mult( scalar );
  vectorArray.push( vector );

  vector = p5.Vector.fromAngle( 7 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );  

  vector = p5.Vector.fromAngle( 3 * Math.PI / 10 );
  vector.mult( scalar );
  vectorArray.push( vector );

  gListT.push( new Tri( vectorArray ) );

}

const initializeDecagon = ( scalar ) => {

  for( let index = 0; index < 10; index++ ){

    const vector0 = createVector( 0, 0 );

    const vector1 = p5.Vector.fromAngle( index * Math.PI / 5 );
    vector1.mult( scalar );

    const vector2 = p5.Vector.fromAngle( ( index + 1 ) * Math.PI / 5 );
    vector2.mult( scalar );

    if( ( index % 2 ) === 0 ){
      gListT.push( new Tri( [ vector0, vector1, vector2 ] ) );
    }else{
      gListT.push( new Tri( [ vector0, vector2, vector1 ] ) );
    }

  }

}

// Get random color
const getRandomColor = () => {
  return color( random( 100 ), 100, 100 );
}

const triangularDivision = () => {

  let nextT = [];
  let nextF = [];

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );

    fill( gColorArray[ 0 ] );
    for( triInstance of gListT ){

      triInstance.drawTriangle();
      triInstance.divThinS( nextT, nextF );
      // triInstance.divThinL( nextT, nextF );

    }

    fill( gColorArray[ 1 ] );
    for( triInstance of gListF ){

      triInstance.drawTriangle();
      triInstance.divFatL( nextT, nextF );
      // triInstance.divFatS( nextT, nextF );

    }

    gListT = nextT;
    gListF = nextF;

  pop();

}

class Tri {

  constructor( vectorArray ) {
    
    this.PHI = ( 1 + Math.sqrt( 5 ) ) / 2;
    this.v_ = vectorArray;
    
  }

  log() {
    console.log('test');
  }

  updateThinS() {
    
    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );
    v_[ 0 ] = v_[ 1 ];
    v_[ 1 ] = v_[ 2 ];
    v_[ 2 ] = vector3;

  }

  divThinS( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );
    nextThin.push( new Tri( [ v_[ 1 ], v_[ 2 ], vector3 ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] ) );

  }

  divThinL( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector3.mult( 2 - this.PHI );
    vector3.add( v_[ 2 ] );

    const vector4 = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector4.mult( 1.0 / ( this.PHI + 1 ) );
    vector4.add( v_[ 0 ] );

    nextThin.push( new Tri( [ v_[ 1 ], vector4, vector3 ] ) );
    nextThin.push( new Tri( [ v_[ 1 ], v_[ 2 ], vector3 ] ) );
    nextFat.push( new Tri( [ vector4, vector3, v_[ 0 ] ] ) );

  }

  divFatL( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector3.mult( 1.0 / ( this.PHI + 1 ) );
    vector3.add( v_[ 1 ] );

    const vector4 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector4.mult( 1.0 / this.PHI );
    vector4.add( v_[ 2 ] );

    nextThin.push( new Tri( [ vector3, v_[ 0 ], vector4 ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] ) );
    nextFat.push( new Tri( [ vector4,  v_[ 2 ], vector3 ] ) );

  }

  divFatS( nextThin, nextFat ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector3.mult( 1 / ( this.PHI + 1 ) );
    vector3.add( v_[ 1 ] );
    nextThin.push( new Tri( [ v_[ 2 ], vector3, v_[ 0 ] ] ) );
    nextFat.push( new Tri( [ vector3, v_[ 0 ], v_[ 1 ] ] )  );

  }

  drawTriangle() {

    const v_ = this.v_;
    triangle( v_[ 0 ].x, v_[ 0 ].y, 
              v_[ 1 ].x, v_[ 1 ].y, 
              v_[ 2 ].x, v_[ 2 ].y );
    
  }

  drawArc( radianEnd ) {

    const v_ = this.v_;
    const diameter = 2 * p5.Vector.dist( v_[ 0 ], v_[ 2 ] );
    const radianStart = radianEnd - 3 * Math.PI / 5;
    noFill();
    
    arc( v_[ 2 ].x, v_[ 2 ].y, 
            diameter, diameter, radianStart, radianEnd );

    return radianStart;

  }

}
