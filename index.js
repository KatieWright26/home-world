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
  }
};

const game = new Phaser.Game(config);

function preload(){
  this.load.image("tiles", "/assets/tilesets/tilemap.png");
  this.load.tilemapTiledJSON("map", '/assets/tilemaps/map.json');
  console.log(this)
};

function create() {
  const map = this.make.tilemap({ key: "map"});
  const tileset = map.addTilesetImage("New tileset", "tiles");
  const belowLayer = map.createStaticLayer("below player", tileset, 0, 0);
  const world = map.createStaticLayer("world", tileset, 0, 0);
  // const aboveLayer = map.createStaticLayer("above player", tileset, 0, 0);
};

function update(time, delta){};