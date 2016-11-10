const app = angular.module('simple-kanban', [ angularDragula(angular) ]);

app.controller('TaskController', ($scope, $http) => {
    
    $scope.$on('common.drop-model', function(el, item, column) {
        
        $scope.columns.forEach(function(c) {
           c.items.forEach(function(itemToUpdate) {
                if(itemToUpdate.id === item.data('id')) {
                    itemToUpdate.status = column.data('status');
                    $http.put('/tasks/' + itemToUpdate.id, itemToUpdate).then(loadTasks);                
                }
           });
        });
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