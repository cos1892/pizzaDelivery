pizzaApp.controller('SoupsController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "soups";
  pizzaService.get('/soup', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.soups = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/soup', function(response){
        $scope.soups = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (soup, countProduct) {
  var objectSoups = {
        id: soup._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      soups: []
    };
      objectSave.soups.push(objectSoups);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.soups === undefined) {
        objectSave.soups = [];
      }
      if(objectSave.soups.every(function(item){
        return item.id !== objectSoups.id;
      })) {
        objectSave.soups.push(objectSoups);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});