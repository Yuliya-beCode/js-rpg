let hero,
    enemy,
    intervalAttack,
    intervalHit,
    intervalEnemyAttack,
    players = [human, elf, orc, skeleton],
    playersItems = [boots, staff, sword, bow];


function init() {
    const choosePlayer = (isHero = true) => {
        let text = `Choose ${isHero ? 'hero' : 'enemy'}: `
        players.forEach((item, i) => text += `\n ${i} - ${item.name}`)
        let result = prompt(text)
        if (result < 0 || result > players.length - 1) result = choosePlayer(isHero)
        return result
    }

    const chooseItem = (isHero = true) => {
        let text = `Choose ${isHero ? 'hero' : 'enemy'} item: `
        playersItems.forEach((item, i) => text += `\n ${i} - ${item.name}`)
        let result = prompt(text)
        if (result < 0 || result > players.length - 1) result = chooseItem(isHero)
        return playersItems[result]
    }

    let heroIndex = choosePlayer()
    hero = players[heroIndex];
    hero.item = chooseItem()

    document.getElementById("hero").style.backgroundImage = `url(${hero.imageUrl})`;
    document.getElementById("heroItem").style.backgroundImage = `url(${hero.item.imageUrl})`;
    updateStats();


    let enemyIndex = choosePlayer(false)
    enemy = players[enemyIndex];
    enemy.item = chooseItem(false)

    document.querySelector('.container.creating').classList.remove('creating')

    document.getElementById("enemy").style.backgroundImage = `url(${enemy.imageUrl})`;
    document.getElementById("enemyItem").style.backgroundImage = `url(${enemy.item.imageUrl})`;
    updateStatsEnemy();


}


window.onload = function () {
    init();
    // console.log(randomInteger(1, 100))
}

function updateStats() {
    get('hero-name').innerHTML = 'name: ' + hero.name;
    get('hero-damage').innerHTML = 'damage: ' + hero.damage;
    get('hero-health').innerHTML = 'health: ' + hero.health;

}

function updateStatsEnemy() {
    get('enemy-name').innerHTML = "name: " + enemy.name;
    get('enemy-damage').innerHTML = "damage: " + enemy.damage;
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
    } else if (enemy.health <= 0) {
        endGame();
        get("enemy").style.display = "none";
        get("hero").style.display = "none";
        alert(`You won ${hero.name}`);

    }
}

function changeAction(element = '', timeout = 2500) {
    const button = document.querySelector(element);
    button.disabled = true
    setTimeout(() => button.disabled = false, timeout)
}

/** attack on an enemy */
function heroAtack() {
    changeAction('#hero-attack',1000)
    let damage = hero.damage;
    if (enemy.hasOwnProperty('resistance')) damage -= damage * enemy.resistance

    changeHealth(damage, 'enemy')

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
      
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('hero').style.backgroundPosition = `-${position}px -2500px`;
            get('hero').style.transform = "translate(-750px)";
             setTimeout(() => {
                enemyAtack()

            }, 2000);
            animation(intervalAttack)
        }

    }, interval);
}


/** attack on a hero */
function enemyAtack() {
    changeAction('#enemy-attack')
    let damage = enemy.damage;
    if (hero.hasOwnProperty('resistance')) damage -= damage * hero.resistance

    changeHealth(damage, 'hero')

    enemyAnimation();
    animateHit("hero", "damageHeroContainer", hero.health);
    // checkHealth()
    if (!checkHealth()) {
        setTimeout(() => {
            enemyAnimation();
        }, 2500);
    }
}

get('enemy-attack').onclick = enemyAtack;
get('hero-attack').onclick = heroAtack;

function animation(item) {
    clearInterval(item);

}


function enemyAnimation() {
    let position = 0;
    const interval = 100;
    const diff = 400;

    get('enemy').style.transform = "translate(-300px)"
    intervalAttack = setTimeout(() => {

        get('enemy').style.backgroundPosition = `-${position}px -1800px`;
      
        if (position < 2000) {
            position = position + diff;
        } else {
            position = 0;
            get('emeny').style.backgroundPosition = `-${position}px -2500px`;
            get('emeny').style.transform = "translate(-750px)";
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

function changeHealth(count, who = "hero") {
    const heroProg = document.getElementById("healthHero")
    const enemyProg = document.getElementById("healthEnemy")

    if (who === 'hero') {
        hero.health -= count || 0;
        heroProg.value = hero.health || 0
        return hero.value
    } else {
        enemy.health -= count || 0;
        enemyProg.value = enemy.health || 0;
        return enemy.health
    }

}

