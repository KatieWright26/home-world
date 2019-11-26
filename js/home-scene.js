import Phaser from 'phaser';
import { playerAnimations } from './actions/playerAnimations';
import { playerControls } from './player-controls';

let player;
let cursors;
let controls;

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super('HomeScene');
  }

  preload() {
    this.load.image('home-tiles', '../assets/tilesets/player-room-tileset.png');
    this.load.tilemapTiledJSON(
      'home-map',
      '../assets/tilemaps/player-house.json'
    );
    this.load.spritesheet('atlas', '../assets/atlas/player-sprite-sheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'home-map' });
    const tileset = map.addTilesetImage('player-room-tileset', 'home-tiles');
    const belowLayer = map.createStaticLayer('below player', tileset);
    const world = map.createStaticLayer('world', tileset);

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
