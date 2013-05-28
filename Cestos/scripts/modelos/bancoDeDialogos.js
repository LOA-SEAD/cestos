define([], function () {
	
	var dialogos = new Array();
	
	dialogos[0] = [
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					
				  ];

				  dialogos[1] = [
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					["Pedro", "Ola"],
					["Maria", "Oi, Tudo Bom?"],
					
				  ];

	
	return {
		
		obterDialogos:function(id)
		{
			return dialogos[id];
		},
	
	};

});