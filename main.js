
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $form = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

const days = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

window.onload = function() {
    generateLogs('start', player1, player2);
}

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

function random(num) {
    const damage = Math.ceil(Math.random() * num);
    
    return damage;
}

function renderHP() {
    const $playerLife = this.elHP();
    $playerLife.style.width = this.hp + '%';
    $playerLife.innerText = this.hp;
    $playerLife.style.textAlign = 'right';

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
        generateLogs('end', player2, player1)
    } else if(player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2)
    } else if (player2.hp === 0 && player1.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs()
    }
};


function enemyAttack() {
    const hit = ATTACK[random(3)-1];
    const defence = ATTACK[random(3)-1];

    return {
        value: random(HIT[hit]),
        hit,
        defence

    }
}

function palyerAttack() {
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

function showDate() {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth() + 1];
    const dayWeek = days[date.getDay()]
    const year = date.getFullYear();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return `${dayWeek} ${day} ${month} ${year} ${time}`;
}

function generateLogs(type, player1, player2, value = 0) {
    let text;
    let element;
    switch(type) {
        case 'start':
            text = logs[type].replace('[time]',showDate()).replace('[player1]', player1.name).replace('[player2]', player2.name);
            element = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'hit' :
            text = logs[type][random(17)-1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            element = `<p>${showDate()}, ${text} -${value}hp, ${player2.hp}/100hp</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'defence':
            text = logs[type][random(7)-1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            element = `<p>${showDate()}, ${text} -${value}hp, ${player2.hp}/100hp</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        case 'end' :
            text = logs[type][random(3)-1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            element = `<p>${showDate()}, ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', element);
            break;
        default :
        element = `<p>${logs.draw}</p>`;
        $chat.insertAdjacentHTML('afterbegin', element);
    }

}

$form.addEventListener('submit', function(event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = palyerAttack();

    if(player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        generateLogs('hit', player1, player2, player.value);
    }

    if(enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        generateLogs('hit', player2, player1, player.value);
    }

    if(enemy.hit === player.defence) {
        generateLogs('defence', player2, player1);
    }

    if(player.hit === enemy.defence) {
        generateLogs('defence', player1, player2);
    }
    result()
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));