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
    this.load.spritesheet("atlas", "/assets/atlas/player-sprite-sheet.png", { frameWidth: 16, frameHeight: 32 });
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

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // world.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

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

    const anims = this.anims;
    anims.create({
      key: "player-right-walk",
      frames: anims.generateFrameNumbers("atlas", {
        start: 0, end: 3, zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "player-left-walk",
      frames: anims.generateFrameNumbers("atlas", {
        start: 4, end: 7, zeroPad: 7
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "player-up-walk",
      frames: anims.generateFrameNumbers("atlas", {
        start: 8, end: 11, zeroPad: 11
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "player-down-walk",
      frames: anims.generateFrameNumbers("atlas", {
        start: 12, end: 15, zeroPad: 15
      }),
      frameRate: 10,
      repeat: -1
    })
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

    if(cursors.right.isDown) {
      player.anims.play("player-right-walk", true);
    } else if (cursors.left.isDown) {
      player.anims.play("player-left-walk", true);
    } else if(cursors.up.isDown) {
      player.anims.play("player-up-walk", true);
    } else if (cursors.down.isDown) {
      player.anims.play("player-down-walk", true);
    } else {
      player.anims.stop();
    }
    controls.update(delta);
  }
}