const app = angular.module('simple-kanban', []);

app.controller('TaskController', ($scope, $http) => {
    $scope.task = '';
    
    $scope.submit = () => {
        var dataToSend = {
            title: $scope.task
        };

        var functionToCallAfterPost = (blabla) => {
            console.log(blabla);
            $scope.task = '';
        };

        var promise = $http.post('/tasks', dataToSend);
        promise.then(functionToCallAfterPost);
        
    };
});