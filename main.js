
    const $arenas = document.querySelector('.arenas');
    const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
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
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

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

function randomDamage() {
    const damage = Math.ceil(Math.random() * 20);
    
    return damage;
}

function changeHP() {
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    this.hp -= randomDamage();
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
    
    return $reloadWrap;
}

$randomButton.addEventListener('click', function() {
    player1.changeHP();
    player2.changeHP();

    if(player1.hp === 0 || player2.hp === 0 ) {
        $randomButton.disabled = true;
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        renderReloadButton();
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        renderReloadButton();
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWins());
        renderReloadButton();
    }
});

function renderReloadButton() {
    $arenas.appendChild(createReloadButton());
    const $restartButton = document.querySelector('.button-restart');
    $restartButton.addEventListener('click', function() {
        window.location.reload();
    })
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));