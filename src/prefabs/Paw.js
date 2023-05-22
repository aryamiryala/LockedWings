class Paw extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveRight = true;
    }

    update() {

        //randomly spawn paw between range of cage 
        if (this.x <= 0){
            this.y = Math.floor(Phaser.Math.Between(170, 400));
        }

        if (this.x >= 0 && this.moveRight == true){
            this.x += 5;
            if (this.x == 500){
                this.moveRight = false;
            }
        }
        else if (this.x <= 500 && this.moveRight == false){
            this.x -= 5;
            if (this.x == 0){
                this.moveRight = true;
            }
        }


    }

    reset() {
        this.x = 0;
    }
}
