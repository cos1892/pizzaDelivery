pizzaApp.controller('DrinksController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "drinks";
  pizzaService.get('/drink', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.drinks = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/drink', function(response){
        $scope.drinks = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (drink, countProduct) {
  var objectDrinks = {
        id: drink._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      drinks: []
    };
      objectSave.drinks.push(objectDrinks);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.drinks === undefined) {
        objectSave.drinks = [];
      }
      if(objectSave.drinks.every(function(item){
        return item.id !== objectDrinks.id;
      })) {
        objectSave.drinks.push(objectDrinks);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});