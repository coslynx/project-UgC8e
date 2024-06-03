const Discord = require('discord.js');

module.exports = {
  name: 'vote-kick',
  description: 'Initiate a vote to kick a user from the server',
  execute(message, args) {
    const { member, mentions } = message;
    const user = mentions.users.first();

    if (!user) {
      return message.reply('Please mention the user you want to kick.');
    }

    if (user.id === message.author.id) {
      return message.reply('You cannot kick yourself.');
    }

    if (!user.kickable) {
      return message.reply('Unable to kick the specified user.');
    }

    const voteEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Vote to kick ${user.username}`)
      .setDescription('React with ✅ to kick the user.')
      .setTimestamp();

    message.channel.send(voteEmbed).then((msg) => {
      msg.react('✅');

      const filter = (reaction, reactor) => {
        return reaction.emoji.name === '✅' && reactor.id !== msg.author.id;
      };

      const collector = msg.createReactionCollector(filter, { time: 60000 });

      collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '✅') {
          user.kick();
          message.channel.send(`${user.username} has been kicked from the server.`);
          collector.stop();
        }
      });

      collector.on('end', (collected) => {
        if (collected.size === 0) {
          message.channel.send('Vote to kick has ended. No action taken.');
        }
      });
    });
  },
};