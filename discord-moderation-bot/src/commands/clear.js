const { Message } = require('discord.js');

module.exports = {
  name: 'clear',
  description: 'Clear messages from the channel',
  async execute(message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
      return message.reply('You do not have permission to use this command');
    }

    if (!args[0]) {
      return message.reply('Please provide the number of messages to clear');
    }

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
      return message.reply('Please provide a valid number');
    } else if (amount <= 1 || amount > 100) {
      return message.reply('You can only delete between 1 and 99 messages');
    }

    message.channel.bulkDelete(amount, true)
      .then(() => {
        message.channel.send(`Successfully cleared ${args[0]} messages`).then(msg => msg.delete({ timeout: 5000 }));
      })
      .catch(error => {
        console.error('Error clearing messages:', error);
        message.channel.send('There was an error clearing messages');
      });
  },
};