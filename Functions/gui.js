function buildGui() {
  gui = new dat.GUI();

  var f_light   = gui.addFolder( "Lights" );
  var f_sounds  = gui.addFolder( "Sounds" );

  var lightParams = {
            //Light
    'light color':  spotLight.color.getHex(),
    intensity:      spotLight.intensity,
    distance:       spotLight.distance,
    angle:          spotLight.angle,
    penumbra:       spotLight.penumbra,
    decay:          spotLight.decay
  }

  var soundParams = {
    Loop: ""
  }

  f_light.addColor( lightParams, 'light color' ).onChange( function ( val ) {
    spotLight.color.setHex( val );
    render();
  } );

  f_light.add( lightParams, 'intensity', 0, 2 ).onChange( function ( val ) {
    spotLight.intensity = val;
    render();
  } );

  f_light.add( lightParams, 'distance', 50, 5000 ).onChange( function ( val ) {
    spotLight.distance = val;
    render();
  } );

  f_light.add( lightParams, 'angle', 0, Math.PI /3 ).onChange( function ( val ) {
    spotLight.angle = val;
    render();
  } );

  f_light.add( lightParams, 'penumbra', 0, 1 ).onChange( function ( val ) {
    spotLight.penumbra = val;
    render();
  } );

  f_light.add( lightParams, 'decay', 1, 2 ).onChange( function ( val ) {
    spotLight.decay = val;
    render();
  } );

  //f_sounds.add( soundParams, "Loop" );

  gui.open();

}
