/// <reference path="gameobject.ts" />

class Chicken extends GameObject implements Observable {
    private subscribers:Array<Observer>;
    private clicks:number;
        
    constructor() {
        super("bird");

        this.width = 67;
        this.height = 110;
        this.speedmultiplier = 2;
        this.subscribers = [];
        this.clicks = 0;

        window.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e));
        this.div.addEventListener("click", (e:MouseEvent) => this.onClick(e));
    }

    public update(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        super.update();
    }

    // de beweegrichting aanpassen aan waar in het window is geklikt
    private onWindowClick(e:MouseEvent):void {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y);
        this.div.style.backgroundImage = "url('images/chickenwalking.gif')";
    }
    
    // er is op de kip geklikt
    private onClick(e:MouseEvent):void {
        if(this.clicks > 0){
            this.clicks -=1;
            this.div.style.backgroundImage = "url('images/chickencalling.png')";
            this.xspeed = 0;
            this.yspeed = 0;

            for (let zombie of this.subscribers) {
                zombie.notify();
            } 
            
            // hiermee voorkomen we dat window.click ook uitgevoerd wordt
            e.stopPropagation();
        }
    }

    public subscribe(o:Observer):void{
        this.subscribers.push(o);
    }
    public unsubscribe(o:Observer):void{
        let index:number = this.subscribers.indexOf(o);
        this.subscribers.splice(index);
    }

    public setClicks(clicker:number){
        this.clicks += clicker;
    }

}