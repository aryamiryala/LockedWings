let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
          
        }

    },
    scene: [Menu, PlayTransition, Instruction, Play],
    fps: {
      forceSetTimeOut: true,
      target: 60
      
  }
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, keyM, keyW, keyA, keyS, keyD; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3;

// define moving directions for paw (direction[0] is x, direction[1] is y)
const Dir = {
  Left: [-1, 0],
  Right: [1, 0],
  Up: [0, -1],
  Down: [0, 1]
}