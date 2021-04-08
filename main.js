

const player1 = {
    name: 'Scorpion',
    hp: 300,
    img: 'scorpion.img',
    weapon: ['gun', 'knife'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    }
};

const player2 = {
    name: 'subzero',
    hp: 200,
    img: 'subzero.img',
    weapon: ['gun', 'knife', 'nunchucks'],
    attack: function() {
        console.log(`${player1.name} fight...`);
    }
};

function createPlayer() {
    const $arenas = document.querySelector('.arenas');
    const $player1 = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');

    $player1.classList.add('player1');
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $name.classList.add('name');
    $img.src = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif';
    $life.style.width = '100%';
    $name.innerText = 'Scorpion';

    $arenas.appendChild($player1);
    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);
};
createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);