let human = {
    name: 'Human',
    armor: 0.1,
    
    health: 100,
    resistance: 20,
    type: '',
    damage: 10,
    imageUrl: 'pictures/human.png'

}

let elf = {
    name: 'Elf',
    armor: 0.1,
    resistance: 15,
    health: 100,
    type: '',
    damage: 0,
    imageUrl: 'pictures/elf.png'

}

let orc = {
    name: 'Orc',
    armor: 0.1,
    resistance: 11,
    health: 100,
    type: '',
    damage: 10,
    imageUrl: 'pictures/orc.png'

}

let skeleton = {
    name: 'Skeleton',
    armor: 0.1,
      health: 100,
    resistance: 20,
    type: '',
    damage: 10,
    imageUrl: 'pictures/skeleton.png'

}

let hero,
    enemy,
    intervalAttack,
    intervalHit,
    intervalEnemyAttack,
    players = [human, elf, orc, skeleton];


function init() {
    const choosePlayer = (isHero = true) => {
        let text = `Choose ${isHero ? 'hero' : 'enemy'}: `
        players.forEach((item, i) => text += `\n ${i} - ${item.name}`)
        let result = prompt(text)
        if (result < 0 || result > players.length - 1) result = choosePlayer(isHero)
        return result
    }

    let heroIndex = choosePlayer()
    console.log(heroIndex)
    hero = players[heroIndex];
    console.log(hero)

    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`;
    updateStats();


    let enemyIndex = choosePlayer(false)
    enemy = players[enemyIndex];
    console.log(enemy)

    document.querySelector('.container.creating').classList.remove('creating')

    document.getElementById("enemy").style.backgroundImage = `url(${enemy.imageUrl})`;
    updateStatsEnemy();



}


window.onload = function () {
    init();
    // console.log(randomInteger(1, 100))
}

function updateStats() {
    get('hero-name').innerHTML = 'name: ' + hero.name;
    get('hero-damage').innerHTML = 'damage: ' + hero.damage;
    get('hero-armor').innerHTML = 'armor: ' + hero.armor;
    get('hero-health').innerHTML = 'health: ' + hero.health;

}

function updateStatsEnemy() {
    get('enemy-name').innerHTML = "name: " + enemy.name;
    get('enemy-damage').innerHTML = "damage: " + enemy.damage;
    get('enemy-armor').innerHTML = "armor: " + enemy.armor;
    get('enemy-health').innerHTML = "health: " + enemy.health;
}


function get(item) {
    return document.getElementById(item)
}

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max + 1 - min)
    return Math.round(randomInt);
}



function checkHealth() {
    updateStatsEnemy();
    updateStats();
    if (hero.health <= 0 || enemy.health <= 0) {
        endGame();
        get("enemy").style.display = "none";
        get("hero-attack").style.display = "none";
        get("hero-yield").style.display = "block";
        get("enemy-stats").style.display = "none";
        alert(`You won ${enemy.name}`);
        get("hero-attack").style.display = "block";
        enemy.health = 100;
    }
}


/** attack on an enemy */
get('enemy-attack').onclick = heroAtack;

function heroAtack() {
    enemy.health -= hero.damage - enemy.armor + enemy.resistance;

    heroAnimation();
    animateHit("enemy", "damageEnemyContainer", enemy.health);
    // checkHealth()
    if (!checkHealth()) {
        setTimeout(() => {
            heroAnimation();
        }, 2500);
    }
}


function heroAnimation() {
    let position = 0;
    const interval = 100;
    const diff = 400;

    get('hero').style.transform = "translate(300px)"
    intervalAttack = setTimeout(() => {

        get('hero').style.backgroundPosition = `-${position}px -1800px`;
        heroAnimation()
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('hero').style.backgroundPosition = `-${position}px -3600px`;
            get('hero').style.transform = "translate(-600px)";
            HeroAttack('enemy', 'damageEnemyContainer', 34);
            setTimeout(() => {
                HeroAttack()

            }, 2000);
            animation(intervalAttack)
        }


    }, interval);
}


/** attack on a hero */

get('hero-attack').onclick = enemyAtack;

function enemyAtack() {
    hero.health -= hero.damage - enemy.armor + enemy.resistance;
    enemyAnimation();
    animateHit("hero", "damageHeroContainer", hero.health);
    // checkHealth()
    if (!checkHealth()) {
        setTimeout(() => {
            enemyAnimation();
        }, 2500);
    }
}


function animation(item) {
    clearInterval(item);

}


function enemyAnimation() {
    let position = 0;
    const interval = 100;
    const diff = 400;

    get('enemy').style.transform = "translate(-300px)"
    intervalAttack = setTimeout(() => {

        get('emeny').style.backgroundPosition = `-${position}px -1800px`;
        enemyAnimation()
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('emeny').style.backgroundPosition = `-${position}px -2500px`;
            get('emeny').style.transform = "translate(-750px)";
            enemyAtack('hero', 'damageHeroContainer', 34);
            setTimeout(() => {
                enemyAtack()

            }, 2000);
            animation(intervalAttack)
        }

    }, interval);
}


/**Game Over function */
function endGame() {
    alert("Game over!");
    let reload = confirm("Would you like to game again?");
    if (reload) {
        location.reload();
    }
}






/**Animation to the hit */

function animateHit(character, damage) {
    let position = 0;
    const interval = 40;
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
            get('enemy').style.transform = "translate(0px,0px)"
            get('damageEnemyContainer').style.transform = "translate(0px,0px)"
            get('damageEnemyContainer').style.display = "none";
            animation(intervalHit);


            get('hero').style.transform = "translate(0px,0px)"
            get('damageHeroContainer').style.transform = "translate(0px,0px)"
            get('damageHeroContainer').style.display = "none";
            animation(intervalHit);
        }

    }, interval);
}

/**end animations */