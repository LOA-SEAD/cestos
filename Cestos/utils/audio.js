define(function () {

    var som = 'Cestos/audio/loop',
	mudo = false,
    efeitoDeSom;


    (function inicializar() {
        if (suportaAudioElement()) {

            if (suportaWav()) {
                efeitoDeSom = new Audio(som + '.wav');

            } else {
                efeitoDeSom = new Audio(som + '.mp3');
            }
			efeitoDeSom.loop = true;
        }
    } ());

    function suportaAudioElement() {
        return typeof document.createElement('audio').canPlayType !== 'undefined';
    }

    function suportaWav() {
        return new Audio().canPlayType('audio/wav') !== '';
    }

    return {

        iniciarSom: function () {
            if (efeitoDeSom !== undefined)
            {}
                //efeitoDeSom.play();
        },
		
		pausarSom: function() {
			if(efeitoDeSom !== undefined)
                efeitoDeSom.pause();
		},
		
		ajustarVolumePara: function(novoVolume) {
			if(efeitoDeSom !== undefined)
                efeitoDeSom.volume = novoVolume;
		},
		
		obterMudo: function() {
			return mudo;
		},
		
		ajustarMudo: function() {
			mudo = !mudo;
		},
	};
});
