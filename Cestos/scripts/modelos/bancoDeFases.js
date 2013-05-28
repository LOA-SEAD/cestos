define(['./bancoDePalavras', './bancoDeDialogos'], function (Palavras, Dialogos) {
	//Precisa guardar de cada fase: 
		//1) Varias palavras que serao sortedas durante a fase
		//2) Os grupos
		//3) Dicas da fase
		//4) Dialogos da fase		
	var numeroDeFases = 10;	
	
	function fase(_nome, _palavras, _dialogos, _grupos, _tempoEntreBaloes)
	{
		var nome = _nome;
		var palavras = _palavras;
		var dialogos = _dialogos;
		var grupos = _grupos;
		var tempoEntreBaloes = _tempoEntreBaloes;
		
		this.obterTempoEntreBaloes = function ()
		{
			return tempoEntreBaloes;
		}
		
		this.obterNome = function ()
		{
			return nome;
		}
		this.obterPalavras = function ()
		{
			return palavras;
		}
		this.obterNumeroDePalavras = function ()
		{
			return palavras.length;
		}
		this.obterDialogos = function ()
		{
			return dialogos;
		}
		this.obterGrupos = function ()
		{
			return grupos;
		}
	}
	
	var fases = new Array();
	fases[0] = new fase("Fase teste", Palavras.obterPalavras(0), Dialogos.obterDialogos(0), ["ar", "er", "ir"], 100);
	fases[1] = new fase("Fase teste", Palavras.obterPalavras(1), Dialogos.obterDialogos(0), ["ar", "er", "ir"], 50);
	
	return {
		obterFase: function(id)
		{
			return fases[id];
		},
		obterNumeroDeFases:function()
		{
			return numeroDeFases;
		}
		
	
	};

});