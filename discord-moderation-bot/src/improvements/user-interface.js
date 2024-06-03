const Discord = require('discord.js');

class UserInterface {
  constructor(client) {
    this.client = client;
  }

  displayWelcomeMessage() {
    this.client.on('guildCreate', (guild) => {
      const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
      if (!channel) return;

      channel.send('Thank you for adding the moderation bot to your server! Use !help to see available commands.');
    });
  }

  displayHelpMessage() {
    this.client.on('message', (message) => {
      if (message.content === '!help') {
        message.channel.send('List of available commands:\n!mute @user <duration> <reason>\n!kick @user <reason>\n!ban @user <reason>\n!warn @user <reason>\n!history @user\n!clear <amount>\n!report @user <reason>');
      }
    });
  }

  displayErrorMessage(errorMessage) {
    this.client.on('error', (error) => {
      console.error(errorMessage);
    });
  }

  displaySuccessMessage(successMessage) {
    this.client.on('message', (message) => {
      if (message.content === 'success') {
        message.channel.send(successMessage);
      }
    });
  }

  displayWarningSystem() {
    // Implement warning system UI here
  }

  displayMuteSystem() {
    // Implement mute system UI here
  }

  displayBanSystem() {
    // Implement ban system UI here
  }

  displayKickSystem() {
    // Implement kick system UI here
  }

  displayClearChatSystem() {
    // Implement clear chat system UI here
  }

  displayLoggingSystem() {
    // Implement logging system UI here
  }
}

module.exports = UserInterface;