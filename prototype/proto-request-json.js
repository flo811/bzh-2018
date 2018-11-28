// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request')
exports.req=req
exports.req2=req2

// Envoie de la requête http
let req = request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
    if (err) { return console.log('Erreur', err); }
    console.log('Ok 1', body.length);
});

let req2 = request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
    if (err) { return console.log('Erreur', err); }
    console.log('Ok 2', body.length);
});