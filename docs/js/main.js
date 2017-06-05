"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag) {
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.direction = 1;
        this.parent = document.body;
        this.div = document.createElement("div");
        this.parent.appendChild(this.div);
        this.div.setAttribute("class", tag);
    }
    GameObject.prototype.update = function () {
        this.direction = (this.xspeed < 0) ? 1 : -1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.direction + ",1)";
    };
    return GameObject;
}());
var Chicken = (function (_super) {
    __extends(Chicken, _super);
    function Chicken() {
        var _this = _super.call(this, "bird") || this;
        _this.width = 67;
        _this.height = 110;
        _this.speedmultiplier = 2;
        _this.subscribers = [];
        _this.clicks = 0;
        window.addEventListener("click", function (e) { return _this.onWindowClick(e); });
        _this.div.addEventListener("click", function (e) { return _this.onClick(e); });
        return _this;
    }
    Chicken.prototype.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        _super.prototype.update.call(this);
    };
    Chicken.prototype.onWindowClick = function (e) {
        Util.setSpeed(this, e.clientX - this.x, e.clientY - this.y);
        this.div.style.backgroundImage = "url('images/chickenwalking.gif')";
    };
    Chicken.prototype.onClick = function (e) {
        if (this.clicks > 0) {
            this.clicks -= 1;
            this.div.style.backgroundImage = "url('images/chickencalling.png')";
            this.xspeed = 0;
            this.yspeed = 0;
            for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
                var zombie = _a[_i];
                zombie.notify();
            }
            e.stopPropagation();
        }
    };
    Chicken.prototype.subscribe = function (o) {
        this.subscribers.push(o);
    };
    Chicken.prototype.unsubscribe = function (o) {
        var index = this.subscribers.indexOf(o);
        this.subscribers.splice(index);
    };
    Chicken.prototype.setClicks = function (clicker) {
        this.clicks += clicker;
    };
    return Chicken;
}(GameObject));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(c) {
        var _this = _super.call(this, "zombie") || this;
        _this.width = 67;
        _this.height = 119;
        _this.active = true;
        _this.x = Math.random() * (window.innerWidth - 67);
        _this.y = Math.random() * (window.innerHeight / 2) + (window.innerHeight / 2 - 67);
        _this.speedmultiplier = Math.random() * 2;
        _this.chicken = c;
        _this.chicken.subscribe(_this);
        return _this;
    }
    Zombie.prototype.update = function () {
        Util.setSpeed(this, this.chicken.x - this.x, this.chicken.y - this.y);
        if (this.active == true) {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }
        _super.prototype.update.call(this);
    };
    Zombie.prototype.notify = function () {
        this.active = false;
        this.div.style.backgroundImage = "url('images/calling.png')";
        setTimeout(this.resume.bind(this), 10 * this.x);
    };
    Zombie.prototype.resume = function (element) {
        this.div.style.backgroundImage = "url('images/zombie.png')";
        this.active = true;
    };
    return Zombie;
}(GameObject));
var Util = (function () {
    function Util() {
    }
    Util.setSpeed = function (go, xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist / distance;
        go.yspeed = ydist / distance;
        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    };
    Util.checkCollision = function (go1, go2) {
        return (go1.x < go2.x + go2.width &&
            go1.x + go1.width > go2.x &&
            go1.y < go2.y + go2.height &&
            go1.height + go1.y > go2.y);
    };
    Util.removeFromGame = function (go, arr) {
        go.div.remove();
        var i = arr.indexOf(go);
        if (i != -1) {
            arr.splice(i, 1);
        }
    };
    return Util;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.zombies = new Array();
        this.phones = new Array();
        this.grains = new Array();
        this.chicken = new Chicken();
        for (var c = 0; c < 10; c++) {
            this.zombies.push(new Zombie(this.chicken));
        }
        for (var c = 0; c < 5; c++) {
            this.phones.push(new Phone());
        }
        for (var c = 0; c < 60; c++) {
            this.grains.push(new Grain());
        }
        this.score = 0;
        this.div = document.getElementById("ui");
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.chicken.update();
        var hitZombie = false;
        for (var _i = 0, _a = this.zombies; _i < _a.length; _i++) {
            var z = _a[_i];
            z.update();
            if (Util.checkCollision(z, this.chicken)) {
                hitZombie = true;
            }
        }
        for (var _b = 0, _c = this.phones; _b < _c.length; _b++) {
            var p = _c[_b];
            p.update();
            if (Util.checkCollision(p, this.chicken)) {
                Util.removeFromGame(p, this.phones);
                this.chicken.setClicks(1);
            }
        }
        for (var _d = 0, _e = this.grains; _d < _e.length; _d++) {
            var g = _e[_d];
            if (Util.checkCollision(g, this.chicken)) {
                Util.removeFromGame(g, this.grains);
                this.score += 1;
            }
        }
        this.div.innerHTML = "Score: " + this.score;
        if (!hitZombie)
            requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Grain = (function (_super) {
    __extends(Grain, _super);
    function Grain() {
        var _this = _super.call(this, "grain") || this;
        _this.width = 20;
        _this.height = 24;
        _this.x = Math.random() * (window.innerWidth - 20);
        _this.y = Math.random() * (window.innerHeight - 24);
        _this.update();
        return _this;
    }
    return Grain;
}(GameObject));
var Phone = (function (_super) {
    __extends(Phone, _super);
    function Phone() {
        var _this = _super.call(this, "phone") || this;
        _this.width = 50;
        _this.height = 92;
        _this.x = Math.random() * (window.innerWidth - 50);
        _this.y = Math.random() * (window.innerHeight - 220);
        _this.update();
        return _this;
    }
    return Phone;
}(GameObject));
//# sourceMappingURL=main.js.map