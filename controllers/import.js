const { spawn } = require( 'child_process' );

const convertPlayList = (url, callback) => {
	console.log('incoming', url)
	const cmd = 'youtube-dl';
	let params = [
		url,
		// ' --verbose',
		"--output=songs/%(title)s.%(ext)s",
		'--extract-audio',
		'--audio-format=mp3',
	];

	const ls = spawn( cmd, params );

	ls.stdout.on( 'data', data => {
		console.log( `stdout: ${data}` );
	} );

	ls.stderr.on( 'data', data => {
		console.log( `stderr: ${data}` );
	} );

	ls.on( 'close', code => {
		console.log( `child process exited with code ${code}` );
		callback;
	} );
}

module.exports = convertPlayList;
