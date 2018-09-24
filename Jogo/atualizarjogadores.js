function atualizarJogadoresBKP
{
    function atualizarJogadores()
    {
        for(i=0; i<players.length;i++)
        {
            var movimentacaoDireita=true;
            var movimentacaoEsquerda=true;
            var movimentacaoCima=true;
            var movimentacaoBaixo=true;

            inserir(players[i]);


            for(var j=0;j<players.length;j++)
            {
                if(players[i]!=players[j])
                {

                    var estaEmbaixo = (players[i].y + (players[i].movimentoY) > players[j].y + 50);
                    var estaEmcima = (players[i].y + (players[i].movimentoY) + 50 < players[j].y);

                    var estaDireita = (players[i].x + (players[i].movimentoX) > players[j].x + 50);
                    var estaEsquerda = (players[i].x + (players[i].movimentoX) + 50 < players[j].x);


                    if((players[i].movimentoX > 0 && players[i].x < players[j].x && players[i].x+50 > players[j].x))
                    {
                        if(!(estaEmbaixo || estaEmcima) && movimentacaoDireita)
                            movimentacaoDireita = false;
                    }

                    if((players[i].movimentoX < 0 && players[i].x > players[j].x && players[i].x-50 < players[j].x))
                    {
                        if(!(estaEmbaixo || estaEmcima) && movimentacaoEsquerda)
                            movimentacaoEsquerda = false;
                    }


                    if(players[i].movimentoY > 0 && players[i].y < players[j].y && players[i].y+50 > players[j].y)
                    {
                        if(!(estaDireita || estaEsquerda) && movimentacaoBaixo)
                            movimentacaoBaixo = false;
                    }

                    if(players[i].movimentoY < 0 && players[i].y > players[j].y && players[i].y-50 < players[j].y)
                    {
                        if(!(estaDireita || estaEsquerda) && movimentacaoCima)
                            movimentacaoCima = false;
                    }



                }
            }



            if((movimentacaoDireita && players[i].movimentoX > 0) || (movimentacaoEsquerda && players[i].movimentoX < 0))
            {
                if(players[i].x+players[i].movimentoX > 0 && players[i].x+players[i].movimentoX+50 < largura)
                {
                    players[i].x +=	 players[i].movimentoX;
                }
                else if(players[i].x+players[i].movimentoX <= 0)
                {
                    players[i].x = 0;
                }
                else
                {
                    players[i].x = largura-50;
                }
            }

            if((movimentacaoBaixo && players[i].movimentoY > 0) || (movimentacaoCima && players[i].movimentoY < 0))
            {
                if(players[i].y+players[i].movimentoY > 0 && players[i].y+players[i].movimentoY+50 < altura)
                {
                    players[i].y +=	 players[i].movimentoY;
                }
                else if(players[i].y+players[i].movimentoY <= 0)
                {
                    players[i].y = 0;
                }
                else
                {
                    players[i].y = altura-50;
                }
            }
        }
    }
}
