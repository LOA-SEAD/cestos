define(['jquery', './dialogo', '../modelos/modelo'], function ($, Dialogo, Modelo) {
	
	var FRAMES_POR_SEGUNDO = 60,
	VELOCIDADE_MAXIMA_GIRO_VENTOINHA = 20,
	DESACELERACAO_VENTOINHA = 0.97,
	cronometro,
	animacaoBaloes,
	angulo = 0,
	nivelAtual,
	botaoEsquerdoClicado = false,
	desacelerandoVentoinha = false,
	velocidadeVentoinha = 0,
	TAMANHO_DO_CORDAO = 13,
	mouse;

	
	function atualizarJogo() {
		var baloes = Modelo.obterBaloes();
		
		for(var i = 0; i < baloes.length; i++)
		{
			var divDoBalao = $('#'+baloes[i].obterId());
			if(divDoBalao.length == 0)
				divDoBalao = criarBalao(baloes[i]);				
			
			atualizarBalao(divDoBalao, baloes[i]);
		}
	};	
	
	function criarBalao(_balao) {
		return $('<div>')
		.attr('id', _balao.obterId())
		.addClass('balao')
		.html(_balao.palavra.Valor())
		.css({ 'width': _balao.obterLargura(), 'height': _balao.obterAltura() + TAMANHO_DO_CORDAO })
		.appendTo($('#areaJogo'));
	}
	
	function desenharCestos() {
	
		var cestos = Modelo.obterCestos();
		
		for(var i = 0; i < cestos.length; i++)
		{
			$('<div>')
			.addClass('cesto')
			.html(cestos[i])
			.css({ 'width': cestos[i].obterLargura(), 'height': cestos[i].obterAltura(), 'top': cestos[i].obterY(), 'left': cestos[i].obterX() })
			.appendTo('#jogo.camada');
			//console.log(cestos[i]);
		}		
	}
	
	function atualizarBalao(_div, _objeto) {
		var pos = _objeto.obterPosicao();		
		_div.css({ 'top': pos[1], 'left': pos[0] });
	}
	
	function atualizar() {
	
		switch(Modelo.obterEstadoDeJogo())
		{
			case 'jogando':	
				Modelo.atualizar();
				atualizarJogo();			
				break;
			case 'derrota':
				pararJogo();
				$('#fimDeFaseDerrota.popup').fadeIn();
				break;
			case 'vitoria':
				pararJogo();
				$('#fimDeFaseVitoria.popup').fadeIn();
				break;
			case 'pausado':
				Publico.pararJogo();
				break;
			case 'dialogo':
				break;
		}
		
		rodarVentoinha();
	}
	
	function selecionarNivel(nivel) {
		$('#selecionarNivel.camada').fadeOut();
		$('#dialogo.camada').fadeIn();
		nivelAtual = nivel;
		Dialogo.iniciarDialogo(nivel);			
	}
	
	//{ Dialogo
			
	//}
	
	
	//{ Controle do mouse
	function rodarVentoinha() {
		if(Modelo.obterCursor() == "ventilador")
		{
			velocidadeVentoinha *= DESACELERACAO_VENTOINHA;
			if(velocidadeVentoinha<1*DESACELERACAO_VENTOINHA)
			{
				velocidadeVentoinha = 0;
			}
			if(botaoEsquerdoClicado)
			{
				if(velocidadeVentoinha < VELOCIDADE_MAXIMA_GIRO_VENTOINHA)
				{
					velocidadeVentoinha++;
				}else
				{
					velocidadeVentoinha = VELOCIDADE_MAXIMA_GIRO_VENTOINHA;
				}			
			}
			
			angulo += velocidadeVentoinha;
			$(mouse).css({ 
				'transform': 'rotate('+angulo+'deg)',
				'-ms-transform': 'rotate('+angulo+'deg)',
				'-webkit-transform': 'rotate('+angulo+'deg)',
				'-o-transform': 'rotate('+angulo+'deg)',
				'-moz-transform': 'rotate('+angulo+'deg)',			
			});
		}
	}
	
	function resetarAngloDoMouse() {
	
		$(mouse).css({ 
			'transform': 'rotate(0deg)',
			'-ms-transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)',
			'-o-transform': 'rotate(0deg)',
			'-moz-transform': 'rotate(0deg)',			
		});
	}
	
	function voltarAnguloCorreto() {
		angulo %= 360;
	
		$(mouse).css({ 
			'transform': 'rotate('+angulo+'deg)',
			'-ms-transform': 'rotate('+angulo+'deg)',
			'-webkit-transform': 'rotate('+angulo+'deg)',
			'-o-transform': 'rotate('+angulo+'deg)',
			'-moz-transform': 'rotate('+angulo+'deg)',			
		});
	}
	//}
	
	var Publico = {
		
		iniciarJogo: function () {
		//Função chamada assim que uma fase for selecionada no menu de fases
		//Essa função inicia tudo que é preciso e inicia a lógica do jogo
		$('.popup').hide();
		$('.balao').remove();
		$('.cesto').remove();
		Modelo.iniciarJogo(nivelAtual);
		cronometro = setInterval(atualizar, 1000/FRAMES_POR_SEGUNDO);
		//animacaoBaloes = setInterval(animarBaloes, 1000/1);
		desenharCestos();
		Publico.ativarMouse();
	},
		
		pararJogo: function () {
			//Função que vai parar o "clock" do jogo
			clearInterval(cronometro);
			//clearInterval(animacaoBaloes);
			Publico.desativarMouse();
		},
		
		continuarJogo: function() {
			//Função que vai voltar o "clock" do jogo
			cronometro = setInterval(atualizar, 1000/FRAMES_POR_SEGUNDO);
			//animacaoBaloes = setInterval(animarBaloes, 1000/1);
		},
		
		sairJogo: function() {
			//Função que sai do jogo
			clearInterval(cronometro);
			Modelo.sairJogo();
		},
		
		colocarNiveisParaSelecao: function() {
			$('.nivel').remove();
			
			//var nivelAtual = Modelo.obterNivel();
			var nivelAtual = 4;
			
			for(var i = 0; i < Modelo.obterNumeroDeFases(); i++)
			{
				var div = $('<div>')
				.html(i)
				.addClass('nivel')
				.appendTo($('#areaDosNiveis'));
				
				if(i < nivelAtual)
					div.click(function(){
						selecionarNivel(1);
					});			
				else
					div.addClass('nivelBloqueado');
				
				
			}		
		},
		
		ativarMouse: function() {
		
			mouse = $('<div>').attr('id', 'mouse').appendTo($('#areaJogo'));
		
			$('div').css('cursor', 'none')
		
			$('body').mousedown(function(event) {
				
				if(event.which == 3)
				{
					Modelo.trocarCursor();
					if(Modelo.obterCursor() == 'dardo')
					{
						resetarAngloDoMouse();
						velocidadeVentoinha = 0;
						mouse.css('background-position', '-80px 0px');
					}
					else
					{
						voltarAnguloCorreto();
						mouse.css('background-position', '0px 0px');
					}
				}
					
				if(event.which == 1) {
					if(Modelo.obterCursor() == 'ventilador')
					{
						botaoEsquerdoClicado = true;
						Modelo.definirEstadoDoMouse(true);
					}
				}
			});
			
			$('#palco').mousemove(function(e) {
				
				var relativeXPosition = (e.pageX - this.offsetLeft); 
				var relativeYPosition = (e.pageY - this.offsetTop);
		
				
				mouse.css({ 'top': relativeYPosition, 'left': relativeXPosition })
				
				Modelo.definirPosicaoDoMouse([relativeXPosition, relativeYPosition]);				
			});
			
			$('html').mouseup(function(event) {		
				if(event.which == 1) {
						Modelo.definirEstadoDoMouse(false);
						botaoEsquerdoClicado = false;
					
				}
			});		
		},
		
		desativarMouse: function () {
			
			$('#mouse').remove();		

			$('div').css('cursor', 'default');			
		
			$('body').unbind('mousemove');
			$('body').unbind('mousedown');
			$('body').unbind('mouseup');
		},
		
		obterNivel: function() {
			return Modelo.obterNivel();
		},
	};

	return Publico;
});