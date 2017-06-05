/// <reference path="chicken.ts" />
/// <reference path="zombie.ts" />
/// <reference path="util.ts" />

class Game {
    
    private chicken:Chicken;
    private zombies:Array<Zombie> = new Array<Zombie>();
    private phones:Array<Phone> = new Array<Phone>();
    private grains:Array<Grain> = new Array<Grain>();

    private score:number;
    private div:Element;
 
    constructor() {
        this.chicken = new Chicken();
  
        for(let c = 0; c<10; c++){
            this.zombies.push(new Zombie(this.chicken));
        }

        for(let c = 0; c<5; c++){
            this.phones.push(new Phone());
        }
                
        for(let c = 0; c<60; c++){
            this.grains.push(new Grain());
        }

        this.score = 0;
        this.div = document.getElementById("ui"); 
 
        requestAnimationFrame(() => this.gameLoop());
    }
    
    private gameLoop(){
        // beweging
        this.chicken.update();

        let hitZombie = false;
        for(let z of this.zombies){
            z.update();
            if(Util.checkCollision(z, this.chicken)){
                hitZombie = true;
            }
        }

        for(let p of this.phones){
            p.update();
            if(Util.checkCollision(p, this.chicken)){
                Util.removeFromGame(p,this.phones);
                this.chicken.setClicks(1);
            }
        }

        for(let g of this.grains){
            if(Util.checkCollision(g, this.chicken)){
                Util.removeFromGame(g,this.grains);
                this.score +=1;
            }
        }

        
        this.div.innerHTML = "Score: " + this.score;

        if(!hitZombie) requestAnimationFrame(() => this.gameLoop());
    }
    
} 

window.addEventListener("load", function() {
    new Game();
});