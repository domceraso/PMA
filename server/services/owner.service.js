var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('propOwners');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.propOwners.find().toArray(function (err, name) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(propOwners);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.propOwners.findById(bizName, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (propOwners) {
            // return user (without hashed password)
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateOwner() {
        // fields to update
        var set = {
            bizName: userParam.businessName,
            address: userParam.address,
            city: userParam.city,
            state: userParam.state,
            zip: userParam.zip,
            units: userParam.units
        };

        db.propOwners.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.propOwners.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}