define([], function () {
	
	var palavras = new Array();
	
	palavras[0] = [	
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
					new Palavra("amar",0), 
					new Palavra("deitar",0),				
				];
	
	palavras[1] = [	
					new Palavra("amar",0), 
					new Palavra("deitar",0), 
					new Palavra("andar",0),
					new Palavra("crescer",1), 
					new Palavra("ver",1), 
					new Palavra("saber",1),
					new Palavra("sair", 2),
					new Palavra("cair", 2),
					new Palavra("fingir", 2),
					new Palavra("amado", -1),
					new Palavra("calado", -1),
					new Palavra("sabido", -1),
					new Palavra("amar",0), 
					new Palavra("deitar",0), 
					new Palavra("andar",0),
					new Palavra("crescer",1), 
					new Palavra("ver",1), 
					new Palavra("saber",1),
					new Palavra("sair", 2),
					new Palavra("cair", 2),
					new Palavra("fingir", 2),
					new Palavra("amado", -1),
					new Palavra("calado", -1),
					new Palavra("sabido", -1),
				  ];
				 
	
	function Palavra(_valor, _grupo)
	{	
		var valor = _valor;
		var grupo = _grupo;
		
		this.Valor = function() {
			return valor;
		}
		this.Grupo = function() {
			return grupo;
		}
	}

	return {
		
		obterPalavras:function(id)
		{
			return palavras[id];
		},
	
	};

});