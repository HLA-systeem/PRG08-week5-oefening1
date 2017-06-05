/// <reference path="gameobject.ts" />

class Zombie extends GameObject implements Observer{

    private chicken:Chicken;
    private active:boolean

    constructor(c:Chicken) {
        super("zombie");

        this.width = 67;
        this.height = 119;
        this.active = true;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight/2) + (window.innerHeight/2-67);
        this.speedmultiplier = Math.random() * 2;
        this.chicken = c;
        
        this.chicken.subscribe(this)

    }

    public update(){
        // deze regel code geeft de zombie de snelheid waarmee hij naar de kip beweegt
        Util.setSpeed(this, this.chicken.x - this.x, this.chicken.y - this.y);

        if(this.active == true){ 
            this.x += this.xspeed;
            this.y += this.yspeed; 
        }
        // het gameObject tekent de zombie in het scherm
        super.update();
    }

    notify(): void {
        this.active = false;
        this.div.style.backgroundImage = "url('images/calling.png')";
        setTimeout(this.resume.bind(this), 10 * this.x);
        
    }

    resume(element:Element){
        this.div.style.backgroundImage = "url('images/zombie.png')";
        this.active = true;
    }
}