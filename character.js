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
    imageUrl: 'pictures/orc.png'

}

let enemySecond = {
    name: 'Skeleton',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    money: 0,
    imageUrl: 'pictures/skeleton.png'

}

let hero;
let intervalAttack;
let intervalHit;
let intervalEnemyAtack;
let enemySelected;
let heroArray = [heroOne, heroSecond];
let enemyArray = [enemyOne, enemySecond];

function init() {
    heroArray = [heroOne, heroSecond];
    enemyArray = [enemyOne, enemySecond];

    let heroIndex = prompt('Please choose your hero 0 - heroOne, 1 - heroSecond');
    hero = heroArray[heroIndex];
    console.log(hero)

    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`;
    updateStats();

    get('enemy-attack').onclick = attack;
    /**  get('enemy-hit').onclick = animateHit;*/


}


window.onload = function () {
    init();
    console.log(randomInteger(1, 100))
}

function updateStats() {
    get('hero-name').innerHTML = 'name: ' + hero.name;
    get('hero-damage').innerHTML = 'damage: ' + hero.damage;
    get('hero-armor').innerHTML = 'armor: ' + hero.armor;
    get('hero-money').innerHTML = 'money: ' + hero.money;
    get('hero-health').innerHTML = 'health: ' + hero.health;

}

function updateStatsEnemy(enemySelected) {
    get('enemy-stats').style.display = "block";
    get('enemy-name').innerHTML = "name: " + enemySelected.name;
    get('enemy-damage').innerHTML = "damage: " + enemySelected.damage;
    get('enemy-armor').innerHTML = "armor: " + enemySelected.armor;
    get('enemy-money').innerHTML = "money: " + enemySelected.money;
    get('enemy-health').innerHTML = "health: " + enemySelected.health;
}



function get(item) {
    return document.getElementById(item)
}

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max + 1 - min)
    return Math.round(randomInt);
}

function battle() {
    nemySelected = enemySelected[randomInteger(0, enemyArray.length - 1)];
    let confirmEnemy = confirm(
        "You have met " +
        enemyArray[randomInteger(0, enemyArray.length - 1)].name +
        "Would you like to battle? Or flee?"
    );

    if (confirmEnemy) {
        get("enemy").style.backgroundImage = `url(${enemySelected.imageUlr})`;
        get("enemy").style.display = "block";
        get("enemy-attack").style.display = "block";
        get("enemy-hit").style.display = "none";
        updateStatsEnemy(enemySelected);
    } else {
        hero.health -= enemySelected.damage;
        updateStats();
    }
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
    let position = 0;
    const interval = 100;
    const diff = 800;

    intervalEnemyAtackAnim = setInterval(() => {

        document.getElementById("enemy").style.backgroundPosition =
            `-${position}px -2505px`;

        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get("enemy").style.backgroundPosition = `-0px -2550px`;
            get('enemy').style.transform = "translate(-700px)";
            animateHit('hero', 'damageHeroContainer', 34);
            setTimeout(() => {
                attack()

            }, 2000);
            animation(intervalAttack)

        }

    }, interval);
}


function animateHit(character, damageContainer, damage) {
    let position = 0;
    const interval = 140;
    const diff = 5;
    intervalHit = setInterval(() => {

        get(character).style.transform = `translate(0px, -${position}px)`;
        get('damageEnemyContainer').innerHTML = damage;
        get('damageEnemyContainer').style.display = "block";
        get('damageEnemyContainer').style.transform =
            `translate(0px, -${position}px)`;

        get(character).style.transform = `translate(0px, -${position}px)`;
        get('damageHeroContainer').innerHTML = damage;
        get('damageHeroContainer').style.display = "block";
        get('damageHeroContainer').style.transform =
            `translate(0px, -${position}px)`;


        if (position < 30) {
            position = position + diff;
        } else {
            position = 0;
            get(character).style.transform = "translate(0px,0px)"
            get('damageEnemyContainer').style.transform = "translate(0px,0px)"
            get('damageEnemyContainer').style.display = "none";
            animation(intervalHit);


            get(character).style.transform = "translate(0px,0px)"
            get('damageHeroContainer').style.transform = "translate(0px,0px)"
            get('damageHeroContainer').style.display = "none";
            animation(intervalHit);
        }

    }, interval);
}


function animation(item) {
    clearInterval(item);

}


function endGame() {
    alert("Game over!");
    let reload = confirm("Would you like to game again?");
    if (reload) {
        location.reload();
    }
}