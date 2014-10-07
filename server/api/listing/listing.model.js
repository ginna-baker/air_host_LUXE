'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListingSchema = new Schema({
  date: Date,

  user: {
    _id: String,
    name: String,
    profile_photo: String
  },
  postObj: {
    property_info: {
      name: String,
      tagline: String,
      city: String,
      country: String,
      photo: String,
      airbnb_url: String,
      airbnb_rating: Number,
      airbnb_guest_count: Number,
      luxe_url: String,
      about_us: String,
    },
    your_stay: {
      wireless_pwd: String,
      tv: String,
      house_info: String,
      house_rules: String,
      neighborhood: String,
      culture: String,
      phone: String,
      laws: String
    },
    what_to_do: [
      {
      select: String,
      place: String,
      url: String,
      note: String
      },
    ],
    where_to_eat: [
      {
        restaurant: String,
        url: String,
        note: String
      },
    ],
    emergency: {
      call_number: String,
      poison_ctrl_center: String,
      first_aid_kit: String,
      hospital: String
    },
  },
  // json: {
  //   cover: {
  //     data: Buffer,
  //     contentType: String
  //     },
  //   city: String,
  //   airbnb_rating: String
  // },
  active: Boolean
});

module.exports = mongoose.model('Listing', ListingSchema);