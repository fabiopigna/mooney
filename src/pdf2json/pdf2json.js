var fs = require('fs'),
    PDFParser = require("pdf2json");
var pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", function (errData) { console.error(errData.parserError) });
pdfParser.on("pdfParser_dataReady", function (pdfData) {
    fs.writeFile("./F1040EZ.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("./30_09_2016_Estratto Conto_rapporto_0000040169762 (1).pdf");