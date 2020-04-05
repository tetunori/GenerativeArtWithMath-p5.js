
const goldenDivision = () => {

  push();
    
    translate( WIDTH / 2, HEIGHT / 2 );
    gTriInstance.drawTriangle()
    gTriInstance.updateThinS();
    gRadianEnd = gTriInstance.drawArc( gRadianEnd );

  pop();

}
