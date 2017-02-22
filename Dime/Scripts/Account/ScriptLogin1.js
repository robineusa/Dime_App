angular.module('MyApp', [])
.controller('Part5Controller', function ($scope) {
    $scope.data = {
        label: "Contraseña"
    }





    $scope.changeAct = function () {
        var dataAct = $scope.myValue;
        passEnoughLength(dataAct);
        passEnougthLenghtAndUpperCase(dataAct);
    };

    function passEnoughLength(dataAct) {
        if (dataAct.length > 5) {
            $('#btnWarning').show();
            $scope.data = {
                message: "Seguridad: Nivel medio, ponga mayusculas"
            }
        } else {
            $('#btnWarning').hide();
            $('#btnSuccess').hide();
            $scope.data = {
                message: "Seguridad: Nivel bajo, extienda su texto"
            }
        }
    }

    function passEnougthLenghtAndUpperCase(dataAct) {
        var tieneUpper = false;
        for (i = 0; i < dataAct.length; i++) {
            var character = dataAct[i];
            if (character == character.toUpperCase() & isNaN(character))
                {
                tieneUpper = true;
                console.log("cuestiones pedidas good");
                    }
        }
        if (tieneUpper & (dataAct.length > 5)) {
            $('#btnSuccess').show();
            $scope.data = {
                message: "Seguridad: Nivel Alto"
            }
        }
        else {
            if (!tieneUpper & (dataAct.length > 5)) {
                $('#btnSuccess').hide();
                $scope.data = {
                    message: "Seguridad: Nivel Medio, ponga mayusculas"
                }
            }
            if (!tieneUpper & (dataAct.length <= 5)) {
                $('#btnSuccess').hide();
                $scope.data = {
                    message: "Seguridad: Nivel Bajo, extienda su texto"
                }
            }

        }


    }


})

