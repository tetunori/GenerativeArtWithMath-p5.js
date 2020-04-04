
const WIDTH = 500;
let gGeneration = 0;
let gWord = 'A';

function setup() {

  const myCanvas = createCanvas( WIDTH, WIDTH );
  myCanvas.touchStarted( mouseClicked ); 

  transition();

}

function draw() {}

function mouseClicked() {
  transition();
}

const transition = () => {

  // Upper limit 12 times
  if( gGeneration > 12 ){
    return;
  }

  background( 'white' );

  let numA = 0;
  let numB = 0;

  const splitW = splitTokens( gWord );
  for( let index = 0; index < splitW.length; index++ ){

    if( splitW[ index ] === 'A' ){

      splitW[ index ] = 'A B';
      numA++;

    }else{

      splitW[ index ] = 'A';
      numB++;

    }

  }

  let targetText = 'numA:' + numA + ', numB:' + numB
                     + ', Gen:' + gGeneration + '\n\n';

  let leftText = gWord;
  const DIGIT = 50;

  if( leftText.length < DIGIT ){
    targetText += leftText;
  }else{

    while( leftText.length > DIGIT ){

      targetText += leftText.slice( 0, DIGIT ) + '\n';
      leftText = leftText.slice( DIGIT );
      
    }
    targetText += leftText;

  }

  console.log( targetText );
  showText( targetText );

  gWord = join( splitW, ' ' );
  gGeneration++;

}

// Show text same as the result of console.log
const showText = ( _text ) => {

  const offset = 40;
  // console.log( _text );
  const xPos = offset;
  const yPos = offset;
  textSize( 15 );

  text( _text, xPos, yPos );

}
