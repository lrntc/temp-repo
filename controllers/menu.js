const convertPlayList = require('./import');

var List = require('prompt-list');
const prompts = require('prompts');

const initMenu = () => {
	const choices = [
		'Play Songs',
		'Import YouTube playlist',
		{name: 'Import from USB drive', disabled: 'Temporarily unavailable'}
	];

	menu('What would you like to do?', choices, (choice) => {
		if(choice == 'Play Songs') {
			playMenu();
		}
		if(choice == 'Import YouTube playlist') {
			const prompts = require('prompts');
			const onSubmit = (prompt, response) => convertPlayList(response, initMenu);

			let response = prompts({
				type: 'text',
				name: 'url',
				message: 'Paste playlist/song url?',
				validate: value => value.indexOf('https://www.youtube.com/watch?') != -1 ? true : false
			}, { onSubmit });
		}
	})

}

const playMenu = () => {
	const testFolder = 'songs/';
	const fs = require('fs');
	const files = fs.readdirSync(testFolder).map(file => file);

	menu('Play?', ['All', 'Shuffle All', 'Song'], (choice) => {
		console.log(choice);

		if(choice == 'All') {
			console.log('play all')
		}
		if(choice == 'Shuffle All') {
			console.log('shuffle it')
		}
		if(choice == 'Song') {
			menu('Choose song', files, (file) => {
				console.log(file + ' will be played');
			});
		}
	})
}

const menu = (message, choices, callback) => {
	const list = new List({
		message,
		choices
	});
	list.run().then(callback);
}

module.exports = {
	initMenu,
	playMenu
}
