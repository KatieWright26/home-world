import Phaser from 'phaser';
import { playerControls } from '../playerControls';
import { playerAnimations } from '../actions/playerAnimations';
import { worldSceneDoors } from '../activeTiles/worldSceneDoors';

let player;
let cursors;
let controls;

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('WorldScene');
  }

  preload() {
    this.load.image('tiles', './assets/tilesets/tilemap.png');
    this.load.tilemapTiledJSON('map', './assets/tilemaps/map.json');
    this.load.spritesheet('atlas', './assets/atlas/player-sprite-sheet.png', {
      frameWidth: 16,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('New tileset', 'tiles');
    map.createStaticLayer('below player', tileset);
    const world = map.createStaticLayer('world', tileset);
    const aboveLayer = map.createStaticLayer('above player', tileset);

    aboveLayer.setDepth(10);

    const worldScene = this;
    worldSceneDoors(world, worldScene);

    world.setCollisionByProperty({ collides: true });
    const spawnPoint = map.findObject(
      'Objects',
      obj => obj.name === 'Spawn Point'
    );

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'atlas');

    this.physics.add.collider(player, world);

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // world.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

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
