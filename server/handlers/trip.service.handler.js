var tripModel = require('../models/trip/trip.model.server.js')();
module.exports = {
  getPendingApprovals: function (renterId, res) {

    tripModel.getPendingApprovals(renterId).then(function (data) {
      res.json(data);
    }).catch(function (err) {
      res.status(500).json({error: err});
    });

  },

  changeTripStatus: function (tripId, status, res) {
    tripModel.changeTripStatus(tripId, status).then(function (data) {
      res.json({status: "success"});
    }).catch(function (err) {
      res.status(500).json({error: err});
    });
  }
}
