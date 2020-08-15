const MessagesQueue = require('../messagesQueue');
const topics = require('../messagesQueue/topics');

const consumer = MessagesQueue.getInstance()
consumer.subscribe(topics.PRODUCTION_ORDER_CREATED, message => {
    console.log("[MÓDULO BI]")
    console.log("UMA NOVA ORDEM DE PRODUÇÃO FOI CRIADA")
    console.log(message)
})

consumer.subscribe(topics.DELIVERY_ORDER_CREATED, message => {
    console.log("[MÓDULO BI]")
    console.log("UM NOVO PEDIDO DE ENTREGA FOI CRIADO")
    console.log(message)
})

consumer.subscribe(topics.PRODUCTION_ORDER_FINISH, message => {
    console.log("[MÓDULO BI]")
    console.log("UMA ORDEM DE PRODUÇÃO FOI FINALIZADA")
    console.log(message)
})

consumer.subscribe(topics.SALES_ORDER_CREATED, message => {
    console.log("[MÓDULO BI]")
    console.log("UM NOVO PEDIDO FOI CRIADO")
    console.log(message)
})

consumer.subscribe(topics.SALES_ORDER_CANCELED, message => {
    console.log("[MÓDULO BI]")
    console.log("UM PEDIDO FOI CANCELADO")
    console.log(message)
})