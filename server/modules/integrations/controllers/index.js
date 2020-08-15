const MessagesQueue = require('../messagesQueue');

function publish(req, res) {
    const queue = MessagesQueue.getInstance();
    setTimeout(() => {
        queue.publish(req.body.topic, req.body);
    }, 3000);

    res.sendStatus(200);
}

module.exports = {
    publish
}