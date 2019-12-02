import Phaser from 'phaser';
import WorldScene from './js/scenes/worldScene';
import HomeScene from './js/scenes/homeScene';
import MarktScene from './js/scenes/marktScene';
import NeighbourScene from './js/scenes/neighbourScene';

const config = {
  type: Phaser.AUTO,
  width: 350,
  height: 250,
  zoom: 2.5,
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
