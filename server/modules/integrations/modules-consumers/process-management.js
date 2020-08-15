const MessagesQueue = require('../messagesQueue');
const topics = require('../messagesQueue/topics');

const consumer = MessagesQueue.getInstance()
consumer.subscribe(topics.SALES_ORDER_CREATED, message => {
    console.log("[MÓDULO PRODUÇÃO INDUSTRIAL]")
    console.log("UM NOVO PEDIDO FOI CRIADO")
    console.log(message)
})

consumer.subscribe(topics.SALES_ORDER_CANCELED, message => {
    console.log("[MÓDULO PRODUÇÃO INDUSTRIAL]")
    console.log("UM PEDIDO FOI CANCELADO")
    console.log(message)
})
