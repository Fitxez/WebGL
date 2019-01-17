function init() {

  stats();
  
  /*************************RENDERER***************************/
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled  = true;
  renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
  renderer.gammaInput         = true;
  renderer.gammaOutput        = true;
  /***********************************************************/

  /*************************SCENE*****************************/
  scene = new THREE.Scene();
  /***********************************************************/

  /*************************CAMERA****************************/
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 7, 200, 250 );
  listener = new THREE.AudioListener();
  camera.add( listener );
  /***********************************************************/

  /*************AMBIENT SOUND - CYCLE OF LIFE*****************/
  AmbientSound        = new THREE.Audio( listener );
  audioAmbientLoader  = new THREE.AudioLoader();
  audioAmbientLoader.load( 'Sounds/circle_of_life.mp3', function( buffer ) {
    AmbientSound.setBuffer( buffer );
    AmbientSound.setLoop( true );
    AmbientSound.setVolume( 0.05 );
    AmbientSound.play();
  } );
  /***********************************************************/

  /********************ORBIT CONTROLS*************************/
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.minDistance = 20;
  controls.maxDistance = 1000;
  controls.enablePan = true;
  controls.maxPolarAngle = Math.PI/2;
  /***********************************************************/

  /**************************LIGHT****************************/

      /*****************AMBIENT*****************/
      ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
      scene.add( ambient );


      /*****************SPOT********************/
      spotLight = new THREE.SpotLight( 0xffffff, 1 );
      spotLight.position.set( -1500, 1000, 1000 );
      spotLight.angle = Math.PI / 4;
      spotLight.penumbra = 0.05;
      spotLight.decay = 2;
      spotLight.distance = 5000;
      spotLight.intensity = 2;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 200;
      scene.add( spotLight );

      lightHelper = new THREE.SpotLightHelper( spotLight );
      scene.add( lightHelper );

      shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
      scene.add( shadowCameraHelper );
      scene.add( new THREE.AxesHelper( 10 ) );
  /***********************************************************/

  /**************************FLOOR****************************/
  floorTexture   = new THREE.TextureLoader().load( 'Texture/deadGrass.jpg' );
  floorGeometry  = new THREE.PlaneBufferGeometry( 4000, 4000 );
  floorMaterial  = new THREE.MeshPhongMaterial({
    color: "#FFDD75"
  });
  floorMaterial.normalMap = floorTexture;
  mesh      = new THREE.Mesh( floorGeometry, floorMaterial );
  mesh.position.set( 0, - 1, 0 );
  mesh.rotation.x = - Math.PI * 0.5;
  mesh.receiveShadow = true;
  scene.add( mesh );
  /***********************************************************/

  /*********************COLLADA - LION************************/
  loadingManager = new THREE.LoadingManager( function () {
    lion.scale.set( 0.2,0.2,0.2 );
    lion.position.set( 0,-1.5,0 ),
    //Spatial sound
    spatialSoundLion        = new THREE.PositionalAudio( listener );
    audioSpatialLionLoader  = new THREE.AudioLoader();
    audioSpatialLionLoader.load( 'Sounds/roar_lion.mp3', function( buffer ) {
      spatialSoundLion.setBuffer( buffer );
      spatialSoundLion.setRefDistance( 5 );
      spatialSoundLion.setVolume( 10 );
      spatialSoundLion.setLoop( true );
      spatialSoundLion.play();
    });
    lion.add( spatialSoundLion );
    scene.add( lion );
    for ( var i = 0; i < 78; i++ ) {
      lionmesh = lion.children[ 0 ].children[ 1 ].children[ i ];
      lionmesh.castShadow     = true;
      lionmesh.receiveShadow  = true;
    }

  } );

  loader = new THREE.ColladaLoader( loadingManager );
  loader.load( './Collada/model.dae', function ( collada ) {
    lion = collada.scene;
  } );
  /***********************************************************/

  /************************ SKYBOX ***************************/

  var geometry = new THREE.CubeGeometry( 4000, 4000, 4000);
  var cubeMaterials =
    [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/eezabad_ft.jpg' ), side:THREE.DoubleSide
          }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/eezabad_bk.jpg' ), side:THREE.DoubleSide
          }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/eezabad_up.jpg' ), side:THREE.DoubleSide
          }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/' ), side:THREE.DoubleSide
          }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/eezabad_rt.jpg' ), side:THREE.DoubleSide
          }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader( ).load( 'Texture/Skybox/eezabad_lf.jpg' ), side:THREE.DoubleSide
          })
    ];

var cubeMaterial = new THREE.MeshBasicMaterial( cubeMaterials );
var skybox = new THREE.Mesh ( geometry, cubeMaterials );

scene.add( skybox );

  window.addEventListener( 'resize', onResize, false );
  animate();
  requestAnimationFrame( animate );

}
