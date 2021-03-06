const express = require('express');
const url = require('url');
const critical = require('critical');
const fs = require('fs');
const json2csv = require('json2csv');

const port = 80;
const app = express();

var newLine = '\r\n';
var fields = ['URL', 
			  'Total time taken', 
			  'download time', 
			  'Processing time(Download time - Total time)',
			  'HTTP Status code'];

app.get('/',(req,res) => {
	const queryObj = url.parse(req.url, true).query;
	var requrl = queryObj.url
	if(!requrl){
		res.status(500).json({"status": 500, message: "url not found, please send url to grab css"});
	}
	criticalCss = critical.generate({
	    base: 'test/',
	    src:  requrl,//'index.html',//
	    width: 1300,
	    height: 900
	}).then( ({css, html, uncritical}) => {

		fs.stat('resonseReport.csv', function (err, stat) {
		  if (err == null) {
		    /*console.log('File exists');*/
		    const toCsv = {
		    	'URL': requrl,
		    	'Total time taken': 
		    };
		    //write the actual data and end with newline
		    var csv = json2csv(toCsv) + newLine;

		    fs.appendFile('file.csv', csv, function (err) {
		      if (err) throw err;
		      /*console.log('The "data to append" was appended to file!');*/
		    });
		  } else {
		    //write the headers and newline
		    console.log('New file, just writing headers');
		    fields = fields + newLine;

		    fs.writeFile('file.csv', fields, function (err) {
		      if (err) throw err;
		      /*console.log('file saved');*/
		    });
		  }
		});




		//return css;
		res.json({"status": 200, critical_css: css});
	    // criticalCss = css;
	});
});


/*app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});*/
app.listen(80, () => {
    console.log(`App listening on port 80`);
});