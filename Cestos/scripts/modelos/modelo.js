/*
Log

08/10/2012 - 19:11 - Marcelo L.L.
10/10/2012 - 18:27 - MuriloDAG
15/10/2012 - 18:27 - MuriloDAG
16/10/2012 - 20:54 - M.L.L

*/
define(['./mecanica', './bancoDeFases'], function (Mecanica, Fases) {
	
	//{Privado
	//Declaração do prototipo de um balão
	function Balao (_id, _x,_y, _largura, _altura, _palavra){
		var id = _id;
		var x = _x;
		var y =_y;
		var bateu = false;
		this.vx = 0;
		this.vy = 0;
		var largura = _largura;
		var altura = _altura;
		this.palavra = _palavra;
		
		var velocidadeMaximaBalao = VELOCIDADE_BALAO_MAXIMA;
		
		this.obterId = function ()
		{
			return id;
		}
		this.obterX = function()
		{
			return x;
		}
		this.obterY = function ()
		{
			return y;
		}
		this.obterVx = function()
		{
			return this.vx;
		}
		this.obterVy = function ()
		{
			return this.vy;
		}
		this.obterLargura = function ()
		{
			return largura;
		}
		this.obterAltura = function ()
		{
			return altura;
		}
		this.obterPosicao = function ()
		{
			return [x,y];
		}
		this.definirX = function(_x)
		{
			x = _x;			
		}
		this.definirY = function(_y)
		{
			y = _y;			
		}
		this.definirPosicao = function(_x,_y)
		{
			x = _x;
			y = _y;
		}
		this.obterVelocidade = function()
		{
			return [this.vx,this.vy];
		}
		this.definirVelocidade = function (_vx,_vy)
		{
			this.vx = _vx;
			this.vy = _vy;
		}
		
		this.obterBateu = function() {
			return bateu;
		}
		
		this.ajustarBateu = function(_bateu) {
			bateu = _bateu;
		}
		
		this.mover = function ()
		{
			x += this.vx;
			y += this.vy;
			this.vx *= FATOR_DESACELERACAO;
		}
		this.raio = function ()
		{
			return largura;
		}
		this.aplicarGravidade = function()
		{
			if(this.vy+GRAVIDADE < velocidadeMaximaBalao)
			{
				this.vy+=GRAVIDADE;
			}else
			{
				this.vy = velocidadeMaximaBalao;
			}
		}
		this.limitarVelocidades = function()
		{
			if(this.vy > velocidadeMaximaBalao)
				this.vy = velocidadeMaximaBalao;
			if(this.vy < -velocidadeMaximaBalao)
				this.vy = -velocidadeMaximaBalao;
			if(this.vx > velocidadeMaximaBalao)
				this.vx = velocidadeMaximaBalao;
			if(this.vx < -velocidadeMaximaBalao)
				this.vx = -velocidadeMaximaBalao;
			
		}
	}
	
	//Declaração do prototipo de um cesto
	function Cesto (_id, _x, _y, _largura, _altura, _grupo){
		var id = _id;
		var x = _x;
		var y =_y;		
		var largura = _largura;
		var altura = _altura;
		this.grupo = _grupo;
		
		this.obterId = function ()
		{
			return id;
		}
		this.obterX = function()
		{
			return x;
		}
		this.obterY = function ()
		{
			return y;
		}		
		this.obterLargura = function ()
		{
			return largura;
		}
		this.obterAltura = function ()
		{
			return altura;
		}
		this.obterPosicao = function ()
		{
			return [x,y];
		}
		this.definirPosicao = function(_x,_y)
		{
			x = _x;
			y = _y;
		}		
	}

	//{ Declaração das variaveis 	
	var LARGURA_BALAO = 132,
	ALTURA_BALAO = 157,
	PROPORCAO_BALAO = ALTURA_BALAO/LARGURA_BALAO,
	LARGURA_TELA = 800,
	ALTURA_TELA = 600,
	LARGURA_CESTO = 220, 
	ALTURA_CESTO = 112,
	GRAVIDADE = 0.01,
	VELOCIDADE_BALAO_MAXIMA = 4,
	FATOR_DESACELERACAO = 0.99,
	contadorDeNovoBalao = 0,
	//Guarda o nivel atual, os dialogos e as palavras sorteadas	
	nivelAtual,
	faseAtual,
	//Devemos guardas as velocidades, as posicoes e a palavra de cada balao
	baloes,
	vidas,
	cestos,
	espinhos,
	cronometro,
	palavras,
	estadoDoCursor = "ventilador",
	chanceNovoBalao,
	chance,
	idBaloes,
	estadoDeJogo = "parado",
	estadoDoMouse = false,
	posicaoDoMouse,
	massaDoCampoDoMouse = 1200;
	//}
	
	//Função que deve iniciar todas as váriaveis para que seja iniciada uma nova fase
	function novaFase()	{		
		var i,j;
		var palavrasAuxiliar = faseAtual.obterPalavras();
		var numeroDePalavras = faseAtual.obterNumeroDePalavras();
		
		vidas = 3;
		
		palavras = new Array();
		idBaloes = 0;
		for (i=0;i<numeroDePalavras;i++)
		{
			palavras.push(palavrasAuxiliar[i]);
		}
		
		var gruposAuxiliar = faseAtual.obterGrupos();
		var numeroDeGrupos = gruposAuxiliar.length;
		
		cestos = new Array();
		
		for(i=0;i<numeroDeGrupos;i++)
		{
			cestos.push(new Cesto(i, 225*i+50, 461, LARGURA_CESTO, ALTURA_CESTO, i));
		}
		
		baloes = new Array();			
		
		chance = faseAtual.obterTempoEntreBaloes();
	}
	
	//Função que checa se a fase já terminou 
	function checarFimDeJogo()	{
		if(baloes.length <=0 && palavras.length <=0)
		{
			estadoDeJogo = "vitoria";
		}
	}
	
	//Função que sortea nova palavra
	function sortearNovaPalavra(){
		//AQUI ESTAVA O ERRO, CUIDADO COM A FUNCAO SPLICE
		//var palavra = palavras.splice(Math.floor(Math.random()*palavras.length),1);
		
		var sorteio = Math.floor(Math.random()*palavras.length);
		var palavra = palavras[sorteio];
		palavras.splice(sorteio, 1);
		
		return palavra;
	}
	
	//Função que cria novo balao e o coloca no vetor de baloes
	function criarNovoBalao(palavra){
		var i;
		var posicaoNovoBalaoValida = false;
		var posicaoNovoBalao;
		posicaoNovoBalao = [Math.floor(Math.random()*LARGURA_TELA), -(Math.random()*80)-20];
		var novoBalao = new Balao(idBaloes,posicaoNovoBalao[0], posicaoNovoBalao[1], LARGURA_BALAO, ALTURA_BALAO, palavra);
		novoBalao.definirPosicao(posicaoNovoBalao[0], posicaoNovoBalao[1]);
		
		for(i=0;i<baloes.length;i++)
		{
			if(colisaoBalaoBalao(novoBalao, baloes[i]))
			{
				posicaoNovoBalaoValida = false;
				break;
			}			
		}
		while(!posicaoNovoBalaoValida)
		{
			posicaoNovoBalaoValida = true;
			posicaoNovoBalao = [Math.floor(Math.random()*LARGURA_TELA), -200];//-200];
			novoBalao.definirPosicao(posicaoNovoBalao[0], posicaoNovoBalao[1]);
			for(i=0;i<baloes.length;i++)
			{
				if(colisaoBalaoBalao(novoBalao, baloes[i]))
				{
					posicaoNovoBalaoValida = false;
					break;
				}			
			}		
		}
		
		
		baloes.push(novoBalao);
		idBaloes++;
	}
	
	//Teste de colisao entre um balao e um espinho
	function colisaoBalaoEspinho(){}
	
	//teste de colisao entre um balao e o clique do mouse no formato do dardo
	function colisaoBalaoDardo(balao){
		if(distancia([posicaoDoMouse[0], posicaoDoMouse[1]/2], [balao.obterX()+balao.obterLargura()/2, (balao.obterY()+balao.obterAltura())/2])<balao.raio())
		{
			console.log("clicou no balao");
		}
	}
	
	//teste de colisao entre um balao e um cesto 
	function colisaoBalaoCesto(balao, cesto){
		return ((balao.obterY()+balao.obterAltura() >= cesto.obterY()) && (balao.obterY() <= cesto.obterY()+cesto.obterAltura()) && (balao.obterX()+balao.obterLargura() >= cesto.obterX()) && (balao.obterX() <= cesto.obterX()+cesto.obterLargura()));          
	}
	
	//teste de colisao entre um balao e outro balao
	function colisaoBalaoBalao2(balao1,balao2){
		return distancia([balao1.obterX()+balao1.obterLargura()/2, (balao1.obterY()+balao1.obterAltura())/(PROPORCAO_BALAO)], [balao2.obterX()+balao2.obterLargura()/2, (balao2.obterY()+balao2.obterAltura())/(PROPORCAO_BALAO)])<balao1.raio();
	}
	
	function colisaoBalaoBalao(balao1,balao2){
	
		var distanciaEntreOsBaloes = distancia([balao1.vx+balao1.obterX()+balao1.obterLargura()/2, (balao1.vy+balao1.obterY()+balao1.obterAltura())/(PROPORCAO_BALAO)], [balao2.obterX()+balao2.obterLargura()/2, (balao2.obterY()+balao2.obterAltura())/(PROPORCAO_BALAO)]);
		
		var distanciaMinimaParaNaoBater = balao1.raio()/2 + balao2.raio()/2;
	
		return distanciaEntreOsBaloes < distanciaMinimaParaNaoBater;
	}
	
	//consequencia da colisão de dois balões
	function tratarColisaoBaloBalo(balao1, balao2)	{

		/*var dx = balao1.obterX() - balao2.obterX();
		var dy = balao1.obterY() - balao2.obterY();
		var ang = Math.atan2(dy, dx);
		
		var vx = Math.cos(ang)*((balao1.vx + balao2.vx)/2);
		
		var vy = -Math.sin(ang)*((balao1.vy + balao2.vy)/2);
		
		balao1.vx = -vx;
		balao1.vy = -vy;
		
		balao2.vx = vx;
		balao2.vy = vy;

		//baloes[i].definirX(baloes[j].obterX()-baloes[j].obterLargura());
		//baloes[i].definirY(baloes[j].obterY()-baloes[j].obterAltura());*/
		var aux = {};
		
		aux.xv = balao1.vx;
		aux.vy = balao1.vy;
		
		balao1.vx = balao2.vx;
	    balao1.vy = balao2.vy;
	
		balao2.vx = aux.xv;
	    balao2.vy = aux.vy;	
	}
	
	//função que verifica se já está na hora de sortear um novo balao
	function controleDeSorteioDePalavras(){
		if(palavras.length>0)
			{
				if(contadorDeNovoBalao < chance)
				{
					contadorDeNovoBalao++;
				}
				else
				{
					var palavra = sortearNovaPalavra();
					criarNovoBalao(palavra);
					contadorDeNovoBalao = 0;
					//console.log("sorteado");				
				}
			}
	}
	
	//função que trata das interações feitas com o mouse
	function controleDoMouse()	{
		if(estadoDoMouse)
			{
				//console.log("clicou", estadoDoCursor, posicaoDoMouse);
				if(estadoDoCursor == "ventilador")
				{
					for(i=0;i<baloes.length;i++)
					{
						//console.log("chamado");
						var vetorX = baloes[i].obterX() + baloes[i].obterLargura()/2 - posicaoDoMouse[0];
						var vetorY = baloes[i].obterY() + baloes[i].obterAltura()/2 - posicaoDoMouse[1];
						//console.log("vetor", vetorX, vetorY);
						var forca = massaDoCampoDoMouse / Math.pow((vetorX*vetorX+massaDoCampoDoMouse/2+vetorY*vetorY+massaDoCampoDoMouse/2),1.5); 
						
						baloes[i].vx += vetorX * forca;
						baloes[i].vy += vetorY * forca;
						
						//console.log("vel", baloes[i].vx, baloes[i].vy);
					}
				}
				else if (estadoDoCursor == "dardo")
				{
					for(i=0;i<baloes.length;i++)
					{
						if(colisaoBalaoDardo(baloes[i]))
							break;
					}
				}
			}
	}
	//função que atualiza todos os baloes e checa suas colisoes
	function atualizacaoDosBaloes()	{
		var i,j, bateu;
		for(i=0;i<baloes.length;i++)
			{			
				baloes[i].ajustarBateu(false);
				baloes[i].aplicarGravidade();
				
				for(j=0;j<baloes.length;j++)
				{
					if(i != j)
						if(colisaoBalaoBalao(baloes[i], baloes[j]))
						{
							tratarColisaoBaloBalo(baloes[i], baloes[j]);
							baloes[i].ajustarBateu(true);
							baloes[j].ajustarBateu(true);
						}
				}

				if(!baloes[i].obterBateu())
					baloes[i].mover();
				
				for(j=0;j<cestos.length;j++)
				{			
					if(baloes[i].obterX() < 0)
					{
						baloes[i].definirX(1);
						baloes[i].vx *=-1;
					}else if(baloes[i].obterX() > LARGURA_TELA-baloes[i].obterLargura())
					{
						baloes[i].definirX(LARGURA_TELA-baloes[i].obterLargura()-1);
						baloes[i].vx *=-1;
					}
					if(colisaoBalaoCesto(baloes[i], cestos[j]))
					{
						if(baloes[i].palavra.Grupo() == cestos[j].grupo)
						{
							//console.log("bateu no cesto certo");
						}
						else
						{
							//console.log("nem bateu no cesto certo");
						}
					}					
				}
				if(baloes[i].obterY() > ALTURA_TELA)
				{
					//console.log("saiu da tela");
				}
			}
	}
	//Calculo da distancia entre dos pontos sendo pasados como vetores em R2
	function distancia(pos1, pos2){
		var dx = pos1[0] - pos2[0];
		var dy = pos1[1] - pos2[1];
		return Math.sqrt(dx*dx+dy*dy);
	}
	//}
	
	//{Publico
	
	//Variavel de retorno do modulo, como todas as funções públicas
	var Publico = {
		iniciarJogo: function(fase){
			//console.log("Iniciar Jogo", fase);
			nivelAtual = fase;
			faseAtual = Fases.obterFase(fase);
			novaFase();
			estadoDeJogo = 'jogando';
		},
		
		sairJogo: function (){
		
		},
		
		atualizar: function(){			
			var i, j;		
			controleDeSorteioDePalavras();
			controleDoMouse();
			atualizacaoDosBaloes();						
			checarFimDeJogo();
		},
		
		definirPosicaoDoMouse: function(pos){
			posicaoDoMouse = pos;
		},
		
		definirEstadoDoMouse: function(estado){
			estadoDoMouse = estado;
		},
	
		definirCursor: function (estado){
			estadoDoCursor = estado;
		},
		
		obterCursor: function (){
			return estadoDoCursor;
		},
		
		trocarCursor: function(){
			if(estadoDoCursor == "ventilador")
				estadoDoCursor = "dardo";
			else if(estadoDoCursor == "dardo")
				estadoDoCursor = "ventilador";
			else
				estadoDoCursor = "ventilador";				
		},
		
		obterBaloes: function (){
			return baloes;
		},
		
		obterCestos: function (){
			return cestos;
			//return faseAtual.obterGrupos();
		},
		
		obterEstadoDeJogo: function(){
			return estadoDeJogo;
		},
		
		obterFase: function(){
			return faseAtual;
		},
		
		obterDialogos: function (){
			return faseAtual.obterDialogos();
		},
		
		obterNomeDaFase:function (){
			return faseAtual.obterNome();
		},
		
		obterVidas:function(){
			return vidas;
		},
		//Precisamos implementar de verdade todas as fncoes daqui para baixo
		obterNivel: function(){
			//return Math.floor(Math.random()*10);
			return nivelAtual;
		},
		
		ajustarNivel: function(_nivel) {
			//nivelAtual = _nivel;
			
		},
		
		obterNumeroDeFases: function() {
			return Fases.obterNumeroDeFases();;
		},
	};

	
	//Retorna objeto com as funções publicas do modulo
	return Publico;
	//}

});