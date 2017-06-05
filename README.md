# https://hla-systeem.github.io/PRG08-week5-oefening1/index.html

# PRG08 Week 5 Oefening 1

## Chickens versus Zombies

![Chickens](docs/images/runchickenrun.png?raw=true "Run chicken, run")

## Startcode

- Er is een game met zombies en een kip
- De zombies bewegen richting de kip
- Als je in het scherm klikt beweegt de kip naar die locatie
- De collision detection functie kijkt of een kip een zombie raakt
- Als je op de kip klikt pakt hij zijn telefoontje

## Opdracht 1

- Maak van de chicken een observable, zie UML
- Maak van de zombies observers, zie UML
- De zombies abbonneren zich op de chicken zodra ze aangemaakt worden
- Als je op de kip klikt stuurt hij een notificatie naar alle zombies
- Als de zombies een notificatie krijgen stoppen ze met bewegen en krijgen ze de andere zombie texture

## Opdracht 2

- De zombies gaan na een pauze weer bewegen, en krijgen dan ook weer de beweging texture

## Opdracht 3

- Voeg graan en telefoontjes toe aan het scherm
- Gebruik de collision detection functie om te zien of je graan of telefoontjes raakt
- Als de kip graankorrels oppakt krijg je punten
- Het aantal telefoontjes dat je hebt opgepakt, bepaalt hoe vaak je op de kip mag klikken om de zombies een berichtje te sturen
- Gebruik de 'removeFromGame' functie in util om graan en telefoons uit de game te verwijderen

## UML Observer pattern

![UML](docs/images/observer.png?raw=true "UML")

### Voorbeeldcode Observer

```
interface Observer {
    notify():void;
}

interface Observable {
    observers:Array<Observer>;
    subscribe(o:Observer):void;
    unsubscribe(o:Observer):void;
}

class Zombie implements Observer {
    //...
}

class Chicken implements Observable {
    //...
}
```

### Texture veranderen

```
this.div.style.backgroundImage = "url('images/zombie.png')";
```
