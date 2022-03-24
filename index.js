const express = require('express');
const url = require('url');
const critical = require('critical');
const PORT = 8080;
const app = express();
app.listen(
	PORT,
	() => console.log(`server running on ${PORT}`)
	);
app.get('/criticalcss',(req,res) => {
	const queryObj = url.parse(req.url, true).query;
	//res.send(queryObj.url);
	let criticalCss = ''; 
	// const {css, html, uncritical} = critical.generate({
	//   base: 'test/',
	//   src: queryObj.url,//'index.html',
	//   width: 1300,
	//   height: 900,
	// });

	criticalCss = critical.generate({
	    base: 'test/',
	    src: queryObj.url,//'index.html',
	    width: 1300,
	    height: 900
	}).then( ({css, html, uncritical}) => {
		//return css;
		res.json({"status": 200, critical_css: css});
	    // criticalCss = css;
	});
	// res.send('critical css is done'+criticalCss)
});
