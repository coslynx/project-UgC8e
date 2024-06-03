const deleteInappropriateMsg = (message) => {
    if (message.content.includes("inappropriate_word")) {
        message.delete();
        message.channel.send(`${message.author}, please refrain from using inappropriate language.`);
    }
};

module.exports = deleteInappropriateMsg;