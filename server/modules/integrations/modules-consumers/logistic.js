const MessagesQueue = require('../messagesQueue');
const topics = require('../messagesQueue/topics');

const consumer = MessagesQueue.getInstance()
consumer.subscribe(topics.PRODUCTION_ORDER_CREATED, message => {
    console.log("[MÓDULO LOGÍSTICA]")
    console.log("UMA NOVA ORDEM DE PRODUÇÃO FOI CRIADA")
    console.log(message)
})

consumer.subscribe(topics.PRODUCTION_ORDER_FINISH, message => {
    console.log("[MÓDULO LOGÍSTICA]")
    console.log("UMA ORDEM DE PRODUÇÃO FOI FINALIZADA")
    console.log(message)
})
