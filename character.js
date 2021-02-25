let heroOne = {
    name: 'Elf',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    money: 0,
    damage: 10,
    imageUrl: 'pictures/elf.png'

}

let heroSecond = {
    name: 'Human',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    money: 0,
    damage: 10,
    imageUrl: 'pictures/human.png'

}

let enemyOne = {
    name: 'Orc',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    money: 0,
    imageUrl: './pictures/orc.png'

}

let enemySecond = {
    name: 'Skeleton',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    money: 0,
    imageUrl: './pictures/skeleton.png'

}

let hero;
let intervalAttack;
let intervalHit;

function init() {
    const heroArray = [heroOne, heroSecond];
    const enemyArray = [enemyOne, enemySecond];

    let heroIndex = prompt('Please choose your hero 0 - heroOne, 1 - heroSecond');
    hero = heroArray[heroIndex];
    console.log(hero)

    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`;
    updateStates();

    get('attack').onclick = attack;
    /**  get('enemy-hit').onclick = animateHit;*/


}


window.onload = function () {
    init();
    console.log(randomInteger(1, 100))
}

function updateStates() {
    get('hero-name').innerHTML = 'name: ' + hero.name;
    get('hero-damage').innerHTML = 'damage: ' + hero.damage;
    get('hero-armor').innerHTML = 'armor: ' + hero.armor;
    get('hero-money').innerHTML = 'money: ' + hero.money;
    get('hero-health').innerHTML = 'health: ' + hero.health;



}

function get(item) {
    return document.getElementById(item)
}

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max + 1 - min)
    return Math.round(randomInt);
}

function attack() {
    let position = 0;
    const interval = 100;
    const diff = 400;

    get('hero').style.transform = "translate(700px)"
    intervalAttack = setInterval(() => {

        get('hero').style.backgroundPosition = `-${position}px -2830px`;
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('hero').style.backgroundPosition = `-${position}px -1000px`;
            get('hero').style.transform = "translate(600px)";
            animateHit('enemy', 'damageEnemyContainer', 34);
            setTimeout(() => {
                attackEnemy()
            }, 2000);
            animation(intervalAttack)
        }


    }, interval);
}



function attackEnemy() {
    let position = -0;
    const interval = 170;
    const diff = 415;
    // document.getElementById("enemy").style.transform = "translate(100px,-150px)"
    intervalEnemyAtackAnim = setInterval(() => {

      document.getElementById("enemy").style.backgroundPosition =
        `-${position}px -2505px`;

      if (position < 2000) {
        position = position + diff;
      } else {
        position = -0;
        document.getElementById("enemy").style.backgroundPosition =
          `-0px -2505px`;
        // document.getElementById("enemy").style.transform = "translate(0px,0px)"
        stopAnimate(intervalEnemyAtackAnim)
      }

    }, interval);
}

function animateHit(character, damageContainer, damage) {
    let position = 0;
    const interval = 140;
    const diff = 5;
    intervalHit = setInterval(() => {

        document.getElementById(character).style.transform = `translate(0px, -${position}px)`;
        document.getElementById('damageEnemyContainer').innerHTML = damage;
       document.getElementById('damageEnemyContainer').style.display = "block";
        document.getElementById('damageEnemyContainer').style.transform =
          `translate(0px, -${position}px)`; 


        if (position < 30) {
            position = position + diff;
        } else {
            position = 0;
            document.getElementById(character).style.transform = "translate(0px,0px)"
            document.getElementById('damageEnemyContainer').style.transform = "translate(0px,0px)"
             document.getElementById('damageEnemyContainer').style.display = "none";
            animation(intervalHit);
        }

    }, interval);
}


function animation(item) {
    clearInterval(item);

}