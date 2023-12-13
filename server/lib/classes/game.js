import Map from "./location/map.js"


export default class Game {

    constructor(options) {
        global.game = this
        new Map(options)                
    }
}
