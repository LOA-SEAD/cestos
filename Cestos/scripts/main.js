require.config({
    paths: {
        "jquery": "./libs/jquery-1.8.1",
    }
});

require(['jquery', './interfaces/principal'], function ($, Interface) {

    $(document).ready(function () {
		Interface.iniciar();
    });

}); 
