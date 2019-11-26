import Phaser from 'phaser';
import { playerAnimations } from '../actions/playerAnimations';
import { playerControls } from '../playerControls';
import { createDetectDoorCallback } from '../newScene';

let player;
let cursors;
let controls;

export default class MarktScene extends Phaser.Scene {
  constructor() {
    super('MarktScene');
  }

  preload() {
    this.load.image('markt-tiles', './assets/tilesets/markt-tileset.png');
    this.load.tilemapTiledJSON('markt-map', './assets/tilemaps/markt.json');
    this.load.spritesheet('atlas', './assets/atlas/player-sprite-sheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'markt-map' });
    const tileset = map.addTilesetImage('markt-tileset', 'markt-tiles');
    const belowLayer = map.createStaticLayer('below player', tileset);
    const world = map.createStaticLayer('world', tileset);

    const marktScene = this;
    world.setTileLocationCallback(
      10,
      9,
      2,
      1,
      createDetectDoorCallback(marktScene, 'WorldScene'),
      marktScene
    );

    world.setCollisionByProperty({ collides: true });

    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'atlas');

    this.physics.add.collider(player, world);
    this.physics.add.collider(player, belowLayer);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    const { anims } = this;
    playerAnimations(anims);
  }

  update(time, delta) {
    const speed = 175;
    player.body.setVelocity(0);
    playerControls(cursors, player, controls, speed, delta);
  }
}
