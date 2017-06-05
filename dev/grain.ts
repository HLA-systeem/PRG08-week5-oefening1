/// <reference path="gameobject.ts" />


class Grain extends GameObject {
        
    constructor() {
        super("grain");
        this.width = 20;
        this.height = 24;
        this.x = Math.random() * (window.innerWidth - 20);
        this.y = Math.random() * (window.innerHeight - 24);

        this.update();
    }

}