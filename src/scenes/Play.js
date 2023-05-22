
var control = false;

var mouse;
var input; 

var fireball; 

var worldBounds;

class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('window', './assets/window.png');
        this.load.image('cage1', './assets/cage_resized.png');
        this.load.image('fireball', './assets/fireball.png');
        this.load.spritesheet('firebird', './assets/bird.png', {frameWidth: 125, frameHeight: 400, startFrame: 0, endFrame: 4})
        this.load.image('paw','./assets/paw.png');

    }

    create(){

        this.gameOver = false; 

     


        this.background = this.add.tileSprite(0, 0, 640, 480, 'window').setOrigin(0,0);
        this.cage = this.add.tileSprite(40, 0, 540, 462, 'cage1').setOrigin(0,0);
        this.player = this.add.sprite(320, 240, 'firebird').setScale(0.35);
        
        
        this.paw = this.physics.add.sprite(0, 170, 'paw').setScale(0.3);
        fireball = this.physics.add.sprite(700, 700, 'fireball');

        this.moveRight = true;

       
        worldBounds = this.physics.world.bounds

        // Background Music;
        this.BGMusic = this.sound.add('1Boss_Music');
        this.BGMusic.loop = true;
        this.BGMusic.play();

        // Animation Config for player
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('firebird', { start: 1, end: 2, first: 1}),
            frameRate: 8,
            repeat: -1
        });

        this.player.play('fly');

        // controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       
        mouse = this.input.mousePointer;
        input = this.input;

        
        
       
        
    }


  
    update(){

        
        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(); 
        }
        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        if(this.gameOver == false){

            if (this.paw.x <= 0){
                this.paw.y = Math.floor(Phaser.Math.Between(170, 400));
            }
    
            if (this.paw.x >= 0 && this.moveRight == true){
                this.paw.x += 5;
                if (this.paw.x == 500){
                    this.moveRight = false;
                }
            }
            else if (this.paw.x <= 500 && this.moveRight == false){
                this.paw.x -= 5;
                if (this.paw.x == 0){
                    this.moveRight = true;
                }
            }

            if (control == false && mouse.isDown){
                // create fireball when firing
                fireball = this.physics.add.sprite(this.player.x - 70, this.player.y - 7, 'fireball');
                // shoot fireball in direction of cursor
                this.physics.moveTo(fireball, input.x, input.y, 500);
                control = true;
            }
    
            
    
            if (fireball.x > worldBounds.width || fireball.y > worldBounds.height || fireball.x < 0 || fireball.y < 0){
                control = false;
            }
    
            if(keyLEFT.isDown && 150 < this.player.x) { // change width based on bird cage
                this.player.x -= 5;
            }
            if (keyRIGHT.isDown && this.player.x < 500) { // change width based on bird cage
                this.player.x += 5;
            }
            if (keyUP.isDown && 170 < this.player.y) { // change width based on bird cage
                this.player.y -= 5;
            }
            if (keyDOWN.isDown && this.player.y < 400) { // change width based on bird cage
                this.player.y += 5;
            }

            this.physics.add.overlap(fireball, this.paw, reset, null, this)

            /*if (this.checkCollision(fireball, this.paw)){
                this.pawHealth -= 5;
                console.log(this.pawHealth);
                this.paw.reset();
                fireball.destroy();
                control = false;
            }*/
        }
    }

    /*checkCollision(fireball, paw){
        // checking if runner and paw collides
        if (fireball.x < paw.x + paw.width && fireball.x + 10 > paw.x && fireball.y < paw.y + paw.height && 40 + fireball.y > paw.y){
            return true;
        } else {
            return false;
        }
    }*/

    // gameDone(){
    //     let scoreConfig = {
    //         fontSize: '30px',
    //         fill: '#ffffff',
    //         fontFamily: '"Georgia"',
    //         strokeThickness: 5,
    //         stroke: 'black',
    
    //       };
        
    //     this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    //     this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
        
    // }
}

function reset(fireball, paw) {
    fireball.destroy();
    paw.destroy();
    this.paw = this.physics.add.sprite(0, 170, 'paw').setScale(0.3);
    control = false;
}


   


   
    
  

