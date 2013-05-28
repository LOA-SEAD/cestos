define(['text!../../templates/intro.html'], function (Intro) {
	
	//Essa aniamcao faz aparecer o 
	//fundo, a foto1, foto2, rosto da menina e 
	//rosto do menino em sequencia
	function tocarQuadro0() {
		setTimeout(function() {
			$('#sequencia1').fadeIn(1000);
		}, 1000);

		setTimeout(function() {
			$('#quadro1').fadeIn(1500);
		}, 2000);

		setTimeout(function() {
			$('#quadro2').fadeIn(1500);
		}, 3500);

		setTimeout(function() {
			$('#rosto1').fadeIn(1500);
		}, 6000);

		setTimeout(function() {
			$('#rosto2').fadeIn(1500);
		}, 7500);

		setTimeout(function() {
			tocarQuadro1();
		}, 10000);
	}

	//Essa animacao faz o quadro se expandir de cima
	function tocarQuadro1() {
		$('#sequencia1').fadeOut(1000);
		$('#sequencia2').show();

		setTimeout(function() {
			$('#fundo2').fadeIn(600);
			$('#quadroExpandir').fadeIn(1500);
		}, 1000);

		setTimeout(function() {
			$('#quadroExpandir').css('top', '0px');
		}, 3000);

		setTimeout(function() {
			tocarQuadro2();
		}, 6000);
	}

	function tocarQuadro2() {
		$('#sequencia2').fadeOut(1500);
		$('#introducao.camada').fadeOut(1500);
		$('#menu.camada').fadeIn(function () {
			Publico.ativarAnimacaoMenu();
		});
	}

	var Publico = {
		
		tocar: function(){
			$('.botaoIntroducao').remove();
			$('#introducao.camada').append(Intro);

			tocarQuadro0();
		},
	
	};

	return Publico;

});