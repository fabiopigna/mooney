var express = require('express');
var app = express();

app.get('/json', function (req, res) {
    readJSONFile('src/pdf2json/F1040EZ.json', function (err, json) {
        if (err) { throw err; }
        res.send(json);
    });
});

var fs = require('fs');

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err);
            return;
        }
        try {
            callback(null, JSON.parse(data));
        } catch (exception) {
            callback(exception);
        }
    });
}
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});