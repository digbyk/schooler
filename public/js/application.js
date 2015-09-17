var aiwfApp = angular.module('AiwfApp', ['ngResource']);

aiwfApp.factory('ListService', ['$resource',
	function ($resource) {
		return $resource('/api/lists/:listId', {});
}]);

aiwfApp.controller('GiftController', function ($scope, $http, ListService) {
	$scope.lists = ListService.query();
	$scope.list = ListService.get({
		listId: '52ff7317e4b056266d60c1b9'
	});
});
