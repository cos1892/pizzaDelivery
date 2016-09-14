pizzaApp.controller('BasketController', function($rootScope, $scope, $http, $window) {
	function callback() {
		if($window.localStorage.length!==0) {
			  $scope.basket = true;
			  $scope.Get = $window.localStorage.getItem('basket');
		      $scope.objectSave = JSON.parse($scope.Get);
		      $http.post('/basket', $scope.objectSave)
		    .then(
		      function(response){
		      	$scope.sumCount = 0;
		      	$scope.coast = 0;
		      	$scope.basketArray = response.data;
		    	$scope.basketArray.forEach(function(item, i, arr) {
		    		$scope.collection = item;
		    		$scope.collection.forEach(function(item, i, arr) {
		    				var itemId = item;
		        			var number = i;
		    			for(var key in $scope.objectSave) {
						    $scope.objectSave[key].forEach(function(item, i, arr) {
				        		if(itemId._id === item.id) {
				        			var count = parseInt(item.count);
				        			$scope.collection[number].count = count;
				        			$scope.collection[number].sumCoast = Math.round($scope.collection[number].coast*count*10)/10;
				        			$scope.sumCount += count;
				        			$scope.coast += $scope.collection[number].sumCoast;
				        		}
				        	});
		    			}
		    		});
		    	});
		      },
		      function(data){

		      }
		    );
		} else {
			$scope.basket = false;
		}
	};
	callback();
	$rootScope.$on('addBasket', callback);
	$scope.open = true;
	$scope.basketFull = function () {
		$scope.open = !$scope.open;
	}
	$scope.deleteFromBasket = function (id) {
		$scope.Get = $window.localStorage.getItem('basket');
		$scope.objectSave = JSON.parse($scope.Get);
		for(var key in $scope.objectSave) {
				$scope.objectSave[key].forEach(function(item, i, arr) {
				if(id === item.id) {
				    if($scope.objectSave[key].length > 1) {
				    	$scope.objectSave[key].splice(i,1);
				    } else {
				        delete $scope.objectSave[key];
				        }
				}
			});
		}
		$scope.Save = JSON.stringify($scope.objectSave);
		if ($scope.Save === "{}") {
			$window.localStorage.clear();
		} else {
			$window.localStorage.setItem('basket', $scope.Save);
		}
		callback();
	}

	$scope.dec = function(id, count) {
		if(count > 1) {
			$scope.Get = $window.localStorage.getItem('basket');
			$scope.objectSave = JSON.parse($scope.Get);
			for(var key in $scope.objectSave) {
					$scope.objectSave[key].forEach(function(item, i, arr) {
					if(id === item.id) {
					    $scope.objectSave[key][i].count--;
					}
				});
			}
			$scope.Save = JSON.stringify($scope.objectSave);
			$window.localStorage.setItem('basket', $scope.Save);
			callback();
		} else {
			$scope.deleteFromBasket(id);
		}
	}

	$scope.inc = function(id, count) {
		if(count!==99) {
			$scope.Get = $window.localStorage.getItem('basket');
			$scope.objectSave = JSON.parse($scope.Get);
			for(var key in $scope.objectSave) {
					$scope.objectSave[key].forEach(function(item, i, arr) {
					if(id === item.id) {
					    $scope.objectSave[key][i].count++;
					}
				});
			}
			$scope.Save = JSON.stringify($scope.objectSave);
			$window.localStorage.setItem('basket', $scope.Save);
			callback();
		}
	}

});