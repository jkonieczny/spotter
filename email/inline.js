var inlineCss   = require('inline-css');
var fs          = require('fs');
var minify      = require('html-minifier').minify;


fs.readFile('spotteremail.html', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    inlineCss(data, { url: './', removeStyleTags: false }).then(function(html) {
        fs.writeFile("./spotteremailcompiled.html", minify(html, { collapseWhitespace: true }), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 

    });
});
/*
inlineCss(html, options)
    .then(function(html) { console.log(html); });
*/