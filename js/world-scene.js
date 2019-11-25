import Phaser from 'phaser';
// import Player from './player';

let player;
let showDebug = false;
let cursors;
let controls;

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("tiles", "/assets/tilesets/tilemap.png");
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    this.load.image("atlas", "/assets/atlas/atlas.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("New tileset", "tiles");
    const belowLayer = map.createStaticLayer("below player", tileset);
    const world = map.createStaticLayer("world", tileset);
    const aboveLayer = map.createStaticLayer("above player", tileset);

    aboveLayer.setDepth(10);

    world.setCollisionByProperty({ collides: true });
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas");

    this.physics.add.collider(player, world);

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    world.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
    });
  }

  update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();

    player.body.setVelocity(0);

    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    player.body.velocity.normalize().scale(speed);
    controls.update(delta);
  }
}