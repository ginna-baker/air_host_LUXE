'use strict';

angular.module('airhostluxeApp')
  .controller('CustomizeCtrl', function ($scope, $http, Auth, User) {

    $scope.isLoggedIn = Auth.isLoggedIn;

    console.log("test");

    $http.get('/me').success(function(data) {
      $scope.data = data;
    });

    $scope.step=1;

    $scope.back = function () {
      $scope.step--;
    };

    $scope.advance = function () {
      $scope.step++;
    };

    var body = {url: "https://www.airbnb.com/rooms/1747206?s=tBpK"};

    $scope.scrape = function() {
      console.log("got it");
      $scope.advance();
      $http.post('/api/scrape', body).success(function(data) {
        var scraped = data;
        $scope.postObj = {};
        $scope.postObj.property_info = {};
        $scope.postObj.property_info.photo = data.cover;
        $scope.postObj.property_info.airbnb_rating=data.airbnb_rating;
        $scope.postObj.property_info.city=data.city;
        });
    };

    $scope.addListing = function() {
      if($scope.listing === '') {
        return;
      }

      postObj.property_info = $scope.listing.property_info;
        $scope.listing.property_info.luxe_url = $scope.user.name +"/"+ $scope.generateUrlName();
        postObj.your_stay = $scope.listing.your_stay;
        postObj.emergency = $scope.listing.emergency;
        $scope.listing.emergency.call_number = "911";
        $scope.listing.emergency.poison_ctrl_center ="1-800-222-1222";
      $http.post('/api/listing/', {
        'date': new Date(),
        'user': {
          'user_id': $scope.user._id,
          'profile_photo': $scope.user.profile_photo
        },
        'postObj': postObj,
        "active": true
      });
    $location.path('home');
    };

  $scope.generateUrlCode = function() {
    return Math.random().toString(36).substring(2,7);
  };
  };


    var postObj = {};
    postObj.what_to_do = [];
    postObj.where_to_eat = [];
    $scope.recycleAct = function() {
      $scope.advance();
      postObj.what_to_do.push($scope.listing.what_to_do);
    };

    $scope.recycleFood = function() {
      $scope.advance();
      postObj.where_to_eat.push($scope.listing.where_to_eat);
    };


  });
