var config = require('config.json');
var express = require('express');
var router = express.Router();
var ownerService = require('services/owner.service');

// routes
router.get('/owners', getAllOwners);
router.get('/currentOwner', getCurrentOwner);
router.put('/owners/:_id', updateOwner);
router.delete('/owners/:_id', deleteOwner);

module.exports = router;


function getAllOwners() {
    ownerService.getAll()
        .then(function (propOwners) {
            res.send(propOwners);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentOwner() {
    ownerService.getById(req.user.sub)
        .then(function (propOwner) {
            if (propOwner) {
                res.send(propOwner);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateOwner() {
    ownerService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteOwner() {
    ownerService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
