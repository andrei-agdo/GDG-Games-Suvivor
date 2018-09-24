function main() {
    canvas.width = altura;
    canvas.height = largura;
    canvas.style.border = "1px solid #000";

    carregarElementos();

    pegarMovimentos();

    jogoRodando = true;

    document.getElementById('iniciar').style['display'] = 'none';

    playersDisponiveis = 4;
    loop();

    document.getElementById('musica').play();


}



function inserir(elemento) {
    ctx.fillStyle = elemento.cor;
    ctx.fillRect(elemento.x, elemento.y, elemento.largura, elemento.altura);
    if (elemento.tipo == 'carro') {
        if (elemento.visivel) {
            var img = document.getElementById("carro" + elemento.id);
            ctx.drawImage(img, elemento.x, elemento.y);
        }
    }
    if (elemento.tipo == 'muro') {
        var img = document.getElementById("muro");
        ctx.drawImage(img, elemento.x, elemento.y);
    }
    if (elemento.tipo == 'explosao') {
        var img = document.getElementById("explosao");
        ctx.drawImage(img, elemento.x, elemento.y);
    }
}


var movimentosDisponiveis = false;

function loop() {
    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    atualizarMuros();

    if (movimentosDisponiveis) {
        movimentosDisponiveis = false;
        pegarMovimentos();
    }

    atualizarJogadores();

    if (jogoRodando)
        window.requestAnimationFrame(loop);
    else
        setTimeout(() => {
            main();
        }, 1000);

}

function pegarMovimentos() {


    fetch('http://127.0.0.1:8085', { method: 'post', mode: 'cors' })
        .then(res => {
            res.json().then((resposta) => {

                for (i = 0; i < players.length; i++) {
                    players[i].movimentoX = (resposta[i].x/10) * velocidade;
                    players[i].movimentoY = (resposta[i].y/10) * velocidade;
                }
                movimentosDisponiveis = true;
                Promise.resolve();
            }).catch(err => {
                console.error("->>>" + err);

                movimentosDisponiveis = true;
            })
        })
}

function carregarElementos() {
    inserir(fundo);

    carregarJogadores();


    carregarMuros();


}

function atualizarElementos() {

    atualizarMuros();

}
