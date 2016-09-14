pizzaApp.controller('HotDishesController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "hotDishes";
  pizzaService.get('/hotDish', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.hotDishes = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/hotDish', function(response){
        $scope.hotDishes = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (hotDish, countProduct) {
  var objectHotDishes = {
        id: hotDish._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      hotDishes: []
    };
      objectSave.hotDishes.push(objectHotDishes);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.hotDishes === undefined) {
        objectSave.hotDishes = [];
      }
      if(objectSave.hotDishes.every(function(item){
        return item.id !== objectHotDishes.id;
      })) {
        objectSave.hotDishes.push(objectHotDishes);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});