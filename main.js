import {player1, player2, $form, $arenas} from './constansts.js';
import {createPlayer, generateLogs, enemyAttack, palyerAttack, result} from './utils.js';


window.onload = function() {
    generateLogs('start', player1, player2);
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