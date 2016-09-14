pizzaApp.controller('SaladsController', function($rootScope, $scope, $http, $window, pizzaService){

	$scope.data = "salads";
  pizzaService.get('/salad', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.salads = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function (currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/salad', function(response){
        $scope.salads = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (salad, countProduct) {
  var objectSalads = {
        id: salad._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      salads: []
    };
      objectSave.salads.push(objectSalads);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.salads === undefined) {
        objectSave.salads = [];
      }
      if(objectSave.salads.every(function(item){
        return item.id !== objectSalads.id;
      })) {
        objectSave.salads.push(objectSalads);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});