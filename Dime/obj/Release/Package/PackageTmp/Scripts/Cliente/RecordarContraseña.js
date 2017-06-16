$(document).ready(function () {

    console.log("entra bien hecho");
});

angular.module('PreDesbloqueo', [])
.controller('PreguntasController', function ($scope) {

    $scope.init = function (result) {
        $scope.questions = result;
        console.log("entra bien hecho "+questions);
    }
    $scope.availableQuestions = {
        data: 5
    }

    function changeSelect() {
        console.log("no existe eso");
    }
    ;



})
