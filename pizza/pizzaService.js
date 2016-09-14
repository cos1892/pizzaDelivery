pizzaApp.factory('pizzaService', function ($http) {
	return {
		get : function  (url, cb) {
			$http.get(url, {params: {pageSizeNumber: 9}})
				.then(
					function(response){
						cb(response);
					},
					function(data){

					}
			);
		},
		setCurrentPage : function  (currentPage, url, cb) {
			$http.get(url, {params: {page: currentPage, pageSize: 9}})
				.then(
					function(response){
						cb(response);
					},
					function(data){

					}
			);
		}
	}
})