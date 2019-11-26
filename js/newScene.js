const createDetectDoorCallback = (world, newScene) => () =>
  world.scene.start(newScene);

export { createDetectDoorCallback };
