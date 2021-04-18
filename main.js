
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $form = document.querySelector('.control');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    },
    changeHP,
    elHP,
    renderHP
};

const player2 = {
    player: 2,
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'knife', 'nunchucks'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    },
    changeHP,
    elHP,
    renderHP
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

function createElement(tag, className) {
    $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(options) {
    const $player = createElement('div', 'player'+options.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    
    $img.src = options.img;
    $life.style.width = '100%';
    $name.innerText = options.name;

    $character.appendChild($img);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
};

function randomDamage(num) {
    const damage = Math.ceil(Math.random() * num);
    
    return damage;
}

function changeHP(damage) {
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    this.hp -= damage;
    this.renderHP();
    if(this.hp <= 0) {
        this.hp = 0;
        $playerLife.innerText = this.hp;
    }

}

function elHP() {
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    return $playerLife;
}

function renderHP() {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
    $playerLife.innerText = this.hp;
    $playerLife.style.textAlign = 'right';

}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');

    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button-restart');

    $reloadButton.innerText = 'Restart';

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);

    const $restartButton = document.querySelector('.button-restart');

    $restartButton.addEventListener('click', function() {
        window.location.reload();
    })
}

function result() {
    if(player1.hp === 0 || player2.hp === 0 ) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWins());
    }
};


function enemyAttack() {
    const hit = ATTACK[randomDamage(3)-1];
    const defence = ATTACK[randomDamage(3)-1];

    return {
        value: randomDamage(HIT[hit]),
        hit,
        defence

    }
}

$form.addEventListener('submit', function(event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for(let item of $form) {
        if(item.checked && item.name === 'hit') {
            attack.value = randomDamage(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence =  item.value;
        }
        item.checked = false;
    }
    
    if(attack.hit !== enemy.defence) {
        player1.changeHP(attack.value);
        result();
    }

    if(enemy.hit !== attack.defence) {
        player2.changeHP(enemy.value);
        result();
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));