import Phaser from 'phaser';
import WorldScene from './js/world-scene';
import HomeScene from './js/home-scene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: 'game-container',
  pixelArt: true,
  scene: [WorldScene, HomeScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
