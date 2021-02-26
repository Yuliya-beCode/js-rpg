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
    damage: 10,
    money: 0,
    imageUrl: 'pictures/orc.png'

}

let enemySecond = {
    name: 'Skeleton',
    armor: 0.1,
    agility: 1,
    health: 100,
    type: '',
    damage: 10,
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


    let enemyIndex = prompt('Please choose your enemy 0 - enemyOne, 1 - enemySecond');
    enemy = enemyArray[enemyIndex];
    console.log(enemy)

    document.getElementById("enemy").style.backgroundImage = `url(${enemy.imageUrl})`;
    updateStatsEnemy();

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

function updateStatsEnemy() {
    get('enemy-name').innerHTML = "name: " + enemy.name;
    get('enemy-damage').innerHTML = "damage: " + enemy.damage;
    get('enemy-armor').innerHTML = "armor: " + enemy.armor;
    get('enemy-money').innerHTML = "money: " + enemy.money;
    get('enemy-health').innerHTML = "health: " + enemy.health;
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
    let position = 0;
    const interval = 100;
    const diff = 800;

    intervalEnemyAtack = setInterval(() => {

        get("enemy").style.backgroundPosition = `-${position}px -2505px`;

        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get("enemy").style.backgroundPosition = `-0px -2550px`;
            get('enemy').style.transform = "translate(-200px)";
            animateHit('hero', 'damageHeroContainer', 34);
            setTimeout(() => {
                attack()

            }, 2000);
            animation(intervalEnemyAtack)

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


 function checkHealth() {
    updateStatsEnemy();
    updateStats();
    if (hero.health <= 0) {
      endGame();
    } else if (enemy.health <= 0) {
      hero.money += enemy.money;
      get("enemy").style.display = "none";
      get("hero-attack").style.display = "none";
      get("hero-yield").style.display = "block";
      get("enemy-stats").style.display = "none";
      alert(`You won ${enemy.name}`);
      get("hero-attack").style.display = "block";
      enemy.health = 100;

      return true
    }
  }

  function heroAtack() {
    enemy.health -= hero.damage - enemy.armor;
    attack();
    animateHit("enemy", "damageEnemyContainer", hero.damage - enemy.armor);
    // checkHealth()
    if(!checkHealth()){
      setTimeout(() => {
        attackEnemy();
      }, 2500);
    }

   
  }

  function enemyAtack() {
    hero.health -= enemy.damage - hero.armor;
    attackEnemy();
    animateHit("hero", "damageHeroContainer", enemy.damage - hero.armor);
    checkHealth()
  }

  document.getElementById("hero-attack").onclick = heroAtack;

  init();


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