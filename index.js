const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: "game-container",
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config);
let player;
let showDebug = false;
let cursors;

function preload(){
  this.load.image("tiles", "/assets/tilesets/tilemap.png");
  this.load.tilemapTiledJSON("map", '/assets/tilemaps/map.json');
  this.load.image("atlas", "/assets/atlas/atlas.png");
};

function create() {
  const map = this.make.tilemap({ key: "map"});
  const tileset = map.addTilesetImage("New tileset", "tiles");
  const belowLayer = map.createStaticLayer("below player", tileset, 0, 0);
  const world = map.createStaticLayer("world", tileset, 0, 0);

  world.setCollisionByProperty({ collides: true });
  // const aboveLayer = map.createStaticLayer("above player", tileset, 0, 0);
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas")

  this.physics.add.collider(player, world);

  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left:  cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5,
  });
};

function update(time, delta){
  const speed = 175;
  const prevVelocity = player.body.velocity.clone();

  player.body.setVelocity(0);

  if(cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  if(cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  player.body.velocity.normalize().scale(speed);
  controls.update(delta)
};