
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

  drawRhomb() {
    this.drawShape( this.v_, [ 1, 0, 2 ] );
  }

  drawKiteDart() {
    this.drawShape( this.v_, [ 0, 1, 2 ] );
  }

  drawPentF( colorP, colorS ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector3.mult( this.PHI - 1 );
    vector3.add( v_[ 0 ] );

    const vector4 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector4.mult( this.PHI / ( this.PHI + 1 ) );
    vector4.add( v_[ 1 ] );

    const vector5 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector5.mult( 0.5 );
    vector5.add( v_[ 2 ] );

    const vectorArray = [ v_[ 0 ], v_[ 1 ], v_[ 2 ], 
                            vector3, vector4, vector5 ];
    
    noStroke();
    fill( colorP );
    this.drawShape( vectorArray, [ 0, 2, 4, 3 ] );
    fill( colorS );
    this.drawShape( vectorArray, [ 1, 3, 4 ] );

    noFill();
    stroke( 'black' );
    this.drawShape( vectorArray, [ 3, 4, 5 ] );

  }

  drawPentT( colorP, colorS ) {

    const v_ = this.v_;
    const vector3 = p5.Vector.sub( v_[ 1 ], v_[ 0 ] );
    vector3.mult( this.PHI - 1 );
    vector3.add( v_[ 0 ] );

    const vector4 = p5.Vector.sub( v_[ 2 ], v_[ 1 ] );
    vector4.mult( 1 - this.PHI / 2 );
    vector4.add( v_[ 1 ] );

    const vector5 = p5.Vector.sub( v_[ 0 ], v_[ 2 ] );
    vector5.mult( 0.5 );
    vector5.add( v_[ 2 ] );

    const vectorArray = [ v_[ 0 ], v_[ 1 ], v_[ 2 ], 
                            vector3, vector4, vector5 ];
    
    noStroke();
    fill( colorP );
    this.drawShape( vectorArray, [ 0, 2, 4, 3 ] );
    fill( colorS );
    this.drawShape( vectorArray, [ 1, 3, 4 ] );

    noFill();
    stroke( 'black' );
    this.drawShape( vectorArray, [ 4, 3, 5 ] );
    
  }

  drawShape( vectorArray, indexArray ) {

    beginShape();
      
      for( const index of indexArray ){

        const vector = vectorArray[ index ];
        vertex( vector.x, vector.y );

      }

    endShape();

  }

}
