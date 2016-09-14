pizzaApp.controller('DessertsController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "desserts";
  pizzaService.get('/dessert', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.desserts = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/dessert', function(response){
        $scope.desserts = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (dessert, countProduct) {
  var objectDesserts = {
        id: dessert._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      disserts: []
    };
      objectSave.disserts.push(objectDesserts);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.disserts === undefined) {
        objectSave.disserts = [];
      }
      if(objectSave.disserts.every(function(item){
        return item.id !== objectDesserts.id;
      })) {
        objectSave.disserts.push(objectDesserts);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});