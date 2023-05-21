class Phoenix extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 4;
        this.isFiring = false;
    }

    update() {
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) { // change width based on bird cage
            this.x -= this.moveSpeed;
        }
        if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) { // change width based on bird cage
            this.x += this.moveSpeed;
        }
        if (keyUP.isDown && this.x <= game.config.width - borderUISize - this.height) { // change width based on bird cage
            this.y += this.moveSpeed;
        }
        if (keyDOWN.isDown && this.x <= game.config.width - borderUISize - this.height) { // change width based on bird cage
            this.y += this.moveSpeed;
        }

    }


}