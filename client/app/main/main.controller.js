'use strict';

angular.module('airhostluxeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, User) {
    $scope.user = Auth.getCurrentUser;

    $scope.openPanel=false;

    $http.get('/api/listings').success(function(listings) {
      $scope.listings = listings;
    });

    $scope.deleteListing = function(listing) {
      $http.delete('/api/listings/' + $scope.listing._id);
    };

 // * POST    /listings              ->  create
 // * GET     /listings/:id          ->  show
 // * PUT     /listings/:id          ->  update

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }
      $http.post('/api/listings/', {
        "date": new Date(),
        "user": {
          "_id": $scope.user._id,
          "profile_photo": $scope.listing.profile_photo
        },
        "property_info": {
          "name": $scope.listing.propoerty_name,
          "street_address": $scope.listing.street_address,
          "city": $scope.listing.city,
          "country": $scope.listing.country,
          "airbnb_url": $scope.listing.airbnburl,
          "luxe_url": $scope.user.name +"/"+ $scope.generateUrlName()
        },
        "site_color": $scope.listing.site_color,
        "photo": $scope.listing.photo,
        "welcome_msg": $scope.listing.welcome_msg,
        "your_stay": {
          "msg": $scope.listing.your_stay.msg,
          "wireless_pwd": $scope.listing.your_stay_msg.wireless_pwd
        },
        "what_to_do": {
          "msg": $scope.listing.what_to_do.msg,
          "photo": $scope.listing.what_to_do.photo,
          "place_address": $scope.listing.what_to_do.place_address,
          "place_note": $scope.listing.what_to_do.place_note
        },
        "where_to_eat": {
          "msg": $scope.listing.where_to_eat.msg;
          "photo": $scope.listing.where_to_eat.photo,
          "place_address": $scope.listing.where_to_eat.place_address,
          "place_note": $scope.listing.where_to_eat.place_note
        },
        "emergency": {
          "photo": $scope.listing.emergency.photo,
          "call_number": $scope.listing.emergency.call_number,
          "poison_ctrl_center": $scope.listing.emergency.poison_ctrl_center,
          "first_aid_kit": $scope.listing.emergency.first_aid_kit,
          "hospital_address": $scope.listing.emergency.hospital_address
        },
        "custom_page": {
          "photo": $scope.listing.custom_page.photo,
          "msg": $scope.listing.custom_page.msg,
          "active_bool": $scope.listing.custom_page.active_bool
        },
        "active": true;
      });
    $location.path('home');
    };

  $scope.generateUrlName = function() {
    if (typeof $scope.listing.propoerty_name !== "undefined" && $scope.listing.propoerty_name !== "") {
      return $scope.listing.propoerty_name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    } else {
      return Math.random().toString(36).substring(2,7);
    }
  };

  });