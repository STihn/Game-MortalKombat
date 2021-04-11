

const player1 = {
    name: 'Scorpion',
    hp: 300,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['gun', 'knife'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    }
};

const player2 = {
    name: 'subzero',
    hp: 200,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'knife', 'nunchucks'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    }
};

function createPlayer(name,options) {
    const $arenas = document.querySelector('.arenas');
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');

    $player.classList.add(name);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');
    $img.src = options.img;
    $life.style.width = '100%';
    $life.style.textAlign='center';
    $life.style.color='red';
    $name.innerText = options.name;
    $life.innerText = options.hp;

    $arenas.appendChild($player);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
};
createPlayer('player1', player1);
createPlayer('player2', player2);