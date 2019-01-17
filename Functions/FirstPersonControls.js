function firstPersonControls(){

  firstPersonControl      = new FirstPersonControls( camera );
  console.log( firstPersonControl );
  firstPersonControl.lookSpeed      = 0.1;
  firstPersonControl.movementSpeed  = 100;
  clock                   = new THREE.Clock( true )
}
