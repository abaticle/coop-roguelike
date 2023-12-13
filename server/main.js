import Game from "./lib/classes/game.js"
import express from 'express';
import { WEB_PORT } from "./lib/data/constants.js"
import expressWs from 'express-ws'
import WebSocket from "./lib/classes/network/web_socket.js"
import * as GD from '@gd-com/utils'

const app = express()

expressWs(app)

app.listen(WEB_PORT, () =>
  console.log(`Game server listening on port ${WEB_PORT}`)
) 

const messagesToSend = []

const REQUEST_TYPE = {
  REQUEST: 0,
  NOTIFICATION: 1
}

/**
 * Convert message to object
 * @param {string} message 
 * @returns 
 */
const convertMessage = (message = "") => {

  //Check message format 
  if (message.split("|").length != 4) {
    throw new Error(`Invalid message: ${message}`)
  }

  console.log(`message: ${ message }`)

  const [
    id, 
    messageType, 
    name, 
    content
  ] = message.split("|")

  const result = {
    id: "",
    messageType: "",
    name: "",
    content: {}
  }

  // Id
  if (id) {
    result.id = id
  } else {
    throw new Error(`Missing "id" in message ${message}`)
  }

  // Message type
  switch(messageType) {
    case "0":
      result.messageType = REQUEST_TYPE.REQUEST
      break
    case "1":
      result.messageType = REQUEST_TYPE.NOTIFICATION
      break
    default: 
      throw new Error(`Unknown messageType: ${messageType}`)
  }

  // Name
  if (name) {
    result.name = name
  }

  // Content
  if (content) {
    try {
      result.content  = JSON.parse(content)
    } catch(error) {
      throw new Error(`Error parsing to JSON : ${content}`)
    }
  }

  return result

}

/**
 * 
 * @param {string} stringMessage 
 */
const addMessage = (stringMessage = "") => {

  const {
    id,
    messageType, 
    name,
    content
  } = convertMessage(stringMessage)

  switch (messageType) {
    case REQUEST_TYPE.NOTIFICATION:
      break
    case REQUEST_TYPE.REQUEST:
      messagesToSend.push({
        id
      })      
      break
  }


}
 



app.ws('/ws', (ws, req) => { 
  console.log(`Player connected ${req.headers['sec-websocket-key']}`)
 
  ws.on('message', addMessage)

  ws.on('close', () => {
    console.log('WebSocket closed');
  })
})
  
const start = async () => { 
  game = new Game({
    name: "map_0.tmx"
  }) 
  await global.map.init()
}

start()
