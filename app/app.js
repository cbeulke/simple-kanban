const app = angular.module('simple-kanban', [ 'ngRoute', angularDragula(angular) ]);

app
.factory('authInterceptor', function($q, $location, auth) {
    return {
        request: (config) => {
            var token = auth.getToken();
            if(token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        },
        response: (res) => {
            if(res.data.token) {
                auth.saveToken(res.data.token);
            }
            return res;
        },
        responseError: (rejection) => {
            if(rejection.status === 401) {
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    }
})
.service('user', function($http) {
    var self = this;
    
    self.register = (username) => {
        return $http.post('/auth/register', {
            username: username
        })
    };
    
    self.login = (username, password) => {
        return $http.post('/auth/login', {
            username: username,
            password: password
        })
    };
})
.service('auth', function($window) {
    var self = this;
    
    self.parseJWT = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.autob(base64));
    }
    
    self.saveToken = (token) => {
        $window.localStorage['jwtToken'] = token;
    }
    
    self.getToken = () => {
        return $window.localStorage['jwtToken'];
    }
    
    self.isAuthenticated = () => {
        var token = self.getToken();
        if(token) {
            var params = self.parseJWT(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    }
    
    self.logout = () => {
        $window.localStorage.removeItem('jwtToken');
    }
    
})
.controller('TaskController', function($scope, $http) {
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
})
.controller('LoginController', function($scope, $location, user) {
    $scope.login = (username, password) => {
        user.login(username, password).then((response) => {
            $location.path('/');
        }, (response) => {
            console.log(response);
        });
    };
})
.controller('NavController', function($scope, $window, $location) {
    $scope.logout = () => {
        $window.localStorage.removeItem('jwtToken');
        $location.path('/login');
    }
})
.config(function($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $routeProvider
        .when('/', {
            templateUrl: 'views/workspace.html',
            controller: 'TaskController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        });
});