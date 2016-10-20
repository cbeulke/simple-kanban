const app = angular.module('simple-kanban', [ 'dndLists' ]);

app.controller('TaskController', ($scope, $http) => {
    $scope.task = '';

    $scope.columns = {};
    
    $scope.delete = (task) => {
        $http.delete('/tasks/' + task.id, task).then(() => {
            loadTasks();
        });
    };

    $scope.submit = () => {
        var newTask = {
            title: $scope.task,
            status: 0
        };

        $http.post('/tasks', newTask).then(() => {
            loadTasks();
            $scope.task = '';
        });
    };

    $scope.drop = (list, item) => {
        item.status = list.columnStatus;
        $http.put('/tasks/' + item.id, item).then(loadTasks);
    }

    var loadTasks = () => {
        $http.get('/tasks').then((data) => {
            $scope.columns = data.data;
        });
    };

    loadTasks();
});