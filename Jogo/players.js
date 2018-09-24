class Veiculo {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;

        this.movimentoX = 0;
        this.movimentoY = 0;

        this.id = id;

        this.tipo = 'carro';

        this.visivel = true;
    }
}

function carregarJogadores() {
    players = [
        new Veiculo(200, altura - 150, 0),
        new Veiculo(300, altura - 150, 1),
        new Veiculo(400, altura - 150, 2),
        new Veiculo(500, altura - 150, 3)
    ];

    for (i = 0; i < players.length; i++) {
        inserir(players[i]);
    }
}

function atualizarJogadores() {
    for (i = 0; i < players.length; i++) {
        var movimentacaoDireita = (players[i].tipo == 'carro');
        var movimentacaoEsquerda = (players[i].tipo == 'carro');
        var movimentacaoCima = (players[i].tipo == 'carro');
        var movimentacaoBaixo = (players[i].tipo == 'carro');

        if (players[i].visivel) {
            inserir(players[i]);


            for (var j = 0; j < players.length; j++) {
                if (players[i] != players[j] && players[j].visivel) {

                    var estaEmbaixo = (players[i].y + (players[i].movimentoY) > players[j].y + 70);
                    var estaEmcima = (players[i].y + (players[i].movimentoY) + 70 < players[j].y);

                    var estaDireita = (players[i].x + (players[i].movimentoX) > players[j].x + 35);
                    var estaEsquerda = (players[i].x + (players[i].movimentoX) + 35 < players[j].x);


                    if ((players[i].movimentoX > 0 && players[i].x < players[j].x && players[i].x + 35 > players[j].x)) {
                        if (!(estaEmbaixo || estaEmcima) && movimentacaoDireita)
                            movimentacaoDireita = false;
                    }

                    if ((players[i].movimentoX < 0 && players[i].x > players[j].x && players[i].x - 35 < players[j].x)) {
                        if (!(estaEmbaixo || estaEmcima) && movimentacaoEsquerda)
                            movimentacaoEsquerda = false;
                    }


                    if (players[i].movimentoY > 0 && players[i].y < players[j].y && players[i].y + 70 > players[j].y) {
                        if (!(estaDireita || estaEsquerda) && movimentacaoBaixo)
                            movimentacaoBaixo = false;
                    }

                    if (players[i].movimentoY < 0 && players[i].y > players[j].y && players[i].y - 70 < players[j].y) {
                        if (!(estaDireita || estaEsquerda) && movimentacaoCima)
                            movimentacaoCima = false;
                    }

                }
            }



            if ((movimentacaoDireita && players[i].movimentoX > 0) || (movimentacaoEsquerda && players[i].movimentoX < 0)) {
                if (players[i].x + players[i].movimentoX > 0 && players[i].x + players[i].movimentoX + 50 < largura) {
                    players[i].x += players[i].movimentoX;
                }
                else if (players[i].x + players[i].movimentoX <= 0) {
                    players[i].x = 0;
                }
                else {
                    players[i].x = largura - 50;
                }
            }

            if ((movimentacaoBaixo && players[i].movimentoY > 0) || (movimentacaoCima && players[i].movimentoY < 0)) {
                if (players[i].y + players[i].movimentoY > 0 && players[i].y + players[i].movimentoY + 70 < altura) {
                    players[i].y += players[i].movimentoY;
                }
                else if (players[i].y + players[i].movimentoY <= 0) {
                    players[i].y = 0;
                }
                else {
                    players[i].y = altura - 70;
                }
            }
        }
    }

}

function explode(player) {
    player.tipo = 'explosao';
    setTimeout(function () {
        player.visivel = false;

    }, 1000);

    


}

