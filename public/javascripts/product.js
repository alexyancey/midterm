angular.module('product', [])
    .controller('MainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.products = [];
            $scope.addProduct = function() {
                var newproduct = { title: $scope.formName, price: $scope.formPrice, orders: 0, image: $scope.formImage };
                $http.post('/products', newproduct).success(function(data) {
                    $scope.products.push(data);
                });
                $scope.formName = '';
                $scope.formPrice = '';
                $scope.formImage = '';
            };
            $scope.incrementOrders = function(products) {
                $scope.cart = [];
                angular.forEach(products, function(value, key) {
                  if (value.checked)
                    $scope.cart.push(value);
                });
                angular.forEach($scope.cart, function(value, key) {
                  console.log('Cart is: ' + value);
                  $http.put('/products/' + value._id + '/order')
                    .success(function(data) {
                        console.log("order worked");
                        value.orders += 1;
                    })
                });
            };
            $scope.delete = function(product) {
                $http.delete('/products/' + product._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                /*$.ajax({
                  url: "/products/:product",
                  type: "DELETE",
                  contentType: "application/json; charset=utf-8",
                  data: product._id
                });*/
                $scope.getAll();
            };
            $scope.getAll = function() {
                return $http.get('/products').success(function(data) {
                    angular.copy(data, $scope.products);
                });
            };
            $scope.getAll();
        }
    ]);
