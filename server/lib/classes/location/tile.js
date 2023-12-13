import { TILES } from "../../data/constants.js"

export default class Tile {
    x = 1
    y = 1
    type = ""
    transparent = false
    walkable = false
    flipX = false 
    flipY = false

    constructor({x = 1, y = 1, type = TILES.EMPTY, flipX = false, flipY = false}) {
        this.x = x
        this.y = y
        this.type = type
        this.flipX = flipX
        this.flipY = flipY
    }
}
