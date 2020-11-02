module.exports = {
	name: 'beep',
	description: '',
	category: 'fun',
	execute(message) {
		message.channel.send('Boop.');
	},
};