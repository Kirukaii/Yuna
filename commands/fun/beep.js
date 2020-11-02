module.exports = {
	name: 'beep',
	description: '',
	execute(message) {
		message.channel.send('Boop.');
	},
};