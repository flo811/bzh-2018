var request = require('request')

let talks = [];

exports.init = function (callback) {
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
        talks = body

        request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
            talks.concat(body)
            callback(talks.length)
        });
    });
};

exports.listerSessions = function (callback) {
    callback(talks)
}