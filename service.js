var request = require('request')
var jsdom = require('jsdom')
var fs = require('fs')

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

exports.getSpeakers = function (callback) {
    request('http://www.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        let dom = new jsdom.JSDOM(body)
        speakers = dom.window.document.querySelectorAll(".media-heading")
        callback(speakers)
    });
}