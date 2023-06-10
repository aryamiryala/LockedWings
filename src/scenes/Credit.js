class Credit extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    create(){
        this.background= this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);
        
        let creditConfig = {
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
            fontSize: '18px', 
            backgroundColor: 'transparent',
            color: 'blue',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = 
        `Developed by: Arya Miryala, Brennan Tsang, Jackie Wang, Marcus Willamson 
       
        Built with: Phaser 3, Javascript 

        Assets: Music made by Brennan Tsang
                Art made on https://www.pixilart.com/draw?ref=home-page

       

        `;
        this.add.text(game.config.width/2, game.config.height/7 - borderUISize - borderPadding, 'Credits', creditConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5, mssg , mssgConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.2, 'Click <- to go back to menu' , creditConfig).setOrigin(0.5);

        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        

    }
    update(){

        

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
           
            // this.sound.play('sfx_select');
              this.scene.start("menuScene");    
        }
    }

}