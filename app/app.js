const app = angular.module('simple-kanban', []);

app.controller('TaskController', ($scope, $http) => {
    $scope.task = '';

    $scope.tasks = [];
    
    $scope.delete = (task) => {
        $http.delete('/tasks/' + task.id, task).then(() => {
            loadTasks();
        });
    };

    $scope.submit = () => {
        var dataToSend = {
            title: $scope.task
        };

        var functionToCallAfterPost = () => {
            loadTasks();
            $scope.task = '';
        };

        var promise = $http.post('/tasks', dataToSend);
        promise.then(functionToCallAfterPost);
    };

    var loadTasks = () => {
        $http.get('/tasks').then((data) => {
            $scope.tasks = data.data;
        });
    };

    loadTasks();
});