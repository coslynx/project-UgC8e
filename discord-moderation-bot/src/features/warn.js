const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./warnings.db');

module.exports = {
  name: 'warn',
  description: 'Warn a user for their behavior',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to use this command');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to warn');
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      return message.reply('You need to provide a reason for the warning');
    }

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS warnings (
        user_id TEXT,
        user_name TEXT,
        moderator_id TEXT,
        moderator_name TEXT,
        reason TEXT
      )`);

      const stmt = db.prepare(`INSERT INTO warnings VALUES (?, ?, ?, ?, ?)`);
      stmt.run(user.id, user.username, message.author.id, message.author.username, reason);
      stmt.finalize();

      message.channel.send(`User ${user.username} has been warned by ${message.author.username} for: ${reason}`);
    });
  },
};