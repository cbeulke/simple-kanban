const app = angular.module('simple-kanban', [ angularDragula(angular) ]);

app.controller('TaskController', ($scope, $http) => {
    
    $scope.$on('common.drop-model', function(domElement, item, column) {
        var itemToUpdate = $scope.columns.reduce(function(a, b) {
            return [...a, ...b.items];
        }, []).find(function(a) {
            return a.id === item.data('id');
        });
        
        itemToUpdate.status = column.data('status');
        $http.put('/tasks/' + itemToUpdate.id, itemToUpdate);
    });
    
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

    var loadTasks = () => {
        $http.get('/tasks').then((data) => {
            $scope.columns = data.data;
        });
    };

    loadTasks();
});