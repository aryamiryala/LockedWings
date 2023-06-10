class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }
    create(){
        this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        let instructionConfig = {
            fontFamily: 'Georgia', 
            fontSize: '25px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };

        let mssgConfig = {
            fontFamily: 'Georgia', 
            fontSize: '16px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = `"Locked Wings" is a 2D game about a phoenix trying to escape a cage in its owner's home. 
       
       
        Your goal in the game is to escape the cage by defeating the cat trying to kill you. 
        If hit by the cat the game ends. 

        Use the mouse or trackpad to shoot fire and the W,A,S,D to move. Good Luck!!
        `;
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Instructions', instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 250, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 450, 'Click <- to go back to menu' , instructionConfig).setOrigin(0.5);

        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        

    }
    update(){
        
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("menuScene");    
        }
    }

}
