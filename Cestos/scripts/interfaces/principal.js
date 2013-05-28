define(['jquery', 'text!../../templates/layout.html', '../../utils/audio', '../../utils/save', './jogo', './dialogo', './intro', ], 
function ($, Layout, Audio, Save, Jogo, Dialogo, Intro) {

	var imgs, 
	imgsCarregadas = 0,
	cronometroAnimacoes,
	nuvensFundo = new Object(),
	nuvensFrente = new Object(),
	banquinho = new Object();
	
	function criarLayout(){
		$('body').append(Layout);	
	}
	
	function pegarElementos() {
		nuvensFundo.canvas = $('#nuvensFundo')[0].getContext('2d');
		nuvensFundo.canvasWidth = $('#nuvensFundo').width();
		nuvensFundo.canvasHeigth = $('#nuvensFundo').height();

		$('#nuvensFundo')[0].width = $('#nuvensFundo').width();
		$('#nuvensFundo')[0].height = $('#nuvensFundo').height();

		nuvensFrente.canvas = $('#nuvensFrente')[0].getContext('2d');
		nuvensFrente.canvasWidth = $('#nuvensFrente').width();
		nuvensFrente.canvasHeigth = $('#nuvensFrente').height();

		$('#nuvensFrente')[0].width = $('#nuvensFrente').width();
		$('#nuvensFrente')[0].height = $('#nuvensFrente').height();

		banquinho.canvas = $('#banquinho')[0].getContext('2d');
		banquinho.canvasWidth = $('#banquinho').width();
		banquinho.canvasHeigth = $('#banquinho').height();

		$('#banquinho')[0].width = $('#banquinho').width();
		$('#banquinho')[0].height = $('#banquinho').height();

	}

	function configurarEventos(){
		configurarCamadaIntroducao();
		configurarCamadaMenu();
		configurarCamadaJogo();
		configurarCamadaDialogo();
		configurarBotoesVoltarCamadasSecundarias();
		configurarCamadaCarregarJogoSalvo();
		configurarSom();
	}	
	
	//{ Camada Introducao 
	function configurarCamadaIntroducao() {
		configurarIntroducaoBotaoTocar();
		configurarIntroducaoBotaoPular();
	}
	
	function configurarIntroducaoBotaoTocar(){
		$('#tocar.botaoIntroducao').click(function(){
			Intro.tocar();
		});
	}
	
	function configurarIntroducaoBotaoPular(){
		$('#pular.botaoIntroducao').click(function(){
			$('#introducao.camada').fadeOut();
			$('#menu.camada').fadeIn();
			ativarAnimacoes();
		});
	}
	//}
	
	//{ Camada Menu
	function configurarCamadaMenu() {
		configurarMenuBotaoJogar();
		configurarMenuBotaoInstrucoes();
		configurarMenuBotaoCreditos();
		configurarMenuBotaoCarregarJogoSalvo();
		iniciarAnimacoes();
	}
	
	function configurarMenuBotaoJogar(){
		$('#jogar.botaoMenu').click(function(){
			$('#menu.camada').fadeOut();
			pararAnimacoes();
			$('#selecionarNivel.camada').fadeIn();
			Jogo.colocarNiveisParaSelecao();
		});
	}
	
	function configurarMenuBotaoInstrucoes(){
		$('#instrucoes.botaoMenu').click(function(){
			$('#instrucoes.camada').fadeIn();
			pararAnimacoes();
		});
	}
	
	function configurarMenuBotaoCreditos(){
		$('#creditos.botaoMenu').click(function(){
			$('#menu.camada').fadeOut();
			pararAnimacoes();
			$('#creditos.camada').fadeIn();
		});
	}
	
	function configurarMenuBotaoCarregarJogoSalvo() {
		$('#carregarJogoSalvo.botaoMenu').click(function() {
			configurarSlots();
			$('#menu.camada').fadeOut();
			pararAnimacoes();
			$('#carregarJogoSalvo.camada').fadeIn();
		});
	}

	//{ Animacoes do Menu
	//Funcao que carrega imagens e prepara os objetos
	function iniciarAnimacoes() {
		imgs = new Array(4);
		
		for(var i = 0; i < 4; i++)
		{
			imgs[i] = new Image();

			imgs[i].onload = function () {
				imgsCarregadas++;
			}
		}

		imgs[0].src = 'Cestos/imgs/menu/animacoes/nuvensFrente.png';
		imgs[1].src = 'Cestos/imgs/menu/animacoes/nuvensFundo0.png';
		imgs[2].src = 'Cestos/imgs/menu/animacoes/nuvensFundo1.png';
		imgs[3].src = 'Cestos/imgs/menu/animacoes/banco.png';

		nuvensFrente.obj = {img: imgs[0], x1:0, x2:-1600, y:0, vx:4, width: 1600, height: 234};

		nuvensFundo.obj = new Array(2);
		nuvensFundo.obj[0] = {img: imgs[1], x1:0, x2:-1600, y:0, vx:3, width: 1600, height: 329};
		nuvensFundo.obj[1] = {img: imgs[2], x1:0, x2:-1600, y:0, vx:2, width: 1600, height: 321};

		banquinho.obj = {img: imgs[3], x:0, y:0, frame:0, espera:0, frames:11, width: 43, height: 69};

		banquinho.obj.nextFrame = function()
		{
			if(this.frame < this.frames-1)
				if(this.espera > 2)
				{
					this.frame++;
					this.espera = 0;
				}
				else
					this.espera++;
			else
				this.frame = 0;
		}

		nuvensFrente.obj.mover = nuvensFundo.obj[0].mover = nuvensFundo.obj[1].mover = function() {

			this.x1+= this.vx;
			if(this.x1+this.vx > this.width)
				this.x1 -= this.width*2;

			this.x2+= this.vx;
			if(this.x2+this.vx > this.width)
				this.x2 -= this.width*2;	
		}
	}

	function checarCarregada()
	{	
		if(imgsCarregadas == 4)
			return true;
		else
			return false;
	}

	//Funcao que efetivamente roda as animacoes
	function ativarAnimacoes(){
		if(checarCarregada())
		{
			//Inicia as animacoes
			cronometroAnimacoes = setInterval(desenharAnimacoes, 1000/20)
		}
		else
		{
			setTimeout(ativarAnimacoes, 1000);
		}
	}

	//Funcao que para de animar para evitar processamento desnecessario
	function pararAnimacoes(){
		clearInterval(cronometroAnimacoes);
	}

	function desenharAnimacoes() {
		nuvensFrente.canvas.clearRect(0,0, nuvensFrente.canvasWidth, nuvensFrente.canvasHeigth);
		nuvensFrente.canvas.drawImage(nuvensFrente.obj.img, 0, 0, nuvensFrente.obj.width, nuvensFrente.obj.height, nuvensFrente.obj.x1, nuvensFrente.obj.y, nuvensFrente.obj.width, nuvensFrente.obj.height);
		nuvensFrente.canvas.drawImage(nuvensFrente.obj.img, 0, 0, nuvensFrente.obj.width, nuvensFrente.obj.height, nuvensFrente.obj.x2, nuvensFrente.obj.y, nuvensFrente.obj.width, nuvensFrente.obj.height);
		nuvensFrente.obj.mover();

		nuvensFundo.canvas.clearRect(0,0, nuvensFundo.canvasWidth, nuvensFundo.canvasHeigth);
		nuvensFundo.canvas.drawImage(nuvensFundo.obj[0].img, 0, 0, nuvensFundo.obj[0].width, nuvensFundo.obj[0].height, nuvensFundo.obj[0].x1, nuvensFundo.obj[0].y, nuvensFundo.obj[0].width, nuvensFundo.obj[0].height);
		nuvensFundo.canvas.drawImage(nuvensFundo.obj[0].img, 0, 0, nuvensFundo.obj[0].width, nuvensFundo.obj[0].height, nuvensFundo.obj[0].x2, nuvensFundo.obj[0].y, nuvensFundo.obj[0].width, nuvensFundo.obj[0].height);
		nuvensFundo.obj[0].mover();

		nuvensFundo.canvas.drawImage(nuvensFundo.obj[1].img, 0, 0, nuvensFundo.obj[1].width, nuvensFundo.obj[1].height, nuvensFundo.obj[1].x1, nuvensFundo.obj[1].y, nuvensFundo.obj[1].width, nuvensFundo.obj[1].height);
		nuvensFundo.canvas.drawImage(nuvensFundo.obj[1].img, 0, 0, nuvensFundo.obj[1].width, nuvensFundo.obj[1].height, nuvensFundo.obj[1].x2, nuvensFundo.obj[1].y, nuvensFundo.obj[1].width, nuvensFundo.obj[1].height);
		nuvensFundo.obj[1].mover();


		banquinho.canvas.clearRect(0,0, banquinho.canvasWidth, banquinho.canvasHeigth);
		banquinho.canvas.drawImage(banquinho.obj.img, banquinho.obj.width*banquinho.obj.frame, 0, banquinho.obj.width, banquinho.obj.height, banquinho.obj.x, banquinho.obj.y, banquinho.obj.width, banquinho.obj.height);
		banquinho.obj.nextFrame();
	}

	//}
	
	//{ Camada Jogo
	function configurarCamadaJogo() {
		configurarJogoBotaoMenu();
		configurarJogoMenuBotaoDicas();
		configurarJogoMenuBotaoInstrucoes();
		configurarJogoMenuBotaoVoltarParaJogo();
		configurarJogoMenuBotaoSairDoJogo();
	}
	
	function configurarJogoBotaoMenu() {	
		$('#menu.botaoJogo').click(function() {
			Jogo.desativarMouse();
			Jogo.pararJogo();
			$('#menu.popup').fadeIn();
		});
	}
		
		//{ Botoes da popup menu
		function configurarJogoMenuBotaoDicas(){
			$('#dicas.botaoJogoMenu').click(function() {
				$('#dicas.popup').fadeIn();	
			});
		}
		
		function configurarJogoMenuBotaoInstrucoes(){
			$('#instrucoes.botaoJogoMenu').click(function(){
				$('#instrucoes.camada').fadeIn();
			});
		}
		
		function configurarJogoMenuBotaoVoltarParaJogo(){
			$('#voltarParaJogo.botaoJogoMenu').click(function(){
				$('#menu.popup').fadeOut();
				Jogo.continuarJogo();
				Jogo.ativarMouse();
			});
		}
		
		function configurarJogoMenuBotaoSairDoJogo(){
			$('#sairDoJogo.botaoJogoMenu').click(function() {
				Jogo.sairJogo();
				$('#jogo.camada').fadeOut();
				$('#menu.camada').fadeIn();
				ativarAnimacoes();	
			});
		}
		//}
	//}
		
	//{ Camada Dialogo
	function configurarCamadaDialogo() {
		configurarDialogoBotaoPular();
		configurarDialogoBotaoProximo();
	}
	
	function configurarDialogoBotaoPular() {				
		$('#pular.botaoDialogo').click(function() {
			$('#dialogo.camada').fadeOut();
			$('#jogo.camada').fadeIn();
			Jogo.iniciarJogo();
		});
	}
	
	function configurarDialogoBotaoProximo() {
		$('#proximo.botaoDialogo').click(function() {
			if(Dialogo.obterFalaAtual() < Dialogo.obterQuantidadeDeFalas())
				Dialogo.proximaFala();
			else
			{
				$('#dialogo.camada').fadeOut();
				$('#jogo.camada').fadeIn();
				Jogo.iniciarJogo();
			}
		});
	}
	//}
		
	function configurarBotoesVoltarCamadasSecundarias() {
		configurarSelecionarNivelBotaoVoltar();
		configurarJogoDicasBotaoVoltar();
		configurarInstrucoesBotaoVoltar();
		configurarCreditosCamada();
	}
	
	//{ Camada Selecionar nivel
	function configurarSelecionarNivelBotaoVoltar(){
		$('#voltar.botaoSelecionarNivel').click(function() {
			$('#selecionarNivel.camada').fadeOut();
			$('#menu.camada').fadeIn();
			ativarAnimacoes();		
		});
	}
	//}
	
	//{ Camada Dicas
	function configurarJogoDicasBotaoVoltar(){
		$('#voltar.botaoJogoDicas').click(function() {
			$('#dicas.popup').fadeOut();
		});
	}	
	//}
	
	//{ Camada Intrucoes
	function configurarInstrucoesBotaoVoltar(){
		$('#voltar.botaoInstrucoes').click(function(){
			$('#instrucoes.camada').fadeOut();
			if($('#menu.camada').css('display') != 'none')
				ativarAnimacoes();
		});
	}
	//}
	
	//{ Camada Creditos
	function configurarCreditosCamada(){
		$('#creditos.camada').click(function() {
			$('#creditos.camada').fadeOut();
			$('#menu.camada').fadeIn();
			ativarAnimacoes();
		});
	}
	//}
	
	//{ Configuracoes do carregar jogo salvo
	function configurarCamadaCarregarJogoSalvo() {
		configurarCarregarJogoSalvoBotaoCriar();
		configurarCarregarJogoSalvoBotaoVoltar();
		configurarCarregarJogoSalvoBotaoDeletar();
		configurarCarregarJogoSalvoPopupCorfimacaoBotoes();
	}
	
	function configurarCarregarJogoSalvoBotaoCriar() {
		$('#criar.botaoCarregarJogoSalvo').click(function() {
			var slot = $('.slotSelecionado');
			
			if(slot.length > 0 && slot.children('.nomeDoUsuario').html() == 'Slot Disponivel')
			{
				var popup = $('#criarPersonagem.popup').fadeIn();
				
				popup.children('#criar').click(function() {
					if(popup.children('input').val() != '')
					{
						$(this).unbind('click');
						popup.children('#voltar').unbind('click');	
						Save.save(popup.children('input').val(), Jogo.obterNivel(), slot.attr('id').substring(1));					
						popup.fadeOut().children('input').val('');
						configurarSlots();
					}
				});
				
				popup.children('#voltar').click(function() {
					popup.fadeOut().children('input').val('');
					$(this).unbind('click');
					popup.children('#criar').unbind('click');
				});
			}
		});
	}
	
	function configurarCarregarJogoSalvoBotaoVoltar() {
		$('#voltar.botaoCarregarJogoSalvo').click(function() {
			$('#carregarJogoSalvo.camada').fadeOut();
			$('#menu.camada').fadeIn();
			ativarAnimacoes();
		});
	}
	
	function configurarCarregarJogoSalvoBotaoDeletar() {
		$('#deletar.botaoCarregarJogoSalvo').click(function() {
			var slot = $('.slotSelecionado');
			if(slot.length > 0 && slot.children('.nomeDoUsuario').html() != 'Slot Disponivel')
			{
				var popup = $('#confirmacao.popup').fadeIn();
				popup.children('p').html('Tem certeza que deseja excluir o usuario '+(slot.children('.nomeDoUsuario').html().substring(6))+'?');
				
				popup.children('#confirmar').click(function() {
					$(this).unbind('click');
					popup.children('#cancelar').unbind('click');
					Save.save('', 0, slot.attr('id').substring(1));
					configurarSlots();
					$('#confirmacao.popup').fadeOut();
				});
				
				popup.children('#cancelar').click(function() {
					$(this).unbind('click');
					popup.children('#confirmar').unbind('click');
					$('#confirmacao.popup').fadeOut();
				});
				
			}
		});
	}
	
	function configurarCarregarJogoSalvoPopupCorfimacaoBotoes() {
	}
	
	function configurarSlots() {
	
		$('.slotSelecionado').removeClass('slotSelecionado');
		var jogoSalvo = Save.load();
		
		for(var i = 0; i < 3; i++)
		{
			if(jogoSalvo[i].nome != '') 
				$('#_'+i+'.slot').children('.nomeDoUsuario').html('Nome: '+jogoSalvo[i].nome).parent()
								.children('.nivelDoUsuario').html('Nivel: '+jogoSalvo[i].nivel);
			else
				$('#_'+i+'.slot').children('.nomeDoUsuario').html('Slot Disponivel').parent()
								.children('.nivelDoUsuario').html('');
		}
	
		$('.slot').click(function funcaoAuxiliar() {
			var slotsSelecionados = $('.slotSelecionado').removeClass('slotSelecionado').unbind('click').click(funcaoAuxiliar);
			$(this)
			.addClass('slotSelecionado')
			.click(function() {
				if($(this).children('.nomeDoUsuario').html() != 'Slot Disponivel')
					alert('selecionei slot');
			});
		});
	}
	//}
	
	//{ Configuracoes som
	function configurarSom() {
		configurarSomBotaoSom();
		configurarSomBotaoVolume();
	}
	
	function configurarSomBotaoSom() {
	
		$('#botaoSom')
		.css('background', 'url("Cestos/imgs/som/somLigado.png")')
		.click(function(){
				Audio.ajustarMudo();
				if(Audio.obterMudo()) {
						$(this).css('background', 'url("Cestos/imgs/som/somDesligado.png")');
						Audio.pausarSom();
				}
				else {
						$(this).css('background', 'url("Cestos/imgs/som/somLigado.png")');
						Audio.iniciarSom();
				}
						
		});

		Audio.iniciarSom();
	}
	
	function configurarSomBotaoVolume() {
		var cont = 4;
		$('#botaoVolume')
		.css('background', 'url("Cestos/imgs/som/volume4.png")')
		.click(function(){
			cont--;
			if(cont < 0)
				cont = 4;

			$(this).css('background', 'url("Cestos/imgs/som/volume'+cont+'.png")');
			Audio.ajustarVolumePara(cont*0.25);
		});
	}
	//}
	
	return {		
		iniciar: function()
		{		
			//Coloco a funcao de iniciar animacao do menu dentro do script da introducap	
			Intro.ativarAnimacaoMenu = ativarAnimacoes;
			criarLayout();	
			pegarElementos();		
			configurarEventos();
		},	
	}

});