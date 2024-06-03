const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('user_actions.db');

module.exports = {
  name: 'report',
  description: 'Report inappropriate behavior of a user',

  execute(message, args) {
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(' ');

    if (!user) {
      return message.reply('Please mention the user you want to report.');
    }
    if (!reason) {
      return message.reply('Please provide a reason for the report.');
    }

    const reportEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('User Report')
      .addField('Reported User', user)
      .addField('Reported By', message.author)
      .addField('Reason', reason);

    const reportChannel = message.guild.channels.cache.find(channel => channel.name === 'reports');
    if (!reportChannel) {
      return message.reply('Could not find a reports channel.');
    }

    reportChannel.send(reportEmbed);
    message.reply(`Report sent successfully for ${user}`);
  }
};