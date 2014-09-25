'use strict';

angular.module('airhostluxeApp')
  .controller('CustomizeCtrl', function ($scope, $http, Auth, User, $location, $timeout) {

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.user = Auth.getCurrentUser();

    $scope.step=1;

    $scope.back = function () {
      $scope.step--;
    };

    $scope.advance = function () {
      $scope.step++;
    };

    var body = {url: "https://www.airbnb.com/rooms/1747206?s=tBpK"};

    $scope.scrape = function() {
      console.log("scraping");
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
      };
      postObj.property_info = $scope.listing.property_info;
      $scope.listing.property_info.house_rules = "Please remove your shoes before walking on the carpets."
      $scope.listing.property_info.luxe_url = $scope.generateUrlCode();
      postObj.your_stay = $scope.listing.your_stay;
      $scope.listing.your_stay.safety = "The United States requires bicyclists to wear helmets at all times."
      $scope.listing.your_stay.culture = "Tipping is expected for services here, as employees are not well paid.  Give a %15-20% tip for waitstaff, taxi drivers, haircuts, food delivery, and other services."
      $scope.listing.your_stay.phone = "The local area code is (917)."
      $scope.listing.your_stay.laws = "Alcohol consumption is limited to persons age 21 or over -- you may be asked for photo ID when purchasing."
      postObj.emergency = $scope.listing.emergency;
      $scope.listing.emergency.call_number = "911";
      $scope.listing.emergency.poison_ctrl_center ="1-800-222-1222";
      console.log('user: ', $scope.user);
      console.log('postObj', postObj);
      $http.post('/api/listing', {
        'date': new Date(),
        'user': {
          '_id': $scope.user._id,
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

    var postObj = {};
    postObj.what_to_do = [];
    postObj.where_to_eat = [];
    $scope.placeList = [];


    $scope.recyclePlace = function() {
      var temp = $scope.listing.what_to_do.place;
      $scope.placeList.push(temp);
      postObj.what_to_do.push({
        type: $scope.listing.what_to_do.select,
        place: $scope.listing.what_to_do.place,
        url: $scope.listing.what_to_do.url,
        note: $scope.listing.what_to_do.note
      });
      $scope.listing.what_to_do.select = "";
      $scope.listing.what_to_do.place = "";
      $scope.listing.what_to_do.url = "";
      $scope.listing.what_to_do.note = "";
      console.log(postObj.what_to_do);
    };

    $scope.recycleFood = function() {
      postObj.where_to_eat.push({
        restaurant: $scope.listing.where_to_eat.restaurant,
        url: $scope.listing.where_to_eat.url,
        note: $scope.listing.where_to_eat.note
      });
      $scope.listing.where_to_eat.restaurant = "";
      $scope.listing.where_to_eat.url = "";
      $scope.listing.where_to_eat.note = "";
    };

    $scope.recyclePlaceFinish = function() {
      $scope.recyclePlace();
      $scope.step++;
    };

    $scope.recycleFoodFinish = function() {
      $scope.recycleFood();
      $scope.step++;
    };

    $scope.countdown = function(num) {
      $scope.timer.enable = true;
      $scope.timer.t = num;
      $scope.timer.t--;
      $timeout($scope.countdown, 1000);
      $step++;
    }

    if ($scope.step===2) {
      $scope.countdown(10);
    }
  });