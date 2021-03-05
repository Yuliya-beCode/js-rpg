/** parameters of the heros */

let human = {
    name: 'Human',
    armor: 0.1,
    health: 100,
    resistance: 20,
    type: '',
    damage: 10,
    imageUrl: 'pictures/human.png'
    /**20% less damage taken */
}

let orc = {
    name: 'Orc',
    armor: 0.1,
    resistance: 11,
    health: 100,
    type: '',
    damage: 10,
    imageUrl: 'pictures/orc.png'
    /**40% more max health */
}

let elf = {
    name: 'Elf',
    armor: 0.1,
    resistance: 15,
    health: 100,
    type: '',
    damage: 0,
    imageUrl: 'pictures/elf.png'
    /**30% chance to deflect the attack back to the opponent. The attacker takes damage equal to 50% of the original hit. The elf takes no damage. */
}

let skeleton = {
    name: 'Skeleton',
    armor: 0.1,
    health: 100,
    resistance: 20,
    type: '',
    damage: 10,
    imageUrl: 'pictures/skeleton.png'
    /**10% lifesteal from opponents current health at start of the vampire's turn. */
}


/**parameters of the items */

let boots = {
    name: 'boots',
    type: '',
    damage: 10,
    imageUrl: 'pictures\boots.png'
    /**30% chance to dodge an attack */
}

let staff = {
    name: 'staff',
    type: '',
    damage: 10,
    imageUrl: 'pictures\staff.png'
    /**20% increase in healing*/
}

let sword = {
    name: 'sword',
    type: '',
    damage: 10,
    imageUrl: 'pictures\sword.png'
    /**30% more damage*/
}

let bow = {
    name: 'bow',
    type: '',
    damage: 10,
    imageUrl: 'pictures\bow.png'
    /**30% chance to attack twice*/
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
    if (hero.health <= 0) {
        endGame();
        get("enemy").style.display = "none";
        get("hero").style.display = "none";
        alert(`You won ${enemy.name}`);
     
        enemy.health = 100;
    }
   else if (enemy.health <= 0) {
        endGame();
        get("enemy").style.display = "none";
        get("hero").style.display = "none";
        alert(`You won ${hero.name}`);
      
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

        get('hero').style.backgroundPosition = `-${position}px -417px`;
        heroAnimation()
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('hero').style.backgroundPosition = `-${position}px -417px`;
            get('hero').style.transform = "translate(-750px)";
            heroAtack('enemy', 'damageEnemyContainer', 34);
            setTimeout(() => {
                heroAtack()

            }, 2000);
            animation(intervalEnemyAttack)
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
        get('damageEnemyContainer').innerHTML = enemy.health;
        get('damageEnemyContainer').style.display = "block";
        get('damageEnemyContainer').style.transform =
            `translate(0px, -${position}px)`;

        get(character).style.transform = `translate(0px, -${position}px)`;
        get('damageHeroContainer').innerHTML = hero.health;
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

let health = document.getElementById("healthHero")
health.value -= 10;

health = document.getElementById("healthEnemy")
health.value -= 10;