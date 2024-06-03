const profanityFilter = (message) => {
    const profanityWords = ['badword1', 'badword2', 'badword3'];
    
    for (let word of profanityWords) {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        message = message.replace(regex, '****');
    }
    
    return message;
};

module.exports = profanityFilter;