class GameObject {

    public parent: HTMLElement;
    public div: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public width:number;
    public height:number;
    public direction:number = 1;

    constructor(tag:string) {
        this.parent= document.body;
        this.div = document.createElement("div");
        this.parent.appendChild(this.div);

        this.div.setAttribute("class", tag);
    
    }

    public update():void {
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.direction+",1)";
    }

}