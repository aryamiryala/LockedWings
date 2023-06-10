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
        this.load.image('cage1', './assets/cage_resized2.png');
        this.load.image('fireball', './assets/fireball.png');
        this.load.spritesheet('firebird', './assets/bird.png', {frameWidth: 125, frameHeight: 400, startFrame: 0, endFrame: 4})
        this.load.image('paw','./assets/paw.png');
        this.load.image('danger','./assets/exclaimation.png');

    }

    create(){

        this.gameOver = false; 

        this.pawHealth = 100;
        this.pawDirection = Dir.Right;

        this.background = this.add.tileSprite(0, 0, 640, 480, 'window').setOrigin(0,0);
        this.cage = this.add.tileSprite(-80, -40, 800, 550, 'cage1').setOrigin(0,0);
        this.player = this.physics.add.sprite(320, 240, 'firebird').setScale(0.35);
        this.player.body.setSize(200, 150, true); // fix this 
        
        
        this.paw = this.physics.add.sprite(-400, 170, 'paw').setScale(0.3);
        this.danger = this.add.sprite(40, this.paw.y, 'danger').setScale(0.2);
        fireball = this.physics.add.sprite(700, 700, 'fireball');

        //this.moveRight = true;
        this.pawMoving = true;

        worldBounds = this.physics.world.bounds;

        let scoreConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };

        this.catHP = this.add.text(0 , 0, 'Cat Health: ' + this.pawHealth, scoreConfig);

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
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
       
        mouse = this.input.mousePointer;
        input = this.input;
       
        
    }

  
    update(){

        if (this.pawHealth <= 0 || this.gameOver == true){
            this.catHP.setText("Cat Health: " + this.pawHealth);
            this.gameDone();
        }
        
        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        if(this.gameOver == true && Phaser.Input.Keyboard.JustDown(keyM)){
            this.scene.start("menuScene");
        }

        if(this.gameOver == false){

            // Spawning paw within range and at x -400
            /*if (this.paw.x <= -395 || this.paw.x >= 900){
                this.paw.y = Math.floor(Phaser.Math.Between(170, 400));
                this.danger.y = this.paw.y;
                if (this.paw.x >= 900){
                    this.paw.x = -400;
                }
            }*/

            // Spawn paw with random direction
            if (this.pawReachedEnd()) {

                this.spawnPaw();
            }
    
            // Paw movement
            if (this.pawMoving && !this.pawReachedEnd()){
                // if moving left or right
                if (this.pawDirection == Dir.Left || this.pawDirection == Dir.Right) {
                    this.paw.x += 10 * this.pawDirection[0];
                }

                else if (this.pawDirection == Dir.Up || this.pawDirection == Dir.Down) {
                    this.paw.y += 10 * this.pawDirection[1];
                }

                if (Phaser.Math.Distance.Between(this.paw.x, this.paw.y, this.danger.x, this.danger.y) < 160) {
                    this.danger.alpha = 0;
                }

                /*if (this.paw.x == 0){
                    this.danger.destroy();
                }*/
            }
            // else if (this.paw.x <= 500 && this.moveRight == false){
            //     this.paw.x -= 5;
            //     if (this.paw.x == 0){
            //         this.moveRight = true;
            //     }
            // }

            if (control == false && mouse.isDown){
                // create fireball when firing
                fireball = this.physics.add.sprite(this.player.x - 70, this.player.y - 7, 'fireball');
                // shoot fireball in direction of cursor
                this.physics.moveTo(fireball, input.x, input.y, 500);
                control = true;
            }
    
            
    
            if (fireball.x > worldBounds.width || fireball.y > worldBounds.height || fireball.x < 0 || fireball.y < 0){
                fireball.destroy();
                control = false;
            }
    
            if(keyLEFT.isDown && 150 < this.player.x) { // change width based on bird cage
                this.player.x -= 5;
                this.player.flipX = false;
            }
            if (keyRIGHT.isDown && this.player.x < 500) { // change width based on bird cage
                this.player.x += 5;
                this.player.flipX = true; 
            }
            if (keyUP.isDown && 170 < this.player.y) { // change width based on bird cage
                this.player.y -= 5;
            }
            if (keyDOWN.isDown && this.player.y < 400) { // change width based on bird cage
                this.player.y += 5;
            }

            this.physics.add.overlap(fireball, this.paw, reset, null, this);
            // Tracking for player and paw collision
            this.physics.add.overlap(this.player, this.paw, gameLost, null, this);
            this.catHP.setText("Cat Health: " + this.pawHealth);
        }
    }

    gameDone(){
        let textConfig = {
            fontSize: '30px',
            fill: '#ffffff',
            fontFamily: '"Georgia"',
            strokeThickness: 5,
            stroke: 'black',
    
        };
        this.BGMusic.stop(); 
        this.gameOver = true;
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) to Menu', textConfig).setOrigin(0.5);
        
    }

    spawnPaw() {
        // Pick and set random direction
        var rand = Math.floor(Math.random() * (Object.keys(Dir).length));
        this.pawDirection = Dir[Object.keys(Dir)[rand]];

        // Set sprite rotation and hitbox
        switch(this.pawDirection) {
            case Dir.Right:
                this.paw.setAngle(0);
                this.paw.body.setSize(980, 425);
                break;
            case Dir.Left:
                this.paw.setAngle(180);
                this.paw.body.setSize(980, 425);
                break;
            case Dir.Up:
                this.paw.setAngle(270);
                this.paw.body.setSize(425, 980);
                break;
            case Dir.Down:
                this.paw.setAngle(90);
                this.paw.body.setSize(425, 980);
                break;
        }

        // Left/right: Spawn paw with x depending on direction and random y within range, and move danger
        if (this.pawDirection == Dir.Left || this.pawDirection == Dir.Right) {
            this.paw.y = Math.floor(Phaser.Math.Between(170, 400));
            this.paw.x = 320 - (720 * this.pawDirection[0]);
            this.danger.y = this.paw.y;
            this.danger.x = 320 - (275 * this.pawDirection[0]) - 5;
            this.danger.alpha = 1;
        }
        
        // Up/down: Spawn paw with y depending on direction and random x within range, and move danger
        else if (this.pawDirection == Dir.Up || this.pawDirection == Dir.Down) {
            this.paw.x = Math.floor(Phaser.Math.Between(170, 400));
            this.paw.y = 240 - (720 * this.pawDirection[1]);
            this.danger.x = this.paw.x;
            this.danger.y = 240 - (200 * this.pawDirection[1]) + 5;
            this.danger.alpha = 1;
        }
    }

    // returns true or false depending on if paw has passed edge (when it should reset position)
    pawReachedEnd() {
        if (this.pawDirection == Dir.Right && this.paw.x >= 900) {
            return true;
        }
        
        else if (this.pawDirection == Dir.Left && this.paw.x <= -260) {
            return true;
        }

        else if (this.pawDirection == Dir.Up && this.paw.y <= -260) {
            return true;
        }

        else if (this.pawDirection == Dir.Down && this.paw.y >= 740) {
            return true;
        }

        else return false;
    }
}

function reset(fireball, paw) {
    fireball.destroy();
    // paw.destroy();
    this.pawMoving = false;
    this.spawnPaw();
    this.danger.alpha = 0;
    this.DelayPaw = this.time.addEvent({delay: 2000, callback: () => {
        //this.paw = this.physics.add.sprite(-400, 170, 'paw').setScale(0.3);
        //this.danger = this.add.sprite(30, this.paw.y, 'danger').setScale(0.2);
        //this.moveRight = true;
        this.pawMoving = true;
        this.danger.alpha = 1;
    }, scope: this, loop: false});
    this.pawHealth -= 5;
    this.paw.x -= 80 * this.pawDirection[0];
    control = false;
}

function gameLost() {
    this.gameOver = true;
}


   


   
    
  

