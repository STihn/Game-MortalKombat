import {logs, player1, player2, HIT, ATTACK, days, months, $chat, $form, $randomButton, $arenas} from './constansts.js';


export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if(className) {
        $tag.classList.add(className);
    }

    return $tag;
}

export const  createPlayer = (options) => {
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

export const random = (num) => {
    const damage = Math.floor(Math.random() * num);
    
    return damage;
}

export const renderHP = () => {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
    $playerLife.innerText = this.hp;
    $playerLife.style.textAlign = 'right';

}

export const changeHP = (damage) => {
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    this.hp -= damage;
    this.renderHP();
    if(this.hp <= 0) {
        this.hp = 0;
        $playerLife.innerText = this.hp;
    }
}

export const elHP = () => {
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    return $playerLife;
}

export const playerWins =  (name) => {
    const $loseTitle = createElement('div', 'loseTitle');

    if(name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
}

export const createReloadButton = () => {
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

export const result = () => {
    if(player1.hp === 0 || player2.hp === 0 ) {
        $randomButton.disabled = true;
        createReloadButton();
    }

    if(player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1)
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2)
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw');
    }
};


export const  enemyAttack = () => {
    const hit = ATTACK[random(ATTACK.length)];
    const defence = ATTACK[random(ATTACK.length)];

    return {
        value: random(HIT[hit]),
        hit,
        defence

    }
}

export const palyerAttack = () => {
    const attack = {};

    for(let item of $form) {
        if(item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence =  item.value;
        }
        item.checked = false;
    }

    return attack;
}

export const showDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth() + 1];
    const dayWeek = days[date.getDay()]
    const year = date.getFullYear();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return `${dayWeek} ${day} ${month} ${year} ${time}`;
}

export const generateLogs = (type, player1, player2, value = 0) => {
    const {name: namePlayer1} = player1;
    const {name: namePlayer2} = player2;
    let text;
    let element;
    switch(type) {
        case 'start':
            text = logs[type].replace('[time]',showDate()).replace('[player1]', namePlayer1).replace('[player2]', namePlayer2);
            element = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'hit' :
            text = logs[type][random(logs[type].length)].replace('[playerKick]', namePlayer1).replace('[playerDefence]', namePlayer2);
            element = `<p>${showDate()}, ${text} -${value}hp, ${namePlayer2}/100hp</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'defence':
            text = logs[type][random(logs[type].length)].replace('[playerKick]', namePlayer1).replace('[playerDefence]', namePlayer2);
            element = `<p>${showDate()}, ${text} -${value}hp, ${namePlayer2}/100hp</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'end' :
            text = logs[type][random(logs[type].length)].replace('[playerWins]', namePlayer1).replace('[playerLose]', namePlayer2);
            element = `<p>${showDate()}, ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'draw' :
            element = `<p>${logs.draw}</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
        default :
            undefined
    }
}