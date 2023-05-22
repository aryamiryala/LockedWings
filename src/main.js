let config = {
    type: Phaser.CANVAS, 
    width: 640, 
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
          
        }

    },
    scene: [Menu, PlayTransition, Instruction, Play]
}

let game = new Phaser.Game(config);

//reserve keyboard vars
let keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR; 

//set UI sizes
let borderUISize = game.config.height / 15; 
let borderPadding = borderUISize / 3; 