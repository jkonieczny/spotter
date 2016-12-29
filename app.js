/** @jsx React.DOM */
process.env.NODE_ENV = 'dev';

var App = require('./public/js/main.js');
App.init();
/*
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceWorker.js', {scope: './'}).then(function(reg) {
		console.log('◕‿◕', reg);
	}, function(err) {
		console.log('ಠ_ಠ', err);
	});
}
*/