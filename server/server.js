var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var config = require('./config.json');
require('rootpath')();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'propOwner', 'propMgr', 'maintenance', 'tenant', 'user'],
        default: 'user'
    }
}, {
    collection: 'users'
});

var propOwnersSchema = new mongoose.Schema({
    bizName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,
    },
    units: { type : Array , "default" : [] }
}, {
    collection: 'propOwners'
});

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));


var Model = mongoose.model('Model', userSchema);
mongoose.connect('mongodb://steelcitydev:Racecar910@ds163294.mlab.com:63294/pma', {
    useMongoClient: true,
    uri_decode_auth: true 
});

var Model = mongoose.model('Model', propOwnersSchema);
mongoose.connect('mongodb://steelcitydev:Racecar910@ds163294.mlab.com:63294/pma', {
    useMongoClient: true,
    uri_decode_auth: true 
});

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/users/owners', require('./controllers/owners.controller'));

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});