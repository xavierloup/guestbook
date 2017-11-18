/* global angular, nodered, express, openwhisk */

// create the module and name it reviewApp
// also include ngRoute for all our routing needs
var reviewApp = angular.module('reviewApp', ['ngRoute']);

// configure our routes
reviewApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/list.html',
            controller  : 'listController'
        })

        // route for the list page
        .when('/list', {
            templateUrl : 'pages/list.html',
            controller  : 'listController'
        })

        // route for the list page
        .when('/new', {
            templateUrl : 'pages/new.html',
            controller  : 'newController'
        })

        // route for the detail page
        .when('/detail/:id', {
            templateUrl : 'pages/detail.html',
            controller  : 'detailController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        });
});

// Post a new review
reviewApp.controller('newController', function($scope, $http, $routeParams, $location) {
  $scope.postReview = function() {
      $http.post('/review', { text: $scope.text }).then(function(data) {
        $location.path('/list');
      })
  }
});

// create the controller and inject Angular's $scope
reviewApp.controller('listController', function($scope, $http, $interval) {
    $scope.getReviews = function() {
        $http.get('/reviews').then(function(data) {
            $scope.reviews = angular.fromJson(data.data.payload);
        })
    }

    // Manage list sorting
    $scope.sortProperty = 'doc.creation_date';
    $scope.reverse = true;
    $scope.sortBy = function(sortProperty) {
        $scope.reverse = ($scope.sortProperty === sortProperty) ? !$scope.reverse : false;
        $scope.sortProperty = sortProperty;
    };

    // Show / hide search field
    $scope.isHidden = true;
    $scope.showHideSearch = function () {
      // If DIV is hidden it will be visible and vice versa.
      $scope.isHidden = $scope.isHidden ? false : true;
    }

    // Load reviews on load
    $scope.getReviews();
});

reviewApp.controller('detailController', function($scope, $http, $routeParams) {
    $scope.getReview = function(id) {
        $http.get('/review?id=' + id).then(function(data) {
          $scope.review = angular.fromJson(data.data.payload);
        })
    }
    // Load reviews on load
    $scope.getReview($routeParams.id);
});

reviewApp.controller('aboutController', function($scope, $http) {
  $scope.getInfo = function() {
      $http.get('/info').then(function(data) {
        $scope.info = angular.fromJson(data.data.payload);
      })
  }
  // Load infos on load
  $scope.getInfo();
});
