pizzaApp.controller('BreakfastsController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "breakfasts";
  pizzaService.get('/breakfast', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.breakfasts = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/breakfast', function(response){
        $scope.breakfasts = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (breakfast, countProduct) {
  var objectBreakfast = {
        id: breakfast._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      breakfasts: []
    };
      objectSave.breakfasts.push(objectBreakfast);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.breakfasts === undefined) {
        objectSave.breakfasts = [];
      }
      if(objectSave.breakfasts.every(function(item){
        return item.id !== objectBreakfast.id;
      })) {
        objectSave.breakfasts.push(objectBreakfast);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});