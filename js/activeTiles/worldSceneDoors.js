import { createDetectDoorCallback } from '../newScene';

function worldSceneDoors(world, scene) {
  world.setTileLocationCallback(
    15,
    7,
    1,
    1,
    createDetectDoorCallback(scene, 'HomeScene'),
    scene
  );
  world.setTileLocationCallback(
    30,
    7,
    1,
    1,
    createDetectDoorCallback(scene, 'NeighbourScene'),
    scene
  );
  world.setTileLocationCallback(
    36,
    18,
    1,
    1,
    createDetectDoorCallback(scene, 'NeighbourScene'),
    scene
  );
  world.setTileLocationCallback(
    16,
    18,
    1,
    1,
    createDetectDoorCallback(scene, 'NeighbourScene'),
    scene
  );
  world.setTileLocationCallback(
    27,
    19,
    2,
    1,
    createDetectDoorCallback(scene, 'MarktScene'),
    scene
  );
}

export { worldSceneDoors };
