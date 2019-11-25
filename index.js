import Phaser from 'phaser';
import WorldScene from './js/world-scene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "game-container",
  pixelArt: true,
  scene: WorldScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config);

