pizzaApp.controller('PizzaController', function($scope, $http, pizzaService){
	$scope.data = "pizza";

  $scope.user = {};

  $scope.user.type = [];
  $scope.user.size = [];
  $scope.user.ingredeents = [];

    $scope.selectType = function (checkBoxValue) {
      var index = $scope.user.type.indexOf(checkBoxValue);
      if (index > -1) {
        $scope.user.type.splice(index, 1);
      }
      else {
        $scope.user.type.push(checkBoxValue);
    }};

    $scope.selectSize = function (checkBoxValue) {
    var index = $scope.user.size.indexOf(checkBoxValue);
    if (index > -1) {
      $scope.user.size.splice(index, 1);
    }
    else {
      $scope.user.size.push(checkBoxValue);
    }};

    $scope.selectIngredeents = function (checkBoxValue) {
    var index = $scope.user.ingredeents.indexOf(checkBoxValue);
    if (index > -1) {
      $scope.user.ingredeents.splice(index, 1);
    }
    else {
      $scope.user.ingredeents.push(checkBoxValue);
    }};

    $scope.submit = function() {
     $scope.user.pageSizeNumber = 9;
     $http.get('/pizza', {params: $scope.user})
    .then(
      function(response){
        if(response.data)
        {
          if(response.data === 'No documents found!') {
            $scope.errMessage = true;
            $scope.numberOfPages = 0;
          } else {
            $scope.errMessage = false;
            $scope.pizzas = response.data.list;
            $scope.numberOfPages = response.data.number;
            $scope.count = response.data.count;
          }
        } 
      },
      function(data){

      }
    );
    }
  pizzaService.get('/pizza', function(response){
        if(response.data === 'No documents found!') {
            $scope.errMessage = true;
            $scope.numberOfPages = 0;
          } else {
            $scope.errMessage = false;
            $scope.pizzas = response.data.list;
            $scope.numberOfPages = response.data.number;
            $scope.count = response.data.count;
          }
    });

$scope.currentPage = 0; 
$scope.setCurrentPage = function(currentPage) {
    $scope.user.page = currentPage;
    delete $scope.user.pageSizeNumber;
    $http.get('/pizza', {params: $scope.user})
    .then(
      function(response){
        $scope.pizzas = response.data;
      },
      function(data){

      }
    );
}

$scope.getNumberAsArray = function (num) {
    return new Array(num);
};

$scope.isMaskNormal = function(type) {
  if(type === 'normal') {
    return true;
  }
};

$scope.isMaskSpicy = function(type) {
  if(type === 'spicy') {
    return true;
  }
};

$scope.isMaskVegetarian = function(type) {
  if(type === 'vegetarian') {
    return true;
  }
};

});