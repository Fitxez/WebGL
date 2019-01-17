function render() {

  lightHelper.update();
  shadowCameraHelper.update();
  renderer.render( scene, camera );
}
