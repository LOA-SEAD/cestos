define(['jquery', './jogo', '../modelos/bancoDeDialogos'], function ($, Jogo, Banco) {
	
	var nivelAtual,
	falas,
	falaAtual,
	acabou,
	caractereAtual;
	
	function atualizarImagemDoPersonagem() {
		if(falas[falaAtual][0] == 'Maria')
			$('#imagemDoPersonagemDialogo').css('background', 'url("Cestos/imgs/p1.png")');
		else
			$('#imagemDoPersonagemDialogo').css('background', 'url("Cestos/imgs/p2.png")');
	
	}
	
	function colocarPlanoDeFundo() {
		$('#imagemDeFundoDialogo').css('background', 'url("Cestos/imgs/fundoDialogos.png")');	
	}
	
	function incrementarTexto() {
		caractereAtual++;
		$('#falaDialogo').html(falas[falaAtual][1].substring(0, caractereAtual));
		if(caractereAtual < falas[falaAtual][1].length)
			setTimeout(incrementarTexto, 300);
	}
	
	var Publico = {
		
		iniciarDialogo: function (nivel) {
			nivelAtual = nivel;
			falaAtual = 0;
			caractereAtual = -1;
			acabou = false;
			falas = Banco.obterDialogos(nivelAtual);
			colocarPlanoDeFundo();
			atualizarImagemDoPersonagem();
			incrementarTexto();
		},
		
		proximaFala: function() {
			if(caractereAtual < falas[falaAtual][1].length)
			{
				caractereAtual = falas[falaAtual][1].length;
				incrementarTexto();
			}
			else
			{
				caractereAtual = -1;
				falaAtual++;
				incrementarTexto();
				atualizarImagemDoPersonagem();				
			}
		},
		
		obterQuantidadeDeFalas: function() {
			return falas.length;
		},
		
		obterFalaAtual: function() {
			return falaAtual;
		},
	
	};
	
	return Publico;

});