pizzaApp.controller('FitnessController', function($scope, $http, pizzaService, $window, $rootScope){
	$scope.data = "fitness";
  pizzaService.get('/fitnessMenu', function(response){
        $scope.numberOfPages = response.data.number;
        $scope.fitness = response.data.list;
    });

$scope.currentPage = 0; 
var page_Size = 9;
$scope.setCurrentPage = function(currentPage) {
    $scope.currentPage = currentPage;
    pizzaService.setCurrentPage(currentPage, '/fitnessMenu', function(response){
        $scope.fitness = response.data;
    });
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.addBasket = function (fit, countProduct) {
  var objectFitness = {
        id: fit._id,
        count: countProduct
      };
  if($window.localStorage.length === 0) {
      var objectSave = {
      fitnessMenu: []
    };
      objectSave.fitnessMenu.push(objectFitness);
      $scope.Save = JSON.stringify(objectSave);
      $window.localStorage.setItem('basket', $scope.Save);
  } else {
      $scope.Get = $window.localStorage.getItem('basket');
      var objectSave = JSON.parse($scope.Get);
      if(objectSave.fitnessMenu === undefined) {
        objectSave.fitnessMenu = [];
      }
      if(objectSave.fitnessMenu.every(function(item){
        return item.id !== objectFitness.id;
      })) {
        objectSave.fitnessMenu.push(objectFitness);
        $scope.Save = JSON.stringify(objectSave);
        $window.localStorage.setItem('basket', $scope.Save);
      }
  }
  $rootScope.$broadcast('addBasket');
};

});