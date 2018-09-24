var muroModelo = function (x, y) {
	this.x = x;
	this.y = -y;
	this.tipo = 'muro';
}

function carregarMuros() {

	muros =
		[
			new muroModelo(0, 0),
			new muroModelo(150, 300),
			new muroModelo(300, 600),
			new muroModelo(450, 950),
			new muroModelo(600, 1200)
		]

	for (var i = 0; i < muros.length; i++) {
		inserir(muros[i]);
	}
}

function atualizarMuros() {

	for (var i = 0; i < muros.length; i++) {
		muros[i].y = muros[i].y + Math.abs(velocidade * 8);

		if (muros[i].y > altura) {
			muros[i].x = parseInt(Math.random() * 800);

			muros[i].y = -100;
		}


		for (var j = 0; j < players.length; j++) {

			if (players[j].tipo == 'carro') {
				var estaY = (muros[i].y > players[j].y) && (muros[i].y < players[j].y + 70);

				var estaX = (muros[i].x < players[j].x + 40) && (muros[i].x + 100 > players[j].x);

				if (estaY && estaX) {

					explode(players[j]);
					playersDisponiveis--;
					if (playersDisponiveis == 1)
						jogoRodando = false;

				}
			}
		}

		inserir(muros[i]);
	}

}