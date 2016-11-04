var fs = require('fs'); 1
var PDFParser = require("pdf2json");

var nodeUtil = require("util");
var stream = require('stream');
function StringifyStream() {
    stream.Transform.call(this);

    this._readableState.objectMode = false;
    this._writableState.objectMode = true;
}
nodeUtil.inherits(StringifyStream, stream.Transform);

StringifyStream.prototype._transform = function (obj, encoding, callback) {
    this.push(JSON.stringify(obj));
    callback();
};

readJSONFiles();



function readJSONFiles() {
    var dirName = 'src/pdf2json/pdf';
    var jsonDirName = 'src/pdf2json/json';
    fs.readdir(dirName, (err, files) => {
        files.forEach(filename => {
            var path = dirName + '/' + filename;
            console.log(path);
            var inputStream = fs.createReadStream(path, { bufferSize: 64 * 1024 });
            var outputStream = fs.createWriteStream(jsonDirName + '/' + filename + '.json');
            inputStream.pipe(new PDFParser()).pipe(new StringifyStream()).pipe(outputStream);
        });
    });

}

