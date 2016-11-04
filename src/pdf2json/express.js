var express = require('express');
var app = express();
var Q = require('q');

app.get('/json', function (req, res) {
    readJSONFiles('src/pdf2json/json', function (err, jsons) {
        if (err) { throw err; }
        res.send(jsons);
    });
});

var fs = require('fs');

function readJSONFiles(jsonDirName, callback) {


    fs.readdir(jsonDirName, (err, files) => {

        var promises = files.map(filename => {
            var defer = Q.defer();
            var path = jsonDirName + '/' + filename;
            fs.readFile(path, (err, data) => {
                if (err) {
                    defer.reject(err);
                }
                console.log('reading file ' + path, 'ok')
                defer.resolve({ name: path, json: JSON.parse(data) });
            });
            return defer.promise;
        });

        Q.allSettled(
            promises

        ).then((results) => {

            var response = [];
            results.forEach(function (result) {

                if (result.state === "fulfilled") {
                    var value = result.value;
                    console.log('name', value.name)
                    response.push(value);
                } else {
                    var reason = result.reason;
                    callback(reason);
                }
            });
            callback(null, response);

        });
    });
}
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});