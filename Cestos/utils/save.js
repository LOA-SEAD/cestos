define(function () {

    var saveObj = {};
	
    var Publico = {
		
		save: function(_nome, _nivel, _slot) {
			saveObj[_slot] = { nome: _nome, nivel: _nivel };
			localStorage.setItem('localSave', JSON.stringify(saveObj)); 
		},
        
		load: function() {
			var aux = JSON.parse(localStorage.getItem('localSave'));
			
			if(aux == null)
				aux = {};

			for(var i = 0; i < 3; i++)
				if(typeof(aux[i]) == 'undefined')
					aux[i] = { nome: '', nivel: 0};
			
			return aux;
		}		
	};
	
	(function(){
		saveObj = Publico.load();
	}())
	
	return Publico;
});
