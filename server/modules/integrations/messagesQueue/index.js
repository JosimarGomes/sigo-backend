class MessagesQueue {
    constructor() {
        this.channels = {};
    }
    
    static getInstance() {
        if (!MessagesQueue.instance) {
            MessagesQueue.instance = new MessagesQueue();
        }

        return MessagesQueue.instance;
    }

    subscribe(topic, callback) {
        const currentCallbacks = this.channels[topic] || [];
        currentCallbacks.push(callback);
        this.channels[topic] = currentCallbacks;
    }

    publish(topic, message) {
        if (this.channels[topic]) {
            this.channels[topic].forEach(callback => callback(message));
        }
    }
}

module.exports = MessagesQueue;