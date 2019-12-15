const { stor } = require('../index');

console.info('Test start');

console.info('Stor[keyStor] bind');
const bindId = stor.bindStor('keyStor', (value) => {
	console.info('Stor[keyStor] event: ', value);

	console.info('Stor[keyStor] unbind');
	stor.unbindStor('keyStor', bindId);

	setTimeout(() => {
		console.info('Stor[keyStor] set: valTwo');
		stor.setStor('keyStor', 'valTwo', () => {
			console.info('Stor[keyStor] set: cbFunc');
		});
	}, 3000);
});

setTimeout(() => {
	console.info('Stor[keyStor] set: valOne');
	stor.setStor('keyStor', 'valOne', () => {
		console.info('Stor[keyStor] set: cbFunc');
	});
}, 3000);

setTimeout(() => {
	console.info('Test exit');
	process.exit();
}, 15000);
