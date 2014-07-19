var myext = angular.module('myext', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/myext')
		.success(function(data) {
			$scope.myexts = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createmyext = function() {
		$http.post('/api/myext', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.myexts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deletemyext = function(id) {
		$http.delete('/api/myext/' + id)
			.success(function(data) {
				$scope.myexts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.findmyext = function(name) {
		$http.get('/api/myext/' + name)
			.success(function(data) {
				$scope.myexts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.findmyextbyNum = function(ext) {
		$http.get('/api/myextbyNum/' + ext)
			.success(function(data) {
				$scope.myexts = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}