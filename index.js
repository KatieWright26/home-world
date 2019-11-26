import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';
import HomeScene from './js/scenes/homeScene';
import MarktScene from './js/scenes/marktScene';
import NeighbourScene from './js/scenes/neighbourScene';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  zoom: 2,
  parent: 'game-container',
  pixelArt: true,
  scene: [WorldScene, HomeScene, MarktScene, NeighbourScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
