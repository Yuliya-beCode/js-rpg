// parameters of the heroes

let human = {
    name: 'Human',
    health: 100,
    resistance: .2,
    damage: 10,
    imageUrl: 'pictures/human.png'
}

let orc = {
    name: 'Orc',
    health: 100,
    maxHealth: .4,
    damage: 10,
    imageUrl: 'pictures/orc.png'
}

let elf = {
    name: 'Elf',
    health: 100,
    damage: 10,
    imageUrl: 'pictures/elf.png',
    deflect: .3
    /**30% chance to deflect the attack back to the opponent. The attacker takes damage equal to 50% of the original hit. The elf takes no damage. */
}

let skeleton = {
    name: 'Skeleton',
    health: 100,
    damage: 10,
    imageUrl: 'pictures/skeleton.png',
    lifestyle: .1
    /**10% lifestyle from opponents current health at start of the vampire's turn. */
}


// parameters of the items
const boots = {
    name: 'boots',
    imageUrl: 'pictures/boots.png',
    dodge: .3
    // 30% chance to dodge an attack
};

const staff = {
    name: 'staff',
    imageUrl: 'pictures/staff.png',
    healing: .2
    // 20% increase in healing
}

const sword = {
    name: 'sword',
    imageUrl: 'pictures/sword.png',
    damage: .3
    // 30% more damage
}

const bow = {
    name: 'bow',
    imageUrl: 'pictures/bow.png',
    doubleAttack: .3
    // 30% chance to attack twice
}
