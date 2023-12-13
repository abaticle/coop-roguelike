import { WebSocketServer } from 'ws'
import { WEB_SOCKET_PORT } from '../../data/constants.js'
import { v4 as uuidv4 } from 'uuid'


export default class WebSocket extends WebSocketServer {

    clients = new Map()

    /**
     * 
     * @param {Game} game 
     */
    constructor() { 
        console.log(`Using web socket port ${WEB_SOCKET_PORT}`)
        super({
            port: WEB_SOCKET_PORT
        })
        global.webSocket = this

        this.on("connection", this.onConnection)
        this.on("error", this.onError)
        this.on("message", this.onMessage) 
        this.on("close", this.onClose)
        this.startPingClients()
    }

    startPingClients() {

    }

    onMessage(message) {
        console.log(message) 
    }

    onClose() {
        console.log(`Client disconnnected`)
    }

    onConnection(ws) {
        const id = uuidv4()
        this.clients.set(id, {})
        console.log(`New client connected: ${id}`)
    }

    onError() {

    }

    send(message, data) {

    }
}

export const wrapper  = (app) => {
    
}