import Phaser from 'phaser';

function worldSceneDoors(world, cb, scene) {
  world.setTileLocationCallback(15, 7, 1, 1, cb, scene);
  world.setTileLocationCallback(30, 7, 1, 1, cb, scene);
  world.setTileLocationCallback(36, 18, 1, 1, cb, scene);
  world.setTileLocationCallback(15, 7, 1, 1, cb, scene);
  world.setTileLocationCallback(16, 18, 1, 1, cb, scene);
  world.setTileLocationCallback(31, 40, 1, 1, cb, scene);
}

export { worldSceneDoors };
