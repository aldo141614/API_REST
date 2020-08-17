'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FactSchema = Schema({
  vehicle_id: Number,
  position_longitude: String,
  position_latitude: String,
  trip_route_id: Number,
  vehicle_label: Number,
  trip_id: Number,
  alcaldia: String
})

module.exports = mongoose.model('Facts', FactSchema)
