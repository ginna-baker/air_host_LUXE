'use strict';

angular.module('airhostluxeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, User) {
    $scope.user = Auth.getCurrentUser;

    $scope.openPanel=false;

    $http.get('/api/listing').success(function(listings) {
      $scope.listings = listings;
    });

    $scope.deleteListing = function() {
      $http.delete('/api/listing/' + $scope.listings._id);
    };

 // * POST    /listings              ->  create
 // * GET     /listings/:id          ->  show
 // * PUT     /listings/:id          ->  update

    $scope.addListing = function() {
      if($scope.newListing === '') {
        return;
      }

      var postObj = {};
      postObj.property_info = $scope.listing.property_info;
        // "property_info": {
        //   "name": $scope.listing.property_info.propoerty_name,
        //   "big_photo": $scope.listing.property_info.photo,
        //   "tagline": $scope.listing.property_info.tagline,
        //   "street_address": $scope.listing.property_info.street_address,
        //   "city": $scope.listing.property_info.city,
        //   "country": $scope.listing.property_info.country,
        //   "airbnb_url": $scope.listing.property_info.airbnburl,
        //   "airbnb_rating": $scope.listing.property_info.airbnbrating,
        //   "airbnb_guest_count": $scope.listing.propoerty_info.airbnb_guest_count,
        $scope.listing.property_info.luxe_url = $scope.user.name +"/"+ $scope.generateUrlName();
        postObj.your_stay = $scope.listing.your_stay;
        // "your_stay": {
        //   "msg": $scope.listing.your_stay.msg,
        //   "house_info": $scope.listing.your_stay.house_info,
        //   "tv_instructions": $scope.listing.your_stay.wireless_pwd,
        //   "wireless_pwd": $scope.listing.your_stay.wireless_pwd,
        //   "rules": $scope.listing.your_stay.house_rules
        // },
        postObj.what_to_do = $scope.listing.what_to_do;
        // "what_to_do": {
        //   "msg": $scope.listing.what_to_do.msg,
        //   "place_name": $scope.listing.what_to_do.place_name,
        //   "place_address": $scope.listing.what_to_do.place_address,
        //   "place_note": $scope.listing.what_to_do.place_note
        // },
        postObj.where_to_eat = $scope.listing.where_to_eat;
        // "where_to_eat": {
        //   "msg": $scope.listing.where_to_eat.msg,
        //   "place_name": $scope.listing.where_to_eat.place_address,
        //   "place_address": $scope.listing.where_to_eat.place_address,
        //   "place_note": $scope.listing.where_to_eat.place_note
        // },
        postObj.emergency = $scope.listing.emergency;
        // "emergency": {
        //   "call_number": $scope.listing.emergency.call_number,
        $scope.listing.emergency.poison_ctrl_center ="1-800-222-1222";
        //   "first_aid_kit": $scope.listing.emergency.first_aid_kit,
        //   "hospital_address": $scope.listing.emergency.hospital_address
        // },
        // postObj.custom_page = $scope.listing.custom_page;
        // "custom_page": {
        //   "photo": $scope.listing.custom_page.photo,
        //   "msg": $scope.listing.custom_page.msg,
        //   "active_bool": $scope.listing.custom_page.active_bool
        // },
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

  $scope.generateUrlName = function() {
    if (typeof $scope.listing.propoerty_name !== "undefined" && $scope.listing.propoerty_name !== "") {
      return $scope.listing.propoerty_name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
    } else {
      return Math.random().toString(36).substring(2,7);
    }
  };

  });